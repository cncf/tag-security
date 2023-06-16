---
title:  "Infrastructure for Apps: Platforms for Cooperative Delivery"
date:   2022-09-22 00:00:00 +0000
author: Josh Gavant
---

![infrastructure integration](/images/infrastructure-integration.png)

TAG App Delivery formed the Cooperative Delivery working group in late 2021 to gather and report on emerging trends around coordinated delivery of infrastructure capabilities and applications. The TAG noted that while infrastructure teams are successfully adopting software development practices and deploying features and fixes continuously via the likes of GitOps and IaC (Infrastructure as Code), delivery of infrastructure capabilities is often not coordinated well with delivery of applications using that infrastructure. That is, there's a *gap* in delivery between application and infrastructure and coordination/cooperation is needed to bridge that gap.

The primary goals of the group have been to a) confirm the hypothesis that there is a gap, b) clarify how it manifests for end users and c) identify and encourage emerging trends to facilitate cooperation. For example, the group's [first hypotheses](https://github.com/cncf/tag-app-delivery/blob/main/cooperative-delivery-wg/charter/README.md#examples-of-known-patterns-aimed-to-deploy-applications) mentioned the following existing trends:

- GitOps: continuous idempotent reconciliation of configuration from declarative descriptors
- Operators: reconciliation-oriented services
- Pipelines: imperative orchestration of services and applications

In this article we'll review new trends we've learned about from end users and from emerging [CNCF projects](https://landscape.cncf.io/card-mode?category=application-definition-image-build,continuous-integration-delivery&grouping=no) like Backstage, Crossplane, Dapr, KubeVela and more.

We've also learned over the past year that while "cooperation" between infrastructure and application teams is what we seek to achieve, "cooperative delivery" is not a familiar term to most of our contributors. Recognizing that this cooperation is also the goal of "internal developer platforms" (IDPs) and the emerging platform engineering movement, we're preparing to rename the working group Platforms.

We're always seeking more input from users and contributors to guide us. Please consider sharing how your organization coordinates application and infrastructure delivery via [this GitHub form](https://github.com/cncf/tag-app-delivery/issues/new/choose) and share your thoughts in [GitHub](https://github.com/cncf/tag-app-delivery/discussions) or [Slack](https://cloud-native.slack.com/archives/CL3SL0CP5).

## Platform Engineering

Beyond our original hypotheses, an emerging trend we've noted for coordinating infrastructure and applications is platform engineering (PE) and particularly its principle of **self-serviceable capabilities**. [Backstage](https://www.cncf.io/projects/backstage/), for example, is a popular portal framework for these emerging platforms. According to Humanitec lead [Luca Galante](https://platformengineering.org/authors/luca-galante), platform engineering is "the discipline of designing and building toolchains and workflows that enable **self-service** capabilities for software engineering organizations in the cloud-native era ([link](https://platformengineering.org/blog/what-is-platform-engineering))." *Self-service* describes the mechanism of cooperative delivery: a developer provisions and uses capabilities in their app on-demand by following documented steps.

In addition to its self-service paradigm, platform engineering also **focuses on the needs of application developers** and operators, the users of the platform. This increases PEs' empathy for developers and other platform users and helps them gather feedback and iteratively improve to meet their needs, as product developers do for end customers. The shift in focus also better aligns platform development with an enterprise's true value streams, rather than infrastructure teams being an out-of-band cost center. It's not technical exactly, but **empathetic relationships between platform engineering and application teams** lead to better coordination of infrastructure capabilities and app requirements.

These platforms are typically built using foundational CNCF projects like Kubernetes, Helm, Prometheus, Backstage, Istio, Knative, Keptn and more.

## Kubernetes for Everything

Another trend we've noted in projects like [Crossplane](https://www.cncf.io/projects/crossplane/) is the adoption of the Kubernetes resource model for configuring and managing all types of infrastructure capabilities and application components. Users no longer provision only deployments, volumes and ingresses via the Kubernetes API; custom resource definitions (CRDs) now enable provisioning of databases, identities, message brokers, observability systems, and much more.

The [GitOps](https://www.cncf.io/projects/opengitops/) movement demonstrated the value of continuous reconciliation for applications, and with so many resource types available developers can now reconcile infrastructure in the same way as applications. For those providing their own infrastructure capabilities, the [Operator Framework](https://www.cncf.io/projects/operator-framework/) is a popular foundation for custom Kubernetes-based reconciler implementations.

## Capability Injection

Finally, we've noted projects like [Dapr](https://www.cncf.io/projects/dapr/) and [KubeVela](https://www.cncf.io/projects/kubevela/) which seek to coordinate infrastructure capabilities for apps through inference and late resolution and injection of those capabilities. These projects often ask app developers to declare the capabilities they require, like databases and message brokers, and then resolve actual implementations at runtime, perhaps using sidecar containers or eBPF programs. Some projects like [Istio](https://www.redhat.com/en/blog/istio-service-mesh-applies-become-cncf-project) can even inject capabilities transparently to the app developer.

Late resolution and injection loosens coupling of apps and infrastructure and is another form of "cooperative" delivery. Imagine getting a database from a different provider depending on the application's context - an RDS instance in AWS, a CloudSQL instance in GCP, or a [CloudNativePG](https://cloudnative-pg.io/) instance on premises.

## Conclusion

The mission of the Cooperative Delivery WG - soon to be the Platforms WG - is to gather feedback and highlight emerging trends that address gaps in coordination of infrastructure capabilities and applications. [Join us](https://github.com/cncf/tag-app-delivery) in TAG App Delivery to advance this topic and others relevant to application and platform developers and operators.

<sub>Image credit https://www.cleo.com/blog/knowledge-base-cloud-integration-platform</sub>