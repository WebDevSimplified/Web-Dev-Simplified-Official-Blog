---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "Temporal Date API Ultimate Guide"
date: "2022-02-21"
description: "This ultimate guide will break down everything you need to know about the new temporal date API in JavaScript."
tags: ['JavaScript']
---

Working with dates in JavaScript sucks. The Date API is extremely clunky, has almost no methods that respect immutability, and is overall just bad. If you are still not convinced that dates in JavaScript are bad then this fact will change your mind. Months in JavaScript start at 0, but days of the month start at 1. This means if you wanted to create a new date for January you would have to write `new Date(2022, 0, 1)`. That is just one of the many side effects of the terrible date system in JavaScript.

Since working with dates has been so hard there are tons of libraries that attempt to make dates easier to work with. One library that used to be incredibly popular was moment.js, but now the more popular option is [date-fns](https://date-fns.org). These date libraries add a bunch of helper functions for dealing with dates, but soon you will not need any of them. The temporal API in JavaScript is a new proposal that aims to completely fix dates by adding a brand global object called `Temporal`.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: oOK3UzLJ_Cs`

## What Is The Temporal API?

The temporal API brings a new global object called `Temporal` to JavaScript that includes **TONS** of new methods and multiple new classes for handling a variety of date based concerns. The main goal of the temporal API is to make working with dates/times in JavaScript easier while also adding more support for things like dates without times, times without dates, and timezones. In this article I will attempt to cover the majority of the API, but this is a massive update so if you want to go more in depth on the API you can read the [full docs](https://tc39.es/proposal-temporal/docs).

## Temporal API Data Types

The first thing I want to talk about are the various different data types you can find in the new temporal API.

The first main thing that will stick out is that the majority of new data types are split between a `plain` and `zoned` version. The only difference between these two types is that a `plain` date/time represents a date/time with no timezone information. A `zoned` datetime on the other hand represents a specific date and time in a specific timezone. `zoned` datetime types are best used when you need to deal with a particular time within a particular timezone of if you need to do addition/subtraction that takes things like daylight savings time into account. `plain` dates/times on the other hand are best used when you just want to represent a date/time without caring what timezone it is in.

There are also a few other data types that don't fall into this formula which I will cover below as well.

### `PlainDateTime`

The `PlainDateTime` object is one of the easiest objects to understand since it represents a date and time with no timezone information. The easiest way to create a new `PlainDateTime` is by using the `Temporal.Now.plainDateTimeISO` method.

*All examples will be assuming that the current date is Feb. 21st, 2022 (the day this article was released).*
```js
const today = Temporal.Now.plainDateTimeISO()
console.log(today.toString())
// 2022-02-21T14:17:35.306655305
```
This method creates a brand new `PlainDateTime` object that uses the current date and time from the timezone you pass to the method, or your current local timezone if no timezone is passed to the method. This timezone information is not saved, though, so all operations done to the `PlainDateTime` object will not take into account the local timezone. The timezone is only used for getting the current time.

There is also an alternative method for getting the current `PlainDateTime` which is the `Temporal.Now.plainDateTime` function. This function takes a required calendar string as the first parameter and an optional timezone as the second parameter.
```js
const today = Temporal.Now.plainDateTime("persian")
console.log(today.toString())
// 2022-02-21T14:17:35.306655305[u-ca=persian]
```
This is something you probably won't use often, but if you are working with a different calendar system than ISO 8601 you can specify it with this method.

Now if you want to create a new `PlainDateTime` instead of just using the current time there are two ways to do so.

The first is to use the constructor for `PlainDateTime` which takes in a year, month, day, hour, minute, second, millisecond, microsecond, nanosecond, and calendar in that order. The only required arguments are the year, month, and day.
```js
const date = new Temporal.PlainDateTime(2022, 1, 1)
console.log(date.toString())
// 2022-01-01T00:00:00
```
This is a pretty clunky way to create a date, though, which is why you can use the `from` method on the `PlainDateTime` object instead. This method takes either a string that can be parsed as a date or an object with keys for each part of the date you want to specify.
```js
const date1 = Temporal.PlainDateTime.from("2022-01-01")
console.log(date1.toString())
// 2022-01-01T00:00:00
const date2 = Temporal.PlainDateTime.from({ year: 2022, month: 1, day: 1 })
console.log(date2.toString())
// 2022-01-01T00:00:00
```
Of all the ways to create a `PlainDateTime` the most commonly used ones will be either getting the current time in the ISO 8601 calendar, or using the from method.

Now before we move onto the next data type, I want to mention that all they ways we mentioned to create a `PlainDateTime` will work for all other data types so I will not go into quite so much depth on each method for every data type since they are the same.

### `PlainDate`

A `PlainDate` object represents a date in JavaScript that is not associated with any timezone or any time at all. This is perfect for representing just a date with no other information.
```js
const today = Temporal.Now.plainDateISO()
console.log(today.toString())
// 2022-02-21

const persian = Temporal.Now.plainDate("persian")
console.log(persian.toString())
// 2022-02-21[u-ca=persian]

const date1 = Temporal.PlainDate.from("2022-01-01")
console.log(date1.toString())
// 2022-01-01
const date2 = Temporal.PlainDate.from({ year: 2022, month: 1, day: 1 })
console.log(date2.toString())
// 2022-01-01
```

### `PlainTime`

A `PlainTime` object represents a time that has no timezone and no date. One thing to note about `PlainTime` is that there is no `Temporal.Now.plainTime` function since you cannot specify a specific calendar for a `PlainTime` object.
```js
const today = Temporal.Now.plainTimeISO()
console.log(today.toString())
// 2022-02-21T14:17:35.306655305

const time1 = Temporal.PlainTime.from("04:03:25")
console.log(time1.toString())
// 04:03:25
const time2 = Temporal.PlainTime.from({ hour: 4, minute: 3, second: 25 })
console.log(time2.toString())
// 04:03:25
```

### `ZonedDateTime`

A `ZonedDateTime` is a datetime that contains all timezone related information which makes it perfect for representing local dates/times and also doing calculations that involve things like daylight savings time.
```js
const today = Temporal.Now.zonedDateTimeISO()
console.log(today.toString())
// 2022-02-21T14:17:35.306655305[America/Chicago]

const persian = Temporal.Now.ZonedDateTime("persian")
console.log(persian.toString())
// 2022-02-21T14:17:35.306655305[America/Chicago][u-ca=persian]

const date1 = Temporal.ZonedDateTime.from("2022-01-01")
console.log(date1.toString())
// 2022-01-01T00:00:00-06:00[America/Chicago]
const date2 = Temporal.ZonedDateTime.from({ year: 2022, month: 1, day: 1 })
console.log(date2.toString())
// 2022-01-01T00:00:00-06:00[America/Chicago]
```

### `Instant`

An `Instant` is similar to a `ZonedDateTime` in that it represents a specific point in time, but it is always in UTC time and does not take into account any particular calendar. You also cannot pass an object to the `from` method for an `Instant` and when you pass a string to the `from` method it must include timezone information.
```js
const today = Temporal.Now.instant()
console.log(today.toString())
// 2022-02-21T20:17:35.306655305Z

const date = Temporal.Instant.from("2022-01-01-06:00")
console.log(date.toString())
// 2022-01-01T06:00:00Z
```

### `PlainMonthDay`

A `PlainMonthDay` is just like a `PlainDate`, but it does not include any year information. This is good for representing things like holidays, December 25th, that always fall on the same day. Since this is a less common data type the only ways to create it are with the `from` method and the constructor.
```js
const date1 = Temporal.PlainMonthDay.from("01-01")
console.log(date1.toString())
// 01-01
const date2 = Temporal.PlainMonthDay.from({ month: 1, day: 1 })
console.log(date2.toString())
// 01-01
```

### `PlainYearMonth`

A `PlainYearMonth` is just like a `PlainDate`, but it does not include any day information. This is good for representing things that happen within a month but have no specific day. Since this is a less common data type the only ways to create it are with the `from` method and the constructor, just like `PlainMonthDay`.
```js
const date1 = Temporal.PlainYearMonth.from("2022-01")
console.log(date1.toString())
// 2022-01
const date2 = Temporal.PlainYearMonth.from({ year: 2022, month: 1 })
console.log(date2.toString())
// 2022-01
```
Now this covers the major date types added by the temporal API. There are a few additional data types that I will cover later in this article, but they are more niche and not really related to the main data types we have covered so far.

## Helper Methods

With every variety of data type we have covered so far there are a number of helper functions you can use to convert between the types, compare dates, add/subtract dates, and much more.

The first thing I want to mention is that every data type has multiple methods for converting to/from other data types which is handy. I will not be covering all the methods in this article since there are so many of them, but just know all the conversion methods you need exist.

### `add` and `subtract`

Adding or subtracting parts of a date in JavaScript is really annoying to do, but with the temporal API all the data types we have talked about so far have built in `add` and `subtract` methods that make it incredibly easy. Both functions have the exact same arguments. The only difference is one adds while the other subtracts.

The easiest way to use these methods is by passing an object to the `add`/`subtract` method with properties for the changes you want to make.
```js
const today = Temporal.Now.plainDateISO()
console.log(today.add({ days: 4, months: 2 }).toString())
// 2022-04-25
```
Another nice thing about these functions is they automatically deal with overflow. For example if you try to add 1 month to the date January 31st that would result in the date February 31st which doesn't exist. By default these results will be clamped to the nearest valid date so it would return February 28th. You can disable this behavior, though with a second options argument.
```js
const date = Temporal.PlainDate.from("2022-01-31")
console.log(date.add({ months: 1 }).toString())
// 2022-01-28
date.add({ months: 1 }, { overflow: "restrict" })
// Uncaught RangeError: value out of range: 1 <= 31 <= 28
```
If you do not want to pass an object to this method you can instead pass a string or a `Temporal.Duration` object.
```js
const today = Temporal.Now.plainDateISO()
console.log(today.add("P1D").toString())
// 2022-02-22

const duration = Temporal.Duration.from({ days: 1 })
console.log(today.add(duration).toString())
// 2022-02-22
```
You most likely will not use these methods as often as just passing a plain object. Also, you are probably wondering what the `Temporal.Duration` object is. This is something we will be covering next after finishing up all the helper methods.

Also, something important to know about these two methods is that they do not actually change the temporal date object they are called on. They instead return a new temporal date object with the operation applied to it.

### `since` and `until`

The `since` and `until` methods will determine the distance between the current temporal date object and another temporal date object. Similarly to `add` and `subtract` the `since` and `until` methods are opposites of one another and take the exact same parameters.
```js
const today = Temporal.Now.plainDateISO()
const yesterday = today.subtract({ days: 1 })
console.log(today.since(yesterday).toString())
// P1D
```
The value returned by these methods is a `Temporal.Duration` object. Also, you can pass an options argument to these methods to really fine tune how you want the duration to be calculated.

If you specify the `largestUnit` then the duration will be specified using that unit as the largest value instead of the default value.
```js
const today = Temporal.Now.plainDateISO()
const lastMonth = today.subtract({ months: 1, days: 4 })
console.log(today.since(lastMonth).toString())
// P35D
console.log(today.since(lastMonth, { largestUnit: "months" }).toString())
// P1M4D
```
If you specify the `smallestUnit` then the duration will be specified using that unit as the smallest value instead of the default value. This could result in rounding which can be further customized with the `roundingIncrement` and `roundingMode` options.
```js
const today = Temporal.Now.plainDateISO()
const lastMonth = today.subtract({ months: 3, days: 4 })
console.log(today.since(lastMonth).toString())
// P96D
console.log(today.since(lastMonth, { smallestUnit: "months" }).toString())
// P3M
console.log(today.since(lastMonth, { smallestUnit: "months", roundingIncrement: 2 }).toString())
// P2M
console.log(today.since(lastMonth, { smallestUnit: "months", roundingMode: "ceil" }).toString())
// P4M
```

### `equals`

The last methods were a bit complex so let's look at a really simple method. The `equals` method will return true if the two temporal date objects have the exact same fields. This is needed since technically any comparison done with `==` or `===` will be false unless the two objects are the same instance.
```js
const today = Temporal.Now.plainDateISO()
const today2 = Temporal.Now.plainDateISO()
console.log(today === today2)
// false
console.log(today.equals(today2))
// true
```

### `with`

This is one of my favorite helper methods since it covers a huge weak point in JavaScript dates. The `with` method takes in an object of fields to overwrite on the current date object.
```js
const today = Temporal.Now.plainDateISO()
console.log(today.with({ year: 2023, month: 3 }).toString())
// 2023-03-21
```
Also, something important to know about this method is that it does not actually change the temporal date object it is called on. It instead returns a new temporal date object with the changes applied to it.

### `round`

If you want to round a temporal date to a specific unit this method is perfect.
```js
const today = Temporal.Now.plainDateTimeISO()
console.log(today.round("hour").toString())
// 2022-02-22T14:00:00
```
If you want to modify how the rounding is performed you can instead pass an object that takes `smallestUnit`, `roundingIncrement`, and `roundingMode`.
```js
const today = Temporal.Now.plainDateTimeISO()
console.log(today.round({ smallestUnit: "hour" }).toString())
// 2022-02-22T14:00:00
console.log(today.round({ smallestUnit: "hour", roundingMode: "ceil" }).toString())
// 2022-02-22T15:00:00
console.log(today.round({ smallestUnit: "hour", roundingIncrement: 6 }).toString())
// 2022-02-22T12:00:00
```

### `compare`

The last method I want to talk about is the `compare` method which is available on the actual data type and not the object instance. This method is pretty much purely used for making sorting dates easier.
```js
const today = Temporal.Now.plainDateISO()
const yesterday = today.subtract({ days: 1 })
const tomorrow = today.add({ days: 1 })
console.log([today, yesterday, tomorrow].sort(Temporal.PlainDate.compare))
// ['2022-02-20', '2022-02-21', '2022-02-22']
```

## Other Data Types

So far I have covered all the main data types as well as the main methods you will use with those data types. There are however a few data types we haven't covered yet.

### `Duration`

The `Duration` data type we have mentioned in this article a few times. This data type just represents a duration of time and is generally not something you will construct on your own, but something you will deal with in the case of comparing dates. If you want, though, you can create a new Duration with the constructor or the `from` method.
```js
const duration = Temporal.Duration.from({ days: 2, months: 17 })
console.log(duration.toString())
// P17M2D
```
Similarly to the above data types you can use the `add`, `subtract`, `with`, and `round` methods on durations. There are also a few additional helper methods that you will want to know.
```js
const duration = Temporal.Duration.from({ hours: 200, minutes: 17 })
console.log(duration.negated().toString())
// -PT200H17M
console.log(duration.negated().abs().toString())
// PT200H17M
console.log(duration.total("minutes"))
// 12017
```

### `TimeZone`

The `TimeZone` data type is used to represent a specific timezone. The most common ways you will use this are with the `from` method or with the `Temporal.Now.timeZone` method, but you could also use the constructor.
```js
const timeZone = Temporal.TimeZone.from('Africa/Cairo')
console.log(timeZone.toString())
// Africa/Cairo

const localTimeZone = Temporal.Now.timeZone()
console.log(localTimeZone.toString())
// America/Chicago
```
The most important helper functions are `getNextTransition` and `getPreviousTransition` which will return the date/time of the next/previous daylight savings time transition.

### `Calendar`

The `Calendar` data type is the last data type you need to know and is probably the least useful. You can create a calendar using the `from` method or if you want you can use the constructor as well.
```js
const calendar = Temporal.Calendar.from('iso8601')
console.log(calendar.toString())
// iso8601
```
There are really no important functions you need to know about on this data type.

## Browser Support

Now hopefully after reading all this you are excited to start trying out the temporal API. The only bad news I have is that this API is not yet available as it is still in proposal stage 3. There are currently no browsers with any support for this API, but you can use a polyfill if you want to start using this API today.

There are multiple polyfills available for this API, but I found the [@js-temporal/polyfill](https://www.npmjs.com/package/@js-temporal/polyfill) to be a good one. Once you install this library you can start using the temporal API immediately.

## Conclusion

Dates in JavaScript suck, but with the introduction of the temporal API working with dates will be something you can actually enjoy doing.