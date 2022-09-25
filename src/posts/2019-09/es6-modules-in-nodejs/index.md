---
title: How To Use ES6 Modules With Node.js
date: "2019-09-30"
description: "Two simple ways to use ES6 modules with Node.js."
tags: ['Node.js']
---

I did a bunch of research into ES6 modules and Node.js and found two ways in which you can use ES6 modules in your own projects. Normally when you are working with Node.js you need to use common modules which is the syntax with `module.exports = {}` and `require('express')` you are used to in Node.js. ES6 modules on the other hand is the `import express from 'express'` syntax you are used to in the browser. The first way to use ES6 module syntax is by using a library called [esm](https://www.npmjs.com/package/esm) and the second is an [experimental feature](https://nodejs.org/api/esm.html) built into Node.js.

The safest way to use ES6 modules with Node.js currently is with the esm library. This library is unbelievably easy to use and can be setup with just a few lines of code. When you have a Node project, whether from running `npm init` or from an existing project, the first thing you need to do is install the library by running `npm i esm`. Once that is installed, the only thing left to do is modify the script in your package.json file that runs your server. You will need to add `-r esm` to the script. For example, go from `node server.js` to `node -r esm server.js`, or from `nodemon server.js` to `nodemon -r esm server.js`. Now you can start using ES6 modules inside your Node app and it will work exactly the same as before.

It is nice having ES6 modules be so simple to setup, but it is a bit annoying a library is needed to handle it. Luckily Node.js is working on implementing ES6 module support and you can start working with ES6 modules by enabling the experimental feature. I do not recommend doing this in a production application because it is possible the way it works will change, but it is still nice to use for small playground style projects. The setup for this is actually easier than with the library. Once you have your Node project you will need to modify the start script to include `--experimental-modules`. For example `node server.js` to `node --experimental-modules server.js`, or from `nodemon server.js` to `nodemon --experimental-modules server.js`. Then, in order to tell Node to use ES6 modules for your entire project, you need to add `"type": "module"` to your package.json file.

And that is all it takes to enable ES6 modules with Node.js. Below I have the final package.json files for both examples as a reference.

```json
{
  "scripts": {
    "start": "node -r esm server.js"
  },
  "dependencies": {
    "esm": "^3.2.25"
  }
}
```

```json
{
  "type": "module",
  "scripts": {
    "start": "node --experimental-modules server.js"
  }
}
```