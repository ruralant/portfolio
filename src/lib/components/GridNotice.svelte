<script lang="ts">
  import { resolve } from "$app/paths";
  import { GRID_ZONE, MODE_LABELS } from "#lib/grid/modes.js";
  import { grid } from "#lib/grid/state.svelte.js";
  import ModeMeter from "./ModeMeter.svelte";
</script>

<!--
  Shown above the header whenever the site holds something back. Whether it shows, and which
  sentence, comes from the mode the edge function stamps on <html>, so it is in place from the
  first paint and never shifts the page; only the reading on the right waits for hydration.
-->
<aside
  aria-label="Energy-saving mode"
  class="bg-surface border-line balanced:block lean:block hidden border-b"
>
  <div
    class="md2:px-8 max-w-content mx-auto flex flex-wrap items-center gap-x-6 gap-y-1 px-5 py-2.5 text-sm"
  >
    <p class="text-ink-soft flex items-center gap-2.5">
      <ModeMeter />
      <span class="balanced:inline hidden">
        This site is in <strong class="text-ink font-medium">{MODE_LABELS.balanced} mode</strong> to save
        energy: no animations, lighter images.
      </span>
      <span class="lean:inline hidden">
        This site is in <strong class="text-ink font-medium">{MODE_LABELS.lean} mode</strong> to save
        energy: your device’s fonts, images on request.
      </span>
    </p>
    <p class="ml-auto flex items-center gap-4">
      <span class="text-muted md3:inline hidden tabular-nums">
        {#if grid.choice !== "auto"}
          Your pick
        {:else if grid.intensity !== null}
          {GRID_ZONE.code} grid: {grid.intensity} g CO<sub>2</sub>/kWh
        {:else if grid.mode}
          {GRID_ZONE.code} grid: no reading
        {/if}
      </span>
      <a class="link text-ink" href={resolve("grid")}>
        See why or change it<span aria-hidden="true" class="text-accent">&nbsp;→</span>
      </a>
    </p>
  </div>
</aside>
