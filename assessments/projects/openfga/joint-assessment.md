# Joint-assessment Outline

The joint-assessment is built on top of the [self-assessment.md](https://tag-security.cncf.io/assessments/projects/openfga/self-assessment/) to 
collaboratively assess the current security state of a project.

The burden is primarily on the proposing project to demonstrate it is secure in
a manner that is understandable to the broader community. The
reviewers will help to assess and probe the design.

The proposing project must provide a written document that describes the project
and its security.  The document must contain the following information, at a
minimum. Where security considerations do not fit into the outline below, if
possible, add a sub-section such that the additional content conforms to the
general flow of the joint assessment.

Projects are encouraged to cross link additional supporting documents or details
from their repo into the self-assessment.

## Joint-assessment of OpenFGA

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
| Assessment Stage | Incomplete |
| Software | [https://github.com/openfga](https://github.com/openfga) |
| Security Provider | Yes. OpenFGA is used to decide if a subject (user, application) user can perform a specific action on a resource or not.|
| Languages | Go, Java, Javascript, Python, C# |
| SBOM | The Software Bill of Materials is not publicly available, but is included in each GitHub release using Syft, which is a CLI tool, and Go library for generating an SBOM from container images and file systems, since [pull/683](https://github.com/openfga/openfga/pull/683) |

### Security links

These are link to existing security documentation for the project.

| Doc | url |
| -- | -- |
| Security Policy | [OpenFGA Security Policy](https://github.com/openfga/openfga/security/policy) |
| Security Insights | [OpenFGA Security Insights](https://github.com/openfga/openfga/blob/main/SECURITY-INSIGHTS.yml) |
| Security risks | [OpenFGA Security risks](https://github.com/orgs/openfga/security/risk) |
| -- | -- |

## Overview

The overview sections are pulled from the [self-assessment](https://tag-security.cncf.io/assessments/projects/openfga/self-assessment/) and updated.

Implementing access control is a very common requirement when developing applications, where different subjects can perform different actions on different resources.

OpenFGA is a high performance and flexible authorization/permission engine that can be used to implement fine grained access control in any application component.

Developers can use OpenFGA to easily craft authorization and permission methods based on the policies they require that are specific to their own projects. They can further use the API's provided by the project to confirm users have the permissions 
required to access a given resource.

### Background

OpenFGA is an authorization/permission engine that incorporates Relationship-Based Access Control (ReBAC) and Attribute Based Access Control (ABAC) concepts with a domain-specific language that enables crafting authorizations solutions that can grow and evolve to any use case.

It's inspired on the idea described in the [Google Zanzibar paper](https://research.google/pubs/pub48190).

Fine-Grained Authorization refers to individual users having access to specific objects and resources within a system. Google Drive is an example of this, as owners of resources can grant different users to have different levels of access to their resources.

OpenFGA makes helps developers make authorization decisions by combining two concepts:

- An Authorization Model, where developers define their authorization policies

- A set of relationship tuples that instantiate the model and OpenFGA uses to answer access control queries.

An authorization model looks like:

```python
model
  schema 1.1

type user
type group
  relations 
    define member: [user]
type folder
  relations
    define owner: [user]
    define parent: [folder]
    define viewer: [user, group#member] or owner or viewer from parent

type document
  relations 
    define parent: [folder]
    define owner: [user]
    define viewer: [user, group#member] or owner or viewer from parent
```

Relationship tuples look like:

| Subject | Relation | Object |
| --- | --- | --- |
| user:alice | member | group:engineering |
| folder:root | parent | document:readme |
| group#engineering:member | viewer | folder:root |

With this information, OpenFGA can be queried in different ways:

- Using the [/check](https://openfga.dev/api/service#/Relationship%20Queries/Check) endpoint to ask questions like "Is `user:alice` a `viewer` for `document:readme`?". With the data provided above, OpenFGA will return `{allowed : "true"}`, as Alice is a member of the engineering team, which has viewer access on the 'readme' document's parent folder.

- Using the [/list-objects](https://openfga.dev/api/service#/Relationship%20Queries/ListObjects) endpoint to ask questions like "What are all the documents for which `user:alice` is a `viewer`. With the data provided above, OpenFGA will return `{object_ids { "document:readme" }`

### Goal

- Simplify and standardize authorization processes, making them more consistent across various applications and systems.

- Establish patterns and standards for externalized authorization.

- Create architectural patterns, terminologies, and protocols that enable interoperability among different authorization systems.

- Deliver an authorization service for any application component.

- Enable centralized authorization decisions and permits diverse teams to implement authorization using a shared framework across various application components.

### Non-goals

- Tools for management of groups/roles/permissions not inherently provided to the end-users.

- Does not intend to serve as a comprehensive data repository for non-authorization related data.

- Does not aim to provide a complete authentication and Access Control Solution.

## Joint-assessment use

The joint-assessment is initially created by the project team and then
collaboratively developed with the security reviewers as
part of the project's TAG-Security Security Assessment (TSSA) Process.
Information about the TAG-Security Review can be found in the [CNCF TAG-Security
Review Process Guide](https://tag-security.cncf.io/assessments/guide/).

This document does not intend to provide a security audit of OpenFGA and is
not intended to be used in lieu of a security audit.  This document provides
users of the project with a security focused understanding of OpenFGA and when
taken with the [self-assessment](./self-assessment.md) provide the community with
the TAG-Security Review of the project.  Both of these documents may be used and
referenced as part of a security audit.

Taken together, this document and the [self-assessment](./self-assessment.md) serve as a 
cornerstone for if and when OpenFGA seeks graduation and is preparing for a security audit.

## Intended Use

* Target Users and Use Cases. The key users of this project are models who define authorization models, application developers that integrate the API into their application for externalizing authorization and operators.

    OpenFGA can be used in any environment and has helm charts defined for install on a Kubernetes platform. 
    1. OpenFGA is used by applications to externalize authorization decisions
    2. The project implements the [Google Zanzibar paper](https://research.google/pubs/pub48190) paper for effective, performant authorization
    3. Administrators can program authorization models into the system for use by application teams

* Operation.  OpenFGA supports both MySQL and Postgres as its datastore.

## Project Design

* Design. while OpenFGA provides rich documentation around its core [concepts](https://openfga.dev/docs/concepts) and usage of the project, the assessors were not able to locate any documentation about key architecture and design decisions.

### Functions and features

The list below describes the functionality provided by OpenFGA. This assessment 
did not segregate these into critical and other levels but focused on the server 
component as a priority.

```yaml
actions: 
  system.users:
    - Request access to [system.resources] through [openfga.clients|system.applications]  

  system.developers:
    - Integrate [openfga.sdks] in [openfga.clients|system.applications]
    - Validate and verify semantically [openfga.authz_models] 

  system.operators:
    - Migrate [openfga.datastore]  
    - Deploy [openfga.server]

  system.external.idp:
    - Provide [jwks_uri] through oidc /.well-known/openid-configuration 
    - Sign [token] with [rs256] algorithm 

  openfga.language:
    - Provide a domain specific language to describe authorization policies
    - Describe the authorization model with [types], [relations] and [conditions] 
    
  openfga.datastore:
    - Store authorization models [openfga.authz_models] 
    - Store authorization data [openfga.relationships.tuples]
    - Support for [MySQL, Postgres] database

  openfga.clients|system.applications:
    - Authenticate against [openfga.server] with [openfga.psk] secret or through [external.idp]    
    - Execute authorization checks with [openfga.relationships.queries]
    - Manage the authorization model [openfga.authz_models] 

  openfga.server:
    - Write authorization model [openfga.authz_models] to [openfga.datastore]
    - Write authorization data [openfga.relationships.tuples] to [openfga.datastore]
    - Provide [grpc|http] messaging protocol 
    - Authenticate trusted [openfga.clients] with 3 options [none|psk|oidc] 
    - Validate and verify [payload]   
    - Evaluate access control decisions [openfga.relationships.queries]

  openfga.server.api:
    stores:
      - list
      - create
      - get
      - delete 
      - assertions.read
      - assertions.upsert
    authz-models:
      - list
      - create
      - get
    relationships.tuples:
      - read
      - write
      - list.changes
    relationships.queries:
      - check
      - expand
      - list-objects
      - streamed-list-objects
```

#### Security functions and features

OpenFGA, being an Open-Source project, allows for a more robust security implementation by following the Principle of Open Design.

OpenFGA models authorization systems by providing the security features such as Role-based Access Control and Attribute-based Access Control.

OpenFGA boasts exceptional speed in processing secure authorization check call. This swift authorization mechanism not only enhances efficiency but also reinforces the security posture, assuring robust protection for applications and platforms for diverse scales.

OpenFGA provides a wide variety of SDK's, as well as easy integration for new SDK's. This reduces the chance of critical vulnerabilities due to compatibility issues.

## Configuration and Set-Up

* Default.  The default configuration of the project is described under the [getting started](https://openfga.dev/docs/getting-started) section of the documentation.

* Secure. The recommended [production configuration](https://openfga.dev/docs/getting-started/running-in-production) of the project is described under a separate part of the documentation.

## Project Compliance

There are no specific security standards or sub-sections the project is documented 
as meeting (e.g. NIST 800-53, HiTrust, etc.).

### Existing Audits

A self-assessment has been performed but there are no project audits currently 
for OpenFGA.

## Security Analysis

### Attacker Motivations

OpenFGA is an authorization/ permission engine that secures sensitive information 
including users of the systems referenced by the permission model as well as 
permissions and access levels for each. Attackers may have multiple motivations 
including:
* Exfiltrating data from the service
* Tampering with data to assign or elevate permissions
* Studying the data to understand the technology landscape
* Denial of service by rendering OpenFGA unable to respond to auth requests

### Predisposing Conditions

There are multiple potential configurations of the project that could be exploited 
this includes permissive settings for API tokens and other secrets, running the 
server in elevated/ privileged mode, exposing vulnerable endpoints accessible to 
an attacker and exfiltration of secret tokens from interfacing applications and CLI.

In addition vulnerabilities may be discovered in the server and other components 
that can be exploited by an attacker.

### Expected Attacker Capabilities

While the attacker is not expected to possess the capability to break well-known 
encryption standards such as SHA256, they will have sufficient capabilities 
and motivation to use well-known tools and techniques for their work. Attackers 
are not just assumed to be external to the company but may also be persistent 
threats within the company network that are looking to gain a foothold for 
further exploits. The latter scenarios assume that the attacker has breached 
several layers of defense and has direct access to OpenFGA components and 
endpoints to further their position within the company perimeter.

### Attack Risks and Effects

While not storing PII (as per project recommendations), OpenFGA does have sensitive 
information pertaining to the technology landscape and permissions within 
the organization. This data could be used by attackers to better understand 
the landscape and also perform more destructive actions such as escalating 
their permissions and locking out users from system access. In a microservices 
environment, data tampering may lead to subtle issues within the stack that are 
difficult to debug and may degrade customer experience and tie up technology 
teams in troubleshooting.

### Security Degradation

A complete compromise of the OpenFGA server in production would lead to 
ripple effects throughout the organizations. Attackers could assign 
themselves arbitraty permissions to sensitive systems and also lock out 
legitimate users. This could lead to effects from a denial of service 
and degradation of customer experience to exfiltration of critical data 
from sensitive systems. OpenFGA deals directly to autorization and is 
a critical part of any organization, as such, compromising this system 
could have catastrophic consequences to the organization.

### Compensating Mechanisms

Compensating mechanisms are covered in detail in the [Threat Model](#threat-model) 
section. These cover steps such as architecture changes for a more 
fine-grained permissions system, hardening the default deployment 
instructions, changes to user documentation and changes in functionality to 
address common exploits.

## Threat Model

Threat modelling was done using MITRE Att&ck. Findings are listed below 
along with the Att&ck technique associated with the finding. The findings 
are categorized into logical sections. The values for the **Impact** and **Likelihood** 
ratings can be High, Med or Low.

Opportunities for improvement identified include:

- Implement FGA for server API
- Relook at user-defined API tokens as an authentication mechanism for API
- Make all installation scripts "secure by default" 
- Validate best practices such as using strong API token and avoiding PII
- Look at SPIFFE/ Spire integration as an option for OpenFGA server

Further opportunities for improvement are listed under the [Secure Development](#security-hygiene-and-secure-sevelopment-practices) section.

### Methods of authentication for server API

Access to OpenFGA API is via oauth or pre-determined API tokens. Pre-shared 
tokens present several weak points that result in the findings below.

|Summary|Fixed API access tokens are susceptible to brute force attacks.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Having a fixed set of API tokens with no set TTL to rotate allows attackers to brute-force user created API tokens.|
|MITRE classification|TA0006: Credential Access -> T1110: Brute Force|
|Actors|openfga.server|
|Suggested Mitigation|Support for rotation may mitigate the impact. Also, is this to be disabled in production? Also, can there be a minimal requirement for length and entropy that the server checks for API tokens?<br>SPIFFE/ Spire integration may offer a much high level of security|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Med|

|Summary|Authenticating with shared keys allows keys to be added to the list.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Shared API keys are open to manipulation and bruteforcing since they are fixed keys.|
|MITRE classification|TA0003: Persistence -> T1136: Create Account|
|Actors|openfga.server|
|Suggested Mitigation|Being able to manipulate keys in the container requires access to container. However, impact will be high as openfga access will allow attackers to assign themselves arbitrary privileges.<br>Mitigations include, the ability to rotate keys on a frequent basis and forcing these API tokens to be mounted as files (can be permission controlled) instead of environment variables.|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|

|Summary|The openfga API endpoint does not support fga, so admins can modify models they may not own.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Broad permissions allow an admin to modify any model, not just ones that they own.|
|MITRE classification|TA0042: Resource Development -> T1585: Establish Accounts|
|Actors|openfga.server|
|Suggested Mitigation|Can the API endpoint for openfga server support more fine grained permissions so that only owners of stores/ models can modify them? Permissions can be set at a module level.|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|

|Summary|When authenticating using pre-shared keys, these are exposed in container env vars.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Env vars are accessible to anyone with access to the container. There cannot be further permissions set on these like files. Keys further give access to stores and models.|
|MITRE classification|TA0001: Initial Access -> T1078: Valid Accounts<br>TA0003: Persistence -> T1078: Valid Accounts<br>TA0004: Privilege Escalation -> T1078: Valid Accounts|
|Actors|openfga.server|
|Suggested Mitigation|Secrets mounted in filesystem can be restricted with permissions, however, may not offer a significantly higher level of security.<br>SPIFFE/ Spire integration may offer a much high level of security.|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|

### Setting secure defaults for install

This section has findings related to default install options that can be made more 
secure. The artifacts analysed in this section include the helm chart for installation 
and default configuration options.

|Summary|Open playground link - clients can access the playground (enabled by default) without authorization and access openfga models.|
|--|--|
|Discovered in self-assessment?|Yes|
|Weakness|Unauthorized access to openfga data. Ability to both view and manipulate data.|
|MITRE classification|TA0043: Reconnaissance -> T1595: Active Scanning<br>TA0001: Initial Access -> T1189: Drive-by Compromise|
|Actors|openfga.server|
|Suggested Mitigation|Already bring addresed by project team - <a href="https://github.com/openfga/roadmap/issues/7">https://github.com/openfga/roadmap/issues/7</a>.<br>Documentation is clear to disable playground for prod deployments.|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|

|Summary|Helm chart runs containers with higher privilege by default.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Unauthorized access to openfga data. Ability to both view and manipulate data.|
|MITRE classification|TA0002: Execution -> T1203: Exploitation for Client Execution<br>TA0003: Persistence -> T1098: Account Manipulation<br>TA0004: Privilege Escalation -> T1548: Abuse Elevation Control Mechanism<br>TA0004: Privilege Escalation -> T1134: Access Token Manipulation<br>TA0004: Privilege Escalation -> T1098: Account Manipulation<br>TA0004: Privilege Escalation -> T1611: Escape to Host<br>TA0005: Defense Evasion -> T1548: Abuse Elevation Control Mechanism<br>TA0005: Defense Evasion -> T1134: Access Token Manipulation|
|Actors|openfga.server|
|Suggested Mitigation|Could the defaults for all install scripts be set to run the openfga server with limited permissions?<br>In the case of helm chart, this would achieve: <ol><li>Not running server as root</li> <li>Not allowing privilege escalation</li> <li>Not allowing access to system calls unless required</li> <li>Setting filesystem to readonly </li> <li>Limiting access to mounted filesystems</li></ol><br>This would greatly reduce the attack surface area. |
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|

|Summary|An external dependency to groundnuty/k8s-wait-for is pinned using tag.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Source tags can be overwritten in case of a supply chain attack and a compromised image may be pulled down. The risk is greater in the case of external, third party dependencies not under the projects control.|
|MITRE classification|TA0001: Initial Access -> T1195: Supply Chain Compromise|
|Actors|openfga.server|
|Suggested Mitigation|Pin the dependency using SHA tag for the container image.|
|Impact (High/ Med/ Low)|Low|
|Likelihood (High/ Med/ Low)|Low|

### Other findings

This section has other findings that could not be classified 
in earlier parts. It includes exploits such as server DDOS and 
potential leakage of information about application landscape.

|Summary|Playground link as well as shape of API identifies the openfga server.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|An attacker performing reconnaissance will be able to identify if a service is the openfga server, a high-value target.|
|MITRE classification|TA0043: Reconnaissance -> T1592: Gather Victim Host Information|
|Actors|openfga.server|
|Suggested Mitigation|Not sure if there is a remediation, given it’s the case for any API server that endpoints will return a 403 rather than 404 for unauthenticated access. An attacker iterating through the expected shape of the API will be able to identify an openfga server.|
|Impact (High/ Med/ Low)|Low|
|Likelihood (High/ Med/ Low)|Low|

|Summary|Usage of PII as part of models.|
|--|--|
|Discovered in self-assessment?|Yes|
|Weakness|PII can be exfiltrated if present as a part of the models.|
|MITRE classification|TA0042: Resource Development -> T1586: Compromise Accounts|
|Actors|openfga.server|
|Suggested Mitigation|Specifically called out in documentation that PII is not to be used as a part of models but not enforced.<br>Also, many sites will use email ID as primary login, documentation may need to address how to handle this situation.<br>A change to detect PII such as email ID's as part of models and relationships/ tuples and warn the user may tackle this finding at a code level.|
|Impact (High/ Med/ Low)|Med|
|Likelihood (High/ Med/ Low)|Low|

|Summary|Turning off audit logs will let an attacker mask operations on the server.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Allowing audit logs to be turned off completely via configuration would allow attackers to mask their trail.|
|MITRE classification|TA0005: Defense Evasion -> T1562: Impair Defenses|
|Actors|openfga.server|
|Suggested Mitigation|A possible mitigation is to log a warning message when logs are completely turned off?|
|Impact (High/ Med/ Low)|Med|
|Likelihood (High/ Med/ Low)|Low|

|Summary|DDOS attack on openfga server would impact overall application landscape.|
|--|--|
|Discovered in self-assessment?|Yes|
|Weakness|A DDOS attack on the server endpoint is not handled by the server and will result in widespread impact on all dependent applications.|
|MITRE classification|TA0005: Defense Evasion -> T1562: Impair Defenses|
|Actors|openfga.server|
|Suggested Mitigation|Documentation can be created for production configuration using an API Gateway/ other DDOS prevention mechanism.|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|

## Security Hygiene and Secure Development Practices

This section addresses questions related to project-level security decisions.

Opportunities for improvement include:

- Multi-organizational ownership of security reporting
- A roadmap that demonstrates a strong consideration for security features
- Public documentation of the project's release versioning policy
- Easily understandable release process

### Release and Update Process

#### Release Documentation

| Aspect                              | Status |
|-------------------------------------|--------|
| Easily understandable release process | GitHub Actions Workflow `release.yml` is used for GitHub releases. Action fails but release succeeds. |
| Release versioning policy           | Reportedly in progress. |

#### Provenance Artifacts

Artifacts included with each release:

- Checksums
- Checksum.sig/pem
- in-toto

#### User Instructions for Validating Artifact Signatures

| Aspect                          | Status |
|---------------------------------|--------|
| Clear instructions are provided | Yes    |
| Instructions are maintained independently from the release process. | [OpenFGA Provenance Implementation](https://github.com/openfga/community/blob/main/provenance-implementation/openfga.md) |

### Reporting Security Incidents

#### Security Reporting Method
| Aspect                     | Status |
|----------------------------|--------|
| Documentation Location     | Project’s Security tab                              |
| Email                      | [security@openfga.dev](mailto:security@openfga.dev) |
| SLA                        | 5-day                                               |
| Visibility Test Response   | 2 minutes                                           |

#### Security Reporting Ownership

| Aspect                        | Status                                     |
|-------------------------------|--------------------------------------------|
| Bus-Proofing                  | Checked by at least 2 users, available to more |
| Layoff-Proofing               | Not implemented; core maintainers are all currently from Okta |

### Reducing Vulnerabilities Through Development

| Aspect | Details |
|--------|---------|
| Secure Development Practices | Optional secure development training is provided by Okta. | Security Review is done for every feature addition. |
| Code Quality and Testing | CodeQL is used on every pull request. The team is confident in the test coverage. |
| Binary Management | CLOMonitor check passes, and the team is aware of the dangers of allowing binaries in the project. |
| OpenSSF Scorecard | Badge present. Score is 9.3, well above the average of 4. |
| OpenSSF Best Practices | Badge present. Passing grade. |
| CLOMonitor | 100% security score. |

### Dependency Management

| Aspect                      | Status |
|-----------------------------|--------|
| Lifecycle Policy            | [Dependency Lifecycle Policy](https://github.com/openfga/openfga/blob/main/docs/dependencies-policy.md) |
| SCA Checks                  | - [Semgrep Workflow](https://github.com/openfga/openfga/blob/main/.github/workflows/semgrep.yaml)<br>- [Pull Request Workflow](https://github.com/openfga/openfga/blob/main/.github/workflows/pull_request.yaml)<br>- Dependabot |
| SCA Findings Review Process | Recommendations from Dependabot, Snyk, etc., are reviewed during a weekly meeting |

### Security Champions

The following maintainers take a special interest in project security:

- Louis Jette
- Maria Inesparnisari

### Roadmapped Security Improvements

- Increase OpenSSF Best Practices badge level.
- Implement a singleflight CheckResolver to avoid concurrency evaluation of overlapping subproblems. [#1301](https://github.com/openfga/openfga/issues/1301)

## Security Issue Resolution

### Responsible Disclosure

OpenFGA vulnerability management is described in the official project security documentation [SECURITY.md](https://github.com/openfga/.github/blob/main/SECURITY.md).

### Incident Response

The OpenFGA maintainers bear the responsibility of monitoring and addressing reported vulnerabilities. Identified issues undergo prioritized triage, with immediate escalation upon confirmation. The triage process is conducted in private channels.

Adhering to the GitHub security advisory process, OpenFGA initiates the CVE (Common Vulnerabilities and Exposures) request upon issue identification. The resolution is developed in a private branch associated with the CVE.

Upon confirmation of the fix's effectiveness, it is released through a new patch for each major supported version of OpenFGA.

The changelog will link to the CVE, which will describe the vulnerability and its mitigation. Any public announcements sent for these fixes will be linked to [the release notes](https://github.com/openfga/openfga/releases/tag/v1.3.2).

All OpenFGA security issues can be found on the [Github advisories page](https://github.com/openfga/openfga/security/advisories).

### Closed security issues and vulnerabilities

At the time of the joint assessment, OpenFGA did not have any closed or fixed 
issues in their repo with the label "security".

## Hands-on assessment

The hands-on assessment is a lightweight review of the project's internal security as
well as the current recommendation configuration, deployment, and interaction
with regard to security.  Hands-on assessments are subject to security reviewer
availability and expertise.  They are not intended to serve as an audit or
formal assessment and are no guarantee of the actual security of the project.

**OpenFGA did/did not receive a hands-assessment from TAG-Security.**

<!-- Commented out in case a hands-on assessment is requested and performed
*If a hands-on assessment was performed, the below format should be used for
reporting details*

| | |
| -- | -- |
| Date of assessment | mmddyyyy-mmddyyyy |
| Hands-on reviewers | name, github handle |

| Finding Number | Finding name | Finding Notes | Reviewer |
| -- | -- | -- | -- |
| | | |

### Hands-on assessment result

General comments and summary of the hands-on assessment with any recommendations
worth noting.  If nothing found use the below example:

> TAG-Security's hands-on assessment did not reveal any significant or notable
security findings for OpenFGA. This outcome does not indicate that none exist,
rather that none were discovered.
-->

## Roadmap [TODO] fill in consultation with project team

* Project Next Steps. Link to your general roadmap, if available, then list
  prioritized next steps that may have an impact on the risk profile of your
project, including anything that was identified as part of this assessment.
* CNCF Requests. In the initial draft, please include whatever you believe the
  CNCF could assist with that would increase security of the ecosystem.

## Appendix

* Known Issues Over Time. List or summarize statistics of past vulnerabilities
  with links. If none have been reported, provide data, if any, about your track
  record in catching issues in code review or automated testing.

### Case Studies

The [list](https://github.com/openfga/community/blob/main/ADOPTERS.md) of projects that utilize OpenFGA include Okta FGA, Twintag, Mapped, Procure Ai,Canonical (Juju & LFX), Wolt, Italarchivi, Read AI, Virtool, Configu, Fianu Labs, and ExcID.

### Related Projects/Vendors

The list of related projects is available as a [community resource](https://github.com/openfga/community/blob/main/related-projects.md)
