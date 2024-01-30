# Compromise of PHP's development team self-hosted Git server

PHP is a web development language primarily used for creating web applications.
On March 28th, 2021, they reported [1] that the self-hosted Git server at
git.php.net was compromised and included two commits with malicious intent to
add backdoor capabilities.

## Impact

* Code changes in the form of two commits to the official and self-hosted Git
server were made as if they were signed-off by PHP maintainers Rasmus Lerdorf
and Nikita Popov.
* Code changes were introducing a remote code execution backdoor to any PHP
server built from the source-code that included these commits.

## Remediation

* Membership in the PHP GitHub organization now required 2FA-enabled accounts.
* Write access to the repository's source migrated out of a self-built karma
system and now restricted only to members of the PHP project's GitHub
organization.
* The PHP team has decided to stop maintaining their own infrastructure
declared their GitHub PHP project repository as the primary source.

## Type of Compromise

Source Code and Dev Tooling: Still unknown how the threat actors were able to
gain access to the Git server, compromising the source code that powers 79.2% of
all websites [2].

## References

1. PHP Security Update, `<https://news-web.php.net/php.internals/113838>`.
2. 79.2% of all websites are powered by PHP,
`<https://w3techs.com/technologies/details/pl-php>`.
