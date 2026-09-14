import { getTags } from "$lib/blog/posts";
import type { PostMetadata } from "$lib/types";
import type { EntryGenerator, PageServerLoad } from "./$types";

export const entries: EntryGenerator = async () => (await getTags()).map((tag) => ({ tag }));

export const load: PageServerLoad = async ({ fetch, params }) => {
  const response = await fetch(`/api/tags/${encodeURIComponent(params.tag)}.json`);
  const posts: PostMetadata[] = await response.json();
  return { tag: params.tag, posts };
};
