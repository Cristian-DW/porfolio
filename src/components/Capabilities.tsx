import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-scroll';
import useScrollReveal from '../hooks/useScrollReveal';

// ─── TYPES ────────────────────────────────────────────────────────────────────
type CapKey    = 'cap1' | 'cap2' | 'cap3' | 'cap4';
type CapColor  = 'brand' | 'cyan';

interface Cap {
  key:        CapKey;
  num:        string;
  color:      CapColor;
  hasWork:    boolean;
  skills:     string[];
  howItems:   number;   // count of capN_howN keys
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CAPS: Cap[] = [
  { key: 'cap1', num: '01', color: 'brand', hasWork: true,  skills: ['TypeScript', 'Node.js', 'APIs', 'PostgreSQL'],                 howItems: 3 },
  { key: 'cap2', num: '02', color: 'cyan',  hasWork: true,  skills: ['SAP Integration Suite', 'REST', 'SOAP', 'Messaging'],          howItems: 3 },
  { key: 'cap3', num: '03', color: 'brand', hasWork: true,  skills: ['SAP BTP', 'CAP', 'Cloud Foundry', 'API Management'],           howItems: 3 },
  { key: 'cap4', num: '04', color: 'cyan',  hasWork: false, skills: ['System Design', 'Integration Patterns', 'Scalability', 'Resilience'], howItems: 2 },
];

const FOUNDATIONS = [
  { label: 'Testing',       icon: 'check'   },
  { label: 'CI/CD',         icon: 'pipe'    },
  { label: 'Observability', icon: 'pulse'   },
  { label: 'Monitoring',    icon: 'monitor' },
  { label: 'Reliability',   icon: 'shield'  },
];

// ─── COLOR TOKENS (CSS-class based, no arbitrary values) ─────────────────────
const C: Record<CapColor, {
  num: string;     // badge: bg + border + text
  card: string;    // card active border
  ring: string;    // active ring
  hover: string;   // hover border
  skill: string;   // skill chip
  dot: string;     // bullet dot
  text: string;    // accent text
  panelBg: string; // modal section bg
  panelBd: string; // modal section border
  chip: string;    // modal chip
  btn: string;     // modal link button
}> = {
  brand: {
    num:     'bg-brand/8 border-brand/20 text-brand',
    card:    'border-brand/28',
    ring:    'shadow-[0_0_0_2px_rgba(var(--color-brand),0.20)]',
    hover:   'hover:border-brand/22 hover:shadow-[0_4px_20px_-8px_rgba(var(--color-brand),0.18)]',
    skill:   'bg-brand/6 border-brand/14 text-brand',
    dot:     'bg-brand/55',
    text:    'text-brand',
    panelBg: 'bg-brand/4',
    panelBd: 'border-brand/12',
    chip:    'bg-brand/8 border-brand/18 text-brand',
    btn:     'border-brand/25 text-brand hover:bg-brand/8',
  },
  cyan: {
    num:     'bg-cyan/8 border-cyan/20 text-cyan',
    card:    'border-cyan/26',
    ring:    'shadow-[0_0_0_2px_rgba(var(--color-cyan),0.18)]',
    hover:   'hover:border-cyan/20 hover:shadow-[0_4px_20px_-8px_rgba(var(--color-cyan),0.16)]',
    skill:   'bg-cyan/6 border-cyan/14 text-cyan',
    dot:     'bg-cyan/50',
    text:    'text-cyan',
    panelBg: 'bg-cyan/4',
    panelBd: 'border-cyan/10',
    chip:    'bg-cyan/6 border-cyan/16 text-cyan',
    btn:     'border-cyan/25 text-cyan hover:bg-cyan/8',
  },
};

// ─── SVG ICONS ────────────────────────────────────────────────────────────────
const CapIcon: React.FC<{ k: CapKey; className?: string }> = ({ k, className = 'w-5 h-5' }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth="1.6"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    {k === 'cap1' && <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></>}
    {k === 'cap2' && <><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></>}
    {k === 'cap3' && <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z"/>}
    {k === 'cap4' && <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><path d="M10 6.5h7.5V14M14 17.5H6.5V10"/></>}
  </svg>
);

const FoundIcon: React.FC<{ icon: string }> = ({ icon }) => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="1.8"
    strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    {icon === 'check'   && <><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></>}
    {icon === 'pipe'    && <><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0018 9h-1.26A8 8 0 103 16.3"/></>}
    {icon === 'pulse'   && <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>}
    {icon === 'monitor' && <><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></>}
    {icon === 'shield'  && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 11.5 11.5 14 15.5 9.5"/></>}
  </svg>
);

// ─── MINI DIAGRAMS ────────────────────────────────────────────────────────────
// Lightweight SVG diagrams — decorative, consistent stroke width, no text
const Diagram: React.FC<{ k: CapKey; color: CapColor }> = ({ k, color }) => {
  const fill   = color === 'brand' ? 'rgba(0,96,208,0.07)' : 'rgba(14,116,144,0.06)';
  const stroke = color === 'brand' ? 'rgba(0,96,208,0.35)' : 'rgba(14,116,144,0.32)';
  const text   = color === 'brand' ? 'rgba(0,96,208,0.55)' : 'rgba(14,116,144,0.50)';
  const m      = "'JetBrains Mono','Courier New',monospace";

  if (k === 'cap1') return (
    <svg viewBox="0 0 220 44" className="w-full h-11" fill="none" aria-hidden="true">
      {[{ x: 2, l: 'CLIENT' }, { x: 60, l: 'API' }, { x: 118, l: 'SERVICE' }].map(b => (
        <g key={b.l}>
          <rect x={b.x} y="8" width="52" height="26" rx="3" fill={fill} stroke={stroke} strokeWidth="1.1"/>
          <text x={b.x+26} y="25" textAnchor="middle" fill={text} fontSize="7" fontFamily={m} fontWeight="600">{b.l}</text>
        </g>
      ))}
      <ellipse cx="200" cy="12" rx="18" ry="4" fill={fill} stroke={stroke} strokeWidth="1.1"/>
      <rect x="182" y="12" width="36" height="18" fill={fill} stroke={stroke} strokeWidth="1.1"/>
      <ellipse cx="200" cy="30" rx="18" ry="4" fill={fill} stroke={stroke} strokeWidth="1.1"/>
      <text x="200" y="23" textAnchor="middle" fill={text} fontSize="7" fontFamily={m} fontWeight="600">DB</text>
      {[54, 112, 170].map(x => (
        <g key={x}>
          <line x1={x} y1="21" x2={x+5} y2="21" stroke={stroke} strokeWidth="1" strokeDasharray="2,1.5"/>
          <polygon points={`${x+5},18.5 ${x+9},21 ${x+5},23.5`} fill={stroke}/>
        </g>
      ))}
    </svg>
  );
  if (k === 'cap2') return (
    <svg viewBox="0 0 220 54" className="w-full h-14" fill="none" aria-hidden="true">
      <rect x="80" y="15" width="60" height="24" rx="4" fill={fill} stroke={stroke} strokeWidth="1.4"/>
      <text x="110" y="30" textAnchor="middle" fill={text} fontSize="7" fontFamily={m} fontWeight="700">INT HUB</text>
      {[{ x: 2, y: 4 }, { x: 2, y: 38 }, { x: 176, y: 4 }, { x: 176, y: 38 }].map((n, i) => (
        <g key={i}>
          <rect x={n.x} y={n.y} width="44" height="16" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1"/>
          <text x={n.x+22} y={n.y+11} textAnchor="middle" fill={text} fontSize="6.5" fontFamily={m}>{i < 2 ? `SRC ${i+1}` : `TGT ${i-1}`}</text>
        </g>
      ))}
      <line x1="46" y1="12" x2="80" y2="23" stroke={stroke} strokeWidth="1" strokeDasharray="3,2"/>
      <line x1="46" y1="46" x2="80" y2="31" stroke={stroke} strokeWidth="1" strokeDasharray="3,2"/>
      <line x1="140" y1="23" x2="176" y2="12" stroke={stroke} strokeWidth="1" strokeDasharray="3,2"/>
      <line x1="140" y1="31" x2="176" y2="46" stroke={stroke} strokeWidth="1" strokeDasharray="3,2"/>
    </svg>
  );
  if (k === 'cap3') return (
    <svg viewBox="0 0 220 50" className="w-full h-12" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="216" height="12" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1"/>
      <text x="110" y="11.5" textAnchor="middle" fill={text} fontSize="6.5" fontFamily={m}>Application</text>
      <rect x="2" y="18" width="216" height="14" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1.4"/>
      <text x="110" y="28" textAnchor="middle" fill={text} fontSize="7.5" fontFamily={m} fontWeight="700">SAP BTP</text>
      <rect x="2" y="36" width="104" height="12" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1"/>
      <text x="54" y="45" textAnchor="middle" fill={text} fontSize="6.5" fontFamily={m}>Services</text>
      <rect x="114" y="36" width="104" height="12" rx="2.5" fill={fill} stroke={stroke} strokeWidth="1"/>
      <text x="166" y="45" textAnchor="middle" fill={text} fontSize="6" fontFamily={m}>Enterprise Systems</text>
      {[14, 196].map(x => (
        <g key={x}><line x1={x} y1="14" x2={x} y2="18" stroke={stroke} strokeWidth="1"/><line x1={x} y1="32" x2={x} y2="36" stroke={stroke} strokeWidth="1"/></g>
      ))}
    </svg>
  );
  return (
    <svg viewBox="0 0 220 46" className="w-full h-12" fill="none" aria-hidden="true">
      {[{ x: 2, l: 'BUSINESS' }, { x: 85, l: 'DESIGN' }, { x: 168, l: 'SYSTEMS' }].map((b, i) => (
        <g key={b.l}>
          <rect x={b.x} y="10" width="52" height="24" rx="3" fill={fill} stroke={stroke} strokeWidth={i === 1 ? 1.4 : 1}/>
          <text x={b.x+26} y="25" textAnchor="middle" fill={text} fontSize="7" fontFamily={m} fontWeight={i === 1 ? 700 : 600}>{b.l}</text>
        </g>
      ))}
      <line x1="54" y1="22" x2="83" y2="22" stroke={stroke} strokeWidth="1" strokeDasharray="2.5,2"/>
      <polygon points="83,19.5 87,22 83,24.5" fill={stroke}/>
      <line x1="137" y1="22" x2="166" y2="22" stroke={stroke} strokeWidth="1" strokeDasharray="2.5,2"/>
      <polygon points="166,19.5 170,22 166,24.5" fill={stroke}/>
    </svg>
  );
};

// ─── MODAL (Portal) ───────────────────────────────────────────────────────────
interface ModalProps {
  cap:     Cap;
  onClose: () => void;
}

const CapModal: React.FC<ModalProps> = ({ cap, onClose }) => {
  const { t } = useTranslation();
  const c = C[cap.color];
  const [exiting, setExiting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Animate out then call onClose
  const close = useCallback(() => {
    setExiting(true);
    setTimeout(onClose, 175);
  }, [onClose]);

  // Body scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.classList.add('modal-open');
    return () => { document.body.classList.remove('modal-open'); document.body.style.overflow = prev; };
  }, []);

  // Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [close]);

  // Auto-focus first focusable element inside modal
  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    focusable[0]?.focus();
  }, []);

  // Focus trap
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const el = dialogRef.current;
    if (!el) return;
    const focusable = Array.from(el.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ));
    if (!focusable.length) return;
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last)  { e.preventDefault(); first.focus(); }
    }
  };

  return createPortal(
    <div
      className={`cap-modal-backdrop${exiting ? ' exiting' : ''} fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6`}
      style={{ background: 'rgba(var(--color-surface),0.72)', backdropFilter: 'blur(12px)' }}
      onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      aria-modal="true"
      role="dialog"
      aria-label={t(`capabilities.${cap.key}_title`)}
    >
      <div
        ref={dialogRef}
        onKeyDown={handleKeyDown}
        className={`
          cap-modal-content${exiting ? ' exiting' : ''}
          relative w-full max-w-xl max-h-[90vh] overflow-y-auto
          rounded-2xl border
          bg-surface-card
          shadow-[0_24px_60px_-16px_rgba(0,0,0,0.22)]
          ${cap.color === 'brand' ? 'border-brand/14' : 'border-cyan/12'}
        `}
        style={{ scrollbarWidth: 'none' }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 px-6 pt-6 pb-4 bg-surface-card border-b border-line/8">
          <div className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 text-xs font-black font-mono border ${c.num}`}>
              {cap.num}
            </span>
            <div>
              <p className="text-[9px] font-bold uppercase tracking-[0.35em] text-muted mb-0.5">
                {t('capabilities.eyebrow')}
              </p>
              <h2 className={`text-base font-bold font-space tracking-tight ${c.text}`}>
                {t(`capabilities.${cap.key}_title`)}
              </h2>
            </div>
          </div>
          <button
            onClick={close}
            aria-label={t('capabilities.label_close_detail')}
            className="flex-shrink-0 w-8 h-8 rounded-full border border-line/15 flex items-center justify-center text-muted hover:text-primary hover:border-line/28 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="px-6 pt-5 pb-6 space-y-5">

          {/* Description */}
          <p className="text-sm text-muted leading-relaxed">
            {t(`capabilities.${cap.key}_desc`)}
          </p>

          {/* Diagram */}
          <div className="px-3 py-4 rounded-xl border border-line/8 bg-line/3">
            <Diagram k={cap.key} color={cap.color}/>
          </div>

          {/* Focus */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-2">
              {t('capabilities.label_focus')}
            </p>
            <p className={`text-sm font-semibold leading-snug ${c.text}`}>
              {t(`capabilities.${cap.key}_focus`)}
            </p>
          </div>

          {/* Key concepts */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-2">
              {t('capabilities.label_key_concepts')}
            </p>
            <p className="text-xs text-primary/75 leading-relaxed">
              {t(`capabilities.${cap.key}_concepts`)}
            </p>
          </div>

          {/* Technologies (skills) */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-2">
              {t('capabilities.label_skills')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {cap.skills.map(s => (
                <span key={s} className={`px-2.5 py-1 rounded-md text-[10px] font-mono font-medium border ${c.skill}`}>{s}</span>
              ))}
            </div>
          </div>

          {/* Problems solved */}
          <div className={`p-4 rounded-xl border ${c.panelBg} ${c.panelBd}`}>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-3">
              {t('capabilities.label_problems')}
            </p>
            <ul className="space-y-2">
              {[1, 2, 3].map(n => {
                const val = t(`capabilities.${cap.key}_problems_${n}`, { defaultValue: '' });
                if (!val) return null;
                return (
                  <li key={n} className="flex items-start gap-2">
                    <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 ${c.dot}`} aria-hidden="true"/>
                    <span className="text-xs text-primary/78 leading-relaxed">{val}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* How I do it */}
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted mb-3">
              {t('capabilities.label_how')}
            </p>
            <ul className="space-y-2.5">
              {Array.from({ length: cap.howItems }, (_, i) => i + 1).map(n => (
                <li key={n} className="flex items-start gap-2.5">
                  <span
                    className={`flex-shrink-0 w-4 h-4 rounded flex items-center justify-center text-[8px] font-bold font-mono ${c.dot}`}
                    style={{ color: '#fff' }}
                  >
                    {n}
                  </span>
                  <p className="text-xs text-primary/75 leading-relaxed">
                    {t(`capabilities.${cap.key}_how${n}`)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Link to work */}
          {cap.hasWork && (
            <div className="pt-1">
              <Link to="work" smooth duration={900} offset={-80}>
                <button
                  onClick={close}
                  className={`w-full py-2.5 rounded-xl border text-xs font-bold uppercase tracking-widest transition-all duration-200 ${c.btn}`}
                >
                  {t('capabilities.label_view_work')} →
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
const Capabilities: React.FC = () => {
  const { t } = useTranslation();
  const [openKey,      setOpenKey]    = useState<CapKey | null>(null);
  const triggerRefs = useRef<Partial<Record<CapKey, HTMLButtonElement>>>({});
  const gridRef     = useScrollReveal<HTMLDivElement>({ staggerChildren: true, staggerDelay: 70 });

  const openModal = useCallback((key: CapKey, btn: HTMLButtonElement) => {
    triggerRefs.current[key] = btn;
    setOpenKey(key);
  }, []);

  const closeModal = useCallback(() => {
    const key = openKey;
    setOpenKey(null);
    // Return focus to the button that opened the modal
    setTimeout(() => { triggerRefs.current[key!]?.focus(); }, 40);
  }, [openKey]);

  const activeCap = openKey ? CAPS.find(c => c.key === openKey)! : null;

  return (
    <section id="capabilities" className="py-16 md:py-24 bg-surface relative overflow-hidden">
      {/* Ambient glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-brand/14 to-transparent" aria-hidden="true"/>
      <div className="absolute top-1/3 -right-40 w-72 h-72 bg-brand/3 rounded-full blur-[100px] pointer-events-none" aria-hidden="true"/>
      <div className="absolute bottom-0 -left-32 w-64 h-64 bg-cyan/3 rounded-full blur-[80px] pointer-events-none" aria-hidden="true"/>

      <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-12 relative z-10">

        {/* Section header */}
        <div className="mb-12">
          <span className="section-eyebrow">{t('capabilities.eyebrow')}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-space text-primary tracking-tight mb-3">
            {t('capabilities.title')}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-xl leading-relaxed">
            {t('capabilities.subtitle')}
          </p>
        </div>

        {/*
          2×2 GRID
          Cards are purely STATIC in height — interaction only opens a Portal modal.
          No child element ever grows/shrinks inside the grid.
        */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          role="list"
          aria-label={t('capabilities.title')}
        >
          {CAPS.map(cap => {
            const c = C[cap.color];
            return (
              <article
                key={cap.key}
                role="listitem"
                className={`
                  glass-panel rounded-2xl border overflow-hidden
                  transition-all duration-250 border-line/8
                  ${c.hover}
                `}
              >
                <div className="p-5 md:p-6 flex flex-col h-full">
                  {/* Number badge + icon */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-black font-mono border ${c.num}`}>
                      {cap.num}
                    </span>
                    <span className={`opacity-45 ${c.text} transition-opacity duration-200 group-hover:opacity-80`}>
                      <CapIcon k={cap.key}/>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className={`text-base font-bold font-space tracking-tight mb-2 ${c.text}`}>
                    {t(`capabilities.${cap.key}_title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted leading-relaxed mb-4">
                    {t(`capabilities.${cap.key}_desc`)}
                  </p>

                  {/* Diagram */}
                  <div className="mb-4 px-2 py-3 rounded-xl bg-line/4 border border-line/6">
                    <Diagram k={cap.key} color={cap.color}/>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {cap.skills.map(s => (
                      <span key={s} className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-medium border ${c.skill}`}>{s}</span>
                    ))}
                  </div>

                  {/*
                    CTA — opens Portal modal, card height NEVER changes.
                    ref callback captures the button for focus restoration.
                  */}
                  <button
                    ref={el => { if (el) triggerRefs.current[cap.key] = el; }}
                    onClick={e => openModal(cap.key, e.currentTarget)}
                    aria-haspopup="dialog"
                    className={`
                      mt-auto w-full flex items-center justify-between
                      py-2 px-3 rounded-xl border
                      text-xs font-semibold text-muted
                      border-line/8 hover:border-line/20 hover:text-primary hover:bg-line/4
                      transition-all duration-200
                      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand
                    `}
                  >
                    <span>{t('capabilities.explore')}</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Engineering Foundations bar — below grid, never inside it */}
        <div className="mt-4 border border-line/8 rounded-2xl p-5 bg-surface-card">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-shrink-0 min-w-[170px]">
              <p className="text-[9px] font-black uppercase tracking-[0.35em] text-muted mb-0.5">
                {t('capabilities.label_foundations')}
              </p>
              <p className="text-[10px] text-muted/65 leading-snug">
                {t('capabilities.label_foundations_desc')}
              </p>
            </div>
            <div className="sm:border-l sm:border-line/10 sm:pl-5 flex flex-wrap gap-2">
              {FOUNDATIONS.map(f => (
                <div key={f.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line/8 bg-line/3">
                  <span className="text-muted"><FoundIcon icon={f.icon}/></span>
                  <span className="text-[10px] font-semibold font-space text-primary">{f.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Portal modal — rendered to document.body, outside grid entirely */}
      {activeCap && <CapModal cap={activeCap} onClose={closeModal}/>}
    </section>
  );
};

export default Capabilities;
