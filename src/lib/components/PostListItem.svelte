<script lang="ts">
  import { resolve } from "$app/paths";
  import { formatDate, isoDate } from "#lib/utils.js";
  import Tag from "./Tag.svelte";
  import type { PostMetadata } from "#lib/types.js";

  interface Props {
    post: PostMetadata;
    headingLevel?: 2 | 3;
    showTags?: boolean;
    /** Leave the year out where the list is already grouped by year */
    showYear?: boolean;
  }

  let { post, headingLevel = 3, showTags = false, showYear = true }: Props = $props();
</script>

<li
  class={[
    "group border-line relative grid gap-x-10 gap-y-2 border-t py-7",
    showYear
      ? "md3:grid-cols-[8.5rem_minmax(0,1fr)_auto]"
      : "md3:grid-cols-[4.5rem_minmax(0,1fr)_auto]",
    "md3:items-baseline"
  ]}
>
  <time datetime={isoDate(post.date)} class="text-muted text-sm tabular-nums">
    {formatDate(post.date, showYear)}
  </time>

  <div class="min-w-0">
    <svelte:element
      this={`h${headingLevel}`}
      class="md2:text-[1.875rem] text-ink tracking-title font-serif text-[1.65rem] leading-[1.15] text-balance"
    >
      <a
        class="decoration-accent/60 focus-visible:after:outline-accent no-underline decoration-1 underline-offset-[0.18em] group-hover:underline after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-solid"
        href={resolve("/blog/[slug]", { slug: post.slug })}
      >
        {post.title}
      </a>
    </svelte:element>
    <p class="text-ink-soft mt-2 max-w-2xl leading-relaxed text-pretty">{post.subtitle}</p>
    {#if showTags && post.tags.length > 0}
      <ul class="relative mt-4 flex flex-wrap gap-2" aria-label="Tags">
        {#each post.tags as tag (tag)}
          <li><Tag tagName={tag} url={`blog/tags/${encodeURIComponent(tag)}`} /></li>
        {/each}
      </ul>
    {/if}
  </div>

  <span
    aria-hidden="true"
    class="md3:block text-muted group-hover:text-accent hidden text-lg transition group-hover:translate-x-1"
  >
    →
  </span>
</li>
