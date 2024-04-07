---
layout: post
title: Ajax & Fetch - combining PHP and Javascript for infinite scroll
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

Hi there - have you ever seen "infinite scroll" mechanism?

You know it, you can scroll forever through posts (and ads), like on TikTok or Instagram

Is there some magic going on there? Nah, it's just code

Today, we'll be creating such thing - and I'll also talk about how it works. As it's possible because of **AJAX**

But, what is it? Let's dive right into it.
<!--more-->

We'll start with quick explanation. 
Then PHP comes in place and we end everything by applying knowledge from first paragraphs in javascript.

Now for real, off we go!

## Intro to AJAX and quick history lesson

**AJAX** stands for __Asynchronous JavaScript And XML__

It's a mechanism for JavaScript to send requests to the server without using any other technology (such as HTML forms)

This technology is pretty old. According to Wikipedia it appeared first time in 1999 - so 25 years ago.

It used to use XML (Extensible Markup Language) as a response format. That's why it has `X` in its abbreviation

Hold on. **Response**? What is that?

### HTTP protocol 101

This is not an article about HTTP - but we need a brief overview anyways.

Hypertext Transfer Protocol (or HTTP in short) is application level, client-server protocol used for fetching resources, for example in the internet.
Client sends some data, like what site do we want to visit, to the server and it handles those.

This data sent by client (browser, app, API, whatever else) is called **request**
Answer from the server (like HTML document or HTTP code) is called **response**

All right - if you want to know more check out [MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) and [Cloudflare](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/)
For solely techincal information - [RFC 2616](https://datatracker.ietf.org/doc/html/rfc2616) is your friend

No more about networking. We're comming back to javascript

### Old way - XMLHttpRequest

Before all newer solutions, there was an object called **`XMLHttpRequest`**

To start - you need to create it
```js
const xhr = new XMLHttpRequest();
```
Then, specify destination of a request and define its type. I'll go with file called `data.json`
```js
xhr.open('GET', `data.json`);
xhr.responseType = 'json';
```

Now, we're ready to send it
```js
xhr.send();
```

Yeah cool, but we want those precious data! And we can get it

Check if request even made it and then we can **parse** JSON
```js
xhr.addEventListener("load", ()=>{
    const jsonResp = xhr.response
})
```

And we can do whatever we want to with those. Overall code looks like this
```js
const xhr = new XMLHttpRequest();
xhr.open('GET', `data.json`);
xhr.responseType = 'json';
xhr.send();

xhr.addEventListener("load", ()=>{
    const jsonResp = xhr.response;
})
```

JSON this, JSON that - What is it actually?

### JSON - data storing done better

Back in the days, most of the data going around the internet was in either XML or HTML format.
-
But now, it changes. New king has come

**JSON** - Javascript Object Notation.

It uses data object with attribute-value pairs and arrays.

Here's a quick example of such JSON:
```json
{
  "name": "John Doe",
  "age": 30,
  "city": "New York",
  "email": "john.doe@example.com",
  "phone": "123-456-7890",
  "is_student": false,
  "hobbies": ["reading", "hiking", "photography"],
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "zip": "10001"
  }
}
```

Looks like JS object - right? And as you see, it can be nested.

So we can put object in object and so on.

Basic structure looks like this
```json
{
    "attribute": "value",
    "attribute": "value",
    "array": ["some", "array", "data"],
    "object":{
        "property": "1",
        "property2": "2",
        "property3": "3"
    }
}
```

With all of this said, let's see what we'll be doing today

### `fetch` - new way of sending requests

In 2015, a new feature was presented - **Fetch API**

It was meant to replace `XMLHttpRequest` and it actuall did it. So, how do we use it?

First, specify what do we want to grab
```js
const url = "http://example.com/data.json"
```

Now, we're ready to make the requests

`fetch()` function takes 2 arguments -
1. Location of reesource we want to fetch
2. Additional options, like `POST` data, credentials, headers - you can find it all [here](https://developer.mozilla.org/en-US/docs/Web/API/fetch#syntax)

Then, we can parse data to JSON (or text) and do whatever we want to
```js
fetch(url, {
    "method": "GET"
})
.then( req => req.json())
.then( data => console.log(data))
```

With this said, let's start coding actual project

## Coding infinite scroll

What will we be doing today?

We're gonna code a site that showcases a load of names pulled in from PHP.

We'll first get a bundle of 20 names - then with each click of the button add additional

### Backend mechanics in PHP

Start with creating new file - I called it `api.php`

I've created 2 arrays with bunch of first and last names. That's where our data will come from
```php
<?php

$firstNames = [
    "John", "Emma", "Michael", "Olivia", "William", "Ava", "James", "Sophia", "Benjamin", "Isabella",
    "Jacob", "Mia", "Ethan", "Charlotte", "Alexander", "Amelia", "Henry", "Harper", "Daniel", "Evelyn",
    "Matthew", "Abigail", "Jackson", "Emily", "Samuel", "Elizabeth", "Sebastian", "Sofia", "David", "Avery",
    "Joseph", "Ella", "Luke", "Grace", "Gabriel", "Chloe", "Andrew", "Victoria", "Nathan", "Lily",
    "Christopher", "Madison", "Ryan", "Scarlett", "Christian", "Zoey", "Jonathan", "Layla", "Noah", "Natalie"
];

$lastNames = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
    "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
    "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
    "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins"
];
```

Then, let's generate the bundle of 20 names and encode it to JSON
```php
$dataBundle = [];

for($i = 0; $i < 20; $i++){
    $name = $firstNames[array_rand( $firstNames )] . ' ' . $lastNames[array_rand($lastNames)];
    array_push($dataBundle, ['id' => rand(), 'name' => $name]);
}

echo json_encode($dataBundle);
```

Whole code looks like this
```php
<?php

$firstNames = [
    "John", "Emma", "Michael", "Olivia", "William", "Ava", "James", "Sophia", "Benjamin", "Isabella",
    "Jacob", "Mia", "Ethan", "Charlotte", "Alexander", "Amelia", "Henry", "Harper", "Daniel", "Evelyn",
    "Matthew", "Abigail", "Jackson", "Emily", "Samuel", "Elizabeth", "Sebastian", "Sofia", "David", "Avery",
    "Joseph", "Ella", "Luke", "Grace", "Gabriel", "Chloe", "Andrew", "Victoria", "Nathan", "Lily",
    "Christopher", "Madison", "Ryan", "Scarlett", "Christian", "Zoey", "Jonathan", "Layla", "Noah", "Natalie"
];

$lastNames = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
    "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
    "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
    "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins"
];


$dataBundle = [];

for($i = 0; $i < 10; $i++){
    $name = $firstNames[array_rand( $firstNames )] . ' ' . $lastNames[array_rand($lastNames)];
    array_push($dataBundle, ['id' => rand(), 'name' => $name]);
}

echo json_encode($dataBundle);
```

Right now, if you visit this page in the browser, you will see JSON with new names every time you refresh the page.

That's what we needed - now time for JS

### Frontend - AJAX in action

I'll start with simple HTML template - create 2 files `index.html` and `styles.css`

```html
<!--index.html-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Random names</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class = "header">
        <h1>A page with unlimited names</h1>
    </header>
    <main id = "names">
        
    </main>
    <script src="fetch-names.js"></script>    
</body>
</html>
```
```css
body{
    text-align: center;
}

.big-name{
    font-size: xx-large;
    padding-top: 15px;
}
```

There's not much of it - I've placed there a heading and centered everything

This is where the fun beggins 

#### Fetch names from PHP in JS

As we'll be accessing data on the server a couple of times, I decided to create a function
```js
const fetchNames = () =>{
    
}
```

Inside, let's execute our `fetch` command
```js
fetch("http://localhost/infinite-scroll-plain/api.php", {
    method: "GET"
})
```

This will send `GET` request to fetch data from our PHP script. If you have another url for this (for example, because you named the folder differently), replace that URL with one working for you

We need to handle what we got as well. Append (or add in the next line)
```js
.then(res => res.json())
```

That's how we can parse response body as JSON - so then we access it like a normal object

To finish, call function `displayNames` which will be the one responsible for putting those onto a page
```js
.then(data => { 
    displayNames(data);
})

```

But, what if something went wrong? We need to be prepared as well
```js
    .catch(error =>{ displayNames([])})
```

When request meseses up, just return empty array
Overall, this function is finished.
And it looks like this
```js
const fetchNames = () =>{
    fetch("http://localhost/infinite-scroll-plain/api.php", {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => { 
        displayNames(data);
    })
    .catch(error =>{ displayNames([])})
}
```

We've got 2 more things to do

#### Display names in the browser

When we have names fetched, time to show those

We want to display names 2 times
1. When site is loaded
2. When user scrolls

So, let's code `displayNames` function
```js
const displayNames = (names) =>{
    
}
```

Grab `main` element with `id` equal to "names"
```js
const dest = document.querySelector("#names");
```

And create a for-each loop, which will append names from the argument as children for `<main>` element
```js
    names.forEach(name => {
        const p = document.createElement("p")
        p.textContent = name
        p.className = 'big-name'
        dest.appendChild(p)
    });
```

I also added class `big-name`, so these tags appear bigger

Last thing

#### Piece everything togehter - event handling

As we've set before, we need to create 2 event listeners for infinite scroll to work

1. When page is loaded
```js
window.addEventListener("load", fetchNames(), false)

```

2. And when user finishes scrolling
```js
document.addEventListener("scrollend", fetchNames)
```

To sum up - our javascript looks like this

```js
const fetchNames = () =>{
    console.log("called")
    fetch("http://localhost/infinite-scroll-plain/api.php", {
        method: "GET"
    })
    .then(res => res.json())
    .then(data => { 
        displayNames(data);
    })
    .catch(error =>{ displayNames([])})
}

const displayNames = (names) =>{
    const dest = document.querySelector("#names");

    names.forEach(name => {
        const p = document.createElement("p")
        p.textContent = name['name']
        p.className = 'big-name'
        dest.appendChild(p)
    });
}

window.addEventListener("load", fetchNames(), false)
document.addEventListener("scrollend", fetchNames)
```

And that's it - we made it


## Conclusion

Thanks for reading this article, I hope you've enjoyed it.
If you found it useful, share it with your friends

Also, I need to think a little about what to post next - I'm open for any suggestions
Code will be available on [my GitHub](https://github.com/wizarddos/Dev.to-scripts)

That's about it - see you next time