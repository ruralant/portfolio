const config = {
  extensions: ['.svelte.md', '.md', '.svx'],
  smartypants: {
    dashes: 'oldschool',
  },
  layout: {
    development: './src/lib/blog/dev-layout.svelte',
  },
  remarkPlugins: [],
  rehypePlugins: [],
};

export default config;
