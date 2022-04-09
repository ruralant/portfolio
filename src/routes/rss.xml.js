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
) => `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <channel>
    <title>Antonio Rossi Website</title>
    <id>https://www.antoniorossi.net/rss.xml</id>
    <link type="text/html" href="https://www.antoniorossi.net/" rel="alternate"/>
    <description>Blogging about open source, software development and simple rural leaving</description>
    <webfeeds:cover image="https://www.antoniorossi.net/favicon.svg" />
    <webfeeds:icon>https://www.antoniorossi.net/favicon.svg</webfeeds:icon>
    <webfeeds:logo>https://www.antoniorossi.net/favicon.svg</webfeeds:logo>
    <webfeeds:accentColor>000000</webfeeds:accentColor>
    <webfeeds:related layout="card" target="browser"/>
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
