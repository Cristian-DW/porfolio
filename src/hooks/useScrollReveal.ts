import { useEffect, useRef, RefObject } from 'react';

interface ScrollRevealOptions {
  threshold?: number;    // 0–1, % visible before trigger. Default: 0.12
  rootMargin?: string;   // IntersectionObserver rootMargin.
  staggerChildren?: boolean; // Apply staggered delay to direct children
  staggerDelay?: number;     // ms between children. Default: 80
  once?: boolean;            // Trigger only once. Default: true
}

/**
 * useScrollReveal — attach the `.reveal` / `.revealed` CSS classes to a
 * container and its direct children using IntersectionObserver.
 *
 * Safety-first by design: content is visible by default in markup and the
 * hidden state is applied only via JS. If IntersectionObserver is missing,
 * or anything goes wrong, elements are force-revealed so information is
 * never trapped behind a failed animation.
 */
export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
): RefObject<T> {
  const {
    threshold       = 0.12,
    rootMargin      = '0px 0px -40px 0px',
    staggerChildren = false,
    staggerDelay    = 80,
    once            = true,
  } = options;

  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const revealNow = () => {
      el.classList.add('revealed');
      if (staggerChildren) {
        Array.from(el.children).forEach((child, i) => {
          const c = child as HTMLElement;
          c.classList.add('reveal', 'revealed');
          c.style.transitionDelay = `${i * staggerDelay}ms`;
        });
      }
    };

    if (!('IntersectionObserver' in window)) {
      revealNow();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const target = entry.target as HTMLElement;
          target.classList.add('revealed');

          if (staggerChildren) {
            Array.from(target.children).forEach((child, i) => {
              const c = child as HTMLElement;
              c.classList.add('reveal');
              setTimeout(() => c.classList.add('revealed'), i * staggerDelay);
            });
          }

          if (once) observer.unobserve(target);
        });
      },
      { threshold, rootMargin }
    );

    el.classList.add('reveal');
    observer.observe(el);

    // Already in view on mount? Reveal immediately (IO can lag on fast loads)
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      revealNow();
      observer.disconnect();
      return;
    }

    // Last-resort safety net: never leave content hidden
    const failsafe = setTimeout(() => {
      if (!el.classList.contains('revealed')) revealNow();
    }, 2500);

    return () => {
      observer.disconnect();
      clearTimeout(failsafe);
    };
  }, [threshold, rootMargin, staggerChildren, staggerDelay, once]);

  return ref;
}

export default useScrollReveal;
