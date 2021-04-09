---
title: "Storage"
date: "2020-10-01"
category: "runtime"
---

Cloud Native Storage covers a broad set of technologies that are bucketed into `presented storage` and `accessed storage`.
Presented storage is storage made available to workloads such as volumes and includes block stores, filesystems and
shared file systems. Access storage is storage that is accessed via an application API, and includes object stores,
key value stores, and databases.

Storage systems contain a data access interface that defines how applications or workloads store or consume data that
is persisted by the storage system or service. This interface can be protected by access controls, authentication,
authorization, and potentially encryption in transit.

Storage systems also contain a control plane management interface which is typically an API protected by authentication
and TLS, although finer grained access may be available. In general the control interface is only accessed via a
service account by an orchestrator or service broker.