---
layout: post
title: Nice tricks for PHP beginners
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

When we start our journey with programming, we don't really think about coding styles and best practices. We just copy style of our teachers/mentors

You know this mindset "It works. Don't touch it", but let's see how we can improve some of often-written lines, with much shorter and better-looking code
<!--more-->
## 1. If-else statements

Let's take a look at this code

```php
<?php
if(empty($results)){
    return $results;
}else{
    return "Error 123";
}
```

It works, but we see that we have 2 return statments, just diffrent values

So let's re-write it

```php
return !empty($results) ? $results : "Error 123";
```

Looks better, doesn't it?

Here we used [ternary operator](https://www.php.net/manual/en/language.operators.comparison.php#language.operators.comparison.ternary) It's useful, especially when we assign value to variable, like this

```php
   $role = is_admin($id) ? "Admin" : "User";
```

### Checking for null values

Ok, now we know how to simplify our if-else statement. So let's consider this scenario

We have login form with email, assigned to account, and some additional one, for security

With knowledge from last trick, our code looks like this:

```php
$backupEmail = is_null($securityEmail) ? $securityEmail : $email;
```

Quite nice, but we can still improve it using [null coalescing operator](https://www.php.net/manual/en/migration70.new-features.php#migration70.new-features.null-coalesce-op)
It's similar to ternary, but it checks, whether value is null 

So, this is our code now

```php
$backupEmail = $securityEmail ?? $email;
```

And we have beautiful, simple code

again..

## 2. Prepared statements 

In today's back-end development with php, the safest method to run query's are prepared statements. For binding parameters to query, we often use [bindParam](https://www.php.net/manual/en/pdostatement.bindparam) function. 

```php
//some code...

$stmt = $db->prepare($sql);
$stmt->bindParam(":user",$user , PDO::PARAM_STR);
$stmt->execute();
```


But here are some problems with it

- It requires to pass a variable
- If we have multiple variables to pass to the query, we must use bindParam a lot, which makes mess in our code

Let's take a look into docs, more specifically, [execute method](https://www.php.net/manual/en/pdostatement.execute.php) parameters

>   An array of values with as many elements as there are bound parameters in the SQL statement being executed. All values are treated as PDO::PARAM_STR. 

So we don't have to add new variables and binds!
Let's re-write it

```php
$stmt = $db->prepare($sql);
$stmt->execute([$user]);

```

It may not make a big difference here but if we want to have some constant parameter, this method looks better and is faster to write

But it works, if we label parameters like in this query

```sql
 SELECT * FROM `users` WHERE `nickname` = ?
```

But for this one,  not really

```sql
 SELECT * FROM `users` WHERE `nickname` = :user
```



So, how to fix it? Using associative arrays!

```php
$stmt = $db->prepare($sql);
$stmt->execute([":user"=>$user]);
```

Now everything works fine.


## 3. match() function

In [php 8.0](https://www.php.net/releases/8.0/en.php) creators added a cool alternative for switch case, [match() function](https://www.php.net/manual/en/control-structures.match.php)

The advantage of match over switch-case is comparison method. Switch compares values using loose comparison (==), but in match we can see strict comparison (===), so in this code:

```php
switch($age){
    case "5": echo "wrong"; break;
    case 5: echo "right"; break;
}

```
where `$age = 5`, switch will match value for first case

but using match() like this

```php
echo  match ($age) {
    "5" => "wrong",
    5 => "right"
}
```

We will see "right" displayed in browser.


## TL:DR

In this article I showed you

- Ternary operator
- Null coalescing operator
- Passing binds for query as parameter for execute()
- match() as an alternative for switch-case

I hope that this article helped you with writing better code.
You can always leave some feedback in the comments, I appreciate that

