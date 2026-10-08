<script lang="ts">
  import { resolve } from "$app/paths";
  import PageHeader from "#lib/components/PageHeader.svelte";
  import Skill from "./Skill.svelte";
  import meImage from "#lib/assets/images/home/me-b-and-w.jpg?enhanced&w=300&h=300&quality=50";
  import { calculateExperience } from "#lib/utils.js";
  import { calculatePastExperience } from "#lib/utils.js";

  const skills: { name: string; start: string; end?: string }[] = [
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
</script>

<svelte:head>
  <title>About · Antonio Rossi</title>
  <meta
    name="description"
    content="Antonio Rossi is a software engineer in Reading, UK, who builds efficient, sustainable software and grows his own food."
  />
</svelte:head>

<PageHeader eyebrow="About" title="About me" />

<div
  class="md3:grid-cols-[minmax(0,1fr)_15rem] md3:gap-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_18rem]"
>
  <div class="md3:order-last md3:pt-1">
    <enhanced:img
      src={meImage}
      alt="Antonio speaking in public"
      class="md3:w-full aspect-square w-48 rounded-2xl object-cover grayscale"
    />
  </div>

  <div class="md2:text-xl text-ink-soft max-w-2xl space-y-6 text-lg leading-relaxed text-pretty">
    <p class="text-ink">
      My name is Antonio and I am a software engineer with a passion for developing green software.
    </p>

    <p>
      I specialise in <span class="text-ink">React, Svelte, Node, AWS, and Typescript</span>, and I
      have years of experience developing efficient and sustainable software solutions.
    </p>

    <p>
      I strongly believe in the importance of creating software that is environmentally responsible,
      and I am committed to incorporating eco-friendly practices into my work whenever possible. By
      focusing on reducing energy consumption, minimising waste, and using sustainable resources,
      <span class="text-ink"
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
      <a href={resolve("contact")} class="link text-ink">send me a message</a>.
    </p>
  </div>
</div>

<section
  aria-labelledby="skills"
  class="md3:mt-28 md3:grid-cols-[12rem_minmax(0,1fr)] border-line mt-20 grid gap-x-12 gap-y-8 border-t pt-12"
>
  <div>
    <p class="eyebrow">Toolbox</p>
    <h2 id="skills" class="text-ink tracking-title mt-3 font-serif text-4xl leading-none">
      Skills and experience
    </h2>
    <p class="text-muted mt-4 text-sm leading-relaxed">
      Years with each tool. The faded ones are tools I used to work with.
    </p>
  </div>
  <ul class="border-line border-b">
    {#each orderedSkills as skill (skill.name)}
      <Skill {skill} percentage={(skill.value / orderedSkills[0].value) * 100} />
    {/each}
  </ul>
</section>
