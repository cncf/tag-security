---
title: "Distribute"
date: "2020-10-01"
category: "distribute"
---
The "Distribute" phase is responsible for consuming image definitions and specifications to build the next stage of artifacts such as container images, VM images and others. In modern continuous integration and continuous deployment paradigms, the "Distribute" phase consists of systematic application testing to identify bugs and faults in the software. However, the adoption of Open Source and reusable packages can result in the incorporation of vulnerabilities and malware into container images. It is therefore imperative to incorporate security-focused steps such as scanning the images for the aforementioned threat vectors as well as for validating the integrity of the images to protect against tampering. The next paragraphs elaborate on security best practices that help developers and operators to identify and protect container images from threats as well as techniques and tools to secure the entire CI/CD pipeline and infrastructure. Furthermore, organizations may wish to encrypt software artifacts if confidentiality is desired or needed.

Should software artifacts become untrusted due to compromise or other incident, teams should revoke signing keys to ensure repudiation.
