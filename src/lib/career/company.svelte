<script>
  export let company;
  const { name, from, to, position, techStack, description, logoUrl } = company;
  const { frontEnd, backEnd, tools } = techStack;
</script>

<div
  class="flex pb-20 border-l-2 border-spaceGray dark:border-white boder-solid"
>
  <div class="flex w-10">
    <div
      class="w-3 h-3 rounded-full bg-spaceGrey dark:bg-white career-step-dot"
    />
  </div>
  <div class="career-step-container">
    <div class="flex mb-3 items-center">
      <p class="text-black dark:text-white mr-3">
        <span>{position} </span><span>@ {name}</span>
      </p>
      <div class="w-8 h-8">
        <img
          class="w-full"
          src={logoUrl}
          loading="lazy"
          decoding="async"
          height="20"
          width="20"
          alt=""
        />
      </div>
    </div>
    <div class="mb-3">
      {#if frontEnd.length}
        <div>
          <p>Front End</p>
          <ul class="flex">
            {#each frontEnd as tech}
              <li class="mr-3">{tech}</li>
            {/each}
          </ul>
        </div>
      {/if}
      {#if backEnd.length}
        <div>
          <p>Back End</p>
          <ul class="flex">
            {#each backEnd as tech}
              <li class="mr-3">{tech}</li>
            {/each}
          </ul>
        </div>
      {/if}
      {#if tools.length}
        <div>
          <p>Tools</p>
          <ul class="flex">
            {#each tools as tech}
              <li class="mr-3">{tech}</li>
            {/each}
          </ul>
        </div>
      {/if}
    </div>
    <p class="mb-3 text-black dark:text-white">{`${from} - ${to}`}</p>
    <p class="text-black dark:text-white">{description}</p>
  </div>
</div>

<style>
  .career-step-container {
    margin-top: -9px;
  }
  .career-step-dot {
    margin-left: -7px;
  }
</style>
