<script lang="ts">
  import { companies } from "$lib/data/companies.json";
  import PageHeader from "$lib/components/PageHeader.svelte";
  import Timeline from "./Timeline.svelte";
</script>

<svelte:head>
  <title>Career · Antonio Rossi</title>
  <meta
    name="description"
    content="Where Antonio Rossi has worked as a software engineer, what he built there and the tools he used."
  />
</svelte:head>

<PageHeader eyebrow="Career" title="The cool things I built and where">
  Where I’ve worked, what I built there and the tools I used along the way.
</PageHeader>

<Timeline {companies} />
