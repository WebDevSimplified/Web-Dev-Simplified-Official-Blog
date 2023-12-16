---
layout: "@layouts/BlogPost.astro"
title: "What Are Pure Functions?"
date: "2020-09-28"
description: "A quick explanation on what pure functions are and how to use them."
tags: ["Technical Discussion", "JavaScript"]
---

As you become more experienced as a programmer you may notice that writing clean code is very difficult. In order to make writing clean code easier it is best to use tools and patterns that do the hard work for you. One of these patterns is called pure functions and they are a great tool for cleaning up your code and improving your tests.

_If you prefer to learn visually, check out the video version of this article._
`youtube: fYbhD_KMCOg`

## What Makes A Function Pure?

Obviously the first place we need to start with is what pure functions are. In essence a pure function is a function that works exactly the same as a math equation and is derived from the idea of functional programming. It may sound crazy to think of a programming function in the same way as a math equation, but let me show you an example to break this down further.

Imagine the following math equation

```
(3a + b - 3) * 8a = y
```

This math equation has two input variables `a` and `b` and if we know both those variables we can get the output of the equation, `y`. In order to make this assumption this equation has to follow a few rules.

1. The equation relies only on the inputs `a` and `b` to get the output `y`.
2. The equation has no impact on any other equations.
   - Essentially, the equation can be replaced by the output, `y`, and nothing will change.
3. The equation will have the same output, `y`, given the same inputs `a` and `b`.

These rules are the fundamental foundation of how pure functions work. Pure functions follow the following set of rules.

1. A pure function does not use any external data to obtain the return value.
   - In other words a pure function uses only the inputs of the function to get the return value.
2. A pure function has no side effects.
   - This means when you run a pure function it does not change anything outside the function.
3. A pure function will give the same output every time as long as the inputs remain the same.

In order to understand these rules further let's look at some examples.

### No External Data

The most common way functions break the rules of pure functions is by using external data. This can be as simple as using a global variable inside the function or as obscure as using external function dependencies. Let's take a look at a simple function that is not pure.

```js
const TAX_RATE = 0.07

function calculateTax(price) {
  return price * TAX_RATE
}
```

At first glance this function may seem fine, but it is an impure function. The reason for this is it depends on the variable `TAX_RATE` that is defined outside the function `calculateTax`. If this variable were to ever change due to future code changes then this function's output would no longer be the same as it used to be even if it was given the same input. The easiest way to fix this would be to just pass the `TAX_RATE` into the function.

```js
const TAX_RATE = 0.07

function calculateTax(price, taxRate) {
  return price * taxRate
}
```

This is a now a pure function since even if the `TAX_RATE` variable changes the function's output is still always the same given the same inputs.

### No Side Effects

This is another common cause of impure functions. A side effect is any code in a function that changes something outside the function. This could be as simple as changing a global variable or as convoluted as calling an API within a function.

Here is an example of an impure function that has side effects

```js
const array = [1, 2, 3]

function addElement(arr, element) {
  arr.push(element)
  return arr
}
```

This function at first glance looks to be pure since it only relies on its input values to create the output, and given the same input values it will always return the same output value, but it is in fact impure. The reason for this is that the `array` variable, which is external to this function, is changed when the `addElement` function is called. By using the `push` method we are adding the `element` variable to the end of the `array` variable outside the function, thus causing a side effect. The easy way to fix this is to create a clone of the array before adding the element.

```js
const array = [1, 2, 3]

function addElement(arr, element) {
  return [...arr, element]
}
```

This is now a pure function since the external `array` variable is unchanged.

### Same Output With Same Inputs

The final rule of pure functions is that they will give the same output given the same inputs. Luckily, if you follow the above two rules this rule is pretty much automatically followed. The only way to break this rule would be to rely on randomness in a function.

```js
function randomNumber(n) {
  return Math.random() * n
}
```

This function cannot be a pure function since it will give a different output every time it is called even with the same input.

## Why Are Pure Functions Useful?

As you can see, creating a pure function is not always easy. We cannot talk to an API, use global variables, or even use any randomness, so how could they be useful.

The biggest way I see pure functions being useful is that they are incredibly easy to understand when you are reading code. If you see a pure function you can essentially ignore it since you know that the function will not change anything outside it and will always return the same output given the same inputs. This makes reading code much easier.

On top of that pure functions are incredibly easy to test. Since they do not use any outside information and never change anything outside their scope, they can be tested with unit tests without needing to do any fancy mocking. This is one of my favorite benefits and something that becomes more and more useful as your codebase grows. You also do not need to update these tests unless the actual function itself is changed.

Lastly, pure functions are useful since they can be run in parallel with ease. Since these functions only rely on their inputs and do not change anything outside them they can be run in parallel with no worries of them interacting with any shared resources. This is great for creating performant applications.

## Conclusion

Pure functions are incredibly restrictive, but that restrictive nature is what makes them so useful. I try to write as many pure functions as I can so and only write impure functions when I need to. This makes writing tests, and modifying code in the future much easier.
