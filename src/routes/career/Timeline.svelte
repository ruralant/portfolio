<script lang="ts">
  import Company from "./Company.svelte";
  import type { Company as CompanyType } from "$lib/types";

  interface Props {
    companies: CompanyType[];
  }

  let { companies }: Props = $props();
</script>

<div class="border-line border-b">
  {#each companies as company (company.name)}
    <Company {company} />
  {/each}
</div>
