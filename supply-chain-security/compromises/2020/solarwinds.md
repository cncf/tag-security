# Highly Evasive Attacker Leverages SolarWinds Supply Chain to Compromise Multiple Global Victims With SUNBURST Backdoor

*Although not cloud native, this attack is being included as demonstration of
the widespread impact of a supply chain compromise from a seemingly innocuous 
source.*

From the original article [1]:

> SolarWinds.Orion.Core.BusinessLayer.dll is a SolarWinds digitally-signed
> component of the Orion software framework that contains a backdoor that
> communicates via HTTP to third party servers. 

From article [2]:

> Although we do not know how the backdoor code made it into the library,
> from the recent campaigns, research indicates that the attackers might 
> have compromised internal build or distribution systems of SolarWinds,
> embedding backdoor code into a legitimate SolarWinds library with the 
> file name SolarWinds.Orion.Core.BusinessLayer.dll. This backdoor can 
> be distributed via automatic update platforms or systems in target 
> networks seen globally since March 2020. Microsoft security researchers 
> have limited information about how they compromised the said platforms
> at this point.

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

While the specific details of how initial access occurred are unknown, it is
understood that multiple compromises may have occurred:
* Dev Tooling. According to article [2] the development tooling in use by
  Solarwinds developers may have been compromised.  The backdoor appears to have
come through a class introduced in the SolarWinds.Orion.Core.BusinessLayer.dll
* Publishing Infrastructure. According to article [2] the compromised class
  introduced could have been injected during the build and distribution of the
updated product
* Trust and Signing. Attackers signed libraries using Solarwinds own
  certificates, Microsoft removed these certificates from its trusted list

## References.

1. [Fireeye report on Solarwinds compromise](https://www.fireeye.com/blog/threat-research/2020/12/evasive-attacker-leverages-solarwinds-supply-chain-compromises-with-sunburst-backdoor.html)

2. [Microsoft report on Solarwinds compromise](https://msrc-blog.microsoft.com/2020/12/13/customer-guidance-on-recent-nation-state-cyber-attacks/)

3. [ZDNet - Microsoft, FireEye confirm SolarWinds supply chain attack](https://www.zdnet.com/article/microsoft-fireeye-confirm-solarwinds-supply-chain-attack/)
