---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "JavaScript Resize Observer Ultimate Guide"
date: "2022-01-31"
description: "Detecting element size changes is something that is normally difficult to do, but with resize observer it is incredibly easy."
tags: ['JavaScript']
---

Resize Observer is one of 3 observer based JavaScript APIs with the other two being Intersection Observer and Mutation Observer. While I do not think Resize Observer is as useful as something like Intersection Observer it is still useful to know. Right now Resize Observer is the only way to detect element size changes and makes changing content/styles on a page based on resizing so much easier.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: M2c37drnnOA`

## Your First Resize Observer

Creating a Resize Observer is actually quite simple since all you need to do is pass a function to the `ResizeObserver` constructor.
```js
const observer = new ResizeObserver(entries => {
  console.log(entries)
})
```
In the above example we created a brand new Resize Observer and in the function we passed to it we are just logging out the `entries` parameter. This `entries` parameter is the only argument that the function accepts and it just outputs the information related to each element when it changes size. That may sound confusing but let's take a look at a simple example.
```js {2-5,8}
const observer = new ResizeObserver(entries => {
  entries.forEach(entry => {
    const isSmall = entry.contentRect.width < 150
    entry.target.style.backgroundColor = isSmall ? "blue" : "orange"
  })
})

observer.observe(document.getElementById("test"))
```
In the above code we are calling the `observe` method on our Resize Observer and telling it to observe size changes for the element with the id test. These size changes can occur in many ways such as the window size changing, elements being added/removed from the page, user interaction, and much more. Essentially, any time an element you are observing changes size it will trigger the function passed to `ResizeObserver`.

In our code we are looping through all the elements in the `entries` array. This array just lists all the elements we are observing that have had their size change. We are then looping through those entries and for each one we are checking the `contentRect` property. This property contains information such as the width, height, top, left, bottom, right, etc. of our element. Finally, we are using the `target` property of our entry to get the current element that is being observed and changing its background to the appropriate color.

## Resize Observer Options

Unlike the other observer APIs, Resize Observer has very limited options you can configure. There is actually only one option you can configure which is the box model that is used to determine resize changes. This option is passed as a second parameter to the `observe` function.

### Box

The `box` property allows you to change which box model is used to determine size changes. By default the `content-box` is used, but you can also use the `border-box`, and the `device-pixel-content-box`. The `border-box` option takes into account things like border and padding changes, while the `content-box` only includes the actual content of the element. The `device-pixel-content-box` is similar to the `content-box` option but it takes into account the actual pixel size of the device it is rendering too. This means that the `device-pixel-content-box` will change at a different rate than the `content-box` depending on the pixel density of the device.
```js {3}
const observer = new ResizeObserver(changeColor)

observer.observe(document.getElementById("test"), { box: "border-box" })
```

## Resize Observer Entry

The entries array in the Resize Observer callback contains lots of useful information about the element. The most important properties are the `target` and `contentRect` since they tell you the majority of the information you need to know about which element is resizing and what its new size is. There are also 3 additional properties that all provide additional information about the width/height of the element.

These properties are `borderBoxSize`, `contentBoxSize`, and `devicePixelContentBoxSize`, and they perfectly line up with the 3 different box model types discussed earlier. Each of these properties will be an array that will almost always contain just one value which is an object with a `blockSize` and `inlineSize` property. The `blockSize` property defines the height of the element while the `inlineSize` defines the width. If the writing mode of your document is vertical, though, the `blockSize` will define the width while the `inlineSize` will define the height. Each of these values will be calculated for the box size specified by the property being accessed.

```js {3-5}
const observer = new ResizeObserver(entries => {
  entries.forEach(entry => {
    console.log(entry.borderBoxSize[0].blockSize)
    console.log(entry.contentBoxSize[0].blockSize)
    console.log(entry.devicePixelContentBoxSize[0].blockSize)
  })
}))

observer.observe(document.getElementById("test"))
```

## Advanced Resize Observer

This covers all the basic use cases and options for Resize Observers, but there are a few additional things you should know.

### Second Callback Parameter

The callback you pass to new Resize Observers actually has two parameters. The first parameter is the `entries` parameter we have talked a bunch about. The second parameter is simply the observer that is observing the changes.
```js {2}
const observer = new ResizeObserver((entries, o) => {
  console.log(o === observer)
  // True
})
```
This parameter is useful when you need to do something with the observer from within the callback since you may not always have access to the observer variable from the callback depending on where the callback is defined.

### Unobserve and Disconnect

It is important to stop observing elements when they no longer need to be observed, such as after they are removed from the page in order to avoid memory leaks or performance issues. This can be done with the `unobserve` method or the `disconnect` method which are both methods on the Resize Observer. The `unobserve` method takes a single element as its only parameter and it stops observing that single element. The `disconnect` method takes no parameters and will stop observing all elements.
```js {5}
new ResizeObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.contentRect.width < 150) {
      entry.target.remove()
      observer.unobserve(entry.target)
    }
  })
})
```

## Conclusion

The Resize Observer is a very simple API to understand and has limited use cases, but it can be incredibly powerful in specific situations.

If you want to learn more about the other observer based APIs you can check out my [Intersection Observer Ultimate Guide](/2022-01/intersection-observer).