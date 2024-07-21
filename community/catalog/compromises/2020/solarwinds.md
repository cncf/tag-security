# Highly Evasive Attacker Leverages SolarWinds Supply Chain to Compromise Multiple Global Victims With SUNBURST Backdoor

*Although not cloud native, this attack is being included as demonstration of
the widespread impact of a supply chain compromise from a seemingly innocuous 
source.*

From the original article [1]:

> SolarWinds.Orion.Core.BusinessLayer.dll is a SolarWinds digitally-signed
> component of the Orion software framework that contains a backdoor that
> communicates via HTTP to third party servers. 

The host system used to build the Orion software was infected with malware,
named SUNSPOT[4], which executed the rest of the attack on the Orion supply
chain.

The malware watches processes on the infected host to detect when the build
tool, `MSBuild.exe`, is started. Once detected, the malware inspects the
MSBuild process to determine whether it is building the Orion software.
When a build of the Orion software is observed a malicious source file,
containing the SunBurst/Solarigate backdoor, is then copied into the source
directory and built into the resulting Orion software.

The malware takes several steps to cover its tracks, including restoring the
original source file at the end of a build, and using file checksums to prevent
the malicious source file from being copied when the file in the source code
that it replaces has been modified.

## Impact

While the overall initial impact is widespread and global, specific industries
and regions are reported as known to be impacted:
* Government
* Finance
* Tech
* Telecomm

* North America
* Europe
* Middle East
* Asia

This compromise permitted data exfiltration and lateral movement through
Solarwinds customer environment via the Orion monitoring tool.

## Type of compromise

The publishing infrastructure, namely the system which performs builds of the
Orion product, was compromised and used to tamper with developer tooling to
inject the malicious code.

## References.

1. [Fireeye report on Solarwinds compromise](https://www.fireeye.com/blog/threat-research/2020/12/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor.html)

2. [Microsoft report on Solarwinds compromise](https://msrc-blog.microsoft.com/2020/12/13/customer-guidance-on-recent-nation-state-cyber-attacks/)

3. [ZDNet - Microsoft, FireEye confirm SolarWinds supply chain attack](https://www.zdnet.com/article/microsoft-fireeye-confirm-solarwinds-supply-chain-attack/)

4. [CrowdStrike Blog – SUNSPOT: An Implant in the Build Process](https://www.crowdstrike.com/blog/sunspot-malware-technical-analysis/)
