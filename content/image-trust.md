---
title: "Image Trust and Content Protection"
date: "2020-10-01"
category: "runtime"
---


## Projects

- [Notary](https://github.com/theupdateframework/notary)
- [Notary V2](https://github.com/notaryproject/nv2)
- [The Update Framework](https://github.com/theupdateframework)
- [Portieris](https://github.com/IBM/portieris)
- [Docker Content Trust](https://docs.docker.com/engine/security/trust/)
- [Red Hat Simple Signing](https://docs.docker.com/engine/security/trust/)
- [In-toto](https://github.com/in-toto)
- [Open Policy Agent](https://www.openpolicyagent.org/)


<!---
## Commercial Projects
- [Divvy Cloud by Rapid7](www.alcide.io)

## Misc Projects
-->

## Examples

- Configure admission checks via Portieris or Open Policy Agent gatekeeper to enforce image authorization policy:
  - Only authorize images that are signed by a trusted authority
  - Only authorize images from certain registries 
- Enable runtime to verify integrity by forcing a hash or signature check 
- Configure runtimes for access to key material and to allow decryption of encrypted images
- Restrict API calls such as “exec” to workloads with sensitive content
