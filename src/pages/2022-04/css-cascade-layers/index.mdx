---
layout: "@layouts/BlogPost.astro"
title: "How To Use CSS Layers"
date: "2022-04-18"
description: "CSS layers change how the cascade works and it makes writing clean CSS code so much easier."
tags: ["CSS"]
---

One of the hardest parts of working with CSS is dealing with specificity. This is especially apparent if you are trying to overwrite styles from a framework like Bootstrap, but that is all changing with the introduction of CSS layers. This new feature allows you to create your own custom CSS layers that determine the specificity hierarchy of all CSS code for the first time ever. In this article I will be dissecting what this means for you, how it works, and how you can start using it today.

_If you prefer to learn visually, check out the video version of this article._
`youtube: Pr1PezCc4FU`

## What Are Layers?

The ability to create your own custom layers is new to CSS with this features, but layers are something that have been around in CSS since the beginning. There are 3 different layers in CSS that govern how all styles work.

1. Browser (also known as user agent) styles
2. User styles
3. Author styles

Browser styles are the default styles applied to your browser. This is why buttons in Chrome and Safari look different. The styles found in the browser layer are different between browsers and give each browser a unique look.

The next layer is user styles which is not really something that you have to worry about. These are generally custom styles that users can write and inject into their browser, but that is not really supported anymore by browsers. There may be some browser settings that users can change which will add styles to this layer, but for the most part this layer can be completely ignored.

Finally, we come to the author layer. This is the layer you are most familiar with since every piece of CSS code you write falls within this layer.

The reason these layers are separate is because it makes overwriting the code defined in browser styles and user styles very easy since layers define their own hierarchy that completely ignores specificity.

_It is at this point that I should mention that if you are not familiar with CSS specificity already then this article may be difficult to follow. I would recommend checking out my [ultimate CSS specificity guide](/2020-02/css-specificity) first and then come back to this article. You can also download my [free CSS selector cheat sheet](https://webdevsimplified.com/specificity-cheat-sheet.html) if you want to really master specificity and all CSS selectors._

The 3 CSS layers are ordered (browser styles, user styles, then author styles) and every style in a later layer will override any style from a previous layer no matter the specificity. That means that even if the browser styles defined a super specific selector such as `#button.btn.super-specific` and your author styles defined a super generic selector such as `button` your author styles would still override the browser styles.

This is actually already something you probably use all the time without realizing it.

```css
* {
  box-sizing: border-box;
}
```

The above selector has no specificity since the `*` symbol does not contribute to specificity. This means the browser styles for a p tag, for example, which use `p` as their selector are technically more specific than the `*` selector. This doesn't matter, though, since the author styles are in a layer that comes later than the browser styles layer so your code will **always** override the browser styles.

Understanding this is crucial since with this new layers API you can create your own layers within the author layer to make working with specificity much easier.

## How To Create Your Own Layers

So far we have talked a bunch about how layers work, so now let's jump into actually creating our own custom layers. The code to do so is actually quite easy.

```css
@layer one {
  #button.super-specific-selector {
    color: red;
  }
}

@layer two {
  button {
    color: green;
  }
}
```

As you can see above we are just using the `@layer` keyword to create a custom layer, giving it any name we want, and then putting all our CSS code inside curly brackets, `{}`. The code we wrote above creates two layers that are entirely separate from one another, and since we define layer `two` second it is considered more specific in the layer hierarchy. This means all styles in layer `two` will override styles from layer `one` no matter the specificity. If we had a button on our page that matched both selectors it would have green text since layer `two` defines the color as green. If we take a look at our layer hierarchy it would look something like this.

1. Browser styles
2. User styles
3. Author styles
   1. one
   2. two

As you can see we created two new layers within our author styles which we can use to organize our code and make working with specificity easier.

Now this is the most basic way to create layers, but there are multiple ways to use and create layers depending on your exact needs.

### Appending To Layers

The first layer concept I want to talk about is how you can add code to existing layers.

```css
@layer one {
  #button.super-specific-selector {
    color: red;
  }
}

@layer two {
  button {
    color: green;
  }
}

@layer one {
  .another-style {
    color: blue;
  }
}
```

In this example you can see I have defined layer `one` twice. This is perfectly ok and is actually how you add more styles to a layer after it has been created. Doing this does not affect the order of layers since the order of layers is determined from the first piece of code that creates the layer. That means our first instance of layer `one` at the top of the CSS file will create the layer so our layer order in this example is the same as in the previous example. The only difference is we were able to add extra styles to layer `one` after it was created by just using the `@layer` keyword again.

### Defining Layer Order

This ability to add styles to layers after creating them is incredibly useful when it comes to defining layer orders. Imagine you have the following layers.

1. Framework
2. Base
3. Components
4. Utilities

Most likely you want to define these layers in the order above since you want your utility code to override the framework code and so on. With layers you can use one line of code to define the order of all your layers.

```css
@layer framework, base, components, utilities;
```

All you need to do is write the `@layer` keyword followed by a comma separated list of layers. This will define all your layers in order from left to right where the first layer listed is the least specific and the last layer specified is the most specific. Then you can use the normal `@layer` syntax later to add code to each layer without having to worry about the order in which you define the layers since they are all defined in this single line. It is important to note, though, this line of code must come before you define any of your layers so I generally have this as the first line in my CSS file.

## Importing Layers

Often times when you are working with a framework you may be importing it into your CSS like so.

```css
@import url("bootstrap.css");
```

If you want to add all this imported code to a specific layer you can do so by just adding `layer(layer-name)` to the end of your import statement.

```css
@import url("bootstrap.css") layer(framework);
```

This adds all the styles from `bootstrap.css` to the `framework` layer. One thing about using imports, though, is that they are not very performant since first you need to download the stylesheet that has the `@import` statement and then the browser can download the imported file. One way you can get around this is by using the `style` tag in your HTML.

```html
<!-- link tag to stylesheet that define your layers -->
<link rel="stylesheet" href="styles.css" />
<style>
  @import url("bootstrap.css") layer(framework);
</style>
```

By writing your code like this you avoid all the performance issues of `@import` but still get all the benefits of importing directly into a layer.

### Anonymous Layers

If you really want to you can also create layers that have no name.

```css
@layer {
  .button {
    color: red;
  }
}
```

This is not really something I find too useful, but if you really need to separate a small amount of CSS code into a layer this could be useful.

### Nested Layers

Another feature that I don't see being too useful is the ability to nest layers inside one another.

```css
@layer outer {
  @layer inner {
    .button {
      color: red;
    }
  }
}

@layer outer.inner {
  .another {
    color: green;
  }
}
```

By using either the dot syntax or the nested syntax above you can create layers inside other layers. This is something you probably won't use often since most applications will only have a few layers, but if you have a very complex or large style system this could be useful.

## Important Layer Concepts

This covers the basics of creating layers, but there are a few concepts about layers you need to understand to fully utilize layers.

### Non-Layered Styles Are More Specific

So far we have only dealt with CSS where all of our styles are in layers. Things get a bit more complicated when you have styles that have no layer.

```css
@layer base {
  #button.super-specific {
    color: red;
  }
}

button {
  color: green;
}
```

In this example we have a `base` layer and then a style that has no layer. When you have code that is not in any layer it is considered to always be more specific than layered code. This means our button would have green text. To make this easier to understand I like to think of code that is not in any layer to be considered as if it was in its own layer that is defined after all other layers.

1. Browser styles
2. User Styles
3. Author Styles
   1. Base
   2. Non-Layered Styles

This helps me visualize my code so I can understand why non-layered code always overrides code within layers.

### !Important

The `!important` keyword makes working with specificity difficult and it is no different for layers. The `!important` keyword works in exactly the opposite way of normal layers. If you use the `!important` keyword to define a style it will override any styles that come in layers defined after that layer.

```css
@layer one {
  button {
    color: red !important;
  }
}

@layer two {
  button {
    color: green;
  }
}
```

In the above example the button text will be red since we used `!important` to define the color. If we try to add `!important` to layer `two`, though, to override the `!important` from layer `one` it will not actually change the button color.

```css {9}
@layer one {
  button {
    color: red !important;
  }
}

@layer two {
  button {
    color: green !important;
  }
}
```

The reason for this is because `!important` works in the opposite way of normal layers. Since layer `one` is defined before layer `two` all `!important` styles in layer `one` will override any styles, including `!important` styles, from layer `two`. This means our button will still be red.

This is just one more reason to never use `!important`, and with the ability to create layers you really don't need the `!important` keyword anymore.

## Browser Support

With every cool CSS feature you always have to consider browser support, but luckily for us layers are pretty well supported and on their way to perfect support fairly soon. Currently, layers have [62.6% support](https://caniuse.com/css-cascade-layers), but this is mostly just because this feature only very recently rolled out in the newest versions of browsers. Most modern browsers rolled this feature out less than a month ago from the time of writing this article which means we are currently just waiting for users to update their browsers to the latest version to have support for this feature.

## Conclusion

Layers are an incredibly useful CSS feature that is soon going to be in all major browser which is something I cannot wait for.
