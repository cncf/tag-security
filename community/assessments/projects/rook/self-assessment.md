# Rook Self-assessment
This Self-assessment document was created by community members as part of the [Security Pals](https://github.com/cncf/tag-security/issues/1102) process, and is currently pending changes from the maintainer team. 

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
| Software |  [Rook](https://github.com/rook/rook)  |
| Security Provider | No  |
| Languages | Go, Python, C++ |
| SBOM | Rook does not currently generate an SBOM on release|
| | |

### Security links

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

![Rook Components on Kubernetes](Rook%20High-Level%20Architecture.png)

* `Rook Operator`
* `Ceph CSI Drivers`
  * `RADOS Block Device`
  * `CephFS`
  * `Ceph Object Gateway`
* `Ceph Daemons`
  * `ceph-mgr`
  * `Ceph Monitor Daemon`
  * `Ceph Object Storage Daemon`
  * `Ceph MetaData Server`
* `CephX`

#### `Rook Operator`
The Rook operator is a simple container that has all that is needed to bootstrap and monitor the storage cluster. The operator will start and monitor Ceph monitor pods, the Ceph OSD daemons to provide RADOS storage, as well as start and manage other Ceph daemons. The operator manages CRDs for pools, object stores (S3/Swift), and filesystems by initializing the pods and other resources necessary to run the services.

The operator will monitor the storage daemons to ensure the cluster is healthy. Ceph mons will be started or failed over when necessary, and other adjustments are made as the cluster grows or shrinks. The operator will also watch for desired state changes specified in the Ceph custom resources (CRs) and apply the changes.

Rook automatically configures the Ceph-CSI driver to mount the storage to your pods. The rook/ceph image includes all necessary tools to manage the cluster. Rook is not in the Ceph data path. Many of the Ceph concepts like placement groups and crush maps are hidden so you don't have to worry about them. Instead, Rook creates a simplified user experience for admins that is in terms of physical resources, pools, volumes, filesystems, and buckets. Advanced configuration can be applied when needed with the Ceph tools.

#### `Ceph CSI Driver`
The Ceph-CSI driver provides the provisioning and mounting of volumes. This is split into three types of storage: block, file, and object.
* The Ceph CSI Driver for block storage is also called `RADOS Block Device` and RBD, a software instrument that orchestrates the storage of block-based data in Ceph. Ceph Block Device splits block-based application data into “chunks”. RADOS stores these chunks as objects. Ceph Block Device orchestrates the storage of those objects across the storage cluster.
* The Ceph CSI Driver for File storage, or the Ceph File System, `CephFS`, provides a POSIX-compliant filesystem as a service that is layered on top of the object-based Ceph Storage Cluster. CephFS files get mapped to objects that Ceph stores in the Ceph Storage Cluster. Ceph Clients mount a CephFS filesystem as a kernel object or as a Filesystem in User Space (FUSE).
* For object storage, a Ceph Object Store includes a `Ceph Object Gateway` (RGW), an object storage interface built on top of librados. Ceph Object Gateway provides a RESTful gateway between applications and Ceph storage clusters.

#### `Ceph Daemons`
The Ceph daemons run the core storage architecture. They are daemons that maintain a map of the state of the cluster. This “cluster state” includes the monitor map, the manager map, the OSD map, and the CRUSH map. A Ceph cluster must contain a minimum of three running monitors in order to be both redundant and highly-available. Ceph monitors and the nodes on which they run are often referred to as “mon”s.
* The Ceph manager daemon, `ceph-mgr`, is a daemon that runs alongside monitor daemons to provide monitoring and interfacing to external monitoring and management systems. Since the Luminous release (12.x), no Ceph cluster functions properly unless it contains a running ceph-mgr daemon.
* `Ceph monitor daemons` maintain a map of the state of the cluster. This “cluster state” includes the monitor map, the manager map, the OSD map, and the CRUSH map.
* The `Ceph Object Storage Daemon` interacts with logical disks.
* The `Ceph MetaData Server daemon`. Also referred to as “ceph-mds”, must be running in any Ceph cluster that runs the CephFS file system. The MDS stores all filesystem metadata.


#### `CephX`
The Ceph authentication protocol. CephX authenticates users and daemons. CephX operates like Kerberos, but it has no single point of failure. The cephx authentication system is used by Ceph to authenticate users and daemons and to protect against man-in-the-middle attacks. cephx uses shared secret keys for authentication. This means that both the client and the monitor cluster keep a copy of the client’s secret key. The cephx protocol makes it possible for each party to prove to the other that it has a copy of the key without revealing it. This provides mutual authentication and allows the cluster to confirm (1) that the user has the secret key and (2) that the user can be confident that the cluster has a copy of the secret key. As stated in Scalability and High Availability, Ceph does not have any centralized interface between clients and the Ceph object store. By avoiding such a centralized interface, Ceph avoids the bottlenecks that attend such centralized interfaces. However, this means that clients must interact directly with OSDs. Direct interactions between Ceph clients and OSDs require authenticated connections. The cephx authentication system establishes and sustains these authenticated connections.


### Actions
Rook can be used to automatically configure the Ceph CSI drivers to mount the storage to an application's pods. See image at top of [Actors](#actors) for reference

Configuration for Rook and Ceph can be configured in multiple ways to provide block devices, shared filesystem volumes or object storage in a kubernetes namespace. While several examples are provided to simplify storage setup, settings are available to optimize various production environments.

See the **[example yaml files](https://github.com/rook/rook/blob/master/deploy/examples)** folder for all the rook/ceph setup example spec files.

#### Common Resources

The first step to deploy Rook is to create the CRDs and other common resources. The configuration for these resources will be the same for most deployments.
The [crds.yaml](https://github.com/rook/rook/blob/master/deploy/examples/crds.yaml) and
[common.yaml](https://github.com/rook/rook/blob/master/deploy/examples/common.yaml) sets these resources up.

```console
kubectl create -f crds.yaml -f common.yaml
```

The examples all assume the operator and all Ceph daemons will be started in the same namespace. If deploying the operator in a separate namespace, see the comments throughout `common.yaml`.

#### Operator

After the common resources are created, the next step is to create the Operator deployment. Several spec file examples are provided in [this directory](https://github.com/rook/rook/blob/master/deploy/examples/):

* [`operator.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/operator.yaml): The most common settings for production deployments
  * `kubectl create -f operator.yaml`
* [`operator-openshift.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/operator-openshift.yaml): Includes all of the operator settings for running a basic Rook cluster in an OpenShift environment. You will also want to review the [OpenShift Prerequisites](../Getting-Started/ceph-openshift.md) to confirm the settings.
  * `oc create -f operator-openshift.yaml`

Settings for the operator are configured through environment variables on the operator deployment. The individual settings are documented in [operator.yaml](https://github.com/rook/rook/blob/master/deploy/examples/operator.yaml).

#### Cluster CRD

Now that the operator is running, create the Ceph storage cluster with the CephCluster CR. This CR contains the most critical settings
that will influence how the operator configures the storage. It is important to understand the various ways to configure
the cluster. These examples represent several different ways to configure the storage.

* [`cluster.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/cluster.yaml): Common settings for a production storage cluster. Requires at least three worker nodes.
* [`cluster-test.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/cluster-test.yaml): Settings for a test cluster where redundancy is not configured. Requires only a single node.
* [`cluster-on-pvc.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/cluster-on-pvc.yaml): Common settings for backing the Ceph Mons and OSDs by PVs. Useful when running in cloud environments or where local PVs have been created for Ceph to consume.
* [`cluster-external.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/cluster-external.yaml): Connect to an [external Ceph cluster](../CRDs/Cluster/ceph-cluster-crd.md#external-cluster) with minimal access to monitor the health of the cluster and connect to the storage.
* [`cluster-external-management.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/cluster-external-management.yaml): Connect to an [external Ceph cluster](../CRDs/Cluster/ceph-cluster-crd.md#external-cluster) with the admin key of the external cluster to enable
  remote creation of pools and configure services such as an [Object Store](../Storage-Configuration/Object-Storage-RGW/object-storage.md) or a [Shared Filesystem](../Storage-Configuration/Shared-Filesystem-CephFS/filesystem-storage.md).
* [`cluster-stretched.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/cluster-stretched.yaml): Create a cluster in "stretched" mode, with five mons stretched across three zones, and the OSDs across two zones. See the [Stretch documentation](../CRDs/Cluster/ceph-cluster-crd.md#stretch-cluster).

See the [Cluster CRD](../CRDs/Cluster/ceph-cluster-crd.md) topic for more details and more examples for the settings.

#### Setting up consumable storage

Now we are ready to setup Block, Shared Filesystem or Object storage in the Rook cluster. These storage types are respectively created with the CephBlockPool, CephFilesystem and CephObjectStore CRs.

##### Block Devices

Ceph provides raw block device volumes to pods. Each example below sets up a storage class which can then be used to provision a block device in application pods. The storage class is defined with a Ceph pool which defines the level of data redundancy in Ceph:

* [`storageclass.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/csi/rbd/storageclass.yaml): This example illustrates replication of 3 for production scenarios and requires at least three worker nodes. Data is replicated on three different kubernetes worker nodes. Intermittent or long-lasting single node failures will not result in data unavailability or loss.
* [`storageclass-ec.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/csi/rbd/storageclass-ec.yaml): Configures erasure coding for data durability rather than replication. Ceph's erasure coding is more efficient than replication so you can get high reliability without the 3x replication cost of the preceding example (but at the cost of higher computational encoding and decoding costs on the worker nodes). Erasure coding requires at least three worker nodes. See the [Erasure coding](../CRDs/Block-Storage/ceph-block-pool-crd.md#erasure-coded) documentation.
* [`storageclass-test.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/csi/rbd/storageclass-test.yaml): Replication of 1 for test scenarios. Requires only a single node. Do not use this for production applications. A single node failure can result in full data loss.

The block storage classes are found in the examples directory:

* `csi/rbd`: the CSI driver examples for block devices

See the [CephBlockPool CRD](../CRDs/Block-Storage/ceph-block-pool-crd.md) topic for more block storage settings.

##### Shared Filesystem

Ceph filesystem (CephFS) allows the user to mount a shared posix-compliant folder into one or more application pods. This storage is similar to NFS shared storage or CIFS shared folders, as explained [here](https://ceph.com/ceph-storage/file-system/).

Shared Filesystem storage contains configurable pools for different scenarios:

* [`filesystem.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/filesystem.yaml): Replication of 3 for production scenarios. Requires at least three worker nodes.
* [`filesystem-ec.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/filesystem-ec.yaml): Erasure coding for production scenarios. Requires at least three worker nodes.
* [`filesystem-test.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/filesystem-test.yaml): Replication of 1 for test scenarios. Requires only a single node.

Dynamic provisioning is possible with the CSI driver. The storage class for shared filesystems is found in the [`csi/cephfs`](https://github.com/rook/rook/tree/master/deploy/examples/csi/cephfs) directory.

See the [Shared Filesystem CRD](../CRDs/Shared-Filesystem/ceph-filesystem-crd.md) topic for more details on the settings.

##### Object Storage

Ceph supports storing blobs of data called objects that support HTTP(s)-type get/put/post and delete semantics. This storage is similar to AWS S3 storage, for example.

Object storage contains multiple pools that can be configured for different scenarios:

* [`object.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/object.yaml): Replication of 3 for production scenarios.  Requires at least three worker nodes.
* [`object-openshift.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/object-openshift.yaml): Replication of 3 with rgw in a port range valid for OpenShift. Requires at least three worker nodes.
* [`object-ec.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/object-ec.yaml): Erasure coding rather than replication for production scenarios. Requires at least three worker nodes.
* [`object-test.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/object-test.yaml): Replication of 1 for test scenarios. Requires only a single node.

See the [Object Store CRD](../CRDs/Object-Storage/ceph-object-store-crd.md) topic for more details on the settings.

##### Object Storage User

* [`object-user.yaml`](https://github.com/rook/rook/blob/master/deploy/examples/object-user.yaml): Creates a simple object storage user and generates credentials for the S3 API

##### Object Storage Buckets

The Ceph operator also runs an object store bucket provisioner which can grant access to existing buckets or dynamically provision new buckets.

* [object-bucket-claim-retain.yaml](https://github.com/rook/rook/blob/master/deploy/examples/object-bucket-claim-retain.yaml) Creates a request for a new bucket by referencing a StorageClass which saves the bucket when the initiating OBC is deleted.
* [object-bucket-claim-delete.yaml](https://github.com/rook/rook/blob/master/deploy/examples/object-bucket-claim-delete.yaml) Creates a request for a new bucket by referencing a StorageClass which deletes the bucket when the initiating OBC is deleted.
* [storageclass-bucket-retain.yaml](https://github.com/rook/rook/blob/master/deploy/examples/storageclass-bucket-retain.yaml) Creates a new StorageClass which defines the Ceph Object Store and retains the bucket after the initiating OBC is deleted.
* [storageclass-bucket-delete.yaml](https://github.com/rook/rook/blob/master/deploy/examples/storageclass-bucket-delete.yaml) Creates a new StorageClass which defines the Ceph Object Store and deletes the bucket after the initiating OBC is deleted.

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
* Rook operator should obey the principle of least privilege (see [here](https://github.com/rook/rook/pull/1736) for improvements already made to operator permissions model)
* Ceph storage elements should maintain integrity and availability while scaling

### Non-goals

**General**

* Rook is not meant to be used for storage outside of K8s
* Rook is not meant to modify the Ceph or K8s architectures, but to leverage their existing capabilities in order to provide cloud native persistent storage

**Security**

* Ceph- and K8s-specific vulnerabilities
* Vulnerabilities caused by user error
* Address security issues of extensions or tools used with Rook

## Self-assessment use

This self-assessment is not intended to provide a security audit of Rook, or
function as an independent assessment or attestation of Rook's security health.

This document serves to provide Rook users with an initial understanding of
Rook's security, where to find existing security documentation, Rook plans for
security, and general overview of Rook security practices, both for development of
Rook as well as security of Rook.

This document provides the CNCF TAG-Security with an initial understanding of Rook
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
Rook is preparing for a security audit.

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


### Communication Channels
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

- [Community Meeting Link: Zoom](https://zoom.us/j/392602367?pwd=NU1laFZhTWF4MFd6cnRoYzVwbUlSUT09)
- [Current agenda and past meeting notes](https://docs.google.com/document/d/1exd8_IG6DkdvyA0eiTtL2z5K2Ra-y68VByUUgwP7I9A/edit?usp=sharing)
- [Past meeting recordings](https://www.youtube.com/playlist?list=PLP0uDo-ZFnQP6NAgJWAtR9jaRcgqyQKVy)


## Security issue resolution

For a complete list of closed security issues, please refer to [this link](https://github.com/rook/rook/issues?q=is%3Aissue+label%3Asecurity+is%3Aclosed) 

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

There is a template for incident response for reference [here](https://github.com/cncf/tag-security/blob/main/project-resources/templates/incident-response.md)

## Appendix

* **Known Issues Over Time** <br>
There was a [security audit](https://drive.google.com/file/d/1rOwrwYmBUpLUm6W5J5rhXvdVit818hWJ/view) carried out in 2019.<br>
Rook, like any other software project, has had its share of vulnerabilities over time. The project follows a robust responsible disclosures process, which includes the Product Security Team (PST) being responsible for responding to reports, and the reporting process involving sending a report privately to cncf-rook-security@lists.cncf.io
For a complete list of closed security issues, please refer to the below link 
* **Closed Security [Issues](https://github.com/rook/rook/issues)** <br>
Rook has a few closed security issues and vulnerabilities. Here are some of them:
    * **Secrets names and usernames are written to the log: [Issue](https://github.com/rook/rook/issues/4570)**<br>
There are a number of locations where items such as secrets names and usernames are stored within the log above the Debugf level. The team evaluated to see if there is any user-sensitive and found that the logs do not contain any sensitive information.
    * **Rook should not log secret data when reconciling [Issue](https://github.com/rook/rook/issues/7624)**<br>
        Deviation from expected behavior: Rook reconciles on changes it makes to daemon keyrings. It also outputs messages          that contain the keyring, which is a security leak.
        Expected behaviour: Rook should ignore rook-ceph-<daemon>-*-keyring secrets during reconciles.
    * **Insecure file and directory permissions [Issue](https://github.com/rook/rook/issues/4579)**<br>
Throughout the repository there are areas in which files and directories are written and
created with statically defined permissions. Many of these permissions are rather open,
potentially allowing other system tenants to view and interact with their contents, which
may be sensitive.
An attacker gains access to a host running a Rook component. Because the file and
directory permissions are loose, the attacker is able to view potentially sensitive
configuration values that could be used for accessing other privileged portions of the
system.
    * **Missing input and output encodings [Issue](https://github.com/rook/rook/issues/4575)**<br>
Across the Rook codebase there are components that will create structured content such
as shell commands or JSON without a proper encoder, opting instead for sprintf or other
similar construction methods. This could lead to an attacker-controlled input to influence
the final result of the structured content in a malicious or unintended way.
An attacker is able to provide malicious input through Rook’s configuration interface,
allowing injection of arbitrary commands or JSON values to the final constructed value.
Resolved in #4863. No user input was taken from the CRs or otherwise, so the json formatting is safe.

* **[CII Best Practices](https://www.coreinfrastructure.org/programs/best-practices-program/)** <br>
As a graduation requirement for CNCF, Rook follows CII Best Practices Badging Issue #1440
Rook added the CII Best Practices badge to the Rook README in a [pull request](https://github.com/rook/rook/pull/2051) in August 2018.<br>
The pull request noted that, at the time, the project was in 80% compliance with the best practices checklist. The project has since made significant progress and has achieved 100% compliance with the CII Best Practices Badge. The CII Best Practices checklist includes a variety of areas, such as the security disclosure process, majority code coverage from automated testing, and test policy. Rook has been proactive in addressing these areas and has made significant strides in compliance with the best practices. Project Rook has made significant progress in achieving these best practices. The project has added a security disclosure process, achieved majority code coverage from automated testing, and documented a test policy. These efforts have helped Rook achieve 100% compliance with the CII Best Practices Badge<br>
See the Rook Open_SSF (CII) badge [here](https://www.bestpractices.dev/en/projects/1599#security)
  
* **Case Studies** <br>
On the Rook site, some of the businesses that have adopted or incorporated Rook are listed on the main page such as Pacific Research Platform, Canada's Centre of Excellence in Next Generation Networks (CENGN), Crowdfox, Cloudways, Gini, and Radio Sound are all featured. Beyond this list, Rook has documented adopters in their GitHub repository. This more expansive list includes Calit2, Norwegian Labour and Welfare Administration, Replicated, Discogs, Finleap Connect, Avisi, Geodata, CyCore Systems, Datacom, Turtle Network, LeanNet, FHE3 GmbH, infraBuilder, GreenCom Networks, PITS Global Data Recovery Services.<br>
Crowdfox used Rook to migrate virtual machines with no downtime thanks to Rook's storage orchestration capabilities.<br> 
Gini used Rook as the storage infrastructure to provide a stable and secure digital everyday assistant for users.<br>
CENGN uses Rook to set up Kubernetes clusters for small to medium enterprises in CENGN labs which are in the Information and Communications Technology sector. This allows for CENGN to help facilitate the growth of new technology in the Canadian technology sector.
  
* **Related Projects / Vendors**<br>
<br>**Ansible**<br>
Rook and Ansible, while serving distinct purposes, both automate operations and are compatible with Cepth. Both tools allow for configuration with a declarative approach, enabling users to specify the desired state of their infrastructure and automate tasks efficiently. Additionally, they both apply the idea of Infrastructure as Code (IaC), promoting code-centric management for enhanced reproducibility and scalability. Rook's specializes in orchestrating distributed storage systems within containerized environments with Kubernetes. In contrast, Ansible is a versatile automation tool designed for broader IT automation needs, encompassing tasks such as configuration management, application deployment, and orchestration across diverse infrastructure components. Both Rook and Ansible benefit from active open-source communities, providing users with documentation, support, and extensibility through plugins and modules.<br>
In summary, Rook excels in storage orchestration for containerized environments, particularly Kubernetes, while Ansible offers a more general-purpose automation solution with flexibility for a wide array of IT automation tasks beyond storage management. The choice between Rook and Ansible depends on the specific automation needs and the context of the infrastructure being managed.<br>
<br>**Portworx**<br>
Portworx is a container storage and data management platform that is designed to provide persistent storage solutions for containerized applications in cloud-native environments, particularly Kubernetes. On the other hand, Rook is an open-source storage orchestrator for Kubernetes that automates the deployment, configuration, and management of distributed storage systems, with a focus on integrating with Ceph.<br>
Both Portworx and Rook are tailored for containerized environments, emphasizing compatibility with Kubernetes. They address the challenges of persistent storage for containerized applications, ensuring data persistence and availability in dynamic and scalable cloud-native architectures. Differences lie in their underlying architectures and approaches. Portworx is a commercial product offering a comprehensive storage solution with features like data replication, backup, and encryption. Rook, being open source, focuses on orchestrating storage systems and has specific integration with Ceph, allowing users to deploy and manage distributed storage clusters within Kubernetes environments
