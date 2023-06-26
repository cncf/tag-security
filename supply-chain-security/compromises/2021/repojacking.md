# Repojacking exposed private repositories through supply-chain compromise

White hat researchers reported repository confusion attacks ("repojacking") to
at least 35 public companies. By creating packages in public package
repositories with the same name as internal packages (and, in some cases, larger
version numbers than the internal package), build systems within the targeted
companies would download the malicious packages from the internet, running
arbitrary package-installation code during the build process.

## Impact

According to the author, reporting these issues to the affected companies
yielded at least $130,000 in bug bounties (Shopify: $30k, Apple: $30k, PayPal:
$30k, Microsoft: $40k), with additional companies named including Netflix, Yelp,
and Uber.

## Remediation

The remediation steps depended on the package manager in question; additionally,
some configurations of software repository software such as JFrog Artifactory
were also implicated in this confusion between public and local libraries.
Remediation was was performed on a per-repository or per-build basis within
individual organizations.

In most package managers, it was also possible to change package configuration
flags (e.g. `--index-url` rather than `--extra-index-url` for `pip install`),
but it's not clear that this applied to all package managers.

## Type of Compromise

This was caused by configuration of the package manager, and therefore is
closest to the "Negligence" root cause, though the actual misconfiguration may
have occurred in administrators of the build system or or build tooling, and
could also be considered "Dev Tooling".

## References

1. Dependency Confusion: How I Hacked Into Apple, Microsoft, and Dozens of Other
   Companies,
   `<https://medium.com/@alex.birsan/dependency-confusion-4a5d60fec610>`
