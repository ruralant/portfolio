---
title: Types in Typescript - Never
slug: types-in-typescript-5
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

The type `never` is not as popular as the other types we discussed in the previous articles. Personally speaking, before realised it existed, it took me more than an year. And, even after that, I used it a handful of times.

However, it can be really useful is some use cases and it's worth to discuss it, so let's begin!

In short, `never` is an empty set of values. The first time I read this definition, it didn't really clarify to me what `never` does (SMILE)

The idea is that `never` can't have any value, not even `any`.

```
const value: never = any
// Error: type 'any' is not assignable to type 'never'
```

As you can see from the example above, it's not super frequent to have the need to use the `never` type. But

I'll give you an example:

```
const doNotCookInMicrowave = (food: never): never {
    thrown new Error('You can't cook that it in the microwave!')
}

type Food = 'veggies' | 'pizza' | 'soup'

const cookInMicrowave(food: Food): string {
    switch(food) {
        case 'veggies':
            return 'Power: 50. Minutes 10.';
            break;
        case 'pizza':
            return 'Power 100. Minutes 1.'
            break;
        case 'soup':
            return 'Power 60'. Minutes 6.'
            break;
        default:
            return doNotCookInMicrowave(food);
    }
}
```

It can also be used with unions and intersections and it can in the same way 0 works in math:

```
type Value = never | string;
// string
```

```
type Value = never & string;
// never
```

There are several advance cases and one example could be **partially disallow structural typing**

```
type A = {
    a: string
}

type: B = {
    b: boolean
}

declare function randomFunction(arg: A | B): void

const test = {
    a: 'test',
    b: 1
}

randomFunction()
// ... nothing, no complains from TypeScript
```

However, using `never` we can overwrite this behavior:

```
type A = {
    a: string
    b?: never
}

type: B = {
    a?: never
    b: boolean
}

declare function randomFunction(arg: A | B): void

const test = {
    a: 'test',
    b: 1
}

randomFunction()
// // Error: type 'boolean' is not assignable to type 'never'
or
// // Error: type 'string' is not assignable to type 'never'
```

### In summary

It's good to know that type `never` exist as it can be quite useful is some edge cases or if you encounter it in code written by someone else.

As I mentioned, I used it really rarely but if you have a use case where you reach fairly often for the type `never`, please send me an email.

I would be really interested in learning more as I have the feeling that I could used it more in my daily work.
