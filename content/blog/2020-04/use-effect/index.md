---
title: "Everything You Need To Know About useEffect"
date: "2020-04-27"
description: "An in depth look at every aspect of the useEffect React hook."
tags: ['React']
---

In my last blog post I talked all about the `useState` hook in React. In this article I want to talk about the `useEffect` hook which I think is the best part of React hooks. The `useEffect` hook is perfect for handling side effects caused by mounting, un-mounting, changing state, etc.

## From Classes To Functions

In order to understand how the `useEffect` hook works we first need to look at how side effects are managed in class components. For this article we are going to use a simple component which displays the window size and a list of items from a URL for all examples.
```jsx
class WindowSizeList extends React.Component {
  constructor(props) {
    super(props)
    this.state = { windowWidth: window.innerWidth, items: [] }
    this.updateWindowWidth = this.updateWindowWidth.bind(this);
  }

  updateWindowWidth() {
    this.setState({ windowWidth: window.innerWidth })
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateWindowWidth)
    this.setState({ items: CustomApi.getList(this.props.url) })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.url !== this.props.url) {
      this.setState({ items: CustomApi.getList(this.props.url) })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowWidth)
  }

  render() {
    return (
      <>
        <div>Window Width: {this.state.windowWidth}</div>
        {this.state.items.map(item => {
          return <div key={item}>{item}</div>
        })}
      </>
    )
  }
}
```

Essentially all this component does is display the window width and a list of items. There is also some basic code setup to manage changes to the window width or the url so we can update the list if the url for the list changes. Now let's look at how we can convert this class component to a function component with `useEffect`. To start with we will use the following base code.

```jsx
function WindowSizeList({ url }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [items, setItems] = useState([])

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  // TODO: Update list when url changes or on mount
  // TODO: Setup resize event listener on mount
  // TODO: Cleanup resize event listener on un-mount

  return (
    <>
      <div>Window Width: {windowWidth}</div>
      {items.map(item => {
        return <div key={item}>{item}</div>
      })}
    </>
  )
}
```

### Creating Your First Side Effect

In the class component example all side effects are handled with life cycle methods. This makes it easy to define simple side effects, but once you start defining multiple side effects that need to be cleaned up it can become really confusing having them all crammed into a few life cycle methods. This is why the `useEffect` hook was created. With the `useEffect` hook, each side effect and all of its cleanup is defined in its own `useEffect` hooks.

The most basic way to use the `useEffect` hook is by passing a single function to `useEffect`. This function would be the side effect you want to run.
```js
useEffect(() => {
  console.log('This is a side effect')
})
```
This side effect will now run on every single render of the component. That means when the component is first mounted, when the props change, and/or when the state changes. This is really nice since code no longer needs to be duplicated between the mounting and updating life cycle methods like in a class component. This obviously is not ideal if a side effect is only desired on mount or when certain props or state change. That is why `useEffect` takes an optional second parameter which is an array of values. This array of values is compared during each re-render with the previous render's array values and the side effect will only be run if the values in the array changed since the last render. This means if you only want to run a side effect on mount then you can pass an empty array as the second parameter since that will never change between renders.
```js
useEffect(() => {
  console.log('Only run on mount')
}, [])
```
Having this second array parameter is really nice since it allows side effects to be run whenever any value changes. For example if the url from our component changes we can run a side effect
```js
useEffect(() => {
  console.log('Only run on url change')
}, [url])
```
With that knowledge we can actually write the code for updating our list when the url changes in our component.
```jsx {9-11}
function WindowSizeList({ url }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [items, setItems] = useState([])

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    setItems(CustomApi.getList(url))
  }, [url])
  // TODO: Setup resize event listener on mount
  // TODO: Cleanup resize event listener on un-mount

  return (
    <>
      <div>Window Width: {windowWidth}</div>
      {items.map(item => {
        return <div key={item}>{item}</div>
      })}
    </>
  )
}
```

### Cleaning Up Side Effects

We nearly have all the knowledge we need to setup the resize side effect, but right now we have no way to clean up a side effect. Luckily, cleaning up side effects with `useEffect` is really easy. If you return a function from the side effect inside `useEffect` then that function will be run every time the side effect is re-ran.
```js
useEffect(() => {
  console.log('This is my side effect')

  return () => {
    console.log('This is my clean up')
  }
})
```
If we were to mount this component and then re-render it twice and then un-mount it you would get the following output.
```js
// MOUNTED
// This is my side effect

// RE-RENDER 1:
// This is my clean up
// This is my side effect

// RE-RENDER 2:
// This is my clean up
// This is my side effect

// UN-MOUNT:
// This is my clean up
```
This is because the cleanup is run directly before the side effect is run as long as the side effect has occurred at least once. Also, the cleanup is run when a component un-mounts as well.

With this knowledge we now know everything we need in order to finish our component.
```jsx {13-18}
function WindowSizeList({ url }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [items, setItems] = useState([])

  const updateWindowWidth = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    setItems(CustomApi.getList(url))
  }, [url])

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth)
    return () => {
      window.removeEventListener('resize', updateWindowWidth)
    }
  }, [])

  return (
    <>
      <div>Window Width: {windowWidth}</div>
      {items.map(item => {
        return <div key={item}>{item}</div>
      })}
    </>
  )
}
```

## Conclusion

Overall, `useEffect` drastically simplifies side effects in components by making it much easier to run side effects when props/state change. `useEffect` also makes organizing side effects easier since they are each given their own `useEffect` hook instead of being crammed into a few life cycle methods.