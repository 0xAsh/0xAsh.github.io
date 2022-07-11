var store = [{
        "title": "Kioptrix Level 1 (#1) Writeup - VulnHub",
        "excerpt":"In preperation for my OSCP exam, I tackled a series of VulnHub boxes, Kioptrix Level 1 being the first. In retrospect, this box is really, really old. Like 2010 old, so it’s real-life applicability is questionable. It is a simple boot-to-root box that is vulnerable to a remote code execution...","categories": ["VulnHub"],
        "tags": ["VulnHub","smbclient","ffuf","MRTG","Samba"],
        "url": "http://localhost:4000/Kioptrix-Level-1/",
        "teaser":"http://localhost:4000/assets/images/VulnHub/kioptrix1_logo.png"},{
        "title": "Kioptrix Level 1.1 (#2) Writeup - VulnHub",
        "excerpt":"Kioptrix Level 1.1 is the next box in the series of Kioptrix VulnHub boxes. This box ups the ante from its predecessor, beginning with a simple SQL injection exploit to gain access to a web console. The web console can be bypassed to execute code, which we use to get...","categories": ["VulnHub"],
        "tags": ["VulnHub","SQL Injection","Command Injection","Kernel Exploits"],
        "url": "http://localhost:4000/Kioptrix-Level-1.1/",
        "teaser":"http://localhost:4000/assets/images/VulnHub/kioptrix1.1_logo.png"},{
        "title": "Kioptrix Level 1.2 (#3) Writeup - VulnHub",
        "excerpt":"Kioptrix Level 1.2 continues the Kioptrix VulnHub series, and provides great experience with reusing credentials, attacking common web applications, and cracking hashed passwords. We start by exploiting LotusCMS to get a shell as www-data. From there, we find MySQL credentials that we use to login to phpMyAdmin and dump hashed...","categories": ["VulnHub"],
        "tags": ["VulnHub","LotusCMS","Metasploit","phpMyAdmin","John","MD5","sudo"],
        "url": "http://localhost:4000/Kioptrix-Level-1.2/",
        "teaser":"http://localhost:4000/assets/images/VulnHub/kioptrix1.2_logo.png"},{
        "title": "Kioptrix Level 1.3 (#4) Writeup - VulnHub",
        "excerpt":"Kioptrix Level 1.3 is the fourth iteration of the Kioptrix VulnHub challenges. It involves taking advantage of a SQL injection vulnerablility to login to a simple web application that leaks user credentials. Using these credentials we can connect to the box via SSH. Unfortunately, our SSH sessions spawn a restricted...","categories": ["VulnHub"],
        "tags": ["VulnHub","ffuf","enum4linux","SQL Injection","Restricted Shell Escapes","setuid"],
        "url": "http://localhost:4000/Kioptrix-Level-1.3/",
        "teaser":"http://localhost:4000/assets/images/VulnHub/kioptrix1.3_logo.png"},{
        "title": "FristiLeaks 1.3 Writeup - VulnHub",
        "excerpt":"FristiLeaks 1.3 is a VulnHub box that I used to prepare for the OSCP exam. It’s by far one of my favorite VulnHub boxes I’ve done, as it involves some fun and simple reversing/code analysis. It also involves practice hopping around and enumerating a Linux environment from the perspective of...","categories": ["VulnHub"],
        "tags": ["VulnHub","FristiLeaks","Nikto","Webshells","Reversing","Sudo"],
        "url": "http://localhost:4000/FristiLeaks-1.3/",
        "teaser":"http://localhost:4000/assets/images/VulnHub/fristileaks1.3_logo.png"},{
        "title": "Farming phone numbers with Python and the Google Places API",
        "excerpt":"Only care about the source code? Checkout the Github Repo Background &amp; Motivation One day a friend asked me something along the lines of: “Do you think you could grab the local phone number area code from an address?” A simple question. “Yeah!” I answered. A quick Google search can...","categories": ["Projects"],
        "tags": ["Python","API","Google Maps","Google Places","Google APIs","Automation"],
        "url": "http://localhost:4000/Farming-phone-numbers-with-Python-and-the-Google-Places-API/",
        "teaser":"http://localhost:4000/assets/images/street2phone/street2phone2.png"},{
        "title": "Zero-Point Security's Certified Red Team Operator (CRTO) Review",
        "excerpt":"Overview Red Team Ops is the course accompanying the Certified Red Team Operator (CRTO) certification offered by Zero-Point Security. The course was written by Rasta Mouse, who you may recognize as the original creator of the RastaLabs pro lab in HackTheBox. He maintains both the course content and runs Zero-Point...","categories": ["Certifications"],
        "tags": ["Active Directory","Cobalt Strike","Certifications"],
        "url": "http://localhost:4000/Certified-Red-Team-Operator-Review/",
        "teaser":"http://localhost:4000/assets/images/crto/crto_logo.png"},{
        "title": "Harnessing the Power of LinkedIn and Talon for Password Spraying",
        "excerpt":"Internal network password spraying is something I’ve always approached with a lot of caution. If not done correctly, you have the potential for: Exorbitant network activity and alerts Compromised ability for employees to do their job And most of all, locked out accounts (scary) Talon, written by the extremely talented...","categories": ["Tradecraft and Techniques"],
        "tags": ["Active Directory","Networks","Password Spraying","OSINT"],
        "url": "http://localhost:4000/Harnessing-the-power-of-LinkedIn-and-Talon-for-Password-Spraying/",
        "teaser":"http://localhost:4000/assets/images/misc/linkedin_talon/logo.png"},{
        "title": "An Introduction to Kerberoasting",
        "excerpt":"I originally developed this blog for the Renegade Labs team at risk3sixty, and have cross-posted it here for replication of my personal work. Artwork Credit: https://www.emojisky.com/desc/7191149 Kerberoasting Mitre ATT&amp;CK Technique ID Steal or Forge Kerberos Tickets: Kerberoasting T1558.003 What is it? Kerberoasting is the attack that keeps on giving for adversaries...","categories": ["Tradecraft and Techniques"],
        "tags": ["Active Directory","Kerberos","Networks","Impacket"],
        "url": "http://localhost:4000/An-Introduction-To-Kerberoasting/",
        "teaser":"http://localhost:4000/assets/images/ad_kerberoasting/logo.png"},{
        "title": "An Introduction to Active Directory Enumeration",
        "excerpt":"I originally developed this blog for the Renegade Labs team at risk3sixty, and have cross-posted it here for replication of my personal work. Mitre ATT&amp;CK Technique ID Account Discovery: Domain Account T1087.002 Active Directory is a platform that has received plenty of attention from adversaries and operators over the years....","categories": ["Tradecraft and Techniques"],
        "tags": ["Active Directory","BloodHound","Impacket","Networks","LDAP"],
        "url": "http://localhost:4000/An-Introduction-to-Active-Dreictory-Enumeration/",
        "teaser":"http://localhost:4000/assets/images/ad_enum/logo.png"},{
        "title": "Attacking the AWS Metadata Service",
        "excerpt":"I originally developed this blog for the Renegade Labs team at risk3sixty, and have cross-posted it here for replication of my personal work. Mitre ATT&amp;CK Technique ID Unsecured Credentials: Cloud Instance Metadata API T1552.005 The AWS Metadata service facilitiates information access for applications running on a given EC2 instance. This is...","categories": ["Tradecraft and Techniques"],
        "tags": ["AWS","Cloud","SSRF"],
        "url": "http://localhost:4000/Attacking-the-AWS-Metadata-Service/",
        "teaser":"http://localhost:4000/assets/images/aws_metadata/logo.png"},{
        "title": "Farming Breached Password Data with Dehashed",
        "excerpt":"I originally developed this blog for the Renegade Labs team at risk3sixty, and have cross-posted it here for replication of my personal work. Password Breach Data Mitre ATT&amp;CK Technique ID Brute Force: Credential Stuffing T1110.004 Every year countless data breaches occur. From 700 Million LinkedIn users’ information getting leaked sometime between...","categories": ["Tradecraft and Techniques"],
        "tags": ["Password Breaches","OSINT"],
        "url": "http://localhost:4000/Farming-Breached-Password-Data-With-Dehashed/",
        "teaser":"http://localhost:4000/assets/images/dehashed/logo.png"},{
        "title": "Getting Started Spraying Microsoft Services",
        "excerpt":"I originally developed this blog for the Renegade Labs team at risk3sixty, and have cross-posted it here for replication of my personal work. Mitre ATT&amp;CK Technique ID Brute Force: Password Spraying T1110.003 Password spraying is the process of brute-force guessing passwords against a list of accounts either externally or internally. Adversaries...","categories": ["Tradecraft and Techniques"],
        "tags": ["Active Directory","Password Spraying","OSINT","Office365"],
        "url": "http://localhost:4000/Getting-Started-Spraying-Microsoft-Services/",
        "teaser":"http://localhost:4000/assets/images/spraying_ms/logo.png"},{
        "title": "I Love ScoutSuite and You Should Too",
        "excerpt":"I originally developed this blog for the Renegade Labs team at risk3sixty, and have cross-posted it here for replication of my personal work. ScoutSuite ScoutSuite is a multi-cloud security auditing tool written by the wonderful folks over at NCC group. I use it heavily, so I wanted to do a...","categories": ["Tradecraft and Techniques"],
        "tags": ["Cloud","AWS","Azure","GCP"],
        "url": "http://localhost:4000/I-Love-ScoutSuite-and-You-Should-Too/",
        "teaser":"http://localhost:4000/assets/images/scoutsuite/logo.png"},{
        "title": "Passing the Hash for Fun and Profit",
        "excerpt":"I originally developed this blog for the Renegade Labs team at risk3sixty, and have cross-posted it here for replication of my personal work. Pass the Hash Mitre ATT&amp;CK Technique ID Use Alternate Authentication Material: Pass the Hash T1550.002 What is it? Passing the hash is a technique that adversaries commonly use...","categories": ["Tradecraft and Techniques"],
        "tags": ["Active Directory","Windows","NTLM","Pass the hash","Networks"],
        "url": "http://localhost:4000/Passing-the-Hash-For-Fun-and-Profit/",
        "teaser":"http://localhost:4000/assets/images/pth/logo.png"},{
        "title": "Using cloud_enum to Find S3 Buckets and More",
        "excerpt":"I originally developed this blog for the Renegade Labs team at risk3sixty, and have cross-posted it here for replication of my personal work. S3 Buckets Mitre ATT&amp;CK Technique ID Data from Cloud Storage Object T1530 Buckets? S3, first introduced in 2006, is one of Amazon Web Services’ most popular services....","categories": ["Tradecraft and Techniques"],
        "tags": ["AWS","S3","Cloud","OSINT"],
        "url": "http://localhost:4000/Using-cloud_enum-to-find-S3-buckets-and-more/",
        "teaser":"http://localhost:4000/assets/images/cloud_enum/logo.png"}]
