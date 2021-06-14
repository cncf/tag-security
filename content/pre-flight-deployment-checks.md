---
title: "Pre-Flight Deployment Checks"
date: "2020-10-01"
category: "deploy"
---
Prior to deployment, organizations should verify the existence, applicability, and current state of image signature and
integrity, image runtime policies (ex. absence of malware or critical vulnerabilities), container runtime policies
(ex. absence of excessive privileges), host vulnerability and compliance controls and finally workload, application,
and network security policies.

## Projects
- [OPA Gatekeeper](https://github.com/open-policy-agent/gatekeeper)
- [kube-bench](https://github.com/aquasecurity/kube-bench)
- [Preflight](https://github.com/jetstack/preflight)
- [Kyverno](https://github.com/kyverno/kyverno/)

<!---
## Commercial Projects
- Trend Micro Container Security
- Styra DAS
- Prisma Cloud Compute
- Rapid7 kAdvisor
-->

## Examples
- Enforce security policy at the API server level by leveraging admission controllers to prevent non-compliant deployments.
Some examples policies include:
  - Checking for securityContext settings
  - Enforcing resource limits
  - Ensuring images have been scanned
  - Preventing containers from running as `root`

## Links
- [Kubernetes Dynamic Admission Control](https://kubernetes.io/docs/reference/access-authn-authz/extensible-admission-controllers/)
- [CIS Benchmarks for Kubernetes](https://www.cisecurity.org/benchmark/kubernetes/)

## Blogs
  - [10-kubernetes-security-context-settings-you-should-understand](https://snyk.io/blog/10-kubernetes-security-context-settings-you-should-understand/)
  - [Why RBAC Isn't Enough For Kubernetes Security](https://blog.styra.com/blog/why-rbac-is-not-enough-for-kubernetes-api-security)

## Globe Traveller / World Traveller / Jump Ahead / Further Exploration / Next Stop (TBD)

- [Audit Log Analysis](./audit-log-analysis)