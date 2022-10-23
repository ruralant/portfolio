<script>
  export let postData;
  export let postPath;
  export let { title, subtitle, tags, icon, date, type, slug } = postData;
</script>

<li
  class="w-full max-w-sm h-60 rounded-md overflow-hidden bg-white dark:bg-neutral-900 shadow-md p-6"
>
  <a class="h-full flex flex-col justify-between" href={postPath}>
    <div>
      <div
        class="text-neutral-800 dark:text-white bg-gradient-90 from-purple-600 to-red-500 dark:from-purple-500 dark:to-red-400 font-bold text-xl mb-2 "
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
          class="capitalize mr-2 inline-flex rounded-md shadow-sm px-2 py-1 text-xs text-neutral-600 bg-neutral-200 dark:text-neutral-300 dark:bg-neutral-700"
        >
          {tag}
        </span>
      {/each}
    </div>
  </a>
</li>
