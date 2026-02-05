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

<h1
  class="font-Cormorant m-0 pt-10 pb-8 text-5xl text-neutral-800 md:pt-0 md:text-6xl dark:text-neutral-100"
>
  About me
</h1>

<div class="font-Roboto max-w-3xl">
  <div class="mb-12 bg-clip-content md:float-right md:mb-6 md:ml-8">
    <enhanced:img
      src={meImage}
      alt="myself speaking in public"
      class="overflow-hidden rounded-full"
    />
  </div>

  <div class="space-y-6 text-lg leading-8 text-neutral-700 dark:text-neutral-300">
    <p>
      My name is <span
        class="bg-gradient-to-r from-purple-600 to-red-500 bg-clip-text font-medium text-transparent dark:from-purple-500 dark:to-red-400"
        >Antonio</span
      > and I am a software engineer with a passion for developing green software.
    </p>

    <p>
      I specialise in <span class="font-medium text-neutral-900 dark:text-neutral-100"
        >React, Svelte, Node, AWS, and Typescript</span
      >, and I have years of experience developing efficient and sustainable software solutions.
    </p>

    <p>
      I strongly believe in the importance of creating software that is environmentally responsible,
      and I am committed to incorporating eco-friendly practices into my work whenever possible. By
      focusing on reducing energy consumption, minimising waste, and using sustainable resources,
      <span class="font-medium text-neutral-900 dark:text-neutral-100"
        >I strive to create software that is efficient, cost-effective and environmentally
        conscious.</span
      >
    </p>

    <p>
      When I'm not coding, you usually find me trail running in the countryside or climbing. I have
      a deep appreciation for nature and enjoy spending time in the great outdoors. I enjoy
      traveling slow, by train, bicycle, or on foot. I did the Camino de Santiago and several other
      long-distance walks and hikes.
    </p>

    <p>
      In my free time, I also grow my own food in an allotment, which allows me to practice
      sustainable living and connect with the earth.
    </p>

    <p>
      Thank you for taking your time to learn a little but more about myself. If you have any
      questions, if we have passions in common, or if you just want to say hi, do not hesitate to
      contact me at
      <a
        href="mailto:hello@antoniorossi.net"
        class="font-medium text-teal-600 underline decoration-teal-600/30 underline-offset-4 transition-colors hover:text-teal-500 hover:decoration-teal-500/50 dark:text-teal-400 dark:decoration-teal-400/30 dark:hover:text-teal-300 dark:hover:decoration-teal-300/50"
      >
        hello@antoniorossi.net
      </a>
    </p>
  </div>

  <div class="clear-both mt-16">
    <h2 class="font-Cormorant mb-8 text-3xl font-medium text-neutral-800 dark:text-neutral-100">
      Skills and Experience
    </h2>
    <div class="mb-4 flex justify-between text-sm font-medium tracking-wider uppercase">
      <span class="flex-1 text-neutral-400 dark:text-neutral-600">Years</span>
      <span class="flex flex-1 justify-center text-neutral-400 dark:text-neutral-600"
        ><span
          class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-neutral-300 text-base dark:border-neutral-700"
          >{halfWayExperience}
        </span></span
      >
      <span class="flex flex-1 justify-end text-neutral-400 dark:text-neutral-600"
        ><span
          class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-solid border-neutral-300 text-base dark:border-neutral-700"
          >{maxExperience}</span
        >
      </span>
    </div>
    <div class="grid grid-cols-1 grid-rows-1">
      <table class="col-start-1 row-start-1">
        <tbody>
          <tr>
            <td
              class="w-6/12 border-r-2 border-l-0 border-solid border-neutral-300 dark:border-neutral-700"
            ></td>
            <td class="w-6/12 border-solid border-neutral-300 dark:border-neutral-700"></td>
          </tr>
        </tbody>
      </table>
      <div class="col-start-1 row-start-1">
        {#each orderedSkills as skill}
          <Skill {skill} percentage={(skill.value / orderedSkills[0].value) * 100} />
        {/each}
      </div>
    </div>
  </div>
</div>
