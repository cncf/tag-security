---
title: "Image Encryption"
date: "2020-10-01"
category: "distribute"
---

Container Image Encryption encrypts a container image so that its contents are confidential. The container image contents are encrypted to ensure that they remain confidential for promotion from build time through runtime. In the event of a compromised distribution, the image's registry contents remain secret, which can help for use cases such as protecting trade secrets or other confidential material.

Another common use of Container Image Encryption is to enforce container image authorization. When image encryption is coupled with key management attestation and/or authorization and credential distribution, it is possible to require that a container image can only run on particular platforms. Container image authorization is useful for compliance use cases such as geo-fencing or export control and digital rights media management.

## Projects
- [Ocicrypt](https://github.com/containers/ocicrypt)
- [Containerd Imgcrypt](https://github.com/containerd/imgcrypt)
- [Cri-o](https://github.com/cri-o/cri-o)
- [Buildah](https://buildah.io/)
- [Skopeo](https://github.com/containers/skopeo)

## Examples
- Encrypt container images after building before pushing to ensure the confidentiality of the images.
- Together with key management, encrypting containers can be used as a mechanism on the runtime to ensure that only approved systems are able to decrypt and run the images. For example, configure

## Links
- [Blog: Advancing Image Security Through Encrypted Container Images](https://medium.com/@lumjjb/advancing-image-security-through-encrypted-container-images-1ae6e5b661c7)
