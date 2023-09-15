// eslint-disable-next-line no-unused-vars
import React from 'react';
import '../App.css';
import ProjectUno from '../assets/projectUno.webp'
import ProjectDos from '../assets/project2.webp'
import ProjectTres from '../assets/project-3.webp'
import ProjectCuatro from '../assets/Project4.png'
import ProjectsCard from './extras/cards';




// eslint-disable-next-line react/prop-types


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
    <div id="porfolio"  className="flex flex-col  my-28 2xl:px-[10rem] justify-center items-center min-h-screen  ">
      <h2 className="subtitle text-center">Proyectos</h2>
      <p  className=" text-md font-light 2xl:text-lg text-center md:mb-12">Explora mis creaciones</p>
      <div className="flex flex-wrap justify-center items-center  mx-auto gap-6 p-5 2xl:p-0 ">
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

