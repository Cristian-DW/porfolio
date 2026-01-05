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
    <div className="fixed z-40 bottom-6 left-6 flex flex-row md:flex-col items-center gap-3 p-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] transition-all duration-500 hover:bg-white/10 group">
      {themes.map((theme) => (
        <button
          key={theme.color}
          className={`${theme.class} w-5 h-5 md:w-6 md:h-6 rounded-full border-2 border-white/20 hover:border-white/80 transition-all duration-300 shadow-sm hover:scale-125 hover:rotate-12 active:scale-90 relative group/btn`}
          onClick={() => changeBackgroundColor(theme.color)}
          aria-label={`Cambiar a tema ${theme.name}`}
        >
          {/* Tooltip for desktop */}
          <span className="absolute left-full ml-4 px-2 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[10px] text-white opacity-0 group-hover/btn:opacity-100 pointer-events-none transition-opacity duration-300 hidden md:block whitespace-nowrap border border-white/5">
            {theme.name}
          </span>
        </button>
      ))}
    </div>
  );
};

export default Theme;