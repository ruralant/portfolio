<script>
  import ArrowRight from "../icons/ArrowRight.svelte";
  import Tag from "./Tag.svelte";
  let { post } = $props();
</script>

<a
  class="font-Poppins group mt-5 flex w-full items-center justify-between overflow-hidden rounded-lg bg-white p-6 text-left shadow-md transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg md:w-full dark:bg-neutral-900"
  href={`/blog/${post.slug}`}
>
  <div>
    <h2
      class="font-Cormorant via-hero-color-2 via-hero-color-5 from-hero-color-1 to-hero-color-6 dark:from-hero-color-1 dark:via-hero-color-2 dark:via-hero-color-3 dark:to-hero-color-4 m-0 bg-linear-to-l from-30% via-50% via-70% to-94% bg-clip-text text-3xl leading-tight text-transparent md:text-4xl dark:from-30% dark:via-50% dark:via-70% dark:to-94%"
    >
      {post.title}
    </h2>
    <div class="mt-3 mb-4 flex">
      {#each post.tags as tag}
        <Tag tagName={tag} url={`/blog/tags/${tag}`} />
      {/each}
    </div>
    <p class="mt-4 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
      {post.subtitle}
    </p>
    <p
      class="mt-4 text-xs font-medium tracking-wider text-teal-600 uppercase underline decoration-solid underline-offset-2 group-hover:text-teal-500 md:hidden dark:text-teal-400 dark:group-hover:text-teal-300"
    >
      Read more
    </p>
  </div>
  <div class="hidden w-10 md:block">
    <ArrowRight />
  </div>
</a>
