import { createContext, useContext, ReactNode } from 'react';
import { useSoundEffects } from './useSoundEffects';

type SoundType = 'click' | 'hover' | 'toggle' | 'success' | 'transition' | 'whoosh' | 'pop' | 'bulb-on' | 'bulb-off';

interface SoundContextType {
  playSound: (type: SoundType) => void;
  toggleSound: () => void;
  setVolume: (volume: number) => void;
  isEnabled: boolean;
  volume: number;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export function SoundProvider({ children }: { children: ReactNode }) {
  const soundEffects = useSoundEffects();

  return (
    <SoundContext.Provider value={soundEffects}>
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
}
