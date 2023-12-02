# OpenKruise Self-assessment

The Self-assessment is the initial document for projects to begin thinking
about the security of the project, determining gaps in their security, and
preparing any security documentation for their users. This document is ideal
for projects currently in the CNCF **sandbox** as well as projects that are
looking to receive a joint assessment and currently in CNCF **incubation**.

For a detailed guide with step-by-step discussion and examples, check out the free Express Learning course provided by Linux Foundation Training & Certification:
[Security Assessments for Open Source Projects](https://training.linuxfoundation.org/express-learning/security-self-assessments-for-open-source-projects-lfel1005/).

# Self-assessment outline

## Table of contents

- [Metadata](#metadata)
  - [Security links](#security-links)
- [Overview](#overview)
  - [Actors](#actors)
  - [Actions](#actions)
  - [Background](#background)
  - [Goals](#goals)
  - [Non-goals](#non-goals)
- [Self-assessment use](#self-assessment-use)
- [Security functions and features](#security-functions-and-features)
- [Project compliance](#project-compliance)
- [Secure development practices](#secure-development-practices)
- [Security issue resolution](#security-issue-resolution)
- [Appendix](#appendix)

## Metadata

A table at the top for quick reference information, later used for indexing.

|                   |                                                                                                                                                                              |
|-------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Software          | https://github.com/openkruise/kruise                                                                                                                                         |
| Security Provider | No. OpenKruise is an extended component suite for Kubernetes, which mainly focuses on application automations, such as deployment, upgrade, ops and availability protection. |
| Languages         | Go, Makefile, Dockerfile, Shell                                                                                                                                              |
| SBOM              | Software bill of materials. [Link to SBOM](./bom-go-mod.json) generated using `cyclonedx-gomod`                                                                              |
|                   |                                                                                                                                                                              |

### Security links

Provide the list of links to existing security documentation for the project.
You may use the table below as an example:

| Doc           | url                                                                         |
|---------------|-----------------------------------------------------------------------------|
| Security file | [SECURITY.md](https://github.com/openkruise/kruise/blob/master/SECURITY.md) |
| Documentation | https://openkruise.io/docs/                                                 |

## Overview

OpenKruise is an open-source project that focuses on extending the capabilities
of Kubernetes. It provides a set of custom controllers and tools to enhance and
simplify application lifecycle management on Kubernetes clusters.

OpenKruise aims to address various aspects of application management, including
rolling updates, canary releases, blue-green deployments, and more. It is
designed to help users automate and manage the deployment and scaling of
applications on Kubernetes with additional features beyond the standard
Kubernetes functionality

### Background

Kubernetes is an open-source platform for declaratively configuring and
automating containerized applications, which are referred to as workloads and
services. While Kubernetes provides some has features for deployment and
management of applications, it's not considered enough by many who aim to do
this in large-scale production clusters.

> OpenKruise is an extended component suite for Kubernetes, which mainly
> focuses on automated management of large-scale applications, such
> as *deployment, upgrade, ops and availability protection*.

A Kubernetes cluster is split into two main components, Control Plane
Components which make global decisions about the cluster and Node Components
which manage Pods and provide the runtime environment. OpenKruise is a set of
additional components that extend the Kubernetes API to support advanced use
cases. In-place Update is one of the key features for updating of images on
Pods. Other key features are Advanced Workloads, Bypass Application Management,
High-availability protection, and High-level operation features.

Most features developed by OpenKruise are based on CRD extensions. This is the
recommended way of extending functionality and doesn't require additional
dependencies. With Custom Resource Definitions (CRD) you can create new
resource types without adding a new API Server.

<figure>
<img src="https://openkruise.io/assets/images/architecture-08f2cb3a5b19c102412f9df77b365eef.png" alt="image" />
<figcaption aria-hidden="true">
The overall architecture of OpenKruise
</figcaption>
</figure>

### Actors

- `kruise-operator`
  - `kubectl-kruise`
  - Golang and Java clients
- `kruise-manager`
  - `kruise-controller`
  - `kruise-webhook`
- `kruise-daemon`
- `kube-apiserver`
- `kubelet`
- Pods and containers

#### `kruise-operator`

The operator is the person administrating or operating the system. This person
has authorization to access the OpenKruise system and perform actions. The
operator interacts with OpenKruise using the CLI or client SDK.

#### `krusie-manager`

This is a control plane component that runs controllers and webhooks.
Logically, each controller is a separate process but to reduce complexity they
are compiled into the same binary running on the API server. It consists of a
`kruise-controller` and `kruise-webhook`.

- `kruise-controller` - Responsible for checking the that the configuration is
  in the desiredstate based on the user-configuration. It checks the resources
  across all of the nodes and ensures they are up-to-date.

- `kruise-webhook` - Used for admission control. It intercepts，validates and
  potentially mutates requests coming from the `kruise-operator`. The
  `kruise-webhook` is important since the `kube-apiserver` will fail the
  request if the calling to the `kruise-webhook` fails.

#### `kruise-daemon`

This runs on every node and manages things like image pre-download and
container restarting. It interacts with the `kruise-manager` indirectly by
calling the API Server which calls through.

#### `kube-apiserver`

The Kubernetes API server validates and configures data for the api objects.
This include pods, services, replicationcontrollers, and other things. It
provides the frontend to the clusters shared state.

#### `kubelet`

The `kubelet` runs on each node. It's the primary "node-agent" that can register
the node with the apiserver so that pods on that node can be managed.

### Actions

These are the steps that a project performs in order to provide some service
or functionality. These steps are performed by different actors in the system.
Note, that an action need not be overly descriptive at the function call level.
It is sufficient to focus on the security checks performed, use of sensitive
data, and interactions between actors to perform an action.

For example, the access server receives the client request, checks the format,
validates that the request corresponds to a file the client is authorized to
access, and then returns a token to the client. The client then transmits that
token to the file server, which, after confirming its validity, returns the file.

#### Operator based action

One of the possible ways of interacting with the system are if a
`kruise-operator` takes a manual action to administer some part of the system
by using the CLI or a client SDK.

##### Actors

- `kruise-operator` - The person administrating or operating the system
- `kubectl-kruise` - Allows user to interact with OpenKruise resources
- `kruise-manager` - Processes user requests and oversees operations
- `kruise-daemon` - Performs tasks at node level and monitors status of nodes

##### Workflow

1.  `kruise-operator` executes `kubctl-kruise` to initiate manual action
    1.  Examples of manual action are scale and rollout
2.  `kubctl-kruise` calls the `kruise-manager` which is part of the Control Plane
3.  `kruise-daemon` calls the `kruise-manager` through the `kube-apiserver`
4.  `kruise-daemon` executes an operation on the node
    1.  Example include pre-image download and container restarting

#### InPlace Update

In-place update is a feature of OpenKruise that allows you to update the image
of a container in a Pod without having to recreate the Pod. This can save time
and resources, as it avoids the need to schedule a new Pod, allocate an IP
address, and mount volumes. In-place update is also faster than recreating a
Pod, as it can reuse the image layers that are already pulled on the node.

##### Actors

- `kruise-manager` - Processes user requests and oversees operations
- `kruise-daemon` - Performs tasks at node level and monitors status of nodes
- `kublet` - Runs on each node and can register the node with the apiserver

##### Workflow

1.  `kruise-manager` starts to update a pod
2.  `kruise-manager` updates the changed fields in the pod
3.  `kubelet` stops the old container
4.  `kubelet` pulls the image, creates, and starts new container
5.  `kruise-manager` updates local conditions for `InPlaceUpdate`
6.  `kubelet` update Pod Status to be ready

#### Declarative configuration

Kubernetes handles Custom Resource Definitions by default. For each component
we want to add from OpenKruise a CRD in the form of a yaml file is specified
with a particular kind and different settings pertaining to that service. Since
handling these definition are part of Kubernetes, they should not be considered
as an action for OpenKruise.

### Goals

#### General

- OpenKruise plays a complementary role to Kubernetes
- Most features work on Kubernetes clusters without any other dependencies
- Provide **Advanced Workloads** which extend basic, default Workloads
- **Decoupled Application Management** to manage apps without modifying Workloads
  - Provide reliable In-Place update for updating existing Pod images
- **High-availability Protection** provides extended ways of protecting availability
- OpenKruise simplifies sidecar injection and enables sidecar In-Place update.
  OpenKruise also enhances the sidecar startup and termination control.
- Multi-domain Management: This can help you manage applications over nodes
  with multiple domains, such as different node pools, available zones,
  architectures (x86 & arm) or node types (kubelet and virtual kubelet)

#### Security

- OpenKruise components should be protected and robust against tampering
- Authenticating and authorizing access OpenKruise to control plane components
- Protect the OpenKruise control plane from being compromised

### Non-goals

#### General

- OpenKruise is **not** a PaaS and it will **not** provide any abilities of PaaS
- Providing ways of managing containers without Kubernetes
- Replacement for kubernetes: OpenKruise is not intended as a means to replace
  kubernetes, rather it is an extension to Kubernetes providing extra features
  on top.
- Standardization of deployment strategies: OpenKruise introduces several
  advanced deployment strategies, it does not aim to standardize these
  strategies across Kubernetes cluster. Users are free to manipulate the
  strategy based on their needs.

#### Security

- OpenKruise doesn't provide additional security for Kubernetes
- No guarantee of security when an attacker has compromised the system

## Self-assessment use

This self-assessment is created by the OpenKruise team to perform an internal
analysis of the project's security. It is not intended to provide a security
audit of OpenKruise, or function as an independent assessment or attestation
of OpenKruise's security health.

This document serves to provide OpenKruise users with an initial understanding
of OpenKruise's security, where to find existing security documentation,
OpenKruise plans for security, and general overview of OpenKruise security
practices, both for development of OpenKruise as well as security of
OpenKruise.

This document provides the CNCF TAG-Security with an initial understanding of
OpenKruise to assist in a joint-assessment, necessary for projects under
incubation. Taken together, this document and the joint-assessment serve as a
cornerstone for if and when OpenKruise seeks graduation and is preparing for a
security audit.

## Security functions and features

Critical:
- Security scanning with Snyk in the CI pipeline identifies vulnerabilities in
container images so only verified images are displayed.
- Security scanning with CodeQL in the CI pipeline identifies variants of known
security vulnerability in the codebase.
- Supporting only recent software versions that provide patches and updates
mitigates general vulnerabilities.

Security Relevant:
- Regularly scanning the code in the main (master) and nightly builds, as well
as in pull requests (PRs) for the Go programming language helps identify any
potential vulnerabilities or issues before release.
- Scanning the container images that are published on the GitHub Container
Registry ensures that the images, which are used to run OpenKruise in a
Kubernetes environment, are secure.

### Threat Modeling with STRIDE

#### Spoofing:

- Threat-01-S: Impersonating an Administrator
- An attacker could impersonate an OpenKruise admin, maintainer, or somebody
  with elevated privilege in order to access data within the containers, code
  repositories, or contributions from other developers.
- Recommended Mitigations
- Assign proper roles (per principle of least privilege) to the users using
  Role Based Authorization Control of Kubernetes.
- Use mutual TLS to confirm that both OpenKruise and the Kubernetes cluster
  authenticate each other's identities before connecting.

#### Tampering:

- Threat-03-T: Altering Critical Components
- OpenKruise components could be tampered with during build, installation, or
  runtime, potentially allowing an attacker to download malware into the host
  system, OpenKruise itself, or Kubernetes.
- Recommended Mitigations
- Use checksums and/or digital signatures to monitor for unauthorized
  modifications.
- Only allow the downloading of OpenKruise components from the official website
  and/or Helm package manager

#### Repudiation:

- Threat-04-R: Denial of Administrator Actions
- OpenKruise admins of Kubernetes applications may deny or misrepresent actions
  they have performed, particularly if they include any changes made to
  configuration updates or scaling within the Kubernetes clusters managed by
  OpenKruise.
- Recommended Mitigations
- Enable the auditing logs of Kubernetes apiserver so any request to OpenKruise
  is logged.

#### Information Disclosure:

- Threat-05-I: Vulnerability Exploitation Through User Reports
- OpenKruise relies on user-reporting of vulnerabilities through Gmail or
  GitHub. If a user discovers a bug and reports it, an attacker may find a way
  to view such reports and exploit the bug before it can be fixed.
- Recommended Mitigations
- Report vulnerability via github security page or private email
- Encrypt all logs of vulnerability reports sent by users to OpenKruise and
  implement strict access controls to prevent unauthorized access to the log
  storage.

#### Denial of Service:

- Threat-06-D: Resource Exhaustion in Controllers
- OpenKruise controllers, daemons, or the applications being managed may
  consume more resources than allocated and affect the availability of the
  Kubernetes cluster.
- Recommended Mitigations
- Use rate limiting to lessen the number of requests a user can make to
  OpenKruise's components.
- Set the resource request and limit values of OpenKruise component so as to
  limit the resource usage of Openkruise under attackers

#### Elevation of Privilege:

- Threat-07-E: Unauthorized Access to Kubernetes Resources
- If an attacker compromises a part of OpenKruise, particularly one that has
  permissions to modify Kubernetes resources, they could potentially escalate
  their privileges within the Kubernetes cluster.
- Recommended Mitigations
- Enable only required features of OpenKruise via feature gates, so give
  OpenKruise least privilege necessary in regards to Kubernetes.
- Grant access of kruise-manager to limited and trusted operators
- Grant access of the OpenKruise API, especially the one of cluster scope such
  as SidecarSet and ResourceDistribution to limited and trusted operators

## Project compliance

OpenKruise does not document meeting particular compliance standards

## Secure development practices

- [OpenKruise is tagged as "in progess"](https://www.bestpractices.dev/en/projects/2908)
  for the OpenSSF best practices badge
- OpenKruise use [distort-less image](https://github.com/GoogleContainerTools/distroless)
  to reduce attack

### Contributing guidelines

- The Kruise project has [clear contributing
  guidelines](https://github.com/openkruise/kruise/blob/master/CONTRIBUTING.md)
- Anyone is encouraged to submit an issue, code, or documentation change
- They additional information for building and [testing your code
  locally](https://github.com/openkruise/kruise/tree/master/docs/contributing)
- [Proposals](https://github.com/openkruise/kruise/tree/master/docs/proposals)
  should be submitted before making a significant change
- Decisions are made based on consensus between maintainers. Proposals and
  ideas can either be submitted for agreement via a github issue or PR.

#### Development pipeline

All source code is [available on publicly on
GitHub](https://github.com/openkruise/kruise)

- Submitting a PR is the only way to change Kruise project files
- Process for submitting a PR is first forking the main repository, then
  cloning the project from your repo, setting the remote upstream for syncing
  changes, and finally creating a branch to develop on that will be used to
  submit features.
- They've provided [a PR description
  template](https://github.com/openkruise/kruise/blob/master/.github/PULL_REQUEST_TEMPLATE.md)
  to keep descriptions focused
- An [OWNERS](https://github.com/openkruise/kruise/blob/master/OWNERS) file
  specifies approvers and reviewers enforced by GitHub in the PR process -
  [More information about OWNERS
  files](https://www.kubernetes.dev/docs/guide/owners/)
  specific to Kubernetes exists
- There are multiple automated checks using GitHub Actions when a PR is
  created. See the workflows directory for [a list of yaml
  files](https://github.com/openkruise/kruise/tree/master/.github/workflows)
  that specify each job below. All automated checks need to pass before
  something can be merged.
  - CodeQL (Static Code Analysis)
  - DCO (Enforces signed commits)
  - E2E-1.20-EphemeralJob
  - E2E-1.24 (Some automated tests)
  - E2E-1.16 (Some automated tests)
  - CI (Mischellaneous continuous integration)
  - Spell check
  - golangci-lint
  - markdownlint-misspell-shellcheck
  - unit-tests
  - License (Unapproved license check)
  - Code scanning (Automated Trivy scanning)
- Automatic code coverage using [codecov.io](https://app.codecov.io/) is
  generated in the PR for each submitted
- At least 1 approving review is required to merge a pull request

#### Development security policy

- Container images are scanned in every PR with [Snyk](https://snyk.io/) to
  detect new vulnerabilities
- Additional measures of security are in the process of being implemented
  - Scan code in master/nightly build and PR/master/nightly for Go.
  - Scan published container images on GitHub Container Registry.

#### Release process

The [entire release process is covered in
detail](https://github.com/openkruise/kruise/blob/master/RELEASE-PROCESS.md) in
the repository

- The changelog is updated manually each time a release is created. The
  individual in charge of the release is expected to update the changelog with
  relevant user facing information.
- Documentation is manually published to update what's on the website
- Creating a new release in the releases page triggers a GitHub Workflow. This
  includes the automated creation of a new image with the latest code tagged
  with the right version.
- The Helm Chart needs to be prepared for shipping the update. There is a
  separate repository that contains [all of the
  charts](https://github.com/openkruise/charts/tree/master/versions/kruise) and
  where new charts are added. A new chart version is created and the CRDs and
  Kubernetes resources updated based on the release artifact. (Check what
  exactly it means to update these resources)
- A PR is submitted to merge the new release and publish automatically does so

#### Communication Channels

##### Internal

Team members communicate with each other [through a range of
mediums](https://github.com/openkruise/kruise#community). There is an invite
only Slack channel, DingTalk group, and WeChat. There are also Bi-weekly
Community Meetings held in both Chinese and English.

##### Inbound

Users communicate with the team through [docs](https://openkruise.io/docs/),
[issues](https://github.com/openkruise/kruise/issues), and
[discussions](https://github.com/openkruise/kruise/discussions)

##### Outbound

Team members communicate with users though the website and changelog

#### Ecosystem

OpenKruise is used by users of Kubernetes to extend the functionality of
Kubernetes to something that better fits their needs and use cases running
productions apps. It is installed directly by users and administrators for
Kubernetes. OpenKruise is a CNCF([Cloud Native Computing
Foundation](https://cncf.io/)) project.

## Security issue resolution

- Responsible Disclosures Process: OpenKruise has a responsible disclosure
  process for reporting security vulnerabilities. This process is designed to
  ensure that vulnerabilities are handled in a timely and effective manner. The
  process can be found here:
  https://github.com/openkruise/kruise/security/policy
- Security researchers can report vulnerabilities confidentially by emailing
  cncf-openkruise-maintainers@lists.cncf.io.
- GitHub: Security-related issues can be reported through GitHub issues at
  https://github.com/openkruise/kruise/issues
- Reporters can expect a response from the maintainers within 2 business days.
- The maintainers will triage the vulnerability and determine the appropriate
  remediation
- It is the maintainers' responsibility to triage the severity of issues and
  determine remediation plans
- Disclosures: Openkruise encourages the community to assist in identifying
  security breaches; in the event of a confirmed breach, reporters will receive
  full credit and have the option to stay informed and kept in the loop.
- If you know of a publicly disclosed security vulnerability, you should
  immediately email the OpenKruise maintainers at
  cncf-openkruise-maintainers@lists.cncf.io.
- Remediation: Kruise commits to supporting the n-2 version minor version of
  the current major release; as well as the last minor version of the previous
  major release

### Communication

[GitHub Security
Advisory](https://github.com/openkruise/kruise/security/advisories) will be
used to communicate during the identification, fixing, and shipping of
vulnerability mitigations.

The advisory becomes public only when the patched version is released to inform
the community about the breach and its potential security impact.

## Appendix

- **Known Issues Over Time** <br>
  Openkruise doesn't have any security vulnerabilities pointed out as of the
  tools and frameworks that it uses (for eg. Golang vulnerabilities).
- **[CII Best Practices](https://www.coreinfrastructure.org/programs/best-practices-program/)** <br>
  OpenKruise hasn't attained any badge from Open Source Security Foundation
  (OpenSSF), the progress is at 30% to attaining a passing level criteria from
  OpenSSF.<br>
  [![OpenSSF Best Practices](https://www.bestpractices.dev/projects/2908/badge)](https://www.bestpractices.dev/projects/2908)
- **Case Studies** <br>
  Many organisations have adopted OpenKruise and are using our project in
  - Alibaba Group, also known as Alibaba, is a Chinese multinational technology company specializing in e-commerce, retail, Internet, and technology. Alibaba had made its core systems fully cloud-native, and had managed more than 10w OpenKruise workload, and gained 80% improvement in deployment efficiency. Alibaba had utilized many workloads in OpenKruise, including CloneSet, Advance StatefulSet, SidecarSet, Advance DaemonSet etc. Their story had been presented in many [blog posts](https://www.alibabacloud.com/blog/openkruise-the-cloud-native-platform-for-the-comprehensive-process-of-alibabas-double-11_596966).
  - Ctrip: a Chinese multinational online travel company, is using OpenKruise advanced workload to build their cloud native PaaS platform. They rely on the inplace update feature of openkruise and manage more than 2.8w CloneSet and 200+ advance StatefulSet. Their story had been presented in a [KubeMeet sharing](https://developer.aliyun.com/ebook/7564/87513)
  - Oppo: a Chinese consumer electronics manufacturer, is using OpenKruise to manage large scale stateful applications. Oppo rely on the inplace-update feature of OpenKruise, and had even customized K8S so that OpenKruise can be extended to inplace update fields other than container images. They share their story in a [blog post](https://mp.weixin.qq.com/s/hRvZz_bZfchmP0tkF6M2OA).
  - Ant Group: formerly known as Ant Financial, a world leading internet open platform, owns the world's largest online payment platform Alipay. Ant Group chose Kubernetes to orchestrate the tens-of-thousands-of-node clusters in its data centers. To manage these nodes, they chose OpenKruise advance daemonset to manage node agents, utilizing the enhanced rolling strategy such as rolling selector, partition rolling. They are consented to share necessary details privately with the TOC, if required.
  - LinkedIn: a leading business and employment-oriented online service in America， is using OpenKruise CloneSet to manage large scale workloads for the inplace-update and enhanced PVC support feature. In addition, they're evaluating the container launch priority feature to ensure their configuration update sequence in pod creation as well as container inplace-update scenarios.
- **Related Projects / Vendors** <br>
  - **Istio -** Istio is a service mesh that provides a uniform way to secure,
    connect, and monitor microservices. It manages the communication between
    services in a Kubernetes cluster.<br>
    Istio primarily focuses on service mesh features such as traffic
    management, security, and observability. OpenKruise is geared towards
    enhancing application deployment strategies, offering features beyond
    service communication.
  - **Kubevela -** KubeVela is a modern application delivery framework for
    Kubernetes, providing higher-level abstractions for defining, deploying,
    and managing applications.<br>
    Both KubeVela and OpenKruise provide higher-level abstractions, but they
    may differ in their approach to application delivery and management.
    OpenKruise offers advanced deployment strategies through controllers,
    whereas KubeVela may have a different emphasis in its framework.<br>
    There are also plans for OpenKruise to integrate with other open-source
    products from related fields, like KubeVela, to build a more complete
    cloud-native application system.
  - **ArgoCD -** ArgoCD is a declarative GitOps continuous delivery tool for
    Kubernetes. It automates the deployment of applications based on
    configurations stored in Git repositories, ensuring the desired state is
    maintained.<br>
    While ArgoCD excels in GitOps and continuous delivery, OpenKruise focuses
    on extending Kubernetes controllers to offer advanced deployment
    strategies. OpenKruise provides features like rolling updates, canary
    releases, and blue-green deployments, offering a broader range of options
    for application lifecycle management.
  - **FluxCD -** FluxCD is a GitOps tool for Kubernetes, ensuring the cluster's
    state aligns with the Git repository configuration. It automates the
    deployment of applications by continuously monitoring and applying changes
    from the repository.<br>
    FluxCD is heavily focused on GitOps practices, while OpenKruise emphasizes
    advanced deployment strategies. OpenKruise's controllers allow users to
    define more sophisticated deployment workflows beyond GitOps.
  - **Knative -** Knative is a set of components for building modern,
    serverless applications on Kubernetes. It abstracts away infrastructure
    complexities for serverless workloads.<br>
    Knative is more oriented toward serverless computing, while OpenKruise
    concentrates on traditional application deployment and management
    strategies. OpenKruise's controllers provide features like rolling updates
    and canary releases for more controlled application updates.
