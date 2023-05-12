---
layout: "@layouts/BlogPost.astro"
title: "Stop Using Double Equals In JavaScript"
date: "2020-08-03"
description: "Everything you need to know about the difference between double and triple equals in JavaScript."
tags: ["JavaScript"]
---

Unlike many other programming languages JavaScript has both a double equals `==` and triple equals `===` comparison operator. At first glance they seem to do nearly the exact same thing, but there is one major difference between the two that makes triple equals almost always better.

_If you prefer to learn visually, check out the video version of this article._
`youtube: C5ZVC4HHgIg`

## What Makes Them Different

Both double and triple equals will check the equality of two values and return true or false depending on if they are equal or not, but the way they perform that equality check is slightly different. With double equals, JavaScript will convert the types of the two values to be exactly the same before doing an equality check. This means that if you have the following code `1 == '1'` then JavaScript will convert the string `'1'` into a number so that the equality check is comparing two numbers. This would result in the previous code returning true since the number one is equal to the string one after it is converted into a number.

With triple equals this conversion of types does not occur. That means that if we use the same code as before but with a triple equals comparison we will get false `1 === '1'`. This is because the string `'1'` is not converted into a number and thus when the equality of the number one is compared to the string one it returns false since a string is never equal to a number.

## Why Is This Important

It may seem like double equals is the preferred method for equality checks since it does the type conversion for you and more than likely when you are comparing `1` and `'1'` you meant for them both to be numbers. In practice, though, this is actually a terrible idea.

The problem is that this could lead to many false positives. For example take the following code.

```js
0 == ""
```

Obviously, the number zero is not equal to an empty string so we would expect this to return false, but it actually returns true. This is because JavaScript is trying to convert the empty string to a number and converts it to the number zero. This can lead to a ton of potential problems. For example, assume you have a number input element that the user types into and you want to check to see if they type in zero. If you use the previous code for that check it would return true whenever they type in 0 and also whenever the input is blank which is not ideal. This can all be avoided with triple equals, though, since anytime the types of the values differ triple equals will return false.

## When To Use Double Equals

So it sounds like double equals is terrible and should never be used due to possible false positives, but there is one case in particular that I find double equals to be incredibly useful. That situation is when you need to check for null/undefined values. If you compare null and undefined with doubles equals it will return true, but with triple equals it will return false.

```js
null == undefined // true
null === undefined // false
```

Many times when I am trying to check a variable to see if it is null I also want to check to see if it is undefined at the same time. Because of this, I almost always use double equals to compare against null/undefined since it will return true if my value is null or undefined.

```js
x == null // True if x is null or undefined
x === null // Only true is x is null
```

## Conclusion

In 99% of all cases you should use triple equals comparison when comparing two values to avoid false positives, but if you are attempting to check if a vales is null/undefined then using double equals is the preferred method.
