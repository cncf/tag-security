# CloudEvents Self-assessment

September 26, 2023

Authors: Igor Rodrigues (@igor8mr), Matthew Gong (@MatthewZGong), Kushal Kothari
(@Kushal-kothari) and Devyani Bairagya (@devyani-14).

Contributors/Reviewers: Pranava Kumar Vemula (@Rana-KV).

This document elaborates and explores the design goals for CloudEvents as well
as a security assessment of the software.

## Table of contents

* [Metadata](#metadata)
  * [Security links](#security-links)
* [Overview](#overview)
  * [Background](#background)
  * [Actors](#actors)
  * [Actions](#actions)
  * [Goals](#goals)
  * [Non-goals](#non-goals)
* [Self-assessment use](#self-assessment-use)
* [Security functions and features](#security-functions-and-features)
* [Project compliance](#project-compliance)
* [Secure development practices](#secure-development-practices)
  * [Development Pipeline](#development-pipeline)
  * [Communications Channels](#communications-channels)
  * [Ecosystem](#ecosystem)
* [Security issue resolution](#security-issue-resolution)
* [Appendix](#appendix)
  * [Known Issues Over Time](#known-issues-over-time)
  * [CII Best Practices](#cii-best-practices)
  * [Case Studies](#case-studies)
  * [Related Projects and Vendors](#related-projects-and-vendors)

## Metadata

|   |  |
| -- | -- |
| Software | [CloudEvents Repository](https://github.com/cloudevents/spec)  |
| Security Provider | CloudEvents does not currently specify a dedicated security provider.  |
| Languages | ANTRL, Python, C#/.NET, Go, Java, Javascript, PHP, PowerShell, Ruby and Rust |
| SBOM | **`TO-DO`** Software bill of materials.  Link to the libraries, packages, versions used by the project, may also include direct dependencies. |
| | |

### Security links

| Doc | url |
| -- | -- |
| CloudEvents Security Assessment  | https://github.com/cloudevents/spec/blob/main/docs/CE-SecurityAudit-2022-10.pdf |

## Overview

CloudEvents is an open-source specification for describing data events. Such
events are frequently used across many industry fields, but there are currently
no standards on how to write those. Because of that, which is currently very
different across different developers. This makes programmers have to develop
new event handling logic for each event source and makes it hard for two systems
to communicate with each other. CloudEvents seeks to dramatically simplify event
declaration and delivery across services, platforms, and beyond.

![CloudEvents Logo](images/cloudevents-logo.png)

The project also provides software development kits (SDKs) for Go, JavaScript,
Java, C#, Ruby, PHP, PowerShell, Rust, and Python. These can be used to build
event routers, tracing systems, and other tools.

### Background

#### Event

An "event" is a data record expressing an occurrence and its context. Events are
routed from an event producer (the source) to interested event consumers. The
routing can be performed based on information contained in the event, but an
event will not identify a specific routing destination. Events will contain two
types of information: the Event Data representing the Occurrence and Context
metadata providing contextual information about the Occurrence. A single
occurrence MAY result in more than one event.

There is no common language on events themselves. So when a new software is
created developers have to write new event handling processes for different
types of sources. This can become very chaotic and unorganized.

CloudEvents was developed to address the lack of uniformity in event data
formats that exist in cloud and microservices environments. By providing a
standardized way to represent events, CloudEvents aims to enhance
interoperability, portability, and simplicity in event-driven architectures
across different cloud providers and services.

### Actors

#### Event Consumer

 The entity/system interested in subscribing to different events. Receiving
 Events from the producer will trigger further action that is up to the
 consumer. A "consumer" receives the event and acts upon it, which might lead to
 the occurrence of new events.

#### Event Producer

 The entity/system that produces the "events". They are responsible for wrapping
 event data in the CloudEvents specification.

#### Event Mediator/Intermediary

 Depending on the architecture of the system, the event mediator is the
 entity/system that is responsible for the distribution, processing and routing
 of events to consumers. The event broker ensures reliable delivery and may
 enforce security policies.

### Actions

#### Event Formating

Called by the producer and the consumer. An Event Format specifies how to we
want to serialize a CloudEvent as a sequence of bytes. Stand-alone event
formats, such as the JSON format, specify serialization independent of any
protocol or storage medium. The producer encodes the event, while the consumer
decodes the event.

#### Protocol Binding

A protocol binding describes how events are sent and received over a given
protocol.

Protocol bindings MAY choose to use an Event Format to map an event directly to
the transport envelope body, or MAY provide additional formatting and structure
to the envelope. For example, a wrapper around a structured-mode message might
be used, or several messages could be batched together into a transport envelope
body.

### Goals

* Cloud Events aims to simplify event declaration and delivery across services,
  platforms and systems.
* Cloud Events aims to create interoperability and portability between different
  systems and services in event driven systems.

### Non-goals

* Cloud Events does not aim to change the implementation details of underlying
  communication protocols.
* Cloud Events does not want to define the processing logic for events within
  different application and systems.

## Self-assessment use

This self-assessment is created by the CloudEvents team to perform an internal
analysis of the project's security. It is not intended to provide a security
audit of CloudEvents, or function as an independent assessment or attestation of
CloudEvents's security health.

This document serves to provide CloudEvents users with an initial understanding
of CloudEvents's security, where to find existing security documentation,
CloudEvents plans for security, and general overview of CloudEvents security
practices, both for development of CloudEvents as well as security of
CloudEvents.

This document provides the CNCF TAG-Security with an initial understanding of
CloudEvents to assist in a joint-assessment, necessary for projects under
incubation.  Taken together, this document and the joint-assessment serve as a
cornerstone for if and when CloudEvents seeks graduation and is preparing for a
security audit.

## Security functions and features

### Critical Security Components

#### Event Identification

Every event within CloudEvents is uniquely identified by a specific combination
of `source` and `id`. Producers must guarantee that each unique event's
concatenation of `source` and id` remains distinctive. This practice aids in
distinguishing events and preventing the processing of duplicate events.

#### Event Type

The `type` attribute holds a value that characterizes the nature of the event
associated with the initial incident. This attribute is frequently utilized for
routing, observability, policy enforcement, and similar purposes. The producer
determines the format, which may contain details such as the version of the
`type`.

#### Event Subject

The `subject` attribute explains the event's subject within the context of the
event producer. Clarifying the subject in contextual metadata proves
particularly beneficial in scenarios involving generic subscription filtering,
where middleware may lack the ability to interpret the content within the `data`
attribute.

#### Event Data Integrity

Encryption should be applied to domain-specific event data to limit visibility
to trusted entities. The specific encryption mechanism used is a mutual
agreement between producers and consumers.

#### Privacy and Sensitive Information Handling

Context attributes should not carry or represent sensitive information.
CloudEvent producers, consumers, and intermediaries can inspect and log context
attributes.
  
### Security Relevant Components

#### Transport Security

Although CloudEvents does not prescribe specific transport security mechanisms,
it is typically conveyed over secure protocols such as HTTPS, ensuring integrity
and confidentiality.

#### Event Source Authentication

The `source` attribute within a CloudEvent provides context for the event
occurrence, establishing reliable and secure source identification.
  
#### Data Schema Verification

The `data` attribute in a CloudEvent contains the actual event data, and its
schema can be defined and validated for consistency and accuracy. This
verification process helps to prevent issues arising from malformed or
unexpected data.

## Project compliance

As of the latest security assessment, CloudEvents does not explicitly document compliance with specific security standards such as PCI-DSS, COBIT, ISO, GDPR, etc. Current efforts are focused on evaluating compliance with these standards and ensuring that CloudEvents adheres to industry best practices in security and privacy.

## Secure development practices

### Development Pipeline

#### CII Best Practices

CloudEvents aims to align with the [Core Infrastructure Initiative (CII) Best Practices](https://www.coreinfrastructure.org/programs/best-practices-program/), focusing on:

1. **Security Response Process**: Establishing a comprehensive process for reporting and addressing security vulnerabilities.
2. **Automated Testing**: Implementing automated testing in the development pipeline for consistent security and vulnerability checks.
3. **Dependency Management**: Regular auditing and updating of third-party dependencies to mitigate security risks.
4. **Documentation**: Enhancing documentation to provide clear guidance on security considerations for developers.

These efforts are part of CloudEvents' commitment to maintaining high standards in open-source software development.


#### CloudEvents Membership

There are three project membership categories, which make it harder for a single
individual to make bad changes to the repository.

* **Member**: Anyone participating in group activities across communication
  channels. No formal registration is required.
* **Voting Member**: Criteria for Voting Members are outlined in the [Voting
  section of the governance
  page](https://github.com/cloudevents/spec/blob/main/docs/GOVERNANCE.md#voting).
  They have equal influence as Members, with specific voting rights during
  formal processes.
* **Admin**: Members with extra privileges for administrative tasks like
  managing the website and GitHub repos. Admin actions require group knowledge
  and consent, including the ability to merge/close PRs, subject to group
  approval. Since the role of an 'Admin' is mainly administrative, the list of
  Members within this group should not need to change regularly, but can be done
  with votes.

#### CloudEvents SDK Community

The CloudEvents SDK community is organized as follows:

* Every SDK has its own [Github Team](https://github.com/cloudevents).
* The union of all the SDK maintainers assembles the sdk maintainers group.
* To propose a new SDK for the community, a PR should be opened in the spec
  repository with the documentation changes necessary to point to the new
  repository.

CloudEvents define an SDK project as healthy if it meets the criteria below.

* It works with the latest version of the programming language;
* It supports the latest versions of the integrated libraries/frameworks;
* It receives security patches regularly;
* It supports the last N-1 major versions of CloudEvents spec, as defined in;
  Contribution Acceptance;
* Issues and PRs are triaged (labeled, commented, reviewed, etc) regularly.

Moreover, CloudEvents define an SDK as `not actively maintained` if:

* Issues and/or PRs are not being triaged from the SDK maintainers for 2 months
* Security patches are not being released from the SDK maintainers for 1 months
  from CVE disclosures

If a project is not meeting one of the criteria above, the community can decide
to hand over the project to a new group of maintainers by a voting process.

#### Contributing to CloudEvents

##### General Instructions

* Developers can either report a change or create a Github Issue, checking for
  existing issues first.
* All Proposed changes will be done through Github Pull Requests (PRs).
* All patches must be signed by the commiter, with the sign-off being a simple
  line at the end of the explanation for the patch.
* All commits should use the [Conventional Commits
  Specification](https://www.conventionalcommits.org/en/v1.0.0/).
* Pull Requests will be reviewed during official meetings.
  * Off-line reviews are recommended before meetings.
  * Meetings happen every Thursday at 9AM PT.
* Pull Requests will be resolved and merged during official meetings as a result
  of a motion.
  * Pull Requests should not be merged if substantial changes have been made in
    the past 2 days.

##### Pull Request process

Usually, CloudEvents Pull Requests are expected to meet the following criteria
prior to being merged:

* The author of the PR indicates asks for it to be discussed and reviewed in an
  upcoming meeting.
* All comments have been addressed.
* PRs that have objections/concerns will be discussed off-line by interested
  parties. A resolution, updated PR, will be expected from those talks.

#### Versioning

The release process follows [Semantic Versioning (semver)](https://semver.org/),
grouping specifications for simultaneous release. Non-breaking changes use
"patch" updates, while breaking changes follow semver. Tags are applied to the
main branch, and additional branches, like core-v2.0, may be created, then
deleted post-merger. Creating a release involves updating versions via Pull
requests, merging, and announcing changes.

### Communications Channels

CloudEvents use different types of communication channels for different
purposes.

* Internal communications channels:
  * Meetings
  * Email
  * Github Issues
* InBound communications channels:
  * [CloudEvents CNCF Email Address](cncf-cloudevents@lists.cncf.io)
  * [CNCF Slack workspace](http://slack.cncf.io/)
  * [CNCF Meeting Calender](https://www.cncf.io/community/calendar/)
* Outgoing communications channels:
  * [CloudEvents CNCF
    Subscription](https://lists.cncf.io/g/cncf-cloudevents-sdk)

### Ecosystem

CloudEvents is integrated with various different cloud-native technologies and
services. It's goal is to create interoperability in event-driven architecture.

CloudEvents has many adopters including but not limited to:

* Adobe I/O Events
* Azure Event Grid
* Google Cloud Eventarc
* VMware Event Broker Appliance

## Security issue resolution

### Responsible Disclosures Process

#### Reporting an Issue

To report an issue, or to a new idea, contributors can open a new  issue on the
GitHub repository. However, they should check if a similar issue already exists.

CloudEvents also provides a dedicated [email
address](cncf-cloudevents-security@lists.cncf.io) for reporting security
concerns related to the specification or the SDKs.

#### Vulnerability Response Process

It is the responsibility of the CloudEvents SDK maintainers to triage issues and
PRs from their respective repositories, as well as frequently release security
patches to issues found. As mentioned in [CloudEvents SDK
Community](#cloudevents-sdk-community), the maintainers cannot abstain from
triaging issues and PRs for more than 2 months, or releasing security patches
for more than 1 month. Otherwise, their project will be marked as `not actively
maintained`, which can lead to them to loose the management of the SDK
repository.

### Incident Response

#### Discussing the Issue

After an issue is reported, the maintainers of the SDK will contact the author
of the issue, talking through it to understand whether it should be resolved,
its priority, how a solution could be implemented, and who will implement it,
which can be done through the GitHub issues page of the SDK, Slack, a meeting or
any other CloudEvents communication channel.

#### Solving the Issue

Once a security patch is written, the contributor should make Pull Request and
mark it as reviewed. The PR will be reviewed, improved, and approved by the
other maintainers of the SDK. With that, a security patch is released by
following the process described in [Contributing to
CloudEvents](#contributing-to-cloudevents).

## Appendix

### Known Issues Over Time

#### Issues found by Trail of Bits

The main security assessment on CloudEvents was a [Security Audit performed by
Trail of
Bits](https://github.com/cloudevents/spec/blob/main/docs/CE-SecurityAudit-2022-10.pdf)
released on October 26, 2022. These were mainly concerning the different
CloudEvents SDK, not the specification. Below are listed the findings by Trail
Of Bits with their descriptions.

##### [Java SDK] Reliance on default encoding

* Severity: Undetermined
* Difficulty: Low
* Type: Undefined Behavior
* Finding ID: TOB-CE-1
* Target: Java SDK

Several instances were found where the getByte() standard Java API is utilized
without specifying encoding, leading the Java SDK to rely on system default
encoding. This can result in varying processing of event data across platforms.
While the specification mandates adherence to appropriate and RFC-compliant
encodings, there is room for improvement in the Java SDK implementation and
documentation to emphasize the significance of consistent encoding among actors.
Although not all instances are problematic, especially when handling binary
data, it is crucial to document and address this behavior in the SDK
implementation, documentation, and provided examples.

##### [Java SDK] Outdated Vulnerable Dependencies

* Severity: Undetermined
* Difficulty: Medium
* Type: Patching
* Finding ID: TOB-CE-2
* Target: Java SDK

The Java SDK contains multiple outdated dependencies with publicly known
vulnerabilities, including high- and medium-risk ones. The snyk tool
automatically audited each module due to time constraints and ease of
remediation. Manual review of exploitability within the SDK's context was not
conducted.

##### [JavaScript SDK] Potential XSS in httpTransport()

* Severity: Undetermined
* Difficulty: Low
* Type: Data Validation
* Finding ID: TOB-CE-3
* Target: sdk-javascript/src/transport/http/index.ts

The JavaScript SDK's httpTransport() method exposes raw error messages from the
endpoint, potentially leading to XSS vulnerabilities if user-controlled data is
reflected without proper sanitization in the rendered web page. While the
specification des not mandate validation or sanitization, the SDK documentation
should emphasize the risk of unsanitized HTTP responses when using this API in
an emitter.

##### [Go SDK] Outdated Vulnerable Dependencies

* Severity: Undetermined
* Difficulty: Low
* Type: Patching
* Finding ID: TOB-CE-4
* Target: Go SDK

The Go SDK has multiple outdated dependencies with known vulnerabilities. The
open-source snyk tool automatically audited each module. Due to time constraints
and ease of remediation, manual review of exploitability within the SDK's
context was skipped.

##### [Go SDK] Downcasting of 64-bit integer

* Severity: Undetermined
* Difficulty: Low
* Type: Undefined Behavior
* Finding ID: TOB-CE-5
* Target: sql/v2/parser/expression_visitor.go, sql/v2/utils/casting.go

The strconv.Atoi function parses a machine-dependent integer (int64 for 64-bit
targets). In some code instances, the result from strconv.Atoi is later
converted to a smaller type (int16 or int32), risking overflow with specific
inputs.

##### [Go SDK] ReadHeaderTimeout not configured

* Severity: Informational
* Difficulty: Low
* Type: Denial of Service
* Finding ID: TOB-CE-6
* Target: Go SDK

The Go http.server API offers four timeouts, including ReadHeaderTimeout.
Failure to set a value for this timeout makes the listener instance susceptible
to Slowloris DoS attacks.

##### [CSharp SDK] Outdated Vulnerable Dependencies

* Severity: Undetermined
* Difficulty: Low
* Type: Patching
* Finding ID: TOB-CE-7
* Target: CSharp SDK

The CSharp SDK has multiple outdated dependencies with known vulnerabilities.
Using the open-source snyk tool, each module was automatically audited. Due to
time constraints and ease of remediation, manual review of exploitability within
the SDK's context was skipped.

### CII Best Practices

**`TO-DO`**

* [CII Best
  Practices](https://www.coreinfrastructure.org/programs/best-practices-program/).
  Best Practices. A brief discussion of where the project is at with respect to
  CII best practices and what it would need to achieve the badge.

### Case Studies

## Case Studies

CloudEvents has the potential to revolutionize event-driven architectures in various sectors. Here are a couple of enhanced case studies demonstrating its applicability:

1. **Healthcare Data Management**: CloudEvents plays a pivotal role in a healthcare system for managing patient data. In this scenario, it is used to track and route events such as patient admissions, lab results, and medication orders. By standardizing event formats, CloudEvents ensures seamless integration between different hospital systems, including Electronic Health Records (EHRs) and Laboratory Information Management Systems (LIMS), enhancing patient care and operational efficiency.

2. **Smart City Infrastructure Monitoring**: In a smart city environment, CloudEvents is employed to aggregate and analyze data from a multitude of sensors and IoT devices across the city. This includes traffic flow sensors, public transport updates, and utility usage meters. By utilizing CloudEvents for real-time data processing and event routing, city administrators can make informed decisions about traffic management, public transport schedules, and resource allocation, leading to improved city services and resident satisfaction.

### Related Projects and Vendors

#### OpenTelemetry

* [OpenTelemetry Website](https://opentelemetry.io/)

OpenTelemetry is a collection of APIs, SDKs, and tools. Use it to instrument,
generate, collect, and export telemetry data (metrics, logs, and traces) to help
you analyze your software’s performance and behavior.

#### AsyncAPI

* [AsyncAPI Website](https://www.asyncapi.com/)

AsyncAPI is an open-source initiative that seeks to improve the current state of
Event-Driven Architectures (EDA). Our long-term goal is to make working with
EDAs as easy as working with REST APIs. That goes from documentation to code
generation, and from discovery to event management.

#### Event-B

* [An Introduction to the Event-B Modeling
Method](https://www.southampton.ac.uk/~tsh2n14/publications/chapters/eventb-dbook13.pdf)

Event-B is a formal method for system-level modeling and analysis. Key features
of Event-B are the use of set theory as a modeling notation, the use of
refinement to represent systems at different abstraction levels and the use of
mathematical proof to verify consistency between refinement levels.

#### Apex Event Specification

* [Apex Event Specification
Guide](https://insights.eventscouncil.org/Portals/0/APEX_Event_Specifications_Guide.pdf)

The APEX Event Specifications Guide (ESG) is a written document that contains
all the details of an event. The ESG is used by event organizers to communicate
information to venues and suppliers. The ESG is a three-part template that
includes: Narrative, Schedule, and Function orders.

This is an older document used across many engineering fields, which is not
restricted to computer science, making it different from the other examples.
However, it is an example of event specification being widely used in industry,
including more physical areas such as mechanical engineering and factories.
