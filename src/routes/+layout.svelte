<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import { theme } from "$lib/shared/store";
  import Header from "$lib/Header.svelte";
  import Footer from "$lib/Footer.svelte";
  import "../tailwind.css";
  export let data;

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
  </script>
</svelte:head>

<div id="core" class={data.localTheme}>
  <Header />

  <main
    in:fade={{ duration: 150, delay: 100 }}
    out:fade={{ duration: 150 }}
    class="m-auto flex min-h-[calc(100vh-210px)] max-w-screen-xl2 flex-col items-center bg-space-white px-4 md:px-22 lg:px-36 dark:bg-space-grey"
  >
    <div>
      <slot />
    </div>
  </main>
</div>

<Footer />
