---
layout: "@layouts/BlogPost.astro"
title: "How To Create Custom JavaScript Events"
date: "2022-04-11"
description: "Custom events in JavaScript make handling things like double click, long press, and touch gestures much easier, but they can also be used for cross app communication."
tags: ["JavaScript"]
---

By this point I am sure you have created hundreds of event listeners to listen for things like click events and form submissions. This is great for many use cases, but sometimes you need to create your own custom events to handle more complex interactions. In this short article I will show you everything you need to know about creating custom events, listening to custom events, and a real world example of a double click custom event.

## How To Create Custom Events

Creating a custom event in JavaScript may sound pretty difficult, but it is actually just one simple line of code.

```js
const myEvent = new Event("myCustomEvent")
```

You can just create a new `Event` object by using the Event constructor and in the most basic form all you need to do is pass a single string to the constructor which is the name of your event. In order to listen to that event you can just add an event listener to whatever element you want to listen to the event on.

```js
document.addEventListener("myCustomEvent", e => {
  console.log(e)
})
```

Finally, the last step you need to take is to actually trigger the event that you created and are listening to.

```js
document.dispatchEvent(myEvent)
```

This is where the `dispatchEvent` function comes in. Every element has this function and all you need to pass it is the event object you created with `new Event`.

If we combine all this together we will get a basic event that is triggered on our document and the content of the event will be printed out.

```js {2,13-15}
{
  isTrusted: false
  bubbles: false
  cancelBubble: false
  cancelable: false
  composed: false
  currentTarget: null
  defaultPrevented: false
  eventPhase: 0
  path: [document, window]
  returnValue: true
  srcElement: document
  target: document
  timeStamp: 54.69999998807907
  type: "myCustomEvent"
}
```

This is the most basic form of an event object. It contains a bunch of information but the most important sections are highlighted.

The `isTrusted` property just refers to whether or not this event was triggered by user interaction or by custom JavaScript code. For example when a user clicks on a button the event will have `isTrusted` set to true, while our custom event has `isTrusted` set to false since the event was triggered by JavaScript.

The `target` is just the element that `dispatchEvent` was called on.

The `timeStamp` is how long it has been since the page loaded when the event occurred.

The `type` is just the name of the event.

### Event Customization

You may notice at the top of the event details there are properties for `bubbles`, `cancelable`, and `composed`. These are actually options we can configure when we create our custom events.

```js
const myEvent = new Event("myCustomEvent", {
  bubbles: true,
  cancelable: true,
  composed: true,
})
```

#### `bubbles`

The `bubbles` property determines if the event should bubble up through the HTML when it is triggered. By default this value is false which means the event will not propagate up the tree, but if we want the event to be called on each parent of the HTML element then we can set this to true.

```js
const bubbleEvent = new Event("bubbleEvent", { bubbles: true })
const defaultEvent = new Event("defaultEvent", { bubbles: false })

document.addEventListener("bubbleEvent", () => {
  // This will get called since the event will bubble up to the document from the button
  console.log("Bubble")
})

document.addEventListener("defaultEvent", () => {
  // This never gets called since the event cannot bubble up to the document from the button
  console.log("Default")
})

const button = document.querySelector("button")
button.dispatchEvent(bubbleEvent)
button.dispatchEvent(defaultEvent)
```

#### `cancelable`

The `cancelable` property determines if the event can be canceled by calling `e.preventDefault()`. By default this is set to false. If this property is true, when you call `e.preventDefault()` it will set the `defaultPrevented` property of our event to true.

```js
const cancelableEvent = new Event("cancelableEvent", { cancelable: true })
const defaultEvent = new Event("defaultEvent", { cancelable: false })

document.addEventListener("cancelableEvent", e => {
  e.preventDefault()
  console.log(e.defaultPrevented) // True
})

document.addEventListener("defaultEvent", e => {
  e.preventDefault()
  console.log(e.defaultPrevented) // False
})

document.dispatchEvent(cancelableEvent)
document.dispatchEvent(defaultEvent)
```

#### `composed`

The `composed` property determines if the event can propagate up through the shadow DOM. By default this is set to false. This property is really only applicable if you are working with custom HTML elements and the shadow DOM and all it does is allow events to propagate outside the shadow DOM. If you want to ensure an event triggered in your shadow DOM can be caught outside the shadow DOM set this to true.

### Passing Custom Data To Events

Now generally when you are working with custom events you want to be able to pass some form of custom data to your events. With the normal `new Event` constructor this is not possible which is why there is a second way to create custom events.

```js
const myEvent = new CustomEvent("myEvent", { detail: { hello: "World" } })
```

The `CustomEvent` constructor can be used instead. This works exactly the same as `new Event`, but you can also pass a `detail` property to the second argument alongside the `bubbles`, `cancelable`, and `composed` properties. This `detail` property can be set to anything you want and whatever you pass inside the `detail` property will be passed to the event listener.

```js
const myEvent = new CustomEvent("myEvent", { detail: { hello: "World" } })

document.addEventListener("myEvent", e => {
  console.log(e.detail) // { hello: "World" }
})

document.dispatchEvent(myEvent)
```

## Naming Conventions

Before we move onto the real world example of a double click event I want to cover custom event naming conventions. You can name your custom events anything you want, but it is important to consider following a naming convention to make it easier to work with your code. The most common naming convention for custom events is to prefix the name with `custom:` or the name of your current project.

This is a good idea since it not only makes it easy to tell which events are custom events vs built in events since they all start with `custom:`, but it also ensures your code will not break if JavaScript adds a new event with the same name as your event. For example, if JavaScript adds an event called `doubleclick` and you used the name `doubleclick` for your custom event you would run into issues since your custom code will trigger the event and the browser will also try to trigger its own copy of the event.

```js
// Always use some form of naming convention
const myEvent = new Event("custom:doubleClick")
```

## Double Click Example

For this example we will create a double click event that will fire whenever you click twice on an element within a short period of time. It will also pass along the total amount of time between your button clicks as custom data.

To get started we need to create a normal click event listener to determine if there has been a double click or not.

```js
const button = document.querySelector("button")

const MAX_DOUBLE_CLICK_TIME = 500
let lastClick = 0
button.addEventListener("click", e => {
  const timeBetweenClicks = e.timeStamp - lastClick
  if (timeBetweenClicks > MAX_DOUBLE_CLICK_TIME) {
    lastClick = e.timeStamp
    return
  }

  // TODO: Double click happened. Trigger custom event.
  lastClick = 0
})
```

The above code uses the `timeStamp` property to determine the time between click events on our button and if there are more than 500 milliseconds between clicks it will return immediately and update the `lastClick` value. Once we have two clicks that are within 500 milliseconds we continue past the if check and are able to trigger our double click event. To do this we need to create our event and dispatch it.

```js {12-18}
const button = document.querySelector("button")

const MAX_DOUBLE_CLICK_TIME = 500
let lastClick = 0
button.addEventListener("click", e => {
  const timeBetweenClicks = e.timeStamp - lastClick
  if (timeBetweenClicks > MAX_DOUBLE_CLICK_TIME) {
    lastClick = e.timeStamp
    return
  }

  const doubleClickEvent = new CustomEvent("custom:doubleClick", {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: { timeBetweenClicks },
  })
  e.target.dispatchEvent(doubleClickEvent)
  lastClick = 0
})
```

For our custom event we are setting all the options to true since a click event by default has all these properties set to true and we want our double click to behave similar to a normal click. We are also passing the `timeBetweenClicks` to our `detail` option. Lastly, we are dispatching the event on the target of the event which in our case is the button element. The final thing we have left to do is listen for the event.

```js {3-5}
const button = document.querySelector("button")

button.addEventListener("custom:doubleClick", e => {
  console.log("Double Click", e.detail.timeBetweenClicks)
})

const MAX_DOUBLE_CLICK_TIME = 500
let lastClick = 0
button.addEventListener("click", e => {
  const timeBetweenClicks = e.timeStamp - lastClick
  if (timeBetweenClicks > MAX_DOUBLE_CLICK_TIME) {
    lastClick = e.timeStamp
    return
  }

  const doubleClickEvent = new CustomEvent("custom:doubleClick", {
    bubbles: true,
    cancelable: true,
    composed: true,
    detail: {
      timeBetweenClicks,
    },
  })
  e.target.dispatchEvent(doubleClickEvent)
  lastClick = 0
})
```

We just added a simple event listener to the button that will log out the text `Double Click` and how long it was between our two clicks.

## Conclusion

Custom events are a great way in JavaScript to handle things like gestures and double clicking, and best of all they are incredibly easy to implement and use.
