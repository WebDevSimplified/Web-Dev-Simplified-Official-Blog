---
setup: import UseTransition from "/src/blogComponents/useTransition/UseTransition.jsx"
title: "useTransition Hook Explained"
date: "2022-04-25"
description: "React 18 introduced many new hooks and in this article I will be talking about useTransition which is the most useful of those hooks."
tags: ['React']
---

React 18 recently had its official non-beta release and with it came multiple new React hooks. Of those hooks, the one I am most excited for is the `useTransition` hook. This hook helps increase the performance of your applications, increase the responsiveness of your application to users, and overall just make your application better. This article is all about how this new hook works and is also full of multiple interactive examples so you can truly see and feel the difference in using this hook.

## Why Do You Need `useTransition`?

Before we can talk about what this hook does and how to use it we first need to understand a few concepts about how state works in React in order to understand the use case for this hook.

Imagine you have the following code.
```jsx
function App() {
  const [name, setName] = useState("")
  const [count, setCount] = useState(0)

  function handleChange(e) {
    setName(e.target.value)
    setCount(prevCount => prevCount + 1)
  }

  return <input type="text" value={name} onChange={handleChange} />
}
```
This is a very simple component with two state variables that both get updated at the same time when we change the value in our input field. *If you are unfamiliar with the `useState` hook then you should check out my [complete useState hook article](/2020-04/use-state) before reading further.*

React is smart enough to see that these state updates happen at the same time so it will group them together and perform both state updates before rendering the component again. This is really nice since it only renders the component once after all the state changes instead of twice (once after each state change).

This works really well in most cases but it can lead to performance problems.
```jsx {3,7,12}
function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState(largeList)

  function handleChange(e) {
    setName(e.target.value)
    setList(largeList.filter(item => item.name.includes(e.target.value)))
  }

  return <>
    <input type="text" value={name} onChange={handleChange} />
    {list.map(item => <ListComponent key={item.id} item={item} />)}
  </>
}
```
In this example we are now setting a list variable based on the value we type in our input. *Normally this is not something you would want to do since storing derived state in React is bad. If you want to learn why, I explain this in depth in my [article on derived state](/2019-11/never-store-derived-state).*

Our list is incredibly long so looping through the entire list, filtering each item, and rendering them all to the screen is quite time consuming and especially on older devices will be very slow to process. This is a problem since this list state update happens at the same time as the name state update so the component won't rerender with the new state values for either piece of state until both finish processing which means the input field will feel very slow. Below is an example of what this would look like.

*Instead of rendering out thousands of items to the screen, I am instead emulating the slowness artificially and only rendering a few items to the screen so as to not overwhelm your computer. Also, the items being rendered are just exact copies of whatever you type in to the input field and you can only enter one character at a time into the input field or it will not work as expected.*

<UseTransition client:load withoutHook />

As you can see in this example when you try to type into the input box it is really slow and takes about a second to update the input box. This is because rendering and processing the list takes so long. This is where `useTransition` comes in.

## `useTransition` Explained

The `useTransition` hook allows us to specify some state updates as not as important. These state updates will be executed in parallel with other state updates, but the rendering of the component will not wait for these less important state updates.
```jsx {4,8-10,15-19}
function App() {
  const [name, setName] = useState("")
  const [list, setList] = useState(largeList)
  const [isPending, startTransition] = useTransition()

  function handleChange(e) {
    setName(e.target.value)
    startTransition(() => {
      setList(largeList.filter(item => item.name.includes(e.target.value)))
    })
  }

  return <>
    <input type="text" value={name} onChange={handleChange} />
    {isPending ? (
      <div>Loading...</div>
    ) : (
      list.map(item => <ListComponent key={item.id} item={item} />)
    )}
  </>
}
```
Calling the `useTransition` hook returns an array with the first value being an `isPending` variable and the second value being the `startTransition` function. The `isPending` variable simply returns true while the code inside the `startTransition` hook is running. Essentially, this variable is true when the slow state update is running and false when it is finished running. The `startTransition` function takes a single callback and this callback just contains all the code related to the slow state update including the setting of the state.

In our case we are wrapping `setList` in our `startTransition` function which tells React that our `setList` state update is of low importance. This means that as soon as all of our normal state updates are finished that the component should rerender even if this slow state update is not finished. Also, if a user interacts with your application, such as clicking a button or typing in an input, those interactions will take higher priority than the code in the `startTransition` function. This ensures that even if you have really slow code running it won't block your user from interacting with the application.

Here is an example of what our list acts like with the `useTransition` hook.

<UseTransition client:load />

You can see that our input updates immediately when you type, but the actual list itself does not update until later. While the list is updating the text `Loading...` renders and then once the list finishes loading is renders the list.

Using this hook is quite easy, but this is not something you want to use all the time. You should only use this hook if you are having performance issues with your code and there are no other ways to fix those performance concerns. If you use this hook all the time you will actually make your app less performant since React will not be able to effectively group your state updates and it will also add extra overhead to your application.

## Conclusion

The `useTransition` hook makes working with slow, computationally intense state updates so much easier since now we can tell React to prioritize those updates at a lower level to more important updates which makes your application seem much more performant to users.