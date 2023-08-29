<script>
  export let total;
  export let nextPosts;
  const pages = Math.ceil(total / 10);
</script>

<div>
  {#each Array(pages) as page, i}
    <button
      class="w-10 h-10 mt-10 mx-2 rounded-full shadow-sm bg-white dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300"
      on:click={nextPosts(i * 10, (i + 1) * 10)}>{i + 1}</button
    >
  {/each}
</div>
