---
layout: single
date: 2022-02-28
classes: wide
header:
  teaser: /assets/images/misc/linkedin_talon/logo.png
  teaser_home_page: true
title: "Harnessing the Power of LinkedIn and Talon for Password Spraying"
excerpt: "A quick guide on low-and-slow password spraying using LinkedIn enumeration output along with the amazing Talon toolset written by Tylous."
categories:
  - Tradecraft and Techniques
tags:
  - Active Directory
  - Networks
  - Password Spraying
  - OSINT
---
Internal network password spraying is something I've always approached with a lot of caution.

If not done correctly, you have the potential for:
- _Exorbitant network activity and alerts_
- _Compromised ability for employees to do their job_
- _And most of all, locked out accounts (scary)_

[Talon](https://github.com/optiv/Talon), written by the extremely talented [Tylous](https://twitter.com/Tyl0us), is a really cool tool that helps eliminate some of the blind spots encountered when spraying Active Directory services on an internal network engagement. When combined with the treasure-trove that is LinkedIn, it makes for a really great experience during testing.

Talon is especially great because it:
- _Is written in Go_
- _Supports Kerberos **and** LDAPS_
- _Is highly flexible_
- _Rotates traffic between targets_
- _Can enumerate if users exist **without locking them out**_

Check out the [associated blog post](https://www.optiv.com/insights/source-zero/blog/digging-your-talons-new-take-password-guessing) for more info on how it works and all the hard work put into it.

## Let's Get a User List
We'll assume we've been dropped on a network with little to no knowledge and we need a list of employee accounts that we can password spray.

I like to use [linkedin2username](https://github.com/initstring/linkedin2username) by [initstring](https://twitter.com/init_string), which scrapes all the employees attached to an organization's LinkedIn page to collect information. This information comes in the form of neatly structured lists of employee names in a couple different permutations. For example, if `John Doe` works at a target company I'll get a listing of him (and all his coworkers) in the format of `john.doe`, `j.doe` `johnd`, and so on.

To begin, grab the company name from the target company's LinkedIn profile page. It should look something like `https://linkedin.com/company/contoso12345/`. That last bit (`contoso12345`) is what we're looking for.
<hr>

Next, clone a fresh copy of linkedin2username and scrape the company's page:
```sh
git clone https://github.com/initstring/linkedin2username

cd linkedin2username

## Note <username> is your LinkedIn username
python3 linkedin2username.py -u <username> -c <company>

## Output is here
cd li2u-output
```

Here's me running the tool on our target `contoso12345`:
<p align="center">
        <img src="/assets/images/misc/linkedin_talon/linkedin2username.png" />
</p>

The complete output will produce a couple lists in different formats that we can use internally.

<p align="center">
        <img src="/assets/images/misc/linkedin_talon/enumoutput.png" />
</p>

#### Errors
So, full disclosure, **LinkedIn is weird**. I had issues running this from a host I usually don't access LinkedIn on, and you might experience a series of different errors using the tool. You're ultimately at the mercy of how LinkedIn governs its platform. 

I wouldn't expect a given enumeration tool to work for an extensive period, so it's probably a good idea to keep tabs on tooling as it's released and things change.

One can always use alternate toolsets to achieve the same result. This may require some bash magic to get things in the correct format, which is why I currently prefer linkedin2username. Here are some additional tools to look at:
- [LinkedInt](https://github.com/vysecurity/LinkedInt)
- [LinkedIn Scraper](https://github.com/blackhatethicalhacking/linkedin_scraper)
- [Linkedin Automation scraper](https://github.com/eracle/linkedin)

## Talon 
Now I'll typically grab my generated user lists and begin enumeration with Talon. 

Talon will take a list of users and do two things:
- _Enumerate if they exist_
- _Perform a password spray_

I added some additional logic that allows a list of passwords to be specified along with some timing controls I'll explain later. That way you can setup the tool and let it go, making sure to periodically check back between cycles, thus protecting your precious fingers from the strain of strenuously running a spray one-by-one.

~~You can grab my forked version [here](https://github.com/0xAsh/Talon). Almost all of the functionality overlaps (I'll tell you when it doesn't).~~

_Update_: My changes [have been  merged](https://github.com/optiv/Talon/pull/2) into the master version of Talon.

#### Installation
To install Talon, perform the following (with Go already installed):
```golang
git clone https://github.com/Optiv/Talon

cd Talon

## Install Dependencies
go get github.com/fatih/color
go get gopkg.in/jcmturner/gokrb5.v7/client
go get gopkg.in/jcmturner/gokrb5.v7/config
go get gopkg.in/jcmturner/gokrb5.v7/iana/etypeID
go get gopkg.in/ldap.v2

## Build
go build Talon.go
```

#### Domain Controllers
Talon's functionality includes the ability to specify multiple domain controllers to target for enumeration. This will distribute any generated alerts between hosts. You can control this via the `-Hostfile` argument, which takes a file containing a newline-delimited list of hosts as an argument. 

How you get this information is up to you, and will likely vary, but a good place to start is by enumerating hosts using **CrackMapExec** and looking for hostnames containing `DC`.
```bash
crackmapexec smb <targets> >> crackmapexec_enum.txt
```

#### Enumeration
For our purposes I've setup the following users in my lab:
<p align="center">
        <img src="/assets/images/misc/linkedin_talon/users.png" />
</p>

Let's say that these users are somewhere within our **linkedin2username** output, along with some other false entries. We will take our list of target domain controllers, and begin detecting valid users:
```go
./Talon -E -D <domain> -Userfile <username_file> -Hostfile <DC_list> -O <output_file> -sleep 1
```

**Note**: I would heavily recommend always running Talon with an output file specified with the `-O` argument.
{: .notice--primary}

In my lab this looks like the following:
<p align="center">
        <img src="/assets/images/misc/linkedin_talon/talonenum.png" />
</p>

As you can see it detected the valid users from our listing. We can generate a new list of valid users with the following bash command:
```bash
grep "User Exist" <output_file> | cut -d '\' -f 2 | cut -d ":" -f 1
```

#### Spraying
With our generated list of valid users, let's run a single password spray with `Password1!`:
```go
./Talon -D <domain> -Userfile <username_file> -Hostfile <DC_list> -O <output_file> -sleep 1 -P 'Password1!'
```

And in the lab environment:
<p align="center">
        <img src="/assets/images/misc/linkedin_talon/pwdspray.png" />
</p>

Each password spraying attempt was successful, as each account used a password of `Password1!`.

**Note**: You can instruct Talon to only utilize Kerberos or LDAPS for enumeration. This can be performed via:<br> `-L` for LDAPS<br> `-K` for Kerberos
{: .notice--primary}

#### Additional Functionality
Here are the additional options within Talon to automate this process:
```go
Extra Usage of ./Talon:
  -A float
        Authentication attempts per lockout period (default 3)
  -Lockout float
        Account lockout period in minutes (default 60)
  -Passfile string
        File containing the list of passwords
```

This allows you to give the tool a list of passwords it will iterate through every defined number of minutes specified by the `-Lockout` parameter. You can control the number of authentication attempts made per period of testing via the `-A` (attempts) parameter.

So let's say we have our list of valid users, a password list, and we want to perform three password attempts every 70 minutes. We can now automate the entire process of password spraying through the following:
```go
./Talon -D <domain> -Userfile <username_file> -Passfile <password_file> -A 3 -Lockout 70 -Hostfile <DC_list> -O <output_file> -sleep 1
```

In my lab:
<p align="center">
        <img src="/assets/images/misc/linkedin_talon/pwdlistspray.png" />
</p>

You'll notice additional timestamping within the output, as well as a notification of when the next attempt cycle will occur.

As we progressed through a password list, eventually we hit the same password found earlier, and achieved a successful login to the target accounts.

Meanwhile if we look at the logs on the DC we can see a series of [4625: An account failed to log on.](https://docs.microsoft.com/en-us/windows/security/threat-protection/auditing/event-4625) events. Not exactly quiet behavior.
<p align="center">
        <img src="/assets/images/misc/linkedin_talon/auditlog.png" />
</p>

## Final Thoughts
It's recommended to talk about the process of password spraying with whoever you'll be testing before performing any of this activity. It's also a good idea to get their password policy from them if they are onboard so you can tailor testing to not lockout anyone/anything out. If password spraying isn't something your target is comfortable with, you shouldn't perform it :) 


Also huge thanks to [Tylous](https://twitter.com/Tyl0us) for not only writing the tool but also making it public. It's really great.
