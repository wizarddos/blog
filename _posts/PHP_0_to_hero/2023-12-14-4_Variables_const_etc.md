---
layout: post
title: Variables, constants, arrays, superglobals - PHP 0 to hero pt.4
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
permalink: /programming/php_0_to_hero/4
is_series: true
series_title: "php_0_to_hero"
part: 4
---

Welcome back
This time, our main focus will be **storing data** in our code.
There are many ways, in which we can do it and today - I'll show you some of them

<!--more-->
So, to be more specific, what will we learn today?

1. Variables
2. Constants
3. Arrays
4. Superglobals

No more talking - off we go.

### Variables

What is a variable?

As Oxford dictionary says
> a data item that may take on more than one value during the runtime of a program.

So data item, that has assigned value and it can be changed

For example - If we wanted to store how many times, user clicked the button on our website - we would do this in variable, as it changes

In PHP, you define variable using `$` (dollar sign)

```php
$[name] = [assigned value]
```
Where `[name]` is variables name and `[assigned value]` can be string, number etc.
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
[And some more](https://www.php.net/manual/en/function.gettype.php#refsect1-function.gettype-returnvalues)


PHP is **dynamically typed** (sometimes word `loosely` is used instead of `dynamically`) language - what does it mean?
We as programmers don't have to specify what type will variable be. Variable's type can also change multiple times during execution.

And how to name those variables?

We want our code to be readable, don't we? That's why there are naming conventions. 
For PHP, most popular is [PHP Standards Recommendations](https://www.php-fig.org/psr/) - `PSR` in short 

It's commonly agreed that variables should start with small letter 

So instead of:
```php
$Variable = 5;
```

You should write
```php
$variable = 5;
```

For a computer - it's the same. 

But for reader - It makes a huge difference especially as almost every data structure is declared with `$` at the beginning in PHP - without proper naming reading and understanding code is much harder

### Constants

Constants are really similar to variables - but with a catch

You can't overwrite their value while executing code - It's fixed and will be unchangeable until finishing execution

As a naming convention - Constants should be always defined with uppercase and words should be separated with underscore

So how do we use it in practice?

There are 2 ways of declaring and accessing a constant

1. Using `const` keyword and accessing it with it's name

```php
const CONSTANT = 5;
echo CONSTANT;
```
2. Using `define()` function and then `constant()` function to access
```php
define("CONSTANT", 5);
constant("CONSTANT");
```

If there is anywhere a incorrectly named constant (like `2CNST`) you can access it only with `constant()` function, however it's not recommended. We should stick to mentioned earlier naming convention 


### Arrays

Last data structures I'll talk about are `arrays` - they can hold multiple values at one time

To declare, we can use either square brackets (`[]`)
```php
$array = [1, 2, 1, 4, 5];
```

Or `array()` function
```php
$array = array(1, 2, 1, 4, 5);
```

As those values might change, to access them we use **indexes**

So, If we want to use fourth element in array we will write
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

Of course, we can change the array indexing - but to be honest that rarely comes in handy. Stick to typical indexing
```php
$array = array(
         "a",
    6 => "c",
         "d",
);
```

This syntax
```php
 6 => "c"
```

Means "Assign key `6` to value `"c"`" 

If we decided to change it - there's no problem to look it up using `var_dump()` 
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
It can also help with **debugging** (fixing our code)

Regarding indexes, we don't have to limit ourselves to only numbers

We can declare them with words as well
```php
$array = array(
    "foo" => "bar",
    "bar" => "foo",
);

//And we access it

$array['foo'];
```

These are called **associative arrays** - the array where keys (indexes) are strings and not numbers.

But there is one last type we need to talk about - multi-dimensional arrays. 
They are rarely used, yet still you should know them

We can represent this type of array like a table


![Array represented as table](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/np10drpg225yzuyoodbo.png)

To declare it - we use array in an array 
Create one, with data from that table, like this

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
Of course, we can make it deeper and nest more tables - in consequence making 3,4,5 or even 6 dimensional arrays

Now, last but very important

#### Superglobals

Last data structure I'd like to talk about are **Superglobals**

Do you remember `$_GET` from last article? That's the perfect example of a superglobal - For the definition, docs say that they are:
> Built-in variables that are always available in all scopes

Now, another question arises - What is a scope?

To explain- Scope can be defined as place where variable/constant/array etc. can be accessed - What does it mean?

This means that there is a special range, where you can access the variable - so for example only in a file or a function and not outside. 

And coming back to superglobals - these variables can be used everywhere and you don't need them re-declared in every file

There are several [predefined superglobals](https://www.php.net/manual/en/language.variables.superglobals.php) Like
- `$_GET` - for data from GET requests
- `$_POST` - for data from POST requests
- `$_COOKIE` - for accessing websites cookies
- `$_SERVER` - Used to access information about the server

I purposefully don't provide you with any generic example, as you don't really declare them - they are here, built into the language and you can add data to some of them 
No worries, I'll cover how to do it in other articles

## Conclusion 

That's it for today - To learn more, check out links in the article - they lead to docs and may be worth visiting

But for now, share your feedback in comments below, I appreciate it so much. 
Check out other parts of this series and wait for the next part

That's is, see you later
