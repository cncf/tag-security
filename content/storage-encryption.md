---
title: "Storage Encryption"
date: "2020-10-01"
category: "runtime"
---

Storage systems can provide methods to ensure confidentiality of data through data encryption. Data encryption can be
implemented for data in transit or data at rest, and when leveraged at the storage system can ensure that the encryption
function is implemented independently to the application.

Encryption can have an impact on performance as it implies compute overhead, but acceleration options are available on
many systems which can reduce the overhead. When selecting the kind of encryption for data, consider the data path, size,
and frequency of access as well any regulations or additional security protections that may require more secure
algorithms to be used. Additionally, teams should not neglect to consider the use of caches when considering encryption
requirements for their architectures.

Encryption services can be implemented for data in transit (protecting data in the network) and for data at rest
(protecting data on disk). The encryption may be implemented in the storage client or storage server and granularity of
the encryption will vary by system (e.g. per volume, per group or global keys). In many systems, data in transit is
protected with TLS which has the added benefit of providing an authentication layer via certificates. Older protocols
(such as iscsi) may be harder to secure in transit (although more complex solutions such as IPsec or encrypted VPNs
can be used). Data at rest is generally protected using standard symmetric encryption algorithms such as AES,
and may be deployed with specific modes of encryption such as XTS for block devices.

The encryption function will often depend on integration with a [key management](#secrets-encryption) system.

## Projects
- [Rook](https://github.com/rook/rook)
- [Ceph](https://github.com/ceph/ceph)
- [ChubaoFS](https://github.com/chubaofs/chubaofs)
- [Gluster](https://github.com/gluster/glusterfs)
- [Longhorn](https://github.com/longhorn/longhorn)
- [Minio](https://github.com/minio/minio)
- [MooseFS](https://github.com/moosefs/moosefs)
- [OpenEBS](https://github.com/openebs/openebs)
- [OpenIO](https://github.com/open-io/oio-sds)
- [Manta](https://github.com/joyent/manta)
- [Velero](https://github.com/vmware-tanzu/velero)
- [Swift](https://github.com/openstack/swift)
<!---
Encryptonize (https://github.com/cyber-crypt-com/encryptonize-core)
-->

## Examples
- Ensure that storage services force the use of TLS/mTLS
- Enable block storage encryption on the disk level (i.e. through dm-crypt)
- Enable encryption options of storage of filesystems and block storage solutions used, and when available, integrate the use of key management systems to manage keys
