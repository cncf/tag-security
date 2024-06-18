# The Octopus Scanner Malware

On March 9, GitHub’s `Security Incident Response Team (SIRT)` received a message from a security researcher informing them
about a set of GitHub-hosted repositories that were, presumably unintentionally, actively serving malware.
After a deep-dive analysis of the malware itself, SIRT uncovered something that, according to them, was not seen on GitHub; 
malware designed to enumerate and backdoor NetBeans projects, and which uses the build process and its resulting artifacts 
to spread itself.

The malware is capable of identifying the NetBeans project files and embedding a malicious payload both in the project 
files and any JAR files it finds in the project directories, which it then uses to spread itself.

## Impact

In the course of the investigation initinated by GitHub, they uncovered 26 open source projects that were affected
by this malware and that were actively serving backdoored code.
The affected repositories posed a risk to GitHub users that could potentially clone and build these projects.

Once a user has cloned and built a GitHub project containing the malware, it will on search for a NetBeans directory.
If one is found, the malware would proceed to infect all NetBeans projects in that directory by:
1) Copying the malicious payload `cache.dat` to `<net_beans_project>/cache.dat`.
2) Modifying  the `<net_beans_project>/build-impl.xml` file to make sure the malicious payload is executed every time a
NetBeans project is built.
Interestingly, after the build all `JAR` files that were available in the project, such as dependencies — not necessarily
just artifacts built by a compromised Netbeans project, are infected.

It's unknown how many developers have cloned and built those 26 projects.
The actual artifacts of these builds may spread even further in a way that is disconnected from the original build process
and harder to track down after the fact.
Since the primary-infected users are developers, who have generally have access to additional projects, 
production environments, database passwords, and other critical assets the potential impact could be great.


## Type of compromise
As the attacker/attackers compromised the IDE cache, this vulnerability can be categorized as a development tooling exploit.

## References:

- [The Octopus Scanner Malware: Attacking the open source supply chain](https://securitylab.github.com/research/octopus-scanner-malware-open-source-supply-chain)
- [Octopus Scanner Sinks Tentacles into GitHub Repositories](https://threatpost.com/octopus-scanner-tentacles-github-repositories/156204/)
