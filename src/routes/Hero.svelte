<script lang="ts">
  import { resolve } from "$app/paths";
  import SolarpunkHouse from "./SolarpunkHouse.svelte";
</script>

<section
  class="md3:grid-cols-[minmax(0,1fr)_auto] md3:pb-24 grid items-center gap-x-10 gap-y-4 pb-16"
>
  <div>
    <h1
      class="md2:text-8xl text-ink font-serif text-[4.25rem] leading-[0.95] tracking-[-0.02em] lg:text-[6.5rem]"
    >
      Hi, I’m <em class="text-accent">Antonio</em>.
    </h1>
    <p class="md2:text-xl text-ink-soft mt-8 max-w-md text-lg leading-relaxed text-pretty">
      Software engineer based in Reading, UK. I’m interested in
      <span class="text-ink">green software</span> and
      <span class="text-ink">climate adaptation</span>.
    </p>
    <div class="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
      <a class="btn group" href={resolve("/blog")}>
        Read the blog
        <span aria-hidden="true" class="transition-transform group-hover:translate-x-0.5">→</span>
      </a>
      <a class="link text-ink text-[0.9375rem]" href={resolve("/about")}>More about me</a>
    </div>
  </div>
  <div
    class="md3:w-[20rem] md3:justify-self-end w-full max-w-[22rem] justify-self-center xl:w-[22rem]"
  >
    <SolarpunkHouse />
  </div>
</section>
