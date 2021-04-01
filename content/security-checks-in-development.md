---
title: "Security Checks in Development"
date: "2020-10-01"
category: "Develop"
---

The aim at this stage is to surface security issues as early as possible in the SDLC underpinning the concept of shift left. Prefer tools which give developers both security insights and actionable remediation advice directly in their workflows. Leverage IDE plugins and CLI tools, and automate as much as possible through practices like git pre-commit hooks. Build security scanning automation into source code management systems to automatically test incoming PR’s. Ensure you have well defined policies that developers understand across all of these areas eg. no high sev vulns with a fix available, container images should not run as root, only use approved base images.

## Projects: 
- [OSS Fuzz](https://github.com/google/oss-fuzz )
- [VulnCost](https://github.com/snyk/vulncost )
- [Sonarqube](https://www.sonarqube.org/ )
- [Trivy](https://github.com/aquasecurity/trivy )
- [Microsoft DevSkim](https://github.com/microsoft/DevSkim)
- [KubeSec](https://kubesec.io/ )
- [Checkov](https://www.checkov.io/ )
- [iskan](https://github.com/alcideio/iskan) - Rapid7
- [rbac-tool](https://github.com/alcideio/rbac-tool) - Rapid7
- [Code Ready Dependency Analytics](https://github.com/fabric8-analytics/fabric8-analytics-vscode-extension )

## Examples:
- Software Composition Analysis for detecting vulnerabilities in open source modules used in applications. 
- Static Application Security Testing to detect vulnerabilities in homegrown code. New advances such as the use of ML have improved performance to enable its use directly in IDEs in some cases.
- Static analysis of Dockerfiles for vulnerabilities and incorrect security settings eg.
  - Least privilege user
  - Reduce exposure to vulns in base image
  - Check for approved base images
  - Check for potential credential leakages 
Static analysis of Kubernetes YAML for incorrect security settings eg.
  - Ensure limits are set
  - Ensure non root user
  - Ensure non privileged
  - Ensure capabilities are minimized

- Scanning of container images in local repositories
  - Reduce exposure to vulns in base image
  - Software Composition Analysis for detecting vulnerabilities in open source modules used in applications. 

## Links
- https://wiki.owasp.org/index.php/Appendix_A:_Testing_Tools
- https://owasp.org/www-community/Source_Code_Analysis_Tools
- https://snyk.io/blog/10-docker-image-security-best-practices/
- https://snyk.io/blog/10-kubernetes-security-context-settings-you-should-understand/

