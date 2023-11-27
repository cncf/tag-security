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

- [Self-assessment](#self-assessment)
- [Self-assessment outline](#self-assessment-outline)
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
  - [Project compliance](#project-compliance)
  - [Secure development practices](#secure-development-practices)
  - [Security issue resolution](#security-issue-resolution)
  - [Appendix](#appendix)

## Metadata

A table at the top for quick reference information, later used for indexing.

|                   |                                                                                                                                   |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Software          | https://github.com/chaos-mesh/chaos-mesh                                                                                          |
| Security Provider | No, Chaos Mesh offers various types of fault simulation and has an enormous capability to orchestrate fault scenarios.            |
| Languages         | Go, Typescript, Javascript, Shell                                                                                                 |
| SBOM              | `https://github.com/<username>/<repository>/releases/tag/<release-tag>/chaos-mesh-${{ needs.build-specific-architecture.outputs.image_tag }}-sbom.spdx` |
|                   |                                                                                                                                   |

### Security links

Provide the list of links to existing security documentation for the project. You may
use the table below as an example:
| Doc                                                                 | url                                                           |
| ------------------------------------------------------------------- | ------------------------------------------------------------- |
| Manage user permissions                                             | https://chaos-mesh.org/docs/manage-user-permissions/          |
| Configure namespace for Chaos Experiments                           | https://chaos-mesh.org/docs/configure-enabled-namespace/      |
| GCP OAuth Authentication                                            | https://chaos-mesh.org/docs/gcp-authentication/               |
| Chaos Mesh manages permissions using the native RBAC feature in K8s | https://kubernetes.io/docs/reference/access-authn-authz/rbac/ |

## Overview

Chaos Mesh is an open source cloud-native Chaos Engineering platform. It offers various types of fault simulation and has an enormous capability to orchestrate fault scenarios. Using Chaos Mesh, you can conveniently simulate various abnormalities that might occur in reality during the development, testing, and production environments and find potential problems in the system. 

### Background

Chaos engineering is a discipline within software development and operations that focuses on proactively testing systems for their resilience to failure or unexpected conditions. The primary goal is to uncover weaknesses or vulnerabilities in a system's design or architecture before they cause significant issues in real-world scenarios.

Chaos engineering involves intentionally introducing controlled and measured disruptions or faults into a system to observe how it responds under stress. By doing so, engineers can identify weaknesses, bottlenecks, or failure points and then work on improving the system's reliability, robustness, and fault tolerance.

### Actors
- User: The individual initiating Chaos experiments and interacting with the Chaos Dashboard to manipulate and observe the experiments.
- Chaos Controller Manager: Responsible for scheduling and managing Chaos experiments. It includes multiple Controllers handling different Chaos experiment types and workflows.
- Chaos Daemon: The executive component running in DaemonSet mode. It carries out specific fault injections by interfering with network devices, file systems, and kernels within the target Pod Namespace.

### Actions
User input and observation:
- User (Actor) Interaction: Initiating operations and interactions via the Chaos Dashboard or YAML configuration file.
- Chaos Resource Changes: Triggering changes in Chaos resources (e.g., creating or modifying NetworkChaos resources).

Monitor resource changes, schedule Workflow, and carry out Chaos experiments:
- Chaos Controller Manager (Actor): Accepting events from the Kubernetes API Server.
- Workflow Scheduling: Scheduling and managing Chaos experiments and workflows.
- Chaos Experiment Execution: Triggering specific fault injections, such as Pod failures, network issues, CPU/memory race simulations, etc.

Injection of specific node faults:
- Chaos Daemon (Actor): Accepting commands from Chaos Controller Manager to execute fault injections.
- Specific Fault Injections: Hacking into the target Pod's Namespace to perform fault injections based on defined Chaos resources.

### Goals
- Fault Injection for Resilience Testing: Chaos Mesh aims to enable controlled and orchestrated fault injections within cloud-native environments to improve system resilience. This includes simulating various fault scenarios such as network failures, application faults, and platform failures.
- Chaos Experiment Orchestration: The project's goal is to provide a comprehensive platform to orchestrate Chaos experiments. This involves scheduling, managing, and monitoring Chaos experiments and workflows.
- Visualization and User-Friendly Interfaces: It intends to offer a user-friendly Chaos Dashboard for visualization and manipulation of Chaos experiments. This includes simplified user interactions to define and monitor experiments.
- Security and Permission Management: Chaos Mesh implements RBAC for permission management, ensuring that only authorized users can initiate and manage Chaos experiments. This enhances security by limiting access based on roles and permissions.

### Non-goals
- Resource Utilization Control: Chaos Mesh does not aim to restrict or control the amount of resources utilized by Chaos experiments. For instance, it does not intend to prevent a user from causing excessive resource usage that could potentially incur financial costs or overload servers.
- Limiting Data Storage: The project does not aim to enforce limitations on the amount of data stored or handled during Chaos experiments. It does not prevent users from storing large amounts of data that might impact infrastructure or incur costs.
- Complete System Control: Chaos Mesh does not seek to exert control over all aspects of the system but rather focuses on Chaos Engineering-specific functionalities. It doesn't aim to govern every potential action within a Kubernetes environment but rather focuses on controlled fault injections for testing system resilience.

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

* Critical.

Role-Based Access Control (RBAC): RBAC in Chaos Mesh ensures that only authorized users can perform specific actions within the system. It controls access to resources based on the roles of individual users, thus limiting the potential damage that can be caused by malicious actors or accidental misuse.

Authentication and Authorization: These mechanisms verify the identity of users and ensure that they have the appropriate permissions to perform actions. This is crucial to prevent unauthorized access to the system and to control what actions each user can perform.

* Security Relevant. 

Pod Security Policies: In Kubernetes environments, pod security policies define the conditions that pods must meet to run. Configuring these policies helps ensure that Chaos Mesh operates within a secure environment.

Chaos Mesh Experiment Configurations: The configuration of chaos experiments themselves, including defining scope, duration, and intensity, is crucial. Proper configuration ensures that these experiments do not unintentionally compromise system stability or security.

Network Security Configurations: These include settings related to firewalls, network segmentation, and access controls. Proper configuration can prevent unauthorized access and limit the scope of potential network-based attacks.

Resource Quotas and Limits: Setting appropriate resource quotas and limits in Kubernetes helps prevent resource exhaustion attacks, where an attacker could attempt to overwhelm the system by consuming excessive resources.

## Project compliance

None

## Secure development practices

* Development Pipeline.  

1. Clone the repo to remote device and make a change
2. Unit test
3. Perform manual tests in Chaos Mesh
4. Commit and push to remote branch. Commit must be signed
5. Create a pull request
6. Get a code review by two reviewers
7. Goto step 1 if changes are required

* Communication Channels. Reference where you document how to reach your team or
  describe in corresponding section.

  * Internal:
    Slack: https://cloud-native.slack.com/archives/C0193VAV272
    GitHub Issues: https://github.com/chaos-mesh/chaos-mesh/issues/new?assignees=&labels=&template=question.md
    GitHub Discussion: https://github.com/chaos-mesh/chaos-mesh/discussions/new
    Email: https://github.com/chaos-mesh/chaos-mesh/blob/master/MAINTAINERS.md

  * Inbound:
    Slack: https://cloud-native.slack.com/archives/C0193VAV272
    GitHub Issues: https://github.com/chaos-mesh/chaos-mesh/issues/new?assignees=&labels=&template=question.md
    GitHub Discussion: https://github.com/chaos-mesh/chaos-mesh/discussions/new

  * Outbound:
    Chaos Mesh Blog: https://chaos-mesh.org/blog
    Twitter: https://twitter.com/chaos_mesh
    Community Meeting: https://community.cncf.io/chaos-mesh-community/
    Development Meeting: https://community.cncf.io/chaos-mesh-community/

* Ecosystem. 

Chaos Mesh is primarily designed for Kubernetes environments. It leverages Kubernetes features and concepts, like Custom Resource Definitions (CRDs), to manage chaos experiments as Kubernetes resources. This tight integration makes it an essential tool for organizations that use Kubernetes for orchestration.

## Security issue resolution

Reports of security issues should be made to the Chaos Mesh Security Team: chaos-mesh-security@lists.cncf.io

Known public security vulnerabilities will be disclosed as soon as possible after receiving the report. 

Vulnerabilities discovered for the first time will be disclosed in accordance with the following process:

1. The received security vulnerability report shall be handed over to the security team for follow-up coordination and repair work.
2. After the vulnerability is confirmed, the team creates a draft Security Advisory on Github that lists the details of the vulnerability.
3. Invite related personnel to discuss the fix.
4. Fork the temporary private repository on Github, and collaborate to fix the vulnerability.
5. After the fixed code is merged into all supported versions, the vulnerability will be publicly posted in the GitHub Advisory Database.

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
