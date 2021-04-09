---
title: "Persistent Volume Protection"
date: "2020-10-01"
category: "runtime"
---

Protecting access to volumes is critical to ensure only authorized containers and workloads may leverage volumes
provided. It is imperative to define trust boundaries for namespaces to cordon access to volumes. Leverage existing or
create new security policies that prevent groups of containers from accessing volume mounts on worker nodes and ensure
only appropriate worker nodes have access to volumes. It is especially critical as privileged containers can gain access
to a mounted volume in a different namespace, so additional precautions are needed.

Specifying the UID or GID of the volume still permits access by container in the same namespace and will not provide
data protection. Network file system version 3 (NFSv3) assumes the client has already performed authentication and
authorization and does not perform validation. It is critical to consider where authentication and authorization occur
and whether validation of that action exists when implementing protections.

## Projects
- TODO

## Examples
- TODO

## Links
- TODO
