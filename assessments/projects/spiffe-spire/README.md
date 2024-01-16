# SPIFFE/SPIRE Joint Security Assessment

Completed: 26 Feb 2020

Security reviewers: Brandon Lum, Justin Cappos, Emily Fox

Project security lead: Evan Gilman

Project team: Andres Vega, Andrew Jessup, Tyler Julian, Andrew Harding.

* Source code: [github.com/spiffe/spiffe](https://github.com/spiffe/spiffe), [github.com/spiffe/spire](https://github.com/spiffe/spire)
* Web site: [spiffe.io](https://spiffe.io/)


## Background

Secure Production Identity Framework for Everyone (SPIFFE) are a set of APIs with SPIRE as the production-ready implementation and associated tooling that provide a uniform language for describing service identity in a wide range of workloads (including orchestration systems), verifying that identity, and providing a workload with documents that serve as proof of that identity. 

_Maturity_

(Examples)
- Known end-users include: Bloomberg, Bytedance, Pinterest, Square, Uber, and Yahoo Japan. This is not an exhaustive list as other organizations may use SPIFFE and SPIRE privately (due to the sensitivity surrounding exposure of security frameworks being used).
- SPIFFE and SPIRE are being used by numerous other companies, both large and small, to build higher layer products and services. This includes Decipher Technology Studios, F5 Networks, HashiCorp, Intel, Google, IBM, Tigera, VMware, and many others.
- The SPIFFE project has 5 owners from 5 different organizations. 
- The SPIRE project has 7 owners from 2 different organizations.


## Summary

**Design**: Covering many use cases of identity without exposing unnecesary complexity to the user, SPIFFE/SPIRE provide a streamlined and simple design to interact with. The SPIFFE '[Workload API](https://spiffe.io/spiffe/concepts/#spiffe-workload-api)' provides a great way for services and orchestration systems to integrate. This pluggable design for attestation, key management, databases, and more allows for easy extensibility.

**Analysis**: The project, as a security provider, has done due diligence in security and threat modeling. The security workflow is evident, and the project is in the correct direction to further improve its security process and CI verification. 
The project fulfills a role below the orchestration framework layer, and for its effectiveness, consumers of identitiy bundles need to have a good understanding of the demarcation line of security responsibilities.

All questions from reviewers were addressed in [self-assessment](self-assessment.md)
with non-critical issues captured as issues and noted below.

## Recommendations

### Recommendations to the project team

1. ([SPIFFE.IO-103](https://github.com/spiffe/spiffe.io/issues/103)) Make threat modelling materials accessible on the SPIFFE/SPIRE site and documents. There is a wealth of existing information on SPIFFE/SPIRE threat modeling which is not easy to find. 

2. Expand security response team to include participants outside of Scytale.

3. Work towards CII Silver Badge.

### Recommendations to CNCF

The following recommendations are where help from the CNCF would assist SPIFFE/SPIRE to
increase its effectiveness in cloud native security.

* Conduct a formal security review/audit for the project as it is critical to security of services that use it.
* Provide an avenue for education of SPIFFE/SPIRE and advanced SPIFFE/SPIRE topology use cases for end users.
