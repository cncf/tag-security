---
title: "Zero Trust Architecture"
date: "2020-10-01"
category: "Security Assurance"
---

Zero trust architectures mitigate the threats of lateral movement within a network through fine grained segmentation, micro-perimeters, and removing implicit trust to data, assets, applications, and services (DAAS) with verification and enforcement policies. Most common implementations of zero-trust architecture rely on cryptographic concepts to create zero trust. This is primarily based on the ability to have specific key material secured in hardware or tokens and managed in a way where they can be securely communicated to a platform.

The foundational building block that zero trust architecture usually consists of several aspects:

- Each entity can create proof of who the identity is
- Entities are able to independently authenticate other identities (i.e. Public Key Infrastructure)
- Communications between entities remain confidential and untampered
The zero trust framework creates the zero trust building blocks by leveraging a strong root of trust: the ability to tie a tamper-resistant trust to an entity or process is the foundational building block. It then requires attestations: the ability to attest, validate, and prove the identity of an entity. For the example of container services, how do I check that this container is who it claims to be. This needs to be verified with the orchestrator, but to trust the orchestrator, we need to ensure it is running untampered, which can only be ensured if we are running a trusted OS, BIOS, etc. Attestations are usually a chain as well.

Zero trust also requires secure communication between entities. While network segmentation provides value to zero trust architectures and should be considered, is not an end all solution to zero trust implementation. Orchestrator network policies as well as use of a service mesh are all components of a comprehensive zero trust solution. More information on zero trust concepts is available widely online.

## Projects
- [Project Calico](https://www.projectcalico.org/)
- [SPIFFE/SPIRE](https://github.com/spiffe)
- [OPA](https://github.com/open-policy-agent/opa)
- [Istio](https://github.com/istio/istio)
- [Linkerd](https://github.com/linkerd)
- [HyperLedger](https://www.hyperledger.org/)
- [HashiCorp Vault](https://github.com/hashicorp/vault)
- [Keylime](https://keylime.dev/)
- [Kyverno](https://kyverno.io)

<!--
Commercial Projects (optional)
Calico Enterprise (https://www.tigera.io/tigera-products/calico-enterprise/)
Calico WireGuard (https://www.projectcalico.org/introducing-wireguard-encryption-with-calico/)
AquaSec (https://www.aquasec.com/)
Aporeto (now part of Palo Alto Networks Prisma) (https://www.paloaltonetworks.com/prisma/cloud/identity-based-microsegmentation)
Rapid7 (www.alcide.io)
Styra DAS (www.styra.com)
SysDig (https://sysdig.com/)
-->

## Examples
- Enforced secure communication between nodes/endpoints independent of the pods/applications involved, either via service meshes, CNI-specific features, or other means (i.e. don’t trust individual applications to necessarily handle their own secure communications).
- Protocols may be enhanced (e.g. additional endpoint verification, such as remote hardware attestation in addition to transport security), but never downgraded below the mandated baseline.
- Network policies (e.g. including the implementations already inherent to Kubernetes) can supplement additional tools/technologies via ingress and egress rules to explicitly define permitted connections between pods via rules and relationships.
- De-centralized identity management using technologies such as trust engines and threat scores can be used to handle authentication, and can be further supplemented via additional technologies (e.g. blockchain) to supplement trust-engine based means of user/device authentication. 
- Dynamic secrets and routine certificate rotation can be handled via certificate management systems (e.g. HashiCorp Vault), along with revocation of compromised certificates.
- Remote hardware attestation (e.g. Keylime) can be used to verify the integrity of individual nodes (i.e. bootloader, kernel, PCR values, etc.), and related technologies (e.g. SecureBoot, measured boot) can potentially prevent compromised hosts from fully booting (preventing attempts to even join the private network).
- “Validating” admission controllers (e.g. OPA, Kyverno, etc.) can ensure individual applications (i.e. in the form of pods) meet specific security requirements before allowing the application to launch, while “mutating” admission controllers can modify the runtime parameters (e.g. environment variables, network ingress/egress policy, RBAC-related configuration, etc.) so that any/all applications executed in the cluster have been sanitized as per cluster security policy before any container code can be executed. “Init containers” can also be injected as an additional run-time prerequisite.
- Private PKI (e.g. via Vault) is preferred over public PKI, but public PKI is preferred over no PKI (Gilman, Barth). Certificate management solutions that are 100% controlled by the cluster owner are preferred over any alternatives.


## Other Links/Materials:
- [Project Calico Documentation: Adopt a zero trust network model for security](https://docs.projectcalico.org/security/adopt-zero-trust)Link 1
- [Integrating Calico and Istio to Secure Zero-Trust Networks on Kubernetes](https://www.altoros.com/blog/integrating-calico-and-istio-to-secure-zero-trust-networks-on-kubernetes/)
- [Istio Security: Zero-Trust Networking](https://blog.aquasec.com/istio-kubernetes-security-zero-trust-networking)
- [Docker Con 19 - “Zero Trust Networks Come to Enterprise Kubernetes” slides](https://www.slideshare.net/Docker/dcsf-19-zero-trust-networks-come-to-enterprise-kubernetes)
- [Zero Trust Networks (Gilman & Barth 2017)]()

