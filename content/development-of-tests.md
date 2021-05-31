---
title: "Development of Tests"
date: "2020-10-01"
category: "develop"
---

Developers, operators, and security personnel should build tests for code and infrastructure that is business-critical,
has a high threat-profile, is subject to frequent change, or has/is a historical source of bugs.
Threat modeling can identify high-risk and high-impact code hotspots that provide a high return on investment (ROI) for
developing tests. Tests may include deployment, operating system, infrastructure and database hardening, application
testing (static and dynamic source code testing, container configuration),
integration or system testing (acceptance of application and infrastructure components and their interaction),
and smoke testing (post-deployment checks against a live system). Test authors should have access to comprehensive
development and test environments that enable them to perform rapid test development while reducing
continuous integration (CI) feedback loops. System test suites should be made available to run locally for authors as
well as within a shared testing environment.

## Projects
- [Static Analysis Testing](../static-analysis-and-security-testing.md)
- [Dynamic Analysis Testing](../dynamic-analysis.md)
- [Container Manifest Testing](../container-application-manifest.md)
- [Threat Modelling](../threat-modelling.md)

## Links
- [Software Testing](https://en.wikipedia.org/wiki/Software_testing)
- [List of unit testing frameworks](https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks)
- [Behaviour Driven Development(BDD) and Functional Testing](https://medium.com/javascript-scene/behavior-driven-development-bdd-and-functional-testing-62084ad7f1f2)
- [Threat Modelling: Securing Kubernetes Infrastructure & Deployments](https://www.youtube.com/watch?v=_T-5QhZieH8)
- [Security Architecture Review Of A Cloud Native Environment](https://notsosecure.com/security-architecture-review-of-a-cloud-native-environment/)
- [Using Spinnaker for automated canary analysis](https://spinnaker.io/guides/user/canary/)
- [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
