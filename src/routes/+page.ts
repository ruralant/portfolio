import type { PageLoad } from "./$types";
import type { PostSummary } from "$lib/types";

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("/api/posts.json");
  const posts: PostSummary[] = await response.json();
  return { posts };
};
