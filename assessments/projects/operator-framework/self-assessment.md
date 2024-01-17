# Operator Framework Self-assessment

This assessment was created by community members as part of the [Security Pals](https://github.com/cncf/tag-security/issues/1102) process, and is currently pending changes from the maintainer team.

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
* [Recommendations](#recommendations)

## Metadata

|   |  |
| -- | -- |
| Assessment Stage | Incomplete | 
| Software | [Operator Framework](https://github.com/operator-framework/operator-sdk)  |
| Security Provider | No  |
| Languages | Go, Ansible, Python, C++ |
| SBOM | N/A |
| | |

### Security links

| Doc | url |
| -- | -- |
| Security file | https://github.com/operator-framework/operator-sdk/blob/master/SECURITY.md |
| Default and optional configs | https://github.com/operator-framework/operator-sdk/blob/master/config/crd/bases/_.yaml |

## Overview

Operator Framework is an open-source toolkit that provides the runtime environment and software development kit (SDK) for building and running Kubernetes applications, dubbed “Operators”, in an effective and easily scalable way.

Built on top of Kubernetes, Operators use kubernetes as a framework to allow extensions to developers to build and manipulate Operators without prior knowledge of the complexities of Kubernetes API. By automating deployment, scale, updates, and maintenance, using operators to manage systems without the need of consistent human intervention becomes simple. If interaction is necessary, Operators provide specialized libraries and tools to allow developers to use familiar languages to interact with operators in a simple way.


### Background

Streamlining processes for consumers, workers, and industries in general is often of utmost importance. It saves time, money, and headaches for everyone involved. When it comes to installing a piece of software, most expect it to be simple with only a few clicks involved, the same applies to updates and upgrades for that software. However every machine is different and each application has numerous dependencies that are necessary to run it correctly. To expect consumers or people who are not as proficient with technology to install the correct one from slightly different variations would be nonsensical.

Containerization solves this problem. Containerization is the process of packaging an application with all its dependencies into a single, self-contained unit called a container. This would include the application code, source tools, runtime libraries, and more. By providing an isolated environment, this ensures that the application would be consistent in running on multiple different machines, regardless of the individual conditions. Containerization allows for ease of use, portability, scalability, and efficient deployment of applications.

Kubernetes is a control system that helps manage and run applications with multiple software components. An open source containerization platform, Kubernetes automates application deployment, updates, and overall management. It provides the container infrastructure and allows developers to define their application requirements. These reasons alone with a host of other benefits would be a great help to any development team.

However, setting up and configuring Kubernetes clusters can pose a challenge for developers unfamiliar with its complexities. It requires an in-depth understanding of networking, infrastructure, and storage concepts. These are significant learning curves that create a “threshold filter” of sorts that leads developers to deciding on a different alternative to Kubernetes. 
Operator Framework is a solution to this problem along with providing several benefits that Kubernetes does not natively supply. The Operator Framework allows developers to build Operators with languages and libraries that they are already familiar with. Operators built with Operator Framework allow for even more options for automation of tasks and workflows beyond the basic functionalities provided by Kubernetes. Overall Operator Framework complements the benefits that Kubernetes offers by providing the specialized tools for easier learning for developers, better automation, and better scalability making Kubernetes an easier and more powerful tool.

### Actors
Operator Framework is comprised of the following parts 

#### Operator Framework SDK
The framework used to build and package Operators. Using Operator SDK allows developers to easily automate and manage any Operators they create. It constructs basic manifests such as the CRD, RBAC, Dockerfile­, and the primary file "main.go", and offers some sample illustrations. The user interacts with the Operator SDK through a command line interface (CLI) to create, test, and build operators and manage the Operator Life Cycle Manager (OLM) installation in the cluster.

#### Operator Lifecycle Manager (OLM) 
Contains two parts, Operator OLM and Catalog Operator. Both provides the runtime environment and APIs for managing the lifecycle of Operators and their resources. It also helps in deploying, installing, and updating Operators. Operator OLM is for manually created Operators and Catalog Operator is for Operators taken from Operater Hub. 

#### Operator Registry
The Operator Registry is a gRPC API that provides the OLM with operator bundle data, allowing querying of these operator bundles. It provides several binaries, including ```opm```( updates registry databases and the index images), ```initializer```( takes operator manifests as inputs and outputs SQLite database with the data allowing querying), and many more.

#### Operator Hub
A community-driven public hub for sharing and discovering Operators for various uses.

These components make up Operator Framework and make it very useful for developing, deploying and managing Operators.

### Actions

#### Creating an Operator using Operator Framework SDK
1. Create new project operator using the SDK Command Line Interface (CLI)
2. Define resource APIs by adding Custom Resource Definitions
3. Define controllers
4. Write reconciling logic for controllers using SDK and APIs
5. Using the SDK CLI, define webhooks for the custom resource, e.g., validating/mutating webhooks if necessary
6. Use the SDK Command Line Interface to generate the operator deployment manifest

#### Installing and Managing an Operator using Operator Framework Operator Lifecycle Manage (OLM)
1. Use Operator OLM to manually create Operator
  OR
1. Use Catalog Operator to create Operator from OperaterHub

Operator OLM
1. Watches for the ClusterServiceVersion (CSV) in a namespace and checks to make sure the requirements are met
2. If requirements are met, the install strategy is executed

Catalog Operator
1. Holds a cache of CSVs and CRDs
2. Watches for InstallPlans set by user
3. If one is found, finds the matching name and adds as a resource, else go to step 7
4. For each managed CRD, adds as a resolved resource
5. For each resolved CRD, finds the managing CSV
6. Watches for resolved InstallPlans and creates resources for them
7. Watches for subscriptions to Operators in Catalog, and creates InstallPlans for them

![image](https://github.com/Brandonpinos/SecurityPals-Operator-Framework/assets/71077398/2c3c208e-db2a-4c88-b8db-02df8f344637)


### Goals
The goals of Operator Framework is to simplify and enhance applications on Kubernetes clusters. 

It does this by using the Operator Software Development Kits (SDK) to simplify creation and automation of Operators. This thoroughly increases developer productivity.

Operator Framework also enhances the reliability of complex applications by allowing them to declare specific configurations to make sure the application is always running as desired. This would in turn reduce possible downtime and making it easier for the maintaining ditributed dependent systems.

For security guarantees, Operator Framework uses the same principles as Kubernetes such as Role-Based Access Control so that applications cannot act outside of the scope provided. This along with other network isolation policies maintains enterprise providing a product that is secure, stable, tested for capacity with increased usability.

### Non-goals
Although Operator Framework enhances many basic features of Kubernetes, as a result it also shares some of the same non-goals. The logging and monitoring, although provided, are basic as they are not meant to be a replacement for fully comprehensive security logging and monitoring alternatives.

They also do not cover every aspect of deployment of applications. They mainly focus on the lifecycle of the Operator itself. This includes the deployment, upgrading, and scaling of Operators while leaving out other aspects of deployment like storage and networking.

## Self-assessment use

This self-assessment is created by the Security Pals team to perform an internal analysis of
Operator Framework's security.  It is not intended to provide a security audit of Operator Framework, or
function as an independent assessment or attestment of Operator Framework's security health.

This document serves to provide Operator Framework users with an brief and easily understandable description of Operator Framework's security. Defines where to find existing security documentation. Clearly explains Operator Framework plans for security. Lays out general overview of Operator Framework security practices both for development of Operator Framework as well as security of Operator Framework.

This document provides the CNCF TAG-Security with an initial understanding of Operator Framework
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
Operator Framework seeks graduation and is preparing for a security audit.


## Security functions and features

By focusing on the following security-relevant components and features, Operator Framework maintains a robust security posture, reducing potential vulnerabilities and threats to the platform on Kubernetes environments.

| Component | Applicability | Description of Importance |
| --------- | ------------- | ------------------------- |
| Operator SDK | Critical | Ensures the integrity and security of the underlying logic by restricting user modifications. Performs validation checks on the Operator's code, bundle, and catalog to prevent unauthorized changes and uphold the security posture of the Operator. |
| Operator Lifecycle Manager (OLM) | Critical | Enables users to specify desired states without direct intervention in OLM resolution logic. This separation of concerns enhances security by reducing the risk of user errors or malicious attempts to interfere with the reconciliation process.| 
| Operator Registry | Relevant | Automates the generation of manifests and indexes while restricting user access to modification of critical manifest generation/indexing logic. Implements validation checks on Operator bundles, ensuring error-free installations/updates and bolstering overall security. | 


### Security Measures for Operator Framework
| Security Aspect | Importance | Description of Importance |
| --------------- | ---------- | ------------------------- |
| Depolyment Configurations and Settings | High | Limited access to critical components fortifies security. Threat modeling includes potential attacks on communication channels, unauthorized data access, and tampering attempts with Operator logic or registry contents.|
| Access Controls and Validation Checks | High | Enforcing strict access controls and robust validation mechanisms prevents bypassing security checks and maintains integrity during the system's lifecycle. |
| Data Encryption and Masking | High |  Implementing encryption and masking for sensitive information safeguards data from unauthorized access, bolstering overall system security. |

## Project compliance

Not applicable.

## Secure development practices

### Development Pipeline
Operator SDK and Operator Lifecyle Manager do not inherently manage and consume user data. They are tools focused on managing Operators and applications in Kubernetes clusters. The respoinsibility for maintaining security and protection of user data falls onto the Operator creators and the users who use them. The Operator creators should always be using the Kubernetes Best Pratices listed further below. Similarly, users should always perform research beforehand to ensure the validity of the Operator and take measures towards protecting their own user data.

All Code is maintained in [Github](https://github.com/operator-framework) and changes are reviewed by maintainers
* The Source Code is visible in the Github
* Changes are submitted through Pull Requests
* Pull Requests automatically have checks performed
* Pull Requests are reviewed by maintainers
* Merges are performed after passing checks and review by maintainer
* Continuous integration and continuous deployment allows code to be automatically built, tested and deployed with each committed change, this is executed through Github Actions
* Backup and recovery is ensured using the version control aspect of a Github repository

Operators employ several techniques that ensure their security and integrity, most following the Kubernetes Best Practices
* Using Trusted Base images for building containers
* Limiting permissions to the minimum required
* Operators follow the principle of least privilege, ensuring that they only access the necessary resources with the least amount of permissions
* Operators use secure communication channels such as SSH between various components to prevent eavesdropping or mishandling of information
* Operators should employ a Role Based Access Control (RBAC) System to ensure that only the authorized users and services are allowed to perform actions in the Operator's lifecycle
* Operators are expected to use Kubernetes Secrets objects rather than hardcoding for sensitive data
* Regularly updating dependencies
* Training and awareness of users and maintainers
* Avoiding granting root privileges
* Configuring security contexts and monitoring logging

Further information about best practices can be found in [here](https://sdk.operatorframework.io/docs/best-practices/)

The security of external libraries and dependencies are ensured and monitored with the help of dependabot. Through the help of users opening issues and communitity keeping the dependencies updated. Dependabot automatically tracks and identifies outdated or vulnerable dependencies and is integrated into many platforms such as github. 

### Communication Channels

**Internal**
Team Members communicate with each other through [Operator Framework Google Groups](https://groups.google.com/g/operator-framework) and through [Github issues](https://github.com/operator-framework/operator-sdk/issues).

**Inbound**
Users communicate with the project maintainers through [Operator Framework Google Groups](https://groups.google.com/g/operator-framework), [Operator SDK Contributer Google Groups](https://groups.google.com/g/operator-framework-sdk-dev), [Operator OLM Contributer Google Groups](https://groups.google.com/g/operator-framework-olm-dev), through [Github issues](https://github.com/operator-framework/operator-sdk/issues), and the [#kubernetes-operators](https://kubernetes.slack.com/messages/kubernetes-operators) on the Kubernetes Slack.

**Outbound**
Team Members communicate with users through [Operator Framework Google Groups](https://groups.google.com/g/operator-framework).

### Ecosystem
Operator Framework plays an integral part in the Cloud Native Ecosystem. They promote the development and automation of specialized Operators for complex services and applications. They enhance many of Kubernetes basic features and account for the shortcomings as well.

They fulfill a special service of allowing for the development of Operators with familiar languages and libraries. This alone creates a large efficiency boost for the development team, which is increased even more when taking into the consideration the aforementioned automation aspects of Operator Framework.

## Security issue resolution

### Reporting a vulnerability
Security Vulnerabilities are handled by the Red Hat Product Security and can be reported by sending a mail to secalert@redhat.com.

The sent email will be read and acknowledged with a non-automated response within three working days. The security team requires several information like steps to reproduce, version number etc. which are available [here](https://access.redhat.com/security/team/contact).
### Creating an issue
Issues can be created at [opening an issue](https://github.com/operator-framework/operator-sdk/issues/new). More information about how to create an issue can be found [here](https://sdk.operatorframework.io/docs/contribution-guidelines/reporting-issues/).

Issues are tracked [here](https://github.com/operator-framework/operator-sdk/issues).
### Issue Lifecycle
#### Triage Meetings
Each week, there is a triage meeting to review new issues. Each issue that has been filed since the previous meeting is discussed, GitHub labels are applied, and the issue is added to a Milestone. Additionally, anyone can request that a previously triaged issue can be retriaged.
#### Grooming 
Following a release, there is a [grooming meeting](https://github.com/operator-framework/community#operator-sdk-grooming-meeting) to review issues that are desired in the next release. Issues are discussed in the following order:
* Issues in the next release milestone
* Issues labeled as priority/important-soon
* Issues in other milestones/backlog if specifically requested

### Addressing Threats and Vulnerabilities 
In the event of a security breach, depending on how critical the common vulnerabilities and exposures (CVE) is, the community works on opening relevant pull requests to address the vulnerability in the respective repositories. 

The Operator SDK repository contains a collection of addressed CVE issues. Shown [here](https://github.com/operator-framework/operator-sdk/issues?q=is%3Aissue+CVE+is%3Aclosed)

### Operator SDK response team
* Austin Macdonald (**[@asmacdo](https://github.com/asmacdo)**), Red Hat
* Jonathan Berkhahn (**[@jberkhahn](https://github.com/jberkhahn)**), IBM
* Ken Sipe (**[@kensipe](https://github.com/kensipe)**), Code Mentor
* Varsha Prasad Narsing (**[@varshaprasad96](https://github.com/varshaprasad96)**), Red Hat

The specific details about the timings of the meetings and communication channels are available [here](https://github.com/operator-framework/community#operator-sdk-working-group).


## Appendix

### Known Issues Over Time

All reported bugs, issues, and fixes can be viewed from [operator-framework/operator-sdk/issues repository](https://github.com/operator-framework/operator-sdk/issues). Security vulnerabilities are usually assigned a CVE number to them. All security issues can be tracked [here](https://github.com/operator-framework/operator-sdk/issues?q=CVE+in%3Atitle). A security relevant tag should be added to security related issues to ease querying, currently this label is absent.

Examples of some known security issues include:
- **upgrade mongo-go-driver for CVE-2021-20329 [#6450](https://github.com/operator-framework/operator-sdk/issues/6450)** This is a case where the operator-sdk was using a version of mongo-go-driver in which a vulnerability was found

- **CVE-2022-23648 CVE-2022-31030 github.com/containerd/containerd package [#6143](https://github.com/operator-framework/operator-sdk/issues/6143)** A security vuilnerability was found after a vulnerability scan on the Helm operator

- **Possible CVEs in openssl-libs found in quay.io/operator-framework/ansible-operator:v1.5.0 [#4755](https://github.com/operator-framework/operator-sdk/issues/4755)** Scan on ansible-operator image using [Trivy](https://github.com/aquasecurity/trivy/) revealed vulnerabilities in the openssl-libs package

- **CVE-2018-1098 found with operator-sdk v1.0 transitive dependencies [#4198](https://github.com/operator-framework/operator-sdk/issues/4198)** This CVE was caused by using a vulnerable version of Cobra and Viper in the operator-sdk

### CII Best Practices

The project has [not been documented](https://www.bestpractices.dev/en/projects) to have achieved the passing level criteria for CII best practices.

However, we have evaluated the project's current state of compliance in the file titled CII Best Practices.md. The criteria has been taken from this draft of the CII Best Practices. The summary is provided below:
Open Source Software Project Fundamentals: The Operator Framework complies with all fundamental criteria for open-source software projects, including the provision of a public website with a stable URL, the utilization of HTTPS for secure communication, and adherence to appropriate licensing requirements.
Change Management: The framework employs a publicly accessible, version-controlled source repository that meticulously records changes. It also embraces distributed version control systems, which is consistent with established best practices.
Issue Reporting Mechanisms: The project has established comprehensive mechanisms for reporting bugs and vulnerabilities. This includes the use of an issue tracker and the maintenance of a publicly accessible archive for reports, thereby ensuring transparency and accountability.
Code Quality Assurance: The current documentation does not conclusively indicate whether the project fulfills the criteria for static and dynamic code analysis to address vulnerabilities. Enhanced documentation is required to ascertain compliance in this area.
### Case Studies

The problem with finding specific case studies is that it is usually not *explicitly* documented when the project is built by the operator framework. Hence, we look at the applicability of the features provided by the operator framework through the lens of Prometheus and etcd operators:

- The primary application of this framework is often the creation of **custom resources**. The necessity of this feature is evidenced by the following examples:
    - The Prometheus Operator defines eight CRDs–for example, Prometheus, Alertmanager, and ServiceMonitor among others–which allow users to specify the desired monitoring stack state.
  - The etcd Operator on the other hand creates three CRDs–EtcdBackup, EtcdRestore, and EtcdCluster–to allow users to specify the desired state (size, version, backup policies and restore source) of the etcd clusters.

-   The Operator Framework also provides libraries and tools to streamline the implementation of the **operator's reconciliation logic**, i.e., define custom controllers for operands. This is evidenced by the etcd operator for example, which defines custom controllers for each of it's three CRDs.

- The **Operator Lifecycle Manager (OLM)** provides the means to bundle, distribute, and manage the operator and its dependencies. The likely use case for this is very intuitive:
    - An update of the etcd version is rolled out.
    - The OLM checks the CatalogSource and sees that a new ClusterServiceVersion (CSV) is available compared to the current installation.
    - The OLM schedules an upgrade in a way that does not cause data loss, according to the reconciliation logic provided by the etcd maintainers.


```
Dame, M. (2022). The Kubernetes Operator Framework Book. Packt Publishing. (Chapter 10: Case Study for Optional Operator - Prometheus Operator; Chapter 11: Case Study for Core Operator – Etcd Operator)
```

### Related Projects

- **Kubebuilder** is an SDK for creating Kubernetes APIs using CRDs and controllers, it is based on the controller-runtime library also used by the Operator SDK. The primary difference is that while the Kubebuilder focuses on building APIs and controllers, the Operator Framework provides additional tools for managing operator lifecycle and distributions. The Github repository is under active maintenance by the community.

- **Metacontroller** is a similar framework that enables users to build custom controllers in any programming language that is supported by the Kubernetes pods. This is because it does not use CRDs or controller-runtime, it rather relies on webhooks and custom resources to communicate with the API server. Similar to Kubebuilder, it does not provide resources for operator lifecycle management and distributions; and, it is not as actively maintained as the Operator Framework.

- **Crossplane** is more of a cloud focused tool, i.e., it manages connecting, consuming and provisioning cloud resources using CRDs and controllers. It also provides a package manager and container registry for the installation and distribution of controllers. The Github repository for Crossplane is under actively maintained.


## Recommendations
Recommendations to the Operator Framework Team.
### Threat Modeling With STRIDE

STRIDE-based threat model outlines potential threats and recommended mitigations for security considerations within  Operator Framework for Kubernetes projects. 

##### Threat-01-S - Spoofing of  Operator Framework Admin
* Description: The identity of the Operator Framework Admin can be spoofed due to stolen credentials or lack of authentication.
* Mitigations:
Implement authentication for Operator Framework Admin before processing requests.
Discard and log as a security event if authentication fails.

##### Threat-02-S - Spoofing of Operator Framework API-Server
* Description: A user could potentially interfere with a working cluster and impersonate as the Operator Framework API-Server, gaining unauthorized access.
* Mitigations:
Authenticate Operator Framework API-Server and working clusters before processing requests.
Discard and log as a security event if authentication fails.
Tampering

##### Threat-03-T - Tampering of Operator Framework Components
* Description: Operator Framework components and configuration files can be tampered during build, installation, or runtime.
* Mitigations:
Verify checksum value and signature during build and installation.
Alert and log on modification of components to detect tampering.

##### Threat-04-T - Tampering of Communication to Worker Cluster
* Description: Communication from Control Plane to Worker Cluster can be tampered during transit, allowing unauthorized modifications.
* Mitigations:
Verify integrity of commands received before processing.
Discard and log as a security event if integrity check fails. Rejection of access. 

##### Threat-05-R - Repudiation of Admin Actions
* Description: Actions performed by Operator Framework Admin should be detectable and logged for auditing purposes.
* Mitigations:
Implement auditing to log all actions performed by the Admin.
Implement centralized audit collection for suspicious activities.
Tracking Information Disclosure

##### Threat-06-I - Exposure of Communication between Control Plane and Worker Cluster
* Description: Snooping of communication exposes sensitive information between Control Plane and Worker Cluster.
* Mitigations:
Encrypt sensitive information during communication.

##### Threat-07-D - Exhausting Cloud Resources
* Description: Incessant requests within the network can make Worker Cluster unavailable.
* Mitigations:
Isolate the network of the Operator Framework environment.
Isolate Worker Cluster from users by elevation of privilege

##### Threat-08-E - Elevating Access to Control Plane via Worker Cluster
* Description: Compromising a Worker Cluster can potentially allow access to the Control Plane.
* Mitigations:
Implement separation of privileges between Control Plane and working Cluster.

##### Threat-09-E - Elevation of Access via Create Cluster Permission
* Description: Create Cluster permissions could lead to unauthorized elevated access.
* Mitigations:
Limit permissions for creating pods and pod security to prevent unauthorized access. 

