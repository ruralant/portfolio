<script lang="ts">
  import PageHeader from "#lib/components/PageHeader.svelte";
  import { GRID_ZONE, MODE_LABELS, THRESHOLDS, type GridMode } from "#lib/grid/modes.js";
  import { grid } from "#lib/grid/state.svelte.js";
  import { formatTime } from "#lib/utils.js";
  import ModePicker from "./ModePicker.svelte";

  const MODES: { mode: GridMode; range: string; summary: string; changes: string[] }[] = [
    {
      mode: "full",
      range: `Below ${THRESHOLDS.full} g`,
      summary: "The site as designed.",
      changes: [
        "Instrument Serif and Geist, the two web fonts",
        "Images as sharp as your screen can show them",
        "The illustration on the home page moves: turbine, clouds, water, bees and fireflies",
        "Pages cross-fade as you move between them"
      ]
    },
    {
      mode: "balanced",
      range: `${THRESHOLDS.full}–${THRESHOLDS.balanced - 1} g`,
      summary: "Motion stops and images get lighter. Also used whenever the grid can’t be read.",
      changes: [
        "The illustration holds still, so your device stops redrawing it every frame",
        "Pages swap without the cross-fade",
        "Images at one image pixel per screen point: on a high-density screen that is often less than half the bytes"
      ]
    },
    {
      mode: "lean",
      range: `${THRESHOLDS.balanced} g and above`,
      summary: "Only what the words need.",
      changes: [
        "Everything Balanced does",
        "Text in your device’s own fonts, which skips about 53 KB of web fonts",
        "Images wait for you: each one shows its description and a button that loads it"
      ]
    }
  ];

  const section =
    "md3:pb-20 border-line grid gap-y-8 border-t pt-12 pb-16 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-16";
  const heading = "text-ink tracking-title font-serif text-[2rem] leading-none";
</script>

<svelte:head>
  <title>Grid-aware · Antonio Rossi</title>
  <meta
    name="description"
    content="How antoniorossi.net reads the carbon intensity of Great Britain's electricity grid and switches between full, balanced and lean modes."
  />
  <meta property="og:title" content="This site follows the grid" />
  <meta property="og:url" content="https://www.antoniorossi.net/grid" />
</svelte:head>

<PageHeader eyebrow="Grid-aware" title="This site follows the grid">
  Electricity is cleaner on some hours than others. This site checks how much carbon {GRID_ZONE.name}’s
  grid is emitting and asks less of your device and the network when the grid is dirty.
</PageHeader>

<section aria-labelledby="now-heading" class={section}>
  <h2 id="now-heading" class={heading}>Right now</h2>

  <div>
    <p class="text-ink font-serif text-7xl leading-none tabular-nums">
      {grid.intensity ?? "–"}<span class="text-muted ml-3 font-sans text-base"
        >g CO<sub>2</sub>eq/kWh</span
      >
    </p>
    <p class="text-muted mt-3 text-[0.9375rem]">
      {#if grid.intensity !== null && grid.datetime}
        {GRID_ZONE.name}’s grid at {formatTime(grid.datetime)}, from
        <a
          class="link"
          href="https://app.electricitymaps.com/zone/{GRID_ZONE.code}"
          target="_blank"
          rel="noopener noreferrer"
          >Electricity Maps<span class="sr-only"> (opens in a new tab)</span></a
        >
      {:else if grid.mode}
        {GRID_ZONE.name}’s grid can’t be read right now
      {:else}
        Checking {GRID_ZONE.name}’s grid
      {/if}
    </p>
    <p class="md2:text-xl text-ink-soft mt-8 max-w-2xl text-lg leading-relaxed" aria-live="polite">
      {#if !grid.mode}
        Working out which mode this page runs in.
      {:else if grid.choice !== "auto"}
        You picked <strong class="text-ink font-medium">{MODE_LABELS[grid.mode]}</strong>.
        {#if grid.auto}The grid alone would call for {MODE_LABELS[grid.auto].toLowerCase()}.{/if}
      {:else}
        So the site is running in <strong class="text-ink font-medium"
          >{MODE_LABELS[grid.mode]}</strong
        >
        mode{grid.intensity === null ? ", its fallback" : ""}.
      {/if}
    </p>

    <div class="mt-10 max-w-2xl">
      <ModePicker />
      <p class="text-muted mt-4 text-sm leading-relaxed text-pretty">
        Your pick applies straight away and is kept in a cookie called <code>grid-mode</code> for a year.
        It holds the mode and nothing else; “Follow the grid” deletes it.
      </p>
    </div>
  </div>
</section>

<section aria-labelledby="modes-heading" class={section}>
  <div>
    <h2 id="modes-heading" class={heading}>Three modes</h2>
    <p class="text-muted mt-3 text-[0.9375rem]">By grams of CO<sub>2</sub>eq per kWh</p>
  </div>

  <ol class="grid gap-4">
    {#each MODES as { mode, range, summary, changes } (mode)}
      <li
        class={[
          "md2:grid md2:grid-cols-[9rem_minmax(0,1fr)] md2:gap-x-6 rounded border p-5 transition-colors",
          grid.mode === mode ? "border-accent" : "border-line"
        ]}
      >
        <div>
          <p class="text-ink font-serif text-[1.75rem] leading-none">{MODE_LABELS[mode]}</p>
          <p class="text-muted mt-2 text-sm tabular-nums">{range}</p>
          <p class={["eyebrow text-accent mt-2 text-base", grid.mode !== mode && "hidden"]}>
            Running now
          </p>
        </div>
        <div class="md2:mt-0 mt-4">
          <p class="text-ink text-[0.9375rem] leading-relaxed">{summary}</p>
          <ul
            class="text-ink-soft marker:text-muted mt-3 list-disc space-y-1.5 pl-4 text-sm leading-relaxed text-pretty"
          >
            {#each changes as change (change)}
              <li>{change}</li>
            {/each}
          </ul>
        </div>
      </li>
    {/each}
  </ol>
</section>

<section aria-labelledby="how-heading" class={section}>
  <h2 id="how-heading" class={heading}>How it works</h2>

  <div class="md2:text-lg text-ink-soft max-w-2xl space-y-5 leading-relaxed text-pretty">
    <p>
      <a
        class="link text-ink"
        href="https://www.electricitymaps.com"
        target="_blank"
        rel="noopener noreferrer"
        >Electricity Maps<span class="sr-only"> (opens in a new tab)</span></a
      >
      estimates the carbon intensity of each grid: the grams of CO<sub>2</sub>-equivalent emitted,
      over the whole life cycle of the power stations, for every kilowatt-hour used. The site asks
      for {GRID_ZONE.name}’s figure at most once every 15 minutes and keeps the answer on Netlify’s
      CDN.
    </p>
    <p>
      An edge function marks each page with the mode on its way to you, so the first paint already
      leaves out what the mode skips. The pages are the same prerendered files in every mode; the
      stylesheet does the switching.
    </p>
    <p>
      It follows {GRID_ZONE.name} because that is where I live, and the free Electricity Maps plan covers
      a single zone. If you are somewhere else, your own grid may be cleaner or dirtier.
    </p>
  </div>
</section>
