---
layout: post
title: "5 Less-Known HTML Tags You Should Be Using"
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

Hello, long time no see huh? 

This time, we'll focus on HTML again.
While scrolling on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) one day, I decided to look for less known tags.
You know, everyone uses `<div>`, `<p>`, `<span>` but have you ever heard of `<wbr>` or `<mark>`? No?
<!--more-->
So let's get started

## 1. `<wbr>` -  Line Break Opportunity element

`<wbr>` tag allows us as coders to choose, where HTML should break the line, when block size is too small to show entirety

```html
<div class ="resizable-div">
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.<wbr> 
  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  <wbr> 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.<wbr>
  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. <wbr>
  Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</div>
```
Right now, this text will break on `<wbr>` and not as it wants to
Add CSS, so it can be resizable
```css
.resizable-div{
  resize: horizontal;
  overflow: hidden;
  width: 40%;
  border: 5px dashed #111;
}
```
Wanna run it? [Codepen is here!](https://codepen.io/wizarddos/pen/xxNRgMw)

`<wbr>` is a **void element** so it doesn't have any closing tag ([more about void elements and trailing slashes here](https://wizarddos.github.io/blog/programming/2024/04/19/why-some-elements-dont-have-ending-tag.html))
It's also supported by browsers

Wanna read more: [specs](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-wbr-element) and [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/wbr) are your friends

## 2. `<details>`  and `<summary>`- A widget perfect for FAQ and explanations

This element allows us to create nice-looking accordions without need for JS 
It's also nice for Q&A on websites and FAQ sections

To make a "heading" for `<details>` we use `<summary>` tag. It defines a label for the element

Let's create one right now
```html
<details open>
  <summary>Does it work?</summary>
  <p>Yes it does, amazing isn't it</p>
</details>
<details>
  <summary>And will it work as well as the first one?</summary>
  <p>As always, it works and looks fire</p>
</details>
<details>
  <summary>And just for the sake of being</summary>
  <p>We've got 3 details tags</p>
</details>
```
`open` attribute makes details (as it says), open

Time for a bit of style!
```css
details{
  font-size: 40px;
  padding: 10px;
  border: 1px dashed #ccc;
  width: 20em;
}

details > summary{
    border: 2px solid #ddd;
    width: 15em;
    padding: 1%;
}

details > p::before{
  content: "\00a0\00a0\00a0\00a0"
}
```
It works fine, for now.

To make it real accordion panel, add that little JS there
```js
const details = document.querySelectorAll('details')
const summaries = document.querySelectorAll('summary')

summaries.forEach(summary => {
  summary.addEventListener("click", () => {
    details.forEach(detail => {
      if (detail !== summary.parentNode) {
        detail.removeAttribute("open")
      }
    })

    setTimeout(() => {
      summary.parentNode.setAttribute("open", "")
    }, 0)
  }, false)
})

```

[Wanna try it?](https://codepen.io/wizarddos/pen/GRaNWZx)

And that's about it. This tag is commonly available so there's no need to worry about compatibility

More sources:
- [Specs](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details)

## 3. `<mark>` - Highlighter right in your HTML 

Just like on paper, sometimes you want to point out important pieces of text. 
So, we want to highliht them. In case of physical piece it's easy

But with HTML pages...

As well! `<mark>` element is here to help you. 
It adds yellow highligher to the text. 

```html
<div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus vitae nisi feugiat, porttitor lectus a, cursus massa. Cras eget libero vel nisi porttitor volutpat. <mark>Praesent ultricies nibh porttitor lorem posuere venenatis.</mark>
Donec quis odio eu nisl malesuada dapibus. Aliquam blandit ipsum vel consequat pharetra. Praesent lobortis, nisl nec tempus convallis, turpis nibh auctor quam, quis lacinia dui risus eu lorem.
Duis sapien risus, lobortis in pellentesque eu, malesuada non diam. Aenean blandit ante dui, non mattis enim semper nec. 
</div>
```

[Try it here](https://codepen.io/wizarddos/pen/WNBoLVN)

But with this element, there is one disclaimer

### Accessibility issues

Accessibility while talking about web-dev is frequently ommited by courses. And that's a bit sad.

While `<mark>` adds visual emphasis, it is not announced by screen readers.

For them this
```html
<p> Lorem ipsum dolor sit amet</p>
```

And this
```html
<p>Lorem ipsum <mark>dolor sit</mark> amet</p>
```

Are the same. If we really want to include them in read text, you can add `:before` and `:after` in CSS
```css
mark::before,
mark::after {
  clip-path: inset(100%);
  clip: rect(1px, 1px, 1px, 1px);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

mark::before {
  content: " [highlight start] ";
}

mark::after {
  content: " [highlight end] ";
}

```
[Source: MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark#accessibility_concerns)
{: .subtext}

But don't overuse it! It can add unnecessary confusion and verbosity. 
Utilize it only when highlight is necessary to correctly understand importance of the content.

Sources:
- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/mark)
- [Specs](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-mark-element)

## 4. `<address>` - Semantic tag for all contact data

This one is extremarly useful for grouping.
Even from HTML code, we see with the first glance that such part is an address
```html
<section>
  Do you need something?
  <address>
    Contact me via
    mail: wizarddos.business@gmail.com
    tel: 000 000 000
  </address>
</section>
```

The only limitation that standard suggests is that there should be no heading or sectioning content (So no `<h1>` or `<article>` tags)

Sources:
- [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/address)
- [Specs](https://html.spec.whatwg.org/multipage/sections.html#the-address-element)

## 5. `<q>` - Short inline quotation

If you need to include one simple verse from your favourite novel, poem or just an article you've found online - `<q>` will be more than glad to help you.

Just like `<blockquote>` it's used for quoting.
But instead of creating new block `<q>` mixes itself with text
```html
<div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  <q>Praesent ultricies nibh porttitor lorem posuere venenatis.</q>
Donec quis odio eu nisl malesuada dapibus. Aliquam blandit ipsum vel consequat pharetra. Praesent lobortis, nisl nec tempus convallis, turpis nibh auctor quam, quis lacinia dui risus eu lorem. 
</div>
```

It also adds those little quotes (`"`) to the cited part. Talking about citing, you can add sources with `cite` attribute
```html
<div>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit.  <q cite = "https://wizarddos.github.io/blog">Praesent ultricies nibh porttitor lorem posuere venenatis.</q>
Donec quis odio eu nisl malesuada dapibus. Aliquam blandit ipsum vel consequat pharetra. Praesent lobortis, nisl nec tempus convallis, turpis nibh auctor quam, quis lacinia dui risus eu lorem. 
</div>
```
[Try it out!](https://codepen.io/wizarddos/pen/MWdbLVo)

`cite` is purely to point out source. It does not create a link

Sources:
 - [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/q)
 - [Specs](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-q-element)


And that's pretty much about it


## Conclusion and afterword

Thanks for reading. I hadn't written anything for a while as I've been busy with some other stuff (Like 2 CTFs I took part in heh)

Now I'm trying to get back to and and I'm excited to see what you think.

I hope you enjoyed this piece and that you've learned something new.
Don't forget to leave something positive behind you and subscribe to my newsletter (in the navbar) so you won't miss anything from this blog, [my infosec blog](https://wizarddos-infosec.netlify.app/) and my new [YouTube channel](https://www.youtube.com/channel/UCD-VbKkyKOcC3VTenqDCLig)

Also, what should I write/recorde next about? I'm open for any ideas

Check out other posts such as
- [Trailing slashes in HTML and void elements. Are they important?](https://wizarddos.github.io/blog/programming/2024/04/19/why-some-elements-dont-have-ending-tag.html)
- [Quick intro to React](https://wizarddos.github.io/blog/programming/2024/05/15/quick-intro-to-react.html)
- [Infinite scroll in PHP and JavaScript](https://wizarddos.github.io/blog/programming/2024/04/02/php-javascript-ajax-fetch-infinite-scroll.html)

And that's it. See you next time!