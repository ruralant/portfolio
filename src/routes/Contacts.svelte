<script lang="ts">
  import { resolve } from "$app/paths";
</script>

<section
  aria-labelledby="contact-heading"
  class="md3:mt-16 md3:grid-cols-[minmax(0,1fr)_auto] md3:items-end md3:pt-20 border-line mt-8 grid gap-10 border-t pt-14"
>
  <div>
    <p class="eyebrow">Contact</p>
    <h2
      id="contact-heading"
      class="md2:text-6xl text-ink mt-4 max-w-xl font-serif text-5xl leading-[1.02] tracking-tight text-balance"
    >
      I’m always up for a <em class="text-accent">chat</em>.
    </h2>
    <p class="text-ink-soft mt-6 max-w-md text-lg leading-relaxed">
      Send me a message and I’ll get back to you, or give me a shout on LinkedIn.
    </p>
  </div>

  <div class="flex flex-wrap items-center gap-x-7 gap-y-4">
    <a class="btn group" href={resolve("/contact")}>
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
        LinkedIn<span aria-hidden="true"> ↗</span><span class="sr-only"> (opens in a new tab)</span>
      </a>
      <a class="link text-ink text-[0.9375rem]" href={resolve("/rss.xml")}>RSS</a>
    </div>
  </div>
</section>
