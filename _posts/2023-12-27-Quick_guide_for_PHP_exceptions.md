---
layout: post
title: Variable variables - depths of PHP docs pt. 2 
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---


Hi, hi. What's up? 

Today I'd like to bring you closer to the topic of PHP exceptions

<!--more-->
## Why do we need them?

If you coded in PHP long enough, you know there are problems. Sometimes we would like to inform our users, that  "hey, something crashed on our side. We will fix it"

We can definitely change one line in `php.ini` and show error to the users, can't we?

Yes, but that's really bad idea.

Sometimes inside error messages we can find 

1. PHP code
2. SQL code

Disclosing both of them may show the attacker, that site is vulnerable or just give important information out (like DB table names, or fields)

And that's why we have **Exceptions** - to perfectly and clearly handle every possible bug

## try-catch

Core part of exception mechanism is **try-catch** block:

It looks like this:
```php
try{
    // code that may be problematic
}catch(ExeptionType $e){
    // Code to execute if something messes up
}
```

Now, if something messes up, instead of ugly error message, we can show something like "Sorry, something crashed. We are working on it" and add the error message to log file.

That's the sole purpose of `catch` block. And there can be many of them

```php
try{
    // some dangerous code
}catch(ExceptionType1 $e){
    // code to handle this type of exception
}catch(ExceptionType2 $e){
    // code to handle another type of exception
}// and so on
``` 

But to catch the exception, we must previously **throw** it

That's what `throw` keyword is used for - so to update our first `try-catch`

```php
try{
    // code that may be problematic
    throw new ExceptionType("some problem");
}catch(ExeptionType $e){
    // Code to execute if something messes up
}
```

The quick example from the [docs](https://www.php.net/manual/en/language.exceptions.php) shows it pretty decently

```php
function inverse($x) {
    if (!$x) {
        throw new Exception('Division by zero.');
    }
    return 1/$x;
}

try {
    echo inverse(5) . "\n";
    echo inverse(0) . "\n";
} catch (Exception $e) {
    echo 'Caught exception: ',  $e->getMessage(), "\n";
}
```

`Exception` may take a parameter - here it's message

And as you see later here:
```php
    echo 'Caught exception: ',  $e->getMessage(), "\n";
```
We get the message from an Exception object

I won't go into technical details here - as it's **Quick Guide**, but if you are into it, you can always [check out docs](https://www.php.net/manual/en/language.exceptions.php#language.exceptions)


## `finally` block

After those up, there is one optional block - **`finally`**

Code inside it will execute **every time**, no matter if there was an exception thrown or not, unless code executed `die()` or `exit()`

That's great place for ex. closing database connections 

To use it, append it to the end of a structure

For example like this
```php
try{
    // code that may malfunction
}catch(Exception $e){
    // exception handler
}finally{
    // Final code
}
```

## Exception types:

Let's divide them into 2 groups

1. Built-in
2. User made

As it's written, we will start with the first one

### Built-in exception types

PHP has it's own set of exceptions. Also libraries like PDO, may throw, their own ones

Someone, made a good list inside [user notes](https://www.php.net/manual/en/class.exception.php) in docs, so let's see some of them

- `OutOfRangeException` - some entity requested value (from array, json, object) that is not present, yet this can't be processed
- `PDOException` - while connecting to the database, something went wrong inside PDO and can't be fixed. This exception is thrown automatically, we don't have to do it ourselves
- `InvalidArgumentException` - thrown, when argument is not of specified type. 

Let's suppose we have a function that only takes numbers - if passed value is not a number, we get an exception


We can also catch errors, such as

- `DivisionByZeroError` - when our code decides it will divide something by zero
- `ParseError` - error in parsing PHP code - It indicates, that we have coded some gibberish and need to change it quickly
- `ArgumentCountError` - you have passed too little argument to function/method. For example it requires 4 arguments, but you passed only 3

Inside link mentioned above, you may find list of the rest exception types

### User-defined exceptions

But PHP doesn't limit us, just too built-ins. We can freely extend `Exception` class and add something from us

Let's create a simple exception class, that will throw an exception, if passed data is not an integer, and will convert it if needed

```php
class NaIException extends Exception{

    public function __construct($message, $code = 0, Throwable $previous = null) {
        parent::__construct($message, $code, $previous);
    }
    
    public function NaIToInteger($NaI){
    	return (int) $NaI;
    }
}
```
Does it work? Let's check it

```php
$IsNumber = "5.0";
try{
	if(!is_int($IsNumber)){
    	throw new NaIException("This is not an integer");
    }
}catch(NaIException $e){
   $e->getMessage();
   echo "<br/>";
   echo "Converted: ".$e->NaIToInteger($IsNumber);
}
```

And a result is:
```
Converted: 5 
```

Yeah, it works. If you pass a normal integer, nothing will be shown

More about it, you can read in [docs](https://www.php.net/manual/en/language.exceptions.extending.php)


## Conclusion

That's it for this quick guide, share your feedback in comments below.

I encourage you to check out linked sources, as they contain much more info. That's just a quick guide so I told you only basics - now you learned some fundamentals of exceptions

Thanks for reading and see you in my next articles