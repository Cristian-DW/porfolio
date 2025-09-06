// eslint-disable-next-line no-unused-vars
import React from "react";
import Down from '../assets/down.svg'; 
import { Link } from 'react-scroll';

/**
 * Hero component.
 * This component displays the main introductory section with a title, description, and navigation buttons.
 */
function Hero() {
  return (
    <div
      id="top"
      className="fixed left-0 top-0 z-10 w-full flex justify-center h-screen"
    >
      <div className="w-full 2xl:px-40 flex flex-col items-center justify-center">
        <h1 className="title tit 2xl:mb-10 2xl:mt-10 animate-fade-down animate-once animate-delay-[900ms] animate-ease-linear">
          Desarrollador de Software
        </h1>
        <div className="w-full 2xl:h-[20rem] flex justify-center 2xl:justify-between items-center 2xl:items-stretch">
          <Link
            to="project"
            smooth={true}
            duration={900}
          >
            <button className="button 2xl:mt-28 2xl:w-72 2xl:ml-28 hover:text-fondo animate-fade-down animate-once animate-delay-[3000ms] animate-ease-linear">
              <span className="relative z-10">
                Explora mis creaciones
              </span>
            </button>
          </Link>
          <p className="hidden 2xl:block 2xl:mt-28 2xl:w-[35rem] 2xl:mb-44 2xl:text-lg text-end font-light">
            Bienvenido a mi mundo en el desarrollo de software! Aquí, la pasión y la creatividad se unen en un abrazo apasionado. Mi misión es fusionar diseño y código para dar vida a experiencias web que no solo cautivan, ¡sino que también conectan!
          </p>
        </div>
        <Link
          to="about"
          smooth={true}
          duration={900}
        >
          <a
            href="#about"
            className="absolute bottom-14 animate-bounce animate-infinite animate-duration-[2000ms] animate-delay-[5000ms]"
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
        </Link>
      </div>
    </div>
  );
}

export default Hero;



