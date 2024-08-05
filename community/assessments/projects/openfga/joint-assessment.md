# Joint-assessment Outline

The joint-assessment is built on top of the [self-assessment.md](https://tag-security.cncf.io/assessments/projects/openfga/self-assessment/) to
collaboratively assess the current security state of a project.

The burden is primarily on the proposing project to demonstrate it is secure in
a manner that is understandable to the broader community. The
reviewers will help to assess and probe the design and supporting project documentation.

The proposing project must provide a written document that describes the project
and its security. In the case of OpenFGA, there is structured information present
in the [Security-Insights](https://github.com/openfga/openfga/blob/main/SECURITY-INSIGHTS.yml) page. The project [self assessment](https://github.com/cncf/tag-security/blob/main/community/assessments/projects/openfga/self-assessment.md) has been completed.

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
| Assessment Stage | Complete |
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

Implementing access control and authorization is a requirement when developing secure and compliant applications, to explicitly check permissions 
such that a subjects can perform authorized actions on specific resources.

OpenFGA is a high performance and flexible authorization/permission engine that can be used to implement fine grained access control in any 
application component.

Developers can use OpenFGA to craft authorization and permission policies based on the resource access and authorization model 
specific to their own project(s). They can further use the APIs provided by the project to confirm users have the permissions
required to access a given resource.

### Background

OpenFGA is an authorization/permission engine that incorporates Relationship-Based Access Control (ReBAC) and Attribute Based Access Control (ABAC) 
concepts with a domain-specific language that enables crafting authorizations solutions that can grow and evolve to any use case.

Its inspired on the idea described in the [Google Zanzibar paper](https://research.google/pubs/pub48190).

Fine-Grained Authorization refers to individual users having access to specific objects and resources within a system. Google Drive is an example of this, 
as owners of resources can grant different users to have different levels of access to their resources.

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
users of the project with a security focused understanding of OpenFGA and, when
taken with the [self-assessment](./self-assessment.md), provide the community with
the TAG-Security Review of the project.  Both of these documents may be used and
referenced as inputs to a separate security audit.

OpenFGA is a project that provides a security service and as such, any defect
in the project may be a security issue. This document does not look to enumerate
all the possible quality issues (e.g. undetected circular references in model
definitions) that could lead to security issues for users of OpenFGA.

Taken together, this document and the [self-assessment](./self-assessment.md) serve as a
context for the TOC and community when OpenFGA seeks graduation and is preparing for a security audit.

## Intended Use

* Target Users and Use Cases. The key users of this project are users who define authorization models, application developers that integrate the API
  into their application for externalizing authorization and operators.

    OpenFGA can be used in any environment and has helm charts defined for install on a Kubernetes platform.
    1. OpenFGA is used by applications to externalize authorization decisions
    2. The project implements the [Google Zanzibar paper](https://research.google/pubs/pub48190) paper for effective, performant authorization
    3. Administrators can program authorization models into the system for use by application teams

* Operation.  OpenFGA supports both MySQL and Postgres as its datastore. An in-memory store is implemented as the default.

## Project Design

* Design. OpenFGA provides rich documentation around its core [concepts](https://openfga.dev/docs/concepts) and usage of the project. Some project
  decisions are documented under the [rfcs repository](https://github.com/openfga/rfcs), however, this does not have a comprehensive list of all
  project decisions.

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
      - delete
      - list.changes
    relationships.queries:
      - check
      - expand
      - list-objects
      - streamed-list-objects
      - list-users
```

#### Security functions and features

OpenFGA, as an Open-Source project, requires the community to review and evaluate the security implementation per the Principle of Open Design.

OpenFGA models authorization systems by providing authorization methods such as Role-based Access Control, Relationship-based Access Control and Attribute-based Access Control.

OpenFGA was designed for speed in processing secure authorization check call. This swift authorization mechanism not only enhances efficiency 
but also reinforces the security posture, assuring robust protection for applications and platforms for diverse scales.

OpenFGA provides a wide variety of SDKs, as well as easy API integration for new SDKs.

## Configuration and Set-Up

* Default.  The default configuration of the project is described under the [getting started](https://openfga.dev/docs/getting-started) section of the documentation.

* Secure. The recommended [production configuration](https://openfga.dev/docs/getting-started/running-in-production) of the project is described under a
  separate part of the documentation. It is not explicitly secure by default.

## Project Compliance

There are no specific security standards or sub-sections the project is documented
as meeting (e.g. NIST 800-53, CSA, etc.).

### Existing Audits

A self-assessment has been performed but there are no project audits currently
for OpenFGA.

## Security Analysis

### Attacker Motivations

OpenFGA is an authorization/ permission engine that secures sensitive information
including users of the systems referenced by the permission model as well as
permissions and access levels for each. Attackers may have multiple motivations
including:
* Exfiltrating relationship, condition and user data from the service
* Tampering with data to assign, elevate permissions or remove access to authorized users
* Studying the data to understand the application design and operation for further attack steps
* Denial of service by rendering OpenFGA unable to respond to auth requests

### Predisposing Conditions

There are multiple potential configurations of the project that could be exploited,
this includes permissive settings for API tokens and other secrets, running the
server in elevated/privileged mode, exposing vulnerable endpoints such as the profiler accessible to
an attacker and exfiltration of secret tokens from interfacing applications and CLI.

In addition vulnerabilities may be discovered in the server code or dependent libraries
that can be exploited by an attacker.

### Expected Attacker Capabilities

While the attacker is not expected to possess the capability to break well-known
encryption standards, eg AES256, or hashes such as SHA256, they will have sufficient capabilities
and motivation to use well-known tools and techniques for their work. Attackers
are not just assumed to be external to the OpenFGA project, or client application vendor/project, but may also 
be insiders who are contributors, maintainers, or repo admins, or developers or operators with privileged access 
inside the client application environment that are looking to gain a foothold for
further exploits. The latter scenarios assume that the attacker has breached or already has access through
several layers of defense and has direct access to OpenFGA components and
endpoints to further their position within the company perimeter.

### Attack Risks and Effects

While not storing PII (as per project recommendations), OpenFGA does have sensitive
information pertaining to the application and permissions within
the organization. This data could be used by attackers to better understand
the attack landscape and also perform more destructive actions such as escalating
their permissions and locking out users from system access.

### Security Impact Assessment

A compromise of the OpenFGA server in production would lead to
downstream effects in the application landscape. Attackers could assign
themselves arbitraty permissions to sensitive resources or data and also lock out
legitimate users. This could lead to effects from a denial of service
and degradation of customer experience to exfiltration of critical data
from sensitive systems. OpenFGA deals directly with authorization and is
a critical part of any application, as such, compromising this system
could have catastrophic consequences to the organization.

#### Security Risks and Security Impact of Using/Operating OpenFGA
- Access Control: OpenFGA by definition is designed to enforce: (i) information system access to authorized users, or
  processes acting on behalf of authorized users or devices (including other information systems);
  and (ii) the types of transactions and functions that authorized users are permitted to exercise. As such, a failure
  in either access to OpenFGA data or code itself, or the functioning of OpenFGA exposes the application to critical access
  control risks.
- Awareness and Training: Using OpenFGA will requrire developer, operator, security team, auditor and end user training to ensure
  that personnel are adequately prepared to deploy, maintain, and use OpenFGA and design appropriate relationships and models.
  Security staff need to understand the failure modes and threat model and how to monitor the components and produce audit artifacts.
  Even end users need to understand how permissions are modeled and managed, for example, understanfing Google Drive permissions can have a steep
  learning curve for those used to more traditional RBAC rules found in Windows or Linux file systems.
- Audit Support: Introducing OpenFGA will impact system/application audit requirements and require OpenFGA developers, app developers,
  and operators to consider how to:
    - create, protect, and retain information system audit records to the extent needed to enable the monitoring, analysis, investigation,
      and reporting of unlawful, unauthorized, or inappropriate information system activity; and
    - ensure that the actions of individual information system users can be uniquely traced to those users so they can be held accountable for their actions.
- Change Management: OpenFGA project developers and app developers need to consider how changes to the OpenFGA code, configuration, model syntax and features, 
  and the application's specific model(s) will impact the:
    - baseline configuration and relate to the current inventory of organizational users, resources, and condition attributes;
    - establishment and enforcement of secure configuration settings of the OpenFGA components and the app using OpenFGA; and 
    - ability to monitor and control changes to the baseline configurations of the specific app models and to the OpenFGA components
- Identity: How will change(s) to the underlying Identity Provider(s) and identity establishment impact how OpenFGA:
    - identifies users, processes acting on behalf of users, or other subjects (eg IoT devices, etc.); and 
    - authenticates (or verifies) the identities of those users, processes, or devices, as a prerequisite to allowing access.
- Maintenance: How will periodic and timely maintenance be performed including critical security patches in OpenFGA's code and dependencies; 
  how will the project and the app developers provide effective controls on the tools, techniques, mechanisms, and personnel performing maintenance 
  of the OpenFGA code and apps using it.  For example, how would the project control for a malicious contributor trying to subtly introduce leaks or
  back doors? How would app developers identify these potential flaws? How is the repo secured and maintained over time? Other dependencies? etc.
- Securing Data In Transit, At Rest and In Use: While OpenFGA doesn't directly implement encryption, authentication, or integrity of data flows, 
  the maintainers and devs using OpenFGA must consider:
    - communications (i.e., information transmitted or received by OpenFGA components, and the app) are monitored, controlled, and protected at the 
      internal and external boundaries; eg encrypting communication between OpenFGA and the database, or the shared keys, or the audit logs, etc. and 
    - architectural designs, software development techniques, and systems engineering principles that promote effective data security are implemented
- Risk Assessment and Vulnerability Management: How will OpenFGA maintainers and app devs and operators define how:
    - OpenFGA and SDK flaws are identified, reported, and corrected in a timely manner; 
    - malicious code protection is employed;
    - component and OpenFGA app related events are monitored and detected;
    - the correct configuration and operation of security features is tested and verified;
    - information is checked for accuracy, completeness, validity, and authenticity. This is especially imporant in verifying and testing the model
      syntax and semantics
- Supply Chain Integrity and Attacks: How will risks related to OpenFGA itself, and its dependencies be assessed and tracked and remediated?
- Incident Response, Disaster Recovery, Continuity, SRE: How will use of OpenFGA affect existing plans for responding to, investigating, and remediating
  incidents - whether security or availability related?   What playbooks should be created specific to OpenFGA failure modes or attacks? What alerts are
  useful? What forensic data is required? How are logs collected, aggregated, correlated, and retained?
- Compliance and Regulatory Requirements: What documentation, processes, approvals, and legal requirements are in scope for either certification or audit
  by a 3rd party or government agency or customer?

#### Failure Modes Considered

- Project/Repo/Code Failures
  - Key admins or maintainers abandon the project or are unavailable
  - The repository is deleted or defaced or compromised
  - Bugs exist in the core validation of the relationships and conditions
  - Bugs exist in the dependencies used
  - Leakage of data in the logs or by contacting existing services
  - Timing attacks, side channel telemetry
  - shared key or OIDC TLS cert compromises (is OSCP or CRL being checked?)
  - Lack of, or insecure use of, cryptographic code or protocols
  - Release process failures
  - Failures to respond to, or analyze, reported vulnerabilities or known exploits
  - Malicious developers injecting malicious code or designs
- Developer/App Design Failures
  - incorrect use of OpenFGA outside its intended design/goals
  - incorrect confiuration of OpenFGA store, keys, certs, etc
  - incorrect definition of app code using OpenFGA to check relationships, conditions
  - incorrect or missing error handling code or corner cases
  - logging or leaking sensitive information
  - lack of stress and performance testing
  - not using the latest secure releases
- OpenFGA/App Operations Failures
  - failure to check the provenance and integrity of code used
  - failure to check the provenance and integrity of confiuration used
  - failure to check the provenance and integrity of model(s) used
  - failure to secure keys, OIDC TLS, or database encryption and access control and auditing
  - failute to plan for continuity and disaster recovery
  - failure to plan for security incident response
  - OpenFGA API service unavailable at runtime, either failing in a secure closed way, or due to DoS attack
  - Store database unavailable at runtime, either failing in a secure closed way, or due to DoS attack
  - Capacity planning for the service, networking, and database
  - Messaging and communications to end users in the case of outages or failures or breach

### Compensating Mechanisms

Compensating mechanisms are covered in detail in the [Threat Model](#threat-model)
section. These cover steps such as architecture changes for a more
fine-grained permissions system, hardening the default deployment
instructions, changes to user documentation and changes in functionality to
address common exploits.

## Threat Model

Threat modelling was done by threat hunting using the MITRE Att&ck framework. Findings are listed below
along with the Att&ck technique associated with the finding. The findings
are categorized into logical sections. The values for the **Impact** and **Likelihood**
ratings can be High, Med or Low.

NOTE: The OpenFGA server code is managed separately from the "language" parser code.
This review focused on the server code, and so a separate review (perhaps formal modeling exercise) 
would be beneficial for the "language" parser project. As such language parser threats/attacks 
should be considered outside the scope of this review.

Opportunities for improvement identified include:

- Implement FGA for server API
- Relook at user-defined API tokens as an authentication mechanism for API
- Make all installation scripts "secure by default"
- Validate best practices such as using strong API token and avoiding PII

Further opportunities for improvement are listed under the [Secure Development](#security-hygiene-and-secure-sevelopment-practices) section.

### Methods of authentication for server API

Access to OpenFGA API is via oauth or pre-determined API tokens. Pre-shared
tokens present several weak points that result in the findings below.

The project recommends oauth for secure authentication to the API. The recommendation
is to mark shared API tokens as a relatively insecure method of authentication and
that his be avoided in a production environment. This recommendation can be
updated both in the documentation as well as a WARNING can be emmitted in the logs
when authentication via shared API tokens is enabled.

The recommendation to enable Fine Grained Authorization for the API is being
implemented under a [project issue](https://github.com/openfga/roadmap/issues/30).
This risk is currently being mitigated by OpenFGA users by proxying requests
and performing authorization on the proxy.


|Summary|When authenticating using pre-shared keys, these are exposed in container env vars.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Env vars are accessible to anyone with access to the container. There cannot be further permissions set on these like files. Keys further give access to stores and models.|
|MITRE classification|TA0001: Initial Access -> T1078: Valid Accounts<br>TA0003: Persistence -> T1078: Valid Accounts<br>TA0004: Privilege Escalation -> T1078: Valid Accounts|
|Actors|openfga.server|
|Suggested Mitigation|Secrets mounted in filesystem can be restricted with permissions. Alternatively, <br>SPIFFE/ Spire integration may offer a much high level of security (specifically using x.509 SVIDs).|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|

|Summary|Authenticating with shared keys allows keys to be added to the list.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Shared API keys are open to manipulation and bruteforcing since they are fixed keys.|
|MITRE classification|TA0003: Persistence -> T1136: Create Account|
|Actors|openfga.server|
|Suggested Mitigation|Being able to manipulate keys in the container requires access to container. However, impact will be high as openfga access will allow attackers to assign themselves arbitrary privileges.<br>Mitigations include, the ability to rotate keys on a frequent basis and forcing these API tokens to be mounted as files (can be permission controlled) instead of environment variables. Don't use shared keys. Use OAuth or SPIFFE.|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|

|Summary|The openfga API endpoint does not support fga, so admins can modify models they may not own.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Broad permissions allow an admin to modify any model, not just ones that they own.|
|MITRE classification|TA0042: Resource Development -> T1585: Establish Accounts|
|Actors|openfga.server|
|Suggested Mitigation|Can the API endpoint for openfga server support more fine grained permissions so that only owners of stores/ models can modify them? Permissions can be set at a module level. <br>This is being implemented under this [issue](https://github.com/openfga/roadmap/issues/30) by the project.|
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
|Suggested Mitigation|Already bring addresed by project team - <a href="https://github.com/openfga/roadmap/issues/7">https://github.com/openfga/roadmap/issues/7</a>.<br>Documentation is clear to disable playground for prod deployments.<br>When enabled, the playground can be accessed only from localhost. Thus, the attacker must have access to the host where the server is running.|
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

|Summary|INFORMATIONAL: Fixed API access tokens are susceptible to brute force attacks.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Having a fixed set of API tokens with no set TTL to rotate allows attackers to brute-force user created API tokens.|
|MITRE classification|TA0006: Credential Access -> T1110: Brute Force|
|Actors|openfga.server|
|Suggested Mitigation|Support for rotation may mitigate the impact. Also, is this to be disabled in production? Also, can there be a minimal requirement for length and entropy that the server checks for API tokens?<br>SPIFFE/ Spire integration may offer a much high level of security|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Med|

|Summary|INFORMATIONAL: Playground link as well as shape of API identifies the openfga server.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|An attacker performing reconnaissance will be able to identify if a service is the openfga server, a high-value target.|
|MITRE classification|TA0043: Reconnaissance -> T1592: Gather Victim Host Information|
|Actors|openfga.server|
|Suggested Mitigation|Not sure if there is a remediation, given it’s the case for any API server that endpoints will return a 403 rather than 404 for unauthenticated access. An attacker iterating through the expected shape of the API will be able to identify an openfga server.|
|Impact (High/ Med/ Low)|Low|
|Likelihood (High/ Med/ Low)|Low|

|Summary|INFORMATIONAL: Usage of PII as part of Tuples.|
|--|--|
|Discovered in self-assessment?|Yes|
|Weakness|PII can be exfiltrated if present as a part of the Tuples.|
|MITRE classification|TA0042: Resource Development -> T1586: Compromise Accounts|
|Actors|openfga.server|
|Suggested Mitigation|Specifically called out in documentation that PII is not to be used as a part of tuples but not enforced.<br>Also, many sites will use email ID as primary login, documentation may need to address how to handle this situation.<br>A change to detect PII such as email ID's as part of relationships/ tuples and warn the user may tackle this finding at a code level.|
|Impact (High/ Med/ Low)|Med|
|Likelihood (High/ Med/ Low)|Low|

|Summary|INFORMATIONAL: Turning off audit logs will let an attacker mask operations on the server.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Allowing audit logs to be turned off completely via configuration would allow attackers to mask their trail.|
|MITRE classification|TA0005: Defense Evasion -> T1562: Impair Defenses|
|Actors|openfga.server|
|Suggested Mitigation|A possible mitigation is to log a warning message when logs are completely turned off?|
|Impact (High/ Med/ Low)|Med|
|Likelihood (High/ Med/ Low)|Low|

|Summary|INFORMATIONAL: DDOS attack on openfga server would impact overall application landscape.|
|--|--|
|Discovered in self-assessment?|Yes|
|Weakness|A DDOS attack on the server endpoint is not handled by the server and will result in widespread impact on all dependent applications.|
|MITRE classification|TA0005: Defense Evasion -> T1562: Impair Defenses|
|Actors|openfga.server|
|Suggested Mitigation|Documentation can be created for production configuration using an API Gateway/ other DDOS prevention mechanism.<br> The likelihood is rated low as OpenFGA is designed to be run within an intranet environment and not exposed to public internet.|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|

|Summary|INFORMATIONAL: Further review needed on tuple evaluation and crypto guarantees.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Potential ordering and collision attacks possible.|
|MITRE classification|[TA0004](https://attack.mitre.org/tactics/TA0004/): Privilege Escalation |
|Actors|openfga.server|
|Discussion| There seem to be minimal/no guarantees on order of permission tuples when evaluated, combined with not truly random ids, might lead to various timing/sequencing attacks. Nation states, sophisticated attackers, and insider attackers, may have elevated privileges but might not want to directly attack the OpenFGA server in a detectable manner.  They may also want  to stealthily stage capabilities for future attacks and remain undetected and evade forensic analysis. These attackers will look for more complex attacks that are harder to detect. Object and tuple ids are not guaranteed to be cryptographically random, nor are there cryptographically strong assurances of object/tuple content, so collisons may be craftable by attackers and thus the combo of malicious insertions and collision crafting could potentially lead to attcks where a malicious tuple that allows an unauthorized action replaces the correct expected tuple, or malicious tuples are inserted in different orders. For example when a tuple is written to storage it deletes an existing tuple with the same unique id. If an attacker can craft collisions  they might be able to subtly replace a good tuple with a malicious tuple. Also there is a tuple iterator "continuation token". The server uses the continuation token so that it   does not "have to restart from scratch on system restart or on error". This seems also succeptible to specially crafted attacks where changes can be introduced that make insertion and collision attacks possible. More review and testing and ideally formal validation would be needed to prove that such insertion and collision attacks are impossible. Review of all code comments in the golang crypto libraries used, and support of true random number generation would be appropriate for high security environments. Given the limited time available, neither empirical testing nor formal analysis was possible. This should be a focus for further (post-doc/intern funding?) testing and review.|
|Suggested Mitigation|Ensure true random ids, add model/tuple/object hashes or signatures, enforce strict ordering guarantees to ensure evaluation in order, and add crypto safe uniqueness guarantees to make collision insertion attacks impossible.|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|


|Summary|INFORMATIONAL: AES and SH256 crypo use is subject to side channel attacks and speculative execution attaks.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|golang crypto lib AES256-GCM + SHA256 hashing of key material used by encryptor function is subject to side channel attacks and speculative execution attacks.|
|MITRE classification|TA0006: Credential Access -> T1110: Brute Force|
|Actors|openfga.server|
|Discussion|The golang AES GCM code says "If you want to convert a passphrase to a key, use a suitable package like bcrypt or scrypt." Simply hashing a secret  and using that as a key is not sufficient.  A good overview id [discussed here.](https://crypto.stackexchange.com/questions/68545/aes-why-is-it-a-good-practice-to-use-only-the-first-16-bytes-of-a-hash-for-encr). In short, hashes are specially designed for (quick) hashing, key derivation functions are designed specially and carefully for key derivation. Don't mix those use scenarios up. Further, while golang [has some special options](https://github.com/golang/go/wiki/Spectre/dac828df865fc0eb0fed2b7c477ef2c7863ee17d) - not compiled by default - for minimal defenses, golang's crypto package is not specifically defensive against side channel and [speculative execution](https://www.intel.com/content/www/us/en/developer/articles/technical/software-security-guidance/secure-coding/mitigate-timing-side-channel-crypto-implementation.html) [attacks](https://www.amd.com/content/dam/amd/en/documents/epyc-technical-docs/tuning-guides/software-techniques-for-managing-speculation.pdf).  While this is not an OpenFGA specific weakness, given the central importance of an authorization service, it is easy to presume  that attackers, especially nation state or inside attackers, would focus energy on the OpenFGA service and use these techniques.  Using hardware crypo offloading and also hardening OpenFGA and contributing upstream crypto and golang hardening would improve the overall robustness.|
|Suggested Mitigation|Use a proper key derivation function for converting key material to an actual key for AES-GCM, eg. Argon2 or PBKDF. Support hardware  offloading of all crypto operations.  Review defensive recommendations for software side-channel and speculative execution attacks.|
|Impact (High/ Med/ Low)|High|
|Likelihood (High/ Med/ Low)|Low|

## Security Hygiene and Secure Development Practices

This section addresses questions related to project-level security decisions.

|Summary|Core maintainers are all currently from Okta.|
|--|--|
|Discovered in self-assessment?|No|
|Weakness|Dependence on a single organization can impact governance and long term leadership of the project.|
|MITRE classification|N/A|
|Actors|N/A|
|Suggested Mitigation|CNCF should provide resources and support for the project to recruit and train additional maintainers who can both help improve  security and participate longer term in project governance and design leadership. Additionally, CNCF member companies who use OpenFGA should consider  investing staff time and funds to OpenFGA governance and security.|
|Impact (High/ Med/ Low)|N/A|
|Likelihood (High/ Med/ Low)|N/A|

Opportunities for improvement include:

- Multi-organizational ownership of security reporting
- A roadmap that demonstrates a strong consideration for security features
- Public documentation of the project's release versioning policy / Easily understandable release process
- Public release of security and vulnerability scans, eg. Snyk, after appropriate embargo

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
- Maria Ines Parnisari

### Roadmapped Security Improvements

- Increase OpenSSF Best Practices badge level.
- Implement a singleflight CheckResolver to avoid concurrent evaluation of overlapping subproblems. [#1301](https://github.com/openfga/openfga/issues/1301)

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

At the time of the joint assessment, OpenFGA listed closed issues under the
[security](https://github.com/openfga/openfga/security) tab of the OpenFGA repo.

## Hands-on assessment

The hands-on assessment is a lightweight review of the project's internal security as
well as the current recommendation configuration, deployment, and interaction
with regard to security.  Hands-on assessments are subject to security reviewer
availability and expertise.  They are not intended to serve as an audit or
formal assessment and are no guarantee of the actual security of the project.

**OpenFGA did not receive a hands-assessment from TAG-Security.**

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

## Roadmap

* Project Next Steps. The team has created a [project](https://github.com/orgs/openfga/projects/8) under the OpenFGA organization to
track remediations for the findings from this joint assessment. The required
fixes are being undertaken by the project team.
* CNCF Requests. In the initial draft, please include whatever you believe the
  CNCF could assist with that would increase security of the ecosystem.

## Appendix

* Known Issues Over Time. Past issues that have been publicly reported are listed
under [security issues](https://github.com/openfga/openfga/security) tab in the repository. This is not
a comprehensive list of all security issues.

### Case Studies

The [list](https://github.com/openfga/community/blob/main/ADOPTERS.md) of projects that utilize OpenFGA include Okta FGA, Twintag, Mapped, Procure Ai,Canonical (Juju & LFX), Wolt, Italarchivi, Read AI, Virtool, Configu, Fianu Labs, and ExcID.

### Related Projects/Vendors

The list of related projects is available as a [community resource](https://github.com/openfga/community/blob/main/related-projects.md)
