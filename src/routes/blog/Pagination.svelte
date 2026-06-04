<script lang="ts">
  interface Props {
    total: number;
    goToPage: (page: number) => void;
    currentPage: number;
  }

  let { total, goToPage, currentPage }: Props = $props();
  const pages = $derived(Math.ceil(total / 10));
</script>

<div>
  {#each Array(pages) as _, i (i)}
    <button
      disabled={currentPage === i + 1}
      class={`mx-2 mt-10 h-10 w-10 rounded-full bg-white text-neutral-600 shadow-sm disabled:bg-neutral-100 dark:text-neutral-300 ${
        currentPage === i + 1 ? "dark:text-neutral-1000 dark:bg-neutral-700" : "dark:bg-neutral-800"
      }`}
      onclick={() => goToPage(i + 1)}
    >
      {i + 1}
    </button>
  {/each}
</div>
