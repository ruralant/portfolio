<script>
  import Skill from "$lib/components/about/Skill.svelte";
  import HeroImage from "$lib/components/hero/HeroImage.svelte";
  import { calculateExperience } from "$lib/utils/utils.js";
  import { calculatePastExperience } from "$lib/utils/utils.js";

  const skills = [
    { skill: "React", start: "2020-01-01", love: true },
    { skill: "Svelte", start: "2020-12-01", love: true },
    { skill: "Node.js", start: "2016-05-01", love: true },
    { skill: "AWS", start: "2022-04-01" },
    { skill: "Typescript", start: "2017-01-01", love: true },
    { skill: "Angular", start: "2017-01-01", end: "2019-12-30", love: false },
    { skill: "Google Cloud", start: "2016-11-1", end: "2022-04-01" },
    { skill: "React Native", start: "2019-11-30", end: "2022-04-01", love: true },
    { skill: "Redux", start: "2019-11-30", end: "2022-04-01" },
    { skill: "Next.js", start: "2019-11-30", end: "2022-12-01", love: true },
    { skill: "Playwright", start: "2020-05-01", love: true },
    { skill: "MongoDB", start: "2017-01-01", end: "2019-12-30" },
    { skill: "Jest", start: "2017-01-01" },
    { skill: "Express.js", start: "2017-01-01", end: "2019-12-30" }
  ];
  const orderedSkills = skills.reduce((acc, skill) => {
    const { start, end } = skill;
    const experience = end ? calculatePastExperience(start, end) : calculateExperience(start);
    acc = [...acc, { ...skill, ...experience }];
    return acc;
  }, []);

  orderedSkills.sort((a, b) => b.value - a.value);

  const maxExperience = Math.round(orderedSkills[0].value / 12);
  const halfWayExperience = Math.round(maxExperience / 2);
</script>

<h1
  class="title-text font-Cormorant text-5xl m-0 text-neutral-800 dark:text-white pb-5 pt-10 md:pt-0"
>
  About me
</h1>

<div
  class="font-Roboto lg:prose-xl text-neutral-900 dark:text-white dark:prose-invert prose-a:text-teal-400 prose-pre:max-w-xs prose-pre:min-w-full prose-pre:whitespace-pre-wrap prose-pre:text-left md:prose-pre:max-w-full prose-pre:bg-neutral-200 dark:prose-pre:bg-neutral-800 prose-pre:text-neutral-700 dark:prose-pre:text-neutral-100 prose-code:bg-neutral-200 dark:prose-code:bg-neutral-800 prose-code:text-neutral-700 dark:prose-code:text-neutral-100 tracking-wide leading-relaxed max-w-prose"
>
  <div class="md:float-right bg-clip-content mb-10 md:mb-0">
    <HeroImage classes="rounded-full overflow-hidden md:ml-5" width="300" height="300" />
  </div>
  <p class="max-w-prose">
    My name is <span
      class="bg-gradient-90 from-purple-600 to-red-500 dark:from-purple-500 dark:to-red-400"
      >Antonio</span
    > and I am a software engineer with a passion for developing green software.
  </p>
  <p class="mt-5">
    I specialise in <span
      class="bg-gradient-90 from-purple-600 to-red-500 dark:from-purple-500 dark:to-red-400"
      >React</span
    >,
    <span class="bg-gradient-90 from-purple-600 to-red-500 dark:from-purple-500 dark:to-red-400"
      >Svelte</span
    >,
    <span class="bg-gradient-90 from-purple-600 to-red-500 dark:from-purple-500 dark:to-red-400"
      >Node</span
    >,
    <span class="bg-gradient-90 from-purple-600 to-red-500 dark:from-purple-500 dark:to-red-400"
      >AWS</span
    >, and
    <span class="bg-gradient-90 from-purple-600 to-red-500 dark:from-purple-500 dark:to-red-400"
      >Typescript</span
    >, and I have years of experience developing efficient and sustainable software solutions.
  </p>

  <p class="mt-5">
    I strongly believe in the importance of creating software that is environmentally responsible,
    and I am committed to incorporating eco-friendly practices into my work whenever possible. By
    focusing on reducing energy consumption, minimising waste, and using sustainable resources, <span
      class="bg-gradient-90 from-purple-600 to-red-500 dark:from-purple-500 dark:to-red-400"
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
    <a
      class="bg-gradient-271 from-darkFromColor via-darkViaColor1 via-darkViaColor2 to-lightToColor dark:from-darkFromColor dark:via-darkViaColor1 dark:via-darkViaColor2 dark:to-darkToColor m-0 leading-standard"
      href="mailto:hello@antoniorossi.net">hello@antoniorossi.net</a
    >
  </p>
  <div>
    <h2 class="text-xl font-normal tracking-normal mt-5 !mb-0">Skills and Experience</h2>
    <div class="flex justify-between text-base">
      <span class="flex-1 mt-5 mb-0 text-neutral-400 dark:text-neutral-600">YEARS</span>
      <span class="flex-1 flex justify-center mt-5 mb-0 text-neutral-400 dark:text-neutral-600"
        ><span
          class="flex justify-center items-center w-7 h-7 border-solid border-2 border-neutral-200 dark:border-neutral-800 rounded-full"
          >{halfWayExperience}
        </span></span
      >
      <span
        class="flex-1 flex justify-end text-left mt-5 mb-0 text-neutral-400 dark:text-neutral-600"
        ><span
          class="flex justify-center items-center w-7 h-7 border-solid border-2 border-neutral-200 dark:border-neutral-800 rounded-full"
          >{maxExperience}</span
        >
      </span>
    </div>
    <div style="margin-top: -1px" class="grid grid-cols-1 grid-rows-1">
      <table style="grid-column: 1; grid-row: 1;">
        <tr>
          <td
            class="w-6/12 border-solid border-l-0 border-r-2 border-neutral-200 dark:border-neutral-800"
          />
          <td class="w-6/12 border-solid border-neutral-200 dark:border-neutral-800" />
        </tr>
      </table>
      <div style="grid-column: 1; grid-row: 1;">
        {#each orderedSkills as skill}
          <Skill {skill} percentage={(skill.value / orderedSkills[0].value) * 100} />
        {/each}
      </div>
    </div>
  </div>
</div>
