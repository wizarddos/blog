---
layout: post
title: Coding DIY pt.1 - login form
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

Hi everyone. Today I'll show you how to write a basic login form in PHP
<!--more-->
#### Requirements

In this tutorial I assume you are familiar with

1. HTML
2. Using code editor of your choice (Saving, creating and deleting files)


And here you will learn
1. Basic PHP and SQL syntax
2. How to run PHP and SQL on Windows machine
3. How to protect your PHP code from SQL injection attack

So, when we have this covered. Let's start coding

### 1. Set up your environment

You can't run PHP code in your browser, as it's server-side language. You need server with an interpreter on it

So, to run PHP you must: 
1. Buy (Or find for free) a hosting with PHP running on it, to upload your files 
2. Set up your own server with PHP on your computer

Here, we will go with the second option. I know, it can sound scary but don't worry. It's not that hard

Disclaimer: I am using Windows in this tutorial. As far as I know for MacOS steps will be similar, but for Linux there is also other option by manually installing every package (If you would like a tutorial, leave some note in comments) 


Let's go, we will be using XAMPP package here - first download installer from their [official website](https://www.apachefriends.org/pl/index.html)

Then, run it.

If you have another partition on your machine (like Windows C and D) it's better to install it on one, without OS files. 

Why? Sometimes it may cause problems, with permissions for example. 

After it's completed go to `xampp` folder.

There will be a lot of folders


![Folders in `xampp` directory](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/p71z1n7x0env4fvtod97.png)

But now, we focus only on one - `htdocs`

That's the folder where you store every PHP script you want to run

Get inside and delete everything, then create a new folder named `login-form`

There, we will store source code, for this project.

Inside it, create new file named `index.php` and open it in code editor

Inside it, write this simple code
```php
<?php
 echo "server works";
?>
```

Okay, our test code is prepared - it will just display `server works` in browser

To run it, we need to start our server. In `xampp` folder find `xampp-control.exe` app. And run it, you will see something like this


![XAMPP controll panell](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m9esgxi0ccgavqgbauu7.png)

Now, click `start` button next to `Apache` and `MySQL`

Why? Apache is our PHP server and MySQL is our database (DBMS to be more precise)

Ok, last thing to do, is to visit [http://localhost/login-form](http://localhost/login-form)

You can either click this link, or write it manually as an URL

If you see a page like this

![Proper script execution](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jhjakmxlt5d2v1wcfpru.png)

Everything works fine

So, environment is set up, let's start coding

### 2. Creating form on front-end

I hope you know HTML enough to create forms.

We need a form with 2 input fields and submit

Like this
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login form</title>
</head>
<body>
    <form action="login.php" method="post">
        <input type="text" name="login" placeholder="Enter login:">
        <input type="password" name="password" placeholder="Enter password:">
        <button type="submit">Log in</button>
    </form>
</body>
</html>
``` 
Save it into `index.php` 

In `<form>` tag we have 2 important parameters

1. `action` - this indicates where will our request be sent to. Here we specify file in our directory named `login.php`. If you leave it blank, request will be sent to the same file, that it was sent from (so `index.php` in this case)

2. method - It specifies what HTTP method will be used. There are 9 of them [(According to MDN)](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods). We will be using `POST` method here, but you can also see `GET` method used there

So, front-end is ready. You can add some CSS if you want

Let's start coding login mechanism now

### 3. Basic data validation

First, to even start writing PHP code, we need to create "space" for it, by writing language tags first
```php
<?php 
```
This tells our interpreter that, here we will have PHP code to execute. We don't need to close it, as in `login.php` file we will have only PHP code

Start with checking, if we even got necessary data

```php
if(!isset($_POST['login']) || !isset($_POST['password'])){
    header("Location: index.php");
    exit();
}
```

If we anted to read this code aloud,  it says something like this

>  If login field in _POST array isn't set, or if password field in _POST array isn't set, send user to `index.php` and finish script execution

Using `$` we declare variable. And `$_POST` is one of many [superglobals](https://www.php.net/manual/en/language.variables.superglobals.php) - variables available everywhere in the project

So, we are sure that we have every necessary data. Now save them to new variables and filter them.
```php
$login = htmlentities($_POST['login'], ENT_QUOTES, "UTF-8");
$password = htmlentities($_POST['password'], ENT_QUOTES, "UTF-8");
$isValid = True
```
If there are any quotes in this variables, PHP won't interpret them as quotes ending a string, but a part of string. That's how we can protect our code from code injection -> where an attacker places malicious code in a website to execute

I also declared  `isValid` variable - this will be our flag to check if both login and password passed every validation stage

Now, check if none of them is empty. If one of them is, set the flag to false, and create an error message
```php
if(empty($login) || empty($password)){
    $isValid = false;
    $errorMsg = "Login and/or Password can't be empty";
}
```

Let's also implement some rules -> password must be minimum 8 characters long

```php
if(strlen($password) < 8){
    $isValid = false;
    $errorMsg = "Password must have at least 8 characters" ;
}
```

First part is over, now let's do database connected stuff.

### 4. Database creation

Start with visiting [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
Then find `new` on the sidenav

You should see window like this


![phpMyAdmin - database creation](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rocvfos4d2mafvyk674z.png)

In an input field, input db name - for me it's `login-form`

And choose proper encoding for your language - for me it's `utf8_polish_ci`

Then press `create`

Second thing we need to do is to create a table

When database is created you will see page with this form


![Table creation form](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ngg0fkz90sv1dpvkwdip.png)


Name this table `users` and choose 3 columns

Now, the last part of creating a table


![Naming columns](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qnpestoayx90fi0eky1s.png)


Name them `id`, `login`, `password`

For `id`, `INT` type is good to go.

But rest, should be type `TEXT`.

Also, every table needs it's primary key. 
Check `A_I` box - This will add sequentially new id's and we won't have to remember (or code) which was the last id in this table

This will also automatically make `id` our primary key

In the end, it should look like this

![Final look of our table](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/zah9w1efvftjgmiejf2m.png)

Then click `save` button, and that's it. Table created. 

Now if we want to log in we need to create a user

I used this credentials
Username: User1
Password: MyCoolPassword

Before even writing the query, we need to cover one topic - hashing

You don't store passwords in plaintext in database. 

Why?

Because if someone would hack your website and dump it (got db saved into the file with queries, allowing to reproduce it with all data), they can get your users password and hack their other accounts (some people reuse easy to guess passwords)

That's where hashing comes in handy. Hashing is method of one-way encryption. You give password to hashing function and it returns you string of bytes. ex.

`MyCoolPassword` hased in `md5` algorithm will be `539eb79895088d1fc956abec4a07cbc4`

Disclaimer: `MD5` algorithm shouldn't be used in applications today. It's not safe, there are better algorithms

Let's hash password with default PHP hash

```php
echo  password_hash("MyCoolPassword", PASSWORD_DEFAULT);
```

After running this code in some other file, I've got `$2y$10$wqobdTP/8yHOfhbA0LrIB.nXTAxWixQTvVBqQKwQC6383iqSJoOGq`- That's our hash

To insert data into SQL table we use `INSERT` query

First, specify where you want to insert query

```sql
INSERT INTO `users`
```
Then we want our values

For id - null
For login - User1
For password - $2y$10$wqobdTP/8yHOfhbA0LrIB.nXTAxWixQTvVBqQKwQC6383iqSJoOGq

So, let's finish our query

```
INSERT INTO `users` VALUES(null, "User1", "$2y$10$wqobdTP/8yHOfhbA0LrIB.nXTAxWixQTvVBqQKwQC6383iqSJoOGq");
```

Input this Query into big text area in SQL tab of `users` table in our DB

If we look at our database now, you can see something strange.

![Query result](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a5ou5a3qi8ry6sg2o99w.png)

We inserted `null` as value for `id` but now we have `1`, why?

That's the magic of `AUTO_INCREMENT` - it will automatically assign value to this field and it will be next integer

Ok, everything done. Now go back to your code editor

### 5. Creating DB connection

Before connecting: If passed data hadn't met previous requirements, why should we even bother to connect to the database if we know that login won't be successful?

Let's create `if` statement that will finish execution if `$isValid` is false

```php
if(!$isValid){
    echo $errorMsg;
    exit();
}
```

Ok, we are ready to start creating our DB connection script

To connect to database and run queries we will use PDO and prepared statements. You can learn more about them in [this article](https://dev.to/wizarddos/quick-guide-for-php-prepared-statements-26k9)

Start with adding 3 variables to the beginning of `login.php`

```php
$db_dsn = "mysql:dbname=login-form;host=localhost";
$db_user = "root";
$db_pass = "";
```

I think you can deduct what is in `$db_user` and `$db_pass` 
But, what is `$db_dsn`? 

DSN stands for Data Source Name. It's a string that tells PDO what driver should it use (what DBMS are we connecting to), what database (`login-form`) and where is it located (`localhost`)



Now, we need another variable - now for DB connection, this can be placed at the end
```php
$db = new PDO($db_dsn, $db_user, $db_pass);
```
What it does? It creates for us new object of `PDO` class. It makes connecting to database possible


We have connection, so let's write some SQL
```php
$sql = "SELECT * FROM `users` WHERE login=?";
```

In SQL there is a rule, that every keyword is capitalized.
 `*` in SQL means `all`

So, to get better understanding - Read this SQL aloud 
> Select all from users table where login equals ?

Why `?` -> it's sign for PDO, that here is the place to place bind data

Now, let's execute this query and get it's results
```php
$stmt = $db->prepare($sql);
$stmt->execute([$login]);

$result = $stmt->fetch(PDO::FETCH_ASSOC);
```
After we run the query, we need to know whether user even exists in database
```php
if(!$stmt->rowCount()){
    $isValid = false;
    $errorMsg = "Incorrect username or password";
}
```

Now, let's validate the password, this should be done only if user exists, so let's put it into `else` for previous `if`

```php
else{
    if(!password_verify($password, $result['password'])){
        $isValid = false;
        $errorMsg = 'Incorrect username or password';
    }
}
```

Why do we use function instead of `==` or `===`? Sometimes if we wanted to hash password again, we may get slightly different hash.

But when we use `password_verify()`, we can be sure that password will be properly compared to hash

That's every comparison we need, let's check if `$isValid` flag is true.

Redirect user to another page with some content accessible after successful login or display error after failed one.

```php
if(!$isValid){
    echo $errorMsg;
    exit();
}

header("Location: secret.php");
```

That's content visible only after login in my case. You can add there whatever you want

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Secret website</title>
</head>
<body>
    <h1>Welcome on secret page</h1>
</body>
</html>
```

After successful login we see


![Secret page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vlps07jk5tguxop8jqa8.png)


Now, we have one thing left

### 6. Displaying Errors

Ok, So we have everything ready and good to go, but wouldn't we like to have error messages in `index.php` and not `login.php`?

That's the task for `$_SESSION` superglobal. It allows us to save data into session storage and reuse them on other pages in our website. We can often find stuff like tokens in there

If we want to use it, we need to signalize it. Start the session at the beginning of every file.

In `index.php`  and `secret.php`
```php
<?php

session_start();
?>
```
In login.php
```php
session_start();
```
(of course after <?php tag)


Now, we need to edit every if where we are checking `!$isValid` condition, save `$errorMsg` value into session variable with the same name and, redirect to `index.php`

```php
if(!$isValid){
    $_SESSION['errorMsg'] = $errorMsg;
    header("Location: index.php");
    exit();
}
```

Now, go back to `index.php` and below the form we need to handle  and show error

Check if `errorMsg` variable is even set, then display and unset it
```php
 <?php
        if(isset($_SESSION['errorMsg'])){
            echo $_SESSION['errorMsg'];
            unset($_SESSION['errorMsg']);
        }
    ?>
``` 


We also need another validation. If user that accesses `secret.php` should be able to see it

In `login.php` let's add another session variable called `isLoged` and set it right over the redirection

```php
$_SESSION['isLoged'] = true;
```

Last, but not least. Check it in `secret.php`

```php
if(!isset($_SESSION['isLoged'])){
    header("Location: index.php");
}
```


Now, without logging in, try to visit [http://localhost/login-form/index.php](http://localhost/login-form/index.php)

We can't do it now. That's what we wanted.
Only authenticated users can access that page

And that's it. We have nice, and working login form

### Conclusion

So now, let's sum up what you know

1. How to build login script
2. Basic PHP and SQL syntax
3. How to validate and hash passwords
4. How to use XAMPP and PHPMyAdmin
5. How to use session variables in PHP

That's the end of this article. I hope you learnt something useful today. Leave your feedback and ideas for another posts in comments. I encourage you to check my other posts like tryhackme write-ups or PHP-themed articles

Code for this is available on [my Github](https://github.com/wizarddos/Dev.to-scripts/tree/master/login-form), so you can add your feedback there too, or just compare if something isn't working 

See you in next articles

