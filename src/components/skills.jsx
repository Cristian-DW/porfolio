// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

import ImgSkill from "../assets/html.svg"
import ImgSkill2 from "../assets/css.svg"
import ImgSkill3 from "../assets/js.svg"
import ImgSkill4 from "../assets/git.svg"
import ImgSkill5 from "../assets/react.svg"
import ImgSkill6 from "../assets/sass.svg"
import ImgSkill7 from "../assets/figma.svg";
import Slider from 'react-slick'; 
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 

const Skills = ({ selectedColor }) =>   {

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

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
    autoplay: true,
    autoplaySpeed: 2300,
    pauseOnHover: true,
  };

  return (
    
    <div  id='skill' className={ `h-32 ${backgroundClass}   md:mt-44 2xl:h-72  flex flex-col justify-center items-center  `}>
      <div  className='w-1/2 h-40  flex justify-center items-center'>
      <Slider {...settings} className='w-full '>
      <div  className="flex justify-center items-center h-full ml-3  md:ml-14"> 
          <img src={ImgSkill} alt="imag" width="20px" height="20px" className=" w-20 2xl:w-40" />
          <p className=' hidden md:block  ml-14'>HTML</p>
        </div>
        <div className="flex justify-center items-center h-full ml-3   md:ml-14"> 
        
          <img src={ImgSkill2} alt="ima2" width="20px" height="20px"  className=" w-20 2xl:w-40" />
          <p className=' hidden md:block  ml-16'>CSS</p>
        </div>
        <div className="flex justify-center items-center h-full ml-3   md:ml-14"> 
        
          <img src={ImgSkill3} alt="ima3" width="20px" height="20px"  className= " w-20 2xl:w-40" />
          <p className=' hidden md:block  md:ml-10'>JavaScript</p>
        </div>
        <div className="flex justify-center items-center h-full ml-3  md:ml-14"> 
        
          <img src={ImgSkill4} alt="ima3" width="20px" height="20px"  className= " w-20 2xl:w-40" />
          <p className='hidden md:block  ml-16'>Git</p>
          
        </div>
        <div className="flex justify-center items-center h-full ml-3   md:ml-14"> 
        
          <img src={ImgSkill5} alt="ima3"width="20px" height="20px"  className= " w-20 2xl:w-40" />
          <p className='hidden md:block  ml-12'>React.js</p>

        </div>
        <div className="flex justify-center items-center h-full ml-3 md:ml-14"> 
        
          <img src={ImgSkill7} alt="ima3" width="20px" height="20px"  className= " w-20 2xl:w-40" />
          <p className='hidden md:block  ml-12'>Figma</p>

        </div>
        <div className="flex justify-center items-center h-full ml-3 md:ml-14"> 
        
          <img src={ImgSkill6} alt="ima3" width="20px" height="20px"  className= " w-20 2xl:w-40" />
          <p className='hidden md:block  ml-14'>SASS</p>

        </div>
      </Slider>
    </div>
    </div>
  );
}

export default Skills;
