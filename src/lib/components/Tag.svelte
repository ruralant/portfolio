<script lang="ts">
  import { resolve } from "$app/paths";
  import type { Path } from "$app/types";

  interface Props {
    tagName: string;
    url?: Path;
  }

  let { tagName, url }: Props = $props();
</script>

<!-- Plain text sized by its list; `relative` keeps a linked tag above a stretched row link -->
{#if url}
  <a
    class="text-ink-soft decoration-line-strong hover:text-accent hover:decoration-accent relative underline decoration-1 underline-offset-[0.22em] transition-colors"
    href={resolve(url)}
  >
    {tagName}
  </a>
{:else}
  <span class="text-muted">{tagName}</span>
{/if}
