---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "Facade Pattern Explained With Practical Examples"
date: "2022-07-18"
description: "The facade pattern is a very common and simple design pattern which can easily clean up your code which is why it is one of the first design patterns you should learn"
tags: ['JavaScript', 'Technical Discussion']
---

The facade pattern is one of my favorite design patterns because of how easily it can clean up your code. You have most likely already used this design pattern in your own programming without even realizing it. In this quick article I will explain what this pattern is and I will show you practical examples of how to use this pattern since too many tutorials focus on weird abstract examples that have nothing to do with programming and just leave you more confused than when you started reading.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: fHPa5xzbpaA`

## What Is The Facade Pattern?

The idea of the facade pattern is explained directly in the name. It is just a facade you put in front of some code to make it easier to use. One easy example to look at would be saving a user to a database. You need to first validate all the user information, check that the email is not already taken, and then finally save the user to the database.
```js
if (validateUser(userData)) {
  if (!emailIsTaken(userData)) {
    saveUser(userData)
  }
}
```
This is a three step process that you most likely will need to use in many places across your application. The idea behind the facade pattern is to take all these steps and put them behind a single interface/function.
```js
function saveUserToDatabase(data) {
  if (validateUser(data)) {
    if (!emailIsTaken(data)) {
      saveUser(data)
    }
  }
}
```
By doing this we can clean up our code so that everywhere we need to save our user it just looks like this.
```js
saveUserToDatabase(userData)
```
This has two primary benefits.
1. Your code is much easier to read since instead of having to read five lines of code to understand what is going on we only need to read one line. This becomes an even larger benefit if the underlying code is longer or more complex.
2. Your code is easier to change since all the code for saving the user is in one single place. If we need to modify this code to add an additional step to also validate the username is not taken it is trivial since we just need to add that code in one single place. If we did not use the facade pattern, though, we would need to add that code to every single place we save a user which could be all over your application.

Now this is the most textbook example of the facade pattern, but there is one other case the facade pattern is really useful that most people never talk about.

## Using The Facade Pattern For 3rd-Party Code

In programming, JavaScript especially, it is common to import many 3rd-party libraries. Some of these libraries can be quite complex and/or used in many places across your application. This can lead to many problems if you need to change/update that library in the future since now the library code is spread across your entire application which means updating/changing it requires you to modify nearly your entire codebase. Instead you should wrap your library code in a facade. There are two mains ways to do this.

### Creating A Facade Around A Complex Library

Let's assume for example you need to do some graphing in your application. Graphing libraries are usually incredibly complex with thousands of features when you generally only need a few graphs total. This is a great use case for a facade that hides all the complex code of the graphing library behind a simple API. For example, the following code is for creating a very simple bar chart using D3.
```js
const margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

d3.csv(url).then(data => {
  const x = d3.scaleBand()
    .range([ 0, width ])
    .domain(data.map(d => d.Country))
    .padding(0.2);
  svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

  const y = d3.scaleLinear()
    .domain([0, 13000])
    .range([ height, 0]);
  svg.append("g")
    .call(d3.axisLeft(y));

  svg.selectAll("mybar")
    .data(data)
    .join("rect")
      .attr("x", d => x(d.Country))
      .attr("y", d => y(d.Value))
      .attr("width", x.bandwidth())
      .attr("height", d => height - y(d.Value))
      .attr("fill", "#69b3a2")
})
```
*Code from [d3-graph-gallery](https://d3-graph-gallery.com/graph/barplot_basic.html).*

This is obviously very complex code and would be a pain to copy multiple places that you need bar charts. Instead it would be better to create a simple interface that wraps the D3 library.
```js
export function createBarChart(dataUrl, margins, width, height) {
  // Complex code
}

export function createLineGraph(dataUrl, margins, width, height) {
  // Complex code
}
```
With the above code we have created two functions that wrap up all the complexity of D3. This makes creating and using graphs/charts easier in our application but it also has the added benefit of making it easier to update/change our graphing library. If we wanted to update D3 to a newer version we would only need to change the code in these two functions and everything else would work fine since our code only ever interacts with D3 through these two functions.

### Creating A Facade For Flexibility

The first example I covered of wrapping a complex library is the most common place people use the facade pattern, but the library doesn't have to be complex for you to want to use the facade pattern. One great use case for wrapping a simple library/API is the fetch API built into the browser. Let's assume in our application we have the need to get lots of data with fetch. We may create a facade around the library like so.
```js
function get(url, params = {}) {
  const queryString = Object.entries(params)
    .map(param => `${param[0]}=${param[1]}`)
    .join("&")

  return fetch(`${url}?${queryString}`, {
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json())
}
```
This code just hides some of the complexity of getting data using the fetch API which is nice, but the complexity of this code is pretty minimal compared to the last example. The real advantage of this example is how easy it makes it to change/update the code related to using fetch. If we wanted to swap out the usage of fetch in our application with the usage of axios we would only need to change this one single function.
```js
function get(url, params = {}) {
  return axios({ url, params }).then(res => res.data)
}
```
This works the same for if we needed to update axios to a new version. If axios changed `res.data` to be `res.value` instead we would only have one place to make that update which ensures our code is less prone to breaking due to library updates. I try to employ this technique with nearly all the 3rd-party libraries I use.

## Conclusion

The facade pattern is overall a simple pattern, but the benefits you can gain from using the facade pattern are massive.