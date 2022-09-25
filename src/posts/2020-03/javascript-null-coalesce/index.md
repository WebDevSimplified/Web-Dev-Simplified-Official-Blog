---
title: "JavaScript Null Coalesce"
date: "2020-03-16"
description: "Null coalesce is a new JavaScript language feature which makes assigning default values for null/undefined incredibly easy."
tags: ['JavaScript']
---

In [last week's article](/2020-03/javascript-optional-chaining) I talked about optional chaining which is incredibly useful when trying to access methods and properties on potentially null objects. In this article I want to talk about another amazing JavaScript feature for handling null/undefined and that is the null coalesce operator. You are probably familiar with the logical or operator (`||`) for handling default values.
```js
const tries = options.tries || 10
```
This code is flawed, though, since if `options.tries` is 0 then the default value of 10 will be used since 0 is a falsey value. In order to fix this the following code must be used.
```js
const tries = options.tries == null ? 10 : options.tries
```
This code now will only use the default value if `option.tries` is null or undefined. The only problem is this code is pretty clunky to write, so that is why the null coalesce operator was created.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: v2tJ3nzXh8I?start=41`

## What Is The Null Coalesce Operator

The null coalesce operator is a new operator in JavaScript that works very similar to the logical or operator, but it will check for null/undefined instead of falsey.
```js
const tries = options.tries ?? 10
```
The above code uses the null coalesce operator (`??`) to check if `options.tries` is null or undefined. If `options.tries` is null or undefined then it will evaluate the right side of the operator which is 10 so 10 will be returned. Here are a few examples of the null coalesce operator being used to emphasize how it works.
```js
undefined ?? 10 // Result: 10
null ?? 10      // Result: 10
0 ?? 10         // Result: 0
false ?? 10     // Result: false
'Hi' ?? 10      // Result: Hi
20 ?? 10        // Result: 20
```
As you can see only the values of null or undefined will cause the right side of the null coalesce operator to be evaluated. Any other value, even if it is falsey, will cause the right side of the operator to never be evaluated or returned. Because of this, the null coalesce operator is incredibly useful when dealing with default values for variables since falsey values like 0 will not be overridden by the default value.

## Using The Null Coalesce Operator With Logical Or/And

It is possible to use the null coalesce operator with other logical operators like AND (`&&`) and OR (`||`), but parenthesis must be used in order to specify the order in which the logical operators evaluate.
```js
0 || null ?? 10   // Uncaught SyntaxError: Unexpected token '??'
(0 || null) ?? 10 // 10
```
In the above example when no parenthesis are used an error is thrown since JavaScript is not sure what order to evaluate the operators. In the second example, though, the value 10 is returned since first `0 || null` is evaluated which returns null and then `null ?? 10` is evaluated which returns 10.

## Browser Support

With all great new JavaScript features the biggest thing to worry about is browser support. Unfortunately, the null coalesce operator has very little support outside of the newest browsers. At the time of writing this article the null coalesce operator only has [48% support](https://caniuse.com/#search=null%20coalescing) across browsers. Luckily, though, you can still use this operator by using tools like [babel](https://babeljs.io/docs/en/babel-plugin-proposal-nullish-coalescing-operator) to transpile your JavaScript code so that older browsers can understand it.

**UPDATE (12/29/2021): The browser support for optional chaining is now over 90% and supported in nearly all major browsers.**

## Conclusion

The null coalesce operator is an amazing addition to JavaScript since handling null/undefined defaults is incredibly cumbersome. Unfortunately, since this is a new feature, most browsers still have not implemented this feature, but with the power of tools like babel this feature can be used right now without having to worry about browser support. I highly recommend using this operator in all your new projects that have babel since it will make writing clean JavaScript much easier.