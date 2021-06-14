---
title: "Audit Log Analysis"
date: "2020-10-01"
category: "runtime"
---

Audit Log analysis is one of the most established methods to identify and correlate system compromise, abuse, or misconfiguration. Continued automation of audit log analysis and correlation is of paramount importance to security teams as cloud native architectures are capable of generating more granular audit configuration and filtering than traditional legacy systems for workloads. Additionally, the interoperability of cloud native logs allows for advanced filtering to prevent overloads in downstream processing. What is critical here, as with traditional log analysis, is the generation of actionable audit events that correlate/contextualize data from logs into "information" that can drive decision trees/incident response.

Non-compliant violations are detected based on a pre-configured set of rules that filter violations of the organization's policies.

To have the ability to audit actions of entities using the cluster, it is vital to enable API auditing with a filter for a specific set of API Groups or verbs, either of interest to a security team, cluster administrators, or other teams by field of study. Immediate forwarding of logs to a location inaccessible via cluster-level credentials also defeats an attacker's attempt to cover their tracks by disabling logs or deleting their activity logs. The systems processing alerts should be periodically tuned for false positives to avoid alert flooding, fatigue, and false negatives after security incidents that were not detected by the system.

## Projects
- [ELK helm chart](https://github.com/elastic/helm-charts)
- [SOAR](https://n8n.io/)
- [Falco](https://github.com/falcosecurity/falco)
- [Cortex](https://github.com/TheHive-Project/Cortex)
- [Fluentd](https://www.fluentd.org/) 
<!---
## Commercial Projects
- [Tines](https://www.tines.io/)
- [Sumo Logic](https://www.sumologic.com/) 
- [IBM QRadar](https://www.ibm.com/products/qradar-siem) 
- [Splunk](https://www.splunk.com/)
- [Datadog](https://www.datadoghq.com/) 
- [ArcSight](https://www.microfocus.com/en-us/cyberres/secops)
- [kAudit - Kubernetes Audit log analysis - Rapid7](https://github.com/alcideio/kaudit) 
- [Panther](https://runpanther.io/)
- [Alerting capabilities on top of free ES tier](https://github.com/Yelp/elastalert)

-->
## Examples
- Common examples for Audit Log analysis might be root logins/sudo, ssh failures, data access patterns, exfiltration attempts/successes, kubernetes RBAC reviews, cloud IAM reviews, forensic analysis for after-action reports

## Links
- [Ship Kubernetes logs using a Fluentd DaemonSet](https://docs.logz.io/shipping/log-sources/kubernetes.html)

## Globe Traveller / World Traveller / Jump Ahead / Further Exploration / Next Stop (TBD)

- [Incident Response](./incident-response)