<script>
  import HeroImage from "$lib/components/hero/HeroImage.svelte";
</script>

<div class="flex flex-wrap items-center justify-center pt-10 sm:pt-9">
  <div class="flex-2 md:min-w-[660px]">
    <div class="align-center md:align-start flex flex-row justify-center md:justify-start">
      <h1 class="flex flex-nowrap items-center">
        <span>
          <span
            class="m-0 from-darkFromColor via-darkViaColor1 via-lightViaColor2 to-lightToColor font-Cormorant text-6xl leading-standard bg-gradient-271 dark:from-darkFromColor dark:via-darkViaColor1 dark:via-darkViaColor2 dark:to-darkToColor md:text-8xl"
            >Hi, I&apos;m Antonio</span
          >
          <span class="ml-1 text-5xl md:hidden lg:ml-5 lg:inline">👋</span>
        </span>
      </h1>
    </div>
    <div class="mt-2.5 font-Poppins text-2xl font-light leading-extraRelaxed md:text-3xl">
      <p class="text-neutral-800 dark:text-neutral-100">
        I'm a full stack developer in Reading, UK.
      </p>
      {" "}
      <p class="text-neutral-800 dark:text-neutral-100">
        I'm interested in{" "}
        <span class="w-[200px] md:font-bold">energy efficiency</span> of the web and
        <span class="w-[200px] md:font-bold">regenerative agriculture</span>
      </p>
    </div>
  </div>
  <HeroImage
    width="400"
    height="400"
    classes="rounded-full overflow-hidden mt-10 xl:mt-0 lg:ml-20"
  />
</div>
