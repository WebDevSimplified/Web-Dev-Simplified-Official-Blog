---
setup: import Layout from '/src/layouts/BlogPost.astro'
title: "Relative Date Internationalization In JavaScript"
date: "2020-07-06"
description: "Do you wish you could format dates like this: '2 days ago', 'yesterday'. Well with JavaScript internationalization it is incredibly easy."
tags: ['JavaScript']
---

Internationalization is one of the hardest parts of web development. Getting all your strings, numbers, and dates to format properly is no small task, but with the help of JavaScript's built in internationalization features this is actually much easier than it looks.

While there are a bunch of cool number and date formatters in JavaScript, I want to focus specifically on the relative date formatter which lets you format dates as human readable strings, like `yesterday`, `tomorrow`, `3 months ago`, and so on. The best part is, since this is built into JavaScript, all of the internationalization of strings and formats is taken care of for you.

## How To Use Relative Date Formats

Just like with all internationalization formatters in JavaScript, this formatter is inside the `Intl` object. The formatter is specifically called `Intl.RelativeTimeFormat`. This is a class which when instantiated can be used to format any relative time period. To set up the formatter we need to give it two values, though.

The first property is simply the name of the locale to use. This could be `en-us` for US english, `es-es` for Spain spanish, or even `undefined` to infer the user's locale.
```js
const english = new Intl.RelativeTimeFormat('en-us')
const spanish = new Intl.RelativeTimeFormat('es-es')
const inferred = new Intl.RelativeTimeFormat(undefined)
```

The second property of the constructor is an object which contains configuration options. I am not going to dive into these configuration options yet since we first need to understand how to use the formatter before we can configure it.

Once we have created a formatter we can call the `format` function to format our time period as a relative time period. This format function takes two parameters. The first is a number which is the length of time and the second is a string which is the time period type, such as, `days`, `minutes`, etc.
```js
const english = new Intl.RelativeTimeFormat('en-us')
const spanish = new Intl.RelativeTimeFormat('es-es')

english.format(-2, 'days')
// 2 days ago
spanish.format(10, 'hours')
// dentro de 10 horas
```
As you can see, if we pass a negative number to our formatter it will give us relative time in the past and if we pass it a positive number it will give us a relative time in the future.

## Configuration Options

Now that we know how the formatter is used, let's look at how to configure the output with the second parameter to the constructor.

There are two main ways we can influence the output. The first is by passing the `style` option. This will determine how long/short our formatted string will be. This option can take three values, `long`, `short`, `narrow`, and these values determine the length of the formatted string. `long` is the default value if no value is provided.
```js
const long = new Intl.RelativeTimeFormat('en-us', { style: 'long' })
const short = new Intl.RelativeTimeFormat('en-us', { style: 'short' })
const narrow = new Intl.RelativeTimeFormat('en-us', { style: 'narrow' })

long.format(10, 'hours')
// in 10 hours
short.format(10, 'hours')
// in 10 hr.
narrow.format(10, 'hours')
// in 10 hr.
```
As you can see the short and narrow example are shorter than the long version, but the narrow version is not actually shorter than the short version. This is because in some locales, like English, the narrow format is the same as the short format since there is no shorter format to use.

The second configuration option is the `numeric` option. This determines if the formatted value should always be numeric, such as `1 day ago`, or if the formatted value should try to use a string to represent the relative time, such as `yesterday`. The only options are `always` and `auto`. By default it is `always`.
```js
const always = new Intl.RelativeTimeFormat('en-us', { numeric: 'always' })
const auto = new Intl.RelativeTimeFormat('en-us', { numeric: 'auto' })

always.format(0, 'hours')
// in 0 hours
auto.format(0, 'hours')
// this hour
```

## Putting It All Together

Now that we understand exactly how this formatter works, let's create an example of a relative time formatter that works just like YouTube's formatter on video dates. This formatter should say how long ago the video was posted in seconds, minutes, hours, etc. For example `1 hour ago`, `yesterday`, `now`.

To get started we need to create a formatter that infers the user's locale and has numeric set to auto so we can print `yesterday` instead of `1 day ago`.
```js
const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto'
})
```
The next step is to create a function that will take in a date and return to us the formatted version of that date based on how long ago the date was.
```js {5-6}
const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto'
})

function formatTimeAgo(date) {
}
```
Now before we start writing any code let's think about what this function needs to do. We first need to get the time between the passed in date and the current date. Then once we have that duration we need to figure out the largest time period of that date. For example if our date was 2 weeks ago we want to get the number of weeks between our two dates instead of the number of days since we want to print 2 weeks ago and not 14 days ago. To do this lets create a map structure that maps between our different time periods.
```js {5-13}
const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto'
})

const DIVISIONS = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' }
]

function formatTimeAgo(date) {
}
```
In this divisions map we have two values. The first is the amount. This amount is the multiplier we use to go from the current division to the next. For example, days has an amount of 7 since there are 7 days in a week. The second value is the name which is just a string we use with the formatter.

Now with all this out of the way we can finally write the code in our function to actually format the date.
```js
const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto'
})

const DIVISIONS = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' }
]

function formatTimeAgo(date) {
  let duration = (date - new Date()) / 1000

  for (let i = 0; i < DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
}
```

This code looks a little confusing at first, but all we are doing is getting the `duration` between our two dates and converting it from milliseconds to seconds. Next we are looping through each division and determining if the current `duration` is less than the amount of the division. If this is true it means we have reached the largest division possible and we should return our formatted string using the current duration and division.

If this is not the largest division we then update our duration by converting to the next division. For example first we start with seconds and if the duration is 100 then we know 100 is greater than 60 so we need to move to the next division. We then divide 100 by 60 to get our new duration which is the number of minutes in our overall duration. We then repeat that until we get to the largest division.

Here is what happens if we pass in certain dates.
```js
const currentDate = new Date()

formatTimeAgo(new Date().setMonth(currentDate.getMonth() - 2))
// 2 months ago
formatTimeAgo(new Date().setDate(currentDate.getDate() - 1))
// yesterday
formatTimeAgo(new Date().setDate(currentDate.getDate() - 9))
// last week
```

## Conclusion

Internationalization is hard, but with the help of the many internationalization features in JavaScript we can do some pretty amazing stuff with internationalization without writing very much code at all.
