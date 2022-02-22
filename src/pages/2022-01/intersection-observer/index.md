---
setup: |
  import Layout from '/src/layouts/BlogPost.astro'
  import IntersectionObserverComponent from '/src/blogComponents/intersectionObserver/IntersectionObserver.astro'
title: "JavaScript Intersection Observer Ultimate Guide"
date: "2022-01-10"
description: "Lazy loading, infinite scrolling, scroll based animations, and performant scroll events are all perfect examples of Intersection Observer in action."
tags: ['JavaScript']
---

Intersection Observer is one of 3 observer based JavaScript APIs with the other two being Resize Observer and Mutation Observer. Intersection Observer in my opinion is the most useful because of how easy it makes things like infinite scrolling, lazing loading images, and scroll based animations. In this article I will cover all the basics of Intersection Observer as well as the more complex nuances so you can start using Intersection Observer to spice up your sites.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: 2IbRtjez6ag`

## Your First Intersection Observer

Creating an Intersection Observer is actually quite simple since all you need to do is pass a function to the `IntersectionObserver` constructor.
```js
const observer = new IntersectionObserver(entries => {
  console.log(entries)
})
```
In the above example we created a brand new Intersection Observer and in the function we passed to it we are just logging out the `entries` parameter. This `entries` parameter is the only argument that the function accepts and it just outputs the information related to each element that changes its intersection status. That may sound confusing but let's take a look at a simple example.
```js {2-5,8}
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const intersecting = entry.isIntersecting
    entry.target.style.backgroundColor = intersecting ? "blue" : "orange"
  })
})

observer.observe(document.getElementById("test"))
```
In the above code we are calling the `observe` method on our Intersection Observer and telling it to observe intersection changes for the element with the id test. Now for an element to change its intersection status it must scroll in/out of the current viewport. Below you will see an example that changes the color of our element every time the element intersects our container. In all the examples on this page the solid section with the border is our viewport. You can think of that as the visible portion of the screen. The greyed out sections outside the solid section are considered outside the viewport, but I made them visible to you so you can see what happens as our element intersects the viewport. Normally this area would not be visible.

<IntersectionObserverComponent />

As you can see above as soon as our element has 1 single pixel enter the viewport it changes to a blue color. Also, as soon as the entire element is back off the screen it changes back to orange. Now let's break apart how this all works.

In our code we are looping through all the elements in the `entries` array. This array just lists all the elements we are observing that have had their intersection status change. This means that the element has either entered or left the screen. We are then looping through those entries and for each one we are checking the `isIntersecting` property. This property is true if the element is on the page and it is false if the element is not on the page. Finally, we are using the `target` property of our entry to get the current element that is being observed and changing its background to the appropriate color.

## Intersection Observer Options

Now the above code covers the most basic use case for the intersection observer, but on its own this isn't too useful. The different options you can pass to your Intersection Observer when you create it really take this to the next level.

### Threshold

Probably my favorite property is the `threshold` property. This accepts a value between 0 and 1 and represents the percentage of the element that must be visible before `isIntersecting` becomes true. By default this is set to 0 which means as soon as any part of the element is visible it will be considered intersecting.
```js {3}
const observer = new IntersectionObserver(
  changeColor,
  { threshold: 1 }
)

observer.observe(document.getElementById("test"))
```

<IntersectionObserverComponent threshold={1} />

In our above example we set our threshold to 1 which means 100% of the element must be visible before it will be considered intersecting so now our color only changes to blue when the entire element is in the viewport.

You can also pass an array to threshold which means that the Intersection Observer will fire each time your element passes one of the thresholds passed to it.
```js {3,5}
const observer = new IntersectionObserver(entries => {
  entires.forEach(entry => {
    entry.target.innerText = `${Math.round(entry.intersectionRatio * 100)}%`
  })
}, { threshold: [0, .25, .5, .75, 1] })

observer.observe(document.getElementById("test"))
```

<IntersectionObserverComponent threshold="[0, 0.25, 0.5, 0.75, 1]" percentage />

In the above code you will notice the text in the square will change as you scroll it and it will only update once the square hits the thresholds we passed to our Intersection Observer. In order to print this percent value we are getting the `intersectionRatio` property of our entry which is a number between 0 and 1 which represents the current percentage of the element that is within the viewport.

You will notice that the text in the box is not always exactly the same as our thresholds. This is because as we scroll we are sometimes scrolling past the exact percentage values so the `intersectionRatio` will be close to but not exactly the same as our threshold. If you scroll slower the numbers will be more accurate while a fast scroll will have less accurate numbers since you are scrolling past more content before the observer can fire.

### Root Margin

The next useful option you can pass to an Intersection Observer is `rootMargin`. This property is defined exactly the same as the `margin` CSS property in that it can take 1 value to apply margin to all sides or multiple values to give individual values to each side. The `rootMargin` will be added to the container viewport so in essence we can shrink/grow our view port with this value.

```js {3}
const observer = new IntersectionObserver(
  changeColor,
  { rootMargin: "50px" }
)

observer.observe(document.getElementById("test"))
```

<IntersectionObserverComponent rootMargin={50} />

With a `rootMargin` of 50px our viewport is now considered to be 50px larger so once the element is 50px from being within the viewport it will be considered intersecting. I added red lines to the above demo to represent where our rootMargin grows the viewport to. Using a positive `rootMargin` like this is really useful when you need to lazy load images, or do something like infinite scrolling since you can load in all the data before it becomes visible to the user.

You can also do negative margins to shrink the viewport.

```js {3}
const observer = new IntersectionObserver(
  changeColor,
  { rootMargin: "-50px" }
)

observer.observe(document.getElementById("test"))
```

<IntersectionObserverComponent rootMargin={-50} />

As you can see from the blue lines our new viewport is 50px smaller. This type of rootMargin is perfect for doing things like loading animations that you want to occur after an element is at least a certain distance from the edge of the screen.

### Root

The last option you can pass to an Intersection Observer is the `root` property which is a property you honestly probably won't use much. This property must be an element that is an ancestor of the elements being observed. This root element is then used as the viewport for intersection. This is really only useful when you have a scrolling container inside your page that you want to check observations for since you can make the scrolling container the root element instead of the screen.

In order to make all the examples on this page work I actually had to use the `root` property to set the scrolling container as the root element since otherwise the observer would not work correctly.

## Advanced Intersection Observer

This covers all the basic use cases and options for Intersection Observers, but there are a few additional things you should know.

### Second Callback Parameter

The callback you pass to new Intersection Observers actually has two parameters. The first parameter is the `entries` parameter we have talked a bunch about. The second parameter is simply the observer that is observing the changes.
```js {2}
const observer = new IntersectionObserver((entries, o) => {
  console.log(o === observer)
  // True
})
```
This parameter is useful when you need to do something with the observer from within the callback since you may not always have access to the observer variable from the callback depending on where the callback is defined.

### Unobserve and Disconnect

It is important to stop observing elements when they no longer need to be observed, such as after they are removed from the page or after lazy loading an image in order to avoid memory leaks or performance issues. This can be done with the `unobserve` method or the `disconnect` method which are both methods on the Intersection Observer. The `unobserve` method takes a single element as its only parameter and it stops observing that single element. The `disconnect` method takes no parameters and will stop observing all elements.
```js {5}
new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      lazyLoadImage(entry)
      observer.unobserve(entry.target)
    }
  })
})
```

## Conclusion

The Intersection Observer is my favorite of the different observer APIs since it has so many use cases from lazy loading images, to scroll based animations. It is also incredibly easy to use which is a huge bonus.

If you want to learn more about the other observer based APIs you can check out my [Resize Observer Ultimate Guide](/2022-01/resize-observer).