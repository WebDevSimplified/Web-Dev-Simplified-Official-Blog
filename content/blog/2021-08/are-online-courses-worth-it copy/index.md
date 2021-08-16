---
title: "How To Learn To Code Faster With Comments"
date: "2021-08-16"
description: "Building projects from scratch is hard, but if you utilize comments correctly you can make writing projects from scratching trivial."
tags: ['Non-Technical Discussion']
---

By far the number one thing new developers struggle with is building their own projects from scratch. It is easy to watch a tutorial and build what they are building, but as soon as you are left on your own with a blank text editor most beginner developers freeze up and have no idea where to start. If this sounds like you then this article is perfect since I will be showing you how to fix this problem with something as simple as comments.

## Break Apart Projects

Imagine you are tasked with building out a modal and are given some HTML that looks like this, but nothing else.
```html
<button id="open-modal-btn">Open Modal</button>

<div id="overlay"></div>

<div id="modal">
  <h3>This is a modal</h3>
  <button id="close-modal-btn">Close Modal</button>
</div>
```
Depending on your skill level this could be a trivial task, but it is perfect for an example of how comments can be useful.

If you just jump straight into the code and start trying to make this modal then chances are you will get stuck and be unsure where to start or what to do next, especially if you have never built a modal before. This is why instead when you are presented with a problem that you are unsure of you need to think through what the steps are to complete that project without any code.

In our example we know that we have a button that we can click to open the modal and we also have an overlay that we need to show when we click on that button. We also have a close button that should close the modal and overlay when we click on it. With this in mind we can easily write out a guideline of steps to take to complete this project.
```js
/*
  TODO: 1. Select the elements we need based on their IDs
    * modal
    * open-modal-btn
    * close-modal-btn
    * BONUS: overlay
*/

// TODO: 2. Create a click event listener for the open-modal-btn
//          that adds the class "open" to the modal
// BONUS: Also add the class "open" to the overlay

// TODO: 3. Create a click event listener for the close-modal-btn
//          that removes the class "open" from the modal
// BONUS: Also remove the class "open" from the overlay

// BONUS: Add a click event listener to the overlay that removes
//        the class "open" from the modal and the overlay
```
Now instead of having the vague and large task of creating a modal we have a step by step guide of what we need to do. With these steps in place we can build the program in much the same way you can follow the steps to build furniture from IKEA, because without those steps you are just staring at a bunch of parts with no idea where to put them.

You also will notice that I broke out everything dealing with the overlay into a BONUS section. This is because the overlay is not really necessary to get the modal working at first. Generally, I find it best to do the bare minimum at first when starting a project so you can get something that works as quickly as possible. Then once you have the modal opening and closing you can work on the overlay.

## Write Pseudo Code

Another great way you can use comments is to write out pseudo code for what you need to do to get a single part of your project to work. Imagine you have a project where you need to write some simple validation for a sign up form. You could just start writing the code, but you may forget things or get stuck so writing pseudo code first will help with ensuring the project gets done right.
```js
// TODO: Create an event listener for when the form is submitted and do the following inside of it.
//    TODO: Create an array to store all error messages and clear any old error messages
//    TODO: Define the following validation checks with appropriate error messages
//      1. Ensure the username is at least 6 characters long
//      2. Ensure the password is at least 10 characters long
//      3. Ensure the password and confirmation password match
//      4. Ensure the terms checkbox is checked
//    TODO: If there are any errors then prevent the form from submitting and show the error messages
```
This code lays out in detail what each section of code should do so now instead of having to worry about the logic of the code and the syntax at the same time you only need to worry about the syntax since the logical portion is done.

## Separate Logic From Syntax

The whole idea of using comments and pseudo code is so that you can separate the logic from the syntax of the code. Learning to code is hard since you need to learn complex syntax at the same time that you are learning to solve problems in a logical way that computers can understand. Trying to do both of these at the same time is what causes most beginner programmers to fail which is why we use comments to separate those steps.

In the above examples we used comments first to split up the major tasks inside the project. This helped us to break a large project into manageable steps that we can easily conceptualize. Then in the second example we used comments to break apart an individual step into all of its logical components. This allows us to think of just the logic of the problem without worrying about the code syntax. Finally, once we have all these comments written we can come in and write the code by just doing exactly what the comments says.

This system is by far the most effective way to build out programs when you are starting and also is incredibly effective at teaching coding concepts. This is why in my [JavaScript Simplified course](https://javascriptsimplified.com) I do exactly this by breaking down each assignment to help you really focus on the logic and syntax separately. I actually pulled both of the above examples directly from that course. If you are looking to master JavaScript and build your own projects without getting stuck then you need to checkout my [JavaScript Simplified course](https://javascriptsimplified.com).