# Dragonfly Security Self-Assessment

The Self-assessment is the initial document for Dragonfly to begin thinking
about the security of the project, determining gaps in its security, and preparing
any security documentation for their users.

Authors: Wenbo Qi(@gaius-qi)

Security reviewers: Tao Peng(@bergwolf), Wenbo Qi(@gaius-qi), Song Yan(@imeoer), Akash HR(akashhr), Xiongxiong Yuan(@yxxhero), Yiyang Huang(@hyy0322)

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

|                   |                                                                                                             |
| ----------------- | ----------------------------------------------------------------------------------------------------------- |
| Assessment Stage  | Complete                                                                                                    |
| Software          | [Dragonfly](https://github.com/dragonflyoss/Dragonfly2)                                                     |
| Website           | https://d7y.io                                                                                              |
| Security Provider | No                                                                                                          |
| Languages         | Go, Rust                                                                                                    |
| SBOM              | [FOSSA Scan](https://app.fossa.com/projects/git%2Bgithub.com%2Fdragonflyoss%2FDragonfly2/refs/branch/main/) |

### Security links

| Doc                          | url                                                                |
| ---------------------------- | ------------------------------------------------------------------ |
| Security file                | <https://github.com/dragonflyoss/Dragonfly2/blob/main/SECURITY.md> |
| Default and optional configs | <https://d7y.io/docs/>                                             |

## Overview

Dragonfly provides efficient, stable, secure file distribution and image acceleration based on p2p technology
to be the best practice and standard solution in cloud native architectures. It is hosted by
the Cloud Native Computing Foundation(CNCF) as an Incubating Level Project.

### Background

Dragonfly 1.x has been open source in November 2017 and used in production environments by many companies. And joined
the CNCF as a sandbox project in October 2018. In April 2020, The CNCF Technical Oversight Committee (TOC) voted to
accept Dragonfly as an Incubating Project. In April 2021, Dragonfly 2.0 was released after architectural optimization and
code refactoring.

Dragonfly provides efficient, stable and secure file distribution and image acceleration based on P2P technology
to be the best practice and standard solution in cloud native architectures.
It is designed to improve the efficiency and speed of large-scale file distribution and used in the fields of file distribution,
AI model distribution, cache distribution, log distribution and image distribution.

With the production practice, Dragonfly based on P2P technology to accelerate the image is insufficient to support
faster container launching, such as the Function as a Service (FaaS).
Therefore, we created Nydus as a sub-project of Dragonfly to address this need
and [Nydus Snapshotter](https://github.com/containerd/nydus-snapshotter) become a sub-project of containerd
which is an external plugin of containerd for Nydus.
Nydus implements a content-addressable file system that enhances the current OCI image format with
faster container launch speed, better image space and network bandwidth efficiency, and end-to-end data integrity.

### Actors

Dragonfly services could be divided into four categories: Manager, Scheduler, Seed Peer and Peer.

![arch](./images/arch.png)

#### Manager

- Stores dynamic configuration for consumption by seed peer cluster, scheduler cluster and client.
- Maintain the relationship between seed peer cluster and scheduler cluster.
- Provide async task management features for image preheat combined with harbor.
- Keepalive with scheduler instance and seed peer instance.
- Filter the optimal scheduler cluster for client.
- Provides a visual console, which is helpful for users to manage the P2P cluster.
- Clearing P2P task cache.

#### Scheduler

- Based on the multi-feature intelligent scheduling system selects the optimal parent peer.
- Build a scheduling directed acyclic graph for the P2P cluster.
- Remove abnormal peer based on peer multi-feature evaluation results.
- In the case of scheduling failure, notice peer back-to-source download.
- Provide metadata storage to support file writing and seeding.

#### Client

- Serve gRPC for `dfget` with downloading feature,
  and provide adaptation to different source protocols.
- It can be used as seed peer. Turning on the Seed Peer mode can be used as
  a back-to-source download peer in a P2P cluster,
  which is the root peer for download in the entire cluster.
- Serve proxy for container registry mirror and any other http backend.
- Download object like via `http`, `https` and other custom protocol.
- Supports RDMA for faster network transmission in the P2P network.
  It can better support the loading of AI inference models into memory.

### Actions

#### Download Task

- Actors: Scheduler, Seed Peer, Peer
- Description: When downloading a task , the download request is proxied to Dragonfly via the Peer HTTP Proxy.
  Peer will first register the Task with the Scheduler, and the Scheduler will check the Task metadata to
  determine whether the Task is downloaded for the first time in the P2P cluster. If this is the first
  time downloading, the Seed Peer will be triggered to download back-to-source, and the Task will be divided based
  on the piece level. After successful registration, The peer establishes a connection to the scheduler based on
  this task, and then schedule the Seed Peer to the Peer for streaming based on piece level. when a piece is successfully
  downloaded, the piece metadata will be reported to the Scheduler for next scheduling. If this is not the first time
  downloading, the Scheduler will schedule other Peers for the download. The Peer will download pieces from different Peers,
  splices and returns the entire file, then the P2P download is completed.
- Security Checks: Peer HTTP Proxy should be protected from basic authentication and authorization.
  Each piece of the task should be verified by the hash algorithm to ensure the integrity of the data.
  The data transmission between the Peers has been encrypted to ensure the security of the
  data when enable the security feature.

#### Preheat Task

- Actors: Manager, Scheduler, Seed Peer
- Description: Preheat task is a feature that allows users to preheat the task in the P2P cluster. The Manager
  will first receive the preheat request from the client, and then the Manager will call scheduler to schedule
  the Seed Peer to download the task back-to-source. After the task is downloaded, the Scheduler will record the
  metadata of the task, and the Seed Peer will be scheduled to download the task to the Peer.
- Security Checks: The preheat task API in manager should be protected by the Personal Access Token (PAT) to
  ensure the security. If user uses the console to preheat the task, user should login with the username and password
  to access the console. The console integrated with the RBAC to control the user's access.

#### Services Communication

- Actors: Manager, Scheduler, Seed Peer, Peer
- Description: Services communication via gRPC. Peer and Seed Peer will call the Manager to update dynamic configuration.
  Peer and Seed Peer will call the Scheduler to register the task and report the task status. Scheduler will call the
  Seed Peer to download the task back-to-source. Peer exchange piece information with each other.
- Security Checks: The gRPC communication should be protected by the TLS to ensure the security of the data transmission.

### Goals

**General**

- P2P technology: Based on P2P technology, use the idle bandwidth of Peer to improve download speed.
- Non-invasive: Non-intrusive support for multiple container runtimes, download tools, AI infrastructure, etc.
- Peer configuration: Load limit, concurrent limit, traffic limit, etc. can be configured.
- Consistency: Ensures downloaded files are consistent even if the user does not check for consistency.
- Exception isolation: Isolate exceptions based on Service level, Peer level and Task level to improve download stability.
- Ecosystem: Provides simple integration with AI infrastructure, container runtimes, container registry,
  download tools, etc.

**Security**

- Data integrity: Ensure the integrity of the data by verifying the hash algorithm.
- Data transmission: Ensure the security of the data transmission by encrypting the data.
- Access control: Ensure the security of the access by the Personal Access Token (PAT).
- User authentication: Ensure the security of the user by the username and password.

### Non-Goals

**General**

- Data Storage: Dragonfly does not store any data, it only caches the data temporarily. The data will be evicted after
  the task reaches the expiration time.
- Data Visualization: Dragonfly does not provide data visualization, but provides a visual console to manage the P2P cluster.
- Container Runtime: Dragonfly does not provide container runtime, but provides a Nydus Snapshotter to
  enhance the container launch speed.

**Security**

- Sensitivite Data: Dragonfly does not handle sensitive data, such as user's personal information,
  user's password, etc. The data only caches the file data temporarily.
- Download Access Control: Dragonfly does not provide download access control, if you want to control the download
  access, you need to control the access from the source side.

## Self-Assessment Use

This self-assessment is created by the Dragonfly team to perform an internal analysis of the project's security.
It is not intended to provide a security audit of Dragonfly or function as an independent assessment or
attestation of Dragonfly's security health. The document is intended to be used by the Dragonfly team to
identify areas of improvement in the project's security posture.

## Security Functions and Features

### Critical

A listing critical security components of the project with a brief
description of their importance. It is recommended these be used for threat modeling.
These are considered critical design elements that make the product itself secure and
are not configurable. Projects are encouraged to track these as primary impact items
for changes to the project.

- Transport-Layer Security (TLS): The services communication is encrypted by the TLS to ensure the security of the data transmission.
  Dragonfly uses the OpenSSL library to provide the TLS support for the gRPC communication.
- Authentication and Authorization: The Peer HTTP Proxy should be protected from basic authentication and authorization.
  The preheat task API in manager should be protected by the Personal Access Token (PAT) to ensure the security.
  The console integrated with the RBAC to control the user's access.
- Data Verification: Each piece of the task should be verified by the hash algorithm(blake3) to ensure the
  integrity of the data.
- Control Access: The console integrated with the RBAC to control the user's access for operating the P2P cluster,
  dynamic configuration, preheat task, etc.

### Security Relevant

A listing of security relevant components of the project with
brief description. These are considered important to enhance the overall security of
the project, such as deployment configurations, settings, etc. These should also be
included in threat modeling.

- Logging and Monitoring: Dragonfly provides the log and metrics for monitoring the P2P cluster.
  The log and metrics can be used to monitor the P2P cluster, detect the abnormal behavior, and
  analyze the performance of the P2P cluster.
- Dynamic Configuration: Dragonfly provides dynamic configuration for consumption by Seed Peer,
  Scheduler and Peer. The dynamic configuration can be used to configure the P2P cluster,
  such as load limit, concurrent limit, traffic limit, etc. If DDoS attack occurs, the dynamic configuration
  can be used to limit the traffic of the P2P cluster.
- Scan and Analysis: Dragonfly uses the FOSSA to scan the dependencies of the project to ensure the security of the dependencies.
  The FOSSA can be used to detect the vulnerabilities of the dependencies and provide the solution to fix the vulnerabilities.

## Project compliance

Dragonfly does not document meeting particular compliance standards.

## Secure Development Practices

### Development Pipeline

All code is maintained on [Github](https://github.com/dragonflyoss/Dragonfly2).

- Contributions and Changes
  - Code changes are submitted via Pull Requests (PRs) and must be signed and verified.
  - Commits to the main branch directly are not allowed.
- Code Review
  - Changes must be reviewed and merged by the project maintainers.
  - The code is reviewed by multiple members from various teams and then approved by all of the reviewers before
    passing the check.
- Automated Testing
  - In each PR, the code has to pass through various security checks and vulnerability analysis, to find if the code is
    secure and would not fail basic testing.
  - Tools like CodeQL and GoSec have been adopted for security scanning.
  - The project utilizes various vulnerability tests, unit tests and neutral tests to quantify whether the changes
    would be safe in basic context, before the reviews done by the project maintainers.
- Dependency Management
  - The project regularly updates its dependencies and check for vulnerabilities and keeps its github
    updated at all times asynchronously.

### Communication Channels

- Internal
  - The Dragonfly team mostly uses platforms like GitHub, Slack, or email lists for internal communications within the teams.
- Inbound
  - Users and contributors to the Dragonfly project can communicate with the Dragonfly team via GitHub issues, mailing lists,
    CNCF and through Slack channels as well.
- Outbound
  - The updates and announcements from Dragonfly are made through Dragonfly Blog, GitHub, CNCF mailing lists,
    and social media channels.

### Ecosystem

Dragonfly is integrated with various cloud-native projects and container runtimes, such as containerd, Docker, CRI-O, etc.
It is widely used in the fields of file distribution, AI model distribution, cache distribution,
log distribution and image distribution.

Reference to the first integrations that offer-first party support for Dragonfly is present here in [Integrations](https://d7y.io/docs/next/operations/integrations/container-runtime/containerd/).

#### Image Acceleration

Dragonfly supports various container clients such as containerd, Docker, cri-o, ORAS, etc.
It provides three solutions for image acceleration. The first solution is to use Dragonfly to distribute
images based on P2P technology, which is suitable for large-scale cluster. The second solution is to use Dragonfly and
Nydus to distribute accelerated images, which is suitable for large-scale cluster and faster container launching.
The third solution is to use Nydus to distribute accelerated images, which is suitable for faster container launching.

Production practice and statistical data can refer to:

- [Dragonfly integrates nydus for image acceleration practice](https://www.cncf.io/blog/2022/11/21/dragonfly-integrates-nydus-for-image-acceleration-practice/)
- [The evolution of the Nydus Image Acceleration](https://www.cncf.io/blog/2022/11/15/the-evolution-of-the-nydus-image-acceleration/)
- [Volcano Engine: distributed image acceleration practice based on Dragonfly](https://www.cncf.io/blog/2023/04/13/volcano-engine-distributed-image-acceleration-practice-based-on-dragonfly/)
- [Ant Group security technology’s Nydus and Dragonfly image acceleration practices](https://www.cncf.io/blog/2023/05/01/ant-group-security-technologys-nydus-and-dragonfly-image-acceleration-practices/)
- [Stable and efficient image distribution for 1 billion monthly users with Dragonfly](https://www.cncf.io/case-studies/kuaishou-technology/)

#### File Distribution

Dragonfly supports large-scale file distribution and uses P2P technology to eliminate the impact of
origin bandwidth limitations. It supports file distribution of protocols including HTTP, HDFS, etc.
Additionally, it also supports different object storage protocols includes S3, OSS, OBS, etc.

Add [Dfstore](https://d7y.io/docs/concepts/terminology/dfstore) to expand the file distribution capability,
it can depend on different types of object storage, such as S3, OSS, OBS, etc. to provide stable object storage capabilities.
Dfstore uses the entire P2P network as a cache when storing objects. Depend on object storage as
the backend to ensure storage reliability. In the process of object storage, P2P cache is effectively
used for fast read and write storage.

#### AI Infrastructure

Dragonfly supports distributing data during AI training and AI inference.
In the AI inference, Dragonfly supports [Triton Server](https://github.com/triton-inference-server/server) and [TorchServe](https://github.com/pytorch/serve)
to use Dragonfly distribution model. In the AI training, [Fluid](https://github.com/fluid-cloudnative/fluid) downloads
dataset through Dragonfly when running based on [JuiceFS](https://github.com/juicedata/juicefs).

There are many use cases in the community, using Dragonfly to distribute data based on P2P technology.
In the inference, the concurrent download model of the inference service can effectively relieve the bandwidth pressure of
the model registry through Dragonfly, and improving the download speed. Users can embed the model into the
accelerated image and use Dragonfly and Nydus for faster container launching.

Production practice and statistical data can refer to:

- [Dragonfly: Intro, Updates and AI Model Distribution in the Practice of Kuaishou - Wenbo Qi, Ant Group & Zekun Liu, Kuaishou Technology](https://sched.co/1PTJb)
- [Dragonfly helps Volcano Engine AIGC inference to accelerate image through p2p technology](https://mp.weixin.qq.com/s/kY6DxRFspAgOO23Na4dvTQ)
- [Get faster pull times with Nydus on CoreWeave](https://docs.coreweave.com/cloud-tools/nydus)

## Security Issue Resolution

### Responsible Disclosure Process

Dragonfly has a security policy and process in place for responsible disclosure of security vulnerabilities, refer to the
[SECURITY.md](https://github.com/dragonflyoss/Dragonfly2/blob/main/SECURITY.md).

- Security researchers can report vulnerabilities confidentially by emailing the Dragonfly maintainers at <dragonfly-maintainers@googlegroups.com>.
- Report the security issue with the detailed information, such as the description of the vulnerability,
  the steps to reproduce the vulnerability through the <https://github.com/dragonflyoss/Dragonfly2/issues>.
- The Dragonfly maintainers will acknowledge the report within 48 hours and provide an estimated timeline for a fix.
- Patch releases are made available as soon as possible after the vulnerability is confirmed and a fix is available.

### Incident Response

The Dragonfly maintainers will respond to security incidents within 48 hours of being notified. In practice,
the response time is usually much faster. The Dragonfly maintainers will work with the reporter to understand
the issue and develop a fix.

## Appendix

### Known Issues Over Time

There haven't been any known security issues in the project. If you find any security issues,
please report them tools like GitHub issues, mailing lists, CNCF and through Slack channels.

### CII Best Practices

Dragonfly has attained the Open Source Security Foundation(OpenSSF) Best Practices Badge,
refer to <https://bestpractices.coreinfrastructure.org/projects/7103>.

### Case Studies

- Volcano Engine - <https://www.cncf.io/blog/2023/04/13/volcano-engine-distributed-image-acceleration-practice-based-on-dragonfly/>
- KuaiShou - <https://www.cncf.io/case-studies/kuaishou-technology/>
- Ant Group - <https://www.cncf.io/blog/2023/05/01/ant-group-security-technologys-nydus-and-dragonfly-image-acceleration-practices/>
- CoreWeave - <https://docs.coreweave.com/cloud-tools/nydus>

### Related Projects/Vendors

- **Harbor** provides a registry for storing and distributing container images. It can be integrated with Dragonfly to
  accelerate image distribution. Dragonfly will help Harbor to distribute images based on P2P technology in
  a large-scale cluster.
- **Containerd** is a container runtime. Dragonfly integrates with containerd to provide
  image acceleration and container launching based on P2P technology. Dragonfly will become an mirror for containerd
  to intercept the image download traffic to accelerate the image download. If user uses Nydus Snapshotter, the containerd will
  download image on-demand and launch container faster.
- **Docker** is a container runtime. Dragonfly integrates with Docker to provide image acceleration and
  container launching based on P2P technology. Dragonfly will intercept the Docker image download traffic by HTTP Proxy
  to accelerate the image download.
