---
title: "JavaScript Ternary Operator In Depth"
date: "2020-05-18"
description: "Everything You Need To Know About The Ternary Operator In JavaScript."
tags: ['JavaScript']
---

One of the first things you are taught when learning to program is how to handle conditional logic with `if`/`else` statements. These `if`/`else` statements are one of the most common pieces of code you write when programming, and because of that a shorthand version of the `if`/`else` statement was created called the ternary operator. In this article I will briefly explain what the ternary operator is and how you can properly use it.

## What Is The Ternary Operator?

You may be looking at the name ternary and wondering what the heck that means. I have to agree that the name ternary operator is a pretty poor name, but the reason for this name is because ternary means "composed of three parts" and the ternary operator is the only operator in JavaScript that has three parts to it. Let's take a quick look at the definition of the ternary operator to understand it in more depth.
```js
condition ? trueResult : falseResult
```
As you can see the ternary operator is composed of three distinct parts. The `condition`, `trueResult`, and `falseResult`. Let's break down each part.

The `condition` is the first portion of the ternary operator and is simply an expression that evaluates to true or false. For example `person1.name === person2.name`, or `number > 0`. This is essentially equivalent to the portion inside the parenthesis of an `if` statement. `if (number > 0)`. After the `condition`, a question mark is used to separate the `condition` from the `trueResult`.

The `trueResult` is the code you want to return from the ternary operator when the `condition` is true. This is essentially the same as the code inside an `if` statement. After the `trueResult`, a colon is used to separate the `trueResult` from the `falseResult`.

Finally, the `falseResult` is the code that is returned if the `condition` is false. This is the same as the code inside the `else` portion of an `if`/`else` statement.

By combining that all together we can write the following `if`/`else` statement as a ternary.
```js
let result
if (number > 50) {
  result = 'Not to fifty!'
} else {
  result = 'It could be worse'
}
```
```js
let result = number > 50 ? 'Not to fifty!' : 'It could be worse'
```
By using the ternary operator we are able to write significantly shorter code without sacrificing readability of the overall code. This is an example of a good way to use the ternary operator. Pretty much anytime that you want to return either one value or another based on a true/false statement a ternary is a great choice. Unfortunately, many people use ternaries for much more than just this simple use case.

## Ternary Operator Common Mistakes

One of the biggest mistakes I see developers make with the ternary operator is using it in place of an `if`/`else` statement when they do not want to return any results. For example, take the following `if`/`else` statement.
```js
if (user.valid) {
  user.save()
} else {
  user.printErrors()
}
```
This code is not setting a variable or returning anything from the `if`/`else`. This code is purely for determining the flow of the program which means you should not use a ternary operator for this code. If you did use a ternary it would look like this.
```js
user.valid ? user.save() : user.printErrors()
```
While this code may look fine, it is unnecessarily convoluted and makes understanding the flow of the program more difficult than a traditional `if`/`else`. I like to generally use the simple rule that you should only use a ternary if the `trueResult` and `falseResult` are simple values or properties that do not determine the flow of the program. I also follow the rule that ternaries should never be used unless they are setting a value of a variable or being used as the return for a function. This helps to limit the complexity of the code.

Another rule I follow related to ternaries is that I never nest ternaries inside one another. Since ternaries can only execute `if`/`else` statements with no `if else` portion many developers resort to nesting ternaries to emulate the same behavior. Here is a quick example.
```js
let result
if (number === 0) {
  result = 'You have nothing'
} else if (number < 10) {
  result = 'Under 10'
} else {
  result = 'Over 10'
}
```
```js
let result = number === 0 ? 'You have nothing' : (
  number < 10 ? 'Under 10' : 'Over 10'
)
```
As you can see we wrapped a second ternary in parenthesis as the `falseResult` of the first ternary. This allows us to emulate `if else` in a ternary, but this code is very difficult to read. Whenever I run into code like this it forces me to take time to parse the code and try to understand exactly how things work which is a large waste of time and very susceptible to me misunderstanding the nested ternaries.

## Conclusion

Ternary operator is a unique operator in JavaScript that allows you to drastically shorten `if`/`else` statements. This is great for setting variables based on a simple `if`/`else` condition, but can be easily misused, leading to difficult to maintain and understand code. Because of this you should be extra cautious when using ternaries to ensure they are making the code easier to understand and not just saving you a few lines of code.