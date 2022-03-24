<script>
  export let postsData;
  export let { title, subtitle, tags, icon, date, type, slug } = postsData;
</script>

<li
  class="w-full max-w-sm h-60 rounded-md overflow-hidden bg-white dark:bg-neutral-800 duration-300 ease-in-out shadow-lg p-6"
>
  <a
    class="h-full flex flex-col justify-between"
    href={`/blog/${type}/${slug}`}
  >
    <div>
      <div
        class="text-neutral-800 dark:text-white bg-gradient-90 from-purple-600 to-red-500 dark:from-purple-500 dark:to-red-400 font-bold text-xl mb-2 transition duration-300 ease-in-out"
      >
        {title}
      </div>
      <p class="text-neutral-800 dark:text-white">
        {subtitle}
      </p>
    </div>
    <div>
      {#each tags as tag}
        <span
          class="capitalize mr-2 inline-flex rounded-md shadow-sm px-2 py-1 bg-white text-xs text-neutral-600 bg-neutral-200 dark:text-neutral-300 dark:bg-neutral-700 duration-300 ease-in-out"
        >
          {tag}
        </span>
      {/each}
    </div>
  </a>
</li>
