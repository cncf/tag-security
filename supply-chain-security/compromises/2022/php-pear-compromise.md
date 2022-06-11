<!-- cspell:ignore CVE -->
<!-- cspell:ignore PEAR -->
<!-- cspell:ignore PHP -->
<!-- cspell:ignore TAR -->
<!-- cspell:ignore unpacthed -->
<!-- cspell:ignore superseded -->
<!-- cspell:ignore Packagist -->
<!-- cspell:ignore pearweb -->
<!-- cspell:ignore archives -->
# PEAR PHP Package Manager compromise

A case of flawed password reset logic and unpacthed known CVE of
a third-party dependency allowed PEAR's package manager compromise.

PEAR is a PHP package manger that has been superseded by Packagist,
but still a relevant part of the PHP developer ecosystem.

A code security flaw found in the source code of the package manager's
password reset logic, along with the detection of an unpacthed publicly
known vulnerable third-party dependency to manage TAR file archive
allowed attackers to compromise PEAR's package manager registry and
gain access to the server.

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
