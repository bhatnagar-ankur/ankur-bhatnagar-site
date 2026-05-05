import { motion } from 'motion/react';
import { ChevronDown, MapPin, Phone, Mail, Linkedin, Github } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import profileImage from '@/assets/profile.jpg';

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const roles = [
    'Technical Architect',
    'UI/UX Practice Head',
    'Frontend Technologist',
    'Team Leader & Mentor'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = () => {
    const summarySection = document.getElementById('summary');
    summarySection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20" style={{ background: 'var(--bg-deep)' }}>
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(var(--accent-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--accent-cyan) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridFade 4s ease-in-out infinite alternate'
        }} />
      </div>

      <style>{`
        @keyframes gridFade {
          0% { opacity: 0.1; }
          100% { opacity: 0.3; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(0, 200, 255, 0.4), 0 0 80px rgba(0, 200, 255, 0.2); }
          50% { box-shadow: 0 0 60px rgba(0, 200, 255, 0.6), 0 0 100px rgba(0, 200, 255, 0.3); }
        }
      `}</style>

      <div className="relative z-0 max-w-6xl mx-auto px-6 text-center">
        {/* Profile Image with Experience Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className="relative inline-block mb-8"
        >
          {/* Profile Image Container */}
          <div className="relative group">
            {/* Decorative Blueprint Corners */}
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
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden border-4 backdrop-blur-sm cursor-pointer"
              style={{
                borderColor: 'var(--accent-cyan)',
                background: 'var(--bg-surface)',
                animation: 'pulse-glow 3s ease-in-out infinite'
              }}
            >
              <ImageWithFallback
                src={profileImage}
                alt="Ankur Bhatnagar"
                className="w-full h-full object-cover"
              />
              
              {/* Gradient Overlay */}
              <div 
                className="absolute inset-0 opacity-20 group-hover:opacity-10 transition-opacity"
                style={{
                  background: 'linear-gradient(135deg, rgba(0, 200, 255, 0.3) 0%, rgba(240, 136, 62, 0.3) 100%)'
                }}
              />
            </motion.div>

            {/* Animated Particles on Hover */}
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <motion.div
                className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full"
                style={{ background: 'var(--accent-cyan)' }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
              />
              <motion.div
                className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full"
                style={{ background: 'var(--accent-amber)' }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.3, repeatDelay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full"
                style={{ background: 'var(--accent-cyan)' }}
                animate={{
                  y: [-20, -40, -20],
                  opacity: [0, 1, 0],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6, repeatDelay: 0.5 }}
              />
            </div>
          </div>

          {/* Experience Badge - Below Image */}
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
              <span style={{
                color: 'var(--accent-cyan)',
                fontFamily: 'var(--font-mono)'
              }} className="text-xl font-semibold tracking-wider">
                {Math.floor((new Date().getTime() - new Date('2013-06-01').getTime()) / (1000 * 60 * 60 * 24 * 365.25))}+ YEARS
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ 
            fontFamily: 'var(--font-display)',
            color: 'var(--text-primary)'
          }}
          className="text-6xl md:text-8xl font-bold tracking-wider mb-6"
        >
          ANKUR BHATNAGAR
        </motion.h1>

        {/* Animated Role Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-16 mb-8"
        >
          <motion.h2
            key={currentRole}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            style={{ 
              fontFamily: 'var(--font-body)',
              color: 'var(--accent-cyan)'
            }}
            className="text-2xl md:text-4xl tracking-wide"
          >
            {roles[currentRole]}
          </motion.h2>
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
          <ContactButton icon={<Phone size={20} />} label="+91-7259901002" href="tel:+917259901002" />
          <ContactButton icon={<Mail size={20} />} label="bhatnagar018@gmail.com" href="mailto:bhatnagar018@gmail.com" />
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
            fontFamily: 'var(--font-mono)'
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
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
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