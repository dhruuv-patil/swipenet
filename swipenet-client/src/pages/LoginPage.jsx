import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { authApi } from "../services/api";
import { FiUser, FiBriefcase } from "react-icons/fi";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password");
      return;
    }

    setLoading(true);
    try {
      const res = await authApi.login({ email, password });
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail, demoPassword) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
    setLoading(true);
    try {
      const res = await authApi.login({ email: demoEmail, password: demoPassword });
      login(res.data.user, res.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Demo login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form-terminal">
        <div className="terminal-header">
          <span>SwipeNet Secure Access</span>
          <span style={{ color: '#0061ff', fontWeight: 600 }}>Ready</span>
        </div>

        <form className="terminal-body" onSubmit={handleSubmit}>
          <div>
            <h1 className="terminal-title">Sign In</h1>
            <p className="terminal-sub">Enter your credentials to access your talent dashboard</p>
          </div>

          {error && <div className="terminal-alert">{error}</div>}

          <div>
            <label className="field-label">Email Address</label>
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

          <button type="submit" className="terminal-submit-btn" disabled={loading}>
            {loading ? "Signing In..." : "Sign In →"}
          </button>

          <div className="terminal-demo-box">
            <span className="demo-legend">Quick Demo Accounts</span>
            <div className="demo-keys-grid">
              <button
                type="button"
                className="demo-key-btn"
                onClick={() => handleDemoLogin("alex.morgan@example.com", "password123")}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <FiUser style={{ fontSize: '14px' }} /> Candidate: Alex
              </button>
              <button
                type="button"
                className="demo-key-btn"
                onClick={() => handleDemoLogin("recruiter@techvision.io", "password123")}
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
              >
                <FiBriefcase style={{ fontSize: '14px' }} /> Employer: TechVision
              </button>
            </div>
          </div>

          <div className="terminal-footer-links">
            Don't have an account?{" "}
            <Link to="/signup" className="terminal-link">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
