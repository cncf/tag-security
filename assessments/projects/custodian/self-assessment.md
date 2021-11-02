<table>
  <tr>
   <td>Document status
   </td>
   <td>Read-Only (onto joint review below) 
   </td>
  </tr>
  <tr>
   <td>Original document (Obsolete)
   </td>
   <td><a href="https://docs.google.com/document/d/12Ym5CHhgViRK8mLBcpZ3TH9BTPbcBKj9kOFVn-orreM/edit#heading=h.szhy4dfseirz">https://docs.google.com/document/d/12Ym5CHhgViRK8mLBcpZ3TH9BTPbcBKj9kOFVn-orreM/edit#heading=h.szhy4dfseirz</a>
   </td>
  </tr>
  <tr>
   <td>sig-security self assessment template 
   </td>
   <td><a href="https://github.com/cncf/sig-security/blob/master/assessments/guide/self-assessment.md">https://github.com/cncf/sig-security/blob/master/assessments/guide/self-assessment.md</a>
   </td>
  </tr>
  <tr>
   <td><strong>Joint Review Document (Current focus)</strong>
   </td>
   <td><a href="https://docs.google.com/document/d/1IbrFNz2lIICema0NfF27HflzsMcTQGxH22SubLUM47I/edit#bookmark=id.gjdgxs">https://docs.google.com/document/d/1IbrFNz2lIICema0NfF27HflzsMcTQGxH22SubLUM47I/edit#bookmark=id.gjdgxs</a>
   </td>
  </tr>
  <tr>
   <td>Notes
   </td>
   <td>
<ul>

<li><a href="https://github.com/cncf/sig-security/blob/master/assessments/projects/opa/self-assessment.md">Example self-assessment</a>

<li><a href="https://stacklet.atlassian.net/browse/MKT-28?atlOrigin=eyJpIjoiZjIxZGMwMTk4MjY3NDBiM2IwODAwZGVjYTZiNTEzNTAiLCJwIjoiaiJ9">Associated Jira ticket</a>

<li><a href="https://github.com/liz-acosta/just-some-stuff/blob/main/20210317-sig-security-review.md">Markdown file in Git</a>

<li><a href="https://github.com/liz-acosta/just-some-stuff/blob/main/20210317-sig-security-review.md">Markdown in Git</a> 
</li>
</ul>
   </td>
  </tr>
</table>



# Table of Contents


[TOC]



# Metadata


<table>
  <tr>
   <td>Software
   </td>
   <td><a href="https://github.com/cloud-custodian">https://github.com/cloud-custodian</a>
   </td>
  </tr>
  <tr>
   <td>Security Provider
   </td>
   <td>Yes, however many users implement Cloud Custodian for non security purposes, i.e., cost optimization, governance
   </td>
  </tr>
  <tr>
   <td>Languages
   </td>
   <td>Python
   </td>
  </tr>
  <tr>
   <td>SBOM
   </td>
   <td><a href="https://github.com/cncf/toc/pull/480">https://github.com/cncf/toc/pull/480</a>
   </td>
  </tr>
  <tr>
   <td>SIG-Security Assessment Request
   </td>
   <td><a href="https://github.com/cncf/sig-security/issues/307">https://github.com/cncf/sig-security/issues/307</a>
   </td>
  </tr>
</table>



---


# Overview

Cloud Custodian is a YAML DSL-based stateless rules engine for cloud auditing, management, and governance.

Cloud Custodian’s policy-as-code:

* Enables deployment of detection controls that enforce or report compliance to organizational policies.
* Supports real-time detection, reporting/notification, and remediation via an API audit trail integration and serverless runtime support.
* Provides consistent outputs and telemetry (blob, logs, trace, metrics) across policies with outputs to provider native services.
* Possesses minimal installation requirements, and can be used as a CLI query/investigative or operations tool in a compliance-as-code environment.


## Background

As more and more organizations migrate into the cloud, the need to automate, audit, and monitor governance becomes paramount to taking advantage of the benefits of self-service and on-demand infrastructure. In addition to ensuring cloud networking best practices, organizations need to be able to customize cloud governance for their own particular needs. This might mean unique privacy regulations or stitching together different cloud providers.

Cloud policies form the foundation of isolating an organization’s remote infrastructure from the rest of the public cloud. This chiefly concerns securing the contents of an organization’s cloud, however, policies also serve as a means of cloud management, cost optimization, and garbage collection. 

 

Cloud Custodian is a YAML DSL-based stateless rules engine operated via a CLI. It is based on the practice of policy-as-code allowing organizations to enable detection controls ensuring adherence to organizational policies. Policy-as-code takes advantage of some of the best practices of software engineering to policy and governance such as version control, code review, testing, and continuous integration and deployment tools. The code artifacts serve as documentation of the policies in effect in a given environment.

At the moment, Cloud Custodian is tailored to seamlessly integrate with the most common cloud public cloud providers: AWS, Azure, and GCP. Within these environments, Cloud Custodian ensures real-time compliance with security policies such as encryption and access requirements, tagging policies, cost management, removal of abandoned resources, and automated scheduling of resources during off-hours.

Cloud Custodian is intentionally agnostic and this lack of dogma allows Custodian to be easily adapted to existing organizational cloud architecture and workflows. Cloud Custodian requires no update to an organization’s existing credential management, relying on the established credential configurations of each cloud provider to access the permissions needed to perform the policies prescribed to Custodian. (Documentation regarding the procurement of credentials for AWS, Azure, and GCP can be found in the Appendix.)

Additionally, Cloud Custodian mimics the behavior of services and applications native to each cloud provider, allowing it to easily fit into an organization’s workflows. For example, Custodian policies can be configured to send outputs to GCP Cloud Security Command Center, or, alternately, AWS Security Hub.

Cloud Custodian plans to support other major providers and cloud architecture in the future, in particular, support for Kubernetes is in alpha at the moment. You can view [the Kubernetes roadmap here](https://github.com/cloud-custodian/cloud-custodian/projects/8).


## Goals

The goal of Cloud Custodian is to consolidate the many ad-hoc scripts developers often have to write to enforce policies between cloud resources and cloud providers into a lightweight, flexible tool.

* Abstraction of cloud policy enforcement into a simple YAML-based DSL that can be used to write both complex workflows and simple queries
* Seamless integration with the three most common cloud providers: AWS, Azure, and GCP
* The option to enforce policies in real-time, i.e., event triggers
* Unified metrics and reporting, allowing organizations to make smart cloud management decisions
* Cost optimization such as the automation of resource scheduling for non-business hours and garbage collection of unused resources
* The ability to run locally or in the cloud

## Non-Goals

The non-goals of Cloud Custodian are intended to create more flexibility so that Cloud Custodian operates as a complement to the existing remote infrastructure of an organization rather than a constraint.

These non-goals include:

* A separate Cloud Custodian dashboard: Since most organizations already use a myriad of dashboards, Custodian instead focuses on outputting structured data, metrics, and logs that can be consumed by an organization’s established dashboards and maintains integrations with cloud provider dashboards, i.e., AWS SSM Ops Center, Security Hub, GCP Cloud Security Command Center, and Azure Application Insights
* IAM/RBAC-based preventative management: In general, Custodian encourages users to utilize the capabilities built into an infrastructure provider to implement controls within an environment, however, Custodian can implement detection controls regarding IAM/RBAC permissions to govern those definitions and assignments, e.g., check that no compute instance has a role/service principal that allows it to create a user 

## Intended Use

The intended use of Cloud Custodian is cloud management. In particular, Cloud Custodian is a response to the ad-hoc policy scripts mentioned above that inevitably become almost impossible to audit, monitor, and operationalize. When executed, Cloud Custodian policy files can filter on resource properties, tag resources, and take action on rules.


## Use Cases

* Identifying and remediating load balancers or storage buckets that are not configured for logging
* Enforcing encryption in real-time, e.g., enabling missing encryption on S3 buckets
* Turning off development servers/clusters and databases during non-business hours in order to reduce spending
* Finding underutilized resources and emailing their creator to reduce the size
* Enforcing tag compliance policies on resources
* Finding resources with embedded access control policies that permit inappropriate access across organization boundaries
* Responding to a security event as a remediation tool with snapshots, disks, network isolation, cloud credentials updates, and installation of forensics tools

## Target Users

Per the [sig-security user personas](https://github.com/cncf/sig-security/blob/23ef6827672fb4b4ef85af489492c5081bb4aaaf/usecases.md), Cloud Custodian serves the needs of:

* [Enterprise Operator](https://github.com/cncf/sig-security/blob/23ef6827672fb4b4ef85af489492c5081bb4aaaf/usecases.md#enterprise): Cloud Custodian provides reporting and unified metrics that can be consumed by a variety of dashboard platforms, allowing an enterprise operator to not only survey and manage resources, but use the monitoring tools of their choice. This allows an Enterprise Operator to make administrative decisions and take action according to an organization’s policies.     
* [Quota Operator](https://github.com/cncf/sig-security/blob/23ef6827672fb4b4ef85af489492c5081bb4aaaf/usecases.md#quota): Because Cloud Custodian leverages the simplicity of YAML and a CLI, a Quota Operator with more of a financial background than an engineering background can still use it. The same Custodian outputs the Enterprise Operator can use to produce a centralized survey of an organization’s resources and resource activity, a Quota Operator can use to determine resource boundaries from the same reports and metrics. When a resource exceeds its quota, Cloud Custodian can be configured to notify a Quota Operator of it.  
* [Third Party Security Product/System](https://github.com/cncf/sig-security/blob/23ef6827672fb4b4ef85af489492c5081bb4aaaf/usecases.md#third-party-security-productsystem): Cloud Custodian’s YAML configuration file enables resource tagging based on filters, and depending on the policy, these tags can be configured to trigger specific actions. 
* [Platform Implementer](https://github.com/cncf/sig-security/blob/23ef6827672fb4b4ef85af489492c5081bb4aaaf/usecases.md#platform-implementer): Since Cloud Custodian enables event-based real-time policy enforcement, a Platform Implementer can use the CLI to serve the intersecting needs of the Enterprise Operator, Quota Operator, Security and Compliance Administrators, and Developers. Event-based and real-time Cloud Custodian policies can output reports and metrics for monitoring, respond to policy changes and tag affected resources, enforce compliance, and prevent development from unintentionally harming an organization’s cloud. 


---


# Project Design

## High-Level Architecture 

At a high level, Cloud Custodian is designed to operate on the aforementioned YAML configuration files. The YAML file is composed of a `filter` and `actions` syntax. Upon execution, the runtime executable calls a cloud provider’s APIs to retrieve the current information on the resources identified in the policy files. Cloud Custodian then generates an output based on what the YAML file calls for.

Cloud Custodian can operate in pull, periodic, or event-based modes. Regardless of the mode, Cloud Custodian itself is stateless. This stateless design allows the Cloud Custodian rules engine to determine policy adherence using the provider control panel.

<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")

## The YAML File

Custodian policies are written in simple YAML configuration files.

In this YAML file, the user specifies the resource type subject to the policy. The resource types correspond to an underlying service feature. A resource type is defined in the codebase with the metadata provided by the API resource query calls. Then a plugin pattern is used to manage the differences in resource types between cloud providers. This allows a user to author policies based on this set of resource types in a YAML file.

Each policy has a set of generic filters and resource type-specific filters that can be combined in various forms, e.g., nested arrays of and/or/not, to filter resources to the desired collection. These are then processed by a list of actions. The intent is to enable the reuse of filters and actions across many different semantic policies.

The following are definitions of the Cloud Custodian policy syntax:


<table>
  <tr>
   <td><strong>name</strong>
   </td>
   <td>The name of the policy
   </td>
  </tr>
  <tr>
   <td><strong>resource</strong>
   </td>
   <td>The resource type subject to the policy
   </td>
  </tr>
  <tr>
   <td><strong>conditions</strong>
   </td>
   <td>In more advanced usage, this defines the conditions required to execute a policy allowing the ability to skip policies that do not meet these requirements (more information can be found in the <a href="https://cloudcustodian.io/docs/quickstart/advanced.html?highlight=conditions#conditional-policy-execution">Cloud Custodian documentation</a>)
   </td>
  </tr>
  <tr>
   <td><strong>description</strong>
   </td>
   <td>A human-friendly description of the policy
   </td>
  </tr>
  <tr>
   <td><strong>mode</strong>
   </td>
   <td>The mode in which Cloud Custodian will run
   </td>
  </tr>
  <tr>
   <td><strong>filters</strong>
   </td>
   <td>The attributes and properties that determine the set of resources to act upon  
   </td>
  </tr>
  <tr>
   <td><strong>actions</strong>
   </td>
   <td>The operations to perform upon the filtered resources
   </td>
  </tr>
</table>


In the example below, the policy `root-user-login-detected` concerns the `account` resource type. The policy operates in event mode and the event that triggers the policy is `ConsoleLogin.` Using familiar conditional syntax, this policy filters upon root user console logins. According to this policy, if a `ConsoleLogin` event occurs and the `userIdentity` is type `Root`, then the indicated actions will occur: a notification email will be sent to the organization’s cloud administrative and security teams alerting them to a root user login. 


```
policies:

  - name: root-user-login-detected
    resource: account
    description: |
      Notifies Security and Cloud Admins teams on any AWS root user console logins
    mode:
       type: cloudtrail
       events:
          - ConsoleLogin
    filters:
       - type: event
         key: "detail.userIdentity.type"
         value_type: swap
         op: inUbuntu/
         value: Root
    actions:
      - type: notify
        template: default.html
        priority_header: 1
        subject: "Root User Login Detected! - [custodian {{ account }} - {{ region }}]"
        violation_desc: "A User Has Logged Into the AWS Console With The Root User:"
        action_desc: |
            "Please investigate and if needed revoke the root users session along
            with any other restrictive actions if it's an unapproved root login"
        to:
          - CloudAdmins@Company.com
          - SecurityTeam@Company.com
        transport:
          type: sqs
          queue: https://sqs.us-east-1.amazonaws.com/12345678900/cloud-custodian-mailer
          region: us-east-1
```


The result is real-time detection of suspicious activity. Alternately, Custodian can run as a simple cron job on a server that executes against large existing fleets.

More example policies can be found in [the Cloud Custodian documentation](https://cloudcustodian.io/docs/aws/examples/index.html).


---


# Operation

Cloud Custodian is designed to operate as a runtime executable with a CLI. The CLI allows for both user interaction and for system interaction where a “system” can include -- but is not limited to -- a CI/CD pipeline.

The CLI consumes YAML DSL policy files as input and executes the rules defined in them. The Cloud Custodian CLI has an option for policy validation which checks a policy file for errors. The CLI also has a `dry run` option which can query the cloud provider API for resources that match the policy filters, then save that resource information to an output file for review prior to execution.

It is recommended that Cloud Custodian users configure a VCS repo for their policies and run a CI system to perform validation and dry-run in addition to code review on changed policies.

In addition to the policy files, the CLI includes optional arguments that can scope the runtime execution to a given cloud region, account configuration, and/or IAM role.

The output of Cloud Custodian can be either verbose or quiet and can optionally include metrics on policy execution. The output data can be directed to cloud provider native logging solutions, i.e., CloudWatch logs, Stackdriver, or Azure AppInsights, or cloud provider blob storage. In addition to generating output data, Cloud Custodian policy files can be configured to take action on cloud resources that do not conform to the policies.

Cloud Custodian can operate in several different modes. The default mode is called `pull` and is used to execute policies directly from the CLI. Other execution modes are event-based, which provision a serverless function of the infrastructure provider and event subscribers.

The `max-resources` argument is an additional level of protection that prevents the execution of actions if the number of filtered resources exceeds a user-defined threshold. This limits the scope of impact when executing policies and offers the user further control of their cloud.  


## Installation

Cloud Custodian is a Python project that can be installed either via Docker or pip install. The project documentation covers [installation and usage](https://cloudcustodian.io/docs/quickstart/index.html).


## Writing an Example Policy

A quickstart for Cloud Custodian with AWS can be found [here](https://cloudcustodian.io/docs/aws/gettingstarted.html) and assumes the user has an AWS account available to them. In summary, this is how to write and run an example policy:


<table>
  <tr>
   <td>
<ol>

<li>IAM setup
</li>
</ol>
   </td>
   <td>Running Cloud Custodian against a cloud account requires permissions via either an IAM role, Azure service principal, or GCP service account with appropriate permissions depending on the cloud provider being targeted. 
<p>
Depending on the scope of the executed policy, these permissions may differ from policy to policy.
<p>
For a baseline, the managed read-only policies in each of the respective cloud providers will be enough to dry-run your policies. Actions will require additional IAM permissions which should be added with discretion.
<p>
For serverless policies, Custodian needs additional corresponding permissions to provision serverless functions in addition to those needed to execute the policy.
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Install Cloud Custodian
</li>
</ol>
   </td>
   <td>Note that we also maintain docker images for users with all packages installed, as well as a separate Go language-based frontend to the docker image. You can read more about it <a href="https://github.com/cloud-custodian/cloud-custodian/tree/master/tools/cask">here</a>.
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Write a YAML policy file called custodian.yml
</li>
</ol>
   </td>
   <td>In this simple example, the policy filters on `aws.ec2` resources that are tagged `Custodian,` and then, according to the action, will stop the instance. \
 \
Please see the Appendix for the complete example YAML file.   
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>Run the policy
</li>
</ol>
   </td>
   <td>By default, Custodian will obtain provider credentials per the cloud provider sdk default sources, e.g., credential files, environment variables, and instance metadata services.
<p>
For example, Custodian supports GCP service accounts, Azure managed identities, AWS IAM roles, AWS STS AssumeRole, and more. (Details of provider-specific credentials management can be found in the Appendix.)
   </td>
  </tr>
  <tr>
   <td>
<ol>

<li>View the Cloud Custodian report output in more detail
</li>
</ol>
   </td>
   <td><code>2016-12-20 08:35:06,133: custodian.policy:INFO Running policy my-<strong>first</strong>-policy resource: ec2 region:us-east-1 c7n:0.8.21.2 \
2016-12-20 08:35:07,514: custodian.resources.ec2:INFO Filtered from 3 <strong>to</strong> 1 ec2 \
2016-12-20 08:35:07,514: custodian.policy:INFO policy: my-<strong>first</strong>-policy resource:ec2 has count:1 time:1.38 \
2016-12-20 08:35:07,515: custodian.actions:INFO Stop 1 of 1 instances \
2016-12-20 08:35:08,188: custodian.policy:INFO policy: my-<strong>first</strong>-policy action: <strong>stop</strong> resources: 1 execution_time: 0.67</code>
   </td>
  </tr>
</table>

## Credentials Management

The way Cloud Custodian obtains and uses credentials depends greatly on the credentials management determined by the organization. For more details, see the Appendix.


## Project Compliance

Custodian does not ship/distribute any policies that correspond to standards/control checklists. Numerous examples of various policies exist within the documentation and across third-party samples with repositories corresponding to various controls.


---


# Security Analysis


## Predisposing Conditions

Custodian is intended to run in a trusted compute execution node with trusted inputs (policy YAML) and minimized cloud credentials. Custodian typically requires broad read access across an environment to inspect infrastructure configuration. Additionally, when evaluating a policy specifying remediation actions, credentials with write access are necessary.


## Attacker Motivations

As with any governance tool, Cloud Custodian is typically operating with broad read access across an environment to inspect infrastructure configuration, as well as write access when operating in remediation mode. Therefore access to its build pipeline and deployment environment is a high-value target regardless of motivations since it enables a wide variety of attacks.

Potential motivations for the abuse of cloud credentials include:

* Reconnaissance of the cloud environment for lateral movement to other accessible assets, i.e., compute, databases, object storage, and access and identity
* Data exfiltration 
* Destruction of cloud resources, data, or DDoS via API rate limit abuse
* Persistent threat attacks via the creation or modification of credentials, network security, compute, serverless, and image modification
* Spinning up additional cloud infrastructure for cryptocurrency mining and financial DDoS

Motivations to compromise the software supply chain include: 

* Modification of code to create a DoS scenario
    * Either by making services unavailable, vulnerable, or through resource exhaustion
* Modification of code to create a backdoor to the infrastructure
* Modification of code to leverage a man-in-the-middle attack to inspect/capture PII
* Modification of the Custodian software project to abuse cloud credentials

## Expected Attacker Capabilities

Per the principles of Zero Trust environments, we assume:

* An attacker is already present within an organization’s cloud compute environments
* An attacker potentially has access to cloud credentials
* The Cloud Custodian execution environment has already been exploited


## Attack Surface

* Cloud Custodian trusts the authenticity of the policies and data it is provided with
    * An attacker could potentially feed corrupt policies and data to Cloud Custodian
* Inject outdated or vulnerable elements in the supply chain
    * For example, an attacker could bundle an outdated dependency that has many known exploits
* Distribute a counterfeit version of Cloud Custodian to users

## Attack Risks and Effects

When it comes to evaluating risk, it is important to note that Cloud Custodian is a CLI. That means there is no daemon, listening network interface, or API, and neither is there any stateful store/database.

While it has been noted that Custodian could be used by an attacker to destabilize a cloud infrastructure, in a well-managed environment the benefits of using Cloud Custodian far outweigh the risks when paired with the operational maturity necessary for a secure cloud environment.  

The project makes the following a priori assumptions with regard to attack surface area operator concerns:

* Securing access to the software binary/code in both the CLI and cloud function/Lambda code, e.g., an attacker with filesystem write access
* Protecting non-Custodian access to credentials given to Custodian, e.g., other applications/users using custodian’s cloud credentials.  
* Policy files are considered trusted inputs, and per IaaC best practices, should be versioned control with adequate control of changes, i.e., peer review, CI

## Security Degradation

Since Cloud Custodian is a CLI without a daemon, any degradation of security is restricted to the security health of an organization’s credentials management and policies.

## Compensating Mechanisms

The project makes the following assumptions regarding mature operational practices when using Custodian in order to limit the attack surface: 

* Hardened compute execution environment with minimal additional software components running and minimal inbound access.
* Custodian requires cloud credentials (role, service account/principal) with elevated permissions for introspection and remediation. Access to those credentials should be restricted to the Custodian compute execution environment.
* Custodian cloud credentials should be limited in scope to what is necessary for custodian policy execution, i.e., minimized access.
* As the policy files are considered trusted inputs -- and per IaaC best practices -- an audit trail is implemented to validate the assurance of the supply chain through rigorous version and change control mechanisms.


## Serverless Security

When executing serverless policies, Cloud Custodian provisions itself as a serverless function on the respective cloud provider platforms. This provides for three additional attack vectors:

* Input tampering where a malicious event may be injected to attempt to attack compliant infrastructure.
* Modifying the function code to perform activities other than intended.
* Misuse of the role/service principal associated with the function.

Assessing each of these attack vectors requires both a review of the different execution modes in each provider and the recommended practices for each provider to prevent abuse. Additionally, for each of these providers, Custodian can be deployed in either a centralized tenant to consume events across an organization or in a decentralized setup with event consumption per tenant.

### AWS

In AWS, a Cloud Custodian policy supports several types of event execution modes. The most common execution modes are based on CloudWatch Events (also known as event bridge), in which Custodian provisions a CloudWatch Event rule, a target, and Lambda function per policy. In decentralized deployments with these cloud infrastructure assets, event execution mode will result in Custodian provisioning an audit log sink, connection to a pub/sub topic, and a cloud function.

### Azure

In Azure, a Custodian policy executing in an event execution mode will result in Custodian provisioning an event hub subscribed to ARM Resource lifecycle events. Those events are delivered to a storage account queue and consumed by an Azure Function. Additionally, if configured, logs and metrics for Azure Monitor are also produced, as well as a storage account for structured blob records.

An attacker trying to inject an event could attempt to do so by introducing malicious events into either the Event Hub or Storage Queue. Additionally, the storage account blob store could provide additional discovery information of misconfigured resources for lateral movement and escalation from the Custodian outputs. Therefore, all of these provisioned assets should be protected using the native capabilities of Azure IAM/RBAC to ensure that only authorized parties have access.

An alternative deployment is to use a centralized audit subscription with cross-account event hubs to process events across multiple tenant subscriptions to allow more stringent access control to the Custodian cloud infrastructure within the account.

It is important to note Azure functions are insecure by default with a public HTTP interface. This is due to their legacy atop of Azure Web Apps/App services. Custodian mitigates this default public interface by not binding to any HTTP inputs. Instead, Custodian Azure functions poll storage queues for events and do not have any inbound data plane bindings.

Additionally, Azure functions have a myriad of deployment options (i.e., premium, dedicated, consumption) with an associated matrix of capabilities on each option (i.e, vnet attachment, platforms, runtimes, supported bindings). Custodian supports vnet attached via either premium or dedicated service plans. This enables the removal of the public interface associated with a function.

Furthermore, Azure supports a myriad of options to configure identity for a function: from embedding credentials into a function source to managed service identity, i.e., per function identities and customer assigned identity. Custodian supports each of the platform’s native capabilities for users to assign service principal credentials.


### 

<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline drawings not supported directly from Docs. You may want to copy the inline drawing to a standalone drawing and export by reference. See <a href="https://github.com/evbacher/gd2md-html/wiki/Google-Drawings-by-reference">Google Drawings by reference</a> for details. The img URL below is a placeholder. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![drawing](https://docs.google.com/drawings/d/12345/export/png)GCP {#gcp}

In GCP, a Cloud Custodian policy executing in event execution mode will result in Custodian provisioning an audit log sink connected to a pub/sub topic and a cloud function. An attacker trying to inject an event could do so by introducing malicious events into the pub/sub topic.

Custodian does not use the event as a sole basis for decisions. Instead, it will resolve any resources within the event by ID via the cloud control plane, in doing so obtaining the source of truth of the current state of the resource before evaluating the policy filters to ensure the resource matches. If all checks pass, Custodian then proceeds with actions.

The service accounts and cloud functions can be protected in leaf/target decentralized deployments by using GCP IAM Policies conditions. Alternatively, the cloud infrastructure used for Custodian can also be centralized within a GCP project with restricted access. This mitigates attempts to use the service account role or modifying functions and injecting events.



<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")


---

# Secure Development Practices


## Development Pipeline

Two-factor authentication is required for all maintainers on GitHub per GitHub organization membership.

For each pull request, CI runs the following:

1. The unit test suite is run across several versions of Python (2.7, 3.6, 3.7, 3.8) and multiple operating systems, i.e., Linux, Windows
2. Linting/Static analysis tools (flake8)
3. Coverage reporting on the pull request with a 90% target baseline
4. Doc generation (sphinx), and example policies are verified via JSON schema

Pull requests are subject to review by the maintainers and have a baseline requirement of one other reviewer. The trunk/master branch is set up as protected and does not permit pushes directly to the project trunk.

For each pull request merged to trunk, the additional steps occur:

* Docs are generated and published
* Docker images are built, scanned for cve (via trivy), functionally tested, and published to docker hub via an automated pipeline

## Supply Chain Security

We have [dependabot](https://docs.github.com/en/code-security/supply-chain-security/keeping-your-dependencies-updated-automatically/about-dependabot-version-updates) alerts on any CVEs for all our dependencies. Additionally we use poetry for dependency management, which stores and verifies sha256 dependencies of all dependency files. We publish releases with a fully frozen dependency graph to ensure repeatable installs. Additionally docker image artifacts are scanned with trivy prior to publishing.


## Project Communication {#project-communication}

* [Maintainer’s Mailing List](https://lists.cncf.io/g/cncf-cloudcustodian-maintainers)
* [Security Mailing List](mailto:security@cloudcustodian.io) 
* [Mailing ListReddit](https://groups.google.com/forum/#!forum/cloud-custodian)
* [Gitter Chat](https://gitter.im/cloud-custodian/cloud-custodian)
* [Github](https://github.com/cloud-custodian/cloud-custodian)

## Ecosystem

Cloud Custodian is primarily used/integrated directly with the cloud provider native ecosystem tooling it is deployed against. For example, when Custodian is run, it provides command-line options for integrations with a cloud provider’s native capabilities concerning logs, metrics, trace, and blob storage. 


---

# Security Issue Resolution


## Responsible Disclosures Process

Our policy states that anyone who finds a vulnerability should report it to the Cloud Custodian Security Team through the [Security Mailing List](mailto:security@cloudcustodian.io) with the details of the vulnerability. The email is fielded by the Cloud Custodian Security Team, which is made up of Custodian maintainers who have committer and release permissions. Emails are addressed within three business days and include a detailed plan to investigate the issue and any potential temporary workarounds.


## Incident Response

If a vulnerability is acknowledged and the timeline for a fix is determined, the Security Team will work on a plan to communicate with the appropriate community, including identifying mitigation steps that affected users can take to protect themselves until a fix is rolled out. The Security Team will provide early disclosure of the vulnerability by emailing the [security@cloudcustodian.io](mailto:security@cloudcustodian.io) mailing list.

A public disclosure date is then negotiated by the Cloud Custodian Security Team, the bug submitter, and the distributors list. Once the fix is confirmed, the Security Team will patch the vulnerability in the next patch or minor release, and backport a patch release into all earlier supported releases.


---


# Roadmap

The [project roadmap](https://github.com/cloud-custodian/cloud-custodian/projects) is broken out into core roadmap, as well as for individual infrastructure providers using GitHub projects.


---


# Appendix


### Writing an Example Policy


#### YAML File


```
policies:
  - name: my-first-policy
    resource: aws.ec2
    filters:
      - "tag:Custodian": present
    actions:
      - stop
```

### Multi-Cloud Support Matrix

<table>
  <tr>
   <td>
   </td>
   <td><strong>AWS</strong>
   </td>
   <td><strong>Azure</strong>
   </td>
   <td><strong>GCP</strong>
   </td>
  </tr>
  <tr>
   <td>Serverless
   </td>
   <td>✅ 
   </td>
   <td>✅ 
   </td>
   <td>✅ 
   </td>
  </tr>
  <tr>
   <td>API Subscriber
   </td>
   <td>✅ 
   </td>
   <td>✅
   </td>
   <td>✅ 
   </td>
  </tr>
  <tr>
   <td>Storage
   </td>
   <td>✅
   </td>
   <td>✅
   </td>
   <td>✅ 
   </td>
  </tr>
  <tr>
   <td>Logging
   </td>
   <td>✅ 
   </td>
   <td>✅
   </td>
   <td>✅ 
   </td>
  </tr>
  <tr>
   <td>Metrics
   </td>
   <td>✅ 
   </td>
   <td>✅
   </td>
   <td>✅ 
   </td>
  </tr>
  <tr>
   <td>Resource Query
   </td>
   <td>✅ 
   </td>
   <td>✅ 
   </td>
   <td>✅ 
   </td>
  </tr>
  <tr>
   <td>Multi-Account
   </td>
   <td>✅ 
   </td>
   <td>✅ 
   </td>
   <td>✅ 
   </td>
  </tr>
  <tr>
   <td>Status
   </td>
   <td>Stable
   </td>
   <td>Stable
   </td>
   <td>Beta
   </td>
  </tr>
</table>

### Credentials Management

#### AWS

In order to obtain API credentials for AWS access, Cloud Custodian attempts the common and standard boto3 credentials methods in the following order: 


<table>
  <tr>
   <td><strong>Environment variables</strong>
   </td>
   <td><code>AWS_ACCESS_KEY_ID \
AWS_SECRET_ACCESS_KEY \
AWS_SESSION_TOKEN</code>
   </td>
  </tr>
  <tr>
   <td><strong>Shared credential file (</strong>~/.aws/credentials)<strong> </strong>
   </td>
   <td><code>[default] \
aws_access_key_id=foo \
aws_secret_access_key=bar  \
[dev] \
aws_access_key_id=foo2 \
aws_secret_access_key=bar2 \
[prod] \
aws_access_key_id=foo3 \
aws_secret_access_key=bar3</code>
   </td>
  </tr>
  <tr>
   <td><strong>AWS configuration file (</strong>~/.aws/config)
   </td>
   <td><code>[default] \
aws_access_key_id=foo \
aws_secret_access_key=bar \
[profile dev] \
aws_access_key_id=foo2 \
aws_secret_access_key=bar2 \
[profile prod] \
aws_access_key_id=foo3 \
aws_secret_access_key=bar3</code>
   </td>
  </tr>
  <tr>
   <td rowspan="2" ><strong>Assume the role provider which allows the specification of a role to assume when using the credentials and config files</strong>
   </td>
   <td><code>In </code>~/.aws/credentials
<p>
<code>[development] \
aws_access_key_id=foo \
aws_access_key_id=bar</code>
   </td>
  </tr>
  <tr>
   <td><code>In ~/.aws/config</code>
<p>
<code>[profile crossaccount]</code>
<p>
<code>role_arn=arn:aws:iam:...</code>
<p>
<code>source_profile=development</code>
   </td>
  </tr>
  <tr>
   <td><strong>IAM Role via EC2 metadata</strong>
   </td>
   <td>If Custodian is running on an Amazon EC2 instance and no credentials are found by any of the providers above, it will try to load credentials from the instance metadata service.
<p>
In order to take advantage of this feature, there must be an IAM instance profile role attached to the Custodian EC2 instance.
   </td>
  </tr>
</table>

Once credentials are obtained for the custodian application, Custodian will then use the obtained credentials to STS assume the specified Custodian role in the present account or an external account for cross-account policy deployments and scans.

For more on AWS keys management best practices, please refer to the [AWS documentation](https://docs.aws.amazon.com/general/latest/gr/aws-access-keys-best-practices.html).

#### Azure

To obtain credentials for Azure, Cloud Custodian uses the following authentication methods.


<table>
  <tr>
   <td rowspan="2" >First method
   </td>
   <td><strong>Service Principal via environment variables</strong>
   </td>
  </tr>
  <tr>
   <td><code>AZURE_TENANT_ID</code>
<p>
<code>AZURE_SUBSCRIPTION_ID</code>
<p>
<code>AZURE_CLIENT_ID</code>
<p>
<code>AZURE_CLIENT_SECRET</code>
   </td>
  </tr>
  <tr>
   <td rowspan="3" >Second method
   </td>
   <td><strong>Managed Service Identity (MSI) via environment variables</strong>
   </td>
  </tr>
  <tr>
   <td><code>AZURE_USE_MSI \
AZURE_SUBSCRIPTION_ID \
AZURE_CLIENT_ID</code>
   </td>
  </tr>
  <tr>
   <td>
<ul>

<li>If AZURE_USE_MSI is set to any value, Custodian will attempt to use MSI

<li>If AZURE_CLIENT_ID is not set, Custodian will use the System Identity

<li>If AZURE_CLIENT_ID is set, Custodian will use the User Identity that matches the client id
</li>
</ul>
   </td>
  </tr>
  <tr>
   <td rowspan="2" >Third method
   </td>
   <td><strong>Access Token via environment variables</strong>
   </td>
  </tr>
  <tr>
   <td><code>AZURE_ACCESS_TOKEN \
AZURE_SUBSCRIPTION_ID</code>
   </td>
  </tr>
  <tr>
   <td rowspan="2" >Fourth method
   </td>
   <td><strong>Azure AD via Azure CLI</strong>
   </td>
  </tr>
  <tr>
   <td>Custodian will attempt to pull credentials and the default subscription from Azure CLI
<p>
This requires that the user has run `az login` and selected their subscription in Azure CLI first
   </td>
  </tr>
</table>


For more on Azure key management best practices, refer to the [Azure documentation](https://docs.microsoft.com/en-us/azure/security/fundamentals/data-encryption-best-practices).


#### GCP

Credentials can be configured for GCP access via the following methods.


<table>
  <tr>
   <td rowspan="2" >First method
   </td>
   <td><strong>GCP CLI (gcloud) via an interactive web sign-in for single account use</strong>
   </td>
  </tr>
  <tr>
   <td><code>gcloud auth application-default login</code>
   </td>
  </tr>
  <tr>
   <td rowspan="2" >Second method
   </td>
   <td><strong>Environment variable that points to the service account credentials JSON file</strong>
   </td>
  </tr>
  <tr>
   <td><code>GOOGLE_APPLICATION_CREDENTIALS="/home/gcp-service-account.json</code>
   </td>
  </tr>
</table>


For more on GCP keys management best practices, refer to the [GCP documentation](https://support.google.com/googleapi/answer/6310037?hl=en).


### Threat Modeling Exercises

More exhaustive threat modeling exercises contributed by Capital One can be found [here](https://docs.google.com/document/d/1S9zQZaT6G1TA3IAx6YNL0f7G938xaFZ-bziszhuxMZg/edit?usp=sharing).


### Known Issues Over Time

No security issues have been reported.


### CII Best Practices

Cloud Custodian [Core Infrastructure Initiative (CII) badge](https://bestpractices.coreinfrastructure.org/en/projects/3402)


### Case Studies

* [Cloud Custodian Cleans Up Your Cloud Clutter](https://stelligent.com/2017/05/15/cloud-custodian-cleans-up-your-cloud-clutter/)
* [Security audit using Cloud Custodian for compliance in AWS](https://www.cloudsecops.com/aws-security-audit-using-cloud-custodian-for-aws/)
* [Announcing Cloud Custodian Integration with AWS Security Hub](https://aws.amazon.com/blogs/opensource/announcing-cloud-custodian-integration-aws-security-hub/)

### Related Projects/Vendors

There are numerous commercial vendors, i.e.,Divvycloud, Palo Alto, with tools that address subsets of the domain concerns Cloud Custodian addresses. Generally speaking, Custodian differentiates from them in its policy-as-code approach to authoring those tools, its breadth of use cases, and native integration with provider tools.

The majority of questions we field are in relation to cloud vendor tooling around similar domains. In general, our answer is that we integrate with said tooling and try to provide an easier way to consume that. For example, Custodian is the easiest way to author an AWS Config rule with a 10x reduction in code.

There are numerous OSS projects that limit their scope to specific problems such as limits checking, IAM minification, off-hours,  and inventory. Custodian differentiates in its capability to operate as a general-purpose tool that addresses a breadth of potential problems. 

A similar general-purpose tool Cloud Custodian is often compared against is Open Policy Agent. Out of the box, Open Policy Agent is used for generic policy enforcement, while Custodian is a general policy mechanism. Cloud Custodian is bound and integrated with cloud infrastructure to provide out-of-the-box productivity and value to end-users.

In contrast, binding Open Policy Agent to a particular domain typically requires building a separate application to create state synchronization such as GateKeeper for Kubernetes integration.

Custodian is written for cloud-native usage and therefore does not require any additional applications to bind to cloud providers. Custodian ships with out-of-the-box deep integration with cloud provider resources and native event streams. It also integrates with the cloud providers’ serverless runtime and includes out-of-the-box operational outputs.