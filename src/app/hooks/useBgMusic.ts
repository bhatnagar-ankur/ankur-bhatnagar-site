import { useState, useEffect, useRef, useCallback } from 'react';
import bgMusicUrl from '../../imports/chanakya music by rishab rikhiram sharma.mp3';

const STORAGE_KEY = 'portfolio-bg-music';
const TARGET_VOL = 0.12;

export function useBgMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const interactedRef = useRef(false);

  const [isEnabled, setIsEnabled] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved === null ? true : saved === 'true';
    } catch {
      return true;
    }
  });

  useEffect(() => {
    const audio = new Audio(bgMusicUrl);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'auto';
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  const fadeTo = useCallback((target: number, durationMs: number, onDone?: () => void) => {
    if (fadeTimerRef.current) clearInterval(fadeTimerRef.current);
    const audio = audioRef.current;
    if (!audio) return;
    const startVol = audio.volume;
    const steps = Math.max(1, Math.round(durationMs / 50));
    let s = 0;
    fadeTimerRef.current = setInterval(() => {
      s++;
      if (!audioRef.current) return;
      audioRef.current.volume = Math.max(0, Math.min(1, startVol + (target - startVol) * (s / steps)));
      if (s >= steps) {
        clearInterval(fadeTimerRef.current!);
        fadeTimerRef.current = null;
        onDone?.();
      }
    }, 50);
  }, []);

  // Auto-start on first user interaction
  useEffect(() => {
    if (!isEnabled) return;

    const tryStart = () => {
      if (interactedRef.current) return;
      interactedRef.current = true;
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0;
      audio.play()
        .then(() => fadeTo(TARGET_VOL, 4000))
        .catch(() => { interactedRef.current = false; });
    };

    const events = ['click', 'keydown', 'scroll'] as const;
    events.forEach(e => document.addEventListener(e, tryStart, { once: true, passive: true }));
    return () => {
      events.forEach(e => document.removeEventListener(e, tryStart));
    };
  }, [isEnabled, fadeTo]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    setIsEnabled(prev => {
      const next = !prev;
      try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* ignore */ }

      if (next) {
        interactedRef.current = true;
        audio.volume = 0;
        audio.play()
          .then(() => fadeTo(TARGET_VOL, 2000))
          .catch(() => { /* autoplay blocked */ });
      } else {
        fadeTo(0, 1200, () => audio.pause());
      }

      return next;
    });
  }, [fadeTo]);

  return { isEnabled, toggle };
}
