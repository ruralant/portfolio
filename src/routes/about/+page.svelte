<script>
  import Skill from "$lib/components/about/Skill.svelte";
  import meImage from "$lib/assets/images/home/me-b-and-w.jpg?enhanced&w=300&h=300&quality=50";
  import { calculateExperience } from "$lib/utils/utils.js";
  import { calculatePastExperience } from "$lib/utils/utils.js";

  const skills = [
    { name: "React", start: "2020-01-01" },
    { name: "Svelte", start: "2020-12-01" },
    { name: "Node.js", start: "2016-05-01" },
    { name: "AWS", start: "2022-04-01" },
    { name: "Typescript", start: "2017-01-01" },
    { name: "Angular", start: "2017-01-01", end: "2019-12-30" },
    { name: "Google Cloud", start: "2016-11-1", end: "2022-04-01" },
    { name: "React Native", start: "2019-11-30", end: "2022-04-01" },
    { name: "Redux", start: "2019-11-30", end: "2022-04-01" },
    { name: "Next.js", start: "2019-11-30", end: "2022-12-01" },
    { name: "Playwright", start: "2020-05-01" },
    { name: "MongoDB", start: "2017-01-01", end: "2019-12-30" },
    { name: "Jest", start: "2017-01-01" },
    { name: "Express.js", start: "2017-01-01", end: "2019-12-30" }
  ];
  const orderedSkills = skills.map((skill) => {
    const { start, end } = skill;
    const experience = end ? calculatePastExperience(start, end) : calculateExperience(start);
    return { ...skill, ...experience };
  });

  orderedSkills.sort((a, b) => b.value - a.value);

  const maxExperience = Math.round(orderedSkills[0].value / 12);
  const halfWayExperience = Math.round(maxExperience / 2);
</script>

<h1 class="font-Cormorant m-0 pt-10 pb-5 text-5xl text-neutral-800 md:pt-0 dark:text-neutral-100">
  About me
</h1>

<div
  class="font-Roboto dark:prose-invert lg:prose-xl prose-a:text-teal-400 prose-code:bg-neutral-200 prose-code:text-neutral-700 prose-pre:min-w-full prose-pre:max-w-xs prose-pre:whitespace-pre-wrap prose-pre:bg-neutral-200 prose-pre:text-left prose-pre:text-neutral-700 dark:prose-code:bg-neutral-800 dark:prose-code:text-neutral-100 dark:prose-pre:bg-neutral-800 dark:prose-pre:text-neutral-100 md:prose-pre:max-w-full max-w-prose leading-relaxed font-normal tracking-wide text-neutral-900 dark:text-neutral-100"
>
  <div class="mb-10 bg-clip-content md:float-right md:mb-0">
    <enhanced:img
      src={meImage}
      alt="myself speaking in public"
      class="overflow-hidden rounded-full md:ml-5"
    />
  </div>
  <p class="max-w-prose">
    My name is <span
      class="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent dark:from-purple-500 dark:to-red-400"
      >Antonio</span
    > and I am a software engineer with a passion for developing green software.
  </p>
  <p class="mt-5">
    I specialise in <span
      class="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent dark:from-purple-500 dark:to-red-400"
      >React</span
    >,
    <span
      class="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent dark:from-purple-500 dark:to-red-400"
      >Svelte</span
    >,
    <span
      class="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent dark:from-purple-500 dark:to-red-400"
      >Node</span
    >,
    <span
      class="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent dark:from-purple-500 dark:to-red-400"
      >AWS</span
    >, and
    <span
      class="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent dark:from-purple-500 dark:to-red-400"
      >Typescript</span
    >, and I have years of experience developing efficient and sustainable software solutions.
  </p>

  <p class="mt-5">
    I strongly believe in the importance of creating software that is environmentally responsible,
    and I am committed to incorporating eco-friendly practices into my work whenever possible. By
    focusing on reducing energy consumption, minimising waste, and using sustainable resources, <span
      class="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text text-transparent dark:from-purple-500 dark:to-red-400"
      >I strive to create software that is efficient, cost-effective and environmentally conscious.</span
    >
  </p>

  <p class="mt-5">
    When I'm not coding, you usually find me trail running in the countryside or climbing. I have a
    deep appreciation for nature and enjoy spending time in the great outdoors. I enjoy traveling
    slow, by train, bicycle, or on foot. I did the Camino de Santiago and several other
    long-distance walks and hikes.
  </p>

  <p class="mt-5">
    In my free time, I also grow my own food in an allotment, which allows me to practice
    sustainable living and connect with the earth.
  </p>

  <p class="mt-5">
    Thank you for taking your time to learn a little but more about myself. If you have any
    questions, if we have passions in common, or if you just want to say hi, do not hesitate to
    contact me at
    <a href="mailto:hello@antoniorossi.net">
      <span
        class="via-hero-color-2 via-hero-color-5 from-hero-color-1 to-hero-color-6 dark:from-hero-color-1 dark:via-hero-color-2 dark:via-hero-color-3 dark:to-hero-color-4 m-0 bg-linear-to-l from-30% via-50% via-70% to-94% bg-clip-text leading-[1.15] text-transparent dark:from-30% dark:via-50% dark:via-70% dark:to-94%"
        >hello@antoniorossi.net
      </span>
    </a>
  </p>
  <div>
    <h2 class="mt-5 mb-0! text-xl font-normal tracking-normal">Skills and Experience</h2>
    <div class="flex justify-between text-base">
      <span class="mt-5 mb-0 flex-1 text-neutral-400 dark:text-neutral-600">YEARS</span>
      <span class="mt-5 mb-0 flex flex-1 justify-center text-neutral-400 dark:text-neutral-600"
        ><span
          class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-neutral-200 dark:border-neutral-800"
          >{halfWayExperience}
        </span></span
      >
      <span
        class="mt-5 mb-0 flex flex-1 justify-end text-left text-neutral-400 dark:text-neutral-600"
        ><span
          class="flex h-7 w-7 items-center justify-center rounded-full border-2 border-solid border-neutral-200 dark:border-neutral-800"
          >{maxExperience}</span
        >
      </span>
    </div>
    <div style="margin-top: -1px" class="grid grid-cols-1 grid-rows-1">
      <table style="grid-column: 1; grid-row: 1;">
        <tbody>
          <tr>
            <td
              class="w-6/12 border-r-2 border-l-0 border-solid border-neutral-200 dark:border-neutral-800"
            ></td>
            <td class="w-6/12 border-solid border-neutral-200 dark:border-neutral-800"></td>
          </tr>
        </tbody>
      </table>
      <div style="grid-column: 1; grid-row: 1;">
        {#each orderedSkills as skill}
          <Skill {skill} percentage={(skill.value / orderedSkills[0].value) * 100} />
        {/each}
      </div>
    </div>
  </div>
</div>
