<script>
  import { fade } from "svelte/transition";
  /**
   * @typedef {Object} Props
   * @property {import('svelte').Snippet} [children]
   */

  /** @type {Props} */
  let { children } = $props();
</script>

<div in:fade={{ duration: 150, delay: 100 }} out:fade={{ duration: 150 }}>
  {@render children?.()}
</div>
