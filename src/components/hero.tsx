import { Link } from 'react-scroll';
import { useState, useEffect } from 'react';
import Background from './extras/Background';
import { useTranslation } from 'react-i18next';

function Hero() {
  const { t } = useTranslation();

  // Show background only on desktop (cursor interaction requires pointer)
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine) and (min-width: 768px)');
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <div
      id="top"
      className="fixed inset-0 w-full h-screen flex justify-center overflow-hidden bg-surface"
    >
      {isDesktop && <Background className="pointer-events-none" />}

      <div className="relative z-20 max-w-6xl mx-auto px-6 sm:px-8 w-full flex flex-col items-center justify-center pointer-events-auto">

        {/* Eyebrow */}
        <span className="section-eyebrow animate-fade-down animate-once animate-delay-[600ms] text-center">
          {t('hero.eyebrow')}
        </span>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold font-space text-primary text-center animate-fade-down animate-once animate-delay-[800ms] animate-ease-linear leading-[1.1] max-w-4xl mb-6 tracking-tight">
          {t('hero.headline_line1')}{' '}
          <span className="text-gradient">{t('hero.headline_line2')}</span>
        </h1>

        {/* Subheadline */}
        <p className="text-base md:text-xl text-muted text-center mb-10 max-w-2xl animate-fade-down animate-once animate-delay-[1000ms] animate-ease-linear leading-relaxed">
          {t('hero.subheadline')}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center animate-fade-down animate-once animate-delay-[1100ms]">
          {/* Primary: View work → scroll to selected work section */}
          <Link to="work" smooth={true} duration={900}>
            <button className="btn-shine h-12 px-8 rounded-full bg-brand text-white font-bold uppercase tracking-wider text-xs md:text-sm transition-all hover:bg-brand-light hover:scale-105 active:scale-95 shadow-[0_0_24px_rgba(0,112,243,0.35)]">
              {t('hero.cta_work')}
            </button>
          </Link>

          {/* Secondary: LinkedIn external */}
          <a
            href="https://www.linkedin.com/in/cristian-castro-pineda/"
            target="_blank"
            rel="noopener noreferrer"
            className="h-12 px-8 rounded-full bg-surface-card border border-line/10 text-primary font-bold uppercase tracking-wider text-xs md:text-sm transition-all hover:border-brand hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            {/* LinkedIn icon */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-60">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            {t('hero.cta_linkedin')}
          </a>

          {/* Tertiary: Contact → scroll */}
          <Link to="contact" smooth={true} duration={900}>
            <button className="h-12 px-8 rounded-full bg-transparent text-muted font-bold uppercase tracking-wider text-xs md:text-sm transition-all hover:text-primary hover:scale-105 active:scale-95">
              {t('hero.cta_contact')}
            </button>
          </Link>
        </div>

        {/* Scroll indicator — hidden on small devices */}
        <Link
          to="about"
          smooth={true}
          duration={900}
          className="hidden md:flex absolute bottom-8 z-[9999] flex-col items-center text-muted hover:text-primary transition-colors duration-300 animate-bounce animate-infinite animate-duration-[2000ms] animate-delay-[2500ms] cursor-pointer"
        >
          <span className="text-xs mb-2 uppercase tracking-widest">Scroll</span>
          <svg className="w-4 h-4 opacity-60" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default Hero;