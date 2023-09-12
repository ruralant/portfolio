export async function load({ fetch }) {
  const response = await fetch(`/api/tags`);
  const tagList = await response.json();

  return {
    tags: tagList
  };
}
