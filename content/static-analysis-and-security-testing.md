---
title: "Static Analysis and Security Testing"
date: "2020-10-01"
category: "distribute"
---
Static analysis of IaC, application manifests, and software code may cover linting, identifying misconfigurations and vulnerability scanning. IaC code should be subject to the same pipeline policy controls as are application workloads.

IaC is gaining popularity, and its implementation is rapidly increasing among organizations to deploy cloud and container infrastructure. Consequently, insecure configurations in these templates can result in exposing attack vectors.

These templates should be scanned for insecure configurations and other security controls using automated tools before deploying the application and infrastructure artifacts. Key misconfigurations to keep an eye out for include:
- Vulnerabilities contained within images specified in the application manifests
- Configuration settings, such as containers that can escalate privileges.
- Identification of the security contexts and system calls, which can compromise a system.
- Resource limit settings

## Projects

- [Python - Bandit](https://github.com/PyCQA/bandit)
- [Javascript - Eslint](https://github.com/eslint/eslint)
- [Go - Gosec](https://github.com/securego/gosec)
- [Java - Find-sec-bugs](https://github.com/find-sec-bugs/find-sec-bugs/)
- [PHP - phpcs-security-audit](https://github.com/FloeDesignTechnologies/phpcs-security-audit)
- [NodeJS - Nodejs-scan](https://github.com/ajinabraham/NodeJsScan)
- [.NET - security-code-scan](https://github.com/security-code-scan/security-code-scan)
- [Horusec](https://horusec.io/)
- [HuskyCI](https://huskyci.opensource.globo.com/)
- [Ruby - Brakeman](https://brakemanscanner.org/)
- [PHP - RIPS](https://sourceforge.net/projects/rips-scanner/)
- [SonarQube](https://www.sonarsource.com/)
- [CodeQL](https://securitylab.github.com/tools/codeql)
- [Semgrep](https://semgrep.dev/)
- Infrastructure as a Code: Ansible, Terraform etc 
    - [Terrascan](https://github.com/accurics/terrascan)
    - [kics](https://www.kics.io/)
- [Dagda](https://github.com/eliasgranderubio/dagda)


## Examples

- Static code analysis should be performed during development locally and as part of a secure software development lifecycle,  must be performed during the build and distribution process (i.e CI/CD), ideally alongside the implementation of a quality gate such as failing to progress in CI/CD if a certain number of critical/high rating issues are identified.

## Links
- [OWASP Source code analysis](https://owasp.org/www-community/Source_Code_Analysis_Tools)

