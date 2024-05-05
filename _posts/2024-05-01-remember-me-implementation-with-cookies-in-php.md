---
layout: post
title: 'Cookies and "Remember Me": A Guide to Secure Implementation in PHP'
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

What's up? 

As web developers, we should be making websites, as comfortable for users as we can.

Would you like to log in every time you visit Facebook or Instagram? It takes a lot of time!
Following the example of those websites, let's implement **"Remember me"** functionality as well.
<!--more-->

Off we go!

## Table of Contents

First, I'm gonna explain what `cookies` are and how can we use them

Then, we'll talk a little about easiest implementation and its security issues

And finally, we'll implement our `Remember me` mechanism in PHP with all the knowledge we've gained before and what's important - in a secure way.

Prepare for a fair amount of reading

We won't be writing whole login from scratch - we're gonna use [this one](https://github.com/wizarddos/Dev.to-scripts/tree/master/PHP%200%20to%20hero/Part%2012%20-%20SQL%20pt.%204), written as an example in my [PHP course](https://wizarddos.github.io/blog/programming/PHP_0_to_hero/12)

Check that out in the meantime, but now let's get started!

## Cookies and it's characteristics

Cookies are simple files, created by web server and stored on our computer by web browser.

What are they used for?
- Sessions - websites identify users with those. As [Cloudflare says](https://www.cloudflare.com/learning/privacy/what-are-cookies/)
>  A session cookie contains a unique string (a combination of letters and numbers) that matches a user session with relevant data and content for that user.
PHP calls its cookie `PHPSESSID`

- Personalization - they allow websites to customize user experience and remember user's choices (such as picked language or theme)
- Tracking - Probably most famous usage of cookies. When you look to buy a computer online and then you see a fresh new laptop's ads. It's their fault

But what does a cookie actually look like?

### Anatomy of a cookie

Cookie has 3 main components
1. Name - it allows us to distinguish cookies between themselves
2. Value - Actual cookie's content
3. Attributes - additional data about cookies for browser and web server such as **expiration date**, **HttpOnly** or **Domain**

## Utilizing cookies in PHP and JavaScript

In PHP to get value from a cookie, we use `$_COOKIE` superglobal 

```php
echo "Hi ".$_COOKIE['name']."!";
// Output: Hi Sam!
```
To set one, PHP provides us with [`setcookie()`](https://www.php.net/manual/en/function.setcookie.php) function
```php
setcookie("name", "Sam", time()+60*60*24*7, '', '', false, true);

```

First parameter is cookie's name. Second defines its value

In third one, we pass a unix timestamp of cookies expiration - if not set, it will get deleted after session ends.

Fourth is a path where cookie is available, fifth is a domain, that it's available for - here they are not set

Sixth sets `Secure` parameter - indicates if cookie should only be transmitted via HTTPS 
And last one is `HttpOnly` - means that this cookie is only accesible through HTTP protocol. 

No JS script will get it with that flag. It's another layer of security against XSS attacks

In JavaScript, we have the `document.cookie` string. 

To get a cookie, we can use such script

```js
function getCookie(name) {
    if (document.cookie !== "") {w
        const cookies = document.cookie.split(/; */);

        for (let cookie of cookies) {
            const [ cookieName, cookieVal ] = cookie.split("=");
            if (cookieName === decodeURIComponent(name)) {
                return decodeURIComponent(cookieVal);
            }
        }
    }

    return undefined;
}
```


## Fastest inplementation - insecure way

The simplest way to remember a user in a website is to add it's `userid` into a cookie and then, simply check if they match

```php
// Code with database connection...

if(isset($_COOKIE['userid'])){
    $sql = "SELECT * FROM users WHERE userid = ?";
    $db = new PDO($db_dsn, $db_user, $db_pass);
    $stmt = $db->prepare($sql);

    $stmt->execute([$_COOKIE['userid']]);

    if($stmt->rowCount() == 1){
        header("Location: dashboard.php");
        die();
    }
}

if(isset($_POST['remember-me'])){
    setcookie('userid', $userID, time()+60*60*24*7, '', '', false, true);
}
```

But **beware of this solution** - it's common security vulnerability.
Users are able to modify this cookie. Then they'll access another account


_But, we can just store random bits in the database, right?_

Technically, yes. But it draws us to another security issue - **timing attacks**

If we have this pair of tokens
```
w8g3RfhZTk9s7LNy4E20P5IxYmluBOQW7qVaAczMo6pvh9JUFeXKjCnDH1dbZa5
w9g3RfhZTk9s7LNy4E20P5IxYmluBOQW7qVaAczMo6pvh9JUFeXKjCnDH1dbZa5
```

Comparison will stop after second character - one character doesn't match, so why should we bother to change the rest?

But in this scenario
```
w8g3RfhZTk9s7LNy4E20P5IxYmluBOQW7qVaAczMo6pvh9JUFeXKjCnDH1dbZa5
w8g3RfhZTk9s7LNy4E20P5IxYmluBOQW7qVaAczMo6pvh9JUFeXKjCnDH1dbZa8
```

Database needs to compare every single character and then it can truly state that those are not the same

There comes a difference. First one will be faster than the second one. And that's where the vulnerability comes in. 
By measuring time of comparison, we can guess which characters match and which not.

Of course, it's not severe difference (Like a nanosecond or so), but you should keep this in mind.

_How to write it correctly then?_

## Implementing secure `remember me` mechanism

While doing research for this article I've found an interesting approach - **selector:validator**

How do we implement it? 

First, we'll use `selector` to get correct token from the database. Then we're gonna compare hashed validator to the one from a cookie and if they match - user is loged

That's how no sensitive user data is stored in cookies and we also minimize risk of timing attacks.

So, no time to waste and let's go!

### Get login 

In here, I could spend another half an hour writing a login script. But as I said, I'll use one we've wrote in [PHP course](https://wizarddos.github.io/blog/series/php_0_to_hero.html) - [this part](https://wizarddos.github.io/blog/programming/PHP_0_to_hero/12) to be specific

Let's copy the code from [this repository](https://github.com/wizarddos/Dev.to-scripts/tree/master/PHP%200%20to%20hero/Part%2012%20-%20SQL%20pt.%204)

To see full explanation, check the article linked earlier

Now, time for writing - open `index.php`

### Add checkbox with `remember me`

This won't be anything amazing - in `index.php` add checkbox at the end of that form
```html
<label><input type="checkbox" name="remember-me"> Remember me </label><br/>
```
Before PHP, we need to have a database ready

### Creating database

First, lauch your DBMS and, if you want to, some administration tool

I'll be using PHPMyAdmin with MySQL

In my case, database is called `remember-me` and has 2 tables
1. **users**
 - userid (Primary key)
 - username
 - password
2. **tokens**
 - tokenid (Primary key)
 - selector
 - validator
 - expiration
 - userid (Foreign key)

Create a database
[![Database creation](https://i.postimg.cc/nc6Y0rHW/obraz.png)](https://postimg.cc/CzsqKFnC)

Then set up tables - I started with `users`
[![Users view](https://i.postimg.cc/xTHtrMFQ/obraz.png)](https://postimg.cc/Yhr1YGHD)

And Tokens
[![Tokens view](https://i.postimg.cc/28y6K7Hc/obraz.png)](https://postimg.cc/w7KgtLYL)

`expiry` is `int` as it will store unix timestamp

I've also added one user - user1
```sql
INSERT INTO `users` VALUES(NULL, "user1", "$2y$10$7uKWbeYe7X/oZyQT/fxxfOp8ichcShxejqSXAOSYbMFiNCwkpe70.")
```
Now we have something to test it with: password is `test123`

All right, done. Time for interesting part

### Adding a token to the database

Open `login.php` - there you should have a bunch of code

After
```php
$_SESSION['isLoged'] = true;
```

We'll write our code

1. Check if user set checkbox
```php
if(isset($_POST['remember-me'])){
        
}
```

2. Then we generate 2 random values
```php
$selector = bin2hex(random_bytes(16));
$validator = bin2hex(random_bytes(32));
```

3. Combine it into one piece and standarize expiration date (Here it's 1 month)
```php
$cookie = $selector.":".$validator;
$expiration_date = time()+60*60*24*30;
```

4. Time for SQL - insert that data into the database
```php
$sql = "INSERT INTO `tokens` VALUES(?,?,?,?,?)";
$stmt = $db->prepare($sql);
$stmt->execute([NULL, $selector, password_hash($validator, PASSWORD_DEFAULT), $expiration_date, $results['user_id']]);
```

5. If everything went well - set a cookie
```php
setcookie("save-login", $cookie, $expiration_date, "","", false ,true);
```

This part is done, go back to `index.php` 

### Check token

Why should we even bother with loging in, when we want to be signed in always

We'll be appending code to the end of a file

1. Check if cookie is set - if not just exit the script
```php
if(!isset($_COOKIE['save-login'])){
    die();   
}
```

2. Split cookie into selector and validator in an array
```php
$cookie = explode(":", $_COOKIE['save-login']);
```

3. Add try-catch block for PDO exceptions and connect to the database
```php
try{
    require_once "connect.php";
    $db = new PDO($dsn, $user, $password);
}catch(PDOException $e){
    echo "Cookie checking failed";
    die();
}
```

4. Search for correct token with selector
```php
$sql = "SELECT * FROM `tokens` WHERE `selector` = ?";
$stmt = $db->prepare($sql);
$stmt->execute([$cookie[0]]);

$result = $stmt->fetch(PDO::FETCH_ASSOC);
```

5. Check if they match
```php
if(password_verify($cookie[1], $result['validator'])){
    $_SESSION['isLoged'] = true;
    header("Location: secret.php");
}
```

We can add one more thing - every time someone uses this functionality, delete every expired token
```php
$sql = "DELETE FROM `tokens` WHERE `expiry` < UNIX_TIMESTAMP(NOW())";
$stmt = $db->query($sql);
```

Overall, our code looks like this
```php
<?php
    if(!isset($_COOKIE['save-login'])){
        die();   
    }

    $cookie = explode(":", $_COOKIE['save-login']);

    try{
        require_once "connect.php";
        $db = new PDO($dsn, $user, $password);

        $sql = "SELECT * FROM `tokens` WHERE `selector` = ?";
        $stmt = $db->prepare($sql);
        $stmt->execute([$cookie[0]]);

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if(password_verify($cookie[1], $result['validator'])){
            $_SESSION['isLoged'] = true;
        }

        $sql = "DELETE FROM `tokens` WHERE `expiry` < UNIX_TIMESTAMP(NOW())";
        $stmt = $db->query($sql);
        
    }catch(PDOException $e){
        echo "Cookie checking failed";
        die();
    }
    
?>
```

And that's it. Congrats

## Conclusion

This was fairly long article - thanks for reading.

I hope you've learned something new and have another tool in your PHP arsenal

Code for this article will be available on [my GitHub](https://github.com/wizarddos/Article-scripts/tree/master/remember-me) with database dump as well(You can leave me a follow if you want to)

I've got like 3 more articles in mind so prepare yourself for nice reading
And additionaly, would you be interested in YouTube channel with my blog contents but spoken? 

Feel free to share your thoughts on everything in the comments. See you next time!
