---
title: Types in Typescript - Any and Unknown
slug: types-in-typescript-2
subtitle: Let's talk about two of the most misused types in Typescript and how to handle types unknown at the time you develop.
category: programming
tags: [typescript]
published: true
date: 2022-05-04
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

Sometimes, when you write code in a typed language, you have to work with values that are unknown to you at the time you write the code. When that happen, you can use `any` and `unknown` and you can use **type guards** to maintain control of what types your code can handle.

### Any

The `any` type can represent any JavaScript value and it can be useful in several situations:

- when expecting values from a third party library
- when expecting values from a user input
- when you're gradually migrating from JavaScript

```
let value: any = 'hey!'
value = true
value = 1
```

The aforementioned code, won't throw any error at compilation time. The reason is that the type `any` skip the type checking.

Obviously, errors runtime errors will be triggers depending on the datatype and the assumption.

```
let value: any = true;
value.toUpperCase()
// Uncaught TypeError: value.toUpperCase is not a function
```

### Unknown

As we saw in the previous example, the `any` type is really flexible, to the extent that it can be abused and can often cause unexpected errors.

The recently added `unknown` type try to solve such problems. It can be assign to any value but you can't access properties or call or construct the to the value marked as `unknown`.

An example of `unknown` in action, along side the `any` type:

```
let value: any = 'hello'
value.toUpperCase()
// 'HELLO

value.map(e => console.log(e));
// value.map is not a function


let secondValue: unknown = 'world'
secondValue.toUpperCase()
// Error: Object is of type unknown

value.map(e => console.log(e));
// Error: Object is of type unknown
```

It's not possible to interact, in any way, with a variable of type `unknown`. It'll always error at compiling time.
On the other hand, you can, always interact with a variable of type `any` and it won't error at compiling time. However, it might error at runtime.

### Conclusion

The `unknown` type would have been really useful in one of my previous companies. We were using Angular (framework based on TypeScript) but he had to move really fast and build several product from scratch in a very short period of time. We abused of the type `any`, to the extent that the only difference with JavaScript, was the possibility to use the latest syntactic sugar additions.

The type `unknown` would have been really useful for the developers that wanted to move fast, without breaking things. We didn't have it at that time, but now we do and it's awesome to break things!
