import { useEffect, useRef } from 'react';

/**
 * The Live Talent & Opportunity Lattice
 * - Blue nodes = candidates, amber nodes = companies (edges only form between opposite types)
 * - Faint edges = potential fit. Every ~1.1s one edge "fires": a pulse travels it,
 *   both nodes flare, the edge turns white-hot and decays, a "match 91%" tag appears.
 * - Cursor magnetism pulls nearby nodes; depth (z) drives parallax.
 * - 5 glass-card silhouettes drift at different depths.
 * Perf: one canvas, DPR capped at 2, pauses offscreen / hidden tab, static frame for reduced motion.
 */
const CAND = [91, 140, 255];
const CO = [255, 180, 84];
const HOT = [236, 243, 255];
const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
const rand = (a, b) => a + Math.random() * (b - a);

export default function HeroLattice({ className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouse = { x: -9999, y: -9999, px: 0, py: 0, spx: 0, spy: 0 }; // px/py: -1..1
    let W = 0, H = 0, dpr = 1, raf = 0, visible = true, last = 0, fireClock = 0;
    let nodes = [], edges = [], pulses = [], rings = [], tags = [], cards = [];

    const build = () => {
      const r = cv.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width; H = r.height;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const step = W < 700 ? 120 : 96;
      nodes = [];
      for (let y = step / 2; y < H; y += step)
        for (let x = step / 2; x < W; x += step) {
          const bx = x + rand(-step * 0.35, step * 0.35);
          const by = y + rand(-step * 0.35, step * 0.35);
          nodes.push({
            bx, by, x: bx, y: by, vx: 0, vy: 0,
            z: rand(0.35, 1), type: Math.random() < 0.62 ? 0 : 1,
            phase: rand(0, 6.28), glow: 0, deg: 0,
          });
        }

      edges = [];
      const maxD = step * 1.9;
      nodes.forEach((a, i) => {
        nodes
          .map((b, j) => ({ j, d: Math.hypot(a.bx - b.bx, a.by - b.by), b }))
          .filter((o) => o.j > i && o.b.type !== a.type && o.d < maxD)
          .sort((p, q) => p.d - q.d)
          .slice(0, 2)
          .forEach((o) => {
            edges.push({ a, b: o.b, live: 0, score: 0 });
            a.deg++; o.b.deg++;
          });
      });

      cards = Array.from({ length: W < 700 ? 2 : 5 }, (_, i) => ({
        x: rand(0.08, 0.92) * W, y: rand(0.1, 0.9) * H,
        w: rand(150, 200), z: rand(0.25, 0.9),
        vx: rand(-6, 6), vy: rand(-4, 4), kind: i % 2, // 0 candidate, 1 job
      }));
    };

    const fire = () => {
      const pool = edges.filter((e) => e.live < 0.2);
      if (!pool.length) return;
      const e = pool[(Math.random() * pool.length) | 0];
      pulses.push({ e, t: 0, dir: Math.random() < 0.5 ? 1 : -1 });
    };

    const pos = (n) => ({
      x: n.x + mouse.spx * 22 * n.z,
      y: n.y + mouse.spy * 14 * n.z,
    });

    const drawCard = (c, t) => {
      const p = { x: c.x + mouse.spx * 40 * c.z, y: c.y + mouse.spy * 26 * c.z };
      const w = c.w * c.z, h = w * 1.3, a = 0.05 + c.z * 0.09;
      const accent = c.kind ? CO : CAND;
      ctx.save();
      ctx.translate(p.x, p.y + Math.sin(t / 2200 + c.x) * 6);
      ctx.beginPath();
      ctx.roundRect(-w / 2, -h / 2, w, h, 14);
      ctx.fillStyle = `rgba(255,255,255,${a * 0.5})`; ctx.fill();
      ctx.strokeStyle = `rgba(255,255,255,${a * 1.6})`; ctx.lineWidth = 1; ctx.stroke();
      ctx.fillStyle = rgba(accent, a * 2.2);
      ctx.beginPath(); ctx.arc(-w / 2 + 22 * c.z, -h / 2 + 24 * c.z, 9 * c.z, 0, 6.28); ctx.fill();
      ctx.fillStyle = `rgba(255,255,255,${a * 1.2})`;
      ctx.fillRect(-w / 2 + 40 * c.z, -h / 2 + 18 * c.z, w * 0.38, 5 * c.z);
      ctx.fillRect(-w / 2 + 40 * c.z, -h / 2 + 30 * c.z, w * 0.24, 4 * c.z);
      for (let i = 0; i < 3; i++)
        ctx.fillRect(-w / 2 + 14 * c.z + i * w * 0.28, h * 0.05, w * 0.24, 10 * c.z);
      ctx.fillStyle = rgba(accent, a * 1.6);
      ctx.fillRect(-w / 2 + 14 * c.z, h / 2 - 22 * c.z, w * 0.55, 6 * c.z);
      ctx.restore();
    };

    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) { last = t; return; }
      const dt = Math.min((t - last) / 1000, 0.05); last = t;

      mouse.spx += (mouse.px - mouse.spx) * 0.06;
      mouse.spy += (mouse.py - mouse.spy) * 0.06;

      fireClock += dt;
      if (fireClock > 1.1) { fireClock = 0; fire(); }

      ctx.clearRect(0, 0, W, H);

      // cards (back layer)
      cards.forEach((c) => {
        c.x += c.vx * dt * c.z; c.y += c.vy * dt * c.z;
        if (c.x < -120) c.x = W + 100; if (c.x > W + 120) c.x = -100;
        if (c.y < -140) c.y = H + 120; if (c.y > H + 140) c.y = -120;
      });
      cards.filter((c) => c.z < 0.55).forEach((c) => drawCard(c, t));

      // node physics: spring home + cursor magnetism
      for (const n of nodes) {
        const p = pos(n);
        const dx = mouse.x - p.x, dy = mouse.y - p.y, d = Math.hypot(dx, dy);
        let fx = (n.bx - n.x) * 6, fy = (n.by - n.y) * 6;
        if (d < 170) { const k = (1 - d / 170) * 38 * n.z; fx += (dx / d) * k; fy += (dy / d) * k; }
        n.vx = (n.vx + fx * dt) * 0.9; n.vy = (n.vy + fy * dt) * 0.9;
        n.x += n.vx; n.y += n.vy;
        n.glow = Math.max(0, n.glow - dt * 0.7);
      }

      // edges
      for (const e of edges) {
        e.live = Math.max(0, e.live - dt * 0.12);
        const a = pos(e.a), b = pos(e.b);
        const near = Math.hypot(mouse.x - (a.x + b.x) / 2, mouse.y - (a.y + b.y) / 2) < 140;
        const alpha = 0.07 + (near ? 0.14 : 0) + e.live * 0.6;
        ctx.strokeStyle = e.live > 0.02 ? rgba(HOT, alpha) : `rgba(150,170,210,${alpha})`;
        ctx.lineWidth = 0.6 + e.live * 1.2;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }

      // pulses
      pulses = pulses.filter((p) => {
        p.t += dt * 0.9;
        const a = pos(p.dir > 0 ? p.e.a : p.e.b), b = pos(p.dir > 0 ? p.e.b : p.e.a);
        const k = Math.min(p.t, 1);
        const x = a.x + (b.x - a.x) * k, y = a.y + (b.y - a.y) * k;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 14);
        g.addColorStop(0, rgba(HOT, 0.95)); g.addColorStop(1, rgba(HOT, 0));
        ctx.fillStyle = g; ctx.fillRect(x - 14, y - 14, 28, 28);
        if (p.t >= 1) {
          p.e.live = 1; p.e.a.glow = 1; p.e.b.glow = 1;
          p.e.score = 82 + ((Math.random() * 17) | 0);
          rings.push({ x: b.x, y: b.y, r: 4, a: 0.8 });
          tags.push({ x: (a.x + b.x) / 2, y: (a.y + b.y) / 2, a: 1, s: p.e.score });
          return false;
        }
        return true;
      });

      // nodes
      for (const n of nodes) {
        const p = pos(n);
        const base = n.type ? CO : CAND;
        const beat = 0.55 + 0.25 * Math.sin(t / 900 + n.phase);
        const r = (1.6 + n.deg * 0.35) * (0.7 + n.z * 0.5);
        if (n.glow > 0.02) {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 26 * n.glow + 6);
          g.addColorStop(0, rgba(HOT, 0.55 * n.glow)); g.addColorStop(1, rgba(HOT, 0));
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, 26 * n.glow + 6, 0, 6.28); ctx.fill();
        }
        ctx.fillStyle = rgba(n.glow > 0.3 ? HOT : base, beat * n.z + n.glow * 0.4);
        if (n.type) ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2); // companies = squares
        else { ctx.beginPath(); ctx.arc(p.x, p.y, r, 0, 6.28); ctx.fill(); } // candidates = dots
      }

      // rings + telemetry tags
      rings = rings.filter((r) => {
        r.r += dt * 70; r.a -= dt * 0.9;
        if (r.a <= 0) return false;
        ctx.strokeStyle = rgba(HOT, r.a); ctx.lineWidth = 1;
        ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 6.28); ctx.stroke();
        return true;
      });
      ctx.font = '500 10px ui-monospace, "JetBrains Mono", monospace';
      tags = tags.filter((g) => {
        g.a -= dt * 0.35; g.y -= dt * 4;
        if (g.a <= 0) return false;
        ctx.fillStyle = rgba(HOT, g.a * 0.85);
        ctx.fillText(`match ${g.s}%`, g.x + 8, g.y - 6);
        return true;
      });

      // cards (front layer)
      cards.filter((c) => c.z >= 0.55).forEach((c) => drawCard(c, t));
    };

    const onMove = (e) => {
      const r = cv.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      mouse.px = (mouse.x / W - 0.5) * 2; mouse.py = (mouse.y / H - 0.5) * 2;
    };
    const onLeave = () => { mouse.x = mouse.y = -9999; mouse.px = mouse.py = 0; };

    build();
    const ro = new ResizeObserver(build); ro.observe(cv);
    const io = new IntersectionObserver(([en]) => (visible = en.isIntersecting)); io.observe(cv);

    if (reduce) {
      for (let i = 0; i < 6; i++) fire();
      pulses.forEach((p) => { p.t = 1; });
      frame(0); cancelAnimationFrame(raf);
    } else {
      window.addEventListener('pointermove', onMove, { passive: true });
      document.addEventListener('pointerleave', onLeave);
      raf = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', ...style }}
    />
  );
}
