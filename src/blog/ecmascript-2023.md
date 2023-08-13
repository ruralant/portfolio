---
title: ECMAScript 2023 - JavaScript gets new goodies
slug: ecmascript-2023
subtitle: What's coming in the 2023 version of JavaScript. A quick overview of the new features
category: javascript
tags: [javascript, ecma, ecmascript]
published: true
date: 2023-07-22
layout: development
type: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/2023.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/2023.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/2023.jpg?w=1000&h=600&srcset';
</script>

<Image
	wepImage={mainImageWebP}
	jpegImage={mainImage}
	alt='a new desktop folder called 2023'
	width={1000}
	height={600}
	placeholder='blur'
	classes='mt-6 mb-8 rounded-lg drop-shadow-md'
	loading='eager'
	feedImage=true
/>

ECMAScript 2023 is the next version of the JavaScript language. It was released in June 2023 and it is the 14th edition of the ECMAScript standard. As JavaScript (and Typescript) developers, it's important to keep up with the latest changes in the language. In this blog post, we'll take a look at some of the new features that are coming in ECMAScript 2023.

### Array.findLast() and Array.findLastIndex()

The two new methods allow you to search an array starting from it's end. It's the classic example of a really welcome method (at least for me) because it just enhance the DX (developer experience). Yes, you could achieve the same result manually reversing the array but having a method embedded in the language offers a cleaner, more intuitive and easier way to write/read/debug the code.

Example:

```js
const numbers = [1, 2, 3, 4, 5];
const lastEvenNumber = numbers.findLast((num) => num % 2 === 0);
console.log(lastEvenNumber); // Result: 4
```

### Hashbang (#!)

You can now add an hashbang symbol (`#!`) at the start of a script. This new symbol allow you to specify which JS interpreter should execute the script. Personally speaking I was already familiar with this concept as it's part of the Unix word since ages and I'm pretty sure you could already do this in Node or Deno. However, it's nice to see it officially added to the language.

Example:

```js
#!/usr/bin/env node
// Translation: this script to be executed with Node.js

console.log("Hello World!");
```

### Symbols as WeakMap keys

I believe it' beneficial to have a better understanding of the WeakMap data structure before diving into this new feature. A WeakMap is a collection of key/value pairs in which the keys are weakly referenced. This means that if there are no other references to a key, the key/value pair will be garbage collected. This is useful for storing data that is associated with a particular object, but that should be garbage collected when the object is no longer in use.

Before ECMAScript 2023, the keys of a WeakMap could only be objects. Now, you can use symbols as keys as well. This is useful for storing data that is associated with a particular symbol, but that should be garbage collected when the symbol is no longer in use.

Example:

```js
const symbolKey = Symbol("uniqueKey");
const weakMap = new WeakMap();
weakMap.set(symbolKey, "This data is associated with the unique symbol key.");
```

### Change array by copying it

This new features relates nicely with the blog post I wrote about a few weeks ago: [How to clone an object in JavaScript](/blog/javascript-clone-objects).

The new methods allow you to change an array without mutating the original one. It's definitely a nice addition to the language as they are going to be useful on a functional programming environment and they will will give developers the peace of mind of not mutating the original array.

The methods are: `toReversed()`, `toSorted()`, `toSpliced()`, and `with()`.

Example:

```js
const originalArray = [1, 2, 3];
const reversedArray = originalArray.toReversed();
console.log(reversedArray); // Output: [3, 2, 1]

// Original array is not modified
console.log(originalArray); // Output: [1, 2, 3]
```

```js
const values = [1, 10, 21, 2];
const sortedValues = values.toSorted((a, b) => a - b);
console.log(sortedValues); // [1, 2, 10, 21]

// Original array is not modified
console.log(values); // [1, 10, 21, 2]
```

```js
const months = ["Jan", "Mar", "Apr", "May"];

// Inserting an element at index 1
const months2 = months.toSpliced(1, 0, "Feb");
console.log(months2); // ["Jan", "Feb", "Mar", "Apr", "May"]

// Deleting two elements starting from index 2
const months3 = months2.toSpliced(2, 2);
console.log(months3); // ["Jan", "Feb", "May"]

// Replacing one element at index 1 with two new elements
const months4 = months3.toSpliced(1, 1, "Feb", "Mar");
console.log(months4); // ["Jan", "Feb", "Mar", "May"]

// Original array is not modified
console.log(months); // ["Jan", "Mar", "Apr", "May"]
```

```js
const originalArray = [1, 2, 3, 4, 5];
const newArray = originalArray.with(2, 6);
console.log(originalArray); // [1, 2, 3, 4, 5]

// Original array is not modified
console.log(newArray); // [1, 2, 6, 4, 5]
```

### Conclusion

ECMAScript 2023 is a can be seen as a minor release of the language. However, it's nice to see that the language is still evolving in a direction that is making it more versatile and easier to use.

Until the next time, keep on coding!
