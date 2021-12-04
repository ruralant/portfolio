<script>
  import { theme } from '$lib/shared/store';
  import { toggleTheme } from '$lib/shared/theme';
  import { Sun, Moon } from '$lib/components/icons/index.js';
  import Logo from './components/Logo.svelte';
  import Dropdown from './components/Dropdown.svelte';
  export let workSections = [
    {
      title: 'Career',
      url: '/career',
    },
    {
      title: 'Blog',
      url: '/blog/work',
    },
  ];
  export let personalSections = [
    {
      title: 'What I am up to',
      url: '/myself',
    },
    {
      title: 'Blog',
      url: '/blog/pesonal',
    },
  ];
</script>

<header
  class="flex flex-row justify-between px-5 pt-8 bg-spaceWhite dark:bg-spaceGrey transition duration-501 ease-in-out"
>
  <div class="flex">
    <Logo />
    <nav class="flex flex-row">
      <div class="flex space-x-4">
        <a
          class="flex items-center text-black dark:text-white transition duration-501 ease-in-out"
          href="/">Home</a
        >
        <Dropdown title={'Work'} items={workSections} />
        <!-- <Dropdown title={'Personal'} items={personalSections} /> -->
      </div>
    </nav>
  </div>
  <div class="flex-0">
    <a
      href="/app/theme"
      class="block"
      aria-label="toggle light and dark mode"
      on:click|preventDefault={() => {
        toggleTheme(theme, $theme);
      }}
    >
      <div class="hidden dark:block transition duration-501 ease-in-out">
        <Sun />
      </div>
      <div class="dark:hidden transition duration-501 ease-in-out">
        <Moon />
      </div>
    </a>
  </div>
</header>
