<script>
  import { fade } from 'svelte/transition';
</script>

<div in:fade={{ duration: 150, delay: 100 }} out:fade={{ duration: 150 }}>
  <slot />
</div>
