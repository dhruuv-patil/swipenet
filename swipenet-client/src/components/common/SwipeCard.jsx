import React from 'react';
import Card from '../HomeCard/HomeCard'
function SwipeCard ({title,company,review,location,salary,benefits,teamSize,onSkip,onMatch})  {
  return (
    <div className="job-card">
      <div className="job-header">
        <h3 className="job-title">{title}</h3>
        <p className="company-name">{company}</p>
        <p className="review">"{review}"</p>
      </div>

      <div className="job-details">
        <div className="detail-item"><span>{location}</span></div>
        <div className="detail-item"><span>{salary}</span></div>
        <div className="detail-item"><span>{teamSize}</span></div>
        <div className="detail-item"><span>{benefits}</span></div>
      </div>

      <div className="action-buttons">
        <button className="skip-btn" onClick={onSkip}>Skip</button>
        <button className="match-btn" onClick={onMatch}>Match</button>
      </div>
    </div>
  );
};

export default SwipeCard;