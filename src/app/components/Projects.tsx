import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Calendar, CheckCircle2, GitBranch, Sparkles, TrendingUp, Users, Zap } from 'lucide-react';

interface TechLayer {
  label: string;
  techs: string[];
  color: 'cyan' | 'amber' | 'green';
}

interface ProjectDetails {
  challenges: string[];
  team: string;
  impact: string[];
  techDecisions: string;
}

interface Metric {
  value: string;
  label: string;
}

interface Project {
  name: string;
  role: string;
  period: string;
  scope: string;
  description: string;
  metrics: Metric[];
  achievements: string[];
  details: ProjectDetails;
  layers: TechLayer[];
  aiAssisted?: boolean;
  diagramType: 'enterprise' | 'lms' | 'finance' | 'realtime' | 'booking';
}

const projects: Project[] = [
  {
    name: 'Various Enterprise Projects',
    role: 'Technical Architect',
    period: '2023 – Present',
    scope: 'Led 20+ engineers · multiple concurrent clients',
    description: 'Architecting and shipping AI-assisted frontends across multiple enterprise clients — different stacks, different domains, one shared standard for scalability, DX, and delivery velocity.',
    metrics: [
      { value: '20+', label: 'engineers led' },
      { value: 'Multi', label: 'concurrent clients' },
      { value: 'AI-first', label: 'code · review · refactor' },
    ],
    achievements: [
      'Architected per-client frontend solutions across Angular and React',
      'Implemented AI-powered features for enhanced UX',
      'Led team of 20+ designers and developers',
      'Accelerated delivery using Claude, GitHub Copilot & Codex for code generation, review and refactoring'
    ],
    details: {
      challenges: [
        'Parallel delivery across clients with divergent tech stacks, timelines, and domain constraints',
        'Introducing AI tooling into established team workflows without disrupting existing velocity'
      ],
      team: '20+ designers and developers across multiple concurrent client engagements',
      impact: [
        'AI-assisted PR review and code generation cut iteration cycles across all active projects',
        'Shared architectural patterns reduced onboarding time for new team members across clients'
      ],
      techDecisions: 'Angular and React selected per client legacy and team familiarity. Claude, Copilot, and Codex introduced incrementally — starting with code generation, expanding to review, refactoring, and documentation.'
    },
    layers: [
      { label: 'UI', techs: ['Angular', 'React', 'TypeScript'], color: 'cyan' },
      { label: 'AI', techs: ['Claude', 'Copilot', 'Codex'], color: 'amber' },
      { label: 'Cloud', techs: ['Azure', 'AI/GenAI'], color: 'green' },
    ],
    aiAssisted: true,
    diagramType: 'enterprise'
  },
  {
    name: 'Trainup',
    role: 'Technical Architect',
    period: '2021 – 2023',
    scope: 'Sole architect across all sub-projects',
    description: 'Multi-project LMS suite — every client gets their own isolated Angular codebase and hosting, but all share a common component library. Reusability without sacrificing isolation, independence, or per-client release cadence.',
    metrics: [
      { value: '99.9%', label: 'uptime' },
      { value: 'Weeks → Days', label: 'client onboarding' },
      { value: 'Sub-sec', label: 'load times' },
    ],
    achievements: [
      'Per-client isolated codebase and hosting with shared component base',
      'Built reusable Angular component library across all sub-projects',
      'Achieved 99.9% uptime and sub-second load times'
    ],
    details: {
      challenges: [
        'Keeping N isolated client codebases in sync with shared library updates without forced upgrades',
        'Preventing per-client customizations from leaking back into and polluting the shared base'
      ],
      team: 'Sole architect across all Trainup sub-projects; small dedicated dev teams per client',
      impact: [
        'Shared component library cut new-client onboarding setup from weeks to days',
        'Independent release cadence per client eliminated cross-client deployment risk'
      ],
      techDecisions: "Angular's NgModule system provided a clean shared-library boundary with strict encapsulation. Per-client hosting chosen for data isolation and to allow each client's independent release schedule."
    },
    layers: [
      { label: 'Shared', techs: ['Angular Library'], color: 'cyan' },
      { label: 'Per-client', techs: ['Angular', 'MVC API', 'SQL'], color: 'amber' },
      { label: 'Deploy', techs: ['Own hosting', 'Own codebase'], color: 'green' },
    ],
    diagramType: 'lms'
  },
  {
    name: 'IMS — Investment Management',
    role: 'Technical Lead',
    period: '2017 – 2023',
    scope: 'Tech lead · financial advisors + compliance as stakeholders',
    description: 'Investment portfolio system for financial advisors. Executed a multi-year strangler-fig migration from AngularJS to Angular in production — zero downtime, no regressions — while shipping an Excel-grade custom report builder.',
    metrics: [
      { value: '0', label: 'downtime · 0 regressions' },
      { value: 'Multi-year', label: 'AngularJS → Angular' },
      { value: 'Hours/wk', label: 'saved per advisor' },
    ],
    achievements: [
      'Strangler-fig migration: AngularJS and Angular ran side-by-side',
      'Built own Angular component library + DevExtreme integration',
      'Excel-like custom tabular report builder with identity provider auth'
    ],
    details: {
      challenges: [
        'Running AngularJS and Angular simultaneously in one shell without route conflicts or style leakage',
        'Building an Excel-like report builder from scratch — row/column formulas, sorting, filtering, and export'
      ],
      team: 'Technical lead; financial advisors and compliance teams as primary stakeholders and end users',
      impact: [
        'Full framework migration completed with zero production downtime and no regression incidents',
        'Custom report builder eliminated manual Excel exports, saving hours per week per advisor'
      ],
      techDecisions: 'Strangler-fig chosen over big-bang rewrite to reduce delivery risk. DevExtreme adopted for its mature grid and pivot-table components. Custom Angular library enforced consistency across the hybrid codebase during the multi-year transition.'
    },
    layers: [
      { label: 'Framework', techs: ['AngularJS → Angular'], color: 'cyan' },
      { label: 'Library', techs: ['Angular Lib', 'DevExtreme'], color: 'amber' },
      { label: 'Backend', techs: ['MVC API', 'IDP', 'SQL'], color: 'green' },
    ],
    diagramType: 'finance'
  },
  {
    name: 'Command Center 2.0',
    role: 'Senior Developer',
    period: '2015 – 2017',
    scope: 'Dispatch operators + drivers as end users',
    description: 'Logistics SPA for dispatch operators and drivers — real-time truck tracking, TL booking, and operator activity management in a single Aurelia interface, engineered for poor cellular connectivity and low-spec field devices.',
    metrics: [
      { value: 'Real-time', label: 'fleet visibility' },
      { value: 'Low-spec', label: 'field-device ready' },
      { value: 'Aurelia', label: 'performance-first' },
    ],
    achievements: [
      'Real-time truck tracking and operator activities via SignalR',
      'TL-only booking flow — simplified for logistics operators',
      'Optimized rendering for low-bandwidth field conditions'
    ],
    details: {
      challenges: [
        'Maintaining reliable real-time truck tracking over SignalR under poor cellular connectivity in the field',
        'Designing a dense operator dashboard usable by non-technical dispatch staff under time pressure'
      ],
      team: 'Developer on a logistics platform; truck operators and dispatch staff as primary end users',
      impact: [
        'Real-time fleet visibility reduced manual coordination calls between dispatch and drivers',
        'Performance-optimized bundle enabled smooth operation on low-spec field devices'
      ],
      techDecisions: 'Aurelia selected for its performance-first design and clean component lifecycle. SignalR used for duplex real-time communication with WebSocket fallback. TL-only scope was a deliberate product decision to keep the booking flow fast and focused.'
    },
    layers: [
      { label: 'SPA', techs: ['Aurelia'], color: 'cyan' },
      { label: 'Realtime', techs: ['SignalR', 'WebSockets'], color: 'amber' },
      { label: 'Backend', techs: ['ASP.Net MVC', 'SQL DB'], color: 'green' },
    ],
    diagramType: 'realtime'
  },
  {
    name: 'CarrierRate 2.0',
    role: 'Software Engineer',
    period: '2013 – 2015',
    scope: 'Shippers + freight brokers as end users',
    description: 'Full-featured freight booking SPA — LTL/TL quoting, shipment tracking, addresses, reports and real-time chat, all in one Durandal single-page app that replaced three separate legacy tools.',
    metrics: [
      { value: '40% ↓', label: 'booking time' },
      { value: '3 → 1', label: 'tools consolidated' },
      { value: 'Real-time', label: 'chat + booking flow' },
    ],
    achievements: [
      'Built from scratch: LTL/TL quoting, tracking, reports, address book',
      'Dynamic pricing engine UI built with Knockout.js',
      'Achieved 40% reduction in booking time'
    ],
    details: {
      challenges: [
        'Surfacing complex LTL/TL pricing logic — carrier rules, accessorials, and zone tables — as a responsive interactive UI',
        'Embedding real-time chat (SignalR) inside a multi-step booking flow without disrupting form state'
      ],
      team: 'Software engineer; shipping companies and freight brokers as end users',
      impact: [
        '40% reduction in booking time compared to the previous workflow',
        'Unified quoting, tracking, and chat in one SPA replaced three separate tools shippers previously toggled between'
      ],
      techDecisions: 'Durandal chosen in 2013 as a mature module-based SPA framework before Angular or React were viable options. Knockout.js provided reactive data binding for the dynamic pricing forms. SignalR chat was layered on as a persistent panel without affecting routing or form state.'
    },
    layers: [
      { label: 'SPA', techs: ['Durandal', 'Knockout.js', 'jQuery'], color: 'cyan' },
      { label: 'Backend', techs: ['ASP.Net MVC', 'SignalR · Chat'], color: 'amber' },
      { label: 'Data', techs: ['SQL DB'], color: 'green' },
    ],
    diagramType: 'booking'
  }
];

const layerColors = {
  cyan: { bg: 'rgba(0,200,255,0.1)', color: 'var(--accent-cyan)' },
  amber: { bg: 'rgba(240,136,62,0.12)', color: 'var(--accent-amber)' },
  green: { bg: 'rgba(63,185,80,0.1)', color: 'var(--success-green)' },
};

export function Projects() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 px-6"
      style={{ background: 'var(--bg-deep)' }}
    >
      <div className="resume-container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          className="fluid-section-h2 font-bold mb-12 tracking-wide"
        >
          <span style={{ color: 'var(--accent-amber)' }}>05.</span> KEY PROJECTS
        </motion.h2>

        <div className="flex flex-col gap-6 xl:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} inView={inView} featured={i === 0} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueprintDiagram({ type }: { type: Project['diagramType']; featured?: boolean }) {
  const C = 'var(--accent-cyan)';
  const A = 'var(--accent-amber)';
  const G = 'var(--success-green)';
  const mono = 'var(--font-mono)';
  const uid = type;

  // Shared legend — color key at bottom of every diagram
  const legend = (
    <>
      <line x1="8" y1="114" x2="282" y2="114" stroke="var(--bg-border)" strokeWidth="0.5" opacity="0.3" />
      <circle cx="11" cy="122" r="2.5" fill={C} opacity="0.5" />
      <text x="17" y="126" fill={C} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Frontend</text>
      <circle cx="74" cy="122" r="2.5" fill={A} opacity="0.5" />
      <text x="80" y="126" fill={A} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">API / Realtime</text>
      <circle cx="158" cy="122" r="2.5" fill={G} opacity="0.5" />
      <text x="164" y="126" fill={G} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Data / Storage</text>
    </>
  );

  const diagrams: Record<Project['diagramType'], React.ReactNode> = {

    enterprise: (
      <>
        <text x="10" y="16" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.6">CLIENT PORTFOLIO · MIXED ARCHITECTURE</text>

        {/* Client A — darkest tint, center y=42 */}
        <rect x="8" y="30" width="44" height="24" rx="3" fill="rgba(0,200,255,0.08)" stroke={C} strokeWidth="1" strokeDasharray="4,3" />
        <text x="30" y="46" textAnchor="middle" fill={C} fontSize="9" style={{ fontFamily: mono }}>Client A</text>
        {/* Client B — center y=90 */}
        <rect x="8" y="78" width="44" height="24" rx="3" fill="rgba(0,200,255,0.05)" stroke={C} strokeWidth="1" strokeDasharray="4,3" />
        <text x="30" y="94" textAnchor="middle" fill={C} fontSize="9" style={{ fontFamily: mono }}>Client B</text>
        {/* Client C — lightest tint, center y=138 */}
        <rect x="8" y="126" width="44" height="24" rx="3" fill="rgba(0,200,255,0.02)" stroke={C} strokeWidth="1" strokeDasharray="4,3" />
        <text x="30" y="142" textAnchor="middle" fill={C} fontSize="9" style={{ fontFamily: mono }}>Client C</text>

        {/* Converging arrows → Angular center-left (68,90) */}
        <line x1="52" y1="42" x2="68" y2="90" stroke={C} strokeWidth="0.8" markerEnd={`url(#arr-${uid})`} />
        <line x1="52" y1="90" x2="68" y2="90" stroke={C} strokeWidth="0.8" markerEnd={`url(#arr-${uid})`} />
        <line x1="52" y1="138" x2="68" y2="90" stroke={C} strokeWidth="0.8" markerEnd={`url(#arr-${uid})`} />

        {/* Angular / React — center y=90 */}
        <rect x="64" y="46" width="80" height="88" rx="4" fill="rgba(0,200,255,0.05)" stroke={C} strokeWidth="1.2" strokeDasharray="4,3" />
        <text x="104" y="84" textAnchor="middle" fill={C} fontSize="9" style={{ fontFamily: mono }}>Angular / React</text>
        <text x="104" y="99" textAnchor="middle" fill={C} fontSize="7" style={{ fontFamily: mono }} opacity="0.6">TS · SCSS</text>
        <line x1="144" y1="90" x2="154" y2="90" stroke={A} strokeWidth="0.8" markerEnd={`url(#arr-a-${uid})`} />

        {/* AI Pipeline — center y=90 */}
        <rect x="154" y="46" width="68" height="88" rx="4" fill="rgba(240,136,62,0.05)" stroke={A} strokeWidth="1.2" strokeDasharray="4,3" />
        <text x="188" y="78" textAnchor="middle" fill={A} fontSize="9" style={{ fontFamily: mono }}>AI Pipeline</text>
        <text x="188" y="94" textAnchor="middle" fill={A} fontSize="7" style={{ fontFamily: mono }} opacity="0.65">Claude · Copilot</text>
        <text x="188" y="106" textAnchor="middle" fill={A} fontSize="7" style={{ fontFamily: mono }} opacity="0.65">· Codex</text>
        <line x1="222" y1="90" x2="236" y2="90" stroke={G} strokeWidth="0.8" markerEnd={`url(#arr-g-${uid})`} />

        {/* Azure Cloud — center y=90 */}
        <rect x="236" y="76" width="46" height="28" rx="4" fill="rgba(63,185,80,0.05)" stroke={G} strokeWidth="1.2" strokeDasharray="4,3" />
        <text x="259" y="87" textAnchor="middle" fill={G} fontSize="9" style={{ fontFamily: mono }}>Azure</text>
        <text x="259" y="99" textAnchor="middle" fill={G} fontSize="9" style={{ fontFamily: mono }}>Cloud</text>

        {/* Legend shifted for 185px viewBox */}
        <line x1="8" y1="162" x2="282" y2="162" stroke="var(--bg-border)" strokeWidth="0.5" opacity="0.3" />
        <circle cx="11" cy="170" r="2.5" fill={C} opacity="0.5" />
        <text x="17" y="174" fill={C} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Frontend</text>
        <circle cx="74" cy="170" r="2.5" fill={A} opacity="0.5" />
        <text x="80" y="174" fill={A} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">API / Realtime</text>
        <circle cx="158" cy="170" r="2.5" fill={G} opacity="0.5" />
        <text x="164" y="174" fill={G} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Data / Storage</text>
      </>
    ),

    lms: (
      <>
        <text x="10" y="16" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.6">TRAINUP · REUSABLE COMPONENT ARCHITECTURE</text>

        {/* Shared Component Library bar */}
        <rect x="8" y="24" width="208" height="24" rx="3" fill="rgba(0,200,255,0.06)" stroke={C} strokeWidth="1.2" strokeDasharray="4,3" />
        <text x="112" y="40" textAnchor="middle" fill={C} fontSize="9.5" style={{ fontFamily: mono }}>Shared Component Library · Angular</text>

        {/* "+ n clients" hint box */}
        <rect x="222" y="24" width="60" height="24" rx="3" fill="none" stroke={C} strokeWidth="0.7" strokeDasharray="3,2" opacity="0.5" />
        <text x="252" y="40" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.55">+ n clients</text>

        {/* Vertical branch arrows */}
        <line x1="72" y1="48" x2="72" y2="62" stroke={C} strokeWidth="0.8" markerEnd={`url(#arr-${uid})`} />
        <line x1="208" y1="48" x2="208" y2="62" stroke={C} strokeWidth="0.8" markerEnd={`url(#arr-${uid})`} />

        {/* Client A */}
        <rect x="8" y="62" width="128" height="76" rx="3" fill="rgba(0,200,255,0.03)" stroke={C} strokeWidth="1" strokeDasharray="4,3" />
        <text x="72" y="80" textAnchor="middle" fill={C} fontSize="10" style={{ fontFamily: mono }}>Client A</text>
        <text x="72" y="95" textAnchor="middle" fill={C} fontSize="7.5" style={{ fontFamily: mono }} opacity="0.6">Angular · own codebase</text>
        <text x="72" y="108" textAnchor="middle" fill={A} fontSize="7.5" style={{ fontFamily: mono }} opacity="0.6">MVC API · SQL DB</text>
        <text x="72" y="122" textAnchor="middle" fill={G} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">★ own hosting + deploy</text>

        {/* Client B */}
        <rect x="144" y="62" width="128" height="76" rx="3" fill="rgba(0,200,255,0.03)" stroke={C} strokeWidth="1" strokeDasharray="4,3" />
        <text x="208" y="80" textAnchor="middle" fill={C} fontSize="10" style={{ fontFamily: mono }}>Client B</text>
        <text x="208" y="95" textAnchor="middle" fill={C} fontSize="7.5" style={{ fontFamily: mono }} opacity="0.6">Angular · own codebase</text>
        <text x="208" y="108" textAnchor="middle" fill={A} fontSize="7.5" style={{ fontFamily: mono }} opacity="0.6">MVC API · SQL DB</text>
        <text x="208" y="122" textAnchor="middle" fill={G} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">★ own hosting + deploy</text>

        {/* Legend shifted for 180px viewBox */}
        <line x1="8" y1="150" x2="282" y2="150" stroke="var(--bg-border)" strokeWidth="0.5" opacity="0.3" />
        <circle cx="11" cy="158" r="2.5" fill={C} opacity="0.5" />
        <text x="17" y="162" fill={C} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Frontend</text>
        <circle cx="74" cy="158" r="2.5" fill={A} opacity="0.5" />
        <text x="80" y="162" fill={A} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">API / Realtime</text>
        <circle cx="158" cy="158" r="2.5" fill={G} opacity="0.5" />
        <text x="164" y="162" fill={G} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Data / Storage</text>
      </>
    ),

    finance: (
      <>
        <text x="10" y="16" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.6">IMS · STRANGLER-FIG · REPORT ENGINE</text>

        {/* Shell App outer box — center y=74 */}
        <rect x="8" y="24" width="180" height="100" rx="4" fill="rgba(0,200,255,0.03)" stroke={C} strokeWidth="1.2" strokeDasharray="4,3" />
        <text x="98" y="38" textAnchor="middle" fill={C} fontSize="10" style={{ fontFamily: mono }}>Shell App</text>
        <line x1="12" y1="44" x2="184" y2="44" stroke={C} strokeWidth="0.5" opacity="0.2" />
        <line x1="98" y1="46" x2="98" y2="122" stroke={C} strokeWidth="0.4" opacity="0.15" />

        {/* Left: strangler-fig migration */}
        <rect x="14" y="50" width="78" height="22" rx="3" fill="rgba(240,136,62,0.08)" stroke={A} strokeWidth="0.8" strokeDasharray="3,3" />
        <text x="53" y="65" textAnchor="middle" fill={A} fontSize="8" style={{ fontFamily: mono }}>AngularJS routes</text>
        <line x1="53" y1="72" x2="53" y2="84" stroke={A} strokeWidth="1" markerEnd={`url(#arr-a-${uid})`} opacity="0.65" />
        <rect x="14" y="86" width="78" height="22" rx="3" fill="rgba(0,200,255,0.08)" stroke={C} strokeWidth="0.8" strokeDasharray="3,3" />
        <text x="53" y="101" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }}>Angular routes</text>

        {/* Right: component library */}
        <rect x="104" y="50" width="76" height="20" rx="3" fill="rgba(0,200,255,0.05)" stroke={C} strokeWidth="0.8" strokeDasharray="3,3" />
        <text x="142" y="64" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }}>Angular Library</text>
        <rect x="104" y="74" width="76" height="24" rx="3" fill="rgba(240,136,62,0.08)" stroke={A} strokeWidth="0.8" strokeDasharray="3,3" />
        <text x="142" y="90" textAnchor="middle" fill={A} fontSize="9" style={{ fontFamily: mono }}>DevExtreme</text>
        <rect x="104" y="102" width="76" height="16" rx="3" fill="rgba(0,200,255,0.03)" stroke={C} strokeWidth="0.6" strokeDasharray="3,3" opacity="0.7" />
        <text x="142" y="113" textAnchor="middle" fill={C} fontSize="6.5" style={{ fontFamily: mono }} opacity="0.65">Report Builder</text>

        {/* Arrow Shell center-right → MVC center-left (aligned at y=74) */}
        <line x1="188" y1="74" x2="196" y2="74" stroke={C} strokeWidth="0.8" markerEnd={`url(#arr-${uid})`} />

        {/* Identity Provider */}
        <rect x="196" y="24" width="86" height="24" rx="3" fill="rgba(240,136,62,0.06)" stroke={A} strokeWidth="1" strokeDasharray="4,3" />
        <text x="239" y="40" textAnchor="middle" fill={A} fontSize="8" style={{ fontFamily: mono }}>Identity Provider</text>
        <line x1="239" y1="48" x2="239" y2="60" stroke={A} strokeWidth="0.8" markerEnd={`url(#arr-a-${uid})`} />

        {/* MVC API — center y=74 */}
        <rect x="196" y="60" width="86" height="28" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="4,3" />
        <text x="239" y="78" textAnchor="middle" fill={C} fontSize="10" style={{ fontFamily: mono }}>MVC API</text>
        <line x1="239" y1="88" x2="239" y2="100" stroke={G} strokeWidth="0.8" markerEnd={`url(#arr-g-${uid})`} />

        {/* SQL DB */}
        <rect x="196" y="100" width="86" height="24" rx="3" fill="none" stroke={G} strokeWidth="1" strokeDasharray="4,3" />
        <text x="239" y="116" textAnchor="middle" fill={G} fontSize="9" style={{ fontFamily: mono }}>SQL DB</text>

        {/* Legend shifted for 180px viewBox */}
        <line x1="8" y1="150" x2="282" y2="150" stroke="var(--bg-border)" strokeWidth="0.5" opacity="0.3" />
        <circle cx="11" cy="158" r="2.5" fill={C} opacity="0.5" />
        <text x="17" y="162" fill={C} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Frontend</text>
        <circle cx="74" cy="158" r="2.5" fill={A} opacity="0.5" />
        <text x="80" y="162" fill={A} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">API / Realtime</text>
        <circle cx="158" cy="158" r="2.5" fill={G} opacity="0.5" />
        <text x="164" y="162" fill={G} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Data / Storage</text>
      </>
    ),

    realtime: (
      <>
        <text x="10" y="14" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.6">COMMAND CENTER 2.0 · LOGISTICS SPA</text>

        {/* Operator / Driver — top center */}
        <rect x="100" y="22" width="90" height="20" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="4,3" />
        <text x="145" y="36" textAnchor="middle" fill={C} fontSize="9" style={{ fontFamily: mono }}>Operator / Driver</text>
        <line x1="145" y1="42" x2="145" y2="54" stroke={C} strokeWidth="0.8" markerEnd={`url(#arr-${uid})`} />

        {/* Aurelia SPA — wide middle block */}
        <rect x="8" y="54" width="274" height="90" rx="4" fill="rgba(0,200,255,0.04)" stroke={C} strokeWidth="1.2" strokeDasharray="4,3" />
        <text x="145" y="67" textAnchor="middle" fill={C} fontSize="10" style={{ fontFamily: mono }}>Aurelia SPA</text>
        <line x1="12" y1="74" x2="278" y2="74" stroke={C} strokeWidth="0.5" opacity="0.2" />

        {/* Module chips row 1 */}
        <rect x="14" y="79" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="54" y="93" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">TL Booking</text>
        <rect x="105" y="79" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="145" y="93" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">Operators</text>
        <rect x="196" y="79" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="236" y="93" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">Activities</text>

        {/* Module chips row 2 */}
        <rect x="14" y="110" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="54" y="124" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">Tracking</text>
        <rect x="105" y="110" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="145" y="124" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">Trucks</text>
        <rect x="196" y="110" width="80" height="20" rx="2" fill="rgba(240,136,62,0.1)" />
        <text x="236" y="124" textAnchor="middle" fill={A} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">SignalR RT</text>

        {/* Arrow SPA → LB */}
        <line x1="35" y1="144" x2="35" y2="158" stroke={A} strokeWidth="0.8" markerEnd={`url(#arr-a-${uid})`} />

        {/* LB */}
        <rect x="20" y="158" width="30" height="30" rx="3" fill="rgba(240,136,62,0.06)" stroke={A} strokeWidth="1" strokeDasharray="4,3" />
        <text x="35" y="177" textAnchor="middle" fill={A} fontSize="10" style={{ fontFamily: mono }}>LB</text>

        {/* LB → MVC */}
        <line x1="50" y1="173" x2="58" y2="173" stroke={A} strokeWidth="0.8" markerEnd={`url(#arr-a-${uid})`} />

        {/* MVC API */}
        <rect x="58" y="158" width="130" height="30" rx="3" fill="none" stroke={A} strokeWidth="1" strokeDasharray="4,3" />
        <text x="123" y="172" textAnchor="middle" fill={A} fontSize="9.5" style={{ fontFamily: mono }}>MVC API</text>
        <text x="123" y="183" textAnchor="middle" fill={A} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">ASP.Net · WebSockets</text>

        {/* MVC → SQL */}
        <line x1="188" y1="173" x2="196" y2="173" stroke={G} strokeWidth="0.8" markerEnd={`url(#arr-g-${uid})`} />

        {/* SQL DB */}
        <rect x="196" y="158" width="86" height="30" rx="3" fill="none" stroke={G} strokeWidth="1" strokeDasharray="4,3" />
        <text x="239" y="177" textAnchor="middle" fill={G} fontSize="9.5" style={{ fontFamily: mono }}>SQL DB</text>

        {/* Legend */}
        <line x1="8" y1="195" x2="282" y2="195" stroke="var(--bg-border)" strokeWidth="0.5" opacity="0.3" />
        <circle cx="11" cy="203" r="2.5" fill={C} opacity="0.5" />
        <text x="17" y="207" fill={C} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Frontend</text>
        <circle cx="74" cy="203" r="2.5" fill={A} opacity="0.5" />
        <text x="80" y="207" fill={A} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">API / Realtime</text>
        <circle cx="158" cy="203" r="2.5" fill={G} opacity="0.5" />
        <text x="164" y="207" fill={G} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Data / Storage</text>
      </>
    ),

    booking: (
      <>
        <text x="10" y="14" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.6">CARRIERATE 2.0 · FREIGHT BOOKING SPA</text>

        {/* User / Shipper — padded top */}
        <rect x="105" y="22" width="80" height="20" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="4,3" />
        <text x="145" y="36" textAnchor="middle" fill={C} fontSize="9" style={{ fontFamily: mono }}>User / Shipper</text>
        <line x1="145" y1="42" x2="145" y2="54" stroke={C} strokeWidth="0.8" markerEnd={`url(#arr-${uid})`} />

        {/* Durandal SPA */}
        <rect x="8" y="54" width="274" height="90" rx="4" fill="rgba(0,200,255,0.04)" stroke={C} strokeWidth="1.2" strokeDasharray="4,3" />
        <text x="145" y="67" textAnchor="middle" fill={C} fontSize="10" style={{ fontFamily: mono }}>Durandal SPA</text>
        <line x1="12" y1="74" x2="278" y2="74" stroke={C} strokeWidth="0.5" opacity="0.2" />

        {/* Module chips row 1 */}
        <rect x="14" y="79" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="54" y="93" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">LTL Quote</text>
        <rect x="105" y="79" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="145" y="93" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">TL Quote</text>
        <rect x="196" y="79" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="236" y="93" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">Tracking</text>

        {/* Module chips row 2 */}
        <rect x="14" y="110" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="54" y="124" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">Reports</text>
        <rect x="105" y="110" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="145" y="124" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">Addresses</text>
        <rect x="196" y="110" width="80" height="20" rx="2" fill="rgba(0,200,255,0.07)" />
        <text x="236" y="124" textAnchor="middle" fill={C} fontSize="8" style={{ fontFamily: mono }} opacity="0.85">Location</text>

        {/* Arrow SPA → LB — padded gap */}
        <line x1="35" y1="144" x2="35" y2="158" stroke={A} strokeWidth="0.8" markerEnd={`url(#arr-a-${uid})`} />

        {/* LB */}
        <rect x="20" y="158" width="30" height="30" rx="3" fill="rgba(240,136,62,0.06)" stroke={A} strokeWidth="1" strokeDasharray="4,3" />
        <text x="35" y="177" textAnchor="middle" fill={A} fontSize="10" style={{ fontFamily: mono }}>LB</text>

        {/* LB → MVC */}
        <line x1="50" y1="173" x2="58" y2="173" stroke={A} strokeWidth="0.8" markerEnd={`url(#arr-a-${uid})`} />

        {/* MVC API */}
        <rect x="58" y="158" width="130" height="30" rx="3" fill="none" stroke={A} strokeWidth="1" strokeDasharray="4,3" />
        <text x="123" y="172" textAnchor="middle" fill={A} fontSize="9.5" style={{ fontFamily: mono }}>MVC API</text>
        <text x="123" y="183" textAnchor="middle" fill={A} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">ASP.Net · SignalR · Chat</text>

        {/* MVC → SQL */}
        <line x1="188" y1="173" x2="196" y2="173" stroke={G} strokeWidth="0.8" markerEnd={`url(#arr-g-${uid})`} />

        {/* SQL DB */}
        <rect x="196" y="158" width="86" height="30" rx="3" fill="none" stroke={G} strokeWidth="1" strokeDasharray="4,3" />
        <text x="239" y="177" textAnchor="middle" fill={G} fontSize="9.5" style={{ fontFamily: mono }}>SQL DB</text>

        {/* Legend */}
        <line x1="8" y1="195" x2="282" y2="195" stroke="var(--bg-border)" strokeWidth="0.5" opacity="0.3" />
        <circle cx="11" cy="203" r="2.5" fill={C} opacity="0.5" />
        <text x="17" y="207" fill={C} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Frontend</text>
        <circle cx="74" cy="203" r="2.5" fill={A} opacity="0.5" />
        <text x="80" y="207" fill={A} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">API / Realtime</text>
        <circle cx="158" cy="203" r="2.5" fill={G} opacity="0.5" />
        <text x="164" y="207" fill={G} fontSize="7" style={{ fontFamily: mono }} opacity="0.7">Data / Storage</text>
      </>
    ),
  };

  const vbHeights: Record<Project['diagramType'], number> = {
    enterprise: 185,
    lms: 180,
    finance: 180,
    realtime: 215,
    booking: 215,
  };
  const vbH = vbHeights[type];

  return (
    <svg
      width="100%"
      viewBox={`0 0 290 ${vbH}`}
      xmlns="http://www.w3.org/2000/svg"
      className="block"
      aria-hidden="true"
    >
      <defs>
        <marker id={`arr-${uid}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="var(--accent-cyan)" strokeWidth="1" />
        </marker>
        <marker id={`arr-a-${uid}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="var(--accent-amber)" strokeWidth="1" />
        </marker>
        <marker id={`arr-g-${uid}`} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="var(--success-green)" strokeWidth="1" />
        </marker>
      </defs>
      {diagrams[type]}
    </svg>
  );
}

function TechLayerStack({ layers }: { layers: TechLayer[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      {layers.map(({ label, techs, color }) => {
        const { bg, color: fg } = layerColors[color];
        return (
          <div key={label} className="flex items-center gap-2">
            <span
              className="text-xs shrink-0 w-14 text-right"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.6875rem' }}
            >
              {label}
            </span>
            <div className="shrink-0" style={{ width: '1px', height: '14px', background: 'var(--bg-border)' }} />
            <div className="flex flex-wrap gap-1.5">
              {techs.map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 rounded text-xs"
                  style={{ fontFamily: 'var(--font-mono)', background: bg, color: fg, fontSize: '0.6875rem' }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MetricsBand({ metrics }: { metrics: Metric[] }) {
  return (
    <div
      className="grid grid-cols-3 gap-2 rounded-md p-3"
      style={{
        background: 'linear-gradient(135deg, rgba(0,200,255,0.06), rgba(63,185,80,0.04))',
        border: '1px solid rgba(0,200,255,0.15)',
      }}
    >
      {metrics.map((m, i) => (
        <div key={i} className="flex flex-col items-center text-center gap-1 px-1">
          <span
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--accent-cyan)',
              fontSize: 'clamp(1rem, 2vw, 1.375rem)',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            {m.value}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              fontSize: '0.6875rem',
              lineHeight: 1.3,
            }}
          >
            {m.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function DetailBlock({ icon, label, color, children }: {
  icon: React.ReactNode;
  label: string;
  color: 'cyan' | 'amber' | 'green';
  children: React.ReactNode;
}) {
  const fg = color === 'cyan' ? 'var(--accent-cyan)' : color === 'amber' ? 'var(--accent-amber)' : 'var(--success-green)';
  const bg = color === 'cyan' ? 'rgba(0,200,255,0.05)' : color === 'amber' ? 'rgba(240,136,62,0.05)' : 'rgba(63,185,80,0.05)';
  return (
    <div className="rounded-md p-3 flex flex-col gap-2" style={{ background: bg, border: `1px solid ${fg}22` }}>
      <div className="flex items-center gap-1.5" style={{ color: fg }}>
        {icon}
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
      </div>
      <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.75rem', lineHeight: '1.5' }} className="flex flex-col gap-1">
        {children}
      </div>
    </div>
  );
}

function ProjectCard({ project, index, inView, featured = false }: {
  project: Project; index: number; inView: boolean; featured?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group w-full rounded-lg border overflow-hidden"
      style={{
        borderColor: featured ? 'rgba(0,200,255,0.3)' : 'var(--bg-border)',
        background: 'var(--bg-surface)',
        boxShadow: featured ? '0 0 48px rgba(0,200,255,0.1)' : '0 4px 20px rgba(0,0,0,0.25)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
        e.currentTarget.style.boxShadow = '0 0 32px rgba(0,200,255,0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = featured ? 'rgba(0,200,255,0.3)' : 'var(--bg-border)';
        e.currentTarget.style.boxShadow = featured ? '0 0 48px rgba(0,200,255,0.1)' : '0 4px 20px rgba(0,0,0,0.25)';
      }}
    >
      <div className="flex flex-col lg:flex-row h-full">
        {/* Left panel: header + diagram + tech layer */}
        <div
          className="lg:w-[42%] border-b lg:border-b-0 lg:border-r p-5 flex flex-col gap-3"
          style={{ borderColor: 'var(--bg-border)', background: 'rgba(0,200,255,0.02)' }}
        >
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <h3
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                className={`${featured ? 'text-xl' : 'text-lg'} font-bold leading-tight`}
              >
                {project.name}
              </h3>
              {featured && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs shrink-0"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(0,200,255,0.15)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(0,200,255,0.35)',
                    letterSpacing: '0.04em',
                  }}
                >
                  CURRENT ROLE
                </span>
              )}
              {project.aiAssisted && (
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs shrink-0"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(240,136,62,0.15)',
                    color: 'var(--accent-amber)',
                    border: '1px solid rgba(240,136,62,0.3)'
                  }}
                >
                  <Sparkles size={10} />
                  AI-Assisted
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ fontFamily: 'var(--font-mono)', background: 'var(--accent-cyan)', color: 'var(--bg-deep)' }}
              >
                {project.role}
              </span>
              <span
                className="flex items-center gap-1 text-xs"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}
              >
                <Calendar size={12} />
                {project.period}
              </span>
            </div>
            <p
              className="mb-4"
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                fontSize: '0.6875rem',
                letterSpacing: '0.02em',
              }}
            >
              {project.scope}
            </p>
            <BlueprintDiagram type={project.diagramType} featured={featured} />
          </div>
          <div className="pt-3 border-t mt-auto" style={{ borderColor: 'var(--bg-border)' }}>
            <TechLayerStack layers={project.layers} />
          </div>
        </div>

        {/* Right panel: metrics → description → achievements → details grid */}
        <div className="lg:w-[58%] p-5 flex flex-col gap-4">
          <MetricsBand metrics={project.metrics} />

          <p
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)', fontSize: featured ? '0.9375rem' : '0.875rem' }}
            className="leading-relaxed"
          >
            {project.description}
          </p>

          <div className="space-y-1.5">
            {project.achievements.map((a, i) => (
              <div key={i} className="flex items-start gap-2">
                <CheckCircle2 size={13} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '3px' }} />
                <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                  {a}
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t" style={{ borderColor: 'var(--bg-border)' }}>
            <DetailBlock icon={<TrendingUp size={12} />} label="Impact" color="green">
              {project.details.impact.map((c, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }}>·</span>
                  <span>{c}</span>
                </div>
              ))}
            </DetailBlock>

            <DetailBlock icon={<GitBranch size={12} />} label="Tech Decisions" color="amber">
              <span>{project.details.techDecisions}</span>
            </DetailBlock>

            <DetailBlock icon={<Zap size={12} />} label="Key Challenges" color="cyan">
              {project.details.challenges.map((c, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <span style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: '2px' }}>·</span>
                  <span>{c}</span>
                </div>
              ))}
            </DetailBlock>

            <DetailBlock icon={<Users size={12} />} label="Team & Context" color="amber">
              <span>{project.details.team}</span>
            </DetailBlock>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
