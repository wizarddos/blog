---
layout: post
title: Quick Guide for PHP prepared statements
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

In my last post I mentioned prepared statements. 
Now, let's expand on this topic and see how we can implement them in our code
<!--more-->
Here, I will show prepared statements in PDO and mysqli. 
I strongly recommend to use PDO. I'll explain why a little later.

In this post I expect that You know basic terms connected to databases (Query, DBMS etc.) and basic usage of PHP (variables, functions, objects), so I won't cover those topic completely in this post

## Database

I'm going to use simple database, that looks like this

![Database used in this post](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cjxf0fwybgaah2tm6v1v.png)

## Typical way of executing queries - query() function
 
Most common and often taught method of executing queries is with query() function

ex.

```php
$sql = 'SELECT * FROM `users` WHERE `username` = "'.$username.'"';
$db = new mysqli("localhost","root", "", "test");

$res = $db->query($sql);

print_r($res->fetch_assoc());
```
This code is quite bad, as it would be vulnerable to SQL injection attack, if the `$username` variable is not defined by us, but by the user


Of course we can validate `$username` (using [htmlentities](https://www.php.net/manual/en/function.htmlentities) for example)
then we would increase queries safety, but let's go further

## Our first prepared statement
Ok, now we know something about running queries in PHP, let's discover another way called prepared statements.

What is a prepared statement? It's PHP's feature to run similar (or not really) queries in much safer way than using other methods.

So, let's take a look at this example, and analyze it line by line

```php
$sql = 'SELECT * FROM `users` WHERE `username` = ?';
$db = new mysqli("localhost","root", "", "test");

$stmt = $db->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$res = $stmt->get_result();

print_r($res->fetch_assoc());
```

- First two lines should look quite familiar, but we have a difference in query. instead of `"'.$username.'"` we put question mark. Why? Let's see
- In the next line we are actually declaring, that here we use prepared statement.

- The 5th line contains the answer for our question from first point. Why did we use a ? instead of typical variable insertion?
Because we are binding these values to query, and not preparing complete query. Let's analyze arguments
    - First: Type - It's just info for PHP what will be type of passed variable, whether it will be `s` (string), `i` (int) etc.
    - Second: Variable - This is an actual variable "inserted" into the query. For each of these, there should be additional letter in first argument ex.
```php
$stmt->bind_param("is",$id, $username);
```
- 6th line calls execute() method, which runs our query
- Then in 7th line we get our statements results, but it's not really a result. if we run `print_r($res)`, we will see something like this

```php 
mysqli_result Object ( [current_field] => 0 [field_count] => 4 [lengths] => [num_rows] => 1 [type] => 0 ) 
``` 
So let's check the last line

- 8th line is getting our actual results, here in form of associative array, like this

```php
Array ( [id] => 2 [username] => username1 [pass] => pass1 [email] => email1 ) 
```
But we can also use other forms of results, such as fetch_array(), fetch_object() and more.


That's it. Now you know, how to write prepared statements in mysqli, so let's focus on other method

## PDO Introduction

What is PDO?

Basically speaking, it's pre-installed php extension used as another method of connecting to database.

It's biggest advantage over mysqli is that PDO works on most of popular DBMS's, without necessity to change existing PHP code (SQL code can be different between some databases)

In PDO prepared statements are recomended method of running queries.

## Prepared statements in PDO

Prepared statements in PDO are slightly different than those in mysqli

First of all, connecting to database is not the same as in mysqli
In PDO we use dsn instead of host name and database name.

Our dsn looks like this
```
mysql:host=localhost;dbname=test
```
And opening connection with database is started with creation of PDO object

```php
$db = new PDO("mysql:host=localhost;dbname=test","root", "");
```

Now, what changes in PDOs prepared statemens?

We don't need bind_param (but still it is, so we can use [bindParam](https://www.php.net/manual/en/pdostatement.bindparam) instead), when we can pass our parameters as arguments to execute() function

```php
$stmt->execute([$username]);
```
NOTE: This argument has to be an array, so if you're trying to use some values that are not an array, convert them into it (you can use just [] like me there)


And last thing, fetching data instead of bunch of functions we have bunch of PDOs constants like:
- PDO::FETCH_ASSOC
- PDO::FETCH_OBJ
and some more


So, our PDO prepared statement finally looks like this
```php
$sql = 'SELECT * FROM `users` WHERE `username` = ?';
$db = new PDO("mysql:host=localhost;dbname=test","root", "");

$stmt = $db->prepare($sql);
$stmt->execute([$username]);

print_r($stmt->fetch(PDO::FETCH_SERIALIZE));
```

## Conclusion

After reading this post you know
- What are prepared statements
- What do they look like
- How to use them
- What is PDO, and why is it useful

That's it. I hope you enjoyed reading. You can leave some feedback in the comments, I'd appreciate that.
Thanks for reading and see you in the next post