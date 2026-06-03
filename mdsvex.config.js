import path from "path";

const config = {
  extensions: [".svelte.md", ".md", ".svx"],
  smartypants: {
    dashes: "oldschool"
  },
  layout: {
    development: path.resolve("src/lib/layouts/Post.svelte"),
    now: path.resolve("src/lib/layouts/Now.svelte"),
    colophon: path.resolve("src/lib/layouts/Colophon.svelte")
  },
  highlight: {
    alias: {
      js: "javascript",
      ts: "typescript"
    }
  },
  remarkPlugins: [],
  rehypePlugins: []
};

export default config;
