import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type DisplayMode = 'normal' | 'sunlight';

interface ThemeContextType {
  theme: Theme;
  displayMode: DisplayMode;
  setTheme: (theme: Theme) => void;
  setDisplayMode: (mode: DisplayMode) => void;
  toggleTheme: () => void;
  toggleDisplayMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  const [displayMode, setDisplayModeState] = useState<DisplayMode>('normal');
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('portfolio-theme') as Theme | null;
    const savedDisplayMode = localStorage.getItem('portfolio-display-mode') as DisplayMode | null;

    if (savedTheme) {
      setThemeState(savedTheme);
    }

    if (savedDisplayMode) {
      setDisplayModeState(savedDisplayMode);
    }

    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (!isInitialized) return;

    const root = document.documentElement;

    root.classList.remove('dark', 'light');
    root.classList.add(theme);

    root.classList.remove('sunlight-mode');
    if (displayMode === 'sunlight') {
      root.classList.add('sunlight-mode');
    }

    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-display-mode', displayMode);
  }, [theme, displayMode, isInitialized]);

  const setTheme = (newTheme: Theme) => setThemeState(newTheme);
  const setDisplayMode = (mode: DisplayMode) => setDisplayModeState(mode);
  const toggleTheme = () => setThemeState(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleDisplayMode = () => setDisplayModeState(prev => prev === 'normal' ? 'sunlight' : 'normal');

  return (
    <ThemeContext.Provider value={{ theme, displayMode, setTheme, setDisplayMode, toggleTheme, toggleDisplayMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
