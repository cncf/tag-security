---
title: "Credential Management (Hardware Security Modules (HSM) + Credential Management Cycle)"
date: "2020-10-01"
category: "develop"
---
### Hardware Security Modules (HSM)

Whenever possible, the reader should use technologies such as HSMs to physically protect cryptographic secrets with an Encryption Key that does not leave the HSM. If this is not possible, software-based credential managers should be used.

### Credential Management Cycle

Cryptographic secrets should be generated securely within either an HSM or a software-based secrets management system.

Secrets, whenever possible, should have a short expiration period or time to live after which they become useless. Secret management should be highly available and have high ease of generation as these characteristics are prerequisites for the short-lived secrets. While not recommended, if organizations are using long-lived secrets, appropriate processes and guidance should be established for periodic rotation or revocation, especially in case of accidental disclosure of a secret. All secrets must be distributed in transit through secure communication channels and should be protected commensurate with the level of access or data they are protecting.

In any case, secrets should be injected at runtime within the workloads through non persistent mechanisms that are immune to leaks via logs, audit, or system dumps (i.e. in-memory shared volumes instead of environment variables).


## Projects
- HashiCorp Vault (https://www.vaultproject.io/)

<!---
## Commercial Projects](Optional):
- [HashiCorp Vault](https://www.vaultproject.io/)
- [Microsoft Azure Key Vault](https://azure.microsoft.com/en-us/services/key-vault/)
- [Amazon ACM](https://aws.amazon.com/certificate-manager/)
- [Amazon Secrets Manager](https://aws.amazon.com/secrets-manager/)
- [Google Secret Manager](https://cloud.google.com/secret-manager)
- [AKEYLESS](https://www.akeyless.io/)
- [Pivotal Cloud Foundry CredHub](https://docs.cloudfoundry.org/credhub/)
- [Project Name](Link)
- [CyberArk PAM](https://www.cyberark.com/)
- [CyberArk Conjur](https://www.conjur.org/)
- [BeyondTrust](https://www.beyondtrust.com)
- [Thales HSMs](https://cpl.thalesgroup.com/encryption/hardware-security-modules)
- [Entrust HSMs](https://www.entrust.com/digital-security/hsm)
- [Utimaco HSMs](https://hsm.utimaco.com/)
- [Azure Dedicated HSM](https://azure.microsoft.com/en-ca/services/azure-dedicated-hsm/) 
- [AWS Cloud HSM](https://aws.amazon.com/cloudhsm/)
- [Google Cloud HSM](https://cloud.google.com/kms/docs/hsm)
-->

## Links
- https://www.beyondtrust.com/blog/entry/secrets-management-overview-7-best-practices
- https://csrc.nist.gov/projects/cryptographic-module-validation-program
- https://www.cryptomathic.com/news-events/blog/key-management-and-use-cases-for-hsms
- https://www.cyberark.com/what-is/privileged-access-management/
- https://learn.hashicorp.com/tutorials/vault/getting-started-dynamic-secrets


