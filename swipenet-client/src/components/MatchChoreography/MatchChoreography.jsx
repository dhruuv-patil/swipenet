import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Lenis from 'lenis';
import { FiCheck, FiCalendar, FiVideo, FiShield, FiBriefcase } from 'react-icons/fi';
import s from './MatchChoreography.module.css';

/**
 * Minimal Dashboard-Styled Match Choreography
 * Clean human typography with blueish gradient accents and professional vector icons.
 */
const SKILLS = [
  { k: 'TypeScript', need: 'Required', hit: true, at: 0.22 },
  { k: 'React 18', need: 'Required', hit: true, at: 0.29 },
  { k: 'Node.js', need: 'Required', hit: true, at: 0.36 },
  { k: 'Postgres', need: 'Required', hit: true, at: 0.43 },
  { k: 'Rust', need: 'Bonus', hit: false, at: 0.5 },
];

const CHAT = [
  { me: false, t: 'Hey Aarav! Loved your distributed backend write-up. Free for a quick 15-min intro?', at: 0.76 },
  { me: true, t: 'Hi Sarah! Absolutely. Thursday 3pm IST works well.', at: 0.84 },
  { me: false, t: 'Perfect! Calendar invite sent over.', at: 0.92 },
];

export default function MatchChoreography() {
  const runway = useRef(null);
  const [stage, setStage] = useState({ phase: 'Discovery', skills: 0, chat: 0 });

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    let id;
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf); };
    id = requestAnimationFrame(raf);
    return () => { cancelAnimationFrame(id); lenis.destroy(); };
  }, []);

  const { scrollYProgress: p } = useScroll({ target: runway, offset: ['start start', 'end end'] });

  // 1. HORIZONTAL APPROACH & MAGNETIC LOCK
  const rawL = useTransform(p, [0, 0.26, 0.58, 0.66], [-65, -20, -20, 0]);
  const rawR = useTransform(p, [0, 0.26, 0.58, 0.66], [65, 20, 20, 0]);
  const springCfg = { stiffness: 240, damping: 20, mass: 0.6 };
  const xL = useTransform(useSpring(rawL, springCfg), (v) => `${v}vw`);
  const xR = useTransform(useSpring(rawR, springCfg), (v) => `${v}vw`);

  // Subtle inward tilt during compute
  const rotY_L = useTransform(p, [0, 0.26, 0.58, 0.66], [-15, 6, 6, 0]);
  const rotY_R = useTransform(p, [0, 0.26, 0.58, 0.66], [15, -6, -6, 0]);

  // Clean fade & scale
  const cardsOpacity = useTransform(p, [0, 0.1, 0.63, 0.67], [0, 1, 1, 0]);
  const cardsScale = useTransform(p, [0.58, 0.64, 0.67], [1, 1.04, 0.92]);

  // 2. HUD MATCH CORE READOUT
  const score = useTransform(p, [0.2, 0.56], [0, 94]);
  const scoreText = useTransform(score, (v) => Math.round(v));
  const scoreOpacity = useTransform(p, [0.15, 0.24, 0.58, 0.63], [0, 1, 1, 0]);
  const scoreScale = useTransform(p, [0.15, 0.25, 0.56, 0.63], [0.85, 1, 1, 1.15]);
  const salaryFill = useTransform(p, [0.38, 0.56], [0, 1]);
  const circleOffset = useTransform(score, (v) => 283 - (283 * v) / 100);

  // Subtle connection beam
  const beamOpacity = useTransform(p, [0.24, 0.32, 0.56, 0.62], [0, 0.5, 0.5, 0]);

  // 3. MINIMAL IMPACT SHOCKWAVE
  const ringScale = useTransform(p, [0.64, 0.76], [0.2, 2.8]);
  const ringOpacity = useTransform(p, [0.64, 0.67, 0.76], [0, 0.8, 0]);

  // 4. CHAT HANDOFF
  const chatOpacity = useTransform(p, [0.68, 0.75], [0, 1]);
  const chatScale = useTransform(p, [0.68, 0.77], [0.92, 1]);
  const chatY = useTransform(p, [0.68, 0.77], [20, 0]);

  // Simple telemetry
  const hudPct = useTransform(p, (v) => `${Math.round(v * 100)}% Complete`);
  const railScale = useTransform(p, [0, 1], [0, 1]);

  useMotionValueEvent(p, 'change', (v) => {
    const skills = SKILLS.filter((k) => v >= k.at).length;
    const chat = CHAT.filter((m) => v >= m.at).length;
    const phase = v < 0.2 ? 'Candidate Discovery' : v < 0.58 ? 'Verifying Compatibility' : v < 0.68 ? 'Mutual Opt-in' : 'Direct Conversation';
    setStage((o) => (o.skills === skills && o.chat === chat && o.phase === phase ? o : { phase, skills, chat }));
  });

  return (
    <section ref={runway} className={s.runway} aria-label="How a SwipeNet match forms">
      <div className={s.stage}>
        {/* Simple, Professional Header */}
        <div className={s.hudTop}>
          <span className={s.hudBrand}>SwipeNet Match Engine</span>
          <span className={s.hudCenter}>{stage.phase}</span>
          <span className={s.hudStatus}>Verified Profile Network</span>
        </div>
        <div className={s.rulerL} /><div className={s.rulerR} />
        <motion.div className={s.rail} style={{ scaleY: railScale }} />
        
        {/* Simple Bottom Header */}
        <div className={s.hudBottom}>
          <motion.span>{hudPct}</motion.span>
          <span>Scroll to explore matching workflow</span>
        </div>

        {/* Candidate Card (Minimal Dashboard Style) */}
        <motion.article
          className={s.card}
          style={{ x: xL, rotateY: rotY_L, opacity: cardsOpacity, scale: cardsScale }}
        >
          <header className={s.cardHeader}>
            <div className={s.avatarCircle}>A</div>
            <div className={s.headerMeta}>
              <b>Aarav M.</b>
              <small>Senior Full-Stack Developer</small>
            </div>
            <span className={s.minimalBadge}>
              <FiShield style={{ marginRight: 4, verticalAlign: -1 }} /> Verified
            </span>
          </header>

          <div className={s.salaryRow}>
            <span className={s.salaryLabel}>Expected Compensation</span>
            <span className={s.salaryAmount}>₹42–55 LPA</span>
          </div>

          <div className={s.tagsRow}>
            <span className={s.tagPill}>Remote</span>
            <span className={s.tagPill}>India</span>
            <span className={s.tagPill}>5+ Yrs</span>
          </div>

          <div className={s.skillsSection}>
            <span className={s.sectionLabel}>Technical Stack</span>
            <ul className={s.skillsList}>
              {SKILLS.map((k, i) => (
                <li key={k.k} className={s.skillRow} data-on={i < stage.skills && k.hit}>
                  <span>{k.k}</span>
                  {i < stage.skills && k.hit ? (
                    <span className={s.matchIndicator}>
                      <FiCheck style={{ marginRight: 4 }} /> Match
                    </span>
                  ) : (
                    <span className={s.needIndicator}>{k.need}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        {/* Employer Card (Minimal Dashboard Style) */}
        <motion.article
          className={s.card}
          style={{ x: xR, rotateY: rotY_R, opacity: cardsOpacity, scale: cardsScale }}
        >
          <header className={s.cardHeader}>
            <div className={s.avatarCircle}>N</div>
            <div className={s.headerMeta}>
              <b>Northwind Labs</b>
              <small>Staff Engineer · Platform</small>
            </div>
            <span className={s.minimalBadge}>
              <FiBriefcase style={{ marginRight: 4, verticalAlign: -1 }} /> Funded
            </span>
          </header>

          <div className={s.salaryRow}>
            <span className={s.salaryLabel}>Offered Salary Band</span>
            <span className={s.salaryAmount}>₹48–62 LPA</span>
          </div>

          <div className={s.tagsRow}>
            <span className={s.tagPill}>Hybrid</span>
            <span className={s.tagPill}>Bengaluru</span>
            <span className={s.tagPill}>Equity</span>
          </div>

          <div className={s.skillsSection}>
            <span className={s.sectionLabel}>Required Stack</span>
            <ul className={s.skillsList}>
              {SKILLS.map((k, i) => (
                <li key={k.k} className={s.skillRow} data-on={i < stage.skills && k.hit} data-soft={!k.hit}>
                  <span>{k.k}</span>
                  {i < stage.skills && k.hit ? (
                    <span className={s.matchIndicator}>
                      <FiCheck style={{ marginRight: 4 }} /> Match
                    </span>
                  ) : (
                    <span className={s.needIndicator}>{k.need}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.article>

        {/* Center Minimal Alignment Core with Blueish Gradient */}
        <motion.div
          className={s.readout}
          style={{ opacity: scoreOpacity, scale: scoreScale }}
        >
          <motion.div className={s.beamL} style={{ opacity: beamOpacity }} />
          <motion.div className={s.beamR} style={{ opacity: beamOpacity }} />

          <div className={s.gaugeWrap}>
            <svg className={s.gaugeSvg} viewBox="0 0 100 100">
              <defs>
                <linearGradient id="blueGaugeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0061ff" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </linearGradient>
              </defs>
              <circle cx="50" cy="50" r="45" className={s.gaugeBg} />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                className={s.gaugeMeter}
                style={{ strokeDashoffset: circleOffset }}
              />
            </svg>
            <div className={s.scoreBox}>
              <motion.b>{scoreText}</motion.b>
              <span className={s.scorePct}>Compatibility</span>
            </div>
          </div>

          <div className={s.salaryOverlapBox}>
            <div className={s.trackBar}>
              <span className={s.trackA} />
              <span className={s.trackB} />
              <motion.span className={s.trackFill} style={{ scaleX: salaryFill }} />
            </div>
            <span className={s.overlapText}>Compensation Overlap ₹48–55 LPA</span>
          </div>
        </motion.div>

        {/* Minimal Impact Ring */}
        <motion.div className={s.ring} style={{ scale: ringScale, opacity: ringOpacity }} />

        {/* Minimal Chat Window (Styled directly like Dashboard Chat) */}
        <motion.div className={s.chat} style={{ opacity: chatOpacity, scale: chatScale, y: chatY }}>
          <header className={s.chatHeader}>
            <div className={s.chatHeaderUser}>
              <div className={s.avatarCircleSmall}>N</div>
              <div>
                <b>Northwind Labs & Aarav M.</b>
                <span className={s.chatStatusText}>Direct Match · 48h Response Window</span>
              </div>
            </div>
            <span className={s.chatTimeBadge}>Just Now</span>
          </header>

          <div className={s.msgs}>
            {CHAT.slice(0, stage.chat).map((m) => (
              <motion.p
                key={m.t}
                className={m.me ? s.bubbleMe : s.bubbleThem}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {m.t}
              </motion.p>
            ))}
          </div>

          <footer className={s.chatFooter}>
            <button type="button" className={s.btnPrimary}>
              <FiCalendar style={{ marginRight: 6 }} /> Schedule Call
            </button>
            <button type="button" className={s.btnSecondary}>
              <FiVideo style={{ marginRight: 6 }} /> Video Intro
            </button>
          </footer>
        </motion.div>
      </div>
    </section>
  );
}
