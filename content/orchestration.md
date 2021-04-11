---
title: "Orchestration"
date: "2020-10-01"
category: "runtime"
---


Most orchestrated systems will implement a variety of abstraction and virtualization layers that may include filesystems (such as bind mounts), volume managers, and the application of permissions at a user or group level based on orchestrator policies. As with many components of containerization and microservice architectures, protecting volumes and storage will always rely on the protections in place from other capabilities. If a user is able to escalate their privileges within the orchestrator or container runtime to root they can wreak havoc within the environment. The implementation of zero trust, least privilege, and access control and enforcement are linchpins in successfully securing storage in cloud native architectures.

