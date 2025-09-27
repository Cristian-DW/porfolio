import React from 'react';

interface ThemeProps {
  changeBackgroundColor: (color: string) => void;
}

const themes = [
  { color: 'bg-fondo2', name: 'Morado', class: 'bg-[#4C1D95]' },
  { color: 'bg-fondo3', name: 'Verde', class: 'bg-[#065F46]' },
  { color: 'bg-fondo4', name: 'Terracota', class: 'bg-[#9A3412]' },
];

const Theme: React.FC<ThemeProps> = ({ changeBackgroundColor }) => {
  return (
    <div className="fixed z-30 bottom-5 right-0 2xl:left-10 flex flex-col gap-3 p-2 w-10">
      {themes.map((theme) => (
        <button
          key={theme.color}
          className={`${theme.class} w-6 h-6 2xl:w-8 2xl:h-8 rounded-full border-2 border-white/20 hover:border-white/60 transition-all duration-300 shadow-lg hover:scale-110 active:scale-95`}
          onClick={() => changeBackgroundColor(theme.color)}
          title={theme.name}
          aria-label={`Cambiar a tema ${theme.name}`}
        />
      ))}
    </div>
  );
};

export default Theme;