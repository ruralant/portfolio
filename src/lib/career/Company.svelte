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

<a href={company.url} target="_blank" rel="noopener noreferrer" class="experience-item group">
  <div class="date-column">
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

  <div class="content-column">
    <h3 class="mb-2">
      <span
        class="job-title font-medium text-neutral-800 group-hover:text-teal-600 dark:text-neutral-100 dark:group-hover:text-teal-400"
      >
        {company.role} · {company.name}
      </span>
    </h3>

    <ul
      class="description-list mb-4 space-y-2 text-sm leading-normal text-neutral-600 dark:text-neutral-400"
    >
      {#each company.description as point}
        <li class="pl-0">{point}</li>
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

<style>
  .experience-item {
    display: grid;
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    grid-template-columns: 150px 1fr;
    gap: 1rem;
    padding: 1rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s ease;
  }

  .experience-item:hover {
    background-color: rgba(203, 213, 225, 0.1);
  }

  :global(.dark) .experience-item:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }

  .date-column {
    padding-top: 0.25rem;
  }

  .content-column {
    min-width: 0;
  }

  .job-title {
    transition: color 0.2s ease;
  }

  .description-list {
    list-style-type: disc;
    padding-left: 1.25rem;
  }

  .description-list li {
    padding-left: 0.25rem;
  }

  @media (max-width: 640px) {
    .experience-item {
      grid-template-columns: 1fr;
      gap: 0.5rem;
      padding: 0.75rem;
    }
  }
</style>
