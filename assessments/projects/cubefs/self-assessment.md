# CubeFS Self-assessment
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

|   |  |
| -- | -- |
| Software | https://github.com/cubefs/cubefs  |
| Website | https://cubefs.io/ |
| Security Provider | No  |
| Languages | Golang |
| SBOM | https://github.com/cubefs/cubefs/blob/master/docs/source/deploy/k8s.md |
| | |

### Security links

| Doc | url |
| -- | -- |
| Security File | https://github.com/cubefs/cubefs/blob/master/SECURITY.md |
| Default & Optional Configs | https://github.com/cubefs/cubefs/blob/master/docs/source/maintenance/configs/config.md |
| Current Issues & Future Work | https://github.com/cubefs/cubefs/blob/master/docs/source/design/authnode.md |
| Release & Contact | https://github.com/cubefs/cubefs/tree/master/security | 

## Overview

CubeFS is a next-generation cloud-native storage product that is currently an incubating open-source project hosted by the Cloud Native Computing Foundation (CNCF).

### Background

CubeFS is an open-source cloud storage solution that is compatible with various data access protocols such as S3, POSIX, and HDFS, and supports two storage engines - multiple replicas and erasure coding. It provides users with multiple features such as multi-tenancy, multi-AZ deployment, and cross-region replication. It is widely used in scenarios such as big data, AI, container platforms, databases, middleware storage and computing separation, data sharing and data protection.

In June 2019, JD.com donated (then known as) ChubaoFS to the CNCF, and in December 2019, ChubaoFS was sandboxed. Later, in August 2020, OPPO joined the project as a promoter and contributor. By March 2022, the project name was changed from ChubaoFS to CubeFS to ease pronunciation in English. Finally, in July 2022 CubeFS entered the incubation stage.

### Actors
CubeFS consists of a metadata subsystem, a data subsystem, a resource management node (Master), and an object gateway (Object Subsystem), which can access stored data through the POSIX/HDFS/S3 interface.

![cfs-arch-ec 2b2b3b63](https://github.com/avinashnarasimhan18/tag-security/assets/144389734/e14a6396-16fa-4f33-8fd3-727385868b2e)

CubeFS Actors:

* **Resource Management Node (Master)** - Composed of multiple Master nodes, it is responsible for asynchronously processing different types of tasks, such as managing data shards and metadata shards (including creation, deletion, updating, and consistency checks), checking the health status of data or metadata nodes, and maintaining volume information. There can be multiple Master nodes, and the consistency of metadata is ensured through the Raft algorithm and persisted to RocksDB.
   
* **Metadata Subsystem (Meta Node, Meta Partition)** - Composed of multiple Meta Node nodes, multiple metadata shards (Meta Partition), and Raft instances (based on the Multi-Raft replication protocol), each metadata shard represents an Inode range metadata, which contains two in-memory B-Tree structures: inode B-Tree and dentry B-Tree.  The metadata node ensures high availability through Raft, and can quickly recover after a single point of failure. Secondly, the client ensures retries within a certain period.

* **Data Subsystem (Replica Subsystem, Erasure Code Subsystem)** - Divided into Replica Subsystem and Erasure Code Subsystem, both subsystems can coexist or exist independently: 

   * The Replica Subsystem consists of DataNodes, with each node managing a set of data shards. Multiple nodes' data shards form a replica group. Horizontal scaling ensures that each DataNode manages a set of shards, preventing lateral movement by isolating access to specific data shards

   * The Erasure Code Subsystem (Blobstore) is mainly composed of BlobNode modules, with each node managing a set of data blocks. Multiple nodes' data blocks form an erasure-coded stripe. Each BlobNode handles a set of data blocks, ensuring isolation between nodes.

* **Object Subsystem (Object Nodes)** - Composed of object nodes, it provides an access protocol compatible with standard S3 semantics and can be accessed through tools such as Amazon S3 SDK or s3cmd. Access to Object Nodes is isolated through authentication and access controls, restricting unauthorized access to the S3-compatible interface.

* **Volume** - A logical concept composed of multiple metadata and data shards. From the client's perspective, a volume can be seen as a file system instance that containers can access. From the perspective of object storage, a volume corresponds to a bucket. A volume can be mounted in multiple containers, allowing files to be accessed by different clients simultaneously.

### Actions

* **Data Write Operation** - 

  * Actors: Client Application, DataNode/Replica Subsystem, Metadata Subsystem
  * Security Checks: The first step will be authentication and authorization of the client application performing the write operations. Next, access control checks to ensure the client has the necessary permissions to write the data. Finally, data integrity checks during the write process to prevent data tampering or corruption
  * Use of Sensitive Data: This will include two things, first, secure transmission of sensitive data from the client to CubeFS, potentially involving encryption, and second, handling access credentials securely to authorize the write operation
  * Actor Interaction: The client interacts with the DataNode/Replica Subsystem for data storage and the Metadata Subsystem to update metadata information

* **Metadata Update** - 
  * Actors: Metadata Subsystem, Master Node
  * Security Checks: Sensitive metadata information should be encrypted during transmission and storage. There should be consistency checks to ensure metadata remains coherent and accurate. Authentication and authorization are a must for metadata updates to prevent unauthorized changes
  * Actor Interaction: The Metadata Subsystem will update and manage the metadata shards while coordinating with the Master Node for consistency and replication

* **User Authentication and Authorization** - 
  * Actors: Authentication Service, CubeFS Components (e.g., Master, Metadata, DataNodes)
  * Actor Interaction: Authentication Service validates user credentials via service requests and grants access permissions to CubeFS components based on defined policies

* **Volume Access Control** -
  * Actors: Volume Management System, Container/Client Applications
  * Actor Interaction: Volume Management System manages access permissions and interacts with container/client applications to grant or restrict access to volumes. Regular audits to ensure access permissions align with security policies. 


### Goals
**1. Authentication and Authorization**:

* **Goal**: Ensure secure authentication mechanisms for all nodes within CubeFS, preventing unauthorized access and establishing trusted communication channels.
* **Security Guarantee**: Robust authentication and authorization framework managed by Authnode, providing secure access to services and data.

**2. Data Confidentiality and Integrity**:

* **Goal**: Guarantee the confidentiality and integrity of data during transit and storage within CubeFS.
* **Security Guarantee**: Implementation of end-to-end encryption for data transmission and plans to support data encryption at rest, ensuring data remains confidential and unaltered.

**3. Credential Revocation Mechanism**:

* **Goal**: Prevent misuse of leaked credentials by implementing a revocation mechanism.
* **Security Guarantee**: Plans to introduce credential revocation to mitigate risks if credentials are compromised.

**4. Hardware Security Module (HSM) Integration**:

* **Goal**: Enhance the security of Authnode by integrating with Hardware Security Modules (HSMs).
* **Security Guarantee**: Leveraging HSMs (e.g., SGX) to secure key management, reducing the risk of Auth Node compromise.

**5. Enhanced Authentication Features**:

* **Goal**: Expand authentication features for improved security and usability.
* **Security Guarantee**: Future improvements include support for credential revocation, key rotation, and HSM integration for a more secure authentication framework.

**6. Performance-Enhancing Security Measures:**

* **Goal**: Ensure security measures do not compromise system performance.
* **Security Guarantee**: Continuous refinement of security mechanisms (e.g., optimizing writeback cache, addressing performance limitations in encryption) without compromising overall system performance.

**7. Key Management and Rotation**:

* **Goal**: Safeguard shared keys and support regular key rotation for enhanced security.
* **Security Guarantee**: Future enhancements to support key rotation, reducing the risk of key compromise and strengthening encryption mechanisms.

### Non-goals

* **Absolute Prevention of All Security Threats** - CubeFS does not claim to completely eliminate all possible security threats or vulnerabilities within the system. While CubeFS implements robust security measures, absolute prevention of all security threats is not feasible due to evolving security landscapes.

* **Full Resistance Against Zero-Day Exploits** - CubeFS does not guarantee complete immunity against zero-day exploits or unknown vulnerabilities. They acknowledge the possibility of unforeseen vulnerabilities emerging.

* **Elimination of All Performance Impact Due to Security Measures** - CubeFS does not aim to implement security measures without any impact on system performance.

* **Providing Certification or Compliance by Default** - CubeFS does not inherently provide certification or compliance with specific security standards by default. Achieving specific certifications or compliance may require additional configurations or procedures.

* **Absolute Guarantee Against Insider Threats** - CubeFS does not promise absolute protection against insider threats or malicious activities from authorized users.

* **Elimination of All Operational Errors** - CubeFS does not aim to eradicate all potential errors or misconfigurations during operational usage.

* **Providing Protection Beyond Defined Use Cases** - CubeFS does not extend security protections to scenarios or use cases not explicitly defined or supported. CubeFS focuses on securing the defined use cases and may not cover security aspects outside these boundaries.

## Self-assessment use

This self-assessment is created by the [project] team to perform an internal analysis of the
project's security.  It is not intended to provide a security audit of [project], or
function as an independent assessment or attestation of [project]'s security health.

This document serves to provide [project] users with an initial understanding of
[project]'s security, where to find existing security documentation, [project] plans for
security, and general overview of [project] security practices, both for development of
[project] as well as security of [project].

This document provides the CNCF TAG-Security with an initial understanding of [project]
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
[project] seeks graduation and is preparing for a security audit.

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
