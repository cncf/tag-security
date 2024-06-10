# Pixie Security Self Assessment

## Metadata

<table>
  <tr>
   <td>Software
   </td>
   <td><a href="https://github.com/pixie-io/pixie">https://github.com/pixie-io/pixie</a>
   </td>
  </tr>
  <tr>
   <td>Website
   </td>
   <td><a href="https://px.dev/">https://px.dev/</a>
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
   <td>C++, Golang, Typescript
   </td>
  </tr>
  <tr>
   <td>SBOM
   </td>
   <td><a href="https://storage.googleapis.com/pixie-dev-public/oss-licenses/latest.json">https://storage.googleapis.com/pixie-dev-public/oss-licenses/latest.json</a>
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
   <td>Security file
   </td>
   <td><a href="https://github.com/pixie-io/pixie/blob/main/SECURITY.md">https://github.com/pixie-io/pixie/blob/main/SECURITY.md</a>
   </td>
  </tr>
  <tr>
   <td>Default and optional configs
   </td>
   <td><a href="https://github.com/pixie-io/pixie/blob/main/k8s/operator/helm/values.yaml">https://github.com/pixie-io/pixie/blob/main/k8s/operator/helm/values.yaml</a>
   </td>
  </tr>
</table>


## Overview

Pixie is an observability tool to get instant, baseline visibility into your Kubernetes applications without any manual instrumentation.


### Background

Pixie is an observability tool for Kubernetes applications. Leveraging technology such as eBPF, Pixie automatically collects telemetry data, including full-body requests, resource and network metrics, application profiles, and more. This allows developers to view the high-level state of their cluster (service maps, cluster resources, application traffic) and also drill down into more detailed views (pod state, flame graphs) without having to modify or redeploy their code.

All telemetry data is collected and stored locally in the cluster, utilizing less than 5% of the cluster's CPU. This edge architecture enables users to deploy Pixie in sensitive environments and air gapped clusters. If an attacker were somehow able to compromise Pixie to take a substantial amount of CPU, it would be possible to slow down the system and other applications running on each node. To prevent this, we can set Kubernetes resource limits on Pixie pods/deployments. 

Data can be processed using Pixie's flexible Pythonic query language, PxL, across Pixie's UI, CLI, and APIs. Pixie additionally supports a plugin system which allows users to easily export its telemetry data and integrate with other projects using OpenTelemetry.  

Pixie was accepted as a CNCF sandbox project in June 2021. Since our inclusion in the CNCF, Pixie has seen promising community contribution, growth, and adoption. Companies such as New Relic and VMware are building products and integrations on top of the Pixie platform, while others, such as Verizon, use Pixie to monitor their Kubernetes clusters. Pixie also has an active and engaged community, with 1300+ Slack members, 60+ contributors, and an average of 245 commits per month. 


### Actors

**Vizier (Data Plane)**

Vizier is responsible for collecting and processing data in a Kubernetes cluster. 

One Vizier should be deployed per each cluster which needs to be monitored. If one or more Viziers are deployed to a cluster, the first/original deployment of Vizier will stay connected to the control plane and continue running properly. Any Viziers deployed afterward will fail to connect to the control plane, as the Kubernetes cluster’s UID is already associated with the original Vizier. However, even if the second Vizier instance were able to connect to the control plane, multiple instances of Vizier in a cluster would not affect other instances. Users would just collect the same data per Vizier instance.

This case is currently not surfaced through the UI, however the operator can easily be modified to detect and notify users of this condition. Users can resolve this state by deleting the duplicate Pixie deployment using standard Kubernetes operations.

**Control Plane**

The control plane manages metadata in Pixie, such users, orgs, and connected clusters. It is also responsible for hosting Pixie’s API and UI so users can easily access and visualize data collected by the Viziers. 

The control plane must be a trusted party, usually deployed by the developer/admin themselves. Enterprise-hosted offerings exist, however these are not supported or endorsed by the Pixie project. If the control plane were compromised, the control plane could leverage the auto-update mechanisms to deploy unauthorized applications (see **Connecting a Vizier to the Control Plane **below for more information).

**CLI/API Clients**

The CLI/API clients are used to make API requests to the control plane. This includes functionality such deploying Vizier to the current cluster or querying data collected by a Vizier.

If the CLI or one of the APIs were compromised, (for example, if a user installs a malicious binary or library acting as the CLI/API), the binary/library would be able to do anything the attacker has programmed it to do. This would not, however, allow the attacker to deploy malicious applications to the user’s cluster. The CLI does not have Kubernetes credentials to the user’s cluster. More subtle compromises of the CLI/API would likely have the CLI/API functionality appear the same, but:



* Send the user’s authentication token or API key to the attacker. This would allow the attacker to query sensitive data from the user’s cluster.
* Directly send any data to the attacker when the user runs a query.

To mitigate this, we sign the CLI binary. The macOS binary is signed and notarized by Apple’s CodeSigning process. The linux binary and packages are GPG signed with our author key. The CLI binaries are distributed via Github releases and include both sha checksums and the GPG signatures for verification. For the APIs, we follow the conventions for API distribution (for example, Go modules).

**PxL (Data Language)**

Data is processed using Pixie's flexible Pythonic query language, PxL. Like Python, PxL is implicitly and strongly typed, supports high-level data types, and functions. Unlike Python, PxL is a [dataflow](https://en.wikipedia.org/wiki/Dataflow_programming) language which allows the Pixie platform to heavily optimize its execution performance, while maintaining expressiveness for data processing. PxL programs are typically short-lived and have no implicit side effects. As a result, PxL has no support for classes, exceptions, and other such features of Python. Many attacks against Python leverage functionality unsupported in PxL. 

Since PxL is a language for data processing, it follows the Pandas interface. Similar to Pandas, the basic unit of operation for PxL is a Dataframe. A Dataframe is basically a table of data and associated metadata operations. You can perform operations on a Dataframe to derive new Dataframes. As a matter of fact, PxL basically specifies a sequence of dataflows necessary to transform a set of Dataframes into the final result. Users can perform operations such as filters, aggregates (joins, unions),

PxL uses its own execution engine completely unrelated to that of Python’s execution engine. The execution engine will also timeout and stop any long-running queries that may be too slow. This surfaces as an error to the user asking them to modify the query (for example, adding filters to reduce data volume). 


### Actions

**Connecting a Vizier to the Control Plane**

When a Vizier is deployed to a cluster, it must first connect to the control plane to associate itself with an org/user. In order to perform this association, each Vizier should be deployed using a _deploy key_. This deploy key is a UUID associated with an org + user and is re-usable. For example you can deploy to Cluster A with the key, and then Cluster B with the same key.

This will result in both clusters getting associated with the same org + user. This key only has permissions to associate the Vizier with an org/user–it cannot be used to make any API calls on the user’s behalf. Specifically, the key doesn’t have permissions to do anything that can affect other Viziers deployed to the user’s org. The deploy key remains active indefinitely, until deletion by the user. It is, however, straightforward to add an expiry.

Each time a Vizier is deployed, the deploy key ID and cluster information is logged to the pod logs for audit purposes.

If leaked to a malicious actor, the most the actor can do is connect a Vizier and make _their_ data accessible to someone else. To the affected user, they will see this new Vizier available in the list of Viziers they can query in the API. However, this Vizier will have a distinct name and ID from their other Viziers, so is distinguishable. Vizier names are unique across the entire platform. If someone else were to try to deploy another Vizier with the name "test-cluster", Pixie will assign it the name "test-cluster_&lt;random generated hash>". We currently do allow homoglyphs, but can add sanitization to avoid these situations ([#1653](https://github.com/pixie-io/pixie/issues/1653)).

Once the Vizier is connected to the control plane, it establishes a bi-directional gRPC stream (using server-side TLS) between both actors. Enabling mTLS for the bi-directional stream would require users to create signed TLS certs for each cluster which they want to deploy Pixie to. This can be a hassle if not using self-signed certs, as users may have hundreds of clusters.

We currently do not have OCSP or CRL revocation checking for the TLS connection between the Vizier and control plane. However, this can be added (likely using Golang’s ocsp library).

Messages are passed between the Vizier and control plane using this stream. Aside from queries (see _Query a Vizier_ below), these messages do not contain any sensitive information. The control plane has the ability to make configuration changes to the Vizier from this mechanism–for example, auto updating to the latest Vizier release. 

_Tracking Versions for Auto-Update_

In our release builds, anytime we release a new artifact (Vizier, CLI, operator), we update a manifest file that is stored in Github: [https://github.com/pixie-io/pixie/blob/gh-pages/artifacts/manifest.json](https://github.com/pixie-io/pixie/blob/gh-pages/artifacts/manifest.json). This is written by pushing to the branch in Github Actions.

The control plane then polls this manifest to track any new versions that are released. 

In a default deployment of the control plane, the manifest file which is updated by our release builds is used by default. However, users can also point the control plane to their own manifest file if they want to have more control over their versions/releases. For example, if they don't want to automatically pick up the latest releases, they can have their own manifest file which they manually add new releases to when ready.

If the manifest were to be compromised, this could result in users deploying malicious applications to their cluster.

We can consider adopting a system like TUF to reduce the scope of impact on users. It is also a well-accepted and supported standard. Signing via cosign has also been added to mitigate this issue. If we choose not to adopt a system such as TUF, the auto-updater can check the validity of the images before they are deployed to a user’s cluster. This will stop the auto-updater from deploying malicious containers specified in a compromised manifest.

**Querying a Vizier**

Users query collected data from Viziers by executing scripts. Scripts are executed using the API (see _Making an API Request to the Control Plane_ for more details) with the control plane acting as a passthrough proxy. From the control plane, the request is sent to the Vizier via the bi-directional gRPC stream. The data is processed and sent back to the control plane through the gRPC stream, after which it is sent back to the client as a response. Throughout this whole process, the data is [end-to-end encrypted](https://blog.px.dev/e2e-encryption/) to ensure the data is only readable by the end client.

The process for end-to-end encryption is as follows:


    1. The client generates an asymmetric keypair used to do end-to-end encryption. The public key is passed as a parameter in the ScriptExecution request to the control plane.


    2. The control plane sends the ScriptExecution request to the Vizier via the bi-directional gRPC stream. The public key is still included in this ScriptExecution request.


    3. The Vizier receives the request, runs the script in the request and produces some results. Before results are sent back to the control plane, it is encrypted using the public key.


    4. Vizier sends the execution results back to the control plane through the bi-directional gRPC stream.


    5. The control plane sends the data back to the client. The client then uses its private key to decrypt the data. 

Although most scripts are used just to query data, scripts have the ability to run mutations. Mutations result in some action or configuration change on the Vizier. Currently, the only supported mutation is to dynamically deploy BPF probes. Pixie only allows deploying probes which can be used to read data and cannot be used to modify any system state. PxL is based on a subset of the Python language and is turing complete. We currently rely on Kubernetes resource limits to manage excessive resource consumption. However, this can still lead to DoS of the Pixie service itself (OOMKills, evictions). We plan to alleviate this by adding circuit breakers during script execution. For example: [#471](https://github.com/pixie-io/pixie/issues/471) will prevent the collector/aggregator pod from processing results that may run over its memory limit.

**Making an API Request to the Control Plane**

The control plane serves as the API. The control plane can be configured to work with any auth provider which supports OIDC. ser

Users can make API requests to the control plane in 3 ways:



* CLI: Users authenticate their CLI through the CLI’s login mechanism. Login requires users to log into the UI from their browser. The login returns a JWT (with a short expiration) from the auth provider, which is then sent or pasted into the CLI. The CLI exchanges the JWT for a Pixie token by sending it back to the control plane, after which the Pixie token can be used to authenticate API requests through Bearer Token Auth. Access to either the JWT or Pixie token will enable an attacker to use the Pixie API as the user. This will allow the attacker to: 
* Run scripts and access data to any Vizier that the user has deployed.
* Deploy Vizier to the attacker’s own cluster and connect it to the user’s org, thereby giving the user the attacker’s data.
* Update org settings, including removing members from the user’s organization.
* UI: Users authenticate by logging into the browser. The auth provider returns a JWT which is sent to the auth service in the control plane. The JWT is exchanged for a Pixie token which is stored in the user’s browser cookies. These cookies [have the Secure flag set](https://github.com/pixie-io/pixie/blob/0ba4a1b284fe11e1bc3094e87072db1d44e0b4b4/src/cloud/api/controllers/auth.go#L541) to prevent MITM TLS stripping attacks.
* Go/Python API: In order to use the Go/Python API clients, users create a Pixie API key through the UI or CLI. An API key is associated with a user/org and is used to authenticate users when attached to the `PX-API-KEY` request headers. 


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

**Vizier (Data Plane)**

Vizier is responsible for collecting and processing data in a Kubernetes cluster. One Vizier should be deployed per each cluster which needs to be monitored. Communications between the microservices in the data plane are authenticated using a JWT signed by a signing key known only to the microservices. For both the inter-service communication in the data and control plane, we generate a random JWT signing key stored as a Kubernetes secret. Updating or rotating this key is easy, as it just requires updating the Kubernetes secret with the new key and bouncing all related deployments to pick up the updated secret. We then use [HMAC w/ SHA-256 hash](https://github.com/pixie-io/pixie/blob/main/src/shared/services/utils/jwt.go#L127) for the JWA. When verifying the JWT, [we require HS256](https://github.com/pixie-io/pixie/blob/0ba4a1b284fe11e1bc3094e87072db1d44e0b4b4/src/shared/services/authcontext/context.go#LL55C21-L55C21) to be used and do not allow a JWA of none.

**Control Plane**

The control plane manages metadata in Pixie, such users, orgs, and connected clusters. It is also responsible for hosting Pixie’s API and UI so users can easily access and visualize data collected by the Viziers. Communications between the microservices in the control plane are authenticated using a JWT signed by a signing key known only to the microservices. Any requests made to the API are authenticated via an API key or cookie.


### Security Relevant

**Vizier Operator**

The operator (optional) is responsible for deploying a Vizier instance and managing the deployment, such as keeping it up-to-date and auto-repairing bad states. We use OLM to manage the operator and follow their best practices and guidelines for building and distributing the operator. The operator must use a deploy key in order to deploy a Vizier instance on the user/org’s behalf.

Some cases where the Vizier instance may end up in a bad state are:



* User has deployed Vizier with Vizier’s metadata store backed by etcd. This is a configuration option that users can choose at deployment time, particularly for users who do not have persistent volume support in their cluster. It can, however, be slightly more unstable due to its reliance on RAFT. If, for any reason etcd loses quorum (such as evictions, node going down, etc), the etcd replicas will start crashing. When this occurs, Pixie’s metadata pod which relies on etcd will begin to CrashLoopBackoff, resulting in other dependent pods (such as the data collectors) erroring and running into CrashLoopBackoff as well. This will make Pixie unhealthy and unqueryable.

    The operator detects this state and restarts the entire etcd instance. Although this means users will lose metadata stored in the original etcd instance, they can at least get Vizier back to a functioning state.

* Vizier uses NATS as a message bus. There have been infrequent cases where the NATS instance becomes unhealthy (as indicated by the healthcheck endpoint). The operator restarts the NATS pod to resolve the issue. Since NATS is stateless, there is no loss of data. If the operator’s auto-repair is working correctly, the user should not notice any difference in functionality. If NATS were to go down without the auto-repair, this would result in Pixie pods erroring and entering CrashLoopBackoff since they are unable to connect to NATS. This will surface in the UI that the Vizier is in an unhealthy state. We can specifically surface the issue that NATS is unhealthy, however since the operator auto-repairs the issue, users are unlikely to see this error.

**Data Access Mode**

Pixie has the potential to collect sensitive data/PII from a user’s cluster. Pixie uses eBPF to perform protocol tracing–intercepting network traffic and parsing details such as request/response headers and bodies to provide visibility in the user’s application. Pixie deploys uprobes to commonly used SSL libraries (openSSL, boringSSL, etc.) allowing Pixie to intercept the network traffic before it is encrypted. As a result, it is possible for Pixie to collect request/response bodies that may contain PII. Pixie employs several techniques to guard this data:



1. All data is stored in-memory on the data collector pods in the user’s cluster. The data lives within the customer’s environment under their control (for example, firewalls). This data is never exported or persisted anywhere without the user explicitly choosing to do so. Accessing this in-memory data would require an attacker to gain access to the user’s environment, and be able to parse through the process’s memory.
2. The data can only be queried through PxL script execution requests (UI, CLI, API) which uses end-to-end encryption (described in “Querying a Vizier”). The end-to-end encryption ensures that if the data were intercepted at any point, only the requesting client has the ability to decrypt and read the data.

The most likely attack would be if an attacker has access to a user’s API key. They would then be able to query Vizier on the user’s behalf and be able to see all data which Pixie has collected. Adding finer-grained levels of RBAC (for example, [#1321](https://github.com/pixie-io/pixie/issues/1321)) will help reduce the scope of API keys.

Although Pixie does not redact the data stored in-memory, users can opt to enable “Restricted” data mode which redacts PII at script execution time. All rows in a potentially sensitive column, such as HTTP bodies, will be redacted.

We have two “restricted” data modes.



1. Full redaction: In this mode, _any _columns that could potentially contain PII, such as request bodies, will be completely redacted, whether or not it does contain data with PII or not. Only columns that clearly do not have PII, such as latencies, headers, request paths, will not be redacted.
2. Best-effort PII redaction: In this mode, we use [regular expressions](https://github.com/pixie-io/pixie/blob/9711f0f769b24aa1e35d197d71544a1783b0c36e/src/carnot/funcs/builtins/pii_ops.cc#L42) for common forms of PII, such as social security numbers and phone numbers, to detect and mask PII. This mode is clearly marked as best-effort, as regular expressions may not detect all cases of PII.

Our goal around PII is to provide users full visibility into their system. If users are especially security-conscious, they should opt for full-redaction mode to ensure that no PII ever leaves their environment. However, this will also limit the potential insight they may have into their application (for example, “all requests with this field in the request body have higher latency”). Users should make the trade-off accordingly. 

**Plugin System**

Pixie integrates with other tools through the Pixie plugin system. In the plugin system, users can configure endpoints, keys, and other options which may be necessary to export the data to any Open Telemetry endpoint. This information is stored encrypted in the control plane’s database. 

The Pixie Plugin system is currently used to export Pixie data to other tools through OpenTelemetry. Third-party providers who want to support easy Pixie data export to their tools can submit a plugin in the [Pixie Plugin repo](https://github.com/pixie-io/pixie-plugin). All changes are reviewed and must be approved by a Pixie maintainer. 

There is currently a limited set of options that a plugin provider can configure:



* Information about the plugin provider (such as name, image)
* Which PxL scripts should be run, and how frequently they should be run.
* The endpoint in which the script results should be sent–this should be to an OTel server.
* Extra configurations which should be sent in the request headers to the OTel server, such as API keys for authenticating which user is sending the data.

No custom code is executed, excluding data queries crafted by the plugin provider.  These are reviewed by Pixie maintainers to check for correctness, efficiency, etc.

Given that plugins are containers for some simple configuration, and OpenTelemetry is a widely adopted standard, we envision that the existing OpenTelemetry plugin should suffice the use case for data export for a large number of users. We don’t expect this plugin system to need many varied plugins, but in a scenario where we see a large demand for custom plugins, we will create a more rigorous process to accept plugins.

An alternative to the Pixie Plugin system is that users can leverage Pixie’s APIs in order to periodically execute scripts and send results to their datastore/application. The Plugin System simplifies that process by orchestrating the script execution and sending of results. It also allows these third-party tools to provide a set of common scripts that may be useful to their users.

The Pixie Plugin system is very commonly used to export Pixie data into other tools.

_Plugin System UI_

Users can see which plugins are enabled by going to the Admin page in the Pixie UI. On that page they can see which plugins are enabled and the configurations they have set.


There is also a separate page in the UI which displays which export scripts they have enabled for each plugin, which clusters those scripts are running on, and how frequently. For each script, they can also dive deeper to see the status of the last 10 export runs. This shows information such as whether the export was successful and how much data was processed/exported.

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
