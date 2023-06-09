---
layout: "@layouts/BlogPost.astro"
title: "Start Using JavaScript Maps Now"
date: "2020-12-07"
description: "Maps in JavaScript are more performant, easier to use, and better equipped than JavaScript objects."
tags: ["JavaScript"]
---

How many times have you seen or written code that looks like this.

```js
const CURRENCY_MAP = {
  "United States": "USD",
  India: "Rupee",
}

const currency = CURRENCY_MAP["India"]
```

or

```js
const CURRENCIES = [
  { name: "USD", country: "United States" },
  { name: "Rupee", country: "India" },
]

const currency = CURRENCIES.find(c => c.country === "India").name
```

There is nothing inherently wrong with this code, but when it comes to creating maps between two different values, objects and arrays are generally not the best option. This is where JavaScript Maps come in.

_JavaScript Sets are very similar to Maps, but as a replacement for arrays. If you are interested in learning more about Sets check out this [article](/2021-01/javascript-sets)._

_If you prefer to learn visually, check out the video version of this article._
`youtube: yJDofSGTSPQ?start=558`

## Differences Between Objects And Maps

A Map in JavaScript is a class that allows you to store a value at a specific key, just like objects, but there are a few major differences that make Maps excel when being used as a map or dictionary.

### 1. Key Types

With objects you can pretty much only use strings as your keys, but a Map can have any value as a key. This means you can use an object, string, boolean, function, etc. as a key within a Map.

```js
const obj = {
  a: "b",
  1: 2,
}

console.log(Object.keys(obj))
// ["a", "1"]
```

```js
const map = new Map([
  ["a", "b"],
  [1, 2],
  [{ key: "value" }, "obj"],
])

console.log(map.keys())
// ["a", 1, { key: "value" }]
```

_In order to create a map you need to pass it an array of arrays instead of an object. Also, the console.log for the map technically won't print out this exact result since it returns an iterator instead of an array, but you can convert it to an array to get this result `[...map.keys()]`._

### 2. Ordering

The order of the keys in an object is not reliable. It was not standardized until ES6 and the various ways to iterate over an object order the keys differently. Because of this you cannot accurately rely on key ordering in objects. Maps on the other hand have all their keys ordered based on when they were added to the Map similar to an array. This is can be useful when looping over Maps.

### 3. Iterating

Speaking of iterating, Maps are way easier to work with than objects. Objects do not have any built in iteration so in order to loop over the key/value pairs of an object you must use the following code `Object.entries(obj)`. Maps on the other hand are iterable which means you can directly use methods like `forEach` on the map.

### 4. Length

Getting the length of an object is not easy. You need to manually calculate this value which is a pain. Maps on the other hand have a simple `size` property similar to arrays which tells you exactly how many key/value pairs are in the map.

### 5. Performance

Since Maps are designed specifically with the functionality of being a dictionary/lookup table they are optimized for frequent addition/removal of key/value pairs. Objects are the other hand are not optimized for frequent additions/removals of key/value pairs so a Map will be more performant if you are adding/removing a lot of key/value pairs.

## How To Use Maps

So now that you understand the differences between Maps and objects, I want to talk about how you would go about using a Map.

### Creating A Map

You have already seen this in the previous example, but a Map is just a class which can be instantiated. If you don't pass it any parameters then it will be an empty Map which is similar to an empty object. If you want to populate the Map with default values you will need to pass it any iterable value such as an array of arrays where the first value of the inner array is the key and the second value is the value for the key/value pair.

```js
const emptyMap = new Map()
const map = new Map([["key", "value"]])
```

### Setting Values

Once you have a Map you will most likely need a way to add values to that Map. This is a simple as using the `set` method and passing it the key/value you want to use.

```js
const map = new Map()

map.set("key", "value")
map.set(true, "boolean")
// "key" => "value"
// true => "boolean"
```

### Getting Values

Getting values is just as easy as setting them. Just call the `get` method and pass it the key you want to get. It will return the value for that key or undefined if the key cannot be found.

```js
const map = new Map()
map.set("key", "value")
map.set(true, "boolean")

map.get("key")
// "value"
map.get(true)
// "boolean"
map.get("wrong-key")
// undefined
```

### Checking For Values

Sometimes you just want to see if a Map already has a specific value stored. You can do this with the `has` method by passing it the key you want to check for.

```js
const map = new Map()
map.set(1, "number")

map.has(1)
// true
map.has("1")
// false
map.has("wrong-key")
// false
```

_You may notice that checking for the string `"1"` returns false. This is because Maps can store any type so the number 1 is stored as a number not a string._

### Removing Values

The final CRUD operation you may want to perform is removal and that again is incredibly easy. Just call `delete` and pass the key you want to remove.

```js
const map = new Map()
map.set(1, "number")
map.set("a", "b")

map.delete(1)
map.has(1)
// false
```

### Iterating Over A Map

There are many ways to iterate over a Map but the most common is the `forEach` method. This method works just like the array `forEach` method, but the callback has two parameters, one for the value and one for the key.

```js
const map = new Map()
map.set(1, "number")
map.set("a", "b")

map.forEach((value, key) => {
  console.log(`${key} => ${value}`)
})
// 1 => number
// a => b
```

_It is important to remember that the first parameter in the callback function is the value not the key._

### Other Useful Methods And Properties

- You can get the size of a Map with the `size` property.
- You can get an iterator for the keys of a Map with the `keys()` method.
- You can get an iterator for the values of a Map with the `values()` method.
- You can get an array of arrays containing key/value pairs with the `entries()` method.
- You can remove all key/value pairs from a Map with the `clear()` method.

## Conclusion

Maps are a great tool that you can use in place of objects when you need to do dictionary/lookup related tasks.
