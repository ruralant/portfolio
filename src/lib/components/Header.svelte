<script lang="ts">
  import { afterNavigate } from "$app/navigation";
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import { theme } from "$lib/stores/store";
  import { toggleTheme } from "$lib/stores/theme";
  import { Sun, Moon } from "$lib/components/icons";
  import { navigation } from "$lib/navigation";
  import Logo from "./Logo.svelte";
  import NavItem from "./NavItem.svelte";

  let menu: HTMLElement | undefined = $state();

  // Client-side navigation keeps the document, so the open popover would otherwise stay open
  afterNavigate(() => {
    if (menu?.matches(":popover-open")) menu.hidePopover();
  });

  const isCurrent = (url: string) =>
    page.url.pathname === url || page.url.pathname.startsWith(`${url}/`);
</script>

<header
  class="md2:px-8 md3:py-8 max-w-content mx-auto flex w-full items-center justify-between gap-6 px-5 py-6 [view-transition-name:site-header]"
>
  <Logo />

  <div class="md2:gap-5 flex items-center gap-1">
    <nav aria-label="Main" class="md2:flex hidden items-center gap-6">
      {#each navigation as item (item.url)}
        <NavItem {...item} />
      {/each}
    </nav>

    <button
      type="button"
      class="text-muted hover:bg-surface hover:text-ink grid size-9 cursor-pointer place-items-center rounded-full transition-colors"
      aria-label="toggle light and dark mode"
      onclick={() => toggleTheme(theme, $theme)}
    >
      <span class="hidden dark:block"><Sun /></span>
      <span class="dark:hidden"><Moon /></span>
    </button>

    <button
      type="button"
      popovertarget="site-menu"
      class="md2:hidden text-ink hover:bg-surface h-9 cursor-pointer rounded-full px-3 text-[0.9375rem] transition-colors"
    >
      Menu
    </button>
  </div>
</header>

<div
  id="site-menu"
  popover
  bind:this={menu}
  class="bg-paper text-ink m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto border-0 p-0"
>
  <div class="flex min-h-full flex-col px-5 pb-10">
    <div class="flex items-center justify-between py-6">
      <Logo />
      <button
        type="button"
        popovertarget="site-menu"
        popovertargetaction="hide"
        class="text-ink hover:bg-surface h-9 cursor-pointer rounded-full px-3 text-[0.9375rem] transition-colors"
      >
        Close
      </button>
    </div>

    <nav aria-label="Main" class="mt-6">
      {#each navigation as item, i (item.url)}
        <a
          href={resolve(item.url)}
          aria-current={isCurrent(item.url) ? "page" : undefined}
          class="menu-link border-line flex items-baseline justify-between border-b py-4 no-underline"
          style:--i={i}
        >
          <span
            class={[
              "tracking-title font-serif text-[2.75rem] leading-none",
              isCurrent(item.url) && "text-accent italic"
            ]}
          >
            {item.text}
          </span>
          <span class="text-muted text-xs tabular-nums">0{i + 1}</span>
        </a>
      {/each}
    </nav>

    <div class="menu-link mt-auto flex flex-wrap items-center gap-x-6 gap-y-4 pt-12" style:--i={6}>
      <a class="btn group" href={resolve("/contact")}>
        Get in touch
        <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
      </a>
      <a
        class="link text-ink-soft text-sm"
        href="https://www.linkedin.com/in/antoniorossii/"
        target="_blank"
        rel="noopener noreferrer"
      >
        LinkedIn<span aria-hidden="true"> ↗</span><span class="sr-only"> (opens in a new tab)</span>
      </a>
    </div>
  </div>
</div>

<style>
  /* Fade the sheet in and out; display and overlay must transition too or it vanishes at once */
  #site-menu {
    opacity: 0;
    transition:
      opacity 0.25s ease,
      overlay 0.25s allow-discrete,
      display 0.25s allow-discrete;
  }

  #site-menu:popover-open {
    opacity: 1;
  }

  @starting-style {
    #site-menu:popover-open {
      opacity: 0;
    }
  }

  #site-menu::backdrop {
    background: transparent;
  }

  .menu-link {
    opacity: 0;
    translate: 0 0.75rem;
    transition:
      opacity 0.45s ease,
      translate 0.45s cubic-bezier(0.2, 0.7, 0.2, 1);
    transition-delay: calc(var(--i) * 45ms + 60ms);
  }

  #site-menu:popover-open .menu-link {
    opacity: 1;
    translate: 0 0;
  }

  @starting-style {
    #site-menu:popover-open .menu-link {
      opacity: 0;
      translate: 0 0.75rem;
    }
  }
</style>
