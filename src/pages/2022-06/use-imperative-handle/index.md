---
layout: "@layouts/BlogPost.astro"
title: "useImperativeHandle Hook Ultimate Guide"
date: "2022-06-20"
description: "useImperativeHandle is the perfect hook for handling complex ref behaviors, but it is pretty complicated to understand."
tags: ["React"]
---

`useImperativeHandle` is probably one of the more confusing hooks out there as it works in a very different way than most of the other hooks. This hook enables imperative code which goes against the declarative nature of React which makes it quite unique. Because of this reason it is generally recommended to avoid this hook unless it is absolutely needed. Unfortunately, there are plenty of scenarios where this hook is necessary which I will cover in this article along with an in depth explanation of how this hook works.

_If you prefer to learn visually, check out the video version of this article._
`youtube: zpEyAOkytkU`

## `React.forwardRef`

Before we can even talk about `useImperativeHandle` we first need to understand how refs in general work especially when forwarding refs to custom components. _If you are already familiar with how refs and `React.forwardRef` works you can skip this first section. If you are unfamiliar with the concept of refs entirely then check out my [useRef ultimate guide](/2020-05/use-ref) before continuing on this article._

Imagine we have the following code.

```jsx
function App() {
  const [value, setValue] = useState("")
  const inputRef = useRef()

  return (
    <>
      <input
        type="text"
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
      >
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  )
}
```

This is a very simple piece of code that uses a ref to reference the input and then we have a button that we can click to focus on the input element by using the ref for the input. This is pretty basic `useRef` code, but what happens if our input is a custom component.

```jsx
function App() {
  const [value, setValue] = useState("")
  const inputRef = useRef()

  return (
    <>
      <CustomInput
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
      >
      <button onClick={() => inputRef.current.focus()}>Focus</button>
    </>
  )
}
```

With this new code our ref will no longer automatically link up with the input inside our `CustomInput` unless we use `React.forwardRef` inside our custom component.

```jsx {1,4,11}
function CustomInput(props, ref) {
  return <input ref={ref} style={{ backgroundColor: "red" }} {...props} />
}

export default React.forwardRef(CustomInput)
```

On the very last line of our custom component we are calling `React.forwardRef` and passing in our `CustomInput`. By doing this we are telling React that this component can take in a ref and the second parameter to our `CustomInput` will be the ref that is passed in. Then all we need to do is tell React which element that ref should point to in our `CustomInput`.

With this code we are passing our ref from our `App` component into our `CustomInput` and our `CustomInput` is passing the ref down to our input so the ref inside our `App` component will point to the input inside our `CustomInput` component. This is the basic way that `React.forwardRef` is used, but sometimes this simple ref forwarding is not enough. That is where `useImperativeHandle` comes in.

## `useImperativeHandle` Basics

Now that we understand the default behavior of refs we can talk about `useImperativeHandle`. I will break this down into two sections. This first section will describe a very basic example of `useImperativeHandle` so you can understand how the hook works and why you might use it. The second section will be a more real world example of the hook in action so you can see what scenarios you actually would want to use this hook for.

Before we jump into examples, though, we need to talk about what exactly `useImperativeHandle` does. In essence the only thing this hook does is let you create a completely custom value for the ref you return from a custom component. This means you can do more than just assign a single element to your ref for example.

### Basic Example

Let's take a look at how we could implement the `useImperativeHandle` hook in our `CustomInput` component from the previous section.

```jsx {2-4}
function CustomInput(props, ref) {
  useImperativeHandle(ref, () => {
    return { alertHi: () => alert("Hi") }
  })

  return <input style={{ backgroundColor: "red" }} {...props} />
}

export default React.forwardRef(CustomInput)
```

Here we have the most basic use case of `useImperativeHandle` which takes 2 parameters. The first parameter is just the ref you are overriding and the second parameter is a function which returns the new value for your ref. In our case the ref for our `CustomInput` is now an object that contains the single function `alertHi`. Now let's take a look at how we implement this ref in our `App` component.

```jsx {12}
function App() {
  const [value, setValue] = useState("")
  const inputRef = useRef()

  return (
    <>
      <CustomInput
        ref={inputRef}
        value={value}
        onChange={e => setValue(e.target.value)}
      >
      <button onClick={() => inputRef.current.alertHi()}>Alert</button>
    </>
  )
}
```

As you can see the only change is that our button now calls the `alertHi` function of our custom ref. This is the most basic way to use this hook, but it can get a bit more complicated than that.

```jsx {3-4}
function CustomInput(props, ref) {
  useImperativeHandle(
    ref,
    () => {
      return { alertValue: () => alert(props.value) }
    },
    [props.value]
  )

  return <input ref={ref} style={{ backgroundColor: "red" }} {...props} />
}

export default React.forwardRef(CustomInput)
```

`useImperativeHandle` takes an optional third parameter which is a dependency array. This works just like `useEffect` in that anytime any of the values in the dependency array change the function passed to `useImperativeValue` will be rerun and update the value of your ref. This is useful if you depend on certain values like the `props.value` in our example. If you do not pass this third parameter to `useImperativeHandle` it will rerun the function you pass to `useImperativeHandle` and update your ref every time the component is rendered.

### Real World Example

Now let's take a look at the real world example for `useImperativeHandle`.

```jsx
function App() {
  const [open, setOpen] = useState(false)
  const modalRef = useRef()

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <button>Focus Close Btn</button>
      <button>Focus Confirm Btn</button>
      <button>Focus Deny Btn</button>
      <CustomModal ref={modalRef} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
```

```jsx
function CustomModal({ open, onClose }, ref) {
  if (!open) return null

  return (
    <div ref={ref}>
      <button onClick={onClose}>&times;</button>
      <h1>Title</h1>
      <div>
        <button>Confirm</button>
        <button>Deny</button>
      </div>
    </div>
  )
}

export default React.forwardRef(CustomModal)
```

With the way this code is setup our ref in the `App` component references the outer div in our `CustomModal` component. This is fine for many use cases, but in our case we want to have access to the confirm, deny, and close buttons so we can use the 3 buttons in our `App` component to focus those particular buttons at will. This is not something we can easily do with our current setup so we need to use `useImperativeHandle` to create a custom ref that contains all the elements we need.

```jsx {2-4,8-14,18,21,22}
function CustomModal({ open, onClose }, ref) {
  const closeRef = useRef()
  const confirmRef = useRef()
  const denyRef = useRef()

  useImperativeHandle(ref, () => {
    return {
      closeBtn: closeRef.current,
      confirmBtn: confirmRef.current,
      denyBtn: denyRef.current,
    }
  })

  if (!open) return null

  return (
    <div>
      <button ref={closeRef} onClick={onClose}>
        &times;
      </button>
      <h1>Title</h1>
      <div>
        <button ref={confirmRef}>Confirm</button>
        <button ref={denyRef}>Deny</button>
      </div>
    </div>
  )
}

export default React.forwardRef(CustomModal)
```

In the above code we changed our ref to now include a single value for each of the buttons we care about referencing in our `App` component.

```jsx {8-10}
function App() {
  const [open, setOpen] = useState(false)
  const modalRef = useRef()

  return (
    <>
      <button onClick={() => setOpen(true)}>Open</button>
      <button onClick={() => modalRef.current.closeBtn.focus()}>
        Focus Close Btn
      </button>
      <button onClick={() => modalRef.current.confirmBtn.focus()}>
        Focus Confirm Btn
      </button>
      <button onClick={() => modalRef.current.denyBtn.focus()}>
        Focus Deny Btn
      </button>
      <CustomModal ref={modalRef} open={open} onClose={() => setOpen(false)} />
    </>
  )
}
```

In our `App` component all we need to do is get the values from our custom ref and use them to focus on the element we care about.

## Conclusion

The `useImperativeHandle` hook is definitely not something you will use in all scenarios, but when you need to access the internals of a custom component in a way that you cannot do with props then this is the perfect hook for you.
