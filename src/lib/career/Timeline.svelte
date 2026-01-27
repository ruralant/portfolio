<script>
  import Company from "./Company.svelte";

  let { companies } = $props();
</script>

<div class="experience-container">
  {#each companies as company}
    <Company {company} />
  {/each}
</div>

<style>
  .experience-container {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (max-width: 640px) {
    .experience-container {
      gap: 2rem;
    }
  }
</style>
