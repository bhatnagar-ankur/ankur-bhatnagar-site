import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronUp, Share2, FileDown, Mail } from 'lucide-react';

const navItems = [
  { id: 'summary', label: 'Summary' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'achievements', label: 'Awards' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const shareRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (shareRef.current && !shareRef.current.contains(e.target as Node)) {
        setShareOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSharePDF = () => {
    setShareOpen(false);
    window.print();
  };

  const handleShareEmail = () => {
    setShareOpen(false);
    const subject = encodeURIComponent('Resume – Ankur Bhatnagar | Technical Architect & UI/UX Practice Head');
    const body = encodeURIComponent(
      `Hi,\n\nPlease find the interactive resume of Ankur Bhatnagar below:\n\n${window.location.href}\n\nAnkur is a Technical Architect & UI/UX Practice Head with 13+ years of experience, based in Bengaluru, India.\n\nBest regards`
    );
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
      setShowScrollTop(window.scrollY > 500);

      // Determine active section
      const sections = navItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop & Mobile Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed top-0 left-0 right-0 z-50 transition-all"
        style={{
          background: isScrolled ? 'rgba(13, 17, 23, 0.95)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(10px)' : 'none',
          borderBottom: isScrolled ? '1px solid var(--bg-border)' : 'none',
          boxShadow: isScrolled ? '0 4px 20px rgba(0, 0, 0, 0.5)' : 'none'
        }}
      >
        <div className="resume-container py-4 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={scrollToTop}
            style={{
              fontFamily: 'var(--font-ui)',
              color: 'var(--text-primary)'
            }}
            className="text-xl font-bold tracking-wider hover:opacity-80 transition-opacity"
          >
            <span style={{ color: 'var(--accent-cyan)' }}>ANKUR</span>
            <span style={{ color: 'var(--accent-amber)' }}>.DEV</span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="px-4 py-2 rounded-lg transition-all"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  color: activeSection === item.id ? 'var(--accent-cyan)' : 'var(--text-muted)',
                  background: activeSection === item.id ? 'rgba(0, 200, 255, 0.1)' : 'transparent'
                }}
              >
                {item.label}
              </button>
            ))}

            {/* Share Button */}
            <div ref={shareRef} className="relative ml-2">
              <button
                onClick={() => setShareOpen(!shareOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:scale-105"
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.875rem',
                  borderColor: 'var(--accent-cyan)',
                  color: 'var(--accent-cyan)',
                  background: shareOpen ? 'rgba(0, 200, 255, 0.15)' : 'rgba(0, 200, 255, 0.05)'
                }}
              >
                <Share2 size={15} />
                Share
              </button>

              <AnimatePresence>
                {shareOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 rounded-lg border overflow-hidden z-50"
                    style={{
                      background: 'var(--bg-surface)',
                      borderColor: 'var(--accent-cyan)',
                      boxShadow: '0 8px 30px rgba(0, 200, 255, 0.2)'
                    }}
                  >
                    {[
                      { label: 'Download as PDF', icon: <FileDown size={15} />, action: handleSharePDF },
                      { label: 'Share via Email', icon: <Mail size={15} />, action: handleShareEmail }
                    ].map(({ label, icon, action }) => (
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
                background: 'var(--bg-deep)',
                borderColor: 'var(--bg-border)'
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
                      background: activeSection === item.id ? 'rgba(0, 200, 255, 0.1)' : 'transparent'
                    }}
                  >
                    {item.label}
                  </button>
                ))}

                {/* Mobile Share Options */}
                <div className="pt-2 border-t" style={{ borderColor: 'var(--bg-border)' }}>
                  <p
                    className="px-4 py-2 text-xs uppercase tracking-widest"
                    style={{ fontFamily: 'var(--font-ui)', color: 'var(--text-muted)' }}
                  >
                    Share Profile
                  </p>
                  {[
                    { label: 'Download as PDF', icon: <FileDown size={15} />, action: handleSharePDF },
                    { label: 'Share via Email', icon: <Mail size={15} />, action: handleShareEmail }
                  ].map(({ label, icon, action }) => (
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
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-4 rounded-full border z-50 hover:scale-110 transition-transform"
            style={{
              borderColor: 'var(--accent-cyan)',
              background: 'var(--bg-surface)',
              color: 'var(--accent-cyan)',
              boxShadow: '0 4px 20px rgba(0, 200, 255, 0.3)'
            }}
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
