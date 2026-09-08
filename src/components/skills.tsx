import React from 'react';
import { useTranslation } from 'react-i18next';

import ReactIcon from "../assets/react.svg";
import NextIcon from "../assets/nextjs.svg";
import TSIcon from "../assets/typescript.svg";
import JSIcon from "../assets/js.svg";
import NodeIcon from "../assets/nodejs.svg";
import DockerIcon from "../assets/docker.svg";
import PostgresIcon from "../assets/postgresql.svg";
import GitIcon from "../assets/git.svg";
import GithubActionsIcon from "../assets/github-actions.svg";
import SAPIcon from "../assets/sap.svg";

interface SkillItem { name: string; icon?: string; }

interface SkillGroup {
  titleKey: string;
  accentColor: 'brand' | 'cyan' | 'muted';
  skills: SkillItem[];
}

const skillGroups: SkillGroup[] = [
  {
    titleKey: 'skills.groups.software', accentColor: 'brand',
    skills: [
      { name: 'TypeScript', icon: TSIcon }, { name: 'JavaScript', icon: JSIcon },
      { name: 'Node.js', icon: NodeIcon }, { name: 'React', icon: ReactIcon },
      { name: 'Next.js', icon: NextIcon }, { name: 'REST APIs' },
      { name: 'Backend Development' }, { name: 'Full-Stack Development' },
      { name: 'System Design' },
    ],
  },
  {
    titleKey: 'skills.groups.cloud', accentColor: 'cyan',
    skills: [
      { name: 'Cloud Computing' }, { name: 'SAP BTP', icon: SAPIcon },
      { name: 'Cloud Foundry', icon: SAPIcon }, { name: 'Cloud-native Dev' },
      { name: 'Containerization', icon: DockerIcon }, { name: 'MTA', icon: SAPIcon },
      { name: 'Cloud Deployment' },
    ],
  },
  {
    titleKey: 'skills.groups.integration', accentColor: 'brand',
    skills: [
      { name: 'SAP Integration Suite', icon: SAPIcon }, { name: 'Cloud Integration', icon: SAPIcon },
      { name: 'SAP PI/PO', icon: SAPIcon }, { name: 'REST' }, { name: 'SOAP' },
      { name: 'Message Queues' }, { name: 'Async Messaging' },
      { name: 'Integration Patterns' }, { name: 'Splitter/Aggregator' },
      { name: 'Dead Letter Queue' }, { name: 'API Management', icon: SAPIcon },
      { name: 'Error Handling' }, { name: 'Idempotency' },
    ],
  },
  {
    titleKey: 'skills.groups.enterprise', accentColor: 'cyan',
    skills: [
      { name: 'SAP S/4HANA', icon: SAPIcon }, { name: 'ERP Implementation' },
      { name: 'ERP Support' }, { name: 'ERP Integration' },
      { name: 'Business Process Understanding' }, { name: 'Enterprise Applications' },
      { name: 'Legacy System Integration' },
    ],
  },
  {
    titleKey: 'skills.groups.architecture', accentColor: 'brand',
    skills: [
      { name: 'Solution Architecture' }, { name: 'Integration Architecture' },
      { name: 'Software Architecture' }, { name: 'Microservices' },
      { name: 'Distributed Systems' }, { name: 'Cloud Architecture' },
      { name: 'Security Architecture' }, { name: 'Architectural Trade-offs' },
    ],
  },
  {
    titleKey: 'skills.groups.automation', accentColor: 'muted',
    skills: [
      { name: 'SAP Build', icon: SAPIcon }, { name: 'SAP Build Work Zone', icon: SAPIcon },
      { name: 'Workflow Automation' }, { name: 'Process Bots' },
      { name: 'Enterprise Automation' }, { name: 'Process Improvement' },
    ],
  },
  {
    titleKey: 'skills.groups.quality', accentColor: 'muted',
    skills: [
      { name: 'Functional Testing' }, { name: 'Integration Testing' },
      { name: 'API Testing' }, { name: 'Regression Testing' },
      { name: 'Test Scenarios' }, { name: 'Validation' },
      { name: 'Quality Assurance' },
    ],
  },
  {
    titleKey: 'skills.groups.operations', accentColor: 'muted',
    skills: [
      { name: 'Git', icon: GitIcon }, { name: 'GitHub Actions', icon: GithubActionsIcon },
      { name: 'CI/CD' }, { name: 'Docker', icon: DockerIcon },
      { name: 'Environment Config' }, { name: 'Monitoring' },
      { name: 'Troubleshooting' }, { name: 'PostgreSQL', icon: PostgresIcon },
    ],
  },
];

const accentTextMap = { brand: 'text-brand', cyan: 'text-cyan', muted: 'text-muted' };
const accentBorderMap = { brand: 'border-brand/30', cyan: 'border-cyan/25', muted: 'border-line/10' };

const Skills: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section id="skill" className="py-20 md:py-32 bg-surface relative overflow-hidden">
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-brand/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <span className="section-eyebrow animate-fade-up">CAPABILITIES</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-primary mb-4 animate-fade-up tracking-tight">
            {t('skills.title')}
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto animate-fade-up">
            {t('skills.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, groupIdx) => (
            <div
              key={groupIdx}
              className="glass-panel p-6 md:p-7 group hover:border-brand/30 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${groupIdx * 80}ms` }}
            >
              <div className="flex items-center mb-4">
                <h3 className={`text-base md:text-lg font-bold font-space tracking-tight ${accentTextMap[group.accentColor]}`}>
                  {t(group.titleKey)}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, idx) => (
                  <div
                    key={idx}
                    className={`flex items-center gap-1.5 bg-surface border px-2.5 py-1.5 rounded-lg hover:border-brand/50 transition-colors ${accentBorderMap[group.accentColor]}`}
                  >
                    {skill.icon && (
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity flex-shrink-0"
                      />
                    )}
                    <span className="text-xs text-muted group-hover:text-primary transition-colors whitespace-nowrap">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
