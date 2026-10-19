import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { userApi, matchApi, chatApi } from "../services/api";
import { joinRoom, sendSocketMessage, subscribeToMessages } from "../services/socket";
import Sidebar from "../components/common/Sidebar";
import {
  FiSearch,
  FiSliders,
  FiCheckCircle,
  FiStar,
  FiTrendingUp,
  FiX,
  FiCheck,
  FiBriefcase,
  FiCalendar,
  FiClock,
  FiUsers,
  FiMessageSquare,
} from "react-icons/fi";
import "../components/common/dashboard.css";

const Dashboard = () => {
  const { user, isAuthenticated, loading: authLoading, updateUser } = useAuth();
  const navigate = useNavigate();

  // Navigation state: "discover", "messages", "matches", "profile"
  const [activeTab, setActiveTab] = useState("discover");

  // Profiles data
  const [profiles, setProfiles] = useState([]);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [loadingProfiles, setLoadingProfiles] = useState(false);
  const [filterTag, setFilterTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Bookmark state
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  // Match celebration modal state
  const [celebrationMatch, setCelebrationMatch] = useState(null);

  // Matches list state
  const [matches, setMatches] = useState([]);
  const [loadingMatches, setLoadingMatches] = useState(false);

  // Deck keyboard & inspect states
  const [showInspect, setShowInspect] = useState(false);
  const [swipeHistory, setSwipeHistory] = useState([]);

  // Chat state
  const [activeMatch, setActiveMatch] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const messagesEndRef = useRef(null);

  // Profile editing state
  const [profileForm, setProfileForm] = useState({
    name: "",
    title: "",
    company: "",
    bio: "",
    skills: "",
    salary: "",
    experience: "",
    teamSize: "",
    benefits: "",
    location: "",
  });
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);

  // Redirect if unauthenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [authLoading, isAuthenticated, navigate]);

  // Load profiles
  const fetchProfiles = async () => {
    setLoadingProfiles(true);
    try {
      const res = await userApi.getAllUsers();
      setProfiles(res.data);
      setSelectedProfileIndex(0);
    } catch (err) {
      console.error("Failed to fetch deck:", err);
    } finally {
      setLoadingProfiles(false);
    }
  };

  // Load matches
  const fetchMatches = async () => {
    setLoadingMatches(true);
    try {
      const res = await matchApi.getMatches();
      setMatches(res.data);
    } catch (err) {
      console.error("Failed to load matches:", err);
    } finally {
      setLoadingMatches(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProfiles();
      fetchMatches();
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || "",
        title: user.title || "",
        company: user.company || "",
        bio: user.bio || "",
        skills: Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "",
        salary: user.salary || "",
        experience: user.experience || "",
        teamSize: user.teamSize || "",
        benefits: user.benefits || "",
        location: user.location || "",
      });
    }
  }, [user]);

  // Filtered profiles
  const filteredProfiles = profiles.filter((p) => {
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !query ||
      p.name?.toLowerCase().includes(query) ||
      p.title?.toLowerCase().includes(query) ||
      p.company?.toLowerCase().includes(query) ||
      p.location?.toLowerCase().includes(query) ||
      (p.skills && p.skills.some((s) => s.toLowerCase().includes(query)));

    if (!matchesSearch) return false;

    if (filterTag === "Remote") {
      return p.location?.toLowerCase().includes("remote");
    }
    return true;
  });

  const selectedProfile = filteredProfiles[selectedProfileIndex] || filteredProfiles[0];

  // Skip / Pass action
  const handleSkip = async (profileToSkip) => {
    if (!profileToSkip) return;
    setSwipeHistory((prev) => [profileToSkip, ...prev]);
    try {
      await matchApi.swipeLeft(profileToSkip._id);
    } catch (err) {
      console.error("Swipe left failed:", err);
    }

    setProfiles((prev) => prev.filter((p) => p._id !== profileToSkip._id));
  };

  // Match / Like action
  const handleMatch = async (profileToMatch) => {
    if (!profileToMatch) return;
    setSwipeHistory((prev) => [profileToMatch, ...prev]);
    try {
      const res = await matchApi.swipeRight(profileToMatch._id);
      if (res.data.isMatch) {
        setCelebrationMatch({
          match: res.data.match,
          partner: res.data.matchedUser || profileToMatch,
          icebreakers: res.data.icebreakers || res.data.match?.suggestedIcebreakers || [],
        });
        fetchMatches();
      }
    } catch (err) {
      console.error("Swipe right failed:", err);
    }

    setProfiles((prev) => prev.filter((p) => p._id !== profileToMatch._id));
  };

  // Undo action
  const handleUndo = () => {
    if (swipeHistory.length === 0) return;
    const lastProfile = swipeHistory[0];
    setSwipeHistory((prev) => prev.slice(1));
    setProfiles((prev) => [lastProfile, ...prev]);
  };

  const getRemainingHours = (expiresAt) => {
    if (!expiresAt) return "48h left";
    const diffMs = new Date(expiresAt).getTime() - Date.now();
    if (diffMs <= 0) return "Expired";
    const hrs = Math.floor(diffMs / (1000 * 60 * 60));
    return `${hrs}h left`;
  };

  // Keyboard shortcuts listener for the discovery deck
  useEffect(() => {
    if (activeTab !== "discover") return;

    const handleKeyDown = (e) => {
      if (["INPUT", "TEXTAREA"].includes(e.target?.tagName)) return;

      if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        if (selectedProfile) handleMatch(selectedProfile);
      } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        if (selectedProfile) handleSkip(selectedProfile);
      } else if (e.key === " " || e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
        e.preventDefault();
        setShowInspect((prev) => !prev);
      } else if (e.key.toLowerCase() === "z") {
        handleUndo();
      } else if (e.key.toLowerCase() === "b" || e.key.toLowerCase() === "s") {
        if (selectedProfile) toggleBookmark(selectedProfile._id);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, selectedProfile, swipeHistory]);

  // Toggle bookmark
  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  // Chat logic
  useEffect(() => {
    if (activeMatch) {
      const matchId = activeMatch._id;
      joinRoom(matchId);

      chatApi
        .getMessages(matchId)
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => console.error("Error loading chat messages:", err));

      const unsubscribe = subscribeToMessages((incomingMsg) => {
        if (incomingMsg.matchId === matchId) {
          setMessages((prev) => [...prev, incomingMsg]);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [activeMatch]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageInput.trim() || !activeMatch) return;

    const content = messageInput.trim();
    setMessageInput("");

    try {
      const res = await chatApi.sendMessage(activeMatch._id, content);
      const savedMsg = res.data;

      sendSocketMessage(activeMatch._id, savedMsg);

      setMessages((prev) => {
        if (prev.some((m) => m._id === savedMsg._id)) return prev;
        return [...prev, savedMsg];
      });
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const openChatWithMatch = (match) => {
    setActiveMatch(match);
    setActiveTab("messages");
  };

  const handleProfileSave = async (e) => {
    e.preventDefault();
    setSavingProfile(true);
    setProfileSuccess(false);

    try {
      const payload = {
        name: profileForm.name,
        title: profileForm.title,
        company: profileForm.company,
        bio: profileForm.bio,
        skills: profileForm.skills.split(",").map((s) => s.trim()).filter(Boolean),
        salary: profileForm.salary,
        experience: profileForm.experience,
        teamSize: profileForm.teamSize,
        benefits: profileForm.benefits,
        location: profileForm.location,
      };

      const res = await userApi.updateProfile(payload);
      updateUser(res.data.user);
      setProfileSuccess(true);
      setTimeout(() => setProfileSuccess(false), 3000);
    } catch (err) {
      console.error("Failed to update profile:", err);
    } finally {
      setSavingProfile(false);
    }
  };

  const getMatchPartner = (match) => {
    if (!match || !match.users) return null;
    return match.users.find((u) => u._id !== user?._id) || match.users[0];
  };

  // Color picker helper for logos
  const getBrandColor = (title) => {
    const colors = ["#0061ff", "#222628", "#38bdf8", "#8b5cf6", "#ec4899"];
    let hash = 0;
    for (let i = 0; i < (title || "").length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };

  return (
    <div className="app-viewport-wrapper">
      <div className="portal-board-container">
        {/* COLUMN 1: SIDEBAR */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          matchCount={matches.length}
        />

        {/* TAB: DISCOVER (3-COLUMN LAYOUT) */}
        {activeTab === "discover" && (
          <>
            {/* COLUMN 2: JOBS / PROFILES LIST FEED */}
            <div className="portal-feed-panel">
              <div className="feed-search-bar">
                <FiSearch style={{ color: "var(--text-muted)", fontSize: "16px" }} />
                <input
                  type="text"
                  placeholder="IT Jobs in India / Remote..."
                  className="search-input-field"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="search-filter-icon" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <FiSliders style={{ fontSize: "14px" }} />
                </div>
              </div>

              <div className="filter-chips-row">
                {["New", "Hot", "Near", "Remote", "All"].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`filter-pill ${filterTag === tab ? "active" : ""}`}
                    onClick={() => setFilterTag(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", margin: "4px 0 8px", fontSize: "0.78rem", color: "var(--text-muted)", background: "#f8fafc", borderRadius: 8, border: "1px solid #f1f5f9" }}>
                <span>Keyboard: Right for Match, Left for Pass, Space to Peek</span>
                {swipeHistory.length > 0 && (
                  <button
                    type="button"
                    onClick={handleUndo}
                    style={{ background: "#ffffff", border: "1px solid #cbd5e1", borderRadius: "6px", padding: "2px 8px", fontSize: "0.72rem", cursor: "pointer", color: "var(--text-main)", fontWeight: 600 }}
                  >
                    Undo ({swipeHistory.length})
                  </button>
                )}
              </div>

              <div className="feed-cards-scroll">
                {loadingProfiles ? (
                  <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)", fontSize: "0.9rem" }}>
                    Loading available opportunities...
                  </div>
                ) : filteredProfiles.length === 0 ? (
                  <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-muted)" }}>
                    <div style={{ marginBottom: "12px" }}>
                      <FiCheckCircle style={{ fontSize: "2rem", color: "#0061ff" }} />
                    </div>
                    <p style={{ fontWeight: 600, color: "var(--text-main)" }}>No more cards</p>
                    <p style={{ fontSize: "0.82rem", margin: "4px 0 16px" }}>You have reviewed all available profiles</p>
                    <button
                      type="button"
                      className="filter-pill active"
                      onClick={fetchProfiles}
                    >
                      Reload Deck
                    </button>
                  </div>
                ) : (
                  filteredProfiles.map((p, idx) => {
                    const isSelected = selectedProfile?._id === p._id;
                    const logoBg = getBrandColor(p.title || p.name);
                    const isEmployer = p.userType === "employer";
                    const initial = p.company ? p.company[0] : p.name ? p.name[0] : "S";

                    return (
                      <div
                        key={p._id}
                        className={`listing-card-item ${isSelected ? "selected" : ""}`}
                        onClick={() => setSelectedProfileIndex(idx)}
                      >
                        <div className="listing-main-info">
                          <h4 className="listing-title">
                            {p.title || (isEmployer ? "Developer Opening" : p.name)}
                          </h4>
                          <p className="listing-company">
                            {p.company || p.name} • {p.location || "Remote"}
                          </p>
                          <div className="listing-salary">
                            {p.salary || "$1,200 - $1,500"}
                          </div>
                          <div className="listing-tags-row">
                            <span className="mini-tag-pill">Remote</span>
                            <span className="mini-tag-pill">IT</span>
                            {p.skills && p.skills[0] && (
                              <span className="mini-tag-pill">{p.skills[0]}</span>
                            )}
                          </div>
                        </div>

                        <div className="listing-action-col">
                          <div className="company-logo-circle" style={{ background: logoBg }}>
                            {initial}
                          </div>
                          <div className="card-select-arrow">→</div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* COLUMN 3: DETAILED PREVIEW & SWIPE CARD */}
            <div className="portal-detail-panel">
              {selectedProfile ? (
                <>
                  <button
                    type="button"
                    className="detail-star-btn"
                    onClick={() => toggleBookmark(selectedProfile._id)}
                    title="Bookmark"
                    style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
                  >
                    {bookmarkedIds.has(selectedProfile._id) ? <FiStar style={{ fill: "#0061ff", stroke: "#0061ff" }} /> : <FiStar />}
                  </button>

                  <div className="detail-hero-box">
                    <div className="detail-logos-cluster">
                      <div
                        className="logo-bubble-big"
                        style={{ background: getBrandColor(selectedProfile.title || selectedProfile.name) }}
                      >
                        {selectedProfile.company ? selectedProfile.company[0] : selectedProfile.name ? selectedProfile.name[0] : "S"}
                      </div>
                      <div className="logo-bubble-fire" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <FiTrendingUp style={{ color: "#0061ff", fontSize: "14px" }} />
                      </div>
                    </div>

                    <h2 className="detail-job-title">
                      {selectedProfile.title || selectedProfile.name}
                    </h2>
                    <div className="detail-salary-rate">
                      {selectedProfile.salary || "$1,700 - $2,100"}
                    </div>

                    <div className="detail-tags-cluster">
                      <span className="detail-pill-tag">Canada</span>
                      <span className="detail-pill-tag">Toronto</span>
                      <span className="detail-pill-tag">IT</span>
                      <span className="detail-pill-tag">{selectedProfile.location || "Remote"}</span>
                    </div>
                  </div>

                  <div className="detail-section-block">
                    <h4 className="section-label-bold">Job Description</h4>
                    <p className="detail-description-copy">
                      {selectedProfile.bio ||
                        `${selectedProfile.name || selectedProfile.company} is looking for a talented, high-velocity contributor to expand our product engineering and design systems.`}
                    </p>
                    <p style={{ fontSize: "0.85rem", color: "#64748b", marginTop: "6px" }}>
                      No experience required to explore — connect with us directly, review tasks, and begin matching immediately.
                    </p>
                  </div>

                  <div className="detail-section-block">
                    <h4 className="section-label-bold">Responsibilities & Requirements</h4>
                    <ul className="responsibilities-numbered-list">
                      <li className="numbered-step-item">
                        <span className="step-number-circle">1</span>
                        <span>Developing original designs, technical interfaces, and user workflows.</span>
                      </li>
                      <li className="numbered-step-item">
                        <span className="step-number-circle">2</span>
                        <span>Creating visual concepts, architecting frontend components, and shipping code.</span>
                      </li>
                      <li className="numbered-step-item">
                        <span className="step-number-circle">3</span>
                        <span>Optimizing web performance, writing scalable APIs, and direct collaboration.</span>
                      </li>
                      <li className="numbered-step-item">
                        <span className="step-number-circle">4</span>
                        <span>Ensuring high quality, reliable delivery, and proactive communication.</span>
                      </li>
                    </ul>
                  </div>

                  {selectedProfile.skills && selectedProfile.skills.length > 0 && (
                    <div className="detail-section-block">
                      <h4 className="section-label-bold">Skills & Technologies</h4>
                      <div className="detail-tags-cluster" style={{ justifyContent: "flex-start" }}>
                        {selectedProfile.skills.map((s, i) => (
                          <span key={i} className="detail-pill-tag" style={{ background: "#e0f2fe", color: "#0369a1" }}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="detail-actions-bar">
                    <button
                      type="button"
                      className="btn-pass-action"
                      onClick={() => handleSkip(selectedProfile)}
                    >
                      <FiX style={{ marginRight: "6px", fontSize: "15px" }} /> Pass
                    </button>
                    <button
                      type="button"
                      className="btn-match-action"
                      onClick={() => handleMatch(selectedProfile)}
                    >
                      <FiCheck style={{ marginRight: "6px", fontSize: "15px" }} /> Send Resume / Match
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ margin: "auto", textAlign: "center", color: "var(--text-muted)" }}>
                  <div style={{ marginBottom: "12px" }}>
                    <FiBriefcase style={{ fontSize: "2.5rem", color: "#0061ff" }} />
                  </div>
                  <p style={{ fontWeight: 600, color: "var(--text-main)" }}>Select a job or candidate to inspect</p>
                  <p style={{ fontSize: "0.85rem" }}>Click any card from the middle feed to view full details</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* TAB: MESSAGES (SPAN 2 COLUMNS) */}
        {activeTab === "messages" && (
          <div className="portal-chat-stage">
            <div className="chat-rooms-pane">
              <div className="rooms-pane-header">Messages ({matches.length})</div>
              <ul className="rooms-list-scroll">
                {matches.length === 0 ? (
                  <li style={{ padding: "2rem", color: "var(--text-muted)", fontSize: "0.85rem", textAlign: "center" }}>
                    No matches yet. Match with someone to start chatting!
                  </li>
                ) : (
                  matches.map((m) => {
                    const partner = getMatchPartner(m);
                    if (!partner) return null;
                    const isSelected = activeMatch?._id === m._id;
                    const initial = partner.name ? partner.name[0].toUpperCase() : "M";

                    return (
                      <li
                        key={m._id}
                        className={`room-contact-card ${isSelected ? "active" : ""}`}
                        onClick={() => setActiveMatch(m)}
                      >
                        <div className="company-logo-circle" style={{ width: 38, height: 38, background: "#222628" }}>
                          {initial}
                        </div>
                        <div style={{ overflow: "hidden" }}>
                          <div style={{ fontWeight: 700, color: "var(--text-main)", fontSize: "0.92rem" }}>
                            {partner.name}
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {partner.title || (partner.userType === "employer" ? "Employer" : "Candidate")}
                          </div>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>

            <div className="chat-conversation-pane">
              {activeMatch ? (
                <>
                  {(() => {
                    const partner = getMatchPartner(activeMatch);
                    return (
                      <div className="conversation-header-bar" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div className="company-logo-circle" style={{ width: 36, height: 36, background: "#222628" }}>
                            {partner?.name ? partner.name[0].toUpperCase() : "M"}
                          </div>
                          <div>
                            <div style={{ fontWeight: 800, color: "var(--text-main)", fontSize: "0.95rem" }}>
                              {partner?.name}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "2px" }}>
                              <span style={{ fontSize: "0.75rem", color: "#0061ff", fontWeight: 600 }}>
                                {activeMatch.stage === "chatting" ? "In Conversation" : "Mutual Match"}
                              </span>
                              <span style={{ fontSize: "0.72rem", background: "rgba(0, 97, 255, 0.08)", color: "#0061ff", padding: "2px 8px", borderRadius: "6px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                                <FiClock style={{ fontSize: "12px" }} /> {getRemainingHours(activeMatch.expiresAt)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            type="button"
                            className="filter-pill"
                            style={{ fontSize: "0.75rem", padding: "6px 12px", background: "#f1f5f9", border: "1px solid #cbd5e1", display: "inline-flex", alignItems: "center" }}
                            onClick={() => setMessageInput("Would you be open for a 20-min intro call this week? Let me know what time works best.")}
                          >
                            <FiCalendar style={{ marginRight: 6 }} /> Schedule Call
                          </button>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="conversation-scroll-area">
                    {messages.length === 0 ? (
                      <div style={{ margin: "auto", textAlign: "center", color: "var(--text-muted)", fontSize: "0.9rem", maxWidth: 420 }}>
                        <div style={{ marginBottom: "12px" }}>
                          <FiUsers style={{ fontSize: "2rem", color: "#0061ff" }} />
                        </div>
                        <strong style={{ color: "var(--text-main)", display: "block" }}>Mutual Match Confirmed</strong>
                        <p style={{ margin: "4px 0 16px", fontSize: "0.82rem" }}>
                          Break the ice with one click to beat the 48-hour response countdown:
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                          {[
                            `Hey! Impressed by your stack. Open for a quick 15-min chat?`,
                            "Hi! Loved your profile background. What technical challenges are you currently focused on?",
                            "Hey there! Let's schedule a time to connect."
                          ].map((prompt, i) => (
                            <button
                              key={i}
                              type="button"
                              style={{
                                background: "#ffffff",
                                border: "1px solid #e2e8f0",
                                padding: "10px 14px",
                                borderRadius: "10px",
                                fontSize: "0.82rem",
                                color: "#0f172a",
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                              onClick={() => setMessageInput(prompt)}
                            >
                              "{prompt}"
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      messages.map((msg) => {
                        const isSentByMe =
                          msg.sender === user?._id || msg.sender?._id === user?._id;

                        return (
                          <div
                            key={msg._id}
                            className={`chat-bubble-portal ${isSentByMe ? "sent" : "received"}`}
                          >
                            <div>{msg.content}</div>
                            <span style={{ fontSize: "0.7rem", opacity: 0.65, display: "block", marginTop: "4px", textAlign: "right" }}>
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                        );
                      })
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <form className="chat-input-row" onSubmit={handleSendMessage}>
                    <input
                      type="text"
                      placeholder="Type a message..."
                      className="chat-text-input"
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                    />
                    <button type="submit" className="chat-send-btn">
                      Send
                    </button>
                  </form>
                </>
              ) : (
                <div style={{ margin: "auto", textAlign: "center", color: "var(--text-muted)" }}>
                  <div style={{ marginBottom: "12px" }}>
                    <FiMessageSquare style={{ fontSize: "2.5rem", color: "#0061ff" }} />
                  </div>
                  <p style={{ fontWeight: 600 }}>Select a chat on the left</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: MATCHES */}
        {activeTab === "matches" && (
          <div className="portal-detail-panel" style={{ gridColumn: "2 / span 2" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.2rem" }}>
              Mutual Connections ({matches.length})
            </h3>
            {matches.length === 0 ? (
              <div style={{ textAlign: "center", padding: "4rem", color: "var(--text-muted)" }}>
                <p style={{ fontWeight: 600 }}>No mutual matches yet</p>
                <p style={{ fontSize: "0.85rem", marginTop: "4px" }}>
                  Keep swiping on the Dashboard to make your first match!
                </p>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
                {matches.map((m) => {
                  const partner = getMatchPartner(m);
                  if (!partner) return null;
                  const initial = partner.name ? partner.name[0].toUpperCase() : "M";

                  return (
                    <div
                      key={m._id}
                      style={{
                        background: "#f8fafc",
                        border: "1px solid var(--panel-border)",
                        borderRadius: "20px",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div className="company-logo-circle" style={{ background: "#222628" }}>
                          {initial}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "1rem" }}>{partner.name}</div>
                          <div style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                            {partner.title || (partner.userType === "employer" ? "Employer" : "Candidate")}
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="btn-match-action"
                        style={{ padding: "10px", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                        onClick={() => openChatWithMatch(m)}
                      >
                        <FiMessageSquare style={{ marginRight: 6 }} /> Open Chat
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB: PROFILE */}
        {activeTab === "profile" && (
          <div className="portal-detail-panel" style={{ gridColumn: "2 / span 2" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, marginBottom: "1.2rem" }}>
              Edit Profile & Preferences
            </h3>

            {profileSuccess && (
              <div style={{ background: "rgba(0, 97, 255, 0.08)", color: "#0061ff", border: "1px solid rgba(0, 97, 255, 0.2)", padding: "12px 18px", borderRadius: "14px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
                <FiCheckCircle /> Profile updated successfully!
              </div>
            )}

            <form onSubmit={handleProfileSave} style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: 600 }}>
              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  Full Name
                </label>
                <input
                  type="text"
                  className="search-input-field"
                  style={{ background: "#f4f6f8", width: "100%", padding: "12px 16px", borderRadius: "14px" }}
                  value={profileForm.name}
                  onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  Headline / Role Title
                </label>
                <input
                  type="text"
                  className="search-input-field"
                  style={{ background: "#f4f6f8", width: "100%", padding: "12px 16px", borderRadius: "14px" }}
                  value={profileForm.title}
                  onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  Bio / Summary
                </label>
                <textarea
                  className="search-input-field"
                  style={{ background: "#f4f6f8", width: "100%", padding: "12px 16px", borderRadius: "14px", minHeight: "80px" }}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  Skills (comma-separated)
                </label>
                <input
                  type="text"
                  className="search-input-field"
                  style={{ background: "#f4f6f8", width: "100%", padding: "12px 16px", borderRadius: "14px" }}
                  value={profileForm.skills}
                  onChange={(e) => setProfileForm({ ...profileForm, skills: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: "0.82rem", fontWeight: 700, color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                  Target Compensation
                </label>
                <input
                  type="text"
                  className="search-input-field"
                  style={{ background: "#f4f6f8", width: "100%", padding: "12px 16px", borderRadius: "14px" }}
                  value={profileForm.salary}
                  onChange={(e) => setProfileForm({ ...profileForm, salary: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="btn-match-action"
                style={{ width: "fit-content", padding: "14px 32px" }}
                disabled={savingProfile}
              >
                {savingProfile ? "Saving..." : "Save Changes"}
              </button>
            </form>
          </div>
        )}
      </div>

      {/* MATCH CELEBRATION MODAL */}
      {celebrationMatch && (
        <div className="portal-celebration-overlay">
          <div className="portal-celebration-card">
            <div className="celebration-heart-badge">
              <FiCheckCircle style={{ fontSize: "2rem" }} />
            </div>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--text-main)", marginBottom: "8px" }}>
              It's a Match!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "16px" }}>
              You and <strong>{celebrationMatch.partner?.name}</strong> both expressed mutual interest.
            </p>

            <div style={{ background: "rgba(0, 97, 255, 0.08)", border: "1px solid rgba(0, 97, 255, 0.2)", borderRadius: "10px", padding: "10px 14px", fontSize: "0.82rem", color: "#0061ff", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <FiClock style={{ fontSize: "14px" }} /> 48-Hour Response Window: Start a conversation to keep connection active
            </div>

            {celebrationMatch.icebreakers && celebrationMatch.icebreakers.length > 0 && (
              <div style={{ textAlign: "left", marginBottom: "20px" }}>
                <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--text-muted)", letterSpacing: "0.05em", textTransform: "uppercase" }}>
                  Recommended Conversation Starter:
                </span>
                <div
                  style={{
                    background: "#f4f6f8",
                    borderRadius: "12px",
                    padding: "10px 14px",
                    marginTop: "6px",
                    fontSize: "0.88rem",
                    color: "var(--text-main)",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const icebreaker = celebrationMatch.icebreakers[0]?.prompt;
                    const matchToOpen = celebrationMatch.match;
                    setCelebrationMatch(null);
                    openChatWithMatch(matchToOpen);
                    if (icebreaker) setMessageInput(icebreaker);
                  }}
                >
                  "{celebrationMatch.icebreakers[0]?.prompt}"
                  <span style={{ display: "block", fontSize: "0.72rem", color: "#0061ff", marginTop: "4px" }}>Click to use this prompt →</span>
                </div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <button
                type="button"
                className="btn-match-action"
                style={{ display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                onClick={() => {
                  const matchToOpen = celebrationMatch.match;
                  const icebreaker = celebrationMatch.icebreakers?.[0]?.prompt;
                  setCelebrationMatch(null);
                  openChatWithMatch(matchToOpen);
                  if (icebreaker) setMessageInput(icebreaker);
                }}
              >
                <FiMessageSquare style={{ marginRight: 6 }} /> Open Chat
              </button>
              <button
                type="button"
                className="btn-pass-action"
                onClick={() => setCelebrationMatch(null)}
              >
                Keep Browsing
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QUICK PEEK / DEEP SHEET INSPECT MODAL (Space or ArrowUp) */}
      {showInspect && selectedProfile && (
        <div className="portal-celebration-overlay" onClick={() => setShowInspect(false)}>
          <div
            className="portal-celebration-card"
            style={{ maxWidth: 520, textAlign: "left" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #edf0f2", paddingBottom: 12, marginBottom: 16 }}>
              <div>
                <h3 style={{ margin: 0, fontSize: "1.2rem", fontWeight: 800, color: "var(--text-main)" }}>
                  {selectedProfile.title || selectedProfile.name}
                </h3>
                <span style={{ fontSize: "0.82rem", color: "var(--text-muted)" }}>
                  {selectedProfile.company || "Independent"} · {selectedProfile.location || "Remote"}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowInspect(false)}
                style={{ background: "transparent", border: "none", fontSize: "18px", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <FiX />
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, fontSize: "0.9rem" }}>
              <div>
                <strong style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 2 }}>
                  Compensation
                </strong>
                <span style={{ color: "#0061ff", fontWeight: 700, fontSize: "1rem" }}>
                  {selectedProfile.salary || "₹45–60 LPA / Competitive"}
                </span>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 2 }}>
                  Background & Culture
                </strong>
                <p style={{ margin: 0, color: "var(--text-main)", lineHeight: 1.5 }}>
                  {selectedProfile.bio || "Full-stack engineer with proven experience designing resilient cloud services and low-latency frontend applications."}
                </p>
              </div>
              <div>
                <strong style={{ display: "block", fontSize: "0.78rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: 4 }}>
                  Verified Skills
                </strong>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {(selectedProfile.skills?.length ? selectedProfile.skills : ["React", "TypeScript", "Node.js"]).map((s) => (
                    <span key={s} style={{ background: "#edf2f7", padding: "4px 10px", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600, color: "#1e293b" }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
              <button
                type="button"
                className="btn-pass-action"
                style={{ flex: 1 }}
                onClick={() => {
                  setShowInspect(false);
                  handleSkip(selectedProfile);
                }}
              >
                Pass (←)
              </button>
              <button
                type="button"
                className="btn-match-action"
                style={{ flex: 1 }}
                onClick={() => {
                  setShowInspect(false);
                  handleMatch(selectedProfile);
                }}
              >
                Match (→)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
