import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Award, Trophy, Sparkles, Satellite, Building2, Search } from 'lucide-react';
import { AchievementsBg } from './SectionBackgrounds';

interface Achievement {
  title: string;
  issuer: string;
  description: string;
  icon: React.ReactNode;
  year: string;
  type: 'award' | 'certification';
}

const achievements: Achievement[] = [
  {
    title: 'Technical Lead of the Year',
    issuer: 'DreamOrbit Softech',
    description: 'Company-wide recognition for leadership impact — delivery velocity, mentorship, and technical decision quality across the year.',
    icon: <Trophy size={32} />,
    year: '2018-2019',
    type: 'award'
  },
  {
    title: 'Best Software Engineer',
    issuer: 'DreamOrbit Softech',
    description: 'Individual contributor award — shipped mission-critical features across financial and logistics platforms.',
    icon: <Award size={32} />,
    year: '2015-2016',
    type: 'award'
  },
  {
    title: 'ISRO AI/ML for Geodata Analysis',
    issuer: 'Indian Space Research Organisation',
    description: 'Advanced practitioner certification in AI/ML applied to geospatial datasets — issued by ISRO.',
    icon: <Sparkles size={32} />,
    year: '2024',
    type: 'certification'
  }
];

const certifications = [
  { name: 'ISRO AI/ML for Geodata Analysis', year: '2024', issuer: 'ISRO' },
  { name: 'Management Development Program', year: '2021', issuer: 'NTPC School of Business' },
  { name: 'Power Searching with Google', year: '2013', issuer: 'Google' }
];

// Helper function to get icon based on issuer
const getCertificationIcon = (issuer: string) => {
  switch (issuer.toLowerCase()) {
    case 'isro':
      return <Satellite size={24} />;
    case 'internal':
      return <Building2 size={24} />;
    case 'google':
      return <Search size={24} />;
    default:
      return <Award size={24} />;
  }
};

export function Achievements() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="achievements"
      ref={ref}
      className="relative overflow-hidden py-24 px-6"
      style={{ background: 'var(--bg-deep)' }}
    >
      <AchievementsBg />
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
          <span style={{ color: 'var(--accent-amber)' }}>06.</span> ACHIEVEMENTS & RECOGNITION
        </motion.h2>

        {/* Achievement Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group p-6 rounded-2xl border transition-all hover:scale-105"
              style={{
                borderColor: 'var(--accent-amber)',
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-filter)',
                WebkitBackdropFilter: 'var(--glass-filter)',
                boxShadow: 'var(--glass-shadow)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 0 30px rgba(var(--accent-amber-rgb), 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
              }}
            >
              <div className="flex items-start gap-4">
                <div
                  className="p-3 rounded-lg"
                  style={{
                    background: 'rgba(var(--accent-amber-rgb), 0.1)',
                    color: 'var(--accent-amber)'
                  }}
                >
                  {achievement.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--text-primary)'
                      }}
                      className="text-xl font-bold"
                    >
                      {achievement.title}
                    </h3>
                    <span
                      className="px-3 py-1 rounded-full text-xs whitespace-nowrap"
                      style={{
                        fontFamily: 'var(--font-mono)',
                        background: 'var(--accent-amber)',
                        color: 'var(--bg-deep)'
                      }}
                    >
                      {achievement.year}
                    </span>
                  </div>
                  <p
                    className="mb-2"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-amber)',
                      fontSize: '0.75rem',
                      letterSpacing: '0.03em',
                    }}
                  >
                    {achievement.issuer}
                  </p>
                  <p
                    className="fluid-body"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {achievement.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="p-6 rounded-2xl border"
          style={{
            borderColor: 'var(--glass-border)',
            background: 'var(--glass-bg)',
            backdropFilter: 'var(--glass-filter)',
            WebkitBackdropFilter: 'var(--glass-filter)',
            boxShadow: 'var(--glass-shadow)',
          }}
        >
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--accent-cyan)'
            }}
            className="text-2xl font-bold mb-6"
          >
            Professional Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 3xl:grid-cols-4 gap-4 xl:gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="group p-4 rounded-2xl border transition-all hover:scale-105"
                style={{
                  borderColor: 'var(--glass-border)',
                  background: 'var(--glass-bg)',
                  backdropFilter: 'var(--glass-filter)',
                  WebkitBackdropFilter: 'var(--glass-filter)',
                  boxShadow: 'var(--glass-shadow)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-cyan)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(var(--accent-cyan-rgb), 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--glass-border)';
                  e.currentTarget.style.boxShadow = 'var(--glass-shadow)';
                }}
              >
                {/* Icon */}
                <div className="flex items-center justify-center mb-4">
                  <div
                    className="p-3 rounded-lg transition-all group-hover:scale-110"
                    style={{
                      background: 'rgba(var(--accent-cyan-rgb), 0.1)',
                      color: 'var(--accent-cyan)'
                    }}
                  >
                    {cert.issuer === 'Google' ? (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                    ) : getCertificationIcon(cert.issuer)}
                  </div>
                </div>
                
                {/* Certificate Name */}
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    color: 'var(--text-primary)'
                  }}
                  className="font-semibold mb-3 text-center"
                >
                  {cert.name}
                </p>
                
                {/* Issuer and Year */}
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--bg-border)' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem'
                    }}
                  >
                    {cert.issuer}
                  </span>
                  <span
                    className="px-2 py-1 rounded"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(var(--accent-cyan-rgb), 0.1)',
                      color: 'var(--accent-cyan)',
                      fontSize: '0.75rem'
                    }}
                  >
                    {cert.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}