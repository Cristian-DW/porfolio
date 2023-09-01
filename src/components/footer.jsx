
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Logo from '../assets/Logo.svg';
import { Link } from 'react-scroll';



const Footer = ({ selectedColor }) => {
    const [backgroundClass, setBackgroundClass] = useState('bg-fondo2');
  
    useEffect(() => {
      // Cuando selectedColor cambia en el componente App, actualiza backgroundClass
      if (selectedColor === 'bg-fondo3') {
        setBackgroundClass('bg-fondo3');
      } else if (selectedColor === 'bg-fondo4') {
        setBackgroundClass('bg-fondo4');
      } else {
        setBackgroundClass('bg-fondo2'); // Establece un valor predeterminado si es necesario
      }
    }, [selectedColor]);


  return (
    <div className={`${backgroundClass} bg-fondo2 h-[20rem] dark:bg-gray-900`}>
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="flex items-center justify-center border-b mb-3 md:mb-16 ">
          <a href="/" className="flex items-center  sm:mb-0">
            <img src={Logo} className=" h-16 md:h-20" alt="Logo" />
          </a>
        </div>
        <div className="flex items-center justify-center  md:mb-16">
          <div className="flex space-x-3  md:space-x-10 text-white">
            <Link
              to="about"
              smooth={true}
              duration={900}
              className="py-4 text-xs md:text-2xl md:font-nav font-medium hover:border-b-2 button-hover cursor-pointer"
            >
              Conóceme
            </Link>
            <Link
              to="skill"
              smooth={true}
              duration={900}
              offset={-420}
              className="py-4 text-xs md:text-2xl md:font-nav font-medium hover:border-b-2 button-hover cursor-pointer"
            >
              Habilidades
            </Link>
            <Link
              to="education"
              smooth={true}
              duration={900}
              className=" py-4 text-xs md:text-2xl  md:font-nav font-medium hover:border-b-2 button-hover cursor-pointer"
            >
              Educación
            </Link>
            <Link
              to="porfolio"
              smooth={true}
              duration={900}
              offset={-100}
              className="py-4 text-xs md:text-2xl md:font-nav font-medium hover:border-b-2 button-hover cursor-pointer"
            >
              Proyectos
            </Link>

            <Link
              to="contact"
              smooth={true}
              duration={900}
              className="py-4 text-xs md:text-2xl md:font-nav font-medium hover:border-b-2 button-hover cursor-pointer"
            >
              Contáctame
            </Link>
          </div>
        </div>
        <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700  mb-12  md:mb-4 " />
        <span className="block text-sm  md:text-2xl text-letra text-center dark:text-gray-400">
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