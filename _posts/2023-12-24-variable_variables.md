---
layout: post
title: Variable variables - depths of PHP docs pt. 2 
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---


Welcome. That's me again and I have something interesting to show you.

Have you ever dreamed of being able to create a variable based of a value from another variable? 
No? Me neither. 
<!--more-->

But there is an option to do so in PHP

## What does it look like?

So, let's suppose we have one variable called `$a`

```php
$a = "hello";
```

And then, If we want to have a variable called `hello` - we can just add additional `$` to `$a`

```php
$$a = "world";
```

Now, If we need to display it - we will use either
```php
echo "$a $hello";
```

Or 
```php
echo "$a {$$a}";
```

And there is also one thing to remember - If you have numerical variable

```php
$var1 = 200;
```

And then, you create a variable variable out of it
```php
$$var1 = 500;
```

You can refer to it only via `$$` and not as `$100`

You can't make variable variable out of superglobal

And to summarize it - `Variable Variables` are variables with dynamically set name

But, 

## Why should we even use them?

They may sometimes help with readability - how?

We have this class - it's for storing employees data

```php
class Employee{
    public $emp_firstName;
    public $emp_lastName;
    public $emp_age;
    public $emp_position;

    //Rest of the class
}
```

I think you noticed, that every attribute has `$emp_` as a beginning 

So now, Instead of writing a constructor like this
```php
    public function __construct($data) {
        $this->emp_firstName = $data['FirstName'];
        $this->emp_lastName = $data['LastName'];
        $this->emp_age = $data['age'];
        $this->emp_position = $data['position'];
    }
```

We can write a shorter function with `foreach` loop
```php
    public function __construct($data) {
        $types = ["firstName", "lastName", "age", "position"];
        foreach($types as $type){
            $this->{$type} = $data[$type];
        }
    }
```
That's actually the only way I think they might be used

## Conclusion 

That's one of those features, that you don't really know are they really necessary.

But still, sometimes they are used so we should at least know, something like this exists

And, If you can you should avoid them - there are better options like associative tables and/or temporary variables

That's it i guess. Thanks for reading, share you feedback in the comments and merry christmas

