---
layout: single
date: 2022-07-01
classes: wide
header:
  teaser: /assets/images/scoutsuite/logo.png
  teaser_home_page: true
title: "I Love ScoutSuite and You Should Too"
excerpt: "[ScoutSuite](https://github.com/nccgroup/ScoutSuite) is a multi-cloud security auditing tool written by the wonderful folks over at [NCC group](https://www.nccgroup.com/us/). I use it heavily, so I wanted to do a quick guide on getting it configured and running it in your own environment.

The data and reports it generates is extremely useful from both an offensive and defensive perspective, and I trust that you'll feel the same way after using it in your own platform."
categories:
  - Tradecraft and Techniques
tags:
  - Cloud
  - AWS
  - Azure
  - GCP
---

I originally developed this blog for the [Renegade Labs team](https://risk3sixty.com/penetration-testing/) at [risk3sixty](https://risk3sixty.com/), and have cross-posted it here for replication of my personal work.
{: .notice--warning}

# ScoutSuite
[ScoutSuite](https://github.com/nccgroup/ScoutSuite) is a multi-cloud security auditing tool written by the wonderful folks over at [NCC group](https://www.nccgroup.com/us/). I use it heavily, so I wanted to do a quick guide on getting it configured and running it in your own environment.

The data and reports it generates is extremely useful from both an offensive and defensive perspective, and I trust that you'll feel the same way after using it in your own platform.

## Installation
Installation is quite simple, start by creating a new python virtual environment:
```python
virtualenv -p python3 .

## Activate venv
source bin/activate
```

Next, use `pip` to install ScoutSuite:
```python
pip install scoutsuite
```

### AWS
For AWS, you will need to configure your AWS access keys in the `~/.aws/credentials` file.
```
[default]
aws_access_key_id = [REDACTED]
aws_secret_access_key = [REDACTED]

```

### Azure 
For Azure, a [series of authentication options exist](https://github.com/nccgroup/ScoutSuite/wiki/Azure).

###  GCP
Google Cloud Platform has two ways to authenticate with ScoutSuite:
1. User Account
2. Service Account

While we've had success with the second option, we recommend [referring to the documentation](https://github.com/nccgroup/ScoutSuite/wiki/Google-Cloud-Platform) for more info.

## Reporting

Once executed, the tool will generate a list of findings broken out by service:
<p align="center">
        <img src="/assets/images/scoutsuite/report_1.png" />
</p>

One can drill down further into these as well, revealing more information on each finding and reference information:
<p align="center">
	<img src="/assets/images/scoutsuite/report_1.png" />
</p>

And that's it! It's that simple to run. In 5 minutes you can get a broad overview of your cloud environment and its security configurations.

I would recommend running the toolset against any and all cloud platforms you have. It's free, what do you have to lose?

