import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Calendar, CheckCircle2, Sparkles } from 'lucide-react';

interface Project {
  name: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
  aiAssisted?: boolean;
  diagramType: 'enterprise' | 'lms' | 'finance' | 'realtime' | 'booking';
}

const projects: Project[] = [
  {
    name: 'Various Enterprise Projects',
    role: 'Technical Architect',
    period: '2023 – Present',
    description: 'Leading architecture and development of multiple enterprise-grade web applications with focus on scalability, performance, and modern UI/UX practices.',
    achievements: [
      'Architected microservices-based frontend solutions',
      'Implemented AI-powered features for enhanced UX',
      'Led team of 20+ designers and developers',
      'Accelerated delivery using Claude, GitHub Copilot & Codex for code generation, review and refactoring'
    ],
    techStack: ['Angular', 'React', 'Azure', 'TypeScript', 'AI/GenAI', 'Claude', 'Copilot'],
    aiAssisted: true,
    diagramType: 'enterprise'
  },
  {
    name: 'Trainup',
    role: 'Technical Architect',
    period: '2021 – 2023',
    description: 'Multi-white-label learning management platform enabling organizations to create branded training portals with advanced course management and analytics.',
    achievements: [
      'Built scalable white-label architecture',
      'Implemented real-time collaboration features',
      'Achieved 99.9% uptime and sub-second load times'
    ],
    techStack: ['Angular', 'React', 'SignalR', 'MaterialUI', 'Azure'],
    diagramType: 'lms'
  },
  {
    name: 'IMS — Investment Management',
    role: 'Technical Lead',
    period: '2017 – 2023',
    description: 'Comprehensive investment portfolio management system for financial advisors with real-time market data integration and advanced analytics.',
    achievements: [
      'Migrated legacy AngularJS app to modern Angular',
      'Integrated real-time market data feeds',
      'Built advanced charting and analytics dashboard'
    ],
    techStack: ['Angular', 'AngularJS', 'Highcharts', 'ASP.Net', 'SQL'],
    diagramType: 'finance'
  },
  {
    name: 'Command Center 2.0',
    role: 'Senior Developer',
    period: '2015 – 2017',
    description: 'Logistics management portal for delivery agents featuring route optimization, real-time tracking, and performance analytics.',
    achievements: [
      'Implemented real-time GPS tracking system',
      'Built responsive mobile-first interface',
      'Optimized for low-bandwidth conditions'
    ],
    techStack: ['Aurelia', 'JavaScript', 'SignalR', 'Google Maps API'],
    diagramType: 'realtime'
  },
  {
    name: 'CarrierRate 2.0',
    role: 'Software Engineer',
    period: '2013 – 2015',
    description: 'Customer-facing freight booking platform with dynamic pricing, shipment tracking, and integrated payment processing.',
    achievements: [
      'Built from scratch using modern SPA architecture',
      'Implemented dynamic pricing engine UI',
      'Achieved 40% reduction in booking time'
    ],
    techStack: ['Durandal', 'Knockout.js', 'jQuery', 'ASP.Net MVC'],
    diagramType: 'booking'
  }
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-6 xl:gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={index}
              inView={inView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueprintDiagram({ type }: { type: Project['diagramType'] }) {
  const C = 'var(--accent-cyan)';
  const A = 'var(--accent-amber)';
  const G = 'var(--success-green)';
  const M = 'var(--text-muted)';
  const monoFont = 'var(--font-mono)';

  const diagrams: Record<Project['diagramType'], React.ReactNode> = {
    enterprise: (
      <>
        <rect x="10" y="30" width="55" height="22" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="3,2" />
        <text x="37" y="45" textAnchor="middle" fill={C} fontSize="7" style={{ fontFamily: monoFont }}>UI Layer</text>
        <line x1="67" y1="41" x2="82" y2="41" stroke={C} strokeWidth="0.8" markerEnd="url(#arrowBlue)" />
        <rect x="83" y="30" width="55" height="22" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="3,2" />
        <text x="110" y="45" textAnchor="middle" fill={C} fontSize="7" style={{ fontFamily: monoFont }}>Azure API</text>
        <line x1="140" y1="41" x2="155" y2="41" stroke={C} strokeWidth="0.8" markerEnd="url(#arrowBlue)" />
        <rect x="156" y="30" width="44" height="22" rx="3" fill="none" stroke={A} strokeWidth="1" strokeDasharray="3,2" />
        <text x="178" y="45" textAnchor="middle" fill={A} fontSize="7" style={{ fontFamily: monoFont }}>DB</text>
        <text x="10" y="15" fill={C} fontSize="6" style={{ fontFamily: monoFont }} opacity="0.5">ENTERPRISE ARCHITECTURE</text>
        <text x="195" y="70" textAnchor="end" fill={M} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.5">REV.01</text>
      </>
    ),
    lms: (
      <>
        <rect x="10" y="15" width="45" height="18" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="3,2" />
        <text x="32" y="27" textAnchor="middle" fill={C} fontSize="6.5" style={{ fontFamily: monoFont }}>Tenant A</text>
        <rect x="10" y="42" width="45" height="18" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="3,2" />
        <text x="32" y="54" textAnchor="middle" fill={C} fontSize="6.5" style={{ fontFamily: monoFont }}>Tenant B</text>
        <line x1="55" y1="24" x2="75" y2="36" stroke={C} strokeWidth="0.8" />
        <line x1="55" y1="51" x2="75" y2="39" stroke={C} strokeWidth="0.8" />
        <rect x="76" y="26" width="60" height="20" rx="3" fill="none" stroke={A} strokeWidth="1" strokeDasharray="3,2" />
        <text x="106" y="40" textAnchor="middle" fill={A} fontSize="6.5" style={{ fontFamily: monoFont }}>LMS Platform</text>
        <line x1="137" y1="36" x2="152" y2="36" stroke={C} strokeWidth="0.8" markerEnd="url(#arrowBlue)" />
        <rect x="153" y="26" width="44" height="20" rx="3" fill="none" stroke={G} strokeWidth="1" strokeDasharray="3,2" />
        <text x="175" y="40" textAnchor="middle" fill={G} fontSize="6.5" style={{ fontFamily: monoFont }}>Azure DB</text>
        <text x="10" y="10" fill={C} fontSize="6" style={{ fontFamily: monoFont }} opacity="0.5">MULTI-TENANT LMS</text>
        <text x="195" y="70" textAnchor="end" fill={M} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.5">REV.02</text>
      </>
    ),
    finance: (
      <>
        <rect x="10" y="26" width="50" height="20" rx="3" fill="none" stroke={A} strokeWidth="1" strokeDasharray="3,2" />
        <text x="35" y="40" textAnchor="middle" fill={A} fontSize="6.5" style={{ fontFamily: monoFont }}>Market Feed</text>
        <line x1="61" y1="36" x2="76" y2="36" stroke={C} strokeWidth="0.8" markerEnd="url(#arrowBlue)" />
        <rect x="77" y="20" width="60" height="32" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="3,2" />
        <text x="107" y="35" textAnchor="middle" fill={C} fontSize="6.5" style={{ fontFamily: monoFont }}>Angular SPA</text>
        <text x="107" y="46" textAnchor="middle" fill={C} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.7">Portfolio Manager</text>
        <line x1="138" y1="30" x2="153" y2="24" stroke={C} strokeWidth="0.8" markerEnd="url(#arrowBlue)" />
        <line x1="138" y1="42" x2="153" y2="48" stroke={C} strokeWidth="0.8" markerEnd="url(#arrowBlue)" />
        <rect x="154" y="16" width="44" height="16" rx="3" fill="none" stroke={G} strokeWidth="1" strokeDasharray="3,2" />
        <text x="176" y="27" textAnchor="middle" fill={G} fontSize="6.5" style={{ fontFamily: monoFont }}>Charts</text>
        <rect x="154" y="40" width="44" height="16" rx="3" fill="none" stroke={G} strokeWidth="1" strokeDasharray="3,2" />
        <text x="176" y="51" textAnchor="middle" fill={G} fontSize="6.5" style={{ fontFamily: monoFont }}>SQL</text>
        <text x="10" y="12" fill={C} fontSize="6" style={{ fontFamily: monoFont }} opacity="0.5">INVESTMENT MANAGEMENT</text>
        <text x="195" y="70" textAnchor="end" fill={M} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.5">REV.03</text>
      </>
    ),
    realtime: (
      <>
        <rect x="8" y="26" width="45" height="20" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="3,2" />
        <text x="30" y="37" textAnchor="middle" fill={C} fontSize="6.5" style={{ fontFamily: monoFont }}>GPS Devices</text>
        <text x="30" y="45" textAnchor="middle" fill={C} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.6">Real-time</text>
        <line x1="53" y1="36" x2="72" y2="36" stroke={A} strokeWidth="0.8" markerEnd="url(#arrowAmber)" />
        <rect x="73" y="22" width="56" height="28" rx="3" fill="none" stroke={A} strokeWidth="1" strokeDasharray="3,2" />
        <text x="101" y="36" textAnchor="middle" fill={A} fontSize="6.5" style={{ fontFamily: monoFont }}>SignalR Hub</text>
        <text x="101" y="46" textAnchor="middle" fill={A} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.7">WebSocket</text>
        <line x1="130" y1="36" x2="149" y2="36" stroke={C} strokeWidth="0.8" markerEnd="url(#arrowBlue)" />
        <rect x="150" y="22" width="48" height="28" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="3,2" />
        <text x="174" y="36" textAnchor="middle" fill={C} fontSize="6.5" style={{ fontFamily: monoFont }}>Dashboard</text>
        <text x="174" y="46" textAnchor="middle" fill={C} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.7">Maps + KPIs</text>
        <text x="8" y="12" fill={C} fontSize="6" style={{ fontFamily: monoFont }} opacity="0.5">REAL-TIME LOGISTICS</text>
        <text x="195" y="70" textAnchor="end" fill={M} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.5">REV.04</text>
      </>
    ),
    booking: (
      <>
        <rect x="8" y="28" width="38" height="18" rx="3" fill="none" stroke={C} strokeWidth="1" strokeDasharray="3,2" />
        <text x="27" y="40" textAnchor="middle" fill={C} fontSize="6.5" style={{ fontFamily: monoFont }}>User</text>
        <line x1="46" y1="37" x2="57" y2="37" stroke={C} strokeWidth="0.8" markerEnd="url(#arrowBlue)" />
        <rect x="58" y="22" width="52" height="30" rx="3" fill="none" stroke={A} strokeWidth="1" strokeDasharray="3,2" />
        <text x="84" y="36" textAnchor="middle" fill={A} fontSize="6.5" style={{ fontFamily: monoFont }}>Pricing</text>
        <text x="84" y="46" textAnchor="middle" fill={A} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.7">Dynamic Rate</text>
        <line x1="110" y1="37" x2="122" y2="37" stroke={C} strokeWidth="0.8" markerEnd="url(#arrowBlue)" />
        <rect x="123" y="22" width="44" height="30" rx="3" fill="none" stroke={G} strokeWidth="1" strokeDasharray="3,2" />
        <text x="145" y="36" textAnchor="middle" fill={G} fontSize="6.5" style={{ fontFamily: monoFont }}>Payment</text>
        <text x="145" y="46" textAnchor="middle" fill={G} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.7">ASP.Net</text>
        <line x1="167" y1="37" x2="178" y2="37" stroke={C} strokeWidth="0.8" markerEnd="url(#arrowBlue)" />
        <rect x="179" y="28" width="18" height="18" rx="3" fill={C} fillOpacity="0.1" stroke={C} strokeWidth="1" />
        <text x="188" y="40" textAnchor="middle" fill={C} fontSize="7" style={{ fontFamily: monoFont }}>✓</text>
        <text x="8" y="12" fill={C} fontSize="6" style={{ fontFamily: monoFont }} opacity="0.5">FREIGHT BOOKING FLOW</text>
        <text x="195" y="70" textAnchor="end" fill={M} fontSize="5.5" style={{ fontFamily: monoFont }} opacity="0.5">REV.05</text>
      </>
    )
  };

  return (
    <svg
      width="100%"
      viewBox="0 0 205 76"
      xmlns="http://www.w3.org/2000/svg"
      className="block"
      aria-hidden="true"
    >
      <defs>
        <marker id="arrowBlue" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke={C} strokeWidth="0.8" />
        </marker>
        <marker id="arrowAmber" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
          <path d="M0,0 L5,2.5 L0,5" fill="none" stroke={A} strokeWidth="0.8" />
        </marker>
        <pattern id="bp-mini" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke={C} strokeWidth="0.3" opacity="0.4" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bp-mini)" />
      {diagrams[type]}
    </svg>
  );
}

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 32px rgba(0, 200, 255, 0.25)',
        borderColor: 'var(--accent-cyan)'
      }}
      className="group w-full rounded-lg border flex flex-col h-full overflow-hidden"
      style={{
        borderColor: 'var(--bg-border)',
        background: 'var(--bg-surface)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Blueprint architecture diagram */}
      <div
        className="w-full border-b overflow-hidden"
        style={{
          background: 'rgba(0, 200, 255, 0.03)',
          borderColor: 'var(--bg-border)',
          padding: '12px 12px 8px'
        }}
      >
        <BlueprintDiagram type={project.diagramType} />
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1">
        {/* Header */}
        <div className="mb-4">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h3
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              className="text-lg font-bold leading-tight"
            >
              {project.name}
            </h3>
            {project.aiAssisted && (
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(240, 136, 62, 0.15)',
                  color: 'var(--accent-amber)',
                  border: '1px solid rgba(240, 136, 62, 0.3)'
                }}
              >
                <Sparkles size={10} />
                AI-Assisted
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="px-2 py-0.5 rounded-full text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'var(--accent-cyan)',
                color: 'var(--bg-deep)'
              }}
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
        </div>

        {/* Description */}
        <p
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.8125rem' }}
          className="mb-4 leading-relaxed"
        >
          {project.description}
        </p>

        {/* Achievements */}
        <div className="mb-4 space-y-1.5 flex-1">
          {project.achievements.map((achievement, i) => (
            <div key={i} className="flex items-start gap-2">
              <CheckCircle2 size={14} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                {achievement}
              </span>
            </div>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-1.5 pt-3 border-t" style={{ borderColor: 'var(--bg-border)' }}>
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                background: 'rgba(0, 200, 255, 0.08)',
                color: 'var(--accent-cyan)'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
