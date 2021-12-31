---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: JavaScript Var vs Let vs Const
date: "2020-01-20"
description: "A quick explanation of the differences between var, let, and const."
tags: ['JavaScript']
---

If you have read any JavaScript programming tutorials then chances are you have run into code where variables are defined using a combination of `var`, `let`, and `const`. It can be confusing at first to understand why someone would use one over the other for defining variables, so in this article I am going to breakdown the exact differences between `var`, `let`, and `const` so you know exactly when to use each.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: 9WIJQDvt4Us`

## Understanding Var

Before the introduction of ES6, JavaScript only had one way to define variables which was the `var` keyword. This worked fine for many years, but `var` works differently than most other programming languages when it comes to how the variable that is created is scoped.

The `var` keyword creates variables which are function scoped. This means that any variable created with `var` is available anywhere in the function in which it is defined. For example in the below code the `name` variable is available outside the `if` statement in which it is defined because `var` variables are available anywhere in the function that they are defined.
```js
function print() {
  if (true) {
    var name = 'Kyle'
  }
  console.log(name)
}
// Prints: Kyle
```

This is different than most other programming languages where this variable would not be available outside the `if` block. Another thing to note about function scoping is that if the variable is declared outside of any function then the variable is a global variable available everywhere. The following example is nearly identical to the previous example, but there is no surrounding function so the `name` variable is available everywhere.
```js
if (true) {
  var name = 'Kyle'
}
console.log(name)
// Prints: Kyle
```

## Understanding Const/Let

This behavior is obviously much different than most other programming languages, so with ES6 JavaScript introduced `let` and `const` which work more like variables in other programming languages. `let` and `const` are block scoped which means that they are only available inside the block in which they are defined. A block defines any set of code that is inside a set of curly braces. For example, this could be a function, `if` block, `for` loop, etc. If the previous examples used the `let` or `const` keyword instead of `var` they would throw an error since the variable is not defined in the block in which it is used.
```js
if (true) {
  let name = 'Kyle'
}
console.log(name)
// Uncaught ReferenceError: name is not defined
```

In order to make the above code function the `console.log` would need to be moved into the block with the name.
```js
if (true) {
  let name = 'Kyle'
  console.log(name)
  // Prints: Kyle
}
```

## Other Differences Between Var and Let/Const

While block vs function scoping is the largest difference between the old `var` keyword and the new `let`/`const` keywords, there are still a few other differences between them. One of the major differences is that the variables defined by `var` are hoisted which means that they are available to be used even before they are defined. For example, the following code will not throw any errors even though the variable is defined after it is first used.
```js
console.log(name)
// Prints: undefined
var name = 'Kyle'
console.log(name)
// Prints: Kyle
```

This is not the case for `let`/`const`, though. Just like in most other programming languages, a variable declared with `let`/`const` must be defined before it is used the first time.
```js
console.log(name)
// Uncaught ReferenceError: name is not defined
let name = 'Kyle'
console.log(name)
```

The last major difference, is that `var` variables can be redeclared with the `var` keyword, while trying to redeclare a variable with the `let` keyword will throw an error. For example the following code will change the `name` variable.
```js
var name = 'Kyle'
console.log(name)
// Prints: Kyle
var name = 'Sally'
console.log(name)
// Prints: Sally
```

When using `let`/`const`, this will throw an error.
```js
let name = 'Kyle'
console.log(name)
// Prints: Kyle
let name = 'Sally'
// Uncaught SyntaxError: Identifier 'name' has already been declared
console.log(name)
```

## Let vs Const

We have talked a bunch about the differences between `var` and `let`/`const`, but there is one big difference between `let` and `const` that we need to talk about. This difference is that variables defined by `const` can never be changed, while variables defined by `let` can be changed whenever. For example, the following code will work since the variable is declared using `let`.
```js
let name = 'Kyle'
console.log(name)
// Prints: Kyle
name = 'Sally'
console.log(name)
// Prints: Sally
```

This will throw an error with `const`, though, since `const` variables are constant and cannot change.
```js
const name = 'Kyle'
console.log(name)
// Prints: Kyle
name = 'Sally'
// Uncaught TypeError: Assignment to constant variable.
console.log(name)
```

This may make you think that `const` variables can never be changed, but in actuality `const` only prevents a variable from being reassigned. If the `const` variable was an object, for example, the properties of the object could be changed.
```js
const person = { name: 'Kyle' }
console.log(person.name)
// Prints: Kyle
person.name = 'Sally'
console.log(person.name)
// Prints: Sally
```

## Conclusion

So now you know the differences between `var`, `let`, and `const`, but which one should you use. In my opinion, you should always use either `let` or `const`. This is because `var` has many weird behaviors, such as hoisting and function scoping, which `let` and `const` do not have to worry about. Between `let` and `const`, I would recommend using `const` whenever you do not need to reassign the variable value, and only use `let` when you absolutely have to reassign a variable. This will overall make your code easier to read and reason with.