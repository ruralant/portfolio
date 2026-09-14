<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Pathname } from "$lib/types";

  interface Props {
    tagName: string;
    url?: Pathname;
  }

  let { tagName, url }: Props = $props();

  const pillClass =
    "relative mr-2 inline-flex rounded-md bg-neutral-200 px-2 py-1 text-xs text-neutral-600 capitalize shadow-xs dark:bg-neutral-800 dark:text-neutral-300";
</script>

{#if url}
  <a
    class="{pillClass} no-underline hover:bg-neutral-300 dark:hover:bg-neutral-700"
    href={resolve(url)}
  >
    {tagName}
  </a>
{:else}
  <span class={pillClass}>{tagName}</span>
{/if}
