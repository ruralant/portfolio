<script>
  import { theme } from '$lib/shared/store';
  import { toggleTheme } from '$lib/shared/theme';
  import { Sun, Moon } from '$lib/components/icons/index.js';
  import Logo from './components/Logo.svelte';
  import ChevronDown from './components/icons/ChevronDown.svelte';
  import Dropdown from './components/Dropdown.svelte';
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
        <button
          type="button"
          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          Work
          <ChevronDown />
        </button>
        <Dropdown />
        <a
          class="flex items-center text-black dark:text-white transition duration-501 ease-in-out"
          href="/career">Personal</a
        >
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
