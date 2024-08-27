# Misconfigured Dev and QA tool compromised

From the original article [1]:

> The Federal Bureau of Investigation has sent out a security alert warning that threat actors are abusing misconfigured SonarQube applications to access and steal source code repositories from US government agencies and private businesses.
> SonarQube apps are installed on web servers and connected to source code hosting systems like BitBucket, GitHub, or GitLab accounts, or Azure DevOps systems.
> But the FBI says that some companies have left these systems unprotected, running on their default configuration (on port 9000) with default admin credentials (admin/admin).

> Officials provided two examples of past incidents:

> "In August 2020, unknown threat actors leaked internal data from two organizations through a public lifecycle repository tool. The stolen data was sourced from SonarQube instances that used default port settings and admin credentials running on the affected organizations' networks.

> "This activity is similar toa previous data leak in July 2020, in which an identified cyber actor exfiltrated proprietary source code from enterprises throughpoorly secured SonarQube instances and published the exfiltrated source codeon a self-hosted public repository."

## Impact

From the original article [1]:

> FBI officials say that threat actors have abused these misconfigurations to access SonarQube instances, pivot to the connected source code repositories, and then access and steal proprietary or private/sensitive applications.


## Type of compromise

Supply Chain Attack: "pivot to the connected source code repositories, and then access and steal proprietary or private/sensitive applications."


## References.

1. "FBI: Hackers stole source code from US government agencies and private companies",  Catalin Cimpanu, `<https://www.zdnet.com/article/fbi-hackers-stole-source-code-from-us-government-agencies-and-private-companies/>`, last accessed 2021-01-19.

2. "Cyber Actors Target Misconfigured SonarQube Instances to Access Proprietary Source Code of US Government Agencies and Businesses", FBI `<https://www.ic3.gov/Media/News/2020/201103-3.pdf>`, last accessed 2021-01-19. 
