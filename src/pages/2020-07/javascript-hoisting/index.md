---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "What The Heck Is Hoisting?"
date: "2020-07-13"
description: "You have probably heard of hoisting but what exactly is it and how does it work."
tags: ['JavaScript']
---

Hoisting. It is the word everyone throws around when talking about JavaScript, yet no one takes the time to actually explain what hoisting is, how it works, and why it is important. In this article I will be explaining everything you need to know about hoisting so next time someone mentions it you can understand exactly what they mean.

## What Is Hoisting?

Obviously the first place we need to start with is what the heck hoisting even is. In simple terms hoisting is the mechanism that allows you to define a function at the bottom of your file yet still use it at the top of the file before it is defined.
```js
log('hello')

function log(text) {
  console.log(text)
}
```
As you can see in the above example the function log is defined after it is used, yet no errors are thrown. This is thanks to JavaScript taking that function and essentially moving it to the top of the file for you. While technically, this is not exactly what happens, for all intensive purposes you can think of hoisting as JavaScript moving something to the top of the file.

Behind the scenes what is actually happening is that when the browser is compiling your JavaScript code it will put your function into memory before running the code which means it will be available as if it was defined at the start of your file.

Most likely you have run into this behavior before without even realizing that hoisting was the reason behind it. There are a few gotchas to worry about with hoisting, though.

## The Tricky Parts Of Hoisting

So we have already determined that hoisting will move your functions to the top of the file, but what about arrow functions?
```js
log('hello')

const log = (text) => {
  console.log(text)
}
```
The above code will throw an error since arrow functions are not hoisted. The reason for this is actually pretty simple. JavaScript does not hoist const/let variables and since an arrow function must be defined as a variable it will not be hoisted to the top of your file.

This is actually one of the major reasons I use normal functions instead of arrow functions in certain situations. I generally like to have my helper functions defined at the end of my file since they are not very important to look at. This means I define them as normal functions so that the most important part of my code can be at the top of the file and the functions can be at the bottom of the file.

If you have some familiarity with hoisting you may know that variables defined with the var keyword are actually hoisted. You may think you can combine that with an arrow function to hoist your arrow function, but it does not quite work that way. *Besides you probably shouldn't be using var anyway. I have an entire blog article you can read [here](/2020-01/var-vs-let-vs-const) on why var is worse than let/const.*
```js
log('hello')

var log = (text) => {
  console.log(text)
}
```
This will again throw an error since while variables defined with var are hoisted the values of those variables are not. Essentially with hoisting the compiled code looks a bit more like this.
```js
let log = undefined

log('hello')

log = (text) => {
  console.log(text)
}
```
This is easier to see in the following example.
```js
console.log(a)
// undefined

var a = 10

console.log(a)
// 10
```
As you can see there are no errors thrown, but the first log statement prints `undefined` while the second log statement prints `10`. The value of the variable `a` is not hoisted. Only the variable itself is hoisted.


## Conclusion

Hoisting is one of those JavaScript concepts that is becoming less and less prevalent as var and normal functions become less used, but understanding how hoisting works is incredibly important since it can be a powerful tool for code organization when defining functions.