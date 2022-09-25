---
title: "N + 1 Queries: The Easiest Way To Improve Performance"
date: "2020-02-24"
description: "A brief explanation of N + 1 queries and how to avoid them."
tags: ['Database']
---

Reducing load times by improving performance in an application is one of the best ways to improve user experience, and one of the easiest performance problems to fix is N + 1 queries. I personally have worked on applications where removing N + 1 queries reduced the load time of pages by 95%. It is very common for N + 1 query fixes to reduce page load time by 10% or more, so learning to address and fix them is crucial.

## What Are N + 1 Queries

An N + 1 query is a common performance problem related to querying a database. This problem comes from having a page where a list of N items is displayed and each item has additional related information about it displayed that is not in the same database table as the items being displayed. Most of the time when pages like this are created one database query is done to get the list of N items. Those N items are then looped through and inside that loop a new database query is done to get the related information. This leads to N queries being done inside the loop on top of the one query to get the list of items, thus leading to the name N + 1 query. In order to further visualize this idea let's look at an example.

Imagine a page that lists a bunch of books and for each book it lists the name of the book and the name of the author. Also, imagine that for this application the database has two tables, one for books and one for authors. A common implementation of this page may look something like this.
```js
const books = Book.getAll()
books.forEach(book => {
  const author = Author.findById(book.authorId)
  console.log(`${book.name} was written by ${author.name}.`)
})
```
This code works fine and prints out a list of books and their authors but it suffers from an N + 1 query. In the first line we get a list of all books, and then inside the loop we are querying for each individual author. Loading this page will lead to running queries that look something like this.
```sql
SELECT name, authorId FROM books;

SELECT name FROM authors WHERE authors.id = ${book_1.authorId};
SELECT name FROM authors WHERE authors.id = ${book_2.authorId};
SELECT name FROM authors WHERE authors.id = ${book_3.authorId};
...
SELECT name FROM authors WHERE authors.id = ${book_n-1.authorId};
SELECT name FROM authors WHERE authors.id = ${book_n.authorId};
```
Obviously, this isn't ideal since if there are 100 books in the list then 101 queries will be run which can drastically slow down the page load speed.

## How To Fix N + 1 Queries

In order to fix this issue we need to run one query instead of N + 1 queries. To do this we need to take advantage of preloading, by loading all books and their authors in one query since we know that we need the author information for each book. This may look something like this.
```js
const books = Book.getAllWithAuthor()
books.forEach(book => {
  console.log(`${book.name} was written by ${book.authorName}.`)
})
```
Now the only query being ran is inside the `Book.getAllWithAuthor` function. This query would look something like this.
```sql
SELECT books.name AS name, authors.name AS authorName FROM books
JOIN authors ON books.authorId = authors.id;
```
As you can see we are preloading all of the author names and books in one query so we never need to query the database again to get this information in the loop which means we only ever run one query no matter how large the book list becomes. Now writing these queries out by hand can be quite cumbersome and error prone which is why most popular database libraries will include their own way to preload data so you never have to worry about N + 1 queries.

## Conclusion

N + 1 queries are one of the most common performance problems in apps, since they are very easy to write and hard to spot. Luckily, this problem is incredibly easy to fix, though, and only requires a little bit of extra analysis into the database queries being run to ensure N + 1 queries are avoided.