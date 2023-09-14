// eslint-disable-next-line no-unused-vars
import React from "react";
import Down from '../assets/down.svg'








function Hero() {
  return (
    <div
      id="top"
      className=" fixed left-0 top-0   z-10 w-full flex  justify-center h-screen"
    >
      <div className=" w-full 2xl:px-40   flex flex-col items-center justify-center  ">
        <h1 className=" title tit  2xl:mb-10 2xl:mt-10  animate-fade-down animate-once animate-delay-[900ms] animate-ease-linear  ">
          Desarrollador Frontend
        </h1>
        <div className="  w-full  2xl:h-[20rem] flex justify-center  2xl:justify-between  items-center 2xl:items-stretch">
          <button className="button  2xl:mt-28  2xl:w-72  2xl:ml-28 hover:text-fondo  animate-fade-down animate-once animate-delay-[1500ms] animate-ease-linear  ">
            <span className="relative z-10">
              <a href="#porfolio" className=" text-sm 2xl:text-xl">Explora mis creaciones </a>
            </span>
          </button>
          <p className=" hidden 2xl:block 2xl:mt-28 2xl:w-[35rem] 2xl:mb-44 2xl:text-lg text-end font-light">
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


