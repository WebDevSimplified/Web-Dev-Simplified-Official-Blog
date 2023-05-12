---
layout: "@layouts/BlogPost.astro"
title: "Code Splitting With Dynamic Module Imports"
date: "2020-06-22"
description: "A simple explanation of how to take advantage of dynamic imports to make your site load faster."
tags: ["JavaScript"]
---

Normally when you import a module in JavaScript it will be loaded every time the page loads. This is generally fine, but what if this module is only used some of the time? For example, code that is only needed for admin users of a site. It doesn't make sense to load this code for all users since it will slow down page load speeds for non-admin users.

This is where code splitting and dynamic imports come in. Code splitting, as the name implies, lets you split your code into multiple sections or bundles that you can dynamically load depending on certain conditions. This used to be something only possible with a bundler like webpack, but with the introduction of ES2020, dynamic module imports were officially added to JavaScript.

_If you prefer to learn visually, check out the video version of this article._
`youtube: ddVm53j80vc`

## How Do You Dynamically Import Modules?

Normally, when you want to import a module you will use the following code.

```js
import someFunction from "./something.js"
```

This will import the module immediately when the file is run which means even if you only need to use the code in that module for admins, all users will get the code. If you want to dynamically import a module you need to do the following.

```js
import("./something.js").then(someFunction => {
  // Do something with someFunction
})
```

Now instead of loading this module immediately, the module will be loaded asynchronously and will return a promise. That promise will contain the module exports as the value for the `.then` function. Essentially all you need to do if you want to import a module dynamically is take the file path (the portion after `from`) and place that as the only parameter to the `  import` function. The next part is to take the code you are importing (the portion between `import` and `from`) and place that as the argument to the `.then` function. Then inside the `.then` function you can access the parts of the module you need.

Let's look at another example of the two side by side.

```js
import User, { printUser, deleteUser } from "./User.js"

import("./User.js").then(({ default: User, printUser, deleteUser }) => {
  // Do something with user code
})
```

## Why Use Dynamic Imports

Using dynamic imports is a bit more confusing than using normal imports, so why would you want to use them?

### Speed Up Page Load

I already talked a bit about the first reason to use dynamic imports which is to speed up your initial load time. This is really only useful if the code you are dynamically importing is significantly large enough to make your page load slow down, and if the code you are dynamically importing is not needed in most use cases. This is why it is perfect for the example I used above with admin only code. This admin only code could be a very large file, and it is only used by a small portion of the users of the site. Because of this we could use the following code to only import the admin module when the user is an admin.

```js
if (user.admin) {
  import("./admin.js").then(adminFunction => {
    // Do admin stuff
  })
}
```

Now, if the user is an admin we will load the admin code, but if the user is not an admin this code will never be loaded and will not slow down non-admin user's pages.

### Reduce Memory Usage

Another reason to dynamically load modules is to reduce memory usage. If you have a module that is rarely used, like an admin only module, and it uses a lot of memory when loaded that could be a good reason not to load it unless needed. A great example of this would be to dynamically load an internationalization file which contains the translations for your site to other languages. These files are generally very large and memory intensive since they need to store tons of strings for all the text on your page in every language you support.

If you break this translation module into multiple modules, one for each language, you can then load just the single translation you need for the particular user.

```js
import(`./${user.locale}-translations.js`).then(translations => {
  // Use translations
})
```

By doing this you will save tons of memory space and load times since instead of loading 20 translation files you are only loading the one the user needs.

### When The File Name Is Dynamic

This previous example also demonstrates another reason to use dynamic imports which is when your file name is dynamic. Translation files are a great example of this since you will not know the user's locale until they load your page.

Another example would be if you are creating some form of rendering engine that can render a bunch of different shapes which are defined in different modules. For example, `square.js`, `triangle.js`, etc. Instead of importing all of these modules at once, you can let the shapes you are rendering determine which modules you import.

```js
shapes.forEach(shape => {
  import(`./${shape.type}.js`).then(renderShape => {
    renderShape(shape)
  })
})
```

Now if you never need to render a triangle you won't even need to load the code for triangle rendering.

## Browser Support

Even though ES2020 is very new, dynamic module imports actually have very good browser support. At the time of writing this article they are currently at [89% support](https://caniuse.com/#search=dynamic%20module%20import). Internet Explorer 11 and older versions of Edge are pretty much the only unsupported browsers right now. Luckily, though, you can use tools like webpack and babel to add support for dynamic imports and code splitting into older browsers.

## Conclusion

While it is not often you will need to use dynamic imports, knowing what they are and how to use them is still an incredibly useful skill to have. When you run into issues with page load speed, or memory usage knowing that dynamic imports could be the solution will save you a ton of time.
