import { redirect } from "@sveltejs/kit";

export async function load({ params }) {
  try {
    const Post = await import(`../../../blog/${params.slug}.md`);
    return {
      Post: Post.default
    };
  } catch (e) {
    console.log(e);
    throw redirect(307, "/blog");
  }
}
