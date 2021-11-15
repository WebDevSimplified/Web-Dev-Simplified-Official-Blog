---
title: "ES6 JavaScript Modules"
date: "2021-11-15"
description: "ES6 modules are one of the best features added to JavaScript since it makes writing clean code exponentially easier."
tags: ['JavaScript']
---

One of my least favorite things about JavaScript is having tons of script tags in my HTML that all depend on one another since it is so easy to accidentally break the code if they are put in the HTML in the wrong order. It also makes it hard to work with your code since all the variables from all your files are global and shared so accidentally overwriting variables between files is really easy to do. This is why when JavaScript introduced ES6 modules I instantly fell in love because it solves all these problems and more.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: cRHQNNcYf6s`

## ES6 Module Basics

Imagine that you have two JavaScript files which you are importing into your HTML.
```js
// User.js
let userCount = 0

class User {
  constructor(name, age) {
    this.name = name
    this.age = age
    userCount++
  }
}

function printName(user) {
  console.log(`User has the name ${user.name}`)
}

function printAge(user) {
  console.log(`${user.name} is ${user.age} years old`)
}
```
```js
// script.js
const user = new User("Kyle", 26)
printName(user)
// User has the name Kyle
printAge(user)
// Kyle is 26 years old
```
```html
<!-- index.html -->
<script src="User.js"></script>
<script src="script.js"></script>
```
As you can see from the above code our User.js file defines our User class and the functions for interacting with the user. Then in our script.js file we are accessing the User class and those methods. The reason we are able to access that class and methods is because we added the script tag for loading the User.js file above the script tag that loads our script.js file.

This has the problem, though, where we need to ensure our User.js file always loads before our script.js file and also the User class and functions are global variables so if we have another file that we import somewhere that defines a `printName` function it will override the `printName` function from the User.js file.

To fix this problem we can turn to ES6 modules. ES6 modules allow us to export specific information from one file and then import it into another file. Let's look at a quick example of exporting data from our User.js file.

### Exporting
```js {20-22}
// User.js
let userCount = 0

class User {
  constructor(name, age) {
    this.name = name
    this.age = age
    userCount++
  }
}

function printName(user) {
  console.log(`User has the name ${user.name}`)
}

function printAge(user) {
  console.log(`${user.name} is ${user.age} years old`)
}

export default User
export printName
export printAge
```
At the bottom of the User.js file we added 3 lines to declare our exports. As you can see we have one default export and then two non-default exports which are called named exports. With ES6 modules you can have as many named exports as you want, but you can have at most one default export. Now defining your exports on their own line like this does work, but you can instead define your exports on the same line you define your functions/classes which in my opinion is much easier to read.
```js {4,12,16}
// User.js
let userCount = 0

export default class User {
  constructor(name, age) {
    this.name = name
    this.age = age
    userCount++
  }
}

export function printName(user) {
  console.log(`User has the name ${user.name}`)
}

export function printAge(user) {
  console.log(`${user.name} is ${user.age} years old`)
}
```
This has the same effect as defining the exports on their own line, but makes it more clear what code is being exported and what code is not being exported. For example you can see that we are not exporting the `userCount` variable which means that no code outside the User.js file can access that variable. This means that we can have a private variable that can only be accessed in the file it is defined which was something that was difficult and clunky to do without ES6 modules.

Now let's take a look at how importing works.

### Importing

```js {2}
// script.js
import User, { printAge, printName } from './User.js'

const user = new User("Kyle", 26)
printName(user)
// User has the name Kyle
printAge(user)
// Kyle is 26 years old
```
The only difference is the first line of this file where we have the `import` keyword. The way importing works is you put the `import` keyword followed by the default import if you have a default export. Then you put a comma after the default export and define all named exports inside curly braces. Finally, you end the statement with the `from` keyword followed by the path to the file. The file path for the imported file is relative to the file doing the importing and must have `./` at the start of the path.

Let's look at a few examples of what this code would look like for different scenarios

#### Default Import Only

```js
import User from './User.js'
```

#### Named Import Only

```js
import { printAge } from './User.js'
```

## Renaming Imports

It is common to need to rename the functions/classes/variables you import from another file for example if you already have another variable that has the same name or you want to use a name that is more clear. Let's look at examples of how to rename both the default export and named exports.

### Default Export Rename

Renaming the default export is incredibly easy since you just need to do a normal import, but put whatever name you want where you put the default export.
```js
import Person from './User.js'

const user = new Person("Kyle", 26)
```
In this example we renamed the default export to `Person` from the name `User`. The reason that we can do  this is because you can only ever have one default export so JavaScript is smart enough to know whatever name you give the default export will correspond to the only default export from the file.

### Named Export Rename

Renaming named exports is a bit more difficult since JavaScript uses the name of the export to know which export you are importing. This is why when you rename a named export you need to put the name of the export followed by the keyword `as` and then the new name you want to use.

```js {2,5}
// script.js
import User, { printName as printUserName } from './User.js'

const user = new User("Kyle", 26)
printUserName(user)
// User has the name Kyle
```

## HTML Changes

If you have been following along with this tutorial you may have noticed that you are getting an error when trying to use this new module syntax. The reason for this error is because by default the browser does not know how to handle module imports. You need to specifically define in the HTML that you are using modules.
```html
<!-- index.html -->
<script src="script.js" type="module"></script>
```
By setting the `type="module"` attribute in JS we are telling the browser this code uses modules. You will also notice we don't need to include a script tag for the User.js file since the import of that file is handled in script.js. Lastly, an important thing to note about using `type="module"` is that it will also set the `defer` attribute on your script tag as well. *If you are unfamiliar with the `defer` attribute you should read [my defer article](/2019-12/javascript-loading-attributes-explained) that covers everything you need to know about the `defer` attribute.*

## Special Import Syntax

Now the above code covers 99% of all your ES6 module use cases but there are a few special import situations you should know about.

### * Imports

Sometimes when you import a file you want to import all the exports from that file into one object. This can be done with the `*` syntax.
```js
import * as AllImports from './Users.js'
```
The `AllImports` variable in this example will include keys for all the named exports and also will include a key called `default` which includes the default export. In our example this means we will have an object that has a key `default` which represents the `User` class, a key called `printName` for the `printName` function, and a key called `printAge` for the `printAge` function.

### Named Default Export

An alternative syntax for the default export would be to include it in the named exports section. As we found out in the previous section the default export has the name `default`. This means you could write `{ default as User }` to import the default export if you wanted.
```js
import { default as User, printAge } from './User.js'
```
While technically you can do this I find the syntax is clunky and harder to read than the standard import syntax I explained earlier.

### `nomodule` Script tags

I talked earlier about how you must include `type="module"` in your HTML to ensure the browser knows how to handle the new module syntax. This works fine in browsers that support ES6 modules, but in older browsers that do not support modules they will completely ignore this script tag as if it didn't exist. In order to get around this you can include a different version of your JS that has no modules at all and add the attribute `nomodule` to the script tag. New browsers will ignore this nomodule script tag, but older browsers that do not support modules will treat this script tag as just a normal JavaScript file.
```html
<script nomodule src="script-without-modules.js"></script>
<script type="module" src="script.js"></script>
```
Now luckily, ES6 modules are supported in 95% of browsers so you most likely won't run into this issue so I wouldn't really worry about this unless you specifically need to support outdated browsers.

### Dynamic Imports

The final fancy thing you can do with imports is dynamic imports where you only import the JavaScript code when/if it is needed instead of importing everything at the top of your file. This is a pretty complex topic which is why I have an entire [dynamic module import article](/2021-03/dynamic-module-imports) already written that you can check out.

## Conclusion

ES6 modules are one of my favorite modern JavaScript features since they make your code so much cleaner and easier to work with. They also open up many possibilities for private variables that were difficult if not impossible before modules.