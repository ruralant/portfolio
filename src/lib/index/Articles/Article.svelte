<script>
  import Laptop from '$lib/components/icons/Laptop.svelte';
  export let postsData;
  export let { title, subtitle, tags, icon, date } = postsData;
</script>

<li
  class="max-w-sm h-60 rounded-md overflow-hidden bg-white dark:bg-neutral-900 duration-300 ease-in-out shadow-lg flex flex-col justify-between p-6"
>
  <div>
    <div
      class="text-black dark:text-white article-title font-bold text-xl mb-2"
    >
      {title}
    </div>
    <p class="text-black dark:text-white">
      {subtitle}
    </p>
  </div>
  <div>
    {#each tags as tag}
      <span
        class="capitalize mr-2 inline-flex rounded-md shadow-sm px-2 py-1 bg-white text-xs text-neutral-600 bg-neutral-200 dark:text-neutral-300 dark:bg-neutral-800 duration-300 ease-in-out"
        >{tag}</span
      >
    {/each}
  </div>
</li>

<style>
  .article-title {
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(
      85deg,
      rgb(114, 114, 187) 0%,
      hsl(273deg 78% 62%) 19%,
      hsl(300deg 63% 54%) 27%,
      hsl(318deg 90% 57%) 34%,
      hsl(328deg 100% 58%) 41%,
      hsl(338deg 100% 61%) 47%,
      hsl(352deg 100% 65%) 53%,
      hsl(9deg 100% 65%) 59%,
      hsl(22deg 100% 60%) 66%,
      hsl(32deg 100% 55%) 73%,
      hsl(43deg 100% 47%) 81%,
      hsl(52deg 99% 43%) 100%
    );
  }
</style>
