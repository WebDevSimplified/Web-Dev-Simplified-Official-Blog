---
title: "How To Create A VSCode Snippet"
date: "2022-03-07"
description: "Snippets are one of the easiest ways to customize your VSCode experience and in this article I will explain everything you need to know about creating your first snippet."
tags: ['Technical Discussion']
---

Snippets are one of the easiest ways to speed up your coding by making repetitive tasks simpler and quicker. There are hundreds of amazing snippet extensions for VSCode, but chances are the snippet you need will not be in one of these extensions. This is where custom snippets come in. With VSCode you can write your own snippets to fit any need you have and it is surprisingly easy.

*If you prefer to learn visually, check out the video version of this article.*
`youtube: TGh2NpCIDlc`

## What Are Snippets?

Before we talk about writing your own snippet we first need to cover what snippets are. Essentially, a snippet is a small piece of code that you write such as `cl` which will then expand into a full code statement such as `console.log('Here')`. They can be as simple as this example or expand into large amounts of complex code like some react snippet libraries.

For example, the snippet `rfcp` from a popular extension expands into the following.
```jsx
import React from 'react'
import PropTypes from 'prop-types'

function Component(props) {
  return <div></div>
}

Component.propTypes = {}

export default Component
```

## How To Write A Basic Snippet

In order to create a new snippet you need to select the **User Snippets** option within the **File > Preferences** menu. You can also open the command palette and search for **Preferences: Configure User Snippets**.

Once you do this you will be presented with 3 main ways to create a snippets file.
1. A global snippets file that will work across all projects and all languages.
2. A project snippets file that will work only within the current project.
3. A language specific snippets file that will only work for one language.

I personally prefer to use a global snippets file since it will work across all projects and allows me to use the same snippet across multiple languages. This is useful if you want a snippet that works in JavaScript and TypeScript for example. A project specific snippets file is useful if you have some repeated code that you write all the time, but only in one project, such as a shell for a common data type or function.

For our example we will choose a global snippets file. Once you choose that option you will need to enter a name for that file and once you do it will open that new snippets file. This new file is just a JSON object which has a ton of comments in it to explain how snippets work. For now you can remove all the comments so you are left with just an empty object.

For this first basic snippet we are going to take a look at how to create the `cl` snippet mentioned at the beginning of the article. In order to do this we need to create a new entry within our base JSON object where the key is the name of our snippet and the value is an empty object.
```json {2}
{
  "Console Log": {}
}
```
The name can be anything you want, but you must wrap it in double quotes since everything in our snippets file is essentially just JSON.

The next step is to define the `prefix` of our snippet. This is the small amount of text you type that expands into the larger text.
```json {3}
{
  "Console Log": {
    "prefix": "cl"
  }
}
```
Now we just need to define the `body` of our snippet which is what the text expands into.
```json {4}
{
  "Console Log": {
    "prefix": "cl",
    "body": "console.log('Here')"
  }
}
```
If you do this and save this file you will notice that anywhere in VSCode when you type `cl` and hit tab/enter it will expand into `console.log('Here')`. This is great, but you probably don't want this snippet to work in non JavaScript files. This is where the `scope` comes in. The `scope` property can be set to a comma separated list of languages that this snippet will work with.
```json {5}
{
  "Console Log": {
    "prefix": "cl",
    "body": "console.log('Here')",
    "scope": "javascript,typescript"
  }
}
```
In our example, we only want this snippet to work with JavaScript and TypeScript files so we will add those languages to our scope. With that done we now have the most basic snippet possible. The only additional thing we should add is a `description` which is useful when using autocomplete intellisense as it will list the description of the snippet.
```json {6}
{
  "Console Log": {
    "prefix": "cl",
    "body": "console.log('Here')",
    "scope": "javascript,typescript",
    "description": "Log output to the console"
  }
}
```

## Advanced Syntax

Just writing out basic text to the screen is generally not enough for most snippets as you need to customize the output with specific names and/or content. This is where some of the advanced syntax features of snippets come in.

### Tab Stops

If you have used snippets in the past you know that you can press the tab key to cycle through different predefined locations in the snippet to add/remove content. This can be done with the `$1` syntax. The number that comes after the `$` represents the order of the tab stops. The only exception to this rule is `$0` which always represents the last tab stop.
```json {4}
{
  "Console Log": {
    "prefix": "cl",
    "body": "console.log('$1')",
    "scope": "javascript,typescript",
    "description": "Log output to the console"
  }
}
```
With the above code our snippet will now place the cursor automatically inside the console log statement where the `$1` is. If we press tab it will bring us to the very end of our snippet which is the default behavior if `$0` is not specified.

### Placeholders

Often you will want to have some default values in place of your tab stops for common use cases. This can be done with the `${1:default}` syntax. The tab stop number goes before the colon and the default value goes after the colon.
```json {4}
{
  "Console Log": {
    "prefix": "cl",
    "body": "console.log('${1:Here}')",
    "scope": "javascript,typescript",
    "description": "Log output to the console"
  }
}
```
With the above code now when we type `cl` and hit enter it will show `console.log('Here')`, but the entire default value of `Here` will be selected since it is our first tab stop. This means if we type any text it will overwrite the entire default value with what we type.

### Default Choices

Similar to placeholder values you can define a list of valid choices for a tab stop to have. This is useful when you commonly use a small list of values in a specific part of your snippet and want to be able to easily choose the right one. The syntax for this is similar to placeholders `${1|option1,option2|}`. The main difference is that we place all of the choices in a comma separated list between two `|`.
```json {4}
{
  "Console Log": {
    "prefix": "cl",
    "body": "console.${2|log,dir,error|}('${1:Here}')",
    "scope": "javascript,typescript",
    "description": "Log output to the console"
  }
}
```
We have now added a second tab stop that allows us to change the type of console logging we do between `log`, `dir`, and `error`. When we tab over to this second tab stop we will be presented with a list of options to choose from that matches the list we specified. The first option in the list will also be used as the default value for the snippet.

![Open Options List](/articleAssets/2022-03/vscode-snippet/choice-example.png)

Even though this is a predefined list of options you can still type whatever you want instead of choosing one of the options, but the options make it easier to pick from a set of commonly used options.

### Variables

The final useful thing you can do with snippets is add variables into your snippets that will pull their value from a variety of different contexts such as the current file name, selected text, and much more. One of the most common variables to use is the `TM_SELECTED_TEXT` variable which represents the currently selected text. Using a variable works just like placeholder values, but instead of using a number for the tab stop you use the variable name `${TM_SELECTED_TEXT:default}`.
```json {4}
{
  "Console Log": {
    "prefix": "cl",
    "body": "console.${2|log,dir,error|}(${TM_SELECTED_TEXT:'${1:Here}'})",
    "scope": "javascript,typescript",
    "description": "Log output to the console"
  }
}
```
Now this code may look extra confusing, but all we have done is nest a variable and placeholder. The `'${1:Here}'` stays the same as the previous examples, but we now are using that value as the default value for our `TM_SELECTED_TEXT` variable. What this code says is that we should use the currently selected text in this location. If there is no text currently selected then we should instead use the value `Here` by default but have it be our first tab stop for potential changes.

If you save this file, highlight some text in a JS file, type `cl`, and hit enter you will see that the text inside our console log is just whatever text was highlighted before typing `cl`. For example, if I highlight the text `variable` and then type `cl` the output will be `console.log(variable)`.

There are tons of variables you can use with snippets. Here is a [complete list of snippet variables](https://code.visualstudio.com/docs/editor/userdefinedsnippets#_variables).

## Adding A Keybinding

Now sometimes a snippet is so common that you may want to create a keyboard shortcut for it. This is quite easy to do.

First you need to open your keybindings file. This can be found in the **File > Preferences** menu under the name **Keyboard Shortcuts**, or you can use the command palette and search for **Preferences: Open Keyboard Shortcuts**. Once the file is open you will need to click the file icon in the top right corner to swap into the JSON editor for the keyboard shortcuts.

Once in the JSON editor you will see an empty array. Each keybinding will be a single object in the array so in order to add our first keybinding create an empty object in the array.

A keybinding is composed of 3 main properties, `key`, `command`, and `when`. The `key` property represents the keybinding, the `command` represents what should run when the `key` is pressed, and `when` represents when this keybinding is active. For snippets we need to set the `command` to `editor.action.insertSnippet`, and the `when` to `editorTextFocus`.
```json {4,5}
[
  {
    "key": "",
    "command": "editor.action.insertSnippet",
    "when": "editorTextFocus"
  }
]
```
What this is saying is that our keybinding is active anytime we have focus within the text editor window and that it should run the insert snippet command when the keybinding is pressed. You can then set the `key` command to whatever you want.
```json {3}
[
  {
    "key": "ctrl+shift+q",
    "command": "editor.action.insertSnippet",
    "when": "editorTextFocus"
  }
]
```
Now this on its own is not quite enough to run a snippet since we need to tell our keyboard shortcut what snippet to run. This is where the `args` property comes in. The `args` property is an object that will be passed to our command which we can use to specify the name of our snippet.
```json {6-8}
[
  {
    "key": "ctrl+shift+q",
    "command": "editor.action.insertSnippet",
    "when": "editorTextFocus",
    "args": {
      "name": "Console Log"
    }
  }
]
```
It is crucial that the value passed to the `name` property is the same as the snippet name we used. Once this is done you should be able to highlight some text and use your new keybinding to turn that text into a console log statement.

## Conclusion

VSCode snippets are incredibly flexible and amazing for increasing your coding speed. Best of all they are easy to create and use.