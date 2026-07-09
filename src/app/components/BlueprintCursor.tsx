import { useEffect } from 'react';

export function BlueprintCursor() {
  useEffect(() => {
    // Start off-screen so glow is invisible until cursor enters viewport
    document.documentElement.style.setProperty('--cursor-x', '-9999px');
    document.documentElement.style.setProperty('--cursor-y', '-9999px');

    const handleMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`);
    };

    const handleLeave = () => {
      document.documentElement.style.setProperty('--cursor-x', '-9999px');
      document.documentElement.style.setProperty('--cursor-y', '-9999px');
    };

    document.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return null;
}
