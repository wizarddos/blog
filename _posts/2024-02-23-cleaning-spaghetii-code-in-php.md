---
layout: post
title: Cleaning spaghetti in PHP
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

Have you ever looked at the code and thought, "What is this mess"?

After a while, you can even say such thing about your own "masterpieces"

But remember, code review is part of the journey and perfect way to become 10x developer
<!--more-->

![Only true code quality measure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q26zj89p6q18a6enss4m.png)
_(Only true code quality measure)_

Today, we'll learn some secrets of refactoring - so your next project will look as clear as a whistle

Read the whole article carefully - You can take some breaks but don't skip the paragraphs

Yet, no more intro - let's go

## What will we be working on?

I think this is a perfect example of **spaghetti code**

```php
    <?php
    // Main code
    $h = $_POST['h'];
    $i = $_POST['i'];
    $d = $i * $h;

    if ($d > 100) {
        echo "Total is greater than 100!";
    } else {
        echo "Total is less than or equal to 100!";
    }

    $j = array("Apple", "Banana", "Orange");

    if ($h > 0) {
        if ($i > 0) {
            if ($i < 10) {
                if ($h < 10) {
                    if ($d > 100) {
                        echo "Total is greater than 100!";
                    } else {
                        echo "Total is less than or equal to 100!";
                    }
                } else {
                    echo "Quantity is greater than or equal to 10!";
                }
            } else {
                echo "Price is greater than or equal to 10!";
            }
        } else {
            echo "Invalid price!";
        }
    } else {
        echo "Invalid quantity!";
    }

    if (is_array($j)) {
        if (count($j) > 0) {
            foreach ($j as $k) {
                echo $k . "<br>";
            }
        } else {
            echo "No items to print!";
        }
    } else {
        echo "Invalid items!";
    }
?>
```
Fair amount of mess I sense. 

Overall - it's calculating total and quantity of a cart at some shopping website.

Now imagine, it's your first day at a new workplace, you are assigned fix something in this chaos. 
And there are 1000 lines like this.

Your whole shift is over, but you didn't even got half of the meaning - and bug fix is a whole different story

So, how should we approach this?

## Variable naming

Don't you dare to name variables `a`, `b`, `c` or so on
(...Unless it's `i` in `for` loop)

That's the first thing we have to fix - as far as I understood
`$h` represents quantity of products
`$i` -> price
`$h` -> total
`$j` -> items
`$k` -> item (in for-each loop)

```php
    <?php
    // Main code
    $quantity = $_POST['h'];
    $price = $_POST['i'];

    $total = $price * $quantity;

    if ($total > 100) {
        echo "Total is greater than 100!";
    } else {
        echo "Total is less than or equal to 100!";
    }

    $items = array("Apple", "Banana", "Orange");

    if ($quantity > 0) {
        if ($price > 0) {
            if ($price < 10) {
                if ($quantity < 10) {
                    if ($total > 100) {
                        echo "Total is greater than 100!";
                    } else {
                        echo "Total is less than or equal to 100!";
                    }
                } else {
                    echo "Quantity is greater than or equal to 10!";
                }
            } else {
                echo "Price is greater than or equal to 10!";
            }
        } else {
            echo "Invalid price!";
        }
    } else {
        echo "Invalid quantity!";
    }

    if (is_array($items)) {
        if (count($items) > 0) {
            foreach ($items as $item) {
                echo $item . "<br>";
            }
        } else {
            echo "No items to print!";
        }
    } else {
        echo "Invalid items!";
    }

?>
```

Looks a little better, doesn't it

But the end is far away - we've got more work to do

## Modularization

I don't think this listing is the only place in whole project, where we calculate total and display items from array 

Put these into functions - so we can reuse them later

I'm starting with calculating total

```php
function calculateTotal(int $price, int $quantity){
    $total = $price * $quantity;

    if ($total > 100) {
        return "Total is greater than 100!";
    } else {
        return "Total is less than or equal to 100!";
    }
}
```

Then, I can just write this over and over again
```php
echo calculateTotal($price, $quantity);
```
I have also added types to be sure, that I won't pass `I like pizza` as price of cart


The same thing with listing items
```php
function listItems(){
    $items = array("Apple", "Banana", "Orange");
    if (is_array($items)) {
        if (count($items) > 0) {
            foreach ($items as $item) {
                echo $item . "<br>";
            }
        } else {
            echo "No items to print!";
        }
    } else {
        echo "Invalid items!";
    }
}
```

But, when you think about it. 
We'd probably have more arrays to list. Customers, orders, complains or employees, to name a few.

So, why not write one function to list every array that we want to
```php
function listArrayItems(array $array){
    if (is_array($array)) {
        if (count($array) > 0) {
            foreach ($array as $item) {
                echo $item . "<br>";
            }
        } else {
            echo "No items to print!";
        }
    } else {
        echo "Invalid items!";
    }
}
```

Much better - now we can use it all around the code
```php
listArrayItems($items)
```

So, is it the end? Not really

## DRY and KISS

Are we doing a laundry? Will we put our computer into washing machine and then to leave in the sun?

No, no, no - don't do that to your electronics

**DRY** is an acronym - stands for **Don't repeat yourself**

In our case - we have those two snippets
```php
$total = $price * $quantity;

if ($total > 100) {
    echo "Total is greater than 100!";
} else {
    echo "Total is less than or equal to 100!";
}
```
And
```php
if ($quantity > 0) {
        if ($price > 0) {
            if ($price < 10) {
                if ($quantity < 10) {
                    if ($total > 100) {
                        echo "Total is greater than 100!";
                    } else {
                        echo "Total is less than or equal to 100!";
                    }
                } else {
                    echo "Quantity is greater than or equal to 10!";
                }
            } else {
                echo "Price is greater than or equal to 10!";
            }
        } else {
            echo "Invalid price!";
        }
    } else {
        echo "Invalid quantity!";
    }
```

The second one is just expanded with quantity check - but does it have to be combined?

That's what **KISS** rule is about

**KISS** means **Keep it simple stupid** (I don't think that "stupid" here was meant to insult anyone)

We can split this in two separate parts - no need to make a big pile out of it

So, let's focus on second snippet - we'll divide it into 2 elements

1. Check total
2. Check quantity

We don't really need to write total calculation, as we have already done this - in `calculateTotal` function

Focus on quantity checking
```php
function checkQuantity(int $price, int $quantity){
    if ($quantity > 0) {
        if ($quantity < 10) {
            echo calculateTotal($price, $quantity);
        } else {
            echo "Quantity is greater than or equal to 10!";
        }    
    }else {
        echo "Invalid quantity!";
    }
    
}
```

As in our spaghetti - quantity was only present when we calculated total, so we can call previously coded function

Let's look at our code now
```php
<?php

function calculateTotal(int $price, int $quantity){
    $total = $price * $quantity;

    if ($total > 100) {
        return "Total is greater than 100!";
    } else {
        return "Total is less than or equal to 100!";
    }
}

function checkQuantity(int $price, int $quantity){
    if ($quantity > 0) {
        if ($quantity < 10) {
            echo calculateTotal($price, $quantity);
        } else {
            echo "Quantity is greater than or equal to 10!";
        }    
    }else {
        echo "Invalid quantity!";
    }
    
}

function listArrayItems(array $array){
    if (is_array($array)) {
        if (count($array) > 0) {
            foreach ($array as $item) {
                echo $item . "<br>";
            }
        } else {
            echo "No items to print!";
        }
    } else {
        echo "Invalid items!";
    }
}

$quantity = $_POST['h'];
$price = $_POST['i'];

echo calculateTotal($price, $quantity);

checkQuantity($price, $quantity);
```

Significantly better than before, isn't it? But there are 2 more things to do

## If-else maze 

Code looks fine, but we can make it even cleaner.

Have a look at `checkQuantity()`
```php
function checkQuantity(int $price, int $quantity){
    if ($quantity > 0) {
        if ($quantity < 10) {
            echo calculateTotal($price, $quantity);
        } else {
            echo "Quantity is greater than or equal to 10!";
        }    
    }else {
        echo "Invalid quantity!";
    }
    
}
```

We can re-write it by changing if-else's conditions - I call it **negative statements**

So, instead of checking if `$quantity` is greater than 0, we check if it's less than 0 and finish this function when condition is met

Like this
```php
function checkQuantity(int $price, int $quantity){
    if ($quantity <= 0) {
        echo "Invalid quantity!";
        return 0;
    }
    
    if ($quantity < 10) {
        echo calculateTotal($price, $quantity);
    } else {
        echo "Quantity is greater than or equal to 10!";
    }    
    
}
```

Much finer - now focus on `listArrayItems()`
```php
function listArrayItems(array $array){
    if (is_array($array)) {
        if (count($array) > 0) {
            foreach ($array as $item) {
                echo $item . "<br>";
            }
        } else {
            echo "No items to print!";
        }
    } else {
        echo "Invalid items!";
    }
}
```

We also see here nested statements - quick fix?
```php
function listArrayItems(array $array){
    if (!is_array($array)) {
        echo "Invalid items!";
        return 0;
    }

    if (count($array) < 0) {
        echo "No items to print!";
    }
        
    foreach ($array as $item) {
        echo $item . "<br>";
    }
}
```

Much better now - what does our code look like?
```php
<?php

function calculateTotal(int $price, int $quantity){
    $total = $price * $quantity;

    if ($total > 100) {
        return "Total is greater than 100!";
    } else {
        return "Total is less than or equal to 100!";
    }
}

function checkQuantity(int $price, int $quantity){
    if ($quantity <= 0) {
        echo "Invalid quantity!";
        return 0;
    }

    if ($quantity < 10) {
        echo calculateTotal($price, $quantity);
    } else {
        echo "Quantity is greater than or equal to 10!";
    }    
    
}

function listArrayItems(array $array){
    if (!is_array($array)) {
        echo "Invalid items!";
        return 0;
    }

    if (count($array) < 0) {
        echo "No items to print!";
    }
        
    foreach ($array as $item) {
        echo $item . "<br>";
    }
}

$quantity = $_POST['h'];
$price = $_POST['i'];

echo calculateTotal($price, $quantity);

checkQuantity($price, $quantity);
```

Amazing! There's no comparison between refactored code and dirty one. 
That's the codebase you'd wish to work with

We can theoretically end here, but I have one extra stage for you.

## Additional step: Modularization pt.2

What if we want to use `listArrayItems()` in some random file - but we don't need whole cart handling

We can always move those functions to another file - and then include in everywhere needed

I've created one called `cartModules.php` with all functions inside
```php
<?php 

function calculateTotal(int $price, int $quantity){
    $total = $price * $quantity;

    if ($total > 100) {
        return "Total is greater than 100!";
    } else {
        return "Total is less than or equal to 100!";
    }
}

function checkQuantity(int $price, int $quantity){
    if ($quantity <= 0) {
        echo "Invalid quantity!";
        return 0;
    }

    if ($quantity < 10) {
        echo calculateTotal($price, $quantity);
    } else {
        echo "Quantity is greater than or equal to 10!";
    }    
    
}

function listArrayItems(array $array){
    if (!is_array($array)) {
        echo "Invalid items!";
        return 0;
    }

    if (count($array) < 0) {
        echo "No items to print!";
    }
        
    foreach ($array as $item) {
        echo $item . "<br>";
    }
}
```

And then, included it
```php
<?php

require "cartFunctions.php";

$quantity = $_POST['h'];
$price = $_POST['i'];

echo calculateTotal($price, $quantity);

checkQuantity($price, $quantity);
```

Now I can finally say - That's it

## TL:DR - best practices in bullet points
1. Give meaningful names to your variables
2. Split code into functions, classes or namespaces
3. DRY
4. KISS
5. Avoid nesting if-else statements - one layer of depth is enough. Two can slide, but three or more requires immediate code review
6. Split your functions into reusable modules - and give them meaningful names too

## Conclusion

Just got the idea, so I wrote this article - hope you enjoyed it and learned something

These are the basics - but with practice comes experience, so congrats. You have made the first step to make your scripts better

But maybe, you are a pro in code review? Do you think there is something missing? Share your intriguing stories and personal practices in comments. 

By the way, code will be available on [Github](https://github.com/wizarddos/Dev.to-scripts/tree/master/CodeRefactorPHP) both clean, and messy

Again, I hope you've enjoyed it and see you next time
