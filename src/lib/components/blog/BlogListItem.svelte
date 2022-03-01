<script>
  import ArrowRight from '../icons/ArrowRight.svelte';

  export let post;
</script>

<li class="w-4/5">
  <a
    class="flex w-full m-4 p-4 justify-between text-left items-center rounded-md overflow-hidden shadow-md bg-white dark:bg-neutral-900 hover:scale-110 duration-300 ease-in-out"
    href={`/blog/${post.type}/${post.slug}`}
  >
    <div>
      <a href={`/blog/${post.type}/${post.slug}`}>
        <span class="title-text">{post.title}</span>
      </a>
      <p
        class="text-black dark:text-white mt-4 transition duration-501 ease-in-out"
      >
        {post.subtitle}
      </p>

      <div class="flex mt-4">
        <span class="capitalize mr-2">{post.type}</span>
        <p
          class="text-black dark:text-white transition duration-501 ease-in-out"
        >
          {post.date}
        </p>
      </div>
    </div>
    <div class="w-10">
      <ArrowRight />
    </div>
  </a>
</li>

<style>
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
    /* padding-left: 10%; */
  }
</style>
