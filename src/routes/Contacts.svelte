<script lang="ts">
  import { resolve } from "$app/paths";
</script>

<section
  aria-labelledby="contact-heading"
  class="border-line grid gap-y-5 border-t pt-12 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-x-16"
>
  <p class="text-ink tracking-title font-serif text-[2rem] leading-none">Contact</p>

  <div>
    <h2
      id="contact-heading"
      class="md2:text-6xl text-ink max-w-xl font-serif text-5xl leading-[1.04] tracking-tight text-balance"
    >
      I’m always up for a <em class="text-accent">chat</em>.
    </h2>
    <p class="text-ink-soft mt-6 max-w-md text-lg leading-relaxed">
      Send me a message and I’ll get back to you, or give me a shout on LinkedIn.
    </p>

    <div class="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
      <a class="btn group" href={resolve("contact")}>
        Send me a message
        <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
      </a>
      <div class="flex items-center gap-x-6">
        <a
          class="link text-ink text-[0.9375rem]"
          href="https://www.linkedin.com/in/antoniorossii/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn<span aria-hidden="true" class="text-accent">&nbsp;↗</span><span class="sr-only">
            (opens in a new tab)</span
          >
        </a>
        <a class="link text-ink text-[0.9375rem]" href={resolve("rss.xml")}>RSS</a>
      </div>
    </div>
  </div>
</section>
