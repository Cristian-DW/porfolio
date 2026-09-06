import React from 'react';
import GithubIcon from "../assets/bxl-github.svg";
import GmailIcon from "../assets/bxl-gmail.svg";
import LinkedInIcon from "../assets/bxl-linkedin.svg";

/**
 * Social component — v2.
 * Clean sidebar (desktop) and bottom bar (mobile) with GitHub, Email, LinkedIn.
 * No theme logic — single curated theme in v2.
 */
const Social: React.FC = () => {
  const socialLinks = [
    {
      href: "https://github.com/Cristian-DW",
      icon: GithubIcon,
      alt: "GitHub",
      label: "GitHub Profile",
    },
    {
      href: "mailto:cristtiiank@gmail.com",
      icon: GmailIcon,
      alt: "Email",
      label: "Send Email",
    },
    {
      href: "https://www.linkedin.com/in/cristian-castro-pineda/",
      icon: LinkedInIcon,
      alt: "LinkedIn",
      label: "LinkedIn Profile",
    },
  ];

  return (
    <>
      {/* Mobile: Bottom Bar */}
      <div
        className="fixed bottom-0 left-0 right-0 w-full h-14
                    bg-surface/80 backdrop-blur-xl
                    flex justify-around items-center px-4
                    border-t border-white/10
                    2xl:hidden z-50"
      >
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={link.label}
            className="p-3 rounded-xl transition-all duration-300 hover:scale-110 hover:bg-white/10 active:scale-95"
          >
            <img
              src={link.icon}
              alt={link.alt}
              className="w-6 h-6 transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,112,243,0.6)]"
            />
          </a>
        ))}
      </div>

      {/* Desktop: Vertical Sidebar */}
      <div
        className="hidden 2xl:flex 2xl:flex-col
                   fixed bottom-6 right-6
                   w-16 gap-4
                   backdrop-blur-xl bg-white/5
                   p-3 rounded-2xl
                   border border-white/10
                   shadow-2xl shadow-brand/10
                   z-50"
      >
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noopener noreferrer"
            aria-label={link.label}
            className="group relative p-2.5 rounded-xl
                       bg-white/5 backdrop-blur-sm
                       border border-white/10
                       transition-all duration-300
                       hover:scale-110 hover:bg-white/10
                       hover:shadow-lg hover:shadow-brand/20
                       active:scale-95"
          >
            <img
              src={link.icon}
              alt={link.alt}
              className="w-6 h-6 transition-all duration-300
                         group-hover:drop-shadow-[0_0_12px_rgba(0,112,243,0.8)]
                         group-hover:brightness-110"
            />
            {/* Decorative glow on hover */}
            <div className="absolute inset-0 rounded-xl bg-brand/0 group-hover:bg-brand/10 transition-all duration-300 blur-sm" />
          </a>
        ))}
      </div>
    </>
  );
};

export default Social;
