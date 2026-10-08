<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Path } from "$app/types";

  interface Props {
    tagName: string;
    url?: Path;
  }

  let { tagName, url }: Props = $props();

  const pillClass =
    "relative inline-flex items-center rounded-full border border-line px-2.5 py-0.5 text-xs leading-5 text-muted";
</script>

{#if url}
  <a
    class="{pillClass} hover:border-ink hover:text-ink no-underline transition-colors"
    href={resolve(url)}
  >
    {tagName}
  </a>
{:else}
  <span class={pillClass}>{tagName}</span>
{/if}
