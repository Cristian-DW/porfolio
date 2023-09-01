
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Theme = ({ changeBackgroundColor }) => {
  return (
    <div className=' w-full fixed z-50 left-10 bottom-10 flex  lg:flex lg:flex-col  lg:fixed justify-evenly items-center lg:bottom-1 lg:right-5 lg:w-16 lg:h-48   lg:bg-transparent  '>
        <button className=' bg-fondo2 backdrop-blur-2xl w-8 h-8 border-2 rounded-full hover:text-red ' onClick={() => changeBackgroundColor('bg-fondo2')}></button>
        <button className=' bg-fondo4 backdrop-blur-2xl w-8 h-8 border-2 rounded-full hover:text-red ' onClick={() => changeBackgroundColor('bg-fondo4')}></button>
        <button className=' bg-fondo3 backdrop-blur-2xl w-8 h-8 border-2 rounded-full hover:text-red ' onClick={() => changeBackgroundColor('bg-fondo3')}></button>
    </div>
  );
};

export default Theme;


