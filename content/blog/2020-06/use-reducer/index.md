---
title: "How To Manage Complex State In React With useReducer"
date: "2020-06-08"
description: "An in depth look at every aspect of the the useReducer hook in React."
---

Before the release of hooks, nearly every React project used Redux to manage complex state interactions. Redux is great for managing complex state transitions and sharing state globally, but with the introduction of the Context API and the `useReducer` hook Redux is no longer necessary for handling complex shared state. In my last article I talked about the Context API and the `useContext` hook which you can find [here](/2020-06/use-context). In this article I want to talk about `useReducer` and how it is perfect for handling complex state transitions.

## From `useState` to `useReducer`?

`useReducer` is the best solution in React for handling complex state interactions so let's look at how we can convert a component from `useState` to `useReducer`.

```jsx
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
In the above code we have a very simple counter component which can increment, decrement, and reset the count. In order to start converting this to use the `useReducer` hook we first need to remove the `useState` call and replace it with `useReducer`, but before we can do that we need to understand how `useReducer` is called.

### Setting Up State

Similar to `useState`, `useReducer` takes an initial state as one of its arguments and returns to us the current state and a way to update that state. `useReducer` also re-renders a component when the state changes just like `useState`. The only major difference is that we also need to pass a reducer function to `useReducer` which contains all the logic for modifying our state.
```js
const [count, dispatch] = useReducer(reducer, 0)
```
In the above code you can see that the default state of `0` is passed as the second argument to `useReducer` and the count is returned as the first element in the array just like with `useState`. Now instead of having a `setCount` function we have a `dispatch` function which allows us to call the reducer function we pass to `useReducer`. This is a little bit complicated to think about in your head so here is a simple example based on our counter.
```js
function reducer(count, action) {
  switch (action.type) {
    case 'increment':
      return count + 1
    default:
      return count
  }
}

const [count, dispatch] = useReducer(reducer, 0)
```
We now have defined the reducer function and it takes two parameters. The first parameter is the current state of our component. In our case this is just our count. The second parameter is our action which is going to be set to whatever you pass to `dispatch`. I will cover this more in just a bit. Now inside of the reducer function we have a set of defined actions we can perform on our state. In our case the only action we can perform is the increment action, so if we pass `{ type: 'increment }` to `dispatch` then it will increase our count by one, otherwise the count will not change.

Essentially, the reducer function takes in a current state as well as an action to perform on the state and it returns the new state. Here is the code we would use to increment our counter.
```js
dispatch({ type: 'increment' })
```
Now that we understand how `useReducer` initializes and updates state, let's replace `useState` with `useReducer` in our counter component.
```jsx
function reducer(count, action) {
  switch (action.type) {
    case 'increment':
      return count + 1
    case 'decrement':
      return count - 1
    case 'reset':
      return 0
    default:
      return count
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0)

  return (
    <>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </>
  )
}
```
As you can see there is no longer any logic inside of our component. The component just tells our reducer what actions to perform and the reducer handles all the complex logic. This is great since it separates out the logic of the state from the component itself and makes it easier to reuse and share this state between components.

What happens if you want to pass data to your reducer, though? This is actually really simple. Since we can pass anything we want to dispatch we can just add our data to the object we pass to dispatch. The common practice is to put all your data inside a property called `payload` on your object. Here is an example of how to do that.
```jsx
function reducer(count, action) {
  switch (action.type) {
    case 'increment':
      return count + 1
    case 'decrement':
      return count - 1
    case 'reset':
      return 0
    case 'change-count':
      return count + action.payload.amount
    default:
      return count
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0)

  return (
    <>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: 'increment' })}>
        +
      </button>
      <button onClick={() => dispatch({ type: 'decrement' })}>
        -
      </button>
      <button onClick={() => {
        dispatch({ type: 'change-count', payload: { amount: 5 } })
      }}>
        Add 5
      </button>
      <button onClick={() => dispatch({ type: 'reset' })}>
        Reset
      </button>
    </>
  )
}
```
All we had to do in order to add this new action was create a new section in our reducer to handle this new action. Then we added a call to dispatch to call that action and gave it a payload with the amount we want to change our count by.

## Cleaning Up Actions

One of the biggest downsides to `useReducer` is that all the actions are defined in strings. This makes it easy to accidentally misspell the action type and cause a bug. One easy way to minimize these types of mistakes is to use a constant object to contain all available actions. This then gives you autocomplete on action types and if you are using TypeScript they can be checked by the compiler. Here is a simple example of that.
```jsx {1-6,10,12,14,16,29,32,37,43}
const ACTIONS = {
  INCREMENT: 'increment',
  DECREMENT: 'decrement',
  RESET: 'reset',
  CHANGE_COUNT: 'change-count'
}

function reducer(count, action) {
  switch (action.type) {
    case ACTIONS.INCREMENT:
      return count + 1
    case ACTIONS.DECREMENT:
      return count - 1
    case ACTIONS.RESET:
      return 0
    case ACTIONS.CHANGE_COUNT:
      return count + action.payload.amount
    default:
      return count
  }
}

function Counter() {
  const [count, dispatch] = useReducer(reducer, 0)

  return (
    <>
      <span>{count}</span>
      <button onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>
        +
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>
        -
      </button>
      <button onClick={() => {
        dispatch({
          type: ACTIONS.CHANGE_COUNT,
          payload: { amount: 5 }
        })
      }}>
        Add 5
      </button>
      <button onClick={() => dispatch({ type: ACTIONS.RESET })}>
        Reset
      </button>
    </>
  )
}
```

## Conclusion

`useState` is a great way to setup simple state inside of a component. When state starts to get more complex, though, and is shared between multiple components it is generally best to switch to `useReducer` since `useReducer` makes it easier to write complex state interactions without creating a large complex mess of code.