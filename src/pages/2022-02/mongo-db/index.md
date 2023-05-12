---
layout: "@layouts/BlogPost.astro"
title: "MongoDB Ultimate Guide"
date: "2022-02-07"
description: "This ultimate guide will break down everything you need to know about MongoDB to build your next project."
tags: ["Database"]
---

MongoDB is a NoSQL document based database. Essentially, all the data in MongoDB is stored in JSON documents that are sorted into a variety of collections based on the type of data. It is one of the most popular NoSQL database options due to its relative ease of use and power. In this article I will be covering a ton of concepts and functions in MongoDB which touch on all the important aspects of MongoDB.

_I also have a full [MongoDB cheat sheet](https://webdevsimplified.com/mongodb-cheat-sheet.html) you can download. It includes all the concepts talked about in this article with extra examples and explanations._

_If you prefer to learn visually, check out the video version of this article._
`youtube: ofme2o29ngU`

## Getting Started

In order to get started with MongoDB we first need to install MongoDB to our computers. You also need a way to interact with MongoDB as well which is where the command line tool Mongosh comes in. When installing MongoDB make sure to download the community edition and not the enterprise edition. Below are download links for both of these tools.

MongoDB: https://docs.mongodb.com/manual/installation  
Mongosh: https://docs.mongodb.com/mongodb-shell/install

Once you install these two tools just open up a terminal and type `mongosh` to start working with MongoDB.

### Terminology

In order to understand MongoDB we first need to talk about some basic terminology related to MongoDB databases.

#### Database

The first term you need to understand is database. A database is simply a container for collections. A database in MongoDB is the same conceptually as a database in SQL and usually a project will have one database full of different collections.

#### Collection

A collection is a grouping of documents inside a database. This is the same conceptually as tables in a SQL database. Usually you will have one collection per data model. For example, your app may have users, posts, and products collections.

#### Document

A document is just a record inside of a collection. This is conceptually the same as a row in a SQL table. A document generally represents one single object within a collection. In MongoDB a document is essentially just a JSON object.

#### Field

The last piece of terminology you need to understand is fields. A field is just a key value pair within a document. This is conceptually the same as a column in SQL. Each document contains a number of fields which contain information such as name, address, hobbies, etc. An important difference between SQL and MongoDB is that a field can contain values such as JSON objects and arrays instead of just strings, numbers, booleans, etc. Also, MongoDB documents can have different fields defined within the same collection. In SQL all rows in a table must have the same columns, but in MongoDB one document in the users collection could have the fields name, and age, while another user document could have the fields name, address, and hobbies.

### Basic Commands

Before we start dealing with data we first need to understand a few basic commands that allow us to deal with databases.

#### `mongosh`

The first command is the `mongosh` command. This command is run in the terminal and gives us direct access to our local MongoDB installation. All future commands in this article will be run within this `mongosh` prompt.

#### `show dbs`

The `show dbs` command is a simple command that shows all MongoDB databases. If you run this you will notice that there are already some databases that were created when you installed MongoDB.

#### `use <dbname>`

This command lets you switch to a database based on the `dbname` variable. For example, `use mydb` will switch you to the `mydb` database. If there is no database with that name it will still swap you to that db and if you later add any data it will automatically create the db and add the data to it. Unlike SQL, MongoDB has no commands to create data/collections since they are automatically created when you add data.

#### `db`

This command just prints out the current database name.

#### `cls`

This command clears the terminal screen.

#### `show collections`

If you are connected to a database you can run `show collections` to print out information on all the collections in that database.

#### `db.dropDatabase()`

This command will delete the current database and all the data within it. You will also notice this command looks a lot like JavaScript code. This is actually true of many commands in MongoDB. This is nice since if you are used to JavaScript it can make understanding MongoDB quite a bit easier.

#### `exit`

The last basic command is the `exit` command which just exits the `mongosh` session that you started with the `mongosh` command.

## CRUD Methods

The following commands will be all the Create, Read, Update, and Delete commands you need to know in MongoDB. All of these commands will be run on a specific collection within a specific database. For example to get all the records in the users table within the current db you would write `db.users.find()`.

### Create

Creating documents in MongoDB is actually pretty simple since there are only two methods to do so and they both are very similar.

#### `insertOne`

This function takes a single object and creates a document with the specified information within the specified collection. You also notice we don't pass an ID when we create documents. This is because every MongoDB document automatically has an `_id` property added to it with a unique id.

```mongodb
// Insert a user with the name Kyle
db.users.insertOne({ name: "Kyle" })
```

#### `insertMany`

This function works just like `insertOne`, but it takes an array of objects to be inserted instead.

```mongodb
// Insert a user with the age of 26 and a second user with the name Kyle
db.users.insertMany([{ age: 26 }, { name: "Kyle" }])
```

### Read

Reading data within MongoDB is much more complicated and is where almost all the confusion around MongoDB comes from.

#### `find`

If you want to get all the documents within a single collection you can use the `find` method with no additional parameters.

```mongodb
// Get all users
db.users.find()
```

#### `find(<filterObject>)`

Generally when you get documents you only want to get some of them. If you pass an object to the `find` method it will return all documents that match that filter object. By default the filter object will do equality comparisons and if you pass multiple fields in the same filter object it will only return documents that match all the fields in the filter. Later in this article I will be covering some of the more complex filter options you can use which is where most of the complexity of MongoDB comes from.

```mongodb
// Get all users with the name Kyle
db.users.find({ name: "Kyle" })

// Get all users whose address field has a zip field with the value 12345
db.users.find({ "address.zip": "12345" })
```

#### `find(<filterObject>, <selectObject>)`

The final way to use the `find` method is by passing a second object to select which fields you want returned. The object contains a key which is the field and a value of either 0 or 1 to determine if that field is returned or not. By default the `_id` property is always returned unless specifically told not.

```mongodb
// Get all users with the name Kyle and return the name, age, and _id fields
db.users.find({ name: "Kyle" }, { name: 1, age: 1 })

// Get all users and return all fields except the age field
db.users.find({}, { age: 0 })
```

#### `findOne`

This is the same as find in every way except it just returns the first document that matches the filter.

```mongodb
// Get the first user with the name Kyle
db.users.findOne({ name: "Kyle" })
```

#### `countDocuments`

This final method returns the count of all documents that match the filter passed to it.

```mongodb
// Get the count of users with the name Kyle
db.users.countDocuments({ name: "Kyle" })
```

### Update

Updating documents in MongoDB is a bit more complex than in SQL since there are actually many different ways you can update a document.

#### `updateOne`

The main way to update a document is with the `updateOne` function. This will update the first document that matches the filter passed to it and will then update the document based on the information passed in the second parameter to `updateOne`. This second parameter takes a bunch of different options which we will cover later in this article.

```mongodb
// Update the age of the first user with an age of 20 to 21
db.users.updateOne({ age: 20 }, { $set: { age: 21 } })
```

#### `updateMany`

This works exactly the same as `updateOne`, but it will update all documents that match the filter object instead of just the first.

```mongodb
// Update the age of all users with the age of 14 by adding 2 to their age
db.users.updateMany({ age: 14 }, { $incr: { age: 2 } })
```

#### `replaceOne`

This works similarly to `updateOne`, but it will instead replace the entire document and not just update specific fields. Generally this is not something you want to do as it will delete all fields in the object (except the id field) that are not specified within the object passed to `replaceOne`.

```mongodb
// Replace the first user with an age of 14 with an object that only has a name field
db.users.replaceOne({ age: 14 }, { name: "Kyle" })
```

### Delete

Update and read were pretty complicated so luckily delete is very simple.

#### `deleteOne`

This method will delete the first object that matches the filter object passed to it.

```mongodb
// Delete the first user with the age of 20
db.users.deleteOne({ age: 20 })
```

#### `deleteMany`

This is the same as `deleteOne` but it will delete all documents that match the filter object instead of just one.

```mongodb
// Delete all users with the age of 14
db.users.deleteMany({ age: 14 })
```

## Advanced MongoDB Concepts

The above CRUD methods will cover your basic MongoDB needs, but there are a few ways you can modify these methods to make them even more useful.

### Complex Filter Object

The first way to make the above methods more useful is to expand on the filter object. Every single read, update, and delete method we covered takes a filter object as its first parameter. This filter object determines which documents are read, updated, or deleted, but so far we can only do exact matches. This is where complex filter objects come in. With MongoDB you can pass an object as the value of a field instead of a value and that object can specify a bunch of information about how to filter that field. You can also combine together and nest filters as much as you want.

#### `$eq`

The easiest complex filter to understand is the `$eq` filter since it checks for equality and works exactly the same as how our simple filters do.

```mongodb
// This is essentially the same as db.users.find({ name: "Kyle" })
db.users.find({ name: { $eq: "Kyle" }})
```

#### `$neq`

The `$neq` filter is the exact opposite of `$eq` and checks for inequality.

```mongodb
// Get all users with a name other than Kyle
db.users.find({ name: { $neq: "Kyle" }})
```

#### `$gt` / `$gte`

These filters check for when a value is greater than or greater than or equal to another value.

```mongodb
// Get all users with an age greater than 18
db.users.find({ age: { $gt: 18 }})

// Get all users with an age greater than or equal to 21
db.users.find({ age: { $gte: 21 }})
```

#### `$lt` / `$lte`

This is the same as `$gt` and `$gte` except for checking less than and less than or equal to.

```mongodb
// Get all users with an age less than 18
db.users.find({ age: { $lt: 18 }})

// Get all users with an age less than or equal to 21
db.users.find({ age: { $lte: 21 }})
```

#### `$in`

This will return all documents that match one of the values in the array.

```mongodb
// Get all users with the name Kyle or John
db.users.find({ name: { $in: ["Kyle", "John"] }})
```

#### `$nin`

This is the opposite of `$in` and returns all documents with values not in the array.

```mongodb
// Get all users with a name other than Kyle or John
db.users.find({ name: { $nin: ["Kyle", "John"] }})
```

#### `$and`

This checks that all conditions in the array are true. This is not normally needed, though, since passing multiple key value pairs to the same filter object by default does an and operation.

```mongodb
// Get all users with the name Kyle and the age 22
db.users.find({ $and: [{ name: "Kyle" }, { age: 22 }] })
// This is the same as db.users.find({ age: 22, name: "Kyle" })
```

#### `$or`

This is the same as `$and`, but it does an or check instead of an and check.

```mongodb
// Get all users with the name Kyle or the age 22
db.users.find({ $or: [{ name: "Kyle" }, { age: 22 }] })
```

#### `$not`

This negates the filter passed to it. Again this is generally not needed much as you can create pretty much the same filter using other filter combinations.

```mongodb
// Get all users with a name other than Kyle
db.users.find({ $name: { $not: { $eq: "Kyle" }}})
```

#### `$exists`

This will filter documents based on if a field exists on the document or not. This will only check the field, though, and not the value. That means if a document has a field with a value of null it will still show up in the `$exists` query.

```mongodb
// Get all users with a name field defined
db.users.find({ $name: { $exists: true }})

// Get all users without a name field
db.users.find({ $name: { $exists: false }})
```

#### `$expr`

This filter allows you to do comparisons between multiple different fields on your document.

```mongodb
// Get all users that have a balance greater than their debt
db.users.find({ $expr: { $gt: ["$balance", "$debt"] } })
```

### Complex Update Object

When talking about updates I mentioned that you can pass a lot of information to the update function that isn't just field values. In this section I will talk about all these update options that you can use to update your objects. You can also use more than one of these options at the same time to do really complex updates.

#### `$set`

If you want to just change the value of a field from one value to another the `$set` option is your best option.

```mongodb
// Update the first user with an age of 12 to also have the name Kyle
db.users.updateOne({ age: 12 }, { $set: { name: "Kyle" } })
```

#### `$inc`

If you want to increment/decrement a number field you can use the `$inc` option and pass it a number to add to the given field.

```mongodb
// Update the first user with an age of 12 by subtracting 2 from its age
db.users.updateOne({ age: 12 }, { $inc: { age: -2 } })
```

#### `$rename`

This lets you rename a field.

```mongodb
// Rename the age field to years on all users
db.users.updateMany({}, { $rename: { age: "years" } })
```

#### `$unset`

This lets you remove a field from a document. You must pass an empty string as the value for the field you want to remove.

```mongodb
// Remove the age field from all users with the age of 12
db.users.updateOne({ age: 12 }, { $unset: { age: "" } })
```

#### `$push`

This lets you add a value to an array field.

```mongodb
// Add John to the friends array for all users
db.users.updateMany({}, { $push: { friends: "John" } })
```

#### `$pull`

This is the opposite of `$push` and removes a value from an array field.

```mongodb
// Remove John from the friends array for all users
db.users.updateMany({}, { $pull: { friends: "John" } })
```

### Read Modifiers

The last concept I want to talk about with MongoDB is the ability to modify read queries. These methods can be added to the end of any read operation and will modify how the results are returned. You can also chain multiple of these modifiers onto one single read query if you want.

#### `$sort`

This will sort the results of read query. The results will be sorted in ascending order if you pass 1 to the field and descending order if you pass -1. Also if you want to sort by multiple fields they will be sorted in the order you pass them to sort.

```mongodb
// Get all users sorted by name in ascending order and then if any names are the same sort by age in descending order
db.users.find().sort({ name: 1, age: -1 })
```

#### `$limit`

This will only return the number of documents you tell it to.

```mongodb
// Get the first 2 users
db.users.find().limit(2)
```

#### `$skip`

This will skip a set number of documents from the beginning of the find. This is useful in combination with limit to do pagination.

```mongodb
// Get all users except the first 4
db.users.find().skip(4)
```

## Conclusion

MongoDB has tons of methods and complexity, but if you understand everything in this article you have everything you need to work with MongoDB. If you want to ensure you never forget anything MongoDB related you are going to want to download my free [MongoDB Cheat Sheet](https://webdevsimplified.com/mongodb-cheat-sheet.html). This cheat sheet includes all the topics from this article along with examples in an easy to digest cheat sheet.
