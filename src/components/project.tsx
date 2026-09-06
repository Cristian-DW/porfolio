import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Projects Images
import MaintenanceManager from '../assets/maintenanceManager.png';
import MyLumina from '../assets/mylumina.png';
import ProjectTres from '../assets/project-3.webp';

// Tech Icons
import ReactIcon from "../assets/react.svg";
import NextIcon from "../assets/nextjs.svg";
import TSIcon from "../assets/typescript.svg";
import TailwindIcon from "../assets/tailwindcss.svg";
import NodeIcon from "../assets/nodejs.svg";
import PostgresIcon from "../assets/postgresql.svg";

import ProjectsCard from './extras/Cards';

const Project = () => {
  const { t } = useTranslation();
  const [showAll, setShowAll] = useState(false);

  const flagshipProject = {
    title: "Deltux",
    description: "B2B SaaS product for inventory control, billing, and accounting, built with Next.js, Node.js, and an enterprise architecture mindset. Focuses on high availability, multi-tenant data isolation, and robust integration patterns.",
    fecha: "2024",
    backgroundImage: MyLumina,
    link2: "https://github.com/Cristian-DW",
    link: "https://deltux.io",
    icons: [NextIcon, NodeIcon, PostgresIcon, TSIcon, TailwindIcon],
    tags: ["B2B SaaS", "Enterprise Architecture", "Microservices"]
  };

  const projects = [
    {
      title: "Maintenance Manager",
      description: "Full-stack application for managing complex maintenance workflows and task tracking.",
      fecha: "December 2024",
      backgroundImage: MaintenanceManager,
      link2: "https://github.com/Cristian-DW/maintenance-manager",
      link: "https://github.com/Cristian-DW/maintenance-manager",
      icons: [ReactIcon, NodeIcon, PostgresIcon],
      tags: ["Full-stack", "Workflow Automation"]
    },
    {
      title: "MyLumina",
      description: "Social Media Platform designed for capturing special moments with a premium dark interface.",
      fecha: "January 2026",
      backgroundImage: MyLumina,
      link2: "https://github.com/Cristian-DW/mylumina",
      link: "https://mylumina.vercel.app/",
      icons: [NextIcon, TSIcon, TailwindIcon],
      tags: ["Frontend", "UX/UI"]
    },
    {
      title: "TodoList",
      description: "Smart task management with clean UI and persistent storage for daily productivity.",
      fecha: "February 2023",
      backgroundImage: ProjectTres,
      link2: "https://github.com/Cristian-DW/todoList",
      link: "https://cristian-dw.github.io/todoList/",
      icons: [ReactIcon, TailwindIcon],
      tags: ["Productivity", "React"]
    }
  ];

  const visibleProjects = showAll ? projects : projects.slice(0, 2);

  return (
    <section id="project" className="relative w-full min-h-screen flex flex-col justify-center items-center py-20 md:py-32 px-4 md:px-8 overflow-hidden transition-all duration-1000 bg-surface">

      <div className="text-center mb-16 md:mb-20 relative z-10 w-full px-4 max-w-4xl mx-auto">
        <span className="section-eyebrow animate-fade-in">
          PORTFOLIO
        </span>
        <h2 className="text-3xl md:text-5xl font-bold font-space text-white mb-6 md:mb-10 text-center animate-fade-up tracking-tight">
          {t('projects.title') || 'Featured Work'}
        </h2>
        <p className='text-muted text-sm md:text-lg font-medium leading-relaxed'>
          {t('projects.subtitle') || 'A selection of enterprise and personal projects'}
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto flex flex-col gap-16 relative z-10">

        {/* Flagship Project — Deltux */}
        <div className="w-full px-4 md:px-0 animate-fade-up">
          <ProjectsCard
            title={flagshipProject.title}
            description={flagshipProject.description}
            fecha={flagshipProject.fecha}
            backgroundImage={flagshipProject.backgroundImage}
            link={flagshipProject.link}
            link2={flagshipProject.link2}
            icons={flagshipProject.icons}
            tags={flagshipProject.tags}
            featured={true}
          />
        </div>

        {/* Secondary Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full px-4 md:px-0">
          {visibleProjects.map((project, index) => (
            <div key={index} className="animate-fade-up" style={{ animationDelay: `${(index + 1) * 100}ms` }}>
              <ProjectsCard
                title={project.title}
                description={project.description}
                fecha={project.fecha}
                backgroundImage={project.backgroundImage}
                link={project.link}
                link2={project.link2}
                icons={project.icons}
                tags={project.tags}
                featured={false}
              />
            </div>
          ))}
        </div>

        {/* Show More / Less */}
        {projects.length > 2 && (
          <div className="flex justify-center animate-fade-up">
            <button
              onClick={() => setShowAll(!showAll)}
              className="h-11 px-8 rounded-full border border-white/10 text-muted hover:text-white hover:border-brand transition-all duration-300 text-sm font-medium"
            >
              {showAll ? 'Show Less' : t('projects.viewMore') || 'View More Projects'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Project;
