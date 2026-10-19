import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../services/api";
import { FiUser, FiBriefcase } from "react-icons/fi";
import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") === "employer" ? "employer" : "jobseeker";

  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(initialRole);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !userType) {
      setError("Please fill out all required fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.register({
        name,
        email,
        password,
        userType,
        title,
        location,
      });

      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-terminal">
        <div className="terminal-header">
          <span>SwipeNet Registration</span>
          <span style={{ color: '#0061ff', fontWeight: 600 }}>Create Account</span>
        </div>

        <form className="terminal-body" onSubmit={handleSubmit}>
          <div>
            <h1 className="terminal-title">Join SwipeNet</h1>
            <p className="terminal-sub">Create your profile to start matching</p>
          </div>

          {error && <div className="terminal-alert">{error}</div>}

          <div>
            <label className="field-label">I am joining as a</label>
            <div className="role-picker-grid">
              <label className={`role-picker-card ${userType === "jobseeker" ? "selected" : ""}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="userType"
                  value="jobseeker"
                  checked={userType === "jobseeker"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <FiUser style={{ fontSize: '15px' }} /> Candidate
              </label>

              <label className={`role-picker-card ${userType === "employer" ? "selected" : ""}`} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <input
                  type="radio"
                  name="userType"
                  value="employer"
                  checked={userType === "employer"}
                  onChange={(e) => setUserType(e.target.value)}
                />
                <FiBriefcase style={{ fontSize: '15px' }} /> Employer
              </label>
            </div>
          </div>

          <div>
            <label className="field-label">
              {userType === "employer" ? "Company / Recruiter Name" : "Full Name"}
            </label>
            <input
              type="text"
              placeholder={userType === "employer" ? "e.g. TechVision Labs" : "e.g. Alex Morgan"}
              className="terminal-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label">Work Email</label>
            <input
              type="email"
              placeholder="name@domain.com"
              className="terminal-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label">Password</label>
            <input
              type="password"
              placeholder="••••••••••••"
              className="terminal-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="field-label">
              {userType === "employer" ? "Role Title Hiring For" : "Primary Headline / Role"}
            </label>
            <input
              type="text"
              placeholder={userType === "employer" ? "e.g. Full-Stack Architect" : "e.g. React / TypeScript Specialist"}
              className="terminal-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="field-label">Location</label>
            <input
              type="text"
              placeholder="e.g. Pune, Bengaluru, Remote"
              className="terminal-input"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>

          <button type="submit" className="terminal-submit-btn" disabled={loading}>
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

          <div className="terminal-footer-links">
            Already have an account?{" "}
            <Link to="/login" className="terminal-link">
              Sign in here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
