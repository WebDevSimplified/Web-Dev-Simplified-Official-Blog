---
title: "Stop Using IIFEs"
date: "2020-08-31"
description: "Due to modern JavaScript features we no longer need to use immediately invoked function expressions."
tags: ['JavaScript']
---

Immediately invoked function expressions, also known as IIFEs, are one of the oldest tricks in JavaScript to deal with the lack of private variables and namespaces. Large projects can quickly pollute the global namespace without a way to hide private variables, so the idea of IIFEs was created. JavaScript has evolved, though, and this problem has been solved by modern features built into JavaScript which begs the question of whether IIFEs are needed anymore.

## What Is An IIFE?

Before we can talk about the usefulness of IIFEs we need to first understand how they work. Below is an example of a basic IIFE.
```js
(function() {
  var x = 1
  // Do something
})()

console.log(x)
// Throws an error since x is not accessible
```
In the above code we create a function that defines the variable `x` using the `var` keyword. Normally this would set `x` to the value provided and make it available anywhere in the file, but we are instead wrapping this function in parenthesis and executing it immediately. This is taking the function and turning it into an expression due to it being wrapped in parenthesis. This then causes all the variables defined in that expression to be only accessible inside the function expression. The final piece of the puzzle is the execution of this function via the parenthesis at the end of the function declaration. This essentially gives JavaScript developers the ability to create a private section of code that runs immediately and is not accessible anywhere else.

## IIFE Alternatives

This syntax is pretty clunky, though, and can potentially cause issues with how JavaScript handles automatic semicolon insertion. Luckily, there are much better ways of handling this type of scenario, though.

### Block Scoped Variables

If the goal is to create code that uses some variables that are no longer needed anymore then this can be achieved very easily with block scoped variables. JavaScript introduced both the `let` and `const` keyword which are block scoped variables. *If you are unfamiliar with these keywords or how block scoping works, check out [this article](/2020-01/var-vs-let-vs-const) that covers these topics in depth.*
```js
{
  let x = 1
  // Do something
}

console.log(x)
// Throws an error since x is not accessible
```
The reason this works is because `x` is defined within a block which is designated by the opening and closing curly brackets. This means that `x` is only defined within the blocks and is no longer accessible outside the curly brackets.


### Modules

By far the best way to handle private variables and functions is with modules. Export a variable or function from a module is the only way to make it accessible outside that module which means each module acts as its own private namespace.
```js
// module.js
let x = 20
export let y = 10
```
```js
import { y } from './module.js'

console.log(y)
// 10
```
```js
import { x } from './module.js'

console.log(x)
// Error since x is not exported from module.js
```
This is the method I recommend everyone takes when dealing with private variables and keeping things out of the global namespace since modules are widely supported in modern browsers, make working with private information incredibly easy, and are easier to understand for newer programmers.

## Conclusion

Next time you need to create private variables, instead of choosing an IIFE, consider using modules or block scoping to accomplish the same task in a cleaner and easier to understand way.