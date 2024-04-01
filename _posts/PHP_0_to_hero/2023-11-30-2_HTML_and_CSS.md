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

What's up? Welcome in another part of this course

As we'll be using PHP for web-dev - there is one more thing we need to talk about

So let's go - no need to waste time
<!--more-->

## Little introduction

PHP is server-side language - this means that our code is executed on server then, what that server generates is sent to us

But, because browsers can't interpret PHP code they have their own languages - that's what we will be learning today

Yes, I'll introduce you to basics of HTML and CSS - as it can be helpful in PHP web development. To create a fully working website later, we'll definetely use it.

If you know something about them - feel free to skip this article. It will be nothing more than just the basics

And important note - this article isn't meant to replace typical HTML and CSS course.
My goal is to familiarize you with HTML's and CSS' syntax, not to teach every concept of those languages. 

So, with this explained - off we go

## Basic terms and concepts

So, HTML is (also) an acronym - it stands for `Hypertext Markup Language`. 
Using it, we create "skeleton" of our websites.

About from where does `Hypertext` part come from, we'll cover later on

HTML code consists of **elements**, ex.
```html
<p>Some fancy text</p>
```
This creates a paragraph with `Some fancy text` inside it.
Element itself consists of 3 parts 
 - opening tag - `<p>`
 - content - `Some fancy text`
 - closing tag - `</p>`

In short, if tag has `/` in it - It's a closing one
Some elements (called void elements) don't need a closing tag - as they [don't have any contents](https://html.spec.whatwg.org/multipage/syntax.html#void-elements)

For example - `<br>` (Break Line)

```html
<br>
```

Some programmers (with me included) add `/` to this elements, even though it's optional. Like this
```html
<br />
```

Both forms are correct and understandable for the browser - choose whatever you want to

I also mentioned `CSS` - it stands for `Cascading style sheets`. 
This language is responsible for overall site looks, such as colors, positioning elements and simple animations. 
On it's own - you can't do much with it. 

But in additon to HTML - Nothing stops us from creating beautifull websites

CSS file consists of a bunch of selectors and declaration blocks, which tell browser, how should it display website. 
For Example

```css
p{
    color: red;
}
```

First - we declarate what do we want to style (selector)
Then - we open curly brackets (Declaration Block)
Finally - we write our declarations. 
Each consists of property (like `color` here) and value (here, `red`) separated by a colon  (`: `)

Some take numerical values, some text ones, some only specified ones (like hex values)

Let's get to the basics

## HTML

HTML document has strict structure - It starts with `<html>` tag
```html
<html>
</html>
```

If anywhere in the code you see string of this format
```html
<!-- -->
```

That's a comment - It will be skipped by the browser, while rendering your website.

We can put there a little clarifications, yet the best code is one, that doesn't require explaining on the side

### File structure

We start with `<!DOCTYPE html>` preamble - here I think that quote from [specification](https://html.spec.whatwg.org/multipage/syntax.html#the-doctype) will be the best explanation

>DOCTYPEs are required for legacy reasons. When omitted, browsers tend to use a different rendering mode that is incompatible with some specifications. Including the DOCTYPE in a document ensures that the browser makes a best-effort attempt at following the relevant specifications

So, to start with - basic template looks like this
```html
<!DOCTYPE html>
<html>
    <head>
    </head>
    <body>
    </body>
</html>
```

As you see - we have 2 new tags

- `head` - That's what we can't see. Here you include CSS, favicons declarate title, and information like site description, author etc.

- `body` - And this is what we see - whole content is placed here, so paragraphs and other elements go there

### Headings

HTML has built-in headings

They not only make text larger - they also help semantically, with maintenance of code clarity, and add cool margins

We have 6 types of those - 1 is the biggest, 6 is the smallest

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

`<meta>` element here sets [encoding](https://simple.wikipedia.org/wiki/Character_encoding) for this website - we secure that every character will display as it should, so we won't see strange symbols around
### Text 

To add simple text - you don't need any elements at all. 
But there are some which will definitely help you - especially with styling

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


I purposefully scaled it in browser (it's 200%) - for your better view

But, let's say that `Lorem Ipsum` is so important, that it has to have another color - another tag comes here in handy

2. `<span>` - Is used to group elements, for example for styling purposes 

Now, out code looks like this
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
When we add CSS we will make this `span` to be different - right now, no need to bother

3. `<a>` - It's a hyperlink. This tag allows user to move between different pages - it takes one attribute - `href` - the address where link will take user

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



Now if we click on `scelerisque.` it will redirect us to `dev.to` main page - and when we go back, color changes
Like this

![Visited link](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1rm7gz8nvpy6dnwrjcji.png)

Now, we've covered adding text - let's explore further

### Blocks

Aligning content properly sounds like a nightmare, doesn't it?

Actually, that's where blocks come in handy. 
It's easier to align squares and rectangles, rather than some irregular shapes

Bsic block element is called `<div>` - until we add CSS, it does nothing. 
Yet with styling, we can align it as we wish and add other crazy stuff

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

If we refresh the page, no change is visible except for paragraph duplication - but not for long

There is another thing - if we look at very long code with only `div`s, we will definitely get lost at some point. 
Just like search engine indexers - it will we hard for us to see what is what

That's were we use so called **semantic elements**
1. It makes code much more readable
2. It helps with SEO and Accessibility 

(Quick note: To be fair, every tag can be called "semantic" as it has it's purpose and meaning. But here, for the sake of learning, I'll overly simplify this term - semantic elements are ones with meaningful names. If we look at them we instantly know what do they do) 

7 main ones consist of

1. `<header>` - indicates header
2. `<main>` - we use it to "tell" where is the most important part on the page
3. `<footer>` - declares footer
4. `<article>` - Part of the page meant to be independently distributable or reusable
5. `<section>` - Part of the content, with no other tag to better represent it. They should always contain some heading
6. `<aside>` - Not so important content, that's located somewhere `aside` like sidenav or feedback form
7. `<nav>` - Navigation element

Of course, there is a lot more. You can check [MDN Docs](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) for a full list

But let's apply this to our page

First - put heading element into `<header>` tag
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

You will also see no difference on page itself - but code is a little bit more pleasant to read

Let's hop to last thing we need to cover

### Forms

Get your coffee, and focus here - that's the most imporant part actually 
Forms will be main way for us to communicate between front-end (What we see) and back-end (PHP).

To create form we use `<form>` tag
```html
<form action="page.php" method="GET"></form>
```

As you see it takes 2 attributes `action` and `method` - what are they?

- `action` - This attribute defines where **request** (data from the form) is meant to be sent. If it's empty, form will send it to it's origin (Page where it came from - so page with form)
- `method` - That attribute indicates which **HTTP method** will be used to handle the request. Sounds a little enigmatic? Later in this course we'll cover it. 
For now you should just know it exists (but I encourage you to [research on your own](https://developer.mozilla.org/en-US/docs/Learn/Forms/Sending_and_retrieving_form_data))

Okay, we have the form element. But how we will input data? 
That's second thing - **inputs**!

For Example:
```html
<input type="text" name="username" placeholder="Enter your username" required />
```
It has a lot of attributes - let's cover them one by one

1. `type` - It says, what input `type` should be shown to user. I'd like you to know 6 basic types for now
    - `text`- default one for simple short text ex. login, title, search query - You name it
    - `password` - for passwords. It replaces entered content with famous dots
    - `checkbox` - as it says, checkbox. It can either be set or not (true or false).
    - `number` - adds little arrows to choose the number
    - `textarea` - `text` but for larger chunks of content (like feedback, article etc.)
    - `button` - Push button. It takes another attribute called `value` to display some text on it
    - `submit` - Also button, but this one sends form to page specified in `action` attribute of form

    (Whole list can be found [here](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types)

    Last 2 can be (And will be in this course) replaced with `<button>` tag - like this
    ```html
    <!-- Simple Button -->
    <button>Text on it</button>

    <!-- Submit -->
    <button type = "submit">Submit</button>
    ```

    And `textarea` is often replaced with `<textarea>` tag

2. `name` - Defines name of field. We will be using to get it's value in PHP

3. `placeholder` - Have you seen the text that is displayed only when form field is empty? That's exactly it.

4. `required` - optional attribute. It's used to stop submit from sending it's content to specified page. So basically it says
> Unless this field (With required) has value, you can't send the form

It's always better to double-check if it isn't actually empty in PHP (as you can modify HTML in your browser).


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

Of course you can use `<br/>` to add new lines between it if you want to


### Our progress

After first part of this article we should have this code
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


Let's add some colors - That's what CSS was built for

## CSS

As I mentioned before - CSS consists of "selector", "declaration block" and "declarations". Now let's expand it

## How to add it to website?

For a stylesheet to work, we need to add it to our `.html` file with `<link>` tag

Create a new file, in the same folder as html, called `styles.css`

Now, link it - inside `<head>` tag put `<link>`
```html
<link rel="stylesheet" href="styles.css" />
```

Now, if we add CSS code to `styles.css` - it will get applied onto our `index.html`

## Selectors

There are many selectors - But most frequently used ones are:

1. id - Uniqe identifier for element. We should rarely style things by id, yet still it can be present in code. 
Let's say we want to style this paragraph
```html
<p id = "importantText"> This is important </p>
```
To access it in CSS, we would use following syntax

```css
#importantText{ /* declarations */ }
```

(`/* something */` means comment in CSS)

2. classes - These selectors are like id's, but you can reuse them. They are recomended way of styling.

So, if we want to style these 2 paragraphs
```html
<p class = "importantText"> This is important </p>
<p class = "importantText"> This is important </p>
```
We use `.` (dot) symbol in CSS

```css
.importantText{ /* declarations */ }
```

3. tag name - to apply style to each element, we can use it's name - for example for every paragraph (With or without ID/class)
```css
p{/* Declarations */}
```

4. Type declarations - this can be useful for styling inputs (But I don't think I'll use it here)

So, to style input with type `password` we write
```css
input[type="password"]{ /* declarations */}
```

These are just examples - If any other will be used, I'll explain them by the way

Whole list can be found [here](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors)

As for good practices -  **stick to classes**. 
They are the best, and there will be no further complications with styles priority

(Wanna know more about it - [check this stack overflow thread](https://stackoverflow.com/questions/25105736/what-is-the-order-of-precedence-for-css))

## Declarations

I'll pay no attention to `declaration blocks`. They are just 2 brackets (`{}`), and inside them we place declarations

Let's focus on more important part - how to actually style 

### Text

Let's start with text manipulation

Want to change font size?
```css
font-size: larger
```
It also takes numerical values, like pixels, centimiters, percent, [and more](https://developer.mozilla.org/en-US/docs/Web/CSS/font-size#syntax)

What about actual font? Maybe arial suits better to our project, than sans-serif?
```css
font-family: Arial
```

These were just quick shots - let's add someting to our HTML page now

Open that CSS file and make everything with class `content` use Arial instead of default font - like this
```css
.content{
    font-family: Arial, sans-serif;
}
```

Second font is an alternative - here I can call it `fallback font`. As in case browser can't find `Arial`, it will use `sans-serif`

Let's check what we have

![Working Arial font](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/2iao6n2bs8wh3xxv9yf7.png)

Works as it should. Now let's make `Lorem Ipsum` a little bit bigger and change it's color - I've chosen `aquamarine`

```css
.LoremIpsum{
    font-size: x-large;
    color: aquamarine;
}
```
What happened now?


![Applied CSS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wrvr7nd1odlg88biwe7q.png)

This happened - looks intersting.

But those links don't look too good - let's style them as well

First - make them red, and remove underline
```css
a{
    color: red;
    text-decoration: none;
}
```

Now we have this

![Link](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eu805jvwdp05243zuqp1.png)


But now, we can't really see if it's fresh, focused or was it visited - let's use `hover` pseudo-class, and make it orange while coursor is over them

```css
a:hover{
    color: orange;
}
```
That second part of the selector (`:hover`) is called **pseudoclass** 

Yet `:hover` is not the only one - full list can be found on [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes)

The last thing I find a little disturbing is that header - I think, it should be in the middle

```css
h1{
    text-align: center;
}
```
![Stylish text](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y1t1lomi2832zlmbm4zt.png)

Looks much better - but that's not the end

### Positioning

There is one particular reason why we have 2 `<article>` elements and not one - I want to place them next to each other

There - **flexbox** comes in handy. 

First, we can make articles a little smaller - let's set their width to 45%

```css
.content{
    width: 45%;
}
```

It should get compressed a bit. But we'll fix it - let's edit styles for `<main>` element

```css
main{
    display: flex;
}
```

And? Did it work?

![Our beautiful work](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7vcgh15fbygrr7ugpo8o.png)

Seems like, yeah
But this emptiness on right looks bad - we can move those articles a bit.
Let's make all spaces even
```css
main{
    display: flex;
    justify-content: space-evenly;
}
```

[`justify-content`](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content) can also be used to center blocks and align them in many diffrent places

I can say, that we've made pretty decent progress
![Justified article elements](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9bo81kxha8hoxe6zmdvq.png)

Only that form looks odd - maybe we can do something with it?

### Styling inputs

Start with adding classes to the HTML - I add `input` class for `input` and `textarea` elements + class `submit` for submit button
I'll let you do it yourself. I belive in you.

Regarding inputs - let's add some more padding (margin, but inside element) and make input itself elliptical

```css
.input{
    padding: 0.5%;
    border-radius: 15px;
}
```

![Our editted inputs](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0dljvt92tox1mg84phdx.png)

That's fine - only submit is left

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

This border declaration looks fairly complicated
```css
border: 1px cornsilk solid;
```

1. First argument -  border width. So here 1 pixel
2. Second - color of border
3. Third - Border type. Whether it's `solid`, `dashed` or it can even be `none`


Let's center that form as well
```css
.feedback{
    text-align: center;
}
```

That's it - our final result looks like this

![Final results](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ll5sjfhgauhlx1qj256c.png)


## Conclusion

That's the end of this article - I hope you liked it.

As I said before - this is not meant to be a substitute for actual HTML and CSS courses. 
My goal was to make you familliar with HTML and CSS syntax

When I'll be introducing some additional CSS and HTML in projects - I'll explain them while coding

By the way. Would you like me to make a HTML and CSS course? You can leave you thoughts in comments -  Feeback is also appreciated.

Right now, if you want to learn more, you can check [MDN](https://developer.mozilla.org/en-US/) - that's one of the best source (In my opinion) on the internet 

Code for this tutorial is available on [my github](https://github.com/wizarddos/Dev.to-scripts/tree/master/PHP%200%20to%20hero/Part%202%20-%20HTML%20and%20CSS)
If your code doesn't work - compare both and you will find bugs

Check out my other articles and that's it
See you in the next part

