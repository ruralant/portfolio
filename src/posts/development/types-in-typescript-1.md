---
title: Types in Typescript - Primitive Values
slug: types-in-typescript-1
subtitle: A detailed look into the primitive types in Typescript
category: programming
tags: [typescript, types, basics]
mainImage: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageAlt: An image of pure water with wite sand
mainImageThumb: https://res.cloudinary.com/antonio-rossi/image/upload/w_300,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
published: true
date: 2022-04-18
layout: development
type: development
---

This is the first article of a series of 5 about types in TypeScript.
I used TypeScript for 4 years when I was working with Angular 4. However, I dropped it in the last 2 as in my previous company wasn't part of the tech stack.

I recently joined a new company that used TypeScript in both front end (React) and backend (Node/Lambda functions).

For this reason, I decided to start from the basis and have a deep dive in TypeScript to refresh my knowledge. This series of article is going to be a summary of my findings and understandings and I hope it'll be a good summary for whomever wishes to starts using TypeScript.

There are several types in TypeScript and we'll divided them in categories and start to look at each one in a progressive order and hopefully this will help in understand them a little bit better.

### Any Type

Types in Typescript are a subtype of the `any` type. The `any` type represent any JavaScript value, without constrains.

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

If you have any basic experience of coding, you might be able to guess the values of this datatype :)

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

`enum` is one of the most recent additions to the TypeScript types list and stands for enumeration. An `enum` is a set of values and you can use it to create a set of constants to be used with variables and properties. The behavior of `enum` is largely different compared with what we saw so far, so I'll explain it in details in q <a href="https://www.antoniorossi.net/blog/development/types-in-typescript-2" target="_blank">dedicated article</a>

### Void, null, undefined

These are primitive values but on their own do not make much sense. However, they are really useful alongside `functions`. So bare with me and we'll discuss them later.

### Object Types:

- `function`
- `object`
- `bigint`
- `symbol`
- `undefined`
- `never`
