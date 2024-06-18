# NPM Package mathjs-min Contains Credential Stealer

A malicious actor modified the widely-used Javascript library mathjs and uploaded it to NPM as a "minified" version called mathjs-min, which contained a Discord token grabber. The actor created a burner account and copied the README from the genuine mathjs package to appear legitimate. The malicious code was added to an innocuously named commit and deeply embedded in the library's files. This highlights the potential security risks of using open-source software, especially as attackers are evolving their tactics.


## Impact

This incident highlights the evolving tactics of threat actors who are constantly looking for new ways to deceive developers. In this case, the attackers targeted the widely-used mathjs library, which has over 667K weekly downloads and over 1800 dependents.

The vulnerability affects all `pearweb` versions prior to 1.32, which is
the repository for the source code that powers `pear.php.net`

## Type of Compromise

This incident fits the [Negligence](../compromise-definitions.md#Negligence)
definition.

## References

- [NPM Package mathjs-min Contains Credential Stealer](https://blog.phylum.io/phylum-discovers-npm-package-mathjs-min-contains-discord-token-grabber)