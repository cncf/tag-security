# Malware Disguised as Official Installer Used to Target Korean Public Institution

## Detailed Account

The Kimsuky group targeted a Korean public institution by distributing malware
disguised as an official installer. This malicious dropper, signed with a valid
certificate from a Korean company, was designed to look like a legitimate
application. When executed, it installed a backdoor named Endoor, capable of
receiving commands and executing malicious activities such as taking
screenshots and stealing credentials.

## Impact

The security researchers identified instances of this installer used in chained
attacks.

## Type of Compromise

- **Trust and Signing**: The incident exploits trusted digital certificates to
deploy malware, undermining the security mechanisms that rely on certificate
validity.

## References

- [AhnLab Security Report](https://asec.ahnlab.com/en/63396/)
