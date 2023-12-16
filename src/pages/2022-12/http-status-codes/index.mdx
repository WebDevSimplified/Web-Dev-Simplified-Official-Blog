---
layout: "@layouts/BlogPost.astro"
title: "Every Important HTTP Status Code Explained"
date: "2022-12-12"
description: "HTTP status codes are vital to creating an API and in this article I will explain all the important HTTP status codes and when to use them."
tags: ["Technical Discussion"]
---

Just by using the internet you have probably come across some HTTP status codes, such as the 404 status code, but that is just scraping the surface of possibilities. There are over 50 unique HTTP status codes across five different categories. Luckily, you don't need to know all of these or really even most of them. In this article I will be breaking down what each of the five sections are as well as the most important status codes from each of those sections. With this information you can confidently build robust APIs that return the proper HTTP status code which will make your API easier to use.

_If you prefer to learn visually, check out the video version of this article._
`youtube: wJa5CTIFj7U`

_Also, if you want a full list of every HTTP status code with explanations (including the ones not in this article), I highly recommend checking out the [HTTP status codes page](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status) from MDN._

## 100 Level Status Codes

The first level of status codes is the 100 level and luckily none of these codes are really that common or important to understand. There are only a handful of codes in this section and none of them are applicable to normal web development/API development so we can skip this entire section.

## 200 Level Status Codes

200 level status codes on the other hand are the most commonly used status codes, but luckily there are only a few you need to know. These status codes are used to represent successful responses and should be returned anytime a request was successful.

### 200 - OK

The first status code is 200 and is just a generic success status. All this says is that whatever the request was trying to do was successful but it doesn't give any more information than that. Because of this, the 200 status is the fallback status you should use for any successful request when there is no more specific code to use instead.

### 201 - Created

Speaking of more specific codes, we have the 201 code. This is a success code that says a resource was successfully created. Most often you will see this as the result of a POST request since most POST requests are used for creating things. For example, if you have an API route for creating a new entry in your DB you should return a 201 if that entry was created successfully.

### 202 - Accepted

The 202 status code is a bit niche, but just useful enough I decided to include it. Essentially, this code just means that the response was successfully received, but that the actual action of the request (creating a resource, updating data, etc.) has not been completed yet. This is commonly used when doing a particular task is very slow so it gets queued up to do later. For example, if you need to generate a large report that you will later email to a user then you may return a 202 to let the client know you are processing the request but have not finished it yet.

### 204 - No Content

Another specific code is the 204 code which means the request was successful, but there is no data to return. This is very common with DELETE requests since there is usually no data to return as a response to deleting something. The biggest key to this status code is that it cannot contain any data in the body.

## 300 Level Status Codes

300 level status codes are all about redirecting. For example if a page has been moved to a new location or you want to redirect the user to some cached data you would use one of the many 300 level status codes.

### 301 - Moved Permanently

Probably the most common type of 300 level status code is the 301. This just says that the page at a certain URL has been permanently moved to a new URL. This new URL must be sent down in the response with the 301 code. If this happens the browser will automatically redirect users to the new URL. This will also trigger search engines to associate all data from the old URL with the new URL so you shouldn't lose any rankings in a search engine by doing this.

### 302 - Found

Similar to the 301 status this status is used to tell the client that the page is at a new URL but this is a temporary change. This means that search engines won't replace the old URL with this new URL. This is useful if you need to send a user to a different version of the same page, but don't want that version of the page to replace your main version in search engines. For example, if you are doing A/B tests you would 302 redirect half your users to the alternate version of the site. This is also useful for things like localization where you may want to redirect users to localized versions of your site based on where they are from.

### 304 - Not Modified

The final important 300 level status code is the 304. This is used for caching and essentially just says that the resource being requested has not changed. This needs to be used in conjunction with a previous 200 status request that included caching headers such as the `Cache-Control`, and `Expires` header. When a client tries to access a resource before the cached time period has expired the server will return a 304 to prevent having to retransmit all the data to the client.

## 400 Level Status Codes

Now we finally get to the largest section of status codes. 400 level status codes represent any error that occurred due to client input. For example, if the client sends along bad or incomplete data to the server.

### 400 - Bad Request

Similar to the 200 status code, the 400 status code represents a generic bad request. This just means that data being sent to the request (URL params, JSON, etc.) is incorrect, malformed, missing, or in some way unusable by the server. This is the default status message to send back when you have a request that cannot be handled due to the client. For example, if you try to send a request to create a new user but don't pass a name the server will send a 400 status code to let you know the name field is required.

### 401 - Unauthorized

The 401 status code is a bit confusing since while it uses the word unauthorized (which means you don't have permission) this status code actually means you are unauthenticated. The main difference here is that being unauthenticated means you are not logged in or attempted to log in with invalid credentials. This can happen if you pass along an invalid API key or no API key at all when dealing with APIs.

### 403 - Forbidden

When dealing with permissions you should use the 403 status code. This status informs the client that they do not have permission to perform this request. This should only be returned if the client is sending along valid credentials (such as a valid API key), but lack the permissions to do the action. For example, if a basic user tries to access admin data you would return a 403.

### 404 - Not Found

This is the most common HTTP status code people are aware of and it just means the resource could not be found. This could be used for example if you try to access a URL that does not exist or if you try to access something from the database that does not exist.

### 429 - Too Many Requests

The final important 400 level status code is 429. This code is used when dealing with rate limiting. For example, if you only allow users to access your API 30 times per minute and someone tries to access it 31 times you would return a 429 status code to let them know they need to wait to send their next request. This also must have a `Retry-After` HTTP header with the amount of time to wait before requests will be accepted by the API.

## 500 Level Status Codes

The final level of status codes is the 500 level and this is very similar to the 400 level but 500 level codes deal with errors on the server and not the client.

### 500 - Internal Server Error

By far the most common 500 level code is 500. This code just informs the client there was some form of error on the server. This error could be due to anything from an error in the code leading to the program crashing (even if this error is caused by bad client data), to problems accessing the database. This should be used in any situation where the server has an error and there is no more specific code that is applicable.

### 503 - Service Unavailable

There aren't too many other 500 level status codes you will use, but 503 is somewhat common. This status code just means that the server is not able to handle the request. This is common to use when doing some form of planned server maintenance where the server is down while being updated. This should also include a `Retry-After` HTTP header with the estimated time until the server will be back up.

## Conclusion

There may be over 50 HTTP status codes, but there are only a handful that you truly need to understand. If you have the knowledge of these status codes you can create a robust API that will be easy to consume.
