---
layout: post
title: Variables, constants, arrays, superglobals - PHP 0 to hero pt.4
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
permalink: /programming/PHP_0_to_hero/4
is_series: true
series_title: "PHP_0_to_hero"
part: 4
---

Welcome back - Today we will be learning about one of the most important concepts of programming - storing data

<!--more-->
I won't make this intro too long - this article consists of 4 parts

1. Variables
2. Constants
3. Arrays
4. Superglobals

No more - let's start learning

### Variables

So, what is a variable?

As Oxford dictionary says
>a data item that may take on more than one value during the runtime of a program.

So basically a data item, that has assigned value and it can be changed

For example - If we wanted to store how many times, user clicked the button on our website - we would do this in variable, as it changes

In PHP, you define variable we use `$` (dollar sign)

```php
$[name] = [assigned value]
```
Where `[name]` is variables name and `[assigned value]` is some value like number or string
In the same way, you change that variable - if we want to print it
```php
echo $variable
```

And when we are talking about assigning values - let's mention **variable types***

In PHP when we assign value to variable, it also gets it's type

If we want to check it - use `gettype()` function
```php
echo gettype($variable);
```
As a result we can get

-   "boolean"
-   "integer"
-   "double" 
-   "string"
-   "unknown type"
[And some more]


PHP is **dynamically typed** (sometimes you can see word `loosely` instead of `dynamically`) language - what does it mean?
It means, that we as programmers don't have to specify what type will variable be, and it can change it's type multiple types during execution (which is both good and bad)

And last thing - naming conventions
We want our code to be readable, don't we? That's why there are naming conditions. For PHP most popular is [PHP Standards Recommendations](https://www.php-fig.org/psr/) in short `PSR`

It's commonly agreed that variables should start with small letter 

So instead of:
```php
$Variable = 5;
```

You should write
```php
$variable = 5;
```

For computer - it's the same. For reader - It makes a huge difference especially as almost every data structure is declarated with `$` at the beginning in PHP - without naming conventions reading and understanding code is much harder

### Constants

Constants are really similar to variables - but with a catch

You can't overwrite their value while executing code - It's fixed and will be their until finishing execution

As a naming convention - Constants should be always defined with capital letters and words should be separated with underscore

So how do we use it in practice?

There are 2 ways of declaring and accessing a constant

1. Using `const` keyword and accessing it by it's name

```php
const CONSTANT = 5;
echo CONSTANT;
```
2. Using `define()` function and `constant()` function
```php
define("CONSTANT", 5);
constant("CONSTANT");
```

If there is anywhere a incorrectly named constant (like `2CNST`) you can access it only with `constant()` function, however it's not recommended and we should stick to mentioned earlier naming convention 


### Arrays

Last data structure I'll talk about are `arrays` - variables that can hold multiple values at one time

To declare, we can use either square brackets (`[]`)
```php
$array = [1, 2, 1, 4, 5];
```

Or `array()` function
```php
$array = array(1, 2, 1, 4, 5);
```

In both of these examples we assign values - but we don't refer to them per value - as it may change or we can have 2 same values. That's why we use **indexes**

So, If we want to refer to fourth element in array we will write
```php
$array[3];
// 4
```

Why 3? Because arrays start their indexing from `0`, not `1`

So to access first element in array, we refer to a field with `index = 0` (`index` is a number in brackets)
```php
$array[0];
// 1
```

Of course, we can change the array indexing - but to be honest I rarely used them
```php
$array = array(
         "a",
    6 => "c",
         "d",
);
```
And, when we dump value with `var_dump` value we use
```php
var_dump($array)
/* 
array(4) {
  [0]=>
  string(1) "a"
  [6]=>
  string(1) "c"
  [7]=>
  string(1) "d"
}
*/
```

This syntax
```php
 6 => "c"
```

Means "Assign key `6` to value `"c"`" - but we don't have to limit ourselves to only numbers

We can declare them with words too
```php
$array = array(
    "foo" => "bar",
    "bar" => "foo",
);

//And we access it

$array['foo'];
```

These arrays are called **associative arrays** - the array where keys are strings and not numbers.

But there is one last array type - multi-dimensional array. They are rarely used, yet still you should know them

We can represent this type of array like a table


![Array represented as table](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/np10drpg225yzuyoodbo.png)

To declare it - we use array in an array - Create one, with data from that table, like this

```php
$mDimArr = [
    ["Foo", "Bar", "Foo"],
    ["Fo2", "Bar2", "Foo2"],
    ["Foo3", "Bar3", "Foo4"],
];
```

And to access it, just use double square brackets. For example
```php
echo $mDimArr[2][0];

// Result: Foo3
```
Of course, we can make it deeper and nest more tables - but this is just a example

Now, last but very important

#### Superglobals

Last data structure I'd like to talk about are **Superglobals**

Do you remember `$_GET` from last article? That's the perfect example of superglobal - For the definition, docs say that they are:
> Built-in variables that are always available in all scopes

Now, another question arises - What is a scope?

To explain it simply - Scope can be defined as place where variable/constant/array etc. can be accessed - What does it mean?

This means ( And I'll also very simplify this so please, don't eat me for it) that there is a special range, where you can access the variable - so for example only in a file or a function and not outside. 

Mostly our variables have single scope - differences come when we start to declare functions, what we will do later in this series

And coming back to superglobals - these variables can be used everywhere and you don't need them re-declared in every file

There are several [predefined superglobals](https://www.php.net/manual/en/language.variables.superglobals.php) Like
- `$_GET` - for data from GET requests
- `$_POST` - for data from POST requests
- `$_COOKIE` - for accessing websites cookies
- `$_SERVER` - Used to access information about Server

I purposefully don't provide you with any generic example, as you don't really declarate them - they are pre-declarated and you can add data to some of them - but no worries, I'll cover how to do it in other articles


## Conclusion 

That's it for today - this is kinda long yet I hope useful. To learn more, check out links in the article - they lead to docs and may be worth visiting

But for now, share your feedback in comments below, I appreciate it so much. Check out other parts of this series and wait for the next part - It will appear next Thursday

That's is, see you later