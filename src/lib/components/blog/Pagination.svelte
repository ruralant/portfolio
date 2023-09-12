<script>
  export let total;
  export let nextPosts;
  export let currentPage;
  const pages = Math.ceil(total / 10);
</script>

<div>
  {#each Array(pages) as page, i}
    <button
      disabled={currentPage === i + 1}
      class={`w-10 h-10 mt-10 mx-2 rounded-full shadow-sm bg-white  text-neutral-600 dark:text-neutral-300 disabled:bg-neutral-100 ${
        currentPage === i + 1 ? "dark:bg-neutral-700 dark:text-neutral-1000" : "dark:bg-neutral-800"
      }`}
      on:click={nextPosts(i * 10, (i + 1) * 10)}>{i + 1}</button
    >
  {/each}
</div>
