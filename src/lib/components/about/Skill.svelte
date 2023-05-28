<script>
  import Laptop from "../icons/Laptop.svelte";

  export let skill;
  export let maxValue;
  const percentage = (skill.value / maxValue) * 100;
</script>

<div>
  <div class="flex items-center">
    <span class="mr-2">{skill.skill}</span>
    {#if !skill.end}
      <span><Laptop /></span>
    {/if}
  </div>
  <div class="progress-bar w-full h-4 bg-slate-200 dark:bg-neutral-800">
    <div class="progress-bar-fill bg-progressBarBlue" style={`width: ${percentage}%`}>
      <!-- <span>{skill.text}</span> -->
    </div>
  </div>
</div>

<style>
  .progress-bar {
    border-radius: 0.25rem;
    margin-bottom: 1rem;
  }
  .progress-bar-fill {
    height: 100%;
    /* background-color: rgb(168, 85, 247); */
    border-radius: 0.25rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    animation: progress 1s ease-in-out forwards;
  }
  /* 
  .progress-bar-fill span {
    padding-right: 0.5rem;
    color: #fff;
  } */
  @keyframes progress {
    0% {
      width: 0%;
    }
  }
</style>
