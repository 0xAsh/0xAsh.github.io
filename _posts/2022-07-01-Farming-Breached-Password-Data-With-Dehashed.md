---
layout: single
date: 2022-07-01
classes: wide
header:
  teaser: /assets/images/dehashed/logo.png
  teaser_home_page: true
title: "Farming Breached Password Data with Dehashed"
excerpt: "Every year countless data breaches occur. 

From [700 Million LinkedIn users' information getting leaked  sometime between 2020 and 2021](https://fortune.com/2021/06/30/linkedin-data-theft-700-million-users-personal-information-cybersecurity/), to _at least_ [500 million Yahoo accounts information being breached in 2014](https://www.lifelock.com/learn/data-breaches/company-data-breach), to the notable [2017 Equifax data breach which impacted millions of individuals](https://en.wikipedia.org/wiki/2017_Equifax_data_breach), it's safe to say that breaches are a part of the everyday news cycle in the present day.

These breaches contain a wide variety of data that has a variety of use cases. Social security numbers and credit card information can lead to fraud, age information and phone numbers can lead to targeted phishing attacks, and usernames and passwords can lead to... what exactly?"
categories:
  - Tradecraft and Techniques
tags:
  - Password Breaches
  - OSINT
---

I originally developed this blog for the [Renegade Labs team](https://risk3sixty.com/penetration-testing/) at [risk3sixty](https://risk3sixty.com/), and have cross-posted it here for replication of my personal work.
{: .notice--warning}

# Password Breach Data

| Mitre ATT&CK Technique | ID |
| --- | --- |
| [Brute Force: Credential Stuffing](https://attack.mitre.org/techniques/T1110/004/) | T1110.004 |

Every year countless data breaches occur. 

From [700 Million LinkedIn users' information getting leaked  sometime between 2020 and 2021](https://fortune.com/2021/06/30/linkedin-data-theft-700-million-users-personal-information-cybersecurity/), to _at least_ [500 million Yahoo accounts information being breached in 2014](https://www.lifelock.com/learn/data-breaches/company-data-breach), to the notable [2017 Equifax data breach which impacted millions of individuals](https://en.wikipedia.org/wiki/2017_Equifax_data_breach), it's safe to say that breaches are a part of the everyday news cycle in the present day.

These breaches contain a wide variety of data that has a variety of use cases. Social security numbers and credit card information can lead to fraud, age information and phone numbers can lead to targeted phishing attacks, and usernames and passwords can lead to... what exactly?

Have you ever wondered what happens to this data _after_ it's leaked? What about the private breaches that are not publicized but rather are sold on forums? 

This dark world is one that's extremely interesting and often misunderstood. Unfortunately, risk3sixty is not a threat intelligence company, so large knowledge on the breadth of these attacks an their outcomes is out of our wheelhouse. Our friends at [Recorded Future](https://www.recordedfuture.com/) however likely have [more information](https://www.recordedfuture.com/combatting-data-and-credential-exposure-with-intelligence) that can help answer some of those questions for you.

With that said, let's take a step back and look at how penetration testers and adversaries alike take advantage of data breaches during engagements.

## Engagement Process
On specific targeted engagements, Renegade Labs operators interact with the internet "underworld" that is password breach information. There are a few requirements for this to make sense:
- An organization's risk profile has to line up with the tactics in use. 
- An organization has to be comfortable with the outcomes of this type of reconaissance
- An organization may need to be open to password spraying attacks with breach data to ensure that the project provides the most real-world value
- Lastly, breaches happen. The organization should not punish users for their information being leaked. Often times it is solely out of their control.

To operationalize this process (and keep it as legitimate as possible), we heavily utilize the [Dehashed](https://www.dehashed.com/) service for information retrieval.

Dehashed presents a useful and fairly cost effective API for data retrieval. This allows us to quickly and reliably have a source of data for engagements, instead of trying to keep up with forum posts, leaks, and the ethical headaches that coincide with these efforts.

To access the Dehashed API, a vali subscription is needed:
<p align="center">
        <img src="/assets/images/dehashed/subs.png" />
</p>

Additionally, one must purchase API credits to use with their account. For reference, 100 API creds costs only $3.

Once your account is setup and loaded with valid API credits, the [API reference documentation](https://www.dehashed.com/docs) can be used, from which you find a series of options to meet your needs.

Let's say we want to query all information Dehashed possesses on a username of `bob`. We can do this through the following Curl request:

```
curl 'https://api.dehashed.com/search?query=username:bob' \
-u 'email:api_key' \
-H 'Accept: application/json'
```

_**Note**: you'll likely want to write collected output to a file to avoid wasting API credits_

Let's issue the request, and view the output using `jq`. Unfortunately, we really don't want to leak any information that is sensitive and technically paywalled, so the image below is heavily redacted. What one _can_ note however are the fields contained within the output:

<p align="center">
        <img src="/assets/images/dehashed/data.png" />
</p>

The parameters that stand out are:
- `email`
- `ip_address`
- `password`
- `hashed_password`

In our case, the results were limited to 100 entries per the API specification, however there are ways to query more data, which does have pricing implications.

<p align="center">
        <img src="/assets/images/dehashed/sizing.png" />
</p>

And that is how simple it is to use Dehashed to gather data! You might see why it has quickly become one of our favorite services for engagements. Generic queries with information like a simple username of `bob` produce much more information than is useful, but on targeted engagements the data acquired from the service can be highly beneficial. 

## Mitigations
From [Mitre](https://attack.mitre.org/techniques/T1110/004/)

| Mitre ID | Mitigation | Description |
| --- | --- | --- | 
| [M1036](https://attack.mitre.org/mitigations/M1036) | [Account Use Policies](https://attack.mitre.org/mitigations/M1036) | Set account lockout policies after a certain number of failed login attempts to prevent passwords from being guessed. Too strict a policy may create a denial of service condition and render environments un-usable, with all accounts used in the brute force being locked-out. |
| [M1032](https://attack.mitre.org/mitigations/M1032) | [Multi-factor Authentication](https://attack.mitre.org/mitigations/M1032) | Use multi-factor authentication. Where possible, also enable multi-factor authentication on externally facing services. | 
| [M1027](https://attack.mitre.org/mitigations/M1027) | [Password Policies](https://attack.mitre.org/mitigations/M1027) | Refer to [NIST guidelines](https://pages.nist.gov/800-63-3/sp800-63b.html) when creating password policies. |
| [M1018](https://attack.mitre.org/mitigations/M1018) | [User Account Management](https://attack.mitre.org/mitigations/M1018) | Proactively reset accounts that are known to be part of breached credentials either immediately, or after detecting bruteforce attempts. |
