<script>
  import meImage from "$lib/assets/images/home/me-b-and-w.jpg?enhanced&w=450&h=450&quality=50";
</script>

<div class="flex flex-wrap items-center justify-center pt-10 sm:pt-9">
  <div class="flex-2 md:min-w-[660px]">
    <div class="align-center md:align-start flex flex-row justify-center md:justify-start">
      <h1 class="flex flex-nowrap items-center">
        <span>
          <span
            class="font-Cormorant via-hero-color-2 via-hero-color-5 from-hero-color-1 to-hero-color-6 dark:from-hero-color-1 dark:via-hero-color-2 dark:via-hero-color-3 dark:to-hero-color-4 m-0 bg-linear-to-l from-30% via-50% via-70% to-94% bg-clip-text text-6xl leading-[1.15] text-transparent md:text-8xl dark:from-30% dark:via-50% dark:via-70% dark:to-94%"
            >Hi, I&apos;m Antonio</span
          >
          <span class="ml-1 text-5xl md:hidden lg:ml-5 lg:inline">👋</span>
        </span>
      </h1>
    </div>
    <div class="font-Poppins mt-2.5 text-2xl leading-[1.7] font-light md:text-3xl">
      <p class=" text-neutral-800 dark:text-neutral-100">Software engineer based in Reading, UK.</p>
    </div>
    <div class="font-Poppins text-xl leading-[1.7] font-light md:text-2xl">
      <p class="text-neutral-800 dark:text-neutral-100">
        I'm interested in{" "}
        <span class="w-[200px] md:font-bold">green software</span> and
        <span class="w-[200px] md:font-bold">climate adaptation.</span>
      </p>
    </div>
  </div>
  <div class="h-[300px] w-[300px]">
    <enhanced:img
      src={meImage}
      alt="myself speaking in public"
      class="mt-10 overflow-hidden rounded-full lg:ml-20 xl:mt-0"
    />
  </div>
</div>
