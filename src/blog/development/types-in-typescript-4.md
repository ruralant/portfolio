---
title: Types in Typescript - Enum
slug: types-in-typescript-4
subtitle: A quick look at one of the new Typescript types
category: programming
tags: [typescript]
published: false
date: 2022-04-11
layout: development
type: development
---

<script>
  import mainImage from '$lib/assets/images/articles/types-mug.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/articles/types-mug.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/articles/types-mug.jpg?w=1000&h=600&srcset';
  import Image from '$lib/components/Image.svelte';
</script>

<Image
wepImage={mainImageWebP}
jpegImage={mainImage}
alt='mug with a lake in the background'
width={1000}
height={600}
placeholder='blur'
classes={'mt-6 mb-8 rounded-lg drop-shadow-md'}
loading='eager'
/>

`enum` is a data type that can use to create a set of constants to be used with variables and properties.

The best use of `enum` is when a procedure accept a limited set of variables.

```
enum CardinalDirections {
    North,
    East,
    South,
    West
}
```

Once the `enum` has been declare, you it can be used in the following way:

```
const shipDirection = CardinalDirections.South;
console.log(shipDirection)
// 2
```

By default, the values of `enum` starts at 0. In the above example, `CardinalDirections.South` resulted to 2. `North` would result as 0, `East`as 1 and `west` as 3.

This behavior can be overwritten. Is it possible to specify the start value in the following way:

```
enum CardinalDirections {
    North = 2,
    East,
    South,
    West
}

const shipDirection = CardinalDirections.South;
console.log(shipDirection)
// 4
```

`enum` can also accept strings:

```
enum CardinalDirections {
    North = 'Buccaneer, let's go north!'
    East = 'Freebooter, let's go east!'
    South = 'Pirates, let's go south!'
    West = 'Rovers, let's go west!'
}
```
