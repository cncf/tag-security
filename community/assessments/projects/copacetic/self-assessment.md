# Self-assessment

Authors: Leonard Wang

Date: July 22nd, 2025

## Self-assessment outline

### Table of contents

* [Metadata](#metadata)
  * [Security links](#security-links)
* [Overview](#overview)
  * [Actors](#actors)
  * [Actions](#actions)
  * [Background](#background)
  * [Goals](#goals)
  * [Non-goals](#non-goals)
* [Self-assessment use](#self-assessment-use)
* [Security functions and features](#security-functions-and-features)
* [Project compliance](#project-compliance)
* [Secure development practices](#secure-development-practices)
* [Security issue resolution](#security-issue-resolution)
* [Appendix](#appendix)

---

## Metadata

A table at the top for quick reference information, later used for indexing.

| | |
|--|--|
| Assessment Stage | Incomplete |
| Software | [A link to the Copacetic's repository](https://github.com/project-copacetic/copacetic) |
| Security Provider | Yes |
| Languages | Go |
| SBOM | Each release generates SBOMs - [SBOMs under "Assets"](https://github.com/project-copacetic/copacetic/releases) |

### Security links

| Doc | url |
|--|--|
| Security file | [Github Project](https://github.com/project-copacetic/copacetic/blob/main/SECURITY.md) |

---

## Overview

Copacetic is an open source container patching tool designed to surgically replace vulnerable files within container images without requiring image rebuilds or access to source Dockerfiles. It is the CNCF's first container-level patching tool focused on improving vulnerability remediation workflows.

### Background

Container images often contain third-party dependencies that are vulnerable to CVEs. Remediating these vulnerabilities traditionally involves rebuilding the image from source, a process which is slow, error-prone, and requires access to build-time tooling that may not be available. Copacetic fills this gap by offering a surgical patching capability that adds a new layer to the container image with the updated dependencies, enabling faster remediation and compliance for container-based applications.

### Actors

- **Copacetic CLI:** Copacetic’s core is a command-line tool written in Go that orchestrates the entire patching process. It acts as a frontend to the BuildKit image builder, taking an existing container image (by reference) and an optional vulnerability scan report as inputs. 
The CLI parses the vulnerability report, coordinates fetching the necessary updates, and invokes BuildKit to apply patches. If the vulnerability report is omitted, Copacetic updates all outdated packages in the image. The Copacetic CLI runs on the user’s machine or CI environment.
- **BuildKit Engine:** BuildKit is the container build engine that Copacetic leverages to perform image modifications in a safe, isolated manner. For safe and isolated - BuildKit executes update commands inside ephemeral build containers; the target image filesystem is mounted in the builder and mutations are captured as a new layer. 
We recommend running BuildKit in rootless mode or within a containerized daemon and, if exposing BuildKit over TCP, using mTLS between client and daemon. Copacetic does not run update commands on the host. Trust assumptions: we trust the BuildKit daemon and its worker runtime, plus any helper images used during patching. 
Isolation specifics: (a) ephemeral containers for update steps; (b) no host filesystem writes; (c) hardened deployment: rootless where possible; mTLS recommended when BuildKit is remote. Trust boundary: BuildKit and its worker (runc/containerd) must be trusted components.
- **Vulnerability Scanner (External):** Copacetic itself does not scan for vulnerabilities; it relies on an external container vulnerability scanner to produce an input report for packages. The scanner’s output is consumed by Copacetic’s parser. If no scanner report is provided, Copacetic’s patching capability is limited to known package updates only.
- **OS Package Manager & Update Tools:** As part of the patching process, Copacetic utilizes the target Linux distribution’s package manager tools (e.g., `apt`, `apk`) to obtain and install updates. These tools aren’t long-running actors but are invoked within the BuildKit environment. If the target image lacks the necessary package manager or metadata, Copacetic’s BuildKit instructions will pull in a helper container to provide the needed package databases and binaries.
- **Repository trust model:** Copacetic defers authenticity and integrity checks to the target OS package manager.
  - **Debian/Ubuntu (APT):** APT verifies repository **metadata** signatures via apt-secure (signed `InRelease` or `Release` + `Release.gpg`) using trusted archive keys; package payloads are verified by **hashes referenced in the signed metadata**.
  - **Alpine (apk):** `apk` verifies **package** and signatures using RSA public keys in `/etc/apk/keys/`. Only repositories whose keys are present/trusted will install.
  - Across all ecosystems, Copacetic uses official repositories.

- **Container Registries:** Copacetic has the ability to rely on the user’s local Docker or container runtime configuration to authenticate with private registries. Copacetic can push a patched image to a registry.
- **QEMU:** QEMU is a tool Copacetic connects to for emulating different architecture environments, in order to support multi-arch patching.
- **GitHub Actions:** Copacetic provides a GitHub Action for users who want to utilize it in GitHub CI/CD pipelines as a first-class integration.
- **Docker Desktop Users:** Copacetic provides a Docker Desktop extension for users who prefer a GUI interface.

### Actions

- **Parse Vulnerability Report (Optional):**  
  If performing targeted patching, the Copacetic CLI begins by reading the vulnerability scan report provided by the user. It parses this report via a plugin or built-in logic to produce an Update Manifest – a list of packages in the image that have available security updates, along with the required versions.

- **Prepare Patching Environment:**  
  Copacetic sets up an isolated environment to apply patches using BuildKit. It mounts the target image’s filesystem and retrieves package metadata. If the image lacks necessary tooling, Copacetic pulls a base image to supply them. These tools are injected in a transient layer to enable consistent patching.

- **Obtain and Process Updates:**  
  Copacetic uses the respective package manager inside the sandbox to fetch update packages from trusted OS repositories. These are limited to only the packages listed in the Update Manifest. Package verification, including signatures and checksums, is handled by the native package manager.

- **Apply Patches to Image:**  
  Copacetic applies the updates to the image’s filesystem using BuildKit’s diff/merge capabilities and commits the changes as a new layer. The original image is not altered. The patched image is a new artifact created alongside the original, typically with a new tag.

- **Output and Reporting:**  
  Users can optionally generate a VEX (Vulnerability Exploitability eXchange) report documenting which vulnerabilities were fixed. This helps in compliance and audit workflows. Users can also scan the patched image again or push it to a registry using external tools. There's no explicit, built-in in-toto attestation emitted by Copacetic itself, but we are considering this functionality in the future.

- **Registry Operations:**  
  Copacetic pulls source container images from registries and pushes patched container images to registries if selected. This requires appropriate registry credentials and permissions.

- **Multi-Architecture Patching:**  
  If patching a multi-platform image, Copacetic coordinates with QEMU and handles architecture-specific package selection and installation.

### Goals

The goal of the Copacetic project is to simplify vulnerability remediation for container images - to provide the ability to patch critical security vulnerabilities within images quickly without going upstream for a full rebuild.

### Non-goals

- Copacetic does not patch all vulnerabilities - its current capabilities extend to fixable operating system level vulnerabilities, but we are exploring framework/application level ones such as Python.
- Copacetic does not guarantee that patching won’t break application logic or that every single library-level vulnerability is covered.
- Copacetic does not handle patching EOL (End of Life) images.

---

## Self-assessment use

This self-assessment is created by the Copacetic team to perform an internal analysis of the project's security. It is not intended to provide a security audit of Copacetic, or function as an independent assessment or attestation of Copacetic's security health.

This document serves to provide Copacetic users with an initial understanding of Copacetic's security, where to find existing security documentation, Copacetic plans for security, and general overview of Copacetic security practices, both for development of Copacetic as well as security of Copacetic.

This document provides the CNCF TAG-Security with an initial understanding of Copacetic to assist in a joint-assessment, necessary for projects under incubation. Taken together, this document and the joint-assessment serve as a cornerstone for if and when Copacetic seeks graduation and is preparing for a security audit.

---

## Security functions and features

- **Full-Filesystem Patching for Consistency:**  
  Copacetic patches the container image as a unified filesystem rather than modifying individual layers. This ensures that after patching, the image is consistent and secure. By applying updates in a composite step, Copacetic avoids residual vulnerabilities that could be masked by Docker layering. All vulnerable files, even those in upper layers, are patched in-place.

- **Isolated Patching Environment (Build Sandbox):**  
  All patching actions are performed within an isolated BuildKit sandbox. Update commands run in a containerized environment, preventing the patching process from affecting the host system. This containment model ensures that even if malicious scripts exist in a package or image, they cannot compromise the system. Secure connection methods are used to interface with BuildKit, and insecure ones are discouraged.

- **Verified Package Updates via OS Package Managers:**  
  Copacetic relies on the image’s package manager (e.g., `apt`, `apk`) to retrieve and install updates. These package managers use existing mechanisms like GPG signatures and HTTPS to verify the authenticity and integrity of updates.

- **Minimal Patch Layer (Non-Destructive Updates):**  
  Copacetic appends a single patch layer on top of the original image, preserving the original layers and provenance. This design enables easy auditing and minimizes the potential for introducing new issues. Furthermore, on subsequent patches, Copacetic will only create one new patch layer and preserve previous patches to prevent a large cumulation of patched layers.

- **Extensible Scanner Integration:**  
  Copacetic supports pluggable vulnerability scanners, allowing users to choose trusted tools aside from Trivy like Grype. This enables alignment with internal security policies and reduces reliance on any single source of vulnerability intelligence.

- **VEX Report Generation (Transparency of Fixes):**  
  After patching, Copacetic can generate a VEX report that lists the fixed vulnerabilities and the associated patched image. This supports security transparency and is useful for compliance and governance. The report follows the OpenVEX format and can be consumed by policy engines.

- **Use of Existing Authentication Mechanisms:**  
  Copacetic does not implement custom authentication. It uses Docker or BuildKit’s existing credentials and environment to access private registries and resources. This avoids introducing new secrets or risk points.

---

## Project compliance

Copacetic has no written record of complying with a well known security standard like FIPS.

---

## Secure development practices

- **Development Pipeline:** Copacetic maintains its codebase in a public repository on GitHub. Contributors are asked to follow the [Contributing.md](https://github.com/project-copacetic/copacetic/blob/main/CONTRIBUTING.md)  
  - Contributors are required to sign their commits.  
  - One approving reviewer/maintainer is required to merge a PR.  
  - Vulnerabilities are fixed with Dependabot.  
  - As a PR gate, we employ the following:  
    - CodeQL  
    - OpenSSF dependency review + best practices/scorecard  
    - Integration Checks  
    - Pinning GitHub actions to digest  
    - Minimum permissions for actions workflows  

- **Communication Channels:**  
  - Internal: Through the Copacetic Slack channel or our weekly Zoom Community meetings.  
  - Inbound: Through Slack, GitHub Issues, or by attending the weekly Zoom Community meetings.  
  - Outbound: Typically through Slack/GitHub Issues, but we also have a mailing list - [project-copa@googlegroups.com](mailto:project-copa@googlegroups.com).

- **Ecosystem:** Copacetic fits into the Cloud-Native ecosystem by providing patching capabilities that can be plugged into container build and release pipelines. Copacetic is often plugged into CI/CD pipelines and also has integrations with registries such as Azure Container Registry.

---

## Security issue resolution

- **Responsible Disclosures Process:** For any security related disclosures, the Copacetic team will follow the [Security.md](https://github.com/project-copacetic/copacetic/blob/main/SECURITY.md) and release a GitHub Security Advisory.  
  - Vulnerability Response Process: Maintainers are responsible for responding and handling external and internal security disclosures.

- **Incident Response:** For any incidents, it can be reported through a [private vulnerability report form](https://github.com/project-copacetic/copacetic/security/advisories/new) featured on our Copacetic's [Security.md](https://github.com/project-copacetic/copacetic/blob/main/SECURITY.md).

---

## Appendix

- **Known Issues Over Time:** No past vulnerabilities  
- **Open SSF Best Practices:** Project Copacetic continuously works towards best practices - and has attained the OpenSSF best practices badge, as featured on our [GitHub project page](https://github.com/project-copacetic/copacetic).  
- **Case Studies:**  
  - One typical use case is to inject a Copacetic task into a user's CI/CD pipeline. This ensures that the respective image has minimal to no OS package vulnerabilities before reaching deployment, including but not limited to Kubernetes.  
  - Another typical use case is to run Copacetic continuously within a container registry. Vulnerabilities can be discovered at any time, and in order to safeguard images stored in a registry, Copacetic can continuously patch images to ensure the respective image is vulnerability-free before being pulled.  
- **Copacetic’s project [governance](https://github.com/project-copacetic/copacetic/blob/main/GOVERNANCE.md).**
