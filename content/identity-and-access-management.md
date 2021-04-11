---
title: "Identity and Access Management"
date: "2020-10-01"
category: "Runtime"
---
A comprehensive identity and access management (IAM) solution for cloud native architectures requires service identity at a minimum. Organizations maintaining or operating on-premise or hybrid clouds need user and device identity management. For applications and workloads distributed across multi-cloud environments, identity federation is critical to a successful implementation.

Applications and workloads should be explicitly authorized to communicate with each other using mutual authentication. Due to the ephemeral nature of cloud computing, key rotation and lifespan need to be frequent and short to maintain the demands of high-velocity capabilities and control and limit the blast radius of credential compromise.

The utilization of identity management services from cloud providers is dependent on industry-specific use cases. Users, independent from the cloud-provider, should generate and manage credentials and keys for sensitive workloads such as health or finance information.

For the client and server to bi-directionally verify identity via cryptography, all workloads must leverage mutual/two-way transport authentication.

Authentication and authorization must be determined independently (decision point) and enforced (enforcement point) within and across the environment. Ideally, secure operation for all workloads should be confirmed in real-time, verifying updated access control and file permissions where possible as caching may permit unauthorized access (if access was revoked and never validated). Authorization for workloads are granted based on attributes and roles/permissions for which they have been assigned. It is strongly recommended organizations use both Attribute-Based Access Control (ABAC) and Role-Based Access Control (RBAC) to provide granular authorization enforcement in all environments and throughout their workload lifecycle. Such posture can enable defense-in-depth, where all workloads are able to accept, to consume, and to forward the identity of the end user for contextual or dynamic authorization. This can be achieved through the use of identity documents and tokens. Not enforcing this limits an organization's ability to truly perform least privilege access control on system-to-system and service-to-service calls.

It is critical to note, application or service identity is also essential in the context of microservices, where the identities for apps are primarily subject to be spoofed and impersonated by a malicious service. Utilization of a strong identity framework and service mesh can help overcome these issues.

All human and non-human cluster and workload operators must be authenticated and all their actions must be evaluated against access control policies that will evaluate the context, purpose, and output of each request. In order to simplify the authentication process, identity federation can be configured to allow usage of enterprise capabilities such as multi-factor authentication. Authorization must then be enforced with access control mechanisms mentioned in this section.


## Projects
- [Keycloak](https://www.keycloak.org/)
- [Teleport](https://github.com/gravitational/teleport)

<!---
## Commercial Projects
- [AWS IAM](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html)
- [Okta](https://www.okta.com/)
- [Auth0](https://auth0.com/)
- [AWS Cognito](https://aws.amazon.com/cognito/) 
- [Active Directory](https://docs.microsoft.com/en-us/windows-server/identity/ad-ds/get-started/virtual-dc/active-directory-domain-services-overview) 
-->

## Examples
- Identity and Access Management is about defining and enforcing policies to ensure the right individuals, through their digital identity, have the proper roles and privileges granting them, or denying them, access to protected resources.
- Kubernetes doesn't manage users. Normal users are assumed to be managed by an outside, independent service like LDAP or Active Directory. In a standard installation of Kubernetes (i.e., using kubeadm), authentication is done via standard transport level security (TLS) certificates.

## Links 
- [Kubernetes Documentation / Reference / API Access Control Authenticating](https://kubernetes.io/docs/reference/access-authn-authz/authentication/)
- [OpenID Connect](https://openid.net/connect/)
- [Identity and access management for Amazon EKS](https://docs.aws.amazon.com/eks/latest/userguide/security-iam.html)
- [Best practices for authentication and authorization in Azure Kubernetes Service](AKS) https://docs.microsoft.com/en-us/azure/aks/operator-best-practices-identity 
- [Google Kubernetes Engine (GKE) / Documentation / Guides / Creating IAM policies](https://cloud.google.com/kubernetes-engine/docs/how-to/iam)
- [AWS IAM Managing Users or IAM Roles for your cluster](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html)
- [AWS IAM Roles for Service Account (IRSA) on EKS](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)
- [OAuth2](https://oauth.net/2/) 