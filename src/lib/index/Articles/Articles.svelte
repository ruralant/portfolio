<script>
  import Article from "./Article.svelte";
  export let posts;
</script>

<div class="w-full flex flex-col max-w-6xl m-auto py-20 lg:py-20">
  <p
    class="title-text font-Cormorant text-3xl m-0 text-neutral-800 dark:text-neutral-100 text-center pb-5"
  >
    Latest Articles
  </p>
  <ul
    class="articles-container grid grid-cols-articlesSm md:grid-cols-articlesMd lg:grid-cols-articlesLg list-none justify-items-center py-0 lg:px-0 gap-4 lg:gap-10"
  >
    {#each posts as post}
      <Article postData={post.meta} postPath={post.path} />
    {/each}
  </ul>
</div>
