import { useEffect, useState } from 'react';
import Red1 from "../assets/bxl-github.svg"
import Red2 from "../assets/bxl-gmail.svg"
import Red3 from "../assets/bxl-linkedin.svg"

interface SocialProps {
  selectedColor: string;
  changeBackgroundColor?: (color: string) => void;
}

const Social: React.FC<SocialProps> = ({ selectedColor, changeBackgroundColor }) => {
  const [backgroundClass, setBackgroundClass] = useState('bg-fondo2');
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  useEffect(() => {
    // Cuando selectedColor cambia en el componente App, actualiza backgroundClass
    if (selectedColor === 'bg-fondo3') {
      setBackgroundClass('bg-fondo3');
    } else if (selectedColor === 'bg-fondo4') {
      setBackgroundClass('bg-fondo4');
    } else {
      setBackgroundClass('bg-fondo2');
    }
  }, [selectedColor]);

  const themes = [
    { color: 'bg-fondo2', label: 'Morado' },
    { color: 'bg-fondo3', label: 'Verde' },
    { color: 'bg-fondo4', label: 'Terracota' },
  ];

  const socialLinks = [
    {
      href: "https://github.com/Cristian-DW",
      icon: Red1,
      alt: "GitHub",
      label: "GitHub Profile"
    },
    {
      href: "mailto:cristtiiank@gmail.com",
      icon: Red2,
      alt: "Email",
      label: "Send Email"
    },
    {
      href: "https://www.linkedin.com/in/cristian-castro-pineda/",
      icon: Red3,
      alt: "LinkedIn",
      label: "LinkedIn Profile"
    }
  ];

  return (
    <>
      {/* Mobile: Bottom Bar with Glassmorphism - Social + Theme */}
      <div
        className={`fixed bottom-0 left-0 right-0 w-full h-14 ${backgroundClass} 
                    backdrop-blur-xl bg-opacity-80 
                    flex justify-around items-center px-4
                    border-t border-white/10
                    2xl:hidden z-50`}
      >
        {/* Social Icons */}
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="p-3 rounded-xl transition-all duration-300
                       hover:scale-110 hover:bg-white/10
                       active:scale-95"
          >
            <img
              src={link.icon}
              alt={link.alt}
              className="w-6 h-6 transition-all duration-300
                         hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.6)]"
            />
          </a>
        ))}

        {/* Theme Toggle Button */}
        <div className="relative">
          <button
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            aria-label="Change Theme"
            className={`p-3 rounded-xl transition-all duration-300
                       hover:scale-110 hover:bg-white/10
                       active:scale-95 ${isThemeOpen ? 'bg-white/20' : ''}`}
          >
            <span className="text-xl">🎨</span>
          </button>

          {/* Theme Popover */}
          {isThemeOpen && (
            <div className="absolute bottom-16 right-0 mb-2 p-2 rounded-2xl
                             backdrop-blur-xl bg-white/10 border border-white/20
                             shadow-2xl flex flex-col gap-3 animate-fade-up">
              {themes.map((theme) => (
                <button
                  key={theme.color}
                  onClick={() => {
                    changeBackgroundColor?.(theme.color);
                    setIsThemeOpen(false);
                  }}
                  aria-label={`Select ${theme.label}`}
                  className="w-10 h-10 rounded-full border-2 border-white/30 
                             hover:scale-110 transition-transform shadow-lg relative"
                >
                  <div className={`absolute inset-0 rounded-full ${theme.color === 'bg-fondo2' ? 'bg-[#4C1D95]' : theme.color === 'bg-fondo3' ? 'bg-[#065F46]' : 'bg-[#9A3412]'} opacity-80`} />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Vertical Sidebar with Premium Glassmorphism */}
      <div
        className="hidden 2xl:flex 2xl:flex-col 
                   fixed bottom-6 right-6 
                   w-16 gap-4
                   backdrop-blur-xl bg-white/5 
                   p-3 rounded-2xl
                   border border-white/10
                   shadow-2xl shadow-purple-500/10
                   z-50"
      >
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="group relative p-2.5 rounded-xl 
                       bg-white/5 backdrop-blur-sm
                       border border-white/10
                       transition-all duration-300
                       hover:scale-110 hover:bg-white/10
                       hover:shadow-lg hover:shadow-purple-500/20
                       active:scale-95"
          >
            <img
              src={link.icon}
              alt={link.alt}
              className="w-6 h-6 transition-all duration-300
                         group-hover:drop-shadow-[0_0_12px_rgba(168,85,247,0.8)]
                         group-hover:brightness-110"
            />

            {/* Decorative glow on hover */}
            <div className="absolute inset-0 rounded-xl bg-purple-500/0 
                          group-hover:bg-purple-500/10 transition-all duration-300 blur-sm" />
          </a>
        ))}
      </div>
    </>
  )
}

export default Social
