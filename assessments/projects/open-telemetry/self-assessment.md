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



* Custom telemetry: Set sensible defaults but allow customization.
* Own your data: Not tied to proprietary data formats or tools.
* High performance: Unexpected interference effects do not exist in the host application.
* Simplicity: It is only necessary to learn a single set of APIs and conventions to capture traces and metrics, simplifying the application instrumentation process.

**Security**



* The OpenTelemetry Collector should not be run as root.
* Configuration files must be verified before loading, and sensitive information in the configuration files must be hidden to reduce unnecessary exposure.
* To prevent resource exhaustion attacks, default parameters such as queues and payloads should be accounted for.


### Non-Goals

**General**



* Data limitations: OpenTelemetry can help you access high-quality telemetry data, but data storage and visualization still require other tools, and code analysis and application security are unavailable.

**Security**



* Use API tokens and TLS network security encryption to encrypt sensitive information to prevent third parties from querying OpenTelementry telemetry data.
* Prevent external access to internal resources. When running Open Telemetry, there should be no privileged access.
* The agents must authenticate themselves to the backend systems where the data is sent.


## Self-Assessment Use

Our team comprises graduate students from different professional backgrounds, and each member is rich in insight. We have come together with a shared commitment to create this self-assessment to analyze the overall security of OpenTelemetry. This document mainly helps users get a preliminary understanding of OpenTelemetry’s security architecture and security development practices. In addition, it allows users to have a deeper understanding of the security functions of OpenTelemetry, helping users better develop, use, and telemetry the data they need.

All in all, this document helps explain this CNCF open source project, pave the way for the project to seek graduation, provide clear guidance during the incubation process, and bring a more transparent and clear security audit to the overall project.



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

The Enhancements Telemetry security-related issues are labeled with "Enhancement", and the fixes are marked with "dependencies." it can be queried using[ https://github.com/open-telemetry/opentelemetry.io/issues](https://github.com/open-telemetry/opentelemetry.io/issues).

Consider security when making pull requests, and need to consider the possibility of exposing sensitive information.


### CII Best Practices

Not applicable


### Case Studies

We've seen users of OpenTelemetry use the following way:

* OpenTelemetry makes generating, collecting, and exporting data from applications easy. We can use OpenTelemetry for system monitoring and then use a visual monitoring system to integrate the data sets generated by OpenTelemetry. For example, use AWS to build a simple microservice. After completing this configuration, use OpenTelemetry in the service to parse and track some contextual information. After the data collection, use Jaeger to connect to OpenTelemetry to obtain a more beautiful visual interface. When we try to access Jaeger, we can see some exception stack information, which helps us analyze online exceptions and understand the operating response of the system.

In this case, OpenTelemetry, as a data collection medium, can help us better obtain and transmit data to other visualization platforms to help us identify some defects in the system.



### Related Projects/Vendors

As a vendor-neutral open-source observability framework, Opentelemetry helps users better telemetry different data, including traces, metrics, and logs. It facilitates comprehensive insights into application performance. Due to the framework's diverse language support, it helps optimize the system's reliability and is of more significant help in troubleshooting.


OpenTelemetry is vendor and tool-agnostic, and it can be used with different observability backends, improving overall ease of use. Enable OpenTelemetry through native OTLP, helping add-on products deepen the connection with OpenTelemetry. Regarding observability backends that OpenTelemetry can be used together, there are Jaeger, Prometheus, Grafana, etc.


* **Prometheus**: Both Prometheus and OpenTelemetry can collect metrics across applications and services. However, Prometheus focuses more on the pull model, and OpenTelemetry includes both push and pull models. In addition, combining built-in alerts in Prometheus and OpenTelemetry helps create an observability ecosystem and improve stability.
* **Grafana**: OpenTelemetry and Grafana complement each other, and the visualization in Grafana's dashboard can better help analyze various types of data collected from OpenTelemetry. In addition, Grafana supports enable interoperability from OpenTelemetry by calling on SDKs and application observability standards, among others, integrating telemetry into a unified open-source monitoring backend.
* **OpenTelemetry**: Same
* **Jaeger**: Jaeger is a distributed tracing system that can be started and run in a local environment. Users can first use OpenTelemetry to detect various indicators of the application and then send the tracking data to Jaeger. The advantage of using Jaeger is that it makes finding the source of latency and lack of concurrency easier. All in all, Jaeger is more focused, while OpenTelemetry is a broader framework.
* **Cilium**: Not applicable

