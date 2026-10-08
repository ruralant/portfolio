<script lang="ts">
  import Tag from "#lib/components/Tag.svelte";
  import type { Company } from "#lib/types.js";

  interface Props {
    company: Company;
  }

  let { company }: Props = $props();

  const allTech = $derived([
    ...company.techStack.frontEnd,
    ...company.techStack.backEnd,
    ...company.techStack.tools
  ]);
</script>

<article
  class="md3:grid-cols-[12rem_minmax(0,1fr)] md3:py-14 border-line grid gap-x-12 gap-y-5 border-t py-10"
>
  <div class="text-sm leading-relaxed">
    <p class="text-ink tabular-nums">{company.from} — {company.to}</p>
    {#if company.location}
      <p class="text-muted mt-1">{company.location}</p>
    {/if}
    {#if company.sector}
      <p class="text-muted">{company.sector}</p>
    {/if}
  </div>

  <div class="min-w-0">
    <h2 class="md2:text-[2.125rem] text-ink tracking-title font-serif text-3xl leading-tight">
      {company.role}
      <span class="text-muted">at</span>
      <!-- company.url is an external link from data, so it is not resolvable as an internal route -->
      <!-- eslint-disable svelte/no-navigation-without-resolve -->
      <a class="link" href={company.url} target="_blank" rel="noopener noreferrer"
        >{company.name}<span aria-hidden="true" class="text-muted font-sans text-xl"> ↗</span><span
          class="sr-only"
        >
          (opens in a new tab)</span
        ></a
      >
      <!-- eslint-enable svelte/no-navigation-without-resolve -->
    </h2>

    <ul
      class="text-ink-soft marker:text-muted mt-5 max-w-2xl list-disc space-y-2.5 pl-5 leading-relaxed text-pretty"
    >
      {#each company.description as point (point)}
        <li class="pl-1">{point}</li>
      {/each}
    </ul>

    {#if allTech.length > 0}
      <ul class="mt-6 flex flex-wrap gap-1.5" aria-label="Tech stack">
        {#each allTech as tech (tech)}
          <li><Tag tagName={tech} /></li>
        {/each}
      </ul>
    {/if}
  </div>
</article>
