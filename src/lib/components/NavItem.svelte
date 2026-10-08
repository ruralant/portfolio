<script lang="ts">
  import { resolve } from "$app/paths";
  import { page } from "$app/state";
  import type { Path } from "$app/types";

  interface Props {
    text: string;
    url: Path;
  }

  let { text, url }: Props = $props();

  const current = $derived(
    page.url.pathname === `/${url}` || page.url.pathname.startsWith(`/${url}/`)
  );
</script>

<a
  class={[
    "decoration-accent hover:text-ink text-[0.9375rem] no-underline decoration-1 underline-offset-[0.4em] transition-colors",
    current ? "text-ink underline" : "text-muted"
  ]}
  href={resolve(url)}
  aria-current={current ? "page" : undefined}
>
  {text}
</a>
