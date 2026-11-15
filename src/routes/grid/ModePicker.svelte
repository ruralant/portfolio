<script lang="ts">
  import { MODE_LABELS, type GridChoice } from "#lib/grid/modes.js";
  import { chooseMode, grid } from "#lib/grid/state.svelte.js";

  const CHOICES: { value: GridChoice; label: string; hint: string }[] = [
    { value: "auto", label: "Follow the grid", hint: "Recommended" },
    { value: "full", label: MODE_LABELS.full, hint: "Always the full design" },
    { value: "balanced", label: MODE_LABELS.balanced, hint: "Still, lighter images" },
    { value: "lean", label: MODE_LABELS.lean, hint: "Fewest bytes, every time" }
  ];
</script>

<fieldset>
  <legend class="eyebrow">Pick a mode</legend>
  <div class="md2:grid-cols-2 mt-4 grid gap-3">
    {#each CHOICES as { value, label, hint } (value)}
      <label
        class="border-line has-checked:border-accent hover:border-line-strong flex cursor-pointer items-start gap-3 rounded border p-4 transition-colors"
      >
        <input
          type="radio"
          name="grid-mode"
          {value}
          checked={grid.choice === value}
          onchange={() => chooseMode(value)}
          class="accent-accent mt-1"
        />
        <span>
          <span class="text-ink block text-[0.9375rem] font-medium">{label}</span>
          <span class="text-muted mt-0.5 block text-sm">{hint}</span>
        </span>
      </label>
    {/each}
  </div>
</fieldset>
