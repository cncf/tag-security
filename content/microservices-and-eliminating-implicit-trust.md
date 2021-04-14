---
title: "Microservices and Eliminating Implicit Trust"
date: "2020-10-01"
category: "Runtime environment"
---

The perimeter for containerized applications deployed as microservices is the microservice itself. Therefore, it is necessary to define policies that restrict communication only between sanctioned microservice pairs. The inclusion of zero trust in the microservice architecture reduces the blast radius by preventing lateral movement should a microservice be compromised. Operators should ensure that they are using capabilities such as network policies to ensure that east-west network communication within the container deployment is limited to only that which is authorized for access. There is some initial work done to provide strategies for microservices security through NIST SP 800-204 and may serve as a guide for implementing secure microservice architectures.

## Projects

- TODO

<!---
## Commercial Projects
- [Prisma Cloud](https://www.paloaltonetworks.com/prisma/cloud)
- [DivvyCloud By Rapid7] (https://divvycloud.com/)
- [Trend Micro Container Security](https://www.trendmicro.com/en_us/business/products/hybrid-cloud/cloud-one-container-image-security.html)
- [Aqua Security](https://www.aquasec.com/products/container-security)
-->

## Examples

- Eliminating implicit trust involves using application identity to specify explicit allow lists. 
- For example, in the cloud native model, applications are no longer identified by IP addresses. On the contrary this involves using application labels, attributes and other metadata to represent its identity. This identity is then used to specify which applications are able to communicate with each other using policy which is then enforced in the network layer. 


