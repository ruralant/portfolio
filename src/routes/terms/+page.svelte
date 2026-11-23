<script lang="ts">
  import PageHeader from "#lib/components/PageHeader.svelte";

  const contractUrl = "https://m4ow.uk/socw/3.txt";
  const contract = "Search Only Terms Contract: for Access and Use of Website";
</script>

<svelte:head>
  <title>Terms and Conditions · Antonio Rossi</title>
  <meta
    name="description"
    content="The terms and conditions that govern access to antoniorossi.net, including the Search Only Terms Contract and its Access Fee."
  />
  <meta property="og:title" content="Terms and Conditions · Antonio Rossi" />
  <meta
    property="og:description"
    content="The terms and conditions that govern access to antoniorossi.net, including the Search Only Terms Contract and its Access Fee."
  />
  <meta property="og:url" content="https://www.antoniorossi.net/terms" />
</svelte:head>

<PageHeader eyebrow="Legal" title="Terms and Conditions">
  These Terms and Conditions govern access to and use of www.antoniorossi.net (the “Website”),
  operated by Antonio Rossi, by people and by automated systems such as crawlers, scrapers and AI
  tools.
</PageHeader>

<div class="border-line prose max-w-2xl border-t pt-10">
  <p class="eyebrow">Last updated 23 November 2026</p>

  <h2>1. Access to the Website</h2>

  <p>
    <strong>1.1</strong> Our {contract} (available at the version-controlled URL published by MOW, currently
    being the following link: <a href={contractUrl}>{contractUrl}</a>) governs access to the Website
    and its content.
  </p>

  <p>
    <strong>1.2</strong> If there is an inconsistency between any of the provisions of these Terms
    and Conditions and the provisions of the {contract} as linked above, the provisions of the
    {contract}, the version hosted at the referenced MOW URL shall prevail.
  </p>

  <p>
    <strong>1.3</strong> For the purposes of Clause 4.3 of the {contract}, the Access Fee payable in
    respect of each Product accessed as a result of an Access Event that is Unlicenced Access is
    £100 (one hundred pounds sterling) exclusive of VAT, which shall be payable in addition where
    applicable.
  </p>

  <p>
    <strong>1.4</strong> The Access Fee is a contractual debt which becomes immediately due and
    payable in accordance with Clause 4 of the {contract}. Capitalised terms used in Clauses 1.3 and
    1.4 and not otherwise defined in these Terms and Conditions have the meanings given to them in
    the {contract}.
  </p>
</div>
