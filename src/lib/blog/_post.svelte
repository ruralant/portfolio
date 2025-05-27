<script>
  import { fade } from "svelte/transition";
  import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";

  let { category, title, subtitle, mainImage, mainImageAlt, slug, children } = $props();
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={subtitle} />
  <meta property="og:title" content={title} />
  <meta property="og:site_name" content="Antonio Rossi Website" />
  <meta property="og:type" content="article" />
  <meta property="og:description" content={subtitle} />
  <meta property="og:url" content={`https://www.antoniorossi.net/blog/${slug}`} />
  <meta property="og:image" itemprop="image" content={mainImage} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={subtitle} />
  <meta name="twitter:image" content={mainImage} />
  <meta name="twitter:image:alt" content={mainImageAlt} />
  <meta property="og:image:width" content="300" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@ruralant" />
</svelte:head>

<div
  in:fade={{ duration: 150, delay: 100 }}
  out:fade={{ duration: 150 }}
  class="prose font-Roboto dark:prose-invert prose-lg prose-a:text-teal-400 prose-code:bg-neutral-200 prose-code:text-neutral-700 prose-pre:min-w-full prose-pre:max-w-xs prose-pre:whitespace-pre-wrap prose-pre:bg-neutral-200 prose-pre:text-left prose-pre:text-neutral-700 dark:prose-code:bg-neutral-800 dark:prose-code:text-neutral-100 dark:prose-pre:bg-neutral-800 dark:prose-pre:text-neutral-100 md:prose-pre:max-w-full prose-h3:font-medium text-neutral-900 dark:text-neutral-100"
>
  <div class="mt-10 flex flex-row items-center justify-between md:mt-0">
    <a class="font-Poppins inline-block text-white! no-underline" href={`/blog`}>
      <ArrowLeft />
    </a>
    <p class=" text-center tracking-wider uppercase">
      {category}
    </p>
    <div class="w-6"></div>
  </div>
  <h1 class="text-4x3 mb-4 text-center font-normal tracking-normal">
    {title}
  </h1>
  <h2 class="mt-0 text-center text-xl font-normal tracking-normal">
    {subtitle}
  </h2>
  <article>
    {@render children?.()}
  </article>
  <a class="font-Poppins my-10 inline-block text-white! no-underline" href={`/blog`}>
    <ArrowLeft />
  </a>
</div>
