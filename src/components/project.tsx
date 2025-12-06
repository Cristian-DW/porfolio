// "use client";
import '../App.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProjectUno from '../assets/projectUno.webp'
import ProjectDos from '../assets/project2.webp'
import ProjectTres from '../assets/project-3.webp'
import MaintenanceManager from '../assets/maintenanceManager.png'
import ProjectsCard from './extras/Cards';
import { useTranslation } from 'react-i18next';

/**
 * Project Component
 * Renders a carousel of project cards.
 * Each project includes a title, description, date, and associated links.
 */
const Project = () => {
  const { t } = useTranslation();

  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
    autoplay: false,
    pauseOnHover: true,
  };

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
      title: "Maintenance Manager",
      description: "Web App",
      fecha: "December 2024",
      backgroundImage: MaintenanceManager,
      link2: "https://github.com/Cristian-DW/maintenance-manager",
      link: "https://github.com/Cristian-DW/maintenance-manager",
    },
  ];

  return (
    <section id="project" className="relative w-full min-h-screen flex flex-col justify-center items-center py-32 px-8 overflow-hidden">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-fondo via-fondo to-fondo2/10 -z-10"></div>

      {/* Decorative circles */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-fondo2/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 left-10 w-80 h-80 bg-fondo3/5 rounded-full blur-3xl -z-10"></div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <p className="text-fondo2 text-sm md:text-base 2xl:text-lg uppercase tracking-widest mb-4 font-light">
          Portfolio
        </p>
        <h2 className='text-center mb-4 text-3xl md:text-4xl 2xl:text-5xl text-white'>
          {t('projects.title')}
        </h2>
        <p className='text-center text-lg 2xl:text-2xl text-gray-300 max-w-2xl mx-auto'>
          {t('projects.subtitle')}
        </p>
      </div>

      {/* Projects Slider */}
      <div className="w-full max-w-7xl relative projects-slider">
        <Slider {...sliderSettings}>
          {projects.map((project, index) => (
            <div key={index} className="px-4">
              <ProjectsCard
                title={project.title}
                description={project.description}
                fecha={project.fecha}
                backgroundImage={project.backgroundImage}
                link={project.link}
                link2={project.link2}
              />
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Project;

