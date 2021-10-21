<script context="module">
  export async function load({ session }) {
    const localTheme = session.theme;
    return { props: { localTheme } };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { theme } from '$lib/shared/store';
  import Header from '$lib/Header.svelte';
  import '../tailwind.css';
  export let localTheme;
  export let year = new Date().getFullYear();

  onMount(() => {
    if (!('theme' in localStorage)) {
      theme.useLocalStorage();
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        localTheme = 'dark';
        theme.set({ ...$theme, mode: 'dark' });
      } else {
        localTheme = 'light';
        theme.set({ ...$theme, mode: 'light' });
      }
    } else {
      theme.useLocalStorage();
    }
  });
</script>

<svelte:head>
  <script>
    if (!('theme' in localStorage)) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    } else {
      let data = localStorage.getItem('theme');
      if (data) {
        data = JSON.parse(data);
        document.documentElement.classList.add(data.mode);
      }
    }
  </script>
</svelte:head>

<div id="core" class={localTheme}>
  <Header />

  <main>
    <slot />
  </main>
</div>

<footer>© {year} Antonio Rossi</footer>
