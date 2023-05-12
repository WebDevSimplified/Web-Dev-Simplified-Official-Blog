---
layout: "@layouts/BlogPost.astro"
title: How To Effectively Test For Colorblind Accessibility
date: "2019-09-23"
description: "A quick tip on how to easily test any site for colorblind accessibility."
tags: ["Non-Technical Discussion"]
---

If you do not already know, accessibility is the idea of making a site easy to use for people with all forms of disabilities. This could be something as extreme as blindness, or as mild as colorblindness, but it is always something that inhibits normal use of a website. The biggest problem with creating accessible sites is that most developers do not suffer from any of these disabilities, which is why simulating a disability is one of the best and easiest ways to test a site for accessibility. That is where the Chrome extension [Let's get color blind](https://chrome.google.com/webstore/detail/lets-get-color-blind/bkdgdianpkfahpkmphgehigalpighjck) comes in. This extension allows you to simulate various types of color blindness on a website with ease. If you do not use Chrome for your browser there are most likely other extensions for your browser of choice. There are also websites that do this same thing, but they are more cumbersome to work with.

For example, here is the normal Google logo:

![Normal Google Image](/articleAssets/2019-09/colorblind-accessibility-testing/Google_Normal.png)

And here is the same logo with Red-Blind (Protanopia) colorblindness:

![Red-Blind Google Image](/articleAssets/2019-09/colorblind-accessibility-testing/Google_Colorblind.png)

As you can see, the two Os in the middle now look to be almost the exact same color, with one being slightly lighter than the other. This is something that is a huge problem with many websites, because they use color to indicate good/bad or success/failure. If a site's colors look the same to someone with colorblindness that can make it incredibly difficult for them to use that site. The L and E of Google represent a similar problem. The non-colorblind image has the L and E as green and red while the colorblind image has them as grey and yellow. This is a problem if a site relies purely on color to indicate good/bad and success/failure since there is no clear distinction between good and bad in the colorblind image since yellow and grey do not have enough contrast between them. This is why it is incredibly important to indicate good/bad in other ways than just color such as a check mark or X icon.

The best part of using this extension is you can easily test your sites for colorblindness by cycling through the options available without ever needing to refresh your site.

![Let's Get Color Blind App Menu](/articleAssets/2019-09/colorblind-accessibility-testing/Colorblinding_App.png)

While creating a fully accessible site is difficult and time consuming, having tools such as this make taking the necessary steps easier and more enjoyable.

PS: If the extension does not work right when you install it you may need to restart your browser.
