<script lang="ts" module>
  const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

  let scriptPromise: Promise<void> | undefined;

  const loadTurnstile = () => {
    scriptPromise ??= new Promise<void>((resolve, reject) => {
      if (window.turnstile) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", () => resolve());
      script.addEventListener("error", () => {
        scriptPromise = undefined;
        reject(new Error("Turnstile script failed to load"));
      });
      document.head.append(script);
    });

    return scriptPromise;
  };
</script>

<script lang="ts">
  import { theme } from "$lib/stores/store";

  interface Props {
    siteKey: string;
    onToken: (token: string) => void;
  }

  let { siteKey, onToken }: Props = $props();

  let container: HTMLDivElement | undefined = $state();
  let unavailable = $state(false);
  let widgetId: string | undefined;

  export const reset = () => {
    onToken("");
    if (widgetId) window.turnstile?.reset(widgetId);
  };

  $effect(() => {
    const target = container;
    if (!target) return;

    let active = true;

    loadTurnstile()
      .then(() => {
        if (!active) return;

        // The theme is read here, inside the async callback, so the effect does
        // not track it: re-rendering on every toggle would discard a challenge
        // the visitor has already passed.
        widgetId = window.turnstile?.render(target, {
          sitekey: siteKey,
          action: "contact",
          theme: $theme.mode,
          size: "flexible",
          callback: (value) => onToken(value),
          "expired-callback": () => onToken(""),
          "timeout-callback": () => onToken(""),
          "error-callback": () => onToken("")
        });
      })
      .catch(() => {
        if (active) unavailable = true;
      });

    return () => {
      active = false;
      onToken("");
      if (widgetId) window.turnstile?.remove(widgetId);
      widgetId = undefined;
    };
  });
</script>

<div>
  <div bind:this={container} class="min-h-[65px]" data-testid="turnstile"></div>
  {#if unavailable}
    <p class="font-Poppins text-sm text-red-600 dark:text-red-400">
      The anti-spam check could not load, so the form cannot be sent. A content blocker or an
      offline connection is the usual cause.
    </p>
  {/if}
</div>
