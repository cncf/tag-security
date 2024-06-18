# Third-party (i.e. community, not NPM-maintained) packages hosted by NPM found to have reverse-shell, data mining functionality present.

From the original article [1]:

> NPM has removed multiple packages hosted on its repository this week that established connection to remote servers and exfiltrated user data.
> 
> These 4 packages had collected over 1,000 total downloads over the course of the last few months up until being removed by NPM yesterday.
> 
> The four packages are:
> 
>     plutov-slack-client - claims to be a "Node.JS Slack Client" according to the information in the manifest 
>     nodetest199 - no description
>     nodetest1010 - no description
>     npmpubman - claims to be "a simple implementation about Linux shell login" according to the information in the manifest 


## Impact

The overall impact is not reported at this time. The number of unique downloads (for an NPM package) is somewhat low, i.e.

> These 4 packages had collected over 1,000 total downloads over the course of the last few months up until being removed by NPM yesterday.

The potential damage such exploits/vulnerabilities could generate is, in general severe (i.e. remote control, data access/mining). The offending packages have since been removed by NPM.


## Type of compromise

These malicious packages fall within a development tooling compromise. The first three packages appear to allow a specific attacker to gain remote control over the victim's local machine. The fourth package appears to harvest user data (i.e. files) from the local machine and then upload them to a remote server (presumably controlled by the attacker).

## References.

1. "NPM nukes NodeJS malware opening Windows, Linux reverse shells", Ax Sharma, `<https://www.bleepingcomputer.com/news/security/npm-nukes-nodejs-malware-opening-windows-linux-reverse-shells/>`, last accessed 2020-10-21.
