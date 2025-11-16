# Shai-Hulud Self-Replicating Worm

In September 2025, the "Shai-Hulud" self-replicating worm was discovered by Socket.
After gaining initial access to an account, malware scanned for sensitive credentials which were then exfiltrated.
The credentials were then used to publish new version of packages maintained or could be accessed by the developers.
Hence, users of the package were then infected, and replicating the malware.
The name of the attack comes from the `shai-hulud.yaml`, a reference to the sandworms in Dune. 


## Impact

* The compromised npm packages and packages with Indicators of Compromised were removed.
* US Cybersecurity and Infrastructure Security Agency (CISA) released an alert about the attack.
* npm acted to harden publishing by local publishing with required two-factor authentication (2FA), granular tokens with limited lifetime, and trusted publishing.


## Type of Compromise

**Attack Chaining** was used throughout the attack.

## References

* [CISA](https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem)
* [GitHub](https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/)
* [Socket](https://socket.dev/blog/ongoing-supply-chain-attack-targets-crowdstrike-npm-packages)