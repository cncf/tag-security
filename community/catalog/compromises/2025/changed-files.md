<!-- cSpell:ignore exfiltrated GHSA mrrh -->

# tj-actions/changed-files GitHub Action Compromise

In March 2025, attackers compromised the popular GitHub Action
`tj-actions/changed-files`, used by over 20,000 repositories to detect file
changes in pull requests.

The threat actor compromised a maintainer's credentials to manipulate Git tags,
redirecting trusted version references to a malicious commit that executed code
during CI/CD workflows.

The injected code captured environment variables and exfiltrated secrets such as
GitHub tokens and API credentials to an external server. This compromise
propagated silently through automated pipelines, as many users relied on mutable
version tags (e.g., v35, v36) instead of immutable commit SHAs, meaning their
workflows automatically pulled and executed the malicious code.

## Impact

This compromise had multiple implications across the GitHub Actions ecosystem
as thousands of repositories were possibly exposed through automate workflows,
any CI/CD runner secrets, repository tokens or organization credentials were
potentially at risk, and overall demonstrated how a single third-party action
could become a high-impact attack vector within trusted build automation
pipelines.

## Type of Compromise

This is a _Publishing Infrastructure_ type of attack as the attacker targeted a
GitHub action which is part of the CI/CD and build automation layer.

## References

- [GitHub Advisory Database - GHSA-mrrh-fwg8-r2c3](https://github.com/advisories/GHSA-mrrh-fwg8-r2c3/)
- [Wiz.io – GitHub Action tj-actions/changed-files Supply Chain Attack (CVE-2025-30066)](https://www.wiz.io/blog/github-action-tj-actions-changed-files-supply-chain-attack-cve-2025-30066)
