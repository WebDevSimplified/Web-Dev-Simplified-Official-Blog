---
title: "JavaScript Optional Chaining"
date: "2020-03-09"
description: "Optional chaning is a new JavaScript language feature which will revolutize how null and undefined are handled."
---

If you have worked with JavaScript for any amount of time then you have probably seen code that looks just like this.
```js
const street = person && person.address && person.address.street
```
The above code is pretty much the shortest and most elegant way to check if an object is undefined or null before accessing its properties. This is obviously not very concise or clean code, though, which is why JavaScript is finally getting an optional chaining operator.

## What Is Optional Chaining

If you have used other languages besides JavaScript you are probably already familiar with optional chaining since most languages have supported it for awhile. Essentially the idea of optional chaining is to make it easy to write code where you need to access properties or values that are nested deep inside an object or array that may or may not be null/undefined. Let's take a look at the basic syntax for optional chaining to understand exactly how it works.
```js
const name = person?.name
```
In the above code we have a variable `person` which may or may not be null/undefined. Because we do not know if `person` is defined we cannot directly access the `name` property since if `person` is undefined we would get the following error.
```
Uncaught TypeError: Cannot read property 'name' of undefined
```
By using the optional chaining operator (`?.`), though, we are able to write our code as if we are directly accessing `name`. If `person` is undefined our code will just return undefined instead of throwing an error. Essentially the code above is the same as the following code.
```js
const name = person == null ? undefined : person.name
```
The optional chaining operator is checking the `person` variable to ensure it is defined before access the `name` property and if it is not defined it will just return undefined. This means we can write the original code for getting the street as follows.
```js
const street = person?.address?.street
```
This code is much easier to read then the original code and is one of the greatest use cases for optional chaining. JavaScript does have many additional uses for optional chaining, though, which most other languages do not implement.

### Optional Chaining Functions

The first big additional use case for optional chaining is doing optional chaining with function calls. Let's first look at some code for calling a function on an object that may not be defined.
```js
const windowCount = house.getWindowCount && house.getWindowCount()
```
This code is essentially checking the `house` variable to ensure it has a property called `getWindowCount` before trying to call that function. This code is obviously pretty clunky and difficult to read which is where the optional chaining operator comes in.
```js
const windowCount = house.getWindowCount?.()
```
Now at first it may seem weird to have a period (`.`) before the function parenthesis, but that is because the optional chaining operator is a question mark followed by a period (`?.`) and not just a question mark. This new code that uses the optional chaining operator will now check if there is a function defined on the `house` variable called `getWindowCount` and if it exists it will call it. If that function does not exist on the `house` variable then it will just return undefined instead of calling the function. This ability to do optional chaining on functions is something that many other languages do not implement and is really handy, especially in JavaScript since functions are used everywhere.

### Optional Chaining Arrays

The last main way that optional chaining can be used is with arrays. If you want to access an element in an array by index, but are not sure if the array is defined then you need to use code that looks something like this.
```js
const firstElement = arr && arr[0]
```
By using the optional chaining operator this code can be simplified to the following.
```js
const firstElement = arr?.[0]
```
Again this probably looks weird with a period (`.`) before the brackets for accessing an array element, but it is just part of the syntax for the optional chaining operator. This new code will work by first checking if the `arr` variable is defined and if it is it will attempt to access the index of the array specified. If the `arr` variable is not defined then undefined will be returned instead of trying to access the index of the array.

This bracket notation optional chaining can also be used with objects as well.
```js
const name = person?.['name']
```
This is really useful if you want to dynamically access a property of an object based on a string and are not sure if the object is defined.


## Browser Support

With all great new JavaScript features the biggest thing to worry about is browser support. Unfortunately, the optional chaining operator has very little support outside of the newest browsers. At the time of writing this article the optional chaining operator only has [45% support](https://caniuse.com/#search=optional%20chaining) across browsers. Luckily, though, you can still use this operator by using tools like [babel](https://babeljs.io/docs/en/babel-plugin-proposal-optional-chaining) to transpile your JavaScript code so that older browsers can understand it.

## Conclusion

The optional chaining operator is something that most other languages have had the luxury of using for years, but is only just now being introduced into JavaScript. This means that most browsers still have not implemented this feature, but with the power of tools like babel this feature can be used right now without having to worry about browser support. I highly recommend using this operator in all your new projects that have babel since it will make writing clean JavaScript much easier.