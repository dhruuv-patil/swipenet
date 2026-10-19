import React, { useState } from 'react';
import { FiMapPin, FiX, FiCheck } from 'react-icons/fi';
import './homecard.css';

const Card = () => {
  const [statusText, setStatusText] = useState('Interactive preview');

  const handleAction = (type) => {
    if (type === 'skip') {
      setStatusText('Candidate passed');
      setTimeout(() => setStatusText('Interactive preview'), 1200);
    } else {
      setStatusText('Mutual match confirmed');
      setTimeout(() => setStatusText('Interactive preview'), 1200);
    }
  };

  return (
    <div className="artcraft-preview-card">
      <div className="preview-card-header">
        <span className="preview-card-tag">Full-Stack Opening</span>
        <span className="preview-card-loc" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <FiMapPin style={{ fontSize: '13px' }} /> Pune (Remote)
        </span>
      </div>

      <div className="preview-card-body">
        <div>
          <h3 className="preview-card-title">Senior Frontend Architect</h3>
          <p className="preview-card-sub">TechVision Labs</p>
        </div>

        <div className="preview-card-quote">
          "Building the next-generation collaborative canvas with micro-frontends and sub-millisecond local state synchronization."
        </div>

        <div className="preview-metrics-grid">
          <div className="preview-metric-box">
            <span className="metric-label">Compensation</span>
            <span className="metric-val">₹35k - ₹50k / mo</span>
          </div>
          <div className="preview-metric-box">
            <span className="metric-label">Experience</span>
            <span className="metric-val">3+ Years</span>
          </div>
          <div className="preview-metric-box">
            <span className="metric-label">Team Structure</span>
            <span className="metric-val">Team of 15</span>
          </div>
          <div className="preview-metric-box">
            <span className="metric-label">Perks</span>
            <span className="metric-val">Health + Equity</span>
          </div>
        </div>

        <div className="preview-skills-row">
          <span className="preview-skill-pill">React 19</span>
          <span className="preview-skill-pill">TypeScript</span>
          <span className="preview-skill-pill">Next.js</span>
          <span className="preview-skill-pill">Tailwind</span>
          <span className="preview-skill-pill">WebSockets</span>
        </div>
      </div>

      <div className="preview-card-actions">
        <button
          type="button"
          className="preview-action-btn btn-skip-preview"
          onClick={() => handleAction('skip')}
        >
          <FiX style={{ marginRight: '6px', fontSize: '15px' }} /> Pass
        </button>
        <button
          type="button"
          className="preview-action-btn btn-match-preview"
          onClick={() => handleAction('match')}
        >
          <FiCheck style={{ marginRight: '6px', fontSize: '15px' }} /> Match
        </button>
      </div>

      <div style={{ padding: '8px 14px', background: 'var(--bg-sunken)', borderTop: '1px solid var(--line)', textAlign: 'center' }}>
        <span style={{ fontSize: '12px', color: 'var(--muted)' }}>
          {statusText}
        </span>
      </div>
    </div>
  );
};

export default Card;