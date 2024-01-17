# in-toto Joint Security Assessment

Completed: May 2019

Security reviewers: Sarah Allen, Justin Cormack, Brandon Lum

Project security lead: Santiago Torres Arias

* Source code: [github.com/in-toto](https://github.com/in-toto)
* Web site: https://in-toto.github.io/

## Background
[Supply chain compromises](https://github.com/in-toto/supply-chain-compromises)
are a powerful attack vector. In cloud native deployments, if you control the
supply chain you can potentially reconfigure anything in an insecure way, since
everything is software-defined.

In-toto ensures the integrity of the supply chain itself, specifically:
1. What steps are to be carried in the supply chain
2. Who can carry out each step
3. How the artifacts between each step interconnect with each other

_Maturity_
* 1 public company case study: [Datadog Agent full
pipeline](https://www.datadoghq.com/blog/engineering/secure-publication-of-datadog-agent-integrations-with-tuf-and-in-toto/)
* Multiple integrations: [Debian apt
get](https://github.com/in-toto/apt-transport-in-toto) ([3 Debian
contributors](https://salsa.debian.org/reproducible-builds/debian-rebuilder-setup/graphs/master)),
[Jenkins plug-in](https://plugins.jenkins.io/in-toto) ([+1
contributor](https://github.com/jenkinsci/in-toto-plugin/graphs/contributors)),
[K8s admission controller](https://github.com/in-toto/in-toto-webhook) ([+1
contributor](https://github.com/in-toto/in-toto-webhook/graphs/contributors))


## Summary

**Design**: straight-forward, adaptable to variations in supply chain pipeline
and process. Non-prescriptive approach leaves opportunity for additional
higher-level tooling.

**Analysis**: focused approach to mitigating risks in supply chain which are
underserved by other tech. Threats are well-understood and mitigated, including
a reasonable degradation approach. Solid code processes; resiliency would
benefit from additional participants.

All questions from reviewers were addressed in
[self-assessment](self-assessment.md) with non-critical issues captured as
issues and noted below.

## Recommendations

To address supply chain vulnerabilities, companies need more than technology,
they will need to adopt or formalize effective policies and procedures.

### CNCF recommendations

* Identify UX Researcher to engage 2-3 companies or projects to evaluate the
  time and effort required to integrate in-toto and recommend improvements
* TAG-Security collaboration to document common supply chain threats and
  complementary solutions that would cover security of all inputs
  (see [issues#224](https://github.com/cncf/tag-security/issues/224))

### Project recommendations

*   Verify in-toto's supply chain with in-toto
    [in-toto/issue#278](https://github.com/in-toto/in-toto/issues/278)
*   Improve introductory documentation to clearly communicate security scope
    [docs/issue#15](https://github.com/in-toto/docs/issues/15)
*   Additional integrations, examples and/or documented case studies (such as:
    [in-toto/issue#284](https://github.com/in-toto/in-toto/issues/284),
    [roadmap#3](https://github.com/in-toto/ITE/issues/3))
*   Consider encoding best practices in default implementation (such as
    [issue#287](https://github.com/in-toto/in-toto/issues/287))
*   Proceed with [CII silver
    badge](https://bestpractices.coreinfrastructure.org/en/projects/1523?criteria_level=1)
    & [roadmap](https://github.com/in-toto/in-toto/blob/develop/ROADMAP.md).
    Just a few open items, listed below:
    * Projects MUST monitor or periodically check their external dependencies
    (including convenience copies) to detect known vulnerabilities, and fix
    exploitable vulnerabilities or verify them as unexploitable.
    * The project MUST implement secure design principles, where
    applicable.
    * The project MUST provide an assurance case that
    justifies why its security requirements are met. The assurance case MUST
    include: a description of the threat model, clear identification of trust
    boundaries, an argument that secure design principles have been applied, and
    an argument that common implementation security weaknesses have been
    countered. (This assessment should be able to provide reference, if needed.)


### Additional recommendations
* Formal security audit: no blocking issues for a formal code audit
* Additional organizations contributing to as core members of the development
  team, recommend addressing documentation issues above in advance of CNCF
  promotion
* Consider integrations with other CI/CD projects


Tracking issue: https://github.com/cncf/tag-security/issues/166
