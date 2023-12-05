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
| Software |  [Rook](https://github.com/rook/rook)  |
| Security Provider | No  |
| Languages | Go, Python, C++ |
| SBOM | [prerequisites](https://github.com/rook/rook/blob/master/Documentation/Getting-Started/Prerequisites/prerequisites.md), [go.mod](https://github.com/rook/rook/blob/master/pkg/apis/go.mod), [API go.mod](https://github.com/rook/rook/blob/master/pkg/apis/go.mod), [Build Reqs](https://github.com/rook/rook/blob/master/INSTALL.md)|
| | |

### Security links

Provide the list of links to existing security documentation for the project. You may
use the table below as an example:
| Doc | url |
| -- | -- |
| Security file | https://github.com/rook/rook/blob/master/SECURITY.md |
| Default and optional configs | https://github.com/rook/rook/blob/release-1.12/design/ceph/ceph-config-updates.md |

## Overview

Rook turns distributed storage systems into self-managing, self-scaling, self-healing storage services. It automates the tasks of a storage administrator: deployment, bootstrapping, configuration, provisioning, scaling, upgrading, migration, disaster recovery, monitoring, and resource management.

### Background

Rook is an open source **cloud-native storage orchestrator** for Kubernetes, providing the platform, framework, and support for Ceph storage to natively integrate with Kubernetes.

[Ceph](https://ceph.com/) is a distributed storage system that provides file, block and object storage and is deployed in large scale production clusters.

Rook automates deployment and management of Ceph to provide self-managing, self-scaling, and self-healing storage services. The Rook operator does this by building on Kubernetes resources to deploy, configure, provision, scale, upgrade, and monitor Ceph.

The status of the Ceph storage provider is **Stable**. Features and improvements will be planned for many future versions. Upgrades between versions are provided to ensure backward compatibility between releases.

### Actors
These are the individual parts of your system that interact to provide the 
desired functionality.  Actors only need to be separate, if they are isolated
in some way.  For example, if a service has a database and a front-end API, but
if a vulnerability in either one would compromise the other, then the distinction
between the database and front-end is not relevant.

The means by which actors are isolated should also be described, as this is often
what prevents an attacker from moving laterally after a compromise.

![Rook Components on Kubernetes](Rook%20High-Level%20Architecture.png)

- `Rook Operator`
	- `Ceph CSI Driver`
	- `Ceph Daemons`

#### `Rook Operator`
The Rook operator is a simple container that has all that is needed to bootstrap and monitor the storage cluster. The operator will start and monitor Ceph monitor pods, the Ceph OSD daemons to provide RADOS storage, as well as start and manage other Ceph daemons. The operator manages CRDs for pools, object stores (S3/Swift), and filesystems by initializing the pods and other resources necessary to run the services.

The operator will monitor the storage daemons to ensure the cluster is healthy. Ceph mons will be started or failed over when necessary, and other adjustments are made as the cluster grows or shrinks. The operator will also watch for desired state changes specified in the Ceph custom resources (CRs) and apply the changes.

Rook automatically configures the Ceph-CSI driver to mount the storage to your pods. The rook/ceph image includes all necessary tools to manage the cluster. Rook is not in the Ceph data path. Many of the Ceph concepts like placement groups and crush maps are hidden so you don't have to worry about them. Instead, Rook creates a simplified user experience for admins that is in terms of physical resources, pools, volumes, filesystems, and buckets. Advanced configuration can be applied when needed with the Ceph tools.

#### `Ceph CSI Driver`
The Ceph-CSI driver provides the provisioning and mounting of volumes

#### `Ceph Daemons`
The Ceph daemons run the core storage architecture. See the [Glossary](https://github.com/rook/rook/blob/master/Documentation/Getting-Started/glossary.md#ceph) to learn more about each daemon.

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

Rook can be used to automatically configure the Ceph CSI drivers to mount the storage to an application's pods. See image at top of [Actors](#actors) for reference

##### Actors

* Rook Operator
* Ceph CSI Drivers
* Ceph Daemons

#### Workflows

##### Block Storage Example

In the diagram [here](#actors), the flow to create an application with an RWO volume is:

1. The (blue) app creates a PVC to request storage
2. The PVC defines the Ceph RBD storage class (sc) for provisioning the storage
3. K8s calls the Ceph-CSI RBD provisioner to create the Ceph RBD image.
4. The kubelet calls the CSI RBD volume plugin to mount the volume in the app
5. The volume is now available for reads and writes.

A ReadWriteOnce volume can be mounted on one node at a time.

##### Shared File System Example

In the diagram [here](#actors), the flow to create a applications with a RWX volume is:

1. The (purple) app creates a PVC to request storage
2. The PVC defines the CephFS storage class (sc) for provisioning the storage
3. K8s calls the Ceph-CSI CephFS provisioner to create the CephFS subvolume
4. The kubelet calls the CSI CephFS volume plugin to mount the volume in the app
5. The volume is now available for reads and writes.

A ReadWriteMany volume can be mounted on multiple nodes for your application to use.

##### Block Storage Example

In the diagram [here](#actors), the flow to create an application with access to an S3 bucket is:

- The (orange) app creates an ObjectBucketClaim (OBC) to request a bucket
- The Rook operator creates a Ceph RGW bucket (via the lib-bucket-provisioner)
- The Rook operator creates a secret with the credentials for accessing the bucket and a configmap with bucket information
- The app retrieves the credentials from the secret
- The app can now read and write to the bucket with an S3 client

A S3 compatible client can use the S3 bucket right away using the credentials (`Secret`) and bucket info (`ConfigMap`).


### Goals

####
Rook automates deployment and management of Ceph to provide self-managing, self-scaling, and self-healing storage services. The Rook operator does this by building on Kubernetes resources to deploy, configure, provision, scale, upgrade, and monitor Ceph.

#### Security Goals

* All access to rook operator should be authenticated and authorized
* Secrets created by Rook operator should maintain confidentiality
* Rook operator should obey the principle of least privilege (see [here](https://github.com/rook/rook/blob/release-1.12/design/ceph/security-model.md) for planned changes)
* Ceph storage elements should maintain integrity and availability while scaling

### Non-goals

* Ceph- and K8s-specific vulnerabilities
* Vulnerabilities caused by user error
* Address security issues of extensions or tools used with Rook

## Self-assessment use

This self-assessment is created by the Rook team to perform an internal analysis of the
project's security.  It is not intended to provide a security audit of Rook, or
function as an independent assessment or attestation of Rook's security health.

This document serves to provide Rook users with an initial understanding of
Rook's security, where to find existing security documentation, Rook plans for
security, and general overview of Rook security practices, both for development of
Rook as well as security of Rook.

This document provides the CNCF TAG-Security with an initial understanding of Rook
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
Rook seeks graduation and is preparing for a security audit.

## Security functions and features

### Critical
#### User ID Mapping through Rook for CephNFS Clusters
User ID mapping is a critical security component facilitated by Rook for CephNFS clusters. CephNFS allows access to objects stored in Ceph clusters through the Network File System (NFS). Rook ensures secure user domain association, linking user authentication and authorization. By enforcing authentication mechanisms, Rook guarantees that only authorized users with valid credentials can access CephNFS clusters. This measure is crucial in preventing unauthorized data leakage or modifications.
#### User Authentication between Rook CephNFS Servers and NFS Clients
Rook leverages Kerberos for user authentication between CephNFS servers and NFS clients. Through the use of configuration files and keytab files, Kerberos establishes a secure connection between the NFS server and the Kerberos server, ensuring authenticated and controlled access. This safeguards against unauthorized access, providing a secure communication channel.
#### Object Storage Daemon Encryption Capability
Rook enhances security by providing encryption capabilities for Object Storage Daemons (OSDs). OSDs can be encrypted with keys stored in a Kubernetes Secret or managed by a Key Management System. Rook supports authentication of Key Management Systems through token-based or Vault Kubernetes native authentication, adding an extra layer of security to OSD encryption.

### Security Relevant
#### Server Side Encryption in Ceph RADOS Gateway
Ceph RADOS Gateway (RGW), a pivotal component of Ceph storage, offers object storage services with a RESTful API. It supports Server Side Encryption with the flexibility to manage encryption keys either within RGW or through a Key Management System. Users have the autonomy to configure their preferences, empowering them to align encryption practices with their security policies.

#### NFS Cluster Security Specification
The security configuration of NFS clusters involves a range of customizable settings, including principal name, domain name, Kerberos configuration files, Kerberos keytab file, and System Security Services Daemon (SSSD) settings. Users can fine-tune security parameters such as sidecar image, configuration file, volume source, additional files, debug level for SSSD, and Kubernetes resource requests. This customization capability empowers users to tailor security settings for NFS clusters based on their specific requirements.

#### preservePoolsOnDelete for Object Stores in Pools
The setting "preservePoolsOnDelete" plays a critical role in determining the fate of pools used to store objects when the objects are deleted. Pools, being repositories of settings and data, are safeguarded from accidental loss. This security measure prevents users from unintentionally losing critical information, enhancing the overall security of the system.

#### preserveFilesystemOnDelete for File Systems in Ceph
The "preserveFilesystemOnDelete" setting governs whether the underlying filesystem remains intact or is deleted when a Ceph File System (CephFS) is deleted. This security setting acts as a protective measure, ensuring that data is not accidentally or unintentionally lost during filesystem deletion operations. It adds an additional layer of security to prevent data loss incidents.

## Project compliance

There are no security standards or sub-sections the project is already documented as meeting.

## Secure development practices

#### Development Pipeline.  
Rook's development pipeline is designed to ensure that the software is robust, reliable, and secure. It involves several stages of testing and assessment as the software is developed and built.

#### Contributor Requirements

Contributors to Rook are required to sign their commits, adhering to the Developer Certificate of Origin (DCO). This practice ensures the integrity of the code by verifying that the changes are made by the person who claims to have made them. Contributors use the Signed-off-by line in commit messages to signify their adherence to these requirements. Git has a -s command-line option to append this automatically to commit messages
Rook leverages a DCO bot to enforce the DCO on each pull request and branch commits. This bot helps ensure that all contributions are properly signed off.
Contributors can get started by forking the repository on GitHub, reading the installation document for build and test instructions, and playing with the project 

#### Container Images

The container images used in Rook are immutable, which means they cannot be changed after they are created. This practice enhances the security of the software by preventing unauthorized modifications.

#### Reviewers

Before a commit is merged, it is reviewed by multiple reviewers. This practice helps catch potential security issues early in the development process. The exact number of reviewers required before merging is not specified in the documentation.
Rook empowers contributors to approve and merge code changes autonomously. The maintainer team does not have sufficient resources to fully review and approve all proposed code changes, so trusted members of the community are given these abilities. The goal of this process is to increase the code velocity of all storage providers and streamline their day-to-day operations, such as pull request approval and merging

#### Automated Checks

Rook includes automated checks for vulnerabilities. These checks are part of Rook's continuous integration (CI) process and automatically run against every pull request. The results of these tests, along with code reviews and other criteria, determine whether a pull request will be accepted into the Rook repository

#### Integration Tests

Rook's upstream continuous integration (CI) tests will run integration tests against your changes automatically. You do not need to run these tests locally, but you may if you like.


* Communication Channels.
  Rook Communication Channels

#### Internal Communication
- Slack: Join our [slack channel](https://slack.rook.io)
- GitHub: Start a [discussion](https://github.com/rook/rook/discussions) or open an [issue](https://github.com/rook/rook/issues)
- Security topics: [cncf-rook-security@lists.cncf.io](#reporting-security-vulnerabilities)

#### Inbound Communication

Users or prospective users communicate with the Rook team through GitHub issues and pull requests. GitHub is a platform that hosts the Rook project's codebase and provides features for tracking changes, managing versions, and collaborating on code. Users can report issues, propose changes, or contribute to the project by submitting pull requests.
- GitHub: Start a [discussion](https://github.com/rook/rook/discussions) or open an [issue](https://github.com/rook/rook/issues)

#### Outbound Communication
- Twitter: [@rook_io](https://twitter.com/rook_io)
Mailing lists
* [cncf-rook-security@lists.cncf.io](mailto:cncf-rook-security@lists.cncf.io): for any security concerns. Received by Product Security Team members, and used by this Team to discuss security issues and fixes.
* [cncf-rook-distributors-announce@lists.cncf.io](mailto:cncf-rook-distributors-announce@lists.cncf.io): for
  early private information on Security patch releases.
  
Community Meeting

A regular community meeting takes place every other [Tuesday at 9:00 AM PT (Pacific Time)](https://zoom.us/j/392602367?pwd=NU1laFZhTWF4MFd6cnRoYzVwbUlSUT09).
Convert to your [local timezone](http://www.thetimezoneconverter.com/?t=9:00&tz=PT%20%28Pacific%20Time%29).

Any changes to the meeting schedule will be added to the [agenda doc](https://docs.google.com/document/d/1exd8_IG6DkdvyA0eiTtL2z5K2Ra-y68VByUUgwP7I9A/edit?usp=sharing) and posted to [Slack #announcements](https://rook-io.slack.com/messages/C76LLCEE7/).

Anyone who wants to discuss the direction of the project, design and implementation reviews, or general questions with the broader community is welcome and encouraged to join.

- Meeting link: <https://zoom.us/j/392602367?pwd=NU1laFZhTWF4MFd6cnRoYzVwbUlSUT09>
- [Current agenda and past meeting notes](https://docs.google.com/document/d/1exd8_IG6DkdvyA0eiTtL2z5K2Ra-y68VByUUgwP7I9A/edit?usp=sharing)
- [Past meeting recordings](https://www.youtube.com/playlist?list=PLP0uDo-ZFnQP6NAgJWAtR9jaRcgqyQKVy)


## Security issue resolution

For a complete list of closed security issues, please refer to the below link 
Closed Security Issues: https://github.com/rook/rook/issues?q=is%3Aissue+label%3Asecurity+is%3Aclosed


### Responsible Disclosures Process

In case of suspected security issues, incidents, or vulnerabilities, both external and internal to the project, Rook has a responsible disclosures process in place. The process is designed to handle security vulnerabilities quickly and sometimes privately. The primary goal of this process is to reduce the total time users are vulnerable to publicly known exploits.

#### Vulnerability Response Process

The Product Security Team (PST) is responsible for organizing the entire response, including internal communication and external disclosure. The initial PST will consist of the set of maintainers that volunteered. Every beta or stable storage provider must have a representative on the PST.

#### Reporting Security Vulnerabilities

If you find a vulnerability or a potential vulnerability in Rook please let us know immediately at [cncf-rook-security@lists.cncf.io](mailto:cncf-rook-security@lists.cncf.io). We'll send a confirmation email to acknowledge your report, and we'll send an additional email when we've identified the issues positively or negatively.
For further details, please see the complete [security release process](SECURITY.md).

#### Private Disclosure Processes

If a security vulnerability or any security-related issues are found, they should not be filed as a public issue or a GitHub issue. Instead, the report should be sent privately to cncf-rook-security@lists.cncf.io

#### Public Disclosure Processes

If a publicly disclosed security vulnerability is known, it should be reported immediately to cncf-rook-security@lists.cncf.io to inform the Product Security Team (PST) about the vulnerability. This will initiate the patch, release, and communication process.

### Patch, Release, and Public Communication

For each vulnerability, a member of the PST will lead coordination with the "Fix Team" and is responsible for sending disclosure emails to the rest of the community. This lead will be referred to as the "Fix Lead." The Fix Lead should rotate round-robin across the PST 
The timelines for the Fix Team Organization, Fix Development Process, and Fix Disclosure Process are suggested and assume a Private Disclosure. If the Team is dealing with a Public Disclosure, all timelines become ASAP. If the fix relies on another upstream project's disclosure timeline, that will adjust the process as well.

### Private Distributor List

Rook also has a private distributor list intended to be used primarily to provide actionable information to multiple distributor projects at once. This list is not intended for individuals to find out about security issues.

#### Embargo Policy

The information members receive on cncf-rook-distributors-announce@lists.cncf.io must not be made public, shared, nor even hinted at anywhere beyond the need-to-know within your specific team except with the list's explicit approval. This holds true until the public disclosure date/time that was agreed upon by the list.

### Patching/Update Availability

Once the vulnerability has been confirmed and the relevant parties have been notified, the next step is to make a patch or update available. This involves releasing a new version of the software that addresses the vulnerability. The patch or update is then made available to all users, who can then update their systems to the latest version to protect against the vulnerability.
In addition, Rook has a Fix Disclosure Process that includes the disclosure of forthcoming fixes to users, which is completed within 1-7 days of disclosure. The Fix Lead will create a GitHub issue in the Rook project to inform users that a security vulnerability has been disclosed and that a fix will be made available, with an estimation of the release date

## Incident Response

There is a template for incident response for reference.
https://github.com/dhauss/tag-security/blob/main/project-resources/templates/incident-response.md


## Appendix

* Known Issues Over Time.

This was a security audit done in 2019: https://drive.google.com/file/d/1rOwrwYmBUpLUm6W5J5rhXvdVit818hWJ/view

Rook, like any other software project, has had its share of vulnerabilities over time. The project follows a robust responsible disclosures process, which includes the Product Security Team (PST) being responsible for responding to reports, and the reporting process involving sending a report privately to cncf-rook-security@lists.cncf.io

For a complete list of closed security issues, please refer to the below link 
##### Closed Security Issues: https://github.com/rook/rook/issues?q=is%3Aissue+label%3Asecurity+is%3Aclosed

Rook has a few closed security issues and vulnerabilities. Here are some of them:

##### Secrets names and usernames are written to the log  Issue #4570 https://github.com/rook/rook/issues/4570

There are a number of locations where items such as secrets names and usernames are stored within the log above the Debugf level. The team evaluated to see if there is any user-sensitive and found that the logs do not contain any sensitive information.

##### Rook should not log secret data when reconciling Issue #7624 https://github.com/rook/rook/issues/7624

        Deviation from expected behavior: Rook reconciles on changes it makes to daemon keyrings. It also outputs messages          that contain the keyring, which is a security leak.
        Expected behaviour: Rook should ignore rook-ceph-<daemon>-*-keyring secrets during reconciles.

##### Insecure file and directory permissions Issue #4579 https://github.com/rook/rook/issues/4579

Throughout the repository there are areas in which files and directories are written and
created with statically defined permissions. Many of these permissions are rather open,
potentially allowing other system tenants to view and interact with their contents, which
may be sensitive.

An attacker gains access to a host running a Rook component. Because the file and
directory permissions are loose, the attacker is able to view potentially sensitive
configuration values that could be used for accessing other privileged portions of the
system.

##### Missing input and output encodings  Issue #4575 https://github.com/rook/rook/issues/4575
Across the Rook codebase there are components that will create structured content such
as shell commands or JSON without a proper encoder, opting instead for sprintf or other
similar construction methods. This could lead to an attacker-controlled input to influence
the final result of the structured content in a malicious or unintended way.

An attacker is able to provide malicious input through Rook’s configuration interface,
allowing injection of arbitrary commands or JSON values to the final constructed value.

Resolved in #4863. No user input was taken from the CRs or otherwise, so the json formatting is safe.

* [CII Best Practices](https://www.coreinfrastructure.org/programs/best-practices-program/).
  Best Practices.

As a graduation requirement for CNCF, Rook follows CII Best Practices Badging Issue #1440
Rook added the CII Best Practices badge to the Rook README in a pull request in August 2018.
https://github.com/rook/rook/pull/2051
The pull request noted that, at the time, the project was in 80% compliance with the best practices checklist. The project has since made significant progress and has achieved 100% compliance with the CII Best Practices Badge
The CII Best Practices checklist includes a variety of areas, such as the security disclosure process, majority code coverage from automated testing, and test policy. Rook has been proactive in addressing these areas and has made significant strides in compliance with the best practices
Project Rook has made significant progress in achieving these best practices. The project has added a security disclosure process, achieved majority code coverage from automated testing, and documented a test policy. These efforts have helped Rook achieve 100% compliance with the CII Best Practices Badge

  
* Case Studies.

On the Rook site, some of the businesses that have adopted or incorporated Rook are listed on the main page such as Pacific Research Platform, Canada's Centre of Excellence in Next Generation Networks (CENGN), Crowdfox, Cloudways, Gini, and Radio Sound are all featured. Beyond this list, Rook has documented adopters in their GitHub repository. This more expansive list includes Calit2, Norwegian Labour and Welfare Administration, Replicated, Discogs, Finleap Connect, Avisi, Geodata, CyCore Systems, Datacom, Turtle Network, LeanNet, FHE3 GmbH, infraBuilder, GreenCom Networks, PITS Global Data Recovery Services. 

Crowdfox used Rook to migrate virtual machines with no downtime thanks to Rook's storage orchestration capabilities. 

Gini used Rook as the storage infrastructure to provide a stable and secure digital everyday assistant for users. 

CENGN uses Rook to set up Kubernetes clusters for small to medium enterprises in CENGN labs which are in the Information and Communications Technology sector. This allows for CENGN to help facilitate the growth of new technology in the Canadian technology sector.
  
* Related Projects / Vendors.

### Ansible
Rook and Ansible, while serving distinct purposes, both automate operations and are compatible with Cepth. Both tools allow for configuration with a declarative approach, enabling users to specify the desired state of their infrastructure and automate tasks efficiently. Additionally, they both apply the idea of Infrastructure as Code (IaC), promoting code-centric management for enhanced reproducibility and scalability. Rook's specializes in orchestrating distributed storage systems within containerized environments with Kubernetes. In contrast, Ansible is a versatile automation tool designed for broader IT automation needs, encompassing tasks such as configuration management, application deployment, and orchestration across diverse infrastructure components. Both Rook and Ansible benefit from active open-source communities, providing users with documentation, support, and extensibility through plugins and modules.

In summary, Rook excels in storage orchestration for containerized environments, particularly Kubernetes, while Ansible offers a more general-purpose automation solution with flexibility for a wide array of IT automation tasks beyond storage management. The choice between Rook and Ansible depends on the specific automation needs and the context of the infrastructure being managed.

### Portworx

Portworx is a container storage and data management platform that is designed to provide persistent storage solutions for containerized applications in cloud-native environments, particularly Kubernetes. On the other hand, Rook is an open-source storage orchestrator for Kubernetes that automates the deployment, configuration, and management of distributed storage systems, with a focus on integrating with Ceph.

Both Portworx and Rook are tailored for containerized environments, emphasizing compatibility with Kubernetes. They address the challenges of persistent storage for containerized applications, ensuring data persistence and availability in dynamic and scalable cloud-native architectures. Differences lie in their underlying architectures and approaches. Portworx is a commercial product offering a comprehensive storage solution with features like data replication, backup, and encryption. Rook, being open source, focuses on orchestrating storage systems and has specific integration with Ceph, allowing users to deploy and manage distributed storage clusters within Kubernetes environments
