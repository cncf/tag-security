
# Threat Modelling
This section serves to inform Longhorn users and contributors about its security practices, as well as to assist CNCF TAG-Security in their joint assessment for incubation phase projects. Firstly, we explore the threats using the STRIDE model. Then, we explore using the lightweight threat modelling. Finally, we see an example attack tree. These steps were helpful in creating the subsequent sections in our assessment.

<details>

<summary>STRIDE Threat Model for Longhorn</summary>

## 1. Introduction
This document provides a STRIDE-based threat model analysis for Longhorn, a cloud-native distributed block storage system designed for Kubernetes. The purpose is to identify potential security threats and suggest measures to mitigate them.

## 2. System Overview
Longhorn offers cloud-native, distributed block storage capabilities, integrating seamlessly with Kubernetes. It manages volumes, snapshots, backups, and ensures data resilience and availability.

### 2.1 Components
- **Longhorn Manager**
- **Longhorn Engine**
- **Replicas**
- **Nodes and Disks**

### 2.2 Actors
- **Longhorn Manager**
- **Longhorn Engine**
- **Users/Administrators**

### 2.3 Actions
- **Volume Provisioning and Attachment**
- **Data Replication**
- **Snapshot and Backup Operations**
- **Volume Restoration and Recovery**

## 3. STRIDE Analysis

### 3.1 Spoofing
**Threats**:
- Unauthorised access to the Longhorn management interface or API.
- Impersonation of Longhorn components or services.

**Mitigations**:
- Implement strong authentication mechanisms for API and management interface access.
- Use mutual TLS (mTLS) for internal communications.

### 3.2 Tampering
**Threats**:
- Unauthorised modifications to data in transit or at rest.
- Tampering with Longhorn configuration or codebase.

**Mitigations**:
- Enable data encryption at rest and in transit.
- Ensure data integrity through checksums and replication verification.
- Employ strict access controls and code signing for codebase and configurations.

### 3.3 Repudiation
**Threats**:
- Denial of actions performed by users or internal processes.
- Lack of auditing trails for critical operations.

**Mitigations**:
- Implement comprehensive logging and auditing mechanisms.
- Ensure that all critical actions are traceable to specific users or entities.

### 3.4 Information Disclosure
**Threats**:
- Unauthorised access to sensitive data stored in Longhorn volumes.
- Exposure of internal configuration or metadata.

**Mitigations**:
- Enforce strict access controls to data volumes.
- Use encryption to protect sensitive data.
- Restrict access to internal metadata and configuration details.

### 3.5 Denial of Service (DoS)
**Threats**:
- Overloading the Longhorn system, leading to unavailability.
- Exploiting vulnerabilities to crash the system or degrade performance.

**Mitigations**:
- Implement rate limiting and access controls.
- Design for high availability and resilience.
- Regularly update and patch to address known vulnerabilities.

### 3.6 Elevation of Privilege
**Threats**:
- Exploitation of vulnerabilities to gain higher privileges.
- Unauthorised access leading to control over Longhorn operations.

**Mitigations**:
- Adhere to the principle of least privilege in access controls.
- Regular security assessments and penetration testing.
- Monitor and promptly update software components to address vulnerabilities.

## 4. Conclusion
This STRIDE threat model for Longhorn identifies key areas of potential security risks and provides a foundation for implementing effective security measures. Regular updates, vigilant monitoring, and adherence to security best practices are essential to maintain the security and integrity of the Longhorn system.

</details>


<details>
 
<summary>Longhorn Lightweight Threat Model</summary>

## Overview

Project: Longhorn (https://github.com/longhorn/longhorn)
Intended usage: Cloud-native distributed block storage system for Kubernetes.
Project data classification: Sensitive
Highest risk impact: Cluster breach, pod breach
Owner(s) and/or maintainer(s):
- Sheng Yang, <sheng@yasker.org>, @yasker
- Shuo Wu, <shuo.wu@suse.com>, @shuo-wu
- David Ko, <dko@suse.com>, @innobead
- Derek Su, <derek.su@suse.com>, @derekbit
- Phan Le, <phan.le@suse.com>, @PhanLe1010


## Threat Modelling Notes

Longhorn operates as a persistent volume provider for Kubernetes, managing the storage lifecycle, replication, and backup of data across a distributed environment. The system's architecture, as visualised in the provided image, depicts data flow between Kubernetes pods, the Longhorn Engine, and storage replicas across different nodes, using secure communication protocols and access controls.

## Data Dictionary

- **Volume Data**
  - Classification/Sensitivity: High
  - Comments: Contains user and application data, potentially including secrets.
- **Replica Data**
  - Classification/Sensitivity: High
  - Comments: Replicated data across nodes for high availability.
- **Snapshot and Backup Data**
  - Classification/Sensitivity: High
  - Comments: Stored both locally and externally (e.g., S3/NFS), contains historical data states.

## Control Families

### Deployment Architecture
- **Control**: Managed through Kubernetes with defined storage classes and volume claims.
- **Data**: Persistent volume data.
- **Threats**: Misconfiguration leading to unauthorised access.

### Networking
- **Control**: Internal Kubernetes networking with CNI, optional TLS encryption for external communication.
- **Data**: Control plane and data plane traffic.
- **Threats**: Data interception, man-in-the-middle attacks.

### Multi-tenancy Isolation
- **Control**: Kubernetes namespaces and RBAC.
- **Data**: Volume provisioning and management operations.
- **Threats**: Cross-tenant access or attacks.

### Secrets Management
- **Control**: Integration with Kubernetes Secrets for sensitive information management.
- **Data**: Encryption keys, credentials.
- **Threats**: Exposure of sensitive data.

### Storage
- **Control**: Replicas across diverse storage media (SSDs, HDDs).
- **Data**: User and system data.
- **Threats**: Data loss or corruption.

### Authentication and Authorisation
- **Control**: Kubernetes RBAC and Service Accounts.
- **Data**: API requests and responses.
- **Threats**: Unauthorised actions within the storage system.

### Audit and logging
- **Control**: Kubernetes-native logging, Longhorn UI logs.
- **Data**: Operational logs.
- **Threats**: Lack of visibility or forensics in case of an incident.

### Security Tests
- **Control**: Automated security scanning in CI/CD pipelines.
- **Data**: Code and dependencies.
- **Threats**: Introduction of vulnerabilities.

## Threat Scenarios

### An External Attacker without access
- **Threats**: Probing for vulnerabilities in exposed interfaces, performing DDoS attacks.
- **Controls**: Firewall rules, rate limiting, and robust authentication mechanisms.

### An External Attacker with valid access
- **Threats**: Abuse of valid credentials to perform malicious actions.
- **Controls**: Strict RBAC policies, anomaly detection for unusual activities.

### An Internal Attacker with access to the hosting environment
- **Threats**: Insider threats with access to the cluster might misuse their privileges.
- **Controls**: Audit logging, regular access reviews, and principle of least privilege.

### A Malicious Internal User
- **Threats**: Introducing backdoors or vulnerabilities.
- **Controls**: Code review processes, restricted merge privileges, and signed commits.

## Potential Controls Summary

| Threat                         | Description                                  | Controls                                                               | References  |
|--------------------------------|----------------------------------------------|------------------------------------------------------------------------|-------------|
| Deployment Architecture        | Misconfigurations leading to data breaches   | Use secure defaults in storage classes, enforce pod security policies   | [Kubernetes Pod Security Standards](https://kubernetes.io/docs/concepts/security/pod-security-standards/) |
| Networking                     | Data interception or manipulation           | Implement network policies, use encrypted communication (TLS)           | [Kubernetes Network Policies](https://kubernetes.io/docs/concepts/services-networking/network-policies/) |
| Cryptography                   | Unauthorized data access and tampering       | Enable volume encryption, TLS for data in transit                       | [Encrypting Data at Rest](https://kubernetes.io/docs/tasks/administer-cluster/encrypt-data/) |
| Multi-tenancy Isolation        | Cross-tenant access or attacks               | Namespace isolation, fine-grained RBAC                                 | [Kubernetes Namespaces](https://kubernetes.io/docs/concepts/overview/working-with-objects/namespaces/) |
| Secrets Management             | Exposure of sensitive data                   | Use Kubernetes Secrets with appropriate access controls                | [Kubernetes Secrets](https://kubernetes.io/docs/concepts/configuration/secret/) |
| Storage                        | Data loss or corruption                      | Replication across nodes, regular snapshots, and backups               | [Longhorn Documentation](https://longhorn.io/docs/) |
| Authentication                 | Unauthorized system access                   | Strong authentication mechanisms, integration with Kubernetes auth      | [Kubernetes Authentication](https://kubernetes.io/docs/reference/access-authn-authz/authentication/) |
| Authorization (Access Control) | Unauthorized actions within the storage system| Strict RBAC policies, least privilege access                           | [Kubernetes Authorization](https://kubernetes.io/docs/reference/access-authn-authz/authorization/) |
| Audit and Logging              | Lack of incident visibility or forensics     | Enable detailed logging, integrate with monitoring tools               | [Kubernetes Logging Architecture](https://kubernetes.io/docs/concepts/cluster-administration/logging/) |


## Conclusion

- Critical findings should be promptly disclosed to the community.
- Consideration for additional threat modelling tools, such as attack trees or matrices, to further analyse complex threats.
</details>

The attact tree for a generic high-level threat scenario is depicted:

<p align="center"><img alt="image" src="https://github.com/Makesh-Srinivasan/ISP_A3/assets/66047630/4f88f24c-14e9-40c1-92e5-ea3761806556"></p>

Each branch of this tree represents a step or method an attacker might use to progress their attack. The end goal is unauthorized access to and exfiltration of sensitive data stored within Longhorn. This attack tree can be used to identify potential vulnerabilities, assess risks, and develop strategies to mitigate or prevent such attacks.

<hr>