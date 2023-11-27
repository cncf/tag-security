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

1) Resource Management Node (Master) - Composed of multiple Master nodes, it is responsible for asynchronously processing different types of tasks, such as managing data shards and metadata shards (including creation, deletion, updating, and consistency checks), checking the health status of data or metadata nodes, and maintaining volume information. There can be multiple Master nodes, and the consistency of metadata is ensured through the Raft algorithm and persisted to RocksDB.
   
2) Metadata Subsystem (Meta Node, Meta Partition) - Composed of multiple Meta Node nodes, multiple metadata shards (Meta Partition), and Raft instances (based on the Multi-Raft replication protocol), each metadata shard represents an Inode range metadata, which contains two in-memory B-Tree structures: inode B-Tree and dentry B-Tree.  The metadata node ensures high availability through Raft, and can quickly recover after a single point of failure. Secondly, the client ensures retries within a certain period.

3) Data Subsystem (Replica Subsystem, Erasure Code Subsystem) - Divided into Replica Subsystem and Erasure Code Subsystem, both subsystems can coexist or exist independently: 

   a) The Replica Subsystem consists of DataNodes, with each node managing a set of data shards. Multiple nodes' data shards form a replica group. Horizontal scaling ensures that each DataNode manages a set of shards, preventing lateral movement by isolating access to specific data shards

   b) The Erasure Code Subsystem (Blobstore) is mainly composed of BlobNode modules, with each node managing a set of data blocks. Multiple nodes' data blocks form an erasure-coded stripe. Each BlobNode handles a set of data blocks, ensuring isolation between nodes.

4) Object Subsystem (Object Nodes) - Composed of object nodes, it provides an access protocol compatible with standard S3 semantics and can be accessed through tools such as Amazon S3 SDK or s3cmd. Access to Object Nodes is isolated through authentication and access controls, restricting unauthorized access to the S3-compatible interface.

5) Volume - A logical concept composed of multiple metadata and data shards. From the client's perspective, a volume can be seen as a file system instance that containers can access. From the perspective of object storage, a volume corresponds to a bucket. A volume can be mounted in multiple containers, allowing files to be accessed by different clients simultaneously.

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
