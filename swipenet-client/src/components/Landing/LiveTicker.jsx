import React from 'react';
import './LiveTicker.css';

const TICKER_ITEMS = [
  { role: 'Staff SRE', company: 'Series-B AI Lab', comp: '₹55 LPA', time: '2m ago', stack: 'Go, Kubernetes' },
  { role: 'Frontend Lead', company: 'Global Neobank', comp: '$175,000', time: '4m ago', stack: 'React, TypeScript' },
  { role: 'Distributed Sys Dev', company: 'Cloud Infrastructure Co', comp: '₹48 LPA', time: '7m ago', stack: 'Rust, Kafka' },
  { role: 'Full Stack Engineer', company: 'Decentralized Finance Lab', comp: '$160,000', time: '11m ago', stack: 'Node, React' },
  { role: 'ML Ops Specialist', company: 'Autonomous Robotics', comp: '$190,000', time: '14m ago', stack: 'Python, PyTorch' },
];

export const LiveTicker = () => {
  return (
    <div className="live-ticker-wrap" aria-label="Recent Verified Matches">
      <div className="ticker-label">
        Live Network Matches
      </div>
      <div className="ticker-marquee">
        <div className="ticker-track">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => (
            <div key={idx} className="ticker-item">
              <span className="ticker-badge">Matched</span>
              <strong className="ticker-role">{item.role}</strong>
              <span className="ticker-dim">×</span>
              <span className="ticker-co">{item.company}</span>
              <span className="ticker-comp">{item.comp}</span>
              <span className="ticker-stack">{item.stack}</span>
              <span className="ticker-time">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveTicker;
