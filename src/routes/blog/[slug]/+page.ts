import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

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
