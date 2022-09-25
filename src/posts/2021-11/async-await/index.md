---
title: "Better Than Promises - JavaScript Async/Await"
date: "2021-11-08"
description: "Async/Await is syntactical sugar that makes working with promises and async code so much easier."
tags: ['JavaScript']
---

Promises are one of the best additions to JavaScript because they make handling async code so much easier. Going from callbacks to promises feels like a massive upgrade, but there is something even better than promises and that is async/await. Async/await is an alternative syntax for promises that makes reading/writing async code even easier, but there are a few caveats you need to know about async/await or you may end up making your code worse.

*If you are unfamiliar with promises read [this full promise tutorial](/2021-09/javascript-promises) first.*

*If you prefer to learn visually, check out the video version of this article.*
`youtube: V_Kr9OSfDeU`

## Async/Await Basics

In order to understand async/await it is easiest to start with an example of promises being used and then convert that to async/await. To get started we are going to use the below function in all of our examples.
```js
function setTimeoutPromise(delay) {
  return new Promise((resolve, reject) => {
    if (delay < 0) return reject("Delay must be greater than 0")

    setTimeout(() => {
      resolve(`You waited ${delay} milliseconds`)
    }, delay)
  })
}
```
This function is simply a promise based version of `setTimeout`. Now let's look at how we would chain together two timeouts where the second timeout waits for the first to finish.
```js
setTimeoutPromise(250).then(msg => {
  console.log(msg)
  console.log("First Timeout")
  return setTimeoutPromise(500)
}).then(msg => {
  console.log(msg)
  console.log("Second Timeout")
})
// Output:
// You waited 250 milliseconds
// First Timeout
// You waited 500 milliseconds
// Second Timeout
```
If you are familiar with promises this code shouldn't be too confusing. The most confusing part of the code is that we are returning the second promise from the first so we can chain them together. Now this code works fine, but we can make it a lot cleaner with async/await.
```js
doStuff()
async function doStuff() {
  const msg1 = await setTimeoutPromise(250)
  console.log(msg1)
  console.log("First Timeout")

  const msg2 = await setTimeoutPromise(500)
  console.log(msg2)
  console.log("Second Timeout")
}
// Output:
// You waited 250 milliseconds
// First Timeout
// You waited 500 milliseconds
// Second Timeout
```
The above code does the exact same thing as the previous version, but you will notice it looks much more like normal synchronous code which is the point of async/await. Now let's talk about how this code works.

First you will notice that we wrapped all our code in a function called `doStuff`. The name of this function is not important, but you will notice that we labeled this function as async by putting the async keyword before the function keyword. Doing this tells JavaScript that we plan to use the await keyword within this function. If we do not label the function as async and use the await keyword within the function it will throw an error

It is also important to note that as of now you cannot use the await keyword unless you are inside a function which is why we had to create a function to run this code. This is something that JavaScript is planning to change by adding top level await which means you can use await at the top level of a file without being in a function, but this is still not in any browsers.

Now that we understand the async keyword let's talk about the code in the function. You will notice it looks very similar to the previous code and that is because async/await is just a different way of writing the same thing. To convert a promise .then to async/await you need to take the promise function call `setTimeoutPromise(250)` and put the keyword `await` in front of it. This tells JavaScript that the function after the await keyword is asynchronous. Then if your promise returns a value you can just access that value as if it was a normal function return like we did with `const msg1 = await setTimeoutPromise(250)`. The final step is to take all the code from the .then portion of the promise and put it after the function call.

The reason this works is because when JavaScript sees the await keyword it will call the awaited function, but it will not run any of the code after that function until the promise returned by that function is resolved. Instead JavaScript will run code other places in your application while it waits for the promise to resolve. Once the promise resolves it will return the promise result from the awaited function and run all the code up until the next await statement and repeat.

## Catching Errors

The above section covers the absolute basics of async/await, but what happens if your promise rejects instead of resolving. This is easy to catch with traditional promise syntax.
```js
setTimeoutPromise(-10).then(msg => {
  console.log(msg)
}).catch(error => {
  console.error(error)
})
// Output:
// Delay must be greater than 0
```
With async/await this is a bit more complicated.
```js
doStuff()
async function doStuff() {
  try {
    const msg = await setTimeoutPromise(-10)
    console.log(msg)
  } catch (error) {
    console.error(error)
  }
  console.log("Outside")
}
// Output:
// Delay must be greater than 0
// Outside
```
In order to catch an error you need to wrap your code in a try/catch block. All the code that could possible fail (such as the promises) needs to be put in the try section of the try/catch block. JavaScript will try to run this code and at any point if there is an error it will stop running the code in the try block and jump to the catch block.

The catch block of the code takes in a single error parameter. If there was an error in the program this code will run and then the program will continue on after the try/catch block as normal. If there was no error the code will run through the entire try block, skip the catch block, and continue on as normal.

You can also handle the finally portion of promises in the same way.
```js
setTimeoutPromise(-10).then(msg => {
  console.log(msg)
}).catch(error => {
  console.error(error)
}).finally(() => {
  console.log("Runs no matter what")
})
// Output:
// Delay must be greater than 0
// Runs no matter what
```
```js
doStuff()
async function doStuff() {
  try {
    const msg = await setTimeoutPromise(-10)
    console.log(msg)
  } catch (error) {
    console.error(error)
  } finally {
    console.log("Runs no matter what")
  }
}
// Output:
// Delay must be greater than 0
// Runs no matter what
```

## Async/Await Caveats

Async/await is incredible when dealing with asynchronous code, but if you need to deal with asynchronous code that runs in parallel it does not work.

Imagine a scenario where you are looping through a set of values and want to do something with these values that is asynchronous.
```js
for (let i = 0; i < 10; i++) {
  getUser(i).then(user => console.log(user))
}
```
This code will create 10 promises that run in the background all at once and will log out all 10 users at approximately the same time if the `getUser` function takes the same time to run each time it is called.
```js
await function doStuff() {
  for (let i = 0; i < 10; i++) {
    const user = await getUser(i)
    console.log(user)
  }
}
```
You may think the above code does the same thing, but this will actually run each `getUser` function one after the other. The reason for this is because in the first iteration of the loop we call `getUser` and wait for it to get the user before moving on. Once it gets the user we log it out and then wait to get the next user. This repeats for all users.

With the .then promise based version we are never waiting for the user to continue which means that we go through the entire loop calling `getUser` without doing any waiting. This means that if the `getUser` function takes 50ms to run the first example will call all `getUser` functions and then 50ms later it will print out all users. The second example will call the first `getUser` function, wait 50ms, print out the user, and then call `getUser` a second time before waiting 50ms and repeating. This means the async/await version will take 500ms to run through all the users.

Because of this I recommend never using async/await in a loop unless you specifically need to wait for each previous iteration of the loop before the next iteration can be completed.

## Conclusion

While async/await doesn't allow you to do anything new in JavaScript it is still incredibly useful because of how much cleaner it can make the code you write.