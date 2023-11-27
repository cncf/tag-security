# Open Telemetry Security Self Assessment

## Table of contents

* [Metadata](#metadata)
  * [Security links](#security-links)
* [Overview](#overview)
  * [Actors](#actors)
  * [Actions](#actions)
  * [Background](#background)
  * [Goals](#goals)
  * [Non-goals](#non-goals)
* [Self-assessment use](#self-assessment-use)
* [Security functions and features](#security-functions-and-features)
* [Project compliance](#project-compliance)
* [Secure development practices](#secure-development-practices)
* [Security issue resolution](#security-issue-resolution)
* [Appendix](#appendix)

## Metadata

<table>
  <tr>
   <td>Software
   </td>
   <td><a href="https://github.com/open-telemetry/opentelemetry.io/tree/main">https://github.com/open-telemetry/opentelemetry.io/tree/main</a>
   </td>
  </tr>
  <tr>
   <td>Website
   </td>
   <td><a href="https://opentelemetry.io">https://opentelemetry.io</a>
   </td>
  </tr>
  <tr>
   <td>Security Provider
   </td>
   <td>No
   </td>
  </tr>
  <tr>
   <td>Languages
   </td>
   <td>C++, .NET, Erlang / Elixir, Go, Java, JavaScript / TypeScript, PHP, Python, Ruby, Rust, Swift, Any Language
   </td>
  </tr>
  <tr>
   <td>SBOM
   </td>
   <td><a href="https://github.com/open-telemetry/opentelemetry.io/blob/main/package.json">https://github.com/open-telemetry/opentelemetry.io/blob/main/package.json</a>
   </td>
  </tr>
</table>



### Security Links


<table>
  <tr>
   <td><strong>Doc</strong>
   </td>
   <td><strong>URL</strong>
   </td>
   <td>
   </td>
  </tr>
  <tr>
   <td>Security file
   </td>
   <td><a href="https://github.com/open-telemetry/opentelemetry.io/security/policy">https://github.com/open-telemetry/opentelemetry.io/security/policy</a>
   </td>
   <td><a href="https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/security-best-practices.md">https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/security-best-practices.md</a>
   </td>
</table>


## Overview

OpenTelemetry is an observability framework and toolkit that helps developers understand application behavior by instrumenting, generating, and exporting telemetry data for applications using OpenTelemetry. This includes open-source backends such as Jaeger and Prometheus, in addition to commercial offerings.


### Background

OpenTelemetry is an Observability framework and toolkit designed to create and manage telemetry data such as traces, metrics, and logs. Opentelemetry provides a standard protocol for dealing with telemetry data, language SDKs, a collector that receives, processes, and exports telemetry data, as well as other documentation and tools for telemetry.

The OpenTelemetry Collector offers a vendor-agnostic implementation on how to receive, process and export telemetry data. In addition, it removes the need to run, operate and maintain multiple agents/collectors in order to support open-source telemetry data formats (e.g. Jaeger, Prometheus, etc.) to multiple open-source or commercial back-ends. The Collector receives telemetry using the OTL Protocol from external services, it then processes the data and exports it to further Observability frontends/APIs such as Jaeger and Prometheus.

OpenTelemetry does two important things:

1. Allows you to own the data that you generate rather than be stuck with a proprietary data format or tool.

2. Allows you to learn a single set of APIs and conventions

### Actors

**OpenTelemetry SDK / OTLP**

OpenTelemetry provides various SDKs for C++, .NET, Erlang / Elixir, Go, Java, JavaScript / TypeScript, PHP, Python, Ruby, Rust, Swift. These SDKs provide instrumentation for a system, and export raw traces, metrics, and logs.

This instrumentation can be automatic, in which case, they export relevant telemetry to the OpenTelemetry Collector with minimal configuration from the user. Alternatively, they can be manual. In this case, the user manually configures the system using the SDK and OpenTelemetry API to provide the relevant data to the Collector.

Furthermore, a third party application that produces data in the OTLP format may be used to send telemetry to the collector.

As these components are the primary source of incoming data, they also serve as the primary attack surface. A hypothetical attacker may be able to deliver a malicious payload by simply performing an action that is logged. They can use this to either attack the SDK and try and gain control of the system directly, or to attack components further down the pipeline, such as the Collector.

**OpenTelemetry Collector**

The OpenTelemetry Collector is a vendor-agnostic implementation of how to receive, process and export telemetry data. It consists of multiple components: Receivers, Processors, Exporters, and Extensions. It serves as middleware between the raw telemetry feeds and telemetry frontends. It receives data via the Receiver using the OpenTelemetry Protocol. The collector then processes the data, handling jobs such as retries, batching, and encryption. It then exports the data to an Observability frontend, like Jaeger or Prometheus for analysis.

While the components (Receiver, Processor, Exporter) are ostensibly separate parts of the Collector and can be enabled/disabled independently, they are all controlled by a central configuration in the Collector. In the context of the Collector, this configuration only exists in the memory. However, different deployments, such as Docker and Kubernetes have their own way of handling and storing the configuration.

The Receiver is responsible for accepting telemetry data, and as such, should use encryption communicating with telemetry providers. A compromised Receiver would allow the attacker to obtain unsanitized telemetry data with sensitive information.The Processor may also be misconfigured to prevent telemetry from reaching downstream services/components.

The Processor component of the Collector is reponsible for the sanitization of incoming telemetry data. It ensures that any downstream components will not receive data that is confidential or malicious. Care must be taken so that the Processor itself is not susceptible to malicious payloads inside telemetry data and that the raw data is not leaked to attackers. The Processor may also be used to modify telemetry data, or prevent telemetry from reaching downstream services/components.

The Exporter is responsible for delivering the processed telemetry data to telemetry frontends for visualization and storage. It should use encryption to safeguard the data as well. A compromised Exporter can be used to leak sensitive information if the data was not properly sanitized, or provide a means to attack any systems downstream of the Collector. It may also be misconfgured to prevent any exports of telemetry to downstream services.

**Downstream Services**

OpenTelemetry can export data to Prometheus, Jaeger, or in the OTLP format. While these actors do not influence the rest of the OpenTelemetry ecosystem directly, they are the recipients of data provided by the Collector, or in the case of Collectorless setups, the telemetry sources. If the telemetry data passing through the Collector is not sanitized properly, these services are now vulnerable.

Compromising these services would allow an attacker to leak sensitive information, modify telemetry data, or delete all of the telemetry data collected.

### Actions

**Telemetry Data Collection**

These agents collect telemetry data (metrics, logs, traces) from the application. Data is often collected in a non-intrusive and secure manner, ensuring that sensitive information is not exposed. The agents must authenticate themselves to the backend systems where the data is sent.

**Data Transmission**

The application sends the collected telemetry data to a backend system (like a telemetry collector or directly to an analysis tool). The transmission often involves secure protocols like HTTPS/TLS. The backend system may require authentication and authorization to accept data, ensuring that only legitimate data is received.

**Data Processing and Aggregation**

The backend processes and aggregates the data. This may involve transforming the data into a suitable format for analysis. During processing, the backend validates the integrity and format of the data. It may also implement role-based access controls to ensure that only authorized personnel or systems can access or modify the data.

**Data Export and Integration**

Once processed, the data is exported to various monitoring and analysis tools (like Prometheus, Jaeger, etc.). The export process includes secure API calls or data transmission methods. The receiving systems often authenticate the incoming data to ensure its validity.

**Analysis and Visualization**

The data is analyzed, and insights are presented through dashboards or alerts. Access to these insights is typically controlled through user authentication and authorization, ensuring that only authorized users can view or manipulate sensitive telemetry data.

**Alerting and Incident Response**

In case of anomalies or incidents detected through telemetry data, alerts are generated. The alerting mechanism is secured to prevent false alerts and ensure that alerts reach the correct recipients. Incident response protocols are in place to handle any security incidents reported through these alerts.

### Goals

**General**



* Autotelemetry: Automatically collect rich telemetry data without requiring any manual instrumentation/configuration from the user.
* In-cluster edge compute: Collect, store, and query telemetry data locally in the cluster.
* Low overhead: Use less than 5% of cluster CPU.
* Scriptability: Querying data in Pixie should be flexible and easy to accommodate for different use cases and visualizations.

**Security**



* At query-time, Pixie data should be protected and robust against traffic snooping.
* Only authenticated users or users with an API key should be able to make API requests/execute scripts on the org/user’s behalf.
* If the control plane has been compromised, protect against using the auto-update mechanism to deploy malicious containers.


### Non-Goals

**General**



* Long-term retention: Pixie is built for real-time debugging. As Pixie collects and stores rich, fine-grained data in-memory, Pixie should typically not be used to store data for > 24 hours. Users should instead use the Pixie Plugin system to send data to another datastore using OpenTelemetry.

**Security**



* Stop a third-party with an API key or OpenTelemetry plugin from storing a large amount of data, possibly incurring financial cost or overwhelming the servers.
* Stop a third-party with an API key or OpenTelemetry plugin from querying sensitive data collected by Pixie.
* Prevent a malicious actor with a deploy key from deploying to the associated org.


## Self-Assessment Use

This self-assessment is created by the Pixie team to perform an internal analysis of the project's security. It is not intended to provide a security audit of Pixie, or function as an independent assessment or attestation of Pixie's security health.

This document serves to provide Pixie users with an initial understanding of Pixie's security, where to find existing security documentation, Pixie plans for security, and general overview of Pixie security practices, both for development of Pixie as well as security of Pixie.

This document provides the CNCF TAG-Security with an initial understanding of Pixie to assist in a joint-review, necessary for projects under incubation. Taken together, this document and the joint-review serve as a cornerstone for if and when Pixie seeks graduation and is preparing for a security audit.


## Security Functions and Features

See [Actors](#actors) and [Actions](#actions) for more detailed description of the critical actors, actions, and potential threats.


### Critical

**Telemetry Data Encryption**

Encryption of telemetry data in OpenTelemetry is critical for protecting data confidentiality and integrity during transmission. It serves as the first line of defense against data breaches, making it a fundamental aspect in threat modeling for assessing risks related to eavesdropping and data tampering.

**Authentication and Authorization Mechanisms**

These mechanisms in OpenTelemetry ensure that only authenticated and authorized entities can interact with the system, playing a crucial role in safeguarding against unauthorized access and manipulation. In threat modeling, they are key to evaluating the potential risks of system penetration and data breaches.

**API Security**

OpenTelemetry's API security involves securing data transmission endpoints against common vulnerabilities. This is vital for preventing malicious attacks through these interfaces, making API security a critical element in threat modeling for external interaction risks.

**Data Integrity Checks**

Ensuring the integrity of telemetry data in OpenTelemetry is essential for reliable system monitoring and decision-making. Data integrity checks are crucial in threat modeling to identify potential manipulation threats and maintain the trustworthiness of operational data.

**Context Propagation Security**

 In OpenTelemetry, secure context propagation is critical for maintaining trace integrity across services. It's a key defense against trace manipulation, playing an important role in threat modeling, especially in distributed tracing scenarios.


### Security Relevant

**Configurable Data Scrubbing**

OpenTelemetry's data scrubbing feature allows for the removal or anonymization of sensitive information, crucial for privacy compliance and reducing exposure risks. It's a significant factor in threat modeling, particularly in handling sensitive information.

**Role-Based Access Control (RBAC) for Dashboards and Tools**

RBAC in OpenTelemetry controls user access to data and functionalities, preventing unauthorized actions and enhancing system security. It's a critical consideration in threat modeling for assessing risks related to unauthorized access and privilege escalation.

**Logging and Auditing**

This feature in OpenTelemetry tracks system activities and is vital for security audits and post-incident analysis. It plays a significant role in threat modeling for identifying unauthorized activities and breaches, enhancing incident detection and response strategies.

**Rate Limiting and Throttling**

Implementing rate limiting and throttling in OpenTelemetry is key for protecting against denial-of-service attacks and ensuring service availability. These mechanisms are considered in threat modeling for evaluating risks related to service resilience.

**Regular Security Updates and Patch Management**

Regularly updating and patching OpenTelemetry components is essential for maintaining system security and protecting against known vulnerabilities. This practice is a crucial aspect of threat modeling, focusing on the system's defenses against known exploits.

## Project Compliance

Not applicable.


## Secure Development Practices

The Pixie project follows established CNCF and OSS best practices for code development and delivery. Pixie [passes OpenSSF Best Practices](https://bestpractices.coreinfrastructure.org/en/projects/5027) and has an[ OpenSSF scorecard of ](https://api.securityscorecards.dev/projects/github.com/pixie-io/pixie)9.7.


### Development Pipeline

All code is maintained on [Github](https://github.com/pixie-io/pixie). Changes must be reviewed and merged by the project maintainers. Before changes are merged, all the changes must pass static checks, license checks, verifications on gofmt, go lint, go vet, and pass all unit tests and e2e tests. Changes are scanned by snyk and Trivy nightly. Code changes are submitted via Pull Requests (PRs) and must be signed and verified. Commits to the main branch directly are not allowed.


### Communication Channels


#### Internal

Team members communicate with each other through the [Pixie Community Slack](https://slackin.px.dev/) and discuss in Github [issues](https://github.com/pixie-io/pixie/issues) or [pull requests](https://github.com/pixie-io/pixie/pulls).


#### Inbound

Users communicate with the team through the [Pixie Community Slack](https://slackin.px.dev/) or through [Github issues](https://github.com/pixie-io/pixie/issues).


#### Outbound

Team members communicate with users through the [Pixie Community Slack](https://slackin.px.dev/) and discuss in Github [issues](https://github.com/pixie-io/pixie/issues) or [pull requests](https://github.com/pixie-io/pixie/pulls).


#### Security Email Group

To report a security problem in Pixie, users should contact the Maintainers Team at [cncf-pixie-maintainers@lists.cncf.io](mailto:cncf-pixie-maintainers@lists.cncf.io). The security email group is also listed in the security document in our repository: [https://github.com/pixie-io/pixie/blob/main/SECURITY.md](https://github.com/pixie-io/pixie/blob/main/SECURITY.md).


### Ecosystem

Pixie is a real-time debugging platform for Kubernetes. Although Pixie does have some [system requirements](https://docs.px.dev/installing-pixie/requirements/), the Pixie team is actively working towards increasing support across different machine architectures, languages, and libraries.

Pixie’s plugin system utilizes open standards so developers can effortlessly integrate Pixie with other cloud-native projects. The plugin system allows users to export their Pixie data to any other tool which accepts OTLP data. This enables users to send data to Jaeger, Prometheus, and more. When exporting this data to other tools, users typically aggregate this data in the PxL script to collate high-level information or patterns about their cluster/application state. Users also have the ability to configure the scripts to decide what data should be exported and is actually important to them. This heavily reduces the flood of data that Pixie can send to other tools. We can additionally update Pixie to enforce export limits. For example: stop running an export if we’ve exported more than X bytes in a particular time period.

In general, observability data is high volume regardless of whether that data be metrics, traces, or logs. As a result, the tools in the observability ecosystem are typically well-designed to handle large data volumes and scale well to handle clusters and applications of large size, traffic, and load. OpenTelemetry collectors also have ways of efficiently processing and pipelining this data, such as batching.

Observability tools can be at risk of importing forged data. Sending a tool forged data can lead to false alerts, thereby paging an on-call engineer for a non-incident. Alternatively, forged data can also help mask incidents. For example, take the scenario where a user is monitoring the average request latency of a service. If that latency were to increase, but a flood of forged data for low-latency requests is imported, the actual latency increase would be missed. For end users of any data-capturing tool, work needs to be done to address cases where data is missing or incorrect. Care must be taken to validate the data being collected from any given tool, cross check the data and then use it to inform downstream decisions.


## Security Issue Resolution


### Responsible Disclosure Process

Pixie project vulnerability handling related processes are recorded in the [Pixie Security Doc](https://github.com/pixie-io/pixie/blob/main/SECURITY.md). Related security vulnerabilities can be reported and communicated via email to [cncf-pixie-maintainers@lists.cncf.io](mailto:cncf-pixie-maintainers@lists.cncf.io).

The Pixie maintainers are responsible for responding within 3 working days. It is the maintainers’ duties to triage the severity of the issue and determine how to address the issue.


### Incident Response

See [Pixie Security Doc](https://github.com/pixie-io/pixie/blob/main/SECURITY.md) for a description for how incidents should be communicated, triaged, confirmed, and notified. Pixie maintainers are responsible for tracking any vulnerabilities filed to the Pixie maintainers mailing list. That forum allows us to communicate privately with the reporter.

The Pixie maintainer on-call for that week is responsible for triaging issues and escalating to the other maintainers. If the issue is a high-profile security incident which may have widespread impact on Pixie users, this will be done via a private channel in the Pixie Slack. Incidents that are lower profile/impact will have a public channel. This channel is used for collaboration on remediations and embargos. Any tie-breakers are settled by Pixie’s BDFL.

Once the fix is confirmed, the security group will patch the vulnerability in the next patch or minor release, and backport a patch release into the latest minor releases, in which the fix details will be included.

The release of low to medium severity bug fixes will include the fix details in the patch release notes. Any public announcements sent for these fixes will be linked to the release notes.


## Appendix


### Known Issues Over Time

All Pixie security related issues (both fixes and enhancements) are labeled with "kind/security" and can be queried using[ https://github.com/pixie-io/pixie/labels/kind/security](https://github.com/pixie-io/pixie/labels/kind/security).

The code review process requires maintainers to consider security while reviewing designs and pull requests.


### CII Best Practices

Pixie has achieved an Open Source Security Foundation (OpenSSF) best practices badge at passing level, see more details at [Pixie’s openssf best practices](https://bestpractices.coreinfrastructure.org/en/projects/5027).


### Case Studies

We’ve seen Pixie adopters leverage Pixie in two main ways:



* Monitor applications workloads in their Kubernetes cluster. For example, [Verizon](https://newrelic.com/customers/verizon?utm_campaign=PostBeyond&utm_source=Twitter&utm_medium=%23362600&utm_term=Verizon) uses Pixie to observe their network traffic on the 5G Edge. The Pixie data is then used to compute optimal network paths in multi-access edge computing devices.

    It is important to note that while users use Pixie to monitor their clusters and applications, it is also possible for a Vizier to fail. For example, a Vizier pod is temporarily evicted. We continually perform healthchecks to track a Vizier’s status. This information is surfaced up to the control plane so that it is accessible via the UI/API/CLI. We can inform users of a Vizier’s state such as whether the Vizier:

    * Is successfully connected to the control plane
    * Has critical pods in an error state/crashloopbackoff/pending
    * Can run a basic script, validating that the script execution pipeline is functioning

    We allow users to run scripts as long as the Vizier’s script execution capability is functional. However, when we detect that the Vizier is in a degraded state (for example, some data collector pods are crashing), we notify the user that the results may be incomplete. We try not to prevent data access, but also want to give enough context so users can make informed decisions.

* Since Pixie makes it easy to collect and query rich telemetry data from a user’s cluster, some users leverage Pixie as a data source. Pixie data is exported to other tools/applications either through the Pixie Plugin system or Pixie’s API. These tools then perform the additional filtering/processing necessary to make sense of the data for their specific use-case. For example, VMware is building a tool called [Project Trinidad](https://octo.vmware.com/project-trinidad-and-pixie-partnership/). Project Trinidad uses machine learning models to learn normal traffic patterns in a user’s cluster, allowing them to detect and quarantine anomalous behavior. Pixie’s network data serves as the tool’s “data sensor”. In another use-case,  [Choreo](https://wso2.com/choreo/blog/introducing-observability-for-polyglot-applications/) is a tool which helps users design, implement, and deploy applications all inside their platform. Choreo leverages and adapts Pixie data to provide the observability and monitoring insights for these applications inside their platform.

    In these cases, Pixie serves as a data collector and may be augmented with other data sources or further processing to mitigate issues such as data forgery.



### Related Projects/Vendors

Pixie is a real-time debugging platform for Kubernetes. It provides out-of-the-box data collection for metrics/spans/logs and programmatic manipulation of that data for analysis and visualization. As a result, Pixie spans the entire observability landscape (monitoring, logging, tracing, visualizations). There are open-source projects adjacent to us at each of these layers.

Because our users already know and love many of these projects, we designed Pixie to use programmatic interfaces and open standards in order to make it easy to integrate with other tools. It is easy to export Pixie data to another system using the Pixie Plugin system.



* **Prometheus**: Similar to Prometheus, Pixie can scrape, store, and query time-series data. Pixie can also be utilized to gather data of other formats, such as dynamic logs and traces. Unlike Prometheus, Pixie does not provide long-term storage of data.
* **Grafana**: Pixie offers a scriptable UI and CLI for programmatic data visualization exploration. Grafana provides a rich dashboarding interface for visualizing data from a variety of sources, and a large ecosystem of plugins. We have built a Pixie plugin for Grafana so that Grafana users can use Pixie data to power Grafana dashboards.
* **OpenTelemetry**: OpenTelemetry provides a specification for telemetry data. Pixie provides the capability to collect and export data to that format.
* **Jaeger**: Jaeger is a distributed tracing system. Similar to Pixie, it is used to debug and troubleshoot microservice applications. Pixie collects other types of data, such as metrics, and auto-collects HTTP, database, and other requests in the users’ system. Jaeger focuses on traces. Jaeger also provides support for manual instrumentation.
* **Cilium**: Cilium and Hubble (built on-top of Cilium) also use eBPF to provide network and security visibility into applications running on Linux Container platforms. Similar to Pixie, they can provide service maps, track response statuses, and pinpoint 99th-percentile request latencies. Pixie aims to provide this baseline view of a user’s system, but also allow them to use eBPF to dive into deeper code-level views, such as flamegraphs.
