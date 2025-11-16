# npm phishing campaign

In September 2025, an npm maintainer (Qix) was compromised by a phishing email `support [at] npmjs [dot] help` (created three days before the attack).
The adversaries uploaded malicious code to 18 npm packages maintained by the developer, with more than 2 billion downloads per week.
The malware injects itself within the browser, watches for cryptocurrency wallets transfers, rewrites destinations to attacker controlled addresses, hijacks the transactions, and remains stealthy.

## Impact

* The compromised versions of the packages were removed within the same day.
* Although the packages compromised were quite popular, the economic impact of the attack was not severe. Only $500 was stolen as of September 9th.
* The attack may have inspired similar campaigns in other package managers such as [crates.io](https://blog.rust-lang.org/2025/09/12/crates-io-phishing-campaign/) and [PyPi](https://blog.pypi.org/posts/2025-09-23-plenty-of-phish-in-the-sea/).

## Type of Compromise

The attack started through **Social Engineering/Phishing Attack**. Then **Attack Chaining** was used to introduce malware within the packages.

## References

* [Aikido](https://www.aikido.dev/blog/npm-debug-and-chalk-packages-compromised)
* [NIST NVD](https://nvd.nist.gov/vuln/detail/CVE-2025-59145)
* [Socket](https://socket.dev/blog/npm-author-qix-compromised-in-major-supply-chain-attack)
* [Arkham](https://info.arkm.com/research/npm-attack-hacker-javascript-supply-chain-500-2025)
