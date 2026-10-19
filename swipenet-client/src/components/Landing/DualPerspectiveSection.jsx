import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiBriefcase, FiShield, FiDollarSign, FiZap, FiTarget, FiClock, FiBarChart2, FiArrowRight } from 'react-icons/fi';

export const DualPerspectiveSection = () => {
  const [role, setRole] = useState('seeker'); // 'seeker' | 'employer'
  const navigate = useNavigate();

  return (
    <section style={{ maxWidth: 1200, margin: '60px auto', padding: '0 24px', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ display: 'inline-flex', background: '#e2e8f0', padding: 4, borderRadius: 16 }}>
          <button
            type="button"
            onClick={() => setRole('seeker')}
            style={{
              padding: '10px 24px',
              borderRadius: 12,
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: role === 'seeker' ? 'linear-gradient(135deg, #0061ff, #0052d4)' : 'transparent',
              color: role === 'seeker' ? '#ffffff' : '#64748b',
              transition: 'all 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <FiUser /> For Software Engineers
          </button>
          <button
            type="button"
            onClick={() => setRole('employer')}
            style={{
              padding: '10px 24px',
              borderRadius: 12,
              border: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              cursor: 'pointer',
              background: role === 'employer' ? 'linear-gradient(135deg, #0061ff, #0052d4)' : 'transparent',
              color: role === 'employer' ? '#ffffff' : '#64748b',
              transition: 'all 0.2s',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <FiBriefcase /> For Founders & Tech Leads
          </button>
        </div>
      </div>

      {role === 'seeker' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <FiShield style={{ fontSize: '1.8rem', color: '#0061ff', marginBottom: 12 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Zero Recruiter Spam</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Nobody can send you a message or view your full contact until you actively swipe right. Your inbox stays completely clean.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <FiDollarSign style={{ fontSize: '1.8rem', color: '#0061ff', marginBottom: 12 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Mandatory Salary Upfront</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Every role must publish an approved base salary band. If the numbers don’t match your floor, it never enters your deck.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <FiZap style={{ fontSize: '1.8rem', color: '#0061ff', marginBottom: 12 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Direct Engineering Match</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Connect directly with engineering managers and technical founders without ATS black holes or keyword parsing bots.
            </p>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <FiTarget style={{ fontSize: '1.8rem', color: '#0061ff', marginBottom: 12 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>High-Intent Candidate Pool</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Only review candidates who have verified tech stacks and have expressed explicit interest in your specific role.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <FiClock style={{ fontSize: '1.8rem', color: '#0061ff', marginBottom: 12 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>48-Hour Response Velocity</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Both sides have 48 hours to start the conversation, drastically cutting your time-to-first-interview from weeks to hours.
            </p>
          </div>

          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: 20, padding: 32, boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <FiBarChart2 style={{ fontSize: '1.8rem', color: '#0061ff', marginBottom: 12 }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Role-Based Deck Switcher</h3>
            <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
              Manage multiple requisitions (e.g., Staff SRE, Frontend Lead) and swipe on candidates tailored to each role's requirements.
            </p>
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: 32 }}>
        <button
          type="button"
          onClick={() => navigate(`/signup?role=${role}`)}
          style={{
            padding: '14px 28px',
            borderRadius: 14,
            background: 'linear-gradient(135deg, #0061ff, #0052d4)',
            color: '#fff',
            fontWeight: 600,
            fontSize: '0.95rem',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          {role === 'seeker' ? 'Create Developer Profile' : 'Publish Role & Hire Engineers'} <FiArrowRight />
        </button>
      </div>
    </section>
  );
};

export default DualPerspectiveSection;
