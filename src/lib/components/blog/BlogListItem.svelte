<script>
  import ArrowRight from "../icons/ArrowRight.svelte";
  import Tag from "./Tag.svelte";
  export let post;
</script>

<a
  class="mt-5 flex w-full items-center justify-between overflow-hidden rounded-md bg-white p-4 text-left font-Poppins shadow-md transition duration-300 ease-in-out hover:scale-105 md:w-full dark:bg-neutral-900"
  href={`/blog/${post.slug}`}
>
  <div>
    <span
      class="title-text color-white via-lightViaColor1 m-0 from-darkFromColor via-darkViaColor2 to-lightToColor font-Cormorant text-mediumTitle bg-gradient-271 dark:from-darkFromColor dark:via-darkViaColor1 dark:via-darkViaColor2 dark:to-darkToColor"
    >
      {post.title}
    </span>
    <div class="my-4 flex">
      {#each post.tags as tag}
        <Tag tagName={tag} url={`/blog/tags/${tag}`} />
      {/each}
    </div>
    <p class="mt-4 text-neutral-800 dark:text-neutral-100">
      {post.subtitle}
    </p>
    <p class="mt-3 text-xs uppercase underline decoration-solid underline-offset-2 md:hidden">
      Read more
    </p>
  </div>
  <div class="hidden w-10 md:block">
    <ArrowRight />
  </div>
</a>
