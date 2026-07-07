import { useEffect, useState, useCallback, useRef } from 'react';

type SoundType = 'click' | 'hover' | 'toggle' | 'success' | 'transition' | 'whoosh' | 'pop';

interface SoundSettings {
  enabled: boolean;
  volume: number;
}

let audioContext: AudioContext | null = null;

const getAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

export function useSoundEffects() {
  const [settings, setSettings] = useState<SoundSettings>({
    enabled: true,
    volume: 0.15
  });
  const [isInitialized, setIsInitialized] = useState(false);
  const lastPlayTime = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const saved = localStorage.getItem('portfolio-sound-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
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
    if (lastPlayTime.current[type] && now - lastPlayTime.current[type] < 50) {
      return;
    }
    lastPlayTime.current[type] = now;

    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      const baseVolume = settings.volume;
      const currentTime = ctx.currentTime;

      switch (type) {
        case 'click':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(1200, currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(800, currentTime + 0.02);
          gainNode.gain.setValueAtTime(baseVolume * 0.3, currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.05);
          oscillator.start(currentTime);
          oscillator.stop(currentTime + 0.05);
          break;

        case 'hover':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(800, currentTime);
          gainNode.gain.setValueAtTime(baseVolume * 0.15, currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.08);
          oscillator.start(currentTime);
          oscillator.stop(currentTime + 0.08);
          break;

        case 'toggle':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(600, currentTime);
          oscillator.frequency.setValueAtTime(900, currentTime + 0.05);
          gainNode.gain.setValueAtTime(baseVolume * 0.4, currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.12);
          oscillator.start(currentTime);
          oscillator.stop(currentTime + 0.12);
          break;

        case 'success':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(800, currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(1200, currentTime + 0.1);
          gainNode.gain.setValueAtTime(baseVolume * 0.35, currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.15);
          oscillator.start(currentTime);
          oscillator.stop(currentTime + 0.15);
          break;

        case 'transition':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(400, currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, currentTime + 0.2);
          gainNode.gain.setValueAtTime(baseVolume * 0.2, currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.25);
          oscillator.start(currentTime);
          oscillator.stop(currentTime + 0.25);
          break;

        case 'whoosh':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(2000, currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(400, currentTime + 0.15);
          gainNode.gain.setValueAtTime(baseVolume * 0.2, currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.15);
          oscillator.start(currentTime);
          oscillator.stop(currentTime + 0.15);
          break;

        case 'pop':
          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(1000, currentTime);
          oscillator.frequency.exponentialRampToValueAtTime(600, currentTime + 0.08);
          gainNode.gain.setValueAtTime(baseVolume * 0.25, currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.001, currentTime + 0.08);
          oscillator.start(currentTime);
          oscillator.stop(currentTime + 0.08);
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
