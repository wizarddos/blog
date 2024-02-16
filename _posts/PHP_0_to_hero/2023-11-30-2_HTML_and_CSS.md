---
layout: post
title: HTML and CSS Basics - PHP 0 to hero pt.2
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
permalink: /programming/php_0_to_hero/2
is_series: true
series_title: "php_0_to_hero"
part: 2
---

What's up? That's me again - Welcome in another part of this course

Yet today, we won't be still using PHP - There is one thing left
So let's go - You will get the meaning of this article whilst reading it
<!--more-->

PHP is server-side language - this means that our code is executed on server, and then what that server generated is sent to us

But, because browsers can't interpret PHP code they have their own languages - that's what we will be learning today

Yes, I'll introduce you to basics of HTML and CSS - as it can be helpful in PHP web development, and to create a fully working website later, we'll definetely use it.

If you know something about them - you can skip this article. This will be nothing more than just the basics

And important note - this article isn't meant to replace typical HTML and CSS course. My goal is to familiarize you with HTML's and CSS' syntax, not to teach every concept of those languages. 

So, when we have this explained - off we go

## Basic terms and concepts

So, HTML is also an acronym - it stands for `Hypertext Markup Language`. Using it, we create frame for our website. Let's say it's skeleton
About `Hypertext` part, and what does it mean, we will learn in the future

In HTML code consists of elements, ex.
```html
<p>Some fancy text</p>
```
This creates a paragraph with `Some fancy text` inside it.
Element itself consists of 3 parts 
 - opening - `<p>` tag
 - content - `Some fancy text`
 - closing - `</p>` tag

Basically if tag has `/` in it - this is a closing one
Some elements (called void elements) don't need a closing tag - as they [don't have any contents](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)

That's why we have elements without closing - such as `<br>` (Break Line)

```html
<br>
```

Some programmers (with me included) add `/` to this elements, even though it's optional. Like this
```html
<br />
```

Both forms are correct and understandable for the browser

Another language we will learn is `CSS` - it stands for `Cascading style sheets`. This is language responsible for giving site colors, positioning elements and simple animations. 
On it's own - you can't do much with CSS. 
But if we add HTML - then 'magic' will occur

CSS is formed of a bunch of selectors and declaration blocks which tell browser, how should it display website. that's  the example
```css
p{
    color: red;
}
```

First - we declarate what do we want to style (selector)
Second - we open braces (Declaration Block)
Third - we write our declarations. Each consists of property (like `color` here) and value (here, `red`) separated by colon  (`: `)

Some take numerical values, some text ones, some only specified ones

This article will only be a quick introduction - not the full crash course. If you want to learn more, you can check [MDN](https://developer.mozilla.org/en-US/) - that's one of the best source (In my opinion) on the internet 


But that's it - let's get to the basics

## HTML

HTML document has strict structure - It starts with `<html>` tag and has 2 parts - `<head>` and `<body>` - they have to be inside it

If anywhere in the code you see string of this format
```html
<!-- -->
```
### File structure

You will also see here `<!DOCTYPE html>` preamble - here I think that quote from [specification](https://html.spec.whatwg.org/multipage/syntax.html#the-doctype) will be the best explanation

>DOCTYPEs are required for legacy reasons. When omitted, browsers tend to use a different rendering mode that is incompatible with some specifications. Including the DOCTYPE in a document ensures that the browser makes a best-effort attempt at following the relevant specifications

So - basic template looks like this
```html
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
    </body>
</html>
```

Now - we have 2 sections

- `head` - That's what we can't see. Here you include CSS, declarate title, and information like site description etc.

- `body` - And this is what we see - that's the place where whole content is located - here we place paragraphs and other elements

### Headings

HTML has built-in headings

They not only make text larger - they also help semantically, with maintenance of code clarity, and add cool margins

We have 6 types of headings - 1 is the biggest, 6 is the smallest

```html
<h1>Some header</h1> <!-- The biggest one -->
<h2>Some header</h2>
<h3>Some header</h3>
<h4>Some header</h4>
<h5>Some header</h5>
<h6>Some header</h6> <!--The smallest one -->
```

Let's create a new file called `index.html` and add the biggest one there
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Learn HTML</title>
</head>
<body>
    <h1>Lorem Ipsum</h1>
</body>
</html>
```

`<meta>` I added here sets encoding for this website - we secure that every character will display as it should
### Text 

To paste simple text - you don't need any special elements. 
But there are some which will definitely help you

1. `<p>` - it stands for `paragraph`. The simplest block of text
If we need to split 2 parts of text with new line (Like `Enter`) we use `<br>`

As I mentioned before - it doesn't have closing tag. So our paragraph with some breaks looks like this - add it below heading to our page
```html
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Duis mattis gravida dui vel scelerisque. 
    Aenean suscipit pharetra felis vel efficitur. 
    Vivamus justo dui, accumsan et lacinia vel, scelerisque at turpis.
    <br /><br />
    Quisque tincidunt, ipsum vel venenatis porta, mauris odio lacinia enim, 
    quis finibus libero odio et leo.
    Maecenas sit amet quam id elit pharetra ultrices
    ultrices consequat tortor. 
    Etiam gravida nulla ut nunc tempus, condimentum dictum orci ultrices.
</p>
```

And in browser we see


![Paragraph with heading](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h96qlmbhotcp75m4y23x.png)


I purposefully scaled it in browser (it's 200%) - for better view

But, let's say that `Lorem Ipsum` string is so important, that it has to have another color - here `<span>` tag comes in handy

We can use it to group elements, for example for styling purposes 

So now, out code looks like this
```html
<p>
    <span class = "LoremIpsum">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. 
    Duis mattis gravida dui vel scelerisque. 
    Aenean suscipit pharetra felis vel efficitur. 
    Vivamus justo dui, accumsan et lacinia vel, scelerisque at turpis.
    <br /><br />
    Quisque tincidunt, ipsum vel venenatis porta, mauris odio lacinia enim, 
    quis finibus libero odio et leo.
    Maecenas sit amet quam id elit pharetra ultrices
    ultrices consequat tortor. 
    Etiam gravida nulla ut nunc tempus, condimentum dictum orci ultrices.
</p>
```
When we add CSS we will make this `span` to be different

What does `class` mean? You will learn in the next big part - about CSS

2. `<a>` - hyperlink. This tag allows user to move between different pages - it takes one attribute - `href` - the address where link will take user

Syntax:
```html
<a href="some address">Link</a>
```

So if we want to add this to our paragraph - It can look like this
```html
<p>
    <span class = "LoremIpsum">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. 
    Duis mattis gravida dui vel <a href="https://dev.to">scelerisque.</a>
    Aenean suscipit pharetra felis vel efficitur. 
    Vivamus justo dui, accumsan et lacinia vel, scelerisque at turpis.
    <br /><br />
    Quisque tincidunt, ipsum vel venenatis porta, mauris odio lacinia enim, 
    quis finibus libero odio et leo.
    Maecenas sit amet quam id elit pharetra ultrices
    ultrices consequat tortor. 
    Etiam gravida nulla ut nunc tempus, condimentum dictum orci ultrices.
</p>
```

![Working link](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nr8cxr378c79dwk0ab95.png)



Now if we click on `scelerisque.` it will redirect us to `dev.to` main page - and when we go back it will change color of link like this

![Visited link](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1rm7gz8nvpy6dnwrjcji.png)


These are basic HTML elements for displaying text - If I missed some I'll explain then while coding

But we have 2 more things to learn about html

### Blocks

We have the text - but aligning it properly is a nightmare, isn't it?

It isn't - that's where blocks come in handy. It's easier to align blocks rather than some irregular shapes

One basic block is `<div>` - until we add CSS to it, it does nothing. But with styling, we can align it as we wish

So, duplicate that paragraph and put them both inside `<div>` with `content` class

```html
<div class = "content">
        <p>
            <span class = "LoremIpsum">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. 
            Duis mattis gravida dui vel <a href="https://dev.to">scelerisque.</a>
            Aenean suscipit pharetra felis vel efficitur. 
            Vivamus justo dui, accumsan et lacinia vel, scelerisque at turpis.
            <br /><br />
            Quisque tincidunt, ipsum vel venenatis porta, mauris odio lacinia enim, 
            quis finibus libero odio et leo.
            Maecenas sit amet quam id elit pharetra ultrices
            ultrices consequat tortor. 
            Etiam gravida nulla ut nunc tempus, condimentum dictum orci ultrices.
        </p>
    </div>
    <div class = "content">
        <p>
            <span class = "LoremIpsum">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. 
            Duis mattis gravida dui vel <a href="https://dev.to">scelerisque.</a>
            Aenean suscipit pharetra felis vel efficitur. 
            Vivamus justo dui, accumsan et lacinia vel, scelerisque at turpis.
            <br /><br />
            Quisque tincidunt, ipsum vel venenatis porta, mauris odio lacinia enim, 
            quis finibus libero odio et leo.
            Maecenas sit amet quam id elit pharetra ultrices
            ultrices consequat tortor. 
            Etiam gravida nulla ut nunc tempus, condimentum dictum orci ultrices.
        </p>
    </div>
```

If we refresh the page, we won't see a change except for paragraph duplication - but not for long

There is another thing - if we look at very long code with only `div`s, we will definitely get lost at some point. Just like search engine indexers, it will we hard for us to see what is what

That's were we use so called **semantic elements**
1. It makes code much more readable
2. It helps with SEO and Accessibility 

(Quick note: To be fair, every tag can be called "semantic" as it has it's purpose and meaning. But here, for the sake of learning, I'll overly simplify this term - semantic elements are ones with meaningful names. If we look at them we instantly know what do they do) 

You will learn here 7 main ones

1. `<header>` - this tag indicates header
2. `<main>` - we use it to "tell" where is the most important part
3. `<footer>` - we declarate footer with it
4. `<article>` - Part of the page meant to be independently distributable or reusable
5. `<section>` - Part of the content, with no other tag to better represent it. They should always contain some header
6. `<aside>` - Not so important content, that's located somewhere `aside` like sidenav or feedback form
7. `<nav>` - Navigation element

Of course, there is a lot more. You can check [MDN Docs](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) to learn about other ones

But let's apply this to our page

First - put header into `<header>` tag
```html
<header>
        <h1>Lorem Ipsum</h1>
</header>
```
 
Then, we can replace every `div` with `<article>` and put it in `<main>` - like this
```html
<main>
        <article class = "content">
            <p>
                <span class = "LoremIpsum">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. 
                Duis mattis gravida dui vel <a href="https://dev.to">scelerisque.</a>
                Aenean suscipit pharetra felis vel efficitur. 
                Vivamus justo dui, accumsan et lacinia vel, scelerisque at turpis.
                <br /><br />
                Quisque tincidunt, ipsum vel venenatis porta, mauris odio lacinia enim, 
                quis finibus libero odio et leo.
                Maecenas sit amet quam id elit pharetra ultrices
                ultrices consequat tortor. 
                Etiam gravida nulla ut nunc tempus, condimentum dictum orci ultrices.
            </p>
        </article>
        <article class = "content">
            <p>
                <span class = "LoremIpsum">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. 
                Duis mattis gravida dui vel <a href="https://dev.to">scelerisque.</a>
                Aenean suscipit pharetra felis vel efficitur. 
                Vivamus justo dui, accumsan et lacinia vel, scelerisque at turpis.
                <br /><br />
                Quisque tincidunt, ipsum vel venenatis porta, mauris odio lacinia enim, 
                quis finibus libero odio et leo.
                Maecenas sit amet quam id elit pharetra ultrices
                ultrices consequat tortor. 
                Etiam gravida nulla ut nunc tempus, condimentum dictum orci ultrices.
            </p>
        </article>
</main>
``` 

You will also see no difference - but code is a little bit more pleasant to read


Let's hop to last thing we need to cover

### Forms

This is actually the most important part of this course. Forms will be main way for us to communicate between front-end and back-end.

So, no more introduction - let's learn

To create form we use `<form>` tag
```html
<form action="page.php" method="GET"></form>
```

As you see it takes 2 attributes `action` and `method` - what are they?

- `action` - This attribute defines where **request** (data from the form) is meant to be sent. If it's empty, form will send it to it's origin (Page where it came from - so page with form)
- `method` - That attribute indicates which HTTP method will be used to handle the request. It sound's a bit enigmatic, but I'll cover basics it soon. For now you should just know it exists (but no-one forbids you to do the research)

Okay, we have the form element. But how we will input data? That's second thing - **inputs**

Example:
```html
<input type="text" name="username" placeholder="Enter your username" required />
```
It has a lot of attributes - let's cover them one by one

1. `type` - It says, what input should be shown to user. I'd like you to know 6 basic types for now
    - `text`- default one for simple short text ex. login, title
    - `password` - for passwords. It replaces entered content with famous dots
    - `checkbox` - as it says, checkbox. It can either be set or not.
    - `number` - adds a little arrows to choose the number
    - `textarea` - adds larger
    - `button` - Push button. It takes another attribute called `value` to display some text on it
    - `submit` - Also button, but this one sends form to page specified in `action` attribute of form

(The whole list can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)

Last 2 can be (And will be in this course) replaced with `<button>` tag - like this
```html
<!-- Simple Button -->
<button>Text on it</button>

<!-- Submit -->
<button type = "submit">Submit</button>
```

And `textarea` is often replaced with `<textarea>` tag

2. `name` - Defines name of field. We will be using to get it's value in PHP

3. `placeholder` - You know the text that is displayed only when form field is empty? That's exactly it.

4. `required` - that's optional parameter (it can be absent). It's used to stop submit from sending it's content to specified page. So basically it says
> Unless this field (With required) has value, you can't send it

It's always better to double-check if it isn't actually empty in PHP.


So let's create a new section with form for feedback
```html
<section class = "feedback">
    <form action="feedback.php" method="GET">
        <input type="text" name="name" placeholder="Enter your name" required/>
        <textarea name = "feedback-content" placeholder="Enter your feedback"></textarea>
        <button type="submit">Submit feedback</button>
    </form>
</section>
```

Now, if you open/refresh the file you will see

![Form](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wewe6zxetdggsccmeknl.png)

Of course you can use `<br/>` to add new lines between it if you want


### What do we have

After first part of this article we should have this code, written and working
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Learn HTML</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Lorem Ipsum</h1>
    </header>
    <main>
        <article class = "content">
            <p>
                <span class = "LoremIpsum">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. 
                Duis mattis gravida dui vel <a href="https://dev.to">scelerisque.</a>
                Aenean suscipit pharetra felis vel efficitur. 
                Vivamus justo dui, accumsan et lacinia vel, scelerisque at turpis.
                <br /><br />
                Quisque tincidunt, ipsum vel venenatis porta, mauris odio lacinia enim, 
                quis finibus libero odio et leo.
                Maecenas sit amet quam id elit pharetra ultrices
                ultrices consequat tortor. 
                Etiam gravida nulla ut nunc tempus, condimentum dictum orci ultrices.
            </p>
        </article>
        <article class = "content">
            <p>
                <span class = "LoremIpsum">Lorem ipsum</span> dolor sit amet, consectetur adipiscing elit. 
                Duis mattis gravida dui vel <a href="https://dev.to">scelerisque.</a>
                Aenean suscipit pharetra felis vel efficitur. 
                Vivamus justo dui, accumsan et lacinia vel, scelerisque at turpis.
                <br /><br />
                Quisque tincidunt, ipsum vel venenatis porta, mauris odio lacinia enim, 
                quis finibus libero odio et leo.
                Maecenas sit amet quam id elit pharetra ultrices
                ultrices consequat tortor. 
                Etiam gravida nulla ut nunc tempus, condimentum dictum orci ultrices.
            </p>
        </article>
    </main>
    <section class = "feedback">
        <form action="feedback.php" method="GET">
            <input type="text" name="name" placeholder="Enter your name" required/>
            <textarea name = "feedback-content" placeholder="Enter your feedback"></textarea>
            <button type="submit">Submit feedback</button>
        </form>
    </section>
</body>
</html>

```

But, I won't lie, It looks kinda raw in browser

![Our page by far](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1piy17q2bholbt888a70.png)


Let's fix it.

That's what CSS meant for

## CSS

As I mentioned before - CSS declaration consists of "selector", "declaration block" and "declarations". Now let's expand it

## How to add it to website?

For a stylesheet to work, we need to add it to our `.html` file with `<link>` tag

Create a new file, in the same folder as html, called `styles.css`

Now, link it - inside `<head>` tag put `<link>` tag
```html
<link rel="stylesheet" href="styles.css" />
```

Now, if we add some CSS to that file - it will apply to our `index.html`

## Selectors

There are many types of selectors - I'll show you some of them

1. id - Uniqe identifier for element. We should rarely style things by id, yet still it can be present in code. Let's say we want to style this paragraph
```html
<p id = "importantText"> This is important </p>
```
To access it in CSS, we would use following syntax

```css
#importantText{ /* declarations */ }
```

(`/**/` means comment in CSS)

2. classes = These selectors are like id's, but you can reuse them. They are recomended way of styling, and we used it in our code

So,  if we want to style these 2 paragraphs
```html
<p class = "importantText"> This is important </p>
<p class = "importantText"> This is important </p>
```
We use `.` symbol in CSS

```css
.importantText{ /* declarations */ }
```

3. tag name - if we want to apply something to every tag, we can use tag name - for example for every paragraph (With or without ID/class)
```css
p{/* Declarations */}
```

4. Type declarations - this can be useful for styling inputs (But I don't think I'll use it here]

So, to style input with type `password` we write
```css
input[type="password"]{ /* declarations */}
```

These are just examples - If any other will be used, I'll explain them by the way

Whole list can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)

## Declarations

This one may be kind of a long one - I'll pay no attention to `declaration blocks`. They are just 2 braces (`{}`), and inside them we place declarations

But, that's it - let's focus on more important part.

I explained what declarations look like at the beggining - so I won't repeat myself - let's see some basics

### Text

Let's start with text manipulations - we can change basicly everything

Want to change font size - no problem
```css
font-size: larger
```
It can also take numerical values, like pixels, centimiters, percent 

What about font? Maybe arial suits better to our project? Check this out
```css
font-family: Arial
```

These were just quick shots to make you more familliar with declarations. Let's add someting to our HTML page

Open that CSS file and make everything with class `content` use Arial instead of default font - like this
```css
.content{
    font-family: Arial, sans-serif;
}
```

Second font is an alternative - here I can call it `fallback font`. As in case browser can't find `Arial` it will use `sans-serif`

Let's check it in our browser

![Working Arial font](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2iao6n2bs8wh3xxv9yf7.png)

Works as it should. Now let's make `Lorem Ipsum` a little bit bigger and change it's color - to one called `aquamarine`

```css
.LoremIpsum{
    font-size: x-large;
    color: aquamarine;
}
```
What happened now?


![Applied CSS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wrvr7nd1odlg88biwe7q.png)

This happened - looks intersting.

But those links don't look too good - let's change them too

First - make them red, and remove their underline
```css
a{
    color: red;
    text-decoration: none;
}
``` 

Now we have this

![Link](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eu805jvwdp05243zuqp1.png)


But now, we can't really see if it is focused or it was visited - let's use `hover` pseudo-class, and make it orange in that case

```css
a:hover{
    color: orange;
}
```
That second part of the selector (`:hover`) is the pseudoclass - there are more of them, but this course is not only about HTML and CSS so I won't be getting into details. Full list can be found on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

The last thing I find a little disturbing is that header - It should be in the middle

```css
h1{
    text-align: center;
}
```
![Stylish text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y1t1lomi2832zlmbm4zt.png)

Now, it looks fine - except for one thing

### Positioning

There is one particular reason why we have 2 `<article>` elements and not one - I want to place them next to each other

There - flexbox comes in handy. 

First - we can reduce a bit those articles - let's set their width to 45%

```css
.content{
    width: 45%;
}
```

It should get compressed a bit. But we'll fix it - let's edit styles for `<main>`

```css
main{
    display: flex;
}
```

And? Did it work?

![Our beautiful work](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7vcgh15fbygrr7ugpo8o.png)

Hell yeah, It worked as it should - but this bunch of emptiness on right looks bad - we can move those articles a bit - let's make it all even
```css
main{
    display: flex;
    justify-content: space-evenly;
}
```

`justify-content` can also be used to center blocks and align them in many diffrent places

But, does it look good now? 

![Justified article elements](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9bo81kxha8hoxe6zmdvq.png)

Yess, that's exacly what I meant

Only that form looks odd - maybe we can do something with it?

### Styling inputs

I think I may start with adding classes to the HTML - I add `input` class for `input` and `textarea` tags + class `submit` for submit button - I won't post code here. I think you can do it yourself

Regarding inputs - let's add some more padding (margin, but inside tag) into them and make it eliptical

```css
.input{
    padding: 0.5%;
    border-radius: 15px;
}
```

![Our editted inputs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0dljvt92tox1mg84phdx.png)

That's fine - last thing we should style is submit

Add some padding again - then change it's colors and border
```
.submit{
    background-color: rgb(220, 255, 235);
    color: black;
    border: 1px cornsilk solid;
    border-radius: 3px;
    padding: 0.5%;
}

.submit:hover{
    background-color: rgb(192, 252, 218);
}
```

I'll explain this line - it looks new
```css
border: 1px cornsilk solid;
```

1. First argument - width of 1px
2. Second - color of border
3. Third - Style - whether `solid`, `dashed` or even `none`


We can also center that form
```css
.feedback{
    text-align: center;
}
```

And that's it - our final result looks like this

![Final results](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ll5sjfhgauhlx1qj256c.png)


## Conclusion

That's the end of this article - I hope you liked it.

As I said before - this is not meant to be a substitute for actual HTML and CSS courses. This article was written just to make you familliar with HTML and CSS syntax and teach you some basics

When I'll be introducing some additional CSS and HTML while creating project - I'll explain this on the way

By the way. Would you like me to make a HTML and CSS course? You can leave you thoughts in comments -  Feeback is also appreciated. 

Code for this tutorial is available on [my github](https://github.com/wizarddos/Dev.to-scripts/tree/master/PHP%200%20to%20hero/Part%202%20-%20HTML%20and%20CSS) - If something doesn't work - compare them and you will find bugs

Check out my other articles and that's it

See you in the next part

