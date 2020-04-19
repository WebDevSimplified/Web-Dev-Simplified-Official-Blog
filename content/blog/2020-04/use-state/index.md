---
title: "Everything You Need To Know About useState"
date: "2020-04-20"
description: "An in depth look at every aspect of the useState React hook.."
---

One of the most important parts of any application is managing state. Most code that is written in some way deals with modifying or reading state, so understanding how to manage state is incredibly important. Before hooks were introduced the only way to modify state was with class components and `this.state`, but React has introduced hooks, specifically the `useState` hook, which is a new way to handle state inside of function components. There are a few differences between state and function component state management, so in this article I will be explaining everything you need to know about `useState` so you can start building stateful function components.

## From Classes To Functions

In order to understand how the `useState` hook works we first need to look at how state is managed in class components. For this article we are going to use a simple counter component for all examples.
```jsx
class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = { count: 0 }
  }

  changeCount(amount) {
    this.setState(prevState => {
      return { count: prevState.count + amount }
    })
  }

  resetCount() {
    this.setState({ count: 0 })
  }

  render() {
    return (
      <>
        <span>{this.state.count}</span>
        <button onClick={() => this.changeCount(1)}>+</button>
        <button onClick={() => this.changeCount(-1)}>-</button>
        <button onClick={() => this.resetCount()}>Reset</button>
      </>
    )
  }
}
```

Essentially all this component does is create a counter with a plus, minus, and reset button and by default the counter has a value of 0 when it first renders. Now let's look at how we can convert this class component to a function component with `useState`. To start with we will use the following base code.

```jsx
function Counter() {
  // TODO: Create state

  function changeCount(amount) {
    // TODO: Update state
  }

  function resetCount() {
    // TODO: Update state
  }

  return (
    <>
      <span>{ /* TODO: Show State */}</span>
      <button onClick={() => changeCount(1)}>+</button>
      <button onClick={() => changeCount(-1)}>-</button>
      <button onClick={() => resetCount()}>Reset</button>
    </>
  )
}
```

### Creating initial state

In the class component example the initial state is defined in a constructor as an object which contains all the state for the component.
```js {3}
constructor(props) {
  super(props)
  this.state = { count: 0 }
}
```
Obviously function components do not have constructors, so instead the `useState` hook takes the initial state as an argument.
```js
useState(initialState)
```
The `useState` hook also returns an array with two entries. The first entry in the array is the current state while the second entry is the method which allows us to update the state.
```js
const [state, setState] = useState(initialState)
```
*In order to easily breakout the array that is returned from `useState` we are using destructoring. If you are not familiar with destructoring you can checkout [this](https://youtu.be/NIq3qLaHCIs) video tutorial on the topic.*

If we were to map the class component directly to `useState` we would end up with something like this.
```js
const [state, setState] = useState({ count: 0 })
```
Now technically there is nothing wrong with this, but since function components can use multiple `useState` hooks inside one component it is much more common to have an individual `useState` hook for each piece of state. In our example, that would mean we would have a single `useState` hook for managing just the count state.
```js
const [count, setCount] = useState(0)
```
This allows us to simplify out component state out into their own variables instead of cramming all the state into one big `this.state` object. Let's plug this into our function component.
```jsx {2,14}
function Counter() {
  const [count, setCount] = useState(0)

  function changeCount(amount) {
    // TODO: Update state
  }

  function resetCount() {
    // TODO: Update state
  }

  return (
    <>
      <span>{count}</span>
      <button onClick={() => changeCount(1)}>+</button>
      <button onClick={() => changeCount(-1)}>-</button>
      <button onClick={() => resetCount()}>Reset</button>
    </>
  )
}
```

### Updating State

Updating state with function components is luckily very similar to updating state with class components. The main difference is that in function components you will be updating a single state variable, like `count`, while in class components you call `this.setState` on the entire state object. For example, in our class component to reset the state we have the following code.
```js
this.setState({ count: 0 })
```
This will update the count portion of `this.state` to be `0`. With hooks, since all of the state is broken out into their own variables we can use the `setCount` function to directly set the count state.
```js
setCount(0)
```
With this approach we do not have to worry about creating a new object just to set the state and instead can just set the state directly to the value we want.

Inside the `changeCount` function we are using the second form of `this.setState` to update the count based on the previous count.
```js
this.setState(prevState => {
  return { count: prevState.count + amount }
})
```
This code is pretty clunky since it involves creating a new object from values of the previous object, but with function components, since we are not using an object in state this code is much cleaner to write.
```js
setCount(prevCount => prevCount + amount)
```
As you can see we are able to just directly set the count to a value instead of having to create a brand new object to handle it for us.

Let's add the code for updating of our state into our function component.
```jsx {5,9}
function Counter() {
  const [count, setCount] = useState(0)

  function changeCount(amount) {
    setCount(prevCount => prevCount + amount)
  }

  function resetCount() {
    setCount(0)
  }

  return (
    <>
      <span>{count}</span>
      <button onClick={() => changeCount(1)}>+</button>
      <button onClick={() => changeCount(-1)}>-</button>
      <button onClick={() => resetCount()}>Reset</button>
    </>
  )
}
```
With that we now have a complete counter component written using a function component.

## `useState` Gotchas

There are a few extra things about `useState` which are a bit different than class component state that you need to be aware of.

### Updating State Objects

I mentioned earlier that most of the time you will use single values with `useState`, but there are some cases where using an object makes more sense. Let's just use the example of user preferences.
```js
const [preferences, setPreferences] = useState({
  theme: 'light',
  fontSize: 'normal'
})
```
If you are used to class components then when you decide to update the theme portion of this state you may think to do something like this.
```js
setPreferences({ theme: 'dark' })
```
This is wrong, though. What this code does is update the entire preferences object to be just `{ theme: 'dark' }` without any `fontSize`. This is because the set method from `useState` will overwrite the entire value of the state with the new value, so the new value of `{ theme: 'dark' }` overwrites all of the old state. In order to make sure this does not happen you would need to combine the old state with the new state manually.
```js
setPreferences(prevPreferences => {
  return { ...prevPreferences, theme: 'dark' }
})
```
This code will combine all the old preferences with the new dark theme preference.

### Initial State Computation

Sometimes it is slow to compute the initial state of a component. This is not a problem in class components since the initial state computation only happens once in the constructor, but in function components the initial state computation is declared in the render function and happens every render. Having a slow initial state computation can slow down an entire application significantly because of this.
```js
useState(/* Slow computation */)
```
Luckily, `useState` can also take a function as the argument instead of a value, and that function will only be run the very first time a component is rendered. By using this function version of `useState` you will no longer run the slow computation each render, but only once on the first render of the component just like class components.
```js
useState(() => {
  /* Slow computation */
})
```

### Using Multiple `useState` Hooks

As I mentioned previously, you should break out your state into individual `useState` hooks. This is as simple as having multiple `useState` hooks one after another in the code.
```js
const [count, setCount] = useState(0)
const [color, setColor] = useState('red')
```
This is really nice since it makes sure each part of your state has its own name and update function which makes handling state much easier.

## Conclusion

Overall, `useState` is not much different than class component state, which makes switching to `useState` quite painless. There are only a few small gotchas to worry about, but most likely you will never run into these issues. 