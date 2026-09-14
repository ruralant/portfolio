import { getPosts } from "$lib/blog/posts";
import type { EntryGenerator } from "./$types";

// Lives here, not in +page.ts: importing getPosts there would ship every post to the browser.
export const entries: EntryGenerator = async () => (await getPosts()).map(({ slug }) => ({ slug }));
