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
      className={`${selectedColor} transition-colors duration-300 h-[20rem] relative z-[9999] pointer-events-auto`}
    >
      <div className="w-full max-w-screen-xl mx-auto p-4 2xl:py-8">
        <div className="flex items-center justify-center border-b mb-3 2xl:mb-16">
          <a href="/" className="flex items-center sm:mb-0">
            <img src={Logo} className="h-16 2xl:h-20" alt="Logo" />
          </a>
        </div>

        <div className="flex flex-wrap justify-center items-center 2xl:mb-8 space-x-3 2xl:space-x-10 text-white text-center">
          {sections.map((section, index) => (
            <Link
              key={index}
              to={section} // 👈 coincide con el id de la sección
              smooth={true}
              duration={900}
              offset={
                section === 'skill'
                  ? -420
                  : section === 'project'
                  ? -100
                  : 0
              }
              className="py-4 text-xs 2xl:text-lg md:font-nav font-medium hover:border-b-2 button-hover cursor-pointer pointer-events-auto"
            >
              {t(`footer.sections.${section}`)}
            </Link>
          ))}
        </div>

        <div className="mt-4 text-center text-white text-sm 2xl:text-base">
          © 2025 <span className="font-semibold">Cristian Castro</span>. {t('footer.rights')}
        </div>
      </div>
    </div>
  );
};

export default Footer;