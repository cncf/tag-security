## Proposed Security Landscape Structure
In this section of the document, we outline our proposal for the structure of the Security Landscape.

The bullets in **bold** are the primary categories in the Security Landscape and the bullets in _italics_ are the
sub-categories. The remaining text is a description of each sub-category.

- **App definition and development**
  - _Static Code Analysis_
    - Inspecting code for vulnerabilities, pen testing, etc
  - _Dynamic Analysis_
    - Checking application in runtime for various vulnerabilities
  - _Dependency analysis_
    - Checking OS for vulnerabilities (updates available? Reports from https://www.us-cert.gov/ etc), image scanning
    - Check for vulnerabilities in dependent libraries
    - Check for maintenance of dependent projects => increased potential for vulnerabilities
  - _Functional testing_
    - Tools that facilitate automated security testing in pipelines;
    eg for functional security tests of authn and authz,
      tests of known potential weaknesses or misconfigurations
  - _Pipelines_
    - Tools that ensure a secure pipeline or workflow, for example,
    as applied to devops (CI/CD), supply chain, etc.
  - _Secret Management_
    - Tools that help to manage, encrypt or distribute secrets and other sensitive information.

- **Identity Lifecycle and & Access Management**
  - _Identity Provisioning and Lifecycle Management_
    - Enrollment and rovisioning of identities for individuals
      - Lifecycle management of identities and associated roles and entitlements
      - Includes implementations of protocols like SCIM for cross-domain provisioning
      - See, e.g. NIST SP 800-63A
    - Identity provisioning for service and machine identities
      - Cloud-native identity for ephemeral workloads, e.g. the spiffe project
      - Historical implementations may be based on, or need to interact with, systems like Kerberos
    - Directory and attribute management
      - Typically implemented atop protocols like LDAP, or other hierarchical and graph-based stores
  - _Identity Consumption and Single-sign-on_
    - Identity federation and single sign-on
      - Typically supporting OpenID connect and SAML
    - Anonymization
    - Identity intelligence
      - Know-Your-Customer/Anti-Money-Laundering projects
      - Anti-fraud systems
  - _Access control and enforcement engines_
    - Attribute and policy-based resource authorization engines and libraries
      - Including general policy engines
    - Role-based access control engines
      - Including libraries and standards for common roles
    - Privileged Access Management
      - Applying higher levels of control for sensitive actions, including just-in-time access and enhanced logging
  - _Resource-specific access layers_
    - Controls within the orchestration layer to provide minimum required access to orchestrator resources.
    - API access management tools
      - Engines for allowing or rejecting API actions based on action type or resource
    - Service admittance & admission controllers
      - Allowing new service instances to join existing services, and preventing insecure application instances from running.
    - Storage access
      - Governing access to stored data by volume, schema, record or field
    - Network Policy & Protection
      - Firewalls, network segmentation, network policy
  - _Key and Certificate Management_
    - Provisioning of access to required workloads for application instances, service accounts, orchestrator access to shared components, etc
    - Provisioning of SSL certs for application instances

- **Privacy**
  - _Storage Security_
    - Data colocation (aka data sovereignty)
    - Encryption at rest/motion
    - Preventing insider access to protected data
    - Monitoring for accidental data spills

- **Provisioning**
  - _Automation & Configuration Compliance_
    - Compliance checkers, check platform configurations, verify private resources are not unexpectedly publicly accessible (eg S3 buckets), etc
  - _Trusted Compute_
    - Secure container registries
    - Self-hosted package repositories

- **Runtime Observability and Analysis**
  - _Workload Runtime Protection_
    - Active and passive protection of the container runtime.
  - _Threat Intelligence & Forensics_
    - Threat analytics, auditing
  - _Defense and Monitoring_
    - Intrusion detection, etc
