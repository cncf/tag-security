# CubeFS Self-assessment
This Self-assessment document was created by community members as part of the [Security Pals](https://github.com/cncf/tag-security/issues/1102) process and is currently pending changes from the maintainer team. 

The intention of this assessment is to help provide security-related information, such as gap identification and user security considerations, that pertain to the CubeFS project.


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
| Assessment Stage | Incomplete | 
| Software | https://github.com/cubefs/cubefs  |
| Website | https://cubefs.io/ |
| Security Provider | No  |
| Languages | Golang |
| SBOM | CubeFS does not currently generate an SBOM on release|
| | |

### Security links

| Doc | url |
| -- | -- |
| Security File | https://github.com/cubefs/cubefs/blob/master/SECURITY.md |
| Default & Optional Configs | https://github.com/cubefs/cubefs/blob/master/docs/source/maintenance/configs/config.md |
| Current Issues & Future Work | https://github.com/cubefs/cubefs/issues, https://github.com/cubefs/cubefs/blob/master/docs/source/design/authnode.md |
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
  * Actor Interaction: The Client Application initiates read operations by obtaining metadata from the Metadata Subsystem, which directs it to data blocks through the DataNode/Replica Subsystem. For write operations, the Client updates metadata through the Metadata Subsystem and sends data to the DataNode/Replica Subsystem, ensuring consistency and integrity across the distributed file system

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

* CubeFS aims to provide a scalable and reliable distributed file system with seamless integration of both POSIX and S3-compatible object storage interfaces.

* Its primary goals include supporting the native Amazon S3 SDK, offering a fusion storage solution with universal interfaces (POSIX and S3), ensuring stateless and highly scalable design for ObjectNode, facilitating semantic conversion between POSIX and object storage, enabling secure user authentication and authorization through Authnode, integrating with FUSE for user-space file system interfaces, implementing client-side caching for performance optimization, and supporting live upgrades and warm-up functions.

* The system strives to address security concerns, such as unauthorized access and Man-in-the-middle attacks, through a comprehensive authentication and authorization framework.

### Non-goals

* **Advanced Query and Indexing** -  CubeFS does not offer advanced indexing or querying capabilities directly within the storage layer. CubeFS does not have built-in query engines for complex data retrieval and analysis.

* **Integrated Data Processing Engines**: While CubeFS provides storage capabilities, it does not integrate directly with powerful data processing engines such as Apache Hudi with Apache Spark or Delta Lake with Apache Spark on Databricks.

* **Native Machine Learning Integrations**: CubeFS does not offer any sort of machine learning capabilities or have native integrations with machine learning frameworks and tools. CubeFS does not offer features to train machine learning models directly on the stored data.

## Self-assessment use

This self-assessment is created to perform an internal analysis of the project's security.  It is not intended to provide a security audit of CubeFS, or function as an independent assessment or attestation of CubeFS's security health. This document serves to provide CubeFS users with an initial understanding of CubeFS's security, where to find existing security documentation, their plans for security, and a general overview of its security practices, both for the development as well as security of CubeFS. This document provides the CNCF TAG-Security with an initial understanding of the project and its security posture.

## Security functions and features

**Critical features** - 

 * **Authnode** - 
   Authnode is a secure node that gives CubeFS a comprehensive structure for authentication and authorization. It serves as a centralized key storage for symmetric and asymmetric keys alike. It adopts and customizes the Kerberos protocol idea of ticket-based authentication. When a client node accesses a service, it must present a shared key to be authenticated in Authnode. If it is successful, it’ll be issued a time-limited ticket for that specific service. The functionality is embedded in the ticket to indicate who can do what on which resource. Any CubeFS node can act as a Client or Server all of which is done through HTTPS or TCP. By managing access control through Authnode, CubeFS offers better data protection for their users’ potentially sensitive data and will help mitigate the risk of unauthorized access and data breaches. As of November 27th, 2023, future developments include:

   * **Key Rotation** – shared keys are currently hard-coded, so regularly rotating keys will help decrease the risk of unauthorized access by an attacker able to break the key.
  
   * **Credential Revocation** – for the sake of performance, current authorization tickets are available for a limited period of time. If the ticket is leaked during that time, however, a malicious party can use that ticket for service requests. Credential revocation would prevent such issues.
  
   * **Hardware Security Module (HSM) Support** – exploiting Authnode would result in the entire system collapsing, so to provide physical protection for key management, HSMs can reduce the risk of Authnode being compromised.

   Along a similar vein, future work includes the implementation of end-to-end data encryption. The current implementation of Authnode does not support encryption of data in transit or at rest, only during communication. With the encryption keys managed and distributed by Authnode, end-to-end encryption can reduce data leaks once the data server is compromised. 

 * **Erasure Coding** - 
   The support for Erasure Coding (EC) using Reed-Solomon encoding reduces data redundancy and optimizes storage costs, but also ensures a certain level of fault tolerance by breaking down data into fragments. Unlike replication, where multiple identical copies of the data are stored, erasure coding allows the original data to be reconstructed from a subset of the fragments and parity information. By mitigating the impact of data loss, erasure encoding helps make CubeFS a more secure system. If, for example, an attacker gains access to and compromises a subset of nodes, the system can still function and recover the original data from the remaining healthy nodes and parity information. This makes it more challenging for attackers to compromise or manipulate data by targeting a single point of failure.

 * **Data Recovery** - 
   CubeFS implements a dual-step data recovery process: firstly, through the primary-backup replication protocol, it detects replica failures and aligns data blocks to restore consistency by checking their lengths. Once this step is completed, the system utilizes the Multi-Raft protocol for further recovery, ensuring high availability and maintaining data consistency in distributed environments. This two-tiered approach enhances fault tolerance and overall resilience in CubeFS.  

 **Security Relevant** - 

  * **Multiple Replicas**
   CubeFS uses multiple replicas to meet multi-tenant requirements. The data between replicas is mirrored, and strong consistency replication protocols are utilized to ensure data consistency between different replicas. Users can flexibly configure different numbers of replicas according to their application scenarios. Though not a strategy whose main explicit purpose is security, there are nonetheless security benefits to it. By the redundancy of the design, the security of CubeFS is elevated as even if one replica becomes corrupted or unavailable by a fault or attack, by the user’s configuration there can be several backups of the same data to ensure performance is not compromised. As well, consider the following scenarios:

    * In the case of a DDoS attack, where an attacker floods a system with a massive volume of requests to overwhelm and disrupt services, having multiple replicas helps distribute the incoming traffic. Load balancers can redirect requests across replicas, preventing a single point of failure and making it more challenging for attackers to overload a specific server.

    * Multiple replicas provide protection against attacks that aim to compromise data integrity. If one replica is targeted by a data manipulation attack, the other replicas can act as a reference to identify and rectify unauthorized changes, preserving the integrity of the data.

## Project compliance

CubeFS does not currently document meeting particular compliance standards such as PCI-DSS, COBIT, ISO, GDPR, etc.

## Secure development practices

* **Development Pipeline** - 

  * **Version control** - The CubeFS repository uses Git as its primary version control tool.

  * **Code contribution** - CubeFS has defined a document for users and other community members who want to contribute to the repository. The document contains development style guidelines and commit message guidelines. 

  * **Commit Signing** - All commits have to be signed following certain guidelines and go through a DCO (Developer Certificate of Origin) check. 

  * **CI/CD pipeline** - CubeFS uses automated CI/CD pipelines to build and test code and uses the Travis CI service to run all checks including unit and integration tests. However, CubeFS currently does not have SAST tools included in their CI/CD pipelines.

  * **Code reviews** - All pull requests have to be approved by at least one core maintainer, and pass all checks, before it can be merged.

  * **Container Image Security** - Images are built using trusted base images. The services use volumes to persist data, and certain configuration files have been mounted onto containers which contributes to immutability. However, there is no explicit configuration for image signing or content trust.

  * **OpenSSF Scorecard Check** - CubeFS has a GitHub Actions workflow to check the security posture of their repository using the OpenSSF Scorecard. The workflow runs a check based on certain trigger conditions and uploads the results in SARIF format, which can be accessed via the Actions tab. This check does not get triggered on every push, it runs when there are changes to the master branch or on a scheduled basis.  

* **Communication Channels** - 

  * **Internal communication** - Team members communicate with each other through Slack channels to coordinate activities. 

  * **Inbound communication** - Users and other community members can reach out to the CubeFS team either through the public Slack channel, the public mailing list users@cubefs.groups.io or through WeChat channels. 

  * **Outbound communication** - The CubeFS team communicates new releases, patch fixes and other updates through their public mailing list, Slack and WeChat channels, and through GitHub discussions. They also have a Twitter page to communicate updates.

* **Ecosystem** - CubeFS is integrated with various data access protocols such as S3, POSIX, and HDFS, and supports two storage engines - multiple replicas and erasure coding. This wide compatibility covers a large portion of cloud storage use cases. Furthermore, CubeFS’s integration with Kubernetes means that it is used by default in many cloud-native applications, further extending its reach in the ecosystem.

## Security issue resolution

The CubeFS team has defined a clear-cut process for how security issues, incidents or vulnerabilities are reported, identified, patched, released and communicated to users. 

* **Vulnerability Reporting and Response Process** - CubeFS has established a certain set of rules as to what constitutes/does not constitute a security vulnerability.  They also have a procedure to be followed by reporters to report vulnerabilities. The details also have to be sent to the private mailing list security@cubefs.groups.io. Once the report is received, it is directed to a dedicated committee of community volunteers called the Product Security Committee (PSC) which is responsible for organizing the entire incident response and communication disclosure. The members of the PSC share various tasks such as triaging, developing and releasing the fix, apart from managing disclosures. Each report is acknowledged and analysed by Product Security Committee members within 3 working days. 

* **Responsible Disclosure Process** - The disclosure processes can be either private or public. This depends on the severity of the vulnerability reported. 

  * If any reporter knows of a publicly disclosed security vulnerability, they need to email security@cubefs.groups.io to inform the PSC about the vulnerability so they may start the patch, release, and communication process. 

  * If the issue follows a private disclosure process, disclosing the issue and the fix will depend solely on the PSC. Disclosure is done once the vulnerability has been identified, triaged, patched and released. If it follows a public disclosure process, a public disclosure date is negotiated by the PSC and the bug reporter. The timeframe for disclosure is from immediate to a few weeks at PSC’s discretion.

* **Incident Response Process** - For each vulnerability, the PSC members will coordinate to create the fix and release, and send emails to the rest of the community. The PSC drives the schedule using their based on severity, development time, and release work. CubeFS follows the following Incident Response steps to manage vulnerabilities. 

  * **Fix Team Organization** - This step is completed within the first 24 hours of Disclosure. In this step, the PSC works to identify relevant engineers from the affected projects and packages and CC those engineers into the disclosure thread.

  * **Fix Development Process** - This process is completed within 1-7 days of disclosure once the team is formed. The team will determine the severity of the bug, request a CVE and then work on the fix branch. Depending on the severity, the PSC can adjust release timelines and disclosure processes.

  * **Fix Release and Disclosure Process** - The disclosure process begins after the Fix Team has developed a fix or mitigation so that a realistic timeline can be communicated to users. On release day, the code for the fix is merged by the project maintainers. The PSC will announce the new release, the CVE number, severity, and impact. This announcement with details is sent to users via their private mailing list.

  * **Retrospective** - Once the release is done, within 1-3 days, a retrospective of the process is conducted which includes the details of everyone involved, the timeline of the process, relevant PR links, and critiques of the response and the release process. This retrospective is sent to their private mailing list. 

## Appendix

* Known Issues Over Time - CubeFS reported a vulnerability [CVE-2023-30512](https://nvd.nist.gov/vuln/detail/CVE-2023-30512) with a 6.5/10 security rating that allowed Kubernetes cluster-level privilege escalation through CubeFS. Aside from this, no vulnerabilities have been reported by the project. CubeFS tracks its existing issues in their [issues repository](https://github.com/cubefs/cubefs/issues).

* [CII Best Practices](https://www.bestpractices.dev/en/projects) - The project has achieved the passing level criteria from the OpenSSF best practices with a scorecard of 7.7 (The badge can be found [here](https://www.bestpractices.dev/en/projects/6232). The project is in the process of getting a silver badge but no updates have been made by the team since 10/24/22.

* Case Studies -

  * **OPPO**: OPPO is a Chinese electronics manufacturer that in 2021 was building a one-stop service for a large-scale machine learning platform for their brand. However, the challenge they faced was in training itself. To optimize costs they had built a hybrid GPU cloud which was inefficient when they started training. They solved this problem with CubeFS which accelerated their training 3 times. 
OPPO used Cube FS to store their data for Machine learning training iterating with multiple epochs. CubeFS provided OPPO with a fast cache when training, accelerating the training process. CubeFS centralized the datasets allowing better management for OPPO. Cube FS with cache acceleration utilized other ML Models to increase performance. Overall, Cube FS helped OPPO efficiently train their machine learning models without worrying about security issues in transferring data or worrying about clunky training with hybrid cloud GPU resources. (Full details can be found [here](https://cubefs.io/blog/case/oppo-ai.html#what-s-next-for-oppo))


  * **JD.com**: JD.com uses a service called Elasticsearch which is an open-source distributed RESTful search engine. It can quickly store, search, and analyze large amounts of data. Currently, the production environment cluster scale exceeds 5000 servers. CubeFS is responsible for managing over 50 petabytes of data and is the default storage for applications deployed in the large-scale internal container platform. Large Businesses may write tens of millions of times per second as such, speed is key. CubeFS helps optimize these scenarios with its architecture and cache speeding up writes and access. Additionally, IO reads & writes are uneven, to solve this Elasticsearch used CubeFS to increase performance and scalability with CubeFS’s distributed file system. CubeFS Supports multiple read-write models and is compatible with different protocols allowing Elasticsearch to scale without many blocks. (Full Details can be found [here](https://cubefs.io/blog/case/elasticsearch.html#real-time-data-analysis-engine-to-form-statistical-reports))

* Related Projects / Vendors -

  * **Red Hat GlusterFS**: GlusterFS is a scalable network filesystem suitable for data-intensive tasks such as cloud storage and media streaming. GlusterFS is free and open-source software and can utilize common off-the-shelf hardware.

    * Key differences - 
      * CubeFS has found use cases in Machine learning and aggregating data using its fast cache, whereas Gluster FS has found its use case in cloud computing, streaming media services and CDNs.
      * GlusterFS and CubeFS both support POSIX protocols however CubeFS has support for more protocols making it more widely accessible

  * **ObjectiveFS**: Objective FS is a distributed file system that is POSIX compliant with an object store backend. It was initially released with an AWSS3 backend. The software is developed and maintained by Objective Security Corporation.

    * Key differences -
      * ObjectiveFS Is not an open-source platform and is a for-profit database which is the opposite of CubeFS
      * Both file systems have support for POSIX and utilize AWS S3 however CubeFS has support for more protocols as well. 

  * **JuiceFS**: Juice FS is a POSIX-compatible file system that is high-performance and under the Apache License. It is free and open source and has support for different access protocols. The metadata in the FS can be compatible with different database engines as well such as Redis, MySQL, and TiKV.
    
     * Key differences -
       * Juice FS has support for data compression through LZ4 or Zstandard to compress your data.
       * Juice FS has support for metadata engines such as Redis, MariaDB, TiKV, PostgreSQL etc.
       * CubeFS prides itself on its compatibility with different protocols such as its own REST API.
       * JuiceFS has an enterprise version as well as a community edition.
      