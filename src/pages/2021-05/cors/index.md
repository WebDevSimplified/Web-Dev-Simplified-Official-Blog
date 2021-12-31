---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "CORS (Cross-Origin Resource Sharing)"
date: "2021-05-03"
description: "What is CORS and how to fix CORS errors."
tags: ['Technical Discussion']
---

CORS, also known as Cross-Origin Resource Sharing, is something every web developer has to deal with at some point. Chances are if you are reading this article then you are probably dealing with a CORS error right now. In this article I will tell you what CORS is and how you can fix CORS errors.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: PNtFSVU-YTI`

## What Is CORS?

Does this look familiar?
![CORS Error Message](/articleAssets/2021-05/cors/cors-error.jpg)

We are attempting to make a request from `http://localhost:1234` to a resource located at `http://localhost:3000/items` which is being blocked by CORS since these two origins are different.

With CORS by default all requests between two different origins are blocked. This is to prevent people from accessing data/APIs on servers they do not control. This is useful since you wouldn't want random websites to be able to make requests to your social media or bank with the cookies stored in your browser since these cookies may contain your credentials for your bank or social media which means the site could act upon your behalf on your social media or bank.

CORS does not care about requests between the same origin, though. If you have a request that goes from `http://localhost:3000` to `http://localhost:3000/items` that will be allowed since they are the same origin and CORS does not apply to same origin requests.

The origin of the site is simply the scheme (http or https), the hostname (the domain name such as localhost), and the port (3000, 80, etc).

## How To Fix CORS?

If you want to make a request between your client and server and they are on different URLs then you need to pass down the `Access-Control-Allow-Origin` header from your server to your client with each request. The value of this header is just the origin the server allows to access the data.

In our first example since we are making a request from the origin `http://localhost:1234` to the origin `http://localhost:3000` we would want the `Access-Control-Allow-Origin` header sent from the server to be `http://localhost:1234` since that is the origin of the client trying to access the data.

Depending on what server language you are using there is most likely an easy way to do this. I will demonstrate how to do it using the cors library with express in Node.js.

All you need to do is install the cors library and then write the following line of code in your Express app.
```js {5}
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({ origin: 'http://localhost:1234' }))

// Server code 

app.listen(3000)
```
This code tells your app to send down the `Access-Control-Allow-Origin` header with the value of `http://localhost:1234`. If you want to just allow all URLS to access your site you can instead use `*` as the origin value in the header and that will allow cross origin requests from any URL. This will work for most of your CORS issues, but there are some instances where you need to do a bit of extra work.

## CORS Preflight

If you are making a PUT request or some other complex request to a cross origin URL, then doing just the above will not actually work. This is because the browser will send a preflight request to the server asking the server if they are allowed to make this PUT request. This preflight request will contain the `Access-Control-Request-Method` and `Access-Control-Request-Headers` headers. These headers contain the value of the method and headers that the client wants to use in the request and the server will return back if the method and headers are valid.

The server does this by returning down a `Access-Control-Allow-Methods` header that contains a list of all the allowed methods (GET, POST, PUT, etc.). The server also sends down a `Access-Control-Allow-Headers` header that contains all the allowed headers for the request. If the allowed methods and headers match the requested headers and method then the request is allowed to go through.

This may sound complicated but if you are using the cors library in express it is very easy.
```js {7-8}
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:1234',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))

// Server code 

app.listen(3000)
```
This will send back the allowed headers and methods headers to the client based on the data passed to the cors function. Also, if you do not set the `allowedHeaders` key then it will default to the same list sent up by the client in the `Access-Control-Request-Headers` which is why generally you do not need to manually set the `allowedHeaders`.

## Dealing With Credentials

The final difficult thing to deal with for CORS is cookies. By default CORS will not send your cookies along with a request unless you specifically tell it to. In order to allow your cookies to be sent you first need to tell the request that it is with credentials by setting the `credentials` option in the fetch request to `include`.
```js
fetch(url, { credentials: 'include' })
```
In order to accept the credentials your server needs to specify the `Access-Control-Allow-Credentials` with a value of true. Again, in express with the cors library this is simple to do.
```js {9}
const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors({
  origin: 'http://localhost:1234',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
}))

// Server code 

app.listen(3000)
```

## Conclusion

Dealing with CORS is usually as simple as configuring the `Access-Control-Allow-Origin` header, but it can get a bit more complex when dealing with preflight requests and credentials.