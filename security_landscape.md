** This is a DRAFT document **

# Adding a “Security Landscape” to the CNCF Landscape
## Background
The CNCF Landscape is a valuable resource for companies building cloud-native software. It’s a single place
with a fairly comprehensive resource map of cloud-native technologies to enable organizations to build, test,
deploy and scale cloud native applications.

Currently the Landscape is primarily broken into categories that are meant to highlight key phases of the cloud-native
software development life cycle (SDLC). In particular, it contains the following categories:

- App Definition & Development
- Orchestration & Management
- Runtime
- Provisioning
- Observability & Analysis

In addition to the categories above, there is a separate “Serverless” category.

Among these categories there are few sub-categories with a security focus. Notably there are:

- Provisioning - Security and Compliance
- Provisioning - Key Management
- Serverless  - Security

The representation of security-related tools in the CNCF Landscape is not sufficient to serve as a guide on healthy security
practices to anyone developing cloud-native software. Companies building real-world applications have security considerations at
each phase of the SDLC, which is not well represented on the current Landscape. We believe it would be beneficial to have
a resource with clearer suggestions on security considerations at each stage of the SDLC as well as recommendations for
cloud-native tools that an organization could use to help them practice better security.

In addition, the format of the current landscape focuses on tools that solve a particular area of
concern (e.g. “source code management” or “container registries”). We believe security is an area of focus that
requires a different approach. For example, there are many tunables that are exposed at various layers that allow
organizations to secure their cloud native platform. A good example are Linux Security Modules (LSMs) such as seccomp,
SELinux, and apparmor that can be used to further secure the container runtime environment. These tunables are often
abstracted away from the end user by the container runtime or orchestration layers to hide this layer of complexity
from developers. However, these low level tunables are an important consideration for providing an effective layered
approach to security. In creating a separate security-focused landscape, we are aiming to more effectively highlight
the various layers of security considerations, as well as tools that can help companies with fine-tuning their approach
at each layer.  

## Goal

We propose the creation of a separate security-focused landscape (similar to the separate, Serverless-focused landscape)
that uses major categories that are similar to those used in the primary CNCF Landscape, but with sub-categories that
highlight the main security considerations in each category.

In this document we propose the draft structure of the “Security Landscape”. At this stage we are _only_ proposing
the structure of the Security Landscape and are not attempting to fill it in with tools from the existing CNCF Landscape.
We drafted this document after reviewing the current list of projects in the CNCF Landscape and recommendations by SANS and
Gartner for good security practices, as well as drawing on our own experience. In future work, we will work with the
community to determine how best to map cloud-native tools into the sub-categories of the "Security Landscape" we propose below.

A note on how the work of mapping tools into the sub-categories may proceed: we do not currently have plans for precisely
how projects will be mapped into the Security Landscape. If we were to follow the model of the current CNCF landscape we
would require each project to be placed in exactly one security landscape sub-category, but this forces tools with multiple
common uses to artificially choose a “most common” use case as its sub-category. A possible alternative will be to define a
list of key features, map the key features into the landscape sub-categories, and then list the key features of each tool.
In this flow, individual tools may appear in multiple sub-categories. Deciding precisely how to map tools into the security
landscape sub-categories is future work and will occur after gathering feedback from the community on the preferred solution.

## Proposed Security Landscape Structure
In this section of the document, we outline our proposal for the structure of the Security Landscape.

The bullets in **bold** are the primary categories in the Security Landscape and the bullets in _italics_ are the
sub-categories. The remaining text is a description of each sub-category.

- **App definition and development**
  - _Static Code Analysis_
    - Inspecting code for OWASP vulnerabilities, pen testing, etc
  - _Dependency analysis_
    - Checking OS for vulnerabilities (updates available? Reports from https://www.us-cert.gov/ etc), image scanning
    - Check for vulnerabilities in dependent libraries
    - Check for maintenance of dependent projects => increased potential for vulnerabilities
  - _Pipeline security testing_
    - Tools that facilitate automated security testing in pipelines; eg for functional security tests of authn and authz,
      tests of known potential weaknesses or misconfigurations

- **Identity & Access Control**
  - _Identity_
    - SPIFFE, identity providers, OpenID, LDAP, Okta
  - _Access Controls_
    - Controls within the orchestration layer to provide minimum required access to orchestrator resources.
    - Authentication / Authorization
      - OAuth, IAM
    - Privilege & Access Management
      - Managing privileges in the platform for humans and machines, access controls, audit logging, privilege revocation,
        etc
    - Network Policy & Protection
      - Firewalls, network segmentation, network policy
  - _Service access_
    - Service admittance & admission controllers
      - Allowing new service instances to join existing services, and preventing insecure application instances from running.
    - Storage access
  - _Key and Certificate Management_
    - Provisioning of access to required services for application instances, service accounts, orchestrator access to shared components, etc
    - Provisioning of SSL certs for application instances

- **Privacy**
  - _Storage Security_
    - Data colocation and encryption at rest/motion
    - Preventing insider access to protected data
    - Monitoring for accidental data spills

- **Provisioning**
  - _Automation & Configuration Compliance_
    - Compliance checkers, check platform configurations, verify private resources are not unexpectedly publicly accessible (eg S3 buckets), etc
  - _Secure Container Registries_
    - Image signing, etc

- **Runtime Observability and Analysis**
  - _Workload Runtime Protection_
    - Active and passive protection of the container runtime.
  - _Threat Intelligence & Forensics_
    - Threat analytics, auditing
  - _Defense and Monitoring_
    - Intrusion detection, etc
