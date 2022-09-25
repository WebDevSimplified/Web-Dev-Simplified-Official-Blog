---
setup: |
  import CSSFloat from "/src/blogComponents/cssFloat/CSSFloat.astro"
  import CSSClear from "/src/blogComponents/cssFloat/CSSClear.astro"
title: "CSS Floats Are Still Useful"
date: "2020-11-09"
description: "A short explanation on how CSS floats are still useful."
tags: ['CSS']
---

When you think of CSS floats you probably immediately think of old and out of date CSS layouts. This is technically correct since many sites used floats and clearfixes in order to create layouts before flexbox and grid, but float can still be used for modern applications.

## How Floats Work

Since floats have a bad reputation for being abused in layouts many people don't learn floats. This leads to a lot of confusion around how floats work and most developers just don't use floats to avoid this confusion. Floats are really useful, though, when it comes to flowing content around another piece of content. The most common use case is flowing text around an image.

<CSSFloat float="left" clearfix />

The above layout is incredibly easy to achieve with floats, but very difficult without. Here is a simplified version of the HTML/CSS for the above code.
```html
<div>
  <img src="url" />
  <p>Text</p>
</div>
```
```css
img {
  float: left;
}
```
This code is telling our `img` to float to the left side of the page. This means it leaves the normal document flow and moves to the left of all other content. Then the remaining content will flow around the img getting as close as possible on all sides.

We could also float to the right instead.

<CSSFloat float="right" clearfix />

```css
img {
  float: right;
}
```
You will notice that even though the image is declared first in the HTML it still shows up after the text on the right. This is because floats break out of the normal document flow and ignore HTML ordering to force the floated element to be as far left or right as possible. It is important to note, though, that elements will only wrap around floated elements if they appear after the floated element in the HTML. If the `img` is defined after the `p` then the `p` will not flow around the floated `img`.

If we wanted to have no float we could do that by setting the float to none which is the default value for float.

<CSSFloat clearfix />

```css
img {
  float: none;
}
```
As you can see this makes the text show up below the image. This is because the image is not floated so the text cannot wrap around it.

## Clearing Floats

We can set a float to none in order to stop the text from floating around an element but we can also use the `clear` property to prevent the text from flowing around the image as well. Lets use the following example to explain.

<CSSClear />

```html
<div>
  <img src="url" class="img1" />
  <img src="url" class="img2" />
  <p>Text</p>
</div>
```
```css
.img1 {
  float: left;
}
.img2 {
  float: right;
}
```

Let's say that we want the text to only wrap around the left side image and not the right. We could just set the text to have a `clear` of `right`.

<CSSClear clear="right" />

```css
p {
  clear: right;
}
```

As you can see above the text no longer flows around the right image and instead starts below it. We could do the same for the left as well.

<CSSClear clear="left" />

```css
p {
  clear: left;
}
```

Now the text shows up below both the images since it has to start below the left image and the left image is taller than the right image.

## Clearfix Is Still Useful

If you have ever dealt with old float based layouts then you are familiar with clearfix. Essentially all a clearfix does is fix the overflow issues caused by floating elements.

<CSSFloat float="left" height={350} border text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium fugiat odio illum facilis perferendis beatae minima assumenda libero repellat unde." />

<div style={{ clear: 'both' }}></div>

```html
<div>
  <img src="url" />
  <p>Text</p>
</div>
```
```css
img {
  float: left;
}
div {
  border: 1px solid red;
}
```
In the above example we have the same HTML/CSS from the start of this article, but I added a border to the div that wraps the elements. This helps show that the image is overflowing the div since floats cause an element to leave the document flow, thus opening us up to overflow issues.

Luckily, this is very easy to fix with a clearfix.

<CSSFloat float="left" height={350} border clearfix text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium fugiat odio illum facilis perferendis beatae minima assumenda libero repellat unde." />

```html
<div>
  <img src="url" />
  <p>Text</p>
</div>
```
```css
img {
  float: left;
}
div {
  border: 1px solid red;
}
div::after {
  content: '';
  display: block;
  clear: both;
}
```

By adding a simple `after` pseudo element to the div we have now fixed this overflow issue. The reason this works is because when you clear an element (in our case the `after` element) it must show up after the floated elements (because it is display block). This means the `after` element shows up directly after the floated elements which expands the `div` to the full height of the floated content. Also, since the `after` element is an element with no height/width it doesn't actually take up any space on the screen and is thus invisible.

## Conclusion

Float based layouts may be a thing of the past, but using floats to wrap text around images is still very popular today. As long as you understand how floats and clearfixes work it is incredibly easy to make these types of layouts.