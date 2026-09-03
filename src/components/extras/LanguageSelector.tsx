import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * LanguageSelector — compact pill toggle ES · EN
 * Uses semantic design tokens (no hardcoded text-white).
 * Active language: brand color fill. Inactive: muted text.
 */
const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const current = i18n.language === 'es' ? 'es' : 'en';

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem('portfolio-language', lng);
  };

  return (
    <div
      className="flex items-center rounded-lg border border-line/12 overflow-hidden bg-surface-card/60"
      role="group"
      aria-label="Language selector"
    >
      {(['es', 'en'] as const).map((lng) => {
        const isActive = current === lng;
        return (
          <button
            key={lng}
            onClick={() => changeLanguage(lng)}
            aria-label={lng === 'es' ? 'Español' : 'English'}
            aria-pressed={isActive}
            className={`
              px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-wider
              transition-all duration-200
              ${isActive
                ? 'bg-brand text-white'
                : 'text-muted hover:text-primary hover:bg-line/8'
              }
            `}
          >
            {lng.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
};

export default LanguageSelector;