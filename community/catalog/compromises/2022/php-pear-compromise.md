# PEAR PHP Package Manager compromise

A case of flawed password reset logic and unpatched known CVE of
a third-party dependency allowed PEAR's package manager compromise.

PEAR is a PHP package manger that has been superseded by Packagist,
but still a relevant part of the PHP developer ecosystem.

What happened:

1. A password reset flaw allowed access release new versions of
   existing packages.
2. The above, Combined with a vulnerable third-party dependency
   allowed attackers to compromise the server that was running
   `pearweb`.

## Impact

An estimate of 285 million packages gets downloaded from pear.php.net to
date. Exploiting bugs related to package management that have existed
more than 15 years would have allowed to take over any developer account
and publish malicious versions, as well as gaining access to the central
PEAR server.

The vulnerability affects all `pearweb` versions prior to 1.32, which is
the repository for the source code that powers `pear.php.net`

## Type of Compromise

This incident fits the [Dev Tooling](../compromise-definitions.md#dev-tooling)
definition.

## References

- [PHP Supply Chain Attack on PEAR](https://blog.sonarsource.com/php-supply-chain-attack-on-pear)
