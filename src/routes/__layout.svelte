<script context="module">
  export async function load({ session }) {
    const localTheme = session.theme;
    return { props: { localTheme } };
  }
</script>

<script>
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { theme } from '$lib/shared/store';
  import Header from '$lib/Header.svelte';
  import Footer from '$lib/Footer.svelte';
  import '../tailwind.css';
  export let localTheme;

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
  <!-- <meta name="theme-color" content={localTheme === 'dark' ? '#000' : '#fff'} /> -->
  <meta
    name="theme-color"
    content="#fff"
    media="(prefers-color-scheme: light)"
  />
  <meta
    name="theme-color"
    content="#000"
    media="(prefers-color-scheme: dark)"
  />
</svelte:head>

<div id="core" class={localTheme}>
  <Header />

  <main
    in:fade={{ duration: 150, delay: 100 }}
    out:fade={{ duration: 150 }}
    class="min-h-[calc(100vh-210px)] flex flex-col items-center bg-spaceWhite dark:bg-spaceGrey transition duration-300 ease-in-out px-4 md:px-22 lg:px-36"
  >
    <div>
      <slot />
    </div>
  </main>
</div>

<Footer />
