import React, { useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'system';

const applyTheme = (preference: Theme) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const resolved = preference === 'system' ? (prefersDark ? 'dark' : 'light') : preference;
  document.documentElement.setAttribute('data-theme', resolved);
};

/**
 * ThemeSwitcher — compact inline 3-icon segmented control.
 * Dark | Light | System — active icon highlighted in brand color.
 * No dropdown. Instant switch.
 */
const ThemeSwitcher: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const stored = (localStorage.getItem('portfolio-theme') as Theme) || 'light';
    setTheme(stored);
    applyTheme(stored);
  }, []);

  // Listen for system preference changes when theme is 'system'
  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => { if (theme === 'system') applyTheme('system'); };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  const handleSelect = (t: Theme) => {
    setTheme(t);
    localStorage.setItem('portfolio-theme', t);
    applyTheme(t);
  };

  const options: { value: Theme; label: string; icon: React.ReactNode }[] = [
    {
      value: 'dark',
      label: 'Dark',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      ),
    },
    {
      value: 'light',
      label: 'Light',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ),
    },
    {
      value: 'system',
      label: 'System',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5">
          <rect x="2" y="3" width="20" height="14" rx="2"/>
          <line x1="8" y1="21" x2="16" y2="21"/>
          <line x1="12" y1="17" x2="12" y2="21"/>
        </svg>
      ),
    },
  ];

  return (
    <div
      className="flex items-center rounded-lg border border-line/12 overflow-hidden bg-surface-card/60"
      role="group"
      aria-label="Theme selector"
    >
      {options.map((opt) => {
        const isActive = theme === opt.value;
        return (
          <button
            key={opt.value}
            id={`theme-${opt.value}`}
            onClick={() => handleSelect(opt.value)}
            aria-label={`${opt.label} theme`}
            aria-pressed={isActive}
            className={`
              px-2.5 py-1.5 flex items-center justify-center
              transition-all duration-200
              ${isActive
                ? 'bg-brand text-white'
                : 'text-muted hover:text-primary hover:bg-line/8'
              }
            `}
          >
            {opt.icon}
          </button>
        );
      })}
    </div>
  );
};

export default ThemeSwitcher;
