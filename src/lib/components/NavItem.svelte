<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Pathname } from "$lib/types";

  interface Props {
    text: string;
    url: Pathname;
    mobileText?: string;
  }

  let { text, url, mobileText }: Props = $props();
</script>

<a
  class="rounded-md bg-white px-4 py-2 text-sm font-normal text-neutral-600 shadow-xs dark:bg-neutral-800 dark:text-neutral-300"
  href={resolve(url)}
>
  {#if mobileText}
    <span class="md:hidden">{mobileText}</span>
    <span class="hidden md:inline">{text}</span>
  {:else}
    {text}
  {/if}
</a>
