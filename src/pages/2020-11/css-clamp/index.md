---
layout: "@layouts/BlogPost.astro"
title: "CSS Clamp Is Amazing"
date: "2020-11-02"
description: "A short explanation of how to use clamp in CSS."
tags: ["CSS"]
---

There are tons of amazing properties and features in CSS, but one that no one seems to be talking about is the clamp function. This function lets us do things like `min-width`, `max-width`, and `width` for any CSS property. Let me explain.

## CSS Clamp Syntax

The clamp function works just like any other function in CSS. This particular function takes three parameters which are separated by commas. Here is an example of the clamp function in action.

```css
.class {
  font-size: clamp(1rem, 2vmin, 3rem);
}
```

The above code is setting our `font-size` to `2vmin`, but it is also specifying a minimum and maximum for `font-size`. This would be the same as doing something like the following.

```css
.class {
  font-size: 2vmin;
  min-font-size: 1rem;
  max-font-size: 3rem;
}
```

The reason this is so amazing, though, is that `min-font-size` and `max-font-size` don't actually exist, but with clamp we can emulate them.

By using clamp our font-size will scale with the size of the screen in a ratio of 2vmin, but it will never be smaller than 1rem and it will never grow larger than 3rem.

## Conclusion

While this function is very simple to use and understand, it opens the door to so many possibilities that were previously impossible.
