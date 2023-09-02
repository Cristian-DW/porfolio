
// eslint-disable-next-line no-unused-vars
import React from 'react';

const Theme = ({ changeBackgroundColor }) => {
  return (
    <div className=' w-7  right-0  fixed z-50  top-20 flex  2xl:left-10  2xl:flex flex-col  2xl:fixed 2xl:justify-evenly 2xl:items-center 2xl:bottom-1 2xl:w-16 2xl:h-48   2xl:bg-transparent  '>
        <button className=' bg-fondo2 backdrop-blur-2xl w-6 h-6 mb-2  text-transparent  2xl:w-8 2xl:h-8 border-2 rounded-full hover:text-red ' onClick={() => changeBackgroundColor('bg-fondo2')}>.</button>
        <button className=' bg-fondo4 backdrop-blur-2xl w-6  h-6 mb-2 text-transparent  2xl:w-8 2xl:h-8 border-2 rounded-full hover:text-red ' onClick={() => changeBackgroundColor('bg-fondo4')}>.</button>
        <button className=' bg-fondo3 backdrop-blur-2xl  w-6  h-6  text-transparent 2xl:w-8 2xl:h-8 border-2 rounded-full hover:text-red ' onClick={() => changeBackgroundColor('bg-fondo3')}>.</button>
    </div>
  );
};

export default Theme;


