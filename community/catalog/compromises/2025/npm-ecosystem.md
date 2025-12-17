<!-- cSpell:ignore Shai Hulud Shai hulud Shai-Hulud -->

# Widespread npm Ecosystem Compromise

The Widespread npm Ecosystem Compromise, which began around September 8, 2025,
was a multi-phased incident. The initial phase involved a phishing campaign that
compromised maintainer accounts, leading to the injection of a
cryptocurrency-stealing payload into dozens of popular packages (like chalk and
debug). This was quickly followed by the discovery of the "Shai-Hulud" worm
campaign, which used a self-propagating credential-stealing malware to
compromise over 500 npm packages.

## Impact

The compromise resulted in a widespread infection across the npm ecosystem,
affecting hundreds of packages and potentially thousands of downstream
applications that automatically pulled malicious versions. The injected payloads
enabled credential theft, unauthorized command execution, and persistent access
within both developer and CI/CD environments.

## Type of Compromise

The npm ecosystem is a _Malicious Maintainer_ type of attack as the attackers
managed to gain control of npm maintainer accounts and used their privileges to
push malicious versions of legitimate packages.

## References

- [Breakdown: Widespread npm Supply Chain Attack Puts Billions of Weekly Downloads at Risk](https://www.paloaltonetworks.com/blog/cloud-security/npm-supply-chain-attack/)
- [Ongoing Supply Chain Attack Involving npm Packages](https://www.csa.gov.sg/alerts-and-advisories/alerts/al-2025-093)
- [Shai-hulud supply chain attack spreads token-stealing malware on npm](https://www.reversinglabs.com/blog/shai-hulud-worm-npm)
- [npm Chalk and Debug Packages Hit in Software Supply Chain Attack](https://www.sonatype.com/blog/npm-chalk-and-debug-packages-hit-in-software-supply-chain-attack)
- [Another npm Supply Chain Attack: The 'is' Package Compromise](https://www.stepsecurity.io/blog/another-npm-supply-chain-attack-the-is-package-compromise)
- ["Shai-Hulud" Worm Compromises npm Ecosystem in Supply Chain Attack (Updated September 23)](https://unit42.paloaltonetworks.com/npm-supply-chain-attack)
- ["Massive npm infection: the Shai-Hulud worm and patient zero"](https://securelist.com/shai-hulud-worm-infects-500-npm-packages-in-a-supply-chain-attack/117547)
- [What We Know About the NPM Supply Chain Attack](https://www.trendmicro.com/en_us/research/25/i/npm-supply-chain-attack.html)
