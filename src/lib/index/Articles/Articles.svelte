<script>
  import Article from './Article.svelte';
  export let posts;
</script>

<div>
  <ul>
    {#each posts as post}
      <li><Article {post} /></li>
    {/each}
  </ul>
</div>
