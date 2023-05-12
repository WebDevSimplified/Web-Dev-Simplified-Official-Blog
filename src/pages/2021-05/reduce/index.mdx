---
layout: "@layouts/BlogPost.astro"
title: "JavaScript Array Reduce Simplified"
date: "2021-05-10"
description: "How the array reduce function works in JavaScript and how you can use it in your projects."
tags: ["JavaScript"]
---

The reduce array method is definitely the most confusing of all the JavaScript array methods, but by the time you are done reading this article you will be an expert on the reduce method.

_If you prefer to learn visually, check out the video version of this article._
`youtube: s1XVfm5mIuU`

## What Does `reduce` Do?

The reduce method is actually named pretty well since all it does is take an array of elements and reduce that array down to one single value. This value could be anything such as a number, object, or string.

## How To Use `reduce`

The reduce method in its simplest form takes two parameters. The first parameter is a function, generally called the reducer, that will be called on each value in the array and the second parameter is the starting value that will be used in your reducer function. The reducer function takes two parameters. The first parameter is the accumulator which is the thing you are reducing your array down to, and the second parameter is the current element in the array.

This is pretty hard to explain in just english so lets look at a code example where we try to get the total price of a list of items.

```js
const items = [
  { name: "Rice", price: 5 },
  { name: "Book", price: 20 },
  { name: "Chicken", price: 10 },
  { name: "Monitor", price: 100 },
]

const totalPrice = items.reduce((total, item) => {
  return total + item.price
}, 0)
console.log(totalPrice) // 135

// This can also be written as follows
const reducer = function (total, item) {
  return total + item.price
}
const totalPrice = items.reduce(reducer, 0)
console.log(totalPrice) // 135
```

As you can see our reducer function has a `total` variable which is the accumulator and an `item` variable which is the current value of our array. Then inside that function we are just adding the current total to the item price and returning that.

This return value from the reducer function is then used as the value of `total` in the next iteration of the reducer function. For the first iteration, though, the initial value, which we set to 0, is used as the value for `total`. After the final iteration of the reducer, the value of `total` is returned from the reduce function and set to `totalPrice`.

Here is a quick diagram of what is happening in each iteration of the loop.

| Iteration | `total` | `item.price` | return  |
| --------- | ------- | ------------ | ------- |
| **1**     | 0       | 5            | **5**   |
| **2**     | 5       | 20           | **25**  |
| **3**     | 25      | 10           | **35**  |
| **4**     | 35      | 100          | **135** |

As you can see the `total` starts at our initial value and then is always just the return from the previous iteration.

This is the simplest use case for reduce, but you can get quite a bit more complex with reduce. One of the most common use cases for reduce is to create a group by function that groups all objects in an array that have the same value for a specific key.

```js
const people = [
  { name: "Kyle", age: 26 },
  { name: "John", age: 31 },
  { name: "Sally", age: 42 },
  { name: "Jill", age: 42 },
]

const peopleGroupedByAge = people.reduce((groupedPeople, person) => {
  const age = person.age
  if (groupedPeople[age] == null) groupedPeople[age] = []
  groupedPeople[age].push(person)
  return groupedPeople
}, {})
console.log(peopleGroupedByAge)
/*
  {
    26: [{ name: 'Kyle', age: 26 }],
    31: [{ name: 'John', age: 31 }],
    42: [
      { name: 'Sally', age: 42 },
      { name: 'Jill', age: 42 }
    ]
  }
*/
```

The above reduce function is taking an array of people and reducing them to a single object that has keys for all the age values and an array of people that have that matching age as the value for each key.

## Other Reduce Features

What we have covered so far will cover 95% of all your reduce use cases but there are a few extra things about reduce you should know.

The first of these is that the reducer function actually can have up to four parameters. These are as follows.

1. The accumulator
2. The current value
3. The index of the current iteration
4. The array that reduce is called on

Here is an example of the output from a simple array.

```js
const numbers = [13, 2, 5]

const sum = numbers.reduce((total, number, index, array) => {
  return total + number
}, 0)
console.log(sum) // 20
```

| Iteration | `total` | `number` | `index` | `array`    | return |
| --------- | ------- | -------- | ------- | ---------- | ------ |
| **1**     | 0       | 13       | 0       | [13, 2, 5] | **13** |
| **2**     | 13      | 2        | 1       | [13, 2, 5] | **15** |
| **3**     | 20      | 5        | 2       | [13, 2, 5] | **20** |

Another thing that is interesting about reduce is that the initial value is actually optional. If you do not pass the initial value then the first value for total will be the first value from the array.

```js
const numbers = [13, 2, 5]

const sum = numbers.reduce((total, number, index, array) => {
  return total + number
})
console.log(sum) // 20
```

| Iteration | `total` | `number` | `index` | `array`    | return |
| --------- | ------- | -------- | ------- | ---------- | ------ |
| **1**     | 13      | 2        | 1       | [13, 2, 5] | **15** |
| **2**     | 20      | 5        | 2       | [13, 2, 5] | **20** |

Notice how the first iteration has a `total` of 13 and the `number` is 2. We defaulted the `total` to the first value from the array and never actually ran the reducer function for the first array value. This is honestly a bit confusing in my opinion and something that is almost never usable so I recommend always setting an initial value.

Another reason to always set an initial value is because if you do not set an initial value and then you try calling reduce on an empty array it will throw an error.

```js
const reducer = (total, number) => total + number
[].reduce(reducer) // Throws an error
```

## Conclusion

The reduce function is an incredibly versatile function that can take complex loop based code and convert it into a much simpler form. Once you understand how it works, the applications of reduce are limitless.
