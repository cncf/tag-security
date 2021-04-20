---
title: "Roles and Responsibilities"
date: "2020-10-01"
category: "Security Assurance"
---

When moving to cloud native architectures and deployments, organizations should expect to see adjustments in legacy security roles and responsibilities and create new security roles specific to the cloud. With the rapid onset of modern development methodologies and better alignment of IT activities with business needs, security must be adaptive, commensurately applied with actual risk, and transparent. It is unreasonable to expect developers and operations to become security experts. Security practitioners need to partner with developers, operations, and other project life elements to make security and compliance enforcement fully integrated with process modernization efforts and development lifecycles. Doing so means findings are reported in real-time through the tools in use by developers for habitual resolution, akin to how build failures are resolved at notice.

The blurred lines that often occur in DevOps environments should not replace clear separation of duties (SoD) when it comes to managing security in cloud native environments. While developers will be a lot more involved in implementing and executing security measures, they do not set policy, need not gain visibility into areas that aren't required for their role, etc. - this separation should be implemented between roles and across product and application teams in accordance with the organization's risk tolerance and business practices. It is understood this becomes difficult with smaller organizations when individuals perform many duties to keep the business thriving. Nevertheless, implementing a distinct role to permission alignment can assist in enforcing SoD as the organization continues to grow and cognitively forces a mental switch in the activities being performed by the individual. Ultimately, allowing for reorganization roles to be reassigned to new individuals without increasing scope of access with the new assignment.

Organizations will need to reevaluate their asset risks as products and services migrate to the cloud. With ownership and management changes of the technology in use and its deployment stack, executives should expect significant risk posture changes. Shared responsibility between providers and teams will require changes to thresholds in risk acceptance, transference, and new mechanisms for mitigation.

## Projects
- [Kubernetes Annotations examples include responsible owner](https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#attaching-metadata-to-objects)
- Segregation of Duties (aka Separation of Duties) 
  - K8s RBAC (+ OPA rego for enforcing separation?)
    - https://github.com/FairwindsOps/rbac-manager
    - https://github.com/corneliusweig/rakkess
    - https://github.com/FairwindsOps/rbac-lookup
CI/CD pipeline review checkpoints enforced
- [Kyverno](https://github.com/kyverno/)
- [Some examples of role names adapted from/aligned with NIST OSCAL:](https://pages.nist.gov/OSCAL/documentation/schema/implementation-layer/ssp/xml-schema/#global_responsible-role)
  - See https://github.com/cncf/sig-security/issues/423
- The NIST CSF has five specific security related functions/responsibilities that could be mapped to specific roles: 1) identify, 2) protect, 3) detect, 4) respond and 5) recover.

<!--
Commercial Projects:
AWS IAM Analyzer/Zelkova (https://aws.amazon.com/blogs/security/how-to-automatically-archive-expected-iam-access-analyzer-findings/)
Google Cloud Recommender (https://cloud.google.com/iam/docs/recommender-overview)
AWS SoD - AWS services that help implement/enforce SoD (shamelessly plagiarized from https://stelligent.com/2018/10/30/segregation-of-duties-on-aws/)
AWS CloudTrail – across all regions with log file integrity validation (to ensure nonrepudiation)
CloudWatch Monitoring, Events and Alerts – Receive notifications and respond to events
CloudWatch Logs – Log all changes to all relevant services. Store logs in S3 and apply least privilege IAM and S3 bucket policies for access
AWS CodePipeline – orchestrate the deployment pipeline automation
AWS Config and Config Rules – use managed and custom config rules to perform actions and/or get notified when services make modifications that violate corporate policies
Encryption – There are many AWS services that provide encryption at rest and in transit that help prevent changes and data exfiltration. For encrypting data at rest, these include using the AWS Key Management Service (KMS) with CloudTrail, DynamoDB, EBS, RDS, and S3 – to name a few. For data in transit, using ACM with ELB for applications.
AWS Identity and Access Management (IAM) – Ensure least privilege for all AWS resources.
Amazon Macie – to proactively monitor sensitive data (e.g. PII) entering the system
AWS Service Catalog – to enforce policies while maintaining autonomy
-->

## Examples
- AICPA (SOC2): “The principle of SOD is based on shared responsibilities of a key process that disperses the critical functions of that process to more than one person or department. Without this separation in key processes, fraud and error risks are far less manageable.”
- [Kubernetes RBAC and SoD](https://kubernetes.io/docs/tasks/administer-cluster/securing-a-cluster/#api-authorization)


## Links
- [Semantic RDF in policy](https://www.w3.org/RDF/)
