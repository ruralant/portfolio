<script context="module">
  const processPostData = (data) => {
    const postsData = Object.values(data);
    const posts = postsData.map((post) => post.metadata);
    return posts;
  };

  export async function load() {
    const developmentPosts = import.meta.globEager('../posts/development/*.md');
    const personalPosts = import.meta.globEager('../posts/personal/*.md');
    const developmentPostsData = processPostData(developmentPosts);
    const personalPostsData = processPostData(personalPosts);
    const posts = developmentPostsData
      .concat(personalPostsData)
      .slice()
      .sort((post, next) => +new Date(next.date) - +new Date(post.date))
      .slice(0, 6);
    return {
      props: {
        posts,
      },
    };
  }
</script>

<script>
  import Hero from '$lib/index/Hero.svelte';
  import Contacts from '$lib/index/Contacts.svelte';
  import Articles from '$lib/index/Articles/Articles.svelte';
  import '../global.css';
  export let posts;
</script>

<Hero />
<Articles {posts} />
<Contacts />
