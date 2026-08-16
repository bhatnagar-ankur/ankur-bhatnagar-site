import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'motion/react';

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
  const pendingAnim = useRef<'fly-in' | 're-expand' | null>(null);

  useEffect(() => {
    const detect = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let active = 'hero';
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) active = id;
      }
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

  useEffect(() => {
    if (hasEntered || currentSection === 'hero') return;
    pendingAnim.current = 'fly-in';
    setHasEntered(true);
    setIsMinimized(false);
  }, [currentSection, hasEntered]);

  useEffect(() => {
    if (isMinimized) return;
    const anim = pendingAnim.current;
    pendingAnim.current = null;
    if (anim === 'fly-in') {
      controls.set({ x: -window.innerWidth * 0.6, y: 60, opacity: 0, scale: 0.5, rotate: -25 });
      controls.start({
        x: 0, y: 0, opacity: 1, scale: 1, rotate: 0,
        transition: { type: 'spring', stiffness: 55, damping: 14, mass: 1, duration: 1.4 },
      });
    } else {
      controls.set({ opacity: 0, scale: 0.82, rotate: -8 });
      controls.start({
        opacity: 1, scale: 1, rotate: 0,
        transition: { type: 'spring', stiffness: 220, damping: 22 },
      });
    }
  }, [isMinimized]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isMinimized || !hasEntered) return;
    const d = SECTION_DIALOGUES[currentSection];
    if (d) showBubble(d.greet);
  }, [currentSection, isMinimized, hasEntered]);

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

  useEffect(() => {
    if (isMinimized) return;
    const id = setInterval(() => {
      if (!bubbleVisible && Math.random() > 0.65) showRandomTip();
    }, 14000);
    return () => clearInterval(id);
  }, [isMinimized, bubbleVisible, showRandomTip]);

  useEffect(() => {
    if (!hasEntered) return;
    const t = setTimeout(() => showBubble(SECTION_DIALOGUES[currentSection]?.greet ?? SECTION_DIALOGUES.hero.greet), 800);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasEntered]);

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
      showRandomTip();
    }
    setTimeout(() => setIsDragging(false), 80);
  };

  const dialogue = SECTION_DIALOGUES[currentSection] ?? SECTION_DIALOGUES.hero;

  const handleExpand = () => {
    pendingAnim.current = hasEntered ? 're-expand' : 'fly-in';
    if (!hasEntered) setHasEntered(true);
    setIsMinimized(false);
  };

  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        onClick={handleExpand}
        className="fixed bottom-6 right-6 z-[60] w-14 h-14 rounded-full flex items-center justify-center"
        style={{
          background: 'var(--bg-surface)',
          border: '2px solid #D4930D',
          boxShadow: '0 4px 20px rgba(212,147,13,0.3), inset 0 1px 0 rgba(255,255,255,0.08)',
          cursor: 'pointer',
        }}
        title="Meet Sammy, your portfolio guide"
        whileHover={{ scale: 1.12, boxShadow: '0 6px 28px rgba(212,147,13,0.45)' }}
        whileTap={{ scale: 0.92 }}
      >
        <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
          <path d="M14 3 C11.5 3, 4 14, 3 24 Q2 28, 5.5 29 L22.5 29 Q26 28, 25 24 C24 14, 16.5 3, 14 3 Z"
            fill="#D4930D" stroke="#A06808" strokeWidth="1.2" />
          <circle cx="10" cy="17" r="2" fill="#333" />
          <circle cx="18" cy="17" r="2" fill="#333" />
          <path d="M10 22 Q14 25 18 22" stroke="#6B4513" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </svg>
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
      initial={false}
      animate={controls}
    >
      {/* Speech bubble — glass style */}
      <AnimatePresence>
        {bubbleVisible && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.92 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
            className="absolute bottom-full right-0 mb-3 rounded-2xl px-4 py-3 text-xs leading-relaxed pointer-events-auto"
            style={{
              background: 'var(--glass-bg, rgba(22,27,34,0.85))',
              backdropFilter: 'var(--glass-filter, blur(12px))',
              WebkitBackdropFilter: 'var(--glass-filter, blur(12px))',
              border: '1px solid rgba(212,147,13,0.4)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-body)',
              minWidth: 'min(60vw, 220px)',
              maxWidth: 'min(78vw, 280px)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(212,147,13,0.08), inset 0 1px 0 rgba(255,255,255,0.06)',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setBubbleVisible(false); }}
              className="absolute top-1.5 right-2.5 text-sm leading-none"
              style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none' }}
              aria-label="Close bubble"
            >
              ×
            </button>
            {bubbleText}
            <div
              className="absolute -bottom-[6px] right-10 w-0 h-0"
              style={{
                borderLeft: '6px solid transparent',
                borderRight: '6px solid transparent',
                borderTop: '6px solid rgba(212,147,13,0.4)',
              }}
            />
            <div
              className="absolute -bottom-[4.5px] right-[41px] w-0 h-0"
              style={{
                borderLeft: '5px solid transparent',
                borderRight: '5px solid transparent',
                borderTop: '5px solid var(--bg-surface, #161B22)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Samosa character */}
      <motion.div
        className="w-20 md:w-[120px]"
        animate={isDragging ? {} : { y: [0, -5, 0] }}
        transition={isDragging ? {} : { repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        onMouseEnter={() => { if (!bubbleVisible) showRandomTip(); }}
      >
        <svg width="100%" height="auto" viewBox="0 0 150 170" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="sammy-body" x1="0.2" y1="0" x2="0.85" y2="1">
              <stop offset="0%" stopColor="#F5C84C" />
              <stop offset="40%" stopColor="#E8A832" />
              <stop offset="100%" stopColor="#C47D0A" />
            </linearGradient>
            <linearGradient id="sammy-sheen" x1="0" y1="0" x2="0.6" y2="0.8">
              <stop offset="0%" stopColor="white" stopOpacity="0.22" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="sammy-lens" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(0,200,255,0.14)" />
              <stop offset="100%" stopColor="rgba(0,200,255,0.04)" />
            </linearGradient>
          </defs>

          {/* Ground shadow */}
          <ellipse cx="75" cy="166" rx="34" ry="4" fill="rgba(0,0,0,0.12)" />

          {/* Steam — says "hot food", not anything else */}
          <g className="sammy-steam">
            <path d="M63 14 Q60 7 63 1" stroke="#D4930D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            <path d="M75 10 Q78 3 75 -3" stroke="#D4930D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
            <path d="M87 14 Q90 7 87 1" stroke="#D4930D" strokeWidth="1.3" fill="none" strokeLinecap="round" />
          </g>

          {/* Body — puffy triangle with curved, bowed-out sides */}
          <path
            d="M75 16 C68 16, 24 70, 18 128 Q14 146, 28 150 L122 150 Q136 146, 132 128 C126 70, 82 16, 75 16 Z"
            fill="url(#sammy-body)" stroke="#A06808" strokeWidth="2" strokeLinejoin="round"
          />

          {/* Highlight sheen on left face */}
          <path
            d="M73 22 C64 30, 38 72, 30 122 Q28 130, 33 132 C40 78, 60 36, 73 22 Z"
            fill="url(#sammy-sheen)"
          />

          {/* Crimp seam — zigzag along top edges (the pastry signature) */}
          <path d="M46 50 L49 44 L53 50 L57 44 L61 50 L65 44 L69 48 L73 18"
            stroke="#B37A0A" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinejoin="round" />
          <path d="M104 50 L101 44 L97 50 L93 44 L89 50 L85 44 L81 48 L77 18"
            stroke="#B37A0A" strokeWidth="1.2" fill="none" opacity="0.45" strokeLinejoin="round" />

          {/* Fried surface texture — small bubbles */}
          <circle cx="48" cy="56" r="1.5" fill="#C28510" opacity="0.18" />
          <circle cx="97" cy="52" r="1.2" fill="#C28510" opacity="0.16" />
          <circle cx="40" cy="88" r="1.4" fill="#C28510" opacity="0.14" />
          <circle cx="108" cy="82" r="1.3" fill="#C28510" opacity="0.15" />
          <circle cx="62" cy="112" r="1.5" fill="#C28510" opacity="0.13" />
          <circle cx="90" cy="118" r="1.2" fill="#C28510" opacity="0.14" />
          <circle cx="52" cy="132" r="1.4" fill="#C28510" opacity="0.12" />
          <circle cx="102" cy="128" r="1.3" fill="#C28510" opacity="0.13" />
          <circle cx="75" cy="100" r="1.1" fill="#C28510" opacity="0.11" />

          {/* Left arm */}
          <path d="M26 108 Q10 102 5 86" stroke="#B37A0A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
          <ellipse cx="4" cy="84" rx="5" ry="4.5" fill="#E8B44C" stroke="#C49A20" strokeWidth="0.8" />

          {/* Right arm — wave animation */}
          <g className="sammy-arm-wave">
            <path d="M124 108 Q140 102 145 86" stroke="#B37A0A" strokeWidth="3.5" fill="none" strokeLinecap="round" />
            <ellipse cx="146" cy="84" rx="5" ry="4.5" fill="#E8B44C" stroke="#C49A20" strokeWidth="0.8" />
          </g>

          {/* Legs */}
          <path d="M55 150 L50 160" stroke="#B37A0A" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="49" cy="162" rx="5.5" ry="4" fill="#E8B44C" stroke="#C49A20" strokeWidth="0.8" />
          <path d="M95 150 L100 160" stroke="#B37A0A" strokeWidth="3.5" strokeLinecap="round" />
          <ellipse cx="101" cy="162" rx="5.5" ry="4" fill="#E8B44C" stroke="#C49A20" strokeWidth="0.8" />

          {/* Glasses — cyan frames (brand tie-in) */}
          <rect x="43" y="58" width="26" height="22" rx="7"
            fill="url(#sammy-lens)" stroke="var(--accent-cyan, #00C8FF)" strokeWidth="2.2" />
          <rect x="81" y="58" width="26" height="22" rx="7"
            fill="url(#sammy-lens)" stroke="var(--accent-cyan, #00C8FF)" strokeWidth="2.2" />
          <path d="M69 68 Q75 73 81 68" stroke="var(--accent-cyan, #00C8FF)" strokeWidth="2" fill="none" />
          <path d="M43 66 L35 62" stroke="var(--accent-cyan, #00C8FF)" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M107 66 L115 62" stroke="var(--accent-cyan, #00C8FF)" strokeWidth="1.8" strokeLinecap="round" />

          {/* Glasses glint — periodic shine */}
          <g className="sammy-glint">
            <rect x="50" y="60" width="2.5" height="18" rx="1.2"
              fill="white" opacity="0" transform="skewX(-10)" />
          </g>

          {/* Eyes — bigger, more expressive */}
          <g className="sammy-eyes">
            <circle cx="56" cy="70" r="5.5" fill="#1A1A1A" />
            <circle cx="58.5" cy="67.5" r="2.4" fill="white" />
            <circle cx="55.5" cy="72" r="0.8" fill="white" opacity="0.4" />
            <circle cx="94" cy="70" r="5.5" fill="#1A1A1A" />
            <circle cx="96.5" cy="67.5" r="2.4" fill="white" />
            <circle cx="93.5" cy="72" r="0.8" fill="white" opacity="0.4" />
          </g>

          {/* Mouth — changes per section */}
          <path d={dialogue.mouth} stroke="#6B4513" strokeWidth="2.2" fill="none" strokeLinecap="round">
            <animate attributeName="d" to={dialogue.mouth} dur="0.3s" fill="freeze" />
          </path>

          {/* Code badge — ties Sammy to developer identity */}
          <g transform="translate(52, 112)">
            <rect width="46" height="22" rx="5"
              fill="rgba(0,30,50,0.45)" stroke="rgba(0,200,255,0.55)" strokeWidth="1" />
            <text x="23" y="15.5" textAnchor="middle"
              fill="#00E5FF"
              fontFamily="var(--font-mono, monospace)" fontSize="12" fontWeight="700">
              &lt;/&gt;
            </text>
          </g>

          {/* Sparkles — proper SVG 4-point stars */}
          {dialogue.emotion === 'sparkle' && (
            <g>
              <g transform="translate(10, 30)">
                <path d="M0,-5 L1.2,-1.2 L5,0 L1.2,1.2 L0,5 L-1.2,1.2 L-5,0 L-1.2,-1.2 Z" fill="#FFD700">
                  <animate attributeName="opacity" values="0.15;1;0.15" dur="2s" repeatCount="indefinite" />
                </path>
              </g>
              <g transform="translate(138, 24)">
                <path d="M0,-4 L1,-1 L4,0 L1,1 L0,4 L-1,1 L-4,0 L-1,-1 Z" fill="#FFD700">
                  <animate attributeName="opacity" values="0.15;1;0.15" dur="2s" begin="0.7s" repeatCount="indefinite" />
                </path>
              </g>
              <g transform="translate(3, 72)">
                <path d="M0,-3.5 L0.9,-0.9 L3.5,0 L0.9,0.9 L0,3.5 L-0.9,0.9 L-3.5,0 L-0.9,-0.9 Z" fill="#FFD700">
                  <animate attributeName="opacity" values="0.15;1;0.15" dur="2s" begin="1.3s" repeatCount="indefinite" />
                </path>
              </g>
            </g>
          )}

          {/* Thinking bubbles */}
          {dialogue.emotion === 'think' && (
            <g>
              <circle cx="128" cy="32" r="4.5" fill="#D4930D" opacity="0.35" stroke="#B37A0A" strokeWidth="0.5">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" repeatCount="indefinite" />
              </circle>
              <circle cx="138" cy="18" r="5.5" fill="#D4930D" opacity="0.35" stroke="#B37A0A" strokeWidth="0.5">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" begin="0.25s" repeatCount="indefinite" />
              </circle>
              <circle cx="142" cy="4" r="3.5" fill="#D4930D" opacity="0.35" stroke="#B37A0A" strokeWidth="0.5">
                <animate attributeName="opacity" values="0.2;0.6;0.2" dur="1.5s" begin="0.5s" repeatCount="indefinite" />
              </circle>
            </g>
          )}
        </svg>

        {/* Name badge */}
        <p
          className="text-center text-[0.6rem] font-bold tracking-[0.2em]"
          style={{ color: '#D4930D', fontFamily: 'var(--font-mono)', marginTop: -2, opacity: 0.8 }}
        >
          SAMMY
        </p>
      </motion.div>

      {/* Minimize */}
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
          transform-origin: 125px 108px;
          animation: sammy-wave 6s ease-in-out infinite;
        }
        @keyframes sammy-wave {
          0%, 85%, 100% { transform: rotate(0deg); }
          88% { transform: rotate(-15deg); }
          91% { transform: rotate(12deg); }
          94% { transform: rotate(-10deg); }
          97% { transform: rotate(5deg); }
        }
        .sammy-steam path {
          animation: sammy-rise 2.8s ease-in-out infinite;
        }
        .sammy-steam path:nth-child(2) { animation-delay: 0.5s; }
        .sammy-steam path:nth-child(3) { animation-delay: 1s; }
        @keyframes sammy-rise {
          0%, 100% { opacity: 0; transform: translateY(0); }
          40%, 60% { opacity: 0.45; }
          50% { transform: translateY(-5px); }
        }
        .sammy-glint rect {
          animation: sammy-glint-sweep 7s ease-in-out infinite;
        }
        @keyframes sammy-glint-sweep {
          0%, 86%, 100% { opacity: 0; transform: translateX(-12px) skewX(-10deg); }
          90% { opacity: 0.55; }
          94% { opacity: 0; transform: translateX(28px) skewX(-10deg); }
        }
      `}</style>
    </motion.div>
  );
}
