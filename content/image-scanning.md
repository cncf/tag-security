---
title: "Image Scanning"
date: "2020-10-01"
category: "distribute"
---

Scanning container images is a critical component of securing container applications throughout the lifecycle. It is vital to do the scanning in the CI pipeline before deploying the image to production. Incorporating this capability ensures that developers, operators, and security professionals have detailed information on all known vulnerabilities and details such as the severity, the Common Vulnerability Scoring System (CVSS) score, and availability of mitigation/fixes. Coupling vulnerability scans of container images with pipeline compliance rules ensures that only sufficiently patched applications are deployed to production, reducing the potential attack surface. Scanning of container images also helps to identify the presence of malware in open source software packages or base image layers incorporated from open source image repositories. While container image scanning can provide teams with evidence of vulnerabilities or malware, it does not remediate vulnerabilities or prevent malware. Organizations need to ensure that container scanning findings are acted upon, and that organizational compliance rules are enforced.

## Projects

- [Trivy](https://github.com/aquasecurity/trivy)
- [Anchore](https://github.com/anchore/anchore-engine)
- [Clair](https://github.com/quay/clair)
- [Snyk](https://snyk.io)
- [Iskan](https://github.com/alcideio/iskan)


<!---
## Commercial Projects
- [Trend Micro SmartCheck](https://github.com/deep-security/smartcheck-helm)
- [Sysdig](https://docs.sysdig.com/en/image-scanning.html) 
- [Aqua](https://www.aquasec.com/use-cases/devops-security/) 
- [InsightVM](https://docs.rapid7.com/insightvm/container-image-scanner/))
- [Prisma Cloud](https://docs.paloaltonetworks.com/prisma/prisma-cloud.html) 
- [Tenable](https://www.tenable.com/) 
- [Qualys](https://www.qualys.com/) 
- [Docker scan](https://docs.docker.com/engine/scan/) 

## Misc Projects
- [Dagda](https://github.com/eliasgranderubio/dagda)
-->

## Examples

- Image scanning can be performed during development locally and as part of a secure software development lifecycle, must be performed during the build and distribution process (i.e CI/CD)
- Scanning of images should be performed on a regular basis, as new vulnerabilities may arise.
- As part of registry staging where only privileged team members are permitted to add images from external repositories (I.e Docker Hub), when that image is staged it should undergo image scanning to identify any known vulnerabilities (i.e. MITRE CVE)
