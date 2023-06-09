---
layout: "@layouts/BlogPost.astro"
title: Local State Is The Best State
date: "2019-12-02"
description: "Storing state in React is difficult to do right, but by storing state as locally as possible it can be a lot easier."
tags: ["React"]
---

React has many ways to handle data such as state, props, context, and Redux to name a few. This is great since it gives the developer freedom to store and send their data the way they want, but it is a double edged sword since this freedom also means that developers can very easily create difficult to maintain and poorly designed code. This problem of state management and knowing where to store state has been a problem since the beginning of React, but many of the issues around state management can be avoided by always storing state as close to the component(s) that use it as possible. In this article I am going to breakdown exactly how to use this rule to store state in the most optimal and well designed way.

## Why Storing State Locally Is Important

I have mentioned that storing state as locally as possible is good since it leads to cleaner code that is easier to modify, but why exactly is that? The simple answer is that local state is easier to understand since the code that uses the state and the code that modifies the state are closer together. For example, imagine a counter component that increments the count when a button is clicked.

```jsx
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <button onClick={() => setCount(prevCount => prevCount + 1)}>
      You have clicked {count} times
    </button>
  )
}
```

This code is pretty easy to follow and if the requirements for the counter changed to need a reset button it would be easy to change.

```jsx {8}
function Counter() {
  const [count, setCount] = useState(0)
  return (
    <>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>
        You have clicked {count} times
      </button>
      <button onClick={() => setCount(0)}>Reset</button>
    </>
  )
}
```

This is a good example of how to store state locally, but many times I see code that looks like this instead.

```jsx
function App() {
  const [count, setCount] = useState(0)
  const incrementCount = () => setCount(prevCount => prevCount + 1)
  return <Counter count={count} incrementCount={incrementCount} />
}

function Counter({ count, incrementCount }) {
  return (
    <button onClick={incrementCount}>You have clicked {count} times</button>
  )
}
```

While this code will do the exact same thing as the previous code it is much harder to follow the count state logic since the updating and display of the state are split between two separate components. This becomes an especially large problem when the `App` component is a larger component with tons of other state stored in it. This code is also more complex if we need to add a reset button since we need to modify both the `App` and `Counter` component.

```jsx {4,9,20}
function App() {
  const [count, setCount] = useState(0)
  const incrementCount = () => setCount(prevCount => prevCount + 1)
  const resetCount = () => setCount(0)
  return (
    <Counter
      count={count}
      incrementCount={incrementCount}
      resetCount={resetCount}
    />
  )
}

function Counter({ count, incrementCount, resetCount }) {
  return (
    <>
      <button onClick={incrementCount}>You have clicked {count} times</button>
      <button onClick={resetCount}>Reset Count</button>
    </>
  )
}
```

## When To Store State In Parent Components

Unfortunately, it is not always possible to store and update state in the same component. Sometimes state is shared across multiple components, so the storage of that state must be in a parent component that all the child components share. The rule of storing state in the most local component still applies, though. The only difference is that now the state is stored in the parent component that is closest to the child components that use the state.

For example. Imagine a todo application with the following component structure.

```html
<App>
  <TodosContainer>
    <TodoList></TodoList>
    <TodoCount></TodoCount>
  </TodosContainer>
</App>
```

The state of all todos will need to be available inside the `TodoList` component and the `TodoCount` component. This means we cannot just store it in the `TodoList` component. Instead we will need to store this information in the parent component of `TodosContainer`. It would look something like this.

```jsx
function TodosContainer() {
  const [todos, setTodos] = useState([])
  return (
    <>
      <TodoList todos={todos} />
      <TodoCount todos={todos} />
    </>
  )
}
```

In general I always start by storing all of my state locally inside the component that uses it until I need to move it out in the case where other components need access.

## How To Handle Global State

Global state in React is difficult to deal with since React is built around component state, but with the use of Context global state can be easy to handle. For example to store information about a user that is global to the entire application then a `UserContext` in the `App` component would be ideal.

```jsx
const UserContext = React.createContext()

function App() {
  ;<UserContext.Provider value={getUser()}>
    <Component />
  </UserContext.Provider>
}
```

Sometimes global state is really only global for a specific component, though. In these cases the context should be moved as local as possible just like when dealing with component state. If for example there is a map in an application that requires map information in all the children, then a `MapContext` in the `Map` component is ideal. This keeps the `MapContext` information out of the `App` component and keeps it local to the code that interacts with the `MapContext` data.

## Conclusion

There are obviously exceptions to the rule of always keeping state as local as possible, but in general following this rule will lead to much cleaner and easier to maintain code. With this rule, giant components full of an entire application's state can be easily avoided.
