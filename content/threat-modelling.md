---
title: "Threat Modeling"
date: "2020-10-01"
category: "Security Assurance"
---

For organizations adopting cloud native, a primary mechanism for identifying risks, controls and mitigations is to perform threat modeling. While there are many threat modeling techniques they share several core characteristics. All start with building a scoped representation of a system's architecture. This begins with identifying all important processes, data stores, and [security boundaries](https://www.oreilly.com/library/view/cissp-certified-information/9780470276884/9780470276884_security_boundaries.html#:~:text=A%20security%20boundary%20is%20the,a%20LAN%20and%20the%20Internet.). Once boundaries have been established and the relevant elements of the system partitioned within those boundaries, the next step is to model how these elements interact with special attention paid to any interactions that cross security boundaries. 

The below guidance is an enhancement of the four step OWASP threat modeling recommended for cloud native capabilities.

### End-to-end architecture

A clear understanding of the organization's or individual's cloud native architecture should result in data impact guidance and classifications. This helps teams organize data distribution within the architecture as well as the additional protection mechanisms for it later on. cloud native diagrams and documentation should not only include the core components of the overall system design but should also take into consideration the location of the source code, the buckets and other storage mechanisms in use, and any additional aspects of the software development cycle. These are all areas that must be considered when initiating threat modeling for cloud native.

### Threat Identification

When considering threats specific to an organization's cloud native capabilities, it is recommended to leverage a mature, well-used model of threats such as [STRIDE](https://en.wikipedia.org/wiki/STRIDE_(security)) or [OCTAVE](https://www.pluralsight.com/guides/cybersecurity-threat-modeling-with-octave). Common threats organizations may wish to consider for their cloud native architectures includes, but is not limited to:

- Spoofing a cluster admin by stealing the authentication credentials via a social engineering attack
- Tampering of an API server config file or certificate could result in failed API server restart or mutual TLS authentication failures
- Repudiation of actions of an attacker because of disabled or misconfigured API auditing could result in a lack of evidence of a potential attack
- Information disclosure is possible if an attacker compromises a running workload and is able to exfiltrate data to an external entity
- Denial of Service (DoS) resulting from a pod that does not have resource limits applied therefore consumes the entire node level CPU and memory, worker node is then lost
- Elevation of privilege could happen if a pod is running with unrestricted or higher privileged pod security policy or by modifying the security context of a pod or a container

Threat actors to consider for cloud native security are consistent with existing threat modeling practices:

- Malicious insider - An actor with malicious intent and with authorization to perform actions within the modeled system.
- Uninformed insider - An actor that with authorization to perform actions within the modeled system (assume anyone can be duped).
- Malicious outsider - An actor outside of the system. They could be attacking via the internet, via supply chain, via physical perimeter etc.

There are other actors that may interact with the modeled system (e.g Uninformed outsiders) and that can be included for completeness. It's likely that controls for their actions will be a subset of those for the primary actors listed above.

Organizations are recommended to leverage the existing resources available in the cloud native landscape for additional information on threats to cloud native architecture.

The utilization of pipelines and infrastructure as code (IaC) may provide compensating or mitigating controls for some threats or reduce likelihood of their success or occurrence.

As with any cloud native process, it is important to iterate and provide feedback. In the context of threat modeling, this means re-evaluating if the existing measures, mechanisms, and matrices accurately reflect the operational state given the continual changes to the architecture.

## Examples

Tools like [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/) and [Microsoft Threat Modeling Tool](https://docs.microsoft.com/en-gb/azure/security/develop/threat-modeling-tool) are particularly helpful for modeling and exploration of security threats. These types of tools enable users to quickly build data-flow diagrams that show how systems operate at a logical level. They can analyze diagrams and enumerate potential security risks according to rules that have been provided by the tool authors and the broader security community. Both [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/) and [Microsoft Threat Modeling Tool](https://docs.microsoft.com/en-gb/azure/security/develop/threat-modeling-tool) can be used by non-experts to generate useful security insights to help engineers make good security choices and improve their cloud-native solutions and designs.

## Projects

- [OWASP Threat Dragon](https://owasp.org/www-project-threat-dragon/)
- [Microsoft Threat Modeling Tool](https://docs.microsoft.com/en-gb/azure/security/develop/threat-modeling-tool)
- [Threatspec](https://github.com/threatspec/threatspec)

## Other Links

- [The Current State of Kubernetes Threat Modeling](https://www.marcolancini.it/2020/blog-kubernetes-threat-modelling/)
- [Guidance on Kubernetes Threat Modelling](https://www.trendmicro.com/vinfo/us/security/news/virtualization-and-cloud/guidance-on-kubernetes-threat-modeling)
- [Kubernetes Threat Model by Trail of Bits (June 2019)](https://github.com/kubernetes/community/blob/master/sig-security/security-audit-2019/findings/Kubernetes%20Threat%20Model.pdf)
- [Risk8s Business: Risk Analysis of Kubernetes Cluster](https://tldrsec.com/guides/kubernetes/)
- [Securing the 4 Cs of Cloud-Native Systems: Cloud, Cluster, Container, and Code](https://www.trendmicro.com/vinfo/us/security/news/virtualization-and-cloud/securing-the-4-cs-of-cloud-native-systems-cloud-cluster-container-and-code)
- [K8s Threat Model](https://cloudsecdocs.com/container_security/theory/threats/k8s_threat_model/)
