<!-- cSpell:ignore exfiltrated -->

# Red Hat Consulting GitLab Instance Breach

In October 2025, Red Hat confirmed a security breach affecting a self-hosted
GitLab instance used internally by its Consulting division. The threat actor
group calling themselves Crimson Collective claimed responsibility, asserting
they had exfiltrated approximately 570 GB of compressed data from 28,000 private
repositories, including around 800 Customer Engagement Reports (CERs). These
CERs often contain sensitive customer architecture diagrams, configuration files,
authentication tokens, and infrastructure details.

## Impact

Attackers claim to have accessed a significant volume of sensitive consulting
and customer data.Stolen CERs may reveal network topologies, access credentials,
and deployment configurations for major enterprise clients. That kind of
information could be leveraged for secondary intrusions or social engineering.
While Red Hat has not confirmed any misuse of the stolen data, the incident
highlights the inherent risk of third-party data exposure within vendor
ecosystems. Red Hat emphasized that no personal data or software supply chain
assets have been confirmed compromised at this stage.

## Type of Compromise

This is a _Publishing Infrastructure_ type of compromise as the compromise
occurred within Red Hat’s internal GitLab environment, which is part of its
development and collaboration infrastructure.

## References

- [Security update: Incident related to Red Hat Consulting GitLab instance](https://www.redhat.com/en/blog/security-update-incident-related-red-hat-consulting-gitlab-instance)
- [Red Hat confirms security incident after hackers breach GitLab instance](https://www.bleepingcomputer.com/news/security/red-hat-confirms-security-incident-after-hackers-breach-gitlab-instance)
- [Red Hat GitLab Data Breach: The Crimson Collective's Attack](https://blog.gitguardian.com/red-hat-gitlab-breach-the-crimson-collectives-attack/)
