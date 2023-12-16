---
layout: "@layouts/BlogPost.astro"
title: "NaN - Not A Problem"
date: "2020-10-05"
description: "Everything you need to know about NaN in JavaScript."
tags: ["JavaScript"]
---

If you have you ever written a program that parses the value of a number input by using `parseInt` or `parseFloat`, then you have run into the infamous `NaN` value. This value is really weird and behaves differently than pretty much any other value in JavaScript, so in this article I will breakdown all the weirdness around `NaN`.

## What Is NaN?

`NaN` stands for Not-A-Number and is JavaScript's way of representing the result of an operation that should return a number but cannot since there is no real number to represent it. This may sound really confusing, so let's look at a simple example.

```js
parseInt("")
parseFloat("Some String")
```

Both of the above function calls will return `NaN` since a string without numbers cannot be converted to any meaningful number. Most other programming languages would throw an error in this case, but JavaScript simply returns `NaN`.

Some other ways that `NaN` is returned are as follows.

1. Math that cannot return a real number
   - `Math.sqrt(-1)`
2. Any math that involves a string (besides `+` since that will concatenate strings)
   - `"string" * 7`
3. Any operation that has `NaN` in it
   - `NaN * 3`

## How To Check For NaN

By far the most complicated thing about `NaN` is how you check for `NaN`. If you want to check to see if a value is `NaN` your first thought would be to do the following.

```js
NaN == NaN
// or
NaN === NaN
```

Unfortunately, this does not work since these equality checks will return `false`. This is because `NaN` will always return false when compared to any other value, even another `NaN`.

This is where the biggest confusion with `NaN` comes about. Instead of using a normal equality check you need to use the function `isNaN` to check if a variable is `NaN`.

```js
isNaN(variable)
```

This function will properly return `true`, or `false` depending on if `variable` is `NaN` or not.

## Type Coercion Shenanigans

If this wasn't already confusing enough, there is a second form of the `isNaN` function called `Number.isNaN`. These functions work nearly identically to each other, but they handle type coercion differently.

The normal `isNaN` function will return true if the variable passed to it is `NaN` or if the variable will be `NaN` after it is coerced into a number. This means that `isNaN("string")` and `isNaN(NaN)` will both return true.

`Number.isNaN` on the other hand does not do any coercion and will only return true if the value passed to it is `NaN`. This means that `Number.isNaN("string")` will return false, while `Number.isNaN(NaN)` will return true.

## Conclusion

Overall `NaN` is fairly confusing since it is never equal to anything. This makes for some tricky bugs to track down if you are not aware of how `NaN` is handled. If you ever need to check for `NaN` make sure to use the `isNaN` function instead.
