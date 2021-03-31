---
title: "Signing, Trust and Integrity"
date: "2020-10-01"
category: "distribute"
---

Digital signing of image content at build time and validation of the signed data before use protects that image data from tampering between build and runtime, thus ensuring the integrity and provenance of an artifact. Confirmation starts with a process to indicate that an artifact was vetted and approved. The trust confirmation also includes verifying that the artifact has a valid signature. In the simplest case, each artifact can be signed by one signer to indicate a single testing and validation process that the artifact has gone through. However, the software supply chain is more complex in most cases, and creating a single artifact relies on multiple validation steps, thus depending on a conglomerate of entities' trust. Examples of this are:

- Container image signing - the process of signing a container image manifest
- Configuration signing - signing of a config file, i.e. application config files: most common in the case of a GitOps approach, where there can be a process to validate and check configurations.
- Package signing - Signing of a package of artifacts, like application packages.

For generic software artifacts such as libraries or OCI artifacts, signing these artifacts indicates their provenance of approved usage by the organization. Verification of these artifacts is equally crucial in ensuring that only the authorized artifacts are allowed. It is strongly recommended that repositories require mutual authentication to make changes to images in registries or to commit code to repositories.

## Projects
- [Notary](https://github.com/theupdateframework/notary)
- [Notary v2](https://github.com/notaryproject/nv2)
- [The Update Framework](https://github.com/theupdateframework)
- [Portieris](https://github.com/IBM/portieris)
- [Docker Content Trust](https://docs.docker.com/engine/security/trust/)
- [Red Hat Simple Signing](https://www.redhat.com/en/blog/container-image-signing)  / [Buildah](https://buildah.io/)
- [In-toto](https://github.com/in-toto)
- [Sigstore](https://sigstore.dev/what_is_sigstore/)


## Examples
- For distribution, sign the container image manifest with Docker Content Trust / Red Hat Simple signing.  This can then be used at runtime to verify the integrity of the image and prove its provenance.
- Alternatively, distributions could create and store signature hashes of their container images, tarballs and other deployment artifacts using Sigstore. It uses pre-existing tools from Red Hat Simple signing and offers transparent log for the generated hashes.
- The manifest can be augmented with metadata about the image such as a software bill of materials (SBOM), which can be used later to make policy decisions.
- All artifacts used in creating the image should be verified according to a verification policy - i.e. base images of containers should be verified before use in building and packaging a container
- Similar to checking md5 checksum for packages, security assurance is gained by the usage of signed images throughout the SDLC by the adoption of container image signing (i.e. to check for valid SHA).
