<script lang="ts">
  import { resolve } from "$app/paths";
  import { formatDate, isoDate } from "#lib/utils.js";
  import type { NowSummary } from "#lib/types.js";

  interface Props {
    now: NowSummary;
  }

  let { now }: Props = $props();
</script>

<section
  aria-labelledby="now-heading"
  class="md3:pb-20 border-line grid gap-y-8 border-t pt-12 pb-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-16"
>
  <div>
    <h2 id="now-heading" class="text-ink tracking-title font-serif text-[2rem] leading-none">
      Now
    </h2>
    <p class="text-muted mt-3 text-[0.9375rem]">
      Updated <time datetime={isoDate(now.date)}>{formatDate(now.date)}</time>
    </p>
    <a class="link text-ink mt-5 inline-block text-[0.9375rem]" href={resolve("now")}>
      What I’m up to<span aria-hidden="true" class="text-accent">&nbsp;→</span>
    </a>
  </div>

  <dl class="md2:grid-cols-2 grid gap-x-10 gap-y-8">
    {#each now.sections as section (section.heading)}
      <div>
        <dt class="text-accent font-serif text-[1.375rem] leading-tight italic">
          {section.heading}
        </dt>
        <dd class="mt-2.5">
          <ul
            class="text-ink-soft marker:text-muted list-disc space-y-1.5 pl-4 text-[0.9375rem] leading-relaxed text-pretty"
          >
            {#each section.points as point, i (i)}
              <li>
                {#each point as part, j (j)}{#if part.emphasis}<em>{part.text}</em
                    >{:else}{part.text}{/if}{/each}
              </li>
            {/each}
          </ul>
        </dd>
      </div>
    {/each}
  </dl>
</section>
