// eslint-disable-next-line no-unused-vars
import React from 'react'
import Red1 from "../assets/bxl-github.svg"
import Red2 from "../assets/bxl-gmail.svg"
import Red3 from "../assets/bxl-linkedin.svg"


function Social (){
  return (
    <div className=' w-full right-0 bottom-0 flex  h-16  fixed bg-fondo2 lg:flex lg:flex-col  lg:fixed justify-evenly items-center lg:bottom-1 lg:right-5 z-50 lg:w-16 lg:h-48   lg:bg-transparent  '>

        <a href="https://github.com/Cristian-DW" target="_blank" rel="noopener noreferrer" className="px-1 backdrop-blur-2xl  hover:text-red ">
          <img width="20px" height="20px" className=" lg:h-6 w-auto hover: button-hover  " src={Red1} alt="logo" />
        </a>
    
        <a href="mailto:cristtiiank@gmail.com" target="_blank" rel="noopener noreferrer" className=" px-1 backdrop-blur-2xl">
          <img width="20px" height="20px"  className=" hover: button-hover lg:h-6 w-auto items-center " src={Red2} alt="logo" />
        </a>
        <a href="https://www.linkedin.com/in/cristian-castro-pineda/" target="_blank" rel="noopener noreferrer" className=" px-1 backdrop-blur-2xl">
          <img width="20px" height="20px" className="lg:h-6 w-auto hover: button-hover" src={Red3} alt="logo" />
        </a>
    </div>
  )
}

export default Social
