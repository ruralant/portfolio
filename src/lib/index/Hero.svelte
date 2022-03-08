<script>
  import meImage from '$lib/assets/images/me-b-and-w-small.jpg';
</script>

<div class="main-container py-10 sm:pt-9">
  <div class="text-container">
    <div class="title-container">
      <h1 class="title">
        <span class="title-text">Hi, I&apos;m Antonio</span>
        <span class="text-5xl ml-7 sm:ml-1">👋</span>
      </h1>
    </div>
    <div class="subtitle text-3xl">
      <p class="text-black dark:text-white transition duration-501 ease-in-out">
        I'm a full stack developer in Reading, UK.
      </p>
      {' '}
      <p class="text-black dark:text-white transition duration-501 ease-in-out">
        I'm interested in{' '}
        <span class="interactive-text">open source</span>,
        <span class="interactive-text">energy efficiency</span> of the web,
        <span class="interactive-text">homesteading</span>{' '}and{' '}
        <span class="interactive-text">soil regeneration</span>.
      </p>
      <!-- <p class="text-black dark:text-white transition duration-501 ease-in-out">
        I write about those things plus I love to share what I lean while
        working.
      </p> -->
    </div>
  </div>
  <div class="image-container mt-5 mx-5 sm:m-5 lg:ml-20">
    <img
      src={meImage}
      alt="myself speaking in public"
      width={400}
      height={400}
      placeholder="blur"
    />
  </div>
</div>

<style>
  .main-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  .text-container {
    flex: 2;
    min-width: 600px;
  }
  .title-container {
    display: flex;
    flex-direction: row;
  }
  .title {
    display: flex;
  }
  .title-text {
    font-family: 'Cormorant Garamond', -apple-system, BlinkMacSystemFont,
      'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    color: #fff;
    background: linear-gradient(
      271deg,
      #8797e8 30%,
      #a162e8 50%,
      #f093b0 70%,
      #dab56c 94%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 500;
    margin: 0;
    line-height: 1.15;
    font-size: 6rem;
    /* padding-left: 10%; */
  }
  .subtitle {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI',
      Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
      sans-serif;
    font-weight: 300;
    margin-top: 10px;
    line-height: 1.7;
    transition: all 0.2s ease-in-out;
  }
  .subtitle span {
    width: 200;
  }
  .interactive-text {
    font-size: 2.5rem;
    font-weight: 500;
    color: var(--color-text-primary);
    -webkit-text-fill-color: transparent;
    -webkit-text-stroke-width: 1.4px;
    -webkit-text-stroke-color: var(--color-text-primary);
  }
  .interactive-text:hover {
    -webkit-text-fill-color: var(--color-text-primary);
  }
  .image-container {
    width: fit-content;
    border-radius: 50%;
    overflow: hidden;
    height: 400px;
    width: 400px;
    /* margin-right: 5%; */
  }
  @media (max-width: 1000px) {
    .main-container {
      height: auto;
    }
    .image-container {
      /* margin: 2rem 3rem; */
    }
  }
  @media (max-width: 800px) {
    .title-text {
      font-size: 4rem;
    }
    .title-emoji {
      font-size: 3rem;
      margin-left: 10px;
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
    .image-container {
      height: 300px;
      width: 300px;
    }
  }
  @media (max-width: 550px) {
    .title-container {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .title {
      /* flex-direction: column; */
      align-items: center;
    }
    .title-emoji {
      align-self: center;
    }
  }
  @media (max-width: 375px) {
    .image-container {
      margin: 2rem 0;
    }
  }
</style>
