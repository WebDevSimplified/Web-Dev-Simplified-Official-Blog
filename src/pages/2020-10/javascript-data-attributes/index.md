---
layout: "@layouts/BlogPost.astro"
title: "Data Attributes In JavaScript"
date: "2020-10-19"
description: "How to use data attributes in JavaScript."
tags: ["JavaScript"]
---

One of the best ways to store data in HTML is with data attributes. These data attributes can be used to do some pretty cool things in CSS without the need for JavaScript, as seen in [this article](/2019-10/use-data-attributes-in-css), but data attributes are most useful when combined with JavaScript. In this article I will teach you exactly how to use data attributes in JavaScript and what makes them so powerful.

## Data Attribute Introduction

To get started talking about data attributes we need to first have some HTML with data attributes. To create a data attribute in HTML we just need to add a custom attribute to our HTML element that starts with `data-`.

```html
<div
  id="test-div"
  data-first-name="Kyle"
  data-last-name="Cook"
  data-active
></div>
```

### Reading Data Attributes

We now have a div with three custom data attributes. Now let's move over to JavaScript to see how we would access these data attributes.

```js
const div = document.getElementById("test-div")

console.log(div.dataset)
```

The `dataset` property on an element will return a `DOMStringMap` which is essentially just an object that contains all the custom data attributes of an element. Our `dataset` looks like this.

```js
{
  active: ""
  firstName: "Kyle"
  lastName: "Cook"
}
```

You will notice two interesting things about this.

First, all of our properties are converted from snake case, `first-name`, to camel case, `firstName`. This is because in JavaScript object properties are primarily written as camel case so this just makes working with the JavaScript object much easier.

Second, the `active` property has a value of `""`. This is because any data attribute without a value is assumed to have an empty string as its value.

Now in order to access an individual data attribute we just access it like a property on an object since `dataset` is just an object.

```js
const div = document.getElementById("test-div")

console.log(div.dataset.firstName)
// Kyle
console.log(div.dataset.lastName)
// Cook
```

### Writing Data Attributes

In order to create a new data attribute in JavaScript we just need to add a new property to the `dataset` object with a value.

```js
const div = document.getElementById("test-div")

div.dataset.test = "Hi"
console.log(div.dataset.test)
// Hi
```

This will update the dataset object and our HTML which means our HTML will look like this.

```html
<div
  id="test-div"
  data-test="Hi"
  data-first-name="Kyle"
  data-last-name="Cook"
  data-active
></div>
```

### Updating Data Attributes

Let's say that we now want to update the value of a data attribute. This is incredibly easy since it works just like a normal object. We just need to set the value of our `dataset` property to the new value and it will update the HTML for us.

```js
const div = document.getElementById("test-div")

div.dataset.firstName = "Sally"
console.log(div.dataset.firstName)
// Sally
```

This will update the dataset object and our HTML which means our HTML will look like this.

```html
<div
  id="test-div"
  data-first-name="Sally"
  data-last-name="Cook"
  data-active
></div>
```

### Delete Data Attributes

Deleting data attributes is a bit different since we need to actually remove the property from our object. This is because if we try setting the value to `undefined` or `null` the `dataset` object will still have a reference to that property with that value of `undefined` or `null` and will set the value of our HTML data attribute to the string `null` or `undefined`.

To delete an element we need to use the `delete` keyword to remove it completely from the object.

```js
const div = document.getElementById("test-div")

delete div.dataset.active
console.log(div.dataset.active)
// undefined
```

This will update the dataset object and our HTML which means our HTML will look like this.

```html
<div id="test-div" data-first-name="Sally" data-last-name="Cook"></div>
```

## Real World Example

Now let's combine all this into a real world example. Let's say you have the following HTML.

```html
<button>Open Modal 1</button>
<button>Open Modal 2</button>

<div id="modal-1">Modal 1</div>
<div id="modal-2">Modal 2</div>
```

You want to write JavaScript so that the first button opens modal 1 and the second button opens modal 2, but we want to do this in a way that is reusable so if we add a third button that opens a new modal we don't need to write any new JavaScript code.

This may sound really difficult at first, but essentially all we need is some way to link each button to their respective modal in the HTML. This is where data attributes come in.

We can set a custom data attribute on each button that references the modal they are linked to. In our case we can use the id of each modal as our reference.

```html
<button data-modal-id="modal-1">Open Modal 1</button>
<button data-modal-id="modal-2">Open Modal 2</button>

<div id="modal-1">Modal 1</div>
<div id="modal-2">Modal 2</div>
```

So now we have a way to access the id of the modal linked to each button inside JavaScript.

```js
const buttons = document.querySelectorAll("[data-modal-id]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const modalId = button.dataset.modalId
    const modal = document.getElementById(modalId)
    modal.classList.add("show")
  })
})
```

In the above code we are selecting all elements that contain our custom `data-modal-id` attribute. We are then looping through them and adding a click event listener to each one. Inside this event listener we are using the modal id to get the modal link to that button and adding the show class so it is now visible.

This code is also flexible since it will get any element with the custom `data-modal-id` attribute. This means that if we add a new button that references a new modal we won't need to write any additional JavaScript.

## Conclusion

Data attributes in JavaScript are incredibly useful. They allow you to write extremely flexible code which means you can spend more time writing the HTML for your project and less time worrying about writing a custom event listener for each new element you add.
