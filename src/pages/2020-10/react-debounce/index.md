---
layout: "@layouts/BlogPost.astro"
title: "Instant Easy React Performance With Debounce"
date: "2020-10-12"
description: "Get easy and quick React performance with a custom debounce hook."
tags: ["React"]
---

One of the biggest benefits to React is its open ended nature. You have the freedom to construct the code however you want, but that freedom makes it very easy to make simple mistakes that can drastically slow down your application. In this quick article I will show you how to create a custom debounce hook that will significantly increase the performance of your applications.

## What Is Debounce?

Before we can build a custom debounce hook we first need to understand what debounce is and to do that we need to understand when you would use debounce. Take the below code for example.

```jsx
useEffect(() => {
  fetch(`https://example.com?q=${query}`)
    .then(res => res.json())
    .then(data => setData(data))
}, [query])
```

This code is pretty simple and fetches new data every time the query changes. I have seen code like this all over the place in React and that is because it is simple to write and for the most part works. This code does have some issues, though.

If your query changes very quickly then you will be putting a ton of extra stress on the server you are calling with fetch which could slow down your application since you are calling the server every time the query changes.

Another big issue is that network requests can take a varied amount of time and if your query changes often then sometimes the requests that have old query values will come back after requests with new query values which will cause you to display data based on previous queries instead of the most recent query. This is a subtle bug which is hard to catch so it is important to fix it right away since it could easily leak into production.

Debounce is simply the act of delaying some piece of code, in our case the fetch request, until after all the rapid changes are made. This means if query changes 100 time in a second we will only run this code once after that second is over instead of running it 100 times and running into the problems addressed above. Generally this is done with the `setTimeout` function. So now let's take a look at how to do this.

## Basic React Debounce

As I mentioned above `setTimeout` is the best way to handle debouncing in JavaScript since we can delay code with it and clear out previous timeouts to prevent multiple executions of the code.

```jsx {2,7,9}
useEffect(() => {
  const timeout = setTimeout(() => {
    fetch(`https://example.com?q=${query}`)
      .then(res => res.json())
      .then(data => setData(data))
  }, [query])
}, 250)

return () => clearTimeout(timeout)
```

The above code may look pretty confusing, but we really only changed a small amount of code.

The first thing we did was wrap our entire fetch request in a `setTimeout` with a 250 millisecond delay. This means that the fetch code will not run until after a 250 millisecond delay. This alone would just cause a delay between when our query changes and when the fetch is called without addressing any of the above problems. The way we fix those problems is with the final return statement in the `useEffect`.

_If you are not familiar with how return works in useEffect check out my full useEffect article [here](/2020-04/use-effect)_

Inside the return of our `useEffect` we are clearing out the previous timeout. This means if any of the dependencies of our `useEffect` are changed before the 250 millisecond delay is over then the fetch will be cancelled before it is run and a new request will be queued up in its place. This means no matter how many times query changes in a short period of time, we will only ever run the fetch request once.

## Creating A Custom Hook

Debounce is something you will need in many places in your applications so it is perfect for a custom hook.

```js
import { useEffect, useCallback } from "react"

function useDebounceEffect(effect, deps, delay = 250) {
  const callback = useCallback(effect, deps)

  useEffect(() => {
    const timeout = setTimeout(callback, delay)
    return () => clearTimeout(timeout)
  }, [callback, delay])
}

export default useDebounceEffect
```

In the above hook we are passing in the effect and dependencies just like you would in a normal `useEffect` call. On top of that this hook takes an optional delay argument to determine how long the `setTimeout` should wait for. Then inside the code we are using `useCallback` to make sure that we only ever re-run the effect when the dependencies change.

_If you want more information on why this `useCallback` is needed check out my full `useCallback` tutorial [here](/2020-05/memoization-in-react)_

Lastly, inside the `useEffect` we are doing the same logic with the `setTimeout` to run the effect after a specific delay while cancelling any old effects.

This hook can then be used as simply as this.

```js {8-12}
import React, { useState } from "react"
import useDebounceEffect from "./useDebounceEffect"
import DataItem from "./DataItem"

export default function App() {
  const [query, setQuery] = useState("")
  const [data, setData] = useState([])
  useDebounceEffect(
    () => {
      fetch(`https://example.com?q=${query}`)
        .then(res => res.json())
        .then(data => setData(data))
    },
    [query],
    500
  )

  function handleChange(e) {
    setQuery(e.target.value)
  }

  return (
    <>
      <label>Search</label>
      <input value={query} onChange={handleChange} />
      {data.map(data => (
        <DataItem data={data} />
      ))}
    </>
  )
}
```

This hook is called just like `useEffect`, but it now takes an optional delay after the dependencies.

## Conclusion

Debounce is one of those things most people never think of, so hopefully this article has opened your eyes to the power of debounce and how it can drastically increase the performance of your React code with minimal effort.
