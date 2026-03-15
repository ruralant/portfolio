import path from "path";

const config = {
  extensions: [".svelte.md", ".md", ".svx"],
  smartypants: {
    dashes: "oldschool"
  },
  layout: {
    development: path.resolve("src/lib/blog/_post.svelte"),
    now: path.resolve("src/lib/now/_now.svelte")
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
