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
| Software | [A link to the External-Secret's repository.] (https://github.com/external-secrets/external-secrets) |
| Security Provider | No - Facilitator of security |
| Languages | Go, HCL, Makefile, Shell, Smarty, Dockerfile |
| SBOM |SBOM generated using **FOSSA-cli** tool on the latest code base. [Link to SBOM](https://github.com/rrgodhorus/tag-security/blob/ab10047/assessments/projects/external-secrets/docs/external_secrets_sbom.spdx.json)  |
| | |

### Security links

Provide the list of links to existing security documentation for the project. You may
use the table below as an example:
| Doc | url |
| -- | -- |
| Security file | [Security.md](https://github.com/external-secrets/external-secrets/blob/main/SECURITY.md) |
| Default and optional configs | https://external-secrets.io/latest/guides/security-best-practices|

## Overview
The External Secrets Operator seamlessly bridges Kubernetes with advanced external secret management systems, providing an automated, secure pipeline for syncing sensitive data into cluster environments. It stands out as a key enabler for cloud-native security, transforming complex secrets management into a streamlined, reliable process.

<p align="center"><img width="600" alt="image" src="https://github.com/rrgodhorus/tag-security/blob/ab10047/assessments/projects/external-secrets/docs/overview.png"></p>


### Background
The External Secrets Operator (ESO) is a tool designed for Kubernetes, a widely-used system for automating the deployment, scaling, and management of containerized applications. ESO addresses a key challenge in this domain: secure and efficient management of sensitive configuration data, known as "secrets" (like passwords, API keys, etc.). Typically, managing these secrets within Kubernetes can be complex and risky if not handled properly. ESO simplifies this by integrating Kubernetes with external secret management services (such as AWS Secrets Manager or HashiCorp Vault), which specialize in securely storing and managing these secrets. This integration not only enhances security but also streamlines the process of injecting these secrets into Kubernetes applications.

### Actors

#### 1. External Secret Management Systems
- Examples: AWS Secrets Manager, HashiCorp Vault.
- Isolation: Network boundaries and authentication mechanisms separate these from the Kubernetes cluster.
- Security Note: A breach in these systems does not directly compromise the Kubernetes cluster.

#### 2. Kubernetes Cluster (including ESO)
- Role: ESO bridges Kubernetes and external secret systems.
- Isolation: Kubernetes Role-Based Access Control (RBAC) limits potential lateral movement in case of a compromise.

#### 3. Kubernetes Secrets
- Function: Store synchronized secrets within the cluster via ESO.
- Isolation: Kubernetes namespaces and access policies provide compartmentalization.
- Security Note: A compromise in one namespace doesn’t necessarily expose secrets in another.

  ##### Isolation Mechanisms Overview
  - The isolation between these actors relies on network security, access control mechanisms, and the principle of least privilege.
  - This architecture ensures limited scope of breach, even if one part is compromised.

### Actions
  For the External Secrets Operator (ESO), the steps it performs to synchronize secrets from external sources into Kubernetes can be outlined focusing on security checks, data handling, and interactions:

  #### 1. Client Request to External Secret Management System
  ESO, acting as a client, sends a request to an external secret management system (like AWS Secrets Manager). This request includes authentication and authorization checks to ensure that ESO is permitted to access the requested secrets.
  #### 2. Retrieval of Secrets
  Upon successful authentication and authorization, the external system sends the requested secrets to ESO. These secrets are transmitted over secure, encrypted channels to ensure their confidentiality and integrity.
  #### 3. Validation and Transformation
    ESO validates the format and integrity of the received secrets. If necessary, it transforms the data to a format compatible with Kubernetes Secrets.
  #### 4. Synchronization to Kubernetes Secrets
    ESO then creates or updates Kubernetes Secret objects with the retrieved data. This step involves interacting with the Kubernetes API server, which includes RBAC checks to ensure that ESO has the necessary permissions to perform these operations.
  #### 5. Use by Kubernetes Workloads
    Applications or workloads running in Kubernetes can then access these secrets. Access to these secrets within Kubernetes is controlled by namespace-specific policies and RBAC, ensuring that only authorized workloads can retrieve them.

  Overall, ESO's goal is to provide a secure, efficient, and reliable way of managing secrets in Kubernetes environments, ensuring that only authorized entities have access to sensitive data and that this data is handled securely at all times.

### Goals
    
  #### 1.Secure Secret Management
  ESO's primary goal is to securely manage secrets within Kubernetes by leveraging external secret management systems. It ensures that sensitive information like API keys, passwords, and tokens are stored and managed in systems specifically designed for this purpose, offering robust security features.

  #### 2. Automated Synchronization
  ESO automates the synchronization of secrets from these external systems into Kubernetes, ensuring that applications always have access to the latest version of each secret.

  #### 3. Access Control
  By integrating with external secret managers, ESO inherits and enforces their access control mechanisms. It guarantees that only authorized parties can retrieve or modify the secrets, both in the external systems and when they are injected into Kubernetes.

  #### 4. Encryption and Integrity
  ESO ensures that the transmission of secrets from external systems to Kubernetes is secure, maintaining the confidentiality and integrity of the data throughout the process.


### Non-goals

  #### 1. Secret Data Encryption
  While ESO manages encrypted secrets, it does not provide encryption services itself. The actual encryption and decryption are handled by the external secret management systems.

  #### 2. Intrusion Detection or Prevention
  ESO does not function as an intrusion detection or prevention system. It does not monitor or protect against unauthorized access within the Kubernetes cluster or the external secret systems.

  #### 3. Full Lifecycle Management of Secrets
  The primary role of ESO is to synchronize secrets from external systems to Kubernetes. It does not manage the full lifecycle (like creation, rotation, and deletion) of secrets within the external systems.

  #### 4. Direct Security Auditing or Compliance Assurance
  ESO does not perform security auditing or provide direct compliance assurance. It relies on the security and compliance features of the external secret management systems it integrates with.

## Self-assessment use

This self-assessment is created by the external-secrets team to perform an internal analysis of the project's security. It is not intended to provide a security audit of external-secrets, or function as an independent assessment or attestation of external-secrets's security health.

This document serves to provide external-secrets users with an initial understanding of external-secrets's security, where to find existing security documentation, external-secrets plans for security, and general overview of external-secrets security practices, both for development of external-secrets as well as security of external-secrets.

This document provides the CNCF TAG-Security with an initial understanding of external-secrets to assist in a joint-assessment, necessary for projects under incubation. Taken together, this document and the joint-assessment serve as a cornerstone for if and when external-secrets seeks graduation and is preparing for a security audit.


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
