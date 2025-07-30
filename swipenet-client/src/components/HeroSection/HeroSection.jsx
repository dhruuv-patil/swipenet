import React from 'react';
import Card from '../HomeCard/HomeCard';
import './herosection.css';

const HeroSection = () => {
  return (
    <>
      <div className="hero">
        <div className="hero-content">
          <div className="tagline-box">
            <h4 className="tagline">Revolutionizing Networking</h4>
          </div>
          <h1 className="slogan">
            Your career begins with just one <span className="highlight-content">Right Swipe</span>
          </h1>
          <h4 className="about">
            SwipeNet makes hiring effortless. Swipe. Match. Work. Instantly connect with the right Gigs,
            internships, or talent and level up your career.
          </h4>
          <div className="buttons">
            <button className="primary-btn">
              <i className="fa-solid fa-user"></i> I'm a Job Seeker
            </button>
            <button className="sec-btn">
              <i className="fa-solid fa-briefcase"></i> I'm an Employer
            </button>
          </div>
        </div>

        <div className="card">
          <Card />
        </div>
      </div>
      
    </>
  );
};

export default HeroSection;
