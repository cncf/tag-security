---
title: "Container Runtime"
date: "2020-10-01"
category: "distribute"
---

The runtime environment of a container needs to be monitored and secured from a process, file, and network perspective. Only sanctioned capabilities and system calls (e.g. seccomp filters), should be allowed to execute or be invoked in a container by the host operating system. Changes to critical mount points and files should be monitored and prevented. Configuration must prevent changes to binaries, certificates, and remote access configurations. The configuration must also prevent ingress and egress network access for containers to only what is required to operate. Additionally, network traffic to malicious domains should be detected and denied.

## Projects

- [Falco](https://github.com/falcosecurity/falco)
- [OpenSCAp Daemon](https://www.open-scap.org/tools/openscap-daemon/)
- [Dagda](https://github.com/eliasgranderubio/dagda)

<!---
## Commercial Projects
- [Commercial Projects](optional)
- [kART - Rapid7] (www.alcide.io)
-->

## Examples

- Some of the container events that should be monitored are:
  - A shell is running inside a container or pod in Kubernetes.
  - A privileged pod is started in a Kubernetes cluster 
  - A container is running in privileged mode

