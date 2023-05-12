---
layout: "@layouts/BlogPost.astro"
title: "How To Use Refs In React With Hooks"
date: "2020-05-11"
description: "An in depth look at every aspect of refs and the useRef hook in React."
tags: ["React"]
---

Refs are probably the most misunderstood and misused part of React. All too often, I see developers using refs to manipulate the DOM directly or work around React in someway which makes working with React much harder. In this article I am going to go over everything you need to know about refs in order to help you never make those ref mistakes.

_If you prefer to learn visually, check out the video version of this article._
`youtube: t2ypzz6gJm0`

## `useRef`

In order to work with refs in React you need to first initialize a ref which is what the `useRef` hook is for. This hook is very straightforward, and takes an initial value as the only argument.

```js
useRef(initialValue)
```

This hook then returns a ref for you to work with.

```js
const myRef = useRef(null)
```

In the above example we have created a ref called `myRef` and set its default value to `null`. This means that `myRef` is now equal to an object that looks like this.

```js
{
  current: null
}
```

This is because a ref is always an object with a single `.current` property which is set to the current value of the ref. If we were to instead create a ref with a default value of `0` it would look like this.

```js
const myRef = useRef(0)
console.log(myRef)
// { current: 0 }
```

Now this seems like a lot of work in order to save a single value, but what makes refs so powerful is the fact that they are persisted between renders. I like to think of refs very similarly to state, since they persist between renders, but refs do not cause a component to re-render when changed.

Imagine that we want to count the number of times a component re-renders. Here is the code to do so with state and refs.

```jsx
function State() {
  const [rerenderCount, setRerenderCount] = useState(0)

  useEffect(() => {
    setRerenderCount(prevCount => prevCount + 1)
  })

  return <div>{rerenderCount}</div>
}
```

```jsx
function Ref() {
  const rerenderCount = useRef(0)

  useEffect(() => {
    rerenderCount.current = rerenderCount.current + 1
  })

  return <div>{rerenderCount.current}</div>
}
```

Both of these components will correctly display the number of times a component has been re-rendered, but in the state example the component will infinitely re-render itself since setting the state causes the component to re-render. The ref example on the other hand will only render once since setting the value of a ref does not cause any re-renders.

## How To Use Refs

Now that we understand refs are just an object for storing a value that persists between renders, let's talk about when you would need to use a ref.

The most common use case for refs in React is to reference a DOM element. Because of how common this use case is every DOM element has a ref property you can use for setting a ref to that element. For example, if you wanted to focus an input element whenever a button was clicked you could use a ref to do that.

```jsx
function Component() {
  const inputRef = useRef(null)

  const focusInput = () => {
    inputRef.current.focus()
  }

  return (
    <>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </>
  )
}
```

As you can see in the code above we use the `ref` property on the input element to set the current value of `inputRef` to the input element. Now when we click the button it will call `focusInput` which uses the current value of the `inputRef` variable to set the focus on the input element.

Being able to access any DOM element directly with a ref is really useful for doing things like setting focus or managing other attributes that you cannot directly control in React, but it can be easy to abuse this power. I often see newer React developers using refs to dynamically add and remove elements (`appendChild`, `removeChild`, etc.) in a component instead of having React do that for you. This leads to inconsistencies between the actual DOM and the React virtual DOM which is very bad.

## Using Refs Beyond The DOM

While most use cases for refs lie with referencing DOM elements, refs can also be used for any form of storage that is persisted across component renders. A very common use case for this would be storing the previous value of a state variable.

```jsx
function Component() {
  const [name, setName] = useState("Kyle")
  const previousName = useRef(null)

  useEffect(() => {
    previousName.current = name
  }, [name])

  return (
    <>
      <input value={name} onChange={e => setName(e.target.value)} />
      <div>
        {previousName.current} => {name}
      </div>
    </>
  )
}
```

The above code will update the `previousName` ref every time the name changes so that it always has the previous value of the name variable stored in it.

## Conclusion

Refs in React are incredibly useful for accessing and manipulating DOM elements directly. Refs are also amazing at persisting data between renders which is makes it possible to store persisted component data without causing a re-render when it is changed.
