---
title: "How To Write Cleaner CSS With BEM"
date: "2020-05-25"
description: "This article covers everything you need to know about BEM in order to start using BEM to clean up and organize your CSS styles."
---

If you have worked with CSS for any amount of time, then you know that inheritance, specificity, and naming are some of the hardest things to deal with. Since all CSS is global, as your codebase grows it becomes harder and harder to prevent your styles from clashing with each other and causing unintended side effects. This issue is compounded by the fact that naming css classes is already difficult and handling CSS specificity across an entire codebase is nearly impossible. Luckily, there are solutions to these problems. One of the more popular solutions is a style of coding called Block Element Modifier which is more commonly referred to as BEM.

## What Is BEM?

BEM was created to help alleviate many of the issues around naming, specificity, and inheritance by being a set of guidelines which force you to create CSS in a way that avoids specificity and inheritance issues. This is done by using a special naming convention which is broken into three different parts. Blocks, Elements, and Modifiers. In order to explain how this all works, let's use the following navbar HTML as an example.
```html
<nav>
  <span>Brand Name</span>
  <ul>
    <li>Pricing</li>
    <li>Contact</li>
  </ul>
</nav>
```

### Blocks

In terms of BEM this entire navbar would be considered a block. This is because a block is any standalone component on a page. This could be anything, such as, a button, an input, or even a full widget style card. In order to name a block you must use only letters, numbers, or hyphens to denote the name. Essentially, the naming of a block follows standard CSS naming conventions. In our case, we will call this navbar block `.navbar`. This now gives us the following HTML.
```html {1}
<nav class="navbar">
  <span>Brand Name</span>
  <ul>
    <li>Pricing</li>
    <li>Contact</li>
  </ul>
</nav>
```
So far, this probably looks just like how you would normally apply CSS naming, but when we add in elements things start to look quite a bit different.

### Elements

If a block is any standalone component on the page, then an element is any component/part in a block that cannot stand on its own. For example the list in our navbar is tied directly to our navbar and cannot stand on its own since it does not make sense for it to be outside the navbar. Because of this, the list would be considered an element inside our navbar block. The brand name span is also an element in this block since again it is tied directly to the block and is not its own component.

Here is where the naming starts to differ from what you are most likely used to. Since we know that elements are always tied to a particular block, we can take advantage of that in our naming. To name an element you must prefix it with the name of the block followed by two underscores. For example, these elements would be prefixed with `.navbar__` since our block is called `.navbar`. After the prefix, our naming follows normal CSS naming standards just like the block. Here is an example of our CSS with all elements properly named.
```html {2-5}
<nav class="navbar">
  <span class="navbar__brand-name">Brand Name</span>
  <ul class="navbar__list">
    <li class="navbar__list-item">Pricing</li>
    <li class="navbar__list-item">Contact</li>
  </ul>
</nav>
```
As you can see each of our elements are prefixed with the block name which makes it completely clear which component each element is a part of. You will also notice that the list items do not contain the selector their parent as a prefix (`.navbar__list__list-item`). This is because in BEM, you do not need to care about the hierarchy of elements when creating names. The only thing you need to worry about is which block an element is inside of. This helps make names clearer and easier to read/write.

### Modifiers

The final part of BEM are the modifiers. These modifiers are essentially like themes, because they can be applied to any element or block in order to change the look of the element or block. Common use cases for modifiers are things like primary/danger buttons, active states, and big/small text. In our above example some modifiers we could have would be a dark theme for our navbar block, as well as, an active theme for the active item in the list.

In order to name a modifier all you need to do is take the entire selector for the block/element you are modifying, add two hyphens, and then use that as the prefix for the selector. For example to modify the `.navbar` block you would use the prefix `.navbar--`. After this prefix we again can use normal CSS naming standards just like with blocks and elements. Here is our complete HTML if we add a dark theme for the nav and an active theme for one of the list items.
```html {1,4}
<nav class="navbar navbar--dark">
  <span class="navbar__brand-name">Brand Name</span>
  <ul class="navbar__list">
    <li class="navbar__list-item navbar__list-item--active">
      Pricing
    </li>
    <li class="navbar__list-item">Contact</li>
  </ul>
</nav>
```
You will notice that instead of overriding the block/element selector with the modifier, we actually add a second selector just for the modifier. This makes it so that we can use all the base styles of the normal block/element selector, and we only have to override the individual styles we want to change in the modifier.

## Why Is BEM Useful?

If you are anything like me, then you are probably looking at this HTML and thinking it is a giant mess of class names. There better be some serious benefits to this naming to justify the ugly code it produces. Luckily, there are quite a few major benefits.

### Never Worry About Specificity Again

With BEM, since every name is prefixed with the block it is inside, or the block/element it is modifying there is no need to ever nest styles or use multiple CSS classes in a single selector. This is actually a rule of BEM. You should never nest selectors or select anything other than one single CSS class in your CSS files. This makes it so that every single selector has the same specificity so you never have to worry about specificity. For example, the following CSS selectors would be used for our navbar.
```css
.navbar {}
.navbar--dark {}
.navbar__brand-name {}
.navbar__list {}
.navbar__list-item {}
.navbar__list-item--active {}
```
This rule actually helps with inheritance as well.

### Fixes Inheritance Issues

Have you ever worked in a codebase where someone created a CSS style for `.active`? If so, then you have probably seen firsthand the pain of inheritance in CSS, because now everywhere you try to use the `.active` class you are stuck with the styles from the `.active` selector even if you do not want them. This is a common problem when writing CSS that uses classes like this.
```html
<button class="active primary large">Bad Idea</button>
```
Generally, to get around this problem most people will use another class such as `.btn` which they combine with the other selectors to make them more unique.
```html
<button class="btn active primary large">Bad Idea</button>
```
This then would give you CSS selectors like the following.
```css
.btn {}
.btn.active {}
.btn.primary {}
.btn.large {}
```
This helps solve polluting the global namespace with generic class names like `.active`, but it still doesn't fix inheritance. What happens if you have a navbar list item that is a button and also active.
```html
<button class="btn list-item active">Overlap!</button>
```
```css
.btn {}
.list-item {}
.btn.active {}
.list-item.active {}
```
As you can see we now have overlap between out `.btn.active` and our `.list-item.active` selectors. Are we saying the `.btn` is active, the `.list-item` is active, or that both are active. The above HTML has no way to distinguish between which is active and not, which is a very common problem to run into when writing CSS.

### Stop Worrying About Naming

Since BEM has a set naming convention you never have to worry about naming elements in a way that will guarantee uniqueness across your entire application. BEM's naming convention does all the hard work in making sure your names are unique so you never have unexpected clashes to worry about. When coding without BEM it is hard to use short names, such as, `list-item` since this same name could be used to describe a list item in a navbar, a sidebar, or even an accordion list. This leads to names, such as, `navbar-list-item` or `accordion-list-item`, but there is no consistent convention so different developers will most likely use slightly differing naming conventions. With BEM you never have to worry about any of this.

## Conclusion

Writing CSS is hard enough on its own without having to worry about managing a global namespace, inheritance, and specificity. With BEM you can get rid of all your worries around global namespaces, inheritance, and specificity, so you can focus your attention on actually writing CSS and not fighting it.