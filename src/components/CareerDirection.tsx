import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Stage {
  id: string;
  statusKey: string;
  isCurrent?: boolean;
  isFuture?: boolean;
}

const stages: Stage[] = [
  { id: 'software_engineering', statusKey: 'career.status_foundation' },
  { id: 'fullstack', statusKey: 'career.status_experience' },
  { id: 'cloud_integration', statusKey: 'career.status_expanding' },
  { id: 'sap_btp', statusKey: 'career.status_specialization' },
  { id: 'architecture', statusKey: 'career.status_current', isCurrent: true },
  { id: 'ai_emerging', statusKey: 'career.status_future', isFuture: true },
];

const projectionStages = [
  'career.proj_stage1',
  'career.proj_stage2',
  'career.proj_stage3',
  'career.proj_stage4',
];

const CareerDirection: React.FC = () => {
  const { t } = useTranslation();
  const [activeStage, setActiveStage] = useState<string | null>('architecture');

  return (
    <section id="career" className="py-20 md:py-32 bg-surface-mid relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-14 animate-fade-up">
          <span className="section-eyebrow">{t('career.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white mb-4 tracking-tight">
            {t('career.title')}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto">
            {t('career.subtitle')}
          </p>
        </div>

        {/* Stage grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-14 animate-fade-up">
          {stages.map((stage, idx) => {
            const isActive = activeStage === stage.id;
            return (
              <button
                key={stage.id}
                onClick={() => setActiveStage(isActive ? null : stage.id)}
                className={`text-left p-5 rounded-xl border transition-all duration-300 ${
                  stage.isCurrent
                    ? 'border-brand/50 bg-brand/8 hover:border-brand/70'
                    : stage.isFuture
                    ? 'border-dashed border-white/15 hover:border-white/30'
                    : 'border-white/10 hover:border-white/25 bg-surface-card/30'
                } ${isActive ? 'ring-1 ring-brand/30' : ''}`}
              >
                <div className="flex items-start gap-3">
                  {/* Step number */}
                  <span className={`text-xs font-mono font-bold flex-shrink-0 mt-0.5 ${stage.isCurrent ? 'text-brand' : 'text-muted/40'}`}>
                    0{idx + 1}
                  </span>

                  <div className="flex-1">
                    {/* Status label */}
                    <span className={`inline-block text-[10px] font-bold uppercase tracking-widest mb-1 ${
                      stage.isCurrent ? 'text-brand' : stage.isFuture ? 'text-muted/50' : 'text-muted/40'
                    }`}>
                      {t(stage.statusKey)}
                    </span>
                    {/* Stage title */}
                    <h3 className={`font-bold font-space text-sm md:text-base leading-snug ${
                      stage.isCurrent ? 'text-white' : stage.isFuture ? 'text-muted/70' : 'text-white/80'
                    }`}>
                      {t(`career.stage_${stage.id}_title`)}
                    </h3>
                    {/* Expanded description */}
                    {isActive && (
                      <p className="text-xs text-muted mt-2 leading-relaxed animate-fade-up animate-duration-200">
                        {t(`career.stage_${stage.id}_desc`)}
                      </p>
                    )}
                  </div>

                  {/* Visual indicator */}
                  {stage.isFuture && (
                    <div className="w-2 h-2 rounded-full bg-brand/50 animate-ping flex-shrink-0 mt-1.5" />
                  )}
                  {stage.isCurrent && (
                    <div className="w-2 h-2 rounded-full bg-brand flex-shrink-0 mt-1.5" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Career projection */}
        <div className="glass-panel p-6 md:p-8 animate-fade-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-brand/50" />
            <h3 className="text-sm font-bold font-space text-white uppercase tracking-wider">
              {t('career.projection_title')}
            </h3>
          </div>

          <p className="text-xs text-muted mb-6 border-l-2 border-brand/20 pl-3 max-w-lg leading-relaxed">
            {t('career.projection_note')}
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-0">
            {projectionStages.map((key, i) => (
              <React.Fragment key={key}>
                <div className={`flex-1 text-center px-3 py-2.5 rounded-lg border transition-colors ${
                  i === 0
                    ? 'border-brand/40 bg-brand/8 text-brand'
                    : i === projectionStages.length - 1
                    ? 'border-dashed border-white/10 text-muted/40'
                    : 'border-white/10 text-muted/60'
                }`}>
                  <span className="text-xs font-medium font-space">{t(key)}</span>
                </div>
                {i < projectionStages.length - 1 && (
                  <div className="sm:w-6 flex justify-center py-1 sm:py-0">
                    <svg className="w-3 h-3 text-muted/25 rotate-90 sm:rotate-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerDirection;
