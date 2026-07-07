import { Settings, Moon, Sun, Zap, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { useTheme } from './ThemeProvider';
import { useSound } from './SoundProvider';

export function SettingsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { theme, displayMode, toggleTheme, toggleDisplayMode } = useTheme();
  const { playSound, toggleSound, isEnabled: soundEnabled } = useSound();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleThemeToggle = () => {
    playSound('toggle');
    toggleTheme();
  };

  const handleDisplayModeToggle = () => {
    playSound('toggle');
    toggleDisplayMode();
  };

  const handleSoundToggle = () => {
    toggleSound();
  };

  return (
    <div ref={menuRef} className="relative ml-2">
      <button
        onClick={() => {
          playSound('click');
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => playSound('hover')}
        className="flex items-center gap-2 px-4 py-2 rounded-lg border transition-all hover:scale-105"
        style={{
          fontFamily: 'var(--font-ui)',
          fontSize: '0.875rem',
          borderColor: 'var(--accent-amber)',
          color: 'var(--accent-amber)',
          background: isOpen ? 'rgba(240, 136, 62, 0.15)' : 'rgba(240, 136, 62, 0.05)'
        }}
      >
        <Settings size={15} />
        Settings
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 rounded-lg border overflow-hidden z-50"
            style={{
              background: 'var(--bg-surface)',
              borderColor: 'var(--accent-amber)',
              boxShadow: '0 8px 30px rgba(240, 136, 62, 0.2)'
            }}
          >
            <div className="p-4 space-y-4">
              {/* Theme Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {theme === 'dark' ? (
                    <Moon size={18} style={{ color: 'var(--accent-cyan)' }} />
                  ) : (
                    <Sun size={18} style={{ color: 'var(--accent-amber)' }} />
                  )}
                  <div>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      {theme === 'dark' ? 'Dark Theme' : 'Light Theme'}
                    </p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Toggle color scheme
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleThemeToggle}
                  className="relative w-12 h-6 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: theme === 'dark' ? 'var(--accent-cyan)' : 'var(--accent-amber)' }}
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ left: theme === 'dark' ? '2px' : 'calc(100% - 22px)' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--bg-border)' }} />

              {/* Sunlight Mode Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap
                    size={18}
                    style={{ color: displayMode === 'sunlight' ? 'var(--accent-amber)' : 'var(--text-muted)' }}
                  />
                  <div>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      Sunlight Mode
                    </p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      High contrast for outdoors
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDisplayModeToggle}
                  className="relative w-12 h-6 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: displayMode === 'sunlight' ? 'var(--accent-amber)' : 'var(--bg-border)' }}
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ left: displayMode === 'sunlight' ? 'calc(100% - 22px)' : '2px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>

              <div style={{ borderTop: '1px solid var(--bg-border)' }} />

              {/* Sound Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {soundEnabled ? (
                    <Volume2 size={18} style={{ color: 'var(--accent-cyan)' }} />
                  ) : (
                    <VolumeX size={18} style={{ color: 'var(--text-muted)' }} />
                  )}
                  <div>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.875rem', color: 'var(--text-primary)' }}>
                      Sound Effects
                    </p>
                    <p style={{ fontFamily: 'var(--font-ui)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      UI interaction sounds
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSoundToggle}
                  className="relative w-12 h-6 rounded-full transition-colors duration-300"
                  style={{ backgroundColor: soundEnabled ? 'var(--accent-cyan)' : 'var(--bg-border)' }}
                >
                  <motion.div
                    className="absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md"
                    animate={{ left: soundEnabled ? 'calc(100% - 22px)' : '2px' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
