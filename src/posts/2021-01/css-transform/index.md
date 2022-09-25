---
setup: import CSSTransform from "/src/blogComponents/cssTransform/CSSTransform.astro"
title: "CSS Transform"
date: "2021-01-25"
description: "This article covers everything you need to know about the CSS transform property and the various transform functions."
tags: ['CSS']
---

CSS is incredibly powerful in what you can all modify and the `transform` property is one of the most versatile and powerful CSS properties. In this article I will cover all the ways that you can use the `transform` property to modify an element in CSS.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: rzD-cPhq02E`

## What Is The Transform Property?

The `transform` property in CSS is simply a way that you can rotate, scale, move, etc. elements all in one property. Because of this flexibility if can be confusing to use at first but this article will clear all those confusions.
```css
.class {
  transform: rotate(90deg) scale(2) translate(100px, 200px);
}
```
`transform` is used by combining together multiple transform functions to get the desired output, so in order to understand `transform` you need to understand each of the `transform` functions.

### Rotate

Probably the easiest transform function to understand is `rotate`. This function takes a single argument which is the angle to rotate the element. A positive value will result in a clockwise rotate and a negative value will result in a counter-clockwise rotation.
```css
.red {
  transform: rotate(10deg);
}

.green {
  transform: rotate(-45deg);
}

.blue {
  transform: rotate(.25turn);
}
```

<CSSTransform red="rotate(10deg)" green="rotate(-45deg)" blue="rotate(.25turn)" />

As you can see in the above example we used both `deg` and `turn` units to define our rotation. `deg` units are from 0 to 360 while the `turn` unit goes from 0 to 1.

#### 3D Rotation

You can also do 3D rotation by using the `rotateX`, `rotateY`, and `rotateZ` functions. The `rotateZ` function works exactly the same as `rotate`.

`rotateX` will rotate an element on the horizontal axis and `rotateY` will rotate an element on the vertical axis. These can be used to flip an element.
```css
.red {
  transform: rotateX(60deg);
}

.green {
  transform: rotateY(60deg);
}

.blue {
  transform: rotateX(.2turn) rotateY(.2turn);
}
```

<CSSTransform red="rotateX(60deg)" green="rotateY(60deg)" blue="rotateX(.2turn) rotateY(.2turn)" />

As you can see we are rotate the element in 3D space causing it to appear squished. This rotate is really only useful when dealing with 3D elements though.

### Scale

`scale` is another very simple function to understand. It can take either one or two parameters which will determine how much to scale the size of an element. Numbers greater than 1 will make the element larger while numbers less than 1 will shrink the element.
```css
.red {
  transform: scale(1.25);
}

.green {
  transform: scale(.5);
}

.blue {
  transform: scale(1.25, .75);
}
```

<CSSTransform red="scale(1.25)" green="scale(.5)" blue="scale(1.25, .75)" />

When one parameter is passed to `scale` it scales the X and Y axis the same amount based on the number passed. When two values are passed to `scale` the first number will scale the X axis and the second number will scale the Y axis.

Also, if you want you can use the `scaleX` and `scaleY` functions to just scale the X or Y axis. These functions take one parameter and scale the element in the corresponding axis.

#### 3D Scale

Just like with `rotate` you can scale in 3D. To do this you would use the `scaleZ` function which works just like `scaleX` and `scaleY`, but for the Z axis. This again is only useful with 3D elements.

### Translate

Probably my favorite way to transform an element is with the `translate` function. This function takes one or two parameters just like the `scale` function and will move an element based on the values provided.
```css
.red {
  transform: translate(25px);
}

.green {
  transform: translate(-25px, 25px);
}

.blue {
  transform: translate(0, -25px);
}
```

<div style="position: relative;">
  <div style="position: absolute; opacity: .25; width: 100%;">
    <CSSTransform />
  </div>
  <div style="position: absolute; width: 100%;">
    <CSSTransform red="translate(25px)" green="translate(-25px, 25px)" blue="translate(0, -25px)" />
  </div>
  <div style="width: 100%; opacity: 0;">
    <CSSTransform />
  </div>
</div>

The transparent colored arrows represent where the shapes would normally be placed while the opaque arrows represent their position after the translation.

You will notice that when just one value is passed to `translate` it only effects the X axis so the element is moved 25 pixels to the right since it is a positive value.

When two values are passed to `translate` the first one moves the element in the X axis and the second effects the Y axis position. This means the green arrow is moved 25 pixels to the left and 25 pixels down. It may seem confusing that a positive Y value moves the element down since we normally think of positive Y meaning up, but in web development a positive Y value means the element is moving down the page.

Finally, the blue arrow is moved just 25 pixels up since the first parameter is set to 0 and the second parameter is negative 25 pixels.

Just like scale, there are a `translateX` and `translateY` functions for moving an element in just one direction at a time.

#### Percentage Translation

The `translate` property handles percentages differently than nearly every other CSS property since it is based on the element's size and not its parent's size.
```css
.red {
  transform: translate(100%);
}
```

<div style="position: relative;">
  <div style="position: absolute; opacity: .25; width: 100%;">
    <CSSTransform green="scale(0)" blue="scale(0)" />
  </div>
  <div style="position: absolute; width: 100%;">
    <CSSTransform red="translate(100%)" green="scale(0)" blue="scale(0)" />
  </div>
  <div style="width: 100%; opacity: 0;">
    <CSSTransform green="scale(0)" blue="scale(0)" />
  </div>
</div>

As you can see when we translate with a percentage we are moving the element 100% of its own width to the right. This is incredibly useful for centering elements by moving them 50% of their own width or for offsetting elements from one another by a percentage of their size.

#### 3D Translate

You probably guessed it by now but `translate` also can be used in 3D. You can use the `translateZ` function which modifies just the Z axis or the `translate3D` function which works just like `translate`, but accepts a third argument for moving an element in the Z axis. Again, this is only useful with a 3D element.

### Skew

Probably the least useful of all the `transform` functions is `skew`. It allows you to stretch a shape by skewing the edges of it. The `skew` function takes one or two parameters just like `translate`.
```css
.red {
  transform: skew(25deg);
}

.green {
  transform: skew(15deg, 25deg);
}

.blue {
  transform: skew(-15deg, -25deg);
}
```

<CSSTransform red="skew(25deg)" green="skew(15deg, 25deg)" blue="skew(-15deg, -25deg)" />

As you can see the skew property has stretched our shape out in the X and Y direction. By specifying one parameter we skew on only the X direction while if we pass two properties the first one skews in the X direction and the second one skews in the Y direction.

Also, like `translate` you can use `skewX` and `skewY` to skew an element in one direction without affecting the other directions.

#### 3D Skew

Unlike, all the other `transform` properties, `skew` does not have any 3D version.

### Combining Transforms

So far we have talked about working with transforms in isolation, but what if you want to use multiple transforms? This is actually quite simple as you can pass as many functions as you want to `transform`.
```css
.red {
  transform: rotate(25deg) scale(.5) translateX(50px);
}

.green {
  transform: rotate(-.5turn) translateX(-10%);
}

.blue {
  transform: scaleX(1.2) scaleY(.8);
}
```

<CSSTransform red="rotate(25deg) scale(.5) translateX(50px)" green="rotate(-.5turn) translateX(-10%)" blue="scaleX(1.2) scaleY(.8)" />

The only time that combining transforms becomes difficult is when you want to modify them across different classes.
```css
.base-class {
  transform: scale(1.2) translateX(5px);
}

.big {
  transform: scale(2) translateX(5px);
}

.move {
  transform: scale(1.2) translateX(100px);
}

.big.move {
  transform: scale(2) translateX(100px);
}
```
Since `transform` is one property you need to copy all values between each class that modifies the `transform` since if you just write `transform: scale(2)` in the `.big` class it will overwrite the entire `transform` and not just the `scale` portion. Luckily, we can get around this issue by cleverly using CSS variables.
```css
.base-class {
  transform: scale(var(--scale, 1.2)) translateX(var(--translate-x, 5px));
}

.big {
  --scale: 2;
}

.move {
  --translate-x: 100px;
}
```
As you can see we are now only ever changing the CSS variables and we are never modifying the actual `transform` property.

*If you are unfamiliar with CSS variables check out [this article](/2020-02/css-custom-properties) I wrote on CSS variables.*

## Conclusion

Overall CSS `transform` is incredibly useful while also being pretty simple to understand. By far the hardest part of `transform` is understanding how to combine multiple transforms across different classes, but with the help of CSS variables this problem is trivial.