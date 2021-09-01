# Cloud Custodian Joint-review 

This joint-review relied heavily on the [self-assessment](https://docs.google.com/document/d/1s88ifDtFJzGX1O_ve6HM6_vbTkpsWDKWRDuxt9RHdcs) 
provided by the Cloud Custodian (c7n) project. The TAG volunteers collaborated with the project volunteers to review the self-assessment, and discussed the
operational scenarios pertinent to a typical c7n user.

The general opinion of the volunteer review team is that the c7n project clearly demonstrates a commitment to security, and a willingness to improve security for the 
benefit of the user community.  That said, the project volunteers could use additional security volunteers to assist in ongoing reviews, security control 
enhancements, and when needed to debug and fix security flaws.  As a utility tool, the review team feels the primary threat to the project is compromise of the code
itself, and packaging and distribution of the tool or its dependencies - rather than an attack on individual c7n deployments. A secondary concern would the disabling
or DoS of a deployment by an internal or external actor - thus giving the user a false sense of security when c7n is disabled. A tertiary concern is the
provisioning of too permissive a policy within the cloud environment for c7n; this would make it an attrative target for lateral movement and other activities
for an attacker who had gained access via some other means. Finally, comprehensive support for Kubernetes is not currently available; the review team would like to see more
active support for Kubernetes and other CNCF projects as c7n matures.

A “hands-on” penetration test was not performed, nor was a comprehensive code review, code fuzzing, or code audit.  The review team strongly recommends pursuing this as a 
follow up with appropriate CNCF support and guidance.

## Table of Contents

* [Metadata](#metadata)
  * [Security links](#security-links)
* [Overview](#overview)
  * [Background](#background)
  * [Goals](#goals)
  * [Non-goals](#non-goals)
* [Joint-review use](#joint-review-use)
* [Intended use](#intended-use)
* [Project design](#project-design)
  * [Functions and features](#functions-and-features)
    * [Security functions and features](#security-functions-and-features)
* [Configuration and set-up](#configuration-and-set-up)
* [Project compliance](#project-compliance)
* [Security analysis](#security-analysis)
* [Secure development practices](#secure-development-practices)
* [Security issue resolution](#security-issue-resolution)
  * [Closed security issues and vulnerabilities](#closed-security-issues-and-vulnerabilities)
* [Roadmap](#roadmap)
* [Appendix](#appendix)

## Metadata

| Project Home                    | https://github.com/cloud-custodian                                                                               |
|---------------------------------|------------------------------------------------------------------------------------------------------------------|
| Security Provider               | Yes, however many users implement Cloud Custodian for non security purposes, i.e., cost optimization, governance |
| Languages                       | Python, YAML |
| Incubation PR                   | https://github.com/cncf/toc/pull/480 |
| SIG-Security Assessment Request | https://github.com/cncf/sig-security/issues/307 |
| Self-Assessment Document        | https://docs.google.com/document/d/1s88ifDtFJzGX1O_ve6HM6_vbTkpsWDKWRDuxt9RHdcs/ |
| SBOM                            | [poetry configuration in pyproject.toml](https://github.com/cloud-custodian/cloud-custodian/blob/master/pyproject.toml), [poetry lock file](https://github.com/cloud-custodian/cloud-custodian/blob/master/poetry.lock), [pip requirements file](https://github.com/cloud-custodian/cloud-custodian/blob/master/requirements.txt), [release process](https://cloudcustodian.io/docs/developer/packaging.html) |

### Security links

| Item | Ref or URL |
| -- | -- |
| Security Mailing List  | security@cloudcustodian.io |
| Threat Model (2019) | https://docs.google.com/document/d/1S9zQZaT6G1TA3IAx6YNL0f7G938xaFZ-bziszhuxMZg |

## Overview

Cloud Custodian is a YAML DSL-based stateless rules engine for cloud auditing, management, and governance.

Cloud Custodian’s policy-as-code:

* Enables deployment of detection controls that enforce or report compliance to organizational policies.
* Supports real-time detection, reporting/notification, and remediation via an API audit trail integration and serverless runtime support.
* Provides consistent outputs and telemetry (blob, logs, trace, metrics) across policies with outputs to provider native services.
* Requires minimal installation requirements, and can be used as a CLI query/investigative or operations tool in a compliance-as-code environment.

### Background

Cloud Custodian is a YAML DSL-based stateless rules engine operated via a CLI, easily triggered from a cloud-resident cron task or containerized workload. 
It supports the practice of policy-as-code — policy being expressed as rules that the CLI uses to check cloud configurations.  
The code artifacts serve as documentation of the configuration policies in effect in a given environment. NOTE: Humans must map written compliance or security 
documented policies to specific Custodian YAML first.

At the moment, Cloud Custodian supports the most common public cloud providers: AWS, Azure, and GCP. Executed against these environments, 
with the corresponding YAML rules, Cloud Custodian can check cloud settings via the clouds’ APIs for encryption and access requirements, 
tagging policies, cost management, removal of abandoned resources, and automated scheduling of resources during off-hours.

Custodian currently has [prototyped Kubernetes cluster support as documented here](https://github.com/cloud-custodian/cloud-custodian/pull/2760).

### Project Goals

Cloud Custodian integrates with the cloud APIs of each provider to provide checks for enforcement of resource 
provisioning and configuration policy goals. It can be run as a simple cron job on a server to execute against existing resources. 
Cloud Custodian is essentially a rules engine for managing public cloud accounts and resources. It allows users to define custom yaml policies as code.
It fills a gap where someone needs rules to constrain resource deployment and needs to detect and/or remediate unexpected or unauthorized resource 
configuration changes, both in a single cloud or multi-cloud environment.

### Project Non-goals

Cloud Custodian is not a linter, nor a container runtime engine, nor a general purpose policy engine, or an inventory database.  
It is not very opinionated on what policies should be defined - only that policy expression is sufficient to define things like a 
CIS Benchmark policy, or define remediation policies for policy violations.  

While it can be used as a security tool, the project itself has asserted it is useful for cost optimization and other non-security purposes. It might
be more accurately described as a configuration checking tool, where security is just one type of configuration it can check. 

It is left to the user to understand how to map security policy (in human terms) to configuration checks (c7n yaml policies).

## Joint-review Use

This joint-review relied heavily on materials, primarily a [Google Doc](https://docs.google.com/document/d/1s88ifDtFJzGX1O_ve6HM6_vbTkpsWDKWRDuxt9RHdcs) 
created by the project team. This document does not intend to provide a security audit of c7n and is not intended to be used in lieu of a security audit. 
This document provides users of c7n with a risk and threat overview of c7n. When taken with the self-assessment, this joint-review may provide the community 
with context and a starting point as part of a formal security audit.

## Intended Use Case

The intended use of Cloud Custodian is cloud management. In particular, Cloud Custodian allows users to audit, monitor, and operationalize configuration checks.
Rules can be defined in the c7n yaml that define remediation actions when a rule is triggered based on configuration checks.

## Target Users

Per the sig-security user personas, Cloud Custodian serves the needs of:

* Enterprise Operator: Cloud Custodian provides reporting and unified metrics that can be consumed by a variety of dashboard platforms, allowing an enterprise operator to not only survey and manage resources, but use the monitoring tools of their choice. This allows an Enterprise Operator to make administrative decisions and take action according to an organization’s policies.     
* Quota Operator: Because Cloud Custodian leverages the simplicity of YAML and a CLI, a Quota Operator with more of a financial background than an engineering background can still use it. The same Custodian outputs the Enterprise Operator can use to produce a centralized survey of an organization’s resources and resource activity, a Quota Operator can use to determine resource boundaries from the same reports and metrics. When a resource exceeds its quota, Cloud Custodian can be configured to notify a Quota Operator of it.  
* Third Party Security Product/System: Cloud Custodian’s YAML configuration file enables resource tagging based on filters, and depending on the policy, these tags can be configured to trigger specific actions. 
* Platform Implementer: Since Cloud Custodian enables event-based real-time policy enforcement, a Platform Implementer can use the CLI to serve the intersecting needs of the Enterprise Operator, Quota Operator, Security and Compliance Administrators, and Developers. Event-based and real-time Cloud Custodian policies can output reports and metrics for monitoring, respond to policy changes and tag affected resources, enforce compliance, and prevent development from unintentionally harming an organization’s cloud. 

### Target Capabilities and How Custodian Impacts. 

| Competency Title                              | Competency Type | Competency Description |
|-----------------------------------------------|-----------------|------------------------|
| Asset and Inventory Management                | Organizational  | Custodian adds capabilities related to the process of identifying, developing, operating, maintaining, upgrading, and disposing of cloud native resources. |
| Business Continuity                           | Organizational  | Custodian adds capabilities related to business continuity planning and continuity of operations to help ensure an organization can prevent and overcome serious incidents or disasters and quickly resume normal operations within a reasonable timeframe. |
| Collection Operations                         | Technical       | Custodian adds capabilities related to executing the collection of cybersecurity information to develop intelligence using appropriate strategies. |
| Data Management                               | Organizational  | Custodian adds capabilities related to the development and execution of data management plans, programs, practices, processes, architectures, and tools across all stages of the data lifecycle. Includes processes around the creation, storage, archiving, discovery, access, disposal, enhancement, and reuse of data and information assets. |
| Data Privacy                                  | Organizational  | Custodian adds capabilities related to the proper handling of data to protect individuals’ privacy, including addressing whether and how data is shared and with whom; how data is collected and stored; and legal and regulatory compliance. |
| Data Security                                 | Technical       | Custodian adds capabilities related to the methods and procedures that protect data and information systems by ensuring their confidentialty, integrity, and availability. |
| Digital Forensics                             | Technical       | Custodian adds capabilities related to the application of tools and techniques used in data recovery and preservation of electronic evidence. Includes the collection, processing, preservation, analysis, and presentation of computer-related evidence in support of network vulnerability mitigation and criminal, fraud, counterintelligence, or law enforcement investigations. |
| Encryption                                    | Technical       | Custodian adds capabilities related to the cryptographic process of transforming data to ensure that it can only be read by the person who is authorized to access it; specifically by helping ensure configuration is configured correctly. |
| Enterprise Architecture                       | Technical       | Custodian adds capabilities in support of the principles, concepts, and methods of enterprise architecture to align technology strategy, plans, and systems with the mission, goals, structure, and processes of the organization. |
| Incident Management                           | Technical       | Custodian adds capabilities related to the tactics, technologies, principles, and processes to analyze, prioritize, and handle cybersecurity incidents. |
| Information Systems and Network Security      | Technical       | Custodian adds capabilities related to the methods, tools, and procedures—including development of information security plans—to detect, respond, and protect information, information systems, and networks from risks and to provide or restore security of information systems and network services. |
| Information Technology Assessment             | Technical       | Custodian adds capabilities related to the principles, methods, and tools (for example, surveys, system performance measures) to assess the effectiveness and practicality of technology systems. |
| Infrastructure Design                         | Technical       | Custodian adds capabilities related to the architecture and topology of software, hardware, and networks,, their components and associated protocols and standards, and how they operate and integrate with one another and with associated controlling software. |
| Intelligence Analysis                         | Technical       | Custodian adds capabilities related to the application of individual and collective cognitive methods to collect, process, and interpret data about an enemy to answer tactical questions about current operations or to predict future behavior. |
| Law, Policy, and Compliance                   | Organizational  | Custodian adds capabilities related to compliance with laws, regulations, and policies that can impact organizational activities. |
| Modeling and Simulation                       | Technical       | Custodian adds capabilities related to modeling and simulation tools and techniques to plan and conduct test and evaluation programs, characterize systems support decisions involving requirements, evaluate design alternatives, or support operational preparation. |
| Operations Support                            | Technical       | Custodian adds capabilities related to the policies and procedures used to ensure the production or delivery of products and services, including tools and mechanisms for distributing new or enhanced hardware and software. |
| Policy Development                            | Leadership      | Custodian adds capabilities related to the process of creating, auditing, and enforcing cloud policies for an organization. |
| Process/Workload/Resource Control                               | Organizational  | Custodian adds capabilities related to the active changing of processes/workloads/resources based on the results of Custodian monitoring. |
| Risk Management                               | Organizational  | Custodian adds capabilities in support of risk assessment and mitigation, including assessment of failures and their consequences.                 |
| System Administration                         | Technical       | Custodian adds capabilities related to the installation, configuration, troubleshooting, and maintenance of cloud systems to ensure their confidentiality, integrity, and availability. Includes the management of accounts, resources, as well as access control, passwords, and resource creation and administration. |
| Systems Testing and Evaluation                | Technical       | Custodian adds capabilities related to the principles, methods, and tools for developing, administering, and analyzing systems test procedures to evaluate, verify, and validate technical, functional, and performance characteristics (including interoperability) of systems or elements of systems incorporating technology. Includes the identification of critical operational issues. |
| Threat Analysis                               | Technical       | Custodian adds capabilities related to the identification and assessment of adversaries’ or foreign intelligence entities’ cybersecurity attack capabilities and activities. Includes awareness and evaluation of internal and external information vulnerabilities that may be at risk to cyber-attacks and the production of findings to help initialize or support law enforcement and counterintelligence investigations or activities. |
| Vulnerabilities Assessment                    | Technical       | Custodian adds capabilities related to the principles, methods, and tools for assessing vulnerabilities and developing or recommending appropriate mitigation countermeasures. |

## Operation

Cloud Custodian can be bound to serverless event streams across multiple cloud providers that maps to security, operations, and governance use cases. 
Custodian adheres to a compliance as code principle, so you can validate, dry-run, and review changes to your policies.

## Project Design

### Features

-   Support for public cloud services and resources with a
    library of actions and filters to build policies with.
-   Supports filtering on resources with nested boolean
    conditions.
-   Dry run any policy to see what it would do.
-   Automatically provisions serverless functions and event sources (AWS CloudWatchEvents, AWS Config Rules, Azure EventGrid, GCP
    AuditLog & Pub/Sub, etc)
-   Cloud provider native metrics outputs on resources that matched a
    policy
-   Structured outputs into cloud native object storage of which
    resources matched a policy.
-   Cache usage to minimize api calls.
-   Supports multi-account/subscription/project usage.

### Components

|         Name        | Comments |
|:-------------------:|:-----------------------------:|
| Policies            | “Simple YAML configuration files that enable users to specify policies on a resource type and are constructed from a vocabulary of filters and actions. “|
| Cloud Logs          | “Logs enables you to centralize the logs from all of your systems, applications, and services that you use, in a single, highly scalable service.”|
| Cloud Metrics       | “Metrics can load all the metrics in your account (both AWS resource metrics and application metrics that you provide) for search, graphing, and alarms.  Metric data is kept for 15 months, enabling you to view both up-to-the-minute data and historical data.”|
| Object Storage      | “Object Storage is storage for the Internet. It is designed to make web-scale computing easier for developers.  Cloud Storage has a simple web services interface that you can use to store and retrieve any amount of data, at any time, from anywhere on the web. It gives any developer access to the same highly scalable, reliable, fast, inexpensive data storage infrastructure that Amazon uses to run its own global network of websites. The service aims to maximize benefits of scale and to pass those benefits on to developers.” |
| Cloud Functions     | “Serverless Computing is a compute service that lets you run code without provisioning or managing servers. Functions execute your code only when needed and scales automatically, from a few requests per day to thousands per second. You pay only for the compute time you consume - there is no charge when your code is not running. With AWS Lambda, you can run code for virtually any type of application or backend service - all with zero administration.”|
| Configuration Rules | “Using Configurations, you can assess your resource configurations and resource changes for compliance against the built-in or custom rules.Create your own custom rules in functions as a service that define your internal best practices and guidelines for resource configurations.”|

#### Security functions and features

The project makes the following assumptions regarding mature operational practices when using Custodian in order to limit the attack surface: 

* Hardened compute execution environment with minimal additional software components running and minimal inbound access.
* Custodian requires cloud credentials (role, service account/principal) with elevated permissions for introspection and remediation. Access to those credentials should be restricted to the Custodian compute execution environment.
* Custodian cloud credentials should be limited in scope to what is necessary for custodian policy execution, i.e., minimized access.
* As the policy files are considered trusted inputs -- and per IaaC best practices -- an audit trail is implemented to validate the assurance of the supply chain through rigorous version and change control mechanisms.

At a project level, to mitigate primary threats to the project and code, the project uses GitHub’s security alerts (dependabot) scanning for CVEs on the dependency graph. Additionally, PRs are reviewed by a growing number of committers to prevent malicious code to be accepted into the code base.

Beyond these, there are few security-specific features, as the project assumes the host cloud and corporate environment itself is hardened and trusted.  It remains to see how useful these assumptions would be in a Zero Trust Architecture (ZTA).

## Configuration and Set-Up

c7n requires a cloud provider IAM policy to access the resources (via API) that it needs to check.  In remediation cases, it will need write access.  c7n needs a policy yaml available to it from the shell.  Logs may be created (via stdout or specific cloud logging mechanisms) and these need to be configured and provisioned accordingly (including the filtering of any sensitive data based on logging verbosity.)  The sensitivity of the resultant output (including logging to stdout) depends on the use case and may need to be appropriately restricted.

Since c7n delegates all security resposibilities to the user and their cloud IAM and execution environment, there is little documentation about potential security risks/trade-offs of the default IAM policy or other cloud environment configuration.

## Project Compliance

As of September 2021 there is no external audit or compliance report available to review.

[A threat model was constructed previously by the project](https://docs.google.com/document/d/1S9zQZaT6G1TA3IAx6YNL0f7G938xaFZ-bziszhuxMZg/).

## Security Analysis

### Attacker Motivations

|          Actor          | Description |
|:-----------------------:|:-------:|
| Malicious Internal User | An individual, such as an administrator or developer, who leverages their privileged access to Cloud Custodian to create a disruption. |
| Internal Attacker       | An attacker who transited one or more trust boundaries and has access to the cloud provider environment in which Cloud Custodian is hosted in. |
| External Attacker       | An attacker who is external to the cloud provider environment in which Cloud Custodian is hosted in and is unauthenticated. |
| Administrator           | An actual administrator of an account in a given cloud provider environment, tasked with operating and maintaining Cloud Custodian as a whole.     |
| Policy Developer        | A developer who is deploying changes to Cloud Custodian policies, either directly or via source code repositories. | 
| Project Developer       | A developer who is deploying changes to Cloud Custodian itself, either directly via custodian’s source code repositories, or by injecting malicious dependency code into the build/packaging/distribution.                                 | 
| End User                | An external user of Cloud Custodian. |

### [MITRE ATT&CK](https://attack.mitre.org/matrices/enterprise/cloud/) Review

TTPs Considered include:

* [Drive-by Compromise](https://attack.mitre.org/techniques/T1189/) - it is easy to imagine a wateringhole attack on c7n users to update to a new version or apply a c7n security patch which leads to distribution of a malicious custodian package.
* [Phishing](https://attack.mitre.org/techniques/T1566/), [Internal Spearphishing](https://attack.mitre.org/techniques/T1534/) - an attacker may use widespread knowledge of an organization's use of c7n as a means to target email "alerts" about c7n policy findings to legitimate operators who then engage with the attacker's spoofed or legitimate looking site to conduct further attacks. c7n's mailer utility could be abused to send malicious but seemingly legitimate emails to admins. Even if there is no links to use for operator compromise, just confusing or redirecting admins could be part of a well-orchestrated attack plan.
* [Trusted Relationship](https://attack.mitre.org/techniques/T1199/) - while not a relationship, per se, admins who casually download c7n source or package distributions from the project site can be easily fooled into downloading malicious packages.  However, like codecov, the actual project github repo could be compromised and distribute malicious code or policies.
* [User Execution](https://attack.mitre.org/techniques/T1204) - certainly the users (or service accounts) allowed to execute c7n, and the frequency and modality (ie cli vs serverless task) should be explicitly defined and ideally enforced by some automated means; unusal users executing c7n, or at an increased frequency should raise alarms; not running c7n for a prolonged period could indicate a DoS or other tampering.
* [Account Manipulation](https://attack.mitre.org/techniques/T1098/), [Create Account](https://attack.mitre.org/techniques/T1136/), [Domain Policy Modification](https://attack.mitre.org/techniques/T1484/) - certainly if c7n is running with an IAM/AD/LDAP role with write permissions to access control services, c7n itself could be used for privilege elevation attacks, simply by manipulating the c7n policy yaml. See Valid Accounts item below.
* [Implant Internal Image](https://attack.mitre.org/techniques/T1525/) - it is plausible that a docker or other container distribution of c7n could become available which is malicious.  Inspection of running containers could be easily overlooked and specifically whitelisted as a security tool if seen running what looks to be a legitimate c7n task.  This could lull DevSecOps into a false sense of security as c7 would be regarded as a trusted tool.
* [Valid Accounts](https://attack.mitre.org/techniques/T1078/) - this is the most likely organizational risk using c7n.  Since c7n itself does not provide a tool or documentation on using a least privilege, minimal permission policy, this is left as an exercise to the user.  Users who casually grant expansive permissions to c7n risk attackers exploiting this privleged access.  Worse, if users do not separate read only c7n actions from remedial write actions, then any abuse of the permissions - even accidental misuse - could increase risks to resources and other accounts and security services.
* [Impair Defenses](https://attack.mitre.org/techniques/T1562/) - certainly attackers may attempt to disable or impede c7n, either by preventing execution, or by tampering with the yaml file content, or to prevent alerting or remediation mechanisms, or to DoS the resources running c7n.  Worse, if write permissions are granted to c7n's service/user role, c7n itself could be used to disable or impede other security services.  Even innocuous additions to policy yaml could be perceived as legitimate attempts to increase security, but could be abused to increase noise-to-signal and lull DevSecOps into ignoring "false alarms" or induce alert fatigue. There should be a thoughtful balance of actively monitoring c7n alerts to ensure proper controls and operation, but not so much that subtle anomoalies are missed.
* [Modify Cloud Compute Infrastructure](https://attack.mitre.org/techniques/T1578/), [Data Staging](https://attack.mitre.org/techniques/T1074/), [Data Destruction](https://attack.mitre.org/techniques/T1485/) - as with Account Manipulation, if c7n is running with an IAM/AD/LDAP role with write permissions to IaaS or PaaS services, c7n itself could be used for infrastructure attacks, simply by manipulating the c7n policy yaml. This includes creating temporary resources for staging exfiltration, or deleting data storage resources.
* [Unused Cloud Regions](https://attack.mitre.org/techniques/T1535/) - operators should have checks on regions running c7n who should not be running c7n. Similar to this is multiple "organizations" or "subscriptions" that are rarely reviewed.
* [Unsecured Credentials](https://attack.mitre.org/techniques/T1552/) - c7n documentation and self-assessment largely delegates this to the operator.  As such, it is plausible lazy operators would use hard coded keys or other credentials in scripts or repos, exposing potentially expansive permissions.  
* [Discovery](https://attack.mitre.org/tactics/TA0007/) - broadly speaking, all of the techniques enumerated under the Discovery tactic are exposed by a malicious c7n user, or by use of tampered c7n code or yaml. This is c7n's intended purpose so in the hands of a sloppy operator or successful threat actor, c7n itself becomes a potent discovery and monitoring tool. Simply intercepting or cc:ing oneself to the alerts or logs could allow for effective reconnaissance.
* [Data from Cloud Storage Object](https://attack.mitre.org/techniques/T1530/) - as noted above, logs or outputs from c7n may be sensitive and should be controlled or purged appropriately
* [Resource Hijacking](https://attack.mitre.org/techniques/T1496/) - if c7n code is modified or a false package distributed, a seemingly legitimate c7n task could run that performed other actions, like crypto mining or other resource abuses.  As a trusted security tool, c7n activity may go unnoticed or casually inspected.

