// const siteURL = 'https://www.antoniorossi.net';
// const siteTitle = 'Antonio Rossi Personal Website';
// const siteDescription =
//   'A corner of the web to talk about web development and frugal lifestyle';

// export const get = async () => {
//   const developmentPosts = import.meta.globEager('../posts/development/*.md');
//   const personalPosts = import.meta.globEager('../posts/personal/*.md');
//   const developmentPostsData = processPostData(developmentPosts);
//   const personalPostsData = processPostData(personalPosts);
//   const posts = developmentPostsData
//     .concat(personalPostsData)
//     .slice()
//     .sort((post, next) => +new Date(next.date) - +new Date(post.date))
//     .slice(0, 6);

//   const body = render(posts);
//   const headers = {
//     'Cache-Control': 'max-age=0, s-maxage=3600',
//     'Content-Type': 'application/xml',
//   };

//   return {
//     body,
//     headers,
//   };
// };

// const render = (posts) =>
//   `<?xml version="1.0" encoding="UTF-8" ?>
// <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
// <channel>
// <title>${siteTitle}</title>
// <description>${siteDescription}</description>
// <link>${siteURL}</link>
// <atom:link href="${siteURL}/rss.xml" rel="self" type="application/rss+xml"/>
// ${posts
//   .map(
//     (post) => `<item>
// <guid isPermaLink="true">${siteURL}/blog/${post.slug}</guid>
// <title>${post.title}</title>
// <link>${siteURL}/blog/${post.slug}</link>
// <description>${post.excerpt}</description>
// <pubDate>${new Date(post.date).toUTCString()}</pubDate>
// </item>`
//   )
//   .join('')}
// </channel>
// </rss>
// `;
