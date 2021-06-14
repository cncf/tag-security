---
title: "Incident Response"
date: "2020-10-01"
category: "develop"
---

For an organization with existing incident response and triaging workflow, special attention should be paid to how that can be applied to cloud native workloads which may not always conform with some underlying assumptions about node isolation (new pod instances could run on a different server), networking (e.g. IP addresses are assigned dynamically) and immutability (e.g. runtime changes to container are not persisted across restarts). Hence, it's important to revisit these assumptions and reapply or update the incident response playbook as needed. Observability and forensic tools need to understand cloud native specific constructs such as pods and containers so that the state of a compromised system can be maintained or recreated. Evidence mishandling can sometimes be unintentional in intent-based orchestrators, which are built to treat workloads as "cattle, not pets". As a side note, building an incident response and triaging strategy from the ground up, although possible, is out of scope for this document.

## Projects
- [Wazuh](https://wazuh.com/)
- [GRR Rapid Response](https://github.com/google/grr)
- [Osquery](https://osquery.io/)
- [MISP](https://www.misp-project.org/)
- [TheHive](https://thehive-project.org/)
- [Zeek](https://www.zeek.org/)
- [CloudQuery](https://github.com/cloudquery/cloudquery)

<!---
Commercial Projects (optional)
Carbon Black
JupiterOne (http://jupiterone.com/)
Sysdig Secure 3.0 https://sysdig.com/blog/sysdig-secure-3-0/
Rapid7 (InsightIDR, DivvyCloud kAudit)
Trend Micro Workload Security (https://www.trendmicro.com/en_ca/business/products/hybrid-cloud/cloud-one-workload-security.html)
-->


## Globe Traveller / World Traveller / Jump Ahead / Further Exploration / Next Stop (TBD)

- [Container Application Manifest](./container-application-manifest)