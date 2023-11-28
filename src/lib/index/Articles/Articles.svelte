<script>
  import Article from "./Article.svelte";
  export let posts;
</script>

<div class="m-auto flex w-full max-w-6xl flex-col py-20 lg:py-20">
  <p
    class="title-text m-0 pb-5 text-center font-Cormorant text-3xl text-neutral-800 dark:text-neutral-100"
  >
    Latest Articles
  </p>
  <ul
    class="articles-container grid list-none grid-cols-articlesSm justify-items-center gap-4 py-0 md:grid-cols-articlesMd lg:grid-cols-articlesLg lg:gap-10 lg:px-0"
  >
    {#each posts as post}
      <Article postData={post.meta} postPath={post.path} />
    {/each}
  </ul>
</div>
