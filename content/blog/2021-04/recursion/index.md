---
title: "What Is Recursion?"
date: "2021-04-26"
description: "Recursion is one of the hardest topics to learn as a new developer, but this is mostly due to confusing explanations and examples. This article will break down recursion in an easy to understand way with concrete and simple examples."
tags: ['Technical Discussion']
---

Recursion is a scary word when you are a new developer. It is this foreign concept that is always shrouded in a mystery due to terrible and convoluted explanations. This doesn't have to be the case, though. Recursion is actually quite simple and in this article I will show you just how simple recursion actually is.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: 6oDQaB2one8`

## What Is Recursion?

Recursion by definition is actually very straight forward. It is simply when a function calls itself. Now you may think this would always result in an infinite loop, but recursive functions use an exit condition to determine if they should stop calling themselves and end the recursion.

This is very similar to how a loop works.
```js
function countDown(n) {
  for (let i = n; i > 0; i--) {
    console.log(i)
  }

  console.log("Hooray")
}
```
In this loop we have a starting point `i = n`, an exit condition (the opposite of the second value in the for loop syntax) `i <= 0`, and an incrementor that changes how the next iteration of the loop occurs `i--`.

Based on this information it is actually quite easy to turn this function into a recursive function.
```js
function countDownRecursive(n) {
  if (n <= 0) {
    console.log('Hooray')
    return
  }

  console.log(n)
  countDownRecursive(n - 1)
}
```
The above function does the same thing as the for loop example, but it is not entirely clear how this function works.

The first thing you will see in the function is the if statement.
```js
if (n <= 0) {
  console.log('Hooray')
  return
}
```
The if check is our exit condition since if n is less than or equal to 0 we want to stop counting down. In a recursive function once you hit your exit condition you need to make sure that you return from the function and not call the function again. This will end the recursion.

We also log out Hooray since this is something that occurs after our loop in the previous example and in a recursive function things that happen after the loop would occur within the exit condition.

In order to understand how this function works lets take a look at the way the function is called.

When we first call the function we call it with the value of 3. This value is then printed out to the screen and we re-call the function with the value of 3 - 1 which is 2.
```js
// countDownRecursive(3)
//   countDownRecursive(2)
```
Inside this function call we again print out n and then subtract 1 so we call the function with the value of 1. We then do this entire thing again calling the function with the value of 0.
```js
//  countDownRecursive(3)
//    countDownRecursive(2)
//      countDownRecursive(1)
//        countDownRecursive(0)
```
At this point when we call the function we hit the exit condition since n is equal to 0. We print out Hooray and then return from the function where n is equal to 0.
```js
//  countDownRecursive(3)
//    countDownRecursive(2)
//      countDownRecursive(1)
//        countDownRecursive(0)
//        return
```
We still aren't done with our functions, though. This is because when we return from `countDownRecursive(0)` we go back to where we called that function which is inside `countDownRecursive(1)`. In our case this is at the very end of our function and there is no more code to run which means that function also returns automatically. This continues all the way until we get out of the recursive call stack.
```js
//  countDownRecursive(3)
//    countDownRecursive(2)
//      countDownRecursive(1)
//        countDownRecursive(0)
//        return
//      return
//    return
//  return
```

## How To Handle Return Values

The previous example of recursion was a very simple example that dealt with simple console logs. Normally when you deal with recursion, though, you are going to return some value from the function. Let's take the following example and convert it to a recursive function.
```js
function sumRange(n) {
  let total = 0;
  for (let i = n; i > 0; i--) {
    total += i
  }
  return total
}
```
This function simply takes a number and sums up all the numbers less than it including itself. Here is the recursive version.
```js
function sumRangeRecursive(n) {
  if (n <= 0) return 0
  return sumRangeRecursive(n - 1) + n
}
```
This is again not nearly as clear as the loop version of this function, but if we break it down it is much easier to see what is going on.

Our exit condition is `n <= 0` and when we hit that condition we return the value 0. If that condition is not true we instead call the function again, but pass in the next smaller number until we eventually reach 0. Once we reach 0 we start returning from reach iteration of the function.
```js
//  sumRangeRecursive(3)
//    sumRangeRecursive(2)
//      sumRangeRecursive(1)
//        sumRangeRecursive(0)
//        return 0
```
This is where it gets a bit confusing, though. When n is 0 we return 0 from the function which means we go to where we called `sumRangeRecursive(0)` which is inside `sumRangeRecursive(1)` at the very bottom. This line uses the return value of that function and adds it to the current value of n which in our case is 1. This means we return 1 + 0 which is 1.
```js
//  sumRangeRecursive(3)
//    sumRangeRecursive(2)
//      sumRangeRecursive(1)
//        sumRangeRecursive(0)
//        return 0
//      return 1
```
We do this again for `sumRangeRecursive(2)` so we return the result of `sumRangeRecursive(1)` which is 1 added to the value of n which is 2. This repeats all the way until we exit out of the top function call.
```js
//  sumRangeRecursive(3)
//    sumRangeRecursive(2)
//      sumRangeRecursive(1)
//        sumRangeRecursive(0)
//        return 0
//      return 1
//    return 3
//  return 6
```

## The Ideal Use Case For Recursion

In the previous examples we looked at converting loops to recursive functions, but in these cases it made more sense to use a loop. In this next example we are going to look at a case where recursion is ideal.

Take for example the following tree of data.
```js
{
  name: 'John',
  children: [
    {
      name: 'Jim',
      children: []
    },
    {
      name: 'Zoe',
      children: [
        { name: 'Kyle', children: [] },
        { name: 'Sophia', children: [] }
      ]
    }
  ]
}
```
We have nested arrays of children and this could be an any number of layers deep. It would be impossible to write a function that gets all children with a normal for loop since we do not know when the nesting will end so we would instead need to use something like a while loop to loop through all the children but even then the code is very messy. Instead we will use recursion.
```js
function getAllChildrenNames(person) {
  const nestedChildNames = person.children.flatMap(child => {
    return getAllChildrenNames(child)
  })
  const childNames = person.children.map(p => p.name)

  return childNames.concat(nestedChildNames)
}
```
This recursive function is a bit different than normal since it appears that there is no guard clause. In actuality, though, there is a guard clause since if the `person.children` array is empty it will never loop through the `flatMap` and never call the `getAllChildrenNames` function.

Just like in all the previous examples let's look at how this function works.

The first time we call the function we call it with the the John object. Since John has two children we call `getAllChildrenNames` twice because of the `flatMap`.
```js
//  getAllChildrenNames(johnObject)
//    getAllChildrenNames(jimObject)
//    getAllChildrenNames(zoeObject)
```
Inside `getAllChildrenNames(jimObject)` since Jim has no children we get `nestedChildNames` equal to an empty array and we never call `getAllChildrenNames`. We also get the `childNames` variable equal to an empty array since there are no children. This means that `getAllChildrenNames(jimObject)` just returns an empty array.

Inside `getAllChildrenNames(zoeObject)` we have two more children so we call the function twice more.
```js
//  getAllChildrenNames(johnObject)
//    getAllChildrenNames(jimObject)
//    return []
//    getAllChildrenNames(zoeObject)
//      getAllChildrenNames(kyleObject)
//      getAllChildrenNames(sophiaObject)
```
Inside `getAllChildrenNames(kyleObject)` and `getAllChildrenNames(sophiaObject)` there are no children so they both return an empty array.
```js
//  getAllChildrenNames(johnObject)
//    getAllChildrenNames(jimObject)
//    return []
//    getAllChildrenNames(zoeObject)
//      getAllChildrenNames(kyleObject)
//      return []
//      getAllChildrenNames(sophiaObject)
//      return []
```
The `getAllChildrenNames(zoeObject)` now has `nestedChildNames` set to an empty array since both the children of Zoe have no children. The `childNames` function on the other hand is set to the value `["Kyle", "Sophia"]` since those are the names of Zoe's children. When we combine those two arrays together we return `["Kyle", "Sophia"]`.
```js
//  getAllChildrenNames(johnObject)
//    getAllChildrenNames(jimObject)
//    return []
//    getAllChildrenNames(zoeObject)
//      getAllChildrenNames(kyleObject)
//      return []
//      getAllChildrenNames(sophiaObject)
//      return []
//    return ["Kyle", "Sophia"]
```
Finally we are left with the first function call `getAllChildrenNames(johnObject)`. This function has `nestedChildNames` set to the array of `["Kyle", "Sophia"]` since that is the array that results from combining the return of `getAllChildrenNames(zoeObject)` and `getAllChildrenNames(jimObject)`. This array is then combined with the `childNames` array to give the result of `["Jim", "Zoe", "Kyle", "Sophia"]`.
```js
//  getAllChildrenNames(johnObject)
//    getAllChildrenNames(jimObject)
//    return []
//    getAllChildrenNames(zoeObject)
//      getAllChildrenNames(kyleObject)
//      return []
//      getAllChildrenNames(sophiaObject)
//      return []
//    return ["Kyle", "Sophia"]
//  return ["Jim", "Zoe", "Kyle", "Sophia"]
```
Writing this code using a for/while loop is technically possible, but the code is really ugly and difficult to read and write which is why recursion is a natural choice for this type of problem.

## Conclusion

Recursion may seem magical and confusing, but in reality it is just a fancy style of loop. Recursion allows you to solve problems that are difficult to do with normal loops and is best suited for any situation where you need to traverse a deeply nested object/array or any other time where you are not sure how many iterations your loop needs to go through.