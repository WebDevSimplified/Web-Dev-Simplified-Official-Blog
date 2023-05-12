---
layout: "@layouts/BlogPost.astro"
title: Why You Should Use Data Attributes In CSS
date: "2019-10-21"
description: "A quick breakdown of exactly how to use data attributes with CSS to create dynamic content."
tags: ["CSS"]
---

Your first thought from this title is probably that you think I am telling you to use data attributes as selectors in your CSS like this `[data-attribute] { color: white }`, but in reality I am talking about using the value of data attributes as content for your CSS. You can do this by using the `attr()` function in CSS. This function will return the value of any data attribute which can then be used in the CSS. In order to explain this further let's use the example below.

Imagine there is a notification button in your application that will display the number of unread messages in a bubble.

<svg width="125" height="142" viewBox="0 0 125 142" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 100%;">
  <g clip-path="url(#clip0)">
    <path d="M107.266 88.0822V52.3271C107.266 27.6424 87.256 7.63306 62.5715 7.63306C37.887 7.63306 17.8777 27.6424 17.8777 52.3271V88.0822L0 123.837H40.676C42.7453 134.036 51.7601 141.715 62.5715 141.715C73.3829 141.715 82.3977 134.036 84.467 123.837H125.143L107.266 88.0822ZM62.5715 132.776C56.7434 132.776 51.8317 129.035 49.9856 123.837H75.1617C73.3115 129.035 68.3996 132.776 62.5715 132.776ZM13.4083 114.898L26.8164 88.0822V52.3271C26.8164 32.5813 42.8257 16.572 62.5715 16.572C82.3171 16.572 98.3266 32.5813 98.3266 52.3271V88.0822L111.735 114.899H13.4083V114.898Z" fill="currentColor"/>
  <circle cx="98.643" cy="24.5" r="24.5" fill="#FF0000"/>
  <path d="M92.6972 24.2373L93.8896 12.5391H105.91V15.2944H96.4194L95.7104 21.6914C96.8598 21.0146 98.165 20.6763 99.6259 20.6763C101.764 20.6763 103.461 21.3853 104.718 22.8032C105.975 24.2104 106.603 26.1172 106.603 28.5234C106.603 30.9404 105.948 32.8472 104.637 34.2437C103.337 35.6294 101.517 36.3223 99.1747 36.3223C97.1015 36.3223 95.4096 35.7476 94.0991 34.5981C92.7885 33.4487 92.0419 31.8589 91.8593 29.8286H94.6791C94.8618 31.1714 95.3398 32.1865 96.1132 32.874C96.8867 33.5508 97.9072 33.8892 99.1747 33.8892C100.56 33.8892 101.645 33.4165 102.43 32.4712C103.225 31.5259 103.622 30.2207 103.622 28.5557C103.622 26.9873 103.192 25.7305 102.333 24.7852C101.484 23.8291 100.351 23.3511 98.933 23.3511C97.6332 23.3511 96.6127 23.6357 95.8715 24.2051L95.082 24.8496L92.6972 24.2373Z" fill="white"/>
  </g>
  <defs>
    <clipPath id="clip0">
      <rect width="125" height="142" fill="white"/>
    </clipPath>
  </defs>
</svg>

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
  width: attr(data-length);
}
```

Sadly this is not yet supported in CSS. Currently, only the content property can be set with the `attr()` function, but this type of functionality is planned for the future of CSS. In the future `attr()` will be able to take a type so that instead of returning a string it can actually return a specific type of unit like this `attr(data-background color)`. This would expect the `data-background` attribute to be set and then it would convert that value to a color. This is of course only an experimental feature of CSS, though, and no browsers support it yet. If you want to read more on the experimental use cases you can checkout the [MDN docs](https://developer.mozilla.org/en-US/docs/Web/CSS/attr).

Because of the limitations of this function it is limited in its uses, but it is still great in cases like a notification icon or a simple tool tip.
