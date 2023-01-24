export const load = async ({ fetch }) => {
  const response = await fetch("/api/posts.json");
  const allPosts = await response.json();
  const posts = allPosts.slice(0, 6);
  return { posts };
};
