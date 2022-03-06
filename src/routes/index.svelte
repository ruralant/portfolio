<!-- <script context="module">
  const convertDate = (date) => {
    const dateArray = date.split('-');
    return new Date(dateArray[2], dateArray[1], dateArray[0]);
  };
  const processPostData = (data) => {
    const postsData = Object.values(data);
    const posts = postsData
      .map((post) => post.metadata)
      .sort((post, next) => convertDate(next.date) - convertDate(post.date));
    return posts;
  };

  export async function load() {
    const development = import.meta.globEager('../posts/development/*.md');
    const personal = import.meta.globEager('../posts/personal/*.md');
    const developmentData = processPostData(development);
    const personalData = processPostData(personal);
    return {
      props: {
        developmentData,
        personalData,
      },
    };
  }
</script> -->
<script>
  import Hero from '$lib/index/Hero.svelte';
  import Contacts from '$lib/index/Contacts.svelte';
  // import Articles from '$lib/index/Articles/Articles.svelte';
  import '../global.css';
  // export let proData, lifeData;
</script>

<Hero />
<!-- <Articles lastProPost={proData} lastLifePost={lifeData} /> -->
<Contacts />
