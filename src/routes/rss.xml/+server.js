import { getPosts } from "$lib/blog/posts";

export const GET = async () => {
  const posts = await getPosts();
  const body = xml(posts);

  const options = {
    headers: {
      "Cache-Control": "max-age=0, s-maxage=3600",
      "Content-Type": "application/xml"
    }
  };
  return new Response(body, options);
};

const xml = (
  posts
) => `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:webfeeds="http://webfeeds.org/rss/1.0">
  <channel>
    <title>Antonio Rossi Website</title>
    <link href="https://www.antoniorossi.net/rss.xml" rel="self"/>
    <link href="https://www.antoniorossi.net/"/>
    <description>Blogging about open source, software development and simple rural leaving</description>
    <updated>2022-04-18T17:15:49-04:00</updated>
    <id>https://www.antoniorossi.net/</id>
    <author>
      <name>Antonio Rossi</name>
    </author>
    <webfeeds:cover image="https://www.antoniorossi.net/mstile-144x144.png" />
    <webfeeds:icon>https://www.antoniorossi.net/mstile-144x144.png</webfeeds:icon>
    <webfeeds:logo>https://www.antoniorossi.net/mstile-144x144.png</webfeeds:logo>
    <webfeeds:accentColor>000000</webfeeds:accentColor>
    <webfeeds:related layout="card" target="browser"/>
    ${posts
      .map(
        (post) =>
          `
        <item>
          <guid isPermaLink="true">
            https://www.antoniorossi.net/blog/${post.slug}
          </guid>
          <title>${post.title}</title>
          <link>
            https://www.antoniorossi.net/blog/${post.slug}
          </link>
          <description>${post.subtitle}</description>
          <pubDate>${post.date}</pubDate>
        </item>
      `
      )
      .join("")}
  </channel>
</rss>`;
