---
layout: "@layouts/BlogPost.astro"
title: "CSS Selector Ultimate Guide"
date: "2021-12-06"
description: "CSS selectors are easy to get started with but hard to master since there are so many options which is why I created this ultimate guide to teach you not only the basics, but also the more advanced CSS selectors you need to know."
tags: ["CSS"]
---

When you first learn CSS you learn a few different types of selectors like class and id selectors, but there are hundreds of other selector combinations in CSS that you need to know in order to truly master CSS. In this article I will be covering every single type of selector and all of the most important selectors of those types that you need to know. Also, I have a [complete CSS selector cheat sheet](https://webdevsimplified.com/specificity-cheat-sheet.html) that covers all the selectors from this article plus more with visual examples that you can download for free.

_If you prefer to learn visually, check out the video version of this article._
`youtube: l1mER1bV0N0`

## Basic Selectors

To start we need to cover the most basic form of selectors and also talk about what a CSS selector is. A CSS selector is simply the code you write that determines which HTML elements your CSS styles will refer to. In the below example `.class-name` is the CSS selector since it is the part that comes before the curly braces.

```css
.class-name {
  color: blue;
}
```

When it comes to basic selectors there are really only 4 types that all other selectors are built on and those are the universal, type, class, and id selector.

### Universal Selector

The universal selector, which is just a `*`, does like it's name says and selects everything. The below code would set the margin to 0 on all elements on the page.

```css
* {
  margin: 0;
}
```

This selector is perfect for when you want to make large changes across your entire page such as setting `box-sizing` or removing margins, but is generally not used for much else.

### Type Selector

The type selector is a selector that you will use relatively rarely as it is just too general to be useful. The type selector allows you to select all elements of a particular type, such as all `div` or `img` elements. To use this selector just put the name of the element you want to select. The below example selects all `div` elements.

```css
div {
  background-color: red;
}
```

I recommend never using this type of selector since it is too easy to accidentally add styles to elements you don't actually want to add styles too. The only time I would ever use the type selector is if I wanted to set some default styles that apply to my entire site such as setting `font-size` for heading tags, or selecting the `body` tag to remove margins.

### Class Selector

This is by far the most common type of selector that you will see. Classes are attributes that you can add to any HTML element that serve no purpose other than to be used with CSS or JavaScript. These class selectors are amazing in CSS since they allow you to specify which elements you want to style in the HTML and you can also share styles between multiple elements by giving them the same class.

```html
<button class="btn btn-primary">Save</button>
<button class="btn btn-danger">Cancel</button>
```

In the above example you can see we gave both our buttons the `btn` class so they can both share the styles associated with that class in our CSS. We also gave them each their own `btn-primary` or `btn-danger` class to add extra styles for those specific buttons. To use a class selector in CSS you simply put the name of the class you want to select after a period.

```css
.btn {
  border: 1px solid black;
}

.btn-primary {
  background-color: blue;
}

.btn-danger {
  background-color: red;
}
```

_On a side note I mentioned how you can use classes in JavaScript, but I generally consider doing so a bad practice. If you want to know why then you should read [this article on why I don't use classes in JavaScript](/2019-10/do-not-use-class-selectors-in-javascript)._

### Id Selector

The final basic selector is id selectors. They are very similar to class selectors in that you can define ids on HTML elements and then reference them in CSS, but there are a few differences.

The first main difference is that id selectors cannot be shared between elements on the same page since in HTML an id is unique so no two elements on the page can have the same id.

Id selectors are also more specific which makes them override a lot of other CSS styles which you do not want. If you are unsure of how specificity works in CSS you should check out my [complete CSS specificity article](/2020-02/css-specificity) which covers specificity in depth with interactive examples.

The final difference is that id selectors start with a `#` symbol instead of a period.

```html
<nav id="nav-bar">...</nav>
```

```css
#nav-bar {
  margin-bottom: 1rem;
}
```

## Combination Selectors

The real power of CSS selectors comes in your ability to combine selectors together. There are 6 main combination selectors you need to know which will allow you to select the exact element you want every time.

### Descendant Selector

The first type of combination selector is the descendant selector. This selector allows you to select any element that matches a specific selector which is a descendant of an element that matches a different selector. Let's take a look at a quick example.

```css
div span {
  color: red;
}
```

```html {2,4}
<div>
  <span>Selected</span>
  <a>
    <span>Selected</span>
  </a>
</div>
<span>Not</span>
```

The above CSS selector selects all span elements that are descendants of a div element. You will notice that this means the first span is selected since it is a direct child of the div. The second span is also selected since while it is not a direct child of a div it is a descendant of a div. The final span is not selected, though, since it is not inside a div.

Now in order to use a descendant selector all you need to do is separate two selectors by a space. The first selector will be the parent selector and the second selector will be the selector for the descendants.

### Direct Child Selector

Similar to the descendant selector, the direct child selector is for selecting child elements, but the main difference is the direct child selector will only select an element that is the direct child of the first parent selector.

```css
div > span {
  color: red;
}
```

```html {2}
<div>
  <span>Selected</span>
  <a>
    <span>Not</span>
  </a>
</div>
<span>Not</span>
```

As you can see above the span inside the a tag is not selected since it is not a direct child of the div and instead is a direct child of an a tag. The first span is selected, though, since it is the direct child of a div.

In order to use a direct child selector just put a greater than symbol between the first selector and the second selector.

### General Sibling Selector

This next selector is all about selecting siblings, but can be a bit confusing. Let's take a look at an example and I will explain what I mean.

```css
div ~ a {
  color: red;
}
```

```html {3,4}
<a>Not</a>
<div></div>
<a>Selected</a>
<a>Selected</a>
```

You would think since this selector is called the general sibling selector that it would select all elements that are siblings of the first element, but it actually only selects the siblings that come **after** the first selector. This is because CSS can only read in one direction so has no way to modify elements that come before other elements.

As for the actual selector itself all you need to do is put a `~` between the selectors. The first selector will be for the sibling to check after and the second selector is for the actual siblings you are checking for.

### Adjacent Sibling Selector

Similar to the general sibling selector the adjacent sibling selector is for selecting siblings, but this selector can only select the element that comes direct after the first element.

```css
div + a {
  color: red;
}
```

```html {3}
<a>Not</a>
<div></div>
<a>Selected</a>
<a>Not</a>
```

As you can see above the only a tag that is selected is the one directly after the div. It is also important to note that if the sibling directly after the div was something other than an a tag then the selector we have written would do nothing since it can only select the element that is the first element after the div.

To use this selector just put a `+` between the first and second selector.

### Or Selector

Now we are coming to my two favorite combination selectors, the or and and selectors. First we will talk about the or selector which is a way to write a CSS selector that will select elements that match at least one of the selectors.

```css
div,
span {
  color: red;
}
```

```html {1,3,4}
<div>Selected</div>
<a>Not</a>
<div>Selected</div>
<span>Selected</span>
```

The above selector selects all elements that are either a div or a span. This is great if you want to have multiple selectors do the same thing. To use the or selector just separate your selectors by a comma. Generally, if the selectors are long I will separate them onto different lines to make them easier to read.

```css
.really-really-long-name,
.another-name {
  color: red;
}
```

### And Selector

The final combination selector is the and selector and it is probably the most used combination selector. This selector allows you to write CSS selectors that force elements to match all the selectors specified.

```css
div.red {
  color: red;
}
```

```html {1}
<div class="red">Selected</div>
<div>Not</div>
<span class="red">Not</span>
```

As you can see only the div with the class of red is selected in the above example. Using the and combination selector is also incredibly easy since all you have to do is write all the selectors right next to each other with no spacing between them.

The only important thing to know about this selector is that if you are using a universal selector or a type selector then you must put the type/universal selector first.

```css
div.red {
} /* Good */
.reddiv {
} /* Bad */
```

### Combination Selector Important Notes

The important thing to know about these combination selectors is that you can utilize any of the selectors we talk about in combination with each other even other combination selectors.

```css
div.container > .large.red {
  font-size: 2rem;
  color: red;
}
```

For example, in the above selector we combined together multiple type and class selectors using direct child combinations with and combinations. This ability to combine together infinitely many selector combinations is what makes CSS so flexible.

## Pseudo Element Selectors

Now that we have covered the most common types of selectors we need to talk about a few other selectors that you will still use all the time, but are a bit more niche. The first type we are talking about are pseudo element selectors which there are only 2 that you need to know and they are both almost identical. _If you want to go more in depth on pseudo elements check out my [pseudo element ultimate guide article](/2021-12/css-pseudo-elements)._

_If you prefer to learn visually I have a full video on pseudo elements you can watch._
`youtube: OtBpgtqrjyo`

### Before Pseudo Element

The before pseudo element is an element you can create which will be placed as the very first child of the element you are creating it for.

```css
div::before {
  content: "Child 0";
}
```

```html
<div>
  <span>Child 1</span>
  <span>Child 2</span>
</div>
```

In the above code we are using the before pseudo selector to select the before element for our div. This will create a new element in our HTML that has the text "Child 0" inside of it. You will notice in our HTML, though, there is no element corresponding to the ::before element and that is because the pseudo element is created entirely in CSS and when we write our HTML we don't reference it.

Now to create a pseudo element just prefix it `::` and then put the type of pseudo element you are selecting. In our case we are creating a before pseudo element inside every div on our page.

### After Pseudo Element

The after pseudo element is exactly the same as the before pseudo element except that it is added as the last child of the element instead of the first.

```css
div::after {
  content: "Child 3";
}
```

```html
<div>
  <span>Child 1</span>
  <span>Child 2</span>
</div>
```

### Pseudo Element Selector Important Notes

You must include a content property for your pseudo elements or they will not exist on the page. It can simply be an empty string, though, if you don't want it to have any content.

```css
div::after {
  content: "";
}
```

Pseudo elements also can be defined using a single colon, but this is not recommended and is only implemented for backwards compatibility.

```css
div:after {
  content: "Technically it works";
}
```

You also cannot add pseudo elements to elements that replace their content with something else such as an `img` element.

Lastly, pseudo elements will show up in your browser dev tools which can make debugging them much easier.

## Pseudo Class Selectors

Now this is really where CSS starts to become a vast world of selectors. There are hundreds of pseudo classes which are all used to represent special states of elements that you can use as selectors in CSS, but there are really only a handful that are truly important for you to understand.

I will try to cover as many as I can here, but if you want a complete list of all the pseudo selectors that are important to know you should [download my free selector cheat sheet](https://webdevsimplified.com/specificity-cheat-sheet.html).

To define a pseudo class it is nearly identical to pseudo elements, but you use one colon instead of two.

### Hover Pseudo Class

Probably the most useful CSS pseudo class is hover. The hover pseudo class allows you to style an element differently when it is hovered. For example, you can change the background color of a button so users know it is clickable.

```css
button:hover {
  background-color: red;
}
```

### Focus Pseudo Class

The focus pseudo class is another really important selector since it allows you to style an element based on if it has focus or not. For example you can change the border color of an input field when it is focused.

```css
input:focus {
  border-color: blue;
}
```

### Checked Pseudo Class

The checked pseudo class allows you to style an element based on if it is checked or not. For example you can change the opacity of a checkbox when it is checked.

```css
input:checked {
  opacity: 0.8;
}
```

### Disabled Pseudo Class

The disabled pseudo class allows you to style an element based on if it is disabled or not. For example you can change the background color of an input when it is disabled.

```css
input:disabled {
  background-color: gray;
}
```

### First Child Pseudo Class

The first child pseudo class selects the first child inside a parent.

```css
a:first-child {
  color: red;
}
```

```html {2}
<div>
  <a>Selected</a>
  <a>Not</a>
</div>
<div>
  <span>Not</span>
  <a>Not</a>
</div>
```

The important thing to note about this selector is it selects the first child and not the first child element that matches the CSS selector. That is why the a tag in the second div is not selected.

You can also use the `only-child`, `last-child`, `nth-child`, and `nth-last-child` selectors which do nearly the same things, but are for selecting other specific children.

### First Of Type Pseudo Class

The first of type pseudo class selects the first child inside a parent that matches the specific element type.

```css
a:first-of-type {
  color: red;
}
```

```html {2,7}
<div>
  <a>Selected</a>
  <a>Not</a>
</div>
<div>
  <span>Not</span>
  <a>Selected</a>
</div>
```

The important thing to note about this selector is it doesn't care if the element is the first child or not. It only cares that it is the first of a specific type.

You can also use the `only-of-type`, `last-of-type`, `nth-of-type`, and `nth-last-of-type` selectors which do nearly the same things, but are for selecting other specific children.

### Not Pseudo Class

The final pseudo class I want to cover is the not pseudo class which allows you to select elements that do not match a specific selector.

```css
a:not(.green) {
  color: red;
}
```

```html {1,2}
<a>Selected</a>
<a class="large">Selected</a>
<span class="red">Not</span>
<a class="green">Not</a>
```

The not pseudo class works by putting another selector inside parenthesis inside the `:not` selector. This selector in the parenthesis is the not selector so in our example we are selecting all a tags that do not have the class green.

## Attribute Selectors

The final type of selector I want to talk about is the attribute selector. This selector allows you to select any element based on the attributes that it has. This is really useful when used in combination with custom data attributes.

An important note about attribute selectors is that they all are defined within square brackets.

_If you want to go in depth with data attributes you should check out my [complete CSS data attribute guide](/2019-10/use-data-attributes-in-css) as well as my [JavaScript data attribute guide](/2020-10/javascript-data-attributes)._

### Has Attribute Selector

The most basic form of attribute selector is the has attribute selector. This selector just checks to see if an element has the specified attribute.

```css
[data-active] {
  color: red;
}
```

```html {1,2,3}
<div data-active>Selected</div>
<div data-active="true">Selected</div>
<div data-active="false">Selected</div>
<div>Not</div>
```

The has attribute selector doesn't care what the value of the attribute is or even if there is a value for the attribute. It only cares that there is an attribute on the HTML element that matches the specified attribute in CSS.

### Exact Attribute Selector

If you want to check for a specific value instead you need to use the exact attribute selector.

```css
[data-active="true"] {
  color: red;
}
```

```html {2}
<div data-active>Not</div>
<div data-active="true">Selected</div>
<div data-active="false">Not</div>
<div>Not</div>
```

The exact attribute selector will only match elements that have the specified attribute with the exact specified value. The equal sign between the attribute name and the value is what defines this as an exact attribute selector.

### Begins With Attribute Selector

If you want to check for an attribute that starts with a specific value then you need the begins with attribute selector.

```css
[data-active^="t"] {
  color: red;
}
```

```html {2,3}
<div data-active>Not</div>
<div data-active="true">Selected</div>
<div data-active="test">Selected</div>
<div data-active="false">Not</div>
```

The caret symbol followed by an equal sign between the attribute name and the value is what defines this as a begins with attribute selector.

### Ends With Attribute Selector

This is identical to the begins with attribute selector but for checking the end of the value instead.

```css
[data-active$="e"] {
  color: red;
}
```

```html {2,3}
<div data-active>Not</div>
<div data-active="apple">Selected</div>
<div data-active="true">Selected</div>
<div data-active="test">Not</div>
```

The dollar sign followed by an equal sign between the attribute name and the value is what defines this as an ends with attribute selector.

### Substring Attribute Selector

This is similar to the last two selectors, but it checks that the string passed to it appears anywhere in the attribute value.

```css
[data-active*="e"] {
  color: red;
}
```

```html {2,3}
<div data-active>Not</div>
<div data-active="apple">Selected</div>
<div data-active="test">Selected</div>
<div data-active="gap">Not</div>
```

The asterisk sign followed by an equal sign between the attribute name and the value is what defines this as a substring attribute selector.

## Conclusion

CSS selectors are incredibly powerful and vast in their uses, but you really only need to know the small handful of selectors listed above to write impressive CSS. Also, if you want a quick cheat sheet that you can reference as needed I highly recommend downloading [my free CSS selector cheat sheet](https://webdevsimplified.com/specificity-cheat-sheet.html).
