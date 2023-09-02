// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import textImg from '../assets/text-img.webp';
import ImgAbout from '../assets/about.webp';



const About= ({ selectedColor }) =>  {

  const [backgroundClass, setBackgroundClass] = useState('bg-fondo2');
  
  useEffect(() => {
    // Cuando selectedColor cambia en el componente App, actualiza backgroundClass
    if (selectedColor === 'bg-fondo3') {
      setBackgroundClass('bg-fondo3');
    } else if (selectedColor === 'bg-fondo4') {
      setBackgroundClass('bg-fondo4');
    } else {
      setBackgroundClass('bg-fondo2'); // Establece un valor predeterminado si es necesario
    }
  }, [selectedColor]);



  return (
    <div
      id="about"
      className="w-full p-8 my-10  2xl:py-44 bg-fondo md:grid grid-cols-5 gap-10 justify-center items-center md:pt-32 2xl:px-40  2xl:min-h-screen"
    >
      <div className=" md:col-span-2 md:block xxl:flex justify-center">
       <div className='relative  w-[250px] h-[400px] mb-[30px] 2xl:pb-0  2xl:w-[560px] 2xl:h-[792px] bg-black'>
        <img src={textImg} alt='bienvenida' className='h-[400px] px-5 2xl:h-[770px] py-5 2xl:px-16 2xl:py-10 '/>
        <div className= {`absolute w-[220px] 2xl:w-[450px] 2xl:h-[600px] bottom-6 2xl:bottom-14 ${backgroundClass} -right-10  bg-fondo2 m-0 p-0 `}>
        <img src={ImgAbout} alt='bienvenida'/>
        </div>

       </div>
      </div>
      <div className="  md:col-span-3">
        <h3 className=" text-xl 2xl:text-3xl mb-4">¡HOLA!</h3>
        <p className="text-md font-light  2xl:text-lg">
          Soy Cristian Castro, un enamorado del desarrollo frontend web con
          conocimientos en la creación de experiencias digitales atractivas y
          funcionales. Durante mi carrera profesional, he trabajado en diversos
          proyectos, desde sitios web empresariales hasta aplicaciones web
          dinámicas. Estoy familiarizado con los estándares de la industria y
          las mejores prácticas de desarrollo frontend, y me mantengo
          actualizado con las últimas tendencias y tecnologías.{" "}
        </p>
        <button className=" hidden   button  2xl:hover:text-fondo mt-20 w-48">
          <span className="relative z-10">
            <a href="#contact">Contáctame</a>
          </span>
        </button>
      </div>
      
    </div>
  );
}

export default About;