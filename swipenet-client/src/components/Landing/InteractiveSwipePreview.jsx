import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiX, FiCheck, FiCheckCircle, FiClock, FiShield, FiArrowRight } from 'react-icons/fi';
import './InteractiveSwipePreview.css';

const SAMPLE_CARDS = [
  {
    id: 1,
    role: 'Senior Distributed Systems Architect',
    company: 'HyperScale Labs',
    salary: '₹50–65 LPA',
    location: 'Remote · India / SEA',
    skills: ['Go', 'Kafka', 'Kubernetes', 'Raft Consensus'],
    proof: 'Author of open-source Raft cluster engine (4.2k GitHub stars)',
    matchFit: 96,
  },
  {
    id: 2,
    role: 'Staff Frontend Engineer',
    company: 'Veloce Studio',
    salary: '$165,000 - $185,000',
    location: 'Remote · Global',
    skills: ['React 19', 'TypeScript', 'WebGL', 'Design Systems'],
    proof: 'Built 60fps design system powering 3.8M MAU',
    matchFit: 92,
  },
  {
    id: 3,
    role: 'Lead ML Infrastructure Engineer',
    company: 'Aether Inference Co',
    salary: '₹55–70 LPA',
    location: 'Hybrid · Bengaluru',
    skills: ['PyTorch', 'vLLM', 'CUDA', 'Triton'],
    proof: 'Reduced model inference p99 latency by 44%',
    matchFit: 94,
  },
];

export const InteractiveSwipePreview = () => {
  const [cards, setCards] = useState(SAMPLE_CARDS);
  const [matchPopup, setMatchPopup] = useState(null);
  const [inspectCard, setInspectCard] = useState(null);
  const navigate = useNavigate();

  const handleSwipe = (direction, card) => {
    setCards((prev) => prev.filter((c) => c.id !== card.id));
    if (direction === 'right') {
      setMatchPopup(card);
    }
  };

  const handleReset = () => {
    setCards(SAMPLE_CARDS);
    setMatchPopup(null);
    setInspectCard(null);
  };

  const currentCard = cards[0];

  return (
    <section className="swipe-sim-section">
      <div className="swipe-sim-header">
        <span className="swipe-sim-tag">Interactive Preview</span>
        <h2>Experience the High-Signal Discovery Loop</h2>
        <p>No 8-page resumes. No recruiter inmail fluff. Test drive the swipe engine below.</p>
      </div>

      <div className="swipe-sim-container">
        {currentCard ? (
          <div className="sim-deck-wrap">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={currentCard.id}
                className="sim-card"
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ x: 260, opacity: 0, rotate: 10 }}
                transition={{ duration: 0.25 }}
              >
                <div className="sim-card-top">
                  <div>
                    <span className="sim-card-badge">Verified Role</span>
                    <h3 className="sim-card-title">{currentCard.role}</h3>
                    <div className="sim-card-co">{currentCard.company} · {currentCard.location}</div>
                  </div>
                  <div className="sim-card-score">
                    <b>{currentCard.matchFit}%</b>
                    <small>Fit</small>
                  </div>
                </div>

                <div className="sim-card-salary">
                  <span className="sim-salary-lbl">Mandatory Salary Band</span>
                  <strong className="sim-salary-val">{currentCard.salary}</strong>
                </div>

                <div className="sim-card-skills">
                  <div className="sim-skills-hdr">Verified Stack Requirements</div>
                  <div className="sim-skills-pills">
                    {currentCard.skills.map((s) => (
                      <span key={s} className="sim-skill-pill">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="sim-card-proof">
                  <FiShield className="sim-proof-icon" />
                  <div>
                    <small>Verified Proof-of-Work</small>
                    <p>{currentCard.proof}</p>
                  </div>
                </div>

                <div className="sim-actions-row">
                  <button
                    type="button"
                    className="sim-btn sim-pass"
                    onClick={() => handleSwipe('left', currentCard)}
                    title="Pass (Left Arrow)"
                  >
                    <FiX /> Pass
                  </button>
                  <button
                    type="button"
                    className="sim-btn sim-inspect"
                    onClick={() => setInspectCard(currentCard)}
                    title="Inspect Dossier (Space)"
                  >
                    <FiSearch /> Inspect
                  </button>
                  <button
                    type="button"
                    className="sim-btn sim-like"
                    onClick={() => handleSwipe('right', currentCard)}
                    title="Like / Match (Right Arrow)"
                  >
                    <FiCheck /> Match
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <div className="sim-empty-state">
            <FiCheckCircle style={{ fontSize: 44, color: '#0061ff', marginBottom: 12 }} />
            <h3>You've Reviewed the Preview Deck</h3>
            <p>Ready to unlock verified engineers and high-paying roles?</p>
            <div className="sim-empty-actions">
              <button type="button" className="sim-btn-primary" onClick={() => navigate('/signup')}>
                Create Free Profile <FiArrowRight style={{ marginLeft: 6 }} />
              </button>
              <button type="button" className="sim-btn-ghost" onClick={handleReset}>
                Reset Preview Deck
              </button>
            </div>
          </div>
        )}

        {/* Modal: Match Celebration */}
        {matchPopup && (
          <div className="sim-modal-overlay" onClick={() => setMatchPopup(null)}>
            <motion.div
              className="sim-match-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="sim-modal-chip">Mutual Opt-in Confirmed</span>
              <h2>It's a Match</h2>
              <p>
                Both you and <strong>{matchPopup.company}</strong> expressed mutual interest for <strong>{matchPopup.role}</strong>.
              </p>
              <div className="sim-modal-countdown">
                <FiClock style={{ verticalAlign: -2, marginRight: 6 }} />
                <strong>47:59:12</strong> response window active
              </div>
              <div className="sim-modal-icebreaker">
                <small>Recommended Icebreaker</small>
                <div className="sim-icebreaker-box">
                  "Hey! Noticed you're scaling with {matchPopup.skills[0]}. Open for a quick 15-min intro this week?"
                </div>
              </div>
              <div className="sim-modal-btn-row">
                <button
                  type="button"
                  className="sim-btn-primary"
                  onClick={() => navigate('/signup')}
                >
                  Join SwipeNet & Chat Now
                </button>
                <button
                  type="button"
                  className="sim-btn-ghost"
                  onClick={() => setMatchPopup(null)}
                >
                  Keep Testing Deck
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Modal: Deep Sheet Inspect */}
        {inspectCard && (
          <div className="sim-modal-overlay" onClick={() => setInspectCard(null)}>
            <motion.div
              className="sim-inspect-sheet"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sim-sheet-header">
                <h3>{inspectCard.role}</h3>
                <button type="button" className="sim-sheet-close" onClick={() => setInspectCard(null)}>
                  <FiX />
                </button>
              </div>
              <div className="sim-sheet-body">
                <div><strong>Company:</strong> {inspectCard.company}</div>
                <div><strong>Compensation:</strong> {inspectCard.salary}</div>
                <div><strong>Location:</strong> {inspectCard.location}</div>
                <div><strong>Engineering Culture:</strong> Async-first, trunk-based development, 99.98% SLA, automated staging pipelines.</div>
                <div><strong>Proof Item:</strong> {inspectCard.proof}</div>
              </div>
              <button
                type="button"
                className="sim-btn-primary"
                style={{ width: '100%', marginTop: 20 }}
                onClick={() => {
                  setInspectCard(null);
                  handleSwipe('right', inspectCard);
                }}
              >
                Match this Role
              </button>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
};

export default InteractiveSwipePreview;
