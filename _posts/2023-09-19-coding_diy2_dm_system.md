---
layout: post
title: Coding DIY pt.2 - Private messages
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

Hello again - welcome in another Coding DIY in PHP

Today we will be making simple DM system
<!--more-->
## Requirements

In this tutorial I assume that you are familiar with basic HTML, CSS, JavaScript, PHP and SQL syntax

You also should know how to execute PHP and SQL code with XAMPP - I won't be covering those in this tutorial

So, when we have this said, Let's go

## Coding

First thing we need to do is prepare our template

I was thinking about it for a bit, but I've decided I'll use the same database and login script as in [first part](https://dev.to/wizarddos/how-to-make-a-simple-login-form-in-php-1l8i) of this "series"

But don't worry, you can download it's code from Github repository I'll add at the end (This code will also be there)

But let's go back to our lovely DM's

### Template 

I'll divide this project into following files - 

Now `secret.php` will contain textarea and input for username. Apart from that, we will have a big `<section>` tag with listed usernames of people with whom user chatted before. Using buttons there, we will be able to fetch data from server to iframe on the website

We will also create new files called `dm_send.php` and `dm_receive.php`

They will be responsible for (something no one expected) sending and receiving DM's

There will also be a bit of updates regarding database - but about it you will learn in specific section

So, to sum up - What will we learn?
- How to create DM system in PHP and SQL
- How to handle exceptions in PHP
- How to use ternary operator in PHP
- How to write SQL queries with `RIGHT JOIN` and `UNION`
- How to use `DISTINCT` operator in SQL

And also we will sharpen our skills in PHP, SQL, HTML and JS

So, let's start - we've covered every theoretical thing needed for now

### Creating Front-end

So, our first task will be to create HTML structure - place it inside `<body>` tag at `secret.php`

```html
    <h1>Welcome on secret page - Private DM's</h1>

    <main>
        <section class = "sendMsg">
            <article class = "conversation">

            </article>
            <form method="POST" action="dm_send.php">

            </form>
        </section>
        <section class = "friends">
            <ul class = "friends-list">

            </ul>
        </section>
    </main>
```
Next thing is creating actual form fields - new content of `<form>` tag
```html
                <label> To:
                <input type="text" name="to" placeholder="To:"  class = "form-field"/></label>
                <br/><br/>
                <label> Content:<br/>
                <textarea id="" cols="30" rows="5" maxlength ="249" name="message"></textarea><br/></label>
                <br/>
                <button type="submit" class = "btn-submit">Send</button>   
```

Then, I want to add some, let's say, 'placeholder' for `friends-list` ul
```html
<ul class = "friends-list">
    <li><button class="friend">Friend 1</button></li>
    <li><button class="friend">Friend 2</button></li>
    <li><button class="friend">Friend 3</button></li>
</ul>
```

Now, we need a last part of creating template - styles

I won't be styling it a lot - Just positioning. It's not a CSS course - but it doesn't mean we don't need it

Create new file called `dm.css` - link it inside secret's `<head>` tag
```html
 <link rel="stylesheet" href="dm.css" />
```

Then, let's align that HTML skeleton :)

```css
main{
    display: flex;
    width: 94%;
    justify-content: center;
    padding: 3%;
    height: 100%;
}

.sendMsg{
    width: 50%;
    text-align: center;
}

.friends{
    width: 50%;
}

.conversation{
    height: 50%;
}

.friend{
    background-color: #fff;
    border: none;    
}

.friend:hover{
    color: #333;
}
```

I've also edited buttons for friends - so they look like normal styled links, but their semantic role stays the same

I think that's it for now - second part is updating our database

### Database update

Get to `http://localhost/phpmyadmin`

We need a new table - I'll call it `messages` and it will contain 5 columns

1. `id` - It's our primary key in `int` format
2. `content` - As it says, type `text` or `varchar`
3. `destination` - id of a user to whom is message directed as `int`
4. `sender` - id of a sender
5. `timestamp` - when was message sent. I'll use `datetime` format here

After all our table looks like this

![Database structure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/in3ypaoghrswzf75fhaw.png)

Here is the query for creating this table

```sql
CREATE TABLE `login-form`.`messages` ( `id` INT NOT NULL AUTO_INCREMENT , `content` TEXT NOT NULL , `to` INT NOT NULL , `from` INT NOT NULL , `timestamp` DATETIME NOT NULL , PRIMARY KEY (`id`)) ENGINE = InnoDB; 
```
whole database dump will also be available in mentioned Github repository

This table will stay empty - We will fill it in the future

Let's leave `phpmyadmin` and focus on the most important part for us

### Creating sending script

We should start our work on creating sending script - create and open `dm_send.php`

To begin with, we need to check if user is even logged in
```php
<?php

session_start();

if(!isset($_SESSION['isLoged'])){
    header("Location: index.php");
    exit();
}
```

Then, we need to escape some dangerous characters from content and save it to a variable - never trust data coming from users

```php
$to = htmlentities($_POST['to'], ENT_QUOTES, "UTF-8");
$content = htmlentities($_POST['message'], ENT_HTML5, "UTF-8");
```

I've used `ENT_QUOTES` in `$to` variable to avoid eventual conflicts when comparing usernames

I think you know, that sending message to non-existing user has no sense - let's check it

We need to make some changes in `login.php` - I want to extract database credentials and dsn to separate file, and require it every time I need to use it - in my code it's named `creds.php`

Then, in both `login.php` and `dm_send.php` import that file

```php
require_once "creds.php";
```

Also for `login.php` I'd like to get our uid and login - right before `isLoged` session variable add

```php
$_SESSION['uid'] = $result['id'];
$_SESSION['login'] = $result['login'];
```


Okay, when it's ready we can run a query, and write that condition
```php
$db = new PDO($db_dsn, $db_user, $db_pass);
$sql = "SELECT * FROM `users` WHERE `login` = ?";

$stmt = $db->prepare($sql);
$stmt->execute([$to]);

if(!$stmt->rowCount()){
    $_SESSION['err'] = "That user does not exist";
    header("Location: secret.php");
    exit();
}
```
That's actually only condition we need to check - now let's instead of `login`, put user's `id` inside that database

We should start with writing a query - that's simple `SELECT`
```php
$sql = "SELECT `id` FROM `users` WHERE `login` = ?";
```

Next -  execute it
```php
$stmt = $db->prepare($sql);
$stmt->execute([$to]);
```
At this point we just need to fetc that friend's id
```php
$fid = $stmt->fetch(PDO::FETCH_ASSOC)['id'];
```
The most important part is left - sending actual message

First - prepare a `insert` query
```php
$sql = "INSERT INTO `messages` VALUES (?????)";
```

Then - secure yourself from unwanted errors with exceptions
```php
try{

}catch(PDOException $e){
    $_SESSION['err'] = "Server error - please try again later";
    header("Location: index.php");
    exit();
}
```

That's common implementation of exceptions in PHP

PDO is really clever - If something goes wrong, it will tell us. We just need to `catch` it

We don't have to share with user technical aspects of that bug - just tell something wrong happened and if we need to, we can log it. But here I'll skip this part


Now - prepare and execute written query inside `try` block
```php
    $stmt = $db->prepare($sql);
    $stmt->execute([NULL, $content, $fid, $_SESSION['uid'], date("Y-m-d H:i:s")]);
    $_SESSION['err'] = "Message sent";

    header('Location: secret.php');
```

Last thing we need to do is to add error handling in `secret.php`

Under submit button I'll add

1. Check if `err` variable is set
2. If true, show it's content to the user
3. Unset that variable

```php
<br/>
<?php 
if(isset($_SESSION['err'])){
    echo $_SESSION['err'];
    unset($_SESSION['err']);
}
?>
```

Our sending is ready - now we need to code script for receiving messages

### Receiving messages 

When we can send some texts, we should also be able to receive them - create new file called `dm_receive.php`

First thing we need it `uid` - check if it's even present

```php
<?php 
session_start();
if(!isset($_SESSION['uid'])){
    echo "Server error - no user id available";
    exit();
}
``` 

Then, when we have it, I can explain how it will work

1. JavaScript callback put in `setInterval` function will request from server refresh of the `iframe` element on `secret.php`. As GET parameter we will add `login` of another account.
2. Server acknowledges request, and executes query and displays new content of the message.
3. Messages window is refreshed

And in case we want to change the person, we will just update `src` in `iframe` with new `login`

This may sound complicated but don't worry - writing it's code is easier

First - assign friend's `login` and user's `uid` to variables.

```php
$uid = $_SESSION['uid'];
$friend = htmlentities($_GET['friend'], ENT_QUOTES, "UTF-8");
$isValid = true;
```

And let's start executing queries
In first one - check if friend even exist (this sounds a bit schizophrenic actually). If yes, then get their userid


```php
try{
    require_once "creds.php";
    $db = new PDO($db_dsn, $db_user, $db_pass);

    $sql = "SELECT `id` FROM `users` WHERE `login` = ? OR `login` = ?";
    $stmt = $db->prepare($sql);
    $stmt->execute([$friend, $uid]);

    if(!$stmt->rowCount()){
        echo "This user does not exist";
       $isValid = false;
    }

    $fid = $stmt->fetch(PDO::FETCH_ASSOC)['id'];
}catch(PDOException $e){
    echo "Internal server error - try again";
}
```

An if we are sure that we are not talking to any imaginary friend - let's fetch the messages

Our most important step is to write a query - without it we won't do anything - It'll be a bit harder
```php
 $sql = "SELECT * FROM `messages` WHERE (`destination` = ? AND `sender` = ?) OR (`destination`= ? AND `sender` = ?)  LIMIT 15";
    
```

At the and I've added `LIMIT 15` - This indicates that I want only 15 newest results

Now, execute it
```php
    $stmt = $db->prepare($sql);
    $stmt->execute([$fid, $uid, $uid, $fid]);
```

And fetch the results into array
```php
$messages =  $stmt->fetchAll(PDO::FETCH_ASSOC);
```

I've used `fetchAll` to be perfectly sure, that this will give me all of the results and not only the first one

Lastly we need to show it in some clever form - I've got a idea
```php
foreach($messages as $message){
        $datetime = $message['timestamp'];
        $content = $message['content'];
        $sender = $message['sender'] === $fid ? $friend : $_SESSION['login'];


        echo<<<END
            $content 
            <br/>
            Sent at $datetime
            <br/><br/>
        END;
    }
```
I'll focus on this one line

```php
$sender = $message['sender'] === $fid ? $friend : $_SESSION['login'];
```

Here, I've used ternary operator - that's short form of `if-else` statement. That line basically means

" If value under `sender` key in $message array is equal to $fid then assign $friend variables value to $sender. Otherwise assign value from `$_SESSION['login']` there "

Finally after I entered `dm_receive.php` I've seen this

![Final result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/goukoujzbjiabv8h85j6.png)


Note: For tests I've sent a bit of messages before, using our script. You can do this too if you want. I've also added one new user for realism - as I said whole dump will be available on Github


Now, let's go back to `secret.php` - that's the last part

### Merging everything together

When we go back to `secret.php` we need to add 2 things

1. `iframe` element, but as we will be adding it with JavaScript, some info for people with it disabled needs to be present. I'll use [`noscript`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/noscript) tag for it

2. List of friends.

We can start with creating that list - you can get rid of the placehoder inside `ul`

#### Creating list of friends

Most here is to run the query but select only unique items - that's how `DISTINCT` in SQL work

So, let's write the query, this one will be a bit complicated - of course we need to put it in php tags. Don't forget closing one too
```php
<?php
$sql = "SELECT DISTINCT `users`.`login` 
        FROM `messages` 
        RIGHT JOIN `users` ON `users`.`id` = `messages`.`sender` 
        WHERE `destination` = ?
        UNION
        SELECT DISTINCT `users`.`login`
        FROM `messages`
        RIGHT JOIN `users` ON `users`.`id`=`messages`.`destination`
        WHERE `sender` = ?
";
```
Let's explain it a bit, as we used 3 new things here, just to send less queries to database - we are sending only one

1. `UNION` - This operator is used to combine results of 2 `SELECT` statements. So here we will have combined results from records where logged user is either sender or receiver of the message - instead of 2 queries we have 1. How cool is this

2. `RIGHT JOIN` - It's one of SQL [`JOIN` types](https://www.geeksforgeeks.org/sql-join-set-1-inner-left-right-and-full-joins/). `RIGHT` means that second table (Here `users`) is more important than the first one. 

What does it mean?

It means, that if we have a record from first table (messages) that doesn't match anything from the second table (users) then it will be skipped - that's exactly what we need

3. `DISTINCT` - that's an operator used to select only unique items in the set - so if we would have 2 messages from the same user to us this operator will choose only the first one, skipping second.

Okay, this is covered - let's execute the query
```php
require_once "creds.php";
try{
    $db = new PDO($db_dsn, $db_user, $db_pass);
    $stmt = $db->prepare($sql);
    $stmt->execute([$_SESSION['uid'], $_SESSION['uid']]);

    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
}catch(PDOException $e){ 
    echo "Server error - Can't fetch friends </br>".$e;
}
?>
```

Last part is to show it - set buttons `name` attribute as login from database

Like this
```php
foreach($result as $user){
    echo '<li><button class="friend" name = '.$user['login'].'>'.$user['login'].'</button></li>';
}
```

And we have it ready - now let's display it on `secret.php`

#### Creating iframe with messages

First put `noscript` inside `conversation` article tag
We need to be sure that user knows why there are no messages displayed

```html
<noscript>Can't load iframe with messages - enable your JavaScript and refresh the page</noscript>
``` 

Now, when we have this secured. Let's write JavaScript

Create a file called `conversation.js` and link it at the bottom of `secret.php` right before `</body>`

```html
<script src ="conversation.js"></script>
```

Now open that file and start writing

First, we need to get every button previously made into array of objects

```js
const friendListButtons = document.querySelectorAll('.friend');
```

Then let's determine which conversation is active

```js
let activeConversation = friendListButtons[0].name
```

We also need a function to generate our `iframe`
```js
const createIframe = (conversation) =>{
    document.querySelector('.conversation')
    .innerHTML = 
    `<iframe src="dm_receive.php?friend=${conversation}" frameborder="0"></iframe>`

}

```

Now, the most important part - to each button add a event listener that will change `activeConversation` variable and regenerate `iframe`

```js
friendListButtons.forEach((el)=>{
    el.addEventListener("click", ()=>{
        activeConversation = el.name
        createIframe(activeConversation);
    })
})
```

Last part - let's refresh this iframe each 10 seconds
```js
createIframe(activeConversation)
setInterval(()=>{createIframe(activeConversation)}, "10000")
```
I've also added one call for that function - so we don't have to wait at the beginning just to get the first conversation


And that's it - Congratulations, you've successfully created DM system in PHP and learned a lot of new things

## Conclusion and some comments from the author

This was (I think) the longest article I've ever written - and I really enjoyed it

I've had a bit of false start with this article (Instead of `save draft` I've clicked `Publish) but here is the finished version

Let me know what do you think - If there are any improvements I could make, feel free to suggest them in comments here or on Github

Speaking of Github here is the [link for the repository](https://github.com/wizarddos/Dev.to-scripts) (I won't be mad if you give me a star or a follow too ;))

Every account here has the same password - `MyCoolPassword`

What should I code next? Share your ideas and feedback here on dev.to and check out my other articles

Bye and see you soon