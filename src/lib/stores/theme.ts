import type { ThemeState } from "$lib/types";

type ThemeStore = { set: (value: ThemeState) => void };

export function toggleTheme(theme: ThemeStore, $theme: ThemeState) {
  const metaThemeColor = document.querySelector("meta[name=theme-color]");
  if ($theme.mode === "light") {
    theme.set({ ...$theme, mode: "dark" });
    metaThemeColor?.setAttribute("content", "#111111");
    updateDocument("theme", "dark", "light");
  } else {
    theme.set({ ...$theme, mode: "light" });
    metaThemeColor?.setAttribute("content", "#FAFAFC");
    updateDocument("theme", "light", "dark");
  }
}

function updateDocument(name: string, mode: string, other: string) {
  document.getElementById("core")?.classList.remove(other);
  document.documentElement.classList.remove(other);
  document.getElementById("core")?.classList.add(mode);
  document.documentElement.classList.add(mode);
}
