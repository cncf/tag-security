<!-- cSpell:ignore klow klown Sonatype okhsa cryptominer -->
# Compromise of NPM package ua-parser-js

On October 22, 2021, the developer of popular NPM package ua-parser-js (over 7
million weekly downloads) reported that their account was hijacked, allowing
attackers to publish malicious versions that included malware. The developer
noticed because of a flurry of spam emails that (they suspect) were sent to mask
the NPM emails, and quickly deprecated the malicious versions and put out a
notice that stated their NPM account was hijacked.

This attack seems to be related to the [klow /klown /okhsa
attack](klow-klown-okhsa.md).

## Impact

The attacker released versions 0.7.29, 0.8.0, and 1.0.0 going by the release
history and deprecated notices on the NPM page. Likely, this was done to attack
as many people as possible, based on the versioning rules they used in their
manifests. The malicious versions downloaded an externally hosted binary that
was then executed with arguments specifying the mining pools to use.

## Type of Compromise

This attack was carried out by someone posing as the maintainer, and therefore
can be classified as "Malicious Maintainer".

## References

- [GitHub thread about the incident](https://github.com/faisalman/ua-parser-js/issues/536)
- [Diff between clean and malicious versions](https://app.renovatebot.com/package-diff?name=ua-parser-js&from=0.7.28&to=1.0.0)
- [Sonatype article about klow / klown / okhsa](https://blog.sonatype.com/newly-found-npm-malware-mines-cryptocurrency-on-windows-linux-macos-devices)