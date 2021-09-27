---
title: "Secrets Encryption"
date: "2020-10-01"
category: "develop"
---

It is possible to manage secrets in a container orchestration or deployment environment through use of an external secrets manager or natively using the orchestrator's secrets. When using a native secret store, it is crucial to be aware that several different protection methods are available:

- Encryption with an external Key Management Store (KMS)
  - Leveraging a KMS is a secure way to protect secrets in the orchestrator secret store where key encryption in an external KMS encrypts the Data Encryption Key (DEK) that encrypts the secrets stored at rest in etcd. This method does have an option to cache DEKs in memory to reduce the dependency on the availability of the external KMS and faster decryption of secrets during pod creation time.
- Encryption fully managed by the orchestrator
  - This methodology encrypts the secrets stored in the orchestrator, but the encryption key is also managed by the orchestrator (i.e. a config file of the orchestrator)
- No encryption
  - For example, with some orchestrators, secrets are base64 encoded and stored in clear-text in the key-value store by default

Using an external secrets manager can limit the risks of using unencrypted secrets and ease the complexity of key management. Most of the time those tools are provided as controllers or operators that can inject secrets at runtime and handle their rotations transparently.

## Projects
- [HashiCorp Vault](https://github.com/hashicorp/vault)

<!---
## Commercial Projects (optional)
- [HashiCorp Vault Enterprise](www.hashicorp.com)
- [AWS KMS](https://aws.amazon.com/kms/)
- [Aqua Security Enterprise](www.aquasec.com)
-->

## Examples
- Configure [Kubernetes KMS plugin](https://kubernetes.io/docs/tasks/administer-cluster/kms-provider/) for secrets encryption

## Links
- https://www.cncf.io/announcements/2021/02/23/cncf-provides-insights-into-secrets-management-tools-with-latest-end-user-technology-radar/
