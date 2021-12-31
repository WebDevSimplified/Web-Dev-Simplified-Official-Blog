---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "How To Use Memoization To Drastically Increase React Performance"
date: "2020-05-04"
description: "An in depth look at every aspect of the useMemo and useCallback React hooks."
tags: ['React']
---

In my last blog post I talked all about the `useEffect` hook in React. In this article I want to talk about both the `useMemo` hook and the `useCallback` hook since they are both crucial for creating performant React applications through the use of memoization.

## What Is Memoization?

Memoization is essentially just caching. Imagine a complex function that is slow to run which takes `a` as an argument. In order to speed up this function, you can cache the results of running the function so that when the function is run with the same inputs you can use the cached value instead of recomputing the value. This would look something like this.
```js
const cache = {}

function slow(a) {
  if (cache[a]) return cache[a]
  
  const result = /* Complex logic */
  cache[a] = result
  return result
}
```
This is a very common problem in React since all the component logic is re-computed every time the component renders and could cause drastic slowdowns if the component logic is slow to compute. Because of this, many React applications use memoization libraries or custom code to make memoization possible, but with the introduction of hooks, React has built in its own memoization system which is incredibly easy to use.

## `useMemo`

*If you prefer to learn visually, check out the video version of this hook.*
`youtube: THL1OPn72vo`

The most basic form of memoization in React is the `useMemo` hook. The syntax for this hook is actually the exact same as `useEffect` since they both work in a similar way. The first argument of `useMemo` is a function that does the complex calculation you want to memoize, and the second argument is an array of all dependencies for that memoization.
```js
const result = useMemo(() => {
  return slowFunction(a)
}, [a])
```
As you can see in the above example, we want to memoize `slowFunction` which depends on `a`. To do this, all we did was wrap the `slowFunction` in our `useMemo` function and used the argument `a` in the array of dependencies. This code essentially does the exact same thing as our previous code for memoization, since as long as `a` stays the same the `slowFunction` will not be re-run and instead the cached value will be used. This is the most common way `useMemo` is used, but there is a second common use case which is referential equality.

### Referential Equality

If you are unfamiliar with referential equality it essentially defines whether or not the references of two values are the same. For example `{} === {}` is false because it is checking referential equality. While both of the objects are empty, they reference different places in memory where the object is stored. Because of this, they are not referentially equal and this comparison returns false. *If you are interested in learning more about reference vs value comparisons checkout [this video](https://youtu.be/-hBJz2PPIVE).*

This referential equality is important when it comes to dependency arrays, for example in `useEffect`.
```js
function Component({ param1, param2 }) {
  const params = { param1, param2, param3: 5 }

  useEffect(() => {
    callApi(params)
  }, [params])
}
```
At first glance it may seem this `useEffect` works properly, but since the `params` object is created as a new object each render this is actually going to cause the effect to run every render since the reference of `params` changes each render. `useMemo` can fix this, though.
```js
function Component({ param1, param2 }) {
  const params = useMemo(() => {
    return { param1, param2, param3: 5 }
  }, [param1, param2])

  useEffect(() => {
    callApi(params)
  }, [params])
}
```
Now if `param1` and `param2` do not change the `params` variable will be set to the cached version of `params` which means the reference for `params` will only change if `param1`, or `param2` change. This referential equality is really useful when comparing objects in dependency arrays, but if you need to use a function in a dependency array you can use the `useCallback` hook.

## `useCallback`

*If you prefer to learn visually, check out the video version of this hook.*
`youtube: _AyFP5s69N4`

`useCallback` works nearly identically to `useMemo` since it will cache a result based on an array of dependencies, but `useCallback` is used specifically for caching functions instead of caching values.
```js
const handleReset = useCallback(() => {
  return doSomething(a, b)
}, [a, b])
```
This syntax may look exactly the same as `useMemo`, but the main difference is that `useMemo` will call the function passed to it whenever its dependencies change and will return the value of that function call. `useCallback` on the other hand will not call the function passed to it and instead will return a new version of the function passed to it whenever the dependencies change. This means that as long as the dependencies do not change then `useCallback` will return the same function as before which maintains referential equality.

In order to further understand the differences between `useCallback` and `useMemo` here is a quick example where both will return the same value.
```js
useCallback(() => {
  return a + b
}, [a, b])

useMemo(() => {
  return () => a + b
}, [a, b])
```

As you can see `useCallback` will return the function passed to it, while `useMemo` is returning the result of the function passed to it.

### Referential Equality

Just like with `useMemo`, `useCallback` is used to maintain referential equality.
```jsx
function Parent() {
  const [items, setItems] = useState([])
  const handleLoad = (res) => setItems(res)

  return <Child onLoad={handleLoad} />
}

function Child({ onLoad }) {
  useEffect(() => {
    callApi(onLoad)
  }, [onLoad])
}
```
In the above example the `handleLoad` function is re-created every time the `Parent` component is rendered. This means that the `Child` component's `useEffect` will re-run ever render since the `onLoad` function has a different referential equality each render. To fix this we need to wrap the `handleLoad` in a `useCallback`.
```jsx {3}
function Parent() {
  const [items, setItems] = useState([])
  const handleLoad = useCallback((res) => setItems(res), [])

  return <Child onLoad={handleLoad} />
}

function Child({ onLoad }) {
  useEffect(() => {
    callApi(onLoad)
  }, [onLoad])
}
```
Now the `handleLoad` function will never change, thus the `useEffect` in the `Child` component will not be called on each re-render.

## `React.memo`

The final type of memoization in React is with `React.memo`. The `React.memo` function behaves very similarly to `React.PureComponent` in that a component wrapped in `React.memo` will not re-render unless the props change.
```js
React.memo(function Component(props) {
  // Do something
})
```
The component above will only re-render when the props of the component change now. This will not stop a component from re-rendering when the state or context inside of it change, though. This means that even if you wrap a component in `React.memo` it will still re-render when the internal state or context of the component changes.

## Conclusion

React has many ways built in to handle memoization for performance needs. This makes it incredibly easy to maintain highly performant applications without needing to write a bunch of additional code.