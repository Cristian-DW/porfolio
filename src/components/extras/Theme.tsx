import React from 'react';

interface ThemeProps {
  changeBackgroundColor: (color: string) => void;
}

const themes = [
  { color: 'bg-fondo2', name: 'Morado', class: 'bg-[#4C1D95]', emoji: '💜' },
  { color: 'bg-fondo3', name: 'Verde', class: 'bg-[#065F46]', emoji: '💚' },
  { color: 'bg-fondo4', name: 'Terracota', class: 'bg-[#9A3412]', emoji: '🧡' },
];

const Theme: React.FC<ThemeProps> = ({ changeBackgroundColor }) => {
  return (
    // Desktop Only: Vertical Sidebar on Bottom-Left (hidden on mobile, shown in social bar)
    <div
      className="hidden 2xl:flex 2xl:flex-col 
                 fixed bottom-6 left-6 
                 w-16 gap-4
                 backdrop-blur-xl bg-white/5 
                 p-3 rounded-2xl
                 border border-white/10
                 shadow-2xl shadow-purple-500/10
                 z-50"
    >
      {themes.map((theme) => (
        <button
          key={theme.color}
          onClick={() => changeBackgroundColor(theme.color)}
          aria-label={`Cambiar a tema ${theme.name}`}
          className="group relative p-2.5 rounded-xl 
                     bg-white/5 backdrop-blur-sm
                     border border-white/10
                     transition-all duration-300
                     hover:scale-110 hover:bg-white/10
                     hover:shadow-lg hover:shadow-purple-500/20
                     active:scale-95"
        >
          <div
            className={`${theme.class} w-10 h-10 rounded-full 
                       border-2 border-white/30 group-hover:border-white/60
                       shadow-md group-hover:shadow-lg
                       transition-all duration-300 
                       group-hover:scale-110 group-hover:rotate-12
                       flex items-center justify-center text-lg`}
          >
            {theme.emoji}
          </div>

          {/* Decorative glow on hover */}
          <div className="absolute inset-0 rounded-xl bg-purple-500/0 
                        group-hover:bg-purple-500/10 transition-all duration-300 blur-sm" />
        </button>
      ))}
    </div>
  );
};

export default Theme;