<script>
  import HeroImage from "$lib/components/hero/HeroImage.svelte";
</script>

<div class="flex justify-center items-center flex-wrap pt-10 sm:pt-9">
  <div class="flex-2 md:min-w-[660px]">
    <div class="flex flex-row justify-center align-center md:justify-start md:align-start">
      <h1 class="flex items-center flex-nowrap">
        <span>
          <span
            class="font-Cormorant text-6xl md:text-8xl bg-gradient-271 from-darkFromColor via-darkViaColor1 via-lightViaColor2 to-lightToColor dark:from-darkFromColor dark:via-darkViaColor1 dark:via-darkViaColor2 dark:to-darkToColor leading-standard m-0"
            >Hi, I&apos;m Antonio</span
          >
          <span class="text-5xl ml-1 lg:ml-5 md:hidden lg:inline">👋</span>
        </span>
      </h1>
    </div>
    <div class="font-Poppins text-2xl md:text-3xl font-light mt-2.5 leading-extraRelaxed">
      <p class="text-neutral-800 dark:text-neutral-50">
        I'm a full stack developer in Reading, UK.
      </p>
      {" "}
      <p class="text-neutral-800 dark:text-neutral-50">
        I'm interested in{" "}
        <span class="md:font-bold w-[200px]">energy efficiency</span> of the web and
        <span class="md:font-bold w-[200px]">regenerative agriculture</span>
      </p>
    </div>
  </div>
  <HeroImage
    width="400"
    height="400"
    classes="rounded-full overflow-hidden mt-10 xl:mt-0 lg:ml-20"
  />
</div>
