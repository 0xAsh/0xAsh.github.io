---
layout: single
date: 2022-07-01
classes: wide
header:
  teaser: /assets/images/spraying_ms/logo.png
  teaser_home_page: true
title: "Getting Started Spraying Microsoft Services"
excerpt: "Password spraying is the process of brute-force guessing passwords against a list of accounts either externally or internally. Adversaries use this tactic to attempt to establish initial access within an organization and/or laterally move to alternate identities within a network.

The process of getting started password spraying is surprisingly easy. This is in part thanks to the prevalence of remote-work solutions that have created the need to allow users to
authenticate from _pretty much anywhere_. Cloud services such as Office365 actually _assist_ the password spraying process, by providing a reliable, centralized location that can be used
to attempt to breach a company's accounts." 
categories:
  - Tradecraft and Techniques
tags:
  - Active Directory
  - Password Spraying
  - OSINT
  - Office365
---

I originally developed this blog for the [Renegade Labs team](https://risk3sixty.com/penetration-testing/) at [risk3sixty](https://risk3sixty.com/), and have cross-posted it here for replication of my personal work.
{: .notice--warning}

| Mitre ATT&CK Technique | ID |
| --- | --- |
[Brute Force: Password Spraying](https://attack.mitre.org/techniques/T1110/003/) | T1110.003 |

Password spraying is the process of brute-force guessing passwords against a list of accounts either externally or internally. Adversaries use this tactic to attempt to establish initial access within an organization and/or laterally move to alternate identities within a network.

The process of getting started password spraying is surprisingly easy. This is in part thanks to the prevalence of remote-work solutions that have created the need to allow users to authenticate from _pretty much anywhere_. Cloud services such as Office365 actually _assist_ the password spraying process, by providing a reliable, centralized location that can be used to attempt to breach a company's accounts.

To begin, attackers may perform some sort of open-source intelligence gathering to generate a list of users and emails for an organization, that can be later used in password spraying attemtps. In combination with this tactic, weak, seasonal-based (`Summer2022!`) or company-based (`Company123`) passwords are commonly used in stuffing attacks.

# So how does it work?
## Password Spraying Azure
Let's say we are an attacker targeting the ficticious `<testlab.com>` company. We have a list of target users we've skimmed from LinkedIn, and we have a hunch that they use a weak password.

We're going to utilize the [MSOLSpray](https://github.com/dafthack/MSOLSpray) toolset from Beau Bollock ([@dafthack](https://twitter.com/dafthack)) to attempt to login to each of target users with a weak password.

Getting started using the tool is quite simple. We can open a PowerShell window and download the tool using:
```powershell
wget https://raw.githubusercontent.com/dafthack/MSOLSpray/master/MSOLSpray.ps1 -OutFile MSOLSpray.ps1
```

After which we can import it via:
```powershell
Import-Module .\MSOLSpray.ps1
```

We will construct a short list of users to target:
<p align="center">
        <img src="/assets/images/spraying_ms/userlist.png" />
</p>

And now we can easily spray a login attempt to each account with MSOLSpray.ps1. We'll use the `Summer2022` password, and launch the attack via: 
```powershell
Invoke-MSOLSpray -UserList .\Users.txt -Password Summer2022
```

<p align="center">
        <img src="/assets/images/spraying_ms/msolspray.png" />
</p>

In our case the ficticious `testlab.com` domain does not actually exist, however one can see how quickly spraying attempts can be performed against a target organization.

This is just one example against a particular service, and multiple options exist that allow attacks to target a suite of applications used by organizations.

## Password Spraying Active Directory
On the internal network side of house, there are a suite of password spraying toolsets to choose from. At Renegade Labs, we particularly like using [Talon](https://github.com/optiv/Talon) from [Optiv](https://www.optiv.com/). It's very flexible, written in Golang, and portable to multiple platforms.

Let's shift gears and say we're within an internal network and want to spray passwords. We'll start by grabbing a fresh copy of Talon and constructing a userlist:
```bash
## Download Talon and make it executable
wget https://github.com/optiv/Talon/releases/download/v3.0/Talon_3.0_linux_amd64
mv Talon_3.0_linux_amd64 Talon && chmod +x Talon

## Construct a users list
cat users.txt
bob
mike
cindy
cheryl
jim
```

Now we can begin spraying passwords. Talon possesses a wide suite of options that allows an operator to heavily modify how they would like to spray passwords, but for our purposes lets simply issue one round of spraying with the `Passw0rd!` password.

We can do so using the following command:
```
./Talon -D testlab.local -H 10.0.0.36 -Userfile users.txt -P 'Passw0rd!' -K
```

<p align="center">
        <img src="/assets/images/spraying_ms/talon.png" />
</p>

From the generated spraying attempts, we can see that this password is set for the `bob` account, allowing us to authenticate as that identity and inherit their access. This is how quickly a penetration tester (or attacker) can spin up password spraying attempts after initial access is achieved.

## Mitigation: Password Policy Reigns Supreme
On the defensive side of house, there is one direct and fullproof mitigation that still stands the test of time: the password policy. While regular password rotation is important, we cannot place enough emphasis on enforcing the _strength_ of passwords that are set.

A 14 character, highly-complex password that is set for a year is much more valuable than an eight character password that changes every 60 days. In most cases all this achieves is incrementing a number by one (Passw0rd1 -> Passw0rd2) or changing a slight detail to get pass policy requirements.

In addition to password policies, organizations should pursue utilization of MFA. This should be prioritized especially for all methods of an end user logging into resources externally, or in other words from the public internet. In most cases this is for systems such as a VPN solution, email (Google Mail/Outlook), messaging platforms (looking at you Slack), or other systems that could be used for further information gathering and pretext-based social engineering (HR systems/finance applications/note taking applications).

There are a series of application-specific protections that we could go into to try to limit password spraying on a case-by-case basis, but this blog aims to simply shed light on the process of password spraying and how easy it is to get started as an attacker. So, go setup MFA, and use good passwords!
