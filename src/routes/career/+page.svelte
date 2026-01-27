<script>
  import { companies } from "$lib/data/companies.json";
  import Timeline from "$lib/career/Timeline.svelte";
</script>

<div class="w-full text-neutral-800 sm:my-9 dark:text-neutral-100">
  <div class="flex items-center justify-center">
    <h1 class="font-Cormorant m-0 text-3xl leading-[1.15]">
      👨‍💻 The cool things I built and where 👨‍💻
    </h1>
  </div>
</div>
<Timeline {companies} />
