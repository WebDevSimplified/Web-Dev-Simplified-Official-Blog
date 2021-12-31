---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "Enhanced Object Literals"
date: "2021-02-08"
description: "Creating objects in JavaScript is something you do all the time so you should know about these enhancements that make creating objects even easier."
tags: ['JavaScript']
---

JavaScript introduced a ton of new concepts with ES6, but one feature that is often overlooked is the enhancements to object literals. With these enhancements you can write code to create objects that is easier to read and more concise. In this article I will talk about all the enhancements made to object literals.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: v2tJ3nzXh8I?start=765`

## Key Shorthand

How many times have you written code like this.
```js
const name = 'Kyle'
const age = 25

const person = {
  name: name,
  age: age
}
```
In the above example we are creating a person object with a name and age property and we are assigning the age and name property to the variables `age` and `name`. It is very common to set object keys that have the same name as the variable you are using to assign the value so JavaScript added the following shorthand syntax.
```js
const name = 'Kyle'
const age = 25

const person = {
  name,
  age
}
```
The above code is the same as the previous example but we are taking advantage of this shorthand syntax to automatically assign the value of the `name` variable to the name key on the object. This comes in handy when you have long objects created from various properties.

## Function Shorthand

JavaScript also added the ability to shorten function definitions as well. Normally you would need to write code like the following.
```js
const person = {
  sayHi: function() {
    console.log('Hi')
  }
}
```
With the new function shorthand syntax you can write the same code as follows.
```js
const person = {
  sayHi() {
    console.log('Hi')
  }
}
```
As you can see we just removed the function keyword and wrote the function in the object very similarly to as if we were writing a function on a class. This is nice since it is more clear that this code is for a function and is overall easier to write.

## Computed Property Names

The final and most important addition in my opinion is computed property names. With computed property names, you can use variables to define the object keys when creating an object.
```js
const dynamicKey = 'name'
const index = 1

const person = {
  [dynamicKey]: 'Kyle',
  ['age' + index]: 25
}
```
In the above code you can see that we wrapped the computed property names in square brackets and put some JavaScript code in there which will be converted to a string and then used as the property name. In our case this creates the following object.
```json
{
  "name": "Kyle",
  "age1": 25
}
```
In order to do this before these changes you would have had to create the entire object first and then add the dynamic keys.
```js
const dynamicKey = 'name'
const index = 1

const person = {}
person[dynamicKey] = 'Kyle'
person['age' + index] = 25
```

## Conclusion

Overall, these changes are pretty minor, but they do make creating objects a bit easier which in turn makes the code you write easier to read.