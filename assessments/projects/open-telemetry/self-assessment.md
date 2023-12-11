# OpenTelemetry Security Self Assessment

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
   <td><a href="https://mvnrepository.com/artifact/io.opentelemetry/opentelemetry-bom">https://mvnrepository.com/artifact/io.opentelemetry/opentelemetry-bom</a>
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
  </tr>
  <tr>
   <td>Security best practices
   </td>
   <td><a href="https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/security-best-practices.md">https://github.com/open-telemetry/opentelemetry-collector/blob/main/docs/security-best-practices.md</a>
   </td>
   <tr>
   <td>OpenTelemetry Website Security Policy
   </td>
   <td><a href="https://github.com/open-telemetry/opentelemetry.io/security/policy">https://github.com/open-telemetry/opentelemetry.io/security/policy</a>
   </td>
   </tr>
</table>


## Overview

OpenTelemetry is an observability framework and toolkit that helps developers understand application behavior by instrumenting, generating, and exporting telemetry data for applications using OpenTelemetry. This includes open-source backends such as Jaeger and Prometheus, in addition to commercial offerings.


### Background

OpenTelemetry is an Observability framework and toolkit designed to create and manage telemetry data such as traces, metrics, and logs. Opentelemetry provides a standard protocol for dealing with telemetry data, language SDKs, a collector that receives, processes, and exports telemetry data, as well as other documentation and tools for telemetry.

The OpenTelemetry Collector offers a vendor-agnostic implementation on how to receive, process and export telemetry data. In addition, it removes the need to run, operate and maintain multiple agents/collectors in order to support open-source telemetry data formats (e.g. Jaeger, Prometheus, etc.) to multiple open-source or commercial back-ends. The Collector may utilize one or more Receivers which accept data from external services in a wide variety of telemetry data formats, it then processes the data and exports it to further Observability frontends/APIs such as Jaeger and Prometheus.

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

The Processor component of the Collector is reponsible for the sanitization of incoming telemetry data. It ensures that any downstream components will not receive data that is confidential or malicious. While the Processor is responsible for sanitizing data, it should also not be vulnerable to any sort of injection which would allow an attacker to take control of the Processor. The Processor may also be used to modify telemetry data, or prevent telemetry from reaching downstream services/components.

The Exporter is responsible for delivering the processed telemetry data to telemetry frontends for visualization and storage. It should use encryption to safeguard the data as well. A compromised Exporter can be used to leak sensitive information if the data was not properly sanitized, or provide a means to attack any systems downstream of the Collector. It may also be misconfgured to prevent any exports of telemetry to downstream services.

**Downstream Services**

OpenTelemetry can export data to Prometheus, Jaeger, or in the OTLP format, among others. While these actors do not influence the rest of the OpenTelemetry ecosystem directly, they are the recipients of data provided by the Collector, or in the case of Collectorless setups, the telemetry sources. If the telemetry data passing through the Collector is not sanitized properly, these services are now vulnerable to injection attacks inside the telemetry payload. Furthermore, they might now expose sensitive data themselves.

Compromising these services would allow an attacker to leak sensitive information, modify telemetry data, or delete all of the telemetry data collected.

### Actions

**Telemetry Data Collection**

These agents collect telemetry data (metrics, logs, traces) from the application. Data is often collected in a non-intrusive and secure manner. In this case, sensitive information will not be exposed. The agents must authenticate themselves to the backend systems where the data is sent. Agents are assigned unique identifiers or credentials, such as API keys, tokens, or digital certificates. During data transmission, these credentials are sent to the backend system. The backend system verifies these credentials according to a database or a token service. This process may also include authorization checks to confirm the agent's permissions for the requested actions. 

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
* Data integrity: The entire transaction of OpenTelemetry carries contextual information to ensure that each part can understand the whole transaction, and the error handling methods included in OpenTelemetry can also help maintain data integrity.
* Authentication: Need authenticated entities to interact with the system.
* Authorization:  Need authorized entities to interact with the system.
* Access control functionalities: Use RBAC to control user access to data and functionality.


### Non-Goals

**General**



* Data limitations: OpenTelemetry can help you access high-quality telemetry data, but data storage and visualization still require other tools, and code analysis and application security are unavailable.

**Security**



* External API tokens and [TLS network](https://opentelemetry.io/docs/collector/configuration/#service) security encryption [resources](https://github.com/cloudflare/cfssl) are used to encrypt sensitive information to prevent third parties from querying OpenTelementry telemetry data.
* The agents must [authenticate themselves](https://opentelemetry.io/docs/collector/configuration/#service) to the backend systems where the data is sent.


## Self-Assessment Use

Our team comprises graduate students from different professional backgrounds, and each member is rich in insight. We have come together with a shared commitment to create this self-assessment to analyze the overall security of OpenTelemetry. This document mainly helps users get a preliminary understanding of OpenTelemetry’s security architecture and security development practices. In addition, it allows users to have a deeper understanding of the security functions of OpenTelemetry, helping users better develop, use, and telemetry the data they need.

All in all, this document helps explain this CNCF open source project, pave the way for the project to seek graduation, provide clear guidance during the incubation process, and bring a more transparent and clear security audit to the overall project.



## Security Functions and Features

See [Actors](#actors) and [Actions](#actions) for more detailed description of the critical actors, actions, and potential threats.


### Critical

**Telemetry Data Encryption**

Encryption of telemetry data in OpenTelemetry is critical for protecting data confidentiality and integrity during transmission. This process involves transforming the readable telemetry data (metrics, logs, and traces) into an encrypted format, which can only be deciphered by authorized parties with the appropriate decryption keys. It serves as the first line of defense against data breaches, making it a fundamental aspect in threat modeling for assessing risks related to eavesdropping and data tampering.

**Authentication and Authorization Mechanisms**

These mechanisms in OpenTelemetry ensure that only authenticated and authorized entities can interact with the system, playing a crucial role in safeguarding against unauthorized access and manipulation. In threat modeling, they are key to evaluating the potential risks of system penetration and data breaches.

**Data Integrity Checks**

Ensuring the integrity of telemetry data in OpenTelemetry is essential for reliable system monitoring and decision-making. Data integrity checks are crucial in threat modeling to identify potential manipulation threats and maintain the trustworthiness of operational data.

**Context Propagation Security**

In OpenTelemetry, secure context propagation is critical for maintaining trace integrity across services. The context in distributed tracing includes information necessary to maintain the trace's continuity as it moves from one service to another. This typically includes trace identifiers, span identifiers, and other metadata that links individual service calls to the overarching trace. Distributed tracing tracks the journey of a request as it traverses through these microservices, creating a trace that represents the entire flow. It's a key defense against trace manipulation, playing an important role in threat modeling, especially in distributed tracing scenarios.


### Security Relevant

**Configurable Data Scrubbing**

OpenTelemetry's data scrubbing feature allows for the removal or anonymization of sensitive information, crucial for privacy compliance and reducing exposure risks. It's a significant factor in threat modeling, particularly in handling sensitive information.

**Role-Based Access Control (RBAC) for Dashboards and Tools**

RBAC in OpenTelemetry controls user access to data and functionalities, preventing unauthorized actions and enhancing system security. It's a critical consideration in threat modeling for assessing risks related to unauthorized access and privilege escalation.

**Monitoring and Auditing**

This feature in OpenTelemetry tracks system activities and is vital for security audits and analysis. Monitoring and auditing apply to both the performance and the security of the telemetry data pipeline. For example, metrics, logs, and alerts can be used for the OpenTelemetry agents, collectors, and exporters. Reports, dashboards, and notifications can be used for the databases or cloud services that store the telemetry data. It plays a significant role in threat modeling for identifying unauthorized activities and breaches, enhancing incident detection and response strategies.

**Reverse Proxy**

A reverse proxy sits between the clients (which could be instrumented applications or OpenTelemetry agents) and the backend services (like telemetry collectors or observability platforms). It manages the incoming traffic and applies rate limiting and throttling rules to control the flow of requests. This setup is crucial for protecting the backend services from being overwhelmed by excessive traffic or potential denial-of-service attacks.

**Regular Security Updates and Patch Management**

Regularly updating and patching OpenTelemetry components is essential for maintaining system security and protecting against known vulnerabilities. This practice is a crucial aspect of threat modeling, focusing on the system's defenses against known exploits.

## Project Compliance

Not applicable.


## Secure Development Practices

### Development Pipeline

All code is maintained on [Github](https://github.com/open-telemetry/opentelemetry.io/tree/main).

* Contributions and Changes
  * Code changes are submitted via Pull Requests (PRs) and must be signed and verified.
  * Commits to the main branch directly are not allowed.
* Code Review
  * Changes must be reviewed and merged by the project maintainers.
  * The code is reviewed by multiple members from various teams and then approved by all of the reviewers before passing the check.
* Automated Testing
  * In each PR, the code has to pass through various security checks and vulnerability analysis, to find if the code is secure and would not fail basic testing.
  * Tools like CodeQL and GoSec have been adopted for security scanning.
  * The project utilizes various vulnerability tests, unit tests and neutral tests to quantify whether the changes would be safe in basic context, before the reviews done by the project maintainers.
* Dependency Management
  * The project regularly updates its dependencies and check for vulnerabilities and keeps its github updated at all times asynchronously.

### Communication Channels
* Internal
  * The OpenTelemetry team mostly uses platforms like GitHub, Slack, or email lists for internal communications within the teams.
* Inbound
  * Users and contributors to the OpenTelemetry project can communicate with the OpenTelemetry team via GitHub issues, mailing lists, CNCF Slack channels and through Discord Communications as well.
* Outbound
  * The updates and announcements from OpenTelemetry are made through OpenTelemetry Blog, GitHub, CNCF mailing lists, and social media channels.

### Ecosystem

OpenTelemetry is a toolkit to design and export telemetry data. The project is supported for both developers and operations teams to make it much more viable in any context. It has support and instrumentation in almost all of the popular programming languages. It is a CNCF Incubation project and integrates with most of the other projects, namely, Kubernetes and others. It is also used by major companies such as JP Morgan, Splunk, etc.


## Security Issue Resolution


### Responsible Disclosure Process

For any projects under the OpenTelemetry project, any security issue is not to be reported through Github but through the steps defined in the [Security Policy](https://github.com/open-telemetry/opentelemetry.io/security/policy). The way to report any Vulnerability is through 'Report a Vulnerability' and creating a private channel between the reporter and the maintainers.

The technical team recieves the message for the report and they are required to provide the issue to the respective teams, as the respective team might not have the private key to decrypt the report we have sent throught the private channel of communcation.


### Incident Response

See [Security Policy](https://github.com/open-telemetry/opentelemetry.io/security/policy) for a description for how incidents should be communicated, triaged, confirmed, and notified.

The OpenTelemetry team likely follows a structured process for patching a vulnerabilty, releasing it as soon as possible, and publicly communicating about vulnerabilities.

Reporters are expected to comply with agreed-upon dates for public disclosure, ensuring a responsible and coordinated release of information according to the Policy mentioned before.


## Appendix


### Known Issues Over Time

The Enhancements Telemetry security-related issues can be searched using the keywords "Security type:pr," and the fixes can be searched using the keywords "fix type:pr." it can be queried using[ https://github.com/open-telemetry/opentelemetry.io/issues](https://github.com/open-telemetry/opentelemetry.io/issues).

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


* **Prometheus**: Both Prometheus and OpenTelemetry can collect metrics across applications and services. However, Prometheus focuses more on the pull model, and OpenTelemetry includes both push and pull models. In addition, OpenTelemetry does not have built-in alarms, but Prometheus does. OpenTelemetry combining built-in alerts in Prometheus helps create an observability ecosystem and improve stability.
* **Grafana**: OpenTelemetry and Grafana complement each other, and the visualization in Grafana's dashboard can better help analyze various types of data collected from OpenTelemetry. In addition, Grafana supports enable interoperability from OpenTelemetry by calling on SDKs and application observability standards, among others, integrating telemetry into a unified open-source monitoring backend.
* **Jaeger**: Jaeger is a distributed tracing system that can be started and run in a local environment. Users can first use OpenTelemetry to detect various indicators of the application and then send the tracking data to Jaeger. The advantage of using Jaeger is that it makes finding the source of latency and lack of concurrency easier. All in all, Jaeger is more focused, while OpenTelemetry is a broader framework.

[comment]: # (The First Draft of Self Assessment has been completed on Nov 28, 2023: 4:20 EST)
