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
      return saved === null ? false : saved === 'true';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const audio = new Audio(bgMusicUrl);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'none';
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

  // Auto-start on first qualifying user gesture (click/keydown only — scroll is not a valid autoplay gesture)
  useEffect(() => {
    if (!isEnabled) return;

    const events: ('click' | 'keydown')[] = ['click', 'keydown'];

    const removeListeners = () => {
      events.forEach(e => document.removeEventListener(e, tryStart));
    };

    const tryStart = () => {
      if (interactedRef.current) return;
      const audio = audioRef.current;
      if (!audio) return;
      audio.volume = 0;
      audio.play()
        .then(() => {
          interactedRef.current = true;
          fadeTo(TARGET_VOL, 4000);
          removeListeners();
        })
        .catch(() => {
          // leave listeners; next gesture will retry
        });
    };

    events.forEach(e => document.addEventListener(e, tryStart, { passive: true }));
    return removeListeners;
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
