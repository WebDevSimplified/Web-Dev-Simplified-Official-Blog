---
title: The Power Of Custom Hooks
date: "2019-11-11"
description: "A quick explanation of how to write custom hooks and why they are so useful."
tags: ['React']
---

Are you tired of your React components being littered with messy `useEffect` hooks? Worse yet, are you tired of having to duplicate your common hook functionality between components? We have all been there where we have our fetch logic duplicated across many different components which is messy and difficult to maintain. This is where custom hooks come in. They are amazing at grouping up common logic like fetching from APIs and they make it incredibly easy to use that logic anywhere in the application with no duplication.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: 6ThXsUwLWvc`

## How To Make A Custom Hook?

Getting started with a custom hook is luckily incredibly easy, because they are just functions. The only caveat is that custom hooks must start with `use` at the beginning of their name. This is so that the React linting tools know this function is a hook, and it also makes it easier to understand which functions are hooks and which are not. Other than that a custom hook will work just like any other function. In order to explain this process further we are going to create a custom hook called `useLocalStorage` which will act just like `useState` but it will sync the state with the browsers `localStorage`.

## useLocalStorage Hook

The first step is to create the custom hook function. I like to put custom hooks in their own file much like a React component since a custom hook is like a component, but it stores logic instead of presentation. This means we will have a file called `useLocalStorage.js` which contains the following code.

```javascript
export default function useLocalStorage() {

}
```

Before working on the implementation of this function I first want to figure out exactly how this function will be used. Normally when dealing with `localStorage` the code will look something like this.

```javascript
const key = 'key'
const [value, setValue] = useState(() => {
  const jsonValue = localStorage.getItem(key)
  if (jsonValue != null) return JSON.parse(jsonValue)
  return initialValue
})

useEffect(() => {
  localStorage.setItem(key, JSON.stringify(value))
}, [value])
```

There is a `useState` at the beginning which will query `localStorage` to get the value if it already exists, but if not then the `initialValue` will be set for the state. Then `useEffect` is used to update `localStorage` every time the value is updated.

The reason the function version of `useState` is used is because it will check the `localStorage` first before setting the state to the `initialValue`. If `useEffect` was used to check `localStorage` instead like below it would cause the component to render twice. Once when the `initialValue` was set and once after the `useEffect`.

```javascript
const key = 'key'
const [value, setValue] = useState(initialValue)

useEffect(() => {
  const valueJSON = localStorage.getItem(key)
  if (valueJSON != null) setValue(JSON.parse(value))
}, [])

useEffect(() => {
  localStorage.setItem(key, JSON.stringify(value))
}, [value])
```

Based on the use case above we know that the `useLocalStorage` hook will need a `key` to store the state as well as an `initialValue` to set the state to if there is nothing in `localStorage`. We can thus update our code to look like this.

```javascript
export default function useLocalStorage(key, initialValue) {

}
```

Then in the component where `localStorage` is being used the code can be simplified to just one simple line which has the same return values as `useState` since the `useLocalStorage` hook will behave exactly like `useState`.

```javascript
const [value, setValue] = useLocalStorage('key', initialValue)
```

Now all that is left to do is move over the logic for how to handle `localState` into the `useLocalStorage` hook and return `value` and `setValue`.

```javascript {10,12}
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)
    return initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}
```

As you can see the majority of this code is the same as the previous `localStorage` code, but there are two main differences. The first is that the key is no longer a `const` since it is a parameter to the `useLocalStorage` hook so that needs to be set as a dependency for `useEffect`. Second, the `value` and `setValue` variables are being returned from the hook in the exact same format as `useState` so this hook can be used in the exact same way as `useState`.

## Conclusion

That is all there is to creating custom hooks in React. They are no more than just fancy functions that can use React hooks inside of them, but they are incredibly powerful in cleaning up code and sharing logic between components.