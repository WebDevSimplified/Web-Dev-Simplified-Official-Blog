---
title: "Tagged Template Literals"
date: "2020-03-02"
description: "Exploring the power of tagged template literals."
tags: ['JavaScript']
---

In ES6 JavaScript added template literals which made working with strings so much easier. Writing multiline strings or strings with variables was something that used to be a massive pain, but template literals made those pains a thing of the past. Template literals aren't only good for building out simple strings with variables, though. Tagged template literals can be used to make strings that run through custom functions in order to do some really cool and unique things. Before we talk about tagged template literals, though, we first need to understand how template literals work.

## What Are Template Literals?

Template literals are a new way of defining strings by using backticks `` ` `` instead of single or double quotes.
```js
const string = `This is a template literal`
```

Template literals also give you some extra powers when creating strings, such as the ability to put variables directly in the string without concatenation.
```js
const name = 'Kyle'
console.log(`Hello ${name}`)
// Hello Kyle
```
In order to add a variable inside a template literal the variable must be wrapped inside curly braces that start with a dollar sign `${}`. Everything in these curly braces will be executed as JavaScript code and the output will be put in the string at the location of the `${}`.
```js
const a = 2
const b = 3
console.log(`${a} + ${b} = ${a + b}`)
// 2 + 3 = 5
```
Template literals also give you the ability to define a string on multiple lines and keep all of the whitespace when printed.
```js
console.log(`This is
a multiline
string.`)
/*
This is
a multiline
string
*/
```
One thing to watch out for with this approach, though, is that even the extra whitespace used at the beginning of lines is included in the output. This can lead to some confusing bugs with the output if you are not careful.
```js
console.log(`This is
             a multiline
             string with extra space.`)
/*
This is
             a multiline
             string
*/
```
Lastly, template literals are useful when you want to use certain escape sequences such as new lines or tabs.
```js
console.log(`First line\nSecond line\t\t\tafter tabs`)
/*
First line
Second line     after tabs
*/
```
These features alone are enough to make template literals amazing, but on top of all this we also have tagged template literals which allow us to do some really neat things with template literals.

## What Are Tagged Template Literals?

Tagged template literals are simply the ability to run a function on the content of a template literal. An example of an already existing tagged template literal is the `String.raw` function. This tagged template literal will make it so that all escape sequences such as new lines are not computed and instead just printed as plain text.
```js
console.log(String.raw`This is all\non one line.`)
// This is all\non one line.
```
Immediately, looking at this code looks weird. There are no parenthesis around the argument to `String.raw`, but that is how tagged template literals work. A tagged template literal is called by putting the name of the function and then immediately following it with a template literal string. Let's take a look at how we would do this with our own function.
```js
function custom() {
  return `Custom String`
}

console.log(custom`Template Literal String`)
// Custom String
```
As you can see a tagged template literal function is just a plain JavaScript function and whatever that function returns is what the tagged template literal will return. Our example is pretty useless since we are always returning the same string no matter what template literal is being used. In order to use the string passed to a tagged template literal we need to understand what arguments are passed to our tagged template literal function.

The first parameter to the function is an array of all the strings in the template literal separated by the `${}` expressions.
```js
function custom(strings) {
  console.log(strings)
  // ["My name is", "and I love", ""]
}

const name = 'Kyle'
const hobby = 'weight lifting'
custom`My name is ${name} and I love ${hobby}`
```
As you can see our strings array corresponds with the text before/after our variables and it even includes the blank string after the `hobby` variable.

The rest of the parameters to the function correspond with each of the `${}` expressions in the order they appear in the template. This means if there are four `${}` expressions in the string then there will be four extra variables passed to the function, one for each variable.
```js
function custom(strings, name, hobby) {
  console.log(name)
  // Kyle
  console.log(hobby)
  // weight lifting
}

const name = 'Kyle'
const hobby = 'weight lifting'
custom`My name is ${name} and I love ${hobby}`
```
Many times you will not know how many `${}` expressions a string will have, so you can use the rest operator to group all the `${}` expressions into one array. *If you are unfamiliar with the rest operator I have a video on the topic you can find [here](https://youtu.be/NIq3qLaHCIs).*
```js
function custom(strings, ...values) {
  console.log(values)
  // ["Kyle", "weight lifting"]
}

const name = 'Kyle'
const hobby = 'weight lifting'
custom`My name is ${name} and I love ${hobby}`
```

With this syntax we now have all the information we need to reconstruct the string passed into the tagged template literal.
```js
function custom(strings, ...values) {
  return values.reduce((finalString, value, index) => {
    return `${finalString}${value}${strings[index + 1]}`
  }, strings[0])
}

const name = 'Kyle'
const hobby = 'weight lifting'
console.log(custom`My name is ${name} and I love ${hobby}`)
// My name is Kyle and I love weight lifting
```
Now with all of this work we have effectively created a tagged template literal that returns the exact string we pass to it. This may seem like a lot of work to do essentially nothing, but we can do a ton of interesting things with these functions.

### Bolding All Values With Tagged Template Literals

One thing we could do is bold all values from `${}` expressions since we have access to each value inside the `values` array.
```js
function bold(strings, ...values) {
  return values.reduce((finalString, value, index) => {
    return `${finalString}<b>${value}</b>${strings[index + 1]}`
  }, strings[0])
}

const name = 'Kyle'
const hobby = 'weight lifting'
console.log(bold`My name is ${name} and I love ${hobby}`)
// My name is <b>Kyle</b> and I love <b>weight lifting</b>
```

### Removing Newlines From Multiline Strings

One thing that can be a bit annoying about template literals is that if you want to span multiple lines all of the new lines and tabs will be visible in the outputted string. We can create a simple tagged template literal that will remove all of these new line and tabs to create a single lined string which we can define across multiple lines.

```js
function oneLine(strings, ...values) {
  const string =  values.reduce((finalString, value, index) => {
    return `${finalString}<b>${value}</b>${strings[index + 1]}`
  }, strings[0])

  return string.replace(/\s*\n\s*/g, ' ')
}

console.log(oneLine`This is a really long
string that spans across multiple
lines so it is easier to read.`)
// This is a really long string that spans across multiple lines so it is easier to read.
```

### Querying Elements With Tagged Template Literals

Tagged template literals can be used to return things other than strings too. For example, we could create a simple tagged template literal that will query all elements in a document based on the selector that is passed to the tagged template literal.
```js
function queryAll(strings, ...values) {
  const string =  values.reduce((finalString, value, index) => {
    return `${finalString}<b>${value}</b>${strings[index + 1]}`
  }, strings[0])

  return document.querySelectorAll(string)
}

queryAll`div`
// This will return all divs on the page
```

## Conclusion

Template literals are really powerful when it comes to creating strings that contain variables or span multiple lines. Tagged template literals take this a step further and allow functions to be run on the template literals to do some really unique things. While these tagged template literals are not always useful, they are really useful in specific scenarios.