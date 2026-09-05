import React from 'react';

const principles = [
  { titleKey: 'Business First',          descKey: 'Architecture must serve business goals. Technology choices should solve real problems, not just adopt trends.' },
  { titleKey: 'Integration by Design',   descKey: 'Systems must be designed to connect. Utilizing standard protocols and event-driven patterns from day one.' },
  { titleKey: 'Cloud Native',            descKey: 'Embracing cloud elasticity, managed services, and containerization for resilience and scalability.' },
  { titleKey: 'Security by Design',      descKey: 'Security integrated at every layer, from infrastructure configuration to application code and data modeling.' },
  { titleKey: 'Evolutionary Architecture', descKey: 'Designing systems that can adapt and change over time without requiring complete rewrites.' },
];

const ArchitectureMindset: React.FC = () => {
  return (
    <section className="py-20 md:py-32 bg-surface-mid relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <span className="section-eyebrow animate-fade-up text-center block">PHILOSOPHY</span>
        <h2 className="text-3xl md:text-5xl font-bold font-space text-primary mb-16 text-center animate-fade-up tracking-tight">
          Architecture Mindset
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {principles.map((p, idx) => (
            <div key={idx} className="architecture-node group animate-fade-up" style={{ animationDelay: `${idx * 100}ms` }}>
              <div className="w-10 h-10 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mb-4 text-brand font-bold font-space group-hover:scale-110 group-hover:bg-brand group-hover:text-white transition-all">
                0{idx + 1}
              </div>
              <h3 className="text-lg font-bold text-primary mb-3 font-space">{p.titleKey}</h3>
              <p className="text-sm text-muted leading-relaxed">{p.descKey}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArchitectureMindset;
