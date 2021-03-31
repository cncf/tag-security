---
title: "Registry and Staging"
date: "2020-10-01"
category: "distribute"
---
Due to the use of open source components that are often pulled from public sources, organizations should create several stages of registries in their pipelines. Only authorized developers should be able to access public registries and pull base images, which are then stored in an internal registry for wide consumption within the organization. It is also advised to have separate private registries for keeping development artifacts per team or group, and finally a staging or pre-production registry for images ready for production. This enables tighter control over the provenance and security of open source components, while enabling different types of testing for stages in the CI/CD chain.

For any registry used, access control through a dedicated authentication and permission model must be implemented. Use mutually-authenticated TLS for all registry connections (among other interactions within the architecture).

## Projects
- [Docker Distribution](https://github.com/distribution/distribution)
- [Harbor](https://github.com/goharbor/harbor)
- [Nexus OSS](https://www.sonatype.com/nexus/repository-oss)

## Examples
- Prevent Developers from pushing images directly into Production environments. Registry staging is a concept where numerous approaches can be taken to build “stages” of an image registry. As one example of an approach, access to Public repositories may require a Senior Developer / Technical Lead to get involved, where that image from a public registry is then pulled down into a private registry and has security testing and assurance performed against the image, prior to it being made available for consumption into a registry dedicated for pre-production. With this strategy, specific registries can be presented to Dev/DevOps teams where relevant.
  - Ensure images are scanned regularly and automatically to catch new vulnerabilities which have been discovered since the image was built.
    - Scanning of container images in local repositories
      - Reduce exposure to vulns in base image
      - Software Composition Analysis for detecting vulnerabilities in open source modules used in applications.
