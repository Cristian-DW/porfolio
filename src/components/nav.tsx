import { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import Logo from '../assets/logo.svg';
import { useTranslation } from 'react-i18next';
import ThemeSwitcher from './extras/ThemeSwitcher';
import LanguageSelector from './extras/LanguageSelector';
import clsx from 'clsx';

const Nav = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { to: 'about',        label: t('nav.about') },
    { to: 'capabilities', label: t('nav.capabilities') },
    { to: 'work',         label: t('nav.work') },
    { to: 'career',       label: t('nav.career') },
    { to: 'contact',      label: t('nav.contact') },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={clsx(
          'fixed top-4 inset-x-0 mx-auto z-40 w-[90vw] max-w-6xl rounded-2xl transition-all duration-500 animate-fade-down animate-once animate-ease-linear',
          isScrolled
            ? 'border border-line/10 bg-surface/85 backdrop-blur-xl shadow-xl'
            : 'border-transparent bg-transparent backdrop-blur-none shadow-none'
        )}
      >
        <div className="px-4 md:px-6">
          <div className="flex h-14 items-center justify-between">
            <a href="/" className="flex items-center gap-2 button-hover flex-shrink-0">
              <img className="h-9 w-auto" src={Logo} alt="Cristian Castro" />
            </a>

            {/* Desktop nav links — visible at lg (1024px+) */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth={true}
                  duration={900}
                  offset={-100}
                  className="text-sm font-medium text-muted nav-link cursor-pointer hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="hidden sm:flex items-center gap-1.5">
                <ThemeSwitcher />
                <div className="w-px h-4 bg-line/15 mx-0.5" />
                <LanguageSelector />
              </div>
              {/* Hamburger — only on mobile/tablet (<lg) */}
              <button
                type="button"
                className="flex items-center justify-center w-9 h-9 rounded-lg border border-line/10 hover:bg-line/8 transition-all duration-200 lg:hidden text-muted hover:text-primary"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-20 z-30 bg-surface/90 backdrop-blur-xl lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed top-20 left-4 right-4 z-40 rounded-2xl border border-line/10 bg-surface-card shadow-2xl p-6 lg:hidden animate-fade-down animate-duration-300"
        >
          <div className="flex flex-col gap-1 mb-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                smooth={true}
                duration={900}
                offset={-100}
                className="block py-3 px-4 text-sm font-medium text-muted hover:text-primary hover:bg-line/5 rounded-xl transition-all cursor-pointer"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3 pt-4 border-t border-line/10">
            <ThemeSwitcher />
            <div className="w-px h-4 bg-line/15" />
            <LanguageSelector />
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
