import React from 'react';
import tecnology1 from '../../assets/html.svg';
import tecnology2 from '../../assets/css.svg';
import tecnology3 from '../../assets/js.svg';

interface ProjectsCardProps {
  title: string;
  description: string;
  fecha: string;
  backgroundImage: string;
  link: string;
  link2: string;
}

const ProjectsCard: React.FC<ProjectsCardProps> = ({
  title,
  description,
  fecha,
  backgroundImage,
  link,
  link2
}) => {
  return (
    <div className="relative w-72 h-96 md:w-80 md:h-[28rem] 2xl:w-96 2xl:h-[32rem] shadow-md overflow-hidden transform transition-transform hover:scale-105 duration-1000 ease-in-out">
      <div
        className="absolute inset-0 bg-center opacity-80 transform transition-transform bg-cover hover:scale-105 duration-1000 ease-in-out"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="absolute inset-0 bg-opacity-70 bg-black flex flex-col justify-center items-center text-white transform transition-opacity opacity-0 hover:opacity-100 duration-1000 ease-in-out">
        <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-semibold uppercase my-3 2xl:my-5">
          {title}
        </h3>
        <p className="text-white font-light text-lg md:text-xl 2xl:text-2xl">{description}</p>
        <p className="text-white font-light text-base md:text-lg 2xl:text-xl mt-2">{fecha}</p>
        <div className="flex flex-col gap-y-4 mt-8 2xl:mt-12">
          <button className="py-2 px-6 button hover:text-fondo w-40 h-11 2xl:w-48 2xl:h-12 flex items-center justify-center overflow-hidden bg-transparent border shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:bg-white before:text-opacity-10 before:duration-500 before:ease-out hover:shadow-white hover:before:h-11 hover:before:w-40 2xl:hover:before:h-12 2xl:hover:before:w-48">
            <span className="relative z-10 text-sm 2xl:text-lg">
              <a href={link2} target="_blank" rel="noreferrer">GitHub</a>
            </span>
          </button>
          <button className="py-2 px-6 button hover:text-fondo w-40 h-11 2xl:w-48 2xl:h-12 flex items-center justify-center overflow-hidden bg-transparent border shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:bg-white before:text-opacity-10 before:duration-500 before:ease-out hover:shadow-white hover:before:h-11 hover:before:w-40 2xl:hover:before:h-12 2xl:hover:before:w-48">
            <span className="relative z-10 text-sm 2xl:text-lg">
              <a href={link} target="_blank" rel="noreferrer">view Project</a>
            </span>
          </button>
        </div>
        <div className="absolute top-3 left-3 flex gap-x-2">
          <img width={24} height={24} className="2xl:w-8 2xl:h-8" src={tecnology1} alt="html" />
          <img width={24} height={24} className="2xl:w-8 2xl:h-8" src={tecnology2} alt="css" />
          <img width={24} height={24} className="2xl:w-8 2xl:h-8" src={tecnology3} alt="javascript" />
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;