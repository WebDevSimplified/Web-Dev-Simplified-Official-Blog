---
title: Why You Should Use Data Attributes In CSS
date: "2019-10-21"
description: "A quick breakdown of exactly how to use data attributes with CSS to create dynamic content."
tags: ['CSS']
---

Your first thought from this title is probably that you think I am telling you to use data attributes as selectors in your CSS like this `[data-attribute] { color: white }`, but in reality I am talking about using the value of data attributes as content for your CSS. You can do this by using the `attr()` function in CSS. This function will return the value of any data attribute which can then be used in the CSS. In order to explain this further let's use the example below.

Imagine there is a notification button in your application that will display the number of unread messages in a bubble.

![Notification Bell](NotificationBell.svg)

This is a pretty common problem and can be solved by making some HTML that looks like this:

```html
<div class="container">
  <button>Bell Icon</button>
  <span class="badge">5</span>
</div>
```
and some CSS like this:

```css
.container {
  position: relative;
}
.badge {
  position: absolute;
  top: -0.75em;
  right: -0.75em;
  width: 1.5em;
  height: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: red;
  color: white;
}
```

This would give the correct result, but it is pretty cumbersome since there is a wrapper around our button and the extra span to contain the badge counter. Luckily, by using the `attr()` function we can make this much easier. Instead of having any wrappers our HTML will just be a single button.

```html
<button data-notification-count="5">Bell Icon</button>
```

Instead of having all the extra code for the notification badge we are just using a data attribute which contains the count. Now in the CSS we can use the `attr()` function to get that count.

```css
[data-notification-count] {
  position: relative;
}
[data-notification-count]::before {
  content: attr(data-notification-count);
  position: absolute;
  top: -0.75em;
  right: -0.75em;
  width: 1.5em;
  height: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: red;
  color: white;
}
```

The only real difference between the previous CSS and the new CSS is that the button element is acting as the wrapper for the count so it is being positioned relative. Then the before element of the button is being used as the badge span from the previous example, and the count of the badge is being set by using the content property of the before element. If you are not familiar with the content property, it essentially just sets the content inside the element to whatever text you set the property to. In this case the content is being dynamically changed via the data attribute of the HTML. This is amazing since it simplifies the HTML code drastically, but it also makes it easier to dynamically change the count via JavaScript since only the data attribute needs to be updated and the count will automatically change.

Now I am sure your head is racing with cool things you can do with the `attr()` function, such as dynamically setting the size of an element like this:

```html
<div data-length="10%"></div>
```
```css
[data-length] {
  width: attr(data-length)
}
```
Sadly this is not yet supported in CSS. Currently, only the content property can be set with the `attr()` function, but this type of functionality is planned for the future of CSS. In the future `attr()` will be able to take a type so that instead of returning a string it can actually return a specific type of unit like this `attr(data-background color)`. This would expect the `data-background` attribute to be set and then it would convert that value to a color. This is of course only an experimental feature of CSS, though, and no browsers support it yet. If you want to read more on the experimental use cases you can checkout the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/attr).

Because of the limitations of this function it is limited in its uses, but it is still great in cases like a notification icon or a simple tool tip.