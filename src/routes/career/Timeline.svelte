<script>
  import Company from "./Company.svelte";

  let { companies } = $props();
</script>

<div class="mx-auto flex max-w-[900px] flex-col gap-8 px-4 sm:gap-12">
  {#each companies as company}
    <Company {company} />
  {/each}
</div>
