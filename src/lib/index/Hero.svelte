<script>
  import { browser } from '$app/env';
  import { onMount } from 'svelte';
  import meImage from '$lib/assets/images/me-b-and-w-small.jpg?width=400';
  import meImageWebp from '$lib/assets/images/me-b-and-w-small.webp?width=400&format=webp&srcset';
  import meImageSrcset from '$lib/assets/images/me-b-and-w-small.jpg?width=400&format=srcset';
  import Image from '$lib/components/Image.svelte';
  export let placeholders;
  onMount(() => {
    if (browser) {
      document.lazyloadInstance.update();
    }
  });
  console.log('PLACEHOLDER', placeholders[0]);
  // const sizes = '(max-width: 672px) calc(100vw - 32px), 672px';
  const sizes = '400, 400';
</script>

<div class="flex justify-center items-center flex-wrap	pt-10 sm:pt-9">
  <div class="text-container">
    <div class="title-container">
      <h1 class="flex items-center flex-nowrap">
        <span>
          <span
            class="title-text font-Cormorant bg-gradient-271 from-darkFromColor via-darkViaColor1 via-lightViaColor2 to-lightToColor dark:from-darkFromColor dark:via-darkViaColor1 dark:via-darkViaColor2 dark:to-darkToColor "
            >Hi, I&apos;m Antonio</span
          >
          <span class="text-5xl ml-1 lg:ml-5 md:hidden lg:inline">👋</span>
        </span>
      </h1>
    </div>
    <div class="subtitle font-Poppins text-3xl">
      <p class="text-neutral-800 dark:text-white ">
        I'm a full stack developer in Reading, UK.
      </p>
      {' '}
      <p class="text-neutral-800 dark:text-white ">
        I'm interested in{' '}
        <span class="interactive-text">open source</span>,
        <span class="interactive-text">energy efficiency</span> of the web,
        <span class="interactive-text">homesteading</span>{' '}and{' '}
        <span class="interactive-text">soil regeneration</span>.
      </p>
    </div>
  </div>
  <Image
    wepImage={meImageWebp}
    jpegImage={meImage}
    srcsetImage={meImageSrcset}
    alt={'myself speaking in public'}
    width={400}
    height={400}
    loading={'eager'}
    classes={'lazy rounded-full overflow-hidden mt-10 lg:mt-0 lg:ml-20'}
    placeholder={placeholders[0]}
    {sizes}
  />
</div>

<style>
  .text-container {
    flex: 2;
    min-width: 600px;
  }
  .title-container {
    display: flex;
    flex-direction: row;
  }
  .title-text {
    color: #fff;
    /* font-weight: 500; */
    margin: 0;
    line-height: 1.15;
    font-size: 6rem;
  }
  .subtitle {
    font-weight: 300;
    margin-top: 10px;
    line-height: 1.7;
  }
  .subtitle span {
    width: 200;
  }
  .interactive-text {
    /* font-size: 2.5rem; */
    font-weight: 700;
    /* /* font-weight: 500; */
    /* color: var(--color-text-primary);
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1.4px;
    -webkit-text-stroke-color: var(--color-text-primary); */
  }
  .interactive-text:hover {
    -webkit-text-fill-color: var(--color-text-primary);
  }
  @media (max-width: 800px) {
    .title-text {
      font-size: 4rem;
    }
    .subtitle {
      font-size: 1.5rem;
    }
    .interactive-text {
      font-weight: 500;
      font-size: 1.5rem;
      -webkit-text-fill-color: var(--color-text-primary);
      -webkit-text-stroke-color: transparent;
    }
  }
  @media (max-width: 600px) {
    .text-container {
      min-width: unset;
    }
  }
  @media (max-width: 550px) {
    .title-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
</style>
