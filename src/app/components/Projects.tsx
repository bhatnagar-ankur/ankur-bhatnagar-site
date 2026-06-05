import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Rocket, Calendar, CheckCircle2, Sparkles } from 'lucide-react';

interface Project {
  name: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  techStack: string[];
  aiAssisted?: boolean;
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
    aiAssisted: true
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
    techStack: ['Angular', 'React', 'SignalR', 'MaterialUI', 'Azure']
  },
  {
    name: 'IMS - Investment Management System',
    role: 'Technical Lead',
    period: '2017 – 2023',
    description: 'Comprehensive investment portfolio management system for financial advisors and wealth managers with real-time market data integration.',
    achievements: [
      'Migrated legacy AngularJS app to modern Angular',
      'Integrated real-time market data feeds',
      'Built advanced charting and analytics dashboard'
    ],
    techStack: ['Angular', 'AngularJS', 'Highcharts', 'ASP.Net', 'SQL']
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
    techStack: ['Aurelia', 'JavaScript', 'SignalR', 'Google Maps API']
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
    techStack: ['Durandal', 'Knockout.js', 'jQuery', 'ASP.Net MVC']
  }
];

export function Projects() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 px-6"
      style={{ background: 'var(--bg-surface)' }}
    >
      <div className="resume-container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)'
          }}
          className="fluid-section-h2 font-bold mb-12 tracking-wide"
        >
          <span style={{ color: 'var(--accent-amber)' }}>04.</span> KEY PROJECTS
        </motion.h2>

        {/* Responsive Grid Layout */}
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

function ProjectCard({ project, index, inView }: { project: Project; index: number; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group w-full p-6 rounded-lg border transition-all hover:scale-[1.02] flex flex-col h-full"
      style={{
        borderColor: 'var(--bg-border)',
        background: 'var(--bg-deep)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-cyan)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 200, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--bg-border)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <Rocket size={28} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                color: 'var(--text-primary)'
              }}
              className="text-2xl font-bold"
            >
              {project.name}
            </h3>
            {project.aiAssisted && (
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'rgba(255, 170, 0, 0.15)',
                  color: 'var(--accent-amber)',
                  border: '1px solid rgba(255, 170, 0, 0.3)'
                }}
              >
                <Sparkles size={11} />
                AI-Assisted
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span
              className="px-3 py-1 rounded-full text-xs"
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
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)'
              }}
            >
              <Calendar size={14} />
              {project.period}
            </span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          color: 'var(--text-muted)',
          fontSize: '0.875rem'
        }}
        className="mb-4 leading-relaxed"
      >
        {project.description}
      </p>

      {/* Achievements */}
      <div className="mb-4 space-y-2">
        {project.achievements.map((achievement, i) => (
          <div key={i} className="flex items-start gap-2">
            <CheckCircle2 size={16} style={{ color: 'var(--success-green)', flexShrink: 0, marginTop: '2px' }} />
            <span
              style={{
                fontFamily: 'var(--font-body)',
                color: 'var(--text-muted)',
                fontSize: '0.8125rem'
              }}
            >
              {achievement}
            </span>
          </div>
        ))}
      </div>

      {/* Tech Stack */}
      <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: 'var(--bg-border)' }}>
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2 py-1 rounded text-xs"
            style={{
              fontFamily: 'var(--font-mono)',
              background: 'rgba(0, 200, 255, 0.1)',
              color: 'var(--accent-cyan)'
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
}