import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Important!
import './homenavbar.css';

const HomeNavbar = () => {
  return (
    <div class="navbar">
      <div className="nav-left">
        <h2 className="logoone">Swipe</h2>
        <h2 className="logotwo">Net<span>.</span></h2>
      </div>
      <div className="nav-right">
        <Link to="/login">
          <button className="login-btn">Login</button>
        </Link>
        <Link to="/signup">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default HomeNavbar;
