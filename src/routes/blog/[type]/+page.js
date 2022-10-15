export async function load({ params, url }) {
	const blogType = url.pathname.split('/')[2];
	let posts;
	if (blogType === 'development') {
		posts = import.meta.globEager(`../../../blog/development/*.md`);
	} else if (blogType === 'personal') {
		posts = import.meta.globEager(`../../../blog/personal/*.md`);
	}
	const postList = Object.values(posts);
	const postsMeta = postList
		.reduce((posts, next) => {
			next.metadata.published && posts.push(next.metadata);
			return posts;
		}, [])
		.slice()
		.sort((post, next) => +new Date(next.date) - +new Date(post.date))
		.slice(0, 6);

	return {
		posts: postsMeta
	};
}
