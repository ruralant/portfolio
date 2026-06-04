<script lang="ts">
  import { resolve } from "$app/paths";
  import "prism-themes/themes/prism-one-dark.min.css";
  import { theme } from "$lib/stores/store";
  import { toggleTheme } from "$lib/stores/theme";
  import { Sun, Moon } from "$lib/components/icons";
  import Logo from "./Logo.svelte";
  import NavItem from "./NavItem.svelte";
</script>

<header
  class="bg-space-white dark:bg-space-grey flex flex-row items-center justify-between px-5 pt-8 pb-1 md:pb-20"
>
  <div class="flex items-center">
    <a
      class="flex items-center text-neutral-800 no-underline dark:text-neutral-100"
      href={resolve("/")}
    >
      <Logo />
    </a>
    <nav class="flex flex-row justify-center space-x-4">
      <NavItem text="Blog" url="/blog" />
      <NavItem text="Career" url="/career" />
      <NavItem text="About Me" mobileText="About" url="/about" />
    </nav>
  </div>
  <div class="flex items-center justify-end">
    <button
      type="button"
      class="block cursor-pointer border-0 bg-transparent p-0"
      aria-label="toggle light and dark mode"
      onclick={() => toggleTheme(theme, $theme)}
    >
      <div class="hidden dark:block">
        <Sun />
      </div>
      <div class="dark:hidden">
        <Moon />
      </div>
    </button>
  </div>
</header>
