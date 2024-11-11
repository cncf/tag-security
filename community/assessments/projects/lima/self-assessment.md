<!-- cSpell:ignore containerd nerdctl contai limactl sshfs vmnet govulncheck xbar COBIT CodeQL GHSA Flibber Flocker -->
# Self-assessment
<!--
Template: https://github.com/cncf/tag-security/blob/50d5f61d7f9dfb88dd3639a1579304f504eaedd3/community/assessments/guide/self-assessment.md
(2024-06-22)
-->

<!--
The Self-assessment is the initial document for projects to begin thinking about the
security of the project, determining gaps in their security, and preparing any security
documentation for their users. This document is ideal for projects currently in the
CNCF **sandbox** as well as projects that are looking to receive a joint assessment and
currently in CNCF **incubation**.

For a detailed guide with step-by-step discussion and examples, check out the free
Express Learning course provided by Linux Foundation Training & Certification:
[Security Assessments for Open Source Projects](https://training.linuxfoundation.org/express-learning/security-self-assessments-for-open-source-projects-lfel1005/).
-->

# Self-assessment outline

## Table of contents

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

<!--
A table at the top for quick reference information, later used for indexing.
-->

|||
| -- | -- |
| Assessment Stage | Complete |
| Software | <https://github.com/lima-vm/lima> |
| Security Provider | No |
| Languages | Go  |
| SBOM | `go.mod` and `go.sum` contain the dependency information |

### Security links

<!--
Provide the list of links to existing security documentation for the project. You may
use the table below as an example:
-->

| Doc | url |
| -- | -- |
| Security file | <https://github.com/lima-vm/.github/blob/main/SECURITY.md> |
| Default and optional configs | <https://github.com/lima-vm/lima/blob/master/templates/default.yaml> |

## Overview

<!--
One or two sentences describing the project -- something memorable and accurate
that distinguishes your project to quickly orient readers who may be assessing
multiple projects.
-->

[Lima](https://lima-vm.io/) launches Linux virtual machines with automatic file sharing and port forwarding (similar to WSL2).

The original goal of Lima was to promote [containerd](https://containerd.io) including [nerdctl (contaiNERD ctl)](https://github.com/containerd/nerdctl)
to Mac users, but Lima can be used for non-container applications as well.

### Background

<!--
Provide information for reviewers who may not be familiar with your project's
domain or problem area.
-->

A typical usage of Lima is like:

```bash
# Install
brew install lima

# Start the VM with the default template
limactl start

# Launch nerdctl (contaiNERD CTL) via Lima
lima nerdctl run --rm hello-world
```

Lima uses YAML files to define VM templates.
See <https://github.com/lima-vm/lima/tree/master/templates> for the examples of the templates.

A malicious template may break host OS via host filesystem mounts.
It is users's responsibility to avoid using malicious templates.

### Actors
<!--
These are the individual parts of your system that interact to provide the
desired functionality.  Actors only need to be separate, if they are isolated
in some way.  For example, if a service has a database and a front-end API, but
if a vulnerability in either one would compromise the other, then the distinction
between the database and front-end is not relevant.

The means by which actors are isolated should also be described, as this is often
what prevents an attacker from moving laterally after a compromise.
-->

* `limactl` CLI: the CLI provides CRUD operations for VM instances.
  The CLI does not need the root privilege on the host OS.
  A template file can be specified on creating an instance as follows:

```bash
# Built-in template
limactl create template://docker

# Local path
limactl create /usr/local/share/lima/templates/fedora.yaml

# HTTPS URL (use with a caution)
limactl create https://raw.githubusercontent.com/lima-vm/lima/master/templates/alpine.yaml
```

* `lima` CLI: an alias of `limactl shell`, for logging into the guest OS.

* VM drivers: the following virtual machine drivers are supported (no root privilege is needed):
  * QEMU
  * Apple Virtualization.framework (for macOS hosts)
  * WSL2 (for Windows hosts)

* SSH:
  Lima generates an SSH key-pair and configure the guest OS so that the `lima` CLI (alias of `limactl shell`)
  can login to the guest OS.
  The SSH port is bound to the localhost of the host OS.

* Port forwarder:
  localhost ports of the guest OS are forwarded to the localhost of the host OS.
  These forwarded ports are not exposed to non-localhost by default, but this behavior is customizable.

* (Optional) SFTP:
  When the filesystem mount type is configured to `reverse-sshfs` in a VM template,
  Lima launches an SFTP server process on the host and associate its stream to
  the SSH process so that the guest OS can mount the host filesystem.
  The SFTP server process is launched as a non-root user.

* (Optional) `socket_vmnet` daemon:
  When the network type is set to `lima:shared` in a VM template,
  Lima launches a [`socket_vmnet`](https://github.com/lima-vm/socket_vmnet) daemon with `sudo`
  so as to enable enhanced networking mode, e.g., publish the VM's IP address to the physical network.

### Actions
<!--
These are the steps that a project performs in order to provide some service
or functionality.  These steps are performed by different actors in the system.
Note, that an action need not be overly descriptive at the function call level.
It is sufficient to focus on the security checks performed, use of sensitive
data, and interactions between actors to perform an action.

For example, the access server receives the client request, checks the format,
validates that the request corresponds to a file the client is authorized to
access, and then returns a token to the client.  The client then transmits that
token to the file server, which, after confirming its validity, returns the file.
-->

* `limactl create`: the CLI receives a template file via the argument,
  and populates the disk image for the instance.

* `limactl start`: the CLI launches the instance using the specified VM driver,
  and sets up port forwarding and filesystem mounts.
  This action does not need the root privilege on the host.
  When the network mode is set to `lima:shared`, the CLI launches the `socket_vmnet` daemon with `sudo`.
  The `sudoers` file for this operation can be generated with the `limactl sudoers` command.

* `limactl sudoers`: the CLI generates `/etc/sudoers.d/lima` file to allow running `socket_vmnet`.
  Not needed for the default configuration.

* `lima`, `limactl shell`: the CLI launches `ssh` to login to the VM instance.

* `limactl stop`: the CLI stops the specified VM instance.

* `limactl delete`: the CLI deletes the specified VM instance.

### Goals
<!--
The intended goals of the projects including the security guarantees the project
 is meant to provide (e.g., Flibble only allows parties with an authorization
key to change data it stores).
-->

* No root privilege is needed for installing and running VM

* When the root privilege is needed (i.e., `socket_vmnet`), the privileged operation is performed
  in a separate process that is confined with the `sudoers` file

* No port is published to non-localhost by default

### Non-goals
<!--
Non-goals that a reasonable reader of the project’s literature could believe may
be in scope (e.g., Flibble does not intend to stop a party with a key from storing
an arbitrarily large amount of data, possibly incurring financial cost or overwhelming
 the servers)
-->

* Tolerance to malicious template files is out of our goals.
  An instance created from a malicious template may read and write host files,
  depending on the host mounts specified in the template.

## Self-assessment use

<!--
This self-assessment is created by the [project] team to perform an internal analysis of the
project's security.  It is not intended to provide a security audit of [project], or
function as an independent assessment or attestation of [project]'s security health.

This document serves to provide [project] users with an initial understanding of
[project]'s security, where to find existing security documentation, [project] plans for
security, and general overview of [project] security practices, both for development of
[project] as well as security of [project].

This document provides the CNCF TAG-Security with an initial understanding of [project]
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
[project] seeks graduation and is preparing for a security audit.
-->

This self-assessment is created by the Lima team to perform an internal analysis of the
project's security.  It is not intended to provide a security audit of Lima, or
function as an independent assessment or attestation of Lima's security health.

This document serves to provide Lima users with an initial understanding of
Lima's security, where to find existing security documentation, Lima plans for
security, and general overview of Lima security practices, both for development of
Lima as well as security of Lima.

This document provides the CNCF TAG-Security with an initial understanding of Lima
to assist in a joint-assessment, necessary for projects under incubation.  Taken
together, this document and the joint-assessment serve as a cornerstone for if and when
Lima seeks graduation and is preparing for a security audit.

## Security functions and features

<!--
* Critical.  A listing critical security components of the project with a brief
description of their importance.  It is recommended these be used for threat modeling.
These are considered critical design elements that make the product itself secure and
are not configurable.  Projects are encouraged to track these as primary impact items
for changes to the project.
* Security Relevant.  A listing of security relevant components of the project with
  brief description.  These are considered important to enhance the overall security of
the project, such as deployment configurations, settings, etc.  These should also be
included in threat modeling.
-->

* The security of Lima critically depends on VM drivers (e.g., QEMU, Virtualization.framework),
  SSH, SFTP, etc.
  Users have to make sure to install the well-maintained version of these dependencies.
  On macOS hosts, this can be typically accomplished by clicking the "Software Update" button of the System Preference,
  and by running `brew upgrade`.

## Project compliance

<!--
* Compliance.  List any security standards or sub-sections the project is
  already documented as meeting (PCI-DSS, COBIT, ISO, GDPR, etc.).
-->

N/A

## Secure development practices

<!--
* Development Pipeline.  A description of the testing and assessment processes that
  the software undergoes as it is developed and built. Be sure to include specific
information such as if contributors are required to sign commits, if any container
images immutable and signed, how many reviewers before merging, any automated checks for
vulnerabilities, etc.
* Communication Channels. Reference where you document how to reach your team or
  describe in corresponding section.
  * Internal. How do team members communicate with each other?
  * Inbound. How do users or prospective users communicate with the team?
  * Outbound. How do you communicate with your users? (e.g. flibble-announce@
    mailing list)
* Ecosystem. How does your software fit into the cloud native ecosystem?  (e.g.
  Flibber is integrated with both Flocker and Noodles which covers
virtualization for 80% of cloud users. So, our small number of "users" actually
represents very wide usage across the ecosystem since every virtual instance uses
Flibber encryption by default.)
-->

* Development Pipeline:
  * Every commit must be signed off with DCO, and every non-trivial commit must be approved by at least one other Maintainer (Committer or Reviewer).
    See <https://lima-vm.io/docs/community/contributing/> for the further information.
  * Dependabot is enabled to bump up Go dependencies automatically:
    <https://github.com/lima-vm/lima/blob/master/.github/dependabot.yml>
  * Vulnerabilities of the Go dependencies are occasionally scanned with [govulncheck](https://pkg.go.dev/golang.org/x/vuln/cmd/govulncheck)
  * CodeQL is enabled. Maintainers can see the results in <https://github.com/lima-vm/lima/security>.

* Communication Channels:
  GitHub and Slack. See <https://lima-vm.io/docs/community/>.

* Ecosystem:
  Lima has been widely adopted in several third-party projects, such as:
  * [Rancher Desktop](https://rancherdesktop.io/): Kubernetes and container management to the desktop
  * [Colima](https://github.com/abiosoft/colima): Docker (and Kubernetes) on macOS with minimal setup
  * [Finch](https://github.com/runfinch/finch): Finch is a command line client for local container development
  * [Podman Desktop](https://podman-desktop.io/): Podman Desktop GUI has a plug-in for Lima virtual machines

## Security issue resolution

<!--
* Responsible Disclosures Process. A outline of the project's responsible
  disclosures process should suspected security issues, incidents, or
vulnerabilities be discovered both external and internal to the project. The
outline should discuss communication methods/strategies.
  * Vulnerability Response Process. Who is responsible for responding to a
    report. What is the reporting process? How would you respond?
* Incident Response. A description of the defined procedures for triage,
  confirmation, notification of vulnerability or security incident, and
patching/update availability.
-->

* Responsible Disclosures Process:
  Vulnerabilities are expected to be reported via <https://github.com/lima-vm/lima/security/advisories/new>.
  Those who do not have a GitHub account may also use email to reach out to the Committers directly.

* Incident Response:
  Committers triage and confirm potential vulnerability reports, and ship a fix as soon as possible.
  Committers may coordinate with well-known downstream projects (e.g., Rancher Desktop, Colima, and Finch) for
  a disclosure of a serial vulnerability.

## Appendix

<!--
* Known Issues Over Time. List or summarize statistics of past vulnerabilities
  with links. If none have been reported, provide data, if any, about your track
record in catching issues in code review or automated testing.
* [CII Best Practices](https://www.coreinfrastructure.org/programs/best-practices-program/).
  Best Practices. A brief discussion of where the project is at
  with respect to CII best practices and what it would need to
  achieve the badge.
* Case Studies. Provide context for reviewers by detailing 2-3 scenarios of
  real-world use cases.
* Related Projects / Vendors. Reflect on times prospective users have asked
  about the differences between your project and projectX. Reviewers will have
the same question.
-->

* Known Issues Over Time: See <https://github.com/lima-vm/lima/security/advisories>.
  * [GHSA-f7qw-jj9c-rpq9](https://github.com/lima-vm/lima/security/advisories/GHSA-f7qw-jj9c-rpq9) (May 30, 2023):
    A virtual machine instance with a malicious disk image could read a single file on the host filesystem, even when no filesystem is mounted from the host.
    Fixed in Lima v0.16.0, by prohibiting using a backing file path in the VM base image.

* CII Best Practices: See <https://www.bestpractices.dev/en/projects/6505>. Passing.

* Case Studies: See Rancher Desktop (SUSE), Colima, Finch (AWS) below.

* Related Projects / Vendors:
  * [Rancher Desktop](https://rancherdesktop.io/): Kubernetes and container management to the desktop
  * [Colima](https://github.com/abiosoft/colima): Docker (and Kubernetes) on macOS with minimal setup
  * [Finch](https://github.com/runfinch/finch): Finch is a command line client for local container development
  * [Podman Desktop](https://podman-desktop.io/): Podman Desktop GUI has a plug-in for Lima virtual machines
  * [lima-xbar-plugin](https://github.com/unixorn/lima-xbar-plugin): xbar plugin to start/stop VMs from the menu bar and see their running status.
  * [lima-gui](https://github.com/afbjorklund/lima-gui): Qt GUI for Lima
