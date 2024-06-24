
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Logo from '../assets/logo.svg';
import { Link } from 'react-scroll';

/**
 * Footer component.
 * This component displays the footer with navigation links and dynamically adjusts the background color based on the selectedColor prop.
 * @param {string} selectedColor - The selected background color class.
 */
const Footer: React.FC<{ selectedColor: string }> = ({ selectedColor }) => {
  const [backgroundClass, setBackgroundClass] = useState('bg-fondo2');

  useEffect(() => {
    // Update backgroundClass when selectedColor changes
    switch (selectedColor) {
      case 'bg-fondo3':
        setBackgroundClass('bg-fondo3');
        break;
      case 'bg-fondo4':
        setBackgroundClass('bg-fondo4');
        break;
      default:
        setBackgroundClass('bg-fondo2'); // Default value
        break;
    }
  }, [selectedColor]);

  return (
    <div className={`${backgroundClass} h-[20rem] dark:bg-gray-900`}>
      <div className="w-full max-w-screen-xl mx-auto p-4 2xl:py-8">
        <div className="flex items-center justify-center border-b mb-3 2xl:mb-16">
          <a href="/" className="flex items-center sm:mb-0">
            <img src={Logo} className="h-16 2xl:h-20" alt="Logo" />
          </a>
        </div>
        <div className="flex items-center justify-center 2xl:mb-16">
          <div className="flex space-x-3 2xl:space-x-10 text-white">
            {['about', 'skill', 'education', 'porfolio', 'contact'].map((section, index) => (
              <Link
                key={index}
                to={section}
                smooth={true}
                duration={900}
                offset={section === 'skill' ? -420 : section === 'porfolio' ? -100 : 0}
                className="py-4 text-xs 2xl:text-lg md:font-nav font-medium hover:border-b-2 button-hover cursor-pointer"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </Link>
            ))}
          </div>
        </div>
        <hr className="border-gray-200 sm:mx-auto dark:border-gray-700 mb-12 2xl:mb-4" />
        <span className="block text-sm 2xl:text-lg text-letra text-center dark:text-gray-400">
          © 2023{" "}
          <a
            href="https://www.linkedin.com/in/cristian-castro-pineda/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Cristian Castro™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </div>
  );
}

export default Footer;
