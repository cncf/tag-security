---
title: "Image Trust & Content Protection"
date: "2020-10-01"
category: "Runtime environment"
---

Utilization of a policy agent to enforce or control authorized, signed container images allows organizations to provide assurance of the image provenance for operational workloads. Further, inclusion of encrypted containers allows for the protection of sensitive sources, methods, or data that exist within the container.

## Projects

- [Notary](https://github.com/theupdateframework/notary)
- [Notary v2](https://github.com/notaryproject/nv2) 
- [The Update Framework](https://github.com/theupdateframework)
- [Portieris](https://github.com/IBM/portieris) 
- [Docker Content Trust](https://docs.docker.com/engine/security/trust/) 
- [Red Hat Simple Signing](https://www.redhat.com/en/blog/container-image-signing)  / Buildah (https://buildah.io/)
- [In toto](https://github.com/in-toto) 
- [Open Policy Agent](https://www.openpolicyagent.org/) 
- [sigstore](https://www.sigstore.dev/) / [Cosign](https://github.com/sigstore/cosign) 
- [Connaisseur](https://sse-secure-systems.github.io/connaisseur/v2.1.2/)

<!---]## Commercial Projects
- [Prisma Cloud](https://www.paloaltonetworks.com/prisma/cloud)
- [DivvyCloud By Rapid7] (https://divvycloud.com/)
- [Aqua Security](https://www.aquasec.com/products/container-security)
-->

## Examples

- Configure admission checks via Portieris or Open Policy Agent gatekeeper to enforce image authorization policy:
  - Only authorize images that are signed by a trusted authority
  - Only authorize images from certain registries
- Enable runtime to verify integrity by forcing a hash or signature check
- Configure runtimes for access to key material and to allow decryption of encrypted images
- Restrict API calls such as “exec” to workloads with sensitive content



