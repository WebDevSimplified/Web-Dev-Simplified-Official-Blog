---
layout: "@layouts/BlogPost.astro"
title: "How To Center Vertically In CSS"
date: "2020-06-29"
description: "Every method you need to know to center elements in CSS."
tags: ["CSS"]
---

Centering an element vertically in CSS used to be one of the hardest things to do in CSS. There are countless Stack Overflow posts on the topic, and still more being posted to this day. Luckily, with modern advances in CSS, centering elements has never been easier.

## The Basic Approach

The most basic approach to centering elements in CSS is using hard coded heights with absolute positioning. If we had a parent div that was 300px tall and a child div inside it that was 100px, then we could just add in a hard coded top of 100px to the child to center it.

```html
<div class="parent">
  <div class="child"></div>
</div>
```

```css
.parent {
  position: relative;
  height: 300px;

  width: 300px;
  background-color: red;
}

.child {
  position: absolute;
  top: 100px;
  left: 100px;
  height: 100px;

  width: 100px;
  background-color: blue;
}
```

<div style="height: 300px; position: relative; width: 300px; background-color: var(--theme-red);">
  <div style="height: 100px; position: absolute; top: 100px; left: 100px; width: 100px; background-color: var(--theme-blue);"></div>
</div>
<br />

This obviously has a bunch of drawbacks, but the most obvious is that if the height of the parent is not defined in CSS then this will not work. For example if the parent height was determined based on a bunch of text inside it then the height would change based on the amount of text. To fix this we can use margin auto instead of an exact top value.

```css {10-14}
.parent {
  position: relative;

  width: 300px;
  background-color: red;
}

.child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  height: 100px;

  width: 100px;
  background-color: blue;
}
```

<div style="position: relative; width: 300px; background-color: var(--theme-red); margin-bottom: 10px;">
  <div style="position: absolute; height: 100px; top: 0; left: 0; right: 0; bottom: 0; margin: auto; width: 100px; background-color: var(--theme-blue);"></div>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam in eum reiciendis molestias a asperiores vitae placeat, sit voluptas earum ut aut odio maiores alias dolor necessitatibus ratione commodi, possimus perferendis assumenda tenetur nobis, nulla dolore recusandae.
</div>
<div style="position: relative; width: 300px; background-color: var(--theme-red);">
  <div style="position: absolute; height: 100px; top: 0; left: 0; right: 0; bottom: 0; margin: auto; width: 100px; background-color: var(--theme-blue);"></div>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam in eum reiciendis molestias a asperiores vitae placeat, sit voluptas earum ut aut.
</div>
<br />

Now our elements are centered properly no matter how large the parent container is.

## Using Transforms

Before we move into some of the more modern ways to center elements I want to talk about one of my favorite ways to center an absolute positioned element, and that is with transform. If you translate an element -50% then it will move 50% of its height/width to the left/top which makes centering elements incredibly easy once you have the top left corner of the element centered.

```css {10-12}
.parent {
  position: relative;

  width: 300px;
  background-color: red;
}

.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 100px;

  width: 100px;
  background-color: blue;
}
```

<div style="position: relative; width: 300px; background-color: var(--theme-red); margin-bottom: 10px;">
  <div style="position: absolute; height: 100px; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; background-color: var(--theme-blue);"></div>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam in eum reiciendis molestias a asperiores vitae placeat, sit voluptas earum ut aut odio maiores alias dolor necessitatibus ratione commodi, possimus perferendis assumenda tenetur nobis, nulla dolore recusandae.
</div>
<div style="position: relative; width: 300px; background-color: var(--theme-red);">
  <div style="position: absolute; height: 100px; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 100px; background-color: var(--theme-blue);"></div>
  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam in eum reiciendis molestias a asperiores vitae placeat, sit voluptas earum ut aut.
</div>
<br />

The top and left property put the top left corner of the box in the center of the parent and then by using -50% translation we are moving the box half its width and height backwards to make it centered.

## Flexbox

All of these previous ways to center elements work fine, but they have some major drawbacks. They either need to have pre-defined heights, or make use of absolute positioning which can be a nightmare to work with. What if we want to have a parent with 3 different height children where the size of the largest child is height of the parent and the smaller children are centered vertically. This is something that is pretty much impossible to do with the previous techniques, but is unbelievably easy with flexbox.

```html
<div class="parent">
  <div>
    Text...
    <div>
      <div>
        Text...
        <div>
          <div>
            Text...
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

```css {2-3}
.parent {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
}

.child {
  background-color: blue;
  color: white;
  width: 100px;
}
```

<div style="display: flex; align-items: center; background-color: var(--theme-red); justify-content: center;">
  <div style="background-color: var(--theme-blue); width: 100px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam in eum reiciendis molestias a asperiores vitae placeat, sit voluptas earum ut aut.</div>
  <div style="background-color: var(--theme-blue); width: 100px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam in eum reiciendis molestias a asperiores vitae placeat, sit.</div>
  <div style="background-color: var(--theme-blue); width: 100px;">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
</div>
<br />

You may notice from the above code that we didn't need to apply any centering styles to the child class. All of the centering is handled by the parent class and flexbox. The `align-items` property is what centers all of our elements vertically, and the `justify-content` property is what centers the items horizontally. If you are not familiar with flexbox it is an incredibly powerful tool that you need to learn. Luckily, I have a complete flexbox tutorial you can checkout [here](https://youtu.be/fYq5PXgSsbE).

## Grid

Just like with flexbox, CSS grid makes centering elements incredibly easy. You will actually notice most of the CSS is exactly the same, except for the display has been changed to grid and the width of the children is defined in the parent `grid-template-columns`.

```html
<div class="parent">
  <div>
    Text...
    <div>
      <div>
        Text...
        <div>
          <div>
            Text...
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

```css {2,5}
.parent {
  display: grid;
  align-items: center;
  justify-content: center;
  grid-template-columns: repeat(3, 100px);
  background-color: red;
}

.child {
  background-color: blue;
  color: white;
}
```

<div style="display: grid; align-items: center; background-color: var(--theme-red); justify-content: center; grid-template-columns: repeat(3, 100px);">
  <div style="background-color: var(--theme-blue);">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam in eum reiciendis molestias a asperiores vitae placeat, sit voluptas earum ut aut.</div>
  <div style="background-color: var(--theme-blue);">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Magnam in eum reiciendis molestias a asperiores vitae placeat, sit.</div>
  <div style="background-color: var(--theme-blue);">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</div>
</div>
<br />

Just like with flexbox, the centering is handled by the parent class. The `align-items` property is what centers all of our elements vertically, and the `justify-content` property is what centers the items horizontally. If you are not familiar with grid it is another amazing tool that you need to learn. I also have a complete tutorial on grid you can checkout [here](https://youtu.be/9zBsdzdE4sM).

## Conclusion

As of now these are the most common ways to center elements in CSS. If you can, I would always reach for flexbox or grid when centering an element that is not absolutely positioned. If you are dealing with an absolute positioned element then using transform and translate or auto margins is a great way to center your element.
