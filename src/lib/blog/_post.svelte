<script>
  import { fade } from "svelte/transition";
  import ArrowLeft from "$lib/components/icons/ArrowLeft.svelte";
  import Twitter from "$lib/components/seo/Twitter.svelte";
  import OpenGraph from "$lib/components/seo/OpenGraph.svelte";

  export let category;
  export let title;
  export let subtitle;
  export let mainImage;
  export let mainImageAlt;
  export let slug;
  export let type;
  export let timeToRead = 5;
  export let publishedAt;
  export let updatedAt;

  console.log("TITLE", title);
  console.log("MAIN IMAGE", mainImage);
  console.log("PUBLISHED AT", publishedAt);

  const twitterProps = {
    article: true,
    image: mainImage,
    timeToRead: 10
  };

  const openGraphProps = {
    title,
    description: subtitle,
    image: mainImage,
    url: `https://www.antoniorossi.net/blog/${type}/${slug}`,
    publishedAt,
    updatedAt
  };
</script>

<svelte:head>
  <title>{title}</title>
  <!-- <meta name="description" content={subtitle} />
  <meta property="og:title" content={title} />
  <meta property="og:site_name" content="Antonio Rossi Website" />
  <meta property="og:type" content="article" />
  <meta property="og:description" content={subtitle} />
  <meta property="og:url" content={`https://www.antoniorossi.net/blog/${type}/${slug}`} />
  <meta property="og:image" itemprop="image" content={mainImage} /> -->
  <OpenGraph {...openGraphProps} />
  <Twitter {...twitterProps} />
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
    wepImage={`${mainImage}?w=656&h=656&format=webp`}
    jpegImage={`${mainImage}?w=656&h=656`}
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
    sveltekit:data-sveltekit-noscroll><ArrowLeft /></a
  >
</div>
