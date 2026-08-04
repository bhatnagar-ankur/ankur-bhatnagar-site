import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState, useRef, Fragment } from 'react';
import { ChevronDown, Building2, ArrowRight, ChevronsUpDown } from 'lucide-react';
import { ExperienceBg } from './SectionBackgrounds';
import { useSound } from './SoundProvider';

interface Experience {
  period: string;
  role: string;
  company: string;
  acquiredBy?: string;
  highlights: string[];
  techStack: string[];
}

const experiences: Experience[] = [
  {
    period: 'Apr 2025 – Present',
    role: 'Technical Architect & UI/UX Practice Head',
    company: 'Saksoft Ltd',
    highlights: [
      'Leading UI/UX practice + frontend architecture across enterprise accounts — 20+ designers and developers under my leadership',
      'Embedding AI (Claude, GitHub Copilot, Codex) across every stage of the design-to-code pipeline — from prompt design to code review',
      'Setting organization-wide standards for AI evaluation, hiring criteria, and responsible tool use'
    ],
    techStack: ['Angular', 'React', 'Azure', 'AI/GenAI', 'TypeScript']
  },
  {
    period: 'Feb 2022 – Mar 2025',
    role: 'Technical Architect & UI/UX Practice Head',
    company: 'DreamOrbit Softech',
    acquiredBy: 'Saksoft Ltd.',
    highlights: [
      'Built and led a team of 20+ designers, establishing UI/UX best practices from the ground up',
      'Architected scalable frontend solutions across 5+ concurrent enterprise applications',
      'Implemented AI/ML solutions and pioneered AI-first development workflows'
    ],
    techStack: ['Angular', 'React', 'NextJS', 'Azure', 'SignalR', 'MaterialUI']
  },
  {
    period: 'Oct 2021 – Jan 2022',
    role: 'Technical Lead & UI/UX Team Manager',
    company: 'DreamOrbit Softech',
    acquiredBy: 'Saksoft Ltd.',
    highlights: [
      'Managed UI/UX team and coordinated directly with business stakeholders',
      'Led technical design and implementation of key product features',
      'Mentored junior developers and established coding standards and review processes'
    ],
    techStack: ['Angular', 'TypeScript', 'RxJS', 'SCSS']
  },
  {
    period: 'Sep 2018 – Sep 2021',
    role: 'Technical Lead',
    company: 'DreamOrbit Softech',
    acquiredBy: 'Saksoft Ltd.',
    highlights: [
      'Led frontend development for multiple enterprise projects simultaneously',
      'Implemented real-time features using SignalR for logistics dashboards',
      'Optimized application performance and drove UX quality improvements'
    ],
    techStack: ['Angular', 'AngularJS', 'ASP.Net', 'SignalR', 'SQL']
  },
  {
    period: 'Jul 2016 – Jul 2018',
    role: 'Senior Software Engineer',
    company: 'DreamOrbit Softech',
    acquiredBy: 'Saksoft Ltd.',
    highlights: [
      'Developed complex UI components and features for financial web applications',
      'Collaborated with designers to implement pixel-perfect, accessible interfaces',
      'Participated in code reviews and technical discussions'
    ],
    techStack: ['AngularJS', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap']
  },
  {
    period: 'Jun 2013 – Jun 2016',
    role: 'Software Engineer',
    company: 'DreamOrbit Softech',
    acquiredBy: 'Saksoft Ltd.',
    highlights: [
      'Built responsive single-page applications from ground up',
      'Full-stack development with focus on frontend user experience',
      'Received "Best Software Engineer" award for 2015-2016'
    ],
    techStack: ['Durandal', 'Knockout.js', 'Aurelia', 'jQuery', 'ASP.Net']
  },
  {
    period: 'Oct 2012 – May 2013',
    role: 'Software Engineer',
    company: 'Bytech India Pvt Ltd',
    highlights: [
      'Delivered internal and client-facing web projects end-to-end within a compact cross-functional team',
      'Built interactive UI components and mobile-responsive interfaces using jQuery and jQuery Mobile',
      'Developed data-driven features with Classic ASP.NET and SQL across multiple concurrent project deliveries'
    ],
    techStack: ['Classic ASP.NET', 'jQuery', 'jQuery Mobile', 'SQL']
  }
];

function getDuration(period: string): string {
  const m: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const [startStr, endStr] = period.split(' – ');
  const [sm, sy] = startStr.split(' ');
  const start = new Date(parseInt(sy), m[sm]);
  const end = endStr === 'Present'
    ? new Date()
    : (() => { const [em, ey] = endStr.split(' '); return new Date(parseInt(ey), m[em]); })();
  const total = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  const y = Math.floor(total / 12);
  const mo = total % 12;
  if (y === 0) return `${mo} mo`;
  if (mo === 0) return `${y} yr${y > 1 ? 's' : ''}`;
  return `${y} yr${y > 1 ? 's' : ''} ${mo} mo`;
}

const DOT_SIZES = [20, 16, 14, 12, 10, 10, 10];

export function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { ref: inViewRef, inView } = useInView({ threshold: 0.05, triggerOnce: true });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const lineScaleY = useTransform(scrollYProgress, [0.08, 0.82], [0, 1]);

  const setRefs = (node: HTMLElement | null) => {
    sectionRef.current = node;
    inViewRef(node);
  };

  return (
    <section
      id="experience"
      ref={setRefs}
      className="py-24 px-6 relative overflow-hidden"
      style={{ background: 'var(--bg-deep)' }}
    >
      <ExperienceBg />
      <div className="resume-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            className="fluid-section-h2 font-bold tracking-wide"
          >
            <span style={{ color: 'var(--accent-amber)' }}>04.</span> WORK EXPERIENCE
          </h2>
          <p
            className="mt-3 tracking-wider"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.8125rem' }}
          >
            13+ years · 7 roles · Engineer → Architect
          </p>
          <p
            className="mt-2 flex items-center gap-1.5 tracking-wider"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.75rem', opacity: 0.6 }}
          >
            <ChevronsUpDown size={13} />
            Click any role card to expand or collapse details
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative ml-2 md:ml-6">
          {/* Track (static background line) */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px]"
            style={{ background: 'var(--bg-border)' }}
          />
          {/* Animated gradient fill — draws as you scroll */}
          <motion.div
            className="absolute left-0 top-0 w-[2px] h-full origin-top"
            style={{
              scaleY: lineScaleY,
              background: 'linear-gradient(180deg, var(--accent-cyan) 0%, var(--accent-amber) 100%)',
              boxShadow: '0 0 8px rgba(var(--accent-cyan-rgb), 0.3)',
            }}
          />

          {/* Timeline Items */}
          {experiences.map((exp, index) => (
            <Fragment key={`${exp.company}-${exp.period}`}>
              {index === 1 && <AcquisitionMarker inView={inView} />}
              <TimelineItem
                experience={exp}
                index={index}
                inView={inView}
                dotSize={DOT_SIZES[index]}
                isCurrent={index === 0}
              />
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function AcquisitionMarker({ inView }: { inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="relative pl-10 md:pl-14 py-3"
    >
      {/* Diamond on the timeline */}
      <div
        className="absolute left-0 w-3 h-3 border-2"
        style={{
          borderColor: 'var(--accent-amber)',
          background: 'var(--accent-amber)',
          top: '50%',
          transform: 'translate(-50%, -50%) rotate(45deg)',
        }}
      />

      <div
        className="flex items-center gap-3 px-4 py-2 rounded"
        style={{
          border: '1px dashed rgba(var(--accent-amber-rgb), 0.4)',
          background: 'rgba(var(--accent-amber-rgb), 0.04)',
        }}
      >
        <ArrowRight size={14} style={{ color: 'var(--accent-amber)', flexShrink: 0 }} />
        <span
          className="tracking-wider"
          style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', fontSize: '0.75rem' }}
        >
          ACQUISITION — DreamOrbit Softech → Saksoft Ltd.
        </span>
      </div>
    </motion.div>
  );
}

function TimelineItem({
  experience,
  index,
  inView,
  dotSize,
  isCurrent,
}: {
  experience: Experience;
  index: number;
  inView: boolean;
  dotSize: number;
  isCurrent: boolean;
}) {
  const { playSound } = useSound();
  const [expanded, setExpanded] = useState(isCurrent);
  const duration = getDuration(experience.period);

  const toggleExpand = () => {
    setExpanded((prev) => !prev);
    playSound('click');
  };

  return (
    <motion.div
      className="relative pl-10 md:pl-14 pb-10 last:pb-0"
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.12 + 0.1,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {/* Timeline Dot — grows with seniority */}
      <motion.div
        className="absolute left-0 -translate-x-1/2 rounded-full"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 400, damping: 22, delay: index * 0.12 + 0.2 }}
        style={{
          width: dotSize,
          height: dotSize,
          top: '1.5rem',
          border: `2px solid ${isCurrent ? 'var(--accent-cyan)' : 'var(--accent-amber)'}`,
          background: isCurrent ? 'var(--accent-cyan)' : 'var(--bg-deep)',
          boxShadow: isCurrent
            ? '0 0 14px rgba(var(--accent-cyan-rgb), 0.6), 0 0 28px rgba(var(--accent-cyan-rgb), 0.2)'
            : `0 0 ${Math.max(4, (6 - index) * 2)}px rgba(var(--accent-amber-rgb), ${0.15 + (5 - index) * 0.06})`,
        }}
      />

      {/* Card */}
      <div
        onClick={toggleExpand}
        className={`rounded-2xl border cursor-pointer transition-all duration-300 ${isCurrent ? 'p-6 md:p-8' : 'p-5 md:p-6'}`}
        style={{
          borderColor: expanded ? 'var(--accent-cyan)' : 'var(--glass-border)',
          borderLeftWidth: isCurrent ? '3px' : '1px',
          borderLeftColor: isCurrent ? 'var(--accent-cyan)' : undefined,
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-filter)',
          WebkitBackdropFilter: 'var(--glass-filter)',
          boxShadow: isCurrent
            ? '0 4px 30px rgba(var(--accent-cyan-rgb), 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
            : expanded
              ? '0 2px 20px rgba(var(--accent-cyan-rgb), 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
              : 'var(--glass-shadow)',
        }}
        onMouseEnter={(e) => {
          if (!expanded) {
            e.currentTarget.style.borderColor = 'var(--accent-cyan)';
            e.currentTarget.style.boxShadow = '0 4px 24px rgba(var(--accent-cyan-rgb), 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!expanded) {
            e.currentTarget.style.borderColor = 'var(--glass-border)';
            e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
          }
        }}
      >
        {/* Header — always visible */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Period + Duration + Current badge */}
            <div className="flex items-center gap-3 mb-2 flex-wrap">
              <span
                className="px-3 py-1 rounded-full text-xs font-semibold"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: isCurrent ? 'var(--accent-cyan)' : 'var(--accent-amber)',
                  color: 'var(--bg-deep)',
                }}
              >
                {experience.period}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                {duration}
              </span>
              {isCurrent && (
                <span
                  className="px-2 py-0.5 rounded text-xs tracking-wider"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(var(--accent-cyan-rgb), 0.1)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(var(--accent-cyan-rgb), 0.25)',
                  }}
                >
                  CURRENT
                </span>
              )}
            </div>

            {/* Role title — current role is visually larger */}
            <h3
              className="font-bold mb-1"
              style={{
                fontFamily: 'var(--font-display)',
                color: isCurrent ? 'var(--accent-cyan)' : 'var(--text-primary)',
                fontSize: isCurrent ? '1.375rem' : '1.125rem',
              }}
            >
              {experience.role}
            </h3>

            {/* Company */}
            <div className="flex items-center gap-2 flex-wrap">
              <Building2 size={15} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
              <span className="fluid-caption" style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>
                {experience.company}
              </span>
              {experience.acquiredBy && (
                <span
                  className="flex items-center gap-1"
                  style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', fontSize: '0.7rem' }}
                >
                  → Now {experience.acquiredBy}
                </span>
              )}
            </div>
          </div>

          {/* Expand chevron — rotates smoothly */}
          <div className="flex flex-col items-center gap-0.5 mt-2 flex-shrink-0">
            <motion.div
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ChevronDown
                size={20}
                style={{ color: expanded ? 'var(--accent-cyan)' : 'var(--text-muted)' }}
              />
            </motion.div>
            <AnimatePresence>
              {!expanded && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    fontSize: '0.6rem',
                    letterSpacing: '0.06em',
                    lineHeight: 1,
                  }}
                >
                  expand
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Expandable Details — always in DOM for print CSS support */}
        <motion.div
          initial={false}
          animate={expanded ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden experience-details"
          aria-hidden={!expanded}
        >
          <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--bg-border)' }}>
            <ul className="space-y-2 mb-4">
              {experience.highlights.map((highlight, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 fluid-body"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
                >
                  <span style={{ color: 'var(--accent-cyan)', flexShrink: 0 }}>▹</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-2">
              {experience.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(var(--accent-cyan-rgb), 0.1)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(var(--accent-cyan-rgb), 0.2)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
