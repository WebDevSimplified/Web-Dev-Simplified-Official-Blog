---
title: "How To Implement Debounce And Throttle In JavaScript"
date: "2022-03-28"
description: "Debounce and throttle are two of the best ways to improve the performance of your site and in this article I talk all about how to implement both options and what they do."
tags: ['JavaScript']
---

At some point you have probably come across a website that uses an autocomplete text box, drag and drop, or scroll based animations. If you have then chances are also pretty high that you have encountered debouncing and/or throttling without even realizing it. In order to ensure things like autocomplete are performant you need to implement it using debounce and/or throttling.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: cjIswDCKgu0`

## Why Do You Need Debounce/Throttle?

Earlier I mentioned that debounce/throttle can improve the performance of your site. The way this is done is by reducing the number of times a particular action is taken. Let's look at an example of a naive approach to an autocomplete text box that fetches its autocomplete options from an API.
```js
input.addEventListener("input", e => {
  fetch(`/api/getOptions?query=${e.target.value}`)
    .then(res => res.json())
    .then(data => setOptions(data))
})
```
*If you are unfamiliar with the fetch API then you should checkout my [ultimate fetch guide](/2022-01/js-fetch-api)*

This event listener runs every single time the text in the text box changes and in the function we are just querying an API to get a list of potential options based on the current text in the text box. This may seem fine, but what happens when the user types `Samantha` into the text box.

Well as soon as the user types `S` our event listener will get called and get all options that have an `S` in them. While that fetch request is happening the user will type `Sa` and our event listener will trigger again. We will send out a new fetch request for options that have `Sa` in them. This will continue triggering our event listener and sending out a new fetch request for every letter we type.

This leads to a total of 8 fetch requests in a very short period of time and we only really care about the last fetch call. That means we wasted resources calling our API 7 times that we didn't need to. This costs you more money since your server has to handle those requests, but it also could cost your user time/money since they need to download the results of 7 API requests they don't care about which could eat into their data limit or cause the UI to feel incredibly slow if they have a slow connection.

In order to fix this we need a way to limit the number of requests we make which is where debounce and throttle come in.

## Debounce

First I want to talk about debounce since debounce is the ideal solution for things like autocomplete text boxes. Debouncing works by delaying our function call by a set period of time. If nothing happens during that time then the function will run just like normal, but if something happens that causes the function to be called again during the delay then the delay will be restarted. This means a debounced function will only run once after a certain delay since the last time it was triggered.

In our example, if we assume a delay of 1 second, that means our fetch request will only be called when the user has stopped typing for a total of 1 second. If they type the entirety of `Samantha` without spending 1 second between key presses it will only call our API once with the value of `Samantha`. Let's take a look at how to implement debouncing.
```js
function debounce(cb, delay = 250) {
  let timeout

  return (...args) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      cb(...args)
    }, delay)
  }
}
```
This debounce function takes in a callback function, `cb`, as the first parameter and a delay as the second parameter. We are then returning a new function at the end of the debounce function which acts as a wrapper for our callback. This wrapper will ensure that the callback is only called after the delay that is passed into the debounce function. Lastly, we clear any existing timeout every time we call debounce which ensures that if we call debounce before the delay has finished then it will restart the timer.

This means that if our user types one character every 300 milliseconds and our delay is set to 1 second our debounce function will work like this.
```js
// Type S - Start timer
// Type a - Restart timer
// Type m - Restart timer
// Type a - Restart timer
// Type n - Restart timer
// Wait 1 second
// Call debounced function with Saman
// Type t - Start timer
// No more typing
// Call debounced function with Samant
```
You will notice that even though typing `Saman` takes more than 1 second our debounced function is not called until 1 second after typing the n since the debounced function will never be called until there is at least a 1 second delay since the last trigger. Now let's look at how we implement this.
```js
const updateOptions = debounce(query => {
  fetch(`/api/getOptions?query=${query}`)
    .then(res => res.json())
    .then(data => setOptions(data))
}, 1000)

input.addEventListener("input", e => {
  updateOptions(e.target.value)
)}
```
All we have done is move the fetch request logic into the callback of the debounce function. This debounce function then returns a new function which we use in place of where our update code used to be. This newly returned function will take care of all the timing for us which means that our options will now only be updated after a 1 second pause in the user typing.

Debouncing is perfect for autocomplete but is also useful anywhere that you want to group multiple triggers into one trigger such as limiting infinite loading as to not overwhelm your servers.

## Throttle

Like debounce, throttle is also used to limit the number of times a function is called, but, unlike debounce, throttle will call the function passed to it every time the delay ends as long as the trigger for the function is still happening. For example, if our delay is set to 1 second then our throttled function will execute immediately when it is called and then at most once per second while the user is actively typing. Let's take a look at an implementation to understand what is going on.
```js
function throttle(cb, delay = 250) {
  let shouldWait = false

  return (...args) => {
    if (shouldWait) return

    cb(...args)
    shouldWait = true
    setTimeout(() => {
      shouldWait = false
    }, delay)
  }
}
```
Debounce and throttle both take the same arguments, but the main difference you can see in throttle vs debounce is that our callback is invoked immediately and not inside the timeout. The only thing the timeout does is set the `shouldWait` variable to false. When we first call toggle it will run our callback and set `shouldWait` to true. If throttle is called again during the delay it will do nothing thanks to the if check at the top of the function. Once the delay is over `shouldWait` will be set to false which means if throttle is called again it will run.

This means if our user types one character every 300 milliseconds and our delay is 1 second our throttle function will work like this.
```js
// Type S - Call throttled function with S
// Type a - Do nothing: 700ms left to wait
// Type m - Do nothing: 400ms left to wait
// Type a - Do nothing: 100ms left to wait
// Delay is over - Nothing happens
// Type n - Call throttled function with Saman
// No more typing
// Delay is over - Nothing happens
```
If you pay close attention you will notice that our second call to the throttled function doesn't run until 1,200 milliseconds later. That is 200 milliseconds after our delay. Now depending on your throttle needs this may be fine, but in most cases you want to queue up any action that occurs in your throttle so that as soon as your delay is over it will call the previous iteration of the function. Let's look at how to implement that.
```js
function throttle(cb, delay = 1000) {
  let shouldWait = false
  let waitingArgs
  const timeoutFunc = () => {
    if (waitingArgs == null) {
      shouldWait = false
    } else {
      cb(...waitingArgs)
      waitingArgs = null
      setTimeout(timeoutFunc, delay)
    }
  }

  return (...args) => {
    if (shouldWait) {
      waitingArgs = args
      return
    }

    cb(...args)
    shouldWait = true
    setTimeout(timeoutFunc, delay)
  }
}
```
Already the code looks much more intimidating, but the core logic is the same. The only difference is we are now storing the previous `args` in a variable called `waitingArgs` if throttle is called during the delay. Then when our delay ends we check to see if we have any `waitingArgs`. If we do not we just do everything as normal and set `shouldWait` to false so we can wait for the next trigger. If we do have `waitingArgs`, though, that means we called throttle during the delay and we want to trigger our function with those `waitingArgs` and then reset our timer.

Here is what this version of throttle will look like given the same 1 second delay and 300 millisecond typing speed.
```js
// Type S - Call throttled function with S
// Type a - Save Sa to waiting args: 700ms left to wait
// Type m - Save Sam to waiting args: 400ms left to wait
// Type a - Save Sama to waiting args: 100ms left to wait
// Delay is over - Call throttled function with Sama
// Type n - Save Saman to waiting args: 700ms left to wait
// No more typing
// Delay is over - Call throttled function with Saman
```
As you can see each time we trigger our function we are either calling the throttled function if our delay is over or we are saving the arguments to be used at the end of our delay. When the delay is over we then call our throttled function with those arguments if any are saved. This ensures the throttled function will always get the most up to date arguments at the end of the delay.

Let's look at how to implement this into our example.
```js
const updateOptions = throttle(query => {
  fetch(`/api/getOptions?query=${query}`)
    .then(res => res.json())
    .then(data => setOptions(data))
}, 500)

input.addEventListener("input", e => {
  updateOptions(e.target.value)
)}
```
You will notice the implementation is exactly the same as debounce, except we call the throttle function instead of debounce.

Now autocomplete text boxes are not really the best use case for throttling, but when you are dealing with things like resizing elements, drag and drop, scrolling, or other events that occur many times and you want to get updated on their values periodically then throttle is ideal. The reason throttle is ideal for these scenarios is that every time the delay ends you will get updated information on the event while debounce needs to wait for a delay between inputs in order to trigger. Essentially, throttle is ideal when you want to group multiple events into one event on a periodic basis.

If we think about this in the example of resizing an element with a delay of 250 milliseconds, throttle will get the element's size every 250 milliseconds while debounce will only get the element's size when it has been 250 milliseconds since the resize has finished.

## Conclusion

Anytime you are dealing with groups of events that you want to group together debounce and throttle are perfect. They save you money on server costs, save your users money on data costs, and overall make your app more performant.