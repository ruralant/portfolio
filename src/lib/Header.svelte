<script>
  import "prism-themes/themes/prism-one-dark.min.css";
  import { theme } from "$lib/shared/store";
  import { toggleTheme } from "$lib/shared/theme";
  import { Sun, Moon } from "$lib/components/icons/index.js";
  import Logo from "./components/Logo.svelte";
  import NavItem from "./components/NavItem.svelte";
</script>

<header
  class="flex flex-row items-center justify-between bg-space-white px-5 pb-1 pt-8 dark:bg-space-grey md:pb-20"
>
  <div class="flex items-center">
    <a class="flex items-center text-neutral-800 no-underline dark:text-neutral-100" href="/">
      <Logo />
    </a>
    <nav class="flex flex-row space-x-4">
      <NavItem text={"Blog"} url={"/blog"} />
      <NavItem text={"About Me"} url={"/about"} />
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
      <div class="hidden dark:block">
        <Sun />
      </div>
      <div class="dark:hidden">
        <Moon />
      </div>
    </a>
  </div>
</header>
