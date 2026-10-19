import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-left">
        <Link to="/" style={{ textDecoration: 'none', display: 'flex' }}>
          <h2 className="logoone">Swipe</h2>
          <h2 className="logotwo">Net<span>.</span></h2>
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/dashboard">
          <button className="dashboard-btn" style={{ background: '#3b82f6', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>
            Dashboard
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
