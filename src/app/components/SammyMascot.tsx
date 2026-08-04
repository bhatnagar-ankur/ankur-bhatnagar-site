import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'motion/react';

// ── Section-aware dialogue ──────────────────────────────────────────
const SECTION_DIALOGUES: Record<string, { greet: string; tips: string[]; mouth: string; emotion: 'sparkle' | 'think' }> = {
  hero: {
    greet: "Namaste! I'm Sammy, your crispy guide to Ankur's portfolio!",
    tips: [
      "Scroll down to explore — there's a lot of good stuff below!",
      "Fun fact: I'm a samosa with an engineering degree. Don't ask how.",
      "Pro tip: The best code, like the best samosa, has clean layers.",
      "Try the dark/light theme toggle up top — I look good in both!",
      "Click me anytime for a crispy hot take.",
    ],
    mouth: 'M62 90 Q75 102 88 90',
    emotion: 'sparkle',
  },
  summary: {
    greet: "The summary! 13+ years of experience, distilled down like a fine chutney.",
    tips: [
      "Technical Architect AND UI/UX Practice Head — double stuffed, just like me.",
      "Ankur's worked across fintech, healthcare, and enterprise. Versatile filling.",
      "Reading someone's summary is like judging a samosa by its crisp. Fair game.",
    ],
    mouth: 'M62 88 Q75 100 88 88',
    emotion: 'sparkle',
  },
  skills: {
    greet: "The skills section! Let's see what's in the filling...",
    tips: [
      "React, TypeScript, Node — a well-seasoned tech stack.",
      "Good skills, like good spices, need the right balance.",
      "I count at least 15 technologies here. That's more ingredients than I have.",
    ],
    mouth: 'M62 88 Q75 100 88 88',
    emotion: 'sparkle',
  },
  'ai-practice': {
    greet: "AI Practice! Ankur's been exploring the frontier... I'm still learning to blink.",
    tips: [
      "Ankur uses Claude and Copilot. I'm personally more of a chutney-GPT user.",
      "AI is like the perfect samosa — everyone's trying to crack the recipe.",
      "The future is AI-augmented. The present is samosa-augmented.",
    ],
    mouth: 'M62 90 Q75 102 88 90',
    emotion: 'sparkle',
  },
  experience: {
    greet: "Career timeline — from junior dev to architect. What a journey!",
    tips: [
      "Hmm, let me think about which role was the spiciest...",
      "13+ years of experience. I've been a samosa for... well, always.",
      "Saksoft, building enterprise solutions. Solid as a well-fried crust.",
    ],
    mouth: 'M65 92 L85 92',
    emotion: 'think',
  },
  projects: {
    greet: "Projects! Each one hand-crafted, like a good samosa — no shortcuts!",
    tips: [
      "Click on any project to see the details. I'll wait right here.",
      "Good architecture is like good filling — balanced and well-seasoned.",
      "These projects shipped. Unlike me, who would've been eaten by now.",
    ],
    mouth: 'M62 88 Q75 100 88 88',
    emotion: 'sparkle',
  },
  achievements: {
    greet: "Awards & recognition! Ankur's trophy shelf is looking spicy!",
    tips: [
      "If samosas got awards, I'd definitely win 'Best in Show.'",
      "Recognition is the raita on top — makes everything better.",
      "Achievement unlocked: scrolled this far. You're dedicated.",
    ],
    mouth: 'M60 88 Q75 105 90 88',
    emotion: 'sparkle',
  },
  education: {
    greet: "Education — where the foundation was laid, like the first fold of a samosa.",
    tips: [
      "Strong foundations make for strong engineers. And strong samosas.",
      "I'm reading along with you. This is my thinking face.",
      "Education + experience = the full recipe.",
    ],
    mouth: 'M65 92 L85 92',
    emotion: 'think',
  },
  contact: {
    greet: "Want to reach Ankur? Great idea — he doesn't bite. I might, though.",
    tips: [
      "Email is the fastest way to reach Ankur!",
      "LinkedIn works too — Ankur's pretty responsive there.",
      "Don't be shy! The worst that happens is you get a friendly reply.",
      "I'd give you my number but I don't have hands to hold a phone.",
    ],
    mouth: 'M60 88 Q75 105 90 88',
    emotion: 'sparkle',
  },
};

const SECTION_IDS = Object.keys(SECTION_DIALOGUES);

// ── Component ───────────────────────────────────────────────────────
export function SammyMascot() {
  const [currentSection, setCurrentSection] = useState('hero');
  const [bubbleText, setBubbleText] = useState('');
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  const mascotRef = useRef<HTMLDivElement>(null);
  const controls = useAnimationControls();
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>();
  const dragStart = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const lastSection = useRef('hero');

  // ── Scroll-based section detection ──
  useEffect(() => {
    const detect = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let active = 'hero';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) active = id;
      }
      // hero fallback
      if (window.scrollY < 200) active = 'hero';
      if (active !== lastSection.current) {
        lastSection.current = active;
        setCurrentSection(active);
      }
    };
    window.addEventListener('scroll', detect, { passive: true });
    detect();
    return () => window.removeEventListener('scroll', detect);
  }, []);

  // ── Fly-in when leaving hero for the first time ──
  useEffect(() => {
    if (hasEntered || currentSection === 'hero') return;
    setHasEntered(true);
    controls.set({ x: -window.innerWidth * 0.6, y: 60, opacity: 0, scale: 0.5, rotate: -25 });
    controls.start({
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 55,
        damping: 14,
        mass: 1,
        duration: 1.4,
      },
    });
  }, [currentSection, hasEntered, controls]);

  // ── Show greet on section change ──
  useEffect(() => {
    if (isMinimized || !hasEntered) return;
    const d = SECTION_DIALOGUES[currentSection];
    if (d) showBubble(d.greet);
  }, [currentSection, isMinimized, hasEntered]);

  // ── Bubble helpers ──
  const showBubble = useCallback((text: string) => {
    clearTimeout(bubbleTimer.current);
    setBubbleText(text);
    setBubbleVisible(true);
    bubbleTimer.current = setTimeout(() => setBubbleVisible(false), 5500);
  }, []);

  const showRandomTip = useCallback(() => {
    const tips = SECTION_DIALOGUES[currentSection]?.tips ?? [];
    if (tips.length) showBubble(tips[Math.floor(Math.random() * tips.length)]);
  }, [currentSection, showBubble]);

  // ── Idle chatter ──
  useEffect(() => {
    if (isMinimized) return;
    const id = setInterval(() => {
      if (!bubbleVisible && Math.random() > 0.65) showRandomTip();
    }, 14000);
    return () => clearInterval(id);
  }, [isMinimized, bubbleVisible, showRandomTip]);

  // ── Initial greeting (after fly-in) ──
  useEffect(() => {
    if (!hasEntered) return;
    const t = setTimeout(() => showBubble(SECTION_DIALOGUES[currentSection]?.greet ?? SECTION_DIALOGUES.hero.greet), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasEntered]);

  // ── Drag ──
  const onPointerDown = (e: React.PointerEvent) => {
    hasMoved.current = false;
    dragStart.current = { x: e.clientX - posRef.current.x, y: e.clientY - posRef.current.y };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!e.buttons) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    if (!hasMoved.current && (Math.abs(dx - posRef.current.x) > 4 || Math.abs(dy - posRef.current.y) > 4)) {
      hasMoved.current = true;
      setIsDragging(true);
    }
    if (hasMoved.current) {
      posRef.current = { x: dx, y: dy };
      setPos({ x: dx, y: dy });
    }
  };

  const onPointerUp = () => {
    if (!hasMoved.current) {
      // It was a click
      showRandomTip();
    }
    setTimeout(() => setIsDragging(false), 80);
  };

  // ── Derived state ──
  const dialogue = SECTION_DIALOGUES[currentSection] ?? SECTION_DIALOGUES.hero;

  const handleExpand = () => {
    setIsMinimized(false);
    if (!hasEntered) {
      setHasEntered(true);
      controls.set({ x: -window.innerWidth * 0.6, y: 60, opacity: 0, scale: 0.5, rotate: -25 });
      controls.start({
        x: 0, y: 0, opacity: 1, scale: 1, rotate: 0,
        transition: { type: 'spring', stiffness: 55, damping: 14, mass: 1, duration: 1.4 },
      });
    }
  };

  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={handleExpand}
        className="fixed bottom-6 right-6 z-[60] w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl"
        style={{
          background: 'var(--bg-surface)',
          borderColor: '#D4930D',
          boxShadow: '0 4px 16px rgba(212,147,13,0.3)',
          cursor: 'pointer',
        }}
        title="Meet Sammy, your portfolio guide"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span role="img" aria-label="samosa">🥟</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      ref={mascotRef}
      className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-40"
      style={{ x: pos.x, y: pos.y, touchAction: 'none', pointerEvents: hasEntered ? 'auto' : 'none' }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      initial={{ opacity: 0, x: -300, y: 60, scale: 0.5, rotate: -25 }}
      animate={controls}
    >
      {/* Speech bubble */}
      <AnimatePresence>
        {bubbleVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="absolute bottom-full right-0 mb-3 rounded-xl border-2 px-4 py-3 text-xs leading-relaxed pointer-events-auto"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--bg-border)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              minWidth: 'min(60vw, 210px)',
              maxWidth: 'min(78vw, 270px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setBubbleVisible(false); }}
              className="absolute top-1 right-2 text-sm leading-none"
              style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}
              aria-label="Close bubble"
            >
              ×
            </button>
            {bubbleText}
            {/* Triangle tail */}
            <div
              className="absolute -bottom-2 right-10 w-0 h-0"
              style={{
                borderLeft: '8px solid transparent',
                borderRight: '8px solid transparent',
                borderTop: '8px solid var(--bg-surface)',
              }}
            />
            <div
              className="absolute -bottom-[11px] right-[38px] w-0 h-0"
              style={{
                borderLeft: '9px solid transparent',
                borderRight: '9px solid transparent',
                borderTop: '9px solid var(--bg-border)',
                zIndex: -1,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Samosa SVG */}
      <motion.div
        className="w-20 md:w-[120px]"
        animate={isDragging ? {} : { y: [0, -5, 0] }}
        transition={isDragging ? {} : { repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseEnter={() => { if (!bubbleVisible) showRandomTip(); }}
      >
        <svg width="100%" height="auto" viewBox="0 0 150 170" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shadow */}
          <ellipse cx="75" cy="165" rx="30" ry="4" fill="rgba(0,0,0,0.15)" />

          {/* Body */}
          <path d="M75 10 L135 135 Q135 148 122 148 L28 148 Q15 148 15 135 Z" fill="#D4930D" stroke="#B37A0A" strokeWidth="2.5" />

          {/* Texture */}
          <path d="M55 55 Q75 50 95 55" stroke="#C28510" strokeWidth="1.2" fill="none" opacity="0.5" />
          <path d="M45 80 Q75 73 105 80" stroke="#C28510" strokeWidth="1.2" fill="none" opacity="0.4" />
          <path d="M38 105 Q75 97 112 105" stroke="#C28510" strokeWidth="1.2" fill="none" opacity="0.3" />

          {/* Left arm */}
          <path d="M28 105 Q10 100 5 85" stroke="#B37A0A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <circle cx="5" cy="83" r="4" fill="#E8B44C" />

          {/* Right arm (animated wave on section change) */}
          <g className="sammy-arm-wave">
            <path d="M122 105 Q140 100 145 85" stroke="#B37A0A" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="145" cy="83" r="4" fill="#E8B44C" />
          </g>

          {/* Legs */}
          <path d="M55 148 L50 162" stroke="#B37A0A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="49" cy="164" r="4" fill="#E8B44C" />
          <path d="M95 148 L100 162" stroke="#B37A0A" strokeWidth="3" strokeLinecap="round" />
          <circle cx="101" cy="164" r="4" fill="#E8B44C" />

          {/* Glasses */}
          <rect x="46" y="58" width="24" height="20" rx="4" fill="white" stroke="#555" strokeWidth="2" />
          <rect x="80" y="58" width="24" height="20" rx="4" fill="white" stroke="#555" strokeWidth="2" />
          <path d="M70 68 L80 68" stroke="#555" strokeWidth="2" />
          <path d="M46 68 L38 64" stroke="#555" strokeWidth="1.5" />
          <path d="M104 68 L112 64" stroke="#555" strokeWidth="1.5" />

          {/* Eyes with blink animation via CSS */}
          <g className="sammy-eyes">
            <circle cx="58" cy="69" r="5" fill="#333" />
            <circle cx="60" cy="67" r="1.8" fill="white" />
            <circle cx="92" cy="69" r="5" fill="#333" />
            <circle cx="94" cy="67" r="1.8" fill="white" />
          </g>

          {/* Mouth (changes per section) */}
          <path d={dialogue.mouth} stroke="#555" strokeWidth="2" fill="none" strokeLinecap="round">
            <animate attributeName="d" to={dialogue.mouth} dur="0.3s" fill="freeze" />
          </path>

          {/* Thinking dots */}
          {dialogue.emotion === 'think' && (
            <g>
              <circle cx="130" cy="30" r="4" fill="#D4930D" opacity="0.5">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="138" cy="18" r="5" fill="#D4930D" opacity="0.5">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="142" cy="5" r="3" fill="#D4930D" opacity="0.5">
                <animate attributeName="opacity" values="0.3;1;0.3" dur="1.2s" begin="0.4s" repeatCount="indefinite" />
              </circle>
            </g>
          )}

          {/* Sparkles */}
          {dialogue.emotion === 'sparkle' && (
            <g>
              <text x="10" y="30" fontSize="12" opacity="0.8">
                ✨
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" repeatCount="indefinite" />
              </text>
              <text x="128" y="20" fontSize="10" opacity="0.8">
                ✨
                <animate attributeName="opacity" values="0;1;0" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
              </text>
            </g>
          )}
        </svg>

        {/* Label */}
        <p
          className="text-center text-xs font-bold tracking-wide"
          style={{ color: '#D4930D', fontFamily: 'var(--font-mono)', marginTop: -2 }}
        >
          SAMMY
        </p>
      </motion.div>

      {/* Minimize button */}
      <button
        onClick={(e) => { e.stopPropagation(); setIsMinimized(true); setBubbleVisible(false); }}
        className="absolute -top-1 -left-1 w-5 h-5 rounded-full border flex items-center justify-center text-[10px] leading-none opacity-60 md:opacity-0 md:hover:opacity-100 hover:opacity-100 transition-opacity"
        style={{
          background: 'var(--bg-surface)',
          borderColor: 'var(--bg-border)',
          color: 'var(--text-muted)',
          cursor: 'pointer',
        }}
        title="Minimize Sammy"
      >
        −
      </button>

      {/* CSS for blink + wave animations */}
      <style>{`
        .sammy-eyes {
          animation: sammy-blink 4s ease-in-out infinite;
          transform-origin: center;
        }
        @keyframes sammy-blink {
          0%, 92%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        .sammy-arm-wave {
          transform-origin: 125px 105px;
          animation: sammy-wave-idle 6s ease-in-out infinite;
        }
        @keyframes sammy-wave-idle {
          0%, 85%, 100% { transform: rotate(0deg); }
          88% { transform: rotate(-15deg); }
          91% { transform: rotate(10deg); }
          94% { transform: rotate(-10deg); }
          97% { transform: rotate(5deg); }
        }
      `}</style>
    </motion.div>
  );
}
