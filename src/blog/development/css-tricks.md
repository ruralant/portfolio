---
title: Css tricks
slug: css-tricks
subtitle: Some CSS tricks that I learned too late into my career
category: programming
tags: [css]
published: false
date: 2022-08-31
layout: development
type: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/types-mug.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/types-mug.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/types-mug.jpg?w=1000&h=600&srcset';
</script>

<Image
wepImage={mainImageWebP}
jpegImage={mainImage}
alt='mug with a lake in the background'
width={1000}
height={600}
placeholder='blur'
classes='mt-6 mb-8 rounded-lg drop-shadow-md webfeedsFeaturedVisual'
loading='eager'
/>

Hyperlink color with `inherit`
