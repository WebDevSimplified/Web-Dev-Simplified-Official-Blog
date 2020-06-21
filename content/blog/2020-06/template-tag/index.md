---
title: "Why Use The HTML Template Tag?"
date: "2020-06-15"
description: "An in depth explanation of why you should be using the template tag."
---

With React, Vue, Angular, and all the other frontend JavaScript frameworks being so popular many people forget about normal HTML and JavaScript, but most of the websites built today still use plain HTML and JavaScript. Even as frontend frameworks become more and more prevalent there are still many websites that don't make sense to build with a full frontend framework since they are not nearly complex enough. There may still be a need for some complex dynamic content, though, and traditionally that can be a huge pain to do in plain JavaScript. Luckily, the template tag in HTML makes adding dynamic content much easier than before.

## What Is The Template Tag?

The template tag is an HTML tag that allows you to create a group of HTML elements that are not rendered to the page. You can think of it kind of like a div with display none that has HTML inside of it, but the template tag has a few handy features that make it easier to work with than a div with display none.

First of all, using a template tag makes it very clear that the HTML inside of it is used in JavaScript in order to render dynamic content. Secondly, the template tag has very handy methods for copying the content inside of it so it can be added to the DOM repeatedly. Because of this, the best use case for the template tag is a list which can be dynamically added to.
```html
<ul>
  <li>
    <span>Item 1: </span>
    <span>Content 1</span>
  </li>
  <li>
    <span>Item 2: </span>
    <span>Content 2</span>
  </li>
</ul>
```
In the above example, if you wanted to add a new element to the list then all the HTML for the `li` would need to live in JavaScript code which is very messy and error prone, but by adding a template tag to the above HTML we can move all the HTML out of out JavaScript.
```html {12-17}
<ul>
  <li>
    <span>Item 1: </span>
    <span>Content 1</span>
  </li>
  <li>
    <span>Item 2: </span>
    <span>Content 2</span>
  </li>
</ul>

<template>
  <li>
    <span>Item: </span>
    <span>Content</span>
  </li>
</template>
```
Now our `li` is defined in HTML and in JavaScript we can just grab the template content and copy it into our original list. Let's talk about how to do that.

## How To Use The Template Tag In JavaScript

First we need to add some ids/classes to our HTML so we can select the elements in JavaScript. Let's also add in a button for adding a new item.
```html {1,11,13,15-16}
<ul id="list">
  <li>
    <span>Item 1: </span>
    <span>Content 1</span>
  </li>
  <li>
    <span>Item 2: </span>
    <span>Content 2</span>
  </li>
</ul>
<button id="add-item">Add Item</button>

<template id="list-item-template">
  <li>
    <span class="title">Item: </span>
    <span class="content">Content</span>
  </li>
</template>
```
Now with that out of the way we can dive into the JavaScript.
```js
const template = document.getElementById('list-item-template')
const list = document.getElementById('list')
const button = document.getElementById('add-item')
let itemCount = list.children.length

button.addEventListener('click', () => {
  const item = template.content.cloneNode(true)
  itemCount++
  item.querySelector('.title').innerText = `Item ${itemCount}: `
  item.querySelector('.content').innerText = `Content ${itemCount}`
  list.append(item)
})
```

At the top of this JavaScript we are getting references to the template, list, button, and the number of items in the list. From there we are adding an event listener for the button on click to add our new item. The next line is where all the magic of the template comes into play.
```js
const item = template.content.cloneNode(true)
```
On this line we are taking the content of the template, which is the `li` and cloning it. By passing `true` to `cloneNode` we are also ensuring we clone all the children elements inside the `li`. Then after that all we need to do is normal JavaScript to change the title and content to our liking before adding the element onto the end of the list.

As you can see there is no HTML code in our JavaScript, which makes the JavaScript much easier to work with. It also prevents any potential bugs from using `innerHTML` or just typing something incorrectly in the HTML.

## Conclusion

While frontend frameworks are what everyone talks about, not everyone is building sites with them. Having a tool like the template tag to make working with dynamic JavaScript easier is a great addition to your toolbelt and something you are sure to need in the future.