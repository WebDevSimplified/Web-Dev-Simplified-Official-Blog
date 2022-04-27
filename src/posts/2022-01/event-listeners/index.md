---
title: "JavaScript Event Listeners Ultimate Guide"
date: "2022-01-03"
description: "Event listeners appear simple at first, but they have an incredible level of depth that most people completely ignore. This article will cover everything you need to know about event listeners so you can avoid bugs and write better code for your projects."
tags: ['JavaScript']
---

Whether you are completely new to JavaScript or have been programming for decades you will need to use event listeners with pretty much any project you create. These event listeners seem simple at first, but there are tons of lesser known features of event listeners like bubbling, capture, delegation, and more. Understanding these features is crucial to becoming an expert JavaScript developer so no matter where you are on your programming journey this article will have something for you.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: XF1_MlZ5l6M`

## Event Listener Basics

Now if you already understand how to create an event listener you can skip this section as it will only cover the most basic features of defining event listeners.

An event listener in JavaScript is a way that you can wait for user interaction like a click or keypress and then run some code whenever that action happens. One common use case for event listeners is listening for click events on a button.
```js
const button = document.querySelector("button")
button.addEventListener("click", e => {
  console.log(e)
})
```
To set up an event listener you just need to have a variable that references an element and then call the `addEventListener` function on that element. This function takes a minimum of two parameters.

The first parameter is just a string which is the name of the event to listen to. There are hundreds of events that you can listen to such as `click`, `input`, and `mousemove`. [This is a complete list of events](https://developer.mozilla.org/en-US/docs/Web/Events), but you will really only use a handful of these events so don't bother memorizing them all.

The second parameter is a function that has one single argument which is the event argument, commonly called `e`. This function is called every time the event occurs and the event object contains information about the event. Depending on what event you listen for the event object will have different properties that are important, but pretty much every event will have a `target` property. This property represents the element the event is occurring on which is important for more advanced uses of event listeners that we will cover later in this article.

It is also important to note that if you have multiple event listeners on an element for the same event they will all fire in the order they were added to the element.
```js
button.addEventListener("click", e => {
  console.log("This runs first")
})

button.addEventListener("click", e => {
  console.log("This runs second")
})
```

## Event Propagation

Now you can get pretty far with just basic event listeners, but when you start to create more advanced projects you will need to understand how these events are triggered and how they propagate through the DOM. This is where the bubble and capture phases come in.

Imagine we have the following HTML and JavaScript.
```html
<div class="parent">
  <div class="child"></div>
</div>
```
```js
parent.addEventListener("click", () => {
  console.log("Parent")
})

child.addEventListener("click", () => {
  console.log("Child")
})
```
If we click inside of the child element you probably think it will log `Child`, but in actuality it will log both `Child` and `Parent` in that order. The reason for this is bubbling. 

### Bubble Phase

When an event is triggered on an element it will bubble that event up the document tree to all the elements the element is inside of. In our example when the child is clicked it will also trigger a click event listener on the parent element since the child is inside the parent element. This even goes one step further and triggers a click event listener on the document itself as well. We will take advantage of this fact when we deal with event delegation.

### Capture Phase

Now everything I explained above has to do with the bubble phase which is the default phase where event listeners fire, but events also have another phase called the capture phase which happens first. The capture phase is just like the bubble phase but the event starts at the top level element, in our case the document, and works its way inward. This means in our example if we click on the child element we will trigger a capture event listener for the document, then the parent, then the child. We will then enter the bubble phase and trigger bubble event listeners for the child, then the parent, then the document.

So far we have only covered how to setup event listeners for the bubble phase, but if you want to have a capture event listener you need to use the third parameter of the `addEventListener` function. This third parameter is an options object that has a `capture` property which when set to true will label this event as a capture event.
```js
parent.addEventListener("click", () => {
  console.log("Parent Bubble")
})

parent.addEventListener("click", () => {
  console.log("Parent Capture")
}, { capture: true })

child.addEventListener("click", () => {
  console.log("Child Bubble")
})

child.addEventListener("click", () => {
  console.log("Child Capture")
}, { capture: true })
```
With the above code if we click on the child it will log out the following.
```
Parent Capture
Child Capture
Child Bubble
Parent Bubble
```
As you can see all the capture event listeners we created fire first and then the bubble event listeners fire next.

### Stopping Event Propagation

It may seem strange to have these two phases of events but the reason for this is so that you can respond to events in the order you need. One common use case for using a capture event is to catch an event before it gets to the children and actually stop it.
```js
parent.addEventListener("click", e => {
  console.log("Parent Capture")
  e.stopPropagation()
}, { capture: true })

child.addEventListener("click", () => {
  console.log("Child Bubble")
})
```
By using the `stopPropagation` method on the event object we are able to stop the event from continuing its capturing and bubbling which means if there are any other event listeners in the chain that would fire they do not. In the above example only `Parent Capture` will be logged since we stop the event from propagating after the parent capture event listener.

Another method, `stopImmediatePropagation` is available on the event object and this works a bit differently. If you use the `stopImmediatePropagation` then the event will not only stop propagation to the child/parent elements through the bubble and capture phases, but it will also stop other events on the element from triggering as well.
```js
parent.addEventListener("click", e => {
  console.log("Parent Capture 1")
  e.stopImmediatePropagation()
}, { capture: true })

parent.addEventListener("click", e => {
  console.log("Parent Capture 2")
}, { capture: true })

child.addEventListener("click", () => {
  console.log("Child Bubble")
})
```
In the above example we stopped propagation in the first parent capture event listener which prevents the event from propagating to the other elements through the capture/bubble phases. Also, since we used `stopImmediatePropagation` all other click event listeners on the parent element will not trigger as well. It is important to note that the event listeners on the same element will trigger in the order they are defined so if you want to stop other event listeners from firing with this method they must be defined after the listener that stops propagation.

### Important Notes About Bubbling

One important thing to know about event bubbling is that not all events bubble up. Events like the `focus` event which fire when an element receives focus do not bubble up. Generally events that do not bubble make sense not to bubble since they only pertain to the individual element the event fires on such as the `focus` event.

## Removing Event Listeners

It is great to know how to add an event listener but eventually you will need to remove the listeners you add. The easiest way to do this is with the `removeEventListener` function, but there are also two more advanced ways to do so that we will talk about as well.

### `removeEventListener`

The `removeEventListener` function is a simple function that you can call on an element to remove an event listener that was previously added with `addEventListener`.
```js
button.addEventListener("click", sayHi)
button.removeEventListener("click", sayHi)

function sayHi() {
  console.log("Hi")
}
```
The above code adds a listener on click that calls the `sayHi` function and then immediately removes it. It is important to note that when adding/removing event listeners you need to make sure the function is exactly the same. If I were instead to write my code as the following it would not actually remove the event listener since these are two different functions even though they contain the same code.
```js
button.addEventListener("click", () => {
  console.log("Hi")
})

button.removeEventListener("click", () => {
  console.log("Hi")
})
```
*If you are unfamiliar with why this is you should check out my [complete reference vs value guide](/2021-03/js-reference-vs-value) which explains this exact concept.*

### Running Events Once

It is common practice to need to run an event only one time and doing so with `removeEventListener` is a bit of a pain and not always accurate. This is why the third options parameter to `addEventListener` has a property called `once` that when set to true will ensure your event listener only runs one time.
```js
button.addEventListener("click", () => {
  console.log("Clicked")
}, { once: true })
```
No matter how many times I click the above button it will only log `Clicked` one time since the event listener automatically removes itself after running once.

### Abortable Event Listeners

The final way to remove an event listener is the least common method, but can be incredibly useful. This technique involves using an `AbortController`. If you wanted to create an event listener that works until a certain condition is met this may be the perfect option for you.
```js
let count = 0
const controller = new AbortController()

button.addEventListener("click", () => {
  count++
  console.log(count)
  if (count >= 3) {
    controller.abort()
  }
}, { signal: controller.signal })
```
The above code looks a bit confusing, but I will try to explain what is going on. First we are creating a new `AbortController`. We then take that `AbortController` and pass the `signal` property of it to the `signal` property of the options object for our `addEventListener` function. This connects our event listener to that `AbortController` so if we abort it will remove the event listener. Then finally in our code we are calling the `abort` method on our `AbortController` when the count is greater than or equal to 3 which will remove the event listener.

Essentially, the way an `AbortController` works is you pass the signal portion to the `addEventListener` function and then at anytime in the future you can call `abort` on the `AbortController` and it will remove the event listener for you.

## Event Delegation

All of the concepts we have covered so far have led up to the final topic of this article which is about event delegation. In my opinion understanding how this works is the most important concept in this article.
```js
const buttons = document.querySelectorAll("button")
buttons.forEach(button => {
  button.addEventListener("click", () => {
    console.log("Clicked Button")
  })
})

const newButton = document.createElement("button")
document.body.append(newButton)
```
In the above code we are selecting all the buttons on our page and adding an event listener to listen for a click on those buttons. Then after all that we are adding a brand new button to the page. This new button does **NOT** have any click event listener attached to it since it was added to the page after our event listeners were added.

This is a common mistake new developer make since they think this new button will have the event listener but since it was added after the event listener was added it does not. In order to get around this issue you either need to manually add the event listener to your new elements each time they are created or you need to use event delegation.

With event delegation you set up your event listener on a parent element, such as the document, and then inside that parent element you check to see if the event was fired by the elements you care about before running your event code.
```js
document.addEventListener("click", e => {
  if (e.target.matches("button")) {
    console.log("Clicked Button")
  }
})

const newButton = document.createElement("button")
document.body.append(newButton)
```
Since the click event bubbles up to the parent elements we know that eventually any click event on our page will make it to the document. We are then checking in the document to see if the target of the event matches the selector `button`. This selector we pass to `matches` is just a CSS selector similar to what you pass to `querySelector`.

By writing our code like this we ensure that any button on our page, even newly added buttons, will work properly when clicked. If we click on something that is not a button, though, the `e.target.matches` code will return false which means nothing will be logged.

Essentially, anytime you are dealing with adding elements to a page dynamically it pays to write an event listener on the parent to delegate that event when the correct criteria is met. This is actually such a common use case I have a simple helper function I use to do this.
```js
function addGlobalEventListener(type, selector, callback, options) {
  document.addEventListener(type, e => {
    if (e.target.matches(selector)) callback(e)
  }, options)
}

addGlobalEventListener("click", ".btn", () => {
  console.log("Clicked Button")
}, { once: true })
```

## Conclusion

While event listeners may seem simple on the surface, there is actually a surprising amount of depth to them. Understanding this depth will elevate your programming skills to the next level.