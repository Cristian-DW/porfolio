import React from 'react';
import { Link } from 'react-scroll';
import ImgAbout from '../assets/about.webp';
import { useTranslation } from 'react-i18next';

const specialtyBadges = [
  { key: 'badge_software', accent: false },
  { key: 'badge_cloud', accent: false },
  { key: 'badge_integration', accent: false },
  { key: 'badge_sap', accent: true },
  { key: 'badge_architecture', accent: false },
];

/**
 * About component — v3
 * Professional identity: Software Engineer evolving toward Solution Architecture.
 */
const About: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="about"
      className="w-full min-h-screen flex items-center justify-center py-20 md:py-32 px-6 md:px-12 bg-surface-mid relative overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-center">

          {/* Photo */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div className="relative w-[260px] h-[340px] md:w-[320px] md:h-[420px] flex-shrink-0">
              {/* Accent box behind */}
              <div className="absolute w-full h-full bottom-5 -right-5 bg-brand/15 border border-brand/20 rounded-xl" />
              {/* Photo */}
              <img
                src={ImgAbout}
                alt="Cristian Castro"
                className="absolute z-10 w-full h-full object-cover rounded-xl border border-white/10 shadow-2xl"
                loading="lazy"
              />
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3 flex flex-col justify-center">
            <span className="section-eyebrow animate-fade-up">{t('about.eyebrow')}</span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space tracking-tight mb-6 text-white leading-tight animate-fade-up">
              {t('about.headline_line1')}{' '}
              <span className="text-brand">{t('about.headline_line2')}</span>
            </h2>

            {/* Specialty badges */}
            <div className="flex flex-wrap gap-2 mb-8 animate-fade-up">
              {specialtyBadges.map((b) => (
                <span
                  key={b.key}
                  className={`tech-badge ${b.accent ? 'text-cyan border-cyan/20' : ''}`}
                >
                  {t(`about.${b.key}`)}
                </span>
              ))}
            </div>

            {/* Description paragraphs */}
            <div className="space-y-4 mb-8 animate-fade-up">
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {t('about.para1')}
              </p>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {t('about.para2')}
              </p>
              <p className="text-sm md:text-base text-muted leading-relaxed">
                {t('about.para3')}
              </p>
            </div>

            {/* CTA */}
            <div className="flex gap-3 flex-wrap animate-fade-up">
              <Link to="contact" smooth={true} duration={900}>
                <button className="h-11 px-7 rounded-full bg-brand text-white font-bold uppercase tracking-wider text-xs transition-all hover:bg-brand-light hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(0,112,243,0.2)]">
                  {t('about.cta_contact')}
                </button>
              </Link>
              <Link to="project" smooth={true} duration={900}>
                <button className="h-11 px-7 rounded-full bg-surface-card border border-white/10 text-white font-bold uppercase tracking-wider text-xs transition-all hover:border-brand hover:scale-105 active:scale-95">
                  {t('about.cta_projects')}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
