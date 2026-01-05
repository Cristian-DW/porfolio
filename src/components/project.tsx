import { useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useTranslation } from 'react-i18next';

// Projects Images
import ProjectUno from '../assets/projectUno.webp'
import ProjectDos from '../assets/project2.webp'
import ProjectTres from '../assets/project-3.webp'
import MaintenanceManager from '../assets/maintenanceManager.png'
import MyLumina from '../assets/mylumina.png'

// Tech Icons (Reusing from skills if possible, but here we import needed ones)
import ReactIcon from "../assets/react.svg";
import NextIcon from "../assets/nextjs.svg";
import TSIcon from "../assets/typescript.svg";
import JSIcon from "../assets/js.svg";
import TailwindIcon from "../assets/tailwindcss.svg";
import NodeIcon from "../assets/nodejs.svg";
import PostgresIcon from "../assets/postgresql.svg";

import ProjectsCard from './extras/Cards';

const Project = () => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 800,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
        },
      },
      // Below 1024 we will switch to Grid manually in the return, 
      // but keeping these as backup safety.
    ],
  };

  const projects = [
    {
      title: "MyLumina",
      description: "Social Media Platform designed for capturing special moments with a premium dark interface.",
      fecha: "January 2026",
      backgroundImage: MyLumina,
      link2: "https://github.com/Cristian-DW/mylumina",
      link: "https://mylumina.vercel.app/",
      icons: [NextIcon, TSIcon, TailwindIcon]
    },
    {
      title: "Maintenance Manager",
      description: "Full-stack application for managing complex maintenance workflows and task tracking.",
      fecha: "December 2024",
      backgroundImage: MaintenanceManager,
      link2: "https://github.com/Cristian-DW/maintenance-manager",
      link: "https://github.com/Cristian-DW/maintenance-manager",
      icons: [ReactIcon, NodeIcon, PostgresIcon]
    },
    {
      title: "TodoList",
      description: "Smart task management with clean UI and persistent storage for daily productivity.",
      fecha: "February 2023",
      backgroundImage: ProjectTres,
      link2: "https://github.com/Cristian-DW/todoList",
      link: "https://cristian-dw.github.io/todoList/",
      icons: [JSIcon, ReactIcon, TailwindIcon]
    },
    {
      title: "ViajaYa",
      description: "Modern travel landing page featuring optimized performance and dynamic layouts.",
      fecha: "March 2022",
      backgroundImage: ProjectDos,
      link2: "https://github.com/Cristian-DW/viaja",
      link: "https://viajaya.netlify.app",
      icons: [ReactIcon, JSIcon]
    },
    {
      title: "Codecraft",
      description: "Developer oriented landing page showcasing advanced CSS techniques and responsive design.",
      fecha: "April 2023",
      backgroundImage: ProjectUno,
      link2: "https://github.com/Cristian-DW/CodeCraft",
      link: "https://codecracf.netlify.app/",
      icons: [JSIcon, TailwindIcon]
    },
  ];

  // Logic for mobile view items
  const visibleProjects = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="project" className="relative w-full min-h-screen flex flex-col justify-center items-center py-16 md:py-24 px-4 md:px-8 overflow-hidden transition-all duration-1000">

      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 bg-[#070708] -z-20"></div>
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-fondo2/10 to-transparent -z-10"></div>

      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 -right-20 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -left-20 w-[500px] h-[500px] bg-pink-600/5 rounded-full blur-[150px] -z-10"></div>

      {/* Header */}
      <div className="text-center mb-16 md:mb-20 relative z-10 w-full px-4 max-w-4xl mx-auto">
        <span className="text-fondo2 text-[10px] md:text-xs uppercase tracking-[0.5em] font-black mb-4 block animate-fade-in">
          EXPLORE MY WORK
        </span>
        <h2 className="text-2xl md:text-4xl font-black text-white mb-10 md:mb-16 text-center animate-fade-up tracking-tighter uppercase">
          {t('projects.title')}
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-fondo2 to-pink-500 mx-auto mb-8 rounded-full"></div>
        <p className='text-gray-400 text-sm md:text-xl font-medium leading-relaxed opacity-80'>
          {t('projects.subtitle')}
        </p>
      </div>

      {/* DESKTOP VIEW: Slider (Hidden on small screens) */}
      <div className="hidden lg:block w-full max-w-7xl relative projects-slider-container">
        <Slider {...sliderSettings} className="gap-x-4">
          {projects.map((project, index) => (
            <div key={index} className="px-4 py-8">
              <ProjectsCard
                title={project.title}
                description={project.description}
                fecha={project.fecha}
                backgroundImage={project.backgroundImage}
                link={project.link}
                link2={project.link2}
                icons={project.icons}
              />
            </div>
          ))}
        </Slider>
      </div>

      {/* MOBILE/TABLET VIEW: Discovery Grid (Hidden on large screens) */}
      <div className="lg:hidden w-full max-w-2xl flex flex-col items-center gap-y-10 group/grid">
        <div className="grid grid-cols-1 gap-y-12 w-full">
          {visibleProjects.map((project, index) => (
            <div key={index} className="px-2 animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
              <ProjectsCard
                title={project.title}
                description={project.description}
                fecha={project.fecha}
                backgroundImage={project.backgroundImage}
                link={project.link}
                link2={project.link2}
                icons={project.icons}
              />
            </div>
          ))}
        </div>

        {/* View More Button - Glassmorphism UI */}
        {!showAll && projects.length > 3 && (
          <button
            onClick={() => setShowAll(true)}
            className="mt-8 group/btn relative flex flex-col items-center justify-center p-px rounded-full"
          >
            <div className="relative px-10 py-4 bg-[#0a0a0b] border border-white/10 rounded-full group-hover/btn:border-white/20 transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <span className="text-white text-xs font-black uppercase tracking-[0.3em] flex items-center gap-3 group-hover/btn:gap-5 transition-all">
                {t('projects.viewMore') || 'Ver más / Show More'}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="group-hover/btn:translate-y-1 transition-transform">
                  <path d="M7 10L12 15L17 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            {/* Ambient Shadow glow below button */}
            <div className="absolute inset-0 bg-white/5 blur-xl group-hover/btn:bg-white/10 transition-colors pointer-events-none rounded-full"></div>
          </button>
        )}
      </div>
    </section>
  );
};

export default Project;
