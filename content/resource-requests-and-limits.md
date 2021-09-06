---
title: "Resource Requests and Limits"
date: "2020-10-01"
category: "runtime"
---

Applying different object level and resource requests and limits via cgroups helps prevent exhaustion of node
and cluster level resources by one misbehaving workload due to an intentional (e.g., fork bomb attack or
cryptocurrency mining) or unintentional (e.g., reading a large file in memory without input validation, horizontal
autoscaling to exhaust compute resources) issue.

## Projects
- [Conftest](https://www.conftest.dev/)
- [OPA](https://www.openpolicyagent.org/)
- [Terrascan](https://github.com/accurics/terrascan)
- [Checkov](https://www.checkov.io/)
- [KubeSec]( https://kubesec.io/ )
- [Kics](https://github.com/Checkmarx/kics)
- [Kyverno](https://github.com/kyverno/kyverno)
- [Falco](https://github.com/falcosecurity/falco)

## Examples
- Security policies can be enforced at admission time by leveraging admission controllers. An example of such a policy
would be ensuring all containers specify cpu and memory limits and requests.

- Containers should also be monitored during runtime to ensure the cpu and memory limits and requests are properly
  configured and respected.
