import type { ThemeState } from "$lib/types";

type ThemeStore = { set: (value: ThemeState) => void };

// Matches --color-paper in src/tailwind.css, so the browser chrome blends with the page
export const THEME_COLORS = { light: "#f7f6f2", dark: "#121211" } as const;

export function toggleTheme(theme: ThemeStore, $theme: ThemeState) {
  const mode = $theme.mode === "light" ? "dark" : "light";
  theme.set({ ...$theme, mode });
  document.querySelector("meta[name=theme-color]")?.setAttribute("content", THEME_COLORS[mode]);
  updateDocument(mode, $theme.mode);
}

function updateDocument(mode: string, other: string) {
  document.getElementById("core")?.classList.remove(other);
  document.documentElement.classList.remove(other);
  document.getElementById("core")?.classList.add(mode);
  document.documentElement.classList.add(mode);
}
