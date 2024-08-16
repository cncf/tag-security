<!-- cSpell:ignore sophos -->

# Exploitation of Digital Signing Certificates in Malware Distribution

In early 2024, a suspicious 3proxy sample was identified, signed with a
Microsoft Windows Hardware Compatibility certificate. This sample, submitted
by "Hainan YouHu Technology Co. Ltd," disguised as a setup file for an Android
screen-sharing app (LaiXi), turned out to be malware. The discovery prompted
further investigations, revealing other samples with similar characteristics,
leading to a suspicion that a software supply chain attack had been conducted
on the publishing party:

> We have no evidence to suggest that the LaiXi developers deliberately
> embedded the malicious file into their product, or that a threat actor
> conducted a supply chain attack to insert it into the compilation/building
> process of the LaiXi application. However, we will note that given the links
> between LaiXi and the malicious backdoor we investigated – and the length of
> time those links have existed (since at least January 2023, as we’ll discuss
> shortly) – users should exercise extreme caution when it comes to
> downloading, installing, and using LaiXi.

## Impact

The malware exploits the trust placed in digitally signed certificates, allowing
it to bypass security systems that automatically trust signed files. This misuse
of digital signing undermines the integrity of certificate-based security systems
and highlights vulnerabilities in the certificate issuing and validation process.

## Type of Compromise

- **Trust and Signing:** The incident involved the misuse of legitimate digital
signing certificates to authenticate malicious software, tricking systems and
users by presenting the malware as trustworthy.

## References

- [Sophos Report](https://news.sophos.com/en-us/2024/04/09/smoke-and-screen-mirrors-a-strange-signed-backdoor/)
- [Stairwell Analysis](https://stairwell.com/resources/signed-sealed-but-not-always-secure-rethinking-trust-in-digitally-signed-certificates/)
