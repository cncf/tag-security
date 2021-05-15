---
title: "Control Plane Authentication and Certificate Root of Trust"
date: "2020-10-01"
category: "develop"
---

The orchestrator administrators should configure all orchestrator control plane components to communicate via mutual authentication and certificate validation with a periodically rotated certificate in addition to existing control plane hardening. The issuing Certificate Authority (CA) can be a default orchestrator CA or an external CA. Particular attention should be given by the administrators to protect the CA's private key. For more information on extending or establishing trust, refer to the Identity and Access Management section.


## Projects
- [Istio](https://istio.io/)
- [Linkerd](https://linkerd.io/)
- [SPIRE](https://github.com/spiffe/spire/)
- [cert-manager](https://cert-manager.io/docs/)
- [Vault](https://github.com/hashicorp/vault)

## Examples
- For Control Plane Authentication, there are several ways to implement authentication between services and within the cluster
  - Usage of an identity framework like SPIRE, or using platform or provider specific capabilities such as kubernetes service account tokens or cloud identities such as AWS iids, GCP Cloud Identity, etc.
  - Use of service mesh frameworks which deliver identity and perform authentication through the use of a sidecar or interception by proxy or at the library/infrastructure level.
- For Control Plane Authentication to be effective, the trust authority that it is built upon must be secure, most of the methods provide an ability to establish this trust with a trust authority. This can be specific to the provider or are extensible.
  - Upstream authorities can be configured, example of these are Vault PKI plugin, or upstream authorities from the cloud provider.