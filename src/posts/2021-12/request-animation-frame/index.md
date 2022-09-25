---
setup: import LeftBox from "/src/blogComponents/requestAnimationFrame/LeftBox.jsx"
title: "Stop Using setInterval. Use requestAnimationFrame"
date: "2021-12-13"
description: "requestAnimationFrame is the best way in JavaScript to play smooth and efficient animations and in this article I will show you exactly how to use requestAnimationFrame."
tags: ['JavaScript']
---

If you have searched the web for JavaScript animation tutorials then you have probably come across something like this.
```js
setInterval(() => {
  playAnimation()
}, 10)
```
This is bad. `setInterval` has tons of issues when used in this way which cause huge performance problems on top of ruining your animation. Instead you should use `requestAnimationFrame` which is what this article is all about.

## What Is `requestAnimationFrame`?

`requestAnimationFrame` is a method in JavaScript that takes one single argument which is a function to run. That function you pass to `requestAnimationFrame` will run as soon as the browser is ready to repaint the screen. When this function runs will change depending on the CPU power of the computer running the code, the refresh rate of the monitor the browser is on, along with some other factors which ensure the animation will be as smooth as possible without consuming too many resources.

Let's take a quick look at an example of how to use this method.
```js
function playAnimation(time) {
  console.log(time)
  // 3108.748
}
window.requestAnimationFrame(playAnimation)
```
If you run this code in your browser you will see that the console logs out a number. This number is the number of milliseconds since your page started, but you will also notice that it only logs out this value once. The reason for this is because you must re-call `requestAnimationFrame` inside your function to queue up the next time the function will be called. Unlike `setInterval`, `requestAnimationFrame` will only continue to call the same function if you tell it to.
```js
function playAnimation(time) {
  window.requestAnimationFrame(playAnimation)
}
window.requestAnimationFrame(playAnimation)
```
With the above code we have essentially created the equivalent of `setInterval` since our `playAnimation` function will run and then once the browser is ready to paint again it will call the `playAnimation` function again.

This alone is already more performant than `setInterval` since `requestAnimationFrame` will wait until the browser is ready to paint instead of just running the function even if the browser isn't ready.

## How To Use `requestAnimationFrame`

Another reason `requestAnimationFrame` is so useful is the fact that it gives you a time variable which you can use to calculate the amount of time between frames. This is not something that `setInterval` will do and since `setInterval` is not 100% accurate it is very possible your animation will get messed up over time. Let's look at how we can use that time value.
```js
let lastTime
function playAnimation(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    console.log(delta)
    // 6.9998
  }

  lastTime = time
  window.requestAnimationFrame(playAnimation)
}
window.requestAnimationFrame(playAnimation)
```
In the above code we have a variable called `lastTime` which has no value to start. Then in our `playAnimation` function we are checking to see if we have a `lastTime` value before we try to use it to create our `delta`. We also are setting our `lastTime` variable to the current time and queuing up our next animation.

The important thing to note about this function is we are essentially skipping the first time we call the function since we have no `lastTime` to work with. This is important since the time returned by `requestAnimationFrame` is the time since our app started and is pretty much useless on its own. We need to know how much time has passed since our last call to the function so we know how far to update our animation. This is where the `delta` variable comes in. This variable just tells us how much time has passed between calls of the `playAnimation` function and will mostly be stable. Sometimes this value could fluctuate if your CPU is overwhelmed or if your monitor refresh rate changes, but it doesn't matter if the value changes since our animation will take that into account.

Now let's finally put all this together into a working animation.
```js
const box = document.querySelector(".box")
let lastTime
function playAnimation(time) {
  if (lastTime != null) {
    const delta = time - lastTime
    box.style.left = `${parseFloat(box.style.left) + delta * .1}%`

    if (parseFloat(box.style.left) >= 100) {
      box.style.left = 0
    }
  }

  lastTime = time
  window.requestAnimationFrame(playAnimation)
}
window.requestAnimationFrame(playAnimation)
```
<LeftBox client:visible />

The code probably looks a bit confusing so I will explain it the best I can. Inside our if statement we are taking the current left position of our box which is a percentage from 0 to 100. We are then adding to that value our delta multiplied by .1 before converting back to a percentage value to be used in CSS. What this essentially is saying is every 10ms we should increase the left position of our box by 1%. The reason this works as it does is because our `time` and `lastTime` variables are in milliseconds so the `delta` is just the number of milliseconds since the last time we called this function.

The final part of our function is the second if statement which just checks if our box has moved so far to the right that it is outside its parent element. Once that happens we reset the left position back to 0.

## Conclusion

`requestAnimationFrame` is a bit trickier to get working then `setInterval`, but it is so much more performant and accurate that the small amount of extra effort is worth it. If you want to see some more complex examples of `requestAnimationFrame` in use you should check out some of my JavaScript game dev videos linked below.

`youtube: 47eXVRJKdkU`
`youtube: PeY6lXPrPaA`
`youtube: Jgst0rihJ3o`