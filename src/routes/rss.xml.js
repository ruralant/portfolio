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
    <id>https://www.antoniorossi.net/rss.xml</id>
    <link type="text/html" href="https://www.antoniorossi.net/" rel="alternate"/>
    <description>Blogging about open source, software development and simple rural leaving</description>
    ${posts
      .map(
        (post) =>
          `
        <item>
          <guid isPermaLink="true">
            https://www.antoniorossi.net/blog/${post.type}/${post.slug}
          </guid>
          <title>${post.title}</title>
          <link>
            https://www.antoniorossi.net/blog/${post.type}/${post.slug}
          </link>
          <description>${post.subtitle}</description>
          <pubDate>${post.date}</pubDate>
        </item>
      `
      )
      .join('')}
  </channel>
</rss>`;
