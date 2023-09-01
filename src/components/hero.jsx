// eslint-disable-next-line no-unused-vars
import React from "react";
import Down from '../assets/down.svg'







function Hero() {
  return (
    <div
      id="top"
      className=" fixed left-0 top-0   z-10 w-full flex  justify-center h-screen"
    >
      <div className=" w-full lg:px-40   flex flex-col items-center justify-center  ">
        <h1 className=" title tit  lg:mb-28 lg:mt-28  animate-fade-down animate-once animate-delay-[900ms] animate-ease-linear  ">
          Desarrollador Frontend
        </h1>
        <div className="  w-full mt-20  lg:h-[20rem] flex justify-center  lg:justify-between  items-center lg:items-stretch">
          <button className="button  lg:mt-28  lg:w-72  lg:ml-28 hover:text-fondo2  animate-fade-down animate-once animate-delay-[1500ms] animate-ease-linear  ">
            <span className="relative z-10">
              <a href="#porfolio" className=" text-sm lg:text-xl">Explora mis creaciones </a>
            </span>
          </button>
          <p className=" hidden lg:block lg:mt-28 lg:w-[35rem] lg:mb-44 lg:text-2xl text-end font-light">
            {" "}
            Exploro el emocionante universo del desarrollo frontend con pasión y
            creatividad, fusionando diseño y código para crear experiencias web
            que cautivan y conectan
          </p>
        </div>
        <a
          href="#about"
          className="absolute bottom-14  animate-bounce animate-infinite animate-duration-[2000ms] animate-delay-[5000ms]  "
        >
          <p>Scroll</p>
          <img
            width="10px"
            height="10px"
            src={Down}
            alt="scroll"
            className="w-10"
          />
        </a>
      </div>
    </div>
  );
}

export default Hero;


