import type { Component } from "svelte";
import type { NowUpdate } from "#lib/types.js";
import type { PageLoad } from "./$types";

// Universal for the same reason as blog/[slug]: server loads can't return components.
export const load: PageLoad = async ({ data }) => {
  const [latest] = data.updates;
  const Now = await import(`../../now/${latest.slug}.md`);

  return {
    ...data,
    slug: latest.slug,
    Now: Now.default as Component<{ slug: string; updates: NowUpdate[] }>
  };
};
