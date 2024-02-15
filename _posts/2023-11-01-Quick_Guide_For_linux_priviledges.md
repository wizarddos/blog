---
layout: post
title: Quick guide for linux privileges
author: wizarddos
category: cs-in-general
excerpt_separator: <!--more-->
---
Hi there

If you are in this industry long enough, you definitely have heard or even used some Linux distro 

If in Linux terminal we run `ls -l` command, we will get list of all files, in current directory, with their privileges. 

Here I assume you are familiar with basics of linux directory structure (you know, what is /home and /tmp for example)

 <!--more-->

## Why do we even have privileges? 

Privileges were made to restrict access to a specific resource (like file or directory)

So, quick example

Let's say, there are 2 siblings. Alice and Bob

They share one linux computer - but they have 2 accounts. One for Alice and one for Bob

Alice, in her home directory (/home/Alice) has very important file with her passwords (passwords.txt let's say)

But Bob can see what's inside alice's home directory, so he can also get her passwords?

That's where privileges come in handy. Alice can modify passwords.txt privileges in a way, that only her account can read and write it

### Types of privileges

We have 3 basic types

1. `r` - this stands for `read`. Person or a group can read file content
2. `w` - stands for `write`. When this is present, user or a group can modify, overwrite or even delete this file
3. `x` - last privilege type means `execute`. This refers to any executable or Bash script. User or a group can execute specified script

That's easy, isn't it?

Now we can complicate things, as we also have something called `special privileges` such as SUID and SGID - so called `Sticky Bits`

If one of these is set, script will always be run as it's owner

If SUID is set - as user, owning this file
If SGID is set - as group, owning this file 

They are useful for binaries like `ping` or `passwd`


### Changing privileges

To change privileges of a file you use `chmod` command with arguments

Let's say, we have this super secret file with passwords - someone gave everyone every privilege possible, and that's not good for us

We want:

- owner to read and write it
- Group to read it
- And take away every privilege for anyone else

We are starting with  this
```sh
$ ls -l passwords.txt
-rwxrwxrwx 1 alice alice 0 Oct  1 12:27 passwords.txt
```

1. First - specify for who, you want to change privileges

`u` - user (owner)
`g` - group
`o` - others
`a` - all

So
```sh
$ chmod a passwords.txt
$ chmod u passwords.txt
$ chmod g passwords.txt
$ chmod o passwords.txt
```

2. Then - tell system what do we want to do
`+` - add new privileges
`-` - remove privileges
`=` - change privileges

Now, we know what we want so let's assign those symbols to users
```sh
$ chmod a- passwords.txt
$ chmod u= passwords.txt
$ chmod g- passwords.txt
$ chmod o- passwords.txt
```

3. And last one - set them

```sh
$ chmod a-x passwords.txt
$ chmod u=rw passwords.txt
$ chmod g-w passwords.txt
$ chmod o-rw passwords.txt
```

Did it work?
```sh
$ ls -l passwords.txt
-rw-r----- 1 alice alice 0 Oct  1 12:27 passwords.txt
```

Yess, exactly as we wanted - that's it for today

## Conclusion

These are just the basics - I strongly encourage you to try it out by yourself and learn more about linux

I know, I didn't cover here `sticky bits` fully -  Main purpose of this article was to familiarize linux new-comers with privilege system in it

You can treat reading about SUID ad SGID as your homework :)

See you soon in another articles