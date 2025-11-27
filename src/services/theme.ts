export type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";
const THEME_EVENT_NAME = "theme:change";

export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === "light" || raw === "dark") return raw;
    return null;
  } catch {
    return null;
  }
}

export function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  try {
    const mq = window.matchMedia?.("(prefers-color-scheme: dark)");
    return mq && mq.matches ? "dark" : "light";
  } catch {
    return "light";
  }
}

export function getResolvedTheme(): Theme {
  return getStoredTheme() ?? getSystemTheme();
}

export function applyTheme(theme?: Theme): Theme {
  const resolved = theme ?? getResolvedTheme();
  if (typeof document !== "undefined") {
    const root = document.documentElement;
    if (resolved === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }
  return resolved;
}

export function setTheme(theme: Theme): Theme {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {}
  }
  const applied = applyTheme(theme);
  dispatchThemeChange(applied);
  return applied;
}

export function toggleTheme(): Theme {
  const current = getResolvedTheme();
  const next: Theme = current === "dark" ? "light" : "dark";
  return setTheme(next);
}

export function clearStoredTheme(): void {
  if (typeof window !== "undefined") {
    try {
      window.localStorage.removeItem(THEME_STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  const applied = applyTheme(getSystemTheme());
  dispatchThemeChange(applied);
}

export function onThemeChange(handler: (theme: Theme) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const onCustom = (e: Event) => {
    const ce = e as CustomEvent<Theme>;
    if (ce?.detail === "light" || ce?.detail === "dark") {
      handler(ce.detail);
    }
  };

  const onStorage = (e: StorageEvent) => {
    if (e.key === THEME_STORAGE_KEY) {
      handler(getResolvedTheme());
    }
  };

  window.addEventListener(THEME_EVENT_NAME, onCustom as EventListener);
  window.addEventListener("storage", onStorage);

  return () => {
    window.removeEventListener(THEME_EVENT_NAME, onCustom as EventListener);
    window.removeEventListener("storage", onStorage);
  };
}

export function initTheme(): Theme {
  return applyTheme();
}

function dispatchThemeChange(theme: Theme) {
  if (typeof window === "undefined") return;
  try {
    window.dispatchEvent(
      new CustomEvent<Theme>(THEME_EVENT_NAME, { detail: theme }),
    );
  } catch {
    // ignore
  }
}
