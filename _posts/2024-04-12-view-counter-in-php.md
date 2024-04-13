---
layout: post
title: Self-refreshing view counter in PHP and JS
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---


Hi there, have you ever written an admin panel for your website?

There is one interesting statistic I personally like looking at - view count

We're proud to see people enjoying themselves while using our product, aren't we?

Then, we ought to know how many people do we attract
<!--more-->
Time to finish this intro what will we code today?

## Project plan

First - We'll create a bit of backend.
We need
- Database with table "views".
- Script for database connection.
- A script that passes `views` content as JSON.
- Another function, that will update `views` table.

Then, time to hop into frontend with:
- UI for the counter and admin-panel.
- Javascript parsing data function executed in an interval.


## Backend

Start your server and let's get to work!

I've created a simple database called `view-counter`. In it one table called `views` with one `count` field in it
There, add one row with value `0`

We need a function for executing queries. As our code will send a bit of requests, such function will definitely be useful

```php
function runQuery(string $query, array $params=[]){
    $db = new PDO("mysql:host=localhost;dbname=view-counter", "root", "");
    try{
        $stmt = $db->prepare($query);
        $stmt->execute($params);

        if(!$stmt->rowCount()){
            return ["No result"];
        }
        return $stmt->fetch(PDO::FETCH_ASSOC);
        
    }catch(PDOException $e){
        return "Error occured";
    }
}

```
Of course, replace strings passed in `PDO` constructor with your DSN and credentials
`$params` was set to be equal to `[]`, as there's no need to use it every time - it's an optional argument

We'll need to access current view count 2 times - once to display and once to increment it

Let's write a quick function.
```php
function getViews(){
    return runQuery("SELECT * FROM `views`")['count'];
}
```

Next step: Add `pageVisited()` - one to actually updates the counter
```php
function pageVisited(){
    $currentVisits = getViews();
    $currentVisits++;
    runQuery("UPDATE `views` SET `count` = ?", [$currentVisits]);
} 
```

We don't need to return anything. 
I put all of these functions inside `lib.php` in `scripts` folder
```php
<?php 

function runQuery(string $query, array $params=[]){
    $db = new PDO("mysql:host=localhost;dbname=view-counter", "root", "");
    try{
        $stmt = $db->prepare($query);
        $stmt->execute($params);

        if(!$stmt->rowCount()){
            return ["No result"];
        }
        return $stmt->fetch(PDO::FETCH_ASSOC);
        
    }catch(PDOException $e){
        return "Error occured";
    }
}

function getViews(){
    return runQuery("SELECT * FROM `views`")['count'];
}

function pageVisited(){
    $currentVisits = runQuery("SELECT * FROM `views`")['count'];
    $currentVisits++;
    runQuery("UPDATE `views` SET `count` = ?", [$currentVisits]);
} 
```

In addition we need `api.php`. 
Here, JSON will be returned for JavaScript to grab;
```php
<?php

require "scripts/lib.php";
echo json_encode(getViews());
```

Backend, checked. Shall we jump to the front?

## JS and HTML

We need 2 pages and 1 JS file

Pages:
- `page.php` - Page where we count visits
- `admin-panel.php` - To display the counter

JavaScript:
- `update-counter.js` - Will update the counter on `admin-panel.php`

For `page.php`, we don't need anything big. Just remember to update the counter with each visit
```php
<html>
<head>
    <meta charset="UTF-8">
    <title>Mysterious Page</title>
</head>
<body>
    <h1>This page is not totally tracked</h1>
</body>
</html>
<?php
    require "scripts/lib.php";
    pageVisited();
?>
```

It's time to shine with `admin-panel.php`
```php
<html>
<head>
    <meta charset="UTF-8">
    <title>Admin page - check your views</title>
</head>
<body>
    <h1>Page was visited <span id = "count"></span> times</h1>

    <script src = "scripts/update-counter.js"></script>
</body>
</html>
```

We've written simple HTML, but fun is about to begin

In the `scripts` folder add `update-counter.js`

We need a function, that will grab data from `api.php` and replace the contents of `cound` span

I want it to be replaced every 5 seconds
```js
const updateCounter = ()=>{

}
updateCounter()
setInterval(updateCounter, 5000)
```

Inside `updateCounter`, we need to make a request and update `#counter`
```js
fetch(`http://localhost/view-count/api.php`, {method: "GET"})
.then(req => req.json())
```

As it's here, first we get data from `api.php` and treat it as JSON

Then
```js
.then(req => {
    const counterElement = document.querySelector('#count');
    counterElement.innerHTML = req
})
```

Grab that data and replace `counterElement` with updated number

Overall, `update-counter.js` looks like this
```js
const updateCounter = ()=>{
    
    fetch(`http://localhost/view-count/api.php`, {method: "GET"})
    .then(req => req.json())
    .then(req => {
        const counterElement = document.querySelector('#count');
        counterElement.innerHTML = req
    })
}
updateCounter()
setInterval(updateCounter, 5000)
```

In browser, at `admin-panel.php` we'll encounter.
[![Counter on 0](https://i.postimg.cc/Kc7Xr2gk/obraz.png)](https://postimg.cc/NL0PBZDB)

Now head to `page.php` - when you come back, even without refreshing on `admin-panel.php` you'll see.
[![Counter on 1](https://i.postimg.cc/tJpMmsV1/obraz.png)](https://postimg.cc/BL7pjQps)

That's it! We made it

## Conclusion

Thanks for reading this article.
Now in addition to [login](https:/wizarddos.github.io/blog/programming/php_0_to_hero/12) and [inifinite scroll](https:/wizarddos.github.io/blog/programming/2024/04/02/php-javascript-ajax-fetch-infinite-scroll.html) you have view counter in your arsenal ready to use everywhere you need

Hope you've enjoyed coding with me - check out 2 articles linked earlier and my [whole PHP course](https://wizarddos.github.io/blog/series/php_0_to_hero.html).

Code for you to download is available [here on my Github](https://github.com/wizarddos/Dev.to-scripts/tree/master/view-count)

That's it, see you next time.