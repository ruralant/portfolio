<script>
  import Hero from "$lib/index/Hero.svelte";
  import Contacts from "$lib/index/Contacts.svelte";
  import Articles from "$lib/index/Articles/Articles.svelte";
  let { data } = $props();
  let { posts } = data;
</script>

<svelte:head>
  <title>Antonio Rossi Website</title>
  <meta
    name="description"
    content="Antonio Rossi personal website. Blogging about open source, software development and simple rural leaving"
  />
  <meta property="og:title" content="Antonio Rossi Website" />
  <meta
    property="og:description"
    content="Antonio Rossi personal website. Blogging about open source, software development and simple rural leaving"
  />
  <meta property="og:url" content="https://www.antoniorossi.net/" />
  <meta
    property="og:image"
    content="https://res.cloudinary.com/antonio-rossi/image/upload/v1633877706/myself.jpg"
  />
</svelte:head>

<Hero />
{#if data.posts}
  <Articles {posts} />
{/if}
<Contacts />
