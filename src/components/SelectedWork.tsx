import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useScrollReveal from '../hooks/useScrollReveal';

// ── Case definitions ─────────────────────────────────────────────────────────

interface FlowNode {
  id: string;
  labelKey: string;
  color: 'brand' | 'cyan' | 'green' | 'purple';
  patternKey: string;
  reliabilityKeys: string[];
}

const FLOW_NODES: FlowNode[] = [
  {
    id: 'pos',
    labelKey: 'selectedwork.case1_flow1',
    color: 'cyan',
    patternKey: 'selectedwork.flow_pos_pattern',
    reliabilityKeys: ['selectedwork.flow_pos_r1', 'selectedwork.flow_pos_r2'],
  },
  {
    id: 'queue',
    labelKey: 'selectedwork.flow_queue_label',
    color: 'brand',
    patternKey: 'selectedwork.flow_queue_pattern',
    reliabilityKeys: ['selectedwork.flow_queue_r1', 'selectedwork.flow_queue_r2', 'selectedwork.flow_queue_r3'],
  },
  {
    id: 'integration',
    labelKey: 'selectedwork.case1_flow2',
    color: 'brand',
    patternKey: 'selectedwork.flow_integration_pattern',
    reliabilityKeys: ['selectedwork.flow_integration_r1', 'selectedwork.flow_integration_r2'],
  },
  {
    id: 'erp',
    labelKey: 'selectedwork.case1_flow3',
    color: 'cyan',
    patternKey: 'selectedwork.flow_erp_pattern',
    reliabilityKeys: ['selectedwork.flow_erp_r1'],
  },
  {
    id: 'invoicing',
    labelKey: 'selectedwork.case1_flow4',
    color: 'green',
    patternKey: 'selectedwork.flow_invoicing_pattern',
    reliabilityKeys: ['selectedwork.flow_invoicing_r1'],
  },
];

const ARCH_LAYERS = ['layer1', 'layer2', 'layer3', 'layer4'] as const;
const CHALLENGES  = ['eng1', 'eng2', 'eng3'] as const;

interface Case {
  id: string;
  contributions: string[];
  decisions: string[];
  outcomes: string[];
  hasFlow?: boolean;
  hasArchitecture?: boolean;
  hasChallenges?: boolean;
}

const CASES: Case[] = [
  {
    id: 'case1',
    hasFlow: true,
    contributions: ['contrib1','contrib2','contrib3','contrib4','contrib5','contrib6','contrib7','contrib8','contrib9'],
    decisions: ['decision1','decision2','decision3'],
    outcomes: ['outcome1','outcome2','outcome3','outcome4','outcome5','outcome6'],
  },
  {
    id: 'case2',
    contributions: ['contrib1','contrib2','contrib3','contrib4','contrib5'],
    decisions: ['decision1','decision2'],
    outcomes: ['outcome1','outcome2','outcome3'],
  },
  {
    id: 'case3',
    hasArchitecture: true,
    hasChallenges: true,
    contributions: ['contrib1','contrib2','contrib3','contrib4','contrib5'],
    decisions: [],
    outcomes: ['outcome1','outcome2','outcome3'],
  },
  {
    id: 'case4',
    contributions: ['contrib1','contrib2','contrib3','contrib4'],
    decisions: ['decision1','decision2'],
    outcomes: ['outcome1','outcome2','outcome3'],
  },
];

const flowColors = {
  brand:  { border: 'border-brand/40', bg: 'bg-brand/8',  text: 'text-brand',  active: 'border-brand bg-brand/12 shadow-[0_0_16px_rgba(0,112,243,0.25)]' },
  cyan:   { border: 'border-cyan/35',  bg: 'bg-cyan/8',   text: 'text-cyan',   active: 'border-cyan bg-cyan/12 shadow-[0_0_16px_rgba(34,211,238,0.2)]' },
  green:  { border: 'border-green-500/35', bg: 'bg-green-500/8', text: 'text-green-500', active: 'border-green-500 bg-green-500/12 shadow-[0_0_16px_rgba(34,197,94,0.2)]' },
  purple: { border: 'border-purple-400/35', bg: 'bg-purple-400/8', text: 'text-purple-400', active: 'border-purple-400 bg-purple-400/12' },
};

// ── Integration Flow Visualizer ───────────────────────────────────────────────

const IntegrationFlow: React.FC = () => {
  const { t } = useTranslation();
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const active = FLOW_NODES.find(n => n.id === activeNode);

  return (
    <div className="space-y-4">
      {/* Instruction hint */}
      <p className="text-[10px] text-muted/40 text-center uppercase tracking-widest">
        {t('selectedwork.flow_hint')}
      </p>

      {/* Flow nodes — horizontal on md+, vertical on mobile */}
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-0 md:justify-between">
        {FLOW_NODES.map((node, idx) => {
          const c = flowColors[node.color];
          const isActive = activeNode === node.id;
          return (
            <React.Fragment key={node.id}>
              <button
                onClick={() => setActiveNode(isActive ? null : node.id)}
                className={`
                  flow-node flex-shrink-0 w-full md:w-auto md:flex-1 md:mx-1
                  ${c.border} ${c.bg}
                  ${isActive ? c.active : 'hover:opacity-90'}
                `}
                data-cursor="explore"
                aria-pressed={isActive}
              >
                <span className={`flow-node-label ${c.text}`}>
                  {t(node.labelKey)}
                </span>
              </button>

              {/* Arrow between nodes */}
              {idx < FLOW_NODES.length - 1 && (
                <div className="flex md:flex-col items-center justify-center flex-shrink-0" aria-hidden="true">
                  {/* Horizontal arrow on md */}
                  <svg className="w-5 h-5 text-muted/25 hidden md:block" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                  {/* Vertical arrow on mobile */}
                  <svg className="w-4 h-4 text-muted/25 md:hidden" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Node detail panel */}
      <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${active ? 'border-line/20 bg-surface/60' : 'border-transparent'}`}>
        {active ? (
          <div className="p-4 space-y-3 animate-fade-up animate-duration-200">
            <p className="text-xs font-bold text-primary border-l-2 border-brand/40 pl-3 leading-relaxed">
              {t(active.patternKey)}
            </p>
            <div className="flex flex-wrap gap-2">
              {active.reliabilityKeys.map(k => (
                <span key={k} className="px-2.5 py-1 rounded-lg bg-brand/8 border border-brand/15 text-[11px] font-mono text-brand/80">
                  {t(k)}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="py-2" />
        )}
      </div>

      {/* Reliability chain legend */}
      <div className="flex flex-wrap gap-1.5 justify-center pt-1">
        {['selectedwork.chain_async','selectedwork.chain_queue','selectedwork.chain_retry','selectedwork.chain_dlq','selectedwork.chain_idempotency'].map(k => (
          <span key={k} className="px-2 py-0.5 rounded text-[10px] font-mono text-muted/50 border border-line/8">
            {t(k)}
          </span>
        ))}
      </div>
    </div>
  );
};

// ── Architecture Diagram (Deltux) ─────────────────────────────────────────────

const FlowArrow = () => (
  <div className="flex justify-center my-1" aria-hidden="true">
    <div className="flex flex-col items-center gap-0.5">
      <div className="w-px h-4 bg-line/20" />
      <svg className="w-3 h-3 text-line/30" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    </div>
  </div>
);

const ArchitectureDiagram: React.FC = () => {
  const { t } = useTranslation();
  const [activeLayer, setActiveLayer] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      <div className="text-center">
        <span className="text-[11px] font-mono text-muted/50 uppercase tracking-wider">
          {t('selectedwork.case3_arch_users')}
        </span>
        <FlowArrow />
      </div>

      {ARCH_LAYERS.map((layer, idx) => {
        const isActive = activeLayer === layer;
        return (
          <div key={layer}>
            <button
              onClick={() => setActiveLayer(isActive ? null : layer)}
              className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${
                isActive ? 'border-brand/40 bg-brand/5' : 'border-line/10 bg-surface/60 hover:border-line/25'
              }`}
              data-cursor="explore"
              aria-expanded={isActive}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-primary">{t(`selectedwork.case3_arch_${layer}_title`)}</p>
                  <p className="text-[11px] font-mono text-brand/70 mt-0.5">{t(`selectedwork.case3_arch_${layer}_tech`)}</p>
                </div>
                <svg className={`w-4 h-4 text-muted flex-shrink-0 transition-transform ${isActive ? 'rotate-180 text-brand' : ''}`}
                  fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              {isActive && (
                <p className="text-xs text-primary/70 leading-relaxed mt-3 pt-3 border-t border-brand/15 animate-fade-up animate-duration-200">
                  {t(`selectedwork.case3_arch_${layer}_desc`)}
                </p>
              )}
            </button>
            {idx < ARCH_LAYERS.length - 1 && <FlowArrow />}
          </div>
        );
      })}

      <div className="mt-3 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand/20 bg-brand/5 text-xs font-mono text-brand/80">
          <div className="w-1.5 h-1.5 rounded-full bg-brand" />
          {t('selectedwork.case3_arch_platform')}
        </span>
      </div>
      <p className="text-[10px] text-muted/40 text-center">{t('selectedwork.case3_arch_hint')}</p>
    </div>
  );
};

// ── Engineering Challenges Accordion ─────────────────────────────────────────

const ChallengesAccordion: React.FC = () => {
  const { t } = useTranslation();
  const [open, setOpen] = useState<string | null>('eng1');

  return (
    <div className="space-y-3">
      {CHALLENGES.map(ch => {
        const isOpen = open === ch;
        return (
          <div key={ch} className={`rounded-xl border transition-all duration-200 ${isOpen ? 'border-cyan/30' : 'border-line/10'}`}>
            <button
              onClick={() => setOpen(isOpen ? null : ch)}
              className="w-full flex items-center justify-between p-4 text-left"
              aria-expanded={isOpen}
            >
              <span className="text-sm font-bold text-primary">{t(`selectedwork.case3_${ch}_title`)}</span>
              <svg className={`w-4 h-4 text-muted flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-cyan' : ''}`}
                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {isOpen && (
              <div className="px-4 pb-4 space-y-3 animate-fade-up animate-duration-200">
                {[['Decision','cyan',`selectedwork.case3_${ch}_decision`],['Solution','brand',`selectedwork.case3_${ch}_solution`],['Outcome','text-green-500',`selectedwork.case3_${ch}_outcome`]].map(([label, color, key]) => (
                  <div key={label as string}>
                    <p className={`text-[10px] font-bold uppercase tracking-wider mb-1 text-${color}`}>{label}</p>
                    <p className="text-xs text-primary/75 leading-relaxed">{t(key as string)}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

// ── Case content: compact summary → expandable sections ───────────────────────

const CaseContent: React.FC<{ caseData: Case }> = ({ caseData }) => {
  const { t } = useTranslation();
  const { id, contributions, decisions, outcomes, hasArchitecture, hasChallenges, hasFlow } = caseData;
  const [openSection, setOpenSection] = useState<string | null>('context');

  const toggle = (s: string) => setOpenSection(prev => prev === s ? null : s);

  const Section: React.FC<{ id: string; label: string; children: React.ReactNode }> = ({ id, label, children }) => {
    const isOpen = openSection === id;
    return (
      <div className={`rounded-xl border transition-all duration-200 ${isOpen ? 'border-brand/25' : 'border-line/8'}`}>
        <button
          onClick={() => toggle(id)}
          className="w-full flex items-center justify-between px-5 py-3.5 text-left"
          aria-expanded={isOpen}
        >
          <span className={`text-xs font-bold uppercase tracking-widest ${isOpen ? 'text-brand' : 'text-muted/60'}`}>{label}</span>
          <svg className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180 text-brand' : 'text-muted/30'}`}
            fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
        <div className="accordion-content" data-open={isOpen ? 'true' : 'false'}>
          <div className="px-5 pb-5">{children}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-2 animate-fade-up animate-duration-300">
      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {[1,2,3].map(n => (
          <span key={n} className="px-3 py-1 rounded-full border border-line/15 bg-surface/60 text-[11px] font-mono text-muted/70">
            {t(`selectedwork.${id}_tag${n}`)}
          </span>
        ))}
      </div>

      {/* Context + Challenge — always visible summary */}
      <div className="glass-panel p-4 md:p-5 space-y-3 mb-3">
        <p className="text-xs text-muted/70 leading-relaxed border-l-2 border-brand/30 pl-3">
          {t(`selectedwork.${id}_context`)}
        </p>
        <p className="text-xs text-primary/70 leading-relaxed border-l-2 border-cyan/30 pl-3">
          {t(`selectedwork.${id}_challenge`)}
        </p>
      </div>

      {/* Interactive flow (Case 1) */}
      {hasFlow && (
        <Section id="flow" label={t('selectedwork.label_flow')}>
          <IntegrationFlow />
        </Section>
      )}

      {/* Architecture (Case 3) */}
      {hasArchitecture && (
        <Section id="arch" label={t('selectedwork.label_architecture')}>
          <ArchitectureDiagram />
        </Section>
      )}

      {/* Contribution */}
      <Section id="contribution" label={t('selectedwork.label_contribution')}>
        <p className="text-xs text-muted mb-3 border-l-2 border-brand/30 pl-3 leading-relaxed">
          {t(`selectedwork.${id}_contribution_intro`)}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {contributions.map(c => (
            <div key={c} className="architecture-node flex items-start gap-3 p-3">
              <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 mt-1.5" />
              <p className="text-xs text-primary/75 leading-relaxed">{t(`selectedwork.${id}_${c}`)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Engineering challenges (Case 3) */}
      {hasChallenges && (
        <Section id="challenges" label={t('selectedwork.label_engineering')}>
          <ChallengesAccordion />
        </Section>
      )}

      {/* Key decisions */}
      {decisions.length > 0 && (
        <Section id="decisions" label={t('selectedwork.label_decisions')}>
          <div className="space-y-4">
            {decisions.map(d => (
              <div key={d} className="border-l-2 border-brand/30 pl-4">
                <p className="text-sm font-bold text-brand mb-1">{t(`selectedwork.${id}_${d}_title`)}</p>
                <p className="text-xs text-primary/70 leading-relaxed">{t(`selectedwork.${id}_${d}_desc`)}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Outcome */}
      <Section id="outcome" label={t('selectedwork.label_outcome')}>
        <div className="space-y-2.5">
          {outcomes.map((o, i) => (
            <div key={o} className="flex items-start gap-3">
              <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold font-mono bg-green-500/10 text-green-500">
                {i + 1}
              </div>
              <p className="text-xs text-primary/75 leading-relaxed">{t(`selectedwork.${id}_${o}`)}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Tech + confidentiality */}
      <div className="flex flex-col gap-2 pt-1">
        <div className="flex items-start gap-3 glass-panel px-4 py-3">
          <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 mt-1.5" />
          <p className="text-[11px] font-mono text-muted/60 leading-relaxed">{t(`selectedwork.${id}_tech`)}</p>
        </div>
        {(id === 'case1' || id === 'case2') && (
          <div className="flex items-start gap-3 px-4 py-3 rounded-xl border border-line/8 bg-surface/40">
            <svg className="w-3.5 h-3.5 text-muted/40 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
            <p className="text-[10px] text-muted/40 leading-relaxed">{t('selectedwork.confidentiality')}</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

const SelectedWork: React.FC = () => {
  const { t } = useTranslation();
  const [activeCase, setActiveCase] = useState(0);
  const [mobileOpen, setMobileOpen] = useState<number | null>(0);
  const headerRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>({ threshold: 0.05 });

  return (
    <section id="work" className="py-20 md:py-32 bg-surface relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/3 rounded-full blur-[150px] pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan/3 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        {/* Header */}
        <div ref={headerRef} className="mb-10">
          <span className="section-eyebrow">{t('selectedwork.eyebrow')}</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-primary tracking-tight mb-4">
            {t('selectedwork.title')}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl leading-relaxed">
            {t('selectedwork.subtitle')}
          </p>
        </div>

        {/* ── Desktop: sidebar + content ───────────────────── */}
        <div ref={contentRef} className="hidden lg:flex gap-8">
          {/* Case selector */}
          <nav className="w-60 flex-shrink-0 space-y-1.5 pt-1" aria-label="Case studies">
            {CASES.map((c, idx) => (
              <button
                key={c.id}
                onClick={() => setActiveCase(idx)}
                className={`w-full text-left rounded-xl px-4 py-3.5 transition-all duration-200 ${
                  activeCase === idx
                    ? 'bg-brand/10 border border-brand/30'
                    : 'border border-transparent hover:border-line/20 hover:bg-surface-mid'
                }`}
                aria-pressed={activeCase === idx}
              >
                <p className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 ${activeCase === idx ? 'text-brand/70' : 'text-muted/40'}`}>
                  {t(`selectedwork.${c.id}_eyebrow`)}
                </p>
                <p className={`text-sm font-bold font-space leading-snug ${activeCase === idx ? 'text-brand' : 'text-primary'}`}>
                  {t(`selectedwork.${c.id}_title`)}
                </p>
              </button>
            ))}
          </nav>

          {/* Content area */}
          <div className="flex-1 min-w-0">
            <div className="mb-5">
              <p className="text-[11px] font-mono font-bold uppercase tracking-widest text-muted/50 mb-1">
                {t(`selectedwork.${CASES[activeCase].id}_eyebrow`)}
              </p>
              <h3 className="text-2xl md:text-3xl font-bold font-space text-primary tracking-tight">
                {t(`selectedwork.${CASES[activeCase].id}_title`)}
              </h3>
            </div>
            <CaseContent key={activeCase} caseData={CASES[activeCase]} />
          </div>
        </div>

        {/* ── Mobile: accordion ────────────────────────────── */}
        <div className="lg:hidden space-y-3">
          {CASES.map((c, idx) => {
            const isOpen = mobileOpen === idx;
            return (
              <article key={c.id} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? 'border-brand/30' : 'border-line/10'}`}>
                <button
                  onClick={() => setMobileOpen(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left min-h-[64px]"
                  aria-expanded={isOpen}
                  aria-controls={`mobile-case-${idx}`}
                >
                  <div>
                    <p className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted/50 mb-1">
                      {t(`selectedwork.${c.id}_eyebrow`)}
                    </p>
                    <h3 className="text-base font-bold font-space text-primary">
                      {t(`selectedwork.${c.id}_title`)}
                    </h3>
                  </div>
                  <svg className={`w-5 h-5 text-muted flex-shrink-0 ml-4 transition-transform ${isOpen ? 'rotate-180 text-brand' : ''}`}
                    fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                {isOpen && (
                  <div id={`mobile-case-${idx}`} className="px-5 pb-5">
                    <CaseContent key={idx} caseData={c} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
