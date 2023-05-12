---
layout: "@layouts/BlogPost.astro"
title: "Complete Array#flat Guide"
date: "2020-12-28"
description: "If you are dealing with nested arrays then you need to know about the Array#flat method."
tags: ["JavaScript"]
---

The `flat` method may seem really simple at first glance, but there are actually a few really unique use cases for it that I will explain in this article.

## What Is Array#flat

Imagine you have a nested array like this.

```js
const arr = [1, [2, 3], [4], [5, 6, 7], 8]
```

If you wanted to convert that into an array that is not nested you could use the `flat` method on the array.

```js
const arr = [1, [2, 3], [4], [5, 6, 7], 8]
console.log(arr.flat())
// [1, 2, 3, 4, 5, 6, 7, 8]
```

This is the most basic way to use the `flat` method and all it does is flatten out the nested arrays into one array. If this is all you know of `flat`, you may be confused when you see the following output.

```js
const doubleNestedArr = [1, [2, [3, 4], 5], 6, [7, 8]]
console.log(doubleNestedArr.flat())
// [1, 2, [3, 4], 5, 6, 7, 8]
```

The array `[3, 4]` is nested 2 layers deep in the array which means that `flat` never actually flattens it since `flat` by default will only flatten an array one level deep.

## How To Use Flat For Multi-Nested Arrays

If you want to flatten an array that is 2 levels nested, like the above example, you can pass the value `2` to `flat`. The number you pass to `flat` tells the method how many levels of nesting you would like to flatten.

```js
const doubleNestedArr = [1, [2, [3, 4], 5], 6, [7, 8]]
console.log(doubleNestedArr.flat(2))
// [1, 2, 3, 4, 5, 6, 7, 8]
```

By doing that we have now completely flattened the above array, but what if you do not know how nested the arrays are? In that case you can pass `Infinity` to `flat` and it will flatten all the arrays until the entire array is flattened.

```js
const doubleNestedArr = [1, [2, [3, 4], 5], 6, [7, 8]]
console.log(doubleNestedArr.flat(Infinity))
// [1, 2, 3, 4, 5, 6, 7, 8]
```

## Removing Holes

Another really useful feature of `flat` is that it can remove empty holes from an array. These holes can be caused by you using `delete` to remove an element from an array for example or when you insert an element at an index that is far beyond the end of the array leaving gaps in between.

```js
const arr = [1, 2, 3, 4, , 6, 7, , 9]
console.log(arr)
// [1, 2, 3, 4, empty, 6, 7, empty, 9]
console.log(arr.flat())
// [1, 2, 3, 4, 6, 7, 9]
```

This is something most people don't know about `flat` that can be very useful in certain situations.

## `flatMap`

Lastly, I want to talk about a combination of two array methods `flat` and `map`. Since it is very common to perform a map on an array that then needs to be flattened, the developers of JavaScript created a `flatMap` method. This method works exactly the same as calling `arr.map().flat()`. This means that if you want to flatten beyond one level of nesting you will need to use `map` and `flat` separately, but when you only have one layer of flattening to do `flatMap` is perfect.

```js
const people = [
  { name: "John", favNums: [1, 2, 4] },
  { name: "Sally", favNums: [6, 8, 9] },
]
console.log(people.map(p => p.favNums))
// [[1, 2, 4], [6, 8, 9]]
console.log(people.map(p => p.favNums).flat())
// [1, 2, 4, 6, 8, 9]
console.log(people.flatMap(p => p.favNums))
// [1, 2, 4, 6, 8, 9]
```

## Conclusion

Overall `flat` and `flatMap` are very simple methods, but they are incredibly useful and make any task involving nested arrays trivial to solve.
