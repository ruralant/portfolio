---
title: How to clone an object in JavaScript
slug: javascript-clone-objects
subtitle: Shallow copy vs deep copy. A comparison of the different ways to clone an object in JavaScript
category: javascript
tags: [javascript]
published: true
date: 2023-04-16
layout: development
type: development
---

<script>
  import Image from '$lib/components/Image.svelte';
  import mainImage from '$lib/assets/images/blog/clone.jpg?w=1000&h=600';
  import mainImageWebP from '$lib/assets/images/blog/clone.jpg?w=1000&h=600&format=webp&srcset';
  import mainImageSrcset from '$lib/assets/images/blog/clone.jpg?w=1000&h=600&srcset';
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

Cloning an object in JavaScript is a common task that developers encounter while working with complex data structures. Cloning an object refers to creating a new object with the same properties and values as the original object.

There are different ways to clone an object in JavaScript, and each method has its own advantages and disadvantages. In this article, we will explore the concepts of **shallow copy** and **deep copy** and how they are implemented in JavaScript.

### Shallow Copy

A shallow copy of an object creates a new object with the same _property references_ as the original object. In other words, if the original object has properties that are objects themselves, the new object will have references to the same objects as the original object. The `Object.assign()` method in JavaScript is a common way to create a shallow copy of an object.

Example of Shallow Copy:

```javascript
const originalObject = {
  name: "John",
  age: 30,
  address: {
    city: "Reading",
    country: "UK"
  }
};

const copiedObject1 = Object.assign({}, originalObject);
const copiedObject2 = Object.assign({}, originalObject);

console.log(copiedObject1);
// {
//   name: 'John',
//   age: 30,
//   address: {
//     city: 'Reading',
//     country: 'UK'
//   }
// }

console.log(copiedObject2);
// {
//   name: 'John',
//   age: 30,
//   address: {
//     city: 'Reading',
//     country: 'UK'
//   }
// }

// modify the new objects
copiedObject1.age = 31;
copiedObject2.age = 32;
copiedObject1.address.city = "Cambridge";

console.log(originalObject);
// {
//   name: 'John',
//   age: 30,
//   address: {
//     city: 'Cambridge',
//     country: 'UK'
//   }
// }

console.log(copiedObject1);
// {
//   name: 'John',
//   age: 31,
//   address: {
//     city: 'Cambridge',
//     country: 'UK'
//   }
// }

console.log(copiedObject2);
// {
//   name: 'John',
//   age: 32,
//   address: {
//     city: 'Cambridge',
//     country: 'UK'
//   }
// }
```

In the above example, we created two shallow copies of the `originalObject` using the `Object.assign()` method.

First, we updated the `age` property of the `copiedObject1` to 31. Next, we updated the `age` property of the `copiedObject2` to 32. When we console.log the three objects, we can see that the `age` property of the `originalObject` is still 30. However, the `age` property of the `copiedObject1` is 31, and the `age` property of the `copiedObject2` is 32. This is because the `Object.assign()` method creates a shallow copy of the original object.

Next, we modified the `address.city` property of the `copiedObject1`. When we console.log the three objects, we can see that the `address.city` property of the `copiedObject1` is now "Cambridge". However, the `address.city` property of the `originalObject` and `copiedObject2` is also "Cambridge". This is because the `Object.assign()` method creates a shallow copy of the original object, and the `address` property of the original object is an object itself. Therefore, the `address` property of the `originalObject` and the `copiedObject2` are references to the same object as the `address` property of the `copiedObject1`.

By the way, we can achieve the same result using the spread operator:

```javascript
const originalObject = {
  name: "John",
  age: 30,
  address: {
    city: "Reading",
    country: "UK"
  }
};
const copiedObject = { ...originalObject };

console.log(copiedObject);
// {
//   name: 'John',
//   age: 30,
//   address: {
//     city: 'Reading',
//     country: 'UK'
//   }
// }
```

### Deep Copy

A deep copy of an object creates a new object with the same property values as the original object, but with new references to any objects within the original object. In other words, a deep copy creates a completely new object that is independent of the original object. One way to create a deep copy of an object in JavaScript is by using recursion and the spread operator.

Example of Deep Copy:

```javascript
function deepCopy(originalObject) {
  let copiedObject = {};

  for (let key in originalObject) {
    if (typeof originalObject[key] === "object") {
      copiedObject[key] = deepCopy(originalObject[key]);
    } else {
      copiedObject[key] = originalObject[key];
    }
  }

  return copiedObject;
}

const originalObject = {
  name: "John",
  age: 30,
  address: {
    city: "Reading",
    state: "UK"
  }
};

const copiedObject1 = deepCopy(originalObject);
const copiedObject2 = deepCopy(originalObject);

console.log(copiedObject1);
// {
//   name: 'John',
//   age: 30,
//   address: {
//     city: 'Reading',
//     state: 'UK'
//   }
// }

console.log(copiedObject2);
// {
//   name: 'John',
//   age: 30,
//   address: {
//     city: 'Reading',
//     state: 'UK'
//   }

// modify the new objects
copiedObject1.age = 31;
copiedObject2.age = 32;
copiedObject1.address.city = "Cambridge";
copiedObject1.address.city = "London";

console.log(originalObject);
// {
//   name: 'John',
//   age: 30,
//   address: {
//     city: 'Reading',
//     state: 'UK'
//   }
// }

console.log(copiedObject1);
// {
//   name: 'John',
//   age: 31,
//   address: {
//     city: 'Cambridge',
//     state: 'UK'
//   }
// }

console.log(copiedObject2);
// {
//   name: 'John',
//   age: 32,
//   address: {
//     city: 'London',
//     state: 'UK'
//   }
// }
```

In the above example, we created two deep copies of the `originalObject` using the `deepCopy()` function. The function uses recursion to create a new object with new references to any objects within the original object. We updated the `age` property of the `copiedObject1` to 31. Next, we updated the `age` property of the `copiedObject2` to 32. When we console.log the three objects, we can see that the `age` property of the `originalObject` is still 30 and the same property of the `copiedObject1` is 31, and for `copiedObject2` is 32. Everything is as expected.

However, when we modified the `address.city` property of the `copiedObject1` to "Cambridge", we can see that the `address.city` property of the `originalObject` is still "Reading". This is because the `deepCopy()` function created a new object with new references to any objects within the original object. Therefore, the `address` property of the `originalObject` is a reference to a different object than the `address` property of the `copiedObject1` and `copiedObject2`.

Same as for the shallow copy, there are other ways to create a deep copy of an object in JavaScript. One of the most common ways is by using the `JSON.parse()` and `JSON.stringify()` methods.

```javascript
const originalObject = {
  name: "John",
  age: 30,
  address: {
    city: "Reading",
    state: "UK"
  }
};

const copiedObject = JSON.parse(JSON.stringify(originalObject));

console.log(copiedObject);
// {
//   name: 'John',
//   age: 30,
//   address: {
//     city: 'Reading',
//     state: 'UK'
//   }
// }
```

### Conclusion

In conclusion, we learned about the concepts of shallow copy and deep copy and how they are implemented in JavaScript. We also learned about the `Object.assign()` method and the `spread operator`, which are common ways to create a shallow copy of an object. We also learned about the `JSON.parse()` and `JSON.stringify()` methods, which are common ways to create a deep copy of an object.

Until the next time, keep on coding!
