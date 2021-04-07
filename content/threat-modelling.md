---
title: "Threat Modeling"
date: "2020-10-01"
category: "develop"
---

For organizations adopting cloud native, the primary mechanism of identifying risk and resulting controls and mitigations is to perform threat modeling of applications, data flows, and supporting processes and infrastructure. The method by which this is accomplished is minimally different from typical threat modeling. The below guidance is an enhancement of the four step OWASP threat modeling recommended for cloud native capabilities.

### End-to-end architecture
A clear understanding of the organization's or individual's cloud native architecture should result in data impact guidance and classifications. This helps teams organize data distribution within the architecture as well as the additional protection mechanisms for it later on. cloud native diagrams and documentation should not only include the core components of the overall system design but should also take into consideration the location of the source code, the buckets and other storage mechanisms in use, and any additional aspects of the software development cycle. These are all areas that must be considered when initiating threat modeling for cloud native.

### Threat Identification
When considering threats specific to an organization's cloud native capabilities, it is recommended to leverage a mature, well-used model of threats such as STRIDE or OCTAVE. Common threats organizations may wish to consider for their cloud native architectures includes, but is not limited to:

Spoofing a cluster admin by stealing the authentication credentials via a social engineering attack
Tampering of an API server config file or certificate could result in failed API server restart or mutual TLS authentication failures
Repudiation of actions of an attacker because of disabled or misconfigured API auditing could result in a lack of evidence of a potential attack

- Information disclosure is possible if an attacker compromises a running workload and is able to exfiltrate data to an external entity
- Denial of Service (DoS) resulting from a pod that does not have resource limits applied therefore consumes the entire node level CPU and memory, worker node is then lost
- Elevation of privilege could happen if a pod is running with unrestricted or higher privileged pod security policy or by modifying the security context of a pod or a container

Threat actors to consider for cloud native security are consistent with existing threat modeling:

- Malicious insider
- Uninformed insider
- Malicious outsider
- Uninformed outsider

Organizations are recommended to leverage the existing resources available in the cloud native landscape for additional information on threats to cloud native architecture.

The utilization of pipelines and infrastructure as code (IaC) may provide compensating or mitigating controls for some threats or reduce likelihood of their success or occurrence.

As with any cloud native process, it is important to iterate and provide feedback. In the context of threat modeling, this means re-evaluating if the existing measures, mechanisms, and matrices accurately reflect the operational state given the continual changes to the architecture.

## Projects
- TODO

## Examples
- TODO

## Links (optional)
- TODO
