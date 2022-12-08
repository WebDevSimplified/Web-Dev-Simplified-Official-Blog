---
setup: |
  import Layout from '/src/layouts/BlogPost.astro'
  import CSSRangeEasterEgg from "/src/blogComponents/cssRangeEasterEgg/CSSRangeEasterEgg.astro"
title: "New CSS Range Media Queries"
date: "2022-12-05"
description: "Defining media queries with min-width and max-width is not super intuitive which is why CSS added range media queries and they are amazing."
tags: ['CSS']
---


I hate media queries. I know that may sound crazy, but I just hate the syntax of them. Writing code like `min-width: 300px` has never been intuitive to me. I can never remember if this is meant for screens larger or smaller than 300px and somehow I always seem to get it wrong each time. This is why I am so excited that modern CSS is removing the need to ever define media queries like this again with the introduction of range media queries. Not only does this syntax make CSS media queries easier to read and write, but it also fixes a few edge cases with media queries.

## The Old Way

*Before you read any further into this article if you unfamiliar with the standard media query syntax I recommend you check out the below video on media queries.*
`youtube: yU7jJ3NbPdA`

As you already know if you want to define a media query for screen sizes above a certain width you would write something like this.
```css
@media (min-width: 1000px) {}
```
The styles in this media query will only be applied on screen widths 1000px and above. If you wanted to do the same for small screen sizes you would do something like this.
```css
@media (max-width: 700px) {}
```
The styles in this media query will apply to any screen 700px or less in width. If you wanted to have a query in the middle of those values if would look like this.
```css
@media (max-width: 700px) and (min-width: 1000px) {}
```
The styles in this media query will apply to any screen between 700px and 1000px in width. This works perfectly fine, but is overall a bit difficult to read and can lead to simple mistakes and bugs if, for example, you add some mobile specific code into the desktop specific media query. This is why the new range selectors are so great.

## The New Way

Let's take the above media queries and convert them to the new range syntax.
```css
/* Greater than or equal to 1000px */
@media (width >= 1000px) {}

/* Less than or equal to 700px */
@media (width <= 700px) {}

/* Between 700px and 1000px */
@media (700px <= width <= 1000px) {}
```
This new syntax adds less than and greater than syntax which makes writing media queries easier and more importantly makes them so much easier to read. I especially love the ability to do a range where the width is between two values. Below are all the new operators that are added with this update:

* `<`
* `<=`
* `>`
* `>=`
* `=`

<CSSRangeEasterEgg>
  The first 4 inclusions on this list make a ton of sense, but the final inclusion of equals seems a bit strange. There are almost no use cases where you would ever want to use an `=` comparison since it will only work when the width of a page is exactly that pixel value, but it can be fun for easter eggs. For example I made it so this paragraph will change the text color to red at exactly 999px (sorry if your device happens to be that exact size).
</CSSRangeEasterEgg>

## How This Solves Media Edge Cases

Take for example the following code.
```css
@media (min-width: 500px) {}
@media (max-width: 500px) {}
```
The first media query will match all devices greater than 500px, the second media query will match all devices less than 500px, but what happens at exactly 500px? Both media queries will apply at 500px which could lead to weird issues or bugs with your code. This is why the new range selectors are nice since you can rewrite this as follows.
```css
@media (width >= 500px) {}
@media (width < 500px) {}
```
Now at 500px only the first media query will be used while the second will only apply to screens less than 500px.

This probably isn't a huge deal, but I guarantee if you ran into a bug that was caused by this it would be very difficult to find and a massive time sink so the fact these new range queries get around that is really nice.

## Browser Support

Now we come to everyone's least favorite part about web development: Browser Support. Unfortunately, support for this feature is not quite good enough to use in production code as it only has [71% support](https://caniuse.com/css-media-range-syntax) across all browsers. The only major browser holding this back is Safari as Safari on desktop and mobile both do not support this feature. Luckily, tools like PostCSS make it so you can write modern CSS like this and transpile it to CSS that any browser can understand so if you are using a tool like PostCSS you can use this feature today with no issues.

## Conclusion

Overall I really love the simplicity and readability of the new range selectors in CSS and hope that they continue to improve readability with future CSS updates.

