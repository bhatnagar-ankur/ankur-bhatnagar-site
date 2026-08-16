import { motion, AnimatePresence, useScroll, useReducedMotion, useSpring, useTransform, useMotionTemplate } from 'motion/react';
import { useState, useEffect } from 'react';
import { useSound } from '../providers/SoundProvider';
import avatar from '../../imports/android-chrome-192x192.png';

interface OrbitMascotProps {
  size?: number;
  onClick?: () => void;
  growOnScroll?: boolean;
  hint?: boolean;
  hintText?: string;
}

export function OrbitMascot({ size = 40, onClick, growOnScroll = false, hint = false, hintText = 'Back to top' }: OrbitMascotProps) {
  const { playSound } = useSound();
  const { scrollY, scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [autoHint, setAutoHint] = useState(false);

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });

  const growRaw = useTransform(scrollY, [0, 320], [1, 1.18]);
  const grow = useSpring(growRaw, { stiffness: 120, damping: 24, mass: 0.4 });
  const scale = growOnScroll && !reduce ? grow : 1;
  const shadowBlur = useTransform(scrollY, [0, 320], [0, 12]);
  const liftShadow = useMotionTemplate`drop-shadow(0 5px ${shadowBlur}px rgba(0, 0, 0, 0.45))`;

  useEffect(() => {
    if (!hint) return;
    setAutoHint(true);
    const t = setTimeout(() => setAutoHint(false), 4200);
    return () => clearTimeout(t);
  }, [hint]);

  const showTip = hint && (autoHint || hovered);

  return (
    <motion.div
      className="relative"
      style={{ width: size, height: size, scale, transformOrigin: '0% 100%', filter: growOnScroll && !reduce ? liftShadow : undefined }}
      onMouseEnter={() => { setHovered(true); playSound('hover'); }}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Educational tooltip — auto-shows once, then on hover */}
      <AnimatePresence>
        {showTip && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute flex items-center pointer-events-none"
            style={{ left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 10, zIndex: 60 }}
          >
            <div
              style={{
                width: 0, height: 0,
                borderTop: '5px solid transparent',
                borderBottom: '5px solid transparent',
                borderRight: '6px solid rgba(var(--accent-cyan-rgb), 0.5)',
                marginRight: -1, flexShrink: 0,
              }}
            />
            <motion.div
              animate={reduce ? {} : { x: [0, -3, 0] }}
              transition={reduce ? {} : { duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              style={{
                padding: '5px 10px',
                borderRadius: 6,
                border: '1px solid rgba(var(--accent-cyan-rgb), 0.5)',
                background: 'var(--glass-bg, rgba(13,17,23,0.9))',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)', fontSize: '0.6875rem', letterSpacing: '0.03em' }}>
                {hintText} ↑
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient amber glow — breathes at rest, flares on hover */}
      <motion.div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          inset: -size * 0.22,
          background: 'radial-gradient(circle, rgba(var(--accent-amber-rgb), 0.55) 0%, transparent 68%)',
        }}
        animate={reduce ? { opacity: 0.4 } : { opacity: hovered ? 0.9 : [0.32, 0.5, 0.32], scale: hovered ? 1.08 : 1 }}
        transition={reduce ? {} : hovered
          ? { duration: 0.3 }
          : { opacity: { duration: 3.2, repeat: Infinity, ease: 'easeInOut' } }}
      />

      {/* Slow orbital guide ring — dashed, ambient rotation */}
      <motion.div
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{ inset: -3, border: '1px dashed rgba(var(--accent-cyan-rgb), 0.55)' }}
        animate={reduce ? {} : { rotate: 360 }}
        transition={reduce ? {} : { duration: hovered ? 6 : 18, repeat: Infinity, ease: 'linear' }}
      />

      {/* Scroll-progress arc */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 pointer-events-none"
        style={{ width: size, height: size, transform: 'rotate(-90deg)', overflow: 'visible' }}
        aria-hidden
      >
        <defs>
          <linearGradient id="orbit-progress" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--accent-cyan)" />
            <stop offset="100%" stopColor="var(--accent-amber)" />
          </linearGradient>
        </defs>
        <circle cx="50" cy="50" r="48" fill="none" stroke="rgba(var(--accent-cyan-rgb), 0.12)" strokeWidth="2.5" />
        <motion.circle
          cx="50" cy="50" r="48" fill="none"
          stroke="url(#orbit-progress)" strokeWidth="2.5" strokeLinecap="round"
          style={{ pathLength: progress }}
        />
      </svg>

      {/* Amber start tick at 12 o'clock */}
      <span
        aria-hidden
        className="absolute rounded-full pointer-events-none"
        style={{
          top: -1, left: '50%', width: 3, height: 3, marginLeft: -1.5,
          background: 'var(--accent-amber)',
          boxShadow: '0 0 4px rgba(var(--accent-amber-rgb), 0.9)',
        }}
      />

      {/* Avatar — the mascot itself */}
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.9 }}
        animate={reduce ? {} : { scale: hovered ? 1.06 : 1, y: hovered ? 0 : [0, -1.5, 0] }}
        transition={reduce ? {} : hovered
          ? { type: 'spring', stiffness: 300, damping: 18 }
          : { y: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } }}
        aria-label={hintText}
        title={hintText}
        className="absolute rounded-full overflow-hidden cursor-pointer"
        style={{
          inset: size * 0.13,
          border: '1.5px solid var(--accent-cyan)',
          boxShadow: hovered ? '0 0 12px rgba(var(--accent-cyan-rgb), 0.5)' : 'none',
          transition: 'box-shadow 0.25s ease',
          padding: 0,
        }}
      >
        <img src={avatar} alt="Ankur Bhatnagar" className="w-full h-full object-cover" draggable={false} />
      </motion.button>
    </motion.div>
  );
}
