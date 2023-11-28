<script>
  import { fade } from "svelte/transition";
  import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";

  export let category;
  export let title;
  export let subtitle;
  export let mainImage;
  export let mainImageAlt;
  export let slug;
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
  class="prose font-Roboto font-normal tracking-wide text-neutral-900 dark:prose-invert lg:prose-xl prose-a:text-teal-400 prose-code:bg-neutral-200 prose-code:text-neutral-700 prose-pre:min-w-full prose-pre:max-w-xs prose-pre:whitespace-pre-wrap prose-pre:bg-neutral-200 prose-pre:text-left prose-pre:text-neutral-700 dark:text-neutral-100 dark:prose-code:bg-neutral-800 dark:prose-code:text-neutral-100 dark:prose-pre:bg-neutral-800 dark:prose-pre:text-neutral-100 md:prose-pre:max-w-full"
>
  <p class="mt-10 text-center uppercase tracking-wider md:mt-0">
    {category}
  </p>
  <h1 class="mb-4 text-center text-4xl font-normal tracking-normal">
    {title}
  </h1>
  <h2 class="mt-0 text-center text-xl font-normal tracking-normal">
    {subtitle}
  </h2>
  <article>
    <slot />
  </article>
  <a class="my-10 inline-block font-Poppins !text-white no-underline" href={`/blog`}>
    <ArrowLeft />
  </a>
</div>
