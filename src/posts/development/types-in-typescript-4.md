---
title: Types in Typescript - Enum
slug: types-in-typescript-4
subtitle: A quick look at one of the new Typescript types
category: programming
tags: [typescript]
mainImage: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageAlt: An image of pure water with wite sand
mainImageThumb: https://res.cloudinary.com/antonio-rossi/image/upload/w_300,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
published: false
date: 2022-04-11
layout: development
type: development
---

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
