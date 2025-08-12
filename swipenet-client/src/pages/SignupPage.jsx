import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(""); // ✅ Employer or Job Seeker
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

  console.log({ name, email, password, userType });

    if (!userType) {
      setError("Please select Employer or Job Seeker");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5001/api/auth/register", {
        name,
        email,
        password,
        userType,
      });
      

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("user.userType", res.data.userType);
      console.log("Signup successful, redirecting...");
      if (userType === "jobseeker") {
        navigate("/Jobseeker/Dashboard");
      } else if (userType === "employer") {
        navigate("/Employer/Dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="welcome-heading">
          Create Account<br />
          on <span className="highlight">SwipeNet</span>
        </h2>
        <p className="subtext">Join and begin your journey</p>

        <input
          type="text"
          placeholder="Name"
          className="auth-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <div className="user-type-selection">
          <label>
            <input
              type="radio"
              name="userType"
              value="jobseeker"
              checked={userType === "jobseeker"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Job Seeker
          </label>

          <label>
            <input
              type="radio"
              name="userType"
              value="employer"
              checked={userType === "employer"}
              onChange={(e) => setUserType(e.target.value)}
            />
            Employer
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit" className="auth-button">Sign Up</button>

        <p className="bottom-text">
          Already have an account? <Link to="/login" className="link">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
