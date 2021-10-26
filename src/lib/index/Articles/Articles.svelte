<script>
  import Article from './Article.svelte';
  export let lastProPost;
  export let lastLifePost;
</script>

<div
  class="w-full flex flex-row flex-wrap justify-around items-center bg-spaceWhite dark:bg-spaceGrey pb-10"
>
  <Article postsData={lastProPost} />
  <Article postsData={lastLifePost} />
</div>
