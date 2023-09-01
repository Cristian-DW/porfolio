// eslint-disable-next-line no-unused-vars
import React from 'react';

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

function Skills() {
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
    
    <div  id='skill' className="h-32  md:mt-44 lg:h-72  bg-fondo2 flex flex-col justify-center items-center  ">
      <div  className='w-1/2 h-40  flex justify-center items-center'>
      <Slider {...settings} className='w-full '>
      <div  className="flex justify-center items-center h-full ml-3  md:ml-14"> 
          <img src={ImgSkill} alt="imag" width="20px" height="20px" className=" w-20 lg:w-40" />
          <p className=' hidden lg:block  ml-14'>HTML</p>
        </div>
        <div className="flex justify-center items-center h-full ml-3   md:ml-14"> 
        
          <img src={ImgSkill2} alt="ima2" width="20px" height="20px"  className=" w-20 lg:w-40" />
          <p className=' hidden lg:block  ml-16'>CSS</p>
        </div>
        <div className="flex justify-center items-center h-full ml-3   md:ml-14"> 
        
          <img src={ImgSkill3} alt="ima3" width="20px" height="20px"  className= " w-20 lg:w-40" />
          <p className=' hidden lg:block  md:ml-10'>JavaScript</p>
        </div>
        <div className="flex justify-center items-center h-full ml-3  md:ml-14"> 
        
          <img src={ImgSkill4} alt="ima3" width="20px" height="20px"  className= " w-20 lg:w-40" />
          <p className='hidden lg:block  ml-16'>Git</p>
          
        </div>
        <div className="flex justify-center items-center h-full ml-3   md:ml-14"> 
        
          <img src={ImgSkill5} alt="ima3"width="20px" height="20px"  className= " w-20 lg:w-40" />
          <p className='hidden lg:block  ml-12'>React.js</p>

        </div>
        <div className="flex justify-center items-center h-full ml-3 md:ml-14"> 
        
          <img src={ImgSkill7} alt="ima3" width="20px" height="20px"  className= " w-20 lg:w-40" />
          <p className='hidden lg:block  ml-12'>Figma</p>

        </div>
        <div className="flex justify-center items-center h-full ml-3 md:ml-14"> 
        
          <img src={ImgSkill6} alt="ima3" width="20px" height="20px"  className= " w-20 lg:w-40" />
          <p className='hidden lg:block  ml-14'>SASS</p>

        </div>
      </Slider>
    </div>
    </div>
  );
}

export default Skills;
