---
title: Solving z-index wars with the isolation property
slug: z-index-isolation
subtitle: Possibly the best strategy to solve z-index madness
category: css
tags: [css, z-index, insolation]
published: false
date: 2023-01-17
layout: development
type: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/isolation.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/isolation.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/isolation.jpg?w=1000&h=600&srcset';
</script>

<Image
  wepImage={mainImageWebP}
  jpegImage={mainImage}
  alt='an isolated chair in the middle of a road'
  width={1000}
  height={600}
  placeholder='blur'
  classes='mt-6 mb-8 rounded-lg drop-shadow-md'
  loading='eager'
  feedImage=true
/>
