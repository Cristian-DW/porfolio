import React, { useEffect, useRef } from 'react';

interface BackgroundProps { className?: string; }

/**
 * Background — "System Topology"
 *
 * Visual concept aligned with the portfolio's professional context:
 *   Software Architecture · Cloud · Enterprise Integration · AI · Creativity
 *
 * 30 seeded nodes distributed across the hero canvas.
 * Nearby nodes are connected by thin edges (< 180px apart).
 * This represents: system topology, cloud infrastructure, integration
 * patterns, neural networks — the visual language of the portfolio's domain.
 *
 * Three animation layers:
 *   1. NODE PULSE  — nodes slowly breathe (scale + opacity oscillation)
 *   2. SIGNAL FLOW — a dot travels along each edge periodically,
 *                    representing data packets, API calls, events
 *   3. CURSOR REVEAL — nodes + edges near cursor glow/brighten
 *                      (structural revelation, not movement)
 *
 * At rest: barely visible (nodes 0.10 opacity, edges 0.06).
 * On cursor: illuminated nodes reach 0.65, edges 0.35.
 * Signal pulses peak at 0.45 opacity mid-edge.
 *
 * Light mode: deep navy  rgb(10, 35, 95)
 * Dark mode:  soft blue  rgb(75, 145, 240)
 *
 * Performance:
 *   - Zero external dependencies
 *   - Single requestAnimationFrame loop
 *   - Seeded PRNG → stable layout, no layout-shift on resize
 *   - pointer-events: none on canvas
 *   - prefers-reduced-motion: static frame
 */

// ── Seeded PRNG ────────────────────────────────────────────────────────────────
function mulberry32(seed: number) {
  return () => {
    seed += 0x6D2B79F5;
    let t = seed;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Types ──────────────────────────────────────────────────────────────────────
interface Node {
  nx: number;   // x, normalized 0-1 (home position)
  ny: number;   // y, normalized 0-1 (home position)
  dx: number;   // displacement x (pixels, from cursor repulsion)
  dy: number;   // displacement y
  vx: number;   // velocity x (for inertia)
  vy: number;   // velocity y
  phase: number; // oscillation phase offset
  pulseSpd: number; // individual breathing speed
  r: number;   // display radius (px)
}

interface Edge {
  a: number;  // index into nodes[]
  b: number;  // index into nodes[]
}

interface Signal {
  edgeIdx: number;  // which edge
  t: number;        // progress 0→1 along edge
  dir: number;      // +1 or -1
  spd: number;      // speed (fraction of edge per second)
  delay: number;    // initial delay before starting
}

// ── Component ──────────────────────────────────────────────────────────────────
const Background: React.FC<BackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDarkRef = useRef(true);

  // ── Theme observer ─────────────────────────────────────────────────────────
  useEffect(() => {
    const read = () => {
      isDarkRef.current =
        document.documentElement.getAttribute('data-theme') !== 'light';
    };
    read();
    const obs = new MutationObserver(read);
    obs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => obs.disconnect();
  }, []);

  // ── Canvas effect ──────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced  = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    // ── Config ───────────────────────────────────────────────────────────
    const N_NODES   = isMobile ? 22 : 40;
    const MAX_DIST  = 195;   // max edge length (px)
    const MAX_EDGES = 3;     // max edges per node (keeps graph sparse)

    // Node appearance — separate light/dark values for proper contrast
    const NODE_R_BASE   = 3.5;   // rest radius px
    const NODE_A_BASE_L = 0.12;  // rest opacity — light mode
    const NODE_A_BASE_D = 0.30;  // rest opacity — dark mode (much higher: dark bg = less natural contrast)
    const NODE_A_CUR_L  = 0.70;  // cursor peak opacity — light mode
    const NODE_A_CUR_D  = 0.95;  // cursor peak opacity — dark mode
    const NODE_PULSE    = 0.06;  // pulse amplitude (opacity swing)
    const NODE_SPD      = 0.0006; // pulse speed (rad/ms)

    // Edge appearance
    const EDGE_W        = 0.7;   // stroke width
    const EDGE_A_BASE_L = 0.08;  // rest opacity — light mode
    const EDGE_A_BASE_D = 0.18;  // rest opacity — dark mode
    const EDGE_A_CUR_L  = 0.40;  // cursor peak — light mode
    const EDGE_A_CUR_D  = 0.70;  // cursor peak — dark mode

    // Signal (data packet traveling along edge)
    const SIG_R       = 2.5;    // signal dot radius
    const SIG_A_L     = 0.50;   // signal peak opacity — light
    const SIG_A_D     = 0.75;   // signal peak opacity — dark
    const SIG_TRAIL   = 0.20;   // signal tail opacity fraction
    const SIG_SPD     = 0.00018; // signal speed (fraction of edge/ms)

    // Cursor
    const CUR_R      = 210;   // influence radius px
    const CUR_LERP   = 0.07;  // lerp speed (inertia)
    const REPEL_STR  = 28;    // repulsion strength (pixels push at center)
    const REPEL_DAMP = 0.88;  // velocity damping (0-1, lower = more friction)
    const HOME_STR   = 0.035; // spring force back to home position

    // ── Build topology (seeded → stable across renders) ───────────────────
    const rand = mulberry32(0x5F3759DF);

    // Nodes — distributed with some margin from edges
    const nodes: Node[] = [];
    for (let i = 0; i < N_NODES; i++) {
      // Margin of 8% from each edge
      nodes.push({
        nx:       0.05 + rand() * 0.90,
        ny:       0.07 + rand() * 0.86,
        dx: 0, dy: 0,   // displacement starts at 0
        vx: 0, vy: 0,   // velocity starts at 0
        phase:    rand() * Math.PI * 2,
        pulseSpd: NODE_SPD * (0.7 + rand() * 0.6),
        r:        NODE_R_BASE * (0.8 + rand() * 0.45),
      });
    }

    // Edges — connect nearby nodes, max MAX_EDGES per node
    const edgeCounts = new Array(N_NODES).fill(0);
    const edges: Edge[] = [];

    // Sort all possible pairs by distance, add shortest first
    const pairs: { a: number; b: number; d2: number }[] = [];
    for (let i = 0; i < N_NODES; i++) {
      for (let j = i + 1; j < N_NODES; j++) {
        const dx = nodes[i].nx - nodes[j].nx;
        const dy = nodes[i].ny - nodes[j].ny;
        pairs.push({ a: i, b: j, d2: dx * dx + dy * dy });
      }
    }
    pairs.sort((x, y) => x.d2 - y.d2);

    // Add edges — only if within MAX_DIST (at 1000px wide canvas) and under MAX_EDGES per node
    const DIST_NORM = MAX_DIST / 1000; // normalized at 1000px reference width
    for (const { a, b, d2 } of pairs) {
      if (d2 > DIST_NORM * DIST_NORM * 1.8) break; // approximate — will refine per-frame
      if (edgeCounts[a] >= MAX_EDGES) continue;
      if (edgeCounts[b] >= MAX_EDGES) continue;
      edges.push({ a, b });
      edgeCounts[a]++;
      edgeCounts[b]++;
    }

    // Signals — one per edge, staggered start delays
    const signals: Signal[] = edges.map((_, i) => ({
      edgeIdx: i,
      t:       rand(),                           // random start position
      dir:     rand() > 0.5 ? 1 : -1,
      spd:     SIG_SPD * (0.55 + rand() * 0.9),
      delay:   rand() * 6000,                    // stagger up to 6s
    }));

    // ── Cursor state ─────────────────────────────────────────────────────
    let rawX = -9999, rawY = -9999;
    let smX  = -9999, smY  = -9999;
    let W = 0, H = 0;

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr  = devicePixelRatio;
      W = canvas.width  = rect.width  * dpr;
      H = canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // ── Pointer events — listen on WINDOW (canvas has pointer-events:none) ───
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      // Only track if cursor is within the canvas area
      if (x >= 0 && x <= r.width && y >= 0 && y <= r.height) {
        rawX = x;
        rawY = y;
      } else {
        rawX = -9999;
        rawY = -9999;
      }
    };
    const onLeave = () => { rawX = -9999; rawY = -9999; };

    window.addEventListener('mousemove', onMove,  { passive: true });
    window.addEventListener('mouseleave', onLeave, { passive: true });

    // ── Per-node cursor influence cache ───────────────────────────────────
    // Computed once per frame so edges can reuse node influence values
    const nodeInfluence = new Float32Array(N_NODES);

    // ── rAF loop ──────────────────────────────────────────────────────────
    let raf = 0;
    let lastT = 0;
    let elapsed = 0; // total elapsed ms (for signals)

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = Math.min(t - lastT, 50);
      lastT = t;
      if (!reduced) elapsed += dt;

      const dark = isDarkRef.current;
      const w    = W / devicePixelRatio;
      const h    = H / devicePixelRatio;

      // Colors — brighter in dark mode for contrast against dark bg
      // Light: deep navy rgb(10,35,95)
      // Dark:  bright blue rgb(100,175,255) — visible against rgb(10,15,30)
      const baseR = dark ? 100 : 10;
      const baseG = dark ? 175 : 35;
      const baseB = dark ? 255 : 95;
      const rgb   = `${baseR},${baseG},${baseB}`;

      // Per-frame resolved opacity constants
      const NODE_A_BASE = dark ? NODE_A_BASE_D : NODE_A_BASE_L;
      const NODE_A_CUR  = dark ? NODE_A_CUR_D  : NODE_A_CUR_L;
      const EDGE_A_BASE = dark ? EDGE_A_BASE_D : EDGE_A_BASE_L;
      const EDGE_A_CUR  = dark ? EDGE_A_CUR_D  : EDGE_A_CUR_L;
      const SIG_A       = dark ? SIG_A_D       : SIG_A_L;

      // Surface color (for bottom fade)
      const sR = dark ? 10  : 246;
      const sG = dark ? 15  : 248;
      const sB = dark ? 30  : 255;

      // ── Cursor lerp ─────────────────────────────────────────────────
      if (!isMobile) {
        smX += (rawX - smX) * CUR_LERP;
        smY += (rawY - smY) * CUR_LERP;
      }

      // ── Clear ────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, w, h);

      // ── Compute per-node cursor influence + physics ─────────────────
      for (let i = 0; i < N_NODES; i++) {
        const n  = nodes[i];
        const hx = n.nx * w;  // home position in pixels
        const hy = n.ny * h;
        const px = hx + n.dx; // actual position (home + displacement)
        const py = hy + n.dy;

        let inf = 0;
        if (!isMobile && smX > -100) {
          const ddx = px - smX;
          const ddy = py - smY;
          const d   = Math.sqrt(ddx * ddx + ddy * ddy);
          if (d < CUR_R && d > 0.5) {
            inf = (1 - d / CUR_R) ** 1.6;

            // Repulsion force: push node away from cursor
            const force = inf * REPEL_STR * 0.12;
            n.vx += (ddx / d) * force;
            n.vy += (ddy / d) * force;
          }
        }

        // Spring back to home position
        n.vx -= n.dx * HOME_STR;
        n.vy -= n.dy * HOME_STR;

        // Apply velocity with damping
        n.vx *= REPEL_DAMP;
        n.vy *= REPEL_DAMP;
        n.dx += n.vx;
        n.dy += n.vy;

        nodeInfluence[i] = inf;
      }

      // ── Draw edges (using displaced positions) ──────────────────────
      for (const edge of edges) {
        const na = nodes[edge.a];
        const nb = nodes[edge.b];
        // Actual positions = home + displacement
        const ax = na.nx * w + na.dx, ay = na.ny * h + na.dy;
        const bx = nb.nx * w + nb.dx, by = nb.ny * h + nb.dy;

        // Skip if edge is too long for current canvas size
        const dx = bx - ax, dy = by - ay;
        const eDist = Math.sqrt(dx * dx + dy * dy);
        if (eDist > MAX_DIST * 1.5) continue;

        // Edge opacity driven by cursor influence of its endpoints
        const inf = Math.max(nodeInfluence[edge.a], nodeInfluence[edge.b]);
        const alpha = EDGE_A_BASE + inf * (EDGE_A_CUR - EDGE_A_BASE);

        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.strokeStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
        ctx.lineWidth   = EDGE_W;
        ctx.stroke();
      }

      // ── Draw signal pulses (data flowing along edges) ─────────────────
      if (!reduced) {
        for (let si = 0; si < signals.length; si++) {
          const sig  = signals[si];

          // Respect stagger delay
          if (elapsed < sig.delay) continue;

          const edge = edges[sig.edgeIdx];
          const na   = nodes[edge.a];
          const nb   = nodes[edge.b];
          const ax   = na.nx * w + na.dx, ay = na.ny * h + na.dy;
          const bx   = nb.nx * w + nb.dx, by = nb.ny * h + nb.dy;

          const dx = bx - ax, dy = by - ay;
          const eDist = Math.sqrt(dx * dx + dy * dy);
          if (eDist > MAX_DIST) continue;

          // Advance signal
          sig.t += sig.spd * dt * sig.dir;
          if (sig.t > 1) { sig.t = 1; sig.dir = -1; }
          if (sig.t < 0) { sig.t = 0; sig.dir = 1;  }

          // Signal position
          const sx = ax + dx * sig.t;
          const sy = ay + dy * sig.t;

          // Alpha: full at center, faded at ends (bell curve via sin)
          const bell = Math.sin(sig.t * Math.PI);
          const sAlpha = SIG_TRAIL + bell * (SIG_A - SIG_TRAIL);

          // Draw signal dot
          ctx.beginPath();
          ctx.arc(sx, sy, SIG_R, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${rgb},${sAlpha.toFixed(3)})`;
          ctx.fill();
        }
      }

      // ── Draw nodes (at displaced positions) ────────────────────────
      for (let i = 0; i < N_NODES; i++) {
        const n    = nodes[i];
        const px   = n.nx * w + n.dx;  // actual x = home + displacement
        const py   = n.ny * h + n.dy;  // actual y = home + displacement
        const inf  = nodeInfluence[i];

        // Breathing pulse (slow oscillation)
        const pulse = reduced ? 0 : Math.sin(elapsed * n.pulseSpd + n.phase) * NODE_PULSE;
        const alpha = NODE_A_BASE + pulse + inf * (NODE_A_CUR - NODE_A_BASE - pulse);
        const r     = n.r * (1 + inf * 0.45);

        // Node ring (outer)
        ctx.beginPath();
        ctx.arc(px, py, r + 2.5, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgb},${(alpha * 0.35).toFixed(3)})`;
        ctx.lineWidth   = 0.8;
        ctx.stroke();

        // Node fill (inner)
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${alpha.toFixed(3)})`;
        ctx.fill();

        // Cursor glow ring
        if (inf > 0.15) {
          ctx.beginPath();
          ctx.arc(px, py, r + 8, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${rgb},${(inf * 0.18).toFixed(3)})`;
          ctx.lineWidth   = 3;
          ctx.stroke();
        }
      }

      // ── Bottom fade ───────────────────────────────────────────────────
      const fh  = h * 0.14;
      const grd = ctx.createLinearGradient(0, h - fh, 0, h);
      grd.addColorStop(0, `rgba(${sR},${sG},${sB},0)`);
      grd.addColorStop(1, `rgba(${sR},${sG},${sB},1)`);
      ctx.fillStyle = grd;
      ctx.fillRect(0, h - fh, w, fh);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`absolute inset-0 w-full h-full overflow-hidden ${className || ''}`}
      aria-hidden="true"
    >
      {/*
        Canvas is transparent — hero section's CSS bg-surface remains intact.
        Only draws: node rings, edges, signal dots, bottom fade.
        pointer-events: none → never blocks clicks or text selection.
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  );
};

export default Background;
