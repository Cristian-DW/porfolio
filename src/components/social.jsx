// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import Red1 from "../assets/bxl-github.svg"
import Red2 from "../assets/bxl-gmail.svg"
import Red3 from "../assets/bxl-linkedin.svg"



const Social = ({ selectedColor }) => {
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
    <div className={`w-full right-0 bottom-0 flex  h-16  fixed  ${backgroundClass} 2xl:flex 2xl:flex-col  2xl:fixed justify-evenly items-center 2xl:bottom-1 2xl:right-5 z-50 2xl:w-16 2xl:h-48   2xl:bg-transparent` }>

        <a href="https://github.com/Cristian-DW" target="_blank" rel="noopener noreferrer" className="px-1 backdrop-blur-2xl  hover:text-red ">
          <img width="20px" height="20px" className=" 2xl:h-6 w-auto hover: button-hover  " src={Red1} alt="logo" />
        </a>
    
        <a href="mailto:cristtiiank@gmail.com" target="_blank" rel="noopener noreferrer" className=" px-1 backdrop-blur-2xl">
          <img width="20px" height="20px"  className=" hover: button-hover 2xl:h-6 w-auto items-center " src={Red2} alt="logo" />
        </a>
        <a href="https://www.linkedin.com/in/cristian-castro-pineda/" target="_blank" rel="noopener noreferrer" className=" px-1 backdrop-blur-2xl">
          <img width="20px" height="20px" className="2xl:h-6 w-auto hover: button-hover" src={Red3} alt="logo" />
        </a>
    </div>
  )
}

export default Social
