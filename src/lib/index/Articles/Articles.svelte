<script>
  import Article from './Article.svelte';
  export let posts;
  console.log('POSTS', posts);
</script>

<div class="w-full flex flex-col max-w-6xl m-auto">
  <p
    class="title-text text-3xl text-black dark:text-white text-center pt-20 pb-10"
  >
    Latest Articles
  </p>
  <ul class="articles-container gap-3 lg:gap-10">
    {#each posts as post}
      <Article postsData={post} />
    {/each}
  </ul>
</div>

<style>
  .articles-container {
    list-style: none;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
  .title-text {
    font-family: 'Cormorant Garamond', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    font-weight: 500;
    margin: 0;
    line-height: 1.15;
  }
</style>
