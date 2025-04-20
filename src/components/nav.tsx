import React, { useState, useEffect } from 'react';
import Logo from '../assets/logo.svg';
import Menu from '../assets/menu.svg';
import { Link } from 'react-scroll';

/**
 * Nav component.
 * This component provides the navigation bar with links to different sections of the page.
 * It includes a responsive design with a mobile menu.
 */
const Nav = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const mobileMenuClasses = isMobileMenuOpen ? 'block' : 'hidden';

  useEffect(() => {
    // Disable scroll when the mobile menu is open
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav className="fixed top-0 left-0 z-30 w-full border-b-2 backdrop-blur-lg animate-fade-down animate-once animate-ease-linear">
        <div className="mx-auto max-w-8xl px-2 2xl:px-36">
          <div className="flex h-16 items-center justify-between">
            <div className="absolute t-0 right-2 flex items-center 2xl:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center hover:scale-125"
                onClick={toggleMobileMenu}
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
              >
                <img width="30px" height="30px" src={Menu} alt="menu"/>
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
                  <Link to="about" smooth={true} duration={900} className="py-2 font-nav font-medium hover:border-b-2 button-hover cursor-pointer">
                    Conóceme
                  </Link>
                  <Link to="skill" smooth={true} duration={900} offset={-420} className="py-2 font-nav font-medium hover:border-b-2 button-hover cursor-pointer">
                    Habilidades
                  </Link>
                  <Link to="education" smooth={true} duration={900} className="px-2 py-2 font-nav font-medium hover:border-b-2 button-hover cursor-pointer">
                    Educación
                  </Link>
                  <Link to="project" smooth={true} duration={900} offset={-100} className="py-2 font-nav font-medium hover:border-b-2 button-hover cursor-pointer">
                    Proyectos
                  </Link>
                  <Link to="contact" smooth={true} duration={900} className="py-2 font-nav font-medium hover:border-b-2 button-hover cursor-pointer">
                    Contáctame
                  </Link>
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
              Conóceme
            </Link>
            <Link to="skill" smooth={true} duration={900} offset={-420} className="block py-14 text-lg w-full text-center cursor-pointer" onClick={toggleMobileMenu}>
              Habilidades
            </Link>
            <Link to="education" smooth={true} duration={900} offset={-120} className="block py-14 text-lg w-full text-center cursor-pointer" onClick={toggleMobileMenu}>
              Educación
            </Link>
            <Link to="project" smooth={true} duration={900} offset={-100} className="block py-14 text-lg w-full text-center cursor-pointer" onClick={toggleMobileMenu}>
              Proyecto
            </Link>
            <Link to="contact" smooth={true} duration={900} offset={-100} className="block py-14 text-lg w-full text-center cursor-pointer" onClick={toggleMobileMenu}>
              Contáctame
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Nav;
