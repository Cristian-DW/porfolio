import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';
import useSpotlight from '../hooks/useSpotlight';

const STEP_COUNT = 7;

interface Axiom { key: string; num: string; color: 'brand' | 'cyan'; }
const axioms: Axiom[] = [
  { key: 'pillar1', num: '01', color: 'brand' },
  { key: 'pillar2', num: '02', color: 'cyan'  },
  { key: 'pillar3', num: '03', color: 'brand' },
  { key: 'pillar4', num: '04', color: 'cyan'  },
];
const focusItems = [1, 2, 3, 4];

const colorMap = {
  brand: {
    icon: 'text-brand', title: 'text-brand', iconBg: 'bg-brand/10',
    tag: 'group-hover:bg-brand/10 group-hover:text-brand group-hover:border-brand/20',
    border: 'hover:border-brand/25',
  },
  cyan: {
    icon: 'text-cyan', title: 'text-cyan', iconBg: 'bg-cyan/10',
    tag: 'group-hover:bg-cyan/10 group-hover:text-cyan group-hover:border-cyan/20',
    border: 'hover:border-cyan/20',
  },
};

const AxiomIcon: React.FC<{ k: string }> = ({ k }) => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    {k === 'pillar1' && (<><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>)}
    {k === 'pillar2' && (<><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>)}
    {k === 'pillar3' && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>}
    {k === 'pillar4' && <polyline points="20 6 9 17 4 12"/>}
  </svg>
);

const HowIBuildSolutions: React.FC = () => {
  const { t } = useTranslation();
  const onSpotlight = useSpotlight();
  const headerRef  = useScrollReveal<HTMLDivElement>({ staggerChildren: false });
  const pipeRef    = useScrollReveal<HTMLDivElement>({ staggerChildren: false });
  const axiomsRef  = useScrollReveal<HTMLDivElement>({ staggerChildren: true, staggerDelay: 100 });

  const [activeStep, setActiveStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!autoPlay || reduced) return;
    timerRef.current = setInterval(() => setActiveStep(p => (p + 1) % STEP_COUNT), 4200);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay]);

  const selectStep = (i: number) => {
    setActiveStep(i);
    setAutoPlay(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const progress = (activeStep / (STEP_COUNT - 1)) * 100;

  return (
    <section id="how" className="py-16 md:py-28 bg-surface-mid relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-brand/15 to-transparent" aria-hidden="true" />
      <div className="absolute bottom-0 -right-32 w-96 h-96 bg-brand/3 rounded-full blur-[120px] pointer-events-none blob-drift" aria-hidden="true" />
      <div className="absolute top-1/3 -left-32 w-80 h-80 bg-cyan/3 rounded-full blur-[100px] pointer-events-none blob-drift-2" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Header ──────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-14">
          <span className="section-eyebrow">{t('howibuild.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-primary tracking-tight mb-3">
            {t('howibuild.title')}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl leading-relaxed">
            {t('howibuild.subtitle')}
          </p>
        </div>

        {/* ── Phase Pipeline ──────────────────────────────────── */}
        <div ref={pipeRef} className="mb-16">

          {/* Step nodes + track */}
          <div className="relative mb-6">
            {/* Track background */}
            <div className="absolute top-5 left-0 right-0 h-px bg-line/10" aria-hidden="true" />
            {/* Progress fill */}
            <div
              className="absolute top-5 left-0 h-px bg-gradient-to-r from-brand via-brand to-cyan transition-[width] duration-700 ease-out"
              style={{ width: `${progress}%` }}
              aria-hidden="true"
            />
            {/* Steps row */}
            <div
              className="relative flex items-start justify-between hide-scrollbar overflow-x-auto pb-3"
              role="tablist"
              aria-label={t('howibuild.title')}
            >
              {Array.from({ length: STEP_COUNT }, (_, i) => {
                const active = activeStep === i;
                const past   = i < activeStep;
                return (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectStep(i)}
                    data-cursor="expand"
                    className="group flex flex-col items-center gap-2.5 flex-shrink-0 focus-visible:outline-none"
                  >
                    {/* Circle node */}
                    <div className={`
                      relative w-10 h-10 rounded-full border-2 flex items-center justify-center
                      font-mono font-bold text-[11px] transition-all duration-500
                      ${active
                        ? 'border-brand bg-brand text-white shadow-[0_0_22px_rgba(var(--color-brand),0.55)] scale-110'
                        : past
                          ? 'border-brand/50 bg-brand/8 text-brand'
                          : 'border-line/20 bg-surface-card text-muted/50 group-hover:border-brand/35 group-hover:text-muted'
                      }
                    `}>
                      {String(i + 1).padStart(2, '0')}
                      {active && (
                        <span className="absolute inset-0 rounded-full border-2 border-brand/30 animate-ping" aria-hidden="true" />
                      )}
                    </div>
                    {/* Label */}
                    <span className={`
                      text-[9px] sm:text-[10px] font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-300
                      ${active ? 'text-brand' : 'text-muted/40 group-hover:text-muted/70'}
                    `}>
                      {t(`howibuild.step${i + 1}_label`)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Detail panel */}
          <div
            key={activeStep}
            className="glass-panel border border-line/8 p-5 md:p-7 animate-fade-up animate-duration-300"
            role="tabpanel"
          >
            <div className="flex items-start gap-4 md:gap-5">
              {/* Step badge */}
              <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-brand/10 flex items-center justify-center">
                <span className="font-mono font-black text-brand text-[11px]">
                  {String(activeStep + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-brand uppercase tracking-widest mb-2">
                  {t(`howibuild.step${activeStep + 1}_label`)}
                </p>
                <p className="text-sm md:text-[15px] leading-relaxed text-primary/85 max-w-3xl">
                  {t(`howibuild.step${activeStep + 1}_desc`)}
                </p>
              </div>
            </div>

            {/* Auto-play progress bar */}
            {autoPlay && (
              <div className="mt-5 h-0.5 bg-line/8 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-brand/60 to-cyan/60 rounded-full"
                  key={`bar-${activeStep}`}
                  style={{ animation: 'step-progress 4.2s linear forwards' }}
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Engineering Axioms ──────────────────────────────── */}
        <div className="mb-5 flex items-center gap-3">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-muted/40">
            Engineering Principles
          </span>
          <div className="flex-1 h-px bg-line/8" />
        </div>

        <div ref={axiomsRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {axioms.map((axiom) => {
            const c = colorMap[axiom.color];
            return (
              <div
                key={axiom.key}
                onMouseMove={onSpotlight}
                className={`
                  glass-panel spotlight-card group relative overflow-hidden
                  flex flex-col p-6 border border-line/8 transition-all duration-300
                  ${c.border}
                  hover:shadow-[0_18px_48px_-16px_rgba(var(--color-brand),0.18)]
                  hover:-translate-y-1
                `}
              >
                {/* Watermark number */}
                <span
                  className="absolute bottom-2 right-4 font-mono font-black leading-none select-none pointer-events-none text-primary/[0.035]"
                  style={{ fontSize: '6rem' }}
                  aria-hidden="true"
                >
                  {axiom.num}
                </span>

                {/* Icon in box */}
                <div className={`relative z-10 w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                  <span className={c.icon}>
                    <AxiomIcon k={axiom.key} />
                  </span>
                </div>

                {/* Title + subtitle */}
                <div className="relative z-10 flex-1">
                  <h3 className={`text-lg font-bold font-space tracking-tight mb-0.5 ${c.title}`}>
                    {t(`howibuild.${axiom.key}_title`)}
                  </h3>
                  <p className="text-xs text-muted/70 mb-3">
                    {t(`howibuild.${axiom.key}_subtitle`)}
                  </p>
                  <p className="text-sm text-primary/70 leading-relaxed mb-5">
                    {t(`howibuild.${axiom.key}_desc`)}
                  </p>
                </div>

                {/* Focus tags — stagger reveal on hover */}
                <div className="relative z-10 flex flex-wrap gap-1.5 tag-stagger">
                  {focusItems.map(n => (
                    <span
                      key={n}
                      className={`
                        px-2.5 py-1 rounded-lg text-[11px] font-medium
                        text-muted/60 bg-line/4 border border-transparent
                        transition-all duration-300 ${c.tag}
                      `}
                    >
                      {t(`howibuild.${axiom.key}_focus${n}`)}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowIBuildSolutions;
