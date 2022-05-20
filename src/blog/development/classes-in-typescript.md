---
title: Classes in Typescript - Intro
slug: classes-in-typescript
subtitle: An introduction to classes in TypeScript
category: programming
tags: [typescript]
mainImage: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageWebP: https://res.cloudinary.com/antonio-rossi/image/upload/w_1000,fl_progressive,f_webp/v1648646194/articles/functional-programming/pure_zyijgf.jpg
mainImageAlt: An image of pure water with wite sand
mainImageThumb: https://res.cloudinary.com/antonio-rossi/image/upload/w_300,fl_progressive/v1648646194/articles/functional-programming/pure_zyijgf.jpg
published: false
date: 2022-04-12
layout: development
type: development
---

Classes in TypeScrip are extend the ES6 functionality by adding TypeScript specific features like type annotation (see here for more about types), access modifiers and the ability to specify required or oprional parameters.

Another benefit of using TypeScript is that you can use it to develop with classes and then compile to JavaScript that works across all the major browsers and platforms.

In JavaScript classes are one for the multiple ways to define the shape of an object, in addition to describing objects types with interfaces and functions.

Think of a class as a blueprint of a building object, like a car. A Car class describes the attributes of a car, for example, the manufacturer, the color, the number of doors. Also describe the actions that a car can perform, like accelerating, breaking and turning.

But `Car` class is just a plan for building a car. You must build an instance of a Car from the Car class before it becomes an object that you can assign property to or calling its behaviors (like turning).

The car class can be reused to create any number of new Car objects, each with their own charateristics. You can also extend the Car class. FOr example an `ElectricCar` class might extend Car. It will have the same attributes and behaviors bur can also have its own unique attributes and behaviors, like range or charging action.

Another important concept is **encapsulations**. Data and actions are included in the class but the details of both can he hidden form the person that is working with the object in code. For example, if you call the `turn` method of a Car, you don't need to know exacly how the steering wheel is working, you just need to know that the car will turn left or right the you tell it to do so.

The class servers as a black box where all the attributes and behaviors aee only exposed throgh the properties and methods, limiting what a developer can do with it.

A class is composed by:

- **properties**: also referred as fields are the data (or attrinutes) if the object. These are the defining characteristics if the object that you can set or return from your code.
- **constuctor**: is a special function used create and initiate objects based on a class. When you create a new instance of the class, the constructor creates a new object with the class shape and initiates it with the values passed to it.
- **accessors**: are a type of function that you use to `get` or `set` the value of properies. Properties can be read-only by simply omitting the `set` accessor in the class, or inacessible my omitting the `get` accessor.
- **methods**: are functions that define the behavior or actions that the object can do. Ypu can call these methods to invoke the behavior of the object. You can also define methods that are only accessible from within the class itself and are tipically called by the other methods in the class to perform a task.

### Create a class

To create a class, define its members listed above.

#### Declare the properties

You can think at the properties of a class as rthe raw data that is passed to the object when it's initialised.

The property of the Car class are those that apply to any class, regardless from the specific make or model (color, number of door). And thanks to TypeScript, you can also apply type attributes to the properties.

```
class Car {
  _manufacturer: string;
  _color: string;
  _doors: number;
}
```

#### Declare the contructor

Classes creates two separate types:

- **instance type**: which defines what members of an instance of a class has (if you need to read read it a couple of times, it's normal, do not worry :D)
- **constructor function type** (or **static side**) : which defines what members of the class construction funtion has.

Every class can contain only one contructor declaration. If no declaration is provided, an automatic one is created.

The construtor initialise the properties of the class ans has three parts:

- **constructor** keyword
- **list of parameters**: which defines the parameters that will be passewd to the new object when a new instance is created.
  Things to remember:
  - it isn't required to define a parameter for every property of the class.
  - the parameters can be required of optional , have default values, etc.
  - the parameters can be different from the property names (but be mindfull of intellisense).
- **property assignment**: each statement assign the value of a parameter to the value of the property. To indicate that you are accessing a member of the class, apply the `this.` keyword.

Going back to the class we created earlier:

```
constructor(make: string, color: string, doors = 4) {
    this._make = make;
    this._color = color;
    this._doors = doors;
}
```

#### Define accessors

All the class properties, if not specified otherwise, are `public` by default and they can be accessed directly.

However, TypeScript supports getter and setters as a way to intercepting access to a property. This gives you control ver how a member is accessed on each object.

For example:

```
get color() {
    return 'The color of the car is ' + this._color;
}
set color(color) {
    this._color = color;
}

get doors() {
    return this._doors;
}
set doors(doors) {
    if ((doors % 2) === 0) {
        this._doors = doors;
    } else {
        throw new Error('Doors must be an even number');
    }
}
```

As you can see, both the get and set accessors can manipulate the class properties when required.

#### Define class methods

Any TypeScript finction can ve defined within a class and they can be called as a method or from another function within the class.

```
// Methods
accelerate(speed: number): string {
    return `${this.worker()} is accelerating to ${speed} MPH.`
}
brake(): string {
    return `${this.worker()} is braking with the standard braking system.`
}
turn(direction: 'left' | 'right'): string {
    return `${this.worker()} is turning ${direction}`;
}
// This function performs work for the other method functions
worker(): string {
    return this._make;
}
```

### In summary
