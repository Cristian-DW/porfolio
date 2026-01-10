import { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg';
import Menu from '../assets/menu.svg';
import { Link } from 'react-scroll';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './extras/LanguageSelector';
import clsx from 'clsx';

/**
 * Nav component.
 * This component provides the navigation bar with links to different sections of the page.
 * It includes a responsive design with a mobile menu.
 */
const Nav = () => {
  const { t } = useTranslation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuClasses = isMobileMenuOpen ? 'block' : 'hidden';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Disable scroll when the mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className={clsx(
          "fixed top-4 inset-x-0 mx-auto z-40 w-[70vw] max-w-[1400px] rounded-3xl transition-all duration-500 animate-fade-down animate-once animate-ease-linear",
          isScrolled
            ? "border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg"
            : "border-transparent bg-transparent backdrop-blur-none shadow-none"
        )}
      >
        <div className="mx-auto max-w-7xl px-2">
          <div className="flex h-14 items-center justify-between">
            <div className="absolute t-0 right-2 flex items-center 2xl:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center hover:scale-125"
                onClick={toggleMobileMenu}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <img width="30px" height="30px" src={Menu} alt="menu" />
              </button>
            </div>
            <div className="flex flex-1 items-center 2xl:items-stretch 2xl:justify-between">
              <div className="flex flex-shrink-0 items-end space-x-4 2xl:mr-20">
                <a className="button-hover" href="/">
                  <img width="12px" height="12px" className="h-12 w-auto" src={Logo} alt="logo" />
                </a>
                <a href="/" className="py-2 font-nav font-medium button-hover 2xl:block">
                  Cristian Castro
                </a>
              </div>
              <div className="hidden 2xl:ml-6 2xl:block">
                <div className="flex space-x-8 text-white">
                  <Link to="about" smooth={true} duration={900} className="py-2 font-nav font-normal nav-link cursor-pointer">
                    {t('nav.about')}
                  </Link>
                  <Link to="skill" smooth={true} duration={900} offset={-420} className="py-2 font-nav font-normal nav-link cursor-pointer">
                    {t('nav.skills')}
                  </Link>
                  <Link to="education" smooth={true} duration={900} className="px-2 py-2 font-nav font-normal nav-link cursor-pointer">
                    {t('nav.education')}
                  </Link>
                  <Link to="project" smooth={true} duration={900} offset={-100} className="py-2 font-nav font-normal nav-link cursor-pointer">
                    {t('nav.projects')}
                  </Link>
                  <Link to="contact" smooth={true} duration={900} className="py-2 font-nav font-normal nav-link cursor-pointer">
                    {t('nav.contact')}
                  </Link>
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Capa de fondo desenfocado */}
      {isMobileMenuOpen && <div className="fixed inset-0 top-16 right-0 w-full z-30 backdrop-blur-lg backdrop-filter animate-fade-left animate-once animate-duration-400 animate-delay-500 animate-ease-linear" onClick={toggleMobileMenu} />}

      {/* Componente del menú desplegable */}
      {isMobileMenuOpen && (
        <div className={`2xl:hidden ${mobileMenuClasses} fixed top-16 right-0 w-full h-full bg-opacity-80 z-30 animate-fade-left animate-once animate-duration-800 animate-delay-500 animate-ease-linear`}>
          <div className="flex flex-col items-center justify-around w-full">
            <Link to="about" smooth={true} duration={900} className="block py-14 text-lg w-full text-center cursor-pointer" onClick={toggleMobileMenu}>
              {t('nav.about')}
            </Link>
            <Link to="skill" smooth={true} duration={900} offset={-420} className="block py-14 text-lg w-full text-center cursor-pointer" onClick={toggleMobileMenu}>
              {t('nav.skills')}
            </Link>
            <Link to="education" smooth={true} duration={900} offset={-120} className="block py-14 text-lg w-full text-center cursor-pointer" onClick={toggleMobileMenu}>
              {t('nav.education')}
            </Link>
            <Link to="project" smooth={true} duration={900} offset={-100} className="block py-14 text-lg w-full text-center cursor-pointer" onClick={toggleMobileMenu}>
              {t('nav.projects')}
            </Link>
            <Link to="contact" smooth={true} duration={900} offset={-100} className="block py-14 text-lg w-full text-center cursor-pointer" onClick={toggleMobileMenu}>
              {t('nav.contact')}
            </Link>
            <div className="block py-8 text-lg w-full text-center">
              <LanguageSelector />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
