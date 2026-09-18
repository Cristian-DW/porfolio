import { useEffect, useRef } from 'react';

/**
 * ArchCursor — a custom cursor with architectural identity.
 *
 * Visual concept: engineering targeting reticle.
 * A precise dot marks the exact pointer position.
 * A trailing ring morphs contextually based on what's being hovered.
 *
 * States:
 *   default   → dot (4px) + ring (20px), corner tick marks
 *   hover     → ring expands (32px), fill faint brand, ticks grow
 *   explore   → ring becomes oval (wide), signals "open / explore"
 *   expand    → ring rotates 45°, signals "more detail available"
 *   pressed   → ring contracts to 70%, springs back on release
 *   idle 2s   → subtle opacity breathe (no size change)
 *
 * Motion: lerp trailing at factor 0.18 (responsive but with inertia)
 * Disabled: pointer:coarse (touch) + prefers-reduced-motion
 */

const INTERACTIVE = 'a, button, [role="button"], input, textarea, select, label';

const ArchCursor: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only on pointer:fine devices
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const ring = ringRef.current;
    const dot  = dotRef.current;
    if (!ring || !dot) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ease = reduced ? 1 : 0.18;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let raf = 0;
    let idleTimer: ReturnType<typeof setTimeout>;

    // ── Animation loop ──────────────────────────────────────────────
    const tick = () => {
      rx += (mx - rx) * ease;
      ry += (my - ry) * ease;
      ring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      dot.style.transform  = `translate3d(${mx}px,${my}px,0)`;
      raf = requestAnimationFrame(tick);
    };

    // ── State helpers ────────────────────────────────────────────────
    const setState = (state: string) => {
      ring.dataset.state = state;
    };

    const resetIdle = () => {
      ring.classList.remove('arch-idle');
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        if (!ring.dataset.state || ring.dataset.state === 'default') {
          ring.classList.add('arch-idle');
        }
      }, 2200);
    };

    // ── Event handlers ───────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      ring.classList.add('arch-visible');
      dot.classList.add('arch-visible');
      resetIdle();
    };

    const getCursorType = (target: EventTarget | null): string => {
      if (!(target instanceof Element)) return 'none';
      const el = target.closest('[data-cursor]');
      if (el) return (el as HTMLElement).dataset.cursor || 'none';
      if (target.closest(INTERACTIVE)) return 'hover';
      return 'none';
    };

    const onOver = (e: MouseEvent) => {
      const type = getCursorType(e.target);
      if (type === 'none') {
        setState('default');
      } else if (type === 'explore') {
        setState('explore');
        dot.classList.add('arch-dimmed');
      } else if (type === 'expand') {
        setState('expand');
        dot.classList.add('arch-dimmed');
      } else {
        setState('hover');
        dot.classList.add('arch-dimmed');
      }
    };

    const onOut = (e: MouseEvent) => {
      const type = getCursorType(e.target);
      if (type !== 'none') {
        setState('default');
        dot.classList.remove('arch-dimmed');
      }
    };

    const onDown = () => {
      ring.classList.add('arch-pressed');
      ring.classList.remove('arch-idle');
    };
    const onUp = () => ring.classList.remove('arch-pressed');

    const onLeave = () => {
      ring.classList.remove('arch-visible', 'arch-idle', 'arch-pressed');
      dot.classList.remove('arch-visible', 'arch-dimmed');
    };

    // ── Bind events ──────────────────────────────────────────────────
    document.addEventListener('mousemove',  onMove,  { passive: true });
    document.addEventListener('mouseover',  onOver,  { passive: true });
    document.addEventListener('mouseout',   onOut,   { passive: true });
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);
    document.documentElement.addEventListener('mouseleave', onLeave);

    raf = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove',  onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      clearTimeout(idleTimer);
    };
  }, []);

  return (
    <>
      {/* Trailing ring — morphs by state */}
      <div ref={ringRef} className="arch-cursor-ring" aria-hidden="true" data-state="default">
        <div className="arch-ring-inner">
          {/* Corner tick marks — engineering reticle identity */}
          <span className="arch-tick arch-tick-tl" />
          <span className="arch-tick arch-tick-tr" />
          <span className="arch-tick arch-tick-bl" />
          <span className="arch-tick arch-tick-br" />
          {/* Center crosshair — visible on expand state */}
          <span className="arch-center-h" />
          <span className="arch-center-v" />
        </div>
      </div>
      {/* Precision dot — always at exact mouse position */}
      <div ref={dotRef} className="arch-cursor-dot" aria-hidden="true">
        <span className="arch-dot-inner" />
      </div>
    </>
  );
};

export default ArchCursor;
