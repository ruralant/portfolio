<script lang="ts">
  import { resolve } from "$app/paths";
  import { GRID_ZONE, MODE_LABELS } from "#lib/grid/modes.js";
  import { grid } from "#lib/grid/state.svelte.js";
  import { formatTime } from "#lib/utils.js";
  import ModeMeter from "./ModeMeter.svelte";

  const caption = $derived.by(() => {
    if (!grid.mode) return `Checking ${GRID_ZONE.name}’s grid`;
    if (grid.choice !== "auto" && grid.auto) {
      return `Your pick; the grid calls for ${MODE_LABELS[grid.auto].toLowerCase()}`;
    }
    if (grid.intensity === null) return `${GRID_ZONE.name}’s grid can’t be read right now`;
    return grid.datetime
      ? `${GRID_ZONE.name}’s grid at ${formatTime(grid.datetime)}`
      : `${GRID_ZONE.name}’s grid right now`;
  });
</script>

<a
  class="group border-line-strong hover:border-ink inline-flex items-stretch overflow-hidden rounded border text-xs leading-none no-underline transition-colors"
  href={resolve("grid")}
>
  <span class="text-ink-soft px-3 py-2 tabular-nums">
    <span class="sr-only">Grid carbon intensity:</span>
    {grid.intensity ?? "–"} g CO<sub>2</sub>/kWh
  </span>
  <span
    class="border-line-strong bg-surface text-ink group-hover:border-ink group-hover:text-accent inline-flex items-center gap-2 border-l px-3 py-2 font-medium transition-colors"
  >
    <ModeMeter />
    <span
      ><span class="sr-only">, site in </span>{grid.mode ? MODE_LABELS[grid.mode] : "Grid"} mode</span
    >
    <span aria-hidden="true" class="-ml-1">&nbsp;→</span>
  </span>
</a>
<p class="text-muted mt-2 text-xs" aria-live="polite">{caption}</p>
