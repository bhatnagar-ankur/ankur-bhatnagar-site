import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Github, GitFork, Sparkles, PlayCircle } from 'lucide-react';
import { useSound } from '../providers/SoundProvider';
import { OpenSourceBg } from './SectionBackgrounds';

interface LangBar {
  label: string;
  pct: number;
  color: 'cyan' | 'amber' | 'green';
}

interface Repo {
  name: string;
  pitch: string;
  kind: 'original' | 'fork';
  featured?: boolean;
  techs: string[];
  langs: LangBar[];
  github: string;
  live?: string;
  liveLabel?: string;
}

const repos: Repo[] = [
  {
    name: 'ai-playbook',
    pitch: 'A curated SKILL.md library that encodes Angular, React, .NET, and design-system conventions for Claude Code — the codified form of my AI-first delivery playbook.',
    kind: 'original',
    featured: true,
    techs: ['Claude Code', 'Markdown', 'TypeScript', 'Angular', 'React'],
    langs: [
      { label: 'Markdown', pct: 68, color: 'amber' },
      { label: 'TypeScript', pct: 22, color: 'cyan' },
      { label: 'Other', pct: 10, color: 'green' },
    ],
    github: 'https://github.com/bhatnagar-ankur/ai-playbook',
  },
  {
    name: 'angular-starter',
    pitch: 'Minimal Angular 21 starter — standalone components, signals, zoneless change detection, lazy-loaded routes, Vitest + Playwright, and AI tooling scaffolding baked in.',
    kind: 'original',
    techs: ['Angular 21', 'TypeScript', 'Signals', 'Vitest', 'Playwright'],
    langs: [
      { label: 'TypeScript', pct: 75, color: 'cyan' },
      { label: 'HTML', pct: 15, color: 'amber' },
      { label: 'SCSS', pct: 10, color: 'green' },
    ],
    github: 'https://github.com/bhatnagar-ankur/angular-starter',
  },
  {
    name: 'story-book-poc',
    pitch: 'Angular 21 + Storybook 10 component playground with Angular Material, accessibility (a11y) addon, and pseudo-state testing — live deployed.',
    kind: 'original',
    techs: ['Angular 21', 'Storybook 10', 'Angular Material', 'a11y', 'Vitest'],
    langs: [
      { label: 'TypeScript', pct: 72, color: 'cyan' },
      { label: 'HTML', pct: 18, color: 'amber' },
      { label: 'SCSS', pct: 10, color: 'green' },
    ],
    github: 'https://github.com/bhatnagar-ankur/story-book-poc/tree/storybook',
    live: 'https://bhatnagar-ankur.github.io/story-book-poc/?path=/docs/configure-your-project--docs',
    liveLabel: 'Try it live',
  },
  {
    name: 'ngx-toastr',
    pitch: 'Community fork of ngx-toastr updated for Angular 22 — no @for usage, native CSS animation bindings, supports both module-based and standalone configs.',
    kind: 'fork',
    techs: ['Angular 22', 'TypeScript', 'SCSS', 'Karma'],
    langs: [
      { label: 'TypeScript', pct: 60, color: 'cyan' },
      { label: 'SCSS', pct: 28, color: 'amber' },
      { label: 'HTML', pct: 12, color: 'green' },
    ],
    github: 'https://github.com/bhatnagar-ankur/ngx-toastr',
    live: 'https://www.npmjs.com/package/ngx-toastr-v22',
    liveLabel: 'View on npm',
  },
];

const langColors = {
  cyan: 'var(--accent-cyan)',
  amber: 'var(--accent-amber)',
  green: 'var(--success-green)',
};

function LanguageBar({ langs }: { langs: LangBar[] }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex h-1.5 rounded-full overflow-hidden gap-px">
        {langs.map(({ label, pct, color }) => (
          <div
            key={label}
            style={{ width: `${pct}%`, background: langColors[color], opacity: 0.75 }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {langs.map(({ label, pct, color }) => (
          <span
            key={label}
            className="flex items-center gap-1"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.625rem', color: 'var(--text-muted)' }}
          >
            <span
              style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: langColors[color] }}
            />
            {label} {pct}%
          </span>
        ))}
      </div>
    </div>
  );
}

function RepoCard({ repo, index, inView }: { repo: Repo; index: number; inView: boolean }) {
  const { playSound } = useSound();
  const isOriginal = repo.kind === 'original';

  const borderColor = repo.featured
    ? 'rgba(var(--accent-cyan-rgb),0.45)'
    : isOriginal
      ? 'rgba(var(--accent-cyan-rgb),0.22)'
      : 'rgba(var(--accent-amber-rgb),0.28)';

  const borderStyle = isOriginal ? 'solid' : 'dashed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col rounded-2xl overflow-hidden"
      style={{
        border: `1px ${borderStyle} ${borderColor}`,
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-filter)',
        WebkitBackdropFilter: 'var(--glass-filter)',
        boxShadow: repo.featured
          ? '0 0 40px rgba(var(--accent-cyan-rgb),0.10), inset 0 1px 0 rgba(255,255,255,0.04)'
          : 'var(--glass-shadow)',
      }}
    >
      {/* Card header */}
      <div
        className="p-5 flex flex-col gap-3 flex-1"
        style={{ background: isOriginal ? 'rgba(var(--accent-cyan-rgb),0.02)' : 'rgba(var(--accent-amber-rgb),0.02)' }}
      >
        {/* Title row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3
                className="text-base font-bold leading-tight"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
              >
                {repo.name}
              </h3>
              {repo.featured && (
                <span
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs shrink-0"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(var(--accent-cyan-rgb),0.15)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(var(--accent-cyan-rgb),0.35)',
                    letterSpacing: '0.04em',
                  }}
                >
                  <Sparkles size={9} />FEATURED
                </span>
              )}
              <span
                className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs shrink-0"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.625rem',
                  letterSpacing: '0.06em',
                  background: isOriginal
                    ? 'rgba(var(--accent-cyan-rgb),0.10)'
                    : 'rgba(var(--accent-amber-rgb),0.12)',
                  color: isOriginal ? 'var(--accent-cyan)' : 'var(--accent-amber)',
                  border: `1px ${borderStyle} ${isOriginal ? 'rgba(var(--accent-cyan-rgb),0.3)' : 'rgba(var(--accent-amber-rgb),0.3)'}`,
                }}
              >
                {!isOriginal && <GitFork size={9} />}
                {isOriginal ? 'ORIGINAL' : 'FORK'}
              </span>
            </div>
          </div>
        </div>

        {/* Pitch */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
        >
          {repo.pitch}
        </p>

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {repo.techs.map(t => (
            <span
              key={t}
              className="px-2 py-0.5 rounded text-xs"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                background: isOriginal
                  ? 'rgba(var(--accent-cyan-rgb),0.08)'
                  : 'rgba(var(--accent-amber-rgb),0.08)',
                color: isOriginal ? 'var(--accent-cyan)' : 'var(--accent-amber)',
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Card footer */}
      <div
        className="px-5 py-4 flex flex-col gap-3 border-t"
        style={{ borderColor: 'var(--bg-border)' }}
      >
        <LanguageBar langs={repo.langs} />

        <div className="flex items-center gap-3 flex-wrap">
          {repo.live && (
            <motion.a
              href={repo.live}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSound('click')}
              whileHover={{
                scale: 1.04,
                boxShadow: isOriginal
                  ? '0 0 14px rgba(var(--accent-cyan-rgb),0.40)'
                  : '0 0 14px rgba(var(--accent-amber-rgb),0.40)',
              }}
              whileTap={{ scale: 0.96 }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6875rem',
                letterSpacing: '0.04em',
                fontWeight: 600,
                color: isOriginal ? 'var(--accent-cyan)' : 'var(--accent-amber)',
                background: isOriginal
                  ? 'rgba(var(--accent-cyan-rgb),0.10)'
                  : 'rgba(var(--accent-amber-rgb),0.10)',
                border: `1px solid ${isOriginal ? 'rgba(var(--accent-cyan-rgb),0.35)' : 'rgba(var(--accent-amber-rgb),0.35)'}`,
                textDecoration: 'none',
              }}
            >
              {/* Live ping dot — same pattern as Contact "available" indicator */}
              <span className="relative flex items-center justify-center w-2 h-2 shrink-0">
                <motion.span
                  aria-hidden="true"
                  className="absolute inline-flex rounded-full w-full h-full"
                  style={{
                    background: isOriginal ? 'var(--accent-cyan)' : 'var(--accent-amber)',
                  }}
                  animate={{ scale: [1, 2.2, 1], opacity: [0.75, 0, 0.75] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.8 }}
                />
                <span
                  className="relative inline-flex rounded-full w-1.5 h-1.5"
                  style={{ background: isOriginal ? 'var(--accent-cyan)' : 'var(--accent-amber)' }}
                />
              </span>

              <PlayCircle size={12} />

              {repo.liveLabel ?? 'Try it live'}

              {/* Arrow drift */}
              <motion.span
                aria-hidden="true"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.6 }}
                style={{ display: 'inline-block' }}
              >
                →
              </motion.span>
            </motion.a>
          )}
          <a
            href={repo.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSound('click')}
            className="flex items-center gap-1.5 transition-opacity hover:opacity-60"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              letterSpacing: '0.06em',
              textDecoration: 'none',
            }}
          >
            <Github size={13} />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function OpenSource() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="open-source"
      ref={ref}
      className="relative overflow-hidden py-24 px-6"
      style={{ background: 'var(--bg-surface)' }}
    >
      <OpenSourceBg />
      <div className="resume-container">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          className="fluid-section-h2 font-bold mb-4 tracking-wide"
        >
          <span style={{ color: 'var(--accent-amber)' }}>06.</span> OPEN SOURCE &amp; LABS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-10"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)', fontSize: '0.9375rem' }}
        >
          Public repos, tooling experiments, and community contributions.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-6">
          {repos.map((repo, i) => (
            <RepoCard key={repo.name} repo={repo} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}
