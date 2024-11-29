# OpenYurt Self-assessment

- Zeyu Zhao: <2733147505@qq.com>

## Table of contents

- [Metadata](#metadata)
  - [Security Links](#security-links)
- [Overview](#overview)
- [Background](#background)
- [Actors](#actors)
  - [Yurt Manager](#yurt-manager)
  - [YurtHub](#yurthub)
  - [Raven Agent](#raven-agent)
  - [Yurtadm](#yurtadm)
  - [YurtIotDock](#yurtiotdock)
- [Actions](#actions)
- [Goals](#goals)
- [Non-goals](#non-goals)
- [Self-assessment use](#self-assessment-use)
- [Security functions and features](#security-functions-and-features)
  - [Critical](#critical)
  - [Security Relevant](#security-relevant)
- [Project compliance](#project-compliance)
- [Secure development practices](#secure-development-practices)
  - [Development Pipeline](#development-pipeline)
  - [Communication Channels](#communication-channels)
    - [Internal](#internal)
    - [Inbound](#inbound)
    - [Outbound](#outbound)
- [Security issue resolution](#security-issue-resolution)
- [Appendix](#appendix)

## Metadata

|                   |                                        |
| ----------------- | -------------------------------------- |
| Assessment Stage  | Incomplete                             |
| Software          | https://github.com/openyurtio/openyurt |
| Security Provider | No.                                    |
| Languages         | Go, Shell, Dockerfile                  |
| SBOM              |                                        |
|                   |

### Security Links

| DOC           | URL                                                            |
| ------------- | -------------------------------------------------------------- |
| Security file | https://github.com/openyurtio/openyurt/blob/master/SECURITY.md |

## Overview

OpenYurt is an open-source project that focuses on extending your native Kubernetes to edge. It addresses specific challenges for cloud-edge orchestration in Kubernetes such as unreliable or disconnected cloud-edge networking, edge autonomy, edge device management, region-aware deployment, and so on.

## Background

## Actors

### Yurt Manager
The yurt-manager consists of various controller and webhook processes to provide desired functionality in a cloud-edge collaboration scenario. The yurt-manager is deployed in kubernetes control plane, usually consists of two instances, one leader and one backup.

### YurtHub

Yurthub runs as a systemd service on the node, mainly responsible for proxying requests from pods and kubelet on the node,enabling node autonomy, and managing network topology.

### Raven Agent

Raven enhances network capabilities. It provide L3 network connectivity among pods in different physical regions. Raven-agent is deployed as daemonset in every edge nodes.

### Yurtadm

Yurtadm is CLI mainly to provide the ability of joining edge nodes to an openyurt cluster.

### YurtIotDock

Yurt-iot-dock enables seamless integration of EdgeX Foundry into cloud-native architecture for non-intrusive fusion in edge IoT solutions.

## Actions



## Goals

## Non-goals

## Self-assessment use

This self-assessment is created by the openyurt team to perform an internal analysis of the project’s security. It is not intended to provide a security audit of openyurt, or function as an independent assessment or attestation of openyurt’s security health.

This document serves to provide openyurt users with an initial understanding of openyurt’s security, where to find existing security documentation, openyurt plans for security, and general overview of openyurt security practices, both for development of openyurt as well as security of openyurt.

This document provides the CNCF TAG-Security with an initial understanding of openyurt to assist in a joint-assessment, necessary for projects under incubation. Taken together, this document and the joint-assessment serve as a cornerstone for if and when openyurt seeks graduation and is preparing for a security audit.

## Security functions and features

### Critical

### Security Relevant

## Project compliance

OpenYurt does not document meeting particular compliance standards.

## Secure development practices

### Development Pipeline

The [Contributing document](https://github.com/openyurtio/openyurt/blob/master/CONTRIBUTING.md) contains details about development pipeline. The main points are summarized below.

+ Contributions are made via GitHub pull requests
+ Pull request will trigger a github workflow including tests below
    + Type check and lint ci.
    + Trivy scan is adopted to scan vulnerability for every image.
    + Unit tests and e2e tests.
+ Code Review
    + Changes must be reviewed and merged by the project maintainers.

### Communication Channels

#### Internal

Team members use Github, WeChat, Ding Talk, and slack to communicate.

#### Inbound
Users communicate with the team through the [OpenYurt Community Slack](https://join.slack.com/t/openyurt/shared_invite/zt-2ajsy47br-jl~zjumRsCAE~BlPRRsIvg), [Github issues](https://github.com/openyurtio/openyurt/issues) or [Ding Talk](https://github.com/openyurtio/openyurt/#Contact).

#### Outbound

Team members communicate with users through the [emailing list](https://groups.google.com/g/openyurt/).

## Security issue resolution

## Appendix
