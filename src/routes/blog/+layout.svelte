<script>
  import { fade } from 'svelte/transition';
</script>

<div
  in:fade={{ duration: 150, delay: 100 }}
  out:fade={{ duration: 150 }}
  class="max-w-3xl m-auto text-neutral-800 dark:text-white"
>
  <slot />
</div>
