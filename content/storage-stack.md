---
title: "Storage Stack"
date: "2020-10-01"
category: "runtime"
---

Any storage solution is composed of multiple layers of functionality that define how data is stored, retrieved,
protected and interacts with an application, orchestrator and/or operating system. Each of these layers has the
potential to influence and impact the security of the storage system. A common example may be a filesystem that
persists files or blocks to an object store. It is equally important to protect every layer in the topology, and
not just the top layer where data is accessed.


### Orchestration
Most orchestrated systems will implement a variety of abstraction and virtualization layers that may include
filesystems (such as bind mounts), volume managers, and the application of permissions at a user or group level
based on orchestrator policies. As with many components of containerization and microservice architectures,
protecting volumes and storage will always rely on the protections in place from other capabilities. If a user is able
to escalate their privileges within the orchestrator or container runtime to root they can wreak havoc within the environment.
The implementation of zero trust, least privilege, and access control and enforcement are linchpins in successfully
securing storage in cloud native architectures.

### System Topology & Data Protection
Understanding a system's storage topology is key in order to secure both the data access path to the storage system,
and the intra-node communication in distributed topologies.

Common topologies include centralized models where all compute nodes access a central storage service, distributed
models that distribute the function over a number of nodes, and hyperconverged models where application and storage
workloads are combined on the same nodes. The selection of specific, layered security mechanisms to protect data in
storage and in transit between storage locations is driven on the topology in use by the system.

A key function of any storage system is to provide protection of the data that is being persisted in the system or service.
This protection is implemented first through availability of the data to authorized users and should exist as a
transparent layer in the system. This can include technologies such as parity or mirroring, erasure coding or replicas.
Protection is next implemented for integrity, in which storage systems will add hashing and checksums to blocks, objects
or files primarily designed to detect and recover from corrupted data, but can also add a layer of protection against
the tampering of data.

### Caching
Caching layers, often fully fledged separate systems, are implemented to improve the performance of storage systems,
especially filesystems, objects and databases. The appropriate access controls and security policies need to be applied
to the caching layer as the cache will be fronting the access to the actual storage back-end.

### Data Services
Storage systems often implement a number of data services which complement the core storage function by providing
additional functionality that may be implemented at different layers of the stack and may include replication and
snapshots (point-in-time copies of data). These services are often used to move copies of data to remote locations, and
it is important to ensure that the same access controls and security policies are applied to the data at the remote
location.

### Physical or Non-Volatile Layer
Cloud native storage security is not restricted to virtual cloud native architectures as cloud native capabilities can
be deployed on-prem, and even virtual offerings have a physical presence. It is important to remember that storage
systems will ultimately persist data on some form of physical storage layer which is generally non-volatile. Modern
physical storage such as SSDs often support security functions such as self encryption, as per the OPAL standards, and
rapid/secure erasure functions. Secure erasure is important when devices that contain data need to leave a secure
physical location (e.g. to be returned to a vendor after developing a fault).

## Projects
- [Rook](https://github.com/rook/rook)
- [Container Storage Interface](https://github.com/container-storage-interface)
- [Ceph](https://github.com/ceph/ceph)
- [ChubaoFS](https://github.com/chubaofs/chubaofs)
- [Gluster](https://github.com/gluster/glusterfs)
- [LINSTOR](https://github.com/LINBIT/linstor-server)
- [Longhorn](https://github.com/longhorn/longhorn)
- [Minio](https://github.com/minio/minio)
- [MooseFS](https://github.com/moosefs/moosefs)
- [OpenEBS](https://github.com/openebs/openebs)
- [OpenIO](https://github.com/open-io/oio-sds)
- [Manta](https://github.com/joyent/manta)
- [Velero](https://github.com/vmware-tanzu/velero)
- [Swift](https://github.com/openstack/swift)
- [Zenko](https://github.com/scality/zenko)


## Examples
- Configurations of all layers of storage should be secure, endpoints should be protected and infrastructure and services around them should be hardened
- Encryption of data that is persisted on disk should be encrypted to protect against storage theft, this includes both persistent data, as well as paged cache information that needs to be written out to disk.