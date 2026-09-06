import React from 'react';

interface ProjectsCardProps {
  title: string;
  description: string;
  fecha: string;
  backgroundImage: string;
  link?: string;
  link2?: string;
  icons?: string[]; 
  tags?: string[];
  featured?: boolean;
}

/**
 * ProjectsCard Component
 * A flexible, premium card for showcasing projects with glassmorphism and hover effects.
 */
const ProjectsCard: React.FC<ProjectsCardProps> = ({
  title,
  description,
  backgroundImage,
  link,
  link2,
  icons,
  tags,
  featured = false
}) => {
  return (
    <div className={`group relative w-full ${featured ? 'h-[28rem] md:h-[32rem]' : 'h-[22rem] md:h-[24rem]'} rounded-[2rem] overflow-hidden transform transition-all duration-700 hover:scale-[1.02] shadow-2xl`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-1000 group-hover:scale-110"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Gradient Overlays for Readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/80 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700"></div>
      
      {/* Glassmorphism Border & Inner Glow */}
      <div className={`absolute inset-0 rounded-[2rem] border transition-colors duration-700 pointer-events-none ${featured ? 'border-brand/30 group-hover:border-brand/60' : 'border-line/10 group-hover:border-line/25'}`}></div>

      {/* Content Container */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end text-primary z-10">
        
        {/* Featured Badge */}
        {featured && (
          <div className="absolute top-6 right-6">
            <span className="px-3 py-1 bg-brand/20 border border-brand/50 text-brand text-[10px] uppercase tracking-wider font-bold rounded-full backdrop-blur-md">
              Flagship Project
            </span>
          </div>
        )}

        {/* Dynamic Tech Stack Icons - Top Left */}
        {icons && icons.length > 0 && (
          <div className="absolute top-6 left-6 flex gap-x-2 transition-all duration-700">
            {icons.map((icon, idx) => (
              <div key={idx} className="w-8 h-8 rounded-lg bg-surface-card/80 backdrop-blur-md border border-line/10 p-1.5 flex items-center justify-center hover:bg-surface-card hover:border-line/20 transition-all duration-300">
                <img src={icon} alt={`tech-${idx}`} className="w-full h-full object-contain filter drop-shadow-md" />
              </div>
            ))}
          </div>
        )}

        {/* Project Info */}
        <div className="transform transition-all duration-700 translate-y-4 group-hover:translate-y-0">
          <h3 className={`font-space font-bold uppercase mb-2 tracking-tight ${featured ? 'text-2xl md:text-4xl' : 'text-xl md:text-2xl'} group-hover:text-brand-light transition-colors`}>
            {title}
          </h3>
          
          <p className="text-muted text-xs md:text-sm md:max-w-[90%] mb-4 leading-relaxed group-hover:text-primary/90 transition-colors duration-500 line-clamp-3">
            {description}
          </p>

          {/* Tags */}
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
              {tags.map((tag, idx) => (
                <span key={idx} className="tech-badge bg-surface/70 border-line/10">{tag}</span>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-row gap-x-3 items-center opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0 delay-200">
            {link2 && (
              <a
                href={link2}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative h-10 px-6 rounded-full overflow-hidden flex items-center justify-center bg-surface border border-line/10 hover:border-brand/50 transition-all active:scale-95"
              >
                <span className="relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-wider text-primary group-hover/btn:scale-105 transition-transform">
                  Code / Info
                </span>
              </a>
            )}

            {link && (
              <a
                href={link}
                target="_blank"
                rel="noreferrer"
                className="group/btn relative h-10 px-6 rounded-full overflow-hidden flex items-center justify-center bg-brand text-white hover:bg-brand-light transition-all active:scale-95 shadow-[0_0_15px_rgba(0,112,243,0.3)]"
              >
                <span className="relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-wider group-hover/btn:scale-105 transition-transform">
                  View Demo
                </span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsCard;