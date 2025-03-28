---
title: Types in Typescript - Type assertion and type guards
slug: types-in-typescript-3
subtitle: Let's talk about two of the most misused types in Typescript and how to handle types unknown at the time you develop.
category: programming
tags: [typescript]
published: false
date: 2022-04-12
layout: development
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
  classes='mt-6 mb-8 rounded-lg drop-shadow-md'
  loading='eager'
  feedImage=true
/>

### Assertions

In the <a href="https://www.antoniorossi.net/blog/development/types-in-typescript-2" target="_blank" rel="noreferrer">previous article</a> we had a look a the type `any` and `unknown`.

Alongside the two types (but in particular `any`), to avoid errors at runtime, it can be useful to use **type assertion**.

This is an example of type assertion:

```
(value as string).toUpperCase();
```

or

```
(<string>value).toUpperCase();
```

There is no difference between the two example above, it's a different syntax to achieve the same result. They are a check to determine if the value is a string, and if it's they call a method that is specific to the `string` type.

When I was working with `Angular` (meaning Angular version 2, not to be confused with `AngularJS`) I used a lot the `< >` syntax. However, in the last couple of years, while working with `React` always favored the `as` syntax as it create less confusion when used with JSX.

### Guards

A type guard is a type check (used, for example, alongside an if statement), to make sure that the type handled by the code is valid.

Guards can be used really effectively in combination with assertions in the following way:

```
let value: unknown = 'true

value = 100
value = 'Hello'

if (typeof value === 'string) {
  console.log((value as string).toUpperCase())
  // HELLO
} else {
  trow new Error('Value type not valid. Expected a string')
}
```

In the previous block of code, we used `typeof` to check if the value was a string and we acted accordingly.

Please not that, in the example, the assertion was needed because we assigned the type `unknown` to the variable. If the value was `any`, we could have omitted the assertion.

Examples:

- `string`: `typeof value === string`
- `number`: `typeof value === number`
- `boolean`: `typeof value === boolean`
- `array`: `Array.isArray(value)`
