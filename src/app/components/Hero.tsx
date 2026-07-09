import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { ChevronDown, MapPin, Linkedin, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSound } from './SoundProvider';
import { ImageWithFallback } from './ImageWithFallback';
import profilePic from '../../imports/Profile_Pic.jpg';
import { yearsOfExperience } from '../lib/constants';

const roles = [
  'Technical Architect',
  'UI/UX Practice Head',
  'Frontend Technologist',
  'Team Leader & Mentor'
];

export function Hero() {
  const { playSound } = useSound();
  const [currentRole, setCurrentRole] = useState(0);
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
    const summarySection = document.getElementById('summary');
    summarySection?.scrollIntoView({ behavior: 'smooth' });
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

            {/* Profile Image */}
            <motion.div
              whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-48 h-48 md:w-64 md:h-64 xl:w-80 xl:h-80 2xl:w-96 2xl:h-96 3xl:w-[28rem] 3xl:h-[28rem] 4xl:w-[36rem] 4xl:h-[36rem] rounded-2xl overflow-hidden border-4 backdrop-blur-sm cursor-pointer anim-pulse-glow"
              style={{
                borderColor: 'var(--accent-cyan)',
                background: 'var(--bg-surface)'
              }}
            >
              <ImageWithFallback
                src={profilePic}
                alt="Ankur Bhatnagar"
                className="w-full h-full object-cover object-top"
              />
              <div
                className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 200, 255, 0.3) 0%, rgba(240, 136, 62, 0.3) 100%)'
                }}
              />
            </motion.div>

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
                background: 'rgba(0, 200, 255, 0.1)',
                boxShadow: '0 0 30px rgba(0, 200, 255, 0.3)'
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
          className="h-16 mb-8 flex items-center justify-center"
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

        {/* Location */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex items-center justify-center gap-2 mb-12"
          style={{ color: 'var(--text-muted)' }}
        >
          <MapPin size={20} style={{ color: 'var(--accent-amber)' }} />
          <span style={{ fontFamily: 'var(--font-body)' }} className="text-lg">
            Bengaluru, India
          </span>
        </motion.div>

        {/* Contact Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
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
          <span className="text-sm tracking-wider">SCROLL TO EXPLORE</span>
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
      <span style={{ color: 'var(--accent-cyan)' }} className="transition-colors group-hover:drop-shadow-[0_0_8px_rgba(0,200,255,0.8)]">
        {icon}
      </span>
      <span className="text-sm">{label}</span>
    </a>
  );
}
