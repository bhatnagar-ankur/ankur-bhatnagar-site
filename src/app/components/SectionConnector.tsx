import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Crosshair } from 'lucide-react';

type ConnectorVariant = 'deep-to-surface' | 'surface-to-deep';

interface SectionConnectorProps {
  label: string;
  variant: ConnectorVariant;
}

const backgrounds: Record<ConnectorVariant, string> = {
  'deep-to-surface': 'linear-gradient(to bottom, var(--bg-deep) 0%, var(--bg-surface) 100%)',
  'surface-to-deep': 'linear-gradient(to bottom, var(--bg-surface) 0%, var(--bg-deep) 100%)',
};

export function SectionConnector({ label, variant }: SectionConnectorProps) {
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: true });

  return (
    <div
      ref={ref}
      className="relative px-6 py-3"
      style={{ background: backgrounds[variant] }}
    >
      <div className="resume-container">
        <div className="flex items-center gap-3">
          {/* Left line */}
          <motion.div
            className="flex-1 h-px origin-left"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ background: 'var(--bg-border)' }}
          />

          {/* Annotation label */}
          <span
            className="shrink-0 select-none flex items-center gap-1.5"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.6rem',
              letterSpacing: '0.18em',
              color: 'var(--text-muted)',
              opacity: 0.35
            }}
          >
            <Crosshair size={9} strokeWidth={1.5} />
            {label}
          </span>

          {/* Right line */}
          <motion.div
            className="flex-1 h-px origin-right"
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
            style={{ background: 'var(--bg-border)' }}
          />
        </div>
      </div>
    </div>
  );
}
