<script lang="ts">
  import { companies } from "#lib/data/companies.json";
  import PageHeader from "#lib/components/PageHeader.svelte";
  import Timeline from "./Timeline.svelte";
</script>

<svelte:head>
  <title>Career · Antonio Rossi</title>
  <meta
    name="description"
    content="Antonio Rossi's two most recent software engineering roles, what he built there and the tools he used."
  />
</svelte:head>

<PageHeader eyebrow="Career" title="The cool things I built and where">
  My two most recent roles, what I built there and the tools I used along the way.
</PageHeader>

<Timeline {companies} />

<p class="text-ink-soft mt-10 max-w-2xl text-lg leading-relaxed">
  Earlier roles are on my
  <a
    class="link text-ink"
    href="https://www.linkedin.com/in/antoniorossii/"
    target="_blank"
    rel="noopener noreferrer"
    >LinkedIn profile<span aria-hidden="true" class="text-accent">&nbsp;↗</span><span
      class="sr-only"
    >
      (opens in a new tab)</span
    ></a
  >.
</p>
