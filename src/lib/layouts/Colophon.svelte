<script lang="ts">
  import Longform from "$lib/components/Longform.svelte";
  import type { Snippet } from "svelte";

  interface Props {
    title: string;
    subtitle: string;
    lastUpdated: string;
    children?: Snippet;
  }

  let { title, subtitle, lastUpdated, children }: Props = $props();
</script>

<svelte:head>
  <title>{title} - Antonio Rossi</title>
  <meta name="description" content={subtitle} />
  <meta property="og:title" content={title} />
  <meta property="og:site_name" content="Antonio Rossi Website" />
  <meta property="og:description" content={subtitle} />
  <meta property="og:url" content="https://www.antoniorossi.net/colophon" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={subtitle} />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<Longform
  {title}
  {subtitle}
  back={{ url: "/", text: "Home" }}
  eyebrow="Last updated: {lastUpdated}"
>
  {#snippet meta()}
    <div>
      <dt class="eyebrow">Last updated</dt>
      <dd class="text-ink mt-2">{lastUpdated}</dd>
    </div>
    <div>
      <dt class="eyebrow">Source</dt>
      <dd class="mt-2">
        <a class="link text-ink" href="https://github.com/ruralant">GitHub</a>
      </dd>
    </div>
  {/snippet}

  {@render children?.()}
</Longform>
