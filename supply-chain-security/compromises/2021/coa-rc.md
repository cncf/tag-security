<!-- cSpell:ignore Qakbot Sonatype -->
# Compromise of NPM packages coa and rc

In early November 2021, the developer accounts of popular NPM packages coa (over
8 million weekly downloads) and rc (over 14 million weekly downloads) were
hijacked, allowing attackers to publish malicious versions that downloaded and
installed a version of the Qakbot trojan.

This attack is similar to the [ua-parser-js attack](ua-parser-js.md).

## Impact

The coa breach was spotted after build pipelines began crashing, prompting an
investigation from NPM. The rc breach was discovered later the same day. Due to
the extent of use of both libraries and the fact that the malicious code caused
pipelines to fail in some environments, the breaches were spotted quite early
(the GitHub thread for coa indicates it was opened 10 minutes after the
release). A more sophisticated, "silent" attack along the same vector could have
resulted in far more damage.

## Type of Compromise

These attacks was carried out by someone posing as the respective maintainers,
and therefore can be classified as "Malicious Maintainer".

## References

- [GitHub thread about the coa breach](https://github.com/veged/coa/issues/99)
- [GitHub thread about the rc breach](https://github.com/dominictarr/rc/issues/131)
- [Sonatype article about coa and rc](https://blog.sonatype.com/npm-hijackers-at-it-again-popular-coa-and-rc-open-source-libraries-taken-over-to-spread-malware)