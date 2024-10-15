# wasmCloud Self-assessment

## Table of contents

- [wasmCloud Self-assessment](#wasmcloud-self-assessment)
  - [Table of contents](#table-of-contents)
  - [Metadata](#metadata)
    - [Security links](#security-links)
  - [Overview](#overview)
    - [Background](#background)
    - [Actors](#actors)
    - [Actions](#actions)
    - [Goals](#goals)
    - [Non-goals](#non-goals)
  - [Self-assessment use](#self-assessment-use)
  - [Security functions and features](#security-functions-and-features)
  - [Project compliance](#project-compliance)
  - [Secure development practices](#secure-development-practices)
  - [Security issue resolution](#security-issue-resolution)
  - [Appendix](#appendix)
    - [Related projects and vendors](#related-projects-and-vendors)

## Metadata

|                   |                                                        |
| ----------------- | ------------------------------------------------------ |
| Assessment Stage  | In Progress                                            |
| Software          | https://github.com/wasmCloud/wasmCloud                 |
| Security Provider | No                                                     |
| Languages         | Rust, Go, TypeScript, JavaScript, Shell                |
| SBOM              | wasmCloud does not currently generate SBOMs on release |

### Security links

| Document      | URL                                                          |
| ------------- | ------------------------------------------------------------ |
| Security file | https://github.com/wasmCloud/wasmCloud/blob/main/SECURITY.md |

## Overview

wasmCloud is a platform for building and deploying distributed applications using WebAssembly
(Wasm). It is designed to provide a lightweight, highly secure and portable WebAssembly runtime with
WebAssembly-native orchestration for managing and scaling declarative applications – enabling
secure, portable, and composable cloud native applications. This allows developers to build scalable
systems using any programming language that compiles to WebAssembly, providing a universal runtime
for cloud, edge, and IoT environments.


### Background

wasmCloud is an open-source technology enabling platform engineering and application development
teams to deliver distributed applications built using WebAssembly. 

WebAssembly offers several core benefits that make it an increasingly important and interesting
technology for cloud-native computing workloads:

* **Portability**: WebAssembly is designed to be platform-agnostic, meaning code written in
  WebAssembly can run across different environments—whether in browsers, servers, cloud, edge, or
  IoT devices—without modification.

* **Performance**: WebAssembly is compiled into a binary format that runs at near-native speed,
  providing efficient execution compared to traditional interpreted languages, especially in
  resource-constrained environments.

* **Security**: WebAssembly operates in a secure, sandboxed environment, isolating applications from
  the host system. Each sandboxed module gets access to only the set of capabilities that it is
  explicitly granted and nothing more.

* **Lightweight**: WebAssembly Components are small and fast to load, which makes them ideal for
  resource-constrained environments like edge devices and embedded systems, while also reducing
  startup times in the cloud.

wasmCloud goes beyond core WebAssembly by targetting WebAssembly Components as the unit of
deployment, which themselves bring along the following additional benefits on top of what
WebAssembly already provides:

* **Language-agnostic Composition**: WebAssembly Components allow code to be written in different
  programming languages to be seamlessly integrated into a single application. This means developers
  can leverage the strengths of multiple languages while maintaining a unified runtime, enhancing
  both flexibility and collaboration.

* **Modularity and Reusability**: With WebAssembly Components, individual functionality can be
  encapsulated into reusable modules, which can be composed into larger applications. This
  modularity simplifies development and maintenance by enabling code reuse and simplifying upgrades
  or replacement of specific components without disrupting the entire system.

* **Interoperability**: WebAssembly Components are designed to communicate with each other in a
  standardized way, regardless of the programming languages they were built in. This ensures that
  components can be shared and reused across projects or ecosystems, enabling faster development
  cycles and more interoperable systems.

* **Security Isolation**: As with core WebAssembly modules, components are run inside of their own
  secure sandboxes. Each component is fully isolated from the others, and they can interact with one
  another over typed interface definitions.

Finally, wasmCloud provides the necessary tooling to cover the entire software lifecycle from local
development to running and operating in prouction.

### Actors

The following table describes all actors of the wasmCloud project.


| Actor                               | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| wasmCloud Host                      | The wasmCloud host is the core executable for wasmCloud. It uses the wasmtime runtime to execute WebAssembly Components and also executes providers. It connects to NATS as its communication backbone and provides a low-level API for controlling various components of the system. Hosts are separated from other hosts using what is called a "lattice" (a namespace)                                                                                                                                                                                                                                                |
| Wadm (wasmCloud Deployment Manager) | A reconcilation loop based system comparable to the Kubernetes API and scheduler. This actor takes desired state and translates it to commands that are sent to individual hosts. It has the ability to manage multiple lattices but must authenticate to the Host APIs in the same way as any other entity                                                                                                                                                                                                                                                                                                              |
| WebAssembly Components              | Possibly untrusted, user-provided code compiled to WebAssembly. This is often the business logic of an application. WebAssembly Components are entirely introspectable so the system can identify exactly what capabilies are being requested or provided. These are subject to all the security guarantees described in the [background](#background) section.                                                                                                                                                                                                                                                          |
| Capability Providers                | Providers are the most privileged actor in the wasmCloud ecosystem and should be under the most scrutiny. As indicated by their name, these binaries provide specific functionality required by WebAssembly Components in the system. Examples of these include database connections, HTTP connections, ML/AI processing, access to blobstores, and so on. Generally there are many components, but few providers. A provider is often meant to be reused by many components. They are generally provided as trusted wasmCloud maintained providers or as custom providers created by the organization running wasmCloud |


### Actions

| Action             | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Host API calls     | All wasmCloud APIs are via topic spaces in NATS, so authorization and authentication are initially provided by NATS. The recommended pattern for authn/z is via [decentralized JWT authentication](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_intro/jwt). These tokens can be used to restrict access to specific lattices (i.e. namespaces) or specific API operations. Additionally, there is an optional and extensible [policy service](https://wasmcloud.com/docs/deployment/security/policy-service) that API calls are subject to if configured. This allows users to integrate with existing frameworks like OPA for authorization |
| Wadm API calls     | Similarly to the Host API, the Wadm API uses NATS topics and authn/z for connections, along with the same power to restrict those tokens. Wadm API calls eventually get translated to Host API calls, using the permissions of Wadm and not the user.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| Linking components | Although this is technically a subset of the Host API, it is important to call out from a security actions perspective. wasmCloud gives you the ability to link components to their requested capabilities at runtime. This is a privileged operation often restricted to platform teams for production deployments. These links can be removed at any time for instant denial of capabilities or to hot swap capabilities when rolling out critical security fixes                                                                                                                                                                                                          |
| Secrets management | wasmCloud provides [secrets backend](https://wasmcloud.com/docs/deployment/security/secrets) with the ability to hook in a variety of secret stores. These are provided via encrypted data as described in the [wasmCloud documentation](https://wasmcloud.com/docs/concepts/secrets)                                                                                                                                                                                                                                                                                                                                                                                        |

### Goals

wasmCloud's goal is to be the way to run standard WebAssembly Components (i.e. no custom wasmCloud
SDKs needed) in a distributed manner. As such, the project goal is to ensure all of the security
guarantees of WebAssembly are reflected in wasmCloud itself. Only those with proper API permssions
and roles are able to start entities within the system and link those entities together. By default
nothing is linked together unless explictly configured to do so, maintaining the sandbox
environment. 

The security of communications between hosts is reliant on the configuration of NATS and the access
tokens used to connect to it. If the NATS cluster is properly configured with token authentication
and TLS, communications should be secure and encrypted. Misconfiguration of NATS can result in
unintentional exposure or connections.

### Non-goals

wasmCloud does not attempt to enforce or handle other security guarantees outside of those provided
by WebAssembly or other systems integrated via capability provider

## Self-assessment use

This self-assessment is created by the wasmCloud team to perform an internal analysis of the
project’s security. It is not intended to provide a security audit of wasmCloud, or function as an
independent assessment or attestation of wasmCloud’s security health.

This document serves to provide wasmCloud users with an initial understanding of wasmCloud’s
security, where to find existing security documentation, wasmCloud plans for security, and general
overview of wasmCloud security practices, both for development of wasmCloud as well as security of
wasmCloud.

This document provides the CNCF TAG-Security with an initial understanding of wasmCloud to assist in
a joint-assessment, necessary for projects under incubation. Taken together, this document and the
joint-assessment serve as a cornerstone for if and when wasmCloud seeks graduation and is preparing
for a security audit.

## Security functions and features

**Critical**

- wasmCloud Host: The host embeds the [Wasmtime runtime](https://wasmtime.dev/) as it's WebAssembly
  runtime, which is fuzzed regularly. The security of the underlying WebAssembly sandbox relies
  completely on its security. The wasmCloud host itself validates that various entities are
  correctly linked and allowed to communicate.

**Security Relevant**

- Capability Providers: Providers are the most privileged actor in the wasmCloud ecosystem and
  should be under the most scrutiny and review before adding the use of a new provider.
- NATS Cluster: The NATS cluster used for wasmCloud should be properly secured and encrypted to
  guarantee security of communications. It is highly recommended to use [decentralized JWT
  authentication](https://docs.nats.io/running-a-nats-service/configuration/securing_nats/auth_intro/jwt)
  to best restrict access to specific API topics
- Policy Service: If used, integration with policy engines should have testing in place for the
  various rules

## Project compliance

The wasmCloud project does not comply with any specific security standard. However, various security
standards may be applied to related projects such as NATS or services to which capability providers
can connect.

## Secure development practices

**Development Pipeline**

- All wasmCloud repos use Dependabot configured with regular scans for all projects, including
  automatic update PRs
- The main wasmCloud host is also subject to `cargo audit` on all PRs.
- All PRs require reviews from the proper subject matter expert before merging

**Communication Channels**

Most communication happens on the wasmCloud Slack for both inbound/outbound communication from/to
the community as well as internal communication between project and org maintainers. There is also
the cncf-wasmCloud-maintainers@lists.cncf.io that can be used for asynchronous communication

**Ecosystem**

wasmCloud is deeply integrated into the cloud native ecosystem. The project uses CNCF incubating
project NATS for the messaging layer of its application. wasmCloud supports running its WebAssembly
binaries by downloading from OCI compliant registries, exporting traces, logs, and metrics to
OpenTelemetry compatible collectors, and defines its declarative application manifests using the
Open Application Model.

Additionally, there are integrations with other technologies within the CNCF such as a Kubernetes
operator, policy engine support for OpenPolicyAgent, and many other extension points.

## Security issue resolution

The project's security disclosure and incident processes are thoroughly documented in the
[SECURITY.md](https://github.com/wasmCloud/wasmCloud/blob/main/SECURITY.md) doc in the main repo of
the project.

An example of the resulting advisory can been seen
[here](https://github.com/wasmCloud/wasmcloud-otp/security/advisories/GHSA-2cmx-rr54-88g5)

## Appendix

- Known Issues Over Time: There has only been one recorded CVE. Details of that CVE can be found
  [here](https://github.com/wasmCloud/wasmcloud-otp/security/advisories/GHSA-2cmx-rr54-88g5).
  Anecdotally, various security bugs have been prevented from the project's testing pipelines
- The wasmCloud project has passed OpenSSF best practices:
  https://www.bestpractices.dev/en/projects/6363
- Various users have provided real-world case studies of using wasmCloud. Links to those case
  studies and talks are provided for convenience below. More will also be available as the project
  finishes adopter interviews for moving to incubating
    - https://www.cncf.io/blog/2024/01/05/bringing-webassembly-to-telecoms-with-cncf-wasmcloud/
    - https://www.cncf.io/blog/2022/11/17/better-together-a-kubernetes-and-wasm-case-study/
    - https://www.cncf.io/blog/2024/08/23/wasmcloud-on-the-factory-floor-efficient-and-secure-processing-of-high-velocity-machine-data/
    - https://www.youtube.com/live/lUV49UjFAQM?si=oHxguYRRXFDHLdaF
    - https://youtu.be/1sWQqgK-79c?si=m3g0UqH1qp2_qAUm

Also of note is that the wasmCloud project has already complete and passed a security audit with
Trail of Bits. A summary of that audit can be found here:
https://ostif.org/ostif-has-completed-a-security-audit-of-wasmcloud/

### Related projects and vendors

Within the WebAssembly space, wasmCloud is most often compared with Fermyon Spin or with WasmEdge. A
brief discussion of the differences are discussed below:

- WasmEdge is a CNCF WebAssembly runtime with many batteries included. In many ways, WasmEdge is
  more similar to Spin and other Serverless runtimes than wasmCloud. A key difference is that
  wasmCloud is a distributed platform and not a runtime. wasmCloud embeds a runtime (Wasmtime), but
  is designed for distributed workloads. WasmCloud includes a WebAssembly Components native
  orchestrator that enables running components from the edge to the cloud. 
- Fermyon’s Spin project is a FaaS style runtime (Wasmtime) with a heavy focus on a smooth developer
  experience. Like WasmEdge, they have a batteries-included runtime and are built on the component
  model, but require the use of their custom multi-language Spin developer SDKs. They have the most
  polished developer experience but do not have many options for running in a distributed
  environment outside of relying on Kubernetes to orchestrate and scale deployments.
