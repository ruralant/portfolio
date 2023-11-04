---
title: Types in Typescript - Primitive Values
slug: types-in-typescript-1
subtitle: A detailed look into the primitive types in Typescript
category: programming
tags: [typescript, types, basics]
published: true
date: 2022-04-18
layout: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/types-typewriter.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/types-typewriter.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/types-typewriter.jpg?w=1000&h=600&srcset';
</script>

<Image
  wepImage={mainImageWebP}
  jpegImage={mainImage}
  alt='old typewriter'
  width={1000}
  height={600}
  placeholder='blur'
  classes='mt-6 mb-8 rounded-lg drop-shadow-md'
  loading='eager'
  feedImage=true
/>

I recently joined a new company where we make extensive use of TypeScript in both the front end (React) and the backend (Node.js/AWS Lambda functions). So I decided to write a few articles of my journey in re-learning TypeScript.

I'm saying re-learning because I actually worked 4 years with TypeScript. But I was at the start of my career and I haven't used it in the last 24 months. For this reason I decided to start from the basics and with a beginner and curious mind.

I hope this series of articles will be a good summary for both people starting their TypeScript journey and more advance developer that, like me, wants to have a better understanding of the quirkiness of the language.

### What is TypeScript?

Accordingly to Microsoft:

> TypeScript is JavaScript for application-scale development.

In more technical terms, it's a strongly typed, object oriented, superset of JavaScript. Basically it compiles into JavaScript and that add on top of it some some additional features.

### Types

As the main difference with JavaScript is that is a typed language, I feel like looking into the types could be a good start.

There are several types in TypeScript and it would be impossible to sufficiently cover them in a single article. So I'll divided them in categories and start to look at each one in a progressive order.

Let have a bird's eye view at them:

### The Any and Unknown type

All types in Typescript are a subtype of the `any` type. The `any` type represent any JavaScript value, without constrains.

For a more in-depth analysis of the type `any` and the new type `unknown` please check out my <a href="https://www.antoniorossi.net/blog/development/types-in-typescript-2" target="_blank" rel="noreferrer">dedicated article</a>

### Primitive Types:

The primitive types are the following:

- `boolean`
- `number`
- `bigint`
- `string`
- `enum`
- `void`
- `null`

They are the most common one and they might not sound new to you.

#### Boolean Type

If you have any basic experience of coding, you might be able to guess the values of this datatype. Boolean values can be either `true` or `false`

```
const x: boolean = true
const y: boolean = false;
```

#### String Type

Another easy type to remember is the `string` type, a sequence of Unicode UTF-16 code units, or simply, a piece of text surrounded by quotes.

```
const x = 'hello'
const z = "hi"
const y = ""
```

In TypeScript you can also use template strings, strings that can be embedded and that can span in multiple lines. To create a template string, you just need to surround it with backtick. On how to embed them, refer to the following example:

```
const greetings: string = 'meow meow'
const sentence: string = `At 5 am the cat said ${greetings}`

// At 5 am the cat said meow meow

const poem: string = `I wonder thro' each charter'd street
    Near where the charter'd Thames does flow`

// I wonder thro' each charter'd street
      Near where the charter'd Thames does flow

```

#### Number and bigint

In TypeScript, numbers are either floating points values or BigIntegers.
Floating point values (`number`) are numbers without a fixed number of digits before and after the decimal point.

```
const x: number = 1
const y: number = 0.1
const z: number = 123.456
```

`bigInt` are numbers that are larger than `9007199254740991` (9 quadrillions) or ``. In JavaScrip this limit can be retrieved using `Number.MAX_SAFE_INTEGER`.

```
const bigNumber: bigint = 150n
```

#### Enum Type

`enum` is one of the most recent additions to the TypeScript types list and stands for enumeration. An `enum` is a set of values and you can use it to create a set of constants to be used with variables and properties. The behavior of `enum` is largely different compared with what we saw so far, so I'll explain it in details in a future article.

### Void, null, undefined

These are primitive values but on their own do not make much sense. However, they are really useful alongside `functions`.

### Object Types

The remaining types, called object types, are the second corner store on which the language is build it. Object types are the following:

- `function`
- `object`
- `symbol`
- `undefined`
- `never`

### Conclusion

This was a quick overview of the types in TypeScript. In the next few articles, we'll deep dive into each one/

Thank you for reading my very first technical article. I'm looking forward to re-reading it in a year time and see (hopefully) some improvements.
I'm really exited to start this blog and I hope it'll be as useful to you as it's for me. Teaching and writing is a great way to solidify knowledge and giving back to the community.

Until the next time, keep on coding!
