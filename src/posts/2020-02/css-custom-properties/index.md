---
title: CSS Custom Properties
date: "2020-02-17"
description: "Everything you need to know about CSS custom properties."
tags: ['CSS']
---

For the longest time, changing a brand color in CSS that is used across an entire codebase would require a developer to use a ton of find/replace to update the color with the hopes that no unintended side effects occur. Because of this, many developers turned to CSS pre-processors such as SASS to handle variables in CSS. This meant that a developer only ever had to update a single variable in SASS instead of needing to find/replace the color value across every CSS file. Over the last few years CSS has been busy at work adding new features and one of those features is custom properties. These custom properties are CSS's version of variables and are much more powerful than any pre-processor variable.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: oZPR_78wCnY`

## What Are Custom Properties Exactly?

As I already mentioned custom properties are a way to declare variables in CSS. Here is a simple example of a CSS custom property.
```css
body {
  --this-is-my-custom-property: 10px;
}
```
As you can see, defining custom properties is pretty much the same as defining any other property in CSS, with the only real difference being that custom properties must start with two hyphens (`--`). You can use any text after the two hyphens that you want and that will be the name of the custom property you are creating. Then all that is left to do is give the property a value just like any other CSS property. Using these properties is also incredibly straightforward. CSS has a `var` function which takes the name of a property and outputs the value of that property.
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
Because of the similarities between these two sets of code you may wonder why even use custom properties. In my opinion, the biggest benefit to using custom properties in this way is when you want to overwrite single parts of a property without redefining the entire property.
```css
.btn:hover {
  --scale: 1;

  transform: rotate(45deg) scale(var(--scale));
}

.btn.btn-grow:hover {
  --scale: 1.5;
}
```
The equivalent of the above code would be this.
```css
.btn:hover {
  transform: rotate(45deg);
}

.btn.btn-grow:hover {
  transform: rotate(45deg) scale(1.5);
}
```
Not using custom properties leads to duplication of the rotate transform which makes the CSS more difficult to maintain and change in the future. By using custom properties complex property values like this can be broken apart with no need for duplication.

## Custom Property Default Values

In the previous code example the `--scale` custom property needed to be defined in the `.btn:hover` selector so the scale function would work, but it is clunky to define a variable which is only used as a fallback value. Because of this custom properties have the ability to define a fallback value when the custom property is not defined. This is done by simply passing the fallback value as the second parameter to the `var` function.
```css
.btn:hover {
  transform: rotate(45deg) scale(var(--scale, 1));
}

.btn.btn-grow:hover {
  --scale: 1.5;
}
```
Now instead of having to define a `--scale` variable in the `.btn:hover` selector, the `var` function handles the fallback by setting the scale to 1 if `--scale` is not set. This is incredibly useful when making complex property values like `transform` or `box-shadow` with custom properties.

## Custom Properties In JavaScript

Since custom properties are a part of CSS and not compiled out of the code like they are in a pre-processor they can be accessed and modified in JavaScript. Let's use the following CSS to demonstrate how to access and modify custom properties in JavaScript.
```css
:root {
  --color: red;
}

.custom-btn {
  --background-color: blue;

  color: var(--color);
  background-color: var(--background-color);
}
```
We have custom properties set on both elements with the `.custom-btn` class as well as the document root which in the case of web development is the html element. Here is how we would go about getting the value of these properties in JavaScript.
```js
/* This will return the value of the --color custom property
   from the root element */
getComputedStyle(document.documentElement).getPropertyValue('--color')

const customButton = document.querySelector('.custom-btn')
/* This will return the value of the --color custom property
   from the root element since it is inherited down to the
   customButton element. */
getComputedStyle(customButton).getPropertyValue('--color')

/* This will return the value of the --background-color
   custom property from this customButton element */
getComputedStyle(customButton).getPropertyValue('--background-color')
```
The code works by first getting the computed style of the element. This will make sure all inherited values, such as `--color` for the custom button, are properly computed. Then the `getPropertyValue` function is used to get the value of the property as if it were any other CSS property.

As for setting the value of a custom property it is even simpler.
```js
/* This will set the value of the --color custom property
   to green on the root element */
document.documentElement.style.setProperty('--color', 'green')

const customButton = document.querySelector('.custom-btn')
/* This will set the value of the --background-color
   custom property to yellow for this customButton */
customButton.style.setProperty('--background-color', 'yellow')
```
Setting the custom property is just like setting any other CSS property. First the style of the element needs to be accessed and then the `setProperty` function can be used by passing the name of the property to set and the value to set it to.

## Conclusion

Custom properties are one of the many amazing features added to CSS in the last few years. They give you the ability to easily store shared values, write complex multipart property values, and most importantly access and modify them in JavaScript. This makes creating easy to maintain clean CSS so much easier.