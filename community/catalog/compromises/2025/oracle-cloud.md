<!-- cSpell:ignore Exfiltrated exfiltrated -->

# Oracle Cloud SSO and Identity Infrastructure Compromise

The Oracle Cloud data breach, publicly disclosed around March 21, 2025, involved
a large-scale compromise of authentication and identity management systems. A
threat actor operating under the alias "rose87168" announced on the black-hat
forum BreachForums that they had exfiltrated a significant number of records
from Oracle Cloud's federated Single Sign-On (SSO) login servers and Lightweight
Directory Access Protocol (LDAP) systems.

The attacker claimed the initial infiltration occurred around mid-February 2025,
possibly exploiting a vulnerability in an older, unpatched component of the
infrastructure, such as Oracle Fusion Middleware 11G or a critical flaw in
Oracle Access Manager (potentially related to CVE-2021-35587). The compromise is
generally believed to have affected legacy Gen 1 servers and not the primary
Oracle Cloud Infrastructure (OCI) Gen 2 environment.

## Impact

The impact was focused on the mass compromise of critical authentication data,
significantly increasing security risks for numerous organizations. The 6
million records stolen included sensitive credentials such as encrypted
SSO/LDAP passwords, key files, and authentication tokens. This exposure created
a high risk of unauthorized account takeover, corporate espionage, and lateral
movement within affected customers' environments, particularly if the encrypted
credentials could be cracked. Furthermore, the threat actor sought to monetize
the breach through extortion, demanding fees from companies to remove their data
from the leak. The incident led to CISA guidance on credential risk mitigation
and resulted in class action lawsuits against Oracle for alleged failure to
implement standard data security practices and timely disclosure.

## Type of Compromise

Even though this was not related to a software package, this is considered to be
a _Publishing Infrastructure_ type of compromise as it originated from
vulnerabilities within Oracle’s identity and authentication infrastructure, a
critical part of its service publishing and access layer.

## References

- [CloudSEK – The Biggest Supply Chain Hack of 2025: 6M Records Exfiltrated from Oracle Cloud](https://www.cloudsek.com/blog/the-biggest-supply-chain-hack-of-2025-6m-records-for-sale-exfiltrated-from-oracle-cloud-affecting-over-140k-tenants)
- [CVE-2021-35587 – Oracle Access Manager Remote Code Execution Vulnerability](https://nvd.nist.gov/vuln/detail/CVE-2021-35587)
