---
title: Why You Shouldn't Use Class Selectors In JavaScript
date: "2019-10-14"
description: "A breakdown of why the common practice of using class selectors in JavaScript makes code impossible to refactor, and what you should do instead."
tags: ['CSS', 'JavaScript']
---

If you have been doing web development for any amount of time then you have most likely run across or written code that looks like this `document.querySelector('.class')`. Now there is technically nothing wrong with this code and you will see code like this more often than not, but what if I told you there was a much better way to select elements in JavaScript.

## What Are Data Attributes?

That better way to select elements is by using data attributes. If you are not familiar with data attributes they are essentially custom attributes that you can add to any HTML element, and they will always start with `data-`. For example you could have an element like this `<div data-accordion-container>...</div>` which has the `data-accordion-container` attribute. You can also specify values for these custom data attributes like this `<div data-children-count="3">...</div>`. I don't want to go too in depth into what data attributes are since that is not the focus of this article so if you want some more information you can checkout [my full data attributes article](/2020-10/javascript-data-attributes). So now that I have explained what data attributes are, let me explain why you should be using them to select elements instead of classes.

## Why Data Attributes Are Perfect For JavaScript Selectors

The first and most obvious reason is that you can be more expressive in your selectors. Since a data attribute can have a value you can use that value in the selector to make easy dynamic selectors. For example, let's imagine we have an element that can toggle between active and inactive when clicked on. If we used a class based approach we would need to have a class for active and inactive which would lead us to have elements that look like this:
```html
<div class="active">...</div>
<div class="inactive">...</div>
```

Now this is a bit messy especially when we have to use JavaScript to add/remove the classes so what most people do is remove the active class and have no class mean active. This makes the JavaScript code much cleaner and the HTML will now look something like this:
```html
<div>...</div>
<div class="inactive">...</div>
```

The problem with this approach is that now it is not obvious that the element is active since there is no class denoting it as active and you need to remember that no class means active. In order to fix this problem we can use data attributes. This would make the elements look like this
```html
<div data-active="true">...</div>
<div data-active="false">...</div>
```

Now our HTML is very descriptive in exactly what is active and inactive and we only need one data attribute to handle both active and inactive instead of two separate classes. This means our JavaScript code will be cleaner and we will never run into the problem of potentially having both the active and inactive class applied to the same element at the same time.

Now admittedly this first example is more of a general use case for data attributes and not strictly about class vs data attribute selectors in JavaScript. The second reason is the main reason I decided to write this email which is that using data attributes as selectors in JavaScript will keep your CSS selectors separate from your JavaScript selectors. Just imagine in the previous example that we had some CSS styles for active and inactive to make the element look a certain way and we now want to change the name of those classes to open and closed. If we use class selectors in both JavaScript and CSS then we have no way of knowing if those classes are used in our JavaScript without digging through all the code and in a large project that can become nearly impossible. This often times leads to an inability to refactor CSS without fear of breaking the JavaScript code. The same problem is also present when modifying JavaScript code. Imagine we wanted to remove the JavaScript code for the active/inactive toggle and in doing so we also want to remove the active/inactive classes from our elements so we don't have dead code. We again cannot be sure that the CSS does not use these classes because we used class selectors for both our CSS and JavaScript so we would need to read all the CSS code to check for these classes. This may seem like a small problem, but over time it builds up and you will be left with a ton of classes on elements that may or may not be doing anything since someone removed the CSS for that class but couldn't remove it since there may have been JavaScript using that class. This also often leads to bugs where someone does remove the class from the element, but the JavaScript or CSS code depended on that class. These types of bugs are incredibly hard to test for and spot so they often are missed and make it into production.

All of these problems can be fixed by using data attribute selectors for JavaScript, though. If the JavaScript code only ever uses data attributes to select elements then we know that any class on an element is only being used by CSS. This means the class can safely be refactored or removed when changes to the CSS are made. The same thing applies to changes with the JavaScript code. The data attributes can be removed or refactored with the JavaScript code with no fear of ever breaking the CSS as long as no data attribute selectors are used in CSS. If for some reason you do not want to use data attributes as selectors, another great alternative is to prefix your JavaScript class selectors with `js-`. For example `<div class="js-active">...</div>`. This will give the same separation between JavaScript and CSS while still being able to use classes. I personally prefer using data attributes since I find it much cleaner than having to prefix my JavaScript classes, but that is just my opinion.

While these benefits may not seem that useful at first, I can assure you that as soon as your project grows or if you come back to a project after a few months you will be incredibly thankful you separated your JavaScript selectors from your CSS selectors.