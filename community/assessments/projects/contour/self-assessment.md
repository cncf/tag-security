# Contour Self-assessment

This assessment was created by community members as part of the [Security Pals](https://github.com/cncf/tag-security/issues/1102) process and is currently pending changes from the maintainer team.

#### Contributors
| Contributor | GitHub ID | Affiliation |
| --------------- | --------- | ----------- |
| Justin Rivera | [jriv01](https://github.com/jriv01) | NYU |
| Esther Wang | [estherwng](https://github.com/estherwng) | NYU |
| Heejin Jang | [hj2118](https://github.com/hj2118) | NYU |
| Samuel Vieira Restrepo | [SamuelVRPO](https://github.com/SamuelVRPO)| NYU |

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
| Software | https://github.com/projectcontour/contour |
| Security Provider | No |
| Languages | Go |
| SBOM | Contour does not currently produce an SBOM at build time |
| | |

### Security links

| Doc | url |
| -- | -- |
| Security file | https://github.com/projectcontour/contour/blob/main/SECURITY.md |
| Default and optional configs | [Contour configuration](https://github.com/projectcontour/contour/blob/main/internal/contourconfig/contourconfiguration.go) <br /> https://projectcontour.io/docs/1.27/  |

## Overview

Contour is a Kubernetes ingress control providing the control plane for the Envoy edge and service proxy. Contour supports dynamic configuration updates and multi-team ingress-delegation out of the box, while maintaining a lightweight profile.

### Background

As an ingress controller, Contour manages incoming traffic for services hosted via Kubernetes clusters. Built on Envoy, an intermediary edge proxy between clients and services, Contour provides functionalities to route traffic to the appropriate services based on defined rules. 

While Kubernetes already has base resources for ingress control, Contour utilizes those resources and extends Kubernetes’ capabilities for managing external access to services running within a cluster.

### Actors

**Directed Acyclic Graph (DAG)**
Contour builds a DAG in memory, which represents the routing topology for the controller. Within the DAG, explicit rules can be set regarding how incoming requests should be handled or routed to different services. The DAG is constructed based upon Kubernetes Ingress objects.

**xDS Server (gRPC)**
An xDS Server is exposed to provide functionality and communication between Contour and Envoy. The xDS server knows everything that Contour does about the cluster's config, including the name & values of all secrets relative to ingress configuration.

**HTTPProxy**
A Custom Resource Definition (CRD) introduced by Contour to enhance and extend the functionality of the Ingress API.

>While **Envoy** and **Kubernetes** are technically not considered internal actors within the Contour system, they are worth mentioning as they provide more context for the functionality of Contour. 
>
>_Envoy_ serves as the data plane for Contour, handling the actual forwarding and processing of network traffic based on the configuration provided by the Contour control plane.
>
>_Kubernetes_ provides the deployment platform for Contour.

### Actions
_HTTPProxy Usage_
Kubernetes objects may be translated into corresponded HTTPProxy objects for extended functionality. These objects are then served to the in-memory DAG to construct a more complex and hierarchical set of routing definitions.

_Information Translation_
In order for Envoy to make use of any Ingress data, Kubernetes Ingress objects must be mapped and translated into corresponding and valid Envoy objects. Between the DAG and xDS Server, Contour translates Kubernetes object information into an appropriate format to be used between the xDS Server and Envoy. 

_Configuration Updates_
At any point, routing and ingress rules configured within the DAG may be changed and updated. The xDS Server must also reflect these changes to ensure that any action requiring data translation between the two actors still yields a correct and reliable result.

_Deployment_
For Contour to serve as an ingress controller it must be deployed along with Envoy, the external actor, as separate containers in Kubernetes. Contour is a client of the Kubernetes API and watches it utilizing controller-runtime primitives. In the Envoy Pods, Contour runs as an init container and writes the configuration to a temporary volume. After initialization is complete, the Envoy container starts and retrieves the bootstrap configuration written by Contour.

_Request Handling_
When a request is sent, first it is routed by a load-balancer to an instance of Envoy. The Envoy proxy then sends the request to a Contour pod.

![Contour Actors & Relationships](https://i.imgur.com/MRcBGa6.png)

### Goals
Contour serves as a Layer 7 HTTP middleware reverse proxy for enabling ingress to Kubernetes clusters. Contour aims to support dynamic configuration updates easily while maintaining a lightweight profile. Contour also introduces a new ingress API HTTPProxy implemented via a Custom Resource Definition (CRD). It aims to allow for a richer user experience and solve shortcomings in the original design of Ingress API.

### Non-goals
Contour is not a service mesh, nor is the intention for Contour to expose all of the features or configuration options of Envoy. 
Contour is not intended for proxying layer 4 protocols such as TCP or UDP except when needed to deliver HTTP.
TCP proxying is available but expects the proxying to be passed through HTTPS. 
Using Contour to proxy raw TCP or UDP traffic may work, but is not the intended usage.

## Self-assessment use

This self-assessment is created by the Contour team + external affiliates to perform an internal analysis of the project's security. It is not intended to provide a security audit of Contour, or function as an independent assessment or attestation of Contour's security health.

This document serves to provide Contour users with an initial understanding of
Contour's security, where to find existing security documentation, Contour plans for
security, and general overview of Contour security practices, both for development of
Contour as well as security of Contour.

This document provides the CNCF TAG-Security with an initial understanding of Contour
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
Contour seeks graduation and is preparing for a security audit.

## Security functions and features

* Critical
  * xDS server – Functions as a control plane for Envoy. The xDS server knows all the secrets that Contour knows, so Contour requires a mutual TLS authentication between Contour and Envoy such that another cluster cannot simply connect to the xDS server and collect all the known secrets.
* Security Relevant
  * Federal Information Processing Standard (FIPS) 140-2 – FIPS describes United States government approved secuirty requirements for cryptographib modules. Software validated by an accredited Crpytographic Module Validation Program (CVMP) labortory is suitable for use in applications for US governmental departments or industries subjected to US Federnal regulations. Contour is not FIPS validated but can be built and configured to the standards FIPS 140-2 establishes.

## Project compliance

* Compliance
  * Project Contour currently does not have FIPS compliance as the application needs to be tested by a CVMP labatory. However, the projectcontour/contour container image can be compiled and linked to BoringCrypto for FIPS compliance.

## Secure development practices

* Development Pipeline - Contour utilizes GitHub issues, labels, and code reviews for secure open source development.
  <br>
  > A detailed description of secure development practices can be found at https://projectcontour.io/resources/how-we-work/.

  > Information on unit testing  and commit + pull request guidelines can be found at https://github.com/projectcontour/contour/blob/main/CONTRIBUTING.md/.

  When GitHub issues are created and being worked on, the contributor assigned to the issue is responsible for giving regular status reports on the issue. Additionally, contributors should not work on issues that they are not assigned to, horde multiple issues, or assign issues to others without communicating first. Each of these practices ensure that issues are well tracked and understood as to avoid a decline in productivity and security.
  GitHub issues should also be labeled, as appropriate labels make it much easier for an issue to be assessed at any given time. 

  There are also code reviews, where a reviewer can review and make comments on a contributor’s code. 
  Before fixing any bug, a test must be written to show that the bug was fixed. Similarly, tests must be written for new features to prevent a future developer from accidentally breaking it down the line.

  <br>

  To ensure a secure development pipeline, there are also some standards for commits and pull requests made to the Project Contour repository to adhere to, which are detailed in the [contributing doc](https://github.com/projectcontour/contour/blob/main/CONTRIBUTING.md) within the repository. This document also identifies major tests that may ran against builds of Contour made by a contributor.

  Pull requests made to the Project Contour repository also employ automatic checks to enforce branch protection. A list of branch protection rules can be found on this [sample pull request](https://github.com/projectcontour/contour/pull/6012/checks) made to the Contour repository.

  <br>

  **Some of these checks include:**
  * Check if each commit is signed
  * Check that an appropriate label was assigned to the PR
  * Code scanning
  * Build and test the incoming PR 

  <br>
* Communication Channels
  * Internal - [Twitter](https://twitter.com/projectcontour), [Slack](https://kubernetes.slack.com/messages/contour), [RSS](https://projectcontour.io/docs/v1.10.0/), [GitHub](https://github.com/projectcontour/contour)
  * Inbound
    * Users can join the Contour channel in the Kubernetes Slack
    * Users can also open issues on the Project Contour GitHub to get help from the team
    * Additionally, users can email the Contour private email address for more sensitive issues, such as a security vulnerability
    * Contour community meetings via Zoom – users can ask questions to the team
  * Outbound
    * The Contour team sends updates to the community via the Contour Slack channel
    * Additionally, Contour updates are posted to the @projectcontour Twitter
    * Contour news, release notifications, and invitations to community meetings are sent out via the Project Contour Users mailing list
    * Contour community meetings via Zoom – the team can distribute information to users
* Ecosystem
  * Contour is a Kubernetes ingress controller that is designed to work seamlessly within the cloud-native ecosystem, particularly with Kubernetes clusters. It can quickly deploy cloud-native applications using the flexible and innovative HTTPProxy API

## Security issue resolution

* Responsible Disclosures Process
  * If a security issue or vulnerability is suspected, it should be reported to cncf-contour-maintainers@lists.cncf.io immediately
  * Early disclosure regarding the vulnerability will be emailed to users via the Contour Distributing mailing list, to allow for planning for the vulnerability patch ahead of its release
  * As for public disclosure, a date is negotiated by the Contour Security Team, the bug submitter, and the distributors list. The bug will be fully disclosed as soon as a viable user mitigation or patch is available. Disclosure may be delayed if the fix is not fully understood, the solution is not well-tested, or for distributor coordination. The Contour Security Team holds the final say when setting a public disclosure date.
  * When a public disclosure is made, the Security Team publishes a public advisory to the Contour community via GitHub. Additional communication via Slack, Twitter, and other channels will be utilized as well.

* Vulnerability Response Process
  * To report a vulnerability, an email must be sent to the Contour private email address and contain details of the vulnerability. The email must contain basic identification, detailed steps on how to reproduce the vulnerability, a description of the effects of the vulnerability, how the vulnerability affects Contour usage, and a list of other projects that were used in conjunction to produce the vulnerability.
  * When a vulnerability is reported, the Contour Security Team is responsible for responding. Emails will be addressed within 3 business days and include a detailed plan to investigate the issue and any potential workarounds to perform in the meantime.
  * The Security Team will investigate the idetified vulnerability by releasing a security advisory to first assist if it is a vunerability. If it is not deemed to be a vulnerability, the Team will follow up with a detailed reason to reject the vulnerability. Otherwise, the Security Team will work on a plan to communicate and identify mitigating steps to protect users. Additionally, a Common Vulnerability Scoring System (CVSS) will be created using the CVSS calculator.

* Incident Response 
  * The Security Team will work on fixing the vulnerability and perform internal testing.
  * The Security Team will provide early disclosure of the vulnerbility via email to those who joined the Contour Distributors mailing list. Distributors can initially plan for the vulnerability patch ahead of the fix, and later can test the fix and provide feedback to the Contour team.
  * The Security Team will patch the vulnerability in the next patch or minor release, once the fix is confirmed. The Team will then backport a patch release into all earlier supported releases.

## Appendix

* Known Issues Over Time
  * ExternalName Services can be used to gain access to Envoy's admin interface
    * https://github.com/projectcontour/contour/security/advisories/GHSA-5ph6-qq5x-7jwc
    * Severity: High (8.5/10)
    * Affected versions: all versions <= 1.16, 1.17.0
    * Patched versions: v1.14.2, 1.15.2, 1.16.1, 1.17.1, 1.18.0 and up
    * Statistics
      * Attack vector:        Network
      * Attack complexity:    Low
      * Privileges required:  Low
      * User interaction:     None
      * Scope:                Changed
      * Confidentiality:      Low
      * Integrity:            None
      * Availability:         High

  * Ingress data plane (Envoy deployment) is vulnerable to DOS
    * https://github.com/projectcontour/contour/security/advisories/GHSA-mjp8-x484-pm3r
    * Severity: High
    * Affected versions: 1.2.*-1.6.*
    * Patched versions: 1.7

* [CII Best Practices](https://www.coreinfrastructure.org/programs/best-practices-program/)
  * Contour has achieved an OpenSSF best practices badge at passing level, see more details at [Contour's openssf best practices](https://www.bestpractices.dev/en/projects/4141).

* Case Studies
  * **A [variety of organizations](https://projectcontour.io/resources/adopters/) adopt Contour and utilize it as a component in their products:**

    * [Knative](https://knative.dev/docs/) – Knative uses Contour to serve all incoming traffic via the net-contour ingress Gateway, enabling Contour to satisfy the networking needs of Knative Serving by bridging KIngress resources to Contour’s HTTPProxy resources.


    * [VMware](https://tanzu.vmware.com/tanzu) – VMware Tanzu is a cloud native application platform that is designed to accelerate development & operations across multiple clouds. With Kubernetes at its core, Contour is utilized as the platform's ingress controller. By using Contour, among other open source projects, VMware has been able to provide products with flexibility & a range of capabilities that are desired by customers

    * [Gojek](https://www.gojek.io/) – The Gojek apps provides many mobile services to users, such as ordering dinner, buying tickets, accessing their wallet, and much more.


      With the app providing all of these services, terabytes of data are processed per day. Kubernetes is being used the the organization’s production environment, and Contour has enabled all of the organization’s kubernetes clusters to sufficiently handle incoming traffic for all their services

    * [DaoCloud](https://daocloud.io/) – DaoCloud is committed to creating an open Cloud OS which enables enterprises to easily carry out digital transformation.

      DaoCloud’s Next Generation Microservices Gateway is based on Contour. Additionally, DaoCloud often contributes deeply to the Contour Community.


* Related Projects / Vendors
  * There are many other projects that function as Kubernetes ingress controllers aside from Contour. Of  these projects, there are a number that are most similar to Contour as they are also based on Envoy. These projects are:
    * Emissary-Ingress
      * https://www.getambassador.io/products/api-gateway 
      * An Envoy-based ingress controller
      * Contour uses the HTTPProxy for routing and configuring backend access which allows centralized control, whereas Emissary-Ingress uses a Mapping allowing decentralized control.
    * EnRoute 
      * https://www.getenroute.io/ 
      * An Envoy based API gateway that can run as an ingress controller
      * It is a standalone docker gateway, configured using REST or GraphQL.
    * Gloo Edge
      * https://docs.solo.io/gloo-edge/latest/ 
      * An open-source ingress controller based on Envoy, which offers API gateway functionality
      * Gloo Edge allows function-level routing, which allows routing to serverless functions as well as microservices.
    * Higress
      * https://github.com/alibaba/higress 
      * An Envoy based API gateway that can run as an ingress controller
      * Higress supports both Kubernetes and non-Kubernetes environments.
    * Kusk Gateway 
      * https://kusk.io/ 
      * An OpenAPI-driven ingress controller based on Envoy
      * It focuses on the use of OpenAPI specifications.
