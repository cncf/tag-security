---
title: "Security Tests"
date: "2020-10-01"
category: "distribute"
---

Automated security testing of applications and infrastructure should be an integral focus within security teams. Test suites should be continuously updated to replicate threats in-line with the organizational threat model and can be reused for security regression testing as the system evolves. Automated security tests increase security and release velocity by removing manual security gates, such as validation and manual control implementation at a single checkpoint, which is time-consuming and inadequate. Automated security testing also demonstrates control efficacy on demand by explicitly attempting to carry out the threats, thus improving the system's security and adherence to any embedded compliance requirements in real-time.

## Projects
- [Nuclei](https://github.com/projectdiscovery/nuclei)
- [kube-hunter](https://github.com/aquasecurity/kube-hunter)
- [kube-bench](https://github.com/aquasecurity/kube-bench)
- [Starboard](https://github.com/aquasecurity/starboard)
- [Atomic Red Team](https://github.com/redcanaryco/atomic-red-team)

## Examples
- Security assessment tools should be implemented in an automated capability where possible. In addition to manual security assessments to provide assurance, product and feature teams can gain rapid feedback from DAST and VA within a CI/CD pipeline. Along with the ability to implement quality gates in CI/CD pipelines preventing a release to be deployed under certain conditions, or similarly with the concept ChatOps can provide rapid feedback to teams if a security assessment is performed against a live product and an issue is detected.

