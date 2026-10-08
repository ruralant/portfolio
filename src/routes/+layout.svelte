<script lang="ts">
  import { onMount } from "svelte";
  import { onNavigate } from "$app/navigation";
  import { theme } from "$lib/stores/store";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "../tailwind.css";
  import type { Snippet } from "svelte";
  import type { LayoutData } from "./$types";

  let { data = $bindable(), children }: { data: LayoutData; children?: Snippet } = $props();

  onMount(() => {
    if (!("theme" in localStorage)) {
      theme.useLocalStorage();
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        data.localTheme = "dark";
        theme.set({ ...$theme, mode: "dark" });
      } else {
        data.localTheme = "light";
        theme.set({ ...$theme, mode: "light" });
      }
    } else {
      theme.useLocalStorage();
    }
  });

  // Cross-fade between pages with the browser's View Transitions, where supported
  onNavigate((navigation) => {
    if (!document.startViewTransition) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<svelte:head>
  <script>
    if (!("theme" in localStorage)) {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    } else {
      let data = localStorage.getItem("theme");
      if (data) {
        data = JSON.parse(data);
        document.documentElement.classList.add(data.mode);
      }
    }
    // Keep in sync with THEME_COLORS in src/lib/stores/theme.ts
    document
      .querySelector("meta[name=theme-color]")
      ?.setAttribute(
        "content",
        document.documentElement.classList.contains("dark") ? "#121211" : "#f7f6f2"
      );
  </script>
</svelte:head>

<div id="core" class={[data.localTheme, "flex min-h-dvh flex-col"]}>
  <a
    href="#main"
    class="bg-ink text-paper sr-only z-50 rounded-full px-4 py-2 text-sm focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
  >
    Skip to content
  </a>

  <Header />

  <main
    id="main"
    class="md2:px-8 md3:pt-14 max-w-content md3:pb-32 mx-auto w-full flex-1 px-5 pt-8 pb-24"
  >
    {@render children?.()}
  </main>

  <Footer />
</div>
