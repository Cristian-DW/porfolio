import React from 'react';
import Logo from '../assets/logo.svg';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';

const Footer: React.FC<{ selectedColor: string }> = ({ selectedColor }) => {
  const { t } = useTranslation();

  // secciones con ids que coinciden con tu <main>
  const sections: string[] = ['about', 'skill', 'education', 'project', 'contact'];

  return (
    <div
      className={`${selectedColor} transition-colors duration-300 relative z-[9999] pointer-events-auto overflow-hidden`}
    >
      {/* Glassmorphism overlay for premium depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />

      {/* Decorative gradient glow at bottom */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-purple-500/10 blur-3xl rounded-full pointer-events-none" />

      <div className="w-full max-w-screen-xl mx-auto px-4 py-12 md:py-16 2xl:py-20 relative z-10">
        {/* Logo Section */}
        <div className="flex items-center justify-center mb-6 md:mb-8">
          <a href="/" className="flex items-center transition-transform hover:scale-105 duration-300">
            <img src={Logo} className="h-12 md:h-14 2xl:h-16" alt="Logo" />
          </a>
        </div>

        {/* Premium Gradient Separator */}
        <div className="relative h-[2px] w-full max-w-3xl mx-auto mb-8 md:mb-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent blur-sm" />
        </div>

        {/* Navigation Links - Horizontal Wrap Layout */}
        <div className="flex flex-wrap justify-center items-center mb-8 md:mb-10 space-x-3 md:space-x-6 2xl:space-x-10 text-white text-center relative z-50">
          {sections.map((section, index) => (
            <Link
              key={index}
              to={section}
              smooth={true}
              duration={900}
              offset={
                section === 'skill'
                  ? -420
                  : section === 'project'
                    ? -100
                    : 0
              }
              className="py-4 md:py-2 px-2 text-xs md:text-base 2xl:text-lg font-medium 
                         hover:text-purple-300 transition-all duration-300 
                         cursor-pointer pointer-events-auto
                         relative group"
            >
              {t(`footer.sections.${section}`)}
              {/* Hover underline with glow */}
              <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 
                             group-hover:w-full transition-all duration-300 rounded-full" />
              <span className="absolute bottom-1 left-0 w-0 h-[2px] bg-purple-400/50 blur-sm
                             group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* Copyright with subtle gradient */}
        <div className="text-center text-white/80 text-xs md:text-sm 2xl:text-base">
          © 2025{' '}
          <span className="font-semibold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Cristian Castro
          </span>
          . {t('footer.rights')}
        </div>
      </div>
    </div>
  );
};

export default Footer;