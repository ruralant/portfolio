<script>
  import Article from "./Article.svelte";
  let { posts } = $props();
</script>

<div class="m-auto flex w-full max-w-6xl flex-col py-20 lg:py-20">
  <p class="font-Cormorant m-0 pb-5 text-center text-3xl text-neutral-800 dark:text-neutral-100">
    Latest Articles
  </p>
  <ul
    class="articles-container grid-cols-articles-sm md:grid-cols-articles-md lg:grid-cols-articles-lg grid list-none justify-items-center gap-4 py-0 lg:gap-10 lg:px-0"
  >
    {#each posts as post}
      <Article postData={post.meta} postPath={post.path} />
    {/each}
  </ul>
</div>
