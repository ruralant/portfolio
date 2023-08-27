<script>
  export let total;
  export let nextPosts;
  const pages = Math.ceil(total / 10);
</script>

<div>
  {#each Array(pages) as page, i}
    <button on:click={nextPosts(i * 10, (i + 1) * 10)} class="p-3">{i + 1}</button>
  {/each}
</div>
