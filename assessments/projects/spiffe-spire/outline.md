# SPIFFE/SPIRE Security Assessment

Completed: TBA

Security reviewers: Brandon Lum, Justin Cappos, Emily Fox

Project security lead: Evan Gilman

Project team: Andres Vega, Andrew Jessup, Tyler Julian, Andrew Harding.

* Source code: [github.com/spiffe/spiffe](https://github.com/spiffe/spiffe), [github.com/spiffe/spire](https://github.com/spiffe/spire)
* Web site: [spiffe.io](https://spiffe.io/)


## Background

SPIFFE and SPIRE are a set of APIs and associated tooling that provides a uniform language for describing service identity in a wide range of workloads (including orchestration systems), verifying that identity, and providing a workload with documents that serve as proof of that identity. 

_Maturity_

(Examples)
- Known end-users include: Bloomberg, Bytedance, Pinterest, Square, Uber, and Yahoo Japan. This is not an exclusive list and it’s likely that due to the secrecy of a security framework other organizations are also SPIFFE and SPIRE users privately.
- SPIFFE and SPIRE are being used by numerous other companies, both large and small, to build higher layer products and services. This includes Decipher Technology Studios, F5 Networks, HashiCorp, Intel, Google, IBM, Tigera, VMware, and many others.
- The SPIFFE project has 5 owners from 5 different organizations. 
- The SPIRE project has 7 owners from 2 different organizations.


## Summary

**Design**: SPIFFE/SPIRE have a streamlined and simple design. It covers many use cases of identity without exposing unnecesary complexity to the user. The SPIFFE 'Workload API' provides a great way for services and orchestration systems to integrate with. The the pluggable design for attestation, key management, databases, etc... allows for ease of extensibility.

**Analysis**: The project, as a security provider, has done due diligence in security and threat modeling. The security workflow is evident, and the project is in the correct direction to further improve its security process and CI verification. 
The project fulfills the role of a layer below the orchestration framework, and for its effectiveness, consumers of identitiy bundles need to have a good understanding of the demarcation line of security responsibilities.

All questions from reviewers were addressed in [self-assessment](self-assessment.md)
with non-critical issues captured as issues and noted below.

## Recommendations

### Recommendations to the project team

1. ([SPIFFE.IO-103](https://github.com/spiffe/spiffe.io/issues/103)) Make threat modelling materials accessible on the SPIFFE/SPIRE site and documents. There is a wealth of existing information on SPIFFE/SPIRE threat modeling which is not easy to find. 

2. Expand security response team to include participants outside of Scytale.

3. Work towards CII Silver Badge.

### Recommendations to CNCF

The following recommendation are where help from the CNCF would assist SPIFFE/SPIRE to
increase its effectiveness in cloud native security.

* Conduct a format security review/audit for the project as it is critical to security of services that use it.
* Provide an avenue for education of SPIFFE/SPIRE and advanced SPIFFE/SPIRE topology usecases for end users.
