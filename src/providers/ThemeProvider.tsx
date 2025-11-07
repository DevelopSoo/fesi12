"use client";

import { createContext, useContext, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextType {
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme은 ThemeProvider 내부에서 사용해야 합니다.");
  }

  return context;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDark, setIsDark] = useState(false);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ toggleDarkMode }}>
      {/* 버튼 삭제 */}
      <div className={isDark ? "dark" : ""}>{children}</div>
    </ThemeContext.Provider>
  );
}
