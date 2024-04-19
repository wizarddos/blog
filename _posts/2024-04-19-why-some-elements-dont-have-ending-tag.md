---
layout: post
title: "When less is more: Understanding void elements in HTML."
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

As web-developers we code (or used to code) pretty frequently in HTML.
Within HTML, you've seen some elements, that have a closing tag
```html
<div></div>
```

But some, don't
```html
<br>
```
or
```html
<br />
```

Why is that? Let's jump right into it
<!--more-->

### Search in the best source - non-closing tags

Elements without closing tag are called **void elements**

We'll seek knowledge in [HTML Specifications](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)
> Void elements only have a start tag; end tags must not be specified for void elements.
>
> [...]
>
> Void elements can't have any contents (since there's no end tag, no content can be put between the start tag and the end tag).

This answers your question: void elements don't have any content.
Technically, I could end it here but

### Should we add `/` in void elements
Which one should we choose
```html
<br>
```

Or
```html
<br />
```
There have been numerous discussions online about it - some people add slash, some don't

What's in the [docs](https://html.spec.whatwg.org/multipage/syntax.html#start-tags) again?
> [...] there may be a single U+002F SOLIDUS character (/), which on foreign elements marks the start tag as self-closing. On void elements, it does not mark the start tag as self-closing but instead is unnecessary and has no effect of any kind. For such void elements, it should be used only with caution — especially since, if directly preceded by an unquoted attribute value, it becomes part of the attribute value rather than being discarded by the parser.

(for context: [foreign elements](https://html.spec.whatwg.org/multipage/syntax.html#foreign-elements) are ones from SVG or MathML namespaces)

According to specs: trialing slashes are fully optional in void tags and have no effect, but might cause issues later on.

Why is it even there in the first place? For **backward compatibility**

Currently used HTML version is HTML5 - but your documents can also be rendered in other modes 

There used to be a standard called **XHTML** - a mashup of HTML and XML

In there, these slashes were obligatory. 
If slashes went missing, XHTML parser could not distinguish whether such tag closes or is it missing a closing one.

## Final verdict

This might be disappointing but... **use whatever you want to**!

For some people, not writing that slash can save time
Some people prefer the trailing slash because it makes the code more readable, as it clearly marks the end of the tag.

Personally, I'm a fan of a second option

### Conclusion

Thanks for reading, I hope you've learned something new. I wrote this article pretty quickly, but had to find a lot of data

As a little fun fact, I can tell you that `<p>` tag used to be void, as it indicaited space between the paragraphs - not paragraphs themselves.

Subscribe to my newsletter in the navbar, check out other articles too such as

- [Infinite scroll in Ajax and JS with Fetch](https://wizarddos.github.io/blog/programming/2024/04/02/php-javascript-ajax-fetch-infinite-scroll.html)
- [My favourite VSCode extenstions](https://wizarddos.github.io/blog/programming/2024/04/14/my-personal-favoutrite-vscode-extensions.html)
- [PHP course](https://wizarddos.github.io/blog/series/php_0_to_hero.html)

And see you next time