---
setup: import XSS from "/src/blogComponents/xss/XSS.jsx"
title: "How To Prevent The Most Common Cross Site Scripting Attack"
date: "2020-09-07"
description: "A quick guide on how cross site scripting works and how to ensure your site is not vulnerable."
tags: ['JavaScript']
---

For this article I decided to take it all the way back to a video I created in 2018 which talks about cross site scripting. Cross site scripting is something most people have heard of but never really think about when creating their site which leads to many potential vulnerabilities. In this article I will show you what cross site scripting is, how it happens, and most importantly how to avoid it.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: ns1LX6mEvyM`

## What Is Cross Site Scripting?

Let's first get started by talking about what cross site scripting is. In essence, cross site scripting is when a hacker injects code into a site that can be run not only in their own browser, but also on all other users' browsers. Probably the most common way this occurs is with comments on a site. A hacker can leave a comment which is full of malicious code and then when that comment is rendered on other users' browsers it will run the malicious code to steal a user's identity or some other information.

In the example for this article we will be using a site that has a search box and when you hit search it will refresh the page with the search query in the URL and will render your search query at the bottom of the page. Below is an example of the site you can play around with.

<XSS client:visible initialValue="Some Search" />

You should notice that when you submit the page it will update the URL at the top of the page. This is important since if you send this URL to another user they will have the same search query pre-populated for them.

*Note: This is not actually changing any URLs on this page since that would open this blog to cross site scripting. This is just emulating what that would look like.*

## How To Perform Cross Site Scripting

So now that we have a site we can play around with lets try injecting some code into the site. The first thing you may think to do is write some JS like `<script>alert('hi')</script>` but that won't actually do anything. Try adding it below.

<XSS client:visible />

You will notice that the code was properly injected into the page which is why it is not rendered as plain text, but it doesn't execute the script tag. The reason for this is script tags are not executed if they are injected into the page after page load. In order to get around this we need a way to execute JavaScript after the page loads which is easy to do with an img tag.

If you write an img tag with no src it will run the `onerror` event which we can set to our own malicious JavaScript. `<img src onerror="alert('hacked')" />`. Try copying that img tag into the page below and submitting it.

<XSS client:visible />

You will notice that when you do this it will render an alert box, and since this actually changes the URL of the page if you send that URL to someone else it will also cause them to have the same alert box show up. This can be used maliciously by grabbing the user's cookies which contain their login session information and sending that to the hacker's own server where they can log into the site as if they were you.

## How To Prevent Cross Site Scripting

So we have talked about what cross site scripting is and how to perform cross site scripting so now let's talk about how to prevent it. This is actually easier than you may think. Most cross site scripting is caused because a developer accidentally renders user inputted information as HTML on the page. In JavaScript this is as easy as using `innerHTML` to render content on a page. If any of the content inside the `innerHTML` is provided by a user then you are vulnerable to cross site scripting.

The easiest way to fix this issue is to use `innerText` instead of `innerHTML` since `innerText` will convert all input into a string and will never render any of the values as HTML. If you really need to use `innerHTML`, though, you can use sanitization in order to convert the user input from HTML into a normal string by escaping all HTML specific characters. There are plenty of libraries that can do this for you.

In general I recommend not using `innerHTML` unless you specifically know that no user input will be used within it since it leads to easy cross site scripting vulnerabilities. By just changing from `innerHTML` to `innerText` we can fix the previous cross site scripting example. Here is what an example of using `innerText` would look like.

<XSS client:visible vulnerable={false} initialValue="<img src onerror=alert('hacked') />" />

## Conclusion

It is very easy to accidentally open your site up to cross site scripting if you are not careful to consider exactly where all values in your code are coming from. If you ever have values that could come from a user it is important to treat them all as if they are malicious and never render them as HTML.