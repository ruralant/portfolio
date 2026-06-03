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
  class="prose font-Roboto prose-lg dark:prose-invert prose-headings:font-Cormorant prose-h2:text-3xl prose-h2:font-medium prose-h3:text-2xl prose-h3:font-medium prose-p:text-lg prose-p:leading-8 prose-p:text-neutral-700 dark:prose-p:text-neutral-300 prose-a:font-medium prose-a:text-teal-600 prose-a:underline prose-a:decoration-teal-600/30 prose-a:underline-offset-4 prose-a:transition-colors hover:prose-a:text-teal-500 hover:prose-a:decoration-teal-500/50 dark:prose-a:text-teal-400 dark:prose-a:decoration-teal-400/30 dark:hover:prose-a:text-teal-300 dark:hover:prose-a:decoration-teal-300/50 prose-code:rounded prose-code:bg-neutral-200 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:text-neutral-700 prose-pre:min-w-full prose-pre:max-w-xs prose-pre:whitespace-pre-wrap prose-pre:rounded-lg prose-pre:bg-neutral-200 prose-pre:text-left prose-pre:text-neutral-700 dark:prose-code:bg-neutral-800 dark:prose-code:text-neutral-100 dark:prose-pre:bg-neutral-800 dark:prose-pre:text-neutral-100 md:prose-pre:max-w-full prose-li:text-lg prose-li:leading-8 prose-li:text-neutral-700 dark:prose-li:text-neutral-300 max-w-3xl text-neutral-900 dark:text-neutral-100"
>
  <div class="mt-10 flex flex-row items-center justify-between md:mt-0">
    <a class="font-Poppins inline-block text-white! no-underline" href={`/blog`}>
      <ArrowLeft />
    </a>
    <p
      class="text-center text-sm font-medium tracking-wider text-neutral-500 uppercase dark:text-neutral-400"
    >
      {category}
    </p>
    <div class="w-6"></div>
  </div>
  <h1
    class="font-Cormorant mt-8 mb-4 text-center text-5xl leading-tight font-medium tracking-normal text-neutral-800 sm:mt-2 sm:text-4xl md:text-6xl dark:text-neutral-100"
  >
    {title}
  </h1>
  <h2
    class="mt-4 mb-12 text-center text-base leading-relaxed font-normal tracking-normal text-neutral-600 sm:text-lg md:text-xl dark:text-neutral-400"
  >
    {subtitle}
  </h2>
  <article>
    {@render children?.()}
  </article>
  <a class="font-Poppins my-10 inline-block text-white! no-underline" href={`/blog`}>
    <ArrowLeft />
  </a>
</div>
