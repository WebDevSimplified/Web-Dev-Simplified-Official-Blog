---
title: CSS Custom Properties
date: "2020-02-17"
description: "Everything you need to know about CSS custom properties."
---

For the longest time, changing a brand color in CSS that is used across an entire codebase would require a developer to use a ton of find/replace to update the color with the hopes that no unintended side effects occur. Because of this, many developers turned to CSS pre-processors such as SASS to handle variables in CSS. This meant that a developer only ever had to update a single variable in SASS instead of needing to find/replace the color value across every CSS file. Over the last few years CSS has been busy at work adding new features and one of those features is custom properties. These custom properties are CSS's version of variables and are much more powerful than any pre-processor variable.

## What Are Custom Properties Exactly?

As I already mentioned custom properties are a way to declare variables in CSS. Here is a simple example of a CSS custom property.
```css
body {
  --this-is-my-custom-property: 10px;
}
```
As you can see, defining custom properties is pretty much the same as defining any other property in CSS, with the only real difference being that custom properties must start with two hyphens (`-`). You can use any text after the two hyphens that you want and that will be the name of the custom property you are creating. Then all that is left to do is give the property a value just like any other CSS property. Using these properties is also incredibly straightforward. CSS has a `var` function which takes the name of a property and outputs the value of that property.
```css
body {
  --primary-color: #0AF;
  background-color: var(--primary-color);
}
```
The only important thing to remember is that the two hyphens in the custom property name must be included in the `var` function or the variable will not work. Now that is all the code it takes to create the most simple custom property, but custom properties can do so much more than just contain a simple variable in a single selector.

## Custom Properties In The Cascade

Just like everything else in CSS, custom properties can be overwritten based on where they fall in the CSS cascade. To start, custom properties always inherit into child elements. This means that if a custom property is defined in the body or root element, then it will be available in all child elements.
```css
body {
  --button-color: red;
}

button {
  /* All buttons will be red */
  background-color: var(--button-color);
}
```
When a custom property is defined multiple times in a stylesheet the most specific value based on the normal CSS cascade will be used.
```css
.btn {
  /* Any elements with the class .btn will be red */
  --button-color: red;
  background-color: var(--button-color);
}

.btn.btn-primary {
  /*
    Any elements with the classes .btn and .btn-primary
    will be green since the --button-color custom property
    is being overwritten with the green value
  */
  --button-color: green;
}
```
This above code would be the same as doing the following.
```css
.btn {
  background-color: red;
}

.btn.btn-primary {
  background-color: green;
}
```
Because of the similarities between these two sets of code you may wonder why even use custom properties. In my opinion, biggest benefit to using custom properties in this way is when you want to overwrite single parts of a property without redefining the entire property.
```css
.btn:hover {
  transform:
}
```




 but what makes them really useful, is that just like everything else in CSS they follow the cascade. This means that the value of a custom property can be overridden based on normal cascade and specificity rules. Let's look at a quick example of how to declare custom properties first.