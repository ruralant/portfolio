import path from "path";

const config = {
  extensions: [".svelte.md", ".md", ".svx"],
  smartypants: {
    dashes: "oldschool"
  },
  layout: {
    development: path.resolve("src/lib/blog/_post.svelte")
  },
  remarkPlugins: [],
  rehypePlugins: []
};

export default config;
