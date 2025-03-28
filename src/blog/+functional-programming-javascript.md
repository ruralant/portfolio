---
title: Functional programming in JavaScript
slug: functional-programming-javascript
subtitle: A bird's eye view of one of the best paradigm you can use in JavaScript
category: paradigm
tags: [javascript, paradigms]
mainImage: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageWebP: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive,f_webp/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageAlt: An image of pure water with wite sand
mainImageThumb: $lib/assets/article-thumbs/pure.jpg
published: false
date: 2022-03-30
layout: development
---

Functional programming is a paradigm of writing code using functions and expressions without mutating data and state.

The aim of this particular paradigm is to keep the code as clear as possible and to minimase the introduction of bugs and side effects. This is achieved using pure functions and avoiding the use of flow-control statements such as `for`, `forEach`, `while`, etc.

### Javascript Methods

JavaScript provides multiple methods that allow functional programming. Some examples are:

- `Array.prototype.map()` <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map" target="_blank" rel="noreferrer">MDN</a>
- `Array.prototype.filter()` <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" target="_blank" rel="noreferrer">MDN</a>
- `String.prototype.slice()` <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" target="_blank" rel="noreferrer">MDN</a>

Let's have a look at each one in more details:

#### Map

The `map` array method allows you to iterate over an array and modify each element using a callback function.

```
const array = [3, 4, 5, 6];
const modifiedArray = arr.map(item => item * 3);

console.log(array); // [3, 4, 5, 6]
console.log(modifiedArray); // [9, 12, 15, 18]
```

As you can see, the `map()` method does not modify the original array but it returns a new one (`modifiedArray`). This behavior is compatible with the definition of pure function that we saw before.

#### Filter

The `filter()` method works in a similar way but it returns all the items that match the condition of the callback.

```
const array = [3, 4, 5, 6];
const evenNumbersArray = arr.filter(item => item x % 2 === 0);

console.log(array); // [3, 4, 5, 6]
console.log(evenNumbersArray); // [4, 6]
```

#### Slice

Let's look at one last method, this time a String method (just to show a similar behavior of a non-array prototype). The `slice()` method returns a new string that is a section of the original one.

```
const text = 'Hello world';

const truncatedText = text.slice(0, 5);

console.log(array); // 'Hello world'
console.log(truncatedText); // 'Hello'
```

There are several other methods in JavaScript that are compatible with the functional programming paradigm. Some other examples are `reduce()`, `concat()` and `assign()`.

### Functions

The fact that JavaScript provides us with such methods is nice. However, as developers we spend most of our time creating our own functions. To adhere at the functional programming paradigm, we're going to use a combination of **_pure functions_** and **_high-order functions_**.

#### Pure functions

A pure function is a function that it always returns the same result if the same input is provided and it has no side effects. With no side effect, I mean that the function is not changing other attributes of the code that are outside the function itself (for example a global variable).

```
const lessThanTenValue = 8;
const moreThanTenValue = 15;

const isMoreThanTen = (number) => number > 10 ? true : false;

console.log(isMoreThanTen(lessThanTenValue)) // false
console.log(isMoreThanTen(moreThanTenValue)) // true
console.log(lessThanTenValue) // 8
console.log(moreThanTenValue) // 15
```

#### High-order functions

A high-order function is a function that takes another function as an argument.

If we combine a high-order function with a pure function, we can write pretty much every algorithm in a functional-programming way.

```
const givenNumbers = [3, 4, 7];
const isMoreThanTen = (array) => {
  const sum = array.reduce((total, number) => total + number)
  return sum > 10 ? true : false
}
const createAlert = (result) => {
  if (result) {
    alert('Yes, it is more than 10')
  };
};

createAlert(isMoreThanTen(givenNumbers));
```

The code above looks quite convoluted. However, it has the benefit of splitting the logic in multiple pure functions that are easier to debug in case of issues.

It could also be beneficial if the we're we need to use some logic that is shared with the entire code base (maybe from a _util_ file). The util function could be passed as an argument of the function we're working on.

This is a bird's eye view of functional programming applied to JavaScript.

It's just one of the multiple paradigms you can use to write JavaScript code (another widely use is object-orientated programming) but it's one that is really useful to know if you're working with modern libraries like React. Maybe you're like me and you used it for a really long time, without knowing it 😅

Anyway, I hope this was helpful. If have been, thank you for reading 👋
