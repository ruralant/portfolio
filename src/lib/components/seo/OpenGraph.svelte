<script>
  export let article = false;
  export let publishedAt;
  export let lastUpdated;
  export let image;
  export let squareImage;
  export let description;
  export let ogLanguage;
  export let title;
  export let siteTitle;
  export let url;
</script>

<svelte:head>
  <meta property="og:site_name" content="Antonio Rossi Website" />
  <meta property="og:locale" content="en_gb" />
  <meta property="og:url" content={url} />
  <meta property="og:type" content={article ? "article" : "website"} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  {#if image}
    <meta property="og:image" content={image.url} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="627" />
    <meta property="og:image:alt" content={image.alt} />
  {/if}
  {#if squareImage}
    <meta property="og:image" content={squareImage.url} />
    <meta property="og:image:width" content="400" />
    <meta property="og:image:height" content="400" />
    <meta property="og:image:alt" content={squareImage.alt} />
  {/if}
  {#if article & publishedAt & lastUpdated}
    <meta property="article:published_time" content={publishedAt} />
    <meta property="article:modified_time" content={lastUpdated} />
  {/if}
</svelte:head>
