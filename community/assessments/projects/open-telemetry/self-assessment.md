<!-- cSpell:ignore Zipkin Cribl -->
# OpenTelemetry Security Self Assessment

_This assessment was initially created by community members as part of the
[Security Pals](https://github.com/cncf/tag-security/issues/1102) process. The
project recognizes their contribution to major parts of this document._

## Table of Contents

- [Metadata](#metadata)
  - [Security Links](#security-links)
- [Overview](#overview)
  - [Actors](#actors)
  - [Actions](#actions)
  - [Background](#background)
  - [Goals](#goals)
  - [Non-Goals](#non-goals)
- [Self-Assessment Use](#self-assessment-use)
- [Security Functions and Features](#security-functions-and-features)
- [Secure Development Practices](#secure-development-practices)
- [Security Issue Resolution](#security-issue-resolution)
- [Appendix](#appendix)

## Metadata

|                    |                                                                                                     |
|--------------------|-----------------------------------------------------------------------------------------------------|
| Assessment Stage   | Complete                                                                                             |
| Software          | [OpenTelemetry](https://github.com/open-telemetry)                                                   |
| Website           | <https://opentelemetry.io>                                                                           |
| Security Provider | No                                                                                                    |
| Languages         | C++, .NET, Erlang / Elixir, Go, Java, JavaScript / TypeScript, PHP, Python, Ruby, Rust, Swift, Any Language |
| SBOM              | Varies based on language.                                                                             |

### Security Links

| Doc             | URL                                                                                               |
|-----------------|---------------------------------------------------------------------------------------------------|
| Security SIG    | [https://github.com/open-telemetry/sig-security](https://github.com/open-telemetry/sig-security) |
| Security Audit  | [https://opentelemetry.io/blog/2024/security-audit-results/](https://opentelemetry.io/blog/2024/security-audit-results/) |
| Fuzzing Audit   | [https://opentelemetry.io/blog/2024/fuzzing-audit-results/](https://opentelemetry.io/blog/2024/fuzzing-audit-results/) |

## Overview

OpenTelemetry is an observability framework and standard for creating,
processing, collecting, and exporting telemetry data from cloud-native
applications. As an extensible and composable framework, it supports a wide
variety of integration and deployment methods, and is intended to be a
general-purpose library.

### Background

OpenTelemetry is an observability framework and toolkit designed to create and
manage telemetry data including traces, metrics, and logs. OpenTelemetry
provides a standard protocol ([OTLP](https://opentelemetry.io/docs/specs/otlp/))
for dealing with telemetry data, language SDKs, a collector that receives,
processes, and exports telemetry data, as well as other documentation and tools
for telemetry.

The OpenTelemetry Collector offers a vendor-agnostic implementation on how to
receive, process and export telemetry data. In addition, it removes the need to
run, operate and maintain multiple agents/collectors in order to support
open-source telemetry data formats (e.g. Jaeger, Prometheus, etc.) to multiple
open-source or commercial back-ends. The Collector may utilize one or more
Receivers which accept data from external services in a wide variety of
telemetry data formats, it then processes the data and exports it to further
Observability front ends/APIs such as Jaeger and Prometheus.

The primary goals of OpenTelemetry are as follows:

1. Provide a single, lightweight API specification and implementation that
developers can embed into their libraries, which will emit strongly-typed
instrumentation data.

2. Provide a specification for both the structure and semantics of telemetry
data via OTLP and Semantic Conventions.

3. Build an ecosystem of instrumentation libraries, tools, and other utilities
to aid developers in building and operating observable applications.

Due to the complexity of the software observability space in general, we define
a distinction between 'core' and 'ecosystem' components. Core components are the
upstream implementations of our specification -- e.g., the API, SDK, and wire
protocols. Unspecified or other tools are 'ecosystem' components.

## Actors

### Core Actors

#### OpenTelemetry API

The OpenTelemetry API is a comprehensive implementation of the [OpenTelemetry
Specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/README.md)
in a variety of languages. The API is designed to provide core functionality
around distributed context propagation and telemetry signal definition.

#### OpenTelemetry SDK

OpenTelemetry provides various reference SDKs for C++, .NET, Erlang / Elixir,
Go, Java, JavaScript / TypeScript, PHP, Python, Ruby, Rust, Swift. These SDKs
provide instrumentation for a system, and export raw traces, metrics, logs, and
profiling data. The functions of the reference SDK are defined in the
[OpenTelemetry
Specification](https://github.com/open-telemetry/opentelemetry-specification/blob/main/specification/README.md).
An SDK is responsible for the management, processing, and export of telemetry
data. Our core SDK implementations are designed to be slim and efficient in
order to reduce the overhead required to collect and export telemetry data.

#### OTLP and Semantic Conventions

To provide vendor agnostic transport, serialization, and deserialization of
telemetry data OpenTelemetry has built and maintains a wire standard referred to
as the [OpenTeLemetry Protocol
(OTLP)](https://github.com/open-telemetry/opentelemetry-proto/blob/main/docs/specification.md),
as well as [Semantic
Conventions](https://github.com/open-telemetry/semantic-conventions/blob/main/docs/README.md).
OTLP over gRPC and HTTP, either in protobuf or JSON format, is the primary
mechanism by which telemetry data is communicated between OpenTelemetry
components (such as an SDK and a Collector, or between two Collectors, or to a
vendor-specific ingest endpoint). Semantic Conventions, meanwhile, define a
standard set of metadata that describes telemetry itself. Semantic Conventions
are primarily consumed through auto-generated libraries, or other tooling.

### Ecosystem Actors

#### OpenTelemetry Collector

The [OpenTelemetry Collector](https://opentelemetry.io/docs/collector/) is a
binary agent designed to receive, process, and export telemetry data from one or
many sources. Broadly, a Collector is a crucial part of an OpenTelemetry
deployment and serves many functions: it can act as an agent that consumes
telemetry data from local sources regardless of initial format and normalize it
to OTLP, it can act as a gateway to aggregate data from many other Collector
instances in order to filter, batch, and process that data, and it can be
extended with custom components to perform almost any action a user needs (such
as hydrating telemetry data with source maps for symbolization purposes, or
adding location information through geo-ip lookups).

The Collector is designed to receive, process, and export data as _pipelines_.

- Receivers consume telemetry data from a network connection, pipe, or by
reading local system state and transform it to in-memory OTLP.
- Processors can mutate the stream of telemetry data in order to perform actions
like filtering, hashing, hydration, reaggregation, or sampling.
- Connectors tie together multiple pipelines as observers of the pipeline state,
allowing for certain types of transformations (e.g., translating spans into
metrics).
- Exporters serialize the in-memory OTLP into a desired format and exfiltrate
the data to a remote or local endpoint (such as an observability tool or the
local file system).

Each part of a pipeline has a defined interface and responsibilities, and cannot
access or mutate data outside of its own pipeline.

Pipelines are configured via a YAML file, but an optional remote configuration
protocol exists as well known as
[OpAMP](https://github.com/open-telemetry/opamp-spec/blob/main/specification.md),
currently in Beta.

The Collector provides security and authentication mechanisms for receivers and
exporters that use the provided HTTP and gRPC interfaces; Mechanisms include
mTLS, OAuth/SAML support, etc. Custom Collector distributions may extend this
with their own _extensions_.

Collectors may need to run with elevated privileges in order to perform certain
actions, such as scraping system metrics or logs. Upstream distributions of the
Collector are designed with sensible defaults, such as not binding to all
interfaces and not running as root, in order to reduce the attack surface of a
Collector.

#### Instrumentation Libraries, Frameworks, and Zero-Code Agents

While the goal of OpenTelemetry is to provide native instrumentation to
libraries and frameworks, a great deal of existing software does not utilize its
API, or transmit OTLP data. In order to ease adoption and aid developers and
operators in using OpenTelemetry, a variety of community and project supported
_instrumentation components_ exist. In general, these components offer the
following services and mechanisms:

- Zero-code instrumentation via monkey patching or other dynamic hooks.
- Injection of the API and SDK into a process through runtime agent mechanisms.
- Library-based instrumentation controlled by code imports.
- External, eBPF-based instrumentation of processes using probes.
- Compile-time injection of API calls based on heuristics.

These are all _optional_ components of an OpenTelemetry system; They require
additional configuration, and add additional security considerations. Some of
them require privilege escalation by their very nature. It is recommended that
operators carefully evaluate the additional privileges and permissions needed to
utilize these components before installation. In addition, these instrumentation
components will capture potentially sensitive data about production systems
depending on the implementation details of software. For example, if an
application transmits potentially sensitive data in a URL query string and HTTP
client instrumentation is installed, these values will be added to a span.

### Actions

#### Telemetry Data Collection

Ideally, telemetry data is collected in a secure and non-intrusive fashion. By
design, OpenTelemetry and OTLP supports a push-based scheme where systems and
collection agents can perform authN/Z to validate the consumers and senders of
data. There are exceptions to this rule, especially around integration into
existing data sources using a Collector. It is suggested that users carefully
consider their threat model, data access policies, and the security capabilities
of storage/analysis tools as part of their overall security posture.

#### Data Transmission

OTLP connections between various components can be secured using existing
mechanisms in gRPC/HTTP such as TLS. Transmission is secure by default (TLS must
be explicitly disabled in configuration), but users should carefully evaluate
the recommendations of their storage and analysis tools in order to secure both
transport and data access. Threats to data transmission are mostly around
inauthentic traffic being sent to publicly exposed collection endpoints -- we
suggest proxying public-facing Collectors or using various allow/denylist
approaches to ensure that unwanted traffic can be properly filtered.

#### Data Processing and Aggregation

Collectors are capable of a wide variety of processing functions. These can
include both simple actions - e.g., removing all data points or spans where a
certain attribute value matches a known identifier - as well as complex,
stateful ones. Some examples of this latter category include 'tail sampling',
where span data is buffered on a single Collector in order to make a sampling
decision for the entire trace at once. Another example is spatial re-aggregation
of metric data, or converting between different metric types (such as turning a
sum into a gauge).

By design, the Collector's transformation capabilities are only accessible via
configuration. A [transformation domain-specific
language](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/pkg/ottl)
is being developed that allows for a wide variety of advanced transforms, but it
is an optional component.

#### Data Export and Integration

Once processed, the data is exported to various monitoring and analysis tools
(like Prometheus, Jaeger, etc.). The export process includes secure API calls or
data transmission methods. The receiving systems often authenticate the incoming
data to ensure its validity.

### Goals

#### General

- Enable cloud-native observability through a standard for the instrumentation,
structure, and meaning of telemetry data.
- Turn telemetry data into a commodity feature of cloud-native systems,
eliminating vendor lock-in.
- Support bridges from legacy telemetry APIs and frameworks through an
extensible and composable API and SDK design.
- Nurture open source and commercial innovation by creating an open ecosystem
for extending existing semantics.
- Promulgate a data model for telemetry that moves past traditional 'three
pillars' thinking by integrating signals through shared, distributed context.

#### Security

OpenTelemetry is designed as a general-purpose telemetry framework, which means
that it must be suitable for inclusion in many different workloads and services.
Thus, we are concerned with several areas of security and secure development:

1. Minimize the ability of our components to negatively impact the host process - e.g., do not throw exceptions or fatal errors.

2. Ensure that data cannot be inspected or tampered with in transit.

3. Allow for secure configuration of SDKs and ecosystem components.

4. Provide mechanisms to allow for the protection of sensitive data in signals,
such as hashing, filtering, or masking of PII.

There have been requests from the community to add non-repudiation guarantees
through cryptographic signatures and audit trails (e.g., signed payloads with
timestamped sequence numbers), and we may elect to expand into this area in the
future.

### Non-Goals

#### General Non-Goals

OpenTelemetry does not seek to provide storage, analysis, visualization, or
query interfaces for telemetry data. We also do not aim to provide application
or service security features.

#### Security Non-Goals

While OpenTelemetry can be used to collect logs and events for SIEM purposes,
our focus is on application and system observability. However, it is an area
that we will potentially invest more into based on community feedback and
demand. Furthermore, we do not provide guarantees around the security of data
stores, analysis tools, visualization, or query interfaces for
OpenTelemetry-sourced data. We provide sensible defaults to minimize the impact
of DDoS or other attacks against telemetry collection, but we cannot prevent
users from opening themselves up to such attacks if they modify these defaults
or deploy Collectors that are open to the world.

## Self-Assessment Use

This document serves to provide OpenTelemetry users with an initial
understanding of OpenTelemetry's security, where to find existing security
documentation, OpenTelemetry plans for security, and general overview of
OpenTelemetry security practices, both for development of OpenTelemetry as well
as security of OpenTelemetry.

This document provides the CNCF TAG-Security with an initial understanding of
OpenTelemetry to assist in a joint-assessment, necessary for projects under
incubation. Taken together, this document and the joint-assessment serve as a
cornerstone for if and when OpenTelemetry seeks graduation and is preparing for
a security audit.

## Security Functions and Features

See [Actors](#actors) and [Actions](#actions) for more detailed description of
the critical actors, actions, and potential threats.

### Critical

#### Authentication Mechanisms Between OTLP Receivers and Exporters

OTLP is built on gRPC and HTTP, and thus relies on the TLS and authentication
mechanisms supported by HTTP/2 and HTTP. These include bearer tokens via OAuth
2.0, x.509 client certificates for mutual TLS, and API key authentication.

#### Data Validation and Sanitization

Semantic conventions are designed to reduce the likelihood that sensitive data
is recorded by an instrumentation library, but in real-world use cases sensitive
data is almost always recorded into telemetry. In order to prevent it from
leaving a secured network, a variety of filtering methods are provided to users.
Our recommended deployment configuration of OpenTelemetry includes Collectors
which are responsible for managing these filters using one of the aforementioned
options (such as a Transform processor).

#### Access Control for Configuration

OpenTelemetry components can be configured in code, through environment
variables, and in some cases through configuration files or remote configuration
APIs. In all cases, users should ensure that sources of configuration do not
leak potentially sensitive values such as API keys for authenticating with
telemetry backends.

### Security Relevant

#### Configurable sampling rates and data limits

In order to prevent DDoS of Collectors or backend analysis tools, OpenTelemetry
strongly recommends that production deployments utilize data sampling strategies
to reduce the volume of telemetry collected and processed. In addition, we set
default limits on the size of telemetry payloads in order to limit the ability
of telemetry to overwhelm a network link or storage device.

#### Tenancy isolation

When deploying multi-tenant Collectors, users should strive to institute
appropriate per-pipeline authentication methods to disallow telemetry data from
one tenant being sent to a different pipeline. A popular mitigation strategy
here is to deploy single-tenant Collectors.

#### Rate limiting

OTLP clients and servers are expected to support exponential backoff and other
forms of rate limiting/back pressure handling. This may result in telemetry data
being dropped, which is also why it is suggested to rely on multi-signal
telemetry (e.g., not _only_ sending trace data from a service) and to
potentially deploy Collectors in per-signal pools so that the loss of one signal
does not negatively impact the ability to inspect a service's state. In
addition, it is suggested to use reverse proxies to load balance traffic into
Collector pools.

#### Management protocol security

OpAMP provides [connection
management](https://github.com/open-telemetry/opamp-spec/blob/main/specification.md#connection-settings-management)
features that allow agents and servers to not only securely communicate with
each other, but for secure connections to be established in various ways. Trust
on first use, registration on first use, client-initiated, and server-initiated
flows all exist. Depending on the exact needs of a deployment, different
strategies will make the most sense.

## Secure Development Practices

### Development Pipeline

All code is maintained on [GitHub](https://github.com/open-telemetry/). The
project provides security recommendations to each SIG.

- Contributions and Changes
  - Code changes are submitted via Pull Requests (PRs). Contributors must have
  signed a CLA.
  - Commits to the main branch directly are not allowed.
- Code Review
  - Changes must be reviewed and merged by the project maintainers.
  - The code is reviewed by multiple members from various teams and then
  approved by all of the reviewers before passing the check.
- Automated Testing
  - In each PR, the code has to pass through various security checks and
  vulnerability analysis, to find if the code is secure and would not fail basic
  testing.
  - Tools like CodeQL and GoSec have been adopted for security scanning in some
  repositories.
  - The project utilizes various vulnerability tests, unit tests and integration
  tests to quantify whether the changes would be safe in basic context, before
  the reviews done by the project maintainers.
- Dependency Management
  - Many SIGs use automated scanners such as Dependabot or Renovate to automate
  dependency updates, though not all.

### Communication Channels

- Internal
  - The OpenTelemetry team mostly uses platforms like GitHub, Slack, or email
  lists for internal communications within the teams.
  - Regular SIG meetings are held over Zoom for maintainers and contributors to
  each SIG.
- Inbound
  - Users and contributors to the OpenTelemetry project can communicate with the
  OpenTelemetry team via GitHub issues, StackOverflow, CNCF and through Slack
  channels as well.
- Outbound
  - The updates and announcements from OpenTelemetry are made through
  OpenTelemetry Blog, GitHub, CNCF mailing lists, and social media channels.

### Ecosystem

OpenTelemetry is a toolkit to design and export telemetry data. The project is
supported for both developers and operations teams to make it much more viable
in any context. It has support and instrumentation in almost all of the popular
programming languages. It is in incubation status and integrates with many CNCF
projects including Kubernetes, ArgoCD, LinkerD, and more. It is also used by major
companies such as JP Morgan, Splunk, Datadog, Honeycomb, Elastic, New Relic, etc.

Reference to the first integrations that offer-first party support for
OpenTelemetry is present here in
[Integrations](https://opentelemetry.io/ecosystem/integrations/)

## Security Issue Resolution

### Responsible Disclosure Process

All security issues are to be reported as defined in the [Security
Policy](https://github.com/open-telemetry/opentelemetry.io/security/policy).

We leverage the GitHub Security reporting flow in order to create private
channels between reporters and members of the Technical Committee. TC members
are able to invite SIG maintainers or other relevant participants to these
issues in order to deploy and coordinate fixes.

In the event that a security issue requires a coordinated response, the TC and
GC will work together with external parties on disclosure.

### Incident Response

SIG Security is expected to handle incident response in line with the previous
notes on disclosure.

## Appendix

### Known Issues Over Time

CVEs published by the project are available on CVS.org. A selection follows:

- [CVE-2024-45043](https://www.cve.org/CVERecord?id=CVE-2024-45043)
- [CVE-2024-42368](https://www.cve.org/CVERecord?id=CVE-2024-42368)
- [CVE-2023-45142](https://www.cve.org/CVERecord?id=CVE-2023-45142)
- [CVE-2023-39951](https://www.cve.org/CVERecord?id=CVE-2023-39951)

### OpenSSF Best Practices

We continue to progress towards achieving OpenSSF Best Practices badges across
all of our repositories and SIGs. You can find our current overview at
[CLOMonitor](https://clomonitor.io/projects/cncf/open-telemetry). Our focus has
been on ensuring that the most public-facing components such as the Collector
have achieved this badge, which it has.

### Adopters and Case Studies

We maintain a [list of adopters](https://opentelemetry.io/ecosystem/adopters/),
along with blog posts and other supporting information about it, on our website.
This is not an exhaustive list.

In addition, the CNCF collects [case studies about
OpenTelemetry](https://www.cncf.io/case-studies/?_sft_lf-project=opentelemetry)
as a part of their efforts.

### Related Projects

OpenTelemetry is a unique project, as there are no other large-scale standards
efforts around telemetry unification. While prior art exists in specific
languages such as [Micrometer](https://micrometer.io/) for Java, or
[System.Diagnostics](https://learn.microsoft.com/en-us/dotnet/api/system.diagnostics?view=net-9.0)
in .NET, there are few universal efforts to create a single observability facade
at the API and SDK level. In addition, while standards efforts around data
normalization for telemetry exist -- the [Elastic Common
Schema](https://github.com/elastic/ecs) or the [Common Log
Format](https://en.wikipedia.org/wiki/Common_Log_Format) for instance -- there
has not been a successful normalization project with the breadth that
OpenTelemetry Semantic Conventions seek to provide.

This is not to say that we stand alone -- there are many related projects in
this space. Tools such as Jaeger, Zipkin, Prometheus, Elastic/OpenSearch all
have large user communities and are very popular destinations for
OpenTelemetry-generated signals. Components, like the Collector, have peers such
as fluentBit or Vector, not to mention proprietary options like Cribl. Part of
the reason that we encourage ecosystem development, however, is that none of
these projects really encompass our unified vision of overlapping telemetry
signals connected through a distributed context.
