---
title: "How To Use Destructuring And The Spread Operator? (One Of The Best JS Features)"
date: "2020-08-24"
description: "An in depth analysis of how to use destructuring and the spread operator with objects and arrays."
tags: ['JavaScript']
---

JavaScript is constantly evolving with new features being added every year. The biggest set of these changes was when JavaScript ES6 was released. ES6 changed JavaScript completely, and made it a much more modern language with tons of nice features. One of these amazing features, which I use every day, is destructuring and the spread operator. In this article I will show you exactly what both of these are, how you can use them with arrays and objects, and most importantly when to use these features.

*If you prefer to learn visually, check out the video version of this article [here](https://youtu.be/NIq3qLaHCIs).*

## What Is Destructuring?

In simple terms destructuring is a fancy way in JavaScript to break apart arrays and objects. It generally allows you to get individual pieces of arrays and objects in less code and opens up a multitude of possibilities. This doesn't really sound like much more than syntactical sugar, but this small change actually makes doing many tasks significantly easier. Destructuring in arrays and objects is very similar, but it is slightly easier to understand with arrays so I will start by explaining how to destructure arrays.

## Destructuring An Array

Imagine you want to get the first element out of an array. Normally you would do this by accessing the element at index 0.
```js
const array = ['A', 'B', 'C', 'D', 'E']
const first = array[0]

console.log(first)
// A
```
This is pretty straightforward, but what if you now want the first two elements? You will need to write another line of code to get that element.
```js
const array = ['A', 'B', 'C', 'D', 'E']
const first = array[0]
const second = array[1]

console.log(first)
// A
console.log(second)
// B
```
Again this is not really a big deal, but this can be slightly simplified with destructuring. Instead of getting each element we want individually we will get all elements at once.
```js
const array = ['A', 'B', 'C', 'D', 'E']
const [first, second] = array

console.log(first)
// A
console.log(second)
// B
```
This syntax probably looks really confusing, but it is actually quite a bit simpler than it looks. Essentially to denote we are doing array destructuring and trying to get elements from an array, we need to wrap our variables inside brackets. This is what we do when we wrap `first` and `second` in brackets. Then we just set that group of bracketed variables (`[first, second]`) equal to the array we want to get the elements from.

This tells JavaScript to take the array on the right side of the equals sign and assign the first element to the first variable in the brackets on the left side of the equals sign. It does the same thing with the second element in the array and assigns it to the second variable in the brackets. This would then continue on until there were no more elements left in the brackets. If we wanted to get the first three elements of the array it is as simple as adding a new variable to the brackets.

```js
const array = ['A', 'B', 'C', 'D', 'E']
const [first, second, third] = array

console.log(first)
// A
console.log(second)
// B
console.log(third)
// C
```
Also, if you want to skip an element, for example if you only want elements one and three, you would just leave out the name for the second variable, but keep the comma. This comma tells JS to just skip the second element.
```js
const array = ['A', 'B', 'C', 'D', 'E']
const [first,, third] = array

console.log(first)
// A
console.log(third)
// C
```
Now this on its own is really not that useful since you don't often need to access an array like this, but what if you want all elements in an array except the first two? This is where the spread operator comes in.

### Spread Operator With Arrays

The spread operator is a tool that lets you spread out all the elements of an array or object. This can be used to create new objects or arrays that are clones, but for our specific use case we can combine this with destructuring to get all other elements not specifically destructured already.
```js
const array = ['A', 'B', 'C', 'D', 'E']
const [first, second, ...rest] = array

console.log(first)
// A
console.log(second)
// B
console.log(rest)
// ['C', 'D', 'E']
```
This is incredibly useful for getting a new array with only some of the elements removed.

We can also use the spread operator to combine multiple arrays together.
```js
const array1 = [1, 2, 3]
const array2 = [4, 5, 6]
const newArray = [...array1, ...array2]

console.log(newArray)
// [1, 2, 3, 4, 5, 6]
```
Here we are not doing any destructuring and instead are just taking the two arrays and spreading every single value from them into a new array. Since we spread `array1` first it will be all the elements at the beginning of the array. We can even combine this with adding individual elements in as well.
```js
const array1 = [1, 2, 3]
const array2 = [4, 5, 6]
const newArray = [0, ...array1, 3.5, ...array2, 7]

console.log(newArray)
// [0, 1, 2, 3, 3.5, 4, 5, 6, 7]
```

### When To Use Destructuring/Spread Operator With Arrays

It may seem like these cases above are contrived and this would never be a useful feature, so here are three ways I use this feature every day.

#### Copying An Array

If I need to ever create a clone of an array then I can easily spread the array into a new array and now I will have two separate arrays that I can modify without modifying independently.
```js
const array = [1, 2, 3]
const arrayClone = [...array]
arrayClone.push(4)

console.log(array)
// [1, 2, 3]
console.log(arrayClone)
// [1, 2, 3, 4]
```

#### Converting An Array-Like Object To An Array

Many times when dealing with JavaScript you get an array-like structure, such as when using `document.querySelector`, and you cannot use array methods like `map` on it. To fix this you can just spread the array-like structure into a new array and use all the array methods you want.
```js
const elements = document.querySelector('div')
const array = [...elements]

array.map(a => /* This works */)
elements.map(e => /* This throws an error */)
```

#### Destructuring Function Returns

If you have ever worked with React you are very familiar with this one. Destructuring arrays can be used when you want to return multiple values from a function as an array and easily access them.
```js
function sumAndMultiply(a, b) {
  return [a + b, a * b]
}

const [sum, product] = sumAndMultiply(2, 3)

console.log(sum)
// 5
console.log(product)
// 6
```

## Destructuring Objects

Now that is a lot of talk about arrays so let's now talk about destructuring objects which is the most useful form of destructuring.

Similar to arrays, destructuring an object for specific properties is as easy as wrapping the variables inside of curly brackets to denote we are doing object destructuring. You then just put the object you want to get the values from on the right side of the equals sign.
```js
const person = { name: 'Kyle', age: 25 }
const { name, age } = person

console.log(name)
// Kyle
console.log(age)
// 25
```
As long as you use the same variable name in your destructured variables as is in the object it will work perfectly. Luckily, you can also easily rename variables as well. If you wanted the name variable to be called `firstName` instead you can do the following.
```js
const person = { name: 'Kyle', age: 25 }
const { name: firstName, age } = person

console.log(firstName)
// Kyle
console.log(age)
// 25
```
This is essentially saying that you are mapping the property `name` from the object `person` to a new variable called `firstName`.

### Spread Operator With Objects

Just like with arrays you can spread out the rest of an object while destructuring.
```js
const person = { name: 'Kyle', age: 25, favoriteFood: 'Rice' }
const { name, ...rest } = person

console.log(name)
// Kyle
console.log(rest)
// { age: 25, favoriteFood: 'Rice' }
```
As you can see all of the properties that are not destructured are added to a new object. This is really useful for cloning an object without certain properties.

Also, like arrays you can combine together two objects with the spread operator to create a new object. This will also overwrite any values that are in both objects by the one that is defined last.
```js
const person1 = { name: 'Kyle', age: 25 }
const person2 = { age: 32, favoriteFood: 'Rice' }
const newPerson = { ...person1, ...person2 }

console.log(newPerson)
// { name: 'Kyle', age: 32, favoriteFood: 'Rice' }
```

### Nested Object Destructuring

It is pretty common to have an objected nested inside another object and want to get a specific value from it. With destructuring this is incredibly easy.
```js
const person = {
  name: 'Kyle',
  age: 25,
  address: {
    city: 'Somewhere',
    state: 'One Of Them'
  }
}
const { name, address: { city } } = person

console.log(name)
// Kyle
console.log(city)
// Somewhere
```
The way this works is by saying we are mapping the `address` property to a specific variable, but instead of actually creating a variable to map that element to we are destructuring that element into the variable city. We are essentially combining the below two lines together.
```js
const { name, address: addressVariable } = person
const { city } = addressVariable
```
We can even nest array destructuring together, but that is not something you will often need to do.

### Default Values

It is pretty common to destructure an object without knowing if a property exists or not. Many times when this is the case there is a default value you want to apply in case that value does not exist.
```js
const person = { name: 'Kyle', age: 25 }
const { name = 'Sally', favoriteFood = 'Banana' } = person

console.log(name)
// Kyle
console.log(favoriteFood)
// Banana
```
As you can see since the `favoriteFood` property does not exist in the `person` object it falls back to the default value. The `name` property does exist, though, so instead of using the default it pulls the actual value from the person object.

### When To Use Destructuring/Spread Operator With Objects

Again it may seem like these cases above are contrived and this would never be a useful feature, but in reality I use this feature every day.

#### Copying An Object

Just like arrays it is very easy to copy an object and create an exact clone with destructuring.
```js
const person = { name: 'Kyle', age: 25 }
const personClone = { ...person }
personClone.name = 'Sally'

console.log(person)
// { name: 'Kyle', age: 25 }
console.log(personClone)
// { name: 'Sally', age: 25 }
```

#### Destructuring Function Returns

Again just like arrays I use this all the time to return multiple values from a function.
```js
function sumAndMultiply(a, b) {
  return { sum: a + b, product: a * b }
}

const { sum, product } = sumAndMultiply(2, 3)

console.log(sum)
// 5
console.log(product)
// 6
```

#### Destructuring Function Parameters

In JavaScript it is very common to pass an object to a function so having the ability to destructure the object in the function definition and define defaults is incredibly useful.
```js
function printPerson({ name, age, favoriteFood = 'None' }) {
  console.log(`Name: ${name}. Age: ${age}. Food: ${favoriteFood}.`)
}

const person = { name: 'Kyle', age: 25 }

printPerson(person)
// Name: Kyle. Age: 25. Food: None.
```

## Conclusion

We covered a ton in this article. It ended up being much longer than I anticipated, but that is because destructuring and the spread operator are useful in so many situations. Next time you are programming make sure to think about how you could use this operator to improve the quality and maintainability of your code.