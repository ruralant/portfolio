<script>
  export let skill;
  export let percentage;
</script>

{#if skill && percentage}
  <div>
    <div class="flex items-center justify-between">
      <span class="mr-2">{skill.name}</span>
    </div>
    <div class="progress-bar h-4 w-full bg-slate-200 dark:bg-neutral-800">
      <div class="progress-bar-fill bg-progressBarBlue" style={`width: ${percentage}%`} />
    </div>
  </div>
  <style>
    .progress-bar {
      border-radius: 0.25rem;
      margin-bottom: 1rem;
    }
    .progress-bar-fill {
      height: 100%;
      border-radius: 0.25rem;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      animation: progress 1s ease-in-out forwards;
    }
    @keyframes progress {
      0% {
        width: 0%;
      }
    }
  </style>
{/if}
