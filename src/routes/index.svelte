<script context="module">
  export async function load() {
    const posts = import.meta.globEager('../posts/*.md');
    const latestPosts = Object.values(posts).slice(0, 6);
    const postsMeta = latestPosts.map((post) => post.metadata);
    return {
      props: {
        posts: postsMeta
      }
    };
  }
</script>

<script>
  import Hero from '$lib/index/Hero.svelte';
  import Contacts from '$lib/index/Contacts.svelte';
  import Articles from '$lib/index/Articles/Articles.svelte';
  export let posts;
</script>

<Hero />
<Articles {posts} />
<Contacts />
