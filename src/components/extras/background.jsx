// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const Background = ({ selectedColor }) => {
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
    <ul className={` ${backgroundClass} background h-full`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} ></li>
      ))}
    </ul>
  );
};

export default Background;


