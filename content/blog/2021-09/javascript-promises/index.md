---
title: "The Complete JavaScript Promise Guide"
date: "2021-09-13"
description: "I promise this will be the best guide on promises you ever read."
tags: ['JavaScript']
---

Promises in JavaScript look confusing at first but I promise you by the end of this article you will be a master of promises.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: DHvZLI7Db8E`

## What Is A Promise

A promise in JavaScript is very similar to a promise in real life. Imagine that you loan your friend Jim $100 to buy something. When you loan him the money he promises you that he will pay you back in full after work the next day. You now have Jim's promise that as long as nothing bad happens he will pay you back in the future after he finishes work. If something unexpected happens, though, and Jim breaks his leg at work then of course he will not be able to fulfill his promise and you will not get paid back on time.

This is exactly how promises are handled in JavaScript. A promise is just some set of code that says you are waiting for some action to be taken (Jim finishing work) and then once that action is complete you will get some result (Jim paying you back). Sometimes, though, a promise will be unfulfilled (Jim breaking his leg) and you will not get the result you expect and instead will receive a failure/error.

If you are familiar with callbacks then you may realize that promises solve a similar problem to callbacks, but they do so in a much more elegant way.

## Implementing Promises

Below is an example of how to write the above scenario using callbacks.
```js
function handleJimWork(successCallback, errorCallback) {
   // Slow method that runs in the background
  const success = doJimWork()
  if (success) {
    successCallback()
  } else {
    errorCallback()
  }
}

handleJimWork(() => {
  console.log('Success')
}, () => {
  console.error("Error")
})
```

In this example we have a `handleJimWork` function that takes in a callback for what to do on success and failure. We then run the `doJimWork` function which is a slow function that runs in the background. This would be similar to doing something like a fetch request to get information from a server. Then based upon the result of running this slow background function we get a result of either true or false depending on if Jim was able to successfully get through the work day. Depending on that value we either call the success or error callback. Then when we call `handleJimWork` we pass in both a success and error function which will run depending on the success of `doJimWork`.

Now let's look at how we convert this to use promises.
```js
function handleJimWork() {
  return new Promise((resolve, reject) => {
    // Slow method that runs in the background
    const success = doJimWork()
    if (success) {
      resolve()
    } else {
      reject()
    }
  })
}

const promise = handleJimWork()
promise.then(() => {
  console.log('Success')
}).catch(() => {
  console.error("Error")
})
```
You will immediately notice that the code is very similar, but with one big change. Instead of passing callbacks to `handleJimWork` we instead are using the `reject`, and `resolve` methods of a promise. We are also returning a promise from `handleJimWork` and then when we call `handleJimWork` we are using that promise by calling the `.then` and `.catch` methods on the promise.

First, lets start by breaking down what is happening in `handleJimWork`. If you want to convert a function to use promises you need to always return a promise from that function since you need access to a promise object to check if the promise was successful or not. This is similar to Jim *giving* you his promise that he will pay you back after work. When we create this promise object it takes a function with two parameters: `resolve` and `reject`. These parameters are functions that correlate with a success and failure state.

The `resolve` function is the success function and should be called whenever the promise was successful. This replaces our `successCallback`.

The `reject` function is the error function and should be called whenever the promise was not able to be completed successfully. This replaces our `errorCallback`.

The next big difference in these examples is how we call `handleJimWork`. In the callback version we just passed the callbacks to `handleJimWork`, but in the promise example we don't actually pass any callbacks to `handleJimWork`. Instead we use the promise returned from `handleJimWork` to check for success/failure. On the promise we call `.then` and `.catch` to check for success or failure.

If the promise in `handleJimWork` calls the `resolve` method then all of the code in `.then` is run. This is why we put the successful callback in the `.then`.

If the promise in `handleJimWork` calls the `reject` method then all of the code in `.catch` is run. This is why we put the error callback in the `.catch`.

The best way to think of promises is to just think of `resolve` as the same as `.then` and `reject` as the same as `.catch`. It also helps to think of promises in terms of plain English.

Jim `promises` to go to work and if this `resolves` successfully `then` he will pay us $100. If for some reason the `promise` is `rejected` by Jim not going to work, breaking his leg, or some other reason, then we need to `catch` that failure and be prepared to handle it accordingly.

One last thing to know about `.then` and `.catch` is that you can actually pass a parameter down to each.

```js {6,8,13-17}
function handleJimWork() {
  return new Promise((resolve, reject) => {
    // Slow method that runs in the background
    const success = doJimWork()
    if (success) {
      resolve(100)
    } else {
      reject("Jim broke his leg")
    }
  })
}

handleJimWork().then(amount => {
  console.log(`Jim paid you ${amount} dollars`)
}).catch(reason => {
  console.error(`Error: ${reason}`)
})
```

In the above example I modified our code slightly so that now the `resolve` and `reject` methods are actually called with a parameter. In the case of `resolve` we pass in the amount of money that Jim pays us back and in the `reject` case we pass in the reason why Jim cannot pay us back. Then in `.then` and `.catch` we use the parameters passed to `resolve` and `reject` to give us more detailed information about what happens. You may also notice I simplified our code a bit by not extracting the result of `handleJimWork` into its own `promise` variable. In most cases when you write promises you will just directly chain `.then` and `.catch` onto the end of the function instead of creating a variable to store the promise in.

## Promise Chaining

Just by looking at the above examples promises may not seem that great, but the real power of promises comes in the ability to chain them together which solves the problem of callback hell.
```js
function one(callback) {
  doSomething()
  callback()
}

function two(callback) {
  doSomethingElse()
  callback()
}

function three(callback) {
  doAnotherThing()
  callback()
}

one(() => {
  two(() => {
    three(() => {
      console.log("We did them all")
    })
  })
})
```
In the above example we have three functions that all do something and we need to call them in order so once the first function finishes we call the second and so on. Then finally at the end we log out that they have all three finished. This is a common problem in JavaScript and with callbacks you start to run into a nested mess as you can see. With promises, though, there is no nested mess to worry about since you can chain promises.
```js
function one() {
  return new Promise(resolve => {
    doSomething()
    resolve()
  })
}

function two() {
  return new Promise(resolve => {
    doSomethingElse()
    resolve()
  })
}

function three() {
  return new Promise(resolve => {
    doAnotherThing()
    resolve()
  })
}

one().then(() => {
  return two()
}).then(() => {
  return three()
}).then(() => {
  console.log("We did them all")
})
```
In the above example we converted `one`, `two`, and `three` to promises and then we just chain together each `.then` of the previous promise into the next. That is because if you return a promise from a `.then` or `.catch` that promise will be used with the next `.then` or `.catch` in the chain.

In this example we are calling `one` and in the first `.then` we are calling `two` and returning the promise `two` returns. Since we are returning a promise from a `.then` JavaScript is smart enough to run the code in that promise and once it finishes call the next `.then` in the chain. This is repeated again with `three` and we finally get the log printed at the end. We can even clean this up a bit further.
```js
one()
  .then(two)
  .then(three)
  .then(() => {
    console.log("We did them all")
  })
```
The above code works exactly the same since the functions `two` and `three` return promises when called.

## Advanced Promise Features

So far we have covered just the most basic use cases for promises, but there is much more you can do with promises.

### `.finally`

The `.finally` method works very similar to `.then` and `.catch` in that it is chained onto a promise, but the code in `.finally` will run whether the promise fails or succeeds.
```js {6-8}
handleJimWork()
  .then(amount => {
    console.log(`Jim paid you ${amount} dollars`)
  }).catch(reason => {
    console.error(`Error: ${reason}`)
  }).finally(() => {
    console.log("This always runs")
  })
```
`.finally` is great if you need to do some clean up or you want to do the same thing whether a promise succeeds or fails.

### `Promise.all`

The rest of the methods in this section will all be on the `Promise` object itself. The `Promise.all` method takes an array of promises and will wait for **all** of them to resolve before calling `.then` with the results of **all** the promises. If **any** of the promises reject, though, it will immediately call `.catch` with the error of the failed promise.
```js
function one() {
  return new Promise(resolve => {
    doSomething()
    resolve("From One")
  })
}

function two() {
  return new Promise(resolve => {
    doSomethingElse()
    resolve("From Two")
  })
}

Promise.all([
  one(),
  two()
]).then(messages => {
  console.log(messages)
  // ["From One", "From Two"]
}).catch(error => {
  // First error if any error
})
```

### `Promise.allSettled`

This method is very similar to `Promise.all`. The only difference is that `Promise.allSettled` will wait for **all** promises to succeed and/or fail before calling `.then`. `Promise.allSettled` also never calls `.catch` and instead will tell you if each promise failed or succeeded in the `.then`.
```js
Promise.allSettled([
  one(),
  two()
]).then(messages => {
  console.log(messages)
  /* [
    { status: "fulfilled", value: "From One" },
    { status: "fulfilled", value: "From Two" }
  ] */
})
```

### `Promise.any`

This method takes an array of promise just like the previous methods, but it will only wait for **one** promise to resolve. Once **one** promise in the list is successful it will call `.then` with the result of the **first successful** promise.
```js
Promise.any([
  one(),
  two()
]).then(firstMessage => {
  console.log(firstMessage)
  // Message from whichever resolved first
}).catch(error => {
  // Generic error saying all promises failed
})
```

### `Promise.race`

This method is very similar to `Promise.any`, but it only waits until **one** promise either **fails or succeeds** unlike `Promise.any` which only cares about the first success. `Promise.race` will wait until the **first** promise fails or succeeds and then call `.then` or `.catch` accordingly.
```js
Promise.race([
  one(),
  two()
]).then(firstMessage => {
  console.log(firstMessage)
  // Message from first promise to finish if it was a success
}).catch(firstError => {
  // Message from first promise to finish if it was an error
})
```

### `Promise.resolve`

This method is a shorthand for returning a promise that resolves immediately. This is useful if you need to pass a promise to something but do not already have a promise.
```js
Promise.resolve(200).then(amount => {
  console.log(amount)
  // 200
})
```

### `Promise.reject`

This method is the same as `Promise.resolve`, but for returning a failing promise.
```js
Promise.reject("Error").catch(message => {
  console.error("Error")
  // Error
})
```

## Conclusion

Promises are incredibly versatile and much easier to work with then callbacks. This is why any time I need to deal with async code I always reach for a promise over a callback.