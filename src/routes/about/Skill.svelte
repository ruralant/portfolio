<script lang="ts">
  interface Props {
    skill: { name: string; end?: string; value: number };
    percentage: number;
  }

  let { skill, percentage }: Props = $props();

  const years = $derived(Math.max(1, Math.round(skill.value / 12)));
  const past = $derived(Boolean(skill.end));
</script>

<li
  class="md2:grid-cols-[9rem_minmax(0,1fr)_4rem] border-line grid grid-cols-[7rem_minmax(0,1fr)_3.5rem] items-center gap-4 border-t py-3 text-[0.9375rem]"
>
  <span class={past ? "text-muted" : "text-ink"}>{skill.name}</span>
  <span class="bg-line relative h-px" aria-hidden="true">
    <span
      class={[
        "bar absolute -top-px left-0 h-[3px] rounded-full",
        past ? "bg-line-strong" : "bg-ink"
      ]}
      style:width="{percentage}%"
    ></span>
  </span>
  <span class="text-muted text-right text-sm tabular-nums">
    {years}
    {years === 1 ? "yr" : "yrs"}<span class="sr-only">{past ? ", in the past" : ""}</span>
  </span>
</li>

<style>
  .bar {
    transform-origin: left;
    animation: grow 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
  }

  @keyframes grow {
    from {
      transform: scaleX(0);
    }
  }
</style>
