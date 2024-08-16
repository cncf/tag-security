<!-- cspell:ignore UEFI -->
<!-- cspell:ignore Ermolov -->

# Dropbox hacker steals 130 GitHub repositories

Dropbox employees were targeted by a phishing attack that gave the attacker access to one of the Dropbox GitHub organizations via stolen credentials. The successful breach impersonated CircleCI and redirected users to a phishing landing page where they were asked to enter their GitHub username, password, and One Time Password (OTP) via hardware authentication key.

## Impact

According to Dropbox "these repositories included our own copies of third-party libraries slightly modified for use by Dropbox, internal prototypes, and some tools and configuration files used by the security team".  The compromised material included "code, and the data around it also included a few thousand names and email addresses belonging to Dropbox employees, current and past customers, sales leads, and vendors".

Dropbox added that the attackers never had access to customers' accounts, passwords, or payment information, and its core apps and infrastructure were not affected as a result of this breach.

## Type of Compromise

This incident fits the [Attack Chaining](../compromise-definitions.md#technique-attack-chaining) definition.

## References

- [Dropbox discloses breach after hacker stole 130 GitHub repositories](https://www.bleepingcomputer.com/news/security/dropbox-discloses-breach-after-hacker-stole-130-github-repositories/)
