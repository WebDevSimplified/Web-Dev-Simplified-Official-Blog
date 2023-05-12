---
layout: "@layouts/BlogPost.astro"
title: "Generators Are Awesome!"
date: "2021-01-18"
description: "Generators are incredibly useful for specific tasks and much easier to use than they appear."
tags: ["JavaScript"]
---

If you have heard the term generator before in JavaScript then you have probably been a bit intimidated by the weird looking syntax and complex definitions. I know I was. Luckily, generators are much simpler than they appear.

_If you prefer to learn visually, check out the video version of this article._
`youtube: IJ6EgdiI_wU`

## What Is A Generator?

First we need to start by defining what a generator is. Essentially a generator is just a function that is used to iterate over a series of values. In order to understand this a bit more in depth let's look at the simplest example of a generator.

```js
function* simpleGenerator() {
  yield 1
  yield 2
  yield 3
}
```

In order to understand what this function does we need to talk about the weird syntax. The first weird syntax is the asterisk `*` next to the `function` keyword. This is simply there to tell JavaScript you are creating a generator function. Every generator function will use the `function*` syntax.

The more confusing syntax, though, is the `yield` keyword. This `yield` keyword essentially constitutes a break in the generator. Whenever yield is encountered the generator will stop running and will return the value. You can almost think of the `yield` keyword as a mini `return`. So how do you access the values from the `yield` and how do you tell the generator function to continue on to the next `yield`?

### Generator Object

This is where the generator object comes into play. When you call a generator function it doesn't actually run any of the code in the generator and instead returns a generator object which can be used to run the code in the generator function.

```js
function* simpleGenerator() {
  yield 1
  yield 2
  yield 3
}

const generatorObject = simpleGenerator()
```

With a generator object we have the ability to run the code in the generator step by step from one `yield` to the next `yield` by using the `next` function.

```js
function* simpleGenerator() {
  yield 1
  yield 2
  yield 3
}

const generatorObject = simpleGenerator()
console.log(generatorObject.next())
// { value: 1, done: false }
console.log(generatorObject.next())
// { value: 2, done: false }
console.log(generatorObject.next())
// { value: 3, done: false }
console.log(generatorObject.next())
// { value: undefined, done: true }
```

In the above example you can see we created a generator object and called `next` 4 different times. Each time we called `next` it returned an object that contained a `value` property which is the value passed to the next `yield` as well as a `done` boolean that determined if we were at the end of the generator. In order to further understand the order of operations look at the following code.

```js
function* simpleGenerator() {
  console.log("Before 1")
  yield 1
  console.log("Before 2")
  yield 2
  console.log("End of Generator")
}

const generatorObject = simpleGenerator()
console.log(generatorObject.next().value)
console.log(generatorObject.next().value)

// OUTPUT IN ORDER:
// Before 1
// 1
// Before 2
// 2
```

As you can see when we call `next` the first time it is running the code from the start of the `simpleGenerator` function and stopping at the first `yield` where it returns 1. By calling `next` a second time we run the code from where we left off at the first `yield` all the way to the second `yield` and return 2. Since we never call `next` again the `End of Generator` text is never logged since we are paused at the yield directly before it waiting for `next` to be called again.

## Why Is This Useful?

So now that we understand what a generator function is let's talk about why it is useful.

One of the most obvious use cases is for an ID generator.

```js
function* generateId() {
  let id = 1

  while (true) {
    yield id
    id++
  }
}

const gen = generateId()
console.log(gen.next().value)
// 1
console.log(gen.next().value)
// 2
console.log(gen.next().value)
// 3
```

This generator is essentially an infinite loop that increments an id variable by one every time it is called and will yield the new id.

Another great use case is if you need to do a task and then wait until doing that same task again. I actually ran into this use case when uploading subtitles to my JavaScript Simplified course. I needed to click a button to open a modal where I could drag in my subtitles for the course video, but since there are a lot videos in the course it would take awhile to do manually, so I used a generator instead.

This generator simply looped through a list of the buttons to open the modal (one for each video) and clicked the button for me. I then would drag in the file and close the modal before running the next iteration of the generator which would allow me to manually drag in the next file. This saved me quite a bit of time and is something only possible with generators.

## Weird Generator Things

There are two weird things you can do with a generator object that have very niche use cases.

### Pass A Value To Next

If you need to pass values into a generator you can do so with the `next` function. The value you pass to `next` will be returned from the current `yield` statement.

```js
function* generateId() {
  let id = 1

  while (true) {
    const increment = yield id
    if (increment != null) {
      id = id + increment
    } else {
      id++
    }
  }
}

const gen = generateId()
console.log(gen.next().value)
// 1
console.log(gen.next(3).value)
// 4
console.log(gen.next().value)
// 5
```

We have slightly modified our id generator to allow us to pass a value to the generator to determine how far we increment the next id.

### End A Generator Early

If you ever want to end a generator without actually going through all possible values you can use the `return` function on the generator object.

```js
function* generateId() {
  let id = 1

  while (true) {
    yield id
    id++
  }
}

const gen = generateId()
console.log(gen.next())
// { value: 1, done: false }
console.log(gen.return(10))
// { value: 10, done: true }
console.log(gen.next())
// { value: undefined, done: true }
```

The `return` function will always return what ever you pass to it as the value and it will force every new call to the `next` function to return an undefined value and true value for done as if the generator finished.

## Conclusion

While generators may appear intimidating they actually are not too difficult to understand. They are also incredibly useful in many different scenarios.
