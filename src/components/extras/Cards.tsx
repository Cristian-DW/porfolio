import React from 'react';

interface ProjectsCardProps {
  title: string;
  description: string;
  fecha: string;
  backgroundImage: string;
  link: string;
  link2: string;
  icons?: string[]; // Optional tech icons as props
}

/**
 * ProjectsCard Component
 * A flexible, premium card for showcasing projects with glassmorphism and hover effects.
 * Dimensions are now fluid to fit responsive grid/slider containers.
 */
const ProjectsCard: React.FC<ProjectsCardProps> = ({
  title,
  description,
  backgroundImage,
  link,
  link2,
  icons
}) => {
  return (
    <div className="group relative w-full h-[22rem] md:h-[24rem] 2xl:h-[28rem] rounded-[2rem] overflow-hidden transform transition-all duration-700 hover:scale-[1.02] hover:-rotate-1 shadow-2xl">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 group-hover:scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-700"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-fondo2/10 via-transparent to-pink-500/10 opacity-40 group-hover:opacity-60 transition-opacity duration-1000"></div>

      {/* Glassmorphism Border & Inner Glow */}
      <div className="absolute inset-0 rounded-[2rem] border border-white/10 group-hover:border-white/30 transition-colors duration-700 pointer-events-none"></div>
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-700 pointer-events-none"></div>

      {/* Content Container */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-white z-10">

        {/* Dynamic Tech Stack Icons - Top Left */}
        {icons && icons.length > 0 && (
          <div className="absolute top-5 left-5 flex gap-x-2 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-3 group-hover:translate-y-0">
            {icons.map((icon, idx) => (
              <div key={idx} className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 p-1.5 flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all duration-300">
                <img src={icon} alt={`tech-${idx}`} className="w-full h-full object-contain filter drop-shadow-md" />
              </div>
            ))}
          </div>
        )}

        {/* Project Info */}
        <div className="transform transition-all duration-700 translate-y-6 group-hover:translate-y-0">
          <span className="text-fondo2 text-[9px] uppercase tracking-[0.3em] font-black mb-1.5 block opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            Featured Project
          </span>
          <h3 className="text-xl md:text-2xl 2xl:text-3xl font-black uppercase mb-2 tracking-tighter leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-all">
            {title}
          </h3>
          <p className="text-white/60 text-[10px] md:text-xs md:max-w-[90%] mb-6 leading-relaxed font-medium group-hover:text-white/90 transition-colors duration-500">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-row gap-x-2.5 items-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0 delay-200">
            <a
              href={link2}
              target="_blank"
              rel="noreferrer"
              className="group/btn relative h-9 px-5 rounded-full overflow-hidden flex items-center justify-center bg-white/5 border border-white/10 hover:border-white/40 transition-all active:scale-95"
            >
              <span className="relative z-10 text-[9px] md:text-xs font-black uppercase tracking-widest text-white group-hover/btn:scale-105 transition-transform">
                GitHub
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
            </a>

            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="group/btn relative h-9 px-6 rounded-full overflow-hidden flex items-center justify-center bg-white text-black hover:bg-white/90 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              <span className="relative z-10 text-[9px] md:text-xs font-black uppercase tracking-widest group-hover/btn:scale-105 transition-transform">
                Live Demo
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Dynamic Background Glow on Hover */}
      <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-fondo2/30 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
    </div>
  );
};

export default ProjectsCard;