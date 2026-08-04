import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MapPin, Linkedin, Github, FileDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSound } from '../providers/SoundProvider';
import { ImageWithFallback } from './ImageWithFallback';
import profileAnime from '../../imports/Profile_Anime.png';
import profilePic from '../../imports/Profile_Pic.jpg';
import { yearsOfExperience } from '../lib/constants';
import { HeroBackground } from './HeroBackground';

const resumeUrl = new URL('../../imports/Ankur_Bhatnagar_Resume.pdf', import.meta.url).href;

const roles = [
  'Technical Architect',
  'UI/UX Practice Head',
  'Frontend Technologist',
  'Team Leader & Mentor'
];

export function Hero() {
  const { playSound } = useSound();
  const [currentRole, setCurrentRole] = useState(0);
  const [isImageFlipped, setIsImageFlipped] = useState(false);
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 600], [0, -120]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = () => {
    playSound('transition');
    const projectsSection = document.getElementById('projects');
    projectsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: 'var(--bg-deep)' }}>
      {/* Parallax Blueprint Grid */}
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{ y: gridY }}
      >
        <div className="absolute inset-0 blueprint-grid anim-grid-fade" />
      </motion.div>

      {/* Neural architecture background — constellation + circuit traces */}
      <HeroBackground />

      <div className="relative z-0 resume-container text-center">
        {/* Profile Image with Experience Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="relative inline-block mb-8"
        >
          <div className="relative group">
            {/* Blueprint Corner Decorators */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 transition-all group-hover:scale-110 group-hover:w-16 group-hover:h-16"
              style={{ borderColor: 'var(--accent-cyan)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 transition-all group-hover:scale-110 group-hover:w-16 group-hover:h-16"
              style={{ borderColor: 'var(--accent-amber)' }}
            />

            {/* Profile Image — flip card: anime front / real photo back */}
            <div
              className="relative w-48 h-48 md:w-64 md:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 3xl:w-[28rem] 3xl:h-[28rem] 4xl:w-[36rem] 4xl:h-[36rem]"
              style={{ perspective: '1000px' }}
              onMouseEnter={() => { setIsImageFlipped(true); playSound('hover'); }}
              onMouseLeave={() => setIsImageFlipped(false)}
            >
              <motion.div
                animate={{ rotateY: isImageFlipped ? 180 : 0 }}
                transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
                whileTap={{ scale: 0.95 }}
                style={{
                  transformStyle: 'preserve-3d',
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  cursor: 'pointer',
                }}
              >
                {/* Front face: anime illustration */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden border-4 backdrop-blur-sm anim-pulse-glow"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    borderColor: 'var(--accent-cyan)',
                    background: 'var(--bg-surface)',
                  }}
                >
                  <ImageWithFallback
                    src={profileAnime}
                    alt="Ankur Bhatnagar — illustrated"
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute inset-0 opacity-20 transition-opacity"
                    style={{
                      background: 'linear-gradient(135deg, rgba(var(--accent-cyan-rgb), 0.3) 0%, rgba(var(--accent-amber-rgb), 0.3) 100%)'
                    }}
                  />
                  {/* Flip hint */}
                  <div
                    className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-[0.55rem] tracking-widest select-none"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-cyan)',
                      background: 'rgba(var(--accent-cyan-rgb), 0.12)',
                      border: '1px solid rgba(var(--accent-cyan-rgb), 0.25)',
                    }}
                  >
                    HOVER ↕
                  </div>
                </div>

                {/* Back face: real photo */}
                <div
                  className="absolute inset-0 rounded-2xl overflow-hidden border-4 backdrop-blur-sm"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    borderColor: 'var(--accent-amber)',
                    background: 'var(--bg-surface)',
                  }}
                >
                  <ImageWithFallback
                    src={profilePic}
                    alt="Ankur Bhatnagar"
                    className="w-full h-full object-cover object-top"
                  />
                  <div
                    className="absolute bottom-2 left-2 px-2 py-0.5 rounded-full text-[0.55rem] tracking-widest select-none"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--accent-amber)',
                      background: 'rgba(var(--accent-amber-rgb), 0.12)',
                      border: '1px solid rgba(var(--accent-amber-rgb), 0.25)',
                    }}
                  >
                    THE REAL ONE
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Hover Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {[
                { top: '25%', left: '25%', color: 'var(--accent-cyan)', delay: 0 },
                { top: '33%', right: '25%', color: 'var(--accent-amber)', delay: 0.3 },
                { bottom: '33%', left: '33%', color: 'var(--accent-cyan)', delay: 0.6 }
              ].map((p, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{ background: p.color, top: p.top, left: p.left, right: (p as { right?: string }).right, bottom: (p as { bottom?: string }).bottom }}
                  animate={{ y: [-20, -40, -20], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: p.delay, repeatDelay: 0.5 }}
                />
              ))}
            </div>
          </div>

          {/* Experience Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-6"
          >
            <div
              className="inline-block px-6 py-3 rounded-full border-2 backdrop-blur-sm"
              style={{
                borderColor: 'var(--accent-cyan)',
                background: 'rgba(var(--accent-cyan-rgb), 0.1)',
                boxShadow: '0 0 30px rgba(var(--accent-cyan-rgb), 0.3)'
              }}
            >
              <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }} className="text-xl font-semibold tracking-wider">
                {yearsOfExperience}+ YEARS
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}
          className="fluid-hero-name font-bold tracking-wider mb-6"
        >
          ANKUR BHATNAGAR
        </motion.h1>

        {/* Role Subtitle — AnimatePresence for proper enter/exit */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-16 mb-4 flex items-center justify-center"
        >
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentRole}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(4px)' }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              style={{ fontFamily: 'var(--font-body)', color: 'var(--accent-cyan)' }}
              className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl 3xl:text-6xl tracking-wide"
            >
              {roles[currentRole]}
            </motion.h2>
          </AnimatePresence>
        </motion.div>

        {/* Value proposition tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          style={{ fontFamily: 'var(--font-body)', color: 'var(--text-primary)' }}
          className="text-base md:text-lg xl:text-xl max-w-3xl mx-auto mb-5 leading-relaxed px-4"
        >
          Enterprise frontend systems on Angular, React &amp; Azure — leading 20+ engineers with an AI-first delivery model that ships faster and holds the line on quality.
        </motion.p>

        {/* Stat band */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex items-center justify-center mb-5"
        >
          {[
            { value: `${yearsOfExperience}+`, label: 'Years' },
            { value: '20+', label: 'Engineers Led' },
            { value: 'AI-First', label: 'Delivery' },
          ].map((s, i) => (
            <div key={s.label} className="flex items-center">
              {i > 0 && (
                <div style={{ width: 1, height: 28, background: 'var(--bg-border)', margin: '0 20px' }} />
              )}
              <div className="text-center">
                <div style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-cyan)', fontSize: 'clamp(1.125rem, 2.2vw, 1.5rem)', fontWeight: 700, lineHeight: 1.1 }}>
                  {s.value}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.625rem', letterSpacing: '0.1em', marginTop: 3 }}>
                  {s.label.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.72 }}
          className="flex items-center justify-center gap-2 mb-4"
          style={{ color: 'var(--text-muted)' }}
        >
          <MapPin size={20} style={{ color: 'var(--accent-amber)' }} />
          <span style={{ fontFamily: 'var(--font-body)' }} className="text-lg">
            Bengaluru, India
          </span>
        </motion.div>

        {/* Company / credential strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.78 }}
          className="flex items-center justify-center gap-3 mb-10"
        >
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', fontSize: '0.6875rem', letterSpacing: '0.04em' }}>▸ Saksoft Ltd</span>
          <span style={{ color: 'var(--bg-border)' }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.6875rem', letterSpacing: '0.04em' }}>DreamOrbit</span>
          <span style={{ color: 'var(--bg-border)' }}>·</span>
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', fontSize: '0.6875rem', letterSpacing: '0.04em' }}>ISRO Certified</span>
        </motion.div>

        {/* Primary CTA — Download Resume */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.82 }}
          className="mb-4"
        >
          <a
            href={resumeUrl}
            download="Ankur_Bhatnagar_Resume.pdf"
            onClick={() => playSound('success')}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-xl font-semibold tracking-wide transition-all hover:scale-105 hover:brightness-110 active:scale-95"
            style={{
              background: 'var(--accent-cyan)',
              color: 'var(--bg-deep)',
              fontFamily: 'var(--font-ui)',
              fontSize: '0.9375rem',
              boxShadow: '0 0 24px rgba(var(--accent-cyan-rgb), 0.35)',
            }}
          >
            <FileDown size={18} />
            Download Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.92 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-16"
        >
          <ContactButton icon={<Linkedin size={20} />} label="LinkedIn" href="https://www.linkedin.com/in/bhatnagar-ankur" />
          <ContactButton icon={<Github size={20} />} label="GitHub" href="https://github.com/bhatnagar-ankur" />
        </motion.div>

        {/* Scroll CTA */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          onClick={scrollToSection}
          className="group flex items-center gap-2 mx-auto px-6 py-3 rounded-full border backdrop-blur-sm transition-all hover:scale-105"
          style={{
            borderColor: 'var(--accent-cyan)',
            color: 'var(--accent-cyan)',
            fontFamily: 'var(--font-ui)'
          }}
        >
          <span className="text-sm tracking-wider">SEE RECENT WORK</span>
          <ChevronDown size={20} className="animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}

function ContactButton({ icon, label, href }: { icon: React.ReactNode; label: string; href: string }) {
  const { playSound } = useSound();

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => playSound('click')}
      onMouseEnter={() => playSound('hover')}
      className="group flex items-center gap-3 px-5 py-3 rounded-lg border transition-all hover:scale-105"
      style={{
        borderColor: 'var(--bg-border)',
        background: 'var(--bg-surface)',
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)'
      }}
    >
      <span style={{ color: 'var(--accent-cyan)' }} className="transition-colors group-hover:drop-shadow-[0_0_8px_rgba(var(--accent-cyan-rgb),0.8)]">
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </a>
  );
}
