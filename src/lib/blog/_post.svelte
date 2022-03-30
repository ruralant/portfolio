<script>
  import { fade } from 'svelte/transition';
  import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';

  const goBack = () => {
    window.history.back();
  };

  export let category;
  export let title;
  export let subtitle;
  export let mainImage;
  export let mainImageAlt;
</script>

<div
  in:fade={{ duration: 150, delay: 100 }}
  out:fade={{ duration: 150 }}
  class="prose mx-4 font-Roboto lg:prose-xl text-justify text-neutral-900 dark:text-white dark:prose-invert prose-a:text-teal-400 prose-pre:bg-neutral-200 dark:prose-pre:bg-neutral-800 prose-pre:text-neutral-700 dark:prose-pre:text-neutral-100 prose-code:bg-neutral-200 dark:prose-code:bg-neutral-800 prose-code:text-neutral-700 dark:prose-code:text-neutral-100 tracking-wider"
>
  <p class="uppercase text-center tracking-wider mt-10 md:mt-0">
    {category}
  </p>
  <h1 class="text-4xl font-normal text-center tracking-normal mb-4">
    {title}
  </h1>
  <h2 class="text-2xl font-normal text-center tracking-normal mt-0">
    {subtitle}
  </h2>
  <img
    src={mainImage}
    alt={mainImageAlt}
    width={1000}
    height={1000}
    placeholder="blur"
    loading="lazy"
    class="mt-6 mb-8 rounded-lg drop-shadow-md"
  />
  <article class="">
    <slot />
  </article>
  <div class="flex my-10 underline">
    <ArrowLeft />
    <button class="font-Poppins ml-2" on:click={goBack}>Go back</button>
  </div>
</div>
