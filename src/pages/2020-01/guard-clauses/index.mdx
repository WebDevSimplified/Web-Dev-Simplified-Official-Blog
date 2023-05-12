---
layout: "@layouts/BlogPost.astro"
title: Guard Clauses - The Best Way To Write Complex Conditional Logic
date: "2020-01-06"
description: "An explanation of guard clauses and how they can be used to clean up complex nested conditional logic."
tags: ["Technical Discussion"]
---

Chances are at some point in your programming career you have written massive conditional logic statements with many levels of nested `if` and `else if` statements. At first it may seem like a great idea since it perfectly matches the logic you are trying to enforce, but then a month goes by and you need to make changes to that massive conditional block. More than likely it took you a long time to parse and understand the conditional logic since it was full of multiple levels of nesting and your new changes were most likely very prone to errors. It may seem like there is no way around this problem, but that is where guard clauses come in.

## What Are Guard Clauses?

A guard clause is simply a single piece of conditional logic at the beginning of a function which will return from the function early if a certain condition is met. This is a bit confusing to imagine from the definition alone, so let's look at a simple example of some code which runs a timer and does not use any guard clauses.

```js
function startTimer(timer) {
  if (timer.enabled) {
    timer.time = 0
    timer.start()
  }
}
```

This code is pretty straight forward, but all of the logic inside the function is wrapped inside an if statement which can be a bit messy to work with as the function becomes more complex. To implement the same function with guard clauses would look like this.

```js
function startTimer(timer) {
  if (!timer.enabled) return

  timer.time = 0
  timer.start()
}
```

Now the main code of the function is no longer nested inside an if statement which is much easier to reason with in the future. To implement a guard clause in simple situations like this all that needs to be done is to reverse the logic in the if statement and then return from the function. This works since before the code in the if would execute if the statement was true, and by flipping the logic to exit early if the statement is false gives the same result.

Let's take a look at a slightly more complex example on calculating insurance deductibles.

```js
function getInsuranceDeductible(insurance) {
  if (insurance.covered) {
    if (insurance.majorRepair) {
      return 500
    } else if (insurance.mediumRepair) {
      return 300
    } else {
      return 100
    }
  } else {
    return 0
  }
}
```

This is a very simple function, but the nested `if`/`else if` logic is difficult to follow at first glance. To clean this up we can again use guard clauses.

```js
function getInsuranceDeductible(insurance) {
  if (!insurance.covered) return 0
  if (insurance.majorRepair) return 500
  if (insurance.mediumRepair) return 300

  return 100
}
```

This function is much shorter than the previous function and much easier to understand since all of the logic is self contained and not nested inside one another. To create this guard clause version the same rule that applied to the simple function of flipping the if statement logic and returning works, but this time 0 needs to be returned since that is what is returned when there is no insurance coverage. The other guard clauses are just exact copies of the inner if statement, but instead of using `else if` and `else` the code returns early so there are no nested if statements.

## Conclusion

Guard clauses are very simple to implement inside nearly any function that uses conditional logic, but they massively increase the cleanliness of the code. Next time you find yourself writing complex nested conditional statements try reaching for guard clauses to clean up the complexity.
