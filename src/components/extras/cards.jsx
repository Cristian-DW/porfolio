import React from "react";
import tecnology1 from '../../assets/html.svg'
import tecnology2 from '../../assets/css.svg'
import tecnology3 from '../../assets/js.svg'




const ProjectsCard = ({ title, description, fecha, backgroundImage, link, link2, }) => {
    return (
      <div className="relative w-80 h-44  md:w-[45rem] md:h-96 shadow-md overflow-hidden transform transition-transform  hover:scale-105 duration-1000 ease-in-out">
        <div
          className="absolute inset-0 bg-center opacity-80 transform transition-transform bg-cover  hover:scale-105 duration-1000 ease-in-out"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>
        <div className="absolute inset-0 bg-opacity-70 bg-black flex flex-col justify-center items-center text-white transform transition-opacity opacity-0 hover:opacity-100 duration-1000 ease-in-out">
          <h3 className=" text-lg 2xl:text-5xl font-semibold uppercase my-2 2xl:mb-7 ">
            {title}
          </h3>
          <p className="text-white font-light 2xl:font-normal 2xl:text-xl">{description}</p>
          <p className="text-white font-light text-sm 2xl:text-xl">{fecha}</p>
          <div className='flex gap-x-12 mt-10'> 
         <button className=" py-1 px-3 button  hover:text-fondo md:mt-10 w-36 h-10  flex items-center justify-center overflow-hidden bg-transparent border shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:bg-white  before:text-opacity-10 before:duration-500 before:ease-out hover:shadow-white hover:before:h-10 hover:before:w-36   ">
            <span className="relative z-10 text-xs 2xl:text-xl">
              <a href={link2} target="_blank" rel="noreferrer">GitHub</a>
            </span>
          </button>
          <button className="py-1 px-3 button  hover:text-fondo md:mt-10 w-36 h-10  flex   items-center justify-center overflow-hidden bg-transparent border shadow-2xl transition-all before:absolute before:h-0 before:w-0 before:bg-white  before:text-opacity-10 before:duration-500 before:ease-out hover:shadow-white hover:before:h-10 hover:before:w-36   ">
            <span className="relative z-10 text-xs 2xl:text-xl">
              <a href={link} target="_blank" rel="noreferrer">view Project</a>
            </span>
          </button>
          </div>
          <div className='absolute top-0 left-0 w-12 h-20'>
                <img width="32px" height='32px' src={tecnology1} alt="html" />
                <img width="32px" height='32px'  src={tecnology2} alt="css" />
                <img width="32px" height='32px'  src={tecnology3} alt="javascript" />
  
          </div>
        </div>
      </div>
    );
  };
  
  export default ProjectsCard;