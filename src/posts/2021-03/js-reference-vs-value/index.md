---
setup: import ValueChart from '/src/blogComponents/referenceVsValue/ValueChart.astro'
title: "Reference Vs Value - Most People Don't Understand This"
date: "2021-03-29"
description: "Reference vs value is one of the most complicated topics beginner developers face, but it is much easier than it appears."
tags: ['JavaScript']
---

There is a lot to learn in JavaScript, but one of the most confusing topics you will run into when learning JavaScript is the idea of value vs reference. In this article I will detail exactly what value vs reference is and how you can use this knowledge to avoid many common bugs that you have probably already ran into before.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: -hBJz2PPIVE`

## How Value And Reference Work

When you create a variable in JavaScript you know that you are setting some variable to a specific value.
```js
let a = 10
```
In the above example we are setting the variable `a` to the value `10`. This is pretty easy to understand, but gets more complicated when dealing with multiple variable assignments.
```js
let a = 10
let b = 20
let c = a
```
If we map the variables from the above code to their values we will get something like this.

<ValueChart variables="{ a: 10, b: 20, c: 10 }" />

In order to build this chart what we did was take the value of the thing on the right side of the equal sign and set it to the value of the variable on the left side of the equal sign.

For variable `a` we take the value of the thing on the right side which is `10` and set that as the value for `a`. We then repeat the same thing for `b`, and `c`. The reason the variable `c` has the value of `10` is because the variable `a` is on the right side of the equal sign which means we get the value of `a` which is `10` and set that to the value of `c`.

If we were to modify this code slightly and add 1 to `c` (`c = c + 1`) then we would get the following chart.

<ValueChart variables="{ a: 10, b: 20, c: 11 }" />

As you can see by modifying `c` we are not actually changing `a` in anyway even though `c` was derived from `a`. This is because when we set the value of `c` in the above example we are taking `c + 1` which is 11 and setting that to the value of `c` which has no impact on `a`. Most likely you are familiar with this behavior, but when we introduce arrays/objects things behave a bit different.
```js
let a = 10
let b = 20
let c = [1, 2]
```
<ValueChart variables="{ a: 10, b: 20, c: '0x01' }" memory="[['0x01', [1, 2]]]" />

Arrays and objects require a second table that represents the memory address of that array/object. This memory address is just a code that represents where on your computer the data is stored. The value for that variable is then set to the memory address of the array/object associated with the variable. This is called a reference since the variable `c` references a place in memory instead of a value.

Now let's see what happens when we create a new variable based on `c`.
```js
let a = 10
let b = 20
let c = [1, 2]
let d = c
```
<ValueChart variables="{ a: 10, b: 20, c: '0x01', d: '0x01' }" memory="[['0x01', [1, 2]]]" />

As you can see both `c` and `d` reference the same place in memory. This is because to get the value for a variable you take the thing on the right side of the equal sign and gets its value and set that value as the value of the new variable. In our case the value of `c` is `0x01` so the value of `d` is also set to `0x01` which means `c` and `d` point to the same memory address.

If we change `c` then we also change `d` at the same time since they are linked to the same memory.
```js
let a = 10
let b = 20
let c = [1, 2]
let d = c
d.push(3)
```
<ValueChart variables="{ a: 10, b: 20, c: '0x01', d: '0x01' }" memory="[['0x01', [1, 2, 3]]]" />

As you can see by pushing 3 to the end of `d` we are also modifying `c` since they both deal with the same array in memory.

This is something that confuses many developers, but there is also one other area where most developers get confused.

## Why Identical Arrays Are Not equal

If you run `[1, 2] === [1, 2]` you would probably expect the answer to be `true` but in reality the result is `false`. This is because whenever you compare variables in JavaScript it checks to see if the value of the variables are identical.

In order to explain this further lets write our code as follows.
```js
let a = [1, 2]
let b = [1, 2]
console.log(a === b)
// false
```
<ValueChart variables="{ a: '0x01', b: '0x02' }" memory="[['0x01', [1, 2]], ['0x02', [1, 2]]]" />

Even though `a` and `b` have arrays with the same numbers in them they are separate from one another since these arrays have different locations in memory where they are stored. Whenever you create a new array or object it will be stored in a brand new memory address. This is why `a` and `b` point to different memory addresses.

When we do the equality comparison between `a` and `b` it is easy to see why it is false since they have different values. `a` has a value of `0x01` and `b` has the value of `0x02`.

If we change this code slightly we can get the equality check to be true, though.
```js
let a = [1, 2]
let b = a
console.log(a === b)
// true
```
<ValueChart variables="{ a: '0x01', b: '0x01' }" memory="[['0x01', [1, 2]]]" />

Now that we set `b` equal to `a` we made sure that they reference the same memory address and now they have the same value.

## Why Is This Important?

This is important to understand since when you pass an array or object to a function you are passing that reference which means you can actually modify the array/object from within that function.

```js
const a = [1, 2]

function addElement(array, element) {
  array.push(element)
}

addElement(a, 3)
console.log(a)
// [1, 2, 3]
```

In the above example we are passing `a` into the function `addElement` and since the value of `a` is a memory address we are actually able to modify the memory at that address by calling `push` inside the function. This then adds the element to the location in memory where `a` is pointing which is why `a` has the value 3 added to the end of it even outside the function.

This is something that causes a lot of bugs since many programmers are not aware of how this interaction works and will accidentally modify arrays/objects without knowing it.

## Conclusion

Reference vs value is a confusing topic that leads to many bugs, but if you understand how setting a variable works based on values then all these bugs become a problem of the past.