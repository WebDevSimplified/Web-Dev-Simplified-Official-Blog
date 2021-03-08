---
title: "Dynamic Module Imports"
date: "2021-03-08"
description: "By using dynamic module imports you can speed up your applications while making the user experience better."
tags: ['JavaScript']
---

If you are reading this article then you are most likely aware of static module imports.
```js
import User, { printUser } from './user.js'
```

The above code allows you to split up your JavaScript across multiple files and import them only when needed. The issue, though, is this code is always downloaded immediately by the browser leading to potentially slow page loads. This is where dynamic module imports come in.

## How To Use Dynamic Module Import?

Dynamic module imports are very similar to static module imports, but the code is loaded only when it is needed instead of being loaded right away. This means your page load speed will be much quicker and the user will only ever load JavaScript code that they are actually going to use.

Here is a simple example of how to download the above module using dynamic module imports.
```js
import('./user.js').then(({ default: User, printUser }) => {
  // Code that depends on the module
})
```
As you can see this code is pretty similar to using a normal import but instead this import is a function that returns a promise. This promise contains all the details of the module.

You will notice, though, that the default export of the module must actually be destructured from the promise return value. This is why we have the code `default: User` which is mapping the default export to the User variable.

You can also use async/await to clean this up even more.
```js
const { default: User, printUser } = await import('./user.js')
```
This code works the same as the promise based version, but in my opinion is a bit cleaner and easier to work with.

## Why Use Dynamic Module Imports?

As you can see, converting from a static to a dynamic import is pretty easy, but why would you want to do this.

### Initial Page Load Speed

The first and most obvious reason is to reduce the amount of code loaded when the page is first loaded. If you have JavaScript code that is related to a shopping cart then it may make sense to only download that code once the user actually adds an item to their cart or interacts with the cart.
```js
addToCartButton.addEventListener('click', async () => {
  const { toggleCart, checkout } = await import('./shoppingCart.js')
})
```
If this cart code is large then by delaying the download we are speeding up the page load drastically for all users that will never interact with the cart.

### Prevent Unnecessary Polyfill Downloads

Another amazing use case is to not download code that is not needed.

Many times you will have polyfills for older browsers in order to support features in your code that newer browsers can understand. Downloading these polyfills could be slow if you have a lot of them to support some really old browsers and this will slow down the page load speeds for all your users even if they don't need the polyfills. To get around this you can dynamically import the polyfills only if they are needed.
```js
if (isOlderBrowser) {
  import('./polyfills.js')
}
```
You will also notice we are not actually using the return value from the import statement. This is because when you import a module it will run all the code in the module and most polyfills automatically set themselves up when imported.

### Internationalization

If you are working on a global application, chances are you most likely have tons of internationalization files for the various languages you support. Instead of importing all of these files you could instead only import the locale that the specific user needs.
```js
const { localStrings } = await import(`strings.${userLocale}.js`)
```
As you can see we are using the `userLocale` variable to only download the translation data for the specific locale that user needs and we are able to dynamically determine that with a variable which is something you cannot do with static imports.

## Conclusion

These are just a few of the amazing use cases for dynamic module imports and I am sure you can think of even more for your specific applications. Overall, I think dynamic imports are incredible at speeding up your page load and only forcing the user to download the exact JavaScript they need at that moment.