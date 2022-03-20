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
        <span class="title-text">{post.title}</span>
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
        class="text-black dark:text-white mt-4 transition duration-300 ease-in-out"
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
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
  }
  .title-text {
    font-family: 'Cormorant Garamond', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    color: #fff;
    background: linear-gradient(
      271deg,
      #8797e8 30%,
      #a162e8 50%,
      #f093b0 70%,
      #dab56c 94%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
    margin: 0;
    line-height: 1.15;
    font-size: 2rem;
  }
</style>
