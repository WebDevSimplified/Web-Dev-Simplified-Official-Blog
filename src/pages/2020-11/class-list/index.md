---
layout: "@layouts/BlogPost.astro"
title: "Literally Everything You Need To Know About classList"
date: "2020-11-30"
description: "JavaScript classList seems straightforward, but there are actually multiple unique methods you probably don't know."
tags: ["JavaScript"]
---

If you have written any JavaScript then you have almost certainly used `classList` at least once. You may even think that `classList` is as simple as an `add` and `remove` method, but there is so much more to `classList`. In this article I want to show you everything that is possible with `classList` since it will make working with classes in JavaScript much easier.

## The Basics

I of course need to mention the most basic usage of adding and removing classes. When you access the `classList` of an element you can use the `add` method to add a class and the `remove` method to remove a class. This is pretty straight forward, but most people don't know that you can pass as many classes as you want to these methods and they will add/remove them all. _You can also access the string of all classes by using the `value` property_

```js
element.classList.add("new-class", "another-class")
console.log(element.classList.value)
// new-class another-class

element.classList.remove("another-class")
console.log(element.classList.value)
// new-class
```

## Contains

Sometimes you need to check to see if an element has a specific class in JavaScript in order to perform a certain operation. This is luckily very easy to do with `classList`. You can just call the `contains` method and pass the name of the class you want to check. This method will return true if the element has that class and false if it doesn't.

```js
console.log(element.classList.contains("new-class"))
// false

element.classList.add("new-class")
console.log(element.classList.contains("new-class"))
// true
```

## Toggle

My favorite method of `classList` is the `toggle` method. This method lets you toggle a class on/off depending on if the class is already on the element.

```js
element.classList.toggle("new-class")
```

The above is the same as the below.

```js
if (element.classList.contains("new-class")) {
  element.classList.remove("new-class")
} else {
  element.classList.add("new-class")
}
```

This is not the only use of `toggle`, though. Sometimes you need to toggle a class based on a boolean value. For example if the boolean `win` is true then you want to add the `win` class to an element otherwise if `win` is false you want to remove the `win` class. Doing so is as simple as the below.

```js
element.classList.toggle("win", win)
```

The above is the same as the below.

```js
if (win) {
  element.classList.add("win")
} else {
  element.classList.remove("win")
}
```

## ForEach

Sometimes you just want to loop through all the classes of an element to do some advanced checks. This is easy to do with the `forEach` method. The `forEach` method also works just like the array `forEach` method.

```js
element.classList.add("one", "two")
element.classList.forEach(className => {
  console.log(className)
})
// one
// two
```

## Replace

This method is a bit of an odd one, but can be useful in certain scenarios. The `replace` method takes two class names and will replace the first class name with the second class name only if the first class name is already on the element. This method will also return true if the replace was successful or false if the element does not contain the class to be replaced. Here is an example to showcase how this works.

```js
element.classList.replace("one", "two")
```

This is the same as the following.

```js
if (element.classList.contains("one")) {
  element.classList.remove("one")
  element.classList.add("two")
}
```

This method doesn't have too many uses, but if you need to progress from one class to another, for example in a counter or multi-part form, then this would be the perfect use case.

## Conclusion

That is everything you need to know about `classList`. Not all these methods will be used in every project you write, but knowing they exist will help you write cleaner and more maintainable code.
