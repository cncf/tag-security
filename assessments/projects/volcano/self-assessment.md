# Volcano Self-Assessment
This assessment was created by community members as part of the [Security Pals](https://github.com/cncf/tag-security/issues/1102) process, and is currently pending changes from the maintainer team.

Authors: Mayank Ramnani (@mayank-ramnani), Anish Vempaty (@anish-vempaty), Francis Gabriel Delamerced (@fdg238)

Contributors/Reviewers: Pranava Kumar Vemula (@Rana-KV), Eddie Knight (@eddie-knight), Ragashree (@ragashreeshekar), @torinvdb

The Self-assessment is the initial document for Volcano to begin thinking about the security of the project, determining gaps in its security, and preparing any security documentation for their users.

## Table of contents

- [Volcano Self-Assessment](#volcano-self-assessment)
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
    - [Badges](#badges)
    - [Links](#links)
    - [Case Studies](#case-studies)
    - [Related Talks](#related-talks)

## Metadata

| | |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------|
| Assessment Stage | Incomplete | 
| Software          | https://github.com/volcano-sh/volcano
| Security Provider | No
| Languages         | Go, Shell, Makefile, Dockerfile, Python, Smarty|
| SBOM                 | Volcano does not currently generate an SBOM on release |



### Security links

| Document          | URL
|-------------------|----------------------------------------------------------------------------------------------------------------------------------|
| SECURITY.md | https://github.com/volcano-sh/volcano/blob/master/SECURITY.md|

## Overview

[Volcano](https://volcano.sh/en/docs/#what-is-volcano) is a cloud native system for high-performance workloads, which has been accepted by Cloud Native Computing Foundation (CNCF) as its first and only official container batch scheduling project. Volcano supports popular computing frameworks such as [Spark](https://spark.apache.org/), [TensorFlow](https://www.tensorflow.org/), [PyTorch](https://pytorch.org/), [Flink](https://flink.apache.org/), [Argo](https://argoproj.github.io/), [MindSpore](https://www.mindspore.cn/en/), [Kubeflow](https://www.kubeflow.org/), [PaddlePaddle](https://www.paddlepaddle.org.cn/), and [more](https://volcano.sh/en/docs/#ecosystem). Volcano also supports the scheduling of computing resources on different architectures such as x86, Arm, and Kunpeng.

### Background

Kubernetes is a portable, extensible, open source platform for managing containerized workloads and services, that facilitates both declarative configuration and automation. However, Kubernetes is insufficient with high-performance batch computing. High-performance batch computing requires complex job scheduling and management that is commonly required by many classes of high-performance workloads, including: machine learning/deep learning, bioinformatics/genomics and other big data applications. Volcano enables this requirement by providing powerful batch scheduling capability. It also enables other features such as:
- Support for a rich set of scheduling algorithms
- Enhanced job management using multi-pod jobs, improved error handling and indexed jobs
- Non-intrusive support for mainstream computing frameworks
- Support for multi-architecture computing
In addition, Volcano inherits the design of Kubernetes APIs, allowing you to easily run applications that require high-performance computing on Kubernetes.


### Actors

![Architechture Diagram of Volcano](arch.png)
1. Users: Individuals or systems that interact with Volcano for job management. This could include administrators who configure the system, users who submit jobs, and any external systems that interface with Volcano.
2. [Volcano Scheduler](https://volcano.sh/en/docs/architecture/#scheduler): The core component responsible for scheduling tasks. It makes decisions about job placement and resource allocation in the Kubernetes cluster.
3. Volcano API Server: Handles requests and responses between users and the Volcano scheduler. It's a critical interface and thus a separate actor due to its role in processing and validating job submissions.
4. Kubernetes Cluster: While Volcano operates within Kubernetes, the cluster itself can be considered a separate actor. It manages the resources that Volcano schedules jobs onto and enforces access controls.
5. Integrated Systems: Any external systems or tools that Volcano integrates with (e.g., TensorFlow, PyTorch, etc.). These are separate actors as they are external yet interact closely with Volcano.

### Actions

1. User Interaction with Volcano: Job Submission
  - Users submit batch processing jobs to Volcano via the API Server. This includes specifying job requirements, resources needed, and priorities.
  - Involved Actors:
    + User
    + Volcano API Server
    + Volcano Scheduler
  - Security Checks and System Actions:
    + User Authentication: Verify user identity before accepting job submission.
    + Input Validation: Ensure job details adhere to required formats and security policies.
    + Authorization Check: Confirm user has permissions to submit the job.
    + Schema Validation: API Server validates the job request against the expected structure.
    + Resource Allocation: Scheduler allocates resources considering security policies and fairness.

2. User Interaction with Volcano: Configuration and Management
  - Administrators configure Volcano settings, manage resource quotas, and set security policies.
  - Involved Actors:
    + Administrator
    + Volcano API Server
  - Security Checks and System Actions:
    + Administrator Authentication: Verify identity of the person making configuration changes.
    + Authorization Verification: Check if the administrator has appropriate permissions.
    + Configuration Validation: Ensure settings comply with security standards and policies.
    + Monitoring for Anomalies: Continuous checks for unauthorized or unusual configuration changes.

3. Volcano Scheduler Operations: Job Scheduling
  - The scheduler decides how and when to allocate resources to jobs based on current cluster status, job priority, and resource requirements.
  - Involved Actors:
    + Volcano Scheduler
    + Kubernetes Cluster
  - Security Checks and System Actions:
    + Job Priority Assessment: Ensure job priorities are assigned and handled securely.
    + Resource Fairness: Allocate resources fairly while preventing exploitation and priority escalation.
    + Security Policy Compliance: Align job scheduling with cluster-level security policies.
  
4. Volcano Scheduler Operations: Resource Management
  - Manages the allocation and release of resources in the Kubernetes cluster for scheduled jobs.
  - Involved Actors
    + Volcano Scheduler
    + Kubernetes Cluster
Security Checks and System Actions:
    + Resource Utilization Check: Ensure efficient and secure usage of cluster resources.
    + Job Isolation: Maintain isolation between jobs to safeguard against cross-job interference or data leakage.

5. API Server Functions: Request Processing
  - Handles and validates requests from users, ensuring they conform to defined schemas and security protocols.
  - Involved Actors:
    + Users
    + Volcano API Server
  - Security Checks and System Actions:
    + Request Authentication: Authenticate users making requests.
    + Request Validation: Validate requests against security protocols and schemas.
    + Response Integrity: Ensure the integrity and security of the data in the responses.

6. API Server Functions: Authentication and Authorization
  - Verifies user identities and checks whether they have sufficient permissions to perform requested actions.
  - Involved Actors:
    + Users
    + Volcano API Server
  - Security Checks and System Actions:
    + Identity Verification: Confirm the identity of users.
    + Permission Checks: Verify user permissions for requested actions.

7. Kubernetes Cluster Interactions: Resource Provisioning
  - Kubernetes cluster provides the necessary resources (like CPU, memory, and storage) as dictated by Volcano's scheduling decisions.
  - Involved Actors:
    + Kubernetes Cluster
    + Volcano Scheduler
  - Security Checks and System Actions:
    + Resource Allocation Security: Ensure resources are provided securely and in compliance with policies.
    + Access Control Enforcement: Kubernetes enforces access controls on resource provision.


8. Kubernetes Cluster Interactions: Enforcement of Security Policies
  - Kubernetes enforces security policies set by administrators, such as network policies and access controls, affecting how jobs are run and isolated.
  - Involved Actors:
    + Kubernetes Cluster
  - Security Checks and System Actions:
    + Policy Implementation: Enforce network and access control policies.
    + Security Compliance Monitoring: Continuously monitor for compliance with set security policies.

9. Integration with External Systems
  - Data Exchange: Volcano may exchange data with integrated systems (like TensorFlow, PyTorch) for processing jobs. This includes sending job data and receiving results.
  - Involved Actors
    + Volcano
    + Integrated Systems (e.g., TensorFlow, PyTorch)
  - Security Checks and System Actions
    + Secure Data Exchange: Ensure data exchanged with external systems is secure and complies with protocols.
    + Compliance Check: Verify interactions adhere to established security standard

### Goals

- Efficient, optimized batch job scheduling in Kubernetes.
- Secure handling of jobs and data within Kubernetes.


### Non-goals

- Replacing core Kubernetes functionalities.
- Non-batch processing tasks (such as data-set processing/analysis, or machine learning).


## Self-assessment use

This self-assessment is created by a team of grad students at NYU, independent of the Volcano team to perform an analysis of the project's security. It is not intended to provide a security audit of Volcano, or function as an independent assessment or attestation of Volcano's security health.
This document serves to provide Volcano users with an initial understanding of Volcano's security, where to find existing security documentation, Volcano plans for security, and general overview of Volcano security practices, both for development of Volcano as well as security of Volcano.
This document provides the CNCF TAG-Security with an initial understanding of Volcano to assist in a joint-assessment, necessary for projects under incubation. Taken together, this document and the joint-assessment serve as a cornerstone for if and when Volcano seeks graduation and is preparing for a security audit.


## Security functions and features

- Critical:
    + Volcano Scheduler: The heart of Volcano, responsible for making scheduling decisions. Its algorithms and mechanisms are crucial for ensuring that jobs are allocated to the appropriate resources without compromising cluster security. It's non-configurable and central to the system's operation, directly impacting security by enforcing job isolation and resource controls.
    + API Server: Serves as the primary interface for user interactions with Volcano. It is critical for ensuring that all requests are authenticated and authorized, thus preventing unauthorized access and manipulation of job scheduling.
    + Admission Controllers: These play a key role in validating and mutating requests in Volcano. Their correct operation is essential to enforce security policies and prevent malicious or malformed job submissions from affecting the cluster.
- Security Relevant
    + Authentication Mechanisms: While not part of the core functionality, the authentication methods used by Volcano to interface with Kubernetes are vital for securing access. They ensure that only authorized users and systems can interact with Volcano.
    + Logging and Monitoring: These components are crucial for tracking the behavior of the system and identifying potential security incidents. They enable administrators to monitor job submissions, scheduling decisions, and system changes, providing visibility into the system's operation and aiding in incident detection and response.
    + Configuration Management: The way Volcano is configured can significantly impact its security. Secure default settings, proper configuration of resource limits, and job isolation parameters are important to prevent abuse and ensure the stable operation of the system within a Kubernetes cluster.
    + Network Policies: Network configurations within Volcano, especially how it communicates within the Kubernetes cluster and with external systems, are important for securing data in transit and ensuring that the network layer does not become a vector for attacks.

## Project compliance
Not Applicable.

## Secure development practices

- Development Pipeline
    + Contributor Sign-off: Contributors to Volcano are required to sign off on their commits as part of a [Developer Certificate of Origin](https://probot.github.io/apps/dco/) (DCO).
    + Code Review Process: Volcano employs a rigorous [code review process](https://github.com/volcano-sh/volcano/blob/master/contribute.md#code-review), with [multiple maintainers](https://github.com/volcano-sh/volcano/blob/master/MAINTAINERS.md) from different organizations and automated checks using [CodeQL](https://github.com/volcano-sh/volcano/actions/workflows/codeql-analysis.yml). This ensures high standards of code quality and security.
    + Automated Testing and CI/CD: The project utilizes continuous integration and deployment pipelines, including [automated testing](https://github.com/volcano-sh/volcano/blob/master/contribute.md#testing) for vulnerabilities and code quality checks.

- Communication Channels
    + Internal: The development team uses platforms like GitHub, Slack, and email lists for internal communications.
    + Inbound: Users and prospective users can likely communicate with the Volcano team via GitHub issues, mailing lists, or a dedicated Slack channel.
    + Outbound: Updates and announcements are made through GitHub, mailing lists, blog posts, or social media channels.
- Ecosystem
    + Volcano is a CNCF Sandbox project and integrates with the larger cloud-native ecosystem, providing batch processing capabilities in Kubernetes environments. It is used by companies like Huawei, AWS, JD.com, OpenAI, Baidu, and Tencent, indicating a broad impact across different cloud environments.
    + Volcano [requires two-factor authentication](https://github.com/volcano-sh/volcano/blob/master/docs/development/prepare-for-development.md#setting-up-a-personal-access-token) to be part of the github organization and a personal access token to enable push via HTTPS.
    + Volcano has a defined community membership process that requires sponsorship from two approvers to become a member. [Link](https://github.com/volcano-sh/volcano/blob/master/community-membership.md)


## Security issue resolution

The Volcano project has a [Product Security Team (PST)](https://github.com/volcano-sh/volcano/security#product-security-team-pst) responsible for handling security vulnerabilities, coordinating responses, and organizing both internal communication and external disclosure.
- [Responsible Disclosures Process](https://github.com/volcano-sh/volcano/security#disclosures): Volcano encourages private reporting of security vulnerabilities to their dedicated security email (volcano-security@googlegroups.com). Public disclosure of vulnerabilities is discouraged until the PST has developed a fix or mitigation plan.
    + Vulnerability Response Process 
    + Report Handling: When a security vulnerability is reported to the Volcano security team (via volcano-security@googlegroups.com), the Product Security Team (PST) takes charge of the response.
    + Fix Lead Assignment: A member of the PST volunteers to lead the response, coordinating the development of a fix and communicating with the community.
    + Fix Development: The PST works with the relevant engineers to develop a fix, create a CVSS score, and review the fix in a private security repository.
    + Timeliness: The process is designed to handle disclosures quickly, with initial steps taken within the first 24 hours and the development of a fix within 1-7 days.
- Incident Response. The PST follows a structured process for patching, releasing, and publicly communicating about vulnerabilities. This includes creating a CVSS score, developing fixes, and coordinating with the community and distributors for patch releases and announcements.

## Appendix
### Badges
- [Volcano has achieved an Open Source Security Foundation (OpenSSF) best practices badge at passing level.](https://www.bestpractices.dev/en/projects/3012)
- [Volcano has achieved A+ quality as an open source Go project.](https://goreportcard.com/report/github.com/volcano-sh/volcano)

### Links
- [Volcano Usage and Adopters](https://github.com/volcano-sh/volcano/blob/master/docs/community/adopters.md)
- [Volcano Bug Reporting Guidelines](https://github.com/volcano-sh/volcano/blob/master/docs/getting-started/reporting_bugs.md)
- [Volcano Threat Analysis](threat-analysis.md)
- [Recommendations to Volcano Post Self-Assessment](recommendations.md)

### Case Studies
- [Using Volcano in Large-Scale, Distributed Offline Computing](https://volcano.sh/en/blog/ruitian2-en/)
- [ING Bank: How Volcano Empowers Their Big Data Analytics Platform](https://volcano.sh/en/blog/ing_case-en/)
- [How Does Volcano Empower a Content Recommendation Engine in Xiaohongshu](https://volcano.sh/en/blog/xiaohongshu-en/)
- [How Ruitian Used Volcano to Run Large-Scale Offline HPC Jobs](https://volcano.sh/en/blog/ruitian-en/)

### Related Talks
- [The Linux Foundation Talk: Using Volcano and Kubernetes for Cutting-Edge AI Deployment](https://www.youtube.com/watch?v=hjfoEdMD3cI)
- [CNCF Talk (Chinese): Volcano Helps FinTech BigData on K8s](https://www.youtube.com/watch?v=wYEmjqPbjjY)
