import { useEffect, useState, useCallback, useRef } from 'react';

type SoundType = 'click' | 'hover' | 'toggle' | 'success' | 'transition' | 'whoosh' | 'pop' | 'bulb-on' | 'bulb-off';

interface SoundSettings {
  enabled: boolean;
  volume: number;
}

// Musical note frequencies (equal temperament, A4 = 440 Hz)
const NOTE = {
  C4: 261.63, D4: 293.66, E4: 329.63, G4: 392.00,
  A4: 440.00, C5: 523.25, E5: 659.25, G5: 783.99,
  A5: 880.00,
} as const;

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  return audioContext;
};

function makeOscillator(
  ctx: AudioContext,
  type: OscillatorType,
  freq: number,
  gain: number,
  start: number,
  duration: number,
  freqEnd?: number
) {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.connect(g);
  g.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  if (freqEnd !== undefined) {
    osc.frequency.exponentialRampToValueAtTime(freqEnd, start + duration * 0.9);
  }
  // Soft attack, clean exponential decay
  g.gain.setValueAtTime(0.001, start);
  g.gain.linearRampToValueAtTime(gain, start + 0.008);
  g.gain.exponentialRampToValueAtTime(0.001, start + duration);
  osc.start(start);
  osc.stop(start + duration + 0.01);
}

export function useSoundEffects() {
  const [settings, setSettings] = useState<SoundSettings>({
    enabled: true,
    volume: 1
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const lastPlayTime = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-sound-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch {
        // Use defaults
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('portfolio-sound-settings', JSON.stringify(settings));
    }
  }, [settings, isInitialized]);

  const playSound = useCallback((type: SoundType) => {
    if (!settings.enabled) return;

    const now = Date.now();
    // Hover gets a much longer throttle to avoid firing on every element
    const throttle = type === 'hover' ? 300 : 60;
    if (lastPlayTime.current[type] && now - lastPlayTime.current[type] < throttle) return;
    lastPlayTime.current[type] = now;

    try {
      const ctx = getAudioContext();
      const v = settings.volume;
      const t = ctx.currentTime;

      switch (type) {
        // Short, low-pitched click — triangle wave is warmer than sine at high freq
        case 'click':
          makeOscillator(ctx, 'triangle', NOTE.A4, v * 0.55, t, 0.04, NOTE.E4);
          break;

        // Very subtle hover chime — barely audible, just a breath of sound
        case 'hover':
          makeOscillator(ctx, 'sine', NOTE.G4, v * 0.18, t, 0.03);
          break;

        // Ascending minor third = on; descending = off feel
        case 'toggle':
          makeOscillator(ctx, 'triangle', NOTE.C4, v * 0.55, t, 0.06);
          makeOscillator(ctx, 'triangle', NOTE.G4, v * 0.4, t + 0.06, 0.07);
          break;

        // Two-note ascending chord — C5 + E5 played close together
        case 'success':
          makeOscillator(ctx, 'sine', NOTE.C5, v * 0.45, t, 0.12);
          makeOscillator(ctx, 'sine', NOTE.E5, v * 0.35, t + 0.04, 0.14);
          makeOscillator(ctx, 'sine', NOTE.G5, v * 0.25, t + 0.08, 0.14);
          break;

        // Gentle rising sweep — navigation feels intentional
        case 'transition':
          makeOscillator(ctx, 'triangle', NOTE.C4, v * 0.3, t, 0.18, NOTE.G4);
          break;

        // Descending sweep — return to top
        case 'whoosh':
          makeOscillator(ctx, 'triangle', NOTE.A5, v * 0.25, t, 0.14, NOTE.C4);
          break;

        // Quick low pop — section reveal
        case 'pop':
          makeOscillator(ctx, 'triangle', NOTE.G4, v * 0.4, t, 0.06, NOTE.C4);
          break;

        // Sharp click + electrical buzz burst + warm filament swell
        case 'bulb-on':
          makeOscillator(ctx, 'square', 280, v * 2.8, t, 0.018);
          makeOscillator(ctx, 'square', 140, v * 1.6, t, 0.022);
          makeOscillator(ctx, 'square', 4400, v * 0.9, t + 0.012, 0.055);
          makeOscillator(ctx, 'square', 2200, v * 0.6, t + 0.015, 0.04);
          makeOscillator(ctx, 'sine', 220, v * 0.55, t + 0.05, 0.28, 420);
          break;

        // Heavy thunk + sharp arc pop + deep rumble
        case 'bulb-off':
          makeOscillator(ctx, 'triangle', 160, v * 2.5, t, 0.025);
          makeOscillator(ctx, 'square', 80, v * 1.4, t, 0.03);
          makeOscillator(ctx, 'square', 3400, v * 0.7, t, 0.02);
          makeOscillator(ctx, 'sine', 100, v * 0.45, t + 0.015, 0.2, 28);
          break;
      }
    } catch (error) {
      console.warn('Audio playback failed:', error);
    }
  }, [settings]);

  const toggleSound = useCallback(() => {
    setSettings(prev => ({ ...prev, enabled: !prev.enabled }));
    if (!settings.enabled) {
      setTimeout(() => playSound('success'), 100);
    }
  }, [settings.enabled, playSound]);

  const setVolume = useCallback((volume: number) => {
    setSettings(prev => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  return {
    playSound,
    toggleSound,
    setVolume,
    isEnabled: settings.enabled,
    volume: settings.volume
  };
}
