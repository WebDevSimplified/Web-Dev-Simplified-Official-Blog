---
setup: import Flexbox from "/src/blogComponents/flexbox/Flexbox.astro"
title: "CSS Logical Properties"
date: "2021-05-24"
description: "CSS logical properties are the new way to write padding, margin, border, and so much more. They will change CSS forever."
tags: ['CSS']
---

When flexbox and grid first came out they revolutionized layouts in CSS, but they also began the revolution on how directions are handled in CSS. Flexbox introduced the concept of `align-items` and `justify-content` which used values of `start` and `end` instead of `left` and `right`. These values of `start` and `end` could then look at the direction of the flexbox container to determine if they would refer to the horizontal or vertical direction and even whether or not `start` would be the left or right of a container.

```css
.flex {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  direction: row;
}
```
<Flexbox />

```css {5}
.flex {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  direction: row-reverse;
}
```
<Flexbox direction="row-reverse" />

In the above example we have two separate flex containers that are identical in every way, except the second container has a direction of row reverse. This tells our container to flow in the reverse direction (right to left) which means the start of our container is now the right instead of the left. This same concept is how logical properties work.

## What Are Logical Properties?

Logical properties are simply a way to specify the size, margin, padding, etc. using the logical flow of the container (start, end) instead of the actual directions of the page (top, bottom, left, right). Essentially any property you see that refers to a specific direction (`width`, `top`, `padding-left`) has a new corresponding logical property to set that value instead (`inline-size`, `inset-block-start`, `padding-inline-start`).

In a standard left to right, top to bottom document the horizontal direction is referred to as the inline direction and the vertical direction is referred to as the block direction. The start also refers to the top/left and the end refers to the bottom/right. Based on this logic we can see that the property `inline-size` will refer to the size of an object in the inline direction which in this example is just the width. If our document swaps to be a vertical first document where we read top to bottom then left to right then the `inline-size` would refer to the height of our element since our inline direction is now vertical. This is essentially how justify/align work in flexbox and grid.

```css
.container {
  writing-mode: horizontal-tb;
}

.left-box {
  inline-size: 100px;
  block-size: 50px;
  margin-block-start: 25px;
}

.right-box {
  width: 100px;
  height: 50px;
  margin-top: 25px;
}
```
<div style="display: flex; margin-bottom: 1rem; width: min-content; align-items: start">
  <div style="writing-mode: horizontal-tb; background-color: #00AAFF; padding: .5rem;">
    <div style="inline-size: 100px; block-size: 50px; background-color: white; border: 1px solid black; margin-block-start: 25px;"></div>
  </div>
  <div style="writing-mode: horizontal-tb; background-color: #00AAFF; padding: .5rem; margin-left: .5rem;">
    <div style="width: 100px; height: 50px; background-color: white; border: 1px solid black; margin-top: 25px;"></div>
  </div>
</div>

```css {2}
.container {
  writing-mode: vertical-lr;
}

.left-box {
  inline-size: 100px;
  block-size: 50px;
  margin-block-start: 25px;
}

.right-box {
  width: 100px;
  height: 50px;
  margin-top: 25px;
}
```
<div style="display: flex; margin-bottom: 1rem; width: min-content; align-items: start">
  <div style="writing-mode: vertical-lr; background-color: #00AAFF; padding: .5rem;">
    <div style="inline-size: 100px; block-size: 50px; background-color: white; border: 1px solid black; margin-block-start: 25px;"></div>
  </div>
  <div style="writing-mode: vertical-lr; background-color: #00AAFF; padding: .5rem; margin-left: .5rem;">
    <div style="width: 100px; height: 50px; background-color: white; border: 1px solid black; margin-top: 25px;"></div>
  </div>
</div>

By swapping the writing mode from the default horizontal, top to bottom mode to the vertical, left to right mode you can see that our box that uses logical properties has redefined which direction inline/block refer to. `inline-size` now refers to the height, `block-size` now refers to the width, and `margin-block-start` now refers to the left margin. This is incredibly useful since most likely if you change the direction of a document to read top to bottom instead of left to right you would want your sizing/spacing to shift as well.

## How To Translate To Logical Properties

Getting started with logical properties can seem daunting since it seems like you need to re-learn a ton of properties, but it is actually pretty easy to figure out the logical property name.

If you have a property that refers to a specific axis (`min-width`, `overflow-y`, `resize: horizontal`) all you need to do is replace the axis with the correct `inline`/`block` keyword (`min-inline-size`, `overflow-block`, `resize: inline`). *Some cases like `min-width` require you to add an additional word to the property to make it clear what the property does.*

If you have a property that refers to a specific direction (`top`, `padding-left`, `border-top`) then you need to add both the correct `inline`/`block` keyword and `start`/`end` keyword (`inset-block-start`, `padding-inline-start`, `border-block-start`). *Some cases like `top` require you to add an additional word to the property to make it clear what the property does.*

It is important to note that this simple translation will only work in the standard left to right then top to bottom page layout. If you have a top to bottom first layout then you would need to swap block/inline for example.

## Additional Features

One really nice feature that logical properties have is that you can now easily set the margin/padding for one axis at the same time.
```css
.old {
  /* No way to do this shorthand */
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.new {
  margin-block: 1rem;
}
```
This won't drastically change how you write CSS, but it will be nice to only need one property to do this.

## Browser Support

Now we get to everyone's favorite CSS topic, browser support. Luckily, logical properties have pretty good browser support. All the standard use cases are supported across all major browsers with only a few niche cases, such as `resize: block` not supported. Also, it is incredibly easy to use logical properties with a fallback for older browsers.
```css
.class {
  width: 200px;
}

@supports (inline-size: 200px;) {
  .class {
    width: initial;
    inline-size: 200px;
  }
}
```
In the above example we just check to see if the browser supports the `inline-size` property and if so we reset the width and use `inline-size` instead. *If you are not familiar with the @supports keyword check out [this article](/2019-12/css-supports-property).*

## Conclusion

Logical properties are not really anything new being added to CSS, but they make working with different writing modes and layout directions so much easier.