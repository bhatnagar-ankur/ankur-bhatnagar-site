import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Summary } from './components/Summary';
import { Skills } from './components/Skills';
import { AISection } from './components/AISection';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { BlueprintCursor } from './components/BlueprintCursor';
import { SammyMascot } from './components/SammyMascot';
import { SectionConnector } from './components/SectionConnector';
import { useFavicon } from './components/useFavicon';
import { ThemeProvider } from './components/ThemeProvider';
import { SoundProvider } from './components/SoundProvider';

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
];

function AppContent() {
  const [konamiActive, setKonamiActive] = useState(false);

  // Developer console message
  useEffect(() => {
    console.log(
      '%c A.BHATNAGAR ',
      'background:#0D1117;color:#00C8FF;font-size:18px;font-weight:700;padding:6px 14px;border:1px solid #00C8FF;letter-spacing:3px;font-family:monospace;'
    );
    console.log(
      '%c Technical Architect & UI/UX Practice Head',
      'color:#F0883E;font-size:12px;padding:2px 0;font-family:monospace;'
    );
    console.log(
      '%c\n👋 Hey developer — nice instinct checking under the hood.\n\n⚡ Stack:  React 18 + TypeScript + Vite 6\n🎨 Style:  Tailwind v4 + CSS custom properties\n🎞  Motion: Framer Motion v12\n🏗  Theme:  Blueprint-inspired design system\n🤖 AI:     Claude (Anthropic) + GitHub Copilot\n\n📧 bhatnagar018@gmail.com\n',
      'color:#8B949E;font-size:11px;line-height:1.9;font-family:monospace;'
    );
    console.log(
      '%c → Try the Konami code for a surprise: ↑ ↑ ↓ ↓ ← → ← → B A',
      'color:#3FB950;font-size:10px;font-style:italic;font-family:monospace;'
    );
  }, []);

  // Konami code easter egg
  useEffect(() => {
    let seq: string[] = [];

    const handleKey = (e: KeyboardEvent) => {
      seq = [...seq.slice(-(KONAMI.length - 1)), e.key];
      if (seq.length === KONAMI.length && seq.every((k, i) => k === KONAMI[i])) {
        setKonamiActive(true);
        setTimeout(() => setKonamiActive(false), 5000);
      }
    };

    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <div className="min-h-screen" style={{
      fontFamily: 'var(--font-body)',
      background: 'var(--bg-deep)',
      color: 'var(--text-primary)'
    }}>
      <BlueprintCursor />
      <SammyMascot />
      <Navigation />
      <Hero />

      <SectionConnector label="PROFESSIONAL SUMMARY" variant="deep-to-surface" />
      <Summary />

      <SectionConnector label="TECHNICAL PROFILE" variant="surface-to-deep" />
      <Skills />

      <SectionConnector label="AI LEADERSHIP" variant="deep-to-surface" />
      <AISection />

      <SectionConnector label="CAREER TIMELINE" variant="deep-to-surface" />
      <Experience />

      <SectionConnector label="DELIVERED WORK" variant="surface-to-deep" />
      <Projects />

      <SectionConnector label="RECOGNITION" variant="deep-to-surface" />
      <Achievements />

      <SectionConnector label="FOUNDATIONS" variant="surface-to-deep" />
      <Education />

      <SectionConnector label="GET IN TOUCH" variant="deep-to-surface" />
      <Contact />

      {/* Konami Easter Egg Toast */}
      <AnimatePresence>
        {konamiActive && (
          <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 rounded-lg border"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--accent-cyan)',
              boxShadow: '0 0 40px rgba(0, 200, 255, 0.35), 0 8px 32px rgba(0,0,0,0.4)',
              minWidth: '280px',
              maxWidth: '360px'
            }}
          >
            <p
              className="text-xs uppercase tracking-widest mb-1"
              style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}
            >
              ◉ EASTER EGG FOUND
            </p>
            <p
              className="text-sm font-bold mb-1"
              style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
            >
              Achievement Unlocked: Architect Mode 🏗️
            </p>
            <p
              className="text-xs leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}
            >
              You clearly read documentation. We respect that.
            </p>
            {/* Blueprint corner accent */}
            <div
              className="absolute top-0 right-0 w-5 h-5 border-t border-r rounded-tr-lg"
              style={{ borderColor: 'var(--accent-amber)' }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  useFavicon('⚡');

  return (
    <ThemeProvider>
      <SoundProvider>
        <AppContent />
      </SoundProvider>
    </ThemeProvider>
  );
}
