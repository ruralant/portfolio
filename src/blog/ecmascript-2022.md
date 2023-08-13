---
title: ECMAScript 2022 - My most used features of the year
slug: ecmascript-2022
subtitle: What was added to the language in the 2022 version of JavaScript and which features I'm using the most.
category: javascript
tags: [javascript, ecma, ecmascript]
published: true
date: 2023-08-13
layout: development
type: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/2022.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/2022.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/2022.jpg?w=1000&h=600&srcset';
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

Due to the discussions and interests sparked by my previous article about ECMAScript 2023 (at least within my friends and colleagues 😃), I decided to write a follow up article to cover what was added to the language in the 2022 version.

### Top level await

The await keyword can now be used at the top level of a module. This means that you can now use await outside of an async function. This is useful for top-level await in modules that are loaded asynchronously, such as modules loaded with dynamic import.

Example:

```js
// Importing a module asynchronously
const module = await import("./module.js");
```

or

```js
import { doSomethingAsyncronously } from "./module.js";

const result = await doSomethingAsyncronously();
```

### .at() method for arrays

This method returns the element at the specified index. If the index is negative, the element is returned from the end of the array.

It's a welcome addition to the language, as it makes it easier to get an element from an array without having to slice it first. It's also far more readable.

Example:

```js
const array = [1, 2, 3, 4, 5];
const element = array.at(2);
console.log(element); // 3
```

### Error cause

The Error object now has a cause property that can be used to get the original error that caused the current error.

Example:

```js
try {
  // Some code that throws an error
} catch (error) {
  throw new Error("Something went wrong", { cause: error }); // original error is now available in the cause property
}
```

### Conclusion

In my personal opinion the 2022 version was even more exiting then the 2023 version. The top level await and the cause property for errors are both very useful additions to the language. The .at() it's more a nice to have. But I really enjoy writing and reading concise code, so I'm really happy it was added to the language.

Until the next time, keep on coding!
