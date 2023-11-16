# OpenTelemetry Security Self Assessment

The Self-assessment is the initial document for projects to begin thinking about the security of the project, determining gaps in their security, and preparing any security documentation for their users. This document is ideal for projects currently in the CNCF sandbox as well as projects that are looking to receive a joint assessment and currently in CNCF **Incubation**.

For a detailed guide with step-by-step discussion and examples, check out the free Express Learning course provided by Linux Foundation Training & Certification: [Security Assessments for Open Source Projects](https://training.linuxfoundation.org/express-learning/security-self-assessments-for-open-source-projects-lfel1005/).

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

OpenTelemetry is an observability framework and toolkit that helps developers understand application behavior by instrumenting, generating, and exporting telemetry data for applications using OpenTelemetry. This includes open-source backends such as Jaeger and Prometheus, in addition to other commercial offerings.


### Background

OpenTelemetry is an observability framework and toolkit designed to create and manage telemetry data including traces, metrics, and logs. OpenTelemetry provides a standard protocol ([OTLP](https://opentelemetry.io/docs/specs/otlp/)) for dealing with telemetry data, language SDKs, a collector that receives, processes, and exports telemetry data, as well as other documentation and tools for telemetry.

The OpenTelemetry Collector offers a vendor-agnostic implementation on how to receive, process and export telemetry data. In addition, it removes the need to run, operate and maintain multiple agents/collectors in order to support open-source telemetry data formats (e.g. Jaeger, Prometheus, etc.) to multiple open-source or commercial back-ends. The Collector may utilize one or more Receivers which accept data from external services in a wide variety of telemetry data formats, it then processes the data and exports it to further Observability frontends/APIs such as Jaeger and Prometheus.

OpenTelemetry does two important things:

1. Allows you to own the data that you generate rather than be stuck with a proprietary data format or tool.

2. Allows you to learn a single set of APIs and conventions

### Actors

**OpenTelemetry SDK / OTLP**

OpenTelemetry provides various SDKs for C++, .NET, Erlang / Elixir, Go, Java, JavaScript / TypeScript, PHP, Python, Ruby, Rust, Swift. These SDKs provide instrumentation for a system, and export raw traces, metrics, and logs.

This instrumentation can be automatic, in which case, they export relevant telemetry to the OpenTelemetry Collector with minimal configuration from the user. Alternatively, they can be manual. In this case, the user manually configures the system using the SDK and OpenTelemetry API to provide the relevant data to the Collector.

Furthermore, in a third party application, such as microservices or applications with instrumented code, that produces data in the OTLP format may be used to send telemetry to the collector.

As these components are the primary source of incoming data, they can also become a the primary attack surface. A hypothetical attacker may be able to deliver a malicious payload by simply performing an action that is logged, these malicious payloads could be embedded scripts in the logs or trace data. They can use then exploit this to either attack the SDK and try to gain control of the system directly, or to attack components further compromise downstream components, such as the Collector. This could be done using script execution vulnerabilities or other such attacks.

**OpenTelemetry Collector**

The [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) is a vendor-agnostic implementation of how to receive, process and export telemetry data. It consists of multiple components: Receivers, Processors, Exporters, and Extensions. It serves as middleware between the raw telemetry feeds and telemetry frontends. It receives data via the the OTLP Receiver and other multiple receivers, each one receiving a potentially different format and telemetry data type, like Prometheus, Jaeger, Zipkin, etc using the OpenTelemetry Protocol. The collector then processes the data, handling jobs such as retries, batching, and encryption. It then exports the data to an Observability frontend, like Jaeger or Prometheus among others for analysis.

While the components (Receiver, Processor, Exporter) are ostensibly separate parts of the Collector and can be enabled/disabled independently, they are all controlled by a central configuration in the Collector. In the context of the Collector, this configuration only exists in the memory. However, different deployments, such as Docker and Kubernetes have their own way of handling and storing the configuration.

In order to prevent privilege escalation, the OpenTelemetry Collector should not be run as root.

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

The agents must [authenticate themselves](https://opentelemetry.io/docs/collector/configuration/#service) to the backend systems where the data is sent.

External API tokens and [TLS network](https://opentelemetry.io/docs/collector/configuration/#service) security encryption [resources](https://github.com/cloudflare/cfssl) are used to encrypt sensitive information to prevent third parties from querying OpenTelementry telemetry data.

**Data Processing and Aggregation**

The backend processes and aggregates the data. This may involve transforming the data into a suitable format for analysis. During processing, the backend validates the integrity and format of the data. It may also implement role-based access controls to ensure that only authorized personnel or systems can access or modify the data.

**Data Export and Integration**

Once processed, the data is exported to various monitoring and analysis tools (like Prometheus, Jaeger, etc.). The export process includes secure API calls or data transmission methods. The receiving systems often authenticate the incoming data to ensure its validity.

**Analysis and Visualization**

The data is analyzed, and insights are presented through dashboards or alerts. Access to these insights is typically controlled through user authentication and authorization, ensuring that only authorized users can view or manipulate sensitive telemetry data.

**Alerting and Incident Response**

Alerts are generated in case of anomalies or incidents detected through telemetry data. Below are alerting modes and the priority from top to bottom, with the top being the highest priority.
* Error rate alert: When the telemetry data error rate reaches the set threshold, the system will issue an alarm to help us quickly identify errors and maintain system performance.
* Delayed alert: When the response time of the telemetry data exceeds the set threshold, the system issues an alert and helps us identify the scope of the impact on the user experience.
* Saturation alert: An alarm will be triggered when a large amount of telemetry data causes resources to near saturation. The alarm helps us eliminate idle resources promptly.

The alerting mechanism is secured to prevent false alerts and ensure that alerts reach the correct recipients. Incident response protocols are in place to handle any security incidents reported through these alerts.


### Goals

**General**

* Customized observability features: Opentelemetry aims to set sensible configurations by default, but also allows for a wide array of flexibility and configuration
* Own your data: OpenTelemetry is an open source project, it also provides the open source OTLP for telemetry data. This allows you to use one protocol and data collection system that is independent of proprietary data formats or tools. However, the Opentelemetry collector is also capable of sending and receiving data to and from a wide array of proprietary data formats.
* Simplicity: OpenTelemetry allows you to learn only a single set of APIs and conventions to capture traces and metrics, simplifying the application instrumentation process. Furthermore, the OpenTelemetry Collector supports multiple Receivers and Exporters, allowing you to manage data input and output from a single location.

**Security**

* Data integrity: The entire transaction of OpenTelemetry carries contextual information to ensure that each part can understand the whole transaction, and the error handling methods included in OpenTelemetry can also help maintain data integrity.
* Data confidentiality: OpenTelemetry supports TLS encryption to secure your data in transport between external sources/sinks and the Collector.
* Access control functionalities: Opentelemetry uses RBAC to control user access to data and functionality.


### Non-Goals

**General**

* User Interface for Data Visualization: OpenTelemetry primarily focuses on data collection and instrumentation. It does not aim to provide comprehensive data visualization or user interface solutions. For visualization, it is typically integrated with other tools.
* Data Storage Solutions: OpenTelemetry does not provide a data storage solution for telemetry data. It is up to the users to integrate it with databases or data storage systems where the telemetry data will be stored and analyzed.
* Automatic Troubleshooting and Resolution: OpenTelemetry collects and provides data that can be vital for troubleshooting, but it does not automate the problem resolution process. It provides the data necessary to diagnose issues, but resolving them typically requires human intervention or additional tools.

**Security**

* End-to-end Application Security: The primary focus of the project OpenTelemetry is for monitoring and observability, and the applications of this project require other tools, and code analysis and application security are unavailable. Hence, it does not replace the need for dedicated application security tools and practices.
* Automated Security Patching and Updates: OpenTelemetry project does not manage neither does it automate the application of security patches for software systems. This remains the responsibility of the system administrators or other security tools which are using OpenTelemetry to keep the softwares and their systems updated on security patches.
* Compliance Auditing and Reporting: Even though we see that OpenTelemetry can certainly help in collecting data that might be relevant for compliance purposes, it is not a compliance auditing tool. Hence, it does not provide specific features for compliance reporting or auditing against standards like GDPR, HIPAA, or PCI-DSS.

## Self-Assessment Use

This self-assessment is created by the Security Pals team to perform an internal analysis of the project's security. It is not intended to provide a security audit of OpenTelemetry, or function as an independent assessment or attestation of OpenTelemetry's security health.

This document serves to provide OpenTelemetry users with an initial understanding of OpenTelemetry's security, where to find existing security documentation, OpenTelemetry plans for security, and general overview of OpenTelemetry security practices, both for development of OpenTelemetry as well as security of OpenTelemetry.

This document provides the CNCF TAG-Security with an initial understanding of OpenTelemetry to assist in a joint-assessment, necessary for projects under incubation. Taken together, this document and the joint-assessment serve as a cornerstone for if and when OpenTelemetry seeks graduation and is preparing for a security audit.

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
  * Users and contributors to the OpenTelemetry project can communicate with the OpenTelemetry team via GitHub issues, mailing lists, CNCF and through Slack channels as well.
* Outbound
  * The updates and announcements from OpenTelemetry are made through OpenTelemetry Blog, GitHub, CNCF mailing lists, and social media channels.

### Ecosystem

OpenTelemetry is a toolkit to design and export telemetry data. The project is supported for both developers and operations teams to make it much more viable in any context. It has support and instrumentation in almost all of the popular programming languages. It is a CNCF Incubation project and integrates with most of the other projects, namely, Kubernetes and others. It is also used by major companies such as JP Morgan, Splunk, etc.

Reference to the first integrations that offer-first party support for OpenTelemetry is present here in [Integrations](https://opentelemetry.io/ecosystem/integrations/)


## Security Issue Resolution


### Responsible Disclosure Process

For any projects under the OpenTelemetry project, any security issue is not to be reported through Github but through the steps defined in the [Security Policy](https://github.com/open-telemetry/opentelemetry.io/security/policy). The way to report any Vulnerability is through 'Report a Vulnerability' and creating a private channel between the reporter and the maintainers.

The technical team of maintainers recieve the Github notification for the vulnerability. If a report is made by email via encrypted messages, only the OpenTelemetry Technical Committee should be able to decrypt the message and they provide the issue to the respective team maintainers of the relevant repositories, as the respective team might not have the private key to decrypt the report that is sent throught the private channel of communcation. The OTel SIG Security might get involved in any of those steps.


### Incident Response

See [Security Policy](https://github.com/open-telemetry/opentelemetry.io/security/policy) for a description for how incidents should be communicated, triaged, confirmed, and notified.

The OpenTelemetry team likely follows a structured process for patching a vulnerabilty, releasing it as soon as possible, and publicly communicating about vulnerabilities.

Reporters are expected to comply with agreed-upon dates for public disclosure, ensuring a responsible and coordinated release of information according to the Policy mentioned before.


## Appendix


### Known Issues Over Time

The Enhancements Telemetry security-related issues can be searched using the keywords "Security type:pr," and the fixes can be searched using the keywords "fix type:pr." it can be queried using[ https://github.com/open-telemetry/opentelemetry.io/issues](https://github.com/open-telemetry/opentelemetry.io/issues).

Consider security when making pull requests, and need to consider the possibility of exposing sensitive information.


### Recommendation to the project team

**Security**

* Encryption: Use encrypted transfer protocol (HTTPS) to keep data secure in transit
* Clean telemetry data: Regularly clean telemetry data to prevent data leakage
* Avoid sensitive information: When recording telemetry data about sensitive information, it needs to be encrypted for added protection.
* Update dependencies: Keeps OpenTelemetry's dependencies up-to-date and ensures that OpenTelemetry can maintain optimal performance.
* CII Best Practices: OpenTelemetry should participate in the CII best practices and align themselves with it, so that it improves the trust and security of their code, helps in identifying and managing risk in development and other fundamental usecases. 

**Reliability**

* Avoid outdated APIs: Use the latest API version to avoid unreliability caused by obsolete APIs.
* Ensure adequate metrics: OpeTelemetry collects sufficient metrics to analyze application behavior and performance better.
* Fault tolerance mechanism: Set up a reasonable fault-tolerance mechanism so OpenTelemetry can run stably when an error occurs and implement data telemetry.
* Leverage distributed tracing: Use the distributed tracing of requests on different links provided by the OpenTelemetry platform to help identify abnormal parameters and performance bottlenecks.



### Case Studies

We've seen users of OpenTelemetry use the following way:

* [Kubernetes](https://opentelemetry.io/docs/kubernetes/) is used to deploy and manage applications, but traditional monitoring technology has many limitations, so OpenTelemetry is used to observe applications in the Kubernetes environment. Deploy the OpenTelemetry collector on Kubernetes, add the OpenTelemetry SDK to help capture critical contextual information in the application and some performance data, and then use the OTEL detection library provided by OpenTelemetry to transfer the collected data to Prometheus to analyze the data. Perform visualization. Help better analyze and understand application performance through visual data. The powerful methods and accurate data brought by OpenTelemetry can help Kubernetes environments find and solve problems promptly and improve application availability.

* OpenTelemetry makes generating, collecting, and exporting data from applications easy. We can use OpenTelemetry for system monitoring and then use a visual monitoring system to integrate the data sets generated by OpenTelemetry. For example, use AWS to build a simple microservice. After completing this configuration, use OpenTelemetry in the service to parse and track some contextual information. After the data collection, use Jaeger to connect to OpenTelemetry to obtain a more beautiful visual interface. When we try to access Jaeger, we can see some exception stack information, which helps us analyze online exceptions and understand the operating response of the system.

In this case, OpenTelemetry, as a data collection medium, can help us better obtain and transmit data to other visualization platforms to help us identify some defects in the system.



### Related Projects/Vendors

As a vendor-neutral open-source observability framework, Opentelemetry helps users better telemetry different data, including traces, metrics, and logs. It facilitates comprehensive insights into application performance. Due to the framework's diverse language support, it helps optimize the system's reliability and is of more significant help in troubleshooting.

OpenTelemetry is vendor and tool-agnostic, and it can be used with different observability backends, improving overall ease of use. Enable OpenTelemetry through native OTLP, helping add-on products deepen the connection with OpenTelemetry. Regarding observability backends that OpenTelemetry can be used together, there are Jaeger, Prometheus, Grafana, etc.


* **Prometheus**: Both Prometheus and OpenTelemetry can collect metrics across applications and services. However, Prometheus focuses more on the pull model, and OpenTelemetry includes both push and pull models. In addition, OpenTelemetry does not have built-in alarms, but Prometheus does. OpenTelemetry combining built-in alerts in Prometheus helps create an observability ecosystem and improve stability.
* **Grafana**: OpenTelemetry and Grafana complement each other, and the visualization in Grafana's dashboard can better help analyze various types of data collected from OpenTelemetry. In addition, Grafana supports enable interoperability from OpenTelemetry by calling on SDKs and application observability standards, among others, integrating telemetry into a unified open-source monitoring backend.
* **Jaeger**: Jaeger is a distributed tracing system that can be started and run in a local environment. Users can first use OpenTelemetry to detect various indicators of the application and then send the tracking data to Jaeger. The advantage of using Jaeger is that it makes finding the source of latency and lack of concurrency easier. All in all, Jaeger is more focused, while OpenTelemetry is a broader framework.

[comment]: # (The First Draft of Self Assessment has been completed on Nov 28, 2023: 4:20 EST)
