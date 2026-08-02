import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, BookOpen } from 'lucide-react';
import { EducationBg } from './SectionBackgrounds';

interface Education {
  degree: string;
  institution: string;
  year: string;
}

const education: Education[] = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'Amity University, Lucknow',
    year: '2012'
  },
  {
    degree: 'Higher Secondary (Science)',
    institution: 'Lucknow Public School, Lucknow',
    year: '2007'
  }
];

export function Education() {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  return (
    <section
      id="education"
      ref={ref}
      className="relative overflow-hidden py-24 px-6"
      style={{ background: 'var(--bg-surface)' }}
    >
      <EducationBg />
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
          <span style={{ color: 'var(--accent-amber)' }}>07.</span> EDUCATION
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-6 rounded-lg border"
              style={{
                borderColor: 'var(--accent-cyan)',
                background: 'var(--bg-deep)',
                boxShadow: '0 4px 20px rgba(0, 200, 255, 0.1)'
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-lg"
                  style={{
                    background: 'rgba(0, 200, 255, 0.1)',
                    color: 'var(--accent-cyan)'
                  }}
                >
                  {index === 0 ? <GraduationCap size={28} /> : <BookOpen size={28} />}
                </div>
                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      color: 'var(--text-primary)'
                    }}
                    className="text-xl font-bold mb-2"
                  >
                    {edu.degree}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-muted)'
                    }}
                    className="mb-3"
                  >
                    {edu.institution}
                  </p>
                  <span
                    className="px-3 py-1 rounded-full text-xs"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'var(--accent-amber)',
                      color: 'var(--bg-deep)'
                    }}
                  >
                    {edu.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
