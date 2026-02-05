<script>
  import Tag from "$lib/components/blog/Tag.svelte";

  let { company } = $props();

  // Combine all tech stack items into one array
  const allTech = $derived([
    ...company.techStack.frontEnd,
    ...company.techStack.backEnd,
    ...company.techStack.tools
  ]);
</script>

<a
  href={company.url}
  target="_blank"
  rel="noopener noreferrer"
  class="group bg-almost-white dark:bg-light-space-grey grid cursor-pointer grid-cols-1 gap-2 rounded-lg p-3 no-underline shadow-md transition-colors duration-200 md:grid-cols-[150px_1fr] md:gap-4 md:p-4"
>
  <div class="pt-1 text-center md:text-left">
    <p class="text-xs font-semibold tracking-wide text-neutral-500 uppercase dark:text-neutral-400">
      {company.from} — {company.to === "Present" ? "Present" : company.to}
    </p>
    {#if company.location || company.sector}
      <div class="mt-2 space-y-1 text-xs text-neutral-500 dark:text-neutral-500">
        {#if company.location}
          <p>{company.location}</p>
        {/if}
        {#if company.sector}
          <p>{company.sector}</p>
        {/if}
      </div>
    {/if}
  </div>

  <div class="min-w-0 text-left sm:text-center md:text-left">
    <h3 class="mb-2">
      <span
        class="font-medium text-neutral-800 transition-colors duration-200 group-hover:text-teal-600 dark:text-neutral-100 dark:group-hover:text-teal-400"
      >
        {company.role} · {company.name}
      </span>
    </h3>

    <ul
      class="mb-4 list-inside list-disc space-y-2 pl-0 text-sm leading-normal text-neutral-600 sm:list-outside sm:pl-5 dark:text-neutral-400"
    >
      {#each company.description as point}
        <li class="pl-1">{point}</li>
      {/each}
    </ul>

    {#if allTech.length > 0}
      <ul class="flex flex-wrap gap-2">
        {#each allTech as tech}
          <li>
            <Tag tagName={tech} url={undefined} />
          </li>
        {/each}
      </ul>
    {/if}
  </div>
</a>
