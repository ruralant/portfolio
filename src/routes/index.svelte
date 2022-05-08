<script context="module">
  const processPostData = (data) => {
    const postsData = Object.values(data);
    const posts = postsData.reduce((posts, next) => {
      next.metadata.published && posts.push(next.metadata);
      return posts;
    }, []);
    return posts;
  };

  export async function load({ fetch }) {
    console.log('LOAD CALLED');
    const placeholdersPromise = fetch('/api/image-placeholders.json', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        images: ['me-b-and-w-small.jpg'],
      }),
    });
    console.log('PLACEHOLDER', placeholdersPromise);

    const [developmentPosts, personalPosts, placeholdersResponse] =
      await Promise.all([
        import.meta.globEager('../posts/development/*.md'),
        import.meta.globEager('../posts/personal/*.md'),
        placeholdersPromise,
      ]);
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
        ...(await placeholdersResponse.json()),
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
  export let placeholders;
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

<Hero {placeholders} />
<Articles {posts} />
<Contacts />
