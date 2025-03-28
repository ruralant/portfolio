---
title: An example of programming language evolution
slug: copy-replace-array-javascript
subtitle: Modern vs old JavaScript. The differences when copy and array and replace an element.
category: javascript
tags: [javascript]
published: true
date: 2023-08-24
layout: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/evolution.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/evolution.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/evolution.jpg?w=1000&h=600&srcset';
</script>

<Image
	wepImage={mainImageWebP}
	jpegImage={mainImage}
	alt='a stormtrooper picking up a flower'
	width={1000}
	height={600}
	placeholder='blur'
	classes='mt-6 mb-8 rounded-lg drop-shadow-md'
	loading='eager'
	feedImage=true
/>

With this post I want to emphasise the importance of keeping up with the evolution of the programming languages we use. I will use JavaScript as an example.

I worked in the field long enough to remember when in JavaScript all the variables where declared with the `var` keyword. It wasn't that long ago, but it feels like decades. In the last few years, JavaScript has evolved a lot. The introduction of the `let` and `const` keywords, the arrow functions, the spread operator, the `Object.assign()` method, the `JSON.parse()` and `JSON.stringify()` methods, `async/await`, and many more. All these new features have made JavaScript a much more powerful and flexible language.

Let's take a common task and compare how it was done in the past and how it is done now.

### Copy an array and replace one element at a specific index

I saw people approaching the problem using `.map` in the following way (I'm going to use old fashioned syntax to have a little but of fun):

```javascript
function changeItem(array, index, newValue) {
  return array.map((value, i) => {
    if (i === index) return newValue;

    return value;
  });
}

var array = [1, 2, 3, 4, 5];
var newArray = changeItem(array, 2, 100);

console.log(array === newArray); // false
console.log(newArray); // [1, 2, 100, 4, 5];
```

So, we successfully create a new array (without modifying the original one) and we replace the element at the specified index.

Now, let's see how we can achieve the same result in 2023:

```javascript
const array = [1, 2, 3, 4, 5];
const newArray = array.with(2, 100);

console.log(array === newArray); // false
console.log(newArray); // [1, 2, 100, 4, 5];
```

One line of code instead of seven, 36 characters typed instead of 185. And I would argue that it's way more readable.

### Conclusion

I still hear people complaining about how awful is working with JavaScript/Typescript. And, although the weird behaviours are mostly still there, the language has made massive progress and, as already mentioned in my previous posts, I strongly encourage people to keep up with the new features and use them as much as possible. You your and your colleagues sanity sake.

Until the next time, keep on coding!
