import { useCallback } from 'react';

/**
 * Returns a mousemove handler that feeds --mx/--my CSS variables
 * with the cursor position relative to the hovered element.
 * Pair with the .spotlight-card class to render a radial glow
 * that follows the cursor across cards.
 */
const useSpotlight = () =>
  useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

export default useSpotlight;
