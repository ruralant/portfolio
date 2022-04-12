---
title: Types in Typescript - Objects
slug: types-in-typescript-3
subtitle: A detailed look into the primitive types in Typescript
category: programming
tags: [typescript]
mainImage: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageAlt: An image of pure water with wite sand
mainImageThumb: https://res.cloudinary.com/antonio-rossi/image/upload/w_300,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
published: false
date: 2022-04-12
layout: development
type: development
---

Types:

### Any

Types in Typescript are a subtype of the `any` type. The `any` type represent any JavaScript value, without constrains.

Let's have a look at the other types:

### Primitive Types:

- `boolean`
- `number`
- `bigint`
- `string`
- `enum`
- `void`
- `null`

#### Boolean

If you have any basic experience of coding, you might be able to guess the values of this datatype :)

```
const x: boolean = true
const y: boolean = false;
```

#### String

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

#### Enum

`enum` is one of the most recent additions to the TypeScript types list and stands for enumeration. An `enum` is a set of values and you can use it to create a set of constants to be used with variables and properties. The behavior of `enum` is largely different compared with what we saw so far, so I'll explain it in details in a the next article.

### Void, null, undefined

These are primitive values but on their own do not make much sense. However, they are really useful alongside `functions`. So bare with me and we'll discuss them later.

### Object Types:

- `function`
- `object`
- `bigint`
- `symbol`
- `undefined`
- `never`
