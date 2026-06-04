<script lang="ts">
  import { fade } from "svelte/transition";
  import type { Snippet } from "svelte";

  interface Props {
    children?: Snippet;
  }

  let { children }: Props = $props();
</script>

<div in:fade={{ duration: 150, delay: 100 }} out:fade={{ duration: 150 }}>
  {@render children?.()}
</div>
