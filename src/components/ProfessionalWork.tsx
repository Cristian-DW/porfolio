import React from 'react';
import { useTranslation } from 'react-i18next';

const ArrowDown = () => (
  <div className="flex justify-center py-1">
    <div className="flex flex-col items-center gap-0.5">
      <div className="w-px h-5 bg-line/15" />
      <svg className="w-3 h-3 text-line/20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  </div>
);

const flowNodes = [
  { key: 'flow_pos',         color: 'brand' as const },
  { key: 'flow_integration', color: 'cyan'  as const },
  { key: 'flow_erp',         color: 'brand' as const },
  { key: 'flow_invoicing',   color: 'cyan'  as const },
];

const contributions = [
  'contrib_1', 'contrib_2', 'contrib_3', 'contrib_4', 'contrib_5',
  'contrib_6', 'contrib_7', 'contrib_8', 'contrib_9',
];

const impacts = [
  'impact_1', 'impact_2', 'impact_3', 'impact_4', 'impact_5', 'impact_6',
];

const colorMap = {
  brand: { border: 'border-brand/25', bg: 'bg-brand/5', text: 'text-brand', dot: 'bg-brand' },
  cyan:  { border: 'border-cyan/20',  bg: 'bg-cyan/5',  text: 'text-cyan',  dot: 'bg-cyan'  },
};

const ProfessionalWork: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="professional-work" className="py-20 md:py-32 bg-surface-mid relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <span className="section-eyebrow">{t('professionalwork.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-primary mb-4 tracking-tight">
            {t('professionalwork.title')}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-3xl leading-relaxed">
            {t('professionalwork.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-up">

          {/* Left column — Context + Challenge + Flow */}
          <div className="lg:col-span-1 flex flex-col gap-6">

            {/* Context */}
            <div className="glass-panel p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted/60 mb-3">
                {t('professionalwork.context_label')}
              </h3>
              <p className="text-sm text-primary/80 leading-relaxed">
                {t('professionalwork.context')}
              </p>
            </div>

            {/* System flow diagram */}
            <div className="glass-panel p-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted/60 mb-4">
                {t('professionalwork.challenge_label')}
              </h3>
              <p className="text-sm text-primary/75 leading-relaxed mb-5">
                {t('professionalwork.challenge')}
              </p>

              {/* Flow nodes */}
              <div className="max-w-[200px] mx-auto">
                {flowNodes.map((node, idx) => {
                  const c = colorMap[node.color];
                  return (
                    <div key={node.key}>
                      <div className={`rounded-xl border ${c.border} ${c.bg} px-4 py-2.5 text-center`}>
                        <span className={`text-xs font-bold font-space ${c.text}`}>
                          {t(`professionalwork.${node.key}`)}
                        </span>
                      </div>
                      {idx < flowNodes.length - 1 && <ArrowDown />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right column — Contributions + Impact */}
          <div className="lg:col-span-2 flex flex-col gap-6">

            {/* Technical contributions */}
            <div className="glass-panel p-6 md:p-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted/60 mb-2">
                {t('professionalwork.contribution_label')}
              </h3>
              <p className="text-sm text-muted leading-relaxed mb-5 border-l-2 border-brand/30 pl-3">
                {t('professionalwork.contribution_intro')}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {contributions.map((key) => (
                  <div
                    key={key}
                    className="architecture-node flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 mt-1.5" />
                    <p className="text-xs text-primary/75 leading-relaxed">
                      {t(`professionalwork.${key}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Business impact */}
            <div className="glass-panel p-6 md:p-8">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted/60 mb-5">
                {t('professionalwork.impact_label')}
              </h3>
              <div className="space-y-3">
                {impacts.map((key, idx) => (
                  <div key={key} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold font-mono ${
                      idx < 2 ? 'bg-brand/10 text-brand' : 'bg-cyan/10 text-cyan'
                    }`}>
                      {idx + 1}
                    </div>
                    <p className="text-sm text-primary/75 leading-relaxed">
                      {t(`professionalwork.${key}`)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Confidentiality note */}
            <div className="flex items-start gap-3 p-4 rounded-xl border border-line/8 bg-surface/40">
              <svg className="w-4 h-4 text-muted/40 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <p className="text-[11px] text-muted/40 leading-relaxed">
                {t('professionalwork.confidentiality_note')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfessionalWork;
