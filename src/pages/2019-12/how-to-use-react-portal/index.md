---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: The Forgotten React Renderer - React Portal
date: "2019-12-16"
description: "React portal lets components be rendered outside their parent component which is incredibly useful in specific scenarios explained in depth in this article."
tags: ['React']
---

React's rendering system is absolutely amazing and makes working with dynamic content so much easier than standard JavaScript. One big problem with React's rendering system, though, is that it makes it difficult to dynamically render content outside the parent component. For example, if there is a button buried deep in the app structure that opens a modal there is no good way to render the modal since putting the modal component in the same component with the button will make the modal have the same parent as the button. Luckily, React thought of this already and built React portal to handle these scenarios.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: LyLa7dU5tp8`

## What Does React Portal Do?

Simply put, React portal is just a way to render components outside of the normal DOM hierarchy that is defined by the component tree. Let's take the modal example from earlier and write it out without using React portal.

```jsx
function Component() {
  const [open, setOpen] = useState(false)
  return (
    <div className="component">
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        Fancy Modal
      </Modal>
    </div>
  )
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      {children}
    </div>
  )
}
```

This will work, but the problem is that in the outputted HTML the modal is inside the Component HTML.

```html {4-7}
<body>
  <div class="component">
    <button>Open Modal</button>
    <div class="modal">
      <button>Close</button>
      Fancy Modal
    </div>
  </div>
</body>
```

This is bad since if the component had a set width/height the modal could be cut off if it expands past that width/height. It is also not ideal since a modal should really be outside the component HTML and on its own.

This is of course were React portal comes in. This next example is nearly identical to the previous example, but with the use of React portal to render the modal outside the normal DOM hierarchy.

```jsx {15,20}
function Component() {
  const [open, setOpen] = useState(false)
  return (
    <div className="component">
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        Fancy Modal
      </Modal>
    </div>
  )
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <div className="modal">
      <button onClick={onClose}>Close</button>
      {children}
    </div>,
    document.body
  )
}
```

The only difference between these two examples is that the Modal component is using `ReactDOM.createPortal` to render the modal HTML. This is a very simple function. The first parameter is just the JSX for what you want to render. This is the same JSX that was in the first example. The second parameter to the function is the element that the JSX should be rendered to. In this case the document body is being used as the place the JSX should be rendered to. By using this code the following HTML is generated.

```html {5-8}
<body>
  <div class="component">
    <button>Open Modal</button>
  </div>
  <div class="modal">
    <button>Close</button>
    Fancy Modal
  </div>
</body>
```

As you can see, the modal is rendered outside the component HTML and is appended to the document body since that is the node passed to `ReactDOM.createPortal`. This alone is incredibly useful, but React portal is even more useful in how it handles events.

## React Portal Event Propagation

In normal JavaScript code if an element is interacted with, for example a click event, that interaction will propagate up through the parent elements. We can see this in action by adding a click handler to the component outer div.

```jsx {4}
function Component() {
  const [open, setOpen] = useState(false)
  return (
    <div className="component" onClick={() => console.log('click')}>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        Fancy Modal
      </Modal>
    </div>
  )
}
```

Now whenever the button to open the modal is clicked the click event on the component div will fire since the click event will propagate up through the button element to its parent element and in the end **click** will be logged to the console.

As we know from normal JavaScript this only works for elements that are children of the element with the click event listener. In our example with React portal, the modal is not a child of the component div since it is rendered to the document body and thus should not trigger the click event when clicked, but it does. This is because React uses the component hierarchy to determine propagation of events and the `Modal` component is a child of the component div in JSX.

This is nice since when working with React you never have to worry about the actual DOM structure and only ever need to worry about the component structure when determining event propagation.

## Conclusion

React portal is an incredibly useful tool since it allows rendering of components outside the normal DOM hierarchy without breaking event propagation of the component hierarchy. This is incredibly useful when rendering components such as modals, tooltips, popup messages, and so much more.