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

## Examples
- Static Analysis Testing (SAST)
  
  SAST give developers quick feedback as they code, helping them fix issues before they pass the code to the next phase of the software development lifecycle (SDLC). This prevents security-related issues from being considered an afterthought. Also it saves a lot of time and effort from both the development and the security team. It also leads to quick identification and mitigation of security vulnerabilities in the code.  

- Dynamic Analysis Testing (DAST)

  DAST can detect a wide range of real work vulnerabilities, including memory leaks, cross-site scripting (XSS) attacks, SQL injection, and authentication and encryption issues. DAST can be used to dynamically check an application’s internal state, based on inputs and outputs, but also to test your application’s external environment.

- Container Manifest Testing

- Threat Modelling
  
  When considering threats specific to an organization's cloud native capabilities, it is recommended to leverage a mature, well-used model of threats such as STRIDE or OCTAVE. Common threats organizations may wish to consider for their cloud native architectures includes, but is not limited to:

  - Spoofing a cluster admin by stealing the authentication credentials via a social engineering attack
  - Tampering of an API server config file or certificate could result in failed API server restart or mutual TLS authentication failures
  - Repudiation of actions of an attacker because of disabled or misconfigured API auditing could result in a lack of evidence of a potential attack

## Links
- [Software Testing](https://en.wikipedia.org/wiki/Software_testing)
- [List of unit testing frameworks](https://en.wikipedia.org/wiki/List_of_unit_testing_frameworks)
- [Behaviour Driven Development(BDD) and Functional Testing](https://medium.com/javascript-scene/behavior-driven-development-bdd-and-functional-testing-62084ad7f1f2)
- [Threat Modelling: Securing Kubernetes Infrastructure & Deployments](https://www.youtube.com/watch?v=_T-5QhZieH8)
- [Security Architecture Review Of A Cloud Native Environment](https://notsosecure.com/security-architecture-review-of-a-cloud-native-environment/)
- [Using Spinnaker for automated canary analysis](https://spinnaker.io/guides/user/canary/)
- [OWASP Threat Modeling Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Threat_Modeling_Cheat_Sheet.html)
