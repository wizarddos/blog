---
layout: post
title: Why is hashing passwords important?
author: wizarddos
category: Programming
excerpt_separator: <!--more-->
---

Passwords accompany us on regular basis.

You know, every day we have to use them. If not them, some of substitutes ex. physical keys like Yubikey. 

Even though code security is frequently mentioned - we still hear about recent breaches/hacks and new vulnerabilities are disclosed on weekly (if not daily) basis.

Most of web breaches work pretty simple - some endpoint was not sanitizing passed data properly, it lead to some code execution and then attacker somehow read whole database and it's now for sale on the dark web for $1000.

But, what failed? How did the attacker extract data? Can we protect ourselves? 
<!--more-->

Today, we will talk about securing passwords itself - and there is one really useful technique

I'll tell you how it works, 

## What is hashing?

Hashing is a form of converting data. Then, we end up with fixed-size output corresponding to passed data.

It's a mathematical term, but crucial in IT security.

The vital part of hashing is it's **irreversibility** - Data once hashed, can't be deciphered unless we use more black-hat techniques (cracking for example)

If we want to hash `hello` using SHA-256 algorithm it, we end up with something like this
```
2CF24DBA5FB0A30E26E83B2AC5B9E29E1B161E5C1FA7425E73043362938B9824
```

And even if we added another thousand random letters - result would also be ideally 64 characters long.

last important thing - **salt**

### Salting passwords

Just like you salt your meals to make them tastier - you salt your passwords but to be more secure

What is a salt? It's a random chunk of bytes added to the string, before hashing - so cracking it is harder

I assume that you know that passwords strength is based off on their length and randomness. It's definitely easier to guess
```
hello
```

Than
```
Kj8%'!kn)-~Yv*b4hello
```

And that string - `Kj8%'!kn)-~Yv*b4` - is a salt

We should always add those type of strings to passwords - yet here are some general rules to follow

1. Salt has to be random - Always
    - Don't reuse salts for multiple users
    - Don't use usernames as salts
    - Don't set one salt for every password
2. To generate it use [cryptographically secure](https://cryptobook.nakov.com/secure-random-generators) generator - so the salt can't be guessed easily.

Now, why do we need it?


## Why do we need hashes?

Time to answer that question - **Why should you use hashing?**

I'll sum this up in bullet points
- It adds another layer of security - Now, even if attacker gains access to the database, they need to spend time (and resources) to crack those hashes. Which might make a hack unprofitable

- Prevents from privacy violation - Let's be real, most of people reuse passwords. 
We are humans too and might have some personal affairs, better or worse. If an employee can have access to someone's password, they can (and maybe will) try it somewhere (like facebook or instagram). And if the password is reused - you know what might happen next.

We as creators don't want to be responsible any for these - so hash your passwords. That's how we can prevent those situations from happening

## Hashing algorithms 

Bold of you to assume, that there is only one algorithm - There are THOUSANDS of them. Some are less, some more secure.

According to [OWASP](https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html#introduction) the best password hash is **Argon2id**

Why? As it provides a great defense against both GPU-based (so, to simplify guessing) and side-channel (exploiting flaws in algorithm implementation) attacks

But it can't be applied everywhere - so we need to look for something else

Then OWASP suggests **scrypt** as backup option - Comparing to Argon2id
> These configuration settings provide an equal level of defense [in comparison with Argon2id]. The only difference is a trade off between CPU and RAM usage.

There are also 2 other ones to remember

1. **bcrypt** - is meant to be utilized, when we interact with legacy systems. It has it's flaws, such as limiting input to 72 bytes so if possible, use either `Argon2id` or `scrypt`


### Legacy hashing algorithms

Of course, except for the ones mentioned - there are older algorithms such as **md5** or **sha-1**. 
But they shouldn't be used - NEVER

With modern technology we can pretty easily brute-force them. 

Every algorithm will one day become outdated - stay alerted and read about new hashes, so your data will always be secure


## Conclusion

As developers, we should treat security seriously. Don't overlook it, as simple breach can tear apart company's reputation and make you pay enormous fines

I hope this article was useful, share your feedback down below
Check out other articles such as 
- [Quick guide for linux privileges](https://wizarddos.github.io/blog/cs/2023/11/01/Quick_Guide_For_linux_priviledges.html)
- [Quick guide for PHP exceptions](https://wizarddos.github.io/blog/programming/2023/12/27/Quick_guide_for_PHP_exceptions.html)
- [PHP echo tag - A simple solution to common problem ](https://wizarddos.github.io/blog/programming/2023/12/04/PHP_echo_tag.html) 

And just follow my blog in general. If you want me to write about something, share it. I'll gladly publish a post, especially for you

Stay safe and well informed. 
See you next time