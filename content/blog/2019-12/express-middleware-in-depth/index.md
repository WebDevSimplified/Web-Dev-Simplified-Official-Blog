---
title: How To Use And Write Express Middleware
date: "2019-12-09"
description: "Middleware in Express is one of the easiest ways to create DRY and well written code which is why it is crucial to know how to use and write good middleware."
tags: ['Express', 'Node.js']
---

Middleware is an often misunderstood topic since it sounds and appears very complicated, but in reality middleware is actually really straightforward. The entire idea of middleware is to execute some code before the controller action that sends the response and after the server gets the request from the client. Essentially it is code that executes in the middle of your request, hence the name middleware. Before I get too in depth on the details of middleware, though, I want to setup a basic Express server with two routes.

## Setting Up An Express Server

To get started working with a Node.js project you will need to run `npm init -y`. This will create a basic package.json file with all of the default values filled in for you. From there the next thing to do is install Express by running `npm i express`. Lastly, we need to create a server.js file with the following code.

```js
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users', (req, res) => {
  res.send('Users Page')
})

app.listen(3000, () => console.log('Server Started'))
```

This server.js file simply sets up a server on port 3000 that has two routes, a home page route and a users page route. The last thing to do is run `node server.js` to start up the application and if everything worked you should see a message in the console saying **Server Started**. You can then open up any browser to `localhost:3000` and you should see the message **Home Page**. If you go to `localhost:3000/users` you should then see the message **Users Page**.

That is all the basic setup we will need for the rest of this article. As we make changes you will need to restart your server in the console to see the changes take effect.

## What Is Middleware?

I talked briefly about middleware as functions that execute after the server receives the request and before the controller action sends the response, but there are a few more things that are specific to middleware. The biggest thing is that middleware functions have access to the response (`res`) and request (`req`) variables and can modify them or use them as needed. Middleware functions also have a third parameter which is a `next` function. This function is important since it must be called from a middleware for the next middleware to be executed. If this function is not called then none of the other middleware including the controller action will be called.

This is all a bit difficult to understand just from text so in the next section we are going to create a logging middleware that will log the url of the request a user makes.

## How To Create Logging Middleware

As I mentioned in the previous section, middleware takes three parameters, `req`, `res`, and `next`, so in order to create middleware we need to create a function that has those three inputs.

```js {12-14}
const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users', (req, res) => {
  res.send('Users Page')
})

function loggingMiddleware(req, res, next) {
  console.log('Inside Middleware')
}

app.listen(3000, () => console.log('Server Started'))
```

We now have the shell of a basic middleware function defined with some placeholder content, but the application is not using it. Express has a few different ways you can define middleware to be used, but for this example we will make this middleware execute before every single controller action by adding it to the application level. This can be done by using the `use` function on the `app` variable like this.

```js {4}
const express = require('express')
const app = express()

app.use(loggingMiddleware)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users', (req, res) => {
  res.send('Users Page')
})

function loggingMiddleware(req, res, next) {
  console.log('Inside Middleware')
}

app.listen(3000, () => console.log('Server Started'))
```

The application is now using the middleware that we defined and if we restart our server and navigate to any of the pages in our app you will notice that in the console the message **Inside Middleware** appears. This is great, but there is a slight problem. The application now loads forever and never actually finishes the request. This is because in our middleware we are not calling the `next` function so the controller action never gets called. We can fix this by calling `next` after our logging.

```js {16}
const express = require('express')
const app = express()

app.use(loggingMiddleware)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users', (req, res) => {
  res.send('Users Page')
})

function loggingMiddleware(req, res, next) {
  console.log('Inside Middleware')
  next()
}

app.listen(3000, () => console.log('Server Started'))
```

Now if you restart the server you will notice that everything is logging correctly, and the web page is properly loading. The next thing to do is to actually log out the URL that the user is accessing inside the middleware. This is where the `req` variable will come in handy.

```js {15}
const express = require('express')
const app = express()

app.use(loggingMiddleware)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users', (req, res) => {
  res.send('Users Page')
})

function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
  next()
}

app.listen(3000, () => console.log('Server Started'))
```

The logging middleware is now working 100% correctly on all the routes in the application, but we have only scratched the surface on the usefulness of middleware. In the next example we are going to take a look at creating a simple authorization middleware for the users page.

## Advanced Middleware Example

To get started we need to create another function to use as middleware.

```js {19-22}
const express = require('express')
const app = express()

app.use(loggingMiddleware)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users', (req, res) => {
  res.send('Users Page')
})

function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
  next()
}

function authorizeUsersAccess(req, res, next) {
  console.log('authorizeUsersAccess Middleware')
  next()
}

app.listen(3000, () => console.log('Server Started'))
```

This is just a shell of a function to be used as middleware, but we can add it to our users page route now in order to ensure that our middleware is only being executed on the users page route. This can be done by adding the function as a parameter to the `app.get` function for the users page.

```js {10}
const express = require('express')
const app = express()

app.use(loggingMiddleware)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users', authorizeUsersAccess, (req, res) => {
  res.send('Users Page')
})

function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
  next()
}

function authorizeUsersAccess(req, res, next) {
  console.log('authorizeUsersAccess Middleware')
  next()
}

app.listen(3000, () => console.log('Server Started'))
```

Now if you restart the server and go to the users page you should see the message **authorizeUsersAccess Middleware**, but if you go to the home page this message will not show up. We now have middleware that only executes on a single route in the application. The next thing to do is fill in the logic of this function so that if the user does not have access to the page they will get an error message instead.

``` js {20-24}
const express = require('express')
const app = express()

app.use(loggingMiddleware)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users', authorizeUsersAccess, (req, res) => {
  res.send('Users Page')
})

function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
  next()
}

function authorizeUsersAccess(req, res, next) {
  if (req.query.admin === 'true') {
    next()
  } else {
    res.send('ERROR: You must be an admin')
  }
}

app.listen(3000, () => console.log('Server Started'))
```

This middleware now checks to see if the query parameter `admin=true` is in the URL and if it is not an error message is shown to the user. You can test this by going to `http://localhost:3000/users` and you will see an error message explaining that you are not a admin. If you instead go to `http://localhost:3000/users?admin=true` you will be sent the normal users page since you set the query parameter of admin to true.

One other thing that is really useful with middleware is the ability to send data between middleware. There is no way to do this with the next function, but you can modify the `req` or `res` variables to set your own custom data. For example in the previous example if we wanted to set a variable to true if the user was a admin we could easily do that.

```js {11,22}
const express = require('express')
const app = express()

app.use(loggingMiddleware)

app.get('/', (req, res) => {
  res.send('Home Page')
})

app.get('/users', authorizeUsersAccess, (req, res) => {
  console.log(req.admin)
  res.send('Users Page')
})

function loggingMiddleware(req, res, next) {
  console.log(`${new Date().toISOString()}: ${req.originalUrl}`)
  next()
}

function authorizeUsersAccess(req, res, next) {
  if (req.query.admin === 'true') {
    req.admin = true
    next()
  } else {
    res.send('ERROR: You must be an admin')
  }
}

app.listen(3000, () => console.log('Server Started'))
```

This code sets an admin variable on the `req` object which is then accessed in the controller action for the users page.

## Middleware Additional Information

This is the majority of everything you need to know about middleware functions, but there a few extra things that are important to know.

### 1. Controller Actions Are Just Like Middleware

One thing you may have noticed is that controller actions which have a `req`, and `res` variable are very similar to middleware. That is because they are essentially middleware, but with no other middleware that comes after them. They are the end of the chain which is why there are never any next calls inside the controller action.

### 2. Calling next Is Not The Same As Calling return

By far the biggest mistake I see developers make when working with middleware is that they treat the `next` function as if it exited out of the middleware. Take for example this middleware.

```js
function middleware(req, res, next) {
  if (req.valid) {
    next()
  }
  res.send('Invalid Request')
}
```

At face value this code looks correct. If the request is valid then the `next` function is called and if it isn't valid then it is sending an error message. The problem is that the `next` function does not actually return from the middleware function. This means that when `next` is called the next middleware will execute and that will continue until no more middleware is left to execute. Then after all the middleware after this middleware is done executing the code will pick back up right after the `next` call in each of the middleware. That means that in this middleware the error message will always be sent to the user which is obviously not what you want. An easy way to prevent this is by simply returning when you call `next`

```js {3}
function middleware(req, res, next) {
  if (req.valid) {
    return next()
  }
  res.send('Invalid Request')
}
```

Now the code will no longer execute after calling `next` since it will return out of the function. An easy way to see this issue in action is with the following code.

```js
const express = require('express')
const app = express()

app.get('/', middleware, (req, res) => {
  console.log('Inside Home Page')
  res.send('Home Page')
})

function middleware(req, res, next) {
  console.log('Before Next')
  next()
  console.log('After Next')
}

app.listen(3000, () => console.log('Server Started'))
```

When you run this code and go to the home page the console will print out the following messages in order.
```
Before Next
Inside Home Page
After Next
```

Essentially what is happening is the middleware is called and it logs out the before statement. Then next is called so the next set of middleware is called which is the controller action where the home page message is logged. Lastly the controller action finishes executing so the middleware then executes the code after `next` which logs out the after statement.

### 3. Middleware Will Execute In Order

This may seem self-explanatory but when you define middleware it will execute in the order it is used. Take for example the following code.

```js
const express = require('express')
const app = express()

app.use(middlewareThree)
app.use(middlewareOne)

app.get('/', middlewareTwo, middlewareFour, (req, res) => {
  console.log('Inside Home Page')
  res.send('Home Page')
})

function middlewareOne(req, res, next) {
  console.log('Middleware One')
  next()
}

function middlewareTwo(req, res, next) {
  console.log('Middleware Two')
  next()
}

function middlewareThree(req, res, next) {
  console.log('Middleware Three')
  next()
}

function middlewareFour(req, res, next) {
  console.log('Middleware Four')
  next()
}

app.listen(3000, () => console.log('Server Started'))
```

Since the `app.use` statements come first the middleware in those statements will be executed first in the order they were added. Next the `app.get` middleware is defined and again they will be executed in the order they are in the `app.get` function. This will lead to the following console output if ran.

```
Middleware Three
Middleware One
Middleware Two
Middleware Four
```

## Conclusion

That is all there is to know about middleware. Middleware is incredibly powerful for cleaning up code and making things like user authorization and authentication much easier, but it can be used for so much more than just that because of the incredible flexibility of middleware.