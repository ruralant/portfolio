<script>
  import { theme } from "$lib/shared/store";
  import { toggleTheme } from "$lib/shared/theme";
  import { Sun, Moon } from "$lib/components/icons/index.js";
  import Logo from "./components/Logo.svelte";
  import Dropdown from "./components/Dropdown.svelte";
  export let workSections = [
    {
      title: "Articles",
      url: "/blog/development",
      active: true
    },
    {
      title: "Career (coming soon)",
      url: "/career",
      active: false
    }
  ];
  export let personalSections = [
    {
      title: "Blog",
      url: "/blog/personal",
      active: true
    },
    {
      title: "More about me (coming soon)",
      url: "/myself",
      active: false
    }
  ];
</script>

<header
  class="flex flex-row justify-between items-center px-5 pt-8 pb-1 md:pb-20 bg-spaceWhite dark:bg-spaceGrey "
>
  <div class="flex items-center">
    <a class="flex items-center text-neutral-800 dark:text-white " href="/">
      <Logo />
    </a>
    <nav class="flex flex-row">
      <div class="flex space-x-4">
        <Dropdown title={"Work"} items={workSections} />
        <Dropdown title={"Personal"} items={personalSections} />
      </div>
    </nav>
  </div>
  <div class="flex-0 ">
    <a
      href="/app/theme"
      class="block"
      aria-label="toggle light and dark mode"
      on:click|preventDefault={() => {
        toggleTheme(theme, $theme);
      }}
    >
      <div class="hidden dark:block ">
        <Sun />
      </div>
      <div class="dark:hidden ">
        <Moon />
      </div>
    </a>
  </div>
</header>
