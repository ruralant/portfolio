<script>
  import ArrowRight from '../icons/ArrowRight.svelte';
  export let post;
</script>

<li class="container md:w-full mt-5">
  <a
    class="flex w-full p-4 justify-between text-left items-center rounded-md overflow-hidden shadow-md bg-white dark:bg-neutral-900 hover:scale-110 duration-300 ease-in-out"
    href={`/blog/${post.type}/${post.slug}`}
  >
    <div>
      <a href={`/blog/${post.type}/${post.slug}`}>
        <span
          class="title-text bg-gradient-271 from-darkFromColor via-lightViaColor1 via-darkViaColor2 to-lightToColor dark:from-darkFromColor dark:via-darkViaColor1 dark:via-darkViaColor2 dark:to-darkToColor"
          >{post.title}</span
        >
      </a>
      <div class="flex my-4">
        <span
          class="capitalize mr-2 inline-flex rounded-md shadow-sm px-2 py-1 bg-white text-xs text-neutral-600 bg-neutral-200 dark:text-neutral-300 dark:bg-neutral-800 duration-300 ease-in-out"
          >{post.type}</span
        >
        <span
          class="capitalize mr-2 inline-flex rounded-md shadow-sm px-2 py-1 bg-white text-xs text-neutral-600 bg-neutral-200 dark:text-neutral-300 dark:bg-neutral-800 duration-300 ease-in-out"
          >{post.category}</span
        >
      </div>
      <p
        class="text-neutral-800 dark:text-white mt-4 transition duration-300 ease-in-out"
      >
        {post.subtitle}
      </p>
      <p
        class="md:hidden mt-3 uppercase text-xs underline decoration-solid underline-offset-2"
      >
        Read more
      </p>
    </div>
    <div class="hidden md:block w-10">
      <ArrowRight />
    </div>
  </a>
</li>

<style>
  .container {
    font-family: 'Poppins', sans-serif;
  }
  .title-text {
    font-family: 'Cormorant Garamond', serif;
    color: #fff;
    font-weight: 500;
    margin: 0;
    line-height: 1.15;
    font-size: 2rem;
  }
</style>
