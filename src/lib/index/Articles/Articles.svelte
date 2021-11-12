<script>
  import Article from './Article.svelte';
  const convertDate = (date) => {
    const dateArray = date.split('-');
    return new Date(dateArray[2], dateArray[1], dateArray[0]);
  };
  export let lastProPost;
  export let lastLifePost;
  export let posts = lastLifePost
    .concat(lastProPost)
    .sort((post, next) => convertDate(next.date) - convertDate(post.date));
</script>

<div
  class="w-full flex flex-col bg-spaceWhite dark:bg-spaceGrey transition duration-501 ease-in-out max-w-6xl m-auto pb-10"
>
  <ul class="articles-container gap-3 lg:gap-6">
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
</style>
