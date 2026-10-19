import React from 'react';
import { FiCheck } from 'react-icons/fi';

export const TrustBentoGrid = () => {
  return (
    <section style={{ maxWidth: 1200, margin: '60px auto', padding: '0 24px', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span style={{ background: 'rgba(0, 97, 255, 0.08)', color: '#0061ff', fontWeight: 600, fontSize: '0.85rem', padding: '6px 16px', borderRadius: 20, border: '1px solid rgba(0, 97, 255, 0.2)' }}>
          Platform Standards & Verification
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color: '#0f172a', marginTop: 16 }}>
          Designed for High-Signal Technical Hiring
        </h2>
        <p style={{ color: '#64748b', fontSize: '1.05rem', maxWidth: 640, margin: '10px auto 0' }}>
          SwipeNet is built to eliminate the noise, spam, and stigma of conventional job boards.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 20 }}>
        {/* Bento 1: Salary Policy (Span 7) */}
        <div style={{ gridColumn: 'span 7', background: '#161b22', color: '#fff', borderRadius: 20, padding: 36, border: '1px solid rgba(255,255,255,0.08)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,97,255,0.2) 0%, transparent 70%)' }} />
          <span style={{ fontSize: 11, color: '#79c0ff', background: 'rgba(0,97,255,0.12)', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>
            Standard 1
          </span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '14px 0 8px' }}>Mandatory Compensation Transparency</h3>
          <p style={{ color: '#8b949e', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: 500 }}>
            Every job posting must include a verified base salary or compensation bracket. No hidden numbers. No "competitive salary" placeholders.
          </p>
          <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, background: '#21262d', padding: '8px 14px', borderRadius: 10, fontSize: 13, color: '#79c0ff' }}>
            <FiCheck /> Hard compensation floor filter enforced
          </div>
        </div>

        {/* Bento 2: 48h Countdown (Span 5) */}
        <div style={{ gridColumn: 'span 5', background: '#ffffff', borderRadius: 20, padding: 36, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: 11, color: '#d97706', background: '#fef3c7', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>
            Standard 2
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', margin: '14px 0 8px' }}>The 48h Response Window</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Matches without message activity archive automatically after 48 hours. Protects everyone from ghosting and inactive pipelines.
          </p>
        </div>

        {/* Bento 3: Verified Signals (Span 5) */}
        <div style={{ gridColumn: 'span 5', background: '#ffffff', borderRadius: 20, padding: 36, border: '1px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
          <span style={{ fontSize: 11, color: '#0061ff', background: 'rgba(0, 97, 255, 0.08)', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>
            Standard 3
          </span>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#0f172a', margin: '14px 0 8px' }}>Proof-of-Work Verification</h3>
          <p style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Every candidate card is verified through GitHub commit history, real repositories, and domain email checks.
          </p>
        </div>

        {/* Bento 4: Privacy Shield (Span 7) */}
        <div style={{ gridColumn: 'span 7', background: '#161b22', color: '#fff', borderRadius: 20, padding: 36, border: '1px solid rgba(255,255,255,0.08)' }}>
          <span style={{ fontSize: 11, color: '#79c0ff', background: 'rgba(0, 97, 255, 0.12)', padding: '4px 10px', borderRadius: 6, fontWeight: 600 }}>
            Standard 4
          </span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, margin: '14px 0 8px' }}>Current Employer Stealth Shield</h3>
          <p style={{ color: '#8b949e', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Input your current company domain: your profile card will be permanently blocked from showing up in their recruiters' swipe decks.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TrustBentoGrid;
