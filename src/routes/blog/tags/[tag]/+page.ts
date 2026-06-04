import type { PageLoad } from "./$types";
import type { PostMetadata } from "$lib/types";

export const load: PageLoad = async ({ fetch, params }) => {
  const response = await fetch(`/api/tags/${params.tag}`);
  const posts: PostMetadata[] = await response.json();

  return {
    tag: params.tag,
    posts
  };
};
