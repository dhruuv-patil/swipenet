import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./auth.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="welcome-heading">Welcome Back<br />to <span className="highlight">SwipeNet</span></h2>
        <p className="subtext">Login to continue your journey</p>
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="auth-button">Login</button>
        <p className="bottom-text">
          Don’t have an account? <Link to="/signup" className="link">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
