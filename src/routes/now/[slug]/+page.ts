import type { Component } from "svelte";
import type { NowUpdate } from "#lib/types.js";
import type { PageLoad } from "./$types";

// Universal on purpose: server loads can't return components, and this imports just one update.
export const load: PageLoad = async ({ data, params }) => {
  const Now = await import(`../../../now/${params.slug}.md`);

  return {
    ...data,
    slug: params.slug,
    Now: Now.default as Component<{ slug: string; updates: NowUpdate[] }>
  };
};
