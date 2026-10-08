<script lang="ts">
  import { resolve } from "$app/paths";
  import Longform from "#lib/components/Longform.svelte";
  import { formatDate, isoDate } from "#lib/utils.js";
  import type { Snippet } from "svelte";
  import type { NowUpdate } from "#lib/types.js";

  interface Props {
    title: string;
    subtitle: string;
    date: string;
    /** This update's filename; passed by the /now routes, not frontmatter */
    slug: string;
    /** Every update, newest first */
    updates: NowUpdate[];
    children?: Snippet;
  }

  let { title, subtitle, date, slug, updates, children }: Props = $props();

  const isLatest = $derived(updates[0]?.slug === slug);
  const previous = $derived(updates.slice(1));
  const pageTitle = $derived(isLatest ? title : `${title}, ${formatDate(date)}`);
  const url = $derived(
    isLatest ? "https://www.antoniorossi.net/now" : `https://www.antoniorossi.net/now/${slug}`
  );
</script>

<svelte:head>
  <title>{pageTitle} - Antonio Rossi</title>
  <meta name="description" content={subtitle} />
  <meta property="og:title" content={pageTitle} />
  <meta property="og:site_name" content="Antonio Rossi Website" />
  <meta property="og:description" content={subtitle} />
  <meta property="og:url" content={url} />
  <meta name="twitter:title" content={pageTitle} />
  <meta name="twitter:description" content={subtitle} />
  <meta name="twitter:card" content="summary" />
</svelte:head>

<Longform
  {title}
  {subtitle}
  back={isLatest ? { url: "", text: "Home" } : { url: "now", text: "Now" }}
  eyebrow="{isLatest ? 'Last updated' : 'Archived update'}: {formatDate(date)}"
>
  {#snippet meta()}
    <div>
      <dt class="eyebrow">{isLatest ? "Last updated" : "Archived update"}</dt>
      <dd class="text-ink mt-2"><time datetime={isoDate(date)}>{formatDate(date)}</time></dd>
    </div>
    <div>
      <dt class="eyebrow">What is this?</dt>
      <dd class="text-ink-soft mt-2 leading-relaxed">
        A <a class="link text-ink" href="https://nownownow.com/about">now page</a>: what I’m focused
        on at this point in my life.
      </dd>
    </div>
  {/snippet}

  {#snippet appendix()}
    {#if previous.length > 0}
      <section aria-labelledby="previous-updates" class="mt-16">
        <h2 id="previous-updates" class="eyebrow">Previous updates</h2>
        <ol class="mt-6">
          {#each previous as update (update.slug)}
            {@const current = update.slug === slug}
            <li
              class="group border-line md2:grid-cols-[9rem_minmax(0,1fr)_auto] md2:items-baseline relative grid gap-x-8 gap-y-1 border-t py-5 last:border-b"
            >
              <a
                class={[
                  "decoration-accent/60 focus-visible:after:outline-accent font-serif text-2xl leading-tight no-underline decoration-1 underline-offset-[0.18em] group-hover:underline after:absolute after:inset-0 focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-solid",
                  current ? "text-accent" : "text-ink"
                ]}
                href={resolve("/now/[slug]", { slug: update.slug })}
                aria-current={current ? "page" : undefined}
              >
                <time datetime={isoDate(update.date)}>{formatDate(update.date)}</time>
              </a>
              <p class="text-ink-soft leading-relaxed text-pretty">{update.subtitle}</p>
              {#if current}
                <span class="md2:block eyebrow hidden">Reading</span>
              {:else}
                <span
                  aria-hidden="true"
                  class="md2:block text-muted group-hover:text-accent hidden text-lg transition group-hover:translate-x-1"
                >
                  →
                </span>
              {/if}
            </li>
          {/each}
        </ol>
      </section>
    {/if}
  {/snippet}

  {#if !isLatest}
    <p class="not-prose border-line text-ink-soft mb-10 border-b pb-8 text-base leading-relaxed">
      This is an archived update from {formatDate(date)}.
      <a class="link text-ink" href={resolve("/now")}>
        See what I’m up to now <span aria-hidden="true">→</span>
      </a>
    </p>
  {/if}

  {@render children?.()}
</Longform>
