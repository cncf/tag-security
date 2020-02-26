# Outline

The burden is primarily on the proposing project to demonstrate it is secure in a manner that is understandable to the broader community.  The [reviewers](security-reviewer.md) will help to assess and probe the design.

The proposing project must provide a written document that describes the project and its security.  The document must contain the following information, at a minimum. Where security considerations do not fit into the outline below, if possible, add a sub-section when possible such that the additional content conforms to the general flow of the review.

Projects are encouraged to cross link additional supporting documents or details from their repo into the self-assessment.

## Metadata

A table at the top for quick reference information, later used for indexing.

|   |  |
| -- | -- |
| Software | A link to the software’s repository.
| Security Provider | Yes or No. Is the primary function of the project to support the security of an integrating system?
|||

## Overview

One or two sentences describing the project -- something memorable and accurate that distinguishes your project to quickly orient readers who may be reviewing multiple assessments.

* Background. Provide information for reviewers who may not be familiar with your project's domain or problem area.
* Goal. The intended goal of the projects including the security guarantees the project is meant to provide (e.g., Flibble only allows parties with an authorization key to change data it stores)
* Non-goals.  Non-goals that a reasonable reader of the project’s literature could believe may be in scope (e.g., Flibble does not intend to stop a party with a key from storing an arbitrarily large amount of data, possibly incurring financial cost or overwhelming the servers)

## Intended Use

* Target Users and Use Cases. Provide a mapping from [standard personas](../../usecases.md) to the nomenclature used in your project docs (which you should then use consistently for the remainder of this document). Describe the scenarios in which the project is expected to be used. This must be specific enough to provide context for analysis. For example:

    Flibble can be used in any cloud environment.  Three diverse examples are as follows:
    1. when a Flibble server is used by legacy servers as a database for salted password hashes.
    2. a Flibble cloudlet may be run on virtualized fog hardware near smartphone users.
    3. a Flibble distributed service may serve as a backend for a Notary image registry.)

* Operation.  A description of the operational aspects of the system, such as how keys are likely to be managed and stored.

## Project Design

* Design.  A description of the system design that discusses how it works. This is especially critical for any mechanisms that relate to the security of the system.  Include architecture and network (if applicable) information such as encryption of traffic between services, access control types (RBAC, etc.) and enforcement, or security logging, etc.

## Configuration and Set-Up

* Default.  Documentation describing the default configuration of the project with initial set-up instructions (link to docs is acceptable). Documentation should identify potential security risks/trade-offs of the default config.
* Secure. Documentation describing recommended secure configuration and set-up instructions, beyond defaults with justification for selection and trade-offs (link to docs is acceptable).
* Advanced Secure. If applicable, documentation describing advanced settings for most hardened configuration of the project to include justification for selection and trade-offs (link to docs is acceptable).

## Project Compliance

* Compliance.  List any security standards or sub-sections the project is already documented as meeting (PCI-DSS, COBIT, ISO, GDPR, etc.).

## Security Analysis

* Attacker Motivations.  A discussion about the likely goals of an attacker as well as the kind of attacker (do not forget to include discussion of insider threat with trusted access to the project).  This likely relates closely to the impact of different attacks in the scenarios.  (e.g., In the password hash case, the attacker wants to expose those hashes on the Flibble server.  However, a Flibble cloudlet attacker may find it more interesting to bring down the service.)
* Predisposing Conditions. A list of potential vulnerabilities and configurations of the project that could potentially be exploited or used correctly to result in an increased likelihood of attack success. Include any trust relationships with other projects that pose a risk of compromise for this project (i.e. compromise of the LDAP results in loss of access control integrity for the project)
* Expected Attacker Capabilities.  A description of likely capabilities that the attacker has in these scenarios should be described.  Both assumptions about the strength and limitations of attackers should be described (e.g., We assume that an attacker may be able to exploit implementation errors in some set of the servers to take control of them.  However, we
assume the attacker cannot break AES or SHA256.)
* Attack Risks and Effects.  A rough estimation of the risk posed by different attacks, and potential negative consequences (e.g., The master Flibble server only communicates with Flibble servers using a minimalistic API that is formally verified and written in Rust.)
* Security Degradation.  A discussion about the resulting security when various attacks are launched.  Note, that no system is secure in all scenarios, hence it is expected that this will include areas where attacks compromise all meaningful security.  (e.g., If an attacker is able to compromise the “master” Flibble server, they may read, write, or delete any content stored on any system)
* Compensating Mechanisms.  Additional architectural decisions, configuration settings, options, etc. designed to reduce overall attack vector and success (minimize impact) 
* Inclusion of a threat model if one exists is encouraged.

## Secure Development Practices

* Development Pipeline.  A description of the testing and review processes that the software undergoes as it is developed and built.
* Communication Channels. Reference where you document how to reach your team or describe in corresponding section.
  * Internal. How do team members communicate with each other?
  * Inbound. How do users or prospective users communicate with the team?
  * Outbound. How do you communicate with your users? (e.g. flibble-announce@ mailing list)
* Ecosystem. How does your software fit into the cloud native ecosystem?  (e.g. Flibber is integrated with both Flocker and Noodles which covers virtualization for 80% of cloud users. So, our small number of "users" actually represents very wide usage across the ecosytem since every virtual instance uses Flibber
encryption by default.)

## Security Issue Resolution

* Responsible Disclosures Process. A outline of the project's responsible disclosures process should suspected security issues, incidents, or vulnerabilities be discovered both external and internal to the project. The outline should discuss communication methods/strategies.
  * Vulnerability Response Process. Who is responsible for responding to a report. What is the reporting process? How would you respond?
* Incident Response. A description of the defined procedures for triage, confirmation, notification of vulnerability or security incident, and patching/update availability.

## Roadmap

* Project Next Steps. Link to your general roadmap, if available, then list prioritized next steps that may have an impact on the risk profile of your project, including anything that was identified as part of this review.
* CNCF Requests. In the initial draft, please include whatever you believe the CNCF could assist with that would increase security of the ecosystem.

## Appendix

* Known Issues Over Time. List or sumarize statistics of past vulerabilities with links. If none have been reported, provide data, if any, about your track record in catching issues in code review or automated testing.
* CII Best Practices. A brief discussion of where the project is at with respect to CII best practices and what it would need to achieve the badge.
* Case Studies. Provide context for reviewers by detailing 2-3 scenarios of real-world use cases.
* Related Projects / Vendors. Reflect on times prospective users have asked about the diffeerences between your project and projectX. Reviewers will have
the same questions
