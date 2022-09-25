---
setup: import ColorWheel from '/src/blogComponents/colorWheel/ColorWheel.astro'
title: "What Is HSL?"
date: "2021-06-07"
description: "HSL is the easiest and best color format to use with CSS, but why exactly is that?"
tags: ['CSS']
---

I am sure you are already familiar with RGB and HEX representations of colors since that is what most articles/tutorials use when writing CSS colors, but these are not the best ways to write colors in CSS. HEX and RGB are pretty difficult to understand and making a color lighter/darker or converting a color from red to orange is not easy to do. This is where HSL comes in. HSL is a much easier format to read and it makes doing things like changing the lightness or hue of a color dead simple.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: EJtmfkKulNA`

## What Is HSL?

HSL stands for Hue, Saturation, and Lightness. This is similar to how RGB represents a color by combining its Red, Green, and Blue values together, but with HSL the values are much more intuitive.

#### Hue

The hue of the color is represented by degrees around a circle. Just think of a color wheel where 0 degrees represents red, 180 degrees represents cyan, and 360 degrees represents the same red.
<ColorWheel />

#### Saturation

The saturation is represented by a percentage between 0 and 100 and determines how gray looking the color is. If the color is 100% saturation then there is no gray at all, while a color with 0% saturation will be a shade of gray with no color.

<div style="display: flex; max-height: 10vh; height: 200px; border: 1px solid black;">
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 0%, 50%); display: flex; justify-content: center; align-items: center; color: white;">0%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 20%, 50%); display: flex; justify-content: center; align-items: center; color: white;">20%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 40%, 50%); display: flex; justify-content: center; align-items: center; color: white;">40%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 60%, 50%); display: flex; justify-content: center; align-items: center; color: white;">60%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 80%, 50%); display: flex; justify-content: center; align-items: center; color: white;">80%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 100%, 50%); display: flex; justify-content: center; align-items: center; color: white;">100%</div>
</div>

#### Lightness

The lightness is also represented by a percentage and determines how white or black a color is. If the color is 50% lightness then that means there is no additional white or black added to the color. As the percentage increases above 50% it adds more white to the color until reaching complete white at 100% lightness. As the percentage decreases below 50% it adds more black to the color until reaching complete black at 0% lightness.

<div style="display: flex; max-height: 10vh; height: 200px; border: 1px solid black;">
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 100%, 0%); display: flex; justify-content: center; align-items: center; color: white;">0%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 100%, 20%); display: flex; justify-content: center; align-items: center; color: white;">20%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 100%, 40%); display: flex; justify-content: center; align-items: center; color: white;">40%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 100%, 50%); display: flex; justify-content: center; align-items: center; color: white;">50%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 100%, 60%); display: flex; justify-content: center; align-items: center; color: white;">60%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 100%, 80%); display: flex; justify-content: center; align-items: center; color: black;">80%</div>
  <div style="flex-grow: 1; flex-basis: 0; height: 100%; background-color: hsl(0, 100%, 100%); display: flex; justify-content: center; align-items: center; color: black;">100%</div>
</div>

## How To Use HSL?

Now that we understand what HSL is we can talk about how to use it. It works just like RGB in that you call the `hsl` function in CSS to define an HSL color.
```css
.class {
  /* Pure red #FF0000 */
  background-color: hsl(0, 100%, 50%);
}
```
The first value passed to hsl is the hue which is degree value between 0 and 360, the second value is the saturation which is a percentage value between 0% and 100%, and lastly the final value passed is the lightness which is a percentage value between 0% and 100%. You can also use `hsla` to represent a partially transparent color. This function takes a fourth parameter which is a value between 0 and 1 where 1 is completely opaque and 0 is completely transparent.

## Why Is This Important?

It may seem a bit weird writing colors like this as first as you are most likely used to HEX or RGB, but once you get used to it it makes writing CSS so much more enjoyable. Here are a few reasons why:

### Easily Change Lightness/Saturation

As I mentioned at the beginning of this article you often need to change the lightness or saturation of a color in CSS to do things like introduce hover states for buttons. This can be painful to do with HEX since nobody knows what a 10% darker version of `#FA652F` is, but a 10% darker version of `hsl(16, 95%, 58%)` is easy to calculate. You just drop the lightness value by 10% to `hsl(16, 95%, 48%)`.

You can even take this a step further and use `calc` with custom properties in CSS to automate this for you.

*If you are unfamiliar with calc check out [this article](/2020-07/css-calc/) and if you are unfamiliar with custom properties check out [this article](/2020-02/css-custom-properties/).*
```css
.btn {
  --background-hue: 200;
  background-color: hsl(
    var(--background-hue),
    100%,
    calc(50% + var(--lightness-offset))
  );
}

.btn:hover {
  --lightness-offset: -10%;
}

.btn:focus {
  --lightness-offset: -20%;
}

.btn-danger {
  --background-hue: 0;
}
```
With this small amount of code we have set up a base btn class that will always make the background 10% darker on hover and 20% darker on focus. We also made it so we can change the hue of the button for other types of buttons and we don't even need to modify the hover and focus state for those new button types since it is all handled with custom properties and `calc`.

If you want to explore this concept deeper make sure you check out my [full CSS course](https://courses.webdevsimplified.com/learn-css-today) which includes a section on creating a button component library with these ideas.

### Easily Get Related Colors

If you are familiar with any amount of color theory then you will know that it is important to understand complimentary colors, primary/secondary colors, analogous colors, and so on. These different types of colors are difficult to figure out with RGB or HEX, but with HSL it is easy to find things like complimentary colors. That is because complimentary colors are just colors on the opposite side of the color wheel from one another which in the case of HSL just means their hues are 180 degrees apart from one another.

This is important since you can use this knowledge to create a color theme in CSS that uses math to calculate these complimentary colors and allows you to easily change the color theme of the whole site all at once. Below is an example of a site I built that can do that.

`youtube: ToMlS8RjFiI?start=1410`

### Easily Change Hue

Finally, the last major win for HSL is that it makes it easy to change a color's hue. If you want to make your red color a bit more orange you can do that by just making your hue a bit larger since orange is after red on the color wheel. This is really useful since in the early stages of design and development small color changes like this are incredibly common and being able to make them easily is a huge time saver.

## Conclusion

HSL is a different way to represent colors in CSS that not only is easier to read, but is also easier to modify and use in CSS. In my opinion it is the best color format in CSS.