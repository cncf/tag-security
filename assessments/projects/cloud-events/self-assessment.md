# Self-assessment
The Self-assessment is the initial document for projects to begin thinking about the
security of the project, determining gaps in their security, and preparing any security
documentation for their users. This document is ideal for projects currently in the
CNCF **sandbox** as well as projects that are looking to receive a joint assessment and
currently in CNCF **incubation**.

For a detailed guide with step-by-step discussion and examples, check out the free 
Express Learning course provided by Linux Foundation Training & Certification: 
[Security Assessments for Open Source Projects](https://training.linuxfoundation.org/express-learning/security-self-assessments-for-open-source-projects-lfel1005/).

# Self-assessment outline

## Table of contents

* [Metadata](#metadata)
  * [Security links](#security-links)
* [Overview](#overview)
  * [Actors](#actors)
  * [Actions](#actions)
  * [Background](#background)
  * [Goals](#goals)
  * [Non-goals](#non-goals)
* [Self-assessment use](#self-assessment-use)
* [Security functions and features](#security-functions-and-features)
* [Project compliance](#project-compliance)
* [Secure development practices](#secure-development-practices)
* [Security issue resolution](#security-issue-resolution)
* [Appendix](#appendix)

## Metadata

A table at the top for quick reference information, later used for indexing.

|   |  |
| -- | -- |
| Software | A link to the software’s repository.  |
| Security Provider | Yes or No. Is the primary function of the project to support the security of an integrating system?  |
| Languages | languages the project is written in |
| SBOM | Software bill of materials.  Link to the libraries, packages, versions used by the project, may also include direct dependencies. |
| | |

### Security links

Provide the list of links to existing security documentation for the project. You may
use the table below as an example:
| Doc | url |
| -- | -- |
| Security file | https://my.security.file |
| Default and optional configs | https://example.org/config |

## Overview
CloudEvents is an open-source specification for describing data events. Such events are frequently used across many industry fields, but there are currently no standards on how to write those. Because of that, which is currently very different across different developers. This makes programmers have to develop new event handling logic for each event source and makes it hard for two systems to communicate with each other. CloudEvents seeks to dramatically simplify event declaration and delivery across services, platforms, and beyond.

The project also provides software development kits (SDKs) for Go, JavaScript, Java, C#, Ruby, PHP, PowerShell, Rust, and Python. These can be used to build event routers, tracing systems, and other tools.

### Background

Provide information for reviewers who may not be familiar with your project's
domain or problem area.

### Actors
Event Consumer: The entity/system interested in subscribing to different events. Receiving Events from the producer will trigger further action that is up to the consumer.

Event Producer: The entity/system that is produces the "events". The are responsible for wrapping event data in the CloudEvents specification.


Event Mediator: Depending on the architecture of the system, the event mediator is the entity/system that is responsible for the distribution, processing and routing of events to consumers. The event broker ensures reliable delivery and may enforce security policies. 


#### Occurrence
An "occurrence" is the capture of a statement of fact during the operation of a software system. This might occur because of a signal raised by the system or a signal being observed by the system, because of a state change, because of a timer elapsing, or any other noteworthy activity. For example, a device might go into an alert state because the battery is low, or a virtual machine is about to perform a scheduled reboot.


#### Event
An "event" is a data record expressing an occurrence and its context. Events are routed from an event producer (the source) to interested event consumers. The routing can be performed based on information contained in the event, but an event will not identify a specific routing destination. Events will contain two types of information: the Event Data representing the Occurrence and Context metadata providing contextual information about the Occurrence. A single occurrence MAY result in more than one event.

#### Producer
The "producer" is a specific instance, process or device that creates the data structure describing the CloudEvent.

#### Source
The "source" is the context in which the occurrence happened. In a distributed system it might consist of multiple Producers. If a source is not aware of CloudEvents, an external producer creates the CloudEvent on behalf of the source.

#### Consumer
A "consumer" receives the event and acts upon it. It uses the context and data to execute some logic, which might lead to the occurrence of new events.

#### Intermediary
An "intermediary" receives a message containing an event for the purpose of forwarding it to the next receiver, which might be another intermediary or a Consumer. A typical task for an intermediary is to route the event to receivers based on the information in the Context.

#### Context
Context metadata will be encapsulated in the Context Attributes. Tools and application code can use this information to identify the relationship of Events to aspects of the system or to other Events.

#### Data
Domain-specific information about the occurrence (i.e. the payload). This might include information about the occurrence, details about the data that was changed, or more. See the Event Data section for more information.

#### Event Format
An Event Format specifies how to serialize a CloudEvent as a sequence of bytes. Stand-alone event formats, such as the JSON format, specify serialization independent of any protocol or storage medium. Protocol Bindings MAY define formats that are dependent on the protocol.

#### Message
Events are transported from a source to a destination via messages.

A "structured-mode message" is one where the event is fully encoded using a stand-alone event format and stored in the message body.

A "binary-mode message" is one where the event data is stored in the message body, and event attributes are stored as part of message meta-data.

#### Protocol
Messages can be delivered through various industry standard protocol (e.g. HTTP, AMQP, MQTT, SMTP), open-source protocols (e.g. Kafka, NATS), or platform/vendor specific protocols (AWS Kinesis, Azure Event Grid).

#### Protocol Binding
A protocol binding describes how events are sent and received over a given protocol.

Protocol bindings MAY choose to use an Event Format to map an event directly to the transport envelope body, or MAY provide additional formatting and structure to the envelope. For example, a wrapper around a structured-mode message might be used, or several messages could be batched together into a transport envelope body.

### Actions
These are the steps that a project performs in order to provide some service
or functionality.  These steps are performed by different actors in the system.
Note, that an action need not be overly descriptive at the function call level.  
It is sufficient to focus on the security checks performed, use of sensitive 
data, and interactions between actors to perform an action.  

For example, the access server receives the client request, checks the format, 
validates that the request corresponds to a file the client is authorized to 
access, and then returns a token to the client.  The client then transmits that 
token to the file server, which, after confirming its validity, returns the file.


### Goals
The intended goals of the projects including the security guarantees the project
 is meant to provide (e.g., Flibble only allows parties with an authorization
key to change data it stores).

### Non-goals
Non-goals that a reasonable reader of the project’s literature could believe may
be in scope (e.g., Flibble does not intend to stop a party with a key from storing
an arbitrarily large amount of data, possibly incurring financial cost or overwhelming
 the servers)

## Self-assessment use

This self-assessment is created by the CloudEvents team to perform an internal analysis of the
project's security. It is not intended to provide a security audit of CloudEvents, or
function as an independent assessment or attestation of CloudEvents's security health.

This document serves to provide CloudEvents users with an initial understanding of
CloudEvents's security, where to find existing security documentation, CloudEvents plans for
security, and general overview of CloudEvents security practices, both for development of
CloudEvents as well as security of CloudEvents.

This document provides the CNCF TAG-Security with an initial understanding of CloudEvents
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
CloudEvents seeks graduation and is preparing for a security audit.

## Security functions and features

* Critical.  A listing critical security components of the project with a brief
description of their importance.  It is recommended these be used for threat modeling.
These are considered critical design elements that make the product itself secure and
are not configurable.  Projects are encouraged to track these as primary impact items
for changes to the project.
* Security Relevant.  A listing of security relevant components of the project with
  brief description.  These are considered important to enhance the overall security of
the project, such as deployment configurations, settings, etc.  These should also be
included in threat modeling.

## Project compliance

* Compliance.  List any security standards or sub-sections the project is
  already documented as meeting (PCI-DSS, COBIT, ISO, GDPR, etc.).

## Secure development practices

* Development Pipeline.  A description of the testing and assessment processes that
  the software undergoes as it is developed and built. Be sure to include specific
information such as if contributors are required to sign commits, if any container
images immutable and signed, how many reviewers before merging, any automated checks for
vulnerabilities, etc.
* Communication Channels. Reference where you document how to reach your team or
  describe in corresponding section.
  * Internal. How do team members communicate with each other?
  * Inbound. How do users or prospective users communicate with the team?
  * Outbound. How do you communicate with your users? (e.g. flibble-announce@
    mailing list)
* Ecosystem. How does your software fit into the cloud native ecosystem?  (e.g.
  Flibber is integrated with both Flocker and Noodles which covers
virtualization for 80% of cloud users. So, our small number of "users" actually
represents very wide usage across the ecosystem since every virtual instance uses
Flibber encryption by default.)

## Security issue resolution

* Responsible Disclosures Process. A outline of the project's responsible
  disclosures process should suspected security issues, incidents, or
vulnerabilities be discovered both external and internal to the project. The
outline should discuss communication methods/strategies.
  * Vulnerability Response Process. Who is responsible for responding to a
    report. What is the reporting process? How would you respond?
* Incident Response. A description of the defined procedures for triage,
  confirmation, notification of vulnerability or security incident, and
patching/update availability.

## Appendix

* Known Issues Over Time. List or summarize statistics of past vulnerabilities
  with links. If none have been reported, provide data, if any, about your track
record in catching issues in code review or automated testing.
* [CII Best Practices](https://www.coreinfrastructure.org/programs/best-practices-program/).
  Best Practices. A brief discussion of where the project is at
  with respect to CII best practices and what it would need to
  achieve the badge.
* Case Studies. Provide context for reviewers by detailing 2-3 scenarios of
  real-world use cases.
* Related Projects / Vendors. Reflect on times prospective users have asked
  about the differences between your project and projectX. Reviewers will have
the same question.