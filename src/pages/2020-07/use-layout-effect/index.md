---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "Why Do We Need useLayoutEffect?"
date: "2020-07-20"
description: "An in depth look at every aspect of the useLayoutEffect React hook."
tags: ['React']
---

If you have worked at all with React hooks before then you have used the `useEffect` hook extensively. You may not know, though, that there is a second type of `useEffect` hook called `useLayoutEffect`. In this article I will be explaining the `useLayoutEffect` hook and comparing it to `useEffect`. *If you are not already familiar with `useEffect` check out my full article on it [here](/2020-04/use-effect).*

## The Biggest Difference

Everything about these two hooks is nearly identical. The syntax for them is exactly the same and they are both used to run side effects when things change in a component. The only real difference is when the code inside the hook is actually run.

In `useEffect` the code in the hook is run asynchronously after React renders the component. This means the code for this hook can run after the DOM is painted to the screen.

The `useLayoutEffect` hook runs synchronously directly after React calculates the DOM changes but before it paints those changes to the screen. This means that `useLayoutEffect` code will delay the painting of a component since it runs synchronously before painting, while `useEffect` is asynchronous and will not delay the paint.

## Why Use `useLayoutEffect`?

So if `useLayoutEffect` will delay the painting of a component why would we want to use it. The biggest reason for using `useLayoutEffect` is when the code being run directly modifies the DOM in a way that is observable to the user. 

For example, if I needed to change the background color of a DOM element as a side effect it would be best to use `useLayoutEffect` since we are directly modifying the DOM and the changes are observable to the user. If we were to use `useEffect` we could run into an issue where the DOM is painted before the `useEffect` code is run. This would cause the DOM element to be the wrong color at first and then change to the right color due to the `useEffect` code.

## You Probably Don't Need `useLayoutEffect`

As you can see from the previous example, use cases for `useLayoutEffect` are pretty niche. In general it is best to always use `useEffect` and only switch to `useLayoutEffect` when you actually run into an issue with `useEffect` causing flickers in your DOM or incorrect results.

## Conclusion

`useLayoutEffect` is a very useful hook for specific situations, but in most cases you will be perfectly fine using `useEffect`. Also, since `useEffect` does not block painting it is the better option to use if it works properly.