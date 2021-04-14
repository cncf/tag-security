---
title: "Microservices and Eliminating Implicit Trust"
date: "2020-10-01"
category: "runtime"
---


## Projects



<!---
## Commercial Projects
- [Prisma Cloud](https://www.paloaltonetworks.com/prisma/cloud)
- [Divvy Cloud by Rapid7](www.alcide.io)
- [Trend Micro Container Security](https://www.trendmicro.com/en_us/business/products/hybrid-cloud/cloud-one-container-image-security.html)
- [Aqua Security](https://www.aquasec.com/products/container-security)

## Misc Projects
-->

## Examples

- Eliminating implicit trust involves using application identity to specify explicit allow lists 
- For example, in the cloud native model, applications are no longer identified by IP addresses. On the contrary this involves using application labels, attributes and other metadata to represent its identity. This identity is then used to specify which applications are able to communicate with each other using policy which is then enforced in the network layer 
