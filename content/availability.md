---
title: "Availability (Denial of Service (DoS) & Distributed Denial of Service (DDoS))"
date: "2020-10-01"
category: "develop"
---

Denial of Service (DoS) & Distributed Denial of Service (DDoS)
A denial-of-service attack (DoS attack) in the context of cloud native applications is a class of cyber-attacks. The perpetrator seeks to temporarily or indefinitely make the cloud native application unavailable to its intended users (human or automated). The perpetrator may do this via disrupting critical cloud native application components (such as microservices), disrupting the orchestration layer responsible for keeping the microservices running, or disrupting health monitoring systems responsible for scaling the application. A denial of service is typically accomplished by flooding critical microservices or resources with superfluous requests to overload systems and prevent some or all legitimate requests from being fulfilled.

A distributed denial-of-service attack (DDoS attack) typically involves a high volume of incoming traffic flooding the cloud native application services or the upstream networks to which they depend. Typically the attack is mounted from many different sources. Volumetric attacks are mitigated by detecting and deflecting the attacks before they reach the cloud native application.

## Projects
- [Curiefense](https://github.com/curiefense/curiefense)
- [Crowdsec](https://github.com/crowdsecurity/crowdsec)
