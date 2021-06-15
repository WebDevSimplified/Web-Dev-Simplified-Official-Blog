---
title: "What's New In React 18?"
date: "2021-06-14"
description: "React 18 introduces a ton of new features related to performance and loading which you should be excited about."
tags: ['React']
---

React 17 launched not too long ago and with it came a pretty disappointing lack of changes. React 18 on the other hand is packed full of new features that will improve performance and loading of nearly every app. In this article I will be talking about the new features coming to React 18 and how you can start using them today.

## Suspense

Suspense is the feature that pretty much everyone has been waiting for. We were teased with the idea of Suspense years ago and it is now finally coming to React 18. Before we get into the code around Suspense we first need to talk about what Suspense does.

Imagine you have a site that looks something like this:
```jsx
<Container>
  <Navbar />      {/*  50ms */}
  <Sidebar />     {/* 150ms */}
  <BlogArticle /> {/* 100ms */}
  <Comments />    {/* 200ms */}
</Container>
```
We have 4 main components that each have their own unique loading time next to them. This time is essentially the time it takes for that individual component to get its data from the database on your server and represents the rough loading time for that component's data. In our example all of the components take a total of 500ms to load.

One problem, though, is that our page must wait 150ms for the sidebar data and 200ms for the comments data when the user really only cares about reading the article as quickly as possible. The sidebar and comments are components that don't need to be available right away and can instead load later letting the entire page render and load quicker.

Before Suspense there was no way to delay the loading of these components when doing server side rendering since all the HTML must be sent at once which means all the data must be loaded. With Suspense, though, you can tell React to only load the data for the important components and delay the loading of less important or slow components.

```jsx {3-5,7-9}
<Container>
  <Navbar />
  <Suspense fallback={LoadingSpinner}>
    <Sidebar />
  </Suspense>
  <BlogArticle />
  <Suspense fallback={LoadingSpinner}>
    <Comments />
  </Suspense>
</Container>
```

As you can see above, using Suspense is as easy as wrapping our slow loading components in a `Suspense` component and supplying that `Suspense` component a fallback which will be rendered while the data is loading. By doing this we are able to reduce our initial page load from 500ms down to 150ms, but what happens when the data gets to the client.

Traditionally in server side rendering React would send all the HTML/data at once to the client. The client would then hook up all the HTML to React by adding event listeners and so on (this is traditionally called hydration), and then finally after all that the page would be usable. With Suspense this is a bit different, though.

The server will send all the HTML/data for components that are not wrapped in a `Suspense` component. The client will then start hydrating those components as soon as it gets the HTML so that the page is usable as soon as possible. While that is happening the data inside the `Suspense` components will be streamed down to the client in the background as soon as it is ready. The components will then begin the hydration process before finally being ready to use. React will also prioritize hydrating components that the user is actively trying to interact with which makes your app feel even quicker for users since the parts they care about the most will load the quickest.

The big takeaway with Suspense is that it will let you stream slow loading data in the background without holding up the important parts of your application which is really nice.

## Automatic Render Batching

One question a lot of new React developers ask is what happens when you have multiple `setState` calls one after another. This is a bit of a complicated question to answer since in React 17 it depended on where the state was set. Sometimes it would batch the updates together and do only one rerender, but other times it would rerender the entire component once for each `setState` call. In React 18 this has been greatly simplified since now all changes to state are batched together if they are near each other.

```jsx
const [count, setCount] = useState(0)
const [otherState, setOtherState] = useState()

function handleClick() {
  setCount(c => c + 1)
  setOtherState(o => o * 2)
}

return <button onClick={handleClick}>Click</button>
```
In the above example both state changes would be batched together in React 17 and 18 since they are inside an event handler. This is nice since our component only needs to rerender once to handle these state changes. In React 17, though, if we move the state changes so they aren't directly tied to an event handler we no longer have those state changes batched together and rerender twice instead.
```jsx
const [count, setCount] = useState(0)
const [otherState, setOtherState] = useState()

function handleClick() {
  fetch(url).then(() => {
    setCount(c => c + 1)
    setOtherState(o => o * 2)
  })
}

return <button onClick={handleClick}>Click</button>
```
Since the state changes are inside the fetch promise it is no longer a part of the click event handler so the component will rerender twice (once for each state call). This has been changed in React 18, though, so that now, no matter where the state changes are, they will always be batched. That means in React 18 both of these examples will only cause the component to rerender once.

## Handling Slow Updates

It is very common in React to do lots of complex calculations when state changes. Take for example a simple text input that filters a large list of data. This is something you see in nearly every application, but depending on the size of the data being filtered it could be very slow. If you have a list of thousands of pieces of data and you need to filter them all based on one input it could cause your app to slow down and become unresponsive which means the user cannot type anymore letters into the text input until the list has finished filtering. This is obviously not ideal, but before React 18 there was no good way to get around this.

React 18 adds in the idea of urgent updates and transition updates. An urgent update is just like the normal React update you are used to. It is an update that happens immediately and blocks the application. Something like a button click, or typing into a text input are great use cases for urgent updates.

A transition update on the other hand is an update that is not urgent and is something a user does not expect to happen instantly. A good example of this is filtering a list of items. Most state updates you do that aren't directly tied to interacting with an input are most likely transition updates. With React 17, though, everything is considered an urgent update since there are no transition updates. In React 18 all updates are by default urgent unless you specifically mark them as transition updates.

```jsx
import { startTransition } from 'react'

// Urgent: Show what was typed
setInputValue(input)

startTransition(() => {
  // Transition: Show the results
  setSearchQuery(input)
})
```
Marking an update as a transition is as easy as just wrapping it inside a `startTransition` function. This will tell React to run this code in the background. Using a transition also helps with performance beyond just running the code in the background, since if an urgent state update is made then React will stop working on transition updates to ensure the urgent update is run as quickly as possible. Also, if the urgent update causes changes that effect the transition update, such as typing into a text box that is filtering a list, then React will throw out the old transition and start a new transition update with the new data.

## Upgrading To React 18

Luckily, upgrading to React 18 is incredibly easy since React 18 is mostly just adding new features and isn't really removing or breaking anything. The only real thing to worry about is ensuring you use the new `createRoot` API.

First you need to install React 18. Currently, it is in Alpha as I am writing this article so you will need to install the alpha version of React.
```
npm install react@alpha react-dom@alpha
```
Once that is done you will need to find where you are rendering your root component. Generally this is inside index.html. Most likely what you have will look something like this.
```jsx
ReactDOM.render(<App />, document.getElementById('root'))
```
You need to change this to the following.
```jsx
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App />)
```
This new `createRoot` API is what allows React to use a lot of the new features such as Suspense so it is important you make these changes. Once you have done that, though, you are done upgrading and can start using React 18's fancy new features. It is really that easy.

## Conclusion

It seems like it has been a long time since a new feature was added to React but with React 18 they are really piling on a bunch of awesome features. I am really excited to see what the full release of React 18 looks like.