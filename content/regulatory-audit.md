---
title: "Regulatory Audit"
date: "2021-05-18"
category: "compliance"
---

Many financial, health, government, and other entities need to comply with a specific set of requirements to protect
the system. The users trust the systems to keep their interactions private and secure. Every organization should
evaluate which regulatory standards apply to them (e.g., PCI-DSS, HIPAA, FedRAMP, GDPR, etc.). They should then
determine how specific requirements apply to their cloud native systems and how they will implement those standards'
real-world implementation. This evidence-gathering mechanism supporting adherence to specific standards should be
automated with non-repudiation guarantees whenever possible.

## Projects
- [Project Calico](https://www.projectcalico.org/)
- [SPIFFE/SPIRE](https://github.com/spiffe)
- [OPA](https://github.com/open-policy-agent/opa)
- [Istio](https://github.com/istio/istio)
- [Linkerd](https://github.com/linkerd)
- [HyperLedger](https://www.hyperledger.org/)
- [HashiCorp Vault](https://github.com/hashicorp/vault)
- [Keylime](https://keylime.dev/)
- [Kyverno](https://github.com/kyverno/kyverno)
- [Keycloak](https://github.com/keycloak/keycloak)
- [Falco](https://github.com/falcosecurity/falco)

<!---
## Commercial Projects
- [Styra](https://www.styra.com/)
- [Snyk](https://snyk.io)
- [Aqua](https://www.aquasec.com/)
- [Palo Alto Networks](https://www.paloaltonetworks.com/)
-->

## Examples
- NIST Compliance for Containers (NIST SP 800-190)
    - Insecure connections to registries: Eg. encrypt all connections to registries and any data that moves between registries and endpoints
    - Monitor container runtime for vulnerabilities
  
- PCI DSS Compliance for Containers
    - User access control, segregation of duties: Eg. [Least-Privilege Access](least-privilege)
    - Threat analysis and mitigation
  
- GDPR Compliance for Containers
    - Data Protection Impact Assessment: Eg. perform risk assessment to identify container image vulnerabilities
    - Security of Processing: Eg. define and control access to personal data

