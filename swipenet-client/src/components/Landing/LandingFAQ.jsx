import React, { useState } from 'react';

const FAQS = [
  {
    q: "Isn't this just 'Tinder for jobs'?",
    a: "While we use the high-velocity swipe interaction to eliminate ATS paperwork, SwipeNet is built with strict technical hiring rigor. Swipes are gated by verified tech stacks, hard compensation floors, and proof-of-work repositories. Both sides only speak when mutual alignment is 100% verified.",
  },
  {
    q: "Can my current employer see my profile?",
    a: "No. You can add your current company's domain or name to your Stealth Shield, and SwipeNet will automatically exclude your card from any recruiter accounts associated with that company.",
  },
  {
    q: "What happens after a mutual right-swipe?",
    a: "Both parties receive an instant match notification. A dedicated real-time chat room opens with an anti-ghosting 48-hour response countdown and recommended technical icebreakers. Either party can initiate a calendar invite directly in the chat.",
  },
  {
    q: "Is SwipeNet free for engineers?",
    a: "Yes, 100% free for software engineers and technical candidates forever. Employers subscribe to role seats or pay per successful hire.",
  },
];

export const LandingFAQ = () => {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <section style={{ maxWidth: 900, margin: '60px auto 100px', padding: '0 24px', width: '100%' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h2 style={{ fontSize: 'clamp(2rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#0f172a' }}>
          Frequently Asked Questions
        </h2>
        <p style={{ color: '#64748b', fontSize: '1rem', marginTop: 8 }}>
          Everything you need to know about the platform and verification policies.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={faq.q}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 16,
                padding: '20px 24px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onClick={() => setOpenIdx(isOpen ? -1 : idx)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', margin: 0 }}>
                  {faq.q}
                </h3>
                <span style={{ fontSize: '1.2rem', color: '#64748b' }}>
                  {isOpen ? '−' : '+'}
                </span>
              </div>
              {isOpen && (
                <p style={{ margin: '14px 0 0', color: '#475569', fontSize: '0.95rem', lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LandingFAQ;
