---
title: "Container Application Manifest"
date: "2020-10-01"
category: "distribute"
---

Application manifests describe the configurations required for the deployment of containerized applications. As mentioned in the Security Benchmarks section, guides such as the NIST 800-190 publication offer recommended security practices and configurations for application containers. It is vital to scan application manifests in the CI/CD pipeline in order to identify configurations that could potentially result in an insecure deployment posture.

## Projects
- [Conftest](https://www.conftest.dev/)
- [OPA](https://www.openpolicyagent.org/)
- [Terrascan](https://github.com/accurics/terrascan)
- [Checkov](https://www.checkov.io/) 
- [KubeSec]( https://kubesec.io/ )
- [Kics](https://github.com/Checkmarx/kics)
- [Kyverno CLI](https://kyverno.io)

<!---
## Commercial Projects
- [Commercial Projects](optional)
- [Snyk]( https://snyk.io )

## Misc Projects
- [InSpec](https://github.com/bgeesaman/inspec-k8s)

-->

## Examples

- Examples of application manifests are Kubernetes YAML files, that are sent to the Kubernetes API server to deploy an application.
- Some of the security policies that could be enforced on Kubernetes YAML files are:
  - Prohibit container images that use the “latest” tag
  - Prohibit container images from specified registries
  - Prevent all containers from running as “root”
  - Ensure all containers specify cpu and memory limits
  - Require all ingresses to have TLS configured
  - Prevent services from creating external load balancers
