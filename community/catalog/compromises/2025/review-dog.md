<!-- cSpell:ignore reviewdog -->

# reviewdog/action-setup@v1 GitHub Action Compromise

In March 2025, security researchers discovered that the reviewdog/action-setup@v1
GitHub Action had been compromised. The attacker altered the v1 tag to point to a
malicious commit between March 11 and later reverted it to conceal the compromise.
Encoded payloads were embedded into the install.sh script and any running
workflows using this Action would execute the malicious code. The code, when
executed in CI pipelines, could dump workflow environment variables into logs,
exposing them this way to anyone viewing the CI run.

## Impact

By redirecting the trusted @v1 tag to a malicious commit, the attacker caused
workflows using this Action to execute injected code that printed environment
variables and secrets into build logs. This could lead to the unintentional
disclosure of access tokens, API keys, and credentials, particularly in public
repositories where logs are accessible, undermining the confidentiality of
automated build environments.

## Type of Compromise

This is a _Publishing Infrastructure_ type of compromise, as the attacker
manipulated the Action's distributed version reference (Git tag) rather than its
codebase or maintainer, abusing weaknesses in how automation components are
published and trusted within GitHub's workflow ecosystem.

## References

- [New GitHub Action supply chain attack: reviewdog/action-setup](https://www.wiz.io/blog/new-github-action-supply-chain-attack-reviewdog-action-setup)
