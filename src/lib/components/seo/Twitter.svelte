<script>
  export let article = false;
  export let image;
  export let timeToRead = 0;
</script>

<svelte:head>
  <meta name="twitter:card" content="summary_large_image" />
  {#if image}
    <meta name="twitter:image" content={image.url} />
  {/if}
  <meta name="twitter:creator" content={`@ruralant`} />
  <meta name="twitter:site" content={`@ruralant`} />
  <meta name="twitter:label1" content="Written by" />
  <meta name="twitter:data1" content={"Antonio Rossi"} />
  {#if article && timeToRead > 0}
    <meta name="twitter:label2" content="Est. reading time" />
    <meta name="twitter:data2" content={timeToRead !== 1 ? `${timeToRead} minutes` : "1 minute"} />
  {/if}
</svelte:head>
