<script>
  import Laptop from '$lib/components/icons/Laptop.svelte';
  export let postsData;
  export let { title, subtitle, tags, icon } = postsData;
</script>

<li class="max-w-sm rounded overflow-hidden shadow-lg">
  <!-- <div>
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
  </div> -->
  <!-- <div class=""> -->
  <img class="w-full" src="/mountain.jpg" alt="Mountain" />
  <div class="px-6 py-4">
    <div class="text-black dark:text-white font-bold text-xl mb-2">
      Mountain
    </div>
    <p class="text-black dark:text-white">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
      quia, Nonea! Maiores et perferendis eaque, exercitationem praesentium
      nihil.
    </p>
  </div>
  <div class="px-6 pt-4 pb-2">
    <span
      class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black dark:text-white mr-2 mb-2"
      >photography</span
    >
    <span
      class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black dark:text-white mr-2 mb-2"
      >travel</span
    >
    <span
      class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-black dark:text-white mr-2 mb-2"
      >winter</span
    >
  </div>
  <!-- </div> -->
</li>
