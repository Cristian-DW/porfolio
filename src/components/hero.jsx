// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from 'react-scroll';
import heroImg from "../assets/heroImg.png";

function Hero() {
  return (
    <div
      id="top"
      className=" fixed left-0 top-0   z-10 w-full flex  justify-center h-screen"
    >
      <div className=" absolute w-full h-screen  2xl:px-40    flex flex-col justify-center  ">
        <h1 className=" title text-border text-black  2xl:mb-10 2xl:mt-40  animate-fade-down animate-once animate-delay-[900ms] animate-ease-linear  ">
          Desarrollador Frontend{" "}
          <span className="text-transparent ">Diseñador UX UI</span>
        </h1>
      </div>

      <div className="aspect-square overflow-hidden relative w-6/12 h-full z-30 bottom-0">
        <img
          className="w-full h-auto object-contain"
          src={heroImg}
          alt=""
          srcSet={`${heroImg} 20w, ${heroImg} 40w, ${heroImg} 60w`}
          sizes="(max-width: 20px) 20px, (max-width: 40px) 40px, 80px"
        />
      </div>
    </div>
  );
}

export default Hero;


