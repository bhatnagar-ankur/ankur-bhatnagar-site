import { motion } from 'motion/react';
import { SkillsBg } from './SectionBackgrounds';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { useSound } from '../providers/SoundProvider';
import {
  Hexagon, AtomIcon, FileCode, Braces, Code, FileJson, Layers, Palette,
  Box, Activity, MessageSquare, Database, Hash,
  CloudCog, GitBranch, Package,
  BrainCircuit, Bot, Sparkles, Zap,
  Code2, Grid3x3, Component, BarChart3,
  Users, Building2, Layout
} from 'lucide-react';

interface SkillTag {
  name: string;
  icon: React.ReactNode;
}

interface SkillGroup {
  category: string;
  skills: SkillTag[];
}

interface SkillTier {
  level: 'primary' | 'secondary' | 'exploring';
  label: string;
  description: string;
  groups: SkillGroup[];
}

const skillTiers: SkillTier[] = [
  {
    level: 'primary',
    label: 'PRIMARY',
    description: 'Core expertise · Daily use · Deep proficiency',
    groups: [
      {
        category: 'Frontend',
        skills: [
          { name: 'Angular', icon: <Hexagon size={14} /> },
          { name: 'React', icon: <AtomIcon size={14} /> },
          { name: 'TypeScript', icon: <FileCode size={14} /> },
          { name: 'JavaScript', icon: <Braces size={14} /> },
          { name: 'HTML5/CSS3', icon: <Code size={14} /> },
          { name: 'SCSS', icon: <Palette size={14} /> }
        ]
      },
      {
        category: 'AI Tools',
        skills: [
          { name: 'Claude (Anthropic)', icon: <Sparkles size={14} /> },
          { name: 'GitHub Copilot', icon: <Bot size={14} /> },
          { name: 'VS Code', icon: <Code2 size={14} /> },
          { name: 'Windsurf', icon: <Zap size={14} /> }
        ]
      },
      {
        category: 'Practice',
        skills: [
          { name: 'UI/UX Architecture', icon: <Layout size={14} /> },
          { name: 'Team Leadership', icon: <Users size={14} /> },
          { name: 'Frontend Architecture', icon: <Building2 size={14} /> }
        ]
      }
    ]
  },
  {
    level: 'secondary',
    label: 'SECONDARY',
    description: 'Proven proficiency · Regular project use',
    groups: [
      {
        category: 'Frontend',
        skills: [
          { name: 'NextJS', icon: <FileJson size={14} /> },
          { name: 'VueJS', icon: <Layers size={14} /> },
          { name: 'MaterialUI', icon: <Palette size={14} /> },
          { name: 'AG Grid', icon: <Grid3x3 size={14} /> },
          { name: 'Highcharts', icon: <BarChart3 size={14} /> },
          { name: 'DevExtreme', icon: <Component size={14} /> }
        ]
      },
      {
        category: 'Backend',
        skills: [
          { name: 'ASP.Net', icon: <Box size={14} /> },
          { name: 'C#', icon: <Hash size={14} /> },
          { name: 'SignalR', icon: <MessageSquare size={14} /> },
          { name: 'MVC APIs', icon: <Activity size={14} /> }
        ]
      },
      {
        category: 'Cloud & Data',
        skills: [
          { name: 'Azure', icon: <CloudCog size={14} /> },
          { name: 'SQL', icon: <Database size={14} /> }
        ]
      },
      {
        category: 'Systems',
        skills: [
          { name: 'TeamCity', icon: <GitBranch size={14} /> },
          { name: 'Octopus', icon: <Package size={14} /> }
        ]
      }
    ]
  },
  {
    level: 'exploring',
    label: 'EXPLORING',
    description: 'Actively learning · Building deeper expertise',
    groups: [
      {
        category: 'AI',
        skills: [
          { name: 'OpenAI Codex', icon: <BrainCircuit size={14} /> }
        ]
      }
    ]
  }
];

const tierStyles = {
  primary: {
    border: 'var(--accent-cyan)',
    labelBg: 'rgba(var(--accent-cyan-rgb), 0.12)',
    labelColor: 'var(--accent-cyan)',
    tagBg: 'rgba(var(--accent-cyan-rgb), 0.08)',
    tagBorder: 'rgba(var(--accent-cyan-rgb), 0.35)',
    tagColor: 'var(--text-primary)',
    iconColor: 'var(--accent-cyan)',
    glow: '0 0 30px rgba(var(--accent-cyan-rgb), 0.12)'
  },
  secondary: {
    border: 'var(--bg-border)',
    labelBg: 'rgba(var(--accent-amber-rgb), 0.1)',
    labelColor: 'var(--accent-amber)',
    tagBg: 'rgba(var(--accent-amber-rgb), 0.06)',
    tagBorder: 'rgba(var(--accent-amber-rgb), 0.25)',
    tagColor: 'var(--text-primary)',
    iconColor: 'var(--accent-amber)',
    glow: 'none'
  },
  exploring: {
    border: 'var(--bg-border)',
    labelBg: 'var(--bg-deep)',
    labelColor: 'var(--text-muted)',
    tagBg: 'transparent',
    tagBorder: 'var(--bg-border)',
    tagColor: 'var(--text-muted)',
    iconColor: 'var(--text-muted)',
    glow: 'none'
  }
};

export function Skills() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const { playSound } = useSound();

  useEffect(() => {
    if (inView) {
      setTimeout(() => playSound('pop'), 300);
    }
  }, [inView, playSound]);

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden py-24 px-6"
      style={{ background: 'var(--bg-surface)' }}
    >
      <SkillsBg />
      <div className="resume-container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          className="fluid-section-h2 font-bold mb-4 tracking-wide"
        >
          <span style={{ color: 'var(--accent-amber)' }}>02.</span> TECHNICAL SKILLS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12 fluid-body"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
        >
          Organized by depth of expertise — not by arbitrary percentages.
        </motion.p>

        <div className="space-y-6">
          {skillTiers.map((tier, tierIndex) => (
            <TierBlock
              key={tier.level}
              tier={tier}
              inView={inView}
              delay={tierIndex * 0.15}
              playSound={playSound}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierBlock({ tier, inView, delay, playSound }: { tier: SkillTier; inView: boolean; delay: number; playSound: (type: string) => void }) {
  const styles = tierStyles[tier.level];

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="rounded-2xl border p-6 trace-border"
      style={{
        borderColor: styles.border,
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-filter)',
        WebkitBackdropFilter: 'var(--glass-filter)',
        boxShadow: styles.glow !== 'none'
          ? `${styles.glow}, inset 0 1px 0 rgba(255, 255, 255, 0.05)`
          : 'var(--glass-shadow)',
      }}
    >
      {/* Tier header */}
      <div className="flex items-center gap-3 mb-5">
        <span
          className="px-3 py-1 rounded-full text-xs font-bold tracking-widest"
          style={{
            fontFamily: 'var(--font-mono)',
            background: styles.labelBg,
            color: styles.labelColor
          }}
        >
          {tier.label}
        </span>
        <span
          className="fluid-caption"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
        >
          {tier.description}
        </span>
      </div>

      {/* Groups */}
      <div className="space-y-4">
        {tier.groups.map((group, groupIndex) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: delay + 0.1 + groupIndex * 0.08 }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', opacity: 0.6 }}
            >
              {group.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.35, delay: delay + 0.15 + groupIndex * 0.08 + skillIndex * 0.04 }}
                  whileHover={{ scale: 1.07, y: -2, boxShadow: `0 0 14px ${styles.tagBorder}` }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-sm cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: styles.tagBg,
                    borderColor: styles.tagBorder,
                    color: styles.tagColor
                  }}
                >
                  <span style={{ color: styles.iconColor }}>{skill.icon}</span>
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
