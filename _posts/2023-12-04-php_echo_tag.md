---
layout: post
title: PHP echo tag - A simple solution to common problem 
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

Hi, what's up? If you ever coded in PHP, you definitely had created a code as simple as this

<!--more-->

```php
<?php
    echo "Some more or less important info";
?>
```

It takes us as much as 3 lines - it's not a lot but while writing my PHP course and consuming the [docs](https://www.php.net/manual/en/language.basic-syntax.phptags.php) I've encountered this

> PHP includes a short echo tag <?= which is a short-hand to the more verbose <?php echo. 

I thought - "Huh, let's give it a try". And it worked, so that's why I write this article

## A little bit of info

This **short echo tag** is in standard and is not a part of some library/framework. And by the way it's not classified as `short tag` 

So even if `short_open_tag` is disabled, this tag still works

But, let's test it

## Short echo tag in practice

So, syntax for this tag looks like this

```php
<?= "Text to display" ?>
```

When I checked it - I wrote this
```php
<?=  "Hello short echo tags" ?>
```

And it worked

![working short echo tag](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/or1l63zzrcjwb29mk63p.png)
 
(Don't think about the size, I purposefully made this text bigger with browser scaling)

But, does it allow use to use multi-line echo? Can we do something like this?

```php
<?=  
    "Hello short echo tags
    Hi"
?>
```

Yes, we can!

![Many lines](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qajue7d7wbshpv0r2la8.png)


But maybe a variable?
```php
<?php 
    $var = 5;
?>

<?=  
    $var
?>
```


![Variable](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i4doscgpi3si023e4oe5.png)

It still works!

And last test - a function + variable
```php
<?php 
    $var = "password";
?>

<?=  
    password_hash($var, PASSWORD_DEFAULT)
?>
```


![Function inside that tag](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9b5d87nx1npaqtuc3l3s.png)

No problem with that too

So, it successfully managed to pass all of the tests

## Conclusion

When I discovered this tag, my first thought was to write article about it. And when I found time - that's how this article was born

I hope you learned something new and useful, that this will help you with your work

Check out my other articles and series such as
- [PHP 0 to Hero](https://dev.to/wizarddos/series/25461)
- [Coding DIY pt.2 - making private message system with PHP](https://dev.to/wizarddos/coding-diy-pt2-making-dm-system-with-php-3459)
- [Quick guide for linux privileges](https://dev.to/wizarddos/quick-guide-for-linux-privileges-4dd6)

That's it, see you in next articles