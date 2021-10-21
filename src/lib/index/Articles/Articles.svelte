<script>
  import Article from './Article.svelte';
  export let lastProPost;
  export let lastLifePost;
</script>

<div>
  <Article postsData={lastProPost} />
  <Article postsData={lastLifePost} />
</div>
