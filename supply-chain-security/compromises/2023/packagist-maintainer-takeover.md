# Account takeover on Packagist.org

A case of maintainer accounts takeover on Packagist.org, the
PHP registry for open-source packages.

What happened:

1. 4 maintainer accounts were compromised on Packagist.org
2. No malicious code was distributed, accounts were detected
   and reverted.

## Impact

On May 1st, 2023, attackers accessed 4 maintainer accounts on
the packagist.org website which hosts open-source PHP packages.

The maintainer accounts were inactive and had accessed to a
total of 14 packages. The attackers replaced the package's
description in `composer.json` and did not take any further
malicious actions.

It is estimated that all maintainer accounts were re-using
previously leaked database passwords.

## Type of Compromise

This incident fits the [Dev Tooling](../compromise-definitions.md#dev-tooling)
definition.

## References

- [Packagist.org maintainer account takeover](https://blog.packagist.com/packagist-org-maintainer-account-takeover/)
