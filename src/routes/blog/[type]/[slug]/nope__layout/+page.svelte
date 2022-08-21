<script>
  import { fade } from 'svelte/transition';
  import ArrowLeft from '../../../../../lib/components/icons/ArrowLeft.svelte';

  const goBack = () => {
    window.history.back();
  };
</script>

<div
  in:fade={{ duration: 150, delay: 100 }}
  out:fade={{ duration: 150 }}
  class="font-Roboto text-neutral-800 dark:text-white mx-2"
>
  <slot />
  <div class="flex my-10 underline">
    <ArrowLeft />
    <button class="font-Poppins ml-2" on:click={goBack}>Go back</button>
  </div>
</div>
