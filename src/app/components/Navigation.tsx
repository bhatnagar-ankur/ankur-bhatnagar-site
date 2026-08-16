import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, LayoutGroup } from 'motion/react';
import { Menu, X, Share2, FileDown, Mail, Sun, Moon } from 'lucide-react';
import { useSound } from '../providers/SoundProvider';
import { SettingsMenu } from './SettingsMenu';
import { OrbitMascot } from './OrbitMascot';
import { useTheme } from '../providers/ThemeProvider';

const resumeUrl = new URL('../../imports/Ankur_Bhatnagar_Resume.pdf', import.meta.url).href;

const navItems = [
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'ai-practice', label: 'AI Practice' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'open-source', label: 'Open Source' },
  { id: 'achievements', label: 'Awards' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

export function Navigation() {
  const { playSound } = useSound();
  const { theme, displayMode } = useTheme();
  const { scrollYProgress, scrollY } = useScroll();
  const darkNavBg = useTransform(scrollY, [0, 200], ['rgba(13,17,23,0.98)', 'rgba(13,17,23,0.75)']);
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);
  const scrollLockRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setShareOpen(false);
      setMobileMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSharePDF = () => {
    playSound('success');
    setShareOpen(false);
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'Ankur_Bhatnagar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShareEmail = () => {
    playSound('success');
    setShareOpen(false);
    const subject = encodeURIComponent('Resume – Ankur Bhatnagar | Technical Architect & UI/UX Practice Head');
    const body = encodeURIComponent(
      `Hi,\n\nPlease find the interactive resume of Ankur Bhatnagar below:\n\n${window.location.href}\n\nAnkur is a Technical Architect & UI/UX Practice Head with 13+ years of experience, based in Bengaluru, India.\n\nBest regards`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareItems = [
    { label: 'Download Resume', icon: <FileDown size={15} />, action: handleSharePDF },
    { label: 'Share via Email', icon: <Mail size={15} />, action: handleShareEmail }
  ];

  useEffect(() => {
    const detect = () => {
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollY = window.scrollY;
      const viewportH = window.innerHeight;
      const atBottom = scrollY + viewportH >= document.documentElement.scrollHeight - 5;
      const trigger = atBottom ? scrollY + viewportH : scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= trigger) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    const handleScroll = () => {
      const sy = window.scrollY;
      setIsScrolled(sy > 100);
      setShowScrollTop(sy > 500);

      if (scrollLockRef.current) {
        // Extend the lock on every scroll event — releases 150ms after scrolling stops
        clearTimeout(scrollLockRef.current);
        scrollLockRef.current = setTimeout(() => {
          scrollLockRef.current = null;
          detect();
        }, 150);
        return;
      }

      detect();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      playSound('transition');
      setActiveSection(id);
      if (scrollLockRef.current) clearTimeout(scrollLockRef.current);
      scrollLockRef.current = setTimeout(() => { scrollLockRef.current = null; }, 100);
      const rawY = element.getBoundingClientRect().top + window.scrollY - 80;
      setMobileMenuOpen(false);
      setTimeout(() => window.scrollTo({ top: rawY, behavior: 'smooth' }), 10);
    }
  };

  const scrollToTop = () => {
    playSound('whoosh');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: (theme !== 'light' && displayMode !== 'sunlight')
            ? darkNavBg
            : isScrolled ? 'var(--nav-bg-scrolled)' : 'transparent',
          backdropFilter: isScrolled ? 'var(--glass-filter)' : 'none',
          WebkitBackdropFilter: isScrolled ? 'var(--glass-filter)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--glass-border)' : 'none',
          boxShadow: isScrolled ? `var(--nav-shadow), inset 0 -1px 0 rgba(255, 255, 255, 0.04)` : 'none',
          transition: 'border-bottom 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
        }}
      >
        {/* Scroll progress bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 origin-left"
          style={{
            scaleX: scrollYProgress,
            background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-amber))',
            boxShadow: '0 0 6px rgba(var(--accent-cyan-rgb), 0.6)'
          }}
        />

        <div className="resume-container py-4 flex items-center justify-between">
          {/* Logo — Orbit mascot + A.BHATNAGAR wordmark */}
          <div className="flex items-center gap-3">
            <OrbitMascot size={46} onClick={scrollToTop} growOnScroll />
            <button
              onClick={scrollToTop}
              style={{ fontFamily: 'var(--font-ui)' }}
              className="text-xl font-bold tracking-wider hover:opacity-80 transition-opacity"
            >
              <span style={{ color: 'var(--accent-cyan)' }}>A.</span>
              <span style={{ color: 'var(--text-primary)' }}>BHATNAGAR</span>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <LayoutGroup id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative px-4 py-2 rounded-lg"
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.875rem',
                    color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)',
                    transition: 'color 0.2s ease',
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg"
                      style={{ background: 'rgba(var(--accent-cyan-rgb), 0.1)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
                    />
                  )}
                  <span className="relative" style={{ zIndex: 1 }}>{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute bottom-1 left-2 right-2 h-px"
                      style={{ background: 'var(--accent-cyan)', zIndex: 1 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 0.8 }}
                    />
                  )}
                </button>
              );
            })}
            </LayoutGroup>

            <SettingsMenu />

            {/* Share Button */}
            <div ref={shareRef} className="relative ml-2">
              <button
                onClick={() => setShareOpen(!shareOpen)}
                aria-label="Share"
                title="Share"
                className="flex items-center justify-center w-9 h-9 rounded-lg border transition-all hover:scale-105"
                style={{
                  borderColor: 'var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                  background: shareOpen ? 'rgba(var(--accent-cyan-rgb), 0.15)' : 'rgba(var(--accent-cyan-rgb), 0.05)'
                }}
              >
                <Share2 size={16} />
              </button>

              <AnimatePresence>
                {shareOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 rounded-2xl border overflow-hidden z-50"
                    style={{
                      background: 'var(--glass-bg)',
                      backdropFilter: 'var(--glass-filter)',
                      WebkitBackdropFilter: 'var(--glass-filter)',
                      borderColor: 'var(--accent-cyan)',
                      boxShadow: '0 8px 30px rgba(var(--accent-cyan-rgb), 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    {shareItems.map(({ label, icon, action }) => (
                      <button
                        key={label}
                        onClick={action}
                        className="w-full flex items-center gap-3 px-4 py-3 transition-all text-left hover:bg-cyan-500/10"
                        style={{
                          fontFamily: 'var(--font-ui)',
                          fontSize: '0.8125rem',
                          color: 'var(--text-primary)'
                        }}
                      >
                        <span style={{ color: 'var(--accent-cyan)' }}>{icon}</span>
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <BulbToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
            style={{ color: 'var(--accent-cyan)' }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t"
              style={{
                background: 'var(--glass-bg)',
                backdropFilter: 'var(--glass-filter)',
                WebkitBackdropFilter: 'var(--glass-filter)',
                borderColor: 'var(--glass-border)',
              }}
            >
              <div className="px-6 py-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="w-full text-left px-4 py-3 rounded-lg transition-all"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: activeSection === item.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                      background: activeSection === item.id ? 'rgba(var(--accent-cyan-rgb), 0.1)' : 'transparent'
                    }}
                  >
                    {item.label}
                  </button>
                ))}

                <div className="pt-2 border-t" style={{ borderColor: 'var(--bg-border)' }}>
                  <p
                    className="px-4 py-2 text-xs uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)' }}
                  >
                    Share Profile
                  </p>
                  {shareItems.map(({ label, icon, action }) => (
                    <button
                      key={label}
                      onClick={action}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                      style={{
                        fontFamily: 'var(--font-ui)',
                        color: 'var(--accent-cyan)',
                        fontSize: '0.875rem'
                      }}
                    >
                      {icon}
                      {label}
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t flex items-center justify-between" style={{ borderColor: 'var(--bg-border)' }}>
                  <p
                    className="px-4 text-xs uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)' }}
                  >
                    Display
                  </p>
                  <div className="flex items-center gap-1 pr-2">
                    <SettingsMenu />
                    <MobileBulbToggle />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll to Top — Orbit mascot with scroll-progress ring */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.3, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.3, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18, mass: 0.7 }}
            className="fixed bottom-8 left-8 z-50"
          >
            <OrbitMascot size={68} onClick={scrollToTop} hint hintText="Back to top" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const sparkPositions = [
  { dx: -18, dy: -2, angle: -40 },
  { dx: 20,  dy:  0, angle:  40 },
  { dx: -14, dy: 16, angle: -110 },
  { dx: 16,  dy: 18, angle:  110 },
];

function Sparks() {
  return (
    <>
      {sparkPositions.map((s, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            top: '35%',
            left: '50%',
            pointerEvents: 'none',
            rotate: s.angle,
          }}
          initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
          animate={{
            x: s.dx,
            y: s.dy,
            opacity: [0, 1, 0.8, 0],
            scale: [0.3, 1, 0.7, 0],
          }}
          transition={{
            duration: 0.75,
            delay: i * 0.06,
            repeat: Infinity,
            repeatDelay: 2.8 + i * 0.45,
            ease: 'easeOut',
          }}
        >
          <svg width="8" height="11" viewBox="0 0 8 11" fill="#FFD700">
            <path d="M5 0 L2 5 L4 5 L2 11 L8 5 L5 5 Z" />
          </svg>
        </motion.div>
      ))}
    </>
  );
}

function BulbSvg({ isOn }: { isOn: boolean }) {
  const stroke   = isOn ? '#FFB800' : 'var(--text-muted)';
  const fill     = isOn ? 'rgba(255,248,180,0.88)' : 'rgba(255,255,255,0.04)';
  const filament = isOn ? '#FF9500' : 'var(--text-muted)';

  return (
    <svg width="26" height="36" viewBox="0 0 26 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: 'rotate(180deg)' }}>
      {isOn && (
        <defs>
          <filter id="bulb-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      )}

      {/* Globe body */}
      <path
        d="M 9 25 C 2 21 1 9 13 2 C 25 9 24 21 17 25 Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinejoin="round"
        filter={isOn ? 'url(#bulb-glow)' : undefined}
      />

      {/* Inner glow disc */}
      {isOn && <ellipse cx="13" cy="14" rx="6" ry="7" fill="rgba(255,240,100,0.18)" />}

      {/* Filament W-shape */}
      <path
        d="M 9.5 22 L 11 16 L 13 19 L 15 15 L 16.5 22"
        stroke={filament}
        strokeWidth={isOn ? 1.3 : 0.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={isOn ? 1 : 0.3}
        filter={isOn ? 'url(#bulb-glow)' : undefined}
      />

      {/* Base cap */}
      <line x1="9"   y1="26"   x2="17"   y2="26"   stroke={stroke} strokeWidth="1.5" strokeLinecap="round" />
      {/* Screw ridges */}
      <line x1="8.5" y1="28.5" x2="17.5" y2="28.5" stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="9"   y1="31"   x2="17"   y2="31"   stroke={stroke} strokeWidth="1.4" strokeLinecap="round" />
      <line x1="9.5" y1="33.5" x2="16.5" y2="33.5" stroke={stroke} strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

const WIRE_H = 88;

function WireElectricity() {
  const segCount = 8;
  const segH = WIRE_H / segCount;
  let d = 'M 5 0';
  for (let i = 1; i <= segCount; i++) {
    const x = i === segCount ? 5 : i % 2 === 1 ? 2 : 8;
    d += ` L ${x} ${Math.round(i * segH)}`;
  }
  return (
    <motion.svg
      width="10"
      height={WIRE_H}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        pointerEvents: 'none',
        overflow: 'visible',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.65, times: [0, 0.1, 0.7, 1] }}
    >
      <defs>
        <filter id="wire-elec-glow" x="-200%" y="-10%" width="500%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <motion.path
        d={d}
        stroke="#FFE040"
        strokeWidth="1.8"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter="url(#wire-elec-glow)"
        initial={{ pathLength: 0, opacity: 1 }}
        animate={{ pathLength: 1, opacity: [1, 1, 0] }}
        transition={{ duration: 0.5, ease: 'easeIn', opacity: { delay: 0.35, duration: 0.3 } }}
      />
    </motion.svg>
  );
}

function MobileBulbToggle() {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSound();
  const isLight = theme === 'light';

  const handleToggle = () => {
    playSound(isLight ? 'bulb-off' : 'bulb-on');
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="flex items-center justify-center w-9 h-9 rounded-lg border transition-all hover:scale-105"
      style={{
        borderColor: 'var(--accent-cyan)',
        color: 'var(--accent-cyan)',
        background: 'rgba(var(--accent-cyan-rgb), 0.05)'
      }}
    >
      {isLight ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}

function BulbToggle() {
  const { theme, toggleTheme } = useTheme();
  const { playSound } = useSound();
  const isOn = theme === 'light';
  const [swingKey, setSwingKey] = useState(0);
  const [showElectricity, setShowElectricity] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    setShowTooltip(true);
  }, []);

  useEffect(() => {
    if (!showTooltip) return;
    const dismiss = () => {
      setShowTooltip(false);
    };
    const timer = setTimeout(dismiss, 4000);
    window.addEventListener('scroll', dismiss, { once: true, passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', dismiss);
    };
  }, [showTooltip]);

  const handleToggle = () => {
    setShowTooltip(false);
    const turningOn = !isOn;
    playSound(isOn ? 'bulb-off' : 'bulb-on');
    toggleTheme();
    setSwingKey(k => k + 1);
    if (turningOn) {
      setShowElectricity(true);
      setTimeout(() => setShowElectricity(false), 750);
    }
  };

  return (
    <div className="relative ml-3" style={{ alignSelf: 'stretch', pointerEvents: 'none', minWidth: 38 }}>
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.3 }}
            className="flex items-center"
            style={{
              position: 'absolute',
              top: WIRE_H + 24,
              right: '100%',
              marginRight: 8,
              transform: 'translateY(-50%)',
              zIndex: 48,
              pointerEvents: 'none',
            }}
          >
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <div style={{
                padding: '5px 10px',
                borderRadius: 6,
                border: '1px solid rgba(var(--accent-amber-rgb),0.45)',
                background: 'rgba(13,17,23,0.9)',
                backdropFilter: 'blur(8px)',
                whiteSpace: 'nowrap',
              }}>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', fontSize: '0.6875rem', letterSpacing: '0.03em' }}>
                  Toggle the light
                </span>
              </div>
              <div style={{
                width: 0, height: 0,
                borderTop: '5px solid transparent',
                borderBottom: '5px solid transparent',
                borderLeft: '6px solid rgba(var(--accent-amber-rgb),0.45)',
                marginLeft: -1, flexShrink: 0,
              }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
        <motion.div
          key={swingKey === 0 ? 'init' : swingKey}
          initial={{ rotate: 0 }}
          animate={{ rotate: swingKey > 0 ? [0, 14, -10, 7, -4, 2, -1, 0] : 0 }}
          transition={{ duration: 1.25, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            transformOrigin: '50% 0%',
            pointerEvents: 'auto',
            zIndex: 49,
          }}
        >
        {/* Hanging wire */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: 2,
              height: WIRE_H,
              background: isOn
                ? 'linear-gradient(to bottom, rgba(200,140,0,0.25), rgba(200,140,0,0.65))'
                : 'linear-gradient(to bottom, rgba(139,148,158,0.15), rgba(139,148,158,0.45))',
              transition: 'background 0.5s',
            }}
          />
          <AnimatePresence>
            {showElectricity && <WireElectricity key={swingKey} />}
          </AnimatePresence>
        </div>

        {/* Bulb button */}
        <motion.button
          onClick={handleToggle}
          onMouseEnter={() => playSound('hover')}
          whileHover={{ scale: 1.13 }}
          whileTap={{ scale: 0.87 }}
          aria-label={isOn ? 'Switch to dark mode' : 'Switch to light mode'}
          title={isOn ? 'Click to darken' : 'Click to illuminate'}
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Ambient glow halo */}
          <AnimatePresence>
            {isOn && (
              <motion.div
                key="halo"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: [0.45, 0.85, 0.45], scale: 1 }}
                exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
                transition={{
                  opacity: { duration: 2.8, repeat: Infinity, ease: 'easeInOut' },
                  scale: { duration: 0.35 },
                }}
                style={{
                  position: 'absolute',
                  inset: -18,
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(255,210,0,0.55) 0%, rgba(255,140,0,0.2) 48%, transparent 72%)',
                  pointerEvents: 'none',
                }}
              />
            )}
          </AnimatePresence>

          {/* Electricity sparks */}
          <AnimatePresence>
            {isOn && <Sparks key="sparks" />}
          </AnimatePresence>

          <BulbSvg isOn={isOn} />
        </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
