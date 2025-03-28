---
title: Interfaces vs Types in TypeScript
slug: interfaces-vs-types
subtitle: Is there a real difference between the two? And if so, which one should I use? Let's find out!
category: programming
tags: [typescript, types, interface, basics]
published: true
date: 2023-11-04
layout: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/pondering.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/pondering.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/pondering.jpg?w=1000&h=600&srcset';
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

TypeScript provides two ways to define types: `interfaces` and `types`. They are very similar and it's not always clear which one to use. In this article, we will explore the differences between the two and when to use one over the other.

### What the TypeScript documentation says?

Accordingly to the TypeScript documentation, it's mainly a personal preference as the differences between the two are minimal. However, they also seems to advice to use `interface` as default and only use `type` for specific cases.

This is what I also do in my daily work. However, it's important to know some of the edge cases where using `interfaces` can lead to unexpected behaviors and other cases where `types` are more appropriate.

### Types

The `type` keyword can be used to create any sort of types in TypeScript, not just objects (as it's the case with interfaces).

```typescript
type StringOrNumber = string | number;

const doSomething = (arg: StringOrNumber) => {
  // do something
};

doSomething("hello"); // ok
doSomething(1); // ok
doSomething(true); // error: Argument of type 'boolean' is not assignable to parameter of type 'StringOrNumber'.
```

### Interfaces

The `interface` keyword is used to define exclusively object types. They work similarly to other object-oriented languages like Java or C#. Differently from `type`, interfaces can be extended and merged.

```typescript
interface Person {
  name: string;
  age: number;
  run: () => void;
}

interface Farmer extends Person {
  plantPotatoes: () => void;
}
```

### Inheritance

In the example above, we saw an interface inheritance in action. We also mentioned that it's not possible to extend a type. This is technically true. However, there is a way to achieve a similar result using `&` (intersection) to combine two types.

```typescript
type Person = {
  name: string;
  age: number;
  run: () => void;
};

type Farmer = Person & {
  plantPotatoes: () => void;
};
```

This is a perfectly valid and acceptable way to achieve inheritance. However, it's less efficient. Let's see why.

When you create an interface and use `extend`, TypeScript can cache in it's internal registry. This allows to make future checks against the interface faster. The caching is done by interface name.
However, using the `&` operator, TypeScript can't cache via name and for this reason needs to compute the intersection every time it's used.

### Declaration merging

Another feature of interfaces is declaration merging. This allows to extend an interface by adding new properties to it by declaring the same interface a second time:

```typescript
interface Person {
  name: string;
  age: number;
  run: () => void;
}

interface Person {
  plantPotatoes: () => void;
}

const farmer: Person = {
  name: "John",
  age: 30,
  run: () => console.log("running"),
  plantPotatoes: () => console.log("planting potatoes")
};

const farmer2: Person = {
  name: "John",
  run: () => console.log("running"),
  plantPotatoes: () => console.log("planting potatoes")
}; // error: Property 'age' is missing in type...
```

You can't do the same with types:

```typescript
type Person = {
  name: string;
  age: number;
  run: () => void;
};

type Person = {
  plantPotatoes: () => void;
}; // error: Duplicate identifier 'Person'.
```

This is a feature but it could also easily lead to unexpected behaviors. And to be honest, if I see a declaration merging in a codebase, I would probably refactor it to use a single interface.

### Conclusion

I have the feeling that this article could be summarized in two (really annoying) words: "it depends". However, I hope I was able to provide some useful examples and provide some food for thought. I'll keep using interface as default as per TypeScript documentation. However, I'll also try to remember to use types when it's more appropriate.

Until the next time, keep on coding!
