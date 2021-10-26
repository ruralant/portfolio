<script context="module">
  const convertDate = (date) => {
    const dateArray = date.split('-');
    return new Date(dateArray[2], dateArray[1], dateArray[0]);
  };
  const processPostData = (data) => {
    const postsData = Object.values(data);
    const posts = postsData.map((post) => post.metadata);
    const lastPost = postsData.reduce((post, next) =>
      convertDate(post.date) > convertDate(next.date) ? post : next
    );
    return {
      posts,
      lastPost
    };
  };

  export async function load() {
    const pro = import.meta.globEager('../posts/pro/*.md');
    const life = import.meta.globEager('../posts/life/*.md');
    const proData = processPostData(pro);
    const lifeData = processPostData(life);
    return {
      props: {
        proData,
        lifeData
      }
    };
  }
</script>

<script>
  import Hero from '$lib/index/Hero.svelte';
  import Contacts from '$lib/index/Contacts.svelte';
  import Articles from '$lib/index/Articles/Articles.svelte';
  export let proData, lifeData;
</script>

<Hero />
<Articles lastProPost={proData.lastPost} lastLifePost={lifeData.lastPost} />
<Contacts />
