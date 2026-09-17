import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Challenge { id: string; }

const challengeIds: Challenge[] = [
  { id: 'deployment' },
  { id: 'auth' },
  { id: 'isolation' },
];

const quadrantStyles = [
  { label_key: 'challenges.label_challenge', content_key: 'challenge', color: 'text-primary',  border: 'border-line/10' },
  { label_key: 'challenges.label_decision',  content_key: 'decision',  color: 'text-cyan',     border: 'border-cyan/20' },
  { label_key: 'challenges.label_solution',  content_key: 'solution',  color: 'text-brand',    border: 'border-brand/20' },
  { label_key: 'challenges.label_outcome',   content_key: 'outcome',   color: 'text-green-600 dark:text-green-400', border: 'border-green-500/20' },
];

const EngineeringChallenges: React.FC = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | null>('deployment');

  return (
    <section className="py-20 md:py-32 bg-surface relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="mb-12 animate-fade-up">
          <span className="section-eyebrow">{t('challenges.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-primary mb-4 tracking-tight">
            {t('challenges.title')}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl leading-relaxed">
            {t('challenges.subtitle')}
          </p>
        </div>

        <div className="space-y-4 animate-fade-up">
          {challengeIds.map((c, idx) => {
            const isOpen = expanded === c.id;
            return (
              <div
                key={c.id}
                className={`glass-panel overflow-hidden transition-all duration-300 ${isOpen ? 'border-brand/30' : 'hover:border-line/20'}`}
              >
                <button
                  onClick={() => setExpanded(isOpen ? null : c.id)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-brand font-mono font-bold text-sm opacity-60">0{idx + 1}</span>
                    <h3 className="text-lg md:text-xl font-bold font-space text-primary group-hover:text-brand transition-colors">
                      {t(`challenges.${c.id}_title`)}
                    </h3>
                  </div>
                  <svg
                    className={`w-5 h-5 text-muted flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180 text-brand' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="px-6 md:px-8 pb-8 animate-fade-up animate-duration-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {quadrantStyles.map((q) => (
                        <div key={q.content_key} className={`rounded-xl border p-4 md:p-5 bg-surface/60 ${q.border}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-bold uppercase tracking-wider ${q.color}`}>
                              {t(q.label_key)}
                            </span>
                          </div>
                          <p className="text-sm text-primary/75 leading-relaxed">
                            {t(`challenges.${c.id}_${q.content_key}`)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default EngineeringChallenges;
