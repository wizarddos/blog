---
layout: post
title: My favourite VSCode extensions
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

Hi there, what's up.

In our coding journey, we use many tools. Compilers, libraries, browsers, IDEs and **code editors**

Some are provided, "as is" while others have powerful modding community. They add new extensions pretty much every day

And that's what I'd like to talk about today - I'll present you with my personal must-haves in VSCode setup

<!--more-->

## 1. Path Intellisense

Have you ever worked with such complex codebase, that you've forgotten the path for some important library
That's where [Path intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense) shows its strength

Instead of searching painfully through VSCode's search bar - just start typing the path and it will do the rest. Using `Enter` key we can autocomplete even the most complex paths 
![Demo usage](https://i.giphy.com/iaHeUiDeTUZuo.gif)

And it looks just like built-in code autocompletion

## 2. GitHub Pull Requests

While working on open-source projects, it can be painful to jump around between editor and browser just to see whether something was assigned for us or check constantly non-urgent specifics of a code

With [this extention](https://marketplace.visualstudio.com/items?itemName=GitHub.vscode-pull-request-github) our `Alt` and `Tab` keys will rest, as we have all comments, contents and updates from github pull requests and issues in the same place

![demo](https://github.com/Microsoft/vscode-pull-request-github/raw/HEAD/.readme/demo.gif)

## 3. Better Comments

Name sounds simple, but hear me out.
We've all seen comments like
```js
// TODO: Get this function to run in a loop
```

It's worse, when comments get blended with each other
```js
// * This is very important - don't change a single space here
// ? Should we really expose our private API key?
// TODO: Fix this
// ! Some functions used here are deprecated
```

That's where [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments) clears is for us.
Instead of mono-coloured comments, that easily disappear in the code, we get perfect contrasting view of what's important in threre.
![Demo of this extention](https://github.com/aaron-bond/better-comments/raw/HEAD/images/better-comments.PNG)

## 4. Auto Rename Tag

I think, if you've made something big with HTML, you definitely know this feeling

You work on an enormous file, but then you notice in one place a `<div>`, that should be replaced by `<section>`

You fix it, but then hey - where is the closing tag?

Then we spend a bit of time, looking through the whole code to find this little tag - do we need to?

Not really, [Auto Rename Tag](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag) will do it for us in real time

![Working demo](https://github.com/formulahendry/vscode-auto-rename-tag/raw/HEAD/images/usage.gif)

## 5. Theme extensions

This is entirely up to you. While some love default VSCode theme, some prefer to explore and find colour composition that suits them better

Or maybe they're just used to other editor like `Atom` or `Sublime`, which both have totally different color schemes

My choice is either `Monokai Dimmed` from default library or [`Material Theme`](https://marketplace.visualstudio.com/items?itemName=Equinusocio.vsc-material-theme)

To change these, click settings button in bottom left corner - choose Themes and then color theme

In addition to color theme, I also personalised my icons with [Material Icon Theme](https://marketplace.visualstudio.com/items?itemName=PKief.material-icon-theme)

It's swarming with different icons, and also changes folder's icon based on their name. So `assets` directort will look completely unlike `scripts`


## Conclusion

I hope this article showed you new, amazing add-ons for VSCode to totally increase your productivity and lower time spent on simple task

Maybe you've got some of your favourites, that weren't mentioned? I'll for definitely check them out

Thanks for reading. Take a look at  these cool pieces as well
- [Infinite Scroll in AJAX and PHP](https://wizarddos.github.io/blog/programming/2024/04/02/php-javascript-ajax-fetch-infinite-scroll.html)
- [Cleaning spaghetti code in PHP](https://wizarddos.github.io/blog/programming/2024/02/23/cleaning-spaghetii-code-in-php.html)
- [PHP course in general](https://wizarddos.github.io/blog/series/php_0_to_hero.html)

That's it, see you next time