---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "CSS :has A Parent Selector And It Is Better Than I Ever Could Have Hoped For"
date: "2022-09-26"
description: "CSS has been lacking a parent selector for years and now they finally introduced one with the :has pseudo class and it is incredible!"
tags: ['CSS']
---

If you have ever tried to create complex CSS styles most likely you have run into the need to style a parent element based on the child elements inside it. This is such a common use case to run into, but CSS has never had a way to do this and honestly I never thought they would implement a way to do this, but just recently CSS released the `:has` selector which does all of this and more.

## What Is The `:has` Selector?

The `:has` selector is a pseudo class similar to `:hover` and `:focus`, but it works very similar to the `:is` and `:not` pseudo classes if you are familiar with those. In order to use the `:has` selector you need to pass a selector (or list of selectors) to the `:has` selector which will be applied to the parent element. This sounds confusing in words so let me show you an example.
```css
.heading:has(.subtitle) {
  margin-bottom: 1rem;
}
```
This simple selector says that we should select any element with the class of `.heading` which contains an element with the class `.subtitle` inside it and apply a special margin on the bottom. This means we are able to set the margin on the bottom of our `.heading` to 1rem based on the elements inside the `.heading`.
```html
<h1 class="heading"> <!-- SELECTED -->
  <span class="subtitle"></span>
</h1>

<h1 class="heading"></h1> <!-- NOT SELECTED -->
```

If you are familiar with CSS this may seem really backwards since normally in CSS you can only select the last element in a list, but the `:has` pseudo element allows us to check for the existence of elements inside other elements while still selecting the actual parent element that we care about.

## Advanced Usage

The above example we talked about shows the most straightforward way to use the `:has` selector, but you can actually do quite a bit more with it.

### Using Complex Selectors

Instead of just passing a single class to the `:has` selector we can actually pass any selector we want.
```css
.heading:has(> .subtitle strong#accent) { }
```
This much more complex selector still works just fine and will select any `.heading` element that has a direct child with the class of `subtitle` which contains a `strong` element in it with the id of `accent`.

### More Than Just A Parent Selector

So far all the examples we have talked about have shown you how to use this selector as a parent selector, but it can do so much more than that.
```css
.heading:has(.subtitle) p { }
```
This selector will select any p tag that is inside a `.heading` element as long as that `.heading` element contains a `.subtitle` element. By utilizing our `:has` selector in the middle of our selector we can create some incredibly complex selectors that can achieve things that I never thought would be possible in CSS.

### Using Multiple Selectors

You can also combine together multiple selectors in your `:has` selector to check for some truly complex stuff.
```css
.heading:has(.subtitle, p) { }

.heading:has(.subtitle):has(p) { }
```
The above lines of code look similar but they actually check for different things. The first selector will select a `.heading` that has either an element with the class of `subtitle` inside it or a `p` element inside it while the second selector will only select a `.heading` that has both a `.subtitle` and `p` element inside it.


## Specificity

Calculating specificity with the `:has` selector is a bit complex compared to a normal pseudo class. *If you unfamiliar with how CSS specificity is calculated check out my [ultimate CSS specificity guide](/2020-02/css-specificity).*

When you just use a single `:has` selector and only have one selector inside it the specificity is easy to calculate since you just combine the specificity of the `:has` selector with the specificity of the outside selector.
```css
.heading:has(.subtitle p) { }
```
This selector has a specificity of 1 class outside the `:has` selector and a specificity of 1 class and 1 element inside the `:has` selector which means overall the specificity of the selector is 2 classes and 1 element. It would be the same specificity as the below code.
```css
h1.heading.blue { }
```
The specificity gets a bit more complex when dealing with multiple selectors in one `:has`.
```css
.heading:has(.subtitle, p) { }
```
You may think this will have the same specificity as the above example, but when you pass multiple selectors (separated by a comma) to `:has` it only uses the specificity of the most specific selector. That means since the `.subtitle` selector is more specific than the `p` selector the specificity inside the `:has` selector will be just 1 class so the overall specificity of this selector is 2 classes and is equivalent to the below code.
```css
.heading.blue { }
```
Finally, this gets even more complex when dealing with multiple `:has` selectors. Each `:has` selector will calculate its own specificity and you combine them all with the overall specificity of the selector.
```css
.heading:has(.subtitle):has(p) { }
```
This selector has an overall specificity of 2 classes and 1 element since the first `:has` selector has a specificity of 1 class and the second `:has` selector has a specificity of 1 element. Those specificities are then all combined with the specificity of the code outside the `:has` selectors which is 1 class to give you an overall specificity of 2 classes and 1 element.

## Browser Support

With every cool CSS feature you always have to consider browser support, but luckily the browser support for this new property is quite good. It may seem low considering it only has [56.2% support](https://caniuse.com/css-has), but this is a bit misleading since every major browser other than Firefox has support for this feature. The reason for the low percentage is because this features just launched at the end of August 2022 in Chrome so people are still in the process of updating Chrome to the latest versions. Firefox also has this feature behind a feature flag which hopefully means it is coming to the browser very soon. In just a few months this feature should be above 90% and able to be used on pretty much every site.

## Conclusion

A parent selector is something I have been hoping for in CSS for years and now that it is finally here I am incredibly excited. Not only that, but the implementation they created is even better than just a plain parent selector. I cannot wait for this to have good browser support.