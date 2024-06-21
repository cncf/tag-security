<!-- cSpell:ignore xmlsec cisa xalan santuario -->

# Widespread Exploitation of ManageEngine Flaw

## Description

In early 2023, an APT exploited a vulnerability in Zoho's ManageEngine
software, tracked as CVE-2022-47966, to compromise a European internet
infrastructure provider.

CVE-2022-47966 stems from a vulnerable third-party dependency on
Apache Santuario. It was present in various ManageEngine products due
to the use of a version of Apache xmlsec that required the application
to implement mitigations, which were not present.

## Impact

In addition to the target of this APT, CISA also "identified the
presence of indicators of compromise (IOCs) at an Aeronautical Sector
organization as early as January 2023", and other vendors reported
widespread exploitation.

## Type of Compromise

According to [Flashpoint](https://flashpoint.io/blog/manageengine-apache-santuario-cve-2022-47966/),
while "usage of a more recent version of Apache Santuario [...] could
have mitigated exploitation in ManageEngine significantly", the
dependency itself was using an outdated, vulnerable (CVE-2014-0107)
dependency called Apache Xalan, and says "the combination of this
exceptionally old library, which by itself has a vulnerable dependency
and insecure defaults" contributed to the impact.

## References

- [SecurityWeek Article](https://www.securityweek.com/north-korean-apt-hacks-internet-infrastructure-provider-via-manageengine-flaw/)
- [CISA Advisory](https://www.cisa.gov/news-events/cybersecurity-advisories/aa23-250a)
- [Rapid7 Post](https://www.rapid7.com/blog/post/2023/01/19/etr-cve-2022-47966-rapid7-observed-exploitation-of-critical-manageengine-vulnerability/)
