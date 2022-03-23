<script>
  import ArrowLeft from '../../../../lib/components/icons/ArrowLeft.svelte';

  const goBack = () => {
    window.history.back();
  };
</script>

<div class="text-neutral-800 dark:text-white">
  <slot />
  <div class="flex mt-5 underline">
    <ArrowLeft />
    <button class="back-text ml-2" on:click={goBack}>Go back</button>
  </div>
</div>

<style>
  .back-text {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
</style>
