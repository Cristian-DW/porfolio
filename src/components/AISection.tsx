import React from 'react';
import { useTranslation } from 'react-i18next';

const aiTechnologies = [
  'Generative AI',
  'LLMs',
  'AI APIs',
  'AI-assisted Development',
  'Intelligent Applications',
  'Prompt Engineering',
];

const AISection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="ai" className="py-20 md:py-28 bg-surface relative overflow-hidden">
      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(0,112,243,0.04)_0%,_transparent_70%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Left: Visual */}
          <div className="flex justify-center md:justify-start animate-fade-up">
            <div className="relative w-56 h-56 md:w-64 md:h-64 flex-shrink-0">
              <div className="absolute inset-0 rounded-full border border-brand/15 animate-pulse" />
              <div className="absolute inset-5 rounded-full border border-brand/10 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute inset-10 rounded-full border border-brand/8 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-brand/10 border border-brand/25 flex items-center justify-center">
                  <svg className="w-9 h-9 text-brand" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="animate-fade-up" style={{ animationDelay: '100ms' }}>
            <span className="section-eyebrow">{t('ai.eyebrow')}</span>
            <h2 className="text-3xl md:text-4xl font-bold font-space text-white mb-4 tracking-tight leading-tight">
              {t('ai.title')}
            </h2>
            <p className="text-muted text-sm md:text-base leading-relaxed mb-6">
              {t('ai.description')}
            </p>

            {/* Note */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-white/8 bg-white/3 mb-6">
              <svg className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-xs text-muted leading-relaxed">
                {t('ai.note')}
              </p>
            </div>

            {/* Tech pills */}
            <div className="flex flex-wrap gap-2">
              {aiTechnologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-full border border-brand/20 bg-brand/8 text-xs text-brand/90 font-medium hover:border-brand/40 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AISection;
