import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';

interface Stage {
  id: string;
  statusKey: string;
  isCurrent?: boolean;
  isFuture?: boolean;
  icon: React.ReactNode;
}

const stages: Stage[] = [
  { id: 'software_engineering', statusKey: 'career.status_foundation', icon: <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></> },
  { id: 'fullstack', statusKey: 'career.status_experience', icon: <><rect x="2" y="4" width="20" height="7" rx="1.5" /><rect x="2" y="13" width="20" height="7" rx="1.5" /><line x1="6" y1="7.5" x2="6.01" y2="7.5" /><line x1="6" y1="16.5" x2="6.01" y2="16.5" /></> },
  { id: 'cloud_integration', statusKey: 'career.status_expanding', icon: <><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></> },
  { id: 'sap_btp', statusKey: 'career.status_specialization', icon: <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /></> },
  { id: 'architecture', statusKey: 'career.status_current', isCurrent: true, icon: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><line x1="12" y1="3" x2="12" y2="7" /><line x1="12" y1="17" x2="12" y2="21" /><line x1="3" y1="12" x2="7" y2="12" /><line x1="17" y1="12" x2="21" y2="12" /></> },
  { id: 'ai_emerging', statusKey: 'career.status_future', isFuture: true, icon: <><path d="M12 2l1.9 5.7L19.6 9l-5.7 1.9L12 16.6l-1.9-5.7L4.4 9l5.7-1.3z" /><path d="M19 15l.9 2.6L22.5 18.5l-2.6.9L19 22l-.9-2.6-2.6-.9 2.6-.9z" /></> },
];

const projectionStages = ['career.proj_stage1', 'career.proj_stage2', 'career.proj_stage3', 'career.proj_stage4'];

const certifications = [
  { id: 'solution_architect',    hex: '#0060D0' },
  { id: 'integration_developer', hex: '#0891B2' },
  { id: 'btp_administrator',     hex: '#6366F1' },
];

const CertBadge: React.FC<{ color: string }> = ({ color }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="46" fill="none" stroke={color} strokeWidth="3" opacity="0.4" />
    <path d="M 35 50 L 46 62 L 65 40" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <text x="50" y="82" textAnchor="middle" fill={color} fontSize="12" fontFamily="Space Grotesk, sans-serif" fontWeight="700" opacity="0.85">SAP</text>
  </svg>
);

const CareerDirection: React.FC = () => {
  const { t } = useTranslation();
  const [openStages, setOpenStages] = useState<Set<string>>(new Set(['architecture']));
  const [activeCert, setActiveCert] = useState<string | null>('solution_architect');

  const timelineRef = useScrollReveal<HTMLOListElement>({ staggerChildren: true, staggerDelay: 110 });
  const sideRef     = useScrollReveal<HTMLDivElement>({ staggerChildren: true, staggerDelay: 120 });

  const toggleStage = (id: string) => setOpenStages(prev => { const n = new Set(prev); if (n.has(id)) n.delete(id); else n.add(id); return n; });
  const toggleCert = (id: string) => setActiveCert(prev => prev === id ? null : id);

  return (
    <section id="career" className="py-16 md:py-24 bg-surface-mid relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-line/15 to-transparent" aria-hidden="true" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-brand/4 rounded-full blur-[120px] pointer-events-none blob-drift-2" aria-hidden="true" />
      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        <div className="text-center mb-12 animate-fade-up">
          <span className="section-eyebrow">{t('career.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-primary tracking-tight mb-3">{t('career.title')}</h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto">{t('career.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          <div className="lg:col-span-3 relative">
            <div className="absolute left-[23px] top-3 bottom-3 w-px bg-gradient-to-b from-brand/10 via-cyan/40 to-brand/10" aria-hidden="true" />
            <ol ref={timelineRef} className="space-y-3">
              {stages.map((stage) => {
                const isOpen = openStages.has(stage.id);
                return (
                  <li key={stage.id} className="relative pl-14">
                    <button onClick={() => toggleStage(stage.id)} aria-expanded={isOpen} aria-controls={`stage-detail-${stage.id}`} aria-label={t(`career.stage_${stage.id}_title`)} className={`absolute left-0 top-0 w-12 h-12 rounded-xl border flex items-center justify-center transition-all duration-300 ${stage.isCurrent ? 'border-brand/60 bg-brand/10 text-brand shadow-[0_0_20px_rgba(var(--color-brand),0.25)]' : stage.isFuture ? 'border-dashed border-line/25 text-muted hover:border-line/45' : 'border-line/15 bg-surface-card text-muted hover:border-cyan/45 hover:text-cyan'} ${isOpen ? 'scale-105' : 'hover:scale-110'}`}><span className="w-5 h-5">{stage.icon}</span>{stage.isCurrent && <span className="absolute -top-1 -right-1 flex h-3 w-3" aria-hidden="true"><span className="animate-ping absolute h-full w-full rounded-full bg-brand opacity-60" /><span className="relative rounded-full h-3 w-3 bg-brand border-2 border-surface-mid" /></span>}</button>
                    <button onClick={() => toggleStage(stage.id)} aria-expanded={isOpen} aria-controls={`stage-detail-${stage.id}`} data-cursor="expand" className="w-full text-left pr-10 group">
                      <span className={`inline-block text-[10px] font-bold uppercase tracking-widest mb-1 ${stage.isCurrent ? 'text-brand' : 'text-muted/70'}`}>{t(stage.statusKey)}</span>
                      <h3 className={`font-bold font-space text-base leading-snug flex items-center gap-2 ${stage.isCurrent ? 'text-primary' : stage.isFuture ? 'text-muted group-hover:text-primary transition-colors' : 'text-primary/85 group-hover:text-primary transition-colors'}`}>{t(`career.stage_${stage.id}_title`)}<svg className={`w-4 h-4 flex-shrink-0 text-muted/50 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'group-hover:translate-y-0.5'}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9" /></svg></h3>
                      <div id={`stage-detail-${stage.id}`} role="region" data-open={isOpen ? 'true' : 'false'} className="cap-expand"><div className="cap-expand-inner"><p className={`text-xs md:text-sm leading-relaxed max-w-lg pt-2 pb-1 ${stage.isFuture ? 'text-muted italic' : 'text-muted'}`}>{t(`career.stage_${stage.id}_desc`)}</p></div></div>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="lg:col-span-2">
            <div ref={sideRef} className="lg:sticky lg:top-24 space-y-5">
              <div className="glass-panel interactive-card focus-frame p-6" data-cursor="expand">
                <p className="relative z-10 text-[10px] font-bold uppercase tracking-widest text-muted/70 mb-5">{t('certifications.eyebrow')} · SAP</p>
                <div className="relative z-10 space-y-2.5">
                  {certifications.map((cert) => {
                    const active = activeCert === cert.id;
                    return (
                      <button key={cert.id} onClick={() => toggleCert(cert.id)} aria-expanded={active} className={`w-full flex items-center gap-3.5 p-2.5 rounded-xl border text-left transition-all duration-300 ${active ? 'border-brand/35 bg-brand/6 shadow-[0_8px_24px_-12px_rgba(var(--color-brand),0.4)] scale-[1.02]' : 'border-transparent hover:bg-line/5 hover:border-line/10'}`}>
                        <span className={`w-11 h-11 rounded-full bg-surface border border-line/10 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${active ? 'scale-110 rotate-6' : 'group-hover:scale-110'}`}><CertBadge color={cert.hex} /></span>
                        <span className="min-w-0 flex-1"><span className="block text-xs font-bold font-space text-primary leading-snug">{t(`certifications.${cert.id}_name`)}</span><span className="block text-[10px] text-muted mt-0.5"><span className="text-cyan">●</span> {t('certifications.certified')} · {t(`certifications.${cert.id}_valid_through`)}</span></span>
                        <svg className={`w-3.5 h-3.5 flex-shrink-0 text-muted transition-transform duration-300 ${active ? 'rotate-90 text-brand' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="glass-panel interactive-card focus-frame p-6" data-cursor="expand">
                <h3 className="relative z-10 text-sm font-bold font-space text-primary uppercase tracking-wider mb-4">{t('career.projection_title')}</h3>
                <div className="relative z-10 space-y-2">
                  {projectionStages.map((key, i) => {
                    const isFirst = i === 0;
                    const isLast = i === projectionStages.length - 1;
                    return (
                      <div key={key}>
                        <div className={`px-4 py-2.5 rounded-xl border text-center ${isFirst ? 'border-brand/40 bg-brand/8' : isLast ? 'border-dashed border-line/15' : 'border-line/10'}`}><span className={`text-xs font-medium font-space ${isFirst ? 'text-gradient font-bold' : isLast ? 'text-muted/60' : 'text-muted'}`}>{t(key)}</span></div>
                        {!isLast && <div className="flex justify-center py-1"><svg className="w-3 h-3 text-muted/30 rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6" /></svg></div>}
                      </div>
                    );
                  })}
                </div>
                <p className="relative z-10 text-[10px] text-muted leading-relaxed mt-4 border-l-2 border-line/15 pl-3">{t('career.projection_note')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareerDirection;
