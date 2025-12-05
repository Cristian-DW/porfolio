import React from 'react';
import { Link } from 'react-scroll';
import ImgAbout from '../assets/about.webp';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div
      id="about"
      className="w-full min-h-screen flex items-center justify-center py-20 px-8 md:px-20 2xl:px-40 bg-fondo"
    >
      <div className="md:grid grid-cols-5 gap-10 w-full max-w-screen-2xl">
        <div className="md:col-span-2 md:block xxl:flex justify-center">
          <div className='relative w-[250px] h-[400px] mb-[30px] 2xl:pb-0 2xl:w-[560px] 2xl:h-[792px] bg-black'>
            <div
              className={`absolute w-[220px] 2xl:w-[450px] 2xl:h-[600px] bottom-6 2xl:bottom-14 ${selectedColor} -right-10 m-0 p-0 transition-colors duration-300`}
            >
              <img src={ImgAbout} alt='Cristian Castro' width='auto' height='400px' loading="lazy" />
            </div>
          </div>
        </div>
        <div className="md:col-span-3">
          <h4 className="text-xl 2xl:text-3xl mb-4">{t('about.title')}</h4>
          <p className="text-md font-light 2xl:text-lg">
            {t('about.description')}
          </p>
          <Link to="contact" smooth={true} duration={900}>
            <button className="button 2xl:mt-28 2xl:w-52 hover:text-fondo animate-fade-down animate-once animate-delay-[3000ms] animate-ease-linear">
              <span className="relative z-10">
                <a href="#contact" className="text-sm xl:text-xl">{t('nav.contact')}</a>
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
