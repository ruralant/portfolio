---
title: Types in Typescript - Primitive Values
slug: types-in-typescript-1
subtitle: A detailed look into the primitive types in Typescript
category: programming
tags: [typescript, types, basics]
mainImage: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000/q_auto,f_auto/v1650352190/articles/types/florian-klauer-mk7D-4UCfmg-unsplash_b4tmof.jpg
mainImageWebP: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,f_webp/q_auto,f_auto/v1650352190/articles/types/florian-klauer-mk7D-4UCfmg-unsplash_b4tmof.jpg
mainImageAlt: An image of pure water with wite sand
mainImageThumb: https://res.cloudinary.com/antonio-rossi/image/upload/w_300/q_auto,f_auto/v1650352190/articles/types/florian-klauer-mk7D-4UCfmg-unsplash_b4tmof.jpg
published: true
date: 2022-04-18
layout: development
type: development
---

I recently joined a new company that uses TypeScript in both front end (React) and backend (Node/Lambda functions) so I decided to write a few articles of my journey in re-learning TypeScript.

To be completely open, I'm not new to TypeScript as I used it for 4 years when I was working with Angular 4. However, I had a two years break from it as in my former company TypeScript wasn't part of the tech stack.

For this reason, I decided to start from the basis and have a deep dive in TypeScript to refresh my knowledge. This series of article is going to be a summary of my findings and understandings and I hope it'll be a good summary for whomever wishes to starts using TypeScript.

There are several types in TypeScript and we'll divided them in categories and start to look at each one in a progressive order and hopefully this will help in understand them a little bit better.

### Any Type

All types in Typescript are a subtype of the `any` type. The `any` type represent any JavaScript value, without constrains.

For a more in-depth analysis of the type `any` and the new type `unknown` please check out my <a href="https://www.antoniorossi.net/blog/development/types-in-typescript-2" target="_blank">dedicated article</a>

### Primitive Types:

Let's have a look at the other most-common types:

- `boolean`
- `number`
- `bigint`
- `string`
- `enum`
- `void`
- `null`

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

`enum` is one of the most recent additions to the TypeScript types list and stands for enumeration. An `enum` is a set of values and you can use it to create a set of constants to be used with variables and properties. The behavior of `enum` is largely different compared with what we saw so far, so I'll explain it in details in a future article

### Void, null, undefined

These are primitive values but on their own do not make much sense. However, they are really useful alongside `functions`. So bare with me and we'll discuss them later.

### Object Types:

The remaining types, called object types, will be discussed in a future article.

- `function`
- `object`
- `symbol`
- `undefined`
- `never`
