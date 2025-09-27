import React, { useEffect, useState } from 'react';

interface BackgroundProps {
  selectedColor?: string;
  className?: string; // 👈 añadimos esta prop
}

const Background: React.FC<BackgroundProps> = ({ selectedColor = 'bg-fondo2', className }) => {
  const [gradientColors, setGradientColors] = useState(
    'from-temas-morado-start via-temas-morado-mid to-temas-morado-end'
  );

  useEffect(() => {
    switch (selectedColor) {
      case 'bg-fondo3':
        setGradientColors('from-temas-verde-start via-temas-verde-mid to-temas-verde-end');
        break;
      case 'bg-fondo4':
        setGradientColors('from-temas-terracota-start via-temas-terracota-mid to-temas-terracota-end');
        break;
      case 'bg-fondo5':
        setGradientColors('from-temas-oceano-start via-temas-oceano-mid to-temas-oceano-end');
        break;
      default:
        setGradientColors('from-temas-morado-start via-temas-morado-mid to-temas-morado-end');
    }
  }, [selectedColor]);

  return (
    <ul
      className={`background h-full w-full absolute top-0 left-0 bg-gradient-to-br ${gradientColors} ${className || ''}`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className="backdrop-blur-sm"></li>
      ))}
    </ul>
  );
};

export default Background;