---
title: What Are Magic Numbers And Why Are They Bad
date: "2020-02-10"
description: "A brief explanation of magic numbers in code and why they are bad."
---

Chances are you have probably never heard the term magic numbers, but I guarantee that you have dealt with magic numbers in your code. The best way to explain magic numbers is through a quick example.
```js
function convert(amount) {
  return amount * 1.61
}
```
The code above is a simple function that converts an amount by using `1.61` as the conversion factor, but it is unclear what `1.61` is representing. This is a magic number, because it is a number in code that does not have any obvious meaning. Instead the number just magically works.

In this example the number `1.61` represents how to convert miles to kilometers, but just by looking at the code this is impossible to discern. Luckily, this is a fairly simple problem to solve, so let's look at various methods to solve the magic number problem.

### 1. Comments

The first and easiest way to fix magic numbers is to just add a comment to the code denoting what the number is used for. Here is how we could improve the above code.
```js
function convert(amount) {
  return amount * 1.61 // Conversion from miles to kilometers
}
```
While technically the above solution works it is definitely not ideal. If this code ever changes or is used in other places the comment will be useless unless it is also updated and moved accordingly. This is why, in my opinion, comments are a solution to the magic number problem that should never be used.

### 2. Use Good Method/Variable Names

A much better way to improve the readability of magic numbers is by using good variable and methods names around the number so that the intent of the magic number is clear. Here is an example of doing that.
```js
function convertMilesToKilometers(miles) {
  return miles * 1.61
}
```
It is immediately clear that `1.61` is the conversion factor used to convert miles to kilometers, and this solution solves the magic number problem much better. There is however one additional way we can improve this solution which is by far my favorite way to fix magic numbers.

### 3. Extract Magic Numbers Into Variables

The best way to fix magic numbers is to move them into their own constant variables. This way the variable name of the magic number can describe exactly what the variable does.
```js
const MILES_TO_KILOMETERS_CONVERSION_FACTOR = 1.61
function convertMilesToKilometers(miles) {
  return miles * MILES_TO_KILOMETERS_CONVERSION_FACTOR
}
```
This code completely removes the magic number since the number is now assigned to a well-named variable. Something to note about this variable name is that it is in all caps with underscores between words. This is common practice when defining global constants like this. It makes it easier to read through code and know which variables are global constants and which variables are local values.

## What About Magic Strings?

Magic values do not only come in number form. Some of the most common types of magic values are magic strings. These can be a bit harder to detect though.
```js
document.querySelectorAll('[data-container]')
        .addEventListener('click', e => {
  e.target.classList.toggle('active')
})

document.querySelectorAll('[data-container-child]')
        .forEach(child => {
  const parent = child.closest('[data-container]')
  parent.classList.add('active')
})
```
The above code utilizes multiple magic strings, but this can be hard to detect since code like this is so common. The easiest magic string to spot is the duplication of the `[data-container]` selector. This selector can easily be moved into a variable to denote what exactly the selector is for. It also makes it easy to update the selector in the future without changing every instance in the code. Here is an updated version of the code that removes magic strings.

```js
const CONTAINER_SELECTOR = '[data-container]'
const CONTAINER_CHILD_SELECTOR = '[data-container-child]'
const ACTIVE_CLASS = 'active'

document.querySelectorAll(CONTAINER_SELECTOR)
        .addEventListener('click', e => {
  e.target.classList.toggle(ACTIVE_CLASS)
})

document.querySelectorAll(CONTAINER_CHILD_SELECTOR)
        .forEach(child => {
  const parent = child.closest(CONTAINER_SELECTOR)
  parent.classList.add(ACTIVE_CLASS)
})
```
It is now obvious in the code what each string is representing and more importantly which selectors are used in multiple places across the code. It may seem like this is a lot of extra work and code for little gain, but once you start implementing this system into larger projects it will become apparent how much easier it is to read code that uses variables instead of magic values.


## Conclusion

Magic values are a fairly simple concept to understand and implement, but the extra readability extracting magic values to variables gives your code is incredible. I highly recommend you start using variables to extract out magic values in your next project.

**PS: If you want to see a video of me refactoring and reviewing code to properly use constants to store magic numbers you can find that [here](https://youtu.be/UphEnjnoxSg).**