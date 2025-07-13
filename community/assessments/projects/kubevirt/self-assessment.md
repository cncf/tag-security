<!-- cSpell:ignore virt daemonset kubevirt virtualmachine instancetype overcommitting datavolume datavolumes sriov macspoofchk -->

# KubeVirt Self-Assessment

## Table of Contents

* [Metadata](#metadata)  
  * [Security links](#security-links)  
* [Overview](#overview)  
  * [Background](#background)  
  * [Actors](#actors)  
  * [Actions](#actions)  
  * [Goals](#goals)  
  * [Non-goals](#non-goals)  
* [Self-assessment use](#self-assessment-use)  
* [Security functions and features](#security-functions-and-features)  
* [Project compliance](#project-compliance)  
* [Secure development practices](#secure-development-practices)  
* [Security issue resolution](#security-issue-resolution)  
* [Appendix](#appendix)

## Metadata

|  |  |
| :---- | :---- |
| Assessment Stage | Incomplete |
| Software | [KubeVirt](https://github.com/kubevirt/kubevirt) |
| Security Provider | No |
| Languages | Go |
| SBOM | Software bill of materials.  Link to the libraries, packages, versions used by the project, may also include direct dependencies. |

### Security links

| Doc | url |
| :---- | :---- |
| KubeVirt Security Policy | [https://github.com/kubevirt/kubevirt/blob/main/SECURITY.md](https://github.com/kubevirt/kubevirt/blob/main/SECURITY.md) |
| KubeVirt Security Fundamentals | [https://kubevirt.io/2020/KubeVirt-Security-Fundamentals.html](https://kubevirt.io/2020/KubeVirt-Security-Fundamentals.html) |

## Overview

KubeVirt is a Kubernetes operator that enables the creation and management of virtual machines.

### Background

KubeVirt technology addresses the needs of development teams that have adopted or want to adopt Kubernetes but possess existing Virtual Machine-based workloads that cannot be easily containerized. More specifically, the technology provides a unified development platform where developers can build, modify, and deploy applications residing in both Application Containers as well as Virtual Machines in a common, shared environment.

### Actors

1. virt-operator is the Kubernetes operator for KubeVirt, it deploys the other components along with the KubeVirt CRD  
2. virt-api serves the KubeVirt API managing the virtual machine API, and other things like migrations and VMIs  
3. virt-controller contains the controllers for all the KubeVirt objects  
4. virt-handler is a daemonset deployed on worker nodes to manage VM instances  
5. virt-launcher is the unprivileged pod that contains the actual VM workload  
6. The cluster admin deploys, configures and maintains KubeVirt in the cluster  
7. The user deploys and manages VMs using the K8S APIs

### Actions

To create a virtual machine in Kubernetes

1. Deploy virt-operator and a `kubevirt` custom resource. The other components will deploy automatically  
2. Create a Kubernetes `virtualmachine` object and start it through virt-api  
3. virt-controller will create a virt-launcher pod for the VM and virt-handler will keep an eye on it

### Goals

The KubeVirt project intends to extend Kubernetes to allow running virtual machines inside unprivileged pods.

In order to ensure workload isolation, it runs every VM inside its own unprivileged pod, including the libvirt daemon.

### Non-goals

In-guest security is a responsibility of the guest owner.  
KubeVirt does not manage the Kubernetes infrastructure.

## Self-assessment Use

This self-assessment is created by the KubeVirt team to perform an internal analysis of the project's security. It is not intended to provide a security audit of KubeVirt, or function as an independent assessment or attestation of KubeVirt's security health.

This document serves to provide KubeVirt users with an initial understanding of KubeVirt's security, where to find existing security documentation, KubeVirt plans for security, and general overview of KubeVirt security practices, both for development of KubeVirt as well as security of KubeVirt.

This document provides KubeVirt maintainers and stakeholders with additional context to help inform the roadmap creation process, so that security and feature improvements can be prioritized accordingly.

## Security functions and features

### Critical

A listing critical security components of the project with a brief description of their importance. It is recommended these be used for threat modeling. These are considered critical design elements that make the product itself secure and are not configurable. Projects are encouraged to track these as primary impact items for changes to the project.

#### Unprivileged virt-launcher

The virtual machine host pod, virt-launcher, is unprivileged in the sense that it is non-root, doesn’t specify an SELinux policy and requires no capability other than NET\_BIND\_SERVICE, which is necessary to provide networking access to the guest.

#### Cryptography

KubeVirt uses OpenSSL, which is regularly updated. As with all dependencies, OpenSSL CVEs are tracked and addressed in all supported KubeVirt versions (and often beyond). While not FIPS-certified, KubeVirt can run in FIPS environments, provided the Kubernetes platform used is also FIPS-compliant.

### Security relevant

A listing of security relevant components of the project with brief description. These are considered important to enhance the overall security of the project, such as deployment configurations, settings, etc. These should also be included in threat modeling.

#### Restrict GPU and USB pass through to approved devices

Restricting passthrough to approved devices reduces the risk of unauthorized or unintended data sharing/transmission introduced by allowing GPU and USB connectivity.  
See `.spec.configuration.permittedHostDevices` in the KubeVirt CR.

#### Ensure KSM is disabled

Sharing resources introduces the risk of memory corruption attacks, unauthorized or unintended sharing of information, and the manipulation of data flow restrictions.  
See `.spec.configuration.ksmConfiguration` in the KubeVirt CR.

#### Restrict namespace administrator access to migration tools

Use RBAC to limit who can create migration (`VirtualMachineInstanceMigration`) and migration policy (`MigrationPolicy`) objects. See Kubernetes `Role`s and `ClusterRole`s.

#### Restrict exec access to the pods

Normal use of KubeVirt does not require anyone to have exec access into any virt-\* pod. Use RBAC to grant that permission (`exec` on `pod`s) only to approved administrators.

#### Restrict access to create and modify the Virtual Machine Cluster Instance and Preference Types

Use RBAC to limit who can create/update instance type (`VirtualMachineInstancetype` / `VirtualMachineClusterInstancetype`) and preference (`VirtualMachinePreference`) objects.

#### Restrict pass through of GPUs and Host devices to a Virtual Machine

GPUs and host devices are directly passed to the Virtual Machine for better performance, but it also constitutes a risk if the device has been infected.  
See `.spec.template.spec.domain.devices.gpus` and `.spec.template.spec.domain.devices.hostDevices` in individual VM definitions.

#### Avoid overcommitting guest memory

This is a hypervisor-level feature that allows nodes to host more virtual machines than would normally be allowed by KubeVirt’s scheduling algorithms. If the VM consumes the entire memory might cause the guest to crash with workload interruptions and guest malfunctioning.  
See `.spec.template.spec.domain.resources.overcommitGuestOverhead` in individual VM definitions.

#### Restrict access to cross datavolumes cloning

Any user with access to multiple namespaces for the purpose of cloning a datavolume consequently has access to the underlying data of a volume they do not own.  
Use RBAC to limit who can interact with datavolume source (`datavolumes/source` in `cdi.kubevirt.io`) objects.

#### Disable Shareable disks

Sharing system resources increases the risk of unauthorized access to data, manipulation of data flow restrictions, and could lead to corruption and data loss.  
See `.spec.template.spec.domain.devices.disks[].shareable` in individual VMs.

#### Avoid setting disk errorPolicy to ignore and rely on the defaults

Error policies on disks determine how a system should react when an Input/Output (IO) error occurs. Certain applications, such as Windows Shared Cluster Filesystem, require a different behavior than the default one, and the IO errors need to be reported to the guest Operating System by setting the errorPolicy to report. For testing purposes, the guest owner might wish to simply ignore the IO errors by setting the errorPolicy to ignore when the reads and writes on the disk are not crucial.  
See `.spec.template.spec.domain.devices.disks[].errorPolicy` in individual VMs.

#### Use dedicated VLANs to segment network traffic

The importance of layer 2 network segmentation can be attributed to its ability to enhance network security by creating separate broadcast domains for different groups of devices on the network. These broadcast domains limit the spread of broadcast traffic, making it more difficult for malicious actors to propagate their attacks across the entire network.  
See `.items[].spec.vlan` in `SriovNetwork` objects and `.items[].spec.config` in `NetworkAttachmentDefinition`s.

#### Enable MAC spoof filtering

This is important for ensuring the security of network communication because it helps prevent unauthorized access to systems and data.  
See `.items[].spec.spoofChk` in `SriovNetwork` objects and `.items[].spec.config.macspoofchk` in `NetworkAttachmentDefinition`s.

#### Use multi-network policies

Micro-segmentation enables better control over access privileges and traffic flow, allowing administrators to implement more stringent security policies and monitor network activity more effectively.  
See `MultiNetworkPolicy` objects.

#### Disable nested virtualization

While nested virtualization has safeguards in place to prevent malicious activity, disabling it undeniably reduces the attack surface.  
See `/sys/module/kvm_intel/parameters/nested` in the filesystem of worker nodes.

#### Verify that all CPU mitigations are enabled

This ensures that known attacks cannot be leveraged against each respective node.  
See `/sys/devices/system/cpu/vulnerabilities` in the filesystem of worker nodes.

## Project Compliance

KubeVirt complies with the Restricted [Pod Security Standard](https://kubernetes.io/docs/concepts/security/pod-security-standards).

## Secure Development Practices

We strive to implement the highest standard of secure development best practices, as noted below.

### Deployment Pipeline

In order to secure the SDLC from development to deployment, the following measures are in place.

- Branch protection on the default (`main`) branch:  
  - Require signed commits  
  - Require a pull request before merging  
    - Require approvals: 1  
    - Require lgtm: 1  
    - Dismiss stale pull request lgtm when new commits are pushed  
    - Require review from approver  
    - Require review from one other community member (lgtm)  
    - Require approval of the most recent reviewable push  
    - Require conversation resolution before merging  
  - Require status checks to pass before merging  
    - Requires all unit tests and end-to-end tests to pass before merging

### Communication Channels

Communication happens in the public Kubernetes slack channels (\#kubevirt-dev and \#virtualization), weekly community call as well as other recurring calls (see calendar) and the Google group / mailing list (kubevirt-dev).

## Security Issue Resolution

See the [KubeVirt Security Policy](https://github.com/kubevirt/kubevirt/blob/main/SECURITY.md)

## Appendix

- Known Issues Over Time  
- OpenSSF Best Practices  
- Case Studies  
- Related Projects / Vendors
