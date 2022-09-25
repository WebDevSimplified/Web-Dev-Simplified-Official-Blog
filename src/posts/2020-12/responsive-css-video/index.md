---
setup: import ResponsiveIframeEmbed from "/src/blogComponents/responsiveIframeEmbed/ResponsiveIframeEmbed.astro"
title: "Responsive CSS Aspect Ratio"
date: "2020-12-14"
description: "Creating a responsive video or iframe that maintains its aspect ratio in CSS is much trickier than you may think."
tags: ['CSS']
---

Creating a video with an exact width and height is easy, but making that video scale with the size of the screen while also maintaining its aspect ratio is much harder especially when embedding a video from somewhere like YouTube.

## HTML Video Tags

The video tag in HTML luckily makes creating responsive video incredibly easy. All you need to do is set the width to 100% and the height to auto.
```css
video {
  height: auto;
  width: 100%;
}
```
This will create a video that fills the entire parent and its height will be calculated automatically based on the width so that it maintains its current aspect ratio no matter the screen size.

## Iframes

Unfortunately, iframes are not nearly as simple as the video tag. If we try the above trick of setting the width to 100% and the height to auto we will get an element that properly scales its width, but the height will always be 150px. This is because iframes default to 150px tall and ignore the aspect ratio of an embedded video.

If you are planning to embed video in an iframe from YouTube for example, then you need to get much more creative.

The best way to handle this situation is to wrap the iframe in a container that will maintain the correct aspect ratio and then just fill that container with the iframe. Here is the full code and then I will explain what is actually happening.
```html
<div class="video-container">
  <iframe src="..."></iframe>
</div>
```
```css
.video-container {
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  width: 100%;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```
### Example

Try resizing the example by dragging in the bottom right corner to watch the video scale.

<ResponsiveIframeEmbed url="https://www.youtube.com/embed/l1mER1bV0N0" />

You are probably looking at this code wondering how the heck it actually works and I don't blame you. This code uses a CSS trick with padding to make everything work.

When you use a percentage value for padding it will always be relative to the width of the element. This means if you have `padding-top: 50%` on an element that is 400px wide there will be 200px of padding on the top of the element no matter how tall it is. We can use this knowledge to set the padding of our element to the percentage ratio between our width and height.

For example, if the video is 16x9 then the percentage for padding would just be 9 / 16 which is 56.25%.

With just a small change to our code we could accommodate any aspect ratio.
```html {1}
<div class="video-container" style="--aspect-ratio: 2 / 3;">
  <iframe src="..."></iframe>
</div>
```
```css {3}
.video-container {
  position: relative;
  padding-bottom: calc(var(--aspect-ratio, .5625) * 100%);
  height: 0;
  width: 100%;
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```
By changing just one line in the CSS we can now pass any custom aspect ratio and it will be calculated and converted to the correct percentage. If no aspect ratio is provided it will fall back to our standard 16x9 aspect ratio.

## Conclusion

Making a video follow its aspect ratio at all screen sizes is confusing, but luckily the code to do so is short and easy to extend.