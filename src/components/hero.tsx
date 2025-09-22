import Down from '../assets/down.svg'; 
import { Link } from 'react-scroll';
import Background from './extras/Background';
import { useTranslation } from 'react-i18next';

/**
 * Hero component.
 * This component displays the main introductory section with a title, description, and navigation buttons.
 */
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
      <Background selectedColor={selectedColor} />
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center justify-center">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white text-center mb-8 animate-fade-down animate-once animate-delay-[900ms] animate-ease-linear leading-tight">
          {t('hero.greeting')}
          <br />
          {t('hero.role')}
        </h1>
        <p className="text-xl text-white text-center mb-8 animate-fade-down animate-once animate-delay-[1000ms] animate-ease-linear">
          {t('hero.description')}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-8">
          <Link
            to="project"
            smooth={true}
            duration={900}
          >
            <button 
              className={`px-8 py-4 relative z-50  bg-white ${selectedColor.replace('bg-', 'text-')} rounded-full hover:bg-opacity-95 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 font-semibold animate-fade-up animate-once animate-delay-[1200ms] animate-ease-linear`}
            >
              {t('hero.projectsButton')}
            </button>
          </Link>
          <Link
            to="about"
            smooth={true}
            duration={900}
          >
            <button 
              className={`px-8 py-4 border-2 border-white text-white rounded-full hover:bg-white/10 hover:border-white/80 transition-all duration-300 font-semibold animate-fade-up animate-once animate-delay-[1500ms] animate-ease-linear`}
            >
              {t('hero.aboutButton')}
            </button>
          </Link>
        </div>
        <Link
          to="about"
          smooth={true}
          duration={900}
        >
          <a
            href="#about"
            className="absolute bottom-8  flex flex-col items-center text-white/80 hover:text-white transition-colors duration-300 animate-bounce animate-infinite animate-duration-[2000ms] animate-delay-[2000ms]"
          >
            <span className="text-sm mb-2">Scroll</span>
            <img
              width="20"
              height="20"
              src={Down}
              alt="scroll down"
              className="w-5 opacity-80"
            />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Hero;



