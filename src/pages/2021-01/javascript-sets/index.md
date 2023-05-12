---
layout: "@layouts/BlogPost.astro"
title: "Start Using JavaScript Sets Now"
date: "2021-01-04"
description: "Sets in JavaScript are a specialized type of array that is perfect for unique lists."
tags: ["JavaScript"]
---

How many times have you seen or written code that looks like this.

```js
const uniqueList = [1, 2, 3, 4, 5]
const newNumber = 4

if (!uniqueList.includes(newNumber)) {
  uniqueList.add(newNumber)
}
```

There is nothing inherently wrong with this code, but when it comes to creating lists of unique items, arrays are generally not the best option. This is where JavaScript Sets come in.

A Set in JavaScript is a class that allows you store an array of values just like a normal array, but it enforces uniqueness of those items. This means if the `uniqueList` was a Set and we tried to add a number that was already in the set it would just not add the number. This is super useful for maintaining unique lists, but it is also really useful for other tasks that I will talk more about at the end of this article.

_JavaScript Maps are very similar to Sets, but as a replacement for objects. If you are interested in learning more about Maps check out this [article](/2020-12/javascript-maps)._

_If you prefer to learn visually, check out the video version of this article._
`youtube: yJDofSGTSPQ?start=752`

## How To Use Sets

Sets and arrays are very similar, but nearly all the methods between the two have slightly different names and implementations.

### Creating A Set

A Set is just a class which can be instantiated. If you don't pass it any parameters then it will be an empty Set which is similar to an empty array. If you want to populate the Set with a list of values you will need to pass it any iterable value such as an array.

```js
const emptySet = new Set()
const itemSet = new Set([1, 2, 3, 4])
```

### Adding Items

Once you have a Set you will most likely need a way to add items to that Set. This is a simple as using the `add` method and passing the item to add. This works just like `push` does for arrays and adds the item to the end of the list, but the `add` method actually returns the Set object so you can chain it together with other `add` method calls.

```js
const itemSet = new Set()

itemSet.add(1)
itemSet.add(2)
itemSet.add(3).add(4) // Chaining
// [1, 2, 3, 4]
```

### Getting Values

Getting items is by far the biggest difference between arrays and Sets. In an array you can access elements by index, but with a Set you cannot access individual elements by index. Doing this on a set will just always return `undefined`.

```js
const array = [1, 2]
const itemSet = new Set(array)

console.log(array[0])
// 1

console.log(itemSet[0])
// undefined
```

Instead of directly accessing elements in a Set you will need to instead check to see if an element exists or loop over all elements. This is no big deal, though, as accessing elements by index is pretty much never needed in a Set.

### Checking For Values

Sometimes you just want to see if a Set already has a specific value stored. You can do this with the `has` method by passing it the item you want to check for.

```js
const itemSet = new Set([1, 2, 3, 4])

itemSet.has(1)
// true
itemSet.has(5)
// false
```

### Removing Values

The final CRUD operation you may want to perform is removal and that again is incredibly easy. Just call `delete` and pass the item you want to remove.

```js
const itemSet = new Set([1, 2, 3, 4])

itemSet.delete(1)
itemSet.has(1)
// false
```

### Iterating Over A Set

There are many ways to iterate over a Set but the most common is the `forEach` method. This method works just like the array `forEach` method.

```js
const itemSet = new Set([1, 2, 3, 4])

itemSet.forEach(item => {
  console.log(item)
})
// 1
// 2
// 3
// 4
```

### Other Useful Methods And Properties

- You can get the size of a Set with the `size` property.
- You can remove all key/value pairs from a Set with the `clear()` method.

## Set Use Cases

It is pretty obvious that Sets are useful for unique lists of items, but they actually have many other creative use cases as well.

### Removing Duplicates

If you have an array with possible duplicate values you can convert it to a Set and then back to an array to remove all the duplicates since a Set will remove any duplicates when created.

```js
const arrayWithDups = [1, 1, 2, 3, 3]
const itemSet = new Set(arrayWithDups)
const array = [...itemSet] // Convert Set to array
console.log(array)
// [1, 2, 3]
```

### Ensuring A List Is Unique

You could take the above example a step further to see if an array is actually unique or not as well.

```js
const arrayWithDups = [1, 1, 2, 3, 3]
const itemSet = new Set(arrayWithDups)
const isUnique = itemSet.size === arrayWithDups.length
console.log(isUnique)
// false
```

### Anytime You Need To Delete Elements From A List

Deleting elements in an array is not always easy since there is no good built in delete method for arrays. Sets on the other hand have an easy to use delete method which makes Sets ideal for scenarios where you need a list that will have items removed from it.

## Conclusion

Sets are a great tool that you can use in place of arrays when you need to do tasks that require unique lists.
