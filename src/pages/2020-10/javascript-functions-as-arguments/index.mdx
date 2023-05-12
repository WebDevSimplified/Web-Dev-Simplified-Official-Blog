---
layout: "@layouts/BlogPost.astro"
title: "Every Beginner Is Confused By This"
date: "2020-10-26"
description: "How passing functions to other functions works in JavaScript."
tags: ["JavaScript"]
---

By far the most confusing concept for beginner and even intermediate JavaScript developers is how to pass functions to other functions since there seem to be so many different ways to do it and they all work slightly differently. In this article I will breakdown exactly how passing functions to other functions works in JavaScript.

_If you prefer to learn visually, check out the video version of this article._
`youtube: 7UMuJMiNjSk`

## A Function Is A Variable

Before we can talk about passing functions to other functions we first need to realize that a function is really just a fancy variable.

```js
function printName(name) {
  console.log(name)
}
```

The above code creates a function named `printName`. You may think of this as different than creating a variable since the syntax is different, but in reality a function is just a fancy variable that you can interact with just like any other variable. The only difference is functions can also be called using parenthesis `printName('Name')`.

This means that a function can be thought of in two ways.

The first way is the way you normally think of functions which is when you call them. By using parenthesis to call a function you are invoking that function and executing the code inside the function definition. This is very common so you are most likely familiar with that.

The second way to think of a function is to think of it as a simple variable that contains the function definition. This is what happens when you reference a function without parenthesis. You are just referencing the variable that stores the function.

Try logging out a function like this.

```js
console.log(printName)
```

You will notice that in the console it will show you the function definition since that is what the `printName` variable is storing. One way to think of this is to think of how an array variable works.

```js
const a = ["a", "b", "c"]
```

The variable `a` contains all the array. This is essentially the definition of your array just like a function variable contains the definition of a function. When you access an array element with brackets `a[0]` you are getting an individual element from the definition of the array just like using parenthesis with a function `printName('Name')` invokes a function.

## Passing Functions To Other Functions

Now that we understand that a function is just a variable it is time to look at how passing functions to other functions works. Let's use `setTimeout` for our examples.

```js
setTimeout(() => {
  console.log("Hi")
}, 1000)
```

```js
function printHi() {
  console.log("Hi")
}

setTimeout(printHi, 1000)
```

```js
function printHiClosure() {
  return () => console.log("Hi")
}

setTimeout(printHiClosure(), 1000)
```

All three of the above sets of code are equivalent, but they obviously all look different. Let's start with the first example since this is the one you are probably most familiar with.

In this example we are passing a function inline to the `setTimeout` function. You may never have thought of how this really works, but let's take a look at how this works inside of `setTimeout`.

```js
function setTimeout(callback, waitTime) {
  wait(waitTime)
  callback()
}
```

This is a simplified version of `setTimeout` where we are taking in a `callback` and a `waitTime` and then we are waiting for the `waitTime` before invoking the `callback`.

Now let's think about what happens when we call a function. Each value we pass to a function is mapped to the parameters in the function.

```js
setTimeout(() => {
  console.log("Hi")
}, 1000)
```

In the above example we are mapping `() => console.log('Hi')` to the `callback` parameter and `1000` is being mapped to the `waitTime` variable. If we were to write what this looks like in code it would look like this.

```js
const callback = () => {
  console.log("Hi")
}
const waitTime = 1000

wait(waitTime)
callback()
```

If you look at this code it is hopefully immediately apparent that we are calling the `callback` after waiting a specified time. Now that we understand how this works in the simplest case lets look at some of the other cases.

```js
function printHi() {
  console.log("Hi")
}

setTimeout(printHi, 1000)
```

If we flatten this out we would get the following code.

```js
function printHi() {
  console.log("Hi")
}

const callback = printHi
const waitTime = 1000

wait(waitTime)
callback()
```

This may look a little confusing since you aren't used to a function being set to another variable, but remember functions are just variables. We are taking the `printHi` variable and creating a new `callback` variable with the same value. Since a function variable is just the definition of a function all we are doing is setting `callback` to have the same function definition as `printHi` which means this above code does the same thing as our previous example.

Now let's move onto the final more confusing example.

```js
function printHiClosure() {
  return () => console.log("Hi")
}

setTimeout(printHiClosure(), 1000)
```

Here we are calling the `printHiClosure` function which means we are passing the result of the function to `setTimeout`. This would look like this.

```js
function printHiClosure() {
  return () => console.log("Hi")
}

const callback = printHiClosure()
const waitTime = 1000

wait(waitTime)
callback()
```

Now what is happening is we are calling `printHiClosure` and whatever it returns, which in our case is a function that prints Hi, is going to be used as the callback for the `setTimeout`. Since `printHiClosure` just returns a function we are essentially just setting our `callback` to that function which is returned from `printHiClosure`. This again leads to the same result as our previous two examples.

## Main Takeaway

The most important thing to realize when working with functions is that it doesn't matter whether you pass an inline function, a function variable, or the return of a function to another function. The only thing that matters is what the actual argument is being set to for the function.

In the above examples we used three different techniques to pass a function to another function, but in each example we ended up setting the `callback` argument to the exact same function.

## Conclusion

Functions may seem confusing, but in reality they are just fancy variables. If you think about them in the same way that you think about all other variables it makes them so much easier to work with.
