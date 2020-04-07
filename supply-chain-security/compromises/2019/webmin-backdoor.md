# Webmin backdoor

At some time in April 2018, the Webmin development build server was exploited and a vulnerability added to one of the scripts. The vulnerable code was only present in Webmin packages, offered for download via SourceForge, but not in the source code on GitHub. Because the timestamp of the modified script was set back, it did not show up in any git diffs. The backdoor was first introduced in version 1.890 and was also included in 1.900 and 1.920.


## Impact

The attack surface have been enormous given the popularity of the project with more than 100 modules that expands its core features. On its [GitHub page](https://github.com/webmin/webmin), the Webmin team claims their application has "over 1,000,000 installations worldwide."
[ZDNet](https://www.zdnet.com/) published an [article](https://www.zdnet.com/article/backdoor-found-in-webmin-a-popular-web-based-utility-for-managing-unix-servers/) about the exploit on their website. There they claim that as of 19.08.2019 (when the article was published) a [Shodan](https://www.shodan.io/) search query returned over 215,000 public Webmin instances, which can be attacked without needing to compromise internal networks or to bypass firewalls to reach a Webmin installation.


## Type of compromise

As the attacker/attackers compromised the development build server, this vulnerability can be categorized as development tooling exploit.
