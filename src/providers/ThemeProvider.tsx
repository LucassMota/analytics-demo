"use client";

import React from "react";
import {
  type Theme,
  getStoredTheme,
  getSystemTheme,
  setTheme as serviceSetTheme,
  toggleTheme as serviceToggleTheme,
  clearStoredTheme as serviceClearStoredTheme,
  onThemeChange,
  applyTheme,
} from "../services/theme";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
  clearStoredTheme: () => void;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(
  undefined,
);

export function useTheme(): ThemeContextValue {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<Theme>("light");

  React.useEffect(() => {
    const initial = getStoredTheme() ?? getSystemTheme();
    applyTheme(initial);
    setThemeState(initial);
  }, []);

  React.useEffect(() => {
    const off = onThemeChange((t) => {
      setThemeState(t);
      applyTheme(t);
    });
    return () => off();
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      if (getStoredTheme() == null) {
        const sys = getSystemTheme();
        applyTheme(sys);
        setThemeState(sys);
      }
    };

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", handleChange);
      return () => mql.removeEventListener("change", handleChange);
    } else {
      // @ts-ignore - legacy fallback
      mql.addListener(handleChange);
      return () => {
        // @ts-ignore - legacy fallback
        mql.removeListener(handleChange);
      };
    }
  }, []);

  const setTheme = React.useCallback((t: Theme) => {
    const next = serviceSetTheme(t);
    setThemeState(next);
  }, []);

  const toggleTheme = React.useCallback(() => {
    const next = serviceToggleTheme();
    setThemeState(next);
  }, []);

  const clearStoredTheme = React.useCallback(() => {
    serviceClearStoredTheme();
    const sys = getSystemTheme();
    applyTheme(sys);
    setThemeState(sys);
  }, []);

  const value: ThemeContextValue = React.useMemo(
    () => ({ theme, setTheme, toggleTheme, clearStoredTheme }),
    [theme, setTheme, toggleTheme, clearStoredTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;
