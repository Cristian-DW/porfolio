import React, { useState, useCallback, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type StageId    = 's1' | 's2' | 's3' | 's4' | 's5' | 's6';
type StageColor = 'brand' | 'cyan';

interface Stage {
  id:       StageId;
  labelKey: string;
  descKey:  string;
  color:    StageColor;
  icon:     React.ReactNode;
}

interface CareerEntry {
  id:         string;
  statusKey:  string;
  titleKey:   string;
  descKey:    string;
  isCurrent?: boolean;
}

// ─── 6 LIFECYCLE STAGES ───────────────────────────────────────────────────────
// All icons: stroke-width 1.7, same viewBox 0 0 24 24 — unified visual weight.
const STAGES: Stage[] = [
  {
    id: 's1', labelKey: 'capabilities.step1_label', descKey: 'capabilities.step1_desc', color: 'brand',
    icon: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>,
  },
  {
    id: 's2', labelKey: 'capabilities.step2_label', descKey: 'capabilities.step2_desc', color: 'cyan',
    icon: <><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></>,
  },
  {
    id: 's3', labelKey: 'capabilities.step3_label', descKey: 'capabilities.step3_desc', color: 'brand',
    icon: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
  },
  {
    id: 's4', labelKey: 'capabilities.step4_label', descKey: 'capabilities.step4_desc', color: 'cyan',
    icon: <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>,
  },
  {
    id: 's5', labelKey: 'capabilities.step5_label', descKey: 'capabilities.step5_desc', color: 'brand',
    icon: <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>,
  },
  {
    id: 's6', labelKey: 'capabilities.step6_label', descKey: 'capabilities.step6_desc', color: 'cyan',
    icon: <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>,
  },
];

// ─── CAREER TIMELINE ──────────────────────────────────────────────────────────
const CAREER: CareerEntry[] = [
  { id: 'software_engineering', statusKey: 'career.status_foundation',    titleKey: 'career.stage_software_engineering_title', descKey: 'career.stage_software_engineering_desc' },
  { id: 'fullstack',            statusKey: 'career.status_experience',     titleKey: 'career.stage_fullstack_title',            descKey: 'career.stage_fullstack_desc' },
  { id: 'cloud_integration',    statusKey: 'career.status_expanding',      titleKey: 'career.stage_cloud_integration_title',    descKey: 'career.stage_cloud_integration_desc' },
  { id: 'sap_btp',              statusKey: 'career.status_specialization', titleKey: 'career.stage_sap_btp_title',              descKey: 'career.stage_sap_btp_desc' },
  { id: 'architecture',         statusKey: 'career.status_current',        titleKey: 'career.stage_architecture_title',         descKey: 'career.stage_architecture_desc', isCurrent: true },
];

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────
const CERTS = [
  { id: 'solution_architect',    hex: '#0060D0' },
  { id: 'integration_developer', hex: '#0891B2' },
  { id: 'btp_administrator',     hex: '#6366F1' },
];

// ─── ICONS ────────────────────────────────────────────────────────────────────
const CAREER_ICONS: Record<string, React.ReactNode> = {
  software_engineering: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>,
  fullstack:            <><rect x="2" y="4" width="20" height="7" rx="1.5"/><rect x="2" y="13" width="20" height="7" rx="1.5"/></>,
  cloud_integration:    <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>,
  sap_btp:              <><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/></>,
  architecture:         <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="3" x2="12" y2="7"/><line x1="12" y1="17" x2="12" y2="21"/><line x1="3" y1="12" x2="7" y2="12"/><line x1="17" y1="12" x2="21" y2="12"/></>,
};

const CertBadge: React.FC<{ hex: string }> = ({ hex }) => (
  <svg viewBox="0 0 36 36" className="w-8 h-8" fill="none">
    <circle cx="18" cy="18" r="16" stroke={hex} strokeWidth="1.5" opacity="0.28"/>
    <circle cx="18" cy="18" r="10" fill={hex} fillOpacity="0.08" stroke={hex} strokeWidth="1.2" opacity="0.5"/>
    <path d="M11 18 L16 23 L25 13" stroke={hex} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const EngineeringCareer: React.FC = () => {
  const { t } = useTranslation();

  const [activeIdx, setActiveIdx] = useState(0);
  const [autoPlay,  setAutoPlay]  = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const headerRef    = useScrollReveal<HTMLDivElement>();
  const lifecycleRef = useScrollReveal<HTMLDivElement>();
  const growthRef    = useScrollReveal<HTMLDivElement>();

  const LAST = STAGES.length - 1;

  // ── Autoplay: infinite loop left→right ───────────────────────────────────
  // Rules:
  //   1. Advances automatically left→right.
  //   2. After the last stage, loops back to stage 1 seamlessly.
  //   3. Manual interaction pauses autoplay (user takes control).
  const stopAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setAutoPlay(false);
  }, []);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveIdx(prev => {
        const next = prev + 1;
        // Loop back to first stage after the last
        if (next > LAST) return 0;
        return next;
      });
    }, 4000);
  }, [LAST]);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;
    if (autoPlay) startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [autoPlay, startAutoplay]);

  // Selecting a stage manually: pause autoplay, jump to stage
  const selectStage = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    stopAutoplay();
    setIsExiting(true);
    setTimeout(() => {
      setActiveIdx(idx);
      setIsExiting(false);
    }, 160);
  }, [activeIdx, stopAutoplay]);

  const active     = STAGES[activeIdx];
  const stageNum   = activeIdx + 1;
  const stageTotal = STAGES.length;
  const isLast     = activeIdx === LAST; // kept for potential UI use

  // ── Bubble class resolver — uses .lc-bubble--* from App.css ───────────────
  const bubbleClass = (idx: number, color: StageColor): string => {
    if (idx === activeIdx)   return `lc-bubble lc-bubble--active-${color}`;
    if (idx < activeIdx)     return `lc-bubble lc-bubble--past-${color}`;
    return 'lc-bubble lc-bubble--inactive';
  };
  const labelClass = (idx: number, color: StageColor): string => {
    if (idx === activeIdx) return `lc-label lc-label--active-${color}`;
    if (idx < activeIdx)   return 'lc-label lc-label--past';
    return 'lc-label lc-label--inactive';
  };

  return (
    <section id="career" className="py-16 md:py-24 bg-surface-mid relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-brand/10 to-transparent" aria-hidden="true"/>
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-brand/3 rounded-full blur-[100px] pointer-events-none" aria-hidden="true"/>
      <div className="absolute bottom-1/4 -left-32 w-72 h-72 bg-cyan/3 rounded-full blur-[90px] pointer-events-none" aria-hidden="true"/>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">

        {/* ── HEADER ─────────────────────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-14">
          <span className="section-eyebrow">{t('career.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space text-primary tracking-tight mb-3">
            {t('howibuild.title')}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl leading-relaxed">
            {t('howibuild.subtitle')}
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            HOW I BUILD — Lifecycle bubble pipeline + single dynamic panel
        ══════════════════════════════════════════════════════════════════════ */}
        <div ref={lifecycleRef} className="mb-16 md:mb-20">

          {/* Row: sub-label + autoplay controls */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand">
              {t('capabilities.label_lifecycle')}
            </span>
            <div className="flex-1 h-px bg-brand/10"/>
            {/* Autoplay pause/play toggle */}
            <button
              onClick={() => autoPlay ? stopAutoplay() : startAutoplay()}
              aria-label={autoPlay ? t('capabilities.label_pause') : t('capabilities.label_play')}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-muted hover:text-primary hover:bg-line/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {autoPlay
                ? <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/></svg>
                : <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              }
              <span className="text-[9px] font-bold uppercase tracking-wider">
                {autoPlay ? t('capabilities.label_pause') : t('capabilities.label_play')}
              </span>
            </button>
          </div>

          {/* ── BUBBLE PIPELINE ──────────────────────────────────────────────── */}
          <div role="tablist" aria-label={t('capabilities.label_lifecycle')}>
            {/* Desktop connector line */}
            <div
              className="hidden md:block absolute h-px"
              style={{
                top: 'calc(2.5rem / 2)',  // center of bubble
                left: '10%', right: '10%',
                background: 'linear-gradient(to right, transparent, rgba(var(--color-brand),0.14) 15%, rgba(var(--color-brand),0.14) 85%, transparent)',
              }}
              aria-hidden="true"
            />
            {/*
              Mobile: 3 columns (2 rows of 3)
              Desktop: 6 columns in a row
            */}
            <div className="grid grid-cols-3 md:flex md:justify-between gap-y-6 md:gap-y-0 relative">
              {STAGES.map((stage, idx) => (
                <button
                  key={stage.id}
                  role="tab"
                  id={`lc-tab-${stage.id}`}
                  aria-selected={idx === activeIdx}
                  aria-controls="lc-panel"
                  onClick={() => selectStage(idx)}
                  className="flex flex-col items-center gap-2 flex-1 py-1 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface-mid"
                >
                  {/* Bubble — uses unified .lc-bubble system from App.css */}
                  <div className={bubbleClass(idx, stage.color)}>
                    {/* Ping ring for active stage */}
                    {idx === activeIdx && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping opacity-[0.15]"
                        style={{ background: stage.color === 'brand' ? 'rgb(var(--color-brand))' : 'rgb(var(--color-cyan))' }}
                        aria-hidden="true"
                      />
                    )}
                    <svg fill="none" stroke="currentColor" strokeWidth="1.7"
                      strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      {stage.icon}
                    </svg>
                  </div>
                  {/* Label — uses unified .lc-label system from App.css */}
                  <span className={labelClass(idx, stage.color)}>
                    {t(stage.labelKey)}
                  </span>
                  {/* Active indicator dot */}
                  {idx === activeIdx && (
                    <span
                      className={`w-1 h-1 rounded-full ${stage.color === 'brand' ? 'bg-brand' : 'bg-cyan'}`}
                      aria-hidden="true"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── CONTENT PANEL ────────────────────────────────────────────────── */}
          <div className="mt-6 relative">
            {/* Progress bar — shown during autoplay */}
            {autoPlay && (
              <div className="absolute -top-1 left-0 right-0 h-0.5 rounded-full overflow-hidden bg-line/8" aria-hidden="true">
                <div
                  key={`prog-${activeIdx}`}
                  className={`h-full ${active.color === 'brand'
                    ? 'bg-gradient-to-r from-brand/60 to-brand/18'
                    : 'bg-gradient-to-r from-cyan/55 to-cyan/15'
                  }`}
                  style={{ animation: 'step-progress 4000ms linear forwards' }}
                />
              </div>
            )}

            <div
              id="lc-panel"
              role="tabpanel"
              aria-labelledby={`lc-tab-${active.id}`}
              className={`
                glass-panel border rounded-2xl overflow-hidden
                transition-all duration-280
                ${active.color === 'brand' ? 'border-brand/12' : 'border-cyan/10'}
                ${isExiting ? 'opacity-0 translate-y-1' : 'opacity-100 translate-y-0'}
              `}
            >
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

                {/* LEFT — Stage identity + description + activities */}
                <div>
                  <div className="flex items-start gap-3 mb-5">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      active.color === 'brand' ? 'bg-brand/10' : 'bg-cyan/10'
                    }`}>
                      <svg
                        className={`w-4 h-4 ${active.color === 'brand' ? 'text-brand' : 'text-cyan'}`}
                        fill="none" stroke="currentColor" strokeWidth="1.7"
                        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                      >
                        {active.icon}
                      </svg>
                    </div>
                    <div>
                      <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-0.5">
                        {t('capabilities.label_stage')} {stageNum} {t('capabilities.label_of')} {stageTotal}
                      </p>
                      <h3 className="text-xl md:text-2xl font-bold font-space text-primary tracking-tight">
                        {t(active.labelKey)}
                      </h3>
                    </div>
                  </div>

                  <p className="text-sm text-muted leading-relaxed mb-5">
                    {t(active.descKey)}
                  </p>

                  {/* Activities — from i18n */}
                  <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-3">
                    {t('capabilities.label_activities')}
                  </p>
                  <ul className="space-y-2">
                    {[1, 2, 3, 4].map(n => {
                      const val = t(`capabilities.${active.id}_activities_${n}`, { defaultValue: '' });
                      if (!val) return null;
                      return (
                        <li key={n} className="flex items-start gap-2.5">
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                              active.color === 'brand' ? 'bg-brand/55' : 'bg-cyan/50'
                            }`}
                            aria-hidden="true"
                          />
                          <span className="text-sm text-primary/78 leading-relaxed">{val}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>

                {/* RIGHT — Outcome + practices + navigation */}
                <div className="md:border-l md:border-line/8 md:pl-8 flex flex-col gap-5">

                  {/* Outcome */}
                  <div className={`p-4 rounded-xl border ${
                    active.color === 'brand' ? 'bg-brand/5 border-brand/10' : 'bg-cyan/4 border-cyan/8'
                  }`}>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-2">
                      {t('capabilities.label_outcome')}
                    </p>
                    <p className="text-sm leading-relaxed font-medium text-primary">
                      {t(`capabilities.${active.id}_outcome`)}
                    </p>
                  </div>

                  {/* Practices */}
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-2.5">
                      {t('capabilities.label_practices')}
                    </p>
                    <p className="text-xs font-mono leading-relaxed text-primary/80">
                      {t(`capabilities.${active.id}_practices`)}
                    </p>
                  </div>

                  {/* Navigation row */}
                  <div className="mt-auto flex items-center gap-2 pt-2">
                    {/* Prev — only shown on non-first stage */}
                    {activeIdx > 0 && (
                      <button
                        onClick={() => selectStage(activeIdx - 1)}
                        aria-label={t('capabilities.label_prev_stage')}
                        className="w-7 h-7 rounded-full border border-line/15 flex items-center justify-center text-muted hover:text-primary hover:border-line/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <polyline points="15 18 9 12 15 6"/>
                        </svg>
                      </button>
                    )}
                    {/* Next */}
                    <button
                      onClick={() => !isLast && selectStage(activeIdx + 1)}
                      disabled={isLast}
                      aria-label={t('capabilities.label_next_stage')}
                      className="w-7 h-7 rounded-full border border-line/15 flex items-center justify-center text-muted hover:text-primary hover:border-line/30 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <polyline points="9 18 15 12 9 6"/>
                      </svg>
                    </button>
                    <span className="text-[9px] text-muted ml-1">{stageNum} / {stageTotal}</span>
                    {isLast && (
                      <span className="ml-auto text-[9px] text-muted/55 italic">
                        {t('capabilities.label_cycle_note')}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── DIVIDER ─────────────────────────────────────────────────────────── */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-line/8"/>
          <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-muted/45">
            {t('career.eyebrow')}
          </span>
          <div className="flex-1 h-px bg-line/8"/>
        </div>

        {/* ══════════════════════════════════════════════════════════════════════
            PROFESSIONAL GROWTH — Career trajectory + Credentials
        ══════════════════════════════════════════════════════════════════════ */}
        <div ref={growthRef} className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-10 lg:gap-14">

          {/* Career Trajectory */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand">
                {t('capabilities.career_trajectory')}
              </span>
              <div className="flex-1 h-px bg-brand/10"/>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-8 max-w-md">
              {t('career.subtitle')}
            </p>

            <div className="relative">
              <div
                className="absolute left-4 top-4 w-px"
                style={{ bottom: '16px', background: 'linear-gradient(to bottom, transparent, rgba(var(--color-brand),0.22) 20%, rgba(var(--color-brand),0.22) 80%, transparent)' }}
                aria-hidden="true"
              />
              <ol className="space-y-6">
                {CAREER.map(entry => (
                  <li key={entry.id} className="relative pl-11">
                    <div className={`
                      absolute left-0 top-0 w-8 h-8 rounded-full border-2 flex items-center justify-center
                      ${entry.isCurrent
                        ? 'border-brand bg-brand/12 shadow-[0_0_12px_rgba(var(--color-brand),0.22)]'
                        : 'border-line/18 bg-surface-card'
                      }
                    `}>
                      {entry.isCurrent && (
                        <span className="absolute inset-0 rounded-full animate-ping opacity-[0.18] bg-brand" aria-hidden="true"/>
                      )}
                      <svg
                        className={`w-3.5 h-3.5 ${entry.isCurrent ? 'text-brand' : 'text-muted/55'}`}
                        fill="none" stroke="currentColor" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"
                      >
                        {CAREER_ICONS[entry.id]}
                      </svg>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className={`text-[9px] font-bold uppercase tracking-widest ${entry.isCurrent ? 'text-brand' : 'text-muted'}`}>
                          {t(entry.statusKey)}
                        </span>
                        {entry.isCurrent && (
                          <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wide bg-brand/10 text-brand border border-brand/15">
                            <span className="w-1 h-1 rounded-full bg-brand animate-pulse" aria-hidden="true"/>
                            Now
                          </span>
                        )}
                      </div>
                      <h3 className={`font-bold font-space text-sm leading-snug mb-1 ${entry.isCurrent ? 'text-primary' : 'text-primary'}`}>
                        {t(entry.titleKey)}
                      </h3>
                      <p className="text-xs text-muted leading-relaxed max-w-sm">
                        {t(entry.descKey)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8 p-4 rounded-xl border border-line/8 bg-surface-card">
              <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-1.5">
                {t('career.projection_title')}
              </p>
              <p className="text-[10px] text-muted leading-relaxed">
                {t('career.projection_note')}
              </p>
            </div>
          </div>

          {/* Credentials */}
          <div className="lg:border-l lg:border-line/8 lg:pl-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan">
                {t('certifications.eyebrow')}
              </span>
              <div className="flex-1 h-px bg-cyan/10"/>
            </div>
            <p className="text-sm text-muted leading-relaxed mb-6">
              {t('certifications.subtitle')}
            </p>

            <div className="space-y-3">
              {CERTS.map(cert => (
                <div
                  key={cert.id}
                  className="flex items-start gap-3 p-4 rounded-xl border border-line/8 bg-surface-card hover:border-line/18 transition-all duration-200"
                >
                  <div className="flex-shrink-0 mt-0.5"><CertBadge hex={cert.hex}/></div>
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold font-space text-primary leading-snug mb-1.5">
                      {t(`certifications.${cert.id}_name`)}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <span className="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wide" style={{ color: cert.hex }}>
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: cert.hex }} aria-hidden="true"/>
                        {t('certifications.certified')}
                      </span>
                      <span className="text-[9px] text-muted/45">·</span>
                      <span className="text-[9px] text-muted">
                        {t('certifications.valid_through')} {t(`certifications.${cert.id}_valid_through`)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 p-3.5 rounded-xl border border-line/8 flex items-start gap-2.5">
              <svg className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-brand/45" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              <p className="text-[10px] text-muted leading-relaxed">
                {t('capabilities.sap_cert_note')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EngineeringCareer;
