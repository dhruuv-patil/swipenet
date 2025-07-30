import React from 'react';
import './homecard.css'; 
const Card = () => {
  return (
    <div class="job-card">
      <div class="job-header">
        <h3 class="job-title">Senior Frontend Developer</h3>
        <p class="company-name">New TechVision Inc.</p>
        
        <div class="rating">
          
        </div>
        
        <p class="review">"Great company culture with competitive pay and excellent benefits package"</p>
      </div>

      <div class="job-details">
        <div class="detail-item">
          <span>Hinjewadi Phase-1, Pune (Remote)</span>
        </div>
        <div class="detail-item">
          <span>Rs.20000-30000</span>
        </div>
        <div class="detail-item">
          <span>Team of 12</span>
        </div>
        <div class="detail-item">
          <span>Benefits</span>
        </div>
      </div>

      <div class="action-buttons">
        <button class="skip-btn">Skip</button>
        <button class="match-btn">Match</button>
      </div>
    </div>
  );
};

export default Card;