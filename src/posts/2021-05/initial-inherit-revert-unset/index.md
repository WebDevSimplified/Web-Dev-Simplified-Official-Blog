---
title: "CSS Initial vs Inherit vs Unset vs Revert"
date: "2021-05-31"
description: "Understanding how to undo and remove styles in CSS is a skill most developers never learn, but it is incredibly useful."
tags: ['CSS']
---

If you have ever written CSS before then chances are you have had to write CSS like this.
```css
.btn {
  background: none;
  border: none;
  font-size: 1rem;
  font-family: Roboto;
}
```
This is because browsers give us default CSS values that we often manually remove or use a CSS reset to remove. It is often frustrating running into these default styles as they can be a pain to workaround, so in this article I will show you all the different ways you can inherit/reset CSS styles to get the exact look you want.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: N8tFrMZp_wA`

## What Does `initial` Do?

The easiest CSS value to understand is `initial`. This value just resets the CSS property to its initial value. You may be confused when using this, though, because the initial CSS value for properties is not always what you think it is since it often differs from the browser's default styles.

Take for example a simple div. Everyone knows that a div is a display block element, but that display block value actually comes from the default styles of the browser. The initial value for the display property in CSS is actually inline. This means if you set a div's display property to initial then it will become an inline element.

In order to understand a bit more how this works we need to talk about the three layers of CSS, default/initial styles, browser styles, and custom styles.

The default or initial styles are just the default values of every CSS property defined in the CSS specifications. These can easily be found by checking the documentation for any CSS property on MDN.

Browser styles are the specific styles that each browser assigns to elements such as buttons, block quotes, headings, etc. This is why a button in Safari looks much different than a button in Chrome. They have two separate browser stylesheets.

Finally, we have custom styles which are any styles that you write or include on the page. This can be anything from inline CSS to a CSS stylesheet you link in the head of the HTML.

These three styles are then combined using specificity and cascade rules where the default/initial styles are the least specific, followed by browser styles, followed by custom styles. This means that browser styles will override the default/initial styles and your custom styles will override all browser styles.

Tying all this back to `initial`, we can see that the value of `initial` is great to use if you really want to remove all browser specific styles.

## What Does `inherit` Do?

In CSS many properties inherit values from their parent. For example, `font-family`, `color`, and many other properties inherit their values by default. This is why you can set the color of a div to green and have all that div's children also have green text. By setting a CSS property's value to inherit you are saying that you want the value of the CSS property to be equal to the value of it's parent's property. If the parent is inheriting that property then it will continue to go up the chain until it finally finds a specific value set on one of the parent's.

For example, if I give a div a 1px solid black border and put a child inside that div then we know the border will only show up on the parent div and not the child. If I set the border property to `inherit` on the child, though, then that child will also have a 1px solid black border.

This is a very useful value to have since some elements, like buttons, have a specific `font-family` set in the browser style sheet, but you most likely want to inherit that `font-family` to match the rest of your site. This is why I almost always set my buttons to inherit their `font-family`.

It is important to remember that the `inherit` property value makes the element inherit its value from its parent element. It does not inherit its value from the cascade.
```css
div {
  color: red;
}

.blue {
  color: blue;
}

p.important {
  color: inherit;
}
```
```html
<div>
  <p class="important blue">This is red</p>
</div>
```
In the above example the p tag would have red text since it is inheriting its color from the parent div. It does not move down the cascade to the next most specific selector on that element.

## What Does `unset` Do?

`unset` is an interesting property since it will either do the same thing as `initial` or `inherit`. If a CSS property naturally inherits, such as `color`, `font-family`, etc. then it will act the same as `inherit`. If a CSS property does not naturally inherit, such as `display`, `border`, etc. then it wil act the same as `initial`. At first this may not seem very useful since you can just manually put `inherit`/`initial` as the value, but this value shines when using the `all` property.

The `all` property allows you to set one value for every single property of an element. This is really useful if you want to remove all browser specific styles from an element such as a button.
```css
.btn-all {
  all: unset;
}

.btn-no-all {
  background: initial;
  border: initial;
  font-size: inherit;
  font-family: inherit;
}
```
By using `all` we can reset everything about an element to the initial values or make sure they inherit which is ideal when creating styles for HTML elements from scratch. This is pretty much the only use case for `unset`, though.

## What Does `revert` Do?

`revert` is the finally piece of the puzzle when it comes to resetting CSS styles since `revert` allows you to reset a CSS value back to the browser specific style. If an element has been heavily modified and you want to change part/all of it back to the browser default you can set the property value to `revert` to do that.

This is not something I use too often as I prefer to just remove all browser styles, but this could be useful to change back some styles to their browser specific style after doing a `all: unset`.

## Conclusion

There are many ways to reset a CSS property which is incredibly useful for making sure that no annoying browser styles interfere with your custom styles.