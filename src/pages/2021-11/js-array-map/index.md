---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "How To Use The Most Used Array Method - Map"
date: "2021-11-29"
description: "Map is by far the most used array method and in this article I will explain exactly what it does and why it is so useful."
tags: ['JavaScript']
---

ES6 introduced a ton of new features into JavaScript and with those features came many new array methods that made working with arrays so much easier. One of the most useful and commonly used of those array methods is the `map` method. Luckily, it is also probably the easiest of the array methods to understand. In this article I will explain exactly what this method does and how you can use it.

## What Is `map`?

The `map` method is an array method that allows you to iterate through all the elements in an array and create a brand new array of values from the original array. Say for example you have an array of people objects that all have a name and age property. You could use the `map` array method to convert that array of people into an array of names.

The below examples shows you how to do this with and without `map`.
```js
const people = [{ name: "Kyle", age: 26 }, { name: "Jill", age: 35 }]
const peopleNames = []
for (let i = 0; i < people.length; i++) {
  peopleNames[i] = people[i].name
}
console.log(peopleNames)
// ["Kyle", "Jill"]
```
```js
const people = [{ name: "Kyle", age: 26 }, { name: "Jill", age: 35 }]
const peopleNames = people.map(person => person.name)
console.log(peopleNames)
// ["Kyle", "Jill"]
```
As you can see the code for `map` is much simpler. Another important thing to note is that the `map` method does **NOT** modify the array you call `map` on. Instead it creates a brand new array which is returned from `map`. In the above examples the `people` array is never actually changed and still contains the people objects with their name and age.

## How Does `map` Work?

`map` is a method you can call on any array and it takes one parameter which is a function. This function is called once for each item in the array. If you are familiar with the `forEach` array method `map` works very similarly in that it calls the method passed to `map` once for each array element. This function at a minimum must take a single argument which is the current element within the array.

In our above example we passed the function `person => person.name` to `map`. This function takes one parameter which is the current person within the array. To help us understand this function a bit better we can look at what happens at each step of `map`.

When we first call `map` we pass it our function and the `map` method will take the first element of our `people` array and pass it to the function we pass to `map`. In our case that means that the first element in our `people` array will be set to `person`. This function will then run and return a value which in our case is the person's name. That value will be stored as the first element in a new array. Then this entire process repeats with the next element in our array all the way until we have no more elements. Finally, once `map` is done looping through our array it will return a brand new array of elements that are equal to the return values of the function we pass to `map`.

Let's take a look at another example.
```js
const numbers = [1, 2, 3, 4]
const doubledNumbers = numbers.map(number => number * 2)
console.log(doubledNumbers)
// [2, 4, 6, 8]
```
In this example we are looping through our `numbers` array and returning each number multiplied by 2 to form the new array of `doubledNumbers`.

This is just the most basic form of `map`, though. The function we pass to `map` can also take two additional parameters.

The first new parameter is the index of the array element we are currently on.
```js
const numbers = [1, 2, 3, 4]
const doubledNumbers = numbers.map((number, index) => {
  console.log(index)
  return number * 2
})
// 0
// 1
// 2
// 3
console.log(doubledNumbers)
// [2, 4, 6, 8]
```
As you can see we are using the second parameter of the function which is our index and it is printing out the index of the current element we are on (0 to 3 in our case). This is useful if you need to do something based on the index of the element in the `map`.

The last parameter you can use is the actual array itself and is pretty useless.
```js
const numbers = [1, 2, 3, 4]
const doubledNumbers = numbers.map((number, index, array) => {
  console.log(array)
  return number * 2
})
// [1, 2, 3, 4]
// [1, 2, 3, 4]
// [1, 2, 3, 4]
// [1, 2, 3, 4]
console.log(doubledNumbers)
// [2, 4, 6, 8]
```
As you can see we are using the third parameter which is just equal to the array we called `map` on. This parameter is largely useless and is something I have actually never had a use for in my programming career, so I wouldn't really worry too much about it, but it is nice to know you can use it in the few scenarios where it would make sense.

## `map` Gotchas

Now this is all the basics of `map`, but there is one major thing you need to know about `map`, and that is you should never modify the array you are mapping over inside `map`. Take for example this code.
```js
const numbers = [1, 2, 3, 4]
numbers.map((number, index) => {
  numbers[index] = number * 2
})
```
Here we are pretty much doing the same thing as our previous `map` since we are doubling each number in our `numbers` array, but the way we are doing it is much different. In the previous examples we never actually modified our `numbers` array which is perfect since `map` is a function that returns a new array instead of modifying the existing array. In this example, though, we are directly modifying `numbers` and completely ignoring the return value of `map` which is bad. If you want to do something like this you should use a standard for loop or the `forEach` method instead.

## Conclusion

The `map` method is an amazing method that makes working with arrays much easier and is one of the most used array methods. Another amazing array method is the `reduce` method. I actually have an entire [article on the reduce method](/2021-05/reduce) that I recommend you check out next.