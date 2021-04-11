---
title: "Build Pipeline"
date: "2020-10-01"
category: "distribute"
---
Continuous Integration (CI) servers should be isolated and restricted to projects of a similar security classification or sensitivity. Infrastructure builds which require elevated privileges should run on separate dedicated CI servers. Build policies should be enforced in the CI pipeline and by the orchestrator's admission controllers.

Supply chain tools can gather and sign build pipeline metadata. Later stages can then verify the signatures to validate that the prerequisite pipeline stages have run.

The reader should ensure that the CI and Continuous Delivery (CD) infrastructure is as secure as possible. For example, security updates should be prioritized to be installed, and cryptographic keys should be protected from exfiltration via the use of Hardware Security Modules (HSM) or Credential Managers.

## Projects:
- [Tekton](https://github.com/tektoncd/pipeline)
- [Jenkins](https://www.jenkins.io/)
- [TravisCI](https://travis-ci.org/)
- [CircleCI](https://circleci.com/)
- [Spinnaker](https://spinnaker.io/)
- [FluxCD](https://github.com/fluxcd/flux)
- [ArgoCD](https://github.com/argoproj/argo-cd)

<!---
## Commercial Projects:
- [Bamboo](https://www.atlassian.com/software/bamboo)
- [Armory](https://www.armory.io/)
- [Snyk](https://snyk.io)
- [TeamCity](https://www.jetbrains.com/teamcity/)
- [Bamboo](https://www.atlassian.com/software/bamboo
- [Github Actions](https://github.com/features/actions)
- [GitLab](https://docs.gitlab.com/ee/ci/pipelines/)
-->

## Examples:
- Security scans should be automated as a gating step during the software build process. Modern security tooling is designed to allow easy integration with a wide range of continuous integration systems. 
- Software Composition Analysis for detecting vulnerabilities in open source modules used in applications. 
- Static analysis of Dockerfiles for incorrect security settings
- Static analysis of Kubernetes YAML for incorrect security settings
- Scanning of container images 
