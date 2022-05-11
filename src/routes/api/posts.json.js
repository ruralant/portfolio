const processPostData = (data) => {
  if (data) {
    const postsData = Object.entries(data);
    const posts = postsData.reduce((posts, next) => {
      next.metadata.published && posts.push(next.metadata);
      return posts;
    }, []);
    return posts;
  }
  return data;
};

export const get = async () => {
  const developmentPostsFiles = import.meta.glob(
    '../../posts/development/*.md'
  );
  const personalPostsFiles = import.meta.glob('../../posts/personal/*.md');
  const iterablePostsFiles = Object.entries(developmentPostsFiles).concat(
    Object.entries(personalPostsFiles)
  );
  const allPosts = await Promise.all(
    iterablePostsFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver();
      const postPath = path.slice(2, -3);

      return {
        meta: metadata,
        path: postPath,
      };
    })
  );

  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.meta.date) - new Date(a.meta.date);
  });

  return {
    body: sortedPosts,
  };
};
