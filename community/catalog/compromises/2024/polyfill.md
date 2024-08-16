<!-- cSpell:ignore fastly staticfile namecheap sansec polyfillpolyfill -->
# Polyfill.io Infrastructure Takeover Leading to Malware Distribution

In February 2024, a Chinese company acquired control of the `polyfill dot io,com` domains, and the `polyfillpolyfill` GitHub account.

In June 2024, Sansec observed malware being served from the `cdn dot polyfill dot io` domain. Other researchers discovered some of the malware's functions referenced in other domains including BootCSS, BootCDN and Staticfile, and based on exposed API keys in public GitHub repositories, proposed the same threat actor is behind all the domains.

## Impact

* While the observed malware only performed site redirection, malicious control of `cdn dot polyfill dot io` could result in arbitrary malicious JavaScript code execution in users' browsers.
* Namecheap shut down the domain for a period of time, and some threat feeds flagged the domain as malicious
* While polyfills shouldn't be required in modern browsers, and despite the project's creator warning users since February to steer away from the `polyfill dot io` domain, this incident prompted Fastly and Cloudflare to offer safer drop-in replacements
* Google Ads started disapproving ads pointing to sites using the affected domains
* Sansec estimated this incident affects over 100,000 websites, and Cloudflare's CEO said about 4% of the web used `polyfill dot io`

## Type of Compromise

This is a _publishing infrastructure_ compromise.

## References

* [Sansec Research](https://sansec.io/research/polyfill-supply-chain-attack)
* [BleepingComputer](https://www.bleepingcomputer.com/news/security/polyfillio-bootcdn-bootcss-staticfile-attack-traced-to-1-operator/)
* [BleepingComputer](https://www.bleepingcomputer.com/news/security/polyfill-claims-it-has-been-defamed-returns-after-domain-shut-down/)
* [Fastly Community](https://community.fastly.com/t/new-options-for-polyfill-io-users/2540)
* [Cloudflare Blog](https://blog.cloudflare.com/automatically-replacing-polyfill-io-links-with-cloudflares-mirror-for-a-safer-internet/)
