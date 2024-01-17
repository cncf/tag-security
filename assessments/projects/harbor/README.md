# Harbor Joint Security Assessment 

Completed: April 28, 2020

Security reviewers: Andres Vega, Justin Cappos, Chase Pettet, Vinay Venkataraghavan, Robert Ficaglia, Martin Vrachev. 

Project security lead: Michael Michael 

Source code: github.com/goharbor/harbor

Web site: goharbor.io 

## Background
Harbor is a repository for securely storing and distributing container images. Among its features, it includes vulnerability scanning of vulnerabilities defined in an associated database, signing of images for authenticity and traceability, and access control to the contents of the repository. 

The project ADOPTERS.md showcases evidence of wide adoption and use. 

## Summary
### Design

Harbor builds on a lot of moderately complex systems with their own security properties. There is an expectation that aspects of those dependency properties are not handled by Harbor. Harbor does expose a pluggable framework where certain components may be patched without upgrading/redeploying the entire system. 

Its intended use helps secure software delivery pipelines by conducting vulnerability scans of artifacts before workloads are actually deployed. 

### Analysis 

Opportunities exist to strengthen the security of interactions and interconnection at the technology boundary of distinct projects and components that Harbor builds upon and pulls together.

For example, it seems possible in some cases to ship initial Notary metadata (containing public keys, etc.) with images that may mitigate the TOFU attack vector from a compromised Notary server / signing key. It also seems possible to use encryption technologies or incorporate the use of secrets stores as a more secure alternative to Kubernetes Secret Objects. 

## Recommendations

### Recommendations for the project team

Detection of attacks and forensics on successful attacks should be studied in more detail. While the review team did not uncover particular issues, a detailed security audit with a focus on this area may surface unseen cases. New information on forensics will aid elaborate more granular recovery strategies more desirable than remediation by redeployment of components. 

Evaluating the use of encryption technologies or secret stores for higher guarantees of protection is also desirable. 

### Recommendations for CNCF

In order to reduce risk in the ecosystem, it is important to understand how users actually deploy and use Harbor in practice today. The project team could benefit from surveying this information. Examples include:   
* Are users using secure configurations and setting things up in a reasonable way?  
* Is RBAC being used to give users the least privilege they need?  
* Are there stumbling blocks users hit that cause them to gravitate toward insecure settings?

Based on the answers to the above questions, a list of recommended practices for securing Harbor when used in production will benefit the community the most. 
