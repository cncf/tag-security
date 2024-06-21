<!-- cSpell:ignore Kaspersky Securelist -->

# Trojanized Free Download Manager Targets Unsuspecting Linux Users

## Description

A trojanized version of the Free Download Manager for Linux was
discovered, containing a malicious backdoor. This incident involves
the use of fake Debian packages from a counterfeit repository,
indicating a supply chain attack aimed at Linux systems.

## Impact

The breach exposed users who downloaded FDM for Linux to malware
between 2020 and 2022, quantified by the project as less than 0.1%
of the visitors.

The malware included credential stealers and according to Kaspersky,
victims of this campaign are located all over the world, including
Brazil, China, Saudi Arabia and Russia.

Despite some warning signs, for many years social network users
discussing issues with this software did not suspect that they were
caused by malware.

## Type of Compromise

This is a partial **Publishing Infrastructure** compromise, since
the **Source Code** of the frontend download pages appears to have
been compromised to selectively direct users to the attacker's
infrastructure.

## References

- [Securelist Blog Post](https://securelist.com/backdoored-free-download-manager-linux-malware/110465/)
- [Free Download Manager Blog Announcement](https://www.freedownloadmanager.org/blog/?p=664)
