import { motion } from 'motion/react';
import { Sun, Music, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from '../providers/ThemeProvider';
import { useBgMusicContext } from '../providers/BgMusicProvider';
import { useSound } from '../providers/SoundProvider';

interface ButtonConfig {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
  glowColor: string;
  ledHex: string;
}

function VintageButton({ icon, label, active, onClick, glowColor, ledHex }: ButtonConfig) {
  return (
    <motion.button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      whileTap={{ scale: 0.97 }}
      aria-pressed={active}
      aria-label={label}
      title={label}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '5px',
        width: '48px',
        paddingTop: '10px',
        paddingBottom: '10px',
        borderRadius: '3px',
        cursor: 'pointer',
        userSelect: 'none',
        border: 'none',
        outline: 'none',
        background: active
          ? 'linear-gradient(160deg, #111 0%, #1e1e1e 100%)'
          : 'linear-gradient(160deg, #2e2e2e 0%, #1c1c1c 100%)',
        boxShadow: active
          ? 'inset 4px 4px 10px rgba(0,0,0,0.95), inset -1px -1px 4px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.7)'
          : [
              '4px 4px 10px rgba(0,0,0,0.9)',
              '-2px -2px 5px rgba(255,255,255,0.07)',
              'inset 0 1px 0 rgba(255,255,255,0.13)',
              'inset 0 -2px 0 rgba(0,0,0,0.6)',
              '0 0 0 1px rgba(0,0,0,0.5)',
            ].join(', '),
        transition: 'box-shadow 0.08s ease, background 0.08s ease',
      }}
    >
      {/* LED indicator */}
      <div
        style={{
          width: '5px',
          height: '5px',
          borderRadius: '50%',
          background: active ? ledHex : '#222',
          boxShadow: active
            ? `0 0 5px ${ledHex}, 0 0 10px ${ledHex}80`
            : 'inset 0 1px 2px rgba(0,0,0,0.9)',
          border: `1px solid ${active ? ledHex + '80' : '#0a0a0a'}`,
          transition: 'all 0.25s ease',
          flexShrink: 0,
        }}
      />

      {/* Icon */}
      <div
        style={{
          color: active ? glowColor : '#5a5a5a',
          filter: active ? `drop-shadow(0 0 5px ${glowColor})` : 'none',
          transition: 'color 0.2s ease, filter 0.2s ease',
          transform: active ? 'translateY(1px)' : 'translateY(0)',
          lineHeight: 0,
        }}
      >
        {icon}
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.38rem',
          letterSpacing: '0.1em',
          color: active ? glowColor : '#444',
          transition: 'color 0.2s ease',
          transform: active ? 'translateY(1px)' : 'translateY(0)',
          lineHeight: 1,
        }}
      >
        {label}
      </span>

      {/* Groove lines (decorative engraving on button face) */}
      <div
        style={{
          position: 'absolute',
          bottom: '4px',
          left: '6px',
          right: '6px',
          height: '1px',
          background: active
            ? 'rgba(0,0,0,0.6)'
            : 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)',
        }}
      />
    </motion.button>
  );
}

function Screw() {
  return (
    <div
      style={{
        width: '9px',
        height: '9px',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #4a4a4a, #1a1a1a)',
        border: '1px solid #0d0d0d',
        boxShadow: '1px 1px 3px rgba(0,0,0,0.9), -0.5px -0.5px 1px rgba(255,255,255,0.08)',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {/* Screw slot */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '20%',
          right: '20%',
          height: '1px',
          background: 'rgba(0,0,0,0.8)',
          transform: 'translateY(-50%) rotate(45deg)',
        }}
      />
    </div>
  );
}

export function FloatingControls() {
  const { displayMode, toggleDisplayMode } = useTheme();
  const { isEnabled: musicEnabled, toggle: toggleMusic } = useBgMusicContext();
  const { isEnabled: soundEnabled, toggleSound, playSound } = useSound();

  const sunlightActive = displayMode === 'sunlight';

  const buttons: ButtonConfig[] = [
    {
      icon: <Sun size={15} />,
      label: 'LIGHT',
      active: sunlightActive,
      onClick: () => { playSound('toggle'); toggleDisplayMode(); },
      glowColor: 'var(--accent-amber)',
      ledHex: '#F0883E',
    },
    {
      icon: <Music size={15} />,
      label: 'MUSIC',
      active: musicEnabled,
      onClick: toggleMusic,
      glowColor: 'var(--accent-amber)',
      ledHex: '#F0883E',
    },
    {
      icon: soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />,
      label: 'SFX',
      active: soundEnabled,
      onClick: toggleSound,
      glowColor: 'var(--accent-cyan)',
      ledHex: '#00C8FF',
    },
  ];

  return (
    <div
      className="hidden md:flex"
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 40,
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
        padding: '12px 8px',
        background: 'linear-gradient(180deg, #1d1d1d 0%, #141414 50%, #1d1d1d 100%)',
        borderLeft: '2px solid #0a0a0a',
        borderTop: '1.5px solid #383838',
        borderBottom: '1.5px solid #0a0a0a',
        borderTopLeftRadius: '6px',
        borderBottomLeftRadius: '6px',
        boxShadow: '-4px 0 20px rgba(0,0,0,0.7), inset 1px 0 0 rgba(255,255,255,0.04)',
      }}
      role="toolbar"
      aria-label="Quick settings"
    >
      <Screw />

      {/* Panel label */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.3rem',
          letterSpacing: '0.15em',
          color: '#3a3a3a',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          userSelect: 'none',
          marginBottom: '2px',
          marginTop: '2px',
        }}
      >
        CTRL
      </div>

      {buttons.map((btn, i) => (
        <VintageButton key={i} {...btn} />
      ))}

      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.3rem',
          letterSpacing: '0.15em',
          color: '#3a3a3a',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          userSelect: 'none',
          marginTop: '2px',
        }}
      >
        SYS
      </div>

      <Screw />
    </div>
  );
}
