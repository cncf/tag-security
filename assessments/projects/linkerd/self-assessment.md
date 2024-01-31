# Linkerd Security Self-assessment

This assessment was created by community members as part of the [Security Pals](https://github.com/cncf/tag-security/issues/1102) process, and is currently pending changes from the maintainer team.


## Table of contents


- [Linkerd Security Self-assessment](#linkerd-security-self-assessment)
  - [Table of contents](#table-of-contents)
  - [Metadata](#metadata)
    - [Security links](#security-links)
  - [Overview](#overview)
    - [Background](#background)
    - [Actors](#actors)
    - [Actions](#actions)
    - [Goals](#goals)
    - [Non-goals](#non-goals)
  - [Self-assessment use](#self-assessment-use)
  - [Security functions and features](#security-functions-and-features)
    - [Critical](#critical)
    - [Security Relevant](#security-relevant)
  - [Project compliance](#project-compliance)
  - [Security and Vulnerability Management](#security-and-vulnerability-management)
    - [Vulnerability Reporting:](#vulnerability-reporting)
    - [Continuous Monitoring:](#continuous-monitoring)
    - [Coding Standards and Reviews:](#coding-standards-and-reviews)
  - [Secure development practices](#secure-development-practices)
    - [Development Pipeline](#development-pipeline)
    - [Communication Channels](#communication-channels)
    - [Ecosystem](#ecosystem)
  - [Appendix](#appendix)
    - [Known Issues Over Time](#known-issues-over-time)
    - [Core Infrastructure Initiative (CII) Best Practices](#core-infrastructure-initiative-cii-best-practices)
    - [Case Studies](#case-studies)
    - [Related Projects / Vendors](#related-projects--vendors)


## Metadata


|   |  |
| -- | -- |
| Assessment Stage | Incomplete | 
| Software | https://github.com/linkerd/linkerd2/tree/main |
| Security Provider | No |
| Languages | Go, Rust, JavaScript, Shell |
| SBOM | Linkerd does not currently generate SBOMs on release |
| | |


### Security links


| Doc | url |
| -- | -- |
| Security file | https://github.com/linkerd/linkerd2/blob/main/SECURITY.md |
| Default and optional configs | https://github.com/linkerd/linkerd2/blob/main/BUILD.md#development-configurations |


## Overview


Linkerd is a lightweight high-performance service mesh for Kubernetes. It is designed for simplicity and ease of use providing critical features like observability, reliability, and security. It is distinguished as a user-friendly yet powerful solution for modern cloud-native applications.


### Background


Linkerd is an open-source system for automating deployment, scaling, and managing of containerized applications. A service mesh is a layer of dedicated infrastructure that allows for service-to-service communications in a secure, fast, and reliable manner.


The primary issue that Linkerd addresses is the complexity involved in managing communication and network traffic between services in a kubernetes environment. It offers features such as load balancing, service discovery, routing, failure recovery, metrics, monitoring, and secures service communication. Once again Linkerd's focus on simplicity and performance sets it apart in the service mesh domain, hoping to add functionalities with minimal resource expenditure and complexity.


### Actors


**Data Plane**

This consists of lightweight proxies deployed alongside each service instance in a Kubernetes cluster. The proxies intercept and control all network communication between microservices. Thus isolation is achieved since each proxy instance is associated to a specific service, reducing the scope of possible compromises.


**Control Plane**

A set of services that Linkerd proxies interact with. The control plane is responsible for providing service discovery, configuration, and serving certificates for mTLS. Isolation is maintained since the plane operates separately from the data plane, which reduces the risk for a compromised proxy affecting the control system.


**Adminstrative Interface**

This interface includes CLI tools and a dashboard provided by Linkerd. These tools are typically controlled through Kubernetes Role Based Access Control once again isolating adminstrative functions from regular service operations.


### Actions


In the Linkerd service mesh, the key actions that provide its functionality, focusing on security aspects and interactions between different actors, can be summarized as follows:


**Service Discovery:** The control plane provides service discovery information to the data plane proxies. This ensures that microservices can locate and communicate with each other securely and efficiently.


**Traffic Management:** The data plane proxies manage and route traffic between services. This includes load balancing and intelligent routing based on predefined rules or policies.


**Security Enforcement:** Automatic mutual TLS is implemented for secure service-to-service communication. The control plane issues certificates to the data plane proxies, which are then used to encrypt and authenticate traffic.


**Observability:** The data plane proxies collect and report metrics on traffic, including success rates, latencies, and request volumes. This data is accessible through the administrative interface for monitoring and analysis.


**Configuration and Policy Enforcement:** Administrators use the administrative interface to configure policies and rules. The control plane distributes these configurations to the data plane proxies.


**Health Checks and Failover:** The system performs regular health checks of services and implements failover mechanisms to ensure high availability and reliability.


Each of these actions involves careful consideration of security, using isolation, encryption, and access controls to safeguard against unauthorized access and data breaches.


### Goals


The primary goals of the Linkerd project, including its security guarantees, are as follows:


**Secure Service-to-Service Communication:** Linkerd provides automatic mutual TLS to ensure that all communication between services is encrypted and authenticated, enhancing confidentiality and integrity.


**Enhanced Observability:** It aims to give clear visibility into service behavior, performance, and issues, offering detailed metrics and logs.


**Reliability and Resilience:** Linkerd ensures high availability of services through intelligent load balancing, routing, retries, and failovers.


**Simplified Network Operations:** The project is designed to simplify the complexity of managing microservices communications, making it more accessible for operators.


**Performance Efficiency:** Despite offering these features, Linkerd is built to be lightweight and have minimal impact on system performance.


**Open Source and Community-Driven:** As an open-source project, it emphasizes community contributions and transparency in development.


### Non-goals


For Linkerd, the non-goals, which a reader might mistakenly assume are in scope, include:


**Application-Level Security:** Linkerd does not handle application-level security such as input validation, user authentication within applications, or protection against application-specific vulnerabilities.


**Network-Level Security Beyond Service-to-Service Communication:** The focus of Linkerd is on securing internal service-to-service communication within a Kubernetes cluster, rather than providing broader network security solutions like firewalling or intrusion detection.


**Comprehensive Compliance Assurance:** While Linkerd enhances security, it does not guarantee compliance with all regulatory standards (e.g., PCI-DSS, GDPR) on its own.


**Management of Kubernetes Cluster Itself:** Linkerd does not manage Kubernetes cluster operations like node provisioning, cluster scaling, or Kubernetes version management.

## Self-assessment use

This self-assessment is created by [Amanda Gonzalez](https://github.com/amanda-gonzalez), [Dwireph Kamleshkumar Parmar](https://github.com/dwireph18), [Kaya Erol](https://github.com/shugo0016), and [Thaison Le](https://github.com/thaileaf), independent of the Linkerd team to perform an internal analysis of the project's security.  It is not intended to provide a security audit of Linkerd, or
function as an independent assessment or attestation of Linkerd's security health.

This document serves to provide Linkerd users with an initial understanding of
Linkerd's security, where to find existing security documentation, Linkerd plans for
security, and general overview of Linderd security practices, both for development of
Linkerd as well as security of Linkerd.

This document provides the CNCF TAG-Security with an initial understanding of Linkerd
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
Linkerd seeks graduation and is preparing for a security audit.

## Security functions and features

### Critical

**Data Plane**

The data plane is responsible for gathering metrics, observing traffic, and applying policy. It is comprised of sidecar proxies which intercept application network calls and implement rules and logic. Linkerd uses a service mesh specific Linkerd2-proxy, an ultra-light and transparent micro-proxy.

**Control Plane**

The control plane of a service mesh provides the command and control signals required for the data plane to operate. The control plane controls the data plane and provides the UI and API that operators use to configure, monitor, and operate the mesh. The control plane includes three components, destination and identity services and a proxy injector. The destination service fetches policy, discovery, and profile information on requests. The identity service implements mTLS (mutually-authenticated Transport Layer Security) by accepting CSRs and returning signed certificates. Lastly, the proxy injector is a Kubernetes admission controller mutator that adds containers to annotated pods. 

### Security Relevant
**CLI**

The CLI (optional) can be used to interact with the data and control planes. It is run on the local machine, outside of the Kubernetes cluster to interact with Linkerd. 

**Viz Extension**

To access on-stack metrics and CLI tools and dashboards, the viz extension must be installed. This extension installs the following components into the linkerd-viz namespace:

* a Prometheus instance
* metrics-api, tap, tap-injector, and web components

Metrics are stored transiently to limit resources.
The tap tool supports real time analysis of live traffic. This feature can potentially expose sensitive data such as request and response headers. The tap resource used Role-based access control (RBAC) authorization. This method regulates access to individual users within an organization based on their specified role. 

* RBAC API prevents privilege escalation by editing roles or role bindings
* wildcards in resource and verb entries could result in overly permissive access being granted to sensitive resources
* the principle of least privilege, in which minimal rights are applied to users and accounts, should be applied
* granting cluster-admin permissions to the "default" service account in the kube-system namespace contains Secrets that grant super-user access to your cluster's API
* granting super-user access to all service accounts cluster-wide allows any application full access to your cluster, and also grants any user with read access to Secrets (or the ability to create any pod) full access to your cluster


## Project compliance
Not Applicable.

## Security and Vulnerability Management

### Vulnerability Reporting: 

Responsible Disclosures Process: Linkerd has a responsible disclosure process for reporting security vulnerabilities. This process is designed to  ensure that vulnerabilities are handled in a timely and effective manner. The process can be found at linkerd2 GitHub security advisory - https://github.com/linkerd/linkerd2/blob/main/SECURITY.md. 

The maintainers will diagnose the severity of the issue and determine how to address the issue. In general, critical issues that affect Linkerd's security posture or that reduce its ability to provide security for users will receive immediate attention and be fixed as quickly as possible.

Issues that do not affect Linkerd's security posture and that don't reduce its ability to provide security for users may not be immediately addressed. For example, CVEs in underlying dependencies that don't actually affect Linkerd may not be immediately addressed.

Additional details can be found at https://github.com/linkerd/linkerd2/blob/main/SECURITY.md

### Continuous Monitoring: 

Linkerd achieves Continuous monitoring through its lightweight, performance-oriented proxy architecture. Which is fundamental for implementing security controls once again in a Kubernetes environment. The focus on minimizing the compute and operational footprint of each proxy, along with the use of Rust for enhanced security and performance, allows for a strong commitment to continuous monitoring, which is a key aspect of compliance with regulatory standards. 

### Coding Standards and Reviews:

Linkerd employs a structured Requested for Comment (RFC) process for contributions. This ensures any changes made align with the project goals and compliance standards. This process is inspired by best practices from successful open-source projects and includes thorough community review and discussion 
The process involves detailed code reviews, which emphasizes adherence to Linkerd’s design principles and coding standards. This approach guarantees that the project remains compliant with industry best practices in software development. 


Linkerd’s implementation of mutual TLS, its approach to authorization policy enforcement, and the use of the zero trust model where the proxy in each pod acts as an enforcement point for network access, aligns with the “enforce everywhere, every time” directive of zero trust security. This approach is indicative of Linkerd’s commitment to best practices and standards in security and compliance specifically in cloud and Kubernetes environments. 


## Secure development practices

### Development Pipeline 

In order to commit to the Linkerd development you have to agree to the Developer Certificate of Origin for each and every commit simply stating you have a legal right to make the contribuition. Linkerd offers 3 ways of doing this Option 1 is to write a git commit message: "Signed-off-by: Jane Smith <jane.smith@example.com>". Option 2: would be a public statement by leaving a comment on the PR with the statement: "I agree to the DCO for all the commits in this PR." Option 3: Linkerd does not require DCO signoff for small changes such as spelling mistakes or one word changes. 

Whenever a pull request is submitted the branch will only be merged when all the configured checks are passed. These include passing the tests in CL, and getting a review from the appropiate Maintainers of Linkerd which are all listed here https://github.com/linkerd/linkerd2/blob/main/MAINTAINERS.md 

Ideally Maintainers usually make decisions by consensus. However, if this is not possible a vote can be called where each maintainer gets a vote and majority win. 

The tests that are included in the Linkerd repo are mostly run through CI, There are multiple different types of tests that include Unit Tests for Go, Javascript, and Shell, ensuring all individual components are functioning correctly. Integration Tests which verify different parts of the application are working together efficiently. Scale tests to check the system under high load conditions. As well as Cloud Provider Tests which ensure compatibility and performance across different cloud environments.   

Linkered uses Buoyant Cloud SaaS automation which provides health monitoring and vulnerability reporting for every Linkerd Cluster. This includes upgrade assistance, which in turn ensures reliability and security of service mesh deployments for all Kubernetes users. 

In the Linkered CI process Linkerd plans to use SNYK which is a tool used to detect and address vulnerabilities in Go dependencies. This will help identify and resolve vulnerabilities in security early in the development process.

The release process of Linkerd goes as follows: 
1. Bump the proxy version
2. Creating branches for minor and major releases 
3. Cherry-picking changes, updating Helm chart verisons, and release notes
4. Managing pull requests and image publishing for testing 
5. Creating release tages and initiating CI workflows
6. Post-release tasks like verification, announcements, and website updates

### Communication Channels 

  * Internal: 
    1. Slack: Linkerd members most likely use slack to communicate between members. 
    2. Github: Collaborative development is done on the github repo, commit messages, issue tracking, and code reviews are all there for members to communicate.
  * Inbound: 
    1. Linkerd Slack: Users can have live conversations and ask quick questions on the workspace. (https://slack.linkerd.io/)
    2. Github Issues: If users want to contribute to the project they can go to the issue marked "help wanted" (https://github.com/linkerd/linkerd2/labels/help%20wanted)
    3. Buoyant's Linkerd Forum: Helps users with troubleshooting, technical questions, and longer-form discussions (https://linkerd.buoyant.io/)
    4. CNCF Linkerd mailing: Users can write emails and reach out for help. (cncf-linkerd-users+help@lists.cncf.io)
  * Outbound: 
    1. Linkered email: Users can sign up to recieve notificatios from linkerd using the following address to sign up (cncf-linkerd-users+subscribe@lists.cncf.io)
    2. Twitter: Users can follow the linkerd twitter account to hear about upcoming events and milestones as well as other new details. (https://twitter.com/Linkerd)
    3. Slack: Announcements are made on the linkerd slack channel

### Ecosystem

  Linkerd fits into the cloud native ecosystem primarily as a service mesh. It offers essential features like load balancing, service discovery, routing, failure handling, and observability for cloud-native applications, primarily those based on Kubernetes
  Some of the keys parts of how Linkerd integrates with the cloud native ecosystem include: 
  1. Kubernetes Native: Linkered is designed primarily for Kubernetes enchacing its networking capabilities. 
  2. CNCF Project: As a part of the Cloud Native Computing Foundation, it aligns with their principles and practices which include Minimum viable Governance, Flexible Governance model, Project Mangement by Mainterners, Neutrality and Open SOurce Community Health. 

## Appendix

### Known Issues Over Time
Linkerd has maintained a robust track record in addressing and resolving issues promptly. The project's commitment to transparency is evident in its detailed reporting and timely resolutions. For a comprehensive list of past vulnerabilities and their respective resolutions, please refer to the Linkerd Security Advisories.

### Core Infrastructure Initiative (CII) Best Practices

The Linkerd project is actively aligning itself with the Core Infrastructure Initiative (CII) best practices. To obtain the CII Best Practices badge, the project is currently implementing and refining processes in areas such as security, documentation, and community engagement. For the latest status and details, please visit the CII Best Practices Program.

Linkerd recieved a passing score in 2017: [![OpenSSF Best Practices](https://www.bestpractices.dev/projects/1445/badge)](https://www.bestpractices.dev/projects/1445)

In 2021, they recieved a passing score for Linkerd2: [![OpenSSF Best Practices](https://www.bestpractices.dev/projects/4629/badge)](https://www.bestpractices.dev/projects/4629)

Linkerd’s implementation of mutual TLS, its approach to authorization policy enforcement, and the use of the zero trust model where the proxy in each pod acts as an enforcement point for network access, aligns with the “enforce everywhere, every time” directive of zero trust security. This approach is indicative of Linkerd’s commitment to best practices and standards in security and compliance specifically in cloud and Kubernetes environments. 

### Case Studies
**Scenario 1: Microservices Resilience**

One of Linkerd's strengths lies in enhancing microservices resilience. Company X, faced with the challenges of ensuring reliability in their microservices architecture, adopted Linkerd to manage service-to-service communication seamlessly. The implementation resulted in improved fault tolerance and reduced latency, providing a robust foundation for their distributed systems.

**Scenario 2: Cloud-Native Migration**

In a real-world scenario, Organization Y successfully migrated its monolithic application to a cloud-native architecture. Linkerd played a crucial role in simplifying the transition by providing transparent communication between microservices, efficient load balancing, and comprehensive observability. This case highlights Linkerd's versatility in supporting complex migration strategies.

### Related Projects / Vendors
Prospective users often inquire about the differences between Linkerd and alternative projects or vendors. Here are some key distinctions:

**[Istio:](https://istio.io/latest/about/service-mesh/)** Istio was started by Google and IBM, with an Envoy proxy to manage ingress and egress traffic, leveraging some differences with Linkerd. But while both Linkerd and Istio address service mesh functionality, Linkerd is known for its lightweight design and simplicity, making it an excellent choice for organizations seeking a streamlined service mesh solution. Documentation for getting started with an Istio service mesh can be found [here](https://istio.io/latest/docs/setup/getting-started/).

**[Consul Connect:](https://developer.hashicorp.com/consul/docs/connect)** Linkerd differentiates itself by focusing on the data plane, providing dedicated solutions for service communication. Consul Connect, on the other hand, offers a broader spectrum of features beyond service mesh, including service discovery and configuration management. More information about starting with Consul Connect can be found [here](https://developer.hashicorp.com/consul/tutorials/kubernetes-deploy/service-mesh?utm_source=docs).

