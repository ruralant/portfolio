<script>
  import { fade } from "svelte/transition";
</script>

<div
  in:fade={{ duration: 150, delay: 100 }}
  out:fade={{ duration: 150 }}
  class="m-auto max-w-3xl text-neutral-800 dark:text-neutral-100"
>
  <slot />
</div>
