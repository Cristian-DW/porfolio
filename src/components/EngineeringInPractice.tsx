import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Block {
  id: string;
  color: 'brand' | 'cyan';
}

const blocks: Block[] = [
  { id: 'custom',      color: 'brand' },
  { id: 'integration', color: 'cyan'  },
  { id: 'enterprise',  color: 'brand' },
  { id: 'sap',         color: 'cyan'  },
  { id: 'quality',     color: 'brand' },
  { id: 'deployment',  color: 'cyan'  },
  { id: 'erp',         color: 'brand' },
];

const quadrants = [
  { labelKey: 'Problem',     contentField: 'problem',   colorClass: 'text-primary',               borderClass: 'border-line/10'      },
  { labelKey: 'Challenge',   contentField: 'challenge',  colorClass: 'text-cyan',                  borderClass: 'border-cyan/20'      },
  { labelKey: 'Decisions',   contentField: 'decisions',  colorClass: 'text-brand',                 borderClass: 'border-brand/20'     },
  { labelKey: 'Outcome',     contentField: 'outcome',    colorClass: 'text-green-600 dark:text-green-400', borderClass: 'border-green-500/20' },
];

const colorMap = {
  brand: { accent: 'text-brand', border: 'border-brand/30', dot: 'bg-brand' },
  cyan:  { accent: 'text-cyan',  border: 'border-cyan/25',  dot: 'bg-cyan'  },
};

const EngineeringInPractice: React.FC = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | null>('custom');

  return (
    <section id="engineering" className="py-20 md:py-32 bg-surface relative overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-14 animate-fade-up">
          <span className="section-eyebrow">{t('engineering.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-primary mb-4 tracking-tight">
            {t('engineering.title')}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl leading-relaxed">
            {t('engineering.subtitle')}
          </p>
        </div>

        {/* Accordion blocks */}
        <div className="space-y-4 animate-fade-up">
          {blocks.map((block, idx) => {
            const isOpen = expanded === block.id;
            const c = colorMap[block.color];
            return (
              <div
                key={block.id}
                className={`glass-panel overflow-hidden transition-all duration-300 ${isOpen ? c.border : 'hover:border-line/20'}`}
              >
                {/* Header button */}
                <button
                  onClick={() => setExpanded(isOpen ? null : block.id)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono font-bold text-sm opacity-50 ${c.accent}`}>0{idx + 1}</span>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold font-space text-primary group-hover:text-brand transition-colors">
                        {t(`engineering.block_${block.id}_title`)}
                      </h3>
                      <p className="text-xs text-muted mt-0.5 leading-relaxed max-w-2xl">
                        {t(`engineering.block_${block.id}_context`)}
                      </p>
                    </div>
                  </div>
                  <svg
                    className={`w-5 h-5 text-muted flex-shrink-0 ml-4 transition-transform duration-300 ${isOpen ? `rotate-180 ${c.accent}` : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {/* Expanded content */}
                {isOpen && (
                  <div className="px-6 md:px-8 pb-8 animate-fade-up animate-duration-200">
                    {/* Quadrant grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                      {quadrants.map((q) => (
                        <div
                          key={q.contentField}
                          className={`rounded-xl border p-4 md:p-5 bg-surface/60 ${q.borderClass}`}
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className={`text-xs font-bold uppercase tracking-wider ${q.colorClass}`}>
                              {q.labelKey}
                            </span>
                          </div>
                          <p className="text-sm text-primary/75 leading-relaxed">
                            {t(`engineering.block_${block.id}_${q.contentField}`)}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Trade-offs */}
                    <div className="rounded-xl border border-line/8 p-4 md:p-5 bg-surface/40 mb-5">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-muted/70">
                          Trade-offs
                        </span>
                      </div>
                      <p className="text-sm text-primary/70 leading-relaxed">
                        {t(`engineering.block_${block.id}_tradeoffs`)}
                      </p>
                    </div>

                    {/* Tech evidence */}
                    <div className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${c.dot}`} />
                      <p className="text-xs text-muted/60 font-mono leading-relaxed">
                        {t(`engineering.block_${block.id}_tech`)}
                      </p>
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

export default EngineeringInPractice;
