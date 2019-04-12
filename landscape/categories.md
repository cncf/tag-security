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
  - _Functional testing_
    - Tools that facilitate automated security testing in pipelines;
    eg for functional security tests of authn and authz,
      tests of known potential weaknesses or misconfigurations
  - _Pipelines_
    - Tools that ensure a secure pipeline or workflow, for example,
    as applied to devops (CI/CD), supply chain, etc.

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
