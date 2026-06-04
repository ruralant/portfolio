<script lang="ts">
  import Company from "./Company.svelte";
  import type { Company as CompanyType } from "$lib/types";

  interface Props {
    companies: CompanyType[];
  }

  let { companies }: Props = $props();
</script>

<div class="mx-auto flex max-w-[900px] flex-col gap-8 px-4 sm:gap-12">
  {#each companies as company (company.name)}
    <Company {company} />
  {/each}
</div>
