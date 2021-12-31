---
setup: |
  import Layout from '/src/layouts/BlogPost.astro'
  import DynamicReadMoreButton from "/src/blogComponents/dynamicReadMoreButton/DynamicReadMoreButton"
title: Dynamic Expandable Content (Read More Buttons)
date: "2020-01-27"
description: "Multiline text overflow fading and dynamic expand/collapse buttons are difficult to create so in this article I show you a simple way to do both."
tags: ['CSS', 'HTML', 'JavaScript']
---

Multiline overflow content is incredibly tricky to do correctly and a real pain to work with. Adding text that fades away when too long or a read more button that only appears when needed are perfect examples of this complex situation, so in this article I will be walking you through how to handle both of these situations in a hypothetical blog. Here is the final version of the product that we will be building.


<DynamicReadMoreButton client:visible />

## Getting Started

To start let's imagine that we have a blog with the following markup.

```html
<article>
  <h2>Blog Article One</h2>
  <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, alias.</p>
</article>
<article>
  <h2>Blog Article Two</h2>
  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sapiente odio earum? Sapiente odit aut excepturi nulla? Exercitationem tempore non est neque hic, eveniet distinctio quidem cum perspiciatis ipsum nihil necessitatibus rem dolorem earum. Ipsam tempora tempore consequuntur quia? Molestiae reiciendis incidunt veniam, consequatur fuga nesciunt, ipsa error quod sint nisi eius corrupti voluptatum id? Explicabo, repudiandae consectetur! Dolorum, dolor? Modi fugit corrupti harum a sunt autem incidunt. Iusto, dolorum vero modi repellat ratione magni dolores praesentium, esse quam itaque molestias quae! Deserunt reprehenderit commodi odio dolor porro aliquid omnis! Natus, nihil voluptas voluptates eveniet voluptatem quasi velit quam beatae corporis? Modi odio vel quisquam suscipit doloremque veritatis a adipisci minus vitae incidunt deserunt nisi quo facilis ducimus commodi molestias consectetur expedita libero illo, dicta est nam eaque eveniet quam. Reprehenderit atque eius quam exercitationem fuga suscipit ut quidem omnis mollitia, fugiat ex repellat provident quibusdam sunt minus voluptate temporibus quis ullam beatae, voluptatibus, esse nemo. Eligendi esse, nisi vitae, dignissimos consequatur molestiae inventore ipsam libero aliquid dolor molestias odio voluptas velit distinctio vero ab unde ad, sunt blanditiis minima? Aliquid praesentium tempora, ex qui deleniti animi aperiam, at sequi assumenda reprehenderit, libero nisi consequuntur sunt aut quod quos asperiores!</p>
</article>
```

As you can see we have one really short article and another article that is quite long. The goal is to create a read more button that will allow us to toggle the longer blog article, but we do not want the short blog article to have this behaviour. We are also going to assume the content for the blog articles is dynamically created so we cannot just look at the source code to know which articles will need the button and which won't since it could change at any time.

The first thing we need to do is to limit the size of the text and add a button that will allow us to toggle the full display of the text. To do this I am wrapping the article text inside a div that will also contain the button for expanding the text. This will look like this.

```html
<article>
  <h2>Blog Article One</h2>
  <div data-expandable>
    <p data-expand-text>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur, alias.</p>
    <button data-expand-button>Read More</button>
  </div>
</article>
<article>
  <h2>Blog Article Two</h2>
  <div data-expandable>
    <p data-expand-text>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati sapiente odio earum? Sapiente odit aut excepturi nulla? Exercitationem tempore non est neque hic, eveniet distinctio quidem cum perspiciatis ipsum nihil necessitatibus rem dolorem earum. Ipsam tempora tempore consequuntur quia? Molestiae reiciendis incidunt veniam, consequatur fuga nesciunt, ipsa error quod sint nisi eius corrupti voluptatum id? Explicabo, repudiandae consectetur! Dolorum, dolor? Modi fugit corrupti harum a sunt autem incidunt. Iusto, dolorum vero modi repellat ratione magni dolores praesentium, esse quam itaque molestias quae! Deserunt reprehenderit commodi odio dolor porro aliquid omnis! Natus, nihil voluptas voluptates eveniet voluptatem quasi velit quam beatae corporis? Modi odio vel quisquam suscipit doloremque veritatis a adipisci minus vitae incidunt deserunt nisi quo facilis ducimus commodi molestias consectetur expedita libero illo, dicta est nam eaque eveniet quam. Reprehenderit atque eius quam exercitationem fuga suscipit ut quidem omnis mollitia, fugiat ex repellat provident quibusdam sunt minus voluptate temporibus quis ullam beatae, voluptatibus, esse nemo. Eligendi esse, nisi vitae, dignissimos consequatur molestiae inventore ipsam libero aliquid dolor molestias odio voluptas velit distinctio vero ab unde ad, sunt blanditiis minima? Aliquid praesentium tempora, ex qui deleniti animi aperiam, at sequi assumenda reprehenderit, libero nisi consequuntur sunt aut quod quos asperiores!</p>
    <button data-expand-button>Read More</button>
  </div>
</article>
```

I also added some basic data attributes so we can manage the elements in our CSS and JS. Speaking of the CSS, we need to limit the height of our text elements when it is not expanded. We will use a class of  `.expanded` to manage whether or not to expand the text. Here is what the basic CSS will look like.

```css
[data-expandable] [data-expand-text] {
  --line-height: 1.5;
  --lines-to-show: 3;
  box-sizing: border-box;
  line-height: var(--line-height);
  overflow: hidden;
  height: calc(var(--line-height) * var(--lines-to-show) * 1em);
}

[data-expandable].expanded [data-expand-text] {
  height: initial;
}
```

This CSS is a bit complicated so I want to break down some of the nuance behind how `height` is defined.

There are two variables `--line-height` and `--lines-to-show` which are used in the `height` property to determine how tall the element should be. Essentially if we know the number of lines we want to show and the height of each line then we can multiply those two values together and convert that number to `em`. This resulting height will be a good estimate of the height of the number of lines of text we want to show in our element. Other than this the CSS is pretty straightforward. We just need to remember to set the overflow to hidden so any overflow text is not displayed and also reset the height to its initial value when it is expanded.

Here is a working version of what we have so far.

<DynamicReadMoreButton noFade noOverflowCheck />

## Adding In Basic JavaScript

The next step will be to add in the JavaScript required to expand the text when the button is clicked. Luckily this is fairly easy.

The first thing needed is to select all the buttons and assign them click event listeners to toggle the expanded class.

```js
const expandableButtons = document.querySelectorAll('[data-expand-button]')

expandableButtons.forEach(button => {
  button.addEventListener('click', toggleText)
})

function toggleText(e) {
  const expandableElement = e.target.closest('[data-expandable]')
  expandableElement.classList.toggle('expanded')
}
```

After that we need to make sure that we change the button text to always say **Read More** or **Read Less** depending on the state of our expanded text.

```js {5,11,14-18}
const expandableButtons = document.querySelectorAll('[data-expand-button]')

expandableButtons.forEach(button => {
  button.addEventListener('click', toggleText)
  setExpandButtonText(button)
})

function toggleText(e) {
  const expandableElement = e.target.closest('[data-expandable]')
  expandableElement.classList.toggle('expanded')
  setExpandButtonText(e.target)
}

function setExpandButtonText(button) {
  const expandableElement = button.closest('[data-expandable]')
  const expanded = expandableElement.classList.contains('expanded')
  button.innerText = expanded ? 'Read Less' : 'Read More'
}
```

With that complete now our buttons are able to expand and collapse the text.

<DynamicReadMoreButton client:visible noFade noOverflowCheck />

One thing that is obvious, though, is that the short blog article acts really strangley since there is no extra text to expand. To fix this issue we need to add some extra CSS/JavaScript to determine if the text overflows its container.

## How To Determine Overflow

In order to check for overflow we need to determine the size of the container the text is in and the size of the text to see if the container is larger than the text. This can be done by adding the following to out JavaScript.

```js {1,4,10-17}
const expandableElements = document.querySelectorAll('[data-expandable]')
const expandableButtons = document.querySelectorAll('[data-expand-button]')

checkForOverflow()
expandableButtons.forEach(button => {
  button.addEventListener('click', toggleText)
  setExpandButtonText(button)
})

function checkForOverflow() {
  expandableElements.forEach(expandableElement => {
    if (expandableElement.classList.contains('expanded')) return
    const expandableText = expandableElement.querySelector('[data-expand-text]')
    const overflowing = expandableText.scrollHeight > expandableText.clientHeight
    expandableElement.dataset.overflow = overflowing
  })
}

function toggleText(e) {
  const expandableElement = e.target.closest('[data-expandable]')
  expandableElement.classList.toggle('expanded')
  setExpandButtonText(e.target)
}

function setExpandButtonText(button) {
  const expandableElement = button.closest('[data-expandable]')
  const expanded = expandableElement.classList.contains('expanded')
  button.innerText = expanded ? 'Read Less' : 'Read More'
}
```

This new code loops through every single expandable text container and determines if the scroll height of the text object is larger than the client height. This means that the text is overflowing its container so the `data-overflow` property is set on the expandable text container. One other important part of this code is that if the element is already expanded then the overflow check is skipped since an expanded element will always be large enough to contain all the text so we don't want to mark is as overflowing or not since we cannot tell if it is overflowing when it is expanded.

Now in the CSS we can take advantage of this `data-overflow` property to hide the read more button.

```css {10-12,18-20}
[data-expandable] [data-expand-text] {
  --line-height: 1.5;
  --lines-to-show: 3;
  box-sizing: border-box;
  line-height: var(--line-height);
  overflow: hidden;
  height: calc(var(--line-height) * var(--lines-to-show) * 1em);
}

[data-overflow="false"] [data-expand-text] {
  height: initial;
}

[data-expandable].expanded [data-expand-text] {
  height: initial;
}

[data-overflow="false"] [data-expand-button] {
  display: none;
}
```
You will also notice that we used the overflow property to reset the height of any object that is not overflowing its container. This makes it so the shorter of our two blog articles does not have a bunch of extra space at the bottom of it.

Here you can see what we have created so far.

<DynamicReadMoreButton client:visible noFade />

## Adding A Fade Effect

The last thing left to do is make it so that the text will fade out as it reaches the bottom of the container when there is more to read. This can be easily accomplished with just CSS.

```css {4,23-29,31-34}
[data-expandable] [data-expand-text] {
  --line-height: 1.5;
  --lines-to-show: 3;
  position: relative;
  box-sizing: border-box;
  line-height: var(--line-height);
  overflow: hidden;
  height: calc(var(--line-height) * var(--lines-to-show) * 1em);
}

[data-overflow="false"] [data-expand-text] {
  height: initial;
}

[data-expandable].expanded [data-expand-text] {
  height: initial;
}

[data-overflow="false"] [data-expand-button] {
  display: none;
}

[data-expandable] [data-expand-text]::before {
  content: '';
  position: absolute;
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, transparent, white);
}

[data-overflow="false"] [data-expand-text]::before,
[data-expandable].expanded [data-expand-text]::before {
  background: initial;
}
```

The first thing this CSS does is set the expandable text to a position of relative so we can add in an absolutely positioned overlay for the fade effect. The next thing we did was create the fade effect. This is just a simple absolutely positioned element that spans the entire width and height of the text and transitions from a completeley transparent background to a fully white background from top to bottom. This gives the fade effect we are looking for. Lastly, we removed the background when the text is expanded since the fade effect no longer makes sense then.

This is the result of these CSS changes.

<DynamicReadMoreButton client:visible />

## Conclusion

Dealing with multi-line text overflow is something that we all have to deal with at some point. It is a huge pain to deal with, but with the help of this article hopefully the most complex topics of dynamic expand/collapse buttons and text faders will be a problem you no longer need to worry about.