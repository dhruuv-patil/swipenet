import React from 'react';
import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {
  return (
    <footer className="portal-footer-wrapper">
      <div className="portal-footer-inner">
        <div>
          <div className="footer-brand-title">SwipeNet</div>
          <p className="footer-brand-desc">
            The modern job portal and matchmaking platform for tech talents and fast-moving teams.
          </p>
        </div>

        <div>
          <div className="footer-col-title">For Job Seekers</div>
          <ul className="footer-links-list">
            <li><Link to="/signup?role=jobseeker">Browse Remote Roles</Link></li>
            <li><Link to="/signup?role=jobseeker">Tech Gigs & Internships</Link></li>
            <li><Link to="/signup?role=jobseeker">Direct Chat with Hiring Teams</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">For Employers</div>
          <ul className="footer-links-list">
            <li><Link to="/signup?role=employer">Post Tech Openings</Link></li>
            <li><Link to="/signup?role=employer">Candidate Discovery Feed</Link></li>
            <li><Link to="/signup?role=employer">Direct In-App Messages</Link></li>
          </ul>
        </div>

        <div>
          <div className="footer-col-title">Platform</div>
          <ul className="footer-links-list">
            <li><Link to="/dashboard">Explore Live Dashboard</Link></li>
            <li><span>Socket.io Real-Time Protocol</span></li>
            <li><span>Privacy & Terms</span></li>
          </ul>
        </div>
      </div>

      <div className="portal-footer-bottom">
        <span>© {new Date().getFullYear()} SwipeNet. All rights reserved.</span>
        <span>Modern Job Portal Experience</span>
      </div>
    </footer>
  );
};

export default Footer;
