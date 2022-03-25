<script>
  import ArrowLeft from '../../../../lib/components/icons/ArrowLeft.svelte';

  const goBack = () => {
    window.history.back();
  };
</script>

<div class="font-Roboto text-neutral-800 dark:text-white mx-2">
  <slot />
  <div class="flex my-10 underline">
    <ArrowLeft />
    <button class="font-Poppins ml-2" on:click={goBack}>Go back</button>
  </div>
</div>
