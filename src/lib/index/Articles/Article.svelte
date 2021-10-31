<script>
  import Laptop from '$lib/components/icons/Laptop.svelte';
  export let postsData;
  export let { title, subtitle, tags, icon } = postsData;
</script>

<li class="rounded shadow-md p-5">
  <div>
    <div class="flex justify-between mb-4">
      <Laptop />
      <ul class="flex text-xs">
        {#each tags as tag}
          <li class="ml-2">
            <p class="text-black dark:text-white">{tag}</p>
          </li>
        {/each}
      </ul>
    </div>
    <h6 class="text-base text-black dark:text-white">{title}</h6>
    <p class="text-sm text-black dark:text-white">{subtitle}</p>
  </div>
</li>
