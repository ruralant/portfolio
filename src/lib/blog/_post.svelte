<script>
  import { fade } from 'svelte/transition';
  import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';

  const goBack = () => {
    window.history.back();
  };

  export let category;
  export let title;
  export let subtitle;
</script>

<div
  in:fade={{ duration: 150, delay: 100 }}
  out:fade={{ duration: 150 }}
  class="font-Roboto text-lg tracking-wider text-neutral-800 dark:text-white mx-2"
>
  <p class="uppercase text-center tracking-wider pb-4">{category}</p>
  <h1 class="text-5xl text-center tracking-normal pb-4">
    {title}
  </h1>
  <h2 class="text-2xl tracking-normal pb-12">{subtitle}</h2>
  <slot />
  <div class="flex my-10 underline">
    <ArrowLeft />
    <button class="font-Poppins ml-2" on:click={goBack}>Go back</button>
  </div>
</div>
