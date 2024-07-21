# Fake Dependabot commits

Dependabot is a bot maintained by GitHub that automatically submits pull
requests to update project dependencies. An attacker pushed malicious commits
impersonating Dependabot which were subsequently merged by repository
maintainers. These commits included changes that introduced a GitHub Action
workflow to steal repository secrets. In addition, the attackers added an
obfuscated line to all javascript source files to steal information added to
password fields.

## Impact

The attackers submitted hundreds of such commits, primarily targeting GitHub
users in Indonesia. To directly push the commits, the attackers also stole
repository maintainer access tokens, to allow them to bypass two factor
authentication.

## Type of Compromise

Source Code

## References

- [Surprise: When Dependabot Contributes Malicious Code](https://checkmarx.com/blog/surprise-when-dependabot-contributes-malicious-code/)
