---
setup: |
  import Layout from '/src/layouts/BlogPost.astro'
  import HtmlDialog from '/src/blogComponents/htmlDialog/HtmlDialog.astro'
title: "Modals Will Never Be The Same - HTML dialog Element"
date: "2023-04-24"
description: "The new HTML dialog element makes working with accessible modals so much easier. In this article I explain everything you need to know about the new dialog element to use it in your next project."
tags: ["HTML"]
---

Modals have been a part of web development for decades now, but they have always been a bit of a pain to work with. The main reason modals have been such a pain is because it is difficult to make a truly accessible modal that conforms to all accessibility standards. This is why the new HTML `dialog` element is so exciting. The `dialog` element makes it so much easier to create accessible modals, and in this article I will explain everything you need to know about the `dialog` element to use it in your next project.

_If you prefer to learn visually, check out the video version of this article._
`youtube: ywtkJkxJsdg`

## What Is A Dialog/Modal?

Before we can jump into the new `dialog` element, I need to first explain what a dialog is. A dialog/modal is simply a popup that appears on top of the current page. The main difference between a dialog and a modal is that a modal is supposed to take complete priority over the page and prevent the user from interacting with the page until the modal is closed while a dialog, is just a popup that doesn't take complete priority over the page and should allow the user to interact with the page while the dialog is open.

I am sure you have seen tons of modals/dialogs while browsing the web but below is an example of a simple modal and a dialog so you can see the difference between the two.

<HtmlDialog btnText="Open Modal" isModal />
<HtmlDialog btnText="Open Dialog" />

This biggest difference to note between these two elements is that when the modal is open you cannot do anything on the page except for scroll. All other interaction is blocked until you explicitly close the modal. On the other hand, when the dialog is open you can still interact with the page just like normal.

## `dialog` Element Basics

Now that we understand what modals and dialogs are we can look at the new HTML `dialog` element. The actual `dialog` element itself is very easy since it is just a single element that only has one custom attribute that you can add to it. It also acts similarly to a fancy `div` since you can put anything you want in the `dialog` element and it is also very easy to style exactly how you want.

```html
<dialog>
  <!-- Dialog Content -->
</dialog>
```

By default a dialog element will be hidden unless you add the `open` attribute to your dialog

```html
<dialog open>
  <span>You can see me</span>
</dialog>
```

It is not advised to use the `open` attribute directly, though, as that only allows you to open a non-modal dialog. Instead, you should use the `show()` and `showModal()` JavaScript methods.

```js
const dialog = document.querySelector("dialog")
dialog.show() // Opens a non-modal dialog
dialog.showModal() // Opens a modal
```

By using the `show()` and `showModal()` methods you can choose exactly how you want your `dialog` element to work since sometimes you want a true modal while other times you want more of a popup style dialog. To close a `dialog` element you just need to use the `close()` method.

<p>
  Alternatively, if your <code>dialog</code> element is a modal you can use the <kbd>Esc</kbd> key to close it.
<p>

```js
const dialog = document.querySelector("dialog")
dialog.close() // Closes the dialog
```

This already makes working with modals/popups so much easier, but the real benefit of the `dialog` element is that it handles accessibility for you by default. All the proper aria-attributes and focus states are taken care of for you so you don't have to worry about any of that. I love this since it makes writing accessible apps so much easier.

## `dialog` Element Styling

Another thing I love about the `dialog` element is how easy it is to style. There are a few default styles applied to the `dialog` element (depending on if it is a modal or not) that give you the basics, but since the dialog element is essentially just a fancy `div` you can style it however you want. The below button opens a custom styled dialog with the following styles applied.

<HtmlDialog modalStyle="background: var(--theme-green); border: none; border-radius: 1rem" />

```css
dialog {
  z-index: 10;
  margin-top: 10px;
  background: green;
  border: none;
  border-radius: 1rem;
}
```

On top of being able to style the `dialog` element itself, you can also style the backdrop that appears behind the dialog without any custom HTML or JavaScript. As long as you have a modal dialog you can style the backdrop by using the `::backdrop` pseudo-element. The below modal has the following styles applied to the backdrop to give it a purple color.

<HtmlDialog isModal purpleBackdrop />

```css
dialog::backdrop {
  background-color: hsl(250, 100%, 50%, 0.25);
}
```

The combination of the `::backdrop` pseudo element and the fact that styling the `dialog` element is as easy as styling a `div` makes it so easy to create custom modals that fit your site's design.

## Advanced `dialog` Features

Overall the `dialog` element is pretty simple to use, but there are a few advanced things you can do with the `dialog` element.

### Forms

If you have a form in your dialog you can set the `method` attribute of your form to `dialog`. This will cause the form to close the dialog when it is submitted and most importantly it will **NOT** submit your form. Instead the form data will be saved so if you reopen the same dialog your form will have all the same data in it. Here is an example below.

<HtmlDialog isModal>
  <form method="dialog">
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-end;">
      <input style="font-size: inherit; padding: .25em;" type="text">
      <button style="padding: .25em .5em; font-size: inherit; cursor: pointer;" type="submit">Submit</button>
    </div>
  </form>
</HtmlDialog>

```html
<dialog>
  <form method="dialog">
    <input type="text" />
    <button type="submit">Submit</button>
  </form>
</dialog>
```

Also, you may have noticed that the input element was automatically focused when the modal was opened. This is yet another accessibility feature you get by default from the `dialog` element.

This can be taken a step further since on any submit button in your form you can add the `formmethod="dialog"` attribute to make that button act as if the `form` method was set to `dialog`. This is useful if you want to have a cancel button in your form that closes the dialog without submitting the form while the normal submit button would submit the form. Here is an example below.

<HtmlDialog isModal>
  <form onsubmit="if (event.submitter.matches('[data-cancel]')) return; event.preventDefault(); alert('Normally this would submit the form')">
    <div style="display: flex; flex-direction: column; gap: 1rem; align-items: flex-end;">
      <input style="font-size: inherit; padding: .25em;" type="text">
      <div>
        <button style="padding: .25em .5em; font-size: inherit; cursor: pointer;" data-cancel formmethod="dialog" type="submit">Cancel</button>
        <button style="padding: .25em .5em; font-size: inherit; cursor: pointer;" type="submit">Submit</button>
      </div>
    </div>
  </form>
</HtmlDialog>

```html {2,4}
<dialog>
  <form>
    <input type="text" />
    <button formmethod="dialog" type="submit">Cancel</button>
    <button type="submit">Submit</button>
  </form>
</dialog>
```

### Close On Outside Click

One thing that we are used to with most modals is the ability to close a modal when clicking outside of it. This is not something that is built into the `dialog` element, but it is something that is easy to add. All you need to do is add a click event listener to the `dialog` element. This will trigger if you click anywhere inside the modal or anywhere inside the `::backdrop` since the `::backdrop` is a child of the `dialog` element. Then all we need to do is see if the click was inside the `dialog` element or not. If it was not then we can close the dialog. Here is an example below.

<HtmlDialog isModal closeOnOutsideClick />

```js
dialog.addEventListener("click", e => {
  const dialogDimensions = dialog.getBoundingClientRect()
  if (
    e.clientX < dialogDimensions.left ||
    e.clientX > dialogDimensions.right ||
    e.clientY < dialogDimensions.top ||
    e.clientY > dialogDimensions.bottom
  ) {
    dialog.close()
  }
})
```

I wish this was something built into the `dialog` element, but luckily it is easy enough to add yourself.

## Conclusion

As you can see the `dialog` element is relatively easy to use, but incredibly powerful in what it can all do. I love how easy it is to create custom modals and dialogs that fit your site's design and how easy it is to make them accessible. On top of that, this element has support in every modern browser which means you should be using it anytime you need a dialog or modal.
