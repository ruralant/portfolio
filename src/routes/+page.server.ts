import type { PageServerLoad } from "./$types";
import type { PostSummary } from "#lib/types.js";

export const load: PageServerLoad = async ({ fetch }) => {
  const response = await fetch("/api/posts.json");
  const posts: PostSummary[] = await response.json();
  return { posts };
};
