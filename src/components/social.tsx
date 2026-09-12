import React from 'react';

/**
 * Social component — v3.
 * Mobile-only bottom bar with inline SVG icons that adapt to light/dark mode.
 * Hidden on desktop (≥1024px) since links exist in hero + contact sections.
 */
const Social: React.FC = () => {
  const socialLinks = [
    {
      href: "https://github.com/Cristian-DW",
      label: "GitHub Profile",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      href: "mailto:cristtiiank@gmail.com",
      label: "Send Email",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <rect x="2" y="4" width="20" height="16" rx="2"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      href: "https://www.linkedin.com/in/cristian-castro-pineda/",
      label: "LinkedIn Profile",
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Mobile & tablet only — hidden on desktop (lg and above) */}
      <div
        className="fixed bottom-0 left-0 right-0 w-full h-14
                    bg-surface/85 backdrop-blur-xl
                    flex justify-around items-center px-6
                    border-t border-line/10
                    lg:hidden z-50"
      >
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={link.label}
            className="p-3 rounded-xl text-muted hover:text-brand
                       transition-all duration-300
                       hover:scale-110 hover:bg-brand/8
                       active:scale-95"
          >
            {link.icon}
          </a>
        ))}
      </div>
    </>
  );
};

export default Social;
