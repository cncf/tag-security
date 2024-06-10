# Jaeger Self-assessment

This assessment was created by community members as part of the [Security Pals](https://github.com/cncf/tag-security/issues/1102) process. The Jaeger team thanks them for the contribution!

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

|   |  |
| -- | -- |
| Assessment Stage | Complete |
| **Software** | [A link to Jaeger’s repository.](https://github.com/jaegertracing/jaeger)  |
| **Security Provider** | No, the main function of this project is to enable distributed tracing in an organization’s tech infrastructure. Security is not the primary objective.  |
| **Languages** | <ul><li>Go</li><li>Shell</li><li>Makefile</li><li>Python</li><li>Dockerfile</li></ul> |
| **SBOM** | Jaeger has a workflow script that produces an SBOM upon release to comply with CLOMonitor requirements  [here](https://github.com/jaegertracing/jaeger/pull/3987) |
| | |

### Security links

| Doc | url |
| -- | -- |
| Security file | [SECURITY.md](https://github.com/jaegertracing/jaeger/blob/main/SECURITY.md) |
| Reporting Security Issues | [Jaeger website – Reporting Security Issues](https://www.jaegertracing.io/report-security-issue/) |
| Default and optional configs | [Securing Jaeger installation](https://www.jaegertracing.io/docs/1.51/security/) |

## Overview

Jaeger is a cloud native, infinitely scalable, distributed data traversal performance tracker. Jaeger collector paired with a tracing SDK like OpenTelemetry’s SDK is used to monitor microservice interactions through traces and “spans” on distributed systems to identify bottlenecks, timeouts and other performance issues.

### Background

Jaeger provides real time monitoring and analytics of complex ecosystems, which is especially crucial in microservice architectures. Importantly, Jaeger can be used to identify potential communication bottlenecks in these systems. When requests are made to microservices, the Jaeger client creates a “span” which is a logical unit of work and provides information like start time, end time, and other operation metadata. These span components are then used to construct traces which are stored and can be visualized via the centralized dashboard provided by Jaeger. These comprehensive traces provide end-to-end tracing which are helpful in identifying issues and getting a full view of the system, as opposed to traditional tracing which isolate individual components.

Jaeger is cross-platform compatible and provides client libraries for a variety of languages and frameworks including Java, Go, Python, and Node.js. These client libraries can be integrated with existing services to capture tracing data and send this to Jaeger agents and collectors which can be reported back to the system.

With its dashboard UI, users are able to make complex queries and gather insight from collected data. They can gather information on both a more granular or broad scale – on specific traces (by trace ID), by operation (HTTP POST requests), error flags, or by time period. 


### Actors

The following are the different actors found in the Jaeger project:

 I. OpenTelemetry SDK
 
 II. The Jaeger Collector
 
 III. Jaeger Query
 
 IV. Jaeger Ingester


[Architecture as displayed on the Jaeger website](https://www.jaegertracing.io/docs/1.51/architecture/)


#### Tracing/ OpenTelemetry SDK

A Tracing or OpenTelemetry’s SDK downloaded on the client or host is used to generate tracing data. An “instrumented application” (ex. OpenTelemetry API) creates spans when receiving a request and attaches context info (trace id, span id, and baggage). Only Ids and baggage are propagated. Other info sent to Jaeger backend asynchronously (Jaeger SDK)

#### Jaeger Collector

The Jaeger Collector receives processes, validates, cleans up/ enriches and stores traces in some backend data storage [(see supported)](https://www.jaegertracing.io/docs/latest/deployment.

#### Jaeger Query

Jaeger Query exposes [APIs](https://www.jaegertracing.io/docs/1.50/apis) for receiving traces from a database and hosts a web interface for searching and analyzing traces.

#### Jaeger Ingester

Reads traces from Kafka and writes to a database. (stripped down version of jaeger collector supporting Kafka).


### Actions

Sampling is necessary to reduce the number of traces stored in the backend. For larger applications this is especially important given the millions (or billions) of requests being made. It reduces overhead.

#### Remote Sampling Mode
Remote sampling centralizes all sampling configurations of Jaeger collectors. It's a feature that lets you adjust how quickly traces get simplified. Jaeger can employ remote sampling to determine the server-side sample method in place of sampling every trace on the client side. 

#### Adaptive Sampling Mode
The Jaeger Collector analyzes the incoming spans received from services with a tracing client like the OpenTelemetry SDK to automatically adjust the sampling rate. Incoming spans and samples are sent to some storage backend configured to the larger system.

#### Direct to Storage
Jaeger can be used to collect traces and store them directly.

Actors
* Tracing SDK -  installed on hosts/ containers used to generate tracing data
* Jaeger Collector - collects tracing data from the Tracing SDK either adaptively or remotely sampling
* Backend Storage - where trace data is written
* Jaeger Query - APIs for receiving UI used to analyze and view tracing data
* Jaeger UI - The part of Jaeger Query that displays tracing data to the user

Workflow
1. Tracing SDK generates tracing data and pushes it to the Jaeger Collector
2. Jaeger Collector collects context info about traces from the Tracing SDK
3. Jaeger Collector writes data directly to storage
4. Jaeger Query receives data from storage and displays it on Jaeger UI
5. User views Jaeger UI on a browser to view tracing data 


#### Jaeger with Kafka
The Jaeger Ingester is a stripped down version of the Jaeger collector made to accept data from Kafka. Kafka can be used with Jaeger software as an intermediary queue. Jaeger guarantees excellent availability and reliability for trace data, particularly in dispersed and high-throughput settings, by using Kafka as the transport for trace data. The tracing data in Jaeger with Kafka is sent to Kafka instead of the Jaeger collector. After that, the Jaeger Ingester reads and interprets the tracing data from Kafka to send to backend data storage. 

#### Software Release: 
Jaeger is released under the Apache License 2.0, which allows it to be freely used, modified, and distributed.


### Goals

##### General Goals: 

* Distributed tracing: Jaeger allows tracing the flow of requests and understanding how they propagate through various services in a microservice architecture.
* Monitoring: Jaeger aids in monitoring performance of individual services and the overall system by providing insights into the response times, latency and dependencies between services. Jaeger simplifies the process of debugging and optimizing performance.
Root cause analysis: Jaeger assists in identifying the performance bottlenecks in distributed systems. 
* Scalability: Jaeger has high scalability to handle tracing in large and complex microservices. 
Compatibility: Jaeger is designed to support openTracing, open Telemetry, and multiple storage backends including two NoSQL databases, Cassandra and Elasticsearch.
* Web UI: Implemented in Javascript to handle large volumes of data and display traces with thousands of spans.
Sampling Strategies: To control the amount of trace data that is gathered and kept, offer customizable sampling techniques.

##### Security Goals: 

* Maintain Security: Jaeger includes security features like data encryption in transit and at rest to protect trace data.
* Integration: Ensure user-friendliness and acceptance by integrating seamlessly with operational workflows and development tools.


### Non-goals

##### General Non-Goals:
* Jaeger does not provide real-time alerts and lacks automated notification capabilities for system downtime.
* Detailed system metrics, such as CPU usage, memory usage, and disk input/output, are not collected; reserved for system monitoring tools.
* Lacks automatic anomaly detection (no ML capabilities), requiring users to visually identify anomalies.
* Not intended for business analytics, including user behavior and conversion rates.
* Jaeger complements, rather than replaces, existing monitoring systems.

##### Security Non-Goals:
* Not designed for security monitoring or security compliance monitoring purposes.
* While including security features, Jaeger does not focus on comprehensive security measures.
* Jaeger does not specifically focus on preventing insider data leaks.


## Self-assessment use

Contributing Authors: Cristian Panaro, Jia Lin Weng, Sameer Gori, Sarah Moughal

Contributing Project Maintainers: Yuri Shkuro, Jonah Kowall

Contributing Reviewers: Ragashree Shekar, Eddie Knight

This self-assessment is not intended to provide a security audit of Jaeger, or
function as an independent assessment or attestation of Jaeger's security health.

This document serves to provide Jaeger users with an initial understanding of
Jaeger's security, where to find existing security documentation, Jaeger plans for
security, and general overview of Jaeger security practices, both for development of
Jaeger as well as security of Jaeger.

This document provides the CNCF TAG-Security with an initial understanding of Jaeger
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
Jaeger seeks graduation and is preparing for a security audit.

## Security functions and features

### Critical.  

#### Encryption: 

* Jaeger is capable of encrypting data using Transport Layer Security (TLS) in conjunction with mutual TLS (mTLS). Using mTLS offers a better level of security because it necessitates the validity of certificates on both the client and the server (and thus mitigates man-in-the middle attacks). 
* The OpenTelemetry SDK can communicate to the jaeger collector by gRPC or HTTP with the option to enable TLS with mTLS.
* The Jaeger Collector, Ingester and Query can communicate to storage via third-party software like Cassandra, ElasticSearch and Kafka all with TLS with mTLS support. 
* Elasticsearch supports bearer token propagation and Kafka also supports Kerberos and plaintext authentication.


### Security Relevant.  

#### Authentication and Authorization
* Bearer tokens are an option offered by Jaeger for these purposes.
* Users and apps are granted restricted access to Jaeger's capabilities through the use of OAuth2 tokens. Jaeger also supports plaintext and Kerberos authentication.

#### Access Control: 
* Role-based access control (RBAC) is a feature that Jaeger provides for both users and applications. 
* This enables system administrators to specify the roles and permissions of various users. This guarantees that sensitive information and functions can only be accessed by authorized users.

#### Security Auditing:
* Jaeger provides tools for monitoring and auditing. It has the ability to monitor user actions such logins, searches, and sensitive data access. Administrators can utilize this data to quickly identify and fix possible security issues.

## Project compliance

Jaeger does not currently document meeting particular compliance standards.

## Secure development practices

### Development Pipeline.  

Jaeger maintains their code on a public repository. Contributors are asked to follow the [CONTRIBUTING_GUIDELINES.md](https://github.com/jaegertracing/jaeger/blob/main/CONTRIBUTING_GUIDELINES.md). 
* All commits are required to be signed by contributors. 
* If a pull request has no activity in 60 days then it will be marked as stale and will be closed in 14 days if nothing is done. 
* One approving reviewer is required to merge a PR.

Jaeger has certain automated [‘workflows’](https://github.com/jaegertracing/jaeger/tree/main/.github/workflows) set up and managed by [GitHub Actions](https://github.com/jaegertracing/jaeger/actions).

These ‘workflows’ incorporate the following elements to maintain project security:
* Harden-Runner to provide runtime security
* Dependabot checks and updates dependencies
* FOSSA -SCA tool checks for software license violations in dependencies
* OpenSSF scorecard, CodeQl, and OpenSearch to perform various automated security checks


### Communication Channels. 

#### Internal
* Jaeger maintainers and contributors have a monthly [zoom meeting](https://calendar.google.com/calendar/u/0/embed?src=77a1bva4sn9cm822r8oa03l2j0@group.calendar.google.com) every 3rd thursday at 11am EST. The #jaeger-maintainers channel on the CNCF Slack is for maintainers.

#### Inbound
* Inbound Users can contact the Jaeger team via email at jaeger-tracing@googlegroups.com, open an issue on GitHub or send a message to the [#jaeger channel on the CNCF Slack](https://cloud-native.slack.com/archives/CGG7NFUJ3). Topics/questions can also be discused on the project's [GitHub Discussions](https://github.com/orgs/jaegertracing/discussions) page or [Stack Overflow](https://stackoverflow.com/questions/tagged/jaeger).

#### Outbound
* Outbound the Jaeger team communicates with their users on their [website](https://www.jaegertracing.io/) and the [#jaeger channel on the CNCF Slack](https://cloud-native.slack.com/archives/CGG7NFUJ3). 

### Ecosystem. 

#### OpenTelemetry Integration: 
OpenTelemetry can be used in place of the deprecated Jaeger Agent.
* The OpenTelemetry SDK can be used to create trace data for Jaeger’s collector to collect and then store in a backend database.


#### Cloud Native storage option: 
Jaeger is compatible with a number of storage backends that can be used to store and analyze traces in a cloud-native environment, including Cassandra, Elasticsearch, and Kafka.
* Features and benefits that are specific to each storage backend include cost-effectiveness, scalability, and high availability.
* Trace volume, retention needs, and infrastructure already in place are a few of the factors that must be taken into consideration while selecting a storage backend.

#### Kubernetes Integration: 
Jaeger's Helm chart and jaeger-operator allows it to be deployed in Kubernetes.
* The Helm chart offers flexibility in setting up different Kubernetes resources, including services, deployments, and configmaps, as well as in configuring Jaeger's components, including the choice of storage backend.
* Jaeger can now be easily deployed and managed in a cloud-native environment, and Kubernetes' sophisticated features, such as self-healing and rolling upgrades, may be utilized.

#### Prometheus Integration: 
Prometheus is a well-liked open-source monitoring and alerting toolkit that can be combined with Jaeger.
* Metrics data and traces can be correlated by merging Jaeger and Prometheus. For instance, you can investigate the related traces in Jaeger to find the source of a latency spike that you see in Prometheus.
* Additionally, you may make custom dashboards to keep an eye on your microservices in a cloud-native environment by utilizing Jaeger's interface with Grafana, a potent data visualization and monitoring tool.
* Jaeger excels in distributed trace capture, while Prometheus focuses on time-series metrics for system monitoring. Together, they provide a comprehensive view of distributed system behavior and performance.


## Security issue resolution

#### Responsible Disclosures Process. 
    
Refer to the [Security docs](https://www.jaegertracing.io/report-security-issue/). 

#### Incident Response. 

Security Advisories are listed and responded to on the [security tab of the Jaeger GitHub](https://github.com/jaegertracing/jaeger/security/advisories).



## Appendix

### Known Issues Over Time. 

#### Miscellaneous Issues 
* The Jaeger architecture relies on a central collector to receive and store trace reports from agents and microservices. The collector exposes HTTP endpoints like /api/traces for trace data submission, lacking authentication. This vulnerability opens the possibility of a Server-Side Request Forgery (SSRF) attack, enabling a compromised microservice to submit malicious trace data to the collector. Implementing token-based access enhances collector security by restricting entry to authenticated agents.

### [CII Best Practices](https://www.coreinfrastructure.org/programs/best-practices-program/).

* The Jaeger project has achieved passing level criteria under Open Source Security Foundation Best Practices and is in the process of obtaining the silver badge.
https://www.bestpractices.dev/en/projects/1273 

### Case Studies. 

#### Ticketmaster: 
* Consisting of over 300 microservices, the company benefits from the Jaeger project, utilizing the system to track over 100 million transactions a day. 
* As the company scaled, they quickly learned that logging was insufficient and bulky. It helped uncomplicate the log aggregation process which generated terabytes of data daily. Jaeger simplified the debugging process by providing visibility into critical areas. – where developers could find root causes of issues and save time doing so.
* Ticketmaster uses the Directed Acyclic Graph (DAG) view to see request flow. 
* They also take advantage of Jaeger’s powerful adaptive sampling feature which reduces overhead without reducing visibility into systems.
#### Grafana Labs: 
* They needed a solution to trace request issues end-to-end. Grafana sometimes dealt with high request latency and opaque request paths. 
* Jaeger allowed engineers to sort requests by duration with the Jaeger UI, which identified slow problematic requests and allowed for more granular troubleshooting. 
* One feature they particularly like is the contextual logging capability. 


### Related Projects / Vendors. 

**ZipKin** was an earlier open source distributed tracing system which is used to help users monitor and troubleshoot microservice-based architectures. Both Zipkin and Jaeger aim to provide visibility into the flow of requests and responses across various services in a distributed system. While Zipkin has been around longer, Jaeger is known for its scalability to handle tracing in large and complex microservices and displaying those traces on the Web UI. Jaeger also has backward compatibility with Zipkin to help users transition from Zipkin to Jaeger. While Zipkin has been around longer than Jaeger, Jaeger has the benefit of being a part of Cloud Native Computing Foundation(CNCF), supporting containers, kubernetes and OpenTracing. To conclude, the decision between the two comes down to preference, supported languages and whatever is compatible with your existing tech stack.

### Actions

Refer to the 'Actions' document: [actions.md](actions.md)


