import { getPosts } from '$lib/blog/posts';

export async function get() {
  const posts = await getPosts();
  const body = xml(posts);

  const headers = {
    'Cache-Control': 'max-age=0, s-maxage=3600',
    'Content-Type': 'application/xml',
  };
  return {
    headers,
    body,
  };
}

const xml = (
  posts
) => `<rss xmlns:dc="https://purl.org/dc/elements/1.1/" xmlns:content="https://purl.org/rss/1.0/modules/content/" xmlns:atom="https://www.w3.org/2005/Atom" version="2.0">
  <channel>
    <title>Antonio Rossi Website</title>
    <icon>https://www.antoniorossi.net/favicon.svg</icon>
    <link>https://www.antoniorossi.net</link>
    <description>A blog built with SvelteKit about tech and stuff!</description>
    ${posts
      .map(
        (post) =>
          `
        <item>
          <guid>
          https://www.antoniorossi.net/blog/${post.type}/${post.slug}
          </guid>
          <title>${post.title}</title>
          <link>
            https://www.antoniorossi.net/blog/${post.type}/${post.slug}
          </link>
          <description>${post.description}</description>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>
      `
      )
      .join('')}
  </channel>
</rss>`;
