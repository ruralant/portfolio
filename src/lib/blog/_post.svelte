<script>
  import { fade } from 'svelte/transition';
  import ArrowLeft from '$lib/components/icons/ArrowLeft.svelte';
  import Image from '$lib/components/Image.svelte';

  export let category;
  export let title;
  export let subtitle;
  export let mainImage;
  export let mainImageWebP;
  export let mainImageThumb;
  export let mainImageAlt;
  export let slug;
  export let type;
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={subtitle} />
  <meta property="og:title" content={title} />
  <meta property="og:site_name" content="Antonio Rossi Website" />
  <meta property="og:type" content="article" />
  <meta property="og:description" content={subtitle} />
  <meta
    property="og:url"
    content={`https://www.antoniorossi.net/blog/${type}/${slug}`}
  />
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
  class="prose font-Roboto lg:prose-xl text-neutral-900 dark:text-white dark:prose-invert prose-a:text-teal-400 prose-pre:max-w-xs prose-pre:min-w-full prose-pre:whitespace-pre-wrap prose-pre:text-left md:prose-pre:max-w-full prose-pre:bg-neutral-200 dark:prose-pre:bg-neutral-800 prose-pre:text-neutral-700 dark:prose-pre:text-neutral-100 prose-code:bg-neutral-200 dark:prose-code:bg-neutral-800 prose-code:text-neutral-700 dark:prose-code:text-neutral-100 tracking-wide"
>
  <p class="uppercase text-center tracking-wider mt-10 md:mt-0">
    {category}
  </p>
  <h1 class="text-4xl font-normal text-center tracking-normal mb-4">
    {title}
  </h1>
  <h2 class="text-xl font-normal text-center tracking-normal mt-0">
    {subtitle}
  </h2>
  <!-- <Image
    wepImage={mainImageWebP}
    jpegImage={mainImage}
    alt={mainImageAlt}
    width={1000}
    height={1000}
    placeholder={'blur'}
    classes={'mt-6 mb-8 rounded-lg drop-shadow-md'}
  /> -->
  <article>
    <slot />
  </article>
  <a
    class="inline-block my-10 font-Poppins !text-white"
    href={`/blog/${type}`}
    sveltekit:noscroll><ArrowLeft /></a
  >
</div>
