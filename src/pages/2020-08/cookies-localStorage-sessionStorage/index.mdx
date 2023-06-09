---
layout: "@layouts/BlogPost.astro"
title: "JavaScript Cookies vs Local Storage vs Session Storage"
date: "2020-08-17"
description: "An in depth analysis of all the differences between cookies, localStorage, and sessionStorage."
tags: ["JavaScript"]
---

Storing data in the browser is a fairly simple task, but there are three different ways to do it and it can be difficult to know which storage option is best for your particular use case. In this video I will be covering all three of the different ways to store data in a user's browser so you can choose the exact option that works best for you.

_If you prefer to learn visually, check out the video version of this article._
`youtube: GihQAC1I39Q`

## What Are Cookies, Local Storage, And Session Storage Used For?

Before I dive into the many differences between the various storage options I first need to talk about what they are used for. All three methods of storage are used to store information on the user's browser which can be accessed even after navigating to new pages on your site. This data is also saved to the user's exact browser they are using so if they have your site open in Chrome it will only save the information to their Chrome browser on the device they are currently on. This means if they open your site later in a different browser the data will no longer be there. Now let's jump into the many differences between each option.

## Storage Limit

Each storage method has a maximum size of the data you can store with it. Both local storage and session storage have a pretty large maximum storage capacity with local storage having a 10 megabyte maximum and session storage having a 5 megabyte maximum. These sizes are so large you should never run into any issues with storing too much data.

Cookies on the other hand have a very restrictive capacity at 4 kilobytes. This may seem incredibly small, but in reality you shouldn't be storing too much information in cookies so you shouldn't need to worry about this maximum.

## Access

After storing your data eventually you will need to access it and each storage method has slightly different levels of accessibility. Local storage is accessible in any window or tab that is open to your site. This means if you store some data in local storage on one tab of your browser that same local storage data will be available on all other tabs and windows you have open to that site.

This differs from session storage which is only available in the current tab you set the session storage data in. The easiest way to remember this difference is that session storage is tied to a particular session and each tab of your browser is its own session.

Lastly, cookies are very similar to local storage in that they are accessible from any window or tab after they are set, but one thing that makes them unique is that cookies are also accessible on the server as well. This is because for every request you make to your backend server all of your cookies are also sent along. This makes cookies ideal for authentication related tasks.

## Expiration

Another major difference between the different types of storage is how long they last for. Local storage is the easiest to understand since it never expires. Once you store data in local storage it will stay there until you manually remove it or the user manually removes it.

Session storage data will expire as soon as you close the tab you are on. This is because session storage is tied to a particular session which is equivalent to a tab so once you close your tab you are closing your session thus all session storage is cleared.

Cookies are unique in that you can set the expiration date for them manually. This gives you complete control over how long cookies last for.

## Syntax

Lastly, we need to talk about the differences in syntax between these different storage methods. Before we jump into the differences, though, it is important to note that local storage and session storage have the exact same syntax. The only difference is session storage is accessed with the `sessionStorage` variable and local storage uses the `localStorage` variable.

### Storing Data

In order to set data using local storage or session storage you simple use the `setItem` function. This function takes two string parameters. The first parameter is the name and the second parameter is the value to associate with that name. You can think of this very similar to a key value pair in a JSON object.

```js
localStorage.setItem("name", "Kyle")

sessionStorage.setItem("name", "Kyle")
```

In order to do the same with cookies is a bit more complex. You need to access the `document.cookie` object and set that to your cookie. To do this all you need to do is set `document.cookie` to a string where the name and value are separated by an equals sign.

```js
document.cookie = "name=Kyle"
```

This will create a cookie with the name `name` and the value `Kyle`, but this cookie will be expired since the default expiration date is in the past. In order to set an expiration date manually we need to pass the `expires` key a UTC date value. We also need to make sure we separate the `expires` key from our `name` key with a semicolon.

```js
document.cookie = `name=Kyle; expires=${new Date(9999, 0, 1).toUTCString()}`
```

This creates a cookie with an expiration date of 01/01/9999 which essentially is like creating a cookie that never expires.

Now if you want to store multiple sets of different data you just need to duplicate the above code.

```js
localStorage.setItem("name", "Kyle")
localStorage.setItem("lastName", "Smith")

sessionStorage.setItem("name", "Kyle")
sessionStorage.setItem("lastName", "Smith")
```

Even with cookies you just set `document.cookie` to a new string and it will add a new cookie without overwriting your old cookies.

```js
document.cookie = `name=Kyle; expires=${new Date(9999, 0, 1).toUTCString()}`
document.cookie = `lastName=Smith; expires=${new Date(
  9999,
  0,
  1
).toUTCString()}`
```

### Getting Data

In order to get data from local storage and session storage it is as easy as calling the `getItem` method. This method takes a single parameter which is the name of the key value pair and will return the value.

```js
localStorage.setItem("name", "Kyle")
localStorage.getItem("name") // Kyle

sessionStorage.setItem("name", "Kyle")
sessionStorage.getItem("name") // Kyle
```

Cookies are a bit more difficult since there is no way to get an individual cookie. The only way to get cookies is to get all the cookies at once by accessing the `document.cookie` object.

```js
document.cookie = `name=Kyle; expires=${new Date(9999, 0, 1).toUTCString()}`
document.cookie = `lastName=Smith; expires=${new Date(
  9999,
  0,
  1
).toUTCString()}`
document.cookie // name=Kyle; lastName=Smith
```

### Removing Data

As like the previous examples removing data from local storage and session storage is as easy as calling a single method. This method is the `removeItem` method and takes a single parameter which is the name of the key value pair to remove.

```js
localStorage.removeItem("name")

sessionStorage.removeItem("name")
```

Cookies as usual are a bit more difficult. To remove a cookie you need to set the cookie again but give it a blank value and a past expiration date.

```js
document.cookie = "name=; expires=Thu, 01 Jan 1970 00:00:00 GMT"
```

## Conclusion

While local storage, session storage, and cookies are similar, there are minor differences between them that give them all unique use cases. I recommend always using session storage or local storage unless you specifically need to access the data on the server since working with local storage and session storage is much easier than cookies.
