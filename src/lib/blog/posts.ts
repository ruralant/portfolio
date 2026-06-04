import type { PostMetadata } from "$lib/types";

export async function getPosts(): Promise<PostMetadata[]> {
  const modules = import.meta.glob<{ metadata: PostMetadata }>("../../blog/*.md", {
    eager: true
  });
  const posts = Object.values(modules)
    .map((post) => post.metadata)
    .filter((post) => post?.published)
    .sort((post, next) => Date.parse(next.date) - Date.parse(post.date));

  return posts;
}
