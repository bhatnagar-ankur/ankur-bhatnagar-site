import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Server,
  Cloud,
  Wrench,
  Hexagon,
  AtomIcon,
  FileCode,
  Braces,
  Code,
  FileJson,
  Layers,
  Database,
  Box,
  Activity,
  MessageSquare,
  Hash,
  CloudCog,
  GitBranch,
  Package,
  Terminal,
  Zap,
  Grid3x3,
  Component,
  Palette,
  BarChart3,
  BrainCircuit,
  Bot,
  Sparkles
} from 'lucide-react';

interface Skill {
  name: string;
  level: number;
  icon: React.ReactNode;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'Frontend Technologies',
    icon: <Code2 size={24} />,
    skills: [
      { name: 'Angular', level: 95, icon: <Hexagon size={16} /> },
      { name: 'ReactJS', level: 90, icon: <AtomIcon size={16} /> },
      { name: 'TypeScript', level: 92, icon: <FileCode size={16} /> },
      { name: 'JavaScript', level: 95, icon: <Braces size={16} /> },
      { name: 'HTML5/CSS3', level: 95, icon: <Code size={16} /> },
      { name: 'NextJS', level: 85, icon: <FileJson size={16} /> },
      { name: 'VueJS', level: 80, icon: <Layers size={16} /> },
      { name: 'SCSS', level: 90, icon: <Palette size={16} /> }
    ]
  },
  {
    title: 'Backend & Database',
    icon: <Server size={24} />,
    skills: [
      { name: 'ASP.Net', level: 85, icon: <Box size={16} /> },
      { name: 'MVC APIs', level: 85, icon: <Activity size={16} /> },
      { name: 'SignalR', level: 80, icon: <MessageSquare size={16} /> },
      { name: 'SQL', level: 55, icon: <Database size={16} /> },
      { name: 'C#', level: 55, icon: <Hash size={16} /> }
    ]
  },
  {
    title: 'Cloud & DevOps',
    icon: <Cloud size={24} />,
    skills: [
      { name: 'Azure', level: 50, icon: <CloudCog size={16} /> },
      { name: 'TeamCity', level: 45, icon: <GitBranch size={16} /> },
      { name: 'Octopus', level: 42, icon: <Package size={16} /> },
      { name: 'CruiseControl.NET', level: 40, icon: <Terminal size={16} /> }
    ]
  },
  {
    title: 'AI-Assisted Development',
    icon: <BrainCircuit size={24} />,
    skills: [
      { name: 'Claude (Anthropic)', level: 92, icon: <Sparkles size={16} /> },
      { name: 'GitHub Copilot', level: 90, icon: <Bot size={16} /> },
      { name: 'OpenAI Codex', level: 85, icon: <BrainCircuit size={16} /> }
    ]
  },
  {
    title: 'Tools & Libraries',
    icon: <Wrench size={24} />,
    skills: [
      { name: 'VS Code', level: 95, icon: <Code2 size={16} /> },
      { name: 'Windsurf', level: 90, icon: <Zap size={16} /> },
      { name: 'AgGrid', level: 88, icon: <Grid3x3 size={16} /> },
      { name: 'DevExtreme', level: 85, icon: <Component size={16} /> },
      { name: 'MaterialUI', level: 90, icon: <Palette size={16} /> },
      { name: 'Highcharts', level: 85, icon: <BarChart3 size={16} /> }
    ]
  }
];

export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="skills"
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
          <span style={{ color: 'var(--accent-amber)' }}>02.</span> TECHNICAL SKILLS
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 3xl:grid-cols-3 gap-8 xl:gap-10">
          {skillCategories.map((category, categoryIndex) => (
            <SkillCategoryCard
              key={category.title}
              category={category}
              inView={inView}
              delay={categoryIndex * 0.2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillCategoryCard({ category, inView, delay }: { category: SkillCategory; inView: boolean; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-lg border backdrop-blur-xl"
      style={{
        borderColor: 'var(--accent-cyan)',
        background: 'rgba(22, 27, 34, 0.8)',
        boxShadow: '0 4px 20px rgba(0, 200, 255, 0.1)'
      }}
    >
      {/* Category Header */}
      <div className="flex items-center gap-3 mb-6">
        <div style={{ color: 'var(--accent-cyan)' }}>
          {category.icon}
        </div>
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            color: 'var(--text-primary)'
          }}
          className="text-xl font-semibold"
        >
          {category.title}
        </h3>
      </div>

      {/* Skill Bars */}
      <div className="space-y-4">
        {category.skills.map((skill, index) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            inView={inView}
            delay={delay + 0.1 + index * 0.05}
          />
        ))}
      </div>
    </motion.div>
  );
}

function SkillBar({ skill, inView, delay }: { skill: Skill; inView: boolean; delay: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div style={{ color: 'var(--accent-cyan)' }}>
          {skill.icon}
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-primary)',
            fontSize: '0.875rem'
          }}
        >
          {skill.name}
        </span>
      </div>
      <div
        className="h-2 rounded-full overflow-hidden"
        style={{ background: 'var(--bg-border)' }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{ duration: 1, delay, ease: 'easeOut' }}
          className="skill-meter h-full rounded-full"
          style={{
            '--skill-level': `${skill.level}%`,
            background: `linear-gradient(90deg, var(--success-green), var(--accent-cyan))`,
            boxShadow: '0 0 10px rgba(0, 200, 255, 0.5)'
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
