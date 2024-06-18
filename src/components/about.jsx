// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import textImg from '../assets/text-img.webp';
import ImgAbout from '../assets/about.webp';

/**
 * Props for the About component.
 */
interface AboutProps {
  selectedColor: string;
}

/**
 * About component.
 * This component renders information about Cristian Castro with an animated background that changes based on the selected color.
 *
 * @param {string} selectedColor - The background color class passed from the parent component.
 */
const About: React.FC<AboutProps> = ({ selectedColor }) => {
  const [backgroundClass, setBackgroundClass] = useState('bg-fondo2');

  useEffect(() => {
    // Updates the background class based on the selectedColor prop
    switch (selectedColor) {
      case 'bg-fondo3':
        setBackgroundClass('bg-fondo3');
        break;
      case 'bg-fondo4':
        setBackgroundClass('bg-fondo4');
        break;
      default:
        setBackgroundClass('bg-fondo2');
        break;
    }
  }, [selectedColor]);

  return (
    <div
      id="about"
      className="w-full p-8 my-10 2xl:py-44 bg-fondo md:grid grid-cols-5 gap-10 justify-center items-center md:pt-32 2xl:px-40 2xl:min-h-screen"
    >
      <div className="md:col-span-2 md:block xxl:flex justify-center">
        <div className='relative w-[250px] h-[400px] mb-[30px] 2xl:pb-0 2xl:w-[560px] 2xl:h-[792px] bg-black'>
          <img
            src={textImg}
            alt='bienvenida'
            width='auto'
            height='400px'
            className='h-[400px] px-5 2xl:h-[770px] py-5 2xl:px-16 2xl:py-10'
          />
          <div
            className={`absolute w-[220px] 2xl:w-[450px] 2xl:h-[600px] bottom-6 2xl:bottom-14 ${backgroundClass} -right-10 bg-fondo2 m-0 p-0`}
          >
            <img src={ImgAbout} alt='Cristian Castro' width='auto' height='400px' />
          </div>
        </div>
      </div>
      <div className="md:col-span-3">
        <h4 className="text-xl 2xl:text-3xl mb-4">¡HOLA!</h4>
        <p className="text-md font-light 2xl:text-lg">
          Soy Cristian Castro, un enamorado del desarrollo de software con
          conocimientos en la creación de experiencias digitales atractivas y
          funcionales. Durante mi carrera profesional, he trabajado en diversos
          proyectos, desde sitios web robustos hasta aplicaciones web
          dinámicas. Estoy familiarizado con los estándares de la industria y
          las mejores prácticas de desarrollo y me mantengo
          actualizado con las últimas tendencias y tecnologías.
        </p>
        <Link to="contact" smooth={true} duration={900}>
          <button className="button 2xl:mt-28 2xl:w-52 hover:text-fondo animate-fade-down animate-once animate-delay-[3000ms] animate-ease-linear">
            <span className="relative z-10">
              <a href="#contact" className="text-sm xl:text-xl">Contáctame</a>
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default About;
