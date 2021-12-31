---
setup: |
  import Layout from '/src/layouts/BlogPost.astro'
  import TriangleRotated from "/src/blogComponents/cssTriangles/TriangleRotated.astro"
  import TriangleBorder from "/src/blogComponents/cssTriangles/TriangleBorder.astro"
title: "CSS Triangles"
date: "2020-03-30"
description: "Learn all about how triangles can be created and manipulated in CSS."
tags: ['CSS']
---

In anticipation for my [Learn CSS Today course](https://courses.webdevsimplified.com/learn-css-today) which is releasing tomorrow, I decided in this article I would talk all about triangles in CSS. As you already know everything in CSS is built on the box model so everything in CSS is shaped like a box. This makes creating triangles difficult, but with clever use of the border property we can create perfect triangles in CSS.

## How To Create A Triangle

The first way you probably think of to make a triangle in CSS would be to take a square and rotate it 45 degrees. This would give you a diamond and then if you cover half of that diamond you are left with a triangle sticking out.

```css {16,17}
.triangle {
  position: relative;
  background-color: red;
  width: 100px;
  height: 100px;
}

.triangle::before {
  content: '';
  position: absolute;
  right: -20px;
  top: calc(50% - 20px);
  width: 40px;
  height: 40px;
  background-color: blue;
  transform: rotate(45deg);
  z-index: -1;
}
```

<TriangleRotated />

Now this works great until you no longer can use something else to hide the other half of the diamond you created. In order to build a pure CSS triangle we need to manipulate CSS borders. Take for example the following element.

```css {7-10}
div {
  width: 150px;
  height: 150px;
  background-color: purple;
  border-width: 50px;
  border-style: solid;
  border-top-color: red;
  border-bottom-color: green;
  border-left-color: blue;
  border-right-color: pink;
}
```

<div style="
  width: 150px;
  height: 150px;
  background-color: purple;
  border-width: 50px;
  border-style: solid;
  border-top-color: red;
  border-bottom-color: green;
  border-left-color: blue;
  border-right-color: pink;
  margin-bottom: 1rem;
"></div>

As you can see we have an element with four colored borders and a purple center. The borders also connect with straight lines on the corners that grow inward in a triangle like shape, but they do not form a full triangle since there is the purple center in the middle. In order to make these borders form complete triangles all we need to do is remove the purple center by removing the width and height of the element.

```css {2-3}
div {
  width: 0;
  height: 0;
  border-width: 50px;
  border-style: solid;
  border-top-color: red;
  border-bottom-color: green;
  border-left-color: blue;
  border-right-color: pink;
}
```

<div style="
  width: 0;
  height: 0;
  border-width: 50px;
  border-style: solid;
  border-top-color: red;
  border-bottom-color: green;
  border-left-color: blue;
  border-right-color: pink;
  margin-bottom: 1rem;
"></div>

Now we are left with 4 perfect triangles. This is a good start, but in order to make just one triangle we need to hide three of the borders. Luckily this is pretty easy to do. All we need to do is set their color to transparent.

```css {4-5}
div {
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-left-color: blue;
}
```

<div style="
  width: 0;
  height: 0;
  border: 50px solid transparent;
  border-left-color: blue;
  margin-bottom: 1rem;
"></div>

Now by setting all the borders except one to transparent we are left with a single arrow. This arrow is also pointing in the opposite direction from the border that is colored which is important to note. We set the left border to make an arrow pointing to the right. With this knowledge it is now trivial to make the same arrow setup from the first example without having to worry about overlap or rotation.

```css
.triangle {
  position: relative;
  background-color: red;
  width: 100px;
  height: 100px;
}

.triangle::before {
  content: '';
  position: absolute;
  right: -80px;
  top: calc(50% - 40px);
  border: 40px solid transparent;
  border-left-color: blue;
}
```

<TriangleBorder />

## Conclusion

Triangles are one of the most commonly used shapes in CSS since they are perfect for dialog pop outs, tooltips, and so much more. This is why it is crucial to understand how to make perfect CSS triangles without having to rely on rotating a box or hiding a box behind something else.