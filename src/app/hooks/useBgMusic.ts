import { useState, useEffect, useRef, useCallback } from 'react';
import bgMusicUrl from '../../imports/chanakya music by rishab rikhiram sharma.mp3';

const STORAGE_KEY = 'portfolio-bg-music';
const TARGET_VOL = 0.28;
const FADE_STEP_MS = 80;

export function useBgMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isEnabledRef = useRef(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const fadeIn = (audio: HTMLAudioElement) => {
    audio.volume = 0;
    const id = setInterval(() => {
      if (audio.volume >= TARGET_VOL - 0.01) {
        audio.volume = TARGET_VOL;
        clearInterval(id);
      } else {
        audio.volume = Math.min(TARGET_VOL, audio.volume + 0.01);
      }
    }, FADE_STEP_MS);
  };

  const fadeOut = (audio: HTMLAudioElement, onDone: () => void) => {
    const id = setInterval(() => {
      if (audio.volume <= 0.01) {
        audio.volume = 0;
        clearInterval(id);
        onDone();
      } else {
        audio.volume = Math.max(0, audio.volume - 0.01);
      }
    }, FADE_STEP_MS);
  };

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0;
    // preload stays 'none' until the 2s delay below fires — setting the src eagerly
    // (or preload='auto') would start fetching this 3.6MB file immediately on mount,
    // competing with fonts/CSS/JS for bandwidth during first paint.
    audio.preload = 'none';
    audioRef.current = audio;

    let cancelled = false;
    let timers: ReturnType<typeof setTimeout>[] = [];

    const startPlaying = () => {
      if (cancelled) return;
      // Muted autoplay is universally allowed by Chrome/Firefox/Safari.
      // We start muted, then unmute and fade in once play() resolves.
      audio.muted = true;
      audio.play()
        .then(() => {
          if (cancelled) { audio.pause(); return; }
          audio.muted = false;
          isEnabledRef.current = true;
          setIsEnabled(true);
          fadeIn(audio);
        })
        .catch(() => {
          audio.muted = false;
          // still blocked — button stays OFF
        });
    };

    const schedulePlay = () => {
      if (cancelled) return;
      // Situation 2: audio not ready yet — wait for it, then 500ms buffer
      if (audio.readyState < 3) {
        const onReady = () => {
          const t = setTimeout(startPlaying, 500);
          timers.push(t);
        };
        audio.addEventListener('canplaythrough', onReady, { once: true });
      } else {
        // Audio already buffered — play immediately
        startPlaying();
      }
    };

    // Situation 1: wait 2s after render, then start — src is assigned here
    // (not at mount) so the browser has no reason to fetch audio before this.
    const t = setTimeout(() => {
      if (cancelled) return;
      audio.src = bgMusicUrl;
      schedulePlay();
    }, 2000);
    timers.push(t);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      audio.removeEventListener('canplaythrough', schedulePlay);
      audio.pause();
      audio.src = '';
    };
  }, []);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (!audio.src) audio.src = bgMusicUrl;

    const next = !isEnabledRef.current;
    isEnabledRef.current = next;
    setIsEnabled(next);
    try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* ignore */ }

    if (next) {
      audio.volume = 0;
      audio.play()
        .then(() => fadeIn(audio))
        .catch(() => {
          isEnabledRef.current = false;
          setIsEnabled(false);
        });
    } else {
      fadeOut(audio, () => audio.pause());
    }
  }, []);

  return { isEnabled, toggle };
}
