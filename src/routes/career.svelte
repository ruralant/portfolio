<script>
  import { companies } from '$lib/data/companies.json';
  import Company from '$lib/career/Company.svelte';
</script>

<h4 class="py-10">Where I worked</h4>
<div class="flex flex-col pb-10 px-10">
  {#each companies as company}
    <Company {company} />
  {/each}
</div>
