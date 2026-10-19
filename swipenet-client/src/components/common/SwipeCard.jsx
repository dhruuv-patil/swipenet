import React, { useState } from 'react';
import { FiMapPin, FiDollarSign, FiClock, FiUsers, FiCheckCircle, FiX, FiCheck } from 'react-icons/fi';
import './swipecard.css';

const SwipeCard = ({ profile, onSkip, onMatch }) => {
  const [animationClass, setAnimationClass] = useState('');

  if (!profile) return null;

  const handleAction = (direction) => {
    if (direction === 'left') {
      setAnimationClass('animating-left');
      setTimeout(() => {
        setAnimationClass('');
        onSkip();
      }, 300);
    } else {
      setAnimationClass('animating-right');
      setTimeout(() => {
        setAnimationClass('');
        onMatch();
      }, 300);
    }
  };

  const isEmployer = profile.userType === 'employer';
  const mainTitle = profile.title || (isEmployer ? 'Hiring Opening' : 'Software Builder');
  const subTitle = isEmployer ? (profile.company || profile.name) : profile.name;
  const badgeLabel = isEmployer ? 'Employer' : 'Candidate';

  return (
    <div className="swipe-card-wrapper">
      <div className={`swipe-card ${animationClass}`}>
        <div className="card-top-bar">
          <span className={`user-badge ${isEmployer ? 'employer' : 'jobseeker'}`}>
            {badgeLabel}
          </span>
          {profile.location && (
            <span style={{ fontSize: '12px', color: 'var(--muted)', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <FiMapPin style={{ fontSize: '13px' }} /> {profile.location}
            </span>
          )}
        </div>

        <div className="card-content-body">
          <div className="card-header-info">
            <h2 className="card-main-title">{mainTitle}</h2>
            <p className="card-sub-title">{subTitle}</p>
          </div>

          {profile.bio && (
            <div className="card-bio">
              "{profile.bio}"
            </div>
          )}

          <div className="card-meta-grid">
            {profile.salary && (
              <div className="meta-chip">
                <strong>Compensation</strong>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '3px' }}>
                  <FiDollarSign style={{ fontSize: '13px' }} /> {profile.salary}
                </span>
              </div>
            )}

            {profile.experience && (
              <div className="meta-chip">
                <strong>Experience</strong>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <FiClock style={{ fontSize: '13px' }} /> {profile.experience}
                </span>
              </div>
            )}

            {profile.teamSize && (
              <div className="meta-chip">
                <strong>{isEmployer ? 'Team Structure' : 'Availability'}</strong>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <FiUsers style={{ fontSize: '13px' }} /> {profile.teamSize}
                </span>
              </div>
            )}

            {profile.benefits && (
              <div className="meta-chip">
                <strong>Perks / Key Info</strong>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <FiCheckCircle style={{ fontSize: '13px' }} /> {profile.benefits}
                </span>
              </div>
            )}
          </div>

          {profile.skills && profile.skills.length > 0 && (
            <div className="skills-wrapper">
              <span className="skills-title">Verified Skills</span>
              <div className="skills-container">
                {profile.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="card-actions">
          <button
            type="button"
            className="action-btn skip-action"
            onClick={() => handleAction('left')}
            title="Pass (Swipe Left)"
          >
            <FiX style={{ marginRight: '6px', fontSize: '15px' }} /> Pass
          </button>
          <button
            type="button"
            className="action-btn match-action"
            onClick={() => handleAction('right')}
            title="Match (Swipe Right)"
          >
            <FiCheck style={{ marginRight: '6px', fontSize: '15px' }} /> Match
          </button>
        </div>
      </div>
    </div>
  );
};

export default SwipeCard;