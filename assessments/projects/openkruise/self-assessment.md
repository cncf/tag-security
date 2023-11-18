# OpenKruise Self-assessment

The Self-assessment is the initial document for projects to begin thinking
about the security of the project, determining gaps in their security, and
preparing any security documentation for their users. This document is ideal
for projects currently in the CNCF **sandbox** as well as projects that are
looking to receive a joint assessment and currently in CNCF **incubation**.

For a detailed guide with step-by-step discussion and examples, check out the free Express Learning course provided by Linux Foundation Training & Certification:
[Security Assessments for Open Source Projects](https://training.linuxfoundation.org/express-learning/security-self-assessments-for-open-source-projects-lfel1005/).

# Self-assessment outline

## Table of contents

- [Metadata](#metadata)
  - [Security links](#security-links)
- [Overview](#overview)
  - [Actors](#actors)
  - [Actions](#actions)
  - [Background](#background)
  - [Goals](#goals)
  - [Non-goals](#non-goals)
- [Self-assessment use](#self-assessment-use)
- [Security functions and features](#security-functions-and-features)
- [Project compliance](#project-compliance)
- [Secure development practices](#secure-development-practices)
- [Security issue resolution](#security-issue-resolution)
- [Appendix](#appendix)

## Metadata

A table at the top for quick reference information, later used for indexing.

|                   |                                                                                                                                                                              |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Software          | https://github.com/openkruise/kruise                                                                                                                                         |
| Security Provider | No. OpenKruise is an extended component suite for Kubernetes, which mainly focuses on application automations, such as deployment, upgrade, ops and availability protection. |
| Languages         | [Go](https://go.dev/)                                                                                                                                                        |
| SBOM              | Software bill of materials. https://github.com/openkruise/kruise/blob/master/go.mod, https://github.com/openkruise/kruise/blob/master/tools/src/kind/go.mod                  |
|                   |                                                                                                                                                                              |

### Security links

Provide the list of links to existing security documentation for the project.
You may use the table below as an example:

| Doc           | url                         |
|---------------|-----------------------------|
| Official site | https://openkruise.io/      |
| Documentation | https://openkruise.io/docs/ |

## Overview

OpenKruise is an open-source project that focuses on extending the capabilities
of Kubernetes. It provides a set of custom controllers and tools to enhance and
simplify application lifecycle management on Kubernetes clusters.

OpenKruise aims to address various aspects of application management, including
rolling updates, canary releases, blue-green deployments, and more. It is
designed to help users automate and manage the deployment and scaling of
applications on Kubernetes with additional features beyond the standard
Kubernetes functionality

### Background

Kubernetes is an open-source platform for declaratively configuring and
automating containerized applications, which are referred to as workloads and
services. While Kubernetes provides some has features for deployment and
management of applications, it's not considered enough by many who aim to do
this in large-scale production clusters.

> OpenKruise is an extended component suite for Kubernetes, which mainly
> focuses on automated management of large-scale applications, such
> as *deployment, upgrade, ops and availability protection*.

A Kubernetes cluster is split into two main components, Control Plane
Components which make global decisions about the cluster and Node Components
which manage Pods and provide the runtime environment. OpenKruise is a set of
additional components that extend the Kubernetes API to support advanced use
cases. In-place Update is one of the key features for updating of images on
Pods. Other key features are Advanced Workloads, Bypass Application Management,
High-availability protection, and High-level operation features.

Most features developed by OpenKruise are based on CRD extensions. This is the
recommended way of extending functionality and doesn't require additional
dependencies. With Custom Resource Definitions (CRD) you can create new
resource types without adding a new API Server.

<figure>
<img src="https://openkruise.io/assets/images/architecture-08f2cb3a5b19c102412f9df77b365eef.png" alt="image" />
<figcaption aria-hidden="true">
The overall architecture of OpenKruise
</figcaption>
</figure>

### Actors

- `kruise-operator`
  - `kubectl-kruise`
  - Golang and Java clients
- `kruise-manager`
  - `kruise-controller`
  - `kruise-webhook`
- `kruise-daemon`
- `kube-apiserver`
- `kubelet`
- Pods and containers

#### `kruise-operator`

The operator is the person administrating or operating the system. This person
has authorization to access the OpenKruise system and perform actions. The
operator interacts with OpenKruise using the CLI or client SDK.

#### `krusie-manager`

This is a control plane component that runs controllers and webhooks.
Logically, each controller is a separate process but to reduce complexity they
are compiled into the same binary running on the API server. It consists of a
`kruise-controller` and `kruise-webhook`.

- `kruise-controller` - Responsible for checking the that the configuration is
  in the desiredstate based on the user-configuration. It checks the resources
  across all of the nodes and ensures they are up-to-date.

- `kruise-webhook` - Used for admission control. It intercepts and validates
  requests coming from the `kruise-operator`. The `kruise-webhook-service` is
  important for calling the `kube-apiserver`.

#### `kruise-daemon`

This runs on every node and manages things like image pre-download and
container restarting. It interacts with the `kruise-manager` indirectly by
calling the API Server which calls through.

#### `kube-apiserver`

The Kubernetes API server validates and configures data for the api objects.
This include pods, services, replicationcontrollers, and other things. It
provides the frontend to the clusters shared state.

#### `kubelet`

The `kubelet` runs on each node. It's the primary "node-agent" that can register
the node with the apiserver so that pods on that node can be managed.

### Actions

These are the steps that a project performs in order to provide some service
or functionality. These steps are performed by different actors in the system.
Note, that an action need not be overly descriptive at the function call level.
It is sufficient to focus on the security checks performed, use of sensitive
data, and interactions between actors to perform an action.

For example, the access server receives the client request, checks the format,
validates that the request corresponds to a file the client is authorized to
access, and then returns a token to the client. The client then transmits that
token to the file server, which, after confirming its validity, returns the file.

#### Operator based action

One of the possible ways of interacting with the system are if a
`kruise-operator` takes a manual action to administer some part of the system
by using the CLI or a client SDK.

##### Actors

- `kruise-operator` - The person administrating or operating the system
- `kubectl-kruise` - Allows user to interact with OpenKruise resources
- `kruise-manager` - Processes user requests and oversees operations
- `kruise-daemon` - Performs tasks at node level and monitors status of nodes

##### Workflow

1.  `kruise-operator` executes `kubctl-kruise` to initiate manual action
    1.  Examples of manual action are expose, scale, and rollout
2.  `kubctl-kruise` calls the `kruise-manager` which is part of the Control Plane
3.  `kruise-daemon` calls the `kruise-manager` through the `kube-apiserver`
4.  `kruise-daemon` executes an operation on the node
    1.  Example include pre-image download and container restarting

#### InPlace Update

In-place update is a feature of OpenKruise that allows you to update the image
of a container in a Pod without having to recreate the Pod. This can save time
and resources, as it avoids the need to schedule a new Pod, allocate an IP
address, and mount volumes. In-place update is also faster than recreating a
Pod, as it can reuse the image layers that are already pulled on the node.

##### Actors

- `kruise-manager` - Processes user requests and oversees operations
- `kruise-daemon` - Performs tasks at node level and monitors status of nodes
- `kublet` - Runs on each node and can register the node with the apiserver

##### Workflow

1.  `kruise-manager` starts to update a pod
2.  `kruise-manager` updates the changed fields in the pod
3.  `kubelet` or `kruise-daemon` stops the old container
4.  `kubelet` pulls the image, creates, and starts new container
5.  `kruise-manager` updates local conditions for `InPlaceUpdate`
6.  `kubelet` update Pod Status to be ready

#### Declarative configuration

Kubernetes handles Custom Resource Definitions by default. For each component
we want to add from OpenKruise a CRD in the form of a yaml file is specified
with a particular kind and different settings pertaining to that service. Since
handling these definition are part of Kubernetes, they should not be considered
as an action for OpenKruise.

### Goals

#### General

- OpenKruise plays a complementary role to Kubernetes
- Most features work on Kubernetes clusters without any other dependencies
- Provide **Advanced Workloads** which extend basic, default Workloads
- **Decoupled Application Management** to manage apps without modifying Workloads
  - Provide reliable In-Place update for updating existing Pod images
- **High-availability Protection** provides extended ways of protecting availability
- OpenKruise simplifies sidecar injection and enables sidecar In-Place update.
  OpenKruise also enhances the sidecar startup and termination control.
- Multi-domain Management: This can help you manage applications over nodes
  with multiple domains, such as different node pools, available zones,
  architectures (x86 & arm) or node types (kubelet and virtual kubelet)

#### Security

- OpenKruise components should be protected and robust against tampering
- Authenticating and authorizing access OpenKruise to control plane components
- Protect the OpenKruise control plane from being compromised

### Non-goals

#### General

- OpenKruise is **not** a PaaS and it will **not** provide any abilities of PaaS
- Providing ways of managing containers without Kubernetes
- Replacement for kubernetes: OpenKruise is not intended as a means to replace
  kubernetes, rather it is an extension to Kubernetes providing extra features
  on top.
- Standardization of deployment strategies: OpenKruise introduces several
  advanced deployment strategies, it does not aim to standardize these
  strategies across Kubernetes cluster. Users are free to manipulate the
  strategy based on their needs.

#### Security

- OpenKruise doesn't provide additional security for Kubernetes
- No guarantee of security when an attacker has compromised the system

## Self-assessment use

This self-assessment is created by the \[project\] team to perform an internal
analysis of the project's security. It is not intended to provide a security
audit of \[project\], or function as an independent assessment or attestation
of \[project\]'s security health.

This document serves to provide \[project\] users with an initial understanding
of \[project\]'s security, where to find existing security documentation,
\[project\] plans for security, and general overview of \[project\] security
practices, both for development of \[project\] as well as security of
\[project\].

This document provides the CNCF TAG-Security with an initial understanding of
\[project\] to assist in a joint-assessment, necessary for projects under
incubation. Taken together, this document and the joint-assessment serve as a
cornerstone for if and when \[project\] seeks graduation and is preparing for a
security audit.

## Security functions and features

- Critical. A listing critical security components of the project with a brief
  description of their importance. It is recommended these be used for threat
  modeling. These are considered critical design elements that make the product
  itself secure and are not configurable. Projects are encouraged to track
  these as primary impact items for changes to the project.
- Security Relevant. A listing of security relevant components of the project
  with brief description. These are considered important to enhance the overall
  security of the project, such as deployment configurations, settings, etc.
  These should also be included in threat modeling.

## Project compliance

- Compliance. List any security standards or sub-sections the project is
  already documented as meeting (PCI-DSS, COBIT, ISO, GDPR, etc.).

## Secure development practices

- Development Pipeline. A description of the testing and assessment processes
  that the software undergoes as it is developed and built. Be sure to include
  specific information such as if contributors are required to sign commits, if
  any container images immutable and signed, how many reviewers before merging,
  any automated checks for vulnerabilities, etc.
- Communication Channels. Reference where you document how to reach your team
  or describe in corresponding section.
  - Internal. How do team members communicate with each other?
  - Inbound. How do users or prospective users communicate with the team?
  - Outbound. How do you communicate with your users? (e.g. flibble-announce@
    mailing list)
- Ecosystem. How does your software fit into the cloud native ecosystem? (e.g.
  Flibber is integrated with both Flocker and Noodles which covers
  virtualization for 80% of cloud users. So, our small number of "users"
  actually represents very wide usage across the ecosystem since every virtual
  instance uses Flibber encryption by default.)

## Security issue resolution

- Responsible Disclosures Process. A outline of the project's responsible
  disclosures process should suspected security issues, incidents, or
  vulnerabilities be discovered both external and internal to the project. The
  outline should discuss communication methods/strategies.
  - Vulnerability Response Process. Who is responsible for responding to a
    report. What is the reporting process? How would you respond?
- Incident Response. A description of the defined procedures for triage,
  confirmation, notification of vulnerability or security incident, and
  patching/update availability.

## Appendix

- Known Issues Over Time. List or summarize statistics of past vulnerabilities
  with links. If none have been reported, provide data, if any, about your track
  record in catching issues in code review or automated testing.
- [CII Best Practices](https://www.coreinfrastructure.org/programs/best-practices-program/).
  Best Practices. A brief discussion of where the project is at
  with respect to CII best practices and what it would need to
  achieve the badge.
- Case Studies. Provide context for reviewers by detailing 2-3 scenarios of
  real-world use cases.
- Related Projects / Vendors. Reflect on times prospective users have asked
  about the differences between your project and projectX. Reviewers will have
  the same question.
