---
setup: import AnimationFillModeExample from "/src/blogComponents/animationFillModeExample/AnimationFillModeExample.astro"
title: "Animation Fill Mode"
date: "2020-03-23"
description: "Animation fill mode is the single most important property of CSS animations to understand so in this article I will be breaking down exactly how to use animation fill mode and what it does."
tags: ['CSS']
---

Last week I asked my subscribers on YouTube what the most difficult part of CSS is and animation was one of the highest voted topics. This is understandable since animation is a complex topic which requires a deep understanding of CSS to master. In order to make animation more approachable I want to talk about `animation-fill-mode` which is one of the most important properties to understand when making complex animations.

*If you want to learn animations in depth checkout my [Learn CSS Today course](https://courses.webdevsimplified.com/learn-css-today) which has an entire section dedicated exclusively to animations in CSS.*

## What Is `animation-fill-mode`?

By default when a CSS animation starts it will apply all styles from the 0% keyframe. As it animates it will change properties based on the different keyframes until eventually it reaches the styles from the 100% keyframe. At this point, though, all styles from the animation are removed and the element is returned back to its default state before the animation was applied. Let's look at a quick example of this to understand what is happening.
```html
<div>Hover Me</div>
```

```css
div:hover {
  background-color: red;
  animation-name: color-change;
  animation-duration: 1.5s;
  animation-delay: .5s;
}

@keyframes color-change {
  0% {
    background-color: green;
  }

  100% {
    background-color: purple;
  }
}
```

<AnimationFillModeExample duration="1.5s" delay=".5s" fillMode="none" />

As you can see if you hover the above element the color will immediately change to red. Then after a .5 second delay the color will change to green which is the 0% keyframe and over the course of 1.5 seconds the color will slowly change to purple. Finally at the end of the 1.5 second transformation the color will change back to red. This is because by default the `animation-fill-mode` is set to `none` which means that before the animation starts and after the animation finishes the element will not use any styles from the keyframes.

This is obviously not always the behavior you will want, though. In order to make an animation use its final keyframe values (in our example 100%) after the animation finishes we need to change the `animation-fill-mode` to `forwards`. Using the exact same example but with an `animation-fill-mode` set to `forwards` we get the following result.

```css {6}
div:hover {
  background-color: red;
  animation-name: color-change;
  animation-duration: 1.5s;
  animation-delay: .5s;
  animation-fill-mode: forwards;
}

@keyframes color-change {
  0% {
    background-color: green;
  }

  100% {
    background-color: purple;
  }
}
```

<AnimationFillModeExample duration="1.5s" delay=".5s" fillMode="forwards" />

Now our element is keeping the styles from the 100% keyframe even after the 1.5 second animation is done playing. This is really useful when you want to animate an element into a position and have it maintain the styles from the final animation keyframe.

The next type of `animation-fill-mode` is `backwards` which does the exact same thing as `forwards` but it will use the first keyframe of the animation and apply those styles to the element before the animation starts. If we change our previous example to use `backwards` as our `animation-fill-mode` we get the following result.

```css {6}
div:hover {
  background-color: red;
  animation-name: color-change;
  animation-duration: 1.5s;
  animation-delay: .5s;
  animation-fill-mode: backwards;
}

@keyframes color-change {
  0% {
    background-color: green;
  }

  100% {
    background-color: purple;
  }
}
```

<AnimationFillModeExample duration="1.5s" delay=".5s" fillMode="backwards" />

Now our animation will immediately use the green color from the 0% keyframe as soon as we hover the element. Essentially during the entire .5 second delay before the animation starts the element will use the styles from the first keyframe of the animation which in our example is the 0% keyframe.

The final type of `animation-fill-mode` is `both` which combines together `backwards` and `forwards` so the element uses the first keyframe before the animation starts and the last keyframe after the animation finishes.

```css {6}
div:hover {
  background-color: red;
  animation-name: color-change;
  animation-duration: 1.5s;
  animation-delay: .5s;
  animation-fill-mode: both;
}

@keyframes color-change {
  0% {
    background-color: green;
  }

  100% {
    background-color: purple;
  }
}
```

<AnimationFillModeExample duration="1.5s" delay=".5s" fillMode="both" />

By using `both` the animation will start out green as soon as it is hovered and stay purple even after the animation finishes.

## `animation-fill-mode` Gotchas

At first glance it seems that `backwards` always uses the 0% keyframe and `forwards` always uses the 100% keyframe, but that is actually not the case. Depending on the value of `animation-direction` and `animation-iteration-count` the first keyframe of the animation may not actually be 0% and the last keyframe may not be 100%.  Let's look at the simple example of using an `animation-fill-mode` of `backwards` but with an `animation-direction` of `reverse`.

```css {6,7}
div:hover {
  background-color: red;
  animation-name: color-change;
  animation-duration: 1.5s;
  animation-delay: .5s;
  animation-fill-mode: backwards;
  animation-direction: reverse;
}

@keyframes color-change {
  0% {
    background-color: green;
  }

  100% {
    background-color: purple;
  }
}
```

<AnimationFillModeExample duration="1.5s" delay=".5s" fillMode="backwards" direction="reverse" />

Now that our direction is reversed the very first keyframe of our animation is 100% which means that our element is using the 100% keyframe properties before the animation starts. This is why the element starts out purple, slowly changes to green, and then jumps to red.

A similar issue arises with the `forwards` fill mode when you are using a reversed animation, but an alternating animation with multiple iterations could also cause the ending keyframe to not be 100%. In the following example we have an `animation-direction` of `alternate` and an `animation-iteration-count` of 2.

```css {6-8}
div:hover {
  background-color: red;
  animation-name: color-change;
  animation-duration: 1.5s;
  animation-delay: .5s;
  animation-fill-mode: forwards;
  animation-direction: alternate;
  animation-iteration-count: 2;
}

@keyframes color-change {
  0% {
    background-color: green;
  }

  100% {
    background-color: purple;
  }
}
```

<AnimationFillModeExample duration="1.5s" delay=".5s" fillMode="forwards" direction="alternate" iterations={2} />

In this example the color starts out red on hover and then jumps to green after .5 seconds. Then over 1.5 seconds the color transitions to purple before transitioning back to green over another 1.5 second period. After that full transition is done the animation then stays green. This is because our final keyframe of the animation was 0% since the animation ran twice with the first iteration going from 0% to 100% and the second iteration going from 100% to 0%.

It is important to be aware of the direction and iteration count of your animations so that you know exactly which keyframe will be the first and last keyframe in your animation.

## Conclusion

Animations can be difficult to deal with since they require complete master of CSS to use to their fullest. The complexity of animations is then compounded by the fact that they automatically reset back to their initial state at the end of the animation. Luckily, the `animation-fill-mode` property lets us fine tune exactly how our element should be styled before and after the animation is run. With this property it becomes trivial to make complex animations where elements transition between two states permanently.