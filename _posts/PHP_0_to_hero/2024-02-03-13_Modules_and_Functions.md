---
layout: post
title: Functions, include and require. PHP modules - PHP 0 to hero pt.13
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
permalink: /programming/PHP_0_to_hero/13
---

Welcome - It's 13th part of this course

Today, we will get to something chill and easy - so we can rest a little after previous 4 parts of - I need to admit this - intensive work

We'll focus on creating clean code and dividing it into modules

<!--more-->

So, what will we talk about today?

1. What are functions and how to declare them
2. How to get code from another file
3. Advise on splitting code into modules
4. `include` vs `require` - what's the difference
5. Why do we sometimes add `_once` to both `include` and `require`

With this said - let's board and start this amazing journey

## Functions

Let's say, we are writing a game and sometimes our character dies - so we need to code the death of it

Will we create a piece of code and then copy it around? Hell no, that's a violation of **DRY principle** ("Don't repeat yourself")

And if we wanted to change something? And there'd be 5000 of those death moments - have mercy for yourself

That's why we have functions - right now we will only create one piece of code and put it in a function. 

Then, when we need it - just call the function
```php
protagnist_death();
```

How do we declare them?

### Declarating functions

We declare them in blocks - using `function` keyword

Let's say we we need to validate a password - is it at least 8 characters, doesn't it contain username etc.

So - start with the function.

```php
function validatePassword($password){

}
```

As you see, we specify that this is a function
Then declarate it's name
And open brackets for arguments

Basically it's good practice to pass every required variable as an argument - so we operate only on them or also on variables declarated inside the function

Here we only have one but we can always add more

```php
function validatePassword($password, $minLength, $username)
```

and so on, you add arguments after the commas (`,`) - as much as you want (and need)

Finish our function - let's do the second variant

```php
function validatePassword($password, $minLength, $username){
    if(!is_numeric($minLength))
    	return "Length must be a number";
        
    if(strlen($password) < $minLength)
        return "Password is too short";
        
    if(strpos($password, $username) !== false)
        return "Password can't contain username";
        
    return "Password correct";
}
```

As you see, I hadn't wrote curly brackets in `if` statements - that's just a shorter form of it.

If you write one line, you don't have to create a big block - just indicate that `return` is meant to execute after condition is met and that's it

And what's that `return`? It's basically what will remain after the execution (If you understand that concept from maths - it's like `y`)

So, let's now write a program that will use this function

```php
$username_g = "test1";
$password_g = "tes12345";
$length = 8;

echo validatePassword($password_g, $length, $username_g);

// Password correct 
```

As you see, we call a function and pass our arguments - it then returns us the result

So, with that declarated variables - the interpreter will see this

```php
$username_g = "test1";
$password_g = "tes12345";
$length = 8;

echo "Password correct";
```

And that's exactly what we have written in last return case 

You can test this code with multiple data, but let's now jump to another thing

## Including files in PHP code

We have a lot of files, that connect to the database - but we always need to pass there credentials. And what if they change?

We'll have to get through all of the files and change there data? This sound horrifying 

That's why, we create a file called `config.php` where we store all database info

```php
<?php
$db_dsn = "OUR DSN";
$db_user = "root";
$db_pass = "";
``` 

Now we can add it, but how? With function called `require` or another one called `include`

So, we connect to the database
```php
<?php
require "config.php";
$db = new PDO($db_dsn, $db_user, $db_pass);
// [...] Some code
```
We can also use `include`

```php
<?php
include "config.php";
$db = new PDO($db_dsn, $db_user, $db_pass);
// [...] Some code
```
And the interpreter, sees this

```php
<?php
$db_dsn = "OUR DSN";
$db_user = "root";
$db_pass = "";

$db = new PDO($db_dsn, $db_user, $db_pass);
// [...] Some code
```
Useful, isn't it?

But, is there any real difference between `include` and `require`? Yes, there is

### `include` vs `require`

There is one very big difference between them - error reporting

Let's say, we want to include file called `header.php`

There is one problem - that file does not exist. 
So, when we run `include` like this
```php
include "header.php";
```

It will just throw a warning (E_WARNING) and that's it - script continues like nothing happened

But, if we use `require` instead
```php
require "header.php";
```

Our script will crash and throw a fatal error (E_COMPILE_ERROR).


So, when we have some crucial mechanisms - use `require`
If site will work fine without it, or could just display an error - use  `include`


Now, the last thing about those statements

### What does appending `_once` do?

`require` and `include` are not the only options. We can append `_once` - and get `require_once` and `include_once`

They are used exactly the same and have the same differences - but how they differ from `require` and `include`?

If you happen to have some code, that might include the same file twice, using `*_once` variant will include it only once

So, if we included something twice - like here

```php
require_once "config.php";
// [...] Some code [...]
require_once "config.php"
```

The interpreter would only see
```php
$db_dsn = "OUR DSN";
$db_user = "root";
$db_pass = "";

// [...] Some code [...]
```

Without redeclarating variables in the code

### Which one is the best? 

Right now, If you write clean code, it doesn't matter which one you use. 

Personally - I mostly utilize `require_once`. But that's more of a habit.

So, choice is yours!

## Conclusion

Another part finished - hope you liked it

By the way if you have some ideas for articles, share them in comments. I'll try to write about all of them.

That's it - check out [other articles](https://wizarddos.github.io/blog/categories/programming) and see you next time