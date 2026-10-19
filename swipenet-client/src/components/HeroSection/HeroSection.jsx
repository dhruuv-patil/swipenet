import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiBriefcase, FiHome, FiMail, FiSearch, FiTrendingUp, FiArrowRight } from 'react-icons/fi';
import HeroLattice from './HeroLattice';
import './herosection.css';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="portal-hero-container" style={{ position: 'relative', overflow: 'hidden' }}>
      <HeroLattice style={{ zIndex: 0 }} />
      <div style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="hero-chip-badge">
          <span>Verified Technical Discovery & Direct Hiring</span>
        </div>

        <h1 className="hero-portal-title">
          Modern Job Portal for <span className="hero-highlight-word">Seamless</span> Job Searching
        </h1>

        <p className="hero-portal-sub">
          SwipeNet features a clean layout, refined architecture, and intuitive navigation.
          It effectively showcases job listings, user profiles, and direct mutual matching without recruiter spam.
        </p>

        <div className="hero-button-row">
          <button
            type="button"
            className="hero-btn-primary"
            onClick={() => navigate('/signup?role=jobseeker')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <FiUser /> I'm a Job Seeker <FiArrowRight />
          </button>
          <button
            type="button"
            className="hero-btn-secondary"
            onClick={() => navigate('/signup?role=employer')}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
          >
            <FiBriefcase /> I'm an Employer <FiArrowRight />
          </button>
        </div>

        {/* Hero Showcase Mockup */}
        <div className="hero-app-mockup-frame">
          {/* Mock Column 1: Sidebar */}
          <div style={{ background: '#222628', borderRadius: 24, padding: '24px 18px', color: '#fff', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', border: '2px solid #0061ff', padding: 2, margin: '0 auto 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: 'linear-gradient(135deg, #0061ff, #38bdf8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  G
                </div>
              </div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Hi, George!</div>
              <div style={{ fontSize: '0.72rem', color: '#8e979a' }}>Your job is waiting for you!</div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ background: '#32383a', padding: '8px 12px', borderRadius: 12, fontSize: '0.82rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiHome /> Dashboard
              </div>
              <div style={{ padding: '8px 12px', borderRadius: 12, fontSize: '0.82rem', color: '#8e979a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiMail /> Messages <span style={{ marginLeft: 'auto', background: '#fff', color: '#222', borderRadius: '50%', width: 16, height: 16, fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>4</span>
              </div>
              <div style={{ padding: '8px 12px', borderRadius: 12, fontSize: '0.82rem', color: '#8e979a', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiBriefcase /> Jobs
              </div>
            </div>

            <div style={{ background: '#2c3132', borderRadius: 18, padding: '14px 10px', textAlign: 'center', marginTop: 'auto' }}>
              <div style={{ position: 'relative', width: 70, height: 70, margin: '0 auto 8px' }}>
                <svg width="70" height="70" viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#373d40" strokeWidth="10" />
                  <circle cx="50" cy="50" r="38" fill="none" stroke="#0061ff" strokeWidth="10" strokeDasharray="155 238.7" strokeLinecap="round" />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.1rem' }}>
                  65%
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, fontSize: '0.68rem', color: '#8e979a' }}>
                <span>Profile Completion</span>
              </div>
            </div>
          </div>

          {/* Mock Column 2: Feed */}
          <div style={{ background: '#ffffff', borderRadius: 24, padding: 18, display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: '#f4f6f8', borderRadius: 14, padding: '6px 12px', fontSize: '0.8rem', color: '#7a8387', display: 'flex', alignItems: 'center', gap: 6 }}>
              <FiSearch /> Search verified developer jobs...
            </div>

            <div style={{ display: 'flex', gap: 6, margin: '4px 0' }}>
              <span style={{ background: '#222628', color: '#fff', padding: '4px 10px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 700 }}>New</span>
              <span style={{ background: '#f1f3f5', color: '#495057', padding: '4px 10px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 600 }}>Hot</span>
              <span style={{ background: '#f1f3f5', color: '#495057', padding: '4px 10px', borderRadius: 12, fontSize: '0.72rem', fontWeight: 600 }}>Near</span>
            </div>

            {/* Listing 1: Active */}
            <div style={{ background: '#fafbfc', border: '1.5px solid #222628', borderRadius: 16, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.85rem', color: '#191d1e' }}>Middle UX/UI Designer</div>
                <div style={{ fontSize: '0.72rem', color: '#7a8387', margin: '2px 0 4px' }}>Dropbox Inc. • Remote</div>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#0061ff' }}>$1,200 - $1,500</div>
                <div style={{ display: 'flex', gap: 4, marginTop: 4 }}>
                  <span style={{ background: '#f1f3f5', padding: '2px 6px', borderRadius: 8, fontSize: '0.68rem', fontWeight: 600 }}>Canada</span>
                  <span style={{ background: '#f1f3f5', padding: '2px 6px', borderRadius: 8, fontSize: '0.68rem', fontWeight: 600 }}>Remote</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0061ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.75rem' }}>
                  D
                </div>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#222628', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                  →
                </div>
              </div>
            </div>

            {/* Listing 2 */}
            <div style={{ background: '#ffffff', border: '1px solid #edf0f2', borderRadius: 16, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#191d1e' }}>JavaScript Developer</div>
                <div style={{ fontSize: '0.72rem', color: '#7a8387', margin: '2px 0 4px' }}>Pulse Start Inc. • Office</div>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#0061ff' }}>$1,300 - $1,600</div>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#222628', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                →
              </div>
            </div>

            {/* Listing 3 */}
            <div style={{ background: '#ffffff', border: '1px solid #edf0f2', borderRadius: 16, padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#191d1e' }}>React & Node Developer</div>
                <div style={{ fontSize: '0.72rem', color: '#7a8387', margin: '2px 0 4px' }}>NextGen Agency • Remote</div>
                <div style={{ fontWeight: 700, fontSize: '0.8rem', color: '#0061ff' }}>$34/h - $45/h</div>
              </div>
              <div style={{ width: 22, height: 22, borderRadius: '50%', background: '#222628', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px' }}>
                →
              </div>
            </div>
          </div>

          {/* Mock Column 3: Detailed View */}
          <div style={{ background: '#ffffff', borderRadius: 24, padding: 22, display: 'flex', flexDirection: 'column', gap: 12, position: 'relative' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#0061ff', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800 }}>
                  D
                </div>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: '#222628', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.9rem' }}>
                  <FiTrendingUp />
                </div>
              </div>

              <div style={{ fontWeight: 800, fontSize: '1.25rem', color: '#191d1e' }}>Middle UX/UI Designer</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#0061ff', margin: '2px 0 6px' }}>$1,700 - $2,100</div>

              <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                <span style={{ background: '#f1f3f5', padding: '3px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 600 }}>Canada</span>
                <span style={{ background: '#f1f3f5', padding: '3px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 600 }}>Toronto</span>
                <span style={{ background: '#f1f3f5', padding: '3px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 600 }}>IT</span>
                <span style={{ background: '#f1f3f5', padding: '3px 8px', borderRadius: 10, fontSize: '0.7rem', fontWeight: 600 }}>Remote</span>
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: 4 }}>Job Description</div>
              <div style={{ fontSize: '0.78rem', color: '#4a5255', lineHeight: 1.5 }}>
                Dropbox is looking for a talented designer, illustrator to expand our engineering and design systems team...
              </div>
            </div>

            <div>
              <div style={{ fontWeight: 700, fontSize: '0.82rem', marginBottom: 6 }}>Responsibilities</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: '0.75rem', color: '#4a5255' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#edf2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '9px' }}>1</span>
                  <span>Developing original designs and illustrations...</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 16, height: 16, borderRadius: '50%', background: '#edf2f5', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '9px' }}>2</span>
                  <span>Creating visual concepts and designs for products...</span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: 8 }}>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                style={{ width: '100%', padding: '12px', background: 'linear-gradient(135deg, #0061ff, #0052d4)', color: '#fff', border: 'none', borderRadius: 14, fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
              >
                Send Resume / Match
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
