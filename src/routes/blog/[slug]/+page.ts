import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

// Universal on purpose: server loads can't return components, and this imports just one post.
export const load: PageLoad = async ({ params }) => {
  try {
    const Post = await import(`../../../blog/${params.slug}.md`);

    return {
      Post: Post.default
    };
  } catch (e) {
    console.error(e);
    redirect(307, "/blog");
  }
};
