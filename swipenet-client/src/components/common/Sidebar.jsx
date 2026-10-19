import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiMail, FiBriefcase, FiUser, FiLogOut } from 'react-icons/fi';
import './dashboard.css';

const Sidebar = ({ activeTab, setActiveTab, matchCount = 0 }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const displayName = user?.name ? user.name.split(' ')[0] : 'George';
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : 'G';
  const isEmployer = user?.userType === 'employer';

  return (
    <aside className="portal-sidebar">
      <div>
        <div className="sidebar-user-header">
          <div className="user-avatar-ring">
            <div className="user-avatar-img">
              {initial}
            </div>
          </div>
          <h3 className="greeting-text">Hi, {displayName}!</h3>
          <p className="greeting-subtext">
            {isEmployer ? 'Top talent is waiting for you!' : 'Your job is waiting for you!'}
          </p>
        </div>

        <ul className="sidebar-nav-list">
          <li>
            <button
              type="button"
              className={`nav-pill-btn ${activeTab === 'discover' ? 'active' : ''}`}
              onClick={() => setActiveTab('discover')}
            >
              <FiHome className="nav-icon" />
              <span>Dashboard</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`nav-pill-btn ${activeTab === 'messages' ? 'active' : ''}`}
              onClick={() => setActiveTab('messages')}
            >
              <FiMail className="nav-icon" />
              <span>Messages</span>
              {matchCount > 0 && <span className="nav-badge-white">{matchCount}</span>}
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`nav-pill-btn ${activeTab === 'matches' ? 'active' : ''}`}
              onClick={() => setActiveTab('matches')}
            >
              <FiBriefcase className="nav-icon" />
              <span>{isEmployer ? 'Applicants' : 'Jobs / Matches'}</span>
            </button>
          </li>

          <li>
            <button
              type="button"
              className={`nav-pill-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <FiUser className="nav-icon" />
              <span>Profile</span>
            </button>
          </li>
        </ul>

        {/* Circular Donut Progress Widget */}
        <div className="sidebar-donut-card">
          <div className="donut-chart-wrapper">
            <svg width="100" height="100" viewBox="0 0 100 100">
              {/* Background track */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#373d40"
                strokeWidth="10"
              />
              {/* Segment 1: Blue accent (32%) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#0061ff"
                strokeWidth="10"
                strokeDasharray="76.4 238.7"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
              {/* Segment 2: Light Sky Blue (20%) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="10"
                strokeDasharray="47.7 238.7"
                strokeDashoffset="-76.4"
                strokeLinecap="round"
              />
              {/* Segment 3: Deep Slate Accent (23%) */}
              <circle
                cx="50"
                cy="50"
                r="38"
                fill="none"
                stroke="#79c0ff"
                strokeWidth="10"
                strokeDasharray="54.9 238.7"
                strokeDashoffset="-124.1"
                strokeLinecap="round"
              />
            </svg>
            <div className="donut-center-pct">75%</div>
          </div>

          <div className="donut-legend-row">
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#0061ff' }}></span>
              <span>32%</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#38bdf8' }}></span>
              <span>20%</span>
            </div>
            <div className="legend-item">
              <span className="legend-dot" style={{ background: '#79c0ff' }}></span>
              <span>23%</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <button type="button" className="sidebar-logout-link" onClick={handleLogout}>
          <FiLogOut style={{ fontSize: '1.1rem' }} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
