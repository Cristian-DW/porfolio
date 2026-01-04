import React from 'react';
import { useTranslation } from 'react-i18next';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Icons
import ReactIcon from "../assets/react.svg";
import NextIcon from "../assets/nextjs.svg";
import TSIcon from "../assets/typescript.svg";
import JSIcon from "../assets/js.svg";
import TailwindIcon from "../assets/tailwindcss.svg";
import NodeIcon from "../assets/nodejs.svg";
import DockerIcon from "../assets/docker.svg";
import PostgresIcon from "../assets/postgresql.svg";
import GitIcon from "../assets/git.svg";
import GithubActionsIcon from "../assets/github-actions.svg";
import SAPIcon from "../assets/sap.svg";

interface SkillsProps {
  selectedColor: string;
}

/**
 * Skills Component
 * Displays a full-width, borderless premium slider of skills with stylized small icons.
 */
const Skills: React.FC<SkillsProps> = ({ selectedColor }) => {
  const { t } = useTranslation();

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 5000,
    slidesToShow: 10,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1920,
        settings: {
          slidesToShow: 9,
        },
      },
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 7,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const skillsData = [
    { icon: ReactIcon, name: "React.js" },
    { icon: NextIcon, name: "Next.js" },
    { icon: TSIcon, name: "TypeScript" },
    { icon: JSIcon, name: "JavaScript" },
    { icon: TailwindIcon, name: "Tailwind" },
    { icon: NodeIcon, name: "Node.js" },
    { icon: DockerIcon, name: "Docker" },
    { icon: PostgresIcon, name: "Postgres" },
    { icon: GitIcon, name: "Git" },
    { icon: GithubActionsIcon, name: "GitHub Actions" },
    { icon: SAPIcon, name: "SAP CAP" },
    { icon: SAPIcon, name: "SAP BTP" },
  ];

  return (
    <div id='skill' className={`py-20 ${selectedColor} transition-colors duration-300 overflow-hidden`}>
      <div className='w-full flex flex-col items-center'>

        {/* Section Title */}
        <h2 className='text-4xl font-bold text-white mb-16 text-center animate-fade-up tracking-tight'>
          {t('skills.title')}
        </h2>

        {/* Full-Width Borderless Slider */}
        <div className='w-full py-2'>
          <Slider {...settings} className='skill-slider-stylized w-full'>
            {skillsData.map((skill, index) => (
              <div key={index} className="px-3 focus:outline-none">
                <div className='flex flex-col items-center justify-center gap-3 bg-white/5 py-7 px-4 rounded-[2rem] border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-500 group/item relative overflow-hidden'>
                  {/* Very subtle glow */}
                  <div className='absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover/item:opacity-100 transition-opacity duration-500'></div>

                  <div className='relative z-10'>
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="w-10 h-10 md:w-12 md:h-12 group-hover/item:scale-110 transition-transform duration-500 drop-shadow-[0_0_12px_rgba(255,255,255,0.05)]"
                      loading="lazy"
                    />
                    <div className='absolute inset-0 bg-white/10 blur-2xl opacity-0 group-hover/item:opacity-30 transition-opacity duration-500'></div>
                  </div>
                  <p className='text-white/60 font-semibold text-xs md:text-sm whitespace-nowrap group-hover/item:text-white transition-all duration-300 relative z-10'>
                    {skill.name}
                  </p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Subtle Extra Skills Row - Refined Style */}
        <div className='mt-14 flex flex-wrap justify-center gap-x-12 gap-y-6 px-10 opacity-40 hover:opacity-100 transition-opacity duration-700'>
          <div className='flex items-center gap-3 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] group cursor-default'>
            <span className='w-1.5 h-1.5 bg-purple-500/80 rounded-full group-hover:scale-125 transition-all'></span>
            {t('skills.apis')}
          </div>
          <div className='flex items-center gap-3 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] group cursor-default'>
            <span className='w-1.5 h-1.5 bg-pink-500/80 rounded-full group-hover:scale-125 transition-all'></span>
            {t('skills.sql')}
          </div>
          <div className='flex items-center gap-3 text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] group cursor-default'>
            <span className='w-1.5 h-1.5 bg-blue-500/80 rounded-full group-hover:scale-125 transition-all'></span>
            {t('skills.microservices')}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Skills;
