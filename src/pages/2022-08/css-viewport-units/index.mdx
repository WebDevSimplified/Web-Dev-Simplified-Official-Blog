---
layout: "@layouts/BlogPost.astro"
title: "All 24 CSS Viewport Units Explained"
date: "2022-08-01"
description: "There are 24 total viewport units in CSS which all serve a specific purpose and my goal in this article is to explain each unit to you."
tags: ["CSS"]
---

CSS used to only have four viewport units you needed to know and they were able to cover pretty much every use case imaginable. As time went on, though, and technology changed, these four viewport units were no longer enough to handle all use cases. Because of this CSS added 20 more viewport units which sounds like a lot, but they are broken down into six main viewport units with three unique modifiers giving us a total of 24 combinations.

In this article I will be breaking down each of the six main viewport units and the three modifiers so you can confidently use viewport units in all situations.

_If you prefer to learn visually, check out the video version of this article._
`youtube: 5m6JOJLy5B0`

## Original Four Viewport Units

The main CSS viewport units are `vw`, `vh`, `vmin`, and `vmax`. Chances are you have used or seen these units before so I will try to be as brief as possible when explaining them.

### `vw`

`vw` stands for _Viewport Width_ and represents a percentage of the width of the viewport. The number placed before `vw` is the percentage of the width of the viewport this length will be. For example if you wrote `10vw` then this would represent a length of 10% of the width of your viewport.

The viewport is just a fancy word for the size of your screen, so if you were on a large desktop with a width of 1920px, `10vw` would represent 192px. If you were instead on a mobile phone with a width of 300px, then `10vw` would only be 30px.

### `vh`

`vh` stands for _Viewport Height_ and is the exact same as `vw` but for the height instead of the width. These two units can be used in combination to easily make an element fill the entire size of the screen.

```css
.full-screen {
  width: 100vw;
  height: 100vh;
}
```

### `vmin` and `vmax`

`vmin` and `vmax` represent the maximum and minimum viewport dimension. For example if you were on a phone that is 300px wide and 800px tall, `vmin` would represent the width of the viewport and `vmax` would represent the height of the device. These units are really useful if you need to size an element based on the smallest/largest dimension of a screen. For example, the following CSS will create a square that is as large as possible without overflowing in any direction since it will never be larger than 100% of the smallest screen dimension.

```css
.no-overflow {
  width: 100vmin;
  height: 100vmin;
}
```

## Two New Viewport Units

CSS has been trying to move away from a strict top/bottom, left/right, height/width model to a more dynamic start/end, block/inline model. The main reason for this change is to make it easier to adopt different writing directions in your code. If your entire application swaps from a horizontal writing direction to a vertical writing direction the idea of top/bottom, or width/height don't necessarily mean the same thing since if you wanted to add padding above and below your text this would be represented as padding to the left and right in a vertical writing system instead of padding top and bottom. This is why CSS added the `vi` and `vb` viewport units.

### `vi`

`vi` stands for _Viewport Inline_ and represents the inline direction of your document. In a horizontal writing direction this corresponds with the width of your viewport, while in a vertical writing direction this represents the height of your viewport. The easy way to remember the direction of inline is to remember that it is the same direction that your text goes. Another way to remember this is if you have two inline elements (for example two spans) next to each other the direction they stack is your inline direction.

```css
.horizontal {
  writing-mode: horizontal-tb;
  width: 10vi; /* Same as 10vw */
}

.vertical {
  writing-mode: vertical-lr;
  height: 10vi; /* Same as 10vh */
}
```

### `vb`

`vb` stands for _Viewport Block_ and represents the block direction of your document. This is the opposite of `vi` so in a horizontal writing direction this will correspond with the viewport height and in a vertical document this will represent the width of your viewport. If you struggle to remember this unit just remember that the block direction will always be the direction that block elements (for example two divs) will stack on top of one another.

```css
.horizontal {
  writing-mode: horizontal-tb;
  width: 10vb; /* Same as 10vh */
}

.vertical {
  writing-mode: vertical-lr;
  height: 10vb; /* Same as 10vw */
}
```

## Viewport Unit Modifiers

So far we have covered the six main types of viewport units, but there are three distinct modifiers that you can add to the units to make them behave differently when your viewport can change sizes. For example, when you are on a mobile phone browsing the web you may notice that the URL bar will disappear when you scroll down. When this happens your viewport technically changes size since now the URL bar is no longer taking up part of your viewport. The current CSS units have no way to deal with this change in viewport size which is why these modifiers were added.

These modifiers are `s`, `l`, and `d`. In order to use a modifier you just need to place the modifier after the number and before the unit like `10svw`. This gives us 4 total combinations for each of the 6 viewport units. `vw`, `svw`, `lvw`, and `dvw`.

So far everything we have covered in this article has used no modifier which is entirely valid. When you use no modifier on the unit, such as `10vw` or `10vh`, the browser will automatically default to using one of the 3 modifiers based on browser implementation.

### `s` Modifier

The `s` modifier stands for _Small_ and represents the smallest possible viewport. In our mobile phone example this would be the size of the viewport when the URL bar is shown. If you set an element to `100svh` it would take up 100% of the height of the screen based on the size of the screen when the URL bar is shown. It does not matter if the URL bar is visible or not this unit will always base its size off what the viewport would be if the URL bar is showing.

### `l` Modifier

The `l` modifier stands for _Large_ and represents the largest possible viewport. This is pretty much the opposite of the `s` modifier. In our mobile phone example this would be the size of the viewport when the URL bar is **NOT** shown. If you set an element to `100lvh` it would take up 100% of the height of the screen based on the size of the screen when the URL bar is **NOT** shown. It does not matter if the URL bar is visible or not this unit will always base its size off what the viewport would be if the URL bar is **NOT** showing which means if you set an element to `100lvh` and the URL bar is showing it will technically be larger than the screen.

### `d` Modifier

The `d` modifier stands for _Dynamic_ and represents the current viewport size. This is like a combination of the `s` and `l` modifier. In our mobile phone example this would always be the size of the current viewport no matter if the URL bar is showing or not. If our URL bar is showing then the `d` modifier is the same size as the `s` modifier, while if the URL bar is **NOT** showing the `d` modifier is the same size as the `l` modifier.

During the transition between the URL bar being shown and hidden this unit will scale in size dynamically so it will always fill all available space. This is great if you need to guarantee an element is always sized based on the viewport, but can be taxing since it will cause a lot of repaints as the size constantly changes.

## Browser Support

With every cool CSS feature you always have to consider browser support, and unfortunately the browser support for these new viewport units is not great. Currently, these new units have [15.2% support](https://caniuse.com/viewport-unit-variants), and are really only supported in Safari and Firefox. The reason for this lack of support is the fact that this proposal is still in the working draft stage which means it is very early on in its lifespan and quite a ways from being official CSS.

## Conclusion

While 24 units may sounds like a lot it is really just six units with three modifiers that are all relatively simple. These simple combinations, though, give us great power in constructing the perfect CSS layout.
