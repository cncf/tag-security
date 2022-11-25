# Timing attack on npm API

A timing attack on the npm API can reveal to an attacker whether private packages exist, potentially enabling dependency confusion and variant attacks.

## Impact

According to the researchers: "threat actors have the capability to create a list of potential private package names and run timing attacks to verify their existence" Subsequently, attackers could "create public packages masquerading as legitimate private ones and trick unknowing developers into downloading malicious packages."

The researchers reported the issue to npm owner GitHub's bug bounty program, getting this response: “Because of these architectural limitations, we cannot prevent timing attacks from determining whether a specific private package exists on npm.”

## Type of Compromise

This incident fits the [Publishing Infrastructure](../compromise-definitions.md#publishing-infrastructure) definition.

## References

- [Threat Alert: Private npm Packages Disclosed via Timing Attacks](https://blog.aquasec.com/private-packages-disclosed-via-timing-attack-on-npm)
- [Novel npm Timing Attack Allows Corporate Targeting](https://www.darkreading.com/application-security/novel-npm-timing-attack-allows-corporate-targeting)