
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Theme = ({ changeBackgroundColor }) => {
  return (
    <div className=' w-7  right-0  fixed z-50  top-20 flex  lg:left-10  lg:flex flex-col  lg:fixed lg:justify-evenly lg:items-center lg:bottom-1 lg:w-16 lg:h-48   lg:bg-transparent  '>
        <button className=' bg-fondo2 backdrop-blur-2xl w-6 h-6 mb-2  lg:w-8 lg:h-8 border-2 rounded-full hover:text-red ' onClick={() => changeBackgroundColor('bg-fondo2')}></button>
        <button className=' bg-fondo4 backdrop-blur-2xl w-6  h-6 mb-2  lg:w-8 lg:h-8 border-2 rounded-full hover:text-red ' onClick={() => changeBackgroundColor('bg-fondo4')}></button>
        <button className=' bg-fondo3 backdrop-blur-2xl  w-6  h-6   lg:w-8 lg:h-8 border-2 rounded-full hover:text-red ' onClick={() => changeBackgroundColor('bg-fondo3')}></button>
    </div>
  );
};

export default Theme;


