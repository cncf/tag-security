# Self-assessment for Antrea

This assessment was created by community members as part of the [Security Pals](https://github.com/cncf/tag-security/issues/1102) process and is currently pending changes from the maintainer team.

December 2023

*_Authors_*: Skye Kim, Vamsi Koneti, Ethan Shieh, Chris Torres

*_Contributors_*: Antonin Bas

## Table of Contents

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

## Metadata

|   |  |
| -- | -- |
| Assessment Stage | Incomplete |
| Software | https://github.com/antrea-io/antrea |
| Security Provider | No  |
| Languages | Go, Shell, PowerShell, Makefile, Dockerfile, Jinja |
| SBOM | An SBOM for the current version of Antrea is available on [FOSSA](https://app.fossa.com/projects/git%2Bgithub.com%2Fantrea-io%2Fantrea?ref=badge_large) by using its export dependency report feature. |
| | |

### Security links

| Doc | url |
| -- | -- |
| Security file | https://github.com/antrea-io/antrea/blob/main/docs/security.md |
| Default and optional configs | https://github.com/antrea-io/antrea/blob/main/docs/configuration.md |

## Overview

Antrea is a Kubernetes network plugin that uses Open vSwitch to extend the
capabilities and observability of a Kubernetes cluster's network.

### Background

Antrea is a Kubernetes-native project that implements the Container Network Interface (CNI) and Kubernetes NetworkPolicy API. The tool facilitates communication between the containers in a Kubernetes cluster, handling aspects like network routing and security policies. Networking in Kubernetes can be complex due to the dynamic nature of container deployment and scaling, and Antrea aims to simplify and secure this process. By leveraging Open vSwitch (OVS), Antrea extends programmable networks to Kubernetes, providing a unified network stack that simplifies networking across diverse clouds and operating systems. Antrea is designed to make it easier for users to troubleshoot through Kubernetes controller patterns and diagnostics compatible with familiar network operator tools.

### Actors
The Antrea Agent: Deployed on each Kubernetes node, the Antrea Agent is crucial for managing pod networking and functions as part of the control plane. It interfaces with Open vSwitch (OVS) using Unix Domain Sockets to send OpenFlow messages, programming OVS's forwarding logic. While the Antrea Agent defines network policies and forwarding rules, OVS, operating in the kernel, acts as the data plane, executing these decisions. This delineation of roles underscores the Antrea Agent's importance in network traffic regulation and security enforcement at the node level.

The Antrea Controller: Operating as a centralized component, the Antrea Controller's main function is to process network policies and ensure their uniform implementation across the Kubernetes cluster. It does not handle the local CNI functions, which are managed by the Antrea Agent at the node level. Focused on policy oversight rather than detailed network state management, the Controller works to facilitate coordinated network security and management while maintaining low resource usage, especially important in large clusters.

Kubernetes API Server Interaction: External to Antrea but integral to its operation is the Kubernetes API Server. This actor serves as the communication hub for Antrea, providing the necessary information about network policies, pod lifecycle events, and other essential Kubernetes resources. The interaction between Antrea and the Kubernetes API Server is fundamental for the dynamic adaptation of network configurations in response to changes within the Kubernetes environment.

Open vSwitch (OVS): At the heart of the data plane operations lies the Open vSwitch (OVS), a high-performance, multilayer virtual switch. OVS is responsible for forwarding network packets based on the configurations and policies set by the Antrea Agents. It forms the backbone of the network’s data plane, efficiently handling network traffic within the cluster.

### Actions
In a Kubernetes cluster, Antrea initializes the Antrea Agent and the Antrea Controller to run on each Node. The Antrea Controller uses the Kubernetes API Server Library to create the communication channel to the Antrea Agents, which is the Controller API Server. The API Server stores all the states in in-memory caches, eliminating the need for a datastore. The Antrea Controller watches for changes in the NetworkPolicy, Pod, and Namespace resources from the Kubernetes API. Antrea makes the Controller API available through a specific address in a Kubernetes setup. 

The Antrea Agent sets up Open vSwitch (OVS) bridges on each Kubernetes Node to create connections between Pods and manages the IP address allocation. When a new Pod is created, the Antrea Agent creates a connection point for the Pod, assigns it a new address, and connects it to the main network on the server with an identification number. Antrea checks with the main Kubernetes system to verify if the connection is allowed to ensure security. Based on instructions from the Antrea Controller, the Antrea Agent also enforces network policies locally by creating OVS flows on each Node. 

### Goals
The primary goal of the Antrea project is to enhance network connectivity within Kubernetes clusters, aiming to ensure efficient and secure communication between containers. To achieve this, Antrea employs strict network policies that permit only authorized traffic, thereby bolstering security within the cluster. A significant aspect of Antrea's design is the integration of Open vSwitch, which enables high-performance networking, making it particularly suitable for extensive Kubernetes deployments. For critical control communications, such as those between the Controller and the Agent, Antrea uses TLS encryption to ensure secure data transmission. Additionally, Antrea offers the flexibility of optional advanced encryption features like IPsec or Wireguard for the overlay network, catering to users who require enhanced security measures. The core focus of Antrea is on network-level security, providing a robust and secure networking solution specifically tailored for Kubernetes environments.

### Non-goals
Antrea is designed specifically for Kubernetes clusters and is not suitable for non-Kubernetes environments. Antrea mainly focuses on managing internal communication within the clusters however, some interaction with external devices is supported. Antrea isn't designed to be an all-in-one security solution for Kubernetes clusters and mainly focuses on network communications. Antrea is also not a full-fledged network monitoring tool. While it offers some basic insights into network traffic, it doesn't provide deep network analysis or troubleshooting features.

## Self-assessment use

This self-assessment is created by the authors of this document in cooperation 
with the Antrea team and the CNCF TAG-Security security reviewers to perform an 
internal analysis of the
project's security.  It is not intended to provide a security audit of Antrea, or
function as an independent assessment or attestation of Antrea's security health.

This document serves to provide Antrea users with an initial understanding of
Antrea's security, where to find existing security documentation, Antrea plans for
security, and general overview of Antrea security practices, both for development of
Antrea as well as security of Antrea.

This document provides the CNCF TAG-Security with an initial understanding of Antrea
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
Antrea seeks graduation and is preparing for a security audit.

## Security functions and features

Antrea, as a Kubernetes-native networking and security solution, incorporates several features and practices to ensure security within a Kubernetes cluster. Here's a security overview of Antrea:

i. **[Network Policies:](https://antrea.io/docs/v1.14.0/)**
* Antrea provides a comprehensive network policy model, building upon Kubernetes Network Policies. It includes features such as policy tiering, rule priorities, and cluster-level policies.
* Network Policies define and enforce rules for controlling the traffic between Pods, contributing to the segmentation and isolation of applications. Furthermore, Antrea also supports audit logging for policies, where all connections matching specific policy rules are logged.

ii. **Encrypted Pod Traffic:**
* Antrea supports encrypting inter-Node Pod traffic using IPsec or WireGuard tunnels, enhancing the confidentiality and integrity of communication between Pods. [Traffic encryption](https://antrea.io/docs/v1.11.4/docs/traffic-encryption/), however, is not supported on Windows Nodes yet.

iii. **Security Policies for VMs:**
* Antrea [native policies](https://antrea.io/docs/v1.4.0/docs/antrea-network-policy/) can be enforced not only on Kubernetes Nodes but also on non-Kubernetes Nodes, including virtual machines (VMs) and bare-metal servers.

iv. **Authentication and Authorization:**
* Antrea Controller leverages Kubernetes [ServiceAccount](https://antrea.io/docs/v1.3.0/docs/design/architecture/) tokens for authentication. Antrea Agents use a Kubernetes ServiceAccount token to authenticate with the Controller.
* Authentication and authorization are delegated to the Kubernetes API, enhancing the overall security of communication within the cluster.

v. **Security Monitoring and Diagnostics:**
* Antrea comes with CLI and UI tools that provide visibility and diagnostic capabilities. These tools include [packet tracing, policy analysis](https://github.com/antrea-io/antrea/blob/main/README.md), and flow inspection, aiding in troubleshooting.
* The exposure of Prometheus metrics facilitates security monitoring and enables the integration of Antrea with monitoring solutions.

vi. **Security for Windows Nodes:**
* Antrea is designed to be compatible with both Linux and Windows Kubernetes Nodes. This enables a consistent security posture across heterogeneous environments.

vii. **Antrea Multi-cluster Security:**
* Antrea Multi-cluster implements a [Multi-cluster Service API](https://antrea.io/docs/main/docs/multicluster/architecture/), allowing for the creation of secure multi-cluster Services. It supports ClusterNetworkPolicy replication across clusters and enforcing custom policies on cross-cluster traffic, enhancing security across a ClusterSet.

viii. **Network Flow Visibility:**
* Antrea supports exporting [network flow information using IPFIX](https://antrea.io/docs/v1.2.3/docs/getting-started/), which can be visualized with Elastic Stack and Kibana dashboards. This visibility enhances security monitoring capabilities.

ix. **Web UI Security:**
* The Antrea web UI, offering a graphical interface for monitoring, is subject to secure access control facilitated by Kubernetes RBAC. Permissions for the UI server, including API access, are provided through K8s RBAC, while user access to the UI is governed by either password-based or OIDC-based authentication methods. This dual-layered approach ensures both API-level security and user authentication, contributing to a secure monitoring experience.

x. **Integrations with IPS/IDS:**
* Antrea can be [integrated](https://github.com/antrea-io/antrea/tree/main/docs/cookbooks/ids) with IDS and IPS engines. The process works by configuring a TrafficControl resource applying to specific Pods. Traffic originating from the Pods or destined for the Pods is mirrored, and then inspected by an IDS/IPS to provide threat detection.

## Project compliance

Regarding the compliance of the Antrea project with established security standards, there is no direct documentation or claim that Antrea meets specific standards like PCI-DSS, COBIT, ISO standards, GDPR, or others. Antrea's primary role is as a network plugin for Kubernetes, focusing on network connectivity and security within Kubernetes clusters. Although it incorporates security measures that may align with aspects of these standards, particularly in network security and data protection, it does not explicitly conform to these standards as a standalone entity. For organizations using Antrea, ensuring compliance with such standards would typically involve evaluating their entire Kubernetes architecture, including Antrea, as part of a comprehensive compliance strategy. Thus, while Antrea plays a role in creating a secure network environment, its compliance with specific security standards would ultimately be determined by how it is integrated and used within an organization's broader Kubernetes infrastructure.

## Secure development practices

### Development Pipeline

Development on Antrea is done on GitHub. To ensure that contributions are
safe and properly reviewed prior to being added to the main branch of the
Antrea repository, the Antrea team follows the secure development practices of:

* Installing 
  [Git client-side hooks](https://github.com/antrea-io/antrea/blob/main/hack/git_client_side_hooks) 
  to:
  * Run golangci-lint to check source code for style and safety before a commit.
  * Run scripts to check 
    [documentation spelling](https://github.com/antrea-io/antrea/blob/main/hack/verify-spelling.sh), 
    [formatting](https://github.com/antrea-io/antrea/blob/main/hack/verify-docs-for-website.sh), 
    and to update 
    [table of contents](https://github.com/antrea-io/antrea/blob/main/hack/update-toc.sh) 
    before a commit.
  * Check that a 
    [Developer Certificate of Origin](https://developercertificate.org/) 
    (DCO) is present for every new commit before a push.
* Making changes in a new branch of a fork of the Antrea repository and
  submitting a pull request (PR) before their change can be integrated into
  the main repository.
* Having multiple reviewers check over a PR and provide feedback before the
  change is merged by a maintainer. Minor changes can be reviewed and approved
  by one team member, but most PRs are reviewed by 2-3 team members.
* Running 
  [GitHub Action and Jenkins continuous integration (CI)](https://github.com/antrea-io/antrea/blob/main/ci/README.md)
  checks relevant
  to their contribution when a PR is made. These include 
  [Go linters](https://github.com/antrea-io/antrea/blob/main/ci/README.md#go-linters),
  unit tests (that use the 
  [Go testing](https://golang.org/pkg/testing/)
  package), 
  [integration tests](https://github.com/antrea-io/antrea/blob/main/test/integration), 
  [end-to-end tests](https://github.com/antrea-io/antrea/blob/main/test/e2e), and 
  [Kubernetes upstream tests](https://github.com/kubernetes/community/blob/master/contributors/devel/sig-testing/e2e-tests.md).
  * Daily and weekly Jenkins tests are automatically run on the main branch of 
    the Antrea repository. Developers are informed of test failures through
    the
    [developer mailing list](https://groups.google.com/forum/#!forum/projectantrea-dev).
  * Antrea uses a 
    [DCO GitHub App](https://github.com/apps/dco) 
    to check that a DCO is present in every commit of a PR before review of that 
    PR begins.
  * A GitHub Action is run every day and before each release to
    [scan the Antrea container image for CVEs](https://github.com/antrea-io/antrea/blob/main/.github/workflows/trivy_scan.yml)
    using 
    [Trivy](https://github.com/aquasecurity/trivy), a security scanner tool.
  * Running a GitHub Action to 
    [scan PRs and commits to main for vulnerabilities](https://github.com/antrea-io/antrea/blob/main/.github/workflows/codeql.yml)
    and errors using 
    [CodeQL](https://codeql.github.com/), a SAST tool. 
    CodeQL scans are automatically run when a PR is opened or when a commit to 
    main is made.
  * Running a GitHub Action to 
    [scan all Antrea codebase dependencies](https://github.com/antrea-io/antrea/blob/main/.github/workflows/golicense.yml) 
    using 
    [go-licenses](https://github.com/google/go-licenses), a SCA tool, 
    and create a list with entries that contain
    a link to the dependencies' codebase and the license that it uses every time 
    a PR or commit is made. This is
    used to check that Antrea complies with the terms of use (described in
    license) of its dependencies.
    * There are no CI checks to check dependencies for vulnerabilities. At one
      point in the past, there was a GitHub workflow that was used to 
      [check OVS for CVEs](https://github.com/antrea-io/antrea/actions/workflows/ovs_scan.yml), 
      but it has not been run recently and is not present in the main branch.
  * Antrea does not have a secrets scanning service in the CI pipeline.
* Cherry-picking PRs with bugfixes to older, currently-supported releases so
  that every currently-supported version of Antrea benefits from the 
  contribution.

### Communication Channels

The Antrea project uses a variety of communication channels for internal,
inbound, and outbound communications. This section lists the communication
channels that are publicly listed on the GitHub project README.

* Internal (communication between developers):
  * Antrea team members communicate through the
    [Antrea channel](https://kubernetes.slack.com/messages/CR2J23M0X)
    on the Kubernetes Slack. The Slack channel is used by the maintainers to 
    post announcements and discuss PRs. 
  * The Antrea GitHub project's 
    [issues page](https://github.com/antrea-io/antrea/issues)
    to track feature requests, known bugs, and proposals. The team also uses 
    the GitHub project's
    [PR page](https://github.com/antrea-io/antrea/pulls)
    to manage and review contributions to the project. 
  * Synchronous community meetings are held biweekly on Tuesdays for team 
    members to discuss releases, feature proposals, and user issues. Feature 
    proposals are typically presented in slideshow form. The 
    [minutes](https://github.com/antrea-io/antrea/wiki/Community-Meetings)
    and 
    [recording](https://www.youtube.com/playlist?list=PLuzde2hYeDBdw0BuQCYbYqxzoJYY1hfwv) 
    for each meeting are openly available.
  * The Antrea team uses a 
    [developer mailing list](https://groups.google.com/forum/#!forum/projectantrea-dev) 
    to keep the team updated on daily and weekly Jenkins build failures. The
    mailing list was briefly formerly used for internal development communication.

* Inbound (communication from users to developers):
  * Users can contact the Antrea team through the 
    [Antrea channel](https://kubernetes.slack.com/messages/CR2J23M0X) 
    on the Kubernetes slack for questions and support.
  * Users can post bug reports, feature requests, and support requests on the
    [issues page](https://github.com/antrea-io/antrea/issues)
    of the project's GitHub repository.
  * Users can report security vulnerabilities by emailing the Antrea maintainers
    at the address cncf-antrea-maintainers@lists.cncf.io.
  * [Live office hours](https://calendar.google.com/calendar/u/0/embed?src=uuillgmcb1cu3rmv7r7jrhcrco@group.calendar.google.com)
    were formerly held biweekly on Tuesdays when community meetings are
    not held. During office hours, users were able to ask Antrea team members
    questions. Office hours were cancelled due to consistent low attendance.

* Outbound (communication from developers to users):
  * The Antrea team formerly used a 
    [announcement mailing list](https://groups.google.com/g/projectantrea)
    to send project announcements to the community. The team also formerly used a 
    [general mailing list](https://groups.google.com/g/projectantrea) to send
    community meeting reminders and agendas. Usage of this channel was
    discontinued around September 2022. The team now uses 
    [Slack](https://kubernetes.slack.com/messages/CR2J23M0X)
    for these two types of communications.
  * The Antrea team formerly used 
    [X/Twitter](https://twitter.com/ProjectAntrea) 
    to announce Antrea LIVE livestreams and major releases. Usage of this
    channel was discontinued around November 2022.
  * The Antrea team formerly used some of their live office hours time to hold a
    [Antrea LIVE](https://www.youtube.com/@projectantrea/streams),
    a livestream about Antrea (releases and usage) and topics related to Antrea 
    such as Open vSwitch, CNI (Container Network Inferface), and networking
    in Kubernetes. Though the livestream is no longer being produced, users and
    contributors can still watch the livestream recordings
    ([link](https://www.youtube.com/@projectantrea/streams)) to learn about
    the topics previously mentioned.

### Ecosystem

Antrea is a Kubernetes-native network plugin that implements networking using
Kubernetes' [Container Network Interface](https://github.com/containernetworking/cni) 
(CNI) to manage pod network interfaces. The project is designed primarily for
use in Kubernetes clusters.

Antrea works to expand the cloud native ecosystem by extending the networking
capabilities and observability of Kubernetes. The project features advanced network policies
(in addition to Kubernetes Network Policies), the 
[Egress CRD API](https://github.com/antrea-io/antrea/blob/main/docs/egress.md), 
support for
multi-OS clusters (Linux and Windows),
network policy enforcement on non-Kubernetes nodes using 
[Nephe](https://github.com/antrea-io/nephe), 
[internal load balancer services](https://github.com/antrea-io/antrea/blob/main/docs/service-loadbalancer.md),
and encrypted inter-node networking (IPsec or WireGuard). Antrea places a large
emphasis on network observability and monitoring, so many tools are provided
to users to do so. These tools include network flow visualization using 
[Theia](https://github.com/antrea-io/theia), 
[exporting network flow information using IPFIX](https://github.com/antrea-io/antrea/blob/main/docs/network-flow-visibility.md), 
[exporting metrics to Prometheus](https://github.com/antrea-io/antrea/blob/main/docs/prometheus-integration.md), 
[Traceflow operations](https://github.com/antrea-io/antrea/blob/main/docs/traceflow-guide.md),
and a 
[web interface](https://github.com/antrea-io/antrea-ui) 
to perform Traceflows and monitor Antrea components.



Other Kubernetes CNI plugins exist, such as 
[Calico](https://github.com/projectcalico/calico), 
[Flannel](https://github.com/flannel-io/flannel), 
and [Cilium](https://github.com/cilium/cilium), which use more common data plane 
technology like 
[eBPF](https://ebpf.io/), 
[built-in Linux bridges](https://wiki.linuxfoundation.org/networking/bridge), 
or 
[Host Network Service](https://learn.microsoft.com/en-us/virtualization/windowscontainers/container-networking/architecture)
(for Windows). The main benefit to the
cloud-native ecosystem that Antrea provides is an implementation of the CNI
using 
[Open vSwitch](https://www.openvswitch.org/). 
Open vSwitch (OVS) is a virtual switch that operates in the 
data plane that creates virtual interfaces for pods and tunnels between nodes.
One primary benefit of OVS is its Windows support -- 
this reduces the complexity of development and usage because only one data
plane technology needs to be supported. OVS also allows Antrea users
to offload the data plane to the NIC on a node to increase networking performance.

[kube-ovn](https://github.com/kubeovn/kube-ovn) is another Kubernetes CNI plugin
that uses Open vSwitch as its data plane technology. kube-ovn is also in
active development, is a CNCF sandbox project, and has a similarly-sized team
of maintainers and contributors as Antrea. There are some implementation and usage
differences between Antrea and kube-ovn.

For companies that want to run applications on a cloud environment, 
[VMware offers enterprise-grade technical support](https://www.vmware.com/products/antrea-container-networking.html) 
for companies using Antrea alongside their cloud application on platforms such 
as (but not limited to) VMware Tanzu
or vSphere. The commercial version of Antrea integrates well with 
[VMware NSX](https://www.vmware.com/products/nsx.html), 
a network virtualization platform.
In addition, VMware sponsors development on the Antrea project so
that there is always active work being done on the project. All of the
maintainers and some of the contributors to the project are affiliated with
VMware.

## Security issue resolution

### Responsible Disclosures Process

If a security issue is found in Antrea, the discoverer of that issue is 
instructed to report the issue directly to the maintainers at the email address 
cncf-antrea-maintainers@lists.cncf.io. Any kind of security vulnerability,
irregardless of severity, should be reported to the maintainers so that the
issue is not made public before a fix is developed. When reporting the
vulnerability to the maintainers, the reporter must describe how to reproduce the
issue (including the software that they used), what the reporter believes the
attack vector and attack surface to be, the impact of the vulnerability on 
a cluster if exploited, and the impact of the vulnerability on Antrea components.

Once a report is received by the maintainers, a maintainer (the coordinator of 
that issue) is responsible with working with the reporter
to determine the severity of the vulnerability and to patch the vulnerability. 
Vulnerabilities may be demoted to regular issues by the coordinator if the
maintainers are low risk.

The responsible disclosures process for Antrea is similar to the responsible 
disclosures process of other large open source projects, like the
[Linux kernel](https://www.kernel.org/doc/html/latest/process/security-bugs.html), 
[Kubernetes](https://kubernetes.io/docs/reference/issues-security/security/), and 
[Cilium](https://github.com/cilium/cilium/blob/main/SECURITY.md) 
in that vulnerabilities are privately reported to the maintainers. So, the 
reporting process is satisfactory for ensuring that vulnerabilities are 
responsibly disclosed at the appropriate time. To incentivize contributors to
find and fix vulnerabilities, the Antrea project can consider implementing a
bug bounty program in the future as 
[Kubernetes](https://kubernetes.io/blog/2020/01/14/kubernetes-bug-bounty-announcement/)
has done. However, this is likely presently infeasible due to the small size of 
the project.

### Incident Response

Security issues are triaged based on the risk of the issue. Issues with high
risk have a known, practical attack vector and can compromise the functionality
of Antrea or a Kubernetes cluster through Antrea. The Antrea maintainers use
a 
[1-7 scale](https://github.com/antrea-io/antrea/blob/main/SECURITY.md#reference-taxonomy-for-issue-risk) 
to score the risk of a vulnerability -- a 1 is given to the highest
risk vulnerabilities and a 7 is given to low risk ones. A score of 1-3 is given
to vulnerabilities that can be successfully exploited by a malicious actor if 
known -- these are confirmed vulnerabilities. These vulnerabilities are fixed 
privately by the coordinator (maintainer
assigned to handle the vulnerability) and the reporter. Vulnerabilities with a
score of 4-7 are issues that cannot be practically exploited, not a 
vulnerability, or a vulnerability in an unsupported branch. These lower-risk
vulnerabilities will be demoted to a GitHub issue (become public) and handled as 
an issue.

Typically, patches for vulnerabilities are developed by maintainers. If a patch 
for the vulnerability has been developed by the reporter, they can email the
patch to the address cncf-antrea-maintainers@lists.cncf.io with a Git patch 
containing the fix (patched from the current main branch). The maintainers will
then review the patch in the same way that a member of the Antrea team would
review a PR. The patch is sent via email rather than a GitHub PR to ensure that
the vulnerability remains confidential during the review process.

If a patch is developed solely by maintainers, then the patch will be 
immediately merged to the main branch. If the patch is developed in cooperation 
with the reporter, then the patch must be approved by maintainers for merging, 
a PR for the patch needs to be submitted by a coordinator, and then the PR 
can be merged to the main branch. After the patch has been merged, the coordinator 
will create a GitHub issue for the vulnerability, credit the reporter, and then 
close the issue. At this point, the vulnerability is publicly disclosed.

Patches for vulnerabilities can also be 
[cherry-picked to other supported release branches](https://github.com/antrea-io/antrea/blob/main/docs/contributors/cherry-picks.md) 
if necessary. This procedure ensures that the vulnerability is disclosed only
after the incident has been resolved to reduce the risk of the vulnerability
being realized in a real-world environment.

Though the coordinator typically discloses the vulnerability and submits the PR
with the patch, the original reporter is credited in the GitHub issue. The 
reporter is also credited in the PR and listed as one of the patch's commit author 
if they contributed code for the patch.

## Appendix

### Known Issues Over Time:

1. **Too many RBAC permissions for the antrea-agent ServiceAccount [#3777](https://github.com/antrea-io/antrea/issues/3777):**
This disclosure addresses a security vulnerability in older Antrea releases, where the antrea-agent ServiceAccount possessed excessive permissions granted through Kubernetes RBAC. These permissions could potentially lead to significant harm to other workloads and clusters if a compromised Node (e.g., through a container escape) allowed an attacker access to the antrea-agent K8s API token


2. **NetworkPolicy doesn't work when the Pod access its own Service's ClusterIP [#5681](https://github.com/antrea-io/antrea/issues/5681):**
In instances where a customer employed the deny-all approach and permitted specific namespace Pods for egress/ingress communication using network policies on Antrea 1.9, Pod-to-Pod communication adheres to the expected restrictions or allowances. Nevertheless, there was an issue observed when attempting to establish a connection from a backend Pod to the Service, as the connection was not successful.

3. **Antrea agent will crash when large amount of multicast receivers with different multicast IPs on one node start together [#4847](https://github.com/antrea-io/antrea/issues/4847)**
At times, the Antrea agent experienced crashes in situations where a substantial number of multicast receivers with varied multicast IPs initiated simultaneously on a single node.

### OpenSSF Best Practices:
The Antrea project has achieved the passing level criteria and is in the process of working towards attaining a silver badge in Open Source Security Foundation (OpenSSF) best practices badge. [Antrea's OpenSSF Best Practices badge](https://www.bestpractices.dev/en/projects/4173).

### Antrea Adopters:
Here are a [few companies that have publicly shared the details of how they use Antrea](https://antrea.io/docs/main/adopters/):
1. Glasnostic: Glasnostic is a company that enhances the resilience of contemporary cloud operations by dynamically shaping the interactions among systems in real-time. This approach enables DevOps and SRE teams to achieve dependable deployments, proactively avoid failures, and ensure a consistent customer experience. Our utilization of Antrea's Open vSwitch support allows us to fine-tune the interactions between services within Kubernetes clusters.

2. Transwarp: Transwarp is an organization that is dedicated to advancing enterprise-level big data infrastructure software, providing comprehensive support across the entire data lifecycle to shape a future-oriented data world. In pursuit of robust security and seamless network operations within their Kubernetes platform, Transwarp relies on Antrea's AntreaClusterNetworkPolicy and AntreaNetworkPolicy to safeguard big data software for every tenant. The integration of Antrea's Open vSwitch is instrumental in establishing Pod-To-Pod networks, serving the needs of connectivity between flannel and antrea clusters, within antrea clusters, and facilitating smooth network transitions during upgrades within a single cluster. Furthermore, the utilization of Antrea's Egress feature ensures the retention of original source IPs, guaranteeing accurate identification of the real source IP for requests by Internal Pods. This strategic use of Antrea's features underscores Transwarp's commitment to delivering secure, efficient, and reliable big data infrastructure solutions for enterprises.

3. TeraSky: TeraSky is a prominent global provider of advanced technology solutions that incorporates Antrea into both internal Kubernetes clusters and those of various clients. The adoption of Antrea is instrumental in fortifying TeraSky's Kubernetes environment with robust and adaptable security models. The company places significant emphasis on leveraging Antrea Cluster Network Policies, Antrea Network Policies, and the Egress functionality to ensure a resilient and flexible operational framework.

### Related Projects and Vendors:

***NOTE: The content in this section is presented to the best of our understanding and awareness.***

The table below shows a brief comparison between Antrea and other CNI projects.

 **Project**        | **Key datapath Technologies**           | **Windows Support**  | **K8 SNP** | **Advanced NP** | **BGP Support** | **Kube-Proxy Replacement** | **CNCF Status** | **Comments** 
| ------------- |:-------------:| -----:| ----: | ----: | ------: | -------: | -----------: | ----------: |
| Antrea      | OVS | Yes | Yes | Yes (ACNP, ANP, Tiers) | No | Yes | Sandbox | Focus on security and some advanced networking features such as Egress (SNAT policies for Pods) and multicast|
| Calico      | iptables / eBPF   |   Yes | Yes | Yes. Also support for Host NetworkPolicies (Support by Antrea is on the roadmap) | Yes | Yes | N/A | One of the earliest well-established network plugins. However, several security features are only available in the commercial version
| Cilium | eBPF      |    Yes | Yes | Yes. Also support for Host NetworkPolicies | Yes | Yes | Graduated | There is currently a significant level of interest in Cilium. It boasts a highly robust ecosystem featuring a myriad of tools, including Hubble and Tetragon, designed to afford comprehensive visibility into both the network and applications|
| Flannel | Host-GW | Yes |No |No | No | No | N/A | Emphasis on simplicity, not many advanced features. L3 networking | 
| Weave | iptables | No | Yes | No | No | No | N/A | L2 networking with overlay and multicast support. *No longer actively maintained* |
| Kube-Router | iptables/IPVS | No | Yes | No | Yes | Yes | N/A | Aims at networking simplicity and a modular infrastructure (pick which networking functions you need using flags). No advanced security |

1. **[Calico](https://docs.tigera.io/archive/v3.1/introduction/)**: Calico is a widely adopted open-source networking and network security solution for containers. It uses a combination of BGP (Border Gateway Protocol) and iptables for its control plane. Calico operates at the network layer and does not require an overlay network.
Difference between Antrea and Calico:
* Antrea: Antrea provides comprehensive security policies, including Antrea Cluster Network Policies and Antrea Network Policies. These policies enable users to define and enforce security rules at the pod level, offering granular control over network traffic.
* Calico: Calico also implements Kubernetes Network Policies, which allow users to define and enforce rules for pod-to-pod communication. Calico configures a layer 3 network that uses the BGP routing protocol to route packets between hosts.
  
2. **[Cilium](https://cilium.io/)**: Cilium is an open source, cloud native solution for providing, securing, and observing network connectivity between workloads, powered by eBPF kernel technology
Difference between Antrea and Cilium:
* Antrea: Antrea provides Kubernetes-native security policies, including Antrea Cluster Network Policies and Antrea Network Policies. These policies allow users to define and enforce security rules at the pod level.
* Cilium: Cilium offers a range of security features, including a more advanced Layer 7 (application layer) visibility and security policies. It can enforce security policies based on application awareness and API-aware network security.
  
3. **[Flannel](https://github.com/flannel-io/flannel)**: Flannel is a simple and lightweight overlay network that provides basic networking connectivity between pods in a Kubernetes cluster.
Difference between Antrea and Flannel:
* Antrea: Antrea places a strong emphasis on security. It provides Kubernetes-native security policies, including Antrea Cluster Network Policies and Antrea Network Policies, allowing for fine-grained control over pod-to-pod communication.
* Flannel primarily focuses on basic networking and lacks advanced security features. It provides basic isolation between pods but doesn’t have built-in support for advanced security policies.

4. **[Weave](https://www.weave.works/docs/net/latest/overview/)**: Weave is an overlay network that operates at Layer 2 and creates a virtual network connecting containers across different hosts. It uses VXLAN encapsulation by default.
Difference between Antrea and Weave:
* Antrea: Antrea places a strong emphasis on security. It provides Kubernetes-native security policies, including Antrea Cluster Network Policies and Antrea Network Policies, allowing for fine-grained control over pod-to-pod communication.
* Weave: Weave focuses on basic networking capabilities and does not offer Kubernetes-native security policies out of the box. It provides basic network isolation between containers.
  
5. **[Kube-router](https://www.kube-router.io/)**: Kube-router is a lightweight and highly configurable CNI (Container Network Interface) plugin for Kubernetes. It operates at the network layer and is designed to be modular and extensible.
Difference between Antrea and Kube-router:
* Antrea: Antrea places a strong emphasis on security. It provides Kubernetes-native security policies, including Antrea Cluster Network Policies and Antrea Network Policies, allowing for fine-grained control over pod-to-pod communication.
* kube-router: kube-router focuses on simplicity and efficiency in networking. It may not provide the same level of advanced security features as Antrea but offers basic networking isolation.

### Threat Model

* **Spoofing**: As Antrea fundamentally a networking solution for Kubernetes, spoofing threats include:
  * IP Spoofing: Source IP can be forged in network packets to make it appear as though communication is being exchanged with a trusted source
  * MAC Spoofing: MAC Address in ethernet frames can be forged to impersonate a trusted member on the network.
  * Pod Identity Spoofing: Pod identity may be spoofed to gain unauthorised access to the K8 cluster.
  * **Remediation**: 
    * Implement Ingress and Egress filtering: Strict filtering rules to allow only legitimate traffic in and out of the system

* **Tampering**: Threats on Antrea include:
  * Data Plane Manipulation: Antrea uses Open vSwitch (OVS) for its data plane. Hence, exploits or vulnerabilities in OVS could be used to disrupt network traffic.
  * API Security:  Insecure Antrea Controller APIs pose a tampering threat, as communication can be manipulated between the controller and agents.
  * Zero Day Vulnerability: Exploits involve tampering with the system by taking advantage of vulnerabilities unknown to the software vendor or user community.
  * **Remediation**: 
    * Regular security tests and immediate patching of discovered vulnerabilities can help mitigate risk

* **Repudiation**: 
  * Flow Aggregator Compromise: All pods share their logs with the flow aggregator. Compromise of this system can result in false logs being made, and legal logs being denied. 
  * **Remediation**: 
    * Distributing logs across pods all over the cluster, or having many redundant flow aggregators throughout the systems can mitigate risk

* **Information Disclosure**: 
  * Container Metadata Exposure: Containerized environment of clusters can result in metadata being revealed through side channels that can aid threat actors in gaining information on system build
  * Human error: Improper or lax handling of login and authentication credentials by cluster users an result in attackers gaining access to pods, and even clusters
  * **Remediation**: 
    * Using defense-in-depth (padding, monitoring), regularly raising security awareness and following security best practices can mitigate risk.

* **Denial Of Service**: 
  * Network Attacks: Overwhelming the Antrea controller or agent using botnets can disrupt the availability of network services.
  * Resource Starvation: Exhaustion of critical resources such as memory, CPU or bandwidth will result in system instability or system collapse
  * **Remediation**: 
    * Implementation of rate-limiting on each pod with strong traffic shaping mechanisms can mitigate risk.

* **Escalation of Privilege**: 
  * Compromise of Nodes: Unauthorised access to a single, compromised node can result in breaches into other nodes in the cluster, especially if other nodes are constructed similar to the first one. 
  * API Compromise: Unauthorised control on APIs can result in attempts to escalate privilege through API calls
  * **Remediation**: 
    * Ensuring that newly created pods by default have least privilege to network resources can help mitigate risk

## Action Items

* Since kernel bypass and network service mesh are not used by Antrea, they should be removed from the documentation [website](https://antrea.io/). 

* Add CI checks to routinely check dependencies for CVEs.
