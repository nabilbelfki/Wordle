"use client"
import { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type InputMode = 'keyboard' | 'onscreen-only';
type ContrastMode = 'normal' | 'high-contrast';
type ThemeContextType = {
  theme: Theme;
  inputMode: InputMode;
  contrastMode: ContrastMode;
  toggleTheme: () => void;
  toggleInputMode: () => void;
  toggleContrastMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [inputMode, setInputMode] = useState<InputMode>('keyboard');
  const [contrastMode, setContrastMode] = useState<ContrastMode>('normal');
  
  useEffect(() => {
    // Load saved preferences
    const savedTheme = localStorage.getItem('theme') as Theme || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const savedInputMode = localStorage.getItem('inputMode') as InputMode || 'keyboard';
    const savedContrastMode = localStorage.getItem('contrastMode') as ContrastMode || 'normal';
    
    setTheme(savedTheme);
    setInputMode(savedInputMode);
    setContrastMode(savedContrastMode);
    document.body.classList.add(savedTheme, savedContrastMode);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
  };

  const toggleInputMode = () => {
    const newMode = inputMode === 'keyboard' ? 'onscreen-only' : 'keyboard';
    setInputMode(newMode);
    localStorage.setItem('inputMode', newMode);
  };

  const toggleContrastMode = () => {
    const newMode = contrastMode === 'normal' ? 'high-contrast' : 'normal';
    setContrastMode(newMode);
    localStorage.setItem('contrastMode', newMode);
    document.body.classList.remove(contrastMode);
    document.body.classList.add(newMode);
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      inputMode, 
      contrastMode,
      toggleTheme, 
      toggleInputMode,
      toggleContrastMode
    }}>
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