import Down from '../assets/down.svg'; 
import { Link } from 'react-scroll';
import Background from './extras/Background';
import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

interface HeroProps {
  selectedColor?: string;
}

function Hero({ selectedColor = 'bg-fondo2' }: HeroProps) {
  const { t } = useTranslation();



  return (
    <div
      id="top"
      className="fixed inset-0 w-full h-screen flex justify-center overflow-hidden"
    >
      <Background selectedColor={selectedColor} className="pointer-events-none" />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center pointer-events-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center  animate-fade-down animate-once animate-delay-[900ms] animate-ease-linear leading-tight">
          {t('hero.role')}
        </h1>
        <p className="text-xl text-white text-center mb-8 mt-8 animate-fade-down animate-once animate-delay-[1000ms] animate-ease-linear">
          {t('hero.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
          <Link to="project" smooth={true} duration={900}>
            <button
             className={clsx(
                "button 2xl:mt-0 2xl:w-40 text-white transition-colors duration-300 animate-fade-down animate-once animate-delay-[3000ms] animate-ease-linear",
                {
                  "hover:text-fondo2": selectedColor === "bg-fondo2",
                  "hover:text-fondo3": selectedColor === "bg-fondo3",
                  "hover:text-fondo4": selectedColor === "bg-fondo4",
                  "hover:text-fondo5": selectedColor === "bg-fondo5",
                }
              )}
            >
              <span className="relative z-10">
                <a href="#about" className="text-sm xl:text-xl">{t('hero.projectsButton')}</a>
              </span>
            </button>
          </Link>
          <Link to="about" smooth={true} duration={900}>
            <button
               className={clsx(
                "button 2xl:mt-0 2xl:w-40 text-white transition-colors duration-300 animate-fade-down animate-once animate-delay-[3000ms] animate-ease-linear",
                {
                  "hover:text-fondo2": selectedColor === "bg-fondo2",
                  "hover:text-fondo3": selectedColor === "bg-fondo3",
                  "hover:text-fondo4": selectedColor === "bg-fondo4",
                  "hover:text-fondo5": selectedColor === "bg-fondo5",
                }
              )}
            >
              <span className="relative z-10">
                <a href="#about" className="text-sm xl:text-xl">{t('hero.aboutButton')}</a>
              </span>
            </button>
          </Link>
        </div>
        <Link
          to="about"
          smooth={true}
          duration={900}
          className="absolute bottom-8 z-[9999] flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 animate-bounce animate-infinite animate-duration-[2000ms] animate-delay-[2000ms] cursor-pointer"
        >
          <span className="text-sm mb-2">Scroll</span>
          <img
            width="20"
            height="20"
            src={Down}
            alt="scroll down"
            className="w-5 opacity-80"
          />
        </Link>
      </div>
    </div>
  );
}

export default Hero;