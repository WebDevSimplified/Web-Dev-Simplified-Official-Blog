---
setup: |
  import Layout from '/src/layouts/BlogPost.astro'
  import LazyLoadedImage from '/src/blogComponents/lazyLoadedImage/LazyLoadedImage.astro'
  import Tangent from "/src/blogComponents/lib/Tangent.astro"
title: "Speed Up Your Site Instantly With Lazy Loaded Images - Advanced Lazy Loading"
date: "2023-05-01"
description: "Lazy loading images is one of the easiest ways to speed up your site, but there are a few advanced techniques you can use to make your lazy loading even better."
tags: ["HTML", "CSS"]
---

<div style="display: flex; gap: 1rem; align-items: center;">
  <LazyLoadedImage isAlwaysLoading />
  <span style="flex-shrink: 0; font-size: 2rem;">&rarr;</span>
  <LazyLoadedImage />
</div>

Lazy loading images is one of the easiest ways to speed up the load times of your site since the most basic form of lazy loading only requires one line of code. However, there are a few advanced techniques you can use to make your lazy loading look just like the image above with blurred placeholders and a smooth transition from the placeholder to the full image. In this article I will be covering everything you need to know about lazy loading as well as how to create this advanced lazy loading effect.

## What Is Lazy Loading?

Lazy loading is a technique used to defer the loading of an asset until it is needed. In the case of images, this means that the image will not be downloaded until the user scrolls to the point where the image is visible on the screen. This is a great way to speed up your site since you are only downloading the images that the user will actually see. This is especially useful for sites with a lot of images since you can save a lot of bandwidth by only downloading the images that the user will actually see.

If you have a fast internet speed or you only ever view sites with small, well optimized images, you may not see the advantage to lazy loading images since you can download all the images almost instantly, but for everyone else lazy loaded images are a game changer. This also isn't just for people with super slow internet connection either. Images are one of, if not, the largest asset your user will download so even if they have a fast internet connection, lazy loading images can still make a huge difference in the load time of your site.

## Basic Lazy Loading

As I mentioned at the start of this article, lazy loading images is as simple as adding a single attribute to your image tag. The `loading` attribute can be set to `lazy` to enable lazy loading on the image. The browser will automatically determine when to download the image based on how close the image is to being on the screen.

```html
<img src="image.jpg" loading="lazy" />
```

All of the images on this page are lazy loaded so you will notice that if you scroll down the page, the images will not load until they are almost on the screen. You can easily see this by viewing the Network tab and filtering to just image requests.

<Tangent>When you look in the Network tab you may notice that each image has a random id attached to it. The reason I did this was because if you load the same image on your page multiple times the browser will only download it once so I added a unique id to each image so the browser would think they are different images and download them individually so you can see the effects of lazy loading in your dev tools.</Tangent>

The biggest downside to this basic lazy loading is that the user will see a blank space where the image should be until the image is downloaded. It will look something like the below image.

<LazyLoadedImage isBasicFlicker alt="Basic Lazy Load Flicker Example" />

This is not an ideal user experience which is why the rest of this article will show you how to take advantage of lazy loading to show a blurred placeholder image until the full image is downloaded.

## Advanced Lazy Loading

You may have noticed when looking at the dev tools that there were a bunch of really small images being downloaded. These are the blurry placeholder images that are shown until the full image is downloaded and is the first step to creating this advanced lazy loading effect.

To create a blurry placeholder image you just need to generate a super low resolution version of the image. There are many ways to do this, such as, using a service like [BlurHash](https://blurha.sh), manually resizing the image in a tool like [Figma](https://www.figma.com/), or automatically using a tool like [ffmpeg](https://ffmpeg.org/). I will be using ffmpeg to generate the placeholder images for this article since it is the most flexible option and can be automated easily. All I had to do was run the below code on the command line within the directory containing the image I wanted to generate the placeholder image for.

```bash
ffmpeg -i imageName.jpg -vf scale=20:-1 imageName-small.jpg
```

This will generate a placeholder image that is 20 pixels wide and the height will be automatically calculated to maintain the aspect ratio of the original image. You can change the width to whatever you want, but I found that 20 pixels works well for most images and is small enough that it will load nearly instantly even on slow internet connections. My placeholder images were less than 1kB each.

The next step is to create a div and set the background image of that div to our super small image. This will be the placeholder image that is shown until the full image is downloaded. Our code will look something like this.

```html
<div class="blurred-img"></div>
```

```css
.blurred-img {
  background-image: url(imageName-small.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}
```

<LazyLoadedImage isAlwaysLoading noLoadingAnimation />

Most likely your image will not be as large as mine since the `blurred-img` div is sized based on the size of the content in it. We can easily fix this, though, by adding the `img` into our div and making sure to hide it by default so we never see it in a half loaded state.

```html
<div class="blurred-img">
  <img src="imageName.jpg" loading="lazy" />
</div>
```

```css
.blurred-img img {
  opacity: 0;
}
```

This will give us the effect we are looking for. The blurred effect we are getting automatically is because the super small image is being scaled up automatically by the browser. If you wanted to add more blur you could always use the CSS filter property to add a blur filter to the `blurred-img` div. I personally, don't think this is needed, though.

```css
.blurred-img {
  filter: blur(10px);
}
```

You can even take this a step further by adding in a pulsing animation to the placeholder image. This will make it even more obvious that the image is loading.

```css
.blurred-img::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: pulse 2.5s infinite;
  background-color: white;
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
  }
}
```

<LazyLoadedImage isAlwaysLoading />

Now the only thing left to do is to fade in the full image once it is loaded. This is a little bit more complicated than the rest of the code we have written so far, since it requires us to use JavaScript, but it is still pretty simple. We just need to add an event listener to the image that will fire once the image is loaded and then we can fade in the image.

```html
<div class="blurred-img">
  <img src="imageName.jpg" loading="lazy" />
</div>
```

```js
const blurredImageDiv = document.querySelectorAll(".blurred-image")
const img = blurredImageDiv.querySelector("img")
function loaded() {
  blurredImageDiv.classList.add("loaded")
}

if (img.complete) {
  loaded()
} else {
  img.addEventListener("load", loaded)
}
```

```css {27-30, 34, 37-39}
.blurred-img {
  background-repeat: no-repeat;
  background-size: cover;
}

.blurred-img::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0;
  animation: pulse 2.5s infinite;
  background-color: var(--text-color);
}

@keyframes pulse {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
  }
}

.blurred-img.loaded::before {
  animation: none;
  content: none;
}

.blurred-img img {
  opacity: 0;
  transition: opacity 250ms ease-in-out;
}

.blurred-img.loaded img {
  opacity: 1;
}
```

This is a lot of code so I will break it down step by step. In the JavaScript code we are selecting the `blurred-img` div and then selecting the `img` within that div. We are then checking the `complete` property of the `img` to see if it has loaded yet. If this is true it means the image has already loaded so we can just call the `loaded` function. If it is false, though, we need to add an event listener to the `img` that will fire once the image is loaded and then call the `loaded` function. The `loaded` function simply adds the `loaded` class to the `blurred-img` div.

In the CSS we have a few changes to the code. First we removed the `animation`/`content` from the `blurred-img::before` element. This will stop the pulsing animation once the image is loaded. We also added a `transition` to the `img` element so that it will gently fade in when the `loaded` class is added to the `blurred-img` div. Lastly, we change the opacity of the `img` to 1 so it is visible when it is loaded.

Doing all of this will result in the following image that will load a blurred placeholder image until the full image is loaded and then fade in the full image. You can play around with your network speed in the dev tools to see the loading animation in action.

<LazyLoadedImage />

## Conclusion

Lazy loading images is a pretty simple technique that can be used to improve the user experience of your website. The simplest version of lazy loading only takes a single line of code, but it can be expanded to some pretty neat loading techniques with not too much additional code.
