# cert-manager Self-Assessment

June 2024

Primary Authors: Maël Valais, Ashley Davis
Security reviewers: Maël Valais, Ashley Davis, Tim Ramlot

This document is intended to aid in roadmapping, help with the onboarding of new maintainers and
provide a good introduction to the security model of cert-manager.

## Metadata

|                   |          |
| ----------------- | -------- |
| Assessment Stage  | Complete |
| Software          | https://github.com/cert-manager/cert-manager |
| Security Provider | Yes, the primary function of cert-manager is to support the security of an integrating system. |
| Languages         | Go (Make + bash used for build system) |
| SBOM              | Not generated for cert-manager, but can be built for for sub-projects albeit not not published alongside the releases. See [open issue](https://github.com/cert-manager/makefile-modules/issues/154) |

### Relevant Links

| Doc                                             | URL |
| ----------------------------------------------- | --- |
| cert-manager security audit by Ada Logics, 2024 | https://ostif.org/wp-content/uploads/2024/03/AdaLogics-2023-cert-manager-audit-report.pdf |
| Vulnerability Reporting Process                 | https://github.com/cert-manager/community/blob/main/SECURITY.md |
| Graduation Issue                                | https://github.com/cncf/toc/issues/1306 |

## Overview

cert-manager is a X.509 certificate controller for Kubernetes and OpenShift. It plugs into certificate authorities such as Let's Encrypt and HashiCorp Vault and automatically renews certificates before they expire.

This document focuses primarily on cert-manager itself. The wider cert-manager project includes a variety of subprojects which can help with various tasks relating to managing certificates in Kubernetes, but those are out of scope for this document.

### Background

cert-manager is the de-facto standard Kubernetes operator for obtaining and renewing X.509 certificates.

cert-manager comes with its own Kubernetes custom resource and is widely extensible by the means of "external issuers" that communicate to cert-manager with the intermediate of the cert-manager custom resources and "external DNS-01 webhooks" that cert-manager uses when validating ACME certificates.

cert-manager stores private key material in Kubernetes Secret resources.

### Actors

The following table describes each actor.

<!--
The "actors" are the individual parts of your system that interact to provide
the desired functionality.  Actors only need to be separate if they are
isolated in some way.  For example, if a service has a database and a front-end
API, but if a vulnerability in either one would compromise the other, then the
distinction between the database and front-end is not relevant.

The means by which actors are isolated should also be described, as this is
often what prevents an attacker from moving laterally after a compromise.
-->

<table>
<thead>
  <tr>
    <th>Actor</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>cert-manager controller</td>
    <td>The controller contains the logic for the built-in issuers such as the ACME issuer as well as logic for ensuring certificate issuance or reissuance is triggered. It connects to the Kubernetes API server and reads and writes Secret resources as well as the cert-manager custom resources such as the Certificate resource.</td>
  </tr>
  <tr>
    <td>cert-manager webhook</td>
    <td>The webhook is an HTTPS server internal to the Kubernetes cluster that lets the Kubernetes API server validate cert-manager's custom resources when they're created or edited by users.</td>
  </tr>
  <tr>
    <td>cert-manager cainjector</td>
    <td>The cainjector aims to secure other Kubernetes webhooks. It is used by projects such as Cluster API. It connects to the Kubernetes API server to read and writes custom resource definitions as well as secret resources.</td>
  </tr>
  <tr>
    <td>cert-manager acmesolver</td>
    <td>The acmesolver is a separate pod created by the cert-manager controller when an ACME certificate is being issued. It accepts traffic from the internet in order to validate HTTP-01 ACME challenges.</td>
  </tr>
</tbody>
</table>

### Actions

<!--
These are the steps that a project performs in order to provide some service or
functionality.  These steps are performed by different actors in the system.
Note, that an action need not be overly descriptive at the function call level.
It is sufficient to focus on the security checks performed, use of sensitive
data, and interactions between actors to perform an action.

For example, the access server receives the client request, checks the format,
validates that the request corresponds to a file the client is authorized to
access, and then returns a token to the client.  The client then transmits that
token to the file server, which, after confirming its validity, returns the file.
-->

![cert-manager-adalogics.drawio](./adalogics_diagram.png)

<table>
<thead>
  <tr>
    <th>Action</th>
    <th>Actor</th>
    <th>Description</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>Create CertificateRequest</td>
    <td>Actors with RBAC permission - usually cert-manager</td>
    <td>A CertificateRequest's creation precedes certificate issuance. CertificateRequests (CRs) are not usually private - they're signed by a private key and contain no secrets. They're sent to issuers to obtain a signed certificate. Permission to create CRs is powerful since it may allow actors to issue certificates using any configured issuer in the cluster.</td>
  </tr>
  <tr>
    <td>Issue via Certificate Resource</td>
    <td>cert-manager controller</td>
    <td>The cert-manager controller acts on Certificate resources, which are a more user-friendly way of creating certificates. When issuance is required, cert-manager will (if required) create a temporary private key (in a Secret resource) to use for signing the CertificateRequest resource and which will be used with the certificate after issuance. Once signed, the certificate is added to a Secret resource along with the private key, and the temporary Secret is removed.</td>
  </tr>
  <tr>
    <td>Generate Private Key</td>
    <td>cert-manager controller</td>
    <td>The controller is often required to generate a private key for a certificate / certificate signing request. These keys are generated using the Go standard cryptography library using cryptographically secure random number generators.</td>
  </tr>
  <tr>
    <td>Validate Custom Resource</td>
    <td>cert-manager webhook</td>
    <td>The webhook validates resources as they're created or updated. It speaks to the Kubernetes API server to do this, and has a privileged position to be able to deny resources from being created if they're invalid.</td>
  </tr>
  <tr>
    <td>Validate HTTP-01 Challenge</td>
    <td>cert-manager acmesolver</td>
    <td>The acmesolver pod is started in response to a need to validate HTTP-01 ACME challenges. It listens on a socket for a request for a specific path, in line with the requirements of the ACME spec. The spec states that this server <em>must</em> listen for HTTP (not HTTPS) requests. The pod is terminated after the challenge completes.</td>
  </tr>
</tbody>
</table>


### Goals

<!--
The intended goals of the project including the security guarantees the project
is meant to provide (e.g., Flibble only allows parties with an authorization key
to change data it stores).
-->

cert-manager primarily uses Kubernetes RBAC to control access to resources, meaning that cluster administrators ultimately have control over who can issue certificates and how certificates are issued.

As a corollary to this, cert-manager seeks to only allow users with valid RBAC to be able to perform certificate related tasks.

The tool also relies heavily on Kubernetes Secrets, and the security of issued Certificates is reliant
on the assumption that in-cluster Secret resources are secure.

The nature of cert-manager’s implementation means that its underlying security relies heavily on the security of the underlying cluster. If a cluster has an exposed or vulnerable etcd component, that could mean the disclosure of key material handled by cert-manager since key material is stored in Secrets which will in turn be stored in etcd.

### Non-goals

<!--
Non-goals that a reasonable reader of the project’s literature could believe may
be in scope (e.g., Flibble does not intend to stop a party with a key from storing
an arbitrarily large amount of data, possibly incurring financial cost or overwhelming
 the servers)
-->

cert-manager doesn't seek to handle anything outside of its scope of issuing and renewing certificates.

For example, while an X.509 certificate is required for TLS, it is not sufficient to configure a secure TLS server: settings like the TLS version and cipher suites are relevant for that. cert-manager makes no effort to help with that process. It only seeks to provide a valid and secure certificate.

cert-manager also doesn't provide any guarantees around TLS trust. Trusting certificates is an important foundation of TLS, and cert-manager has a sister project called trust-manager to help with this. The core cert-manager project doesn't seek to address this.

## Self-assessment Use

This self-assessment is created by the cert-manager team to perform an internal
analysis of the project's security. It is not intended to provide a security
audit of cert-manager or function as an independent assessment or attestation of
cert-manager's security health.

This document serves to provide cert-manager users with:

- an initial understanding of the project's security posture
- where to find existing security documentation
- cert-manager's plans for security, and
- a general overview of cert-manager security practices

This document provides the CNCF TAG-Security with an initial understanding of
cert-manager, and the self assessment is required as part of the graduation process for cert-manager within the CNCF. This document also paves the way for a joint assessment document with the CNCF / TAG-Security in the future.

## Security functions and features

**Critical Security Components**

<!--
A listing critical security components of the project with a brief description of their importance.  It is recommended these be used for threat modelling. These are considered critical design elements that make the product itself secure and are not configurable.  Projects are encouraged to track these as primary impact items for changes to the project.
-->

- cert-manager controller: the controller is a pod that has access to secret resources across all namespaces.

**Security Relevant Security Components**

<!--
A listing of security relevant components of the project with
  brief description.  These are considered important to enhance the overall security of
  the project, such as deployment configurations, settings, etc.  These should also be
  included in threat modeling.
-->

- cert-manager cainjector: the cainjector is a pod that has access to secret resources for a given namespace
- cert-manager acmesolver: HTTP server which listens publicly as required by the ACME specification
- cert-manager webhook: validates newly created and newly changed resources with the permission to deny a resource from being created.

## Project Compliance

The cert-manager project does not comply with any specific security standard. Some general suggestions for compliance with some hardening solutions are available on the [cert-manager website](https://cert-manager.io/docs/installation/best-practice/).

## Secure Development Practices

### Development Pipeline

- Regular Trivy scans are defined in the [cert-manager repo](https://github.com/cert-manager/cert-manager/blob/b6359abd5be3f62b4a32c9686797f8b1fe960d15/make/scan.mk#L22) and are run regularly (for example, on the [controller](https://github.com/cert-manager/testing/blob/229cb8dd650554a9462912680b53c6e8d68e5320/config/jobs/cert-manager/cert-manager/master/cert-manager-master.yaml#L1461))
- Regular govulncheck scans are configured for the [cert-manager repo](https://github.com/cert-manager/cert-manager/blob/b6359abd5be3f62b4a32c9686797f8b1fe960d15/.github/workflows/govulncheck.yaml). Govulncheck is a much more effective security scanner for Go, and we address anything it reports with a great deal of urgency.
- golangci-lint's [gosec](https://github.com/securego/gosec) integration is run regularly and is run against all PRs which are candidates for merging to enforce good practices
- We sign all cert-manager containers and the cert-manager helm chart during the build process, which is itself entirely defined in open source auditable code.

### Communication Channels

- Internal communication takes place on the Kubernetes Slack in the channel `#cert-manager-dev`, and more rarely using the mailing list <cert-manager-maintainers@googlegroups.com> (mainly used for setting up meeting invitations).
- Inbound communication from users happens on the Kubernetes Slack in the channel `#cert-manager` as well as over the mailing list <cert-manager-dev@googlegroups.com>.
- Outbound communication: we communicate with our users using [Twitter](https://twitter.com/CertManager/), [Mastodon](https://infosec.exchange/@CertManager), and <cert-manager-dev@googlegroups.com> for announcements.


### Ecosystem

The cert-manager project is widely used across the ecosystem: most Kubernetes
controller projects, such as Cluster API, use it to provide certificates for
their webhooks.

It also has integrations with various notable cloud native projects including Istio, Linkerd, SPIFFE, SPIRE and more.

## Security Issue Resolution

### Responsible Disclosures Process

The cert-manager project has a well defined responsible disclosure process, which is
documented in a SECURITY.md file in every repo in the project.

Those files link back to a central file, which is located in the [community repo](https://github.com/cert-manager/community/blob/8ae78393967de843192e00be13e9a85ac5031329/SECURITY.md).

The project has a dedicated security disclosure Google group which all maintainers have access to, and maintainers are encouraged to sign up for that list with both work and personal emails so that they can address valid reports quicker.

Our documentation for what we'll accept specifically calls out that we won't accept plain
security scanner reports, because usually these are low effort and filled with false positives
and because we run scanners ourselves, too.

We haven't yet had a serious disclosure through this mechanism. So far, we've not had to appoint
anyone to take the lead on a response, because all responses have been picked up quickly by a member
of the maintainer team.

### Vulnerability Response Process

Our process defines that we'll respond to valid reports within 3 working days. In practice we tend to be
much faster than this, although again most reports are false positives.

## Appendix

### Known Issues Over Time

There haven’t been any CVEs or notable security reports made about cert-manager. The most interesting result is from the ADALogics security audit linked at the top of this document, in which a maliciously crafted certificate could exhaust the memory of cert-manager using a particular invalid custom Subject. This was only present in a feature which was alpha-level at the time and so had to be enabled specifically at install time.

Our govulncheck and trivy scanners regularly find issues of various importance, and we patch them quickly depending on the severity and exploitability of the issues. cert-manager has been affected by security bugs in Go itself, and in several dependencies.

Another example comes from the security audit, which found that some servers were missing timeouts or limits, which have now been added. Mostly, these servers are only accessible in-cluster and exploiting these issues would have required a presence in-cluster.

### [CII Best Practices](https://www.coreinfrastructure.org/programs/best-practices-program/)

cert-manager passes the OpenSSF best practices badge: <a href="https://www.bestpractices.dev/projects/8079"><img src="https://www.bestpractices.dev/projects/8079/badge"></a>

### Case Studies

We don’t have any particular case studies, but we have several tutorials on the website which point to how it can be used:

1. Use cert-manager to obtain let's-encrypt certificates for an nginx ingress (see [Nginx Ingress tutorial](https://cert-manager.io/docs/tutorials/acme/nginx-ingress/))
2. Use cert-manager to issue certificates for service-mesh communication (see [istio-csr](https://cert-manager.io/docs/usage/istio-csr/))
3. Use cert-manager to integrate a Kubernetes cluster in a company-wide PKI setup (see [Venafi tutorial](https://cert-manager.io/docs/tutorials/venafi/venafi/))

In addition, cert-manager’s popularity means that there is a lot of content on the wider internet about it. Searching on Google or YouTube will provide a lot of tutorials and examples.

### Related Projects and Vendors

This section is about discussing the differences between cert-manager and other similar projects.

Direct alternatives:

- https://github.com/smallstep/autocert
- https://github.com/jetstack/kube-lego
- https://github.com/kelseyhightower/kube-cert-manager

These direct alternatives can be used to replace cert-manager for a subset of the use-cases that we support. These projects are smaller in scope, this means that they might be a better solution for a very specific use-case. However, due to their specificity, they are less popular and receive updates and bugfixes less frequently and have a smaller community.

Indirect alternatives:

- https://github.com/external-secrets/external-secrets
- Provisioning certificates using Terraform / OpenTofu

These alternatives are alternative ways to provision certificates in a Kubernetes cluster. They are mainly based on secret-provisioning, meaning that they need to be used in combination with another system to make sure all certificates are renewed in time.
