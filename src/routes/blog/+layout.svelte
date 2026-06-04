<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div
  in:fade={{ duration: 150, delay: 100 }}
  out:fade={{ duration: 150 }}
  class="m-auto max-w-3xl text-neutral-800 dark:text-neutral-100"
>
  {@render children?.()}
</div>
