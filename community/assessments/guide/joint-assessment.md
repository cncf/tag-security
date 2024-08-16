# Joint-assessment Outline

The joint-assessment is built on top of the [self-assessment](self-assessment.md) to
collaboratively assess the current security state of a project.

The burden is primarily on the proposing project to demonstrate it is secure in
a manner that is understandable to the broader community.  The
[reviewers](security-reviewer.md) will help to assess and probe the design.

The proposing project must provide a written document that describes the project
and its security.  The document must contain the following information, at a
minimum. Where security considerations do not fit into the outline below, if
possible, add a sub-section such that the additional content conforms to the
general flow of the joint assessment.

Projects are encouraged to cross link additional supporting documents or details
from their repo into the self-assessment.

## Joint-assessment of [Project]

## Table of Contents

* [Metadata](#metadata)
  * [Security links](#security-links)
* [Overview](#overview)
  * [Background](#background)
  * [Goals](#goal)
  * [Non-goals](#non-goals)
* [Joint-assessment use](#joint-assessment-use)
* [Intended use](#intended-use)
* [Project design](#project-design)
  * [Functions and features](#functions-and-features)
    * [Security functions and features](#security-functions-and-features)
* [Configuration and set-up](#configuration-and-set-up)
* [Project compliance](#project-compliance)
* [Security analysis](#security-analysis)
* [Secure development practices](#secure-development-practices)
* [Security issue resolution](#security-issue-resolution)
  * [Closed security issues and
    vulnerabilities](#closed-security-issues-and-vulnerabilities)
* [Hands-on assessment](#hands-on-assessment)
* [Roadmap](#roadmap)
* [Appendix](#appendix)

## Metadata

A table at the top for quick reference information, later used for indexing.

<!-- n.b the below table is line wrapped by the linter on this repo, which is
mutually exclusive with markdown table syntax -->

|   |  |
| -- | -- |
| Software | A link to the software’s repository.  |
| Security Provider | Yes or No. Is the primary function of the project to support the security of an integrating system?  |
| Languages | languages the project is written in |
| SBOM | Software bill of materials. Link to the libraries, packages, versions used by the project, may also included direct dependencies. |
| | |

### Security links

Provide the list of links to existing security documentation for the project.
You may use the table below as an example:

| Doc | URL |
| -- | -- |
| Security file | <https://my.security.file> |
| Default and optional configs | <https://my.security.config> |

## Overview

This section can be pulled from the [self-assessment](self-assessment.md) and
updated.

One or two sentences describing the project -- something memorable and accurate
that distinguishes your project to quickly orient readers who may be reviewing
multiple projects.

### Background

Provide information for reviewers who may not be familiar with  your project's
domain or problem area.

### Goal

The intended goal of the project, it should also include the security guarantees
the  project is meant to provide (e.g., Flibble only allows parties with an
authorization key to change data it stores).

### Non-goals

Non-goals that a reasonable reader of the project’s literature  could believe
may be in scope (e.g., Flibble does not intend to stop a party with a key from
storing an arbitrarily large amount of data, possibly incurring financial cost
or overwhelming the servers)

## Joint-assessment use

The joint-assessment is initially created by the project team and then
collaboratively developed with the [security reviewers](security-reviewer.md) as
part of the project's TAG-Security Security Assessment (TSSA) Process.
Information about the TAG-Security Review can be found in the [CNCF TAG-Security
Review Process Guide](./README.md).

This document does not intend to provide a security audit of [project] and is
not intended to be used in lieu of a security audit.  This document provides
users of [project] with a security focused understanding of [project] and when
taken with the [self-assessment](self-assessment.md) provide the community with
the TAG-Security Review of the project.  Both of these documents may be used and
references as part of a security audit.

## Intended Use

* Target Users and Use Cases. Provide a mapping from [standard
personas](../../usecase-personas) to the nomenclature used in your project docs
(which you should then use consistently for the remainder of this document).
Describe the scenarios in which the project is expected to be used. This must be
specific enough to provide context for analysis. For example:

    Flibble can be used in any cloud environment.  Three diverse examples are as
follows:
    1. when a Flibble server is used by legacy servers as a database for salted
       password hashes.
    2. a Flibble cloudlet may be run on virtualized fog hardware near smartphone
       users.
    3. a Flibble distributed service may serve as a backend for a Notary image
       registry.)

* Operation.  A description of the operational aspects of the system, such as
  how keys are likely to be managed and stored.

## Project Design

* Design.  A description of the system design that discusses how it works. This
  is especially critical for any mechanisms that relate to the security of the
system.  Include architecture and network (if applicable) information such as
encryption of traffic between services, access control types (RBAC, etc.) and
enforcement, or security logging, etc.

* Data flow diagram/Architecture diagram

### Functions and features

* Critical.  A listing with brief description of functions and features that are
  critical to the project's ability to meet its intended use.  It is recommended
these be covered in the threat model.
* Relevant.  A listing with brief description of the functions and features of
  the project that perform a security relevant function.  It is recommended
these be covered in the threat model.

#### Security functions and features

This section should be pulled from the self-assessment.

## Configuration and Set-Up

* Default.  Documentation describing the default configuration of the project
  with initial set-up instructions (link to docs is acceptable). Documentation
should identify potential security risks/trade-offs of the default config.
* Secure. Documentation describing recommended secure configuration and set-up
  instructions, beyond defaults with justification for selection and trade-offs
(link to docs is acceptable).
* Advanced Secure. If applicable, documentation describing advanced settings for
  most hardened configuration of the project to include justification for
selection and trade-offs (link to docs is acceptable).

## Project Compliance

This can be pulled from the self-assessment.

* Compliance.  List any security standards or sub-sections the project is
  already documented as meeting (NIST 800-53, HiTrust, etc.).

### Existing Audits

If any audits already exist, link them here with the appropriate dates.

## Security Analysis

### Attacker Motivations

A discussion about the likely goals of an attacker as  well as the kind of
attacker (do not forget to include discussion of insider threat with trusted
access to the project).  This likely relates closely to the impact of different
attacks in the scenarios.  (e.g., In the password hash case, the attacker wants
to expose those hashes on the Flibble server.  However, a Flibble cloudlet
attacker may find it more interesting to bring down the service.)

### Predisposing Conditions

A list of potential vulnerabilities and configurations of the project that could
potentially be exploited or used correctly to result in an increased likelihood
of attack success. Include any trust relationships with other projects that pose
a risk of compromise for this project (i.e. compromise of the LDAP results in
loss of access control integrity for the project)

### Expected Attacker Capabilities

A description of likely capabilities that the  attacker has in these scenarios
should be described.  Both assumptions about the strength and limitations of
attackers should be described (e.g., We assume that an attacker may be able to
exploit implementation errors in some set of the servers to take control of
them.  However, we assume the attacker cannot break AES or SHA256.)

### Attack Risks and Effects

A rough estimation of the risk posed by different attacks, and potential
negative consequences (e.g., The master Flibble server only communicates with
Flibble servers using a minimalistic API that is formally verified and written
in Rust.)

### Security Degradation

A discussion about the resulting security when various attacks are launched.
Note, that no system is secure in all scenarios, hence it is expected that this
will include areas where attacks compromise all meaningful security.  (e.g., If
an attacker is able to compromise the “main” Flibble server, they may read,
write, or delete any content stored on any system).  This should be stated in
terms that are accessible to a reader that does not fully understand the system.
Hence, "a compromised main Flibble key lets and attacker push and pull widgets"
is less useful than saying "compromised main Flibble key lets an attacker
execute arbitrary code on client machines using the Flibble server".

### Compensating Mechanisms

Additional architectural decisions, configuration settings, options, etc.
designed to reduce overall attack vector and success (minimize impact).
Particular detail should be paid to mechanisms that contain an attack
(separation of privilege) and the techniques used to recover from a successful
attack.  It is important to have clear documentation that explains what types of
 security incidents are likely to occur and what means should be undertaken to
 securely recover. I.e., in the case of a Flibble server compromise, a threshold
 of the offline Flibble keys must be used in order to sign new Flibble metadata
to revoke the older server key.  This new metadata should be distributed to
 clients using the Flibble widget create operation as soon as is feasible as in
the interim clients will tryst the compromised server, enabling an attacker to
serve them outdated widgets that are known to be defective.

## Threat Model

Below is an example threat model table for key attack area (these will be unique
to the project and likely come from the security functions and features
section).

### Identity Theft

| Victim Components                | Server                                                                                                                                                              | Agent                                                                                                                                                                                                                     | Container (same node)                                                                                                                                                                                                                                                                           | Container (diff node)                                                                                                                                                                                                                                                              |
|----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Victim Server                    | N/A: There is only one server                                                                                                                                        | "Mitigated: The server has validation in place to prevent it from signing CSRs for SPIFFE IDs that are not registered to a particular agent. Furthermore, there is validation to prevent an operator from erroneously registering the server's SPIFFE ID. Agents always validate the server's SPIFFE ID when connecting to it. Score: 0.11" | "Mitigated: There is validation to prevent an operator from erroneously registering the server's SPIFFE ID. Score: 0.11"                                                                                                                                                                        | "Mitigated: There is validation to prevent an operator from erroneously registering the server's SPIFFE ID. Score: 0.11"                                                                                                                                                                        |
| Victim Agent                     | "NONE: The server has the signing keys and can issue new identities at will. Score: 57.5"                                                                            | "Mitigated: The server has validation in place to prevent it from signing CSRs for SPIFFE IDs that are not registered to a particular agent. Furthermore, there is validation to prevent an operator from erroneously registering a SPIFFE ID representing an agent. Score: 0.115"                       | "ESCAPE: If a container escape and privilege escalation can be performed, it is possible to read the agent's key from memory. Score: 0.63"                                                                                                                                                       | "Mitigated: There is validation to prevent an operator from erroneously registering the agent's SPIFFE ID. Score: 0.115"                                                                                                                                                                       |
| Victim Container (same node)     | "NONE: The server has the signing keys and can issue new identities at will. Score: 5.5"                                                                             | "NONE: Agent controls the keys and certificates for all containers authorized to run on it. Score: 5.5"                                                                                                                                                          | "ESCAPE: If a container escape and privilege escalation can be performed, it is possible to read neighboring container's keys from memory. Score: 0.231"                                                                                                                                         | "ESCAPE: A container can be authorized to run on multiple nodes. If the container in question is authorized to run on the node with the evil container, then the evil container can obtain a certificate representing the victim container by reading keys from the memory of the local agent. Score: 0.525"                      |
| Victim Container (diff node)     | "NONE: The server has the signing keys and can issue new identities at will. Score: 12.5"                                                                            | "NONE: A container can be authorized to run on multiple nodes. If the container in question is authorized to run on the node with the evil agent, then the evil agent can obtain a certificate representing the container. Score: 12.5 NOTE: This condition only occurs under certain configurations" | "ESCAPE: A container can be authorized to run on multiple nodes. If the container in question is authorized to run on the node with the evil container, then the evil container can obtain a certificate representing the victim container by reading keys from the memory of the local agent. Score: 0.525" | "ESCAPE: A container can be authorized to run on multiple nodes. If the container in question is authorized to run on the node with the evil container, then the evil container can obtain a certificate representing the victim container by reading keys from the memory of the local agent. Score: 0.525" |

### Compromise

Use previous table outline

### Denial of Service

Use previous table outline

## Secure Development Practices

This should be pulled in from the self-assessment.

## Security Issue Resolution

This should be pulled in from the self-assessment.

### Closed security issues and vulnerabilities

This should provide links and very brief summary of any closed security issues
 or fixed vulnerabilities for the project (with or without CVE).  If the project
does not have any closed or fixed vulnerabilities use the below text:

> At the time of the joint assessment, [project] did not have known security issues
with a closed state or any known vulnerabilities that were fixed.

## Hands-on assessment

The hands-on assessment is a lightweight review of the project's internal security as
well as the current recommendation configuration, deployment, and interaction
with regard to security.  Hands-on assessments are subject to security reviewer
availability and expertise.  They are not intended to serve as an audit or
formal assessment and are no guarantee of the actual security of the project.

**[Project] did/did not receive a hands-assessment from TAG-Security.**

*If a hands-on assessment was performed, the below format should be used for
reporting details*

### Assessment Details

| Field               | Description               |
|---------------------|---------------------------|
| Date of assessment  | mmddyyyy-mmddyyyy         |
| Hands-on reviewers  | name, github handle       |

### Findings

| Finding Number | Finding name | Finding Notes | Reviewer           |
|----------------|--------------|---------------|--------------------|
|                |              |               |                    |

### Hands-on assessment result

General comments and summary of the hands-on assessment with any recommendations
worth noting.  If nothing found use the below example:

> TAG-Security's hands-on assessment did not reveal any significant or notable
security findings for [project]. This outcome does not indicate that none exist,
rather that none were discovered.

## Roadmap

* Project Next Steps. Link to your general roadmap, if available, then list
  prioritized next steps that may have an impact on the risk profile of your
project, including anything that was identified as part of this assessment.
* CNCF Requests. In the initial draft, please include whatever you believe the
  CNCF could assist with that would increase security of the ecosystem.

## Appendix

* Known Issues Over Time. List or summarize statistics of past vulnerabilities
  with links. If none have been reported, provide data, if any, about your track
  record in catching issues in code review or automated testing.
* Case Studies. Provide context for reviewers by detailing 2-3 scenarios of
  real-world use cases.
* Related Projects / Vendors. Reflect on times prospective users have asked
  about the differences between your project and projectX. Reviewers will have
the same questions
