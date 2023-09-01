// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../App.css';
import ProjectUno from '../assets/projectUno.webp'
import ProjectDos from '../assets/project2.webp'
import ProjectTres from '../assets/project-3.webp'
import ProjectCuatro from '../assets/Project4.png'




// eslint-disable-next-line react/prop-types
const ProjectsCard = ({ title, description, fecha, backgroundImage, link, link2, }) => {
  return (
    <div className="relative w-80 h-44  md:w-[45rem] md:h-96 shadow-md overflow-hidden transform transition-transform  hover:scale-105 duration-1000 ease-in-out">
      <div
        className="absolute inset-0 bg-center opacity-80 transform transition-transform bg-cover  hover:scale-105 duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-opacity-70 bg-black flex flex-col justify-center items-center text-white transform transition-opacity opacity-0 hover:opacity-100 duration-1000 ease-in-out">
        <h3 className=" text-2xl lg:text-5xl font-semibold uppercase my-2 lg:mb-7 ">
          {title}
        </h3>
        <p className="text-white font-light lg:font-normal lg:text-xl">{description}</p>
        <p className="text-white font-light text-sm lg:text-xl">{fecha}</p>
        <div className='flex gap-x-12 mt-10'> 
       <button className="border py-1 px-3 button  hover:text-fondo md:mt-10 md:w-48   ">
          <span className="relative z-10 text-xs lg:text-xl">
            <a href={link2} target="_blank" rel="noreferrer">GitHub</a>
          </span>
        </button>
        <button className="py-1 px-3 border   button  hover:text-fondo md:mt-10 md:w-48    ">
          <span className="relative z-10 text-xs lg:text-xl">
            <a href={link} target="_blank" rel="noreferrer">view Project</a>
          </span>
        </button>
        </div>
      </div>
    </div>
  );
};

const Project = () => {
  const projects = [
    {
      title: "ViajaYa",
      description: "Landing page",
      fecha: "Marzo de 2022",
      backgroundImage:
        ProjectDos,
      link2: "https://github.com/Cristian-DW/viaja",
      link:"https://viajaya.netlify.app" ,
    },
    {
      title: "Codecraft",
      description: "Website",
      fecha: "Abril 2023",
      backgroundImage: ProjectUno,
      link2: "https://github.com/Cristian-DW/CodeCraft",
      link:"https://codecracf.netlify.app/" ,
    },
     {
      title: "TodoList",
      description: "App",
      fecha: "Febrero de 2023",
      backgroundImage: ProjectTres,
      link2: "https://github.com/Cristian-DW/todoList",
      link:"https://cristian-dw.github.io/todoList/" ,
    },
     {
      title: "Weather App",
      description: "App",
      fecha: "Julio de 2023",
      backgroundImage: ProjectCuatro,
      link2: "https://github.com/Cristian-DW/weather-app",
      link:" https://cristian-dw.github.io/weather-app/" ,
    },
  ];

  return (
    <div id="porfolio"  className="flex flex-col my-28 lg:px-40    justify-center items-center min-h-screen  ">
      <h2 className="subtitle text-center">Proyectos</h2>
      <p  className=" text-md font-light lg:text-2xl text-center md:mb-12">Explora mis creaciones</p>
      <div className="flex flex-wrap justify-center items-center  mx-auto gap-6 p-5 lg:p-0 ">
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
    </div>
  );
};

export default Project;

