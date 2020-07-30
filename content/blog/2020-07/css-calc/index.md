---
title: "Everything You Need To Know About CSS Calc"
date: "2020-07-27"
description: "This article breaks down everything you need to know about CSS calc to take your CSS skills to the next level."
tags: ['CSS']
---

When most people think of doing computations and calculations on the web they think of JavaScript. That makes sense considering JavaScript is the main programming language of the web, but what if I told you that you can do fairly complex calculations with just CSS. It is honestly pretty amazing and infinitely useful. *Also, if you are a visual learning make sure to check out the full video version of this article [here](https://youtu.be/x7EWFoRzAkk).*

## What Is CSS Calc?

First, we need to talk about what CSS calc is and how you use it. In the simplest terms possible CSS calc is just a CSS function, similar to `rgb`, `var`, etc. that lets you do addition, subtraction, division, and multiplication on various CSS units. Here is a simple example.
```css
.class {
  width: calc(200px + 100px);
}
```
The above CSS sets the width of this box to 300px (200px plus 100px).

Admittedly, this is not very useful. I mean we could just write 300px instead and save ourselves a bunch of time, but this is only the beginning of CSS calc.

## Combining Different Units

That's right. With CSS calc we can combine together different CSS units to create values that are impossible to represent with traditional CSS units. For example what if we wanted to create a box that was 30px away from being 100vw wide. Essentially a 100vw box that had 30px of space removed from it.
```css
.class {
  width: calc(100vw - 30px);
}
```
That's all you need to do. Just put the 100vw and the 30px into your calc function and CSS will take care of all the complex math for you. Now no matter how wide or small your screen is the box will always be 30px smaller than the full width of the screen.

Now this alone is enough to make CSS calc amazing, but you can go a step further and combine this with CSS variables.

## CSS Variables And Calc

*Before we jump into using CSS variables with calc make sure you check out [this article](/2020-02/css-custom-properties) which covers everything you need to know about CSS variables.*

Now with that out of the way we can talk about how you can use CSS variables with calc. All you need to do is replace one of your values in the calc function with a variable. For example:
```css
.class {
  --w: 100px;
  width: calc(var(--w) * 2);
}
```
We now have a box that is 200px wide since we are multiplying the 100px `--w` variable by 2.

## Converting Units With Calc

On top of using CSS variables in calc you can also convert a value that has no units to a value with units by just multiplying the value by 1 of the unit type you want to convert to. This is very useful if you have CSS variables being set in JS that do not include the unit.
```css
.class {
  --fav-num: 3;
  width: calc(var(--fav-num) * 1px);
}
```

With this simple calc function I am converting the `--fav-num` variable from a unitless value to a pixel based value.

## CSS Calc Gotchas

Luckily, calc is pretty straight forward to use, but there is one gotcha to watch out for. Spacing inside the CSS calc function is very important. You must have one space between each of the values in the calc function and the operation between them. This means you cannot have your value touch the operator. You also cannot have a space before the parentheses of the calc function. For example all of the following are invalid CSS.
```css
.class {
  width: calc(1px+ 2px);
  width: calc(1px +2px);
  width: calc(1px+2px);
  width: calc (1px + 2px);
}
```

## Conclusion

CSS calc is a really useful function that seems like it only has one niche use case, but in reality opens up a ton of possibilities. I highly recommend you use calc in your next project since it drastically simplifies CSS code.