# Cortex - Self-assessment

The Self-assessment is the initial document for Cortex to begin thinking about the security of the project, determining gaps in its security, and preparing any security documentation for their users.

**Authors:** Dhanraj Chavan @heydc7 Raiya Haque @raiyahaque Abdul Alhazmi @Abkzmii Sushanth Rabipalli sushanth3120

**Contributors/Reviewers:** Pranava Kumar Vemula (@Rana-KV)

## Self-assessment outline

### Table of contents

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
* [Action Items](#action-items)

## Metadata

| -- | -- |
| Software | https://github.com/cortexproject/cortex |
| Security Provider | No |
| Languages | Go |
| SBOM | `Not Applicable` |

### Security links

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
- **Prior to the completion of any work:**
   1. Work should be organized into one or more commits, each with a commit message describing all the changes made
   2. Each commit should build towards the whole - don’t leave in back-tracks and mistakes that you later corrected.
   3. Have unit and/or integration tests for functionality or to catch the bug being fixed
   4. Include a CHANGELOG message if you would like Cortex users to see the work you did
- **Code Reviews and Approval:** Pull requests may be merged after receiving at least two positive votes. If the PR author is a maintainer, this counts as a vote.
- **Automated Testing and CI/CD:** The Cortex project integration tests run in CI for every PR, and can be easily executed locally during development.
- **Container Image Security:** Integration tests run in isolation, and after each test, the Cortex docker image is terminated and deleted.
- **Dependency Management:** Cortex uses Go modules to manage dependencies on external packages and requires a working Go environment with version 1.11 or greater.

#### Communication Channels

- **Internal:** The Cortex team communicates with one another through the [Cortex Slack channel](https://app.slack.com/client/T08PSQ7BQ/CCYDASBLP/) and an [email](mailto:cortex-users@lists.cncf.io) for any questions.
- **Inbound:** Users also likely communicate with the team through mailing lists and the [Cortex Slack channel](https://app.slack.com/client/T08PSQ7BQ/CCYDASBLP/), and they can also file an issue via [GitHub Issues](https://github.com/cortexproject/cortex/issues/new).
- **Outbound:** Updates and announcements are likely made through the [Cortex Slack channel](https://app.slack.com/client/T08PSQ7BQ/CCYDASBLP/) or the [user mailing list](cortex-users@lists.cncf.io). There are also Cortex community meetings held every two weeks, and meeting notes are posted on their website.

#### Ecosystem

Cortex is a CNCF Incubating project and a highly scalable, long-term storage for Prometheus, an altering toolkit used in cloud-native environments. The Cortex software is an extension to Prometheus and adds long-term storage for cloud-native applications that monitor and analyze time-series data. Cortex is used by companies such as Etsy, AWS, Aspen Mesh, Buoyant, SysEleven, and many more, indicating that it has a strong impact on cloud-native applications.

## STRIDE Threat Model

### 1. Spoofing:

- **Threat:** Unauthorized access to Cortex components or data.
- **Application to Cortex:** Previously considered out of scope. Kubernetes network policies can restrict component access.
- **Mitigation:** Implementation and fine-tuning of Kubernetes network policies to ensure restricted access.

### Tampering:
- **Threat:** Unauthorized modification of data or configuration settings.
- **Application to Cortex:** Not applicable as Kubernetes containers can’t change their configuration files.
- **Mitigation:** Rely on the inherent security features of Kubernetes to prevent tampering.

### Repudiation:
- **Threat:** Denying the occurrence of certain actions or events within Cortex.
- **Application to Cortex:** Considered out of scope. Secure log gathering and preservation methods are available in Kubernetes.
- **Mitigation:** Utilize Kubernetes logging mechanisms to ensure traceability and log integrity.

### Information Disclosure:
- **Threat:** Unauthorized access to sensitive information within Cortex.
- **Application to Cortex:** Not a concern due to network policies in Kubernetes that prevent unauthorized access.
- **Mitigation:** Proper configuration of Kubernetes network policies to protect sensitive data.

### Denial of Service (DoS):
- **Threat:** Disrupting or degrading the availability of Cortex services.
- **Application to Cortex:** A well-configured Cortex system is resilient to DoS attacks.
- **Mitigation:** Implement rate limiting and series per tenant limits to prevent DoS attacks.

### Elevation of Privilege:
- **Threat:** Unauthorized escalation of user privileges within Cortex.
- **Application to Cortex:** Not applicable in Cortex as there is no concept of a superuser or admin user.
- **Mitigation:** Ensure adherence to Kubernetes access controls.

### Additional Considerations:
- **Alertmanager Security:** Address security threats around Alertmanager, which have already been mitigated. Focus on ensuring these mitigations remain effective.

## Security issue resolution

Cortex team manages their vulnerability disclosure program: https://github.com/cortexproject/cortex/blob/master/SECURITY.md

#### Responsible Disclosures Process:

- **Discovery:** Report externally or internally discovered security issues privately to maintainers and CC cortex-team@googlegroups.com.
- **Reporting Process:** Use maintainers' contact info, CC cortex-team@googlegroups.com, and allow reporters to choose public acknowledgment or remain anonymous.
- **Responsibility for Response:** The Cortex Team and maintainers are responsible for responding to and fixing reported security issues.
- **Communication Methods/Strategies:** Private channels for reporting, coordination, and optional public acknowledgment.
- **Response Process:** Prompt acknowledgment, validation, fix development, coordination with reporter, and public disclosure.

#### Incident Response:
- **Triage, Confirmation, and Notification:** Assess, confirm, and notify stakeholders of vulnerabilities, with ongoing communication.
- **Patching/Update Availability:** Develop a patch, coordinate disclosure, publicly disclose, and provide clear instructions for patching or updating the application.

#### Private Vendors List
Cortex has a list of vendors who provide Cortex to their users. This list is not intended for individuals to find out about security issues. For more info: [Link](https://github.com/cortexproject/cortex/blob/master/SECURITY.md#private-vendors-list)

## Appendix

### Known Issues Over Time
- **CVE-2023-29405 to CVE-2023-29403:** Found in version v1.15.3, these vulnerabilities in the Go binary were fixed in Go version 1.20.5.
- **CVE-2023-2975:** Affects v1.15.3 with implications for libssl3 and libcrypto3.
- **CVE-2022-4304:** In v1.14.1, this timing-based side-channel vulnerability in OpenSSL was addressed in OpenSSL 1.1.1t-r0.
- **CVE-2023-0215:** Also in v1.14.1, this vulnerability related to OpenSSL's ASN.1 data processing was fixed in OpenSSL 1.1.1t-r0.

### CII Best Practices
- Cortex has achieved an Open Source Security Foundation (OpenSSF) best practices badge at passing level: https://www.bestpractices.dev/en/projects/6681
- Cortex has achieved A+ quality as an open-source Go project: https://goreportcard.com/report/github.com/cortexproject/cortex

### Case Studies
Detailed case studies or specific real-world use cases for Cortex were not found. However, Cortex is designed for large-scale cloud-native environments, suggesting its use in extensive monitoring and analysis of time-series data, showcasing its scalability, long-term storage, and multi-tenancy capabilities.

### Related Projects / Vendors
Comparing Cortex with similar projects like Thanos reveals key differences:
- **Thanos:** A CNCF Incubating project known for its highly available Prometheus setup with long-term storage capabilities.
- **Cortex:** Distinguished by its horizontally scalable architecture, high availability, multi-tenant support, and focus on long-term storage for Prometheus

## Action Items
- Engaged in collaborative self-assessment discussions with Project Maintainers on [Slack](https://cloud-native.slack.com/archives/C0682GTKK4K/p1701568106182349) and [GitHub Issue](https://github.com/cortexproject/cortex/issues/5692) to align goals and address feedback 
- Implemented SBOM generation using cyclonedx-gomod, providing a detailed inventory of Go module dependencies.
- Conducted a comprehensive update of the project's threat model with respect to Cortex Maintainer's Response.
- Revised and expanded the project documentation's appendix section, incorporating additional materials to enhance overall understanding and documentation.
- Ensured that all relevant links associated with the development pipeline and communication channels are up-to-date.

