import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { useState, useEffect } from 'react';
import { Building2, ChevronDown, ChevronUp } from 'lucide-react';

interface Experience {
  period: string;
  role: string;
  company: string;
  acquiredBy?: string;
  highlights: string[];
  techStack: string[];
  keySkills: string[];
}

const experiences: Experience[] = [
  {
    period: 'Apr 2025 – Present',
    role: 'Technical Architect & UI/UX Practice Head',
    company: 'Saksoft Ltd',
    highlights: [
      'Leading UI/UX practice and frontend architecture strategy',
      'Driving adoption of modern frontend technologies and AI integration',
      'Managing cross-functional design and development teams'
    ],
    techStack: ['Angular', 'React', 'Azure', 'AI/GenAI', 'TypeScript'],
    keySkills: ['Angular', 'React', 'AI/GenAI']
  },
  {
    period: 'Feb 2022 – Mar 2025',
    role: 'Technical Architect & UI/UX Practice Head',
    company: 'DreamOrbit Softech',
    acquiredBy: 'Saksoft Ltd.',
    highlights: [
      'Led a team of 20+ designers and established UI/UX best practices',
      'Architected scalable frontend solutions for enterprise applications',
      'Implemented AI/ML solutions for enhanced user experiences'
    ],
    techStack: ['Angular', 'React', 'NextJS', 'Azure', 'SignalR', 'MaterialUI'],
    keySkills: ['Angular', 'React', 'NextJS']
  },
  {
    period: 'Oct 2021 – Jan 2022',
    role: 'Technical Lead & UI/UX Team Manager',
    company: 'DreamOrbit Softech',
    acquiredBy: 'Saksoft Ltd.',
    highlights: [
      'Managed UI/UX team and coordinated with stakeholders',
      'Led technical design and implementation of key features',
      'Mentored junior developers and established coding standards'
    ],
    techStack: ['Angular', 'TypeScript', 'RxJS', 'SCSS'],
    keySkills: ['Angular', 'TypeScript']
  },
  {
    period: 'Sep 2018 – Sep 2021',
    role: 'Technical Lead',
    company: 'DreamOrbit Softech',
    acquiredBy: 'Saksoft Ltd.',
    highlights: [
      'Led frontend development for multiple enterprise projects',
      'Implemented real-time features using SignalR',
      'Optimized application performance and user experience'
    ],
    techStack: ['Angular', 'AngularJS', 'ASP.Net', 'SignalR', 'SQL'],
    keySkills: ['Angular', 'SignalR', 'ASP.Net']
  },
  {
    period: 'Jul 2016 – Jul 2018',
    role: 'Senior Software Engineer',
    company: 'DreamOrbit Softech',
    acquiredBy: 'Saksoft Ltd.',
    highlights: [
      'Developed complex UI components and features',
      'Collaborated with designers to implement pixel-perfect interfaces',
      'Participated in code reviews and technical discussions'
    ],
    techStack: ['AngularJS', 'JavaScript', 'HTML5', 'CSS3', 'Bootstrap'],
    keySkills: ['AngularJS', 'JavaScript']
  },
  {
    period: 'Jun 2013 – Jun 2016',
    role: 'Software Engineer',
    company: 'DreamOrbit Softech',
    acquiredBy: 'Saksoft Ltd.',
    highlights: [
      'Built responsive web applications from ground up',
      'Worked on full-stack development with focus on frontend',
      'Received "Best Software Engineer" award for 2015-2016'
    ],
    techStack: ['Durandal', 'Knockout.js', 'Aurelia', 'jQuery', 'ASP.Net'],
    keySkills: ['Knockout.js', 'jQuery', 'ASP.Net']
  }
];

export function Experience() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 px-6 relative"
      style={{ background: 'var(--bg-deep)' }}
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
          className="fluid-section-h2 font-bold mb-16 tracking-wide"
        >
          <span style={{ color: 'var(--accent-amber)' }}>03.</span> WORK EXPERIENCE
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: '100%' } : {}}
            transition={{ duration: 2, ease: 'easeInOut' }}
            className="absolute left-0 md:left-1/2 top-0 w-0.5 -translate-x-1/2"
            style={{
              background: `linear-gradient(180deg, var(--accent-cyan), var(--accent-amber))`,
              boxShadow: '0 0 10px rgba(0, 200, 255, 0.5)'
            }}
          />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={`${exp.company}-${exp.period}`}
                experience={exp}
                index={index}
                inView={inView}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ExperienceCard({ experience, index, inView }: { experience: Experience; index: number; inView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const { ref: cardRef, inView: cardInView } = useInView({ 
    threshold: 0.5, 
    triggerOnce: false 
  });
  const isLeft = index % 2 === 0;

  // Auto-expand when card comes into view
  useEffect(() => {
    if (cardInView) {
      setExpanded(true);
    }
  }, [cardInView]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
    >
      {/* Timeline Dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
        className="absolute left-0 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full border-2 z-10"
        style={{
          borderColor: 'var(--accent-cyan)',
          background: 'var(--bg-deep)',
          boxShadow: '0 0 15px rgba(0, 200, 255, 0.8)'
        }}
      />

      {/* Spacer */}
      <div className="hidden md:block flex-1" />

      {/* Card */}
      <div className="flex-1 ml-8 md:ml-0">
        <div
          onClick={() => setExpanded(!expanded)}
          className="p-6 rounded-lg border backdrop-blur-sm cursor-pointer transition-all hover:scale-[1.02]"
          style={{
            borderColor: expanded ? 'var(--accent-cyan)' : 'var(--bg-border)',
            background: 'var(--bg-surface)',
            boxShadow: expanded ? '0 0 30px rgba(0, 200, 255, 0.2)' : '0 4px 20px rgba(0, 0, 0, 0.3)'
          }}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-3">
            <div className="flex items-start gap-3 flex-1">
              <Building2 size={24} style={{ color: 'var(--accent-cyan)', flexShrink: 0 }} />
              <div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    color: 'var(--accent-cyan)'
                  }}
                  className="text-xl font-bold mb-1"
                >
                  {experience.role}
                </h3>
                <div>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-primary)'
                    }}
                    className="font-semibold"
                  >
                    {experience.company}
                  </p>
                  {experience.acquiredBy && (
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent-amber)',
                        fontSize: '0.75rem'
                      }}
                      className="flex items-center gap-1 mt-0.5"
                    >
                      <span>→</span>
                      <span>Now {experience.acquiredBy}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--accent-amber)',
                  color: 'var(--bg-deep)'
                }}
              >
                {experience.period}
              </span>
              {expanded ? <ChevronUp size={20} style={{ color: 'var(--accent-cyan)' }} /> : <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />}
            </div>
          </div>

          {/* Expanded Content */}
          <motion.div
            initial={false}
            animate={expanded ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden={!expanded}
            className="experience-details mt-4 pt-4 border-t overflow-hidden"
            style={{ borderColor: 'var(--bg-border)' }}
          >
              {/* Highlights */}
              <ul className="space-y-2 mb-4">
                {experience.highlights.map((highlight, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-muted)',
                      fontSize: '0.875rem'
                    }}
                    className="flex items-start gap-2"
                  >
                    <span style={{ color: 'var(--accent-cyan)' }}>▹</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {experience.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      borderColor: 'var(--accent-cyan)',
                      background: 'rgba(0, 200, 255, 0.1)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
