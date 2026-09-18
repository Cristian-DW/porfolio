import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LayerInfo {
  id: string;
  titleKey: string;
  techKey: string;
  descKey: string;
  color: 'brand' | 'cyan';
  icon: string;
}

const layers: LayerInfo[] = [
  {
    id: 'presentation',
    titleKey: 'architecture.layer_presentation_title',
    techKey: 'architecture.layer_presentation_tech',
    descKey: 'architecture.layer_presentation_desc',
    color: 'brand', icon: '⬡',
  },
  {
    id: 'router',
    titleKey: 'architecture.layer_router_title',
    techKey: 'architecture.layer_router_tech',
    descKey: 'architecture.layer_router_desc',
    color: 'cyan', icon: '⟳',
  },
  {
    id: 'services',
    titleKey: 'architecture.layer_services_title',
    techKey: 'architecture.layer_services_tech',
    descKey: 'architecture.layer_services_desc',
    color: 'brand', icon: '⬡',
  },
  {
    id: 'data',
    titleKey: 'architecture.layer_data_title',
    techKey: 'architecture.layer_data_tech',
    descKey: 'architecture.layer_data_desc',
    color: 'cyan', icon: '▣',
  },
];

const colorMap = {
  brand: {
    border: 'border-brand/30',
    bg: 'bg-brand/5',
    text: 'text-brand',
    dot: 'bg-brand',
    hoverBorder: 'hover:border-brand/60',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(0,112,243,0.12)]',
  },
  cyan: {
    border: 'border-cyan/25',
    bg: 'bg-cyan/5',
    text: 'text-cyan',
    dot: 'bg-cyan',
    hoverBorder: 'hover:border-cyan/50',
    hoverGlow: 'hover:shadow-[0_0_24px_rgba(34,211,238,0.10)]',
  },
};

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

const DeltuxArchitecture: React.FC = () => {
  const { t } = useTranslation();
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <section id="architecture" className="py-20 md:py-32 bg-surface-mid relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/4 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <span className="section-eyebrow">{t('architecture.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-primary mb-4 tracking-tight">
            {t('architecture.title')}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-3xl leading-relaxed">
            {t('architecture.description')}
          </p>
        </div>

        {/* Diagram */}
        <div className="glass-panel p-6 md:p-10 animate-fade-up">
          <div className="max-w-3xl mx-auto">

            {/* Users */}
            <div className="flex justify-center mb-1">
              <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-surface border border-line/10 text-sm text-muted">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                </svg>
                <span className="font-medium text-primary/70">{t('architecture.users')}</span>
              </div>
            </div>

            <ArrowDown />

            {layers.map((layer, idx) => {
              const c = colorMap[layer.color];
              const isActive = activeLayer === layer.id;
              return (
                <div key={layer.id}>
                  <button
                    onClick={() => setActiveLayer(isActive ? null : layer.id)}
                    className={`w-full text-left rounded-xl border p-4 md:p-5 transition-all duration-300 cursor-pointer ${c.border} ${c.bg} ${c.hoverBorder} ${c.hoverGlow} ${isActive ? 'ring-1 ring-inset ' + c.border : ''}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-1">
                          <div className={`w-2 h-2 rounded-full flex-shrink-0 ${c.dot}`} />
                          <h3 className={`font-bold font-space text-sm md:text-base ${c.text}`}>
                            {t(layer.titleKey)}
                          </h3>
                        </div>
                        <p className="text-xs text-muted pl-5 font-mono">
                          {t(layer.techKey)}
                        </p>
                      </div>
                      <svg
                        className={`w-4 h-4 text-muted flex-shrink-0 ml-3 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </div>

                    {isActive && (
                      <div className="mt-3 pl-5 pr-2 animate-fade-up animate-duration-200">
                        <p className="text-sm text-primary/75 leading-relaxed">
                          {t(layer.descKey)}
                        </p>
                      </div>
                    )}
                  </button>

                  {idx < layers.length - 1 && <ArrowDown />}
                </div>
              );
            })}

            {/* Platform badge */}
            <div className="mt-6 flex justify-center">
              <div className="flex items-center gap-3 px-5 py-2.5 rounded-xl border border-brand/30 bg-brand/8">
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
                <span className="text-xs font-bold font-space text-brand uppercase tracking-wider">
                  {t('architecture.platform')}
                </span>
                <div className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" style={{ animationDelay: '0.5s' }} />
              </div>
            </div>

            <p className="text-center text-[11px] text-muted/50 mt-4 font-medium">
              {t('architecture.layer_hint')}
            </p>
          </div>
        </div>

        {/* Closing */}
        <div className="mt-8 max-w-3xl mx-auto animate-fade-up">
          <p className="text-sm text-muted leading-relaxed border-l-2 border-brand/30 pl-4">
            {t('architecture.closing')}
          </p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10 animate-fade-up">
          {['highlight1', 'highlight2', 'highlight3'].map((k) => (
            <div key={k} className="architecture-node">
              <h4 className={`font-bold mb-2 font-space text-sm ${k === 'highlight2' ? 'text-cyan' : 'text-brand'}`}>
                {t(`architecture.${k}_title`)}
              </h4>
              <p className="text-xs text-muted leading-relaxed">
                {t(`architecture.${k}_desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DeltuxArchitecture;
