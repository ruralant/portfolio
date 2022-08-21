export async function load({ session }) {
  const localTheme = session.theme;
  return { localTheme };
}
