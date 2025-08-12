import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./auth.css";
import axios from "axios";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const API = process.env.REACT_APP_API_URL || "http://localhost:5001";

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password,
      });

      const { token, userType, user } = res.data;
       


      // Save token + userType in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user.userType", res.data.user.userType);
      //  localStorage.setItem("user.name", res.data.user.name);
      localStorage.setItem("user", JSON.stringify(user));

      // Navigate to respective dashboard
      if (user.userType === "jobseeker") {
        navigate("/Jobseeker/Dashboard");
      } else if (user.userType === "employer") {
        navigate("/Employer/Dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    }
  };
  

  return (
    <>
    
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
    </>
  );
};

export default Login;
