<script lang="ts">
  import { resolve } from "$app/paths";
  import PostListItem from "#lib/components/PostListItem.svelte";
  import type { PostSummary } from "#lib/types.js";

  interface Props {
    posts: PostSummary[];
  }

  let { posts }: Props = $props();
</script>

<section
  aria-labelledby="latest-articles"
  class="md3:pb-20 border-line grid gap-y-8 border-t pt-12 pb-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-16"
>
  <div>
    <h2 id="latest-articles" class="text-ink tracking-title font-serif text-[2rem] leading-none">
      Writing
    </h2>
    <p class="text-muted mt-3 text-[0.9375rem] leading-relaxed">
      Notes on green software and a lighter web.
    </p>
    <a class="link text-ink mt-5 inline-block text-[0.9375rem]" href={resolve("blog")}>
      All articles<span aria-hidden="true" class="text-accent">&nbsp;→</span>
    </a>
  </div>
  <ul class="[&>li:first-child]:border-t-0 [&>li:first-child]:pt-0">
    {#each posts as post (post.path)}
      <PostListItem post={post.meta} showTags />
    {/each}
  </ul>
</section>
