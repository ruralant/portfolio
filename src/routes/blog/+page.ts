import type { PageLoad } from "./$types";
import type { PostMetadata } from "$lib/types";

export const load: PageLoad = async () => {
  const modules = import.meta.glob<{ metadata: PostMetadata }>(`../../blog/*.md`, { eager: true });
  const sortedPosts = Object.values(modules)
    .map((post) => post.metadata)
    .filter((post) => post && post.published)
    .sort((post, next) => Date.parse(next.date) - Date.parse(post.date));

  return {
    posts: sortedPosts
  };
};
