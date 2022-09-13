---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "Is CSS Transform Dead?"
date: "2022-09-13"
description: "CSS just added individual rotate, translate, and scale properties which almost entirely remove the need for the transform property in CSS."
tags: ['CSS']
---

CSS is adding lots of new features and some of the smaller quality of life features they added recently were the addition of the `translate`, `rotate`, and `scale` properties. These properties almost entirely remove the need to use the `transform` property which is incredibly nice since there are tons possibilities this opens up that were very difficult if not impossible before.

In this article I will be breaking down how each of these three properties work (it is not quite as simple as you may think) as well as explaining why this is such a big deal at the end.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: 416MT-VmJdI`

## The New Properties

Before I jump into why I am so excited for this change we need to talk about how these new properties works. For the most part they work the same as the `rotate()`, `scale()`, and `translate()` functions with just a few caveats.

*If you are unfamiliar with all the nuances of the `transform` property check out my [Ultimate CSS Transform Guide](/2021-01/css-transform) before reading further.*

### `scale`

Let's start with the easiest of the three new properties `scale`. This property works exactly the same as the `scale()` function.
```css
.class {
  scale: 1.5;
  /* transform: scale(1.5); */
}
```
If you pass one value to `scale` it works just like the `scale()` function by scaling the element in the X and Y direction by the value given. In this above scenario the element will increase in size by 50%.
```css
.class {
  scale: 1.5 .5;
  /* transform: scale(1.5, .5); */
}
```
If you pass two values to `scale` it will still work just like the `scale()` function by scaling the X direction by the first value and the Y direction by the second value. This example would be 50% larger in the X direction and half the size in the Y direction.
```css
.class {
  scale: 1.5 .5 2;
  /* transform: scale3d(1.5, .5, 2); */
}
```
If you pass three values to `scale` it works just like the `scale3d()` function by scaling the X direction by the first value, the Y direction by the second value, and the Z direction by the last value.

### `translate`

Next comes the `translate` property which for the most part works exactly the same as the `translate()` function.
```css
.class {
  translate: 50px;
  /* transform: translate(50px); */
}
```
If you pass one value to `translate` it works just like the `translate()` function by moving the element in the X direction by the value given. In this above scenario the element will move 50px to the right.
```css
.class {
  translate: 50px 100px;
  /* transform: translate(50px, 100px); */
}
```
If you pass two values to `translate` it will still work just like the `translate()` function by moving the element in the X direction by the first value and the Y direction by the second value. This example would be moved 50px to the right and 100px down.
```css
.class {
  translate: 50px 100px 200px;
  /* transform: translate3d(50px, 100px, 200px); */
}
```
If you pass three values to `translate` it works just like the `translate3d()` function by moving the element in the X direction by the first value, the Y direction by the second value, and the Z direction by the last value.

### `rotate`

Here is where things get a little bit more confusing. `rotate` mostly works like the `rotate()` function, but with a few caveats.
```css
.class {
  rotate: 45deg;
  /* transform: rotate(45deg); */
}
```
If you pass one value to `rotate` it works just like the `rotate()` function by rotating the element around the Z axis by the value given. In this above scenario the element will rotate 45 degrees.
```css
.class {
  rotate: x 90deg;
  /* transform: rotateX(90deg); */

  rotate: y 90deg;
  /* transform: rotateY(90deg); */

  rotate: z 90deg;
  /* transform: rotateZ(90deg); */
}
```
If you want to rotate an element around an axis other than the Z axis you will need to pass the axis as the first value to `rotate` and then pass the angle as the second value. This will work the same as the `rotateX()`, `rotateY()`, and `rotateZ()` functions depending on what axis you use.
```css
.class {
  rotate: 0 1 1.5 90deg;
  /* transform: rotate3d(0, 1, 1.5, 90deg); */
}
```
Finally if you want to do a matrix based 3d rotation you need to pass 4 values to `rotate`. This works exactly the same as the `rotate3d()` function where the first 3 values represent how much of the rotation to apply on each axis (X, Y, Z) and the fourth value is the angle being applied. In our example, the element will have no rotation on the X axis, 90 degrees of rotation on the Y axis, and 135 degrees of rotation on the Z axis.

## Why Is This Important?

It may seem like CSS is just adding new ways to do things we could already do, which is partially true, but this syntax actually opens up new possibilities that were very difficult if not impossible to do before.
```css
.box {
  width: 200px;
  height: 200px;
  background: red;
}

.box.small {
  transform: scale(.5);
}

.box.moved {
  transform: translate(50px);
}

.box.rotated {
  transform: rotate(45deg);
}
```
The above code seems like really simple code that allows you to shrink, move, and rotate a box, but this code will not work as you expect. If you only apply one of the `small`, `moved`, or `rotated` classes to the box it will work as expected, but as soon as you add more than one of those classes it will break. The reason for this is because they all use the `transform` property so CSS will only use the most specific version of the `transform` property which means in our case the class that is defined last in our CSS file will overwrite the previous classes. If our box has the classes `moved` and `rotated` on it then it will only be rotated by 45 degrees and not moved since the `moved` class `transform` is being overwritten by the `rotated` class `transform`.

There are a few ways to get around this issue.
```css
.box {
  width: 200px;
  height: 200px;
  background: red;
  transform:
    scale(var(--scale, 1))
    translate(var(--translate, 0))
    rotate(var(--rotate, 0));
}

.box.small {
  --scale: .5;
}

.box.moved {
  --translate: 50px;
}

.box.rotated {
  --rotate: 45deg;
}
```
If we swap to using CSS variables we can now get around this problem, but the code is a bit clunky since we have to give default values for all of the variables in our base class and it just isn't as clean as I would like. This used to be the only way to fix this issue before now.
```css
.box {
  width: 200px;
  height: 200px;
  background: red;
}

.box.small {
  scale: .5;
}

.box.moved {
  translate: 50px;
}

.box.rotated {
  rotate: 45deg;
}
```
With the introduction of these new CSS properties we can just define our `rotate`, `translate`, and `scale` as individual properties which means our `scale` will never replace/overwrite our `translate`. This makes writing code with multiple transforms so much easier and cleaner.

This isn't the only reason this is so great, though.
```css
.box {
  width: 200px;
  height: 200px;
  background: red;
  transform:
    scale(var(--scale, 1))
    translate(var(--translate, 0))
    rotate(var(--rotate, 0));
}

.box.small {
  --scale: .5;
}

.box.moved {
  --translate: 50px;
}

.box:hover {
  animation: twirl 500ms infinite alternate;
}

@keyframes twirl {
  0% {
    --rotate: 0;
  }
  
  100% {
    --rotate: 45deg;
  }
}
```
The above code is very similar to our CSS variable version where we want to write a transform that has multiple parts that can change independently. This may look like it should work, but CSS custom properties cannot be animated. Instead this animation will just jump between 0 and 45 degrees with no animation at all. *Technically, with the introduction of CSS Houdini you can get around this, but the code is quite a bit more involved and Houdini has very poor browser support.*
```css
.box {
  width: 200px;
  height: 200px;
  background: red;
}

.box.small {
  scale: .5;
}

.box.moved {
  translate: 50px;
}

.box:hover {
  animation: twirl 500ms infinite alternate;
}

@keyframes twirl {
  0% {
    rotate: 0;
  }
  
  100% {
    rotate: 45deg;
  }
}
```
This problem is trivial for our new CSS properties, though. Since `rotate` is just a normal CSS property you can animate it just like any other property and it will work. This makes doing code like this possible and really easy.

## Browser Support

With every cool CSS feature you always have to consider browser support, but luckily the browser support for these new properties is quite good. Currently, they have [79.6% support](https://caniuse.com/mdn-css_properties_scale), with the majority of the missing support coming from older versions of Chrome. The reason for this is because this features just launched at the start of August 2022 so people are still in the process of updating Chrome to the latest versions. In just a few months this feature will be above 90% and able to be used on pretty much every site.

## Conclusion

While these properties may seem unnecessary at first, the extra versatility they provide is incredibly useful.