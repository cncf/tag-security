<!-- cSpell:ignore Flux GitOps OCI k8s KinD CRDs SLSA Cosign Syft Rekor Makefiles Kustomization Kustomizations subprojects Lockdown lockdown-->

# CNCF Flux Self Assessment

This draft serves as a self-assessment for Flux’s security posture and GitOps practices. It follows the structure of the established self-assessment template.

## Table of Contents

- [Metadata](#metadata)
  - [Security Links](#security-links)
- [Overview](#overview)
  - [Actors](#actors)
  - [Actions](#actions)
  - [Background](#background)
  - [Goals](#goals)
  - [Non-Goals](#non-goals)
- [Self-Assessment Use](#self-assessment-use)
- [Security Functions and Features](#security-functions-and-features)
- [Project Compliance](#project-compliance)
- [Secure Development Practices](#secure-development-practices)
- [Security Issue Resolution](#security-issue-resolution)
- [Appendix](#appendix)

## Metadata

|                   |                                                                                                                                                                                                                |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Assessment Stage  | Draft                                                                                                                                                                                                          |
| Software          | [Flux](https://github.com/fluxcd/flux2)                                                                                                                                                                        |
| Website           | <https://fluxcd.io>                                                                                                                                                                                            |
| Security Provider | Flux is a security provider in a GitOps context by providing features such as multi-tenancy lockdown, Kubernetes secrets decryption, OCI artifacts integrity verification and Git commit signing verification. |
| Languages         | Go                                                                                                                                                                                                             |
| SBOM              | Flux ships SBOMs for all its components, the SBOMs are embedded as OCI layers in the Flux container images.                                                                                                    |

### Security Links

| Doc                      | URL                                                                                                                                |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------|
| Security Policy          | [https://fluxcd.io/security/](https://fluxcd.io/security/)                                                                         |
| Security Best Practices  | [https://fluxcd.io/flux/security/best-practices/](https://fluxcd.io/flux/security/best-practices/)                                 |
| SLSA Assessment          | [https://fluxcd.io/flux/security/slsa-assessment/](https://fluxcd.io/flux/security/slsa-assessment/)                               |
| Secrets Management       | [https://fluxcd.io/flux/security/secrets-management/](https://fluxcd.io/flux/security/secrets-management/)                         |
| Flux multi-tenancy       | [https://fluxcd.io/flux/installation/configuration/multitenancy/](https://fluxcd.io/flux/installation/configuration/multitenancy/) |
| Vulnerability Disclosure | [https://github.com/fluxcd/flux2/security](https://github.com/fluxcd/flux2/security)                                               |

## Overview

Flux is a tool for keeping Kubernetes clusters in sync with sources of configuration (like Git repositories) and automating updates when new code is deployed. Built from the ground up to leverage Kubernetes' API extension system, Flux integrates with Prometheus and other core components of the Kubernetes ecosystem. It supports multi-tenancy and the synchronization of an arbitrary number of Git repositories, OCI artifacts, and S3-compatible buckets.

### Actors

Actors are defined according to the separation between Flux components as represented in the Git repositories architecture. Each actor has its own role, scope, and repository.

In the Flux Ecosystem, the actors are the `flux` CLI, the Flux GitOps Toolkit (Go SDK) and the Flux controllers.

Flux controllers are Go applications that communicate with the Kubernetes API and continuously reconcile the cluster desired state
through APIs implemented as Kubernetes custom resources (CRDs and CR objects).
Each controller is core to Flux, with a specific scope and integrations with external systems (e.g., Git repositories, container registries, object storage, alerting systems, KMS systems).

Documentation for each controller and API is available on the Flux website:

- [Source Controller](https://fluxcd.io/flux/components/source/)
  - [GitRepository API](https://fluxcd.io/flux/components/source/gitrepositories/)
  - [OCIRepository API](https://fluxcd.io/flux/components/source/ocirepositories/)
  - [HelmRepository API](https://fluxcd.io/flux/components/source/helmrepositories/)
  - [HelmChart API](https://fluxcd.io/flux/components/source/helmcharts/)
  - [Bucket API](https://fluxcd.io/flux/components/source/buckets/)
- [Kustomize Controller](https://fluxcd.io/flux/components/kustomize/)
  - [Kustomization API](https://fluxcd.io/flux/components/kustomize/kustomizations/)
- [Helm Controller](https://fluxcd.io/flux/components/helm/)
  - [HelmRelease API](https://fluxcd.io/flux/components/helm/helmreleases/)
- [Notification Controller](https://fluxcd.io/flux/components/notification/)
  - [Provider API](https://fluxcd.io/flux/components/notification/providers/)
  - [Alert API](https://fluxcd.io/flux/components/notification/alerts/)
  - [Receiver API](https://fluxcd.io/flux/components/notification/receivers/)
- [Image Automation Controllers](https://fluxcd.io/flux/components/image/)
  - [ImageRepository API](https://fluxcd.io/flux/components/image/imagerepositories/)
  - [ImagePolicy API](https://fluxcd.io/flux/components/image/imagepolicies/)
  - [ImageUpdateAutomation API](https://fluxcd.io/flux/components/image/imageupdateautomations/)

#### Flux CLI

The Flux CLI is a command-line tool for managing Flux controllers, bootstrapping GitOps environments, and interacting with Flux custom resources. It supports workflows such as bootstrap, reconcile, create, delete, and suspend—streamlining GitOps operations through automation.

#### Flux GitOps Toolkit

The Flux GitOps Toolkit (SDK) provides shared Go libraries and utilities used across all Flux controllers. It enables consistent behavior for GitOps operations, source handling, authentication, and runtime behavior. The toolkit includes modules for Git, Helm, Kustomize, OCI, authentication, SSA (server-side apply), and more, supporting functionalities like reconciliation, patching, event recording, and caching.

#### source-controller

The source-controller fetches, verifies, and caches configuration from external sources (Git, Helm, OCI, Buckets) as versioned, in-cluster artifacts, enabling other controllers to consume consistent, immutable resources for reconciliation.

**Custom Resources:**

- **GitRepository:** References a Git repository and tracks specific branches, commits, or tags.
- **OCIRepository:** References a container registry for pulling OCI artifacts based on tags and semver expressions.
- **Bucket:** References an S3-compatible object storage bucket for pulling Kubernetes manifests.
- **HelmRepository:** Defines an external Helm chart repository for pulling Helm index files.
- **HelmChart:** Resolves and fetches Helm charts from a Helm repository, a Git repository or an OCI repository.

It also feeds artifacts to the kustomize-controller and helm-controller and triggers updates via Kubernetes API watches.

#### kustomize-controller

The kustomize-controller renders and applies Kubernetes manifests using Kustomize, enabling declarative delivery of infrastructure and workloads. It supports secrets decryption, multi-tenancy, and garbage collection.

**Custom Resources:**

- **Kustomization:** Handles fetching, decrypting, building, validating, and applying Kustomize overlays or plain Kubernetes manifests.

It consumes artifacts from the source-controller and integrates with the notification-controller for alerting and reconciliation.

#### helm-controller

The helm-controller manages Helm chart releases declaratively through Kubernetes manifests, automating install, upgrade, test, rollback, and uninstall operations. It supports dependency ordering and advanced remediation strategies.

**Custom Resources:**

- **HelmRelease:** Defines a desired Helm release from a chart and its configuration.

It consumes Helm charts resolved by the source-controller and integrates with the notification-controller for alerting and reconciliation.

#### notification-controller

The notification-controller routes events between Flux controllers and external systems, enabling automated alerts, status reporting, and reconciliation triggers based on inbound or outbound events.

**Custom Resources:**

- **Alert:** Defines when and how to send notifications for object status changes.
- **Receiver:** Specifies how to receive inbound webhooks from external systems.
- **Provider:** Specifies external services to send notifications to (e.g., Slack, Teams).

It also supports a standard JSON event API (the only non-CRD API) for emitting status and triggering actions.

#### image-reflector-controller

The image-reflector-controller scans container registries and reflects image metadata into Kubernetes resources, enabling GitOps workflows that react to new image versions.

**Custom Resources:**

- **ImageRepository:** Defines a container registry source and pull policy.
- **ImagePolicy:** Selects the desired image version based on tag patterns or semantic rules.

It exposes the latest image versions, which are then used by the image-automation-controller.

#### image-automation-controller

The image-automation-controller updates Kubernetes manifests in Git based on the latest image metadata, enabling automated, version-aware deployments through GitOps.

**Custom Resources:**

- **ImageUpdateAutomation:** Defines how and where to update image references in Git repositories.

It consumes image data from the image-reflector-controller and pushes updated manifests back to Git for reconciliation.

## Actions

### GitOps Reconciliation

The system watches a version-controlled Git repository for configuration changes,
validates the repository’s authenticity and access permissions, and applies those
changes to the Kubernetes cluster to reconcile it with the declared state.

Besides Git, Flux supports other sources such as container registries and S3-compatible object storage,
these sources are usually used as intermediate storage between the Git repositories and the cluster.

To facilitate the decoupling of GitOps workflows from the Git provider, the Flux project provides
an OCI Artifact media type `application/vnd.cncf.flux.content.v1.tar+gzip` for storing Git repository contents
in container registries. The Flux OCI Artifacts can be signed with Cosign or Notary Notation and verified
in the cluster to ensure the integrity of the artifacts.

For more information on how the Flux CLI can be used to manage artifacts, including signing and verification,
see the [Flux OCI Artifacts](https://fluxcd.io/flux/cheatsheets/oci-artifacts/) guide.

### GitOps-Driven Delivery

Flux controllers receive reconciliation requests, retrieve configuration artifacts from trusted sources,
and apply desired state changes to the cluster including garbage collection of stale resources.

In the final stage of the reconciliation, the Flux controllers perform a series of health checks
to ensure that the rollout was successful and that the managed workloads have reached the desired state.

Access control to Kubernetes API is enforced through RBAC, each controller operating within the scope
of its own service account or if multi-tenancy is enabled, using the service account assigned to a tenant namespace.

### Source Reconciliation

The source-controller polls external systems such as Git, OCI, or S3, authenticates using provided credentials,
and fetches artifacts representing the desired system state.

The source-controller can be configured to verify the integrity of the upstream sources using cryptographic signatures:

- **Git:** Verifies commit signatures using OpenPGP keys.
- **OCI:** Verifies OCI artifact signatures using Sigstore Cosign or Notary Notation.

### Cluster Reconciliation

The kustomize-controller reads the defined configuration from validated sources
and performs a series of operations to decrypt, build, validate, and apply the configuration to the cluster.
The kustomize-controller relies on Kubernetes server-side apply (SSA) and only performs actions
on resources that have drifted from the desired state.

The helm-controller reads the defined Helm charts from validated sources
and performs a series of operations using the Helm Go SDK to install, upgrade, test,
rollback, and uninstall Helm releases. The helm-controller actions are identical to the
Helm CLI commands, except for Kubernetes CRDs lifecycle management. Flux keeps the CRDs in sync
with the desired state as defined in Helm charts, while the Helm CLI ignores CRDs changes during
upgrades which can lead to various issues for the underlying controllers.

Both controllers are capable of drift detection and correction, if live resources are manually altered,
they are reverted, ensuring that the declared state in Git remains authoritative.

Note that the drift detection and correction is not a security feature, Flux allows users to
disable the reconciliation of Kustomizations and HelmReleases and also allows users to
ignore certain resources from being corrected.

### Cluster Bootstrap

The bootstrap process installs Flux into a target cluster by applying manifests that define its
components and configuration. It sets up a GitRepository and Kustomization to manage itself,
pushing this configuration to a version-controlled repository. Authentication is enforced via CLI
credentials or service accounts, and Flux begins reconciling itself like any other resource post-setup.

### Audit Trail

The Flux controllers follow the Kubernetes structured logging conventions. The
logs are in JSON format and can be collected and analyzed to monitor the operations of the controllers.

The Flux controllers support structured logging with the following common labels:

- `level` can be `debug`, `info` or `error`
- `ts` timestamp in the ISO 8601 format
- `msg` info or error description
- `error` error details (present when `level` is `error`)
- `controllerGroup` the Flux CR group
- `controllerKind` the Flux CR kind
- `name` The Flux CR name
- `namespace` The Flux CR namespace
- `reconcileID` the UID of the Flux reconcile operation
- `revision` the revision of the source that was reconciled (Git commit SHA, OCI digest, etc.)
- `output` the list of Kubernetes resources that were applied to the cluster including the action taken (`created`, `configured`, `deleted`)

In addition to logs, the Flux controllers emit Kubernetes events for all operations and status changes.
These events are annotated with details on the involved resources, allowing end-users to leverage events,
metrics, alerts, and traces for real-time visibility into reconciliation progress, successes, and failures.

## Background

Flux is a GitOps-based continuous delivery tool for Kubernetes that automates the deployment and lifecycle management of infrastructure and applications.
It implements the GitOps methodology by continuously reconciling the declared state in a Git repository with the actual state of a Kubernetes cluster using a secure, pull-based model.

The Flux project provides a collection of Kubernetes-native controllers (the GitOps Toolkit) that manage source fetching, configuration rendering, image updates, and deployment reconciliation.
These components work together to apply declarative infrastructure changes, support progressive delivery strategies, and enable secure, multi-tenant operations.
Unlike traditional CI/CD systems, Flux operates entirely within the cluster and is designed with minimal privileges, strong auditability via Git, and compatibility with tools like Kustomize, Helm, and SOPS.

GitOps presents challenges such as maintaining security across multiple environments, ensuring consistent deployments at scale, and enabling safe automation of changes.
Flux addresses these challenges by enforcing least-privilege access, supporting namespace-scoped isolation, integrating with policy engines, and providing a fully auditable, version-controlled deployment pipeline.

## Goals

### Generic Goals

- Empower users to leverage GitOps for both applications and infrastructure using declarative, version-controlled configuration.
- Remain non-opinionated and adaptable to user's constraints.
- Scale with company growth and evolving continuous delivery needs.
- Ensure robust disaster recovery capabilities.
- Provide an open and extensible set of tools for continuous and progressive delivery on Kubernetes.
- Integrate seamlessly with existing CI/CD pipelines, Git providers, container registries, and cloud-native tooling.
- Offer strong interoperability with popular Kubernetes tools like Kustomize, Helm, Prometheus, and admission controllers.
- Enable interactions with tools beyond the native scope through custom controllers.
- Foster a vibrant open source ecosystem of dashboards, UIs, and hosted services built on top of Flux.

### Security Goals

- Design Flux with a secure-by-default architecture that enables auditable, isolated, and compliant GitOps workflows.
- Enforce a pull-based deployment model to avoid external push-based access into the cluster, thereby minimizing the attack surface.
- Utilize minimal and scoped permissions via Kubernetes-native RBAC, service account impersonation, and namespace-scoped resources to adhere to the principle of least privilege.
- Support multi-tenancy and namespace isolation to ensure that different teams or applications can operate independently without interference.
- Guarantee that all changes are auditable through Git history, pull requests, and signed commits.
- Integrate with Cosign, Notary and OpenPGP for signature verification of OCI artifacts, Helm charts and Git commits to ensure the integrity and authenticity of deployed artifacts.
- Support secure data handling with TLS and SSH for transport encryption, integration with secret management tools (e.g., Mozilla SOPS, KMS), and prevention of sensitive data exposure.
- Integrate with policy engines and admission controllers to validate and gate configuration changes before application.

## Non-Goals

### General Non-Goals

- Flux does not aim to replace or serve as a general-purpose CI/CD system; it complements existing CI tools but does not handle build, test, or container image packaging tasks.
- Flux does not provide a user interface or dashboard out of the box; while UIs exist in the ecosystem, Flux is inherently CLI- and Kubernetes-native.
- Flux does not manage or provision cloud infrastructure directly (e.g., no built-in support for Terraform or cloud APIs); infrastructure management must be defined declaratively through Kubernetes CRDs or Git.
- Flux does not offer its own policy engine, configuration management language, or DSL—instead, it integrates with existing tools like Kubernetes CEL Validating Admission Policy, OPA and Kyverno.

### Security Non-Goals

- Flux does not secure the Git provider itself; repository permissions, branch protections, and access controls must be managed externally.
- Flux does not encrypt or protect secrets at rest; it relies on Kubernetes-native secret management and external tools (e.g., SOPS, Sealed Secrets, Vault) for handling secrets encryption.
- Flux does not guarantee the security or compliance of third-party integrations such as container registries or image scanners—users must secure these components independently.
- Flux does not aim to detect or prevent malicious activity within a Git repository; unless Git commit signature verification is enabled.
- Flux does not aim to detect or prevent malicious activity within a container registry; unless OCI artifact signature verification is enabled.
- Flux does not aim to detect or prevent malicious activity within S3-compatible object storage.
- Flux does not prevent misconfigurations in reconciliation intervals, RBAC, or source definitions that could lead to drift, privilege escalation, or DDoS risks.

## Self-Assessment Use

This section is intended for internal evaluation of Flux’s security posture and operational practices.

This self-assessment is not intended to provide a security audit of Flux, or function as an independent assessment or attestation of Flux security health.

CNCF has sponsored several security audits for the Flux project, the most recent one was performed by **Trail of Bits**, the final report can be fund at [https://fluxcd.io/flux-security-report-with-review-2023.pdf](https://fluxcd.io/flux-security-report-with-review-2023.pdf).

## Security Functions and Features

See the Actors and Actions sections for detailed descriptions of critical security components and their interactions.

### Critical Security Components

- **Built-in Authentication and Transport Security:**
  Flux enforces secure, pull-based deployments by using TLS and SSH for all communications and by verifying the authenticity of external sources using Git commit signatures and OCI artifacts signatures. This ensures that only trusted sources are used for reconciliation.

- **Workload Identity:**
  Flux integrates with Kubernetes Workload Identity to authenticate with external systems (e.g., Git, OCI, S3, KMS) hosted by Cloud vendors (Azure, AWS, GCP). This eliminates the need for static credentials and minimizes the risk of credential leakage.

- **Immutable and Auditable Configuration:**
  By relying on Git as the single source of truth, Flux guarantees that all configuration changes are immutable and fully auditable via Git commit history. This design minimizes the risk of unauthorized changes and enables rapid rollback.

- **Native RBAC and Service Account Impersonation:**
  Flux leverages Kubernetes-native RBAC and service account impersonation to restrict controller permissions, ensuring that each component accesses only the resources necessary for its operation.

### Security Relevant Features

- **Multi-Tenancy Lockdown:**
  Flux supports assigning Kubernetes Service Accounts to external sources (Git, OCI, Buckets, Helm charts), allowing cluster admins to define which repositories can access specific namespaces using plain Kubernetes RBAC. This feature enables multi-tenancy and namespace isolation, ensuring that different teams or applications can operate independently without altering each other's configurations.

- **Provenance and integrity verification:**
  Flux supports verifying the integrity and provenance of OCI artifacts and Helm charts signed with Cosign private keys, Cosign keyless (OIDC) and Notary Notation private keys.
  For Git repositories, Flux can verify the authenticity of commits using OpenPGP signatures. This ensures that only trusted sources are reconciled to the cluster.

- **Secrets Management:**
  Flux integrates with secret management solutions like CNCF SOPS, AWS KMS, Azure Key Vault, Google Cloud KMS and Hashicorp Vault, enabling sensitive data to be encrypted at rest and managed securely.

- **Policy and Admission Controller Integration:**
  Flux can integrate with external policy engines and admission controllers (e.g., Kubernetes CEL Validating Admission Policy, OPA, Kyverno) to validate configuration changes before application, enhancing overall security.

- **Pod Security and Hardening:**
  Flux controller deployments adhere to Kubernetes restricted pod security standards—including non-root execution, read-only filesystems, minimal Linux capabilities, and seccomp profiles—to reduce the attack surface.
  Flux controllers use Go native libraries for cryptographic operations, ensuring that sensitive data is handled securely and minimizing the risk of vulnerabilities associated with third-party libraries.

## Project Compliance

Flux does not currently claim formal certification against regulatory frameworks such as ISO 27001, SOC 2, HIPAA, or PCI-DSS, as these typically apply to commercial services rather than open-source components. However, Flux aligns with open-source best practices and supply chain security standards—particularly through its adoption of the SLSA framework at Build Level 3 and its publication of SBOMs and signed artifacts.

Flux follows CNCF Security Best Practices which have been assessed by the CNCF Security TAG as part of project graduation. It employs tools like Sigstore, GitHub OIDC, and GitHub Actions for provenance and artifact signing, documenting these practices in its Security documentation.

While not subject to specific legal compliance mandates, Flux is built with enterprise-readiness and security in mind, providing mechanisms (e.g., RBAC, multi-tenancy, auditability via Git, policy integration) to support downstream compliance needs.

## Secure Development Practices

### Development Pipeline

All code is maintained on GitHub. The project enforces security best practices across its repositories and offers guidance to contributors. All Flux CD GitHub repositories are available at: [https://github.com/fluxcd](https://github.com/fluxcd).

### Contributions and Changes

- Code changes are submitted via Pull Requests (PRs). Contributors must sign off on commits using the Developer Certificate of Origin (DCO) to certify that they have the right to submit the code and that it is not subject to any third-party licenses.
- Direct commits to the main branch are disallowed; all changes undergo peer review and CI checks.
- GitHub branch protection rules enforce review and testing workflows.
- Commit signing is required for maintainers and encouraged for all contributors.

### Code Review

- Every PR must be reviewed and approved by at least one project maintainer.
- RFCs with architectural changes require review and approval by at least two core maintainers.
- The CORE-MAINTAINERS file from the Flux community repository is used to assign reviewers.

### Automated Testing

- Each PR triggers GitHub Actions workflows that run unit tests, integration tests, and fuzzing jobs.
- End-to-end tests are executed in a Kubernetes-in-Docker (KinD) cluster with simulated deployment scenarios, including impersonation, CRD management, Helm, OCI, overlays, and dependency ordering.
- Static analysis is performed using CodeQL with Go security and quality queries; results are published to GitHub’s Security dashboard.
- License and dependency scanning is conducted using FOSSA, ensuring compliance and awareness of third-party usage.
- CI jobs verify that generated manifests are up-to-date and fail if the working tree is dirty after tests.

### Dependency Management

- Dependencies are managed using automated tools such as GitHub Dependabot, which regularly updates Go modules and key packages via pull requests.
- Flux controller images are minimal—based on Alpine and statically compiled Go binaries—reducing the attack surface.
- Each release includes a detailed SBOM listing Go modules and OS packages to support transparency and vulnerability tracking.
- The Flux team actively monitors for CVEs in upstream dependencies and Alpine packages, issuing patch releases promptly when vulnerabilities are discovered.

### Release Integrity

- All releases are automated via GitHub Actions using version-controlled workflows and Makefiles.
- Every release includes a Software Bill of Materials (SBOM) in SPDX format, generated with Syft.
- Container images are immutable and signed using Sigstore Cosign with GitHub OIDC, then verified in Rekor transparency logs.
- SLSA provenance attestations (Level 3) are generated per architecture using GitHub-hosted runners and the official [SLSA GitHub Generator](https://github.com/slsa-framework/slsa-github-generator).
- Provenance metadata, including SHA-256 digests of artifacts, is cryptographically signed and decoupled from the build environment to ensure isolation and integrity.

### Communication Channels

**Internal:**
Discussions among Flux contributors take place on the `#flux-contributors` channel in the CNCF Slack workspace.

**Incoming:**
Requests and questions can be submitted on the `#flux` channel in the CNCF Slack workspace or on GitHub Discussions.

**Outgoing:**
Announcements are made on the `cncf-flux-dev` mailing list.

## Security Issue Resolution

### Responsible Disclosure Process

The Flux project follows a documented Security Policy for responsible disclosure. Vulnerabilities should be reported through GitHub’s private reporting mechanism, which opens a confidential issue visible only to project maintainers. This process ensures a secure and direct communication channel between external reporters and the Flux maintainers. Relevant contributors or SIG members may be involved as needed, with confidentiality maintained until a fix and coordinated disclosure plan are in place.

### Vulnerability Response Process

Security reports are reviewed by the Flux core maintainers, who handle triage, risk assessment, and response coordination. Affected components are evaluated for impact, and patches or mitigations are prioritized and implemented accordingly. Once a fix is available, maintainers issue a patch release and update the project’s GitHub Security Advisories, including signed artifacts and changelog entries that identify the resolved CVEs.

### Incident Response

Security incidents follow a structured workflow:

- **Triage:** Confirm the validity and severity of the report.
- **Coordination:** Collaborate privately on a fix, involving affected subprojects as necessary.
- **Patch:** Prepare and test patches under embargo.
- **Disclosure:** Publicly release fixes via GitHub with detailed changelogs and signed releases.
- **Notification:** Communicate the advisory via GitHub, the Slack `#flux` channel, and Flux release channels.

The Flux team strives to issue fixes promptly, adhering to CNCF and open source best practices for vulnerability handling.

## Appendix

### CII Best Practices

Flux has achieved the [CII silver badge](https://www.bestpractices.dev/en/projects/4782) and is in the process of working towards attaining a gold badge.
The CII badge is displayed on the Flux's primary repository at [https://github.com/fluxcd/flux2](https://github.com/fluxcd/flux2).

### OpenSSF Scorecard

Flux runs in CI the OpenSSF Scorecard GitHub Action on every commit to the main branch and on a weekly basis.
The latest results are available at [https://scorecard.dev/viewer/?uri=github.com/fluxcd/flux2](https://scorecard.dev/viewer/?uri=github.com/fluxcd/flux2)
and the OpenSSF scorecard badge is displayed on the Flux's primary repository at [https://github.com/fluxcd/flux2](https://github.com/fluxcd/flux2).
