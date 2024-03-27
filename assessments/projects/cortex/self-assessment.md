# Cortex - Self-assessment
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
| Software | https://github.com/cortexproject/cortex |
| Security Provider | No |
| Languages | Go, Makefile, Shell, HTML, Dockerfile, SCSS |
| SBOM | [Cortex SBOM](sbom.json)  |
| | |

### Security links

Provide the list of links to existing security documentation for the project. You may
use the table below as an example:
| Doc | url |
| -- | -- |
| Security file | https://github.com/cortexproject/cortex/blob/master/SECURITY.md |
| Default and optional configs | https://cortexmetrics.io/docs/configuration/configuration-file/ |

## Overview

Cortex is an open source horizontally scalable microservices-based system designed for handling and storing time-series data. It is specifically tailored for Prometheus, a popular monitoring and alerting toolkit in cloud-native environments. Cortex extends Prometheus by providing long-term storage, horizontal scalability, and multi-tenancy support.

### Background

Cortex serves as a remote storage backend for Prometheus instances. It receives time-series data (samples) from Prometheus, stores them in a scalable manner, and facilitates efficient querying of this data. The typical usage involves deploying Cortex alongside Prometheus to enable long-term storage, scalability, and multi-tenancy features. It is commonly used in environments where monitoring and analyzing time-series data at scale are crucial, such as in cloud-native applications.

### Actors

![arch](https://github.com/heydc7/tag-security/assets/39642060/fc1f78b2-d368-4490-9165-362f5f86abba)

- **Prometheus:** This is the primary actor that scrapes samples from various targets and sends them to Cortex using Prometheus' remote write API.

- **Block Storage:** Based on Prometheus TSDB, stores each tenant's time series data into their own TSDB, using on-disk blocks with chunks and block indexes. Handles storage requirements for time-series data in Cortex.

- **Distributor:** Handles incoming samples from Prometheus, validates them, and distributes them to multiple ingesters. Utilizes consistent hashing for distribution.

- **Ingester:** Responsible for writing incoming series to a long-term storage backend, managing the lifecycle of series, and handling replication and write-ahead logs for fault tolerance.

- **Querier:** Handles queries using the PromQL query language, fetching series samples from ingesters and long-term storage, and deduplicating samples as needed.

- **Compactor:** Compacts multiple blocks of a given tenant into a single optimized block, reducing storage costs and increasing query speed.

- **Store Gateway:** Queries series from blocks, keeping an up-to-date view of the storage bucket.

- **Query Frontend:** Provides API endpoints for queries, accelerates the read path, and manages internal queues for query processing.

- **Query Scheduler:** Moves the internal queue from the query frontend into a separate component, enabling independent scaling of query frontends and schedulers.

- **Ruler:** Executes PromQL queries for recording rules and alerts, requiring a database storing the recording rules and alerts for each tenant.

- **Alertmanager:** Accepts alert notifications from the ruler, deduplicates and groups them, and routes them to the correct notification channels. Requires a database storing per-tenant configuration.

- **Configs API:** Manages the configuration of rulers and alert managers, providing APIs to get/set/update configurations and store them in a backend.

### Actions

#### Data Ingestion:
1. Prometheus: Scrapes time-series samples and sends them to Cortex using remote write API.
2. Distributor: Validates and distributes incoming samples to ingesters via consistent hashing.

#### Ingestion and Storage:
1. Ingester: Writes incoming series to long-term storage.
2. Block Storage: Stores time series in tenant-specific TSDB, using on-disk blocks with chunks and block indexes.

#### Query Handling:
1. Querier: Handles PromQL queries, fetching series samples from ingesters and storage.
2. Store Gateway: Queries series from blocks, maintaining an updated view of the storage bucket.

#### Optimization:
1. Compactor: Optimizes storage by compacting multiple blocks for a given tenant, reducing storage costs and enhancing query speed.

#### Optional Components:
1. Query Frontend: Provides API endpoints, accelerates read path, and manages internal queues for query processing.
2. Query Scheduler: Manages the internal queue for queries, enabling independent scaling.
3. Ruler (Optional): Executes PromQL queries for recording rules and alerts, utilizing a database for rule storage.
4. Alertmanager (Optional): Accepts, deduplicates, and routes alert notifications based on configurations.
5. Configs API (Optional): Manages configuration for rulers and alert managers.

#### High Availability and Consistency:
1. Distributor HA Tracker: Deduplicates incoming samples from redundant Prometheus servers, ensuring consistency.
2. Consistent Hashing: Distributors use consistent hashing for series distribution among ingesters.
3. Quorum Consistency: Achieves Dynamo-style quorum consistency on reads and writes for reliability.

#### Scalability:
1. Horizontal Scaling: Cortex components can scale horizontally to handle increasing workloads.
2. Load Balancing: Random load balancing of write requests across distributor instances.

#### Fault Tolerance:
1. Replication and Write-Ahead Log: Mitigates data loss by replicating in-memory series and utilizing write-ahead logs in case of ingester failures.

### Goals
- Cortex aims to run across a cluster of machines, handling metrics from multiple Prometheus servers and supporting globally aggregated queries.
- In a cluster setup, Cortex replicates data between machines to ensure high availability in the face of machine failures.

### Non-goals
- Cortex does not aim to serve as a general-purpose database for various data types, focusing specifically on Prometheus metrics.
- Cortex may not prioritize real-time processing or streaming of data, as its primary function is long-term, durable storage of metric data.

## Self-assessment use

This self-assessment is created by the Cortex team to perform an internal analysis of Cortex's security. It is not intended to provide a security audit of Cortex or function as an independent assessment or attestation of Cortex's security health.

This document serves to provide Cortex users with an initial understanding of Cortex's security, where to find existing security documentation, Cortex plans for security, and a general overview of Cortex security practices, both for the development of Cortex as well as the security of Cortex.

This document provides the CNCF TAG-Security with an initial understanding of Cortex to assist in a joint-assessment, necessary for projects under incubation. Taken together, this document and the joint-assessment serve as a cornerstone for if and when Cortex seeks graduation and is preparing for a security audit.

## Security functions and features

#### Critical Security Components of Cortex
- **Horizontally Scalable Microservices:** Utilizes scalable microservices, like ingesters with consistent hashing, for system scalability and reliability.
- **Tenant ID Authentication:** Requires a tenant ID header in HTTP requests for authentication and authorization, managed by an external proxy.
- **Distributor Service:** Validates incoming data samples for correctness and adherence to tenant limits, ensuring data integrity and policy compliance.
- **High Availability (HA) Tracker:** Deduplicates data from redundant sources in the distributor, crucial for efficiency and integrity in high-availability setups.
- **Consistent Hashing and Quorum Consistency:** Employs consistent hashing and quorum consistency for reliable and consistent data handling across the distributed architecture.
- **Write-Ahead Log (WAL):** The WAL in ingesters aids in recovering in-memory series during failures, enhancing data durability and system resilience.
- **Data De-Amplification and Storage Efficiency:** Performs write de-amplification by batching and compressing data, reducing storage pressure and increasing efficiency.

#### Security Relevant Components of Cortex
- **Deployment Configuration:** Emphasizes "least privilege" in system configuration to mitigate risks from potential code flaws.
- **External Authentication and Authorization Configuration:** Requires external setup for authentication and authorization, typically via a reverse proxy.
- **Disabling Multi-Tenant Functionality:** Offers the option to disable multi-tenancy for environments not requiring it, with considerations for data isolation and access control.
- **Cortex-Tenant Proxy:** An optional proxy for adding tenant IDs to Prometheus requests, useful in trusted environments for distinct metric namespaces.


## Project compliance

Cortex doesn’t document meeting particular compliance standards.

## Secure development practices

#### Development Pipeline

- **Contributor Sign-Off:** Any contributors to the Cortex must sign off their commits with a Developer Certificate of Origin (DCO).
- **Workflow:** Cortex follows a standard GitHub pull request workflow. 
- **Code Reviews and Approval:** Pull requests may be merged after receiving at least two positive votes. If the PR author is a maintainer, this counts as a vote.
- **Automated Testing and CI/CD:** The Cortex project integration tests run in CI for every PR, and can be easily executed locally during development.
- **Container Image Security:** Integration tests run in isolation, and after each test, the Cortex docker image is terminated and deleted.
- **Dependency Management:** Cortex uses Go modules to manage dependencies on external packages and requires a working Go environment with version 1.11 or greater.

#### Communication Channels

- **Internal:** The Cortex team communicates with one another through the Cortex Slack channel and an email list for any questions.
- **Inbound:** Users also likely communicate with the team through mailing lists and the Slack channel, and they can also file an issue via GitHub Issues.
- **Outbound:** Updates and announcements are likely made through the Slack channel or the user mailing list. There are also Cortex community meetings held every two weeks, and meeting notes are posted on their website.

#### Ecosystem

Cortex is a CNCF Incubating project and a highly scalable, long-term storage for Prometheus, an altering toolkit used in cloud-native environments. The Cortex software is an extension to Prometheus and adds long-term storage for cloud-native applications that monitor and analyze time-series data. Cortex is used by companies such as Etsy, AWS, Aspen Mesh, Buoyant, SysEleven, and many more, indicating that it has a strong impact on cloud-native applications.

## STRIDE Threat Model

### 1. Spoofing:

**Threat:** 
- Unauthorized access to Cortex components or data.

**Attack:**
- An attacker gains access to the Cortex system by impersonating a legitimate user or service.

**Components at Risk:**
- Authentication Mechanisms (used by all services)
- External Reverse Proxy (handling authentication and authorization)

**Mitigation:**
- Ensure the robustness of authentication mechanisms.
- Monitor and audit external proxy logs for unauthorized access attempts.

### Tampering:

**Threat:** 
- Unauthorized modification of data or configuration settings.

**Attack:** 
- An attacker modifies data in the storage backend or tampers with configurations to disrupt the system or compromise data integrity.

**Components at Risk:**
- Configuration files (used by various services)
- Write Path (ingesters, distributors)

**Mitigation:**
- Implement integrity checks and digital signatures for configuration files.
- Use encryption to protect data in transit and at rest.

### Repudiation:

**Threat:** 
- Denying the occurrence of certain actions or events within Cortex.

**Attack:** 
- An attacker manipulates or deletes logs to hide their activities, making it difficult to trace unauthorized access or modifications.

**Components at Risk:**
- Logging Mechanism (implemented by all services)
- HA Tracker (in Distributor)

**Mitigation:**
- Implement tamper-evident logs with proper timestamping.
- Regularly review, audit, and protect logs from unauthorized modifications.

### Information Disclosure:

**Threat:** 
- Unauthorized access to sensitive information within Cortex.

**Attack:** 
- An attacker gains access to tenant data, configurations, or other sensitive information stored within the Cortex system.

**Components at Risk:**
- Blocks Storage (TSDB)
- Query Frontend (optional service)

**Mitigation:**
- Apply proper access controls and encryption to protect sensitive information.
- Regularly audit and monitor access to sensitive data.

### Denial of Service (DoS):

**Threat:** 
- Disrupting or degrading the availability of Cortex services.

**Attack:** 
- Overloading the system with a high volume of requests, causing it to become unresponsive or slow.

**Components at Risk:**
- Distributor (handling incoming samples)
- Querier (handling queries)

**Mitigation:**
- Implement rate limiting and load balancing.
- Use DDoS protection mechanisms and regularly test system resilience.

### Elevation of Privilege:

**Threat:** 
- Unauthorized escalation of user privileges within Cortex.

**Attack:**
- An attacker gains higher-level access or control over Cortex components, allowing them to perform actions beyond their authorized scope.

**Components at Risk:**
- Authentication and Authorization Mechanisms
- Ingesters (handling write path)

**Mitigation:**
- Apply the principle of least privilege.
- Regularly review and update access controls.

### Specific to Microservices Architecture:

**Components at Risk:**
- Communication Channels between Microservices
- Dependencies and Libraries (used by various services)

**Mitigation:**
- Ensure secure communication channels and authentication between microservices.
- Regularly update and patch underlying dependencies to mitigate known vulnerabilities.

## Security issue resolution

#### Responsible Disclosures Process:

- **Discovery:** Report externally or internally discovered security issues privately to maintainers and CC cortex-team@googlegroups.com.
- **Reporting Process:** Use maintainers' contact info, CC cortex-team@googlegroups.com, and allow reporters to choose public acknowledgment or remain anonymous.
- **Responsibility for Response:** The Cortex Team and maintainers are responsible for responding to and fixing reported security issues.
- **Communication Methods/Strategies:** Private channels for reporting, coordination, and optional public acknowledgment.
- **Response Process:** Prompt acknowledgment, validation, fix development, coordination with reporter, and public disclosure.

Incident Response:
- **Triage, Confirmation, and Notification:** Assess, confirm, and notify stakeholders of vulnerabilities, with ongoing communication.
- **Patching/Update Availability:** Develop a patch, coordinate disclosure, publicly disclose, and provide clear instructions for patching or updating the application.

## Appendix

- Cortex has achieved an Open Source Security Foundation (OpenSSF) best practices badge at passing level [Link](https://www.bestpractices.dev/en/projects/6681)
- Security Vulerabilities: [Link](https://github.com/cortexproject/cortex/issues?q=label%3Atype%2Fsecurity)
- [Cortex: How to Run a Rock Solid Multi-Tenant Prometheus](https://youtu.be/Pl5hEoRPLJU?si=VgK33c0DxWvF6LOj)
