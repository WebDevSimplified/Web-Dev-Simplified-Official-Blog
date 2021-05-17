---
title: "JavaScript Node Vs Element"
date: "2021-05-17"
description: "Nodes and elements are very similar in JavaScript, but there are a few important differences to understand."
tags: ['JavaScript']
---

If you have worked with the DOM in JavaScript you have probably noticed that there are multiple ways to access the same element (`nextSibling`, `nextSiblingElement`). This is really confusing since it is not obvious which you should use or even what the differences are between them. In this article I will go over these exact differences by explaining the difference between nodes and elements.

## Elements vs Nodes

Of the two, elements are the easiest to understand since they are just HTML elements, such as a div, span, or body tag. Generally when you are working with the DOM you will be working with elements since most often you want to interact with HTML elements.

Nodes are the more generic version of an element. A node could be an HTML element, but it could also be anything else in an HTML document, such as text or comments. This makes nodes harder to work with since most often when working with the DOM you don't care about things like text nodes or comments nodes and only care about the element nodes. I generally avoid working with nodes because of this reason. Below is a list of all important Node types.

* Element Node
* Text Node
* CData Section Node
* Processing Instruction Node
* Comment Node
* Document Node
* Document Type Node
* Document Fragment Node

When you are navigating the DOM always prefer the method that selects elements instead of nodes. Usually these methods have the word element in them or the version that selects nodes will have the word node in it so you can distinguish them.

## HTMLCollection vs NodeList

When traversing the DOM sometimes you will get returned a collection of elements/nodes (`querySelector`, `children`). This will either be an HTMLCollection or a NodeList.

An HTMLCollection is pretty simple to understand since it can only contain elements. Methods such as `getElementsByClassName` and `children` return an HTMLCollection. These collections are very similar to arrays so you may not even realize you are working with an HTMLCollection, but one thing HTMLCollections lack that arrays have are all the higher order functions. Things like `forEach`, `map`, and `reduce` are not available on an HTMLCollection. Also, HTMLCollections are live updating. This means that if you have an HTMLCollection of all elements with the class `active` and you add a new element to the DOM with that class it will automatically be added to the HTMLCollection. This is honestly a bit of a pain to deal with as it can cause unexpected bugs.

A NodeList on the other hand can contain any type of node including elements. NodeLists are also similar to arrays, but they again lack most higher order functions. The only higher order function on a NodeList is the `forEach` function. Some examples of methods that return NodeLists are `querySelectorAll` and `childNodes`. NodeLists are also live updating similar to HTMLCollections, but only in some cases. For example, `querySelectorAll` is not a live updating list, but `childNodes` is live updating. Generally, I try to avoid NodeLists since they can contain non-HTML elements, but `querySelectorAll` will only ever return elements inside the NodeList so I use `querySelectorAll` constantly.

## Conclusion

Nodes and elements are very similar, but there are a few subtle differences you must understand. In general I prefer working with elements inside a NodeList whenever possible as they are the easiest to work with in my opinion.