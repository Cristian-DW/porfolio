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
      className="w-full min-h-screen flex items-center justify-center py-16 md:py-20 px-8 md:px-20 2xl:px-40 bg-fondo"
    >
      <div className="md:grid grid-cols-5 gap-8 md:gap-14 w-full max-w-screen-2xl">
        <div className="md:col-span-2 md:block xxl:flex justify-center">
          <div className='relative w-[280px] h-[360px] mb-[30px] 2xl:pb-0 2xl:w-[420px] 2xl:h-[540px] bg-black'>
            <div
              className={`absolute w-full h-full bottom-4 md:bottom-8 ${selectedColor} -right-6 md:-right-10 m-0 p-0 transition-colors duration-300`}
            >
              <img src={ImgAbout} alt='Cristian Castro' className="w-full h-full object-cover" loading="lazy" />
            </div>
          </div>
        </div>
        <div className="md:col-span-3 flex flex-col justify-center">
          <h4 className="text-lg md:text-xl 2xl:text-2xl font-black uppercase tracking-tighter mb-4 text-white">{t('about.title')}</h4>
          <p className="text-sm md:text-base font-medium 2xl:text-lg text-gray-400 leading-relaxed max-w-2xl">
            {t('about.description')}
          </p>
          <Link to="contact" smooth={true} duration={900}>
            <button className="button mt-10 md:mt-14 w-44 md:w-48 hover:text-fondo transition-all duration-300 transform hover:scale-105 active:scale-95">
              <span className="relative z-10 text-xs md:text-sm font-black uppercase tracking-widest">
                {t('nav.contact')}
              </span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
