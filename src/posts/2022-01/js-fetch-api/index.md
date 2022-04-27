---
title: "JavaScript Fetch API Ultimate Guide"
date: "2022-01-24"
description: "The fetch API looks straightforward, but there are a lot of edge cases that this blog article will address for you."
tags: ['JavaScript']
---

If you want to load data from an API then the fetch API is the best way to do that in JavaScript. At first the fetch API may seem straightforward, but as you use it more and more you will realize it has a lot of depth. In this article I will cover the basics of fetch, more advanced use cases for fetch, and then finally I will cover the common issues people run into with fetch.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: cuEtnrL9-H0`

## Fetch API Basics

The fetch API is a promise based API, so if you are unfamiliar with promises you need to read my [JavaScript promises ultimate guide](/2021-09/javascript-promises/) first.

The simplest way you can call the fetch API is to just pass a URL to the fetch function.
```js
fetch("https://jsonplaceholder.typicode.com/users")
```
This will return a promise that contains the response data. This response data contains properties for the status as well as methods for converting the raw response data to JSON, text, or other formats.
```js {5}
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => {
    console.log(res.ok) // true
    console.log(res.status) // 200
    return res.json()
  })
```
The highlighted code above is calling the `json` method on our response and it is returning that from the `.then` function. This is because the `json` method also returns a promise that evaluates to the JSON data from our response. We can chain a second `.then` to get the data from the `json` method.
```js
fetch("https://jsonplaceholder.typicode.com/users")
  .then(res => res.json())
  .then(data => console.log(data))
  // [{ userOne }, { userTwo }, ...]
```
This is what most of your fetch requests will look like if you are fetching data from a JSON api. We first fetch the URL, then we convert the response to JSON, and finally we use the data in the final `.then`.

## Fetch Options

This will cover a some of your fetch uses, but often times you will need to pass additional options to fetch in order to configure it. The fetch function takes a second options object parameter which contains a large list of potential options.

### Common Options

While there are multiple options you can pass to fetch there are a few that you will use more often than the others.

#### `method`

By far the most commonly used option is the `method` option. This option allows you to set which HTTP verb you want to use (GET, POST, PUT, DELETE, etc).
```js
fetch("https://jsonplaceholder.typicode.com/users/2", {
  method: "DELETE"
})
```

#### `body`

If you are modifying the method then chances are you will need to pass data along with your request. That is where the `body` option comes in. The `body` does not accept objects so if you want to pass JSON to your API you must first convert it to a string.
```js {3}
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST",
  body: JSON.stringify({ name: "Kyle" })
})
```

#### `headers`

Now doing the above may look like all you need to do in order to pass JSON to an API, but this actually will not work. The reason is because you need to set the proper headers to tell your API that you are sending along JSON information. This `headers` option lets you set any HTTP header that you want.
```js {4}
fetch("https://jsonplaceholder.typicode.com/users", {
  method: "POST",
  body: JSON.stringify({ name: "Kyle" }),
  headers: { "Content-Type": "application/json" }
})
```
This above set of code is everything you need to do in order to pass JSON to an API.

### Advanced Options

The above 3 options are what you will use for 90% of your fetch needs, but there are a few advanced options you should be aware of as well.

#### `mode`

The `mode` option allows you to specify if the request should be a `cors`, `no-cors`, or `same-origin` request. By default all fetch requests are setup as `cors` requests so you can access resources on other origins, but if you want you can force the fetch to only allow `same-origin` requests which will throw an error if you try to fetch a URL that is not on the same origin.
```js
fetch("https://jsonplaceholder.typicode.com/users", { 
  mode: "same-origin"
}).catch(e => console.error(e))
```

#### `credentials`

Another option that deals with cors is `credentials`. This options can either be `omit`, `same-origin`, or `include` and determines whether or not the fetch API passes along and receives cookies, and other credential based information. `omit` will send/receive no credentials. `same-origin` will only send/receive credentials from the same URL. `include` will send/receive credentials from any URL. By default this is set to `same-origin`.
```js
fetch("https://jsonplaceholder.typicode.com/users", { 
  credentials: "include"
})
```

#### `signal`

The final advanced option you need to know is the `signal` option. This option takes in an `AbortSignal` which can be used to abort a fetch request.
```js
const controller = new AbortController()

fetch("https://jsonplaceholder.typicode.com/users", { 
  signal: controller.signal
}).catch(e => console.error(e.name)) // AbortError

controller.abort()
```
As you can see from the code this is a bit more complex then the other options. First you must create a new `AbortController` this controller has a `signal` property which is what you pass to the `signal` option. The controller also has an `abort` method that when called will abort the fetch request with the associated `signal`. This will cause the fetch promise to reject with an `AbortError` exception.

## Advanced Fetch Uses

One thing that is confusing about the fetch API is that it will not throw an error if you get back a 404, 500, or any other error HTTP response. The only way you can determine if a request failed is to check the `ok` property of the response.
```js
fetch("https://jsonplaceholder.typicode.com/users/-1")
  .then(res => {
    console.log(res.ok) // false
    console.log(res.status) // 404
  })
```
Because of this nuance I often will write out custom code to fail a request when the status is not ok.
```js {4}
fetch("https://jsonplaceholder.typicode.com/users/-1")
  .then(res => {
    if (res.ok) return res.json()
    return Promise.reject(res)
  })
  .then(data => console.log(data))
  .catch(res => console.error(res.status)) // 404
```
If the response is ok then I just keep all my code the same as normal, otherwise I will return a rejected promise that contains the response so I can handle it in a `.catch`.

I also sometimes will take this another step further and create my own custom fetch function.
```js
function jsonFetch(url, { body, headers, ...options } = {}) {
  return fetch(url, {
    headers: { "Content-Type": "application/json", ...headers }
    body: JSON.stringify(body)
    ...options
  })
  .then(res => {
    if (res.ok) return res.json()
    return Promise.reject(res)
  })
  .then(res => res.json())
}
```
This custom function will take care of all the extra code I need to send JSON data and will still allow me to utilize all the custom options of fetch. It also handles throwing errors for things like 404s.

Now if you feel that doing something like this is too much of pain you can use a library like [axios](https://axios-http.com) which is an abstraction over top of fetch that simplifies the API drastically.

## Conclusion

The fetch API is a powerful tool that is easy to get started with but contains many advanced options for every imaginable use case.