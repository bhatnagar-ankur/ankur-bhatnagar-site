import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Sparkles, Users, Layers, BrainCircuit } from 'lucide-react';
import { AIBg } from './SectionBackgrounds';

interface AIInitiative {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  highlights: string[];
  tools: string[];
}

const aiInitiatives: AIInitiative[] = [
  {
    icon: <Sparkles size={28} />,
    title: 'Internal GenAI Tooling',
    subtitle: 'Building AI-accelerated engineering workflows',
    highlights: [
      'Accelerated delivery using Claude, Copilot & Codex for code generation, review and refactoring',
      'Established AI-first prompting standards and internal tooling frameworks',
      'Reduced prototype-to-production cycle by integrating AI at every stage of the design-to-code pipeline'
    ],
    tools: ['Claude', 'GitHub Copilot', 'Windsurf', 'OpenAI Codex']
  },
  {
    icon: <Users size={28} />,
    title: 'AI Evaluation Frameworks',
    subtitle: 'Shaping hiring for the AI-augmented era',
    highlights: [
      'Designs AI-centric problem statements for UI/UX team evaluations and hiring panels',
      'Assesses candidates on real-world AI-assisted design and engineering challenges',
      'Defines hiring criteria that reflect AI fluency as a core competency for modern frontend teams'
    ],
    tools: ['Prompt Design', 'Technical Assessment', 'Design Critique']
  },
  {
    icon: <Layers size={28} />,
    title: 'AI-First Design Process',
    subtitle: 'Bridging AI capability into design leadership',
    highlights: [
      'Integrates AI tooling across every phase — research, ideation, prototyping, and code review',
      'Mentors a 20+ member team on responsible and effective AI tool use in daily workflows',
      'Bridges the gap between AI capability and design intent, ensuring quality and craft are not sacrificed'
    ],
    tools: ['Design Systems', 'Team Mentoring', 'Process Design']
  }
];

export function AISection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="ai-practice"
      ref={ref}
      className="relative overflow-hidden py-24 px-6"
      style={{ background: 'var(--bg-deep)' }}
    >
      <AIBg />
      <div className="resume-container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2
            style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            className="fluid-section-h2 font-bold mb-4 tracking-wide"
          >
            <span style={{ color: 'var(--accent-amber)' }}>03.</span> AI-AUGMENTED PRACTICE
          </h2>
          <p
            className="mb-12 fluid-body"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
          >
            AI is not a feature on the roadmap — it's the operating model.
          </p>
        </motion.div>

        {/* Blueprint annotation bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
          className="h-px mb-12 origin-left"
          style={{ background: 'linear-gradient(90deg, var(--accent-cyan), transparent)' }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8">
          {aiInitiatives.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.15 }}
              whileHover={{
                y: -4,
                boxShadow: '0 12px 40px rgba(0, 200, 255, 0.2)'
              }}
              className="relative rounded-xl border p-6 flex flex-col"
              style={{
                borderColor: 'var(--bg-border)',
                background: 'var(--bg-surface)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
              }}
            >
              {/* Blueprint corner mark */}
              <div
                className="absolute top-0 right-0 w-6 h-6 border-t border-r rounded-tr-xl"
                style={{ borderColor: 'var(--accent-cyan)', opacity: 0.4 }}
              />

              {/* Icon */}
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{ background: 'rgba(0, 200, 255, 0.1)', color: 'var(--accent-cyan)' }}
              >
                {item.icon}
              </div>

              {/* Title */}
              <h3
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
                className="text-xl font-bold mb-1"
              >
                {item.title}
              </h3>
              <p
                className="text-sm mb-4"
                style={{ fontFamily: 'var(--font-body)', color: 'var(--accent-cyan)', opacity: 0.8 }}
              >
                {item.subtitle}
              </p>

              {/* Highlights */}
              <ul className="space-y-2 mb-5 flex-1">
                {item.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
                  >
                    <span style={{ color: 'var(--accent-cyan)', flexShrink: 0 }}>▹</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tool tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t" style={{ borderColor: 'var(--bg-border)' }}>
                {item.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-2 py-1 rounded text-xs"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(0, 200, 255, 0.08)',
                      color: 'var(--accent-cyan)',
                      border: '1px solid rgba(0, 200, 255, 0.2)'
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>

              {/* Card index annotation */}
              <span
                className="absolute bottom-4 right-4 text-xs opacity-20"
                style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}
              >
                {`0${index + 1}`}
              </span>
            </motion.div>
          ))}
        </div>

        {/* AI narrative callout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 p-6 rounded-lg border-l-4 flex items-start gap-4"
          style={{
            borderColor: 'var(--accent-cyan)',
            background: 'rgba(0, 200, 255, 0.04)'
          }}
        >
          <BrainCircuit size={24} style={{ color: 'var(--accent-cyan)', flexShrink: 0, marginTop: 2 }} />
          <p
            className="fluid-body"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
          >
            As UI/UX Practice Head, I don't just use AI tools — I design the frameworks that govern how a 20+ person team uses them responsibly, consistently, and creatively. AI fluency is now a hiring criterion, not a nice-to-have.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
