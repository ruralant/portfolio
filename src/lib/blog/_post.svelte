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
</script>

<div
  in:fade={{ duration: 150, delay: 100 }}
  out:fade={{ duration: 150 }}
  class="font-Roboto text-lg tracking-wider text-neutral-800 dark:text-white mx-2"
>
  <p class="uppercase text-center tracking-wider mb-4">{category}</p>
  <h1 class="text-5xl text-center tracking-normal mb-4">
    {title}
  </h1>
  <h2 class="text-2xl tracking-normal">{subtitle}</h2>
  <img
    src={mainImage}
    alt="website's home screenshot"
    width={1000}
    height={1000}
    placeholder="blur"
    loading="lazy"
    class="mt-6 mb-8 rounded-lg drop-shadow-md"
  />
  <article
    class="prose lg:prose-xl text-neutral-900 dark:text-white dark:prose-invert prose-a:text-teal-400 prose-pre:bg-neutral-200 dark:prose-pre:bg-neutral-800 prose-pre:text-neutral-700 dark:prose-pre:text-neutral-100"
  >
    <slot />
  </article>
  <div class="flex my-10 underline">
    <ArrowLeft />
    <button class="font-Poppins ml-2" on:click={goBack}>Go back</button>
  </div>
</div>
