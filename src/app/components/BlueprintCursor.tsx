import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react';

type CursorState = 'default' | 'pointer' | 'text' | 'idle';

const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function detectState(el: Element | null): CursorState {
  if (!el) return 'default';
  let node: Element | null = el;
  while (node && node !== document.body) {
    const tag = node.tagName.toLowerCase();
    const role = node.getAttribute('role');
    if (tag === 'button' || tag === 'a' || role === 'button' || role === 'link') return 'pointer';
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return 'text';
    if (['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'label'].includes(tag)) return 'text';
    node = node.parentElement;
  }
  return 'default';
}

export function BlueprintCursor() {
  // Cursor-glow CSS vars are still needed by blueprint.css body::after.
  // Writing them on every raw mousemove repaints a full-viewport radial-gradient
  // per event, so the update is batched to once per animation frame.
  useEffect(() => {
    document.documentElement.style.setProperty('--cursor-x', '-9999px');
    document.documentElement.style.setProperty('--cursor-y', '-9999px');
    let frame = 0;
    let pending: { x: number; y: number } | null = null;

    const applyPending = () => {
      frame = 0;
      if (!pending) return;
      document.documentElement.style.setProperty('--cursor-x', `${pending.x}px`);
      document.documentElement.style.setProperty('--cursor-y', `${pending.y}px`);
    };

    const onMove = (e: MouseEvent) => {
      pending = { x: e.clientX, y: e.clientY };
      if (!frame) frame = requestAnimationFrame(applyPending);
    };
    const onLeave = () => {
      pending = null;
      cancelAnimationFrame(frame);
      frame = 0;
      document.documentElement.style.setProperty('--cursor-x', '-9999px');
      document.documentElement.style.setProperty('--cursor-y', '-9999px');
    };
    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  // No rendered overlay on touch or reduced-motion
  if (isTouch || prefersReduced) return null;
  return <CursorOverlay />;
}

function CursorOverlay() {
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const springCfg = { stiffness: 280, damping: 28, mass: 0.6 };
  const x = useSpring(rawX, springCfg);
  const y = useSpring(rawY, springCfg);

  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const [ripple, setRipple] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>();

  const resetIdle = useCallback(() => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setState('idle'), 3000);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
      resetIdle();
    };

    const onOver = (e: MouseEvent) => {
      const next = detectState(e.target as Element);
      setState(prev => (prev === 'idle' ? next : next));
      resetIdle();
    };

    const onClick = () => {
      setRipple(true);
      setTimeout(() => setRipple(false), 400);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('click', onClick, { passive: true });
    document.addEventListener('mouseenter', onEnter, { passive: true });
    document.addEventListener('mouseleave', onLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('click', onClick);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseleave', onLeave);
      clearTimeout(idleTimer.current);
    };
  }, [rawX, rawY, visible, resetIdle]);

  const isPointer = state === 'pointer';
  const isText = state === 'text';
  const isIdle = state === 'idle';

  const ringSize = isPointer ? 34 : 22;
  const ringOpacity = isIdle ? 0 : isText ? 0.18 : isPointer ? 0.75 : 0.55;
  const dotOpacity = isIdle ? 0 : isText ? 0.28 : 1;
  const dotScale = isPointer ? 0.55 : 1;

  return (
    <motion.div
      style={{
        x,
        y,
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Outer ring */}
      <motion.div
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: ringOpacity,
          borderColor: isPointer ? 'var(--accent-amber)' : 'var(--accent-cyan)',
        }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          borderRadius: '50%',
          border: '1px solid var(--accent-cyan)',
          transform: 'translate(-50%, -50%)',
          boxShadow: isPointer
            ? '0 0 8px rgba(240,136,62,0.25)'
            : '0 0 6px rgba(0,200,255,0.15)',
        }}
      />

      {/* Pointer-state corner ticks */}
      <AnimatePresence>
        {isPointer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.15 }}
            style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
          >
            {[
              { top: -ringSize / 2 - 5, left: -ringSize / 2 - 5, borderTop: '2px solid', borderLeft: '2px solid' },
              { top: -ringSize / 2 - 5, right: -ringSize / 2 - 5, borderTop: '2px solid', borderRight: '2px solid' },
              { bottom: -ringSize / 2 - 5, left: -ringSize / 2 - 5, borderBottom: '2px solid', borderLeft: '2px solid' },
              { bottom: -ringSize / 2 - 5, right: -ringSize / 2 - 5, borderBottom: '2px solid', borderRight: '2px solid' },
            ].map((style, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  width: 6,
                  height: 6,
                  borderColor: 'var(--accent-amber)',
                  ...style,
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Inner dot */}
      <motion.div
        animate={{ opacity: dotOpacity, scale: dotScale }}
        transition={{ duration: 0.15 }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 4,
          height: 4,
          borderRadius: '50%',
          background: 'var(--accent-cyan)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 4px rgba(0,200,255,0.6)',
        }}
      />

      {/* Click ripple */}
      <AnimatePresence>
        {ripple && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: 2.2, opacity: 0 }}
            exit={{}}
            transition={{ duration: 0.38, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: 22,
              height: 22,
              borderRadius: '50%',
              border: '1px solid var(--accent-cyan)',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
