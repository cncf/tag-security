# The GhostAction Github Workflow Injection

In September 2025, GitGuardian discovered GhostAction campaign, a large-scale
supply chain campaign in which attackers compromised 327 GitHub user accounts
and injected malicious workflows into 817 repositories, stealing a total of 3,325
secrets. The malicious workflows, often titled "Github Actions Security",
were engineered to enumerate known secret names from legitimate workflow files
(e.g. PyPI tokens, npm tokens, DockerHub, AWS keys) and exfiltrate them via HTTP
POST to attacker-controlled endpoints.

## Impact

The GhostAction campaign compromised the trust and integrity of GitHub's
publishing pipelines, exposing sensitive credentials from hundreds of
open-source projects. The stolen secrets, including registry tokens and cloud
provider keys, could enable attackers to publish malicious packages, access
private infrastructure, or escalate to broader supply chain compromises across
ecosystems like npm, PyPI, and DockerHub. This incident highlights how
manipulating CI/CD workflows can undermine the integrity of the entire
open-source distribution chain.

## Type of Compromise

This compromise falls under the _Malicious Maintainer_ category, as the attackers
gained access to legitimate GitHub maintainer accounts and leveraged their
privileges to inject malicious workflow code.

## References

- [The GhostAction Campaign: 3,325 Secrets Stolen Through Compromised GitHub Workflows](https://blog.gitguardian.com/ghostaction-campaign-3-325-secrets-stolen)
