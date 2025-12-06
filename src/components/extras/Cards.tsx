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
  backgroundImage,
  link,
  link2
}) => {
  return (
    <div className="group relative w-72 h-96 md:w-80 md:h-[28rem] 2xl:w-96 2xl:h-[32rem] rounded-2xl overflow-hidden transform transition-all duration-700 hover:scale-105 hover:rotate-1">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-700 group-hover:scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>

      {/* Glassmorphism Border */}
      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-fondo2/50 transition-colors duration-700"></div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 shadow-2xl shadow-fondo2/20"></div>

      {/* Content */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
        {/* Tech Stack Icons - Top Left */}
        <div className="absolute top-4 left-4 flex gap-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
          <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-1.5 flex items-center justify-center">
            <img src={tecnology1} alt="html" className="w-full h-full" />
          </div>
          <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-1.5 flex items-center justify-center">
            <img src={tecnology2} alt="css" className="w-full h-full" />
          </div>
          <div className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 p-1.5 flex items-center justify-center">
            <img src={tecnology3} alt="javascript" className="w-full h-full" />
          </div>
        </div>

        {/* Project Info */}
        <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <h3 className="text-2xl md:text-3xl 2xl:text-4xl font-semibold uppercase mb-3">
            {title}
          </h3>
          <p className="text-gray-300 text-sm md:text-base 2xl:text-lg mb-6">{description}</p>

          {/* Buttons - Hidden by default, shown on hover */}
          <div className="flex flex-col gap-y-3 items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <a href={link2} target="_blank" rel="noreferrer">
              <button className="transition-transform duration-1000 transform hover:scale-90 flex h-12 w-44 2xl:h-12 items-center justify-center overflow-hidden bg-transparent border shadow-sm;hover:text-lg">
                <span className="relative z-10 text-sm 2xl:text-base">
                  GitHub
                </span>
              </button>
            </a>
            <a href={link} target="_blank" rel="noreferrer">
              <button className="transition-transform duration-1000 transform hover:scale-90 flex h-12 w-44 2xl:h-14 items-center justify-center overflow-hidden bg-transparent border shadow-sm hover:text-lg">
                <span className="relative z-10 text-sm 2xl:text-base">
                  View Project
                </span>
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;