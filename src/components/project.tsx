// "use client";
import '../App.css';
import { Carousel } from "keep-react";
import ProjectUno from '../assets/projectUno.webp'
import ProjectDos from '../assets/project2.webp'
import ProjectTres from '../assets/project-3.webp'
import ProjectCuatro from '../assets/Project4.png'
import ProjectsCard from './extras/Cards';
import { useTranslation } from 'react-i18next';

/**
 * Project Component
 * Renders a carousel of project cards.
 * Each project includes a title, description, date, and associated links.
 */
const Project = () => {
  const { t } = useTranslation();
  /**
   * @param {string} title - The title of the project.
   * @param {string} description - A brief description of the project.
   * @param {string} fecha - The date when the project was completed.
   * @param {string} backgroundImage - The background image URL for the project card.
   * @param {string} link - The primary link associated with the project.
   * @param {string} link2 - The secondary link associated with the project.
   */
  const projects = [
    {
      title: "ViajaYa",
      description: "Landing page",
      fecha: "March 2022",
      backgroundImage: ProjectDos,
      link2: "https://github.com/Cristian-DW/viaja",
      link: "https://viajaya.netlify.app",
    },
    {
      title: "Codecraft",
      description: "Website",
      fecha: "April 2023",
      backgroundImage: ProjectUno,
      link2: "https://github.com/Cristian-DW/CodeCraft",
      link: "https://codecracf.netlify.app/",
    },
    {
      title: "TodoList",
      description: "App",
      fecha: "February 2023",
      backgroundImage: ProjectTres,
      link2: "https://github.com/Cristian-DW/todoList",
      link: "https://cristian-dw.github.io/todoList/",
    },
    {
      title: "Weather App",
      description: "App",
      fecha: "July 2023",
      backgroundImage: ProjectCuatro,
      link2: "https://github.com/Cristian-DW/weather-app",
      link: "https://cristian-dw.github.io/weather-app/",
    },
  ];

  return (
    <section id="project" className="w-full min-h-screen ">
      <h2 className='text-center pt-36 mb-4 text-3xl 2xl:text-5xl'>{t('projects.title')}</h2>
      <p className='text-center text-md 2xl:text-xl'>{t('projects.subtitle')}</p>
      <Carousel className='w-full  h-[70vh]'>
        <div className="flex flex-wrap justify-center items-center  mx-auto gap-12 p-5 rounded-xl 2xl:p-0  ">
          {projects.map((project, index) => (
            <ProjectsCard
              key={index}
              title={project.title}
              description={project.description}
              fecha={project.fecha}
              backgroundImage={project.backgroundImage}
              link={project.link}
              link2={project.link2}
            />
          ))}
        </div>
      </Carousel>
    </section>
  );
};

export default Project;

