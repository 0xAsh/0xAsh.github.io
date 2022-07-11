---
layout: single
date: 2022-07-01
classes: wide
header:
  teaser: /assets/images/cloud_enum/logo.png
  teaser_home_page: true
title: "Using cloud_enum to Find S3 Buckets and More"
excerpt: "S3, first introduced in 2006, is one of Amazon Web Services' most popular services. This simple and fast cloud object solution has undoubtely made development, file sharing,
content-delivery, and much more seamless for its users across the years. However, this flexibiltiy and arguably confusing design has led to some of the biggest data breaches ever seen. With this in mind, let's walk through why I like using cloud_enum to find S3 buckets and other goodies."
categories:
  - Tradecraft and Techniques
tags:
  - AWS
  - S3
  - Cloud
  - OSINT
---

I originally developed this blog for the [Renegade Labs team](https://risk3sixty.com/penetration-testing/) at [risk3sixty](https://risk3sixty.com/), and have cross-posted it here for replication of my personal work.
{: .notice--warning}


# S3 Buckets

| Mitre ATT&CK Technique | ID |
| --- | --- |
| [Data from Cloud Storage Object](https://attack.mitre.org/techniques/T1530/) | T1530 |

## Buckets?
S3, first introduced in 2006, is one of Amazon Web Services' most popular services. This simple and fast cloud object solution has undoubtely made development, file sharing, content-delivery, and much more seamless for its users across the years. However, this flexibiltiy and arguably confusing design has led to some of the biggest data breaches ever seen.

### Buckets are bad?
Buckets are not bad by themself, but they sure can lead to issues. Just in 2022, the following data breaches have occurred thanks to misconfigured S3 buckets:
- [500,000 Ghanaian graduates personal data leaked by S3 bucket](https://portswigger.net/daily-swig/insecure-amazon-s3-bucket-exposed-personal-data-on-500-000-ghanaian-graduates)
- [SEGA S3 bucket with AWS credentials and PII left open](https://securityaffairs.co/wordpress/126258/data-breach/sega-europe-aws-s3-bucket-data-leak.html)

This is in no way a conclusive list, in fact there are multiple different [sites](https://www.hackmageddon.com/2022/02/21/leaky-buckets-in-2022/) and [repos](https://github.com/nagwww/s3-leaks) that have attempted to catalogue each S3 bucket data breach. I would not want to try to keep up with the pace.

## How does this happen?
The issue arises when S3 buckets are set to `Public`. This allows any user to access the contents stored within the bucket at their will. Development life cycles may forget about test buckets that are used during sprints, or in other cases applications utilize the same bucket for multiple purposes, such as content delivery for an application _as well as_ storage of the sensitive data an application utilizes.

These environmental variables are the reason that so many issues have come to light over the years with S3 buckets leaking information, and I would argue _it's not entirely the userbase's fault._

In the article [S3 Security Is Flawed By Design](https://www.upguard.com/blog/s3-security-is-flawed-by-design), Kaushik Sen makes the argument that S3 is a victim of its own success. It's hard to roll out intrinsic changes to one of the most utilized services on the entire AWS platform.

He proposes that S3 should be split into two separate services to  avoid ambiguity on _what exactly S3 it should be used for._ These are:
```
"1. **Amazon Web Hosting** - designed to host public websites, this storage solution would always be public.

2. **Amazon Private Storage** - designed to hold any data you wouldn't want posted on the Internet, this storage is always private and cannot be accessed directly over the Internet."
```

In the meantime however, we still need to protect and secure this service. So how do attackers and security researchers locate these buckets? Let's walk through some enumeration tactics we've used historically at Renegade Labs.

### Searching for Open S3 Buckets
#### Cloud_enum
One of our go to tools for enumerating S3 buckets (and all sorts of cloud resources) is a tool called [cloud_enum](https://github.com/initstring/cloud_enum) from [initstring](https://github.com/initstring).

You can grab a fresh copy of the tool and install it via:

```bash
git clone https://github.com/initstring/cloud_enum 
cd cloud_enum
virtualenv -p python3 . 
source bin/activate
pip3 install -r requirements.txt

## Run it!
python3 cloud_enum.py
```

Once installed, the tool is very simple to use, with the operator only needing to supply a target organization via the `-k KEYWORD` argument.

In our demonstration, let's target `contoso`.
<p align="center">
        <img src="/assets/images/cloud_enum/cloud_enum_1.png" />
</p>

In a short period of time (44 seconds!) we've identified a series of S3 buckets, all thanks to cloud_enum. It performs this by searching a series of mutations and brute-force options, searching for buckets with similar names to our keyword. We've found great success with this in the wild, in some cases gathering an extremely useful list of S3 buckets.

In this case however, each bucket is "protected", meaning it is not open to the public and cannot be listed. Or can it?

#### "Any Authenticated Users"
S3 Access Control Lists introduce the ability for a user to grant bucket access to the ["Authenticated Users group"](https://docs.aws.amazon.com/AmazonS3/latest/userguide/acl-overview.html). What is this group you ask? Well, it's _any individual with valid AWS credentials._

For example, while I cannot access `http://contoso.s3.amazonaws.com` with my web browser, if the `Authenticated Users group` has been granted access to the bucket, _I can actually potentially query and gather stored within the bucket._

In a piece of functionality that feels oddly similar to the `Domain Users` group in Active Directory, this configuration can create immense risk for an organization, and allow their buckets to essentially be public without them even realizing.

So how does an attacker enumerate for this? It's actually quite simple. With valid AWS credentials configured and the AWS CLI installed, a simple `aws s3 ls` command can be used to attempt to list a bucket's contents.

```bash
$ aws s3 ls s3://contoso                                                                                                       
An error occurred (AccessDenied) when calling the ListObjectsV2 operation: Access Denied
```

Fortunately, this bucket was not configured with the "Authenticated Users group" (we wouldn't have included it otherwise), nullifying this attack.

Despite this, situations do arise from time to time where this configuration can be taken advantage of. 

It's safe to say that S3 is not going anywhere, and who knows when AWS will opt to make intrinsic changes to the service. There have been several answers implemented by AWS to attempt to address the data breaches that have occurred through the service, but it is not an issue that will likely be eliminated within the future.
