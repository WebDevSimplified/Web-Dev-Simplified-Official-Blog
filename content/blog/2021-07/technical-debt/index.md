---
title: "How To Manage Technical Debt?"
date: "2021-07-05"
description: "Technical debt may seem inevitable, but there are many techniques you can use to manage technical debt."
tags: ['Technical Discussion']
---

If you have ever worked on a project of any significant size or age then you are well aware of how difficult it can be to avoid and work with technical debt. It constantly slows you down and makes programming a slog instead of a fun creative process. Most people think technical debt is unavoidable, but it can actually be largely avoided or mitigated with practice.

## What Is Technical Debt

Technical debt is simply old, messy, outdated code that gets in the way when you try to modify or build upon a project. This can be anything from poorly designed/written code such as a massive 500 line function with 6 layers of nesting, to having no tests, to something as simple as old code such as a jQuery component inside a mostly React application. This code is so old or poorly written that it takes extra time for you to understand it and work around it when making changes which slows down your effectiveness. This technical debt also usually compounds on itself since now each change takes longer to do but your deadlines never get longer so you have to write more messy code to get it done in time which leads to more technical debt.

When most people think of technical debt they think of debt in a more traditional financial sense. This is a good first instinct since debt is in the name, but really technical debt is not quite like financial debt. A better example would be to think about a library of books.

In the library each book is organized by genre and alphabetized by author. When the library is first setup it is very easy to find exactly what you are looking for, but it doesn't stay this way forever. Some people come into the library, choose a book, and then leave it laying out or put it back in the wrong location. This then causes future people to take more time when looking for that book. If this only happens once or twice it really isn't a big deal, but if it continues to happen over and over again it can build up into a complete mess with no order where finding an individual book takes orders of magnitude longer than it used to.

If everyone always put the book back in the exact right location there would never be this problem, but finding the right place to put a book back is a slow process which is why many people choose not to do it. Luckily, libraries are reorganized regularly which means that all the misplaced and left out books are returned to the correct location on a set schedule which keeps the library from becoming too disorganized and ensures that each person can find the book they are looking for quickly. The only issue, though, is that reorganizing the entire library is a slow process and takes much longer than just putting the book back in the right place each time which is where we get the idea of debt. We are saving some amount of time upfront by not putting the book back in the right place, but it will take us more time in the future to fix this since we need to not only put the book back but also find where the book was incorrectly placed.

This is how technical debt works. When you first start up a codebase it is clean and easy to work with like a freshly organized library. Eventually, you start adding features to the codebase and some of those features are rushed out. These rushed out features are usually not as well designed/written, may be missing tests, and overall are not good clean code. This is the same as putting a book back into the wrong location at the library. In this moment you are choosing to save time now by quickly writing the feature even though you know it will cost you more time to fix later. As more and more features are rushed out you end up with a codebase that is harder and harder to work with just like a library becomes harder to search through as more books are misplaced. Eventually, time needs to be taken to clean up your code and fix the technical debt. This will almost always be a lengthy process that will take much more time than if the features were originally written the right way.

## How To Mitigate Technical Debt

Now that we understand technical debt let's talk about how we can mitigate it.

#### Spend More Time

The easiest way is to just spend more time writing each feature. If you go from spending 10 hours to spending 20 hours on a feature it is almost guaranteed that the feature will end up better and leave behind less technical debt. Unfortunately, this is not usually an option. It can be wise to spend a bit more time on a feature if possible, but that is just not something most companies can allow.

#### Write Tests

The next easiest way to reduce technical debt is to write more tests. This does require some additional amount of time, but depending on the feature size and code it can be pretty minimal. These tests will make changing code so much easier in the future since if anything breaks by accident the tests will immediately catch it. Tests also act as great documentation on what a piece of code should do so even if the code is hard to read and messy the tests can shine some light on what is happening.

#### Leave The Code Better Than You Found It

Even if you are perfect at ensuring you minimize technical debt, there will still be some technical debt in your project. This could be from other co-workers, mistakes you made, or random other things. This means you will most likely encounter technical debt as you are working on other features. This is the perfect time to make minor changes to improve the code and reduce the technical debt by a little bit. This could be as simple as adding a few tests to a piece of code that you are working with that has no tests or just doing a bit of refactoring to improve function and variable names.

These changes do not have to be and probably should not be large. Instead you are just improving the code around you by 1% at a time. Overtime this will lead to code that is much easier to work with without having to dedicate any large amount of time to fixing it. This is the equivalent of someone putting a random book they found back in the right spot when looking for their own book in the library.

#### Large Refactors

Sometimes technical debt becomes so large that it grinds progress to a halt and prohibits you from making the changes you want to. This is the equivalent of a library that is a complete mess. When this happens sometimes the only solution is to stop all new features and clean up old technical debt. This scenario is where all the large refactors and redesigns of the application are done. Unlike the previous technique, these changes will be large in scope and will take a significant amount of time. It is essentially the equivalent to the library closing overnight to reorganize all the books.

This large refactor is generally something most people dread since they usually wait until it is too late and the debt is massive. This would be like never closing a library and then having to shut down for days/weeks to fix all the disorganized books. Instead we should try to be more like a library and take more frequent smaller breaks to do these refactors. If you can dedicate a single two week sprint, or even just a single day in your sprint to making larger refactors it can make a big difference. You technical debt will be reduced and it won't cause the company to essentially shut down for weeks or months at a time. 

## Technical Debt Can Be Good

Now that we understand how to mitigate technical debt let's talk about when it can actually be useful.

#### To Save Time

We already know that technical debt is a tool used to save time now in exchange for time later. If you have a massive deadline, such as a big product launch, then it may be worth it to save time now at the expense of time in the future. Sometimes, though, it is not always clear that saving time now is worth it since most of us don't work under such strict deadlines.

In order to understand when saving time may be worth it we need to understand that technical debt is pretty much impossible to completely avoid since no code is perfect. You could spend an infinite number of hours writing and improving a feature, but there will almost always be something with the code that isn't perfect. The important thing with technical debt is about finding the balance between how much time you spend on the feature and how messy it is.

Let's say a feature you are working on could take 5 hours, 10 hours, or 50 hours to complete. At 5 hours you are leaving behind heavy technical debt since you are skipping testing, and hacking it together. At 10 hours the code leaves behind some technical debt since a few tests are missing and the design isn't perfect, but it is pretty good. Finally, at 50 hours the code is pretty much perfect. You have all the tests written and the design is very well done.

If all you care about is reducing technical debt then the 50 hour option may sound the best, but in reality the extra 40 hours you spend on this feature could be spent working on new features. The real best option to choose is most likely the 10 hour option since it only leaves behind a small amount of technical debt and saves you a ton of time. If you combine this 10 hour option with some of the techniques above to mitigate technical debt you can spend a few hours here and there in the future as the code is changed to reduce the technical debt and end up with a result as good as the 50 hour option.

#### When Code Is Never Changed

Imagine you have an old jQuery application that you are re-writing in React in order to take advantage of some React specific features. Your instinct may be to convert everything at once, but in reality it is probably best to slowly convert components as they are needed and only convert the core of the application at first. This leaves behind technical debt since you now have code that is outdated, but if the code is something that never changes it doesn't really matter.

Going back to the library example, this is the equivalent of someone checking out a book on the weather of 1999 and then placing it back in the wrong location. Most likely no one will need to access the weather report for 1999 anymore since that is in the past so the fact it is in the wrong location really has no negative impact since no person is going to look for that book and be slowed down by it. It is the same in code. If you have code that you know will most likely never change it is ok if it is a bit messier or outdated since the mess of the code is not impacting you ever.

## Conclusion

Technical debt is often talked about as a scary thing that should be avoided at all costs. This is mostly true as technical debt can slowly destroy an application, but if you use the above techniques to mitigate and use technical debt to your advantage you can create an incredibly well built application.