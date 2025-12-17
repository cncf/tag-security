<!-- cSpell:ignore ngularity exfiltrated -->

# The Nx s1ngularity Attack Leading to Credentials Leak

On August 26, 2025, attackers released malicious versions of the nx and @nx/*
npm packages (versions 20.9.0 through 21.8.0). The trojanized packages contained
credential-harvesting malware that scanned each developer system for sensitive
artifacts: GitHub tokens, npm keys, SSH private keys, environment variables,
cryptocurrency wallet files, and AI tool configurations. The malware exfiltrated
stolen credentials via double Base64 encoding and published them to over 1,400
public GitHub repositories, each named in a "s1ngularity-repository-*" pattern
with a single `results.b64` file containing encoded data.

## Impact

The Nx s1ngularity attack had an extensive impact across the open-source and
enterprise ecosystem. In total, over 20,000 files were exfiltrated, affecting
more than 1,700 users worldwide. The attackers leveraged stolen credentials to
make at least 6,700 private GitHub repositories public, exposing sensitive
source code, proprietary configurations, and credentials — some belonging to
major organizations and high-profile projects. This extensive exposure
underscored the cascading risk of software supply chain compromises, where a
single poisoned package can rapidly undermine trust and security across
thousands of interconnected development environments.

## Type of Compromise

This is an _Attack Chaining_ type of compromise with elements of _Dev Tooling_
and _Malicious Maintainer_, as the attackers initially leveraged compromised CI
workflows, published infected Nx packages, and chained the attack to expose
thousands of private repositories across the ecosystem.

## References

- [The Nx "s1ngularity" Attack: Inside the Credential Leak](https://blog.gitguardian.com/the-nx-s1ngularity-attack-inside-the-credential-leak/)
- [s1ngularity Nx Supply Chain Attack: AI-Driven Credential Theft & Mass Exposure](https://hivepro.com/threat-advisory/s1ngularity-nx-supply-chain-attack-ai-driven-credential-theft-mass-exposure/)
- [s1ngularity: Popular Nx Build System Package Compromised with Data-Stealing Malware](https://www.stepsecurity.io/blog/supply-chain-security-alert-popular-nx-build-system-package-compromised-with-data-stealing-malware)
