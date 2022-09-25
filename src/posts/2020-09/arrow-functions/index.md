---
title: "(Arrow Functions) => Explained"
date: "2020-09-14"
description: "Arrow functions are one of the best features added to JavaScript and in this article I will explain everything you need to know about them."
tags: ['JavaScript']
---

Arrow functions at first glance seem useless. They seem to just be another way to create a function, but with more confusing syntax. While it is correct that arrow functions offer a different syntax for creating functions they also fundamentally change how a function is scoped which is the primary reason arrow functions are so useful.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: h33Srr5J9nY`

## How To Create Arrow Functions?

Before we can dive into why this scoping change in arrow functions is so useful we first need to discuss how to define an arrow function. Let's take the function below and redefine it as an arrow function.
```js
function sum(a, b) {
  return a + b
}
```
The first step to creating an arrow function is to remove the function keyword from the function declaration and instead create a variable with the function name.
```js
const sum = 
```
Next you need to take all the parameters in the parenthesis and put them after the equals sign.
```js
const sum = (a, b)
```
Finally, all that is left is to put an arrow `=>` after the parameters and move the function body directly after that.
```js
const sum = (a, b) => {
  return a + b
}
```
We have now converted `sum` to an arrow function. This may not seem that useful since it just looks more confusing to work with, but there are a few things you can do with arrow functions that make the syntax preferable.

### Single Parameter Arrow Functions

One nice feature of arrow functions is if you only have one parameter in the function you can leave out the parenthesis around the parameters.
```js
function isPositive(number) {
  return number >= 0
}
```
```js
const isPositive = number => {
  return number >= 0
}
```

### Implicit Return

Another really nice feature of arrow functions is that they support implicit return. This means if you only have one line in your function which is returning something you can put it on one line without the return statement.
```js
function randomNumber() {
  return Math.random()
}
```
```js
const randomNumber = () => Math.random()
```
As you can see the `Math.random()` code is on the same line as the function declaration and this means that the result of `Math.random()` is automatically returned from the function. You also may notice that since `randomNumber` has no parameters an empty set of parenthesis is used to denote the fact there are no parameters.

### Anonymous Arrow Functions

My favorite way to use arrow functions is with anonymous functions since you can leave out the entire name and variable declaration of the function. This makes anonymous functions much cleaner.
```js
document.addEventListener('click', function() {
  console.log('Click')
})
```
```js
document.addEventListener('click', () => {
  console.log('Click')
})
```

## Arrow Function Scoping

Now we can talk about the real power of arrow functions which is how they handle scoping of the `this` keyword. In a normal function the `this` keyword is scoped based on the context of where the function is called. Arrow functions on the other hand scope the `this` keyword based on where the function is defined which works more like other programming languages. Here is a quick example.
```js
class Person {
  constructor(name) {
    this.name = name
  }

  printNameArrow() {
    setTimeout(() => {
      console.log(`Arrow: ${this.name}`)
    }, 100)
  }

  printNameFunction() {
    setTimeout(function() {
      console.log(`Function: ${this.name}`)
    }, 100)
  }
}

const person = new Person('Kyle')
person.printNameArrow()
// Arrow: Kyle
person.printNameFunction()
// Function: 
```
In the above example there are two functions. Both functions print `this.name` inside of a `setTimeout`, but one function uses an arrow function and the other uses a traditional function. Normal function use the `this` value from where the function is called and not where it is defined. The arrow function on the other-hand defines `this` as the currently scoped `this` where the arrow function is defined.

This behavior is what makes arrow functions so useful since in almost all cases it makes more sense to have `this` be defined based on where the function is created instead of based on where it is called.

## Conclusion

While at first glance arrow functions may seem just like syntactical sugar they are actually much deeper. With the ability to define `this` in a way that makes sense while also adding the ability to create shorter function definitions, arrow functions have become my go to for creating any new function.