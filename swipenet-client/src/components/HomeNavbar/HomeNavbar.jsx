import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiX } from 'react-icons/fi';
import './homenavbar.css';

const HomeNavbar = () => {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header className="portal-navbar-wrapper">
      <nav className="portal-nav-pill">
        <Link to="/" className="nav-brand-group">
          <div className="nav-brand-logo">S</div>
          <span className="nav-brand-title">SwipeNet</span>
          <span className="nav-brand-badge">Jobs & Talent</span>
        </Link>

        <div className="nav-menu-links">
          <Link to="/dashboard" className="nav-text-link">
            Explore Deck
          </Link>
          <Link to="/signup?role=jobseeker" className="nav-text-link">
            For Job Seekers
          </Link>
          <Link to="/signup?role=employer" className="nav-text-link">
            For Employers
          </Link>
        </div>

        <div className="nav-action-buttons">
          {isAuthenticated ? (
            <>
              <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#222628' }}>
                Hi, {user?.name?.split(' ')[0] || 'User'}
              </span>
              <Link to="/dashboard" className="btn-nav-cta">
                Dashboard →
              </Link>
              <button
                type="button"
                className="btn-nav-login"
                onClick={logout}
                title="Log Out"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <FiX />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-nav-login">
                Log In
              </Link>
              <Link to="/signup" className="btn-nav-cta">
                Start Searching →
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default HomeNavbar;
