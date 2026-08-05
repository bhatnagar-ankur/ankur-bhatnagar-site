import { createContext, useContext, ReactNode } from 'react';
import { useBgMusic } from '../hooks/useBgMusic';

interface BgMusicContextType {
  isEnabled: boolean;
  toggle: () => void;
}

const BgMusicContext = createContext<BgMusicContextType | undefined>(undefined);

export function BgMusicProvider({ children }: { children: ReactNode }) {
  const bgMusic = useBgMusic();
  return <BgMusicContext.Provider value={bgMusic}>{children}</BgMusicContext.Provider>;
}

export function useBgMusicContext() {
  const ctx = useContext(BgMusicContext);
  if (!ctx) throw new Error('useBgMusicContext must be used within BgMusicProvider');
  return ctx;
}
