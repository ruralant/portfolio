<script>
  let { text, url, mobileText } = $props();
</script>

<a
  class="rounded-md bg-white px-4 py-2 text-sm font-normal text-neutral-600 shadow-xs dark:bg-neutral-800 dark:text-neutral-300"
  href={url}
>
  {#if mobileText}
    <span class="nav-mobile-label">{mobileText}</span>
    <span class="nav-desktop-label">{text}</span>
  {:else}
    {text}
  {/if}
</a>

<style>
  .nav-mobile-label {
    display: none;
  }
  .nav-desktop-label {
    display: inline;
  }
  @media (max-width: 639px) {
    .nav-mobile-label {
      display: inline;
    }
    .nav-desktop-label {
      display: none;
    }
  }
</style>
