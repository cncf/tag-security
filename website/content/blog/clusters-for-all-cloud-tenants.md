---
title:  "Clusters for all cloud tenants"
date:   2022-06-02 13:04:00 +0200
author: Josh Gavant 
---

A decision which faces many large organizations as they adopt cloud architecture is how to provide isolated spaces within the same environments and clusters for various teams and purposes. For example, marketing and sales applications may need to be isolated from an organization's customer-facing applications; and development teams building any app usually require extra spaces for tests and verification.

## Namespace as unit of tenancy

To address this need, many organizations have started to use namespaces as units of isolation and tenancy, a pattern previously described by [Google](https://cloud.google.com/kubernetes-engine/docs/concepts/multitenancy-overview) and [Kubernetes contributors](https://kubernetes.io/blog/2021/04/15/three-tenancy-models-for-kubernetes/). But namespace-scoped isolation is often insufficient because some concerns are managed at cluster scope. In particular, installing new resource types (CRDs) is a cluster-scoped activity; and today independent teams often want to install custom resource types and operators. Also, more developers are themselves writing software operators and custom resource types and find themselves requiring cluster-scoped access for research and tests.

## Cluster as unit of tenancy

For these reasons and others, tenants often require their own isolated clusters with unconstrained access rights. In an isolated cluster, a tenant gets its own Kubernetes API server and persistence store and fully manages all namespaces and custom resource types in its cluster.

But deploying physical or even virtual machines for many clusters is inefficient and difficult to manage, so organizations have struggled to provide clusters to tenant teams. Happily :smile:, to meet these organizations' and users' needs, leading Kubernetes vendors have been researching and developing lighter weight mechanisms to provide isolated clusters for an organization's tenants. In this post we'll compare and contrast several of these emergent efforts.

Do you have other projects and ideas to enhance multitenancy for cloud architecture? Then please join CNCF's App Delivery advisory group in discussing these [here](https://github.com/cncf/tag-app-delivery/issues/193); thank you!

### vcluster

[vcluster](https://www.vcluster.com/) is [a prominent project](https://www.google.com/search?q=vcluster&tbm=nws) and CLI tool maintained by [loft.sh](https://loft.sh/) that provisions a virtual cluster as a StatefulSet within a tenant namespace. Access rights from the hosting namespace are propogated to the hosted virtual cluster such that the namespace tenant becomes the cluster's only tenant. As cluster admins, tenant members can create cluster-scoped resources like CRDs and ClusterRoles.

The virtual cluster runs its own Kubernetes API service and persistence store independent of those of the hosting cluster. It can be published by the hosting cluster as a LoadBalancer-type service and accessed directly with kubectl and other Kubernetes API-compliant tools. This enables users of the tenant cluster to work with it directly with little or no knowledge of its host.

In vcluster and the following solutions, the virtual cluster is a "metadata-only" cluster, in that resources in it are persisted to a backing store like etcd, but no schedulers act to reify the persisted resources - ultimately as pods. Instead, a "syncer" synchronization service copies and transforms reifiable resources - podspecs - from the virtual cluster to the hosting namespace of the hosting cluster. Schedulers in the hosting cluster then detect and reify these resources in the same underlying tenant namespace where the virtual cluster's control plane runs.

An advantage of vcluster's approach of scheduling pods in the hosting namespace is that the hosting cluster ultimately handles all workloads and applies namespace quotas - all work happens within the namespace allocated to the tenant by the hosting cluster administrator. A disadvantage is that schedulers cannot be configured in the virtual cluster since pods aren't actually run there.

- [vcluster on GitHub](https://github.com/loft-sh/vcluster)

### Cluster API Provider Nested (CAPN)

In vcluster, bespoke support for control plane implementations is required; as of this writing, vcluster supports k3s, k0s and vanilla k8s distributions.

To support _any_ control plane implementation, the [Cluster API Provider Nested](https://github.com/kubernetes-sigs/cluster-api-provider-nested) project implements an architecture similar to that of vcluster, including a metadata-only cluster and a syncer, but provisions the control plane using a Cluster API provider rather than a bespoke distribution.

CAPN promises to enable control planes implementable via Cluster API to serve virtual clusters.

### HyperShift

Similar to the previous two, [Red Hat](https://www.redhat.com/)'s [HyperShift](https://github.com/openshift/hypershift) project provisions an OpenShift (Red Hat's Kubernetes distro) control plane as a collection of pods in a host namespace. But rather than running workloads within the hosting cluster and namespace like vcluster, HyperShift control planes are connected to a pool of dedicated worker nodes where pods are synced and scheduled.

HyperShift's model may be most appropriate for a hosting provider like Red Hat which desires to abstract control plane management from their customers and allow them to just manage worker nodes.

### kcp

Finally, [kcp](https://github.com/kcp-dev/kcp) is another proposal and project from [Red Hat](https://www.redhat.com/) inspired by and reimagined from all of the previous ideas. Whereas the above virtual clusters run _within_ a host cluster and turn to the host cluster to run pods, manage networks and provision volumes, kcp reverses this paradigm and makes the _hosting_ cluster a metadata-only cluster. _Child_ clusters - _workspaces_ in the kcp project - are registered with the hub metadata-only cluster and work is delegated to these children based on labels on resources in the hub.

As opposed to hosted virtual clusters, child clusters in kcp _could_ manage their own schedulers. Another advantage of kcp's paradigm inversion is centralized awareness and management of child clusters. In particular, this enables simpler centralized policies and standards for custom resource types to be propogated to all children.

## Conclusion

vcluster, CAPN, HyperShift, and kcp are emerging projects and ideas to meet cloud users' needs for multitenancy with _clusters_ as the unit of tenancy. Early adopters are already providing feedback on good and better parts of these approaches and new ideas emerge daily.

Want to help drive new ideas for cloud multitenancy? Want to help cloud users understand and give feedback on emerging paradigms in this domain? Then join [the discussion](https://github.com/cncf/tag-app-delivery/issues/193) in CNCF's TAG App Delivery. Thank you!