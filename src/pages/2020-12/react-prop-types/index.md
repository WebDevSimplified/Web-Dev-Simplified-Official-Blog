---
layout: "@layouts/BlogPost.astro"
title: "How To Use PropTypes In React"
date: "2020-12-21"
description: "PropTypes are perfect for adding basic type safety to your React project."
tags: ["React"]
---

If you have ever wanted to add type safety to your React projects, but bringing in TypeScript is too overkill or too much work then PropTypes is perfect for you. PropTypes is a tool in React that lets you validate the structure and type of all your props and if there are any issues they will show up as errors in the console of your browser dev tools.

_If you prefer to learn visually, check out the video version of this article._
`youtube: cx0S8JyiVxc`

## Getting Started

In order to start using PropTypes in your project you need to install the PropTypes library.

```
npm i prop-types
```

Previously PropTypes was included with React by default, but now it is in its own library which is why we must install it separately. Once you have PropTypes installed you can start using it immediately.

It doesn't matter if you are working with a class or function component, setting up PropTypes works exactly the same. You just need to define a property on the class/function called `propTypes`. This property will be an object that outlines all the props for the component.

```jsx
import PropTypes from "prop-types"

class Component {
  render() {
    return "Hi"
  }
}

Component.propTypes = {
  // Put props here
}

export default Component
```

```jsx
import PropTypes from "prop-types"

function Component(props) {
  return "Hi"
}

Component.propTypes = {
  // Put props here
}

export default Component
```

Since defining PropTypes on a component does not depend on the component implementation we will be leaving out the code for the component itself in all the following examples. The code above will be simplified to the following.

```js
Component.propTypes = {
  // Put props here
}
```

## Checking Basic Types

The most basic way you can check a prop's type is by checking to see if it is one of the primitive types in JavaScript, such as a boolean, string, object, etc. In order to do this we would use the name of the prop as the key in the `propTypes` object and the value for that key will be the specific PropType we are checking.

```js
Component.propTypes = {
  name: PropTypes.string,
  age: PropTypes.number,
  address: PropTypes.object,
  friends: PropTypes.array,
}
```

In the above code we are saying that we expect the `name` prop of the Component to be of the type `string`. We also expect the `age` prop to be a `number`, the `address` prop to be an `object`, and the `friends` prop to be an `array`.

This is the easiest way to setup PropTypes and is great for catching minor errors, such as, accidentally passing a string instead of a number.

```jsx
<Component name="Kyle" age="25" />
```

If we create a component with the following code we will get a warning in the console.

_Warning: Failed prop type: Invalid prop `age` of type `string` supplied to `Component`, expected `number`._

This is great since we can now guarantee that the `age` prop is always a number. You will also notice that there are no warnings for missing props even though we defined PropTypes for `address` and `friends`. This is because by default all props are optional. In order to make a prop required we can chain `isRequired` to the end of the PropType.

```js
Component.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  address: PropTypes.object.isRequired,
  friends: PropTypes.array,
}
```

With the above code we have marked our `name`, `age`, and `address` props as required which means now if we do not pass an `address` for example we will get the following error.

_Warning: Failed prop type: The prop `address` is marked as required in `Component`, but its value is `undefined`_

Also, here is a list of all the basic PropTypes for checking JavaScript primitives

```js
PropTypes.array
PropTypes.bool
PropTypes.func
PropTypes.number
PropTypes.object
PropTypes.string
PropTypes.symbol
```

## React Specific Prop Types

On top of being able to check primitive types, you can also check some React specific things as well.

### Checking For Renderability

If you want to simply check to see if a component can be rendered you can use the `PropTypes.node` check. This will check to see if the prop is a type that React can render. Things such as strings, numbers, elements, and arrays are common renderable types.

```js
Component.propTypes = {
  renderableProp: PropTypes.node,
}
```

### Checking For A React Component

If you want to just check to see if a prop is a React component you can use `PropTypes.element`. This is useful for ensuring that a component only ever has one child component, for example.

```js
Component.propTypes = {
  children: PropTypes.element.isRequired,
}
```

### Checking For A React Component Name

Finally, you can check to see if your prop is the name of a React component by using `PropTypes.elementType`.

```js
Component.propTypes = {
  as: PropTypes.elementType,
}
```

```jsx
<AnotherComponent as={Component} />
```

## Advanced Type Checking

PropTypes also contain a ton of different advanced type checking techniques.

### Checking For Any Type

Sometimes you just want to ensure a prop is required without specifying a specific type. This is where `PropTypes.any` comes in handy since it will never throw a warning for the type.

```js
Component.propTypes = {
  couldBeAnything: PropTypes.any.isRequired,
}
```

### Checking For Multiple Types

If you don't like the idea of using any, but also have a prop that could be multiple types you can use `PropTypes.oneOfType()` to specify which types the prop can be. This just takes an array of valid PropTypes.

```js
Component.propTypes = {
  stringOrNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
```

### Creating An Enum

If you want to ensure that a prop's value is from a specific list you can use `PropTypes.oneOf()` to define the allowed values. This is perfect for creating an enum.

```js
Component.propTypes = {
  state: PropTypes.oneOf(["LOADING", "READY", "ERROR"]),
}
```

### Checking Array Types

When you have an array where you know the type of the elements, you can use `PropTypes.arrayOf()` to specify the type of the elements. This works very similar to `PropTypes.array`, but it also type checks the elements in the array as well.

```js
Component.propTypes = {
  names: PropTypes.arrayOf(PropTypes.string),
}
```

### Checking Object Types

Just like with arrays, you can also check the types of the individual properties of an object with `PropTypes.shape()`. This is really useful when passing large objects down to a component.

```js
Component.propTypes = {
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    state: PropTypes.string,
    country: PropTypes.oneOf(["US", "India"]).isRequired,
  }),
}
```

This above code will only throw a warning if one of the specified properties of `address` does not follow its PropType. If `address` has additional properties on it, such as as zip code, that will not cause any warnings. If you did want to throw a warning, though, when the object has properties not specified in the PropTypes you could use `PropTypes.exact()` instead. It works exactly the same as `PropTypes.shape()`, but it will throw a warning if the object has properties not defined in the PropTypes.

```js
Component.propTypes = {
  address: PropTypes.exact({
    street: PropTypes.string.isRequired,
    state: PropTypes.string,
    country: PropTypes.oneOf(["US", "India"]).isRequired,
  }),
}
```

## Conclusion

PropTypes are a great way to add a first line of defense in you applications. It isn't perfect, though, as it will only catch errors at runtime, while something like TypeScript will catch these errors in the compilation step, but it is much easier to setup and work with.
